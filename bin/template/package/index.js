import ejs from 'ejs';
import fs from 'fs';
import prettier from 'prettier';
import { getRootPath } from '../../utils/index.js';

export default ({ createDir }) => {
  const file = fs.readFileSync(getRootPath('template/package/package.ejs'));
  const code = ejs.render(file.toString(), { createDir });
  // 格式化
  return prettier.format(code, { parser: 'json' });
};