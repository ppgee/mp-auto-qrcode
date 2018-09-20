const router = require('koa-router')()
const SHELL = require('../shell')
const Axios = require('axios')

const config = require('../config')

router.get('/getQrcode', async ctx => {
  try {
    // 经测试不能以端口号存在而判断工具是否被打开 (-判断是否打开微信开发工具,如果未打开执行打开工具命令-)
    SHELL.openWxTool()

    // 获取微信工具端口
    const port = SHELL.getWxToolPort()

    // 项目路径
    const projectPath = encodeURIComponent(config.projectPath)
    const previewUrl = `http://0.0.0.0:${port}/preview?projectpath=${projectPath}&format=base64`
    console.info('previewUrl', previewUrl)

    // 调用预览接口
    const previewResp = (await Axios.get(previewUrl)).data
    ctx.body = `<img src="data:image/png;base64,${previewResp}" />`
  } catch (error) { // 如果异常
    // 获取响应体
    const {response} = error
    ctx.body = !response ? error : response.data.error
    console.error(error)
  }
})

module.exports = router
