/**
 * Created by duoyi on 2017/4/1.
 */
/**
 * Created by duoyi on 2017/3/29.
 */
import xhr from './index'

export default {
  // 目前先单列展示，后续会整个流程合并
  getCard: xhr.get.bind(null, '/comments'),
  addCard: xhr.post.bind(null, '/comments'),
  gettask: xhr.get.bind(null, '/posts')
}
