<template>
  <div class="home">
<!--{{visitedViews}}  &#45;&#45; 'sd-->

    <button @click="shuaxin">刷新</button>
  </div>
</template>

<script>
import {mapState, mapActions, mapGetters} from 'vuex'
export default {
  name: 'Home',
  inject:['reLoad'],
  computed: {
    ...mapGetters({
      getVisitedViews: "StoreNavTags/getVisitedViews",
    })

    // ...mapGetters('StoreNavSide', ['collapsed']),
    // ...mapGetters(['visitedViews']),
    // ...mapGetters({
    //   getVisitedViews: 'tagsView/getVisitedViews',
    // })

  },
  methods:{
    shuaxin(){
      this.reLoad();
    }
  },
  components: {

  }
}
</script>
