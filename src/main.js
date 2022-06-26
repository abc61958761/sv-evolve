import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import store from './store'
import router from './router';
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import 'vuetify/dist/vuetify.min.css'
import VueGapi from 'vue-gapi'

const config = {
  apiKey: 'AIzaSyC8wHCvZI5HmNXpgx0Lqav8Wr2FH6uYnb4',
  clientId: '988085303422-6skpii9eebpu2b47gd4b7s8tvskshcpj.apps.googleusercontent.com',
  scope: 'https://www.googleapis.com/auth/drive.readonly',
  discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"]
}

loadFonts()

const app = createApp(App)
  .use(vuetify)
  .use(router)
  .use(store)
  .use(VueGapi, config)

app.mount('#app')