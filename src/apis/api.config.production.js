// RESTful API要求在URL中标明API的版本
const host = 'localhost:5000' // 暂时未定
const version = '/api/'    // 先这样吧???

// module.exports 指向的内容会被require完整读出, 此处是被 @/apis/apis.js完整读出
module.exports = host + version