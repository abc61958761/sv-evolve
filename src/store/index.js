import { createStore } from 'vuex'
import cardList from './modules/cardList'

const store = createStore({
    modules: {
        cardList,
    }
  })
  
  export default store;