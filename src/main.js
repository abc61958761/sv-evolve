import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import store from './store'
import router from './router';
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import 'vuetify/dist/vuetify.min.css'

loadFonts()

const app = createApp(App)
  .use(vuetify)
  .use(router)
  .use(store)

app.mount('#app')