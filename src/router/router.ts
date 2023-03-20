import Layout from '~/pages/index.vue'
import Prompt from '~/pages/prompt/index.vue'
import Tool from '~/pages/tool/index.vue'
import Key from '~/pages/key/index.vue'

const routes = [
  { name: 'Home', path: '/', component: Layout },
  { name: 'Prompt', path: '/prompt', component: Prompt },
  { name: 'Tool', path: '/tool', component: Tool },
  { name: 'Key', path: '/key', component: Key },
]

export default routes
