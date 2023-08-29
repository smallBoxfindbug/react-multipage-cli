/*
 * @Author: heyouqin@moyi365.com
 * @LastEditors: heyouqin@moyi365.com
 * @Date: 2023-08-29 16:49:18
 * @LastEditTime: 2023-08-29 16:52:08
 * @Descripttion: file content
 */
// 要创建的目录名称
export default () => ({
  type: 'input',
  name: 'createDir',
  message: '请输入要创建的目录名称：',
  validate(val) {
    if (val) return true;
    return '请输入要创建的目录名称';
  },
});