import Vue from 'vue'
import Router from 'vue-router'
/*引入页面*/
import Login from '../views/login/login.vue'
import Home from '../views/home/home.vue'
import Lists from '../views/home/Lists.vue'
import Fitem from '../views/home/Fitem.vue'

Vue.use(Router)

/*配置路由*/
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '',
          redirect: 'list'
        },
        {
          path: 'list',
          component: Lists
        },
        {
          path: 'list/:id',
          component: Fitem,
          props: true
        }
      ]
    }
  ]
})
