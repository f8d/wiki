import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Meta from 'vue-meta'
import AsyncComputed from 'vue-async-computed'
import './registerServiceWorker'

import Parse from 'parse'
import 'holakit/dist/holakit.css'

Vue.config.productionTip = false

Vue.use(Meta)
Vue.use(AsyncComputed)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

console.info('Connecting', process.env.VUE_APP_PARSE_SERVER)
Parse.serverURL = process.env.VUE_APP_PARSE_SERVER
Parse.initialize(process.env.VUE_APP_PARSE_APP_ID, process.env.VUE_APP_PARSE_JS_KEY)
