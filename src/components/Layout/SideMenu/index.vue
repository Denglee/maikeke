<template>
   <nav class="side-menu-wrapper">

      <el-scrollbar wrap-class="scrollbar">
         <el-menu
            class="navLeft-box"
            :default-active="activeMenu"
            :collapse="collapsed"
            background-color="#263238"
            text-color="#fff"
            active-text-color="#409eff">
            <SideMenuItem
               v-for="route in routes.data"
               :key="route.path"
               :item="route"
               :base-path="route.path"/>
         </el-menu>
      </el-scrollbar>

   </nav>
</template>

<script>
import {mapGetters,mapMutations} from 'vuex'
import SideMenuItem from './SideMenuItem'
import menuNav from '@/assets/js/menu'  /* 侧边栏数据 */

export default {
   name: 'SideMenu',
   components: {SideMenuItem},
   data() {
      return {
         routes: menuNav,
      }
   },

   computed: {
      ...mapGetters('StoreNavSide', ['collapsed']),
      // routes() {
      //   console.log(this.$router.options.routes);
      //   console.log(menuNav);
      //   return this.$router.options.routes
      //
      //   // return menuNav
      // },
      activeMenu() {
         const route = this.$route;
         const {meta, path} = route;
         // console.log(meta);
         if (meta.activeMenu) {
            return meta.activeMenu
         }
         return path
      }
   },
}
</script>

