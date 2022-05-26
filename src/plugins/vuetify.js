// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import 'vuetify/dist/vuetify.min.css'

// Vuetify
import { createVuetify } from 'vuetify'
import * as directives from 'vuetify/directives'
import * as components from 'vuetify/components'

export default createVuetify(
  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
  components,
  directives,
)
