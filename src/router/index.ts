import { createRouter, createWebHistory } from 'vue-router'
import Layout from '~/pages/index.vue'
import Login from '~/pages/login/index.vue'
import Prompt from '~/pages/prompt/index.vue'
import Tool from '~/pages/tool/index.vue'
import Key from '~/pages/key/index.vue'
import { getLocalItem } from '~/utils'
import naiveui from '~/utils/naiveui'

const routes = [
  { name: 'Home', path: '/', component: Layout },
  { name: 'Login', path: '/login', component: Login },
  { name: 'Prompt', path: '/prompt', component: Prompt },
  { name: 'Tool', path: '/tool', component: Tool },
  { name: 'Key', path: '/key', component: Key },
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})
// 白名单
const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
  // 获取token以验证
  const hasToken = getLocalItem('token')

  if (hasToken) {
    if (to.path === '/login') {
      // 已登录直接放入首页
      next('/')
    }
    else {
      next()
    }
  }
  else {
    if (whiteList.includes(to.path)) {
      // 白名单放行
      next()
    }
    else {
      naiveui.message.warning('请先登陆哦')
      // 定位首页并加入重定向
      next(`/login?redirect=${to.path}`)
    }
  }
})
export default router
