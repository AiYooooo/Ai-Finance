import Vue from 'vue'
// import Vue from 'vue/dist/vue.js'
import App from './App.vue'
import VueRouter from 'vue-router'

import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

import VueResource from 'vue-resource'
import router from './router/router'

import Antv from 'antv'
import 'antv/dist/antv.css'

Vue.use(Antv)
Vue.use(VueRouter)
Vue.use(VueResource)

const requireComponent = require.context(
  './components/basic',
  false,
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  const componentName = upperFirst(
    camelCase(
      fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
    )
  )
  Vue.component(
    componentName,
    componentConfig.default || componentConfig
  )
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
