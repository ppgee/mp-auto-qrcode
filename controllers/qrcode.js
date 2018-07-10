const router = require('koa-router')()
const shell = require('../shell')
const Axios = require('axios')

const config = require('../config')

router.get('/getQrcode', async ctx => {
  try {
    // 获取端口
    const port = shell.checkWxToolPort()

    // 如果未找到端口号
    if (port === null) {
      throw '未找到端口号，请开发人员打开微信开发者工具'
    }

    // 项目路径
    const projectPath = encodeURIComponent(config.projectpath)
    const previewUrl = `http://0.0.0.0:${port}/preview?projectpath=${projectPath}&format=base64`

    // 调用预览接口
    const previewResp = (await Axios.get(previewUrl)).data
    ctx.body = `<img src="data:image/png;base64,${previewResp}" />`
  } catch (error) { // 如果异常
    // 获取响应体
    const {response} = error
    ctx.body = !response ? error : response.data.error
  }
})

module.exports = router
