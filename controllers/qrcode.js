const router = require('koa-router')()
const shell = require('../shell')
const Axios = require('axios')

const config = require('../config')

router.get('/getQrcode', async ctx => {
  // 获取端口
  const port = shell.checkWxToolPort()
  
  // 项目路径
  const projectPath = encodeURIComponent(config.projectpath)
  const previewUrl = `http://0.0.0.0:${port}/preview?projectpath=${projectPath}&format=base64`

  try {
    // 调用预览接口
    const resp = (await Axios.get(previewUrl)).data
    ctx.body = `<img src="data:image/png;base64,${resp}" />`
  } catch (error) {
    const {response} = error
    if (!response) {
      console.info(error)
    } else {
      ctx.body = response.data.error
    }
  }
})

module.exports = router
