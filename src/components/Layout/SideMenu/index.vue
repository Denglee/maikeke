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
               v-for="route in routes"
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
import menuNav from '@/assets/js/menu'

import {menuGetRouters} from "@/assets/js/api";  /* 侧边栏数据 */

export default {
   name: 'SideMenu',
   components: {SideMenuItem},
   data() {
      return {
         routes: menuNav,
         // routes: [],
      }
   },
   methods:{
      FnGetMenuGetRouters(){
         menuGetRouters().then(res=>{
            if(res.code == 200){
               console.log(res.data);
               this.routes = res.data;
            }else {
               this.$message.error(res.message);
            }
         })
      },
   },
   created() {
     this.FnGetMenuGetRouters();
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

