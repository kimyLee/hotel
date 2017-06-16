import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/home.vue'
import login from '@/views/login.vue'
//  基础数据中的员工管理模块
import EmployeeArrange from '@/views/BasicData/EmployeeArrange/Employee.vue'
Vue.use(Router)

export default new Router({
  /** 考虑有后续模块，这里要一开始就分出来，**/
  routes: [
    {
      path: '',
      name: 'home',
      component: home
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/EmployeeArrange',
      name: 'Employee',
      component: EmployeeArrange
    }
  ]
})
