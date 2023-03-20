import Layout from '~/pages/index.vue'
import CardPage from '~/pages/card/index.vue'
import PromptPage from '~/pages/prompt/index.vue'
import FeedbackPage from '~/pages/feedback/index.vue'

const routes = [
  { path: '/', component: Layout },
  { path: '/card/:id', component: CardPage },
  { path: '/prompt/:id', component: PromptPage },
  { path: '/feedback', component: FeedbackPage },
]

export default routes
