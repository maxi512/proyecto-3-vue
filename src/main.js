import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'materialize-css/dist/css/materialize.min.css'
import 'material-design-icons/iconfont/material-icons.css'

import App from './App.vue'

Vue.use(VueMaterial)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
