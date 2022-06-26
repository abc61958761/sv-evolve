const { defineConfig } = require('@vue/cli-service')
const fs = require('fs');

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  },
  // devServer: {
  //   https: {
  //     key: fs.readFileSync('.certs/key.pem'),
  //     cert: fs.readFileSync('.certs/cert.pem'),
  //   }
  // }
})
