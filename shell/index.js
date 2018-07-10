const shell = require('shelljs')

const TOOL_PATH = '~/Library/Application\ Support/微信web开发者工具/Default/.ide'

// 获取微信开发者工具的端口
exports.checkWxToolPort = function () {
  let port = null
  try {
    port = shell.tail({'-n': 1}, TOOL_PATH).toString()
  } catch (error) {
    console.info(error)
  } finally {
    return port
  }
}