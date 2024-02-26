const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true, 
  // devServer: {
  //   historyApiFallback: true,
  // },
  //publicPath: process.env.NODE_ENV === 'http://gestor.berlinasdelfonce.com/' ? 'http://localhost:8080/' : '/',
})
