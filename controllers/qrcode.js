const router = require('koa-router')()
const SHELL = require('../shell')
const Axios = require('axios')

const config = require('../config')

const NOT_LOGIN_CODE = 40000

// 获取微信工具端口
const port = SHELL.getWxToolPort()

const getLoginQRCode = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const loginUrl = `http://0.0.0.0:${port}/login?format=base64`
      console.info('loginUrl', loginUrl)

      const loginResp = (await Axios.get(loginUrl)).data

      resolve(loginResp)
    } catch (error) {
      console.error(error)
      reject(error)
    }
  })
}

const getPreviewQRCode = () => {
  return new Promise(async (resolve, reject) => {
    try {
      // 经测试不能以端口号存在而判断工具是否被打开 (-判断是否打开微信开发工具,如果未打开执行打开工具命令-)
      SHELL.openWxTool()
  
      // 项目路径
      const projectPath = encodeURIComponent(config.projectPath)
      const previewUrl = `http://0.0.0.0:${port}/preview?projectpath=${projectPath}&format=base64`
      console.info('previewUrl', previewUrl)
  
      // 调用预览接口
      const previewResp = (await Axios.get(previewUrl)).data
      
      resolve(previewResp)
    } catch (error) { // 如果异常
      console.error(error)
      reject(error)
    }
  })
}

router.get('/preview', async ctx => {
  try {
    const previewResp = (await getPreviewQRCode())
    ctx.body = `<img src="data:image/png;base64,${previewResp}" />`
  } catch (error) { // 如果异常
    // 获取响应体
    const { response } = error
    if (response) {
      const { code } = response.data
      code === NOT_LOGIN_CODE && ctx.redirect('/login')

      error = response.data.error
    }

    ctx.body = error
    console.error(error)
  }
})

router.get('/login', async ctx => {
  try {
    const loginResp = (await getLoginQRCode())

    ctx.body = `<img src="${loginResp}" />`
  } catch (error) {
    if (!response) {
      ctx.body = error
      console.error(error)
    } else {
      ctx.body = response.data.error
      console.error(response.data)
    }
  }
})

module.exports = router
