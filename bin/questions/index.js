/**
 * 交互式命令行
 * 交互问答入口文件
 */
import inquirer from 'inquirer';
import createDir from './createDir.js';

export default () =>
  inquirer.prompt([
    createDir(), // 要创建的目录名称
  ]);