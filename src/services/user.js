/**
 * Created by katherine on 2017/6/4.
 */
import xhr from './index'

export default {
  login: xhr.post.bind(null, '/api/v1.0/login'),
  checkLogin: xhr.get.bind(null, '/api/v1.0/auth/check'),
  getEmployee: xhr.get.bind(null, '/api/v1.0/employee'),
  deleteEmployee: xhr.del.bind(null, '/api/v1.0/employee'),
  addEmployee: xhr.post.bind(null, '/api/v1.0/employee')
  // register: xhr.post.bind(null, '/api/user/signUp'),
  // getuserinfo: xhr.get.bind(null, '/api/user/getUserInfo')
}

