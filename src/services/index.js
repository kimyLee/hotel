/**
 * Created by kimmy on 2017/3/29.
 * 我还是倾向于api 统一管理，万一多处用到了呢
 */
import axios from 'axios'
// todo: 开发服上这样配，做映射，打包上线可能删掉
const domain = location.host.indexOf('localhost') >= 0 ? '/api' : ''

// 统一处理
function handleAll (data) {
  console.log(data)
  console.log(data.data.success)
  if (!data.data.success) {
    let errorCode = data.data ? (data.data.message || '网络错误') : '网络错误'
    errorCode = typeof errorCode === 'object' ? '网络错误，请检查服务器' : errorCode
    return Promise.reject(errorCode)
  }
  return Promise.resolve(data.data)
}

function get (url, query) {
  return axios.get(domain + url, {params: query}).then(handleAll)
}
function post (url, query) {
  return axios.post(domain + url, query).then(handleAll)
}
function put (url, query) {
  return axios.put(domain + url, query).then(handleAll)
}
function del (url, query) {
  return axios({
    headers: { 'Content-Type': 'application/json' },
    method: 'delete',
    url: domain + url,
    data: query
  }).then(handleAll)
}

// 这里少了form 提交的处理，查api, 嵌入到vue即可
export default {
  get,
  post,
  put,
  del
}

