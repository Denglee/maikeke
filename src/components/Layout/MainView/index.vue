<template>
<!--   <div class="main-view">-->
      <transition name="fade" mode="out-in">
<!--         <keep-alive :include="cachedViews">-->
         <keep-alive>
            <router-view :key="key"/>
         </keep-alive>
      </transition>
<!--   </div>-->
</template>

<script>

import {mapGetters} from 'vuex'
export default {
   name: 'MainView',
  data(){
    return{

    }
  },
   computed: {
     // ...mapGetters({
     //   cachedViews: "StoreNavTags/cachedViews",
     // }),
      key() {
         return this.$route.path
      }
   },

}
</script>

