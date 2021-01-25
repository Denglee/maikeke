import Vue from 'vue'
import Vuex, {mapActions, mapGetters,} from 'vuex'
import app2 from './app2'
import tagsView2 from './tagsView2'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app2,
    tagsView2
  }
})

