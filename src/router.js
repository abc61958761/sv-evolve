import { createRouter, createWebHistory } from 'vue-router'

import CardList from "./views/CardList"
import About from "./views/About"
import Home from "./views/Home"
import store from "./store";

const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/card-list', component: CardList }
  ]
  
const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
    scrollBehavior () {
      return { top: store.getters.getCardPagePositionY }
    }
})

  
export default router;