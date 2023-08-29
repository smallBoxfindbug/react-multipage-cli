#!/usr/bin/env node

// CLI执行入口文件
import fs from 'fs';
import chalk from 'chalk'; // chalk 美化输出
import {
  execaSync,
  execa
} from 'execa';
import ora from 'ora';
import fse from 'fs-extra';


import questions from './questions/index.js';
import packageJson from './template/package/index.js';

// 交互命令行输入的值
const config = await questions();

// 创建的项目路径
const projectPath = `./${config.createDir}`;
// 存放模板文件的目录路径
const templatesDirRootPath = `${projectPath}/templatesModulesDir`;

// 1. 先创建目标目录和模板文件临时目录
console.log(chalk.green(`根据createDir创建文件夹 -> ${projectPath}`));
fs.mkdirSync(projectPath);
fs.mkdirSync(templatesDirRootPath);


// 2. 获取远程仓库模板文件代码，存放到临时目录
let getGitRemoteResult = {}; // 拉取远程仓库结果
const getGitRemote = () => {
  const spinners = [ora('读取中...')];
  spinners[0].start();

  try {
    getGitRemoteResult = execaSync(
      `git`,
      [
        'clone',
        '-b',
        'master',
        'https://gitee.com/HY_QIN/webpack-react-cli.git',
      ], {
        cwd: templatesDirRootPath,
      }
    );
  } catch (err) {
    fs.rmdirSync(projectPath);
    console.error(err);
  }

  // console.log(chalk.blue('getGitRemoteResult：'), getGitRemoteResult);
  if (
    getGitRemoteResult.failed === true ||
    getGitRemoteResult.failed === undefined ||
    getGitRemoteResult.failed === null
  ) {
    spinners[0].fail('读取远程仓库失败！');
  } else {
    spinners[0].succeed('读取远程仓库成功！');
  }
};

getGitRemote();


// 3. 把临时目录里的模板文件代码copy到项目中
const fsCopy = async () => {
  const spinners = [ora('创建模块中...')];
  spinners[0].start();
  try {
    console.log(chalk.blue('copy模板文件代码'));
    await fse.copy(
      `${templatesDirRootPath}/webpack-react-cli`,
      `${projectPath}`,
      (err) => {
        if (err) {
          console.error(err);
        } else {
          delDir();
          spinners[0].succeed('创建模块成功！');
          rewrite();
        }
      }
    );
  } catch (err) {
    fs.rmdirSync(projectPath);
    console.error(err);
  }
};

fsCopy();


// 4. 删除模板文件中包含定制信息
const delDir = async () => {
  console.log(chalk.red('删除模板文件中包含定制信息'));

  // 删除模板文件临时目录
  await execa(`rm`, ['-rf', `${templatesDirRootPath}`], {
    cwd: './'
  });
  // 删除.git文件夹
  await execa(`rm`, ['-rf', `${projectPath}/.git`], {
    cwd: './'
  });
  // 删除package-lock.json
  await execa(`rm`, ['-rf', `${projectPath}/package-lock.json`], {
    cwd: './'
  });
};


// 5. 重新写入部分文件
const rewrite = async () => {
  console.log(chalk.green('重新写入部分文件'));

  await execa(`rm`, ['-rf', `${projectPath}/package.json`], {
    cwd: './'
  });
  fs.writeFileSync(`${projectPath}/package.json`, await packageJson(config));

};