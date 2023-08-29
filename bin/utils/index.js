// 主要是获取脚手架项目的物理路径函数
import path from 'path';
import { fileURLToPath } from 'url';
import process from 'process';

// 获取绝对路径
export const getRootPath = (pathUrl) => {
  const __dirname = fileURLToPath(import.meta.url);
  return path.resolve(__dirname, `../../${pathUrl}`);
};