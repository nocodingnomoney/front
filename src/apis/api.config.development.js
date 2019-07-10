// RESTful API要求在URL中标明API的版本
const host = 'http://110.64.87.80:8081'
const version = '/api/'

// module.exports 指向的内容会被require完整读出, 此处是被 @/apis/apis.js完整读出
module.exports = host + version