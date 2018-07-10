const qrcodeApi = require('./controllers/qrcode')

module.exports = function routes (app) {
  // restful api
  app.get('/getQrcode', qrcodeApi.getQrcode)
}
