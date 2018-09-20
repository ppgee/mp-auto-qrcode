const OS = require('os')
const SHELL = require('shelljs')
const CONFIG = require('../config')

// 获取当前系统
const CURR_OS = OS.type()

// cli路径
const CLI_PATH = {
  'Darwin': '/Contents/Resources/app.nw/bin/cli',
  'Windows_NT': '/cli.bat'
}

// 工具端口文件路径
const TOOL_PORT_PATH = {
  'Darwin': '~/Library/Application\ Support/微信web开发者工具/Default/.ide',
  'Windows_NT': '~/AppData/Local/微信web开发者工具/User\ Data/Default/.ide'
}

// 查看是否存在端口（是否打开微信开发工具）
const checkWxToolPort = function () {
  try {
    const hasPort = SHELL.test('-f', TOOL_PORT_PATH[CURR_OS])
    console.info('hasPort', hasPort)
    return hasPort
  } catch (error) {
    console.info(error)
  }
}

// 打开微信开发工具
const openWxTool = function () {
  try {
    // 获取安装路径
    const installPath = CONFIG.installPath

    // 获取命令行工具
    const cliPath = `${installPath}${CLI_PATH[CURR_OS]}`

    // 打开工具
    SHELL.exec(`${cliPath} -o`)
  } catch (error) {
    console.info(error)
  }
}

// 获取微信开发者工具的端口
const getWxToolPort = function () {
  try {
    // 获取端口(如果存在端口的话)
    return SHELL.tail({'-n': 1}, TOOL_PORT_PATH[CURR_OS]).toString()
  } catch (error) {
    console.info(error)
  }
}

module.exports = {
  checkWxToolPort,
  openWxTool,
  getWxToolPort
}
