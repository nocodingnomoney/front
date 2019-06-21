// vue.config.js
module.exports = {
  devServer: {
    port: 8080, // use any port suitable for your configuration
    host: '0.0.0.0', // to accept connections from outside container
    watchOptions: {
      aggregateTimeout: 500, // delay before reloading
      poll: 1000 // enable polling since fsevents are not supported in docker
    }
  }
}