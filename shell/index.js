const OS = require('os')
const SHELL = require('shelljs')

const TOOL_PATH = {
  'Darwin': '~/Library/Application\ Support/微信web开发者工具/Default/.ide',
  'Windows_NT': '~/AppData/Local/微信web开发者工具/User\ Data/Default/.ide'
}

// 获取微信开发者工具的端口
exports.checkWxToolPort = function () {
  // 微信开发者工具端口
  let port = null
  try {
    // 获取当前系统
    const currOS = OS.type()

    // 获取端口
    port = SHELL.tail({'-n': 1}, TOOL_PATH[currOS]).toString()
  } catch (error) {
    console.info(error)
  } finally {
    return port
  }
}