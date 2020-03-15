import Vue from 'vue'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import './plugins/vuesax.js'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

Vue.prototype.$http=axios

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  iconfont: 'md',
  render: h => h(App)
}).$mount('#app')
