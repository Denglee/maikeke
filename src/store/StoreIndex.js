import Vue from 'vue'
import Vuex from 'vuex'
import StoreNavSide from './modules/StoreNavSide'
import StoreNavTags from './modules/StoreNavTags'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    StoreNavSide,
    StoreNavTags
  }
})

