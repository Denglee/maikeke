<template>
   <div class="app-wrapper">

      <!--左侧导航-->
      <aside class="side-container" :class="collapsed ? 'folded' : 'unfolded'">
         <div class="logo">
            <a href="/"><img :src="imgSrc" alt="logo"></a>
         </div>
         <SideMenu/>
      </aside>

      <!--右边主题内容-->
      <main class="main-container" :class="collapsed ? 'wider' : 'normal'">
         <header class="main-header">
            <div class="flex-between headerTop-box">
               <!--按钮切换-->
               <div @click="handleResize" v-model="collapsed" class="header-topLeft">
                  <i class="el-icon-s-fold" v-if="!collapsed"></i>
                  <i class="el-icon-s-unfold" v-else></i>
               </div>
               <HeaderBar/>
            </div>
            <TagsNav/>
         </header>

         <div class="main-content">
            <el-scrollbar wrap-class="scrollbar">
               <!--中间 主题内容-->
               <transition name="fade" mode="out-in">
<!--                 <router-view/>-->
                  <keep-alive :include="cachedViews">
                     <router-view :key="key"/>
                  </keep-alive>
               </transition>

            </el-scrollbar>
         </div>
      </main>

   </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import HeaderBar from './HeaderBar/HeaderBar'
import SideMenu from './SideMenu/index'
import TagsNav from './TagsView/index'
import MainView from './MainView/index'
import Logo from '@/assets/images/nav/logo.png'
import LogoIcon from '@/assets/images/nav/logo-icon.png'

const RESIZE_WIDTH = 1080
export default {
   name: 'Layout',
   components: {HeaderBar, SideMenu, TagsNav, MainView},
   computed: {
      ...mapGetters('StoreNavSide', ['collapsed']),
      imgSrc() {
         if (this.collapsed) {
            return LogoIcon
         }
         return Logo
      },
      cachedViews() {
         return this.$store.state.StoreNavTags.cachedViews;
      },
      key() {
         return this.$route.path
      }
   },
   created() {

   },
   beforeMount() {
      window.addEventListener('resize', this.handleResize)
   },
   beforeDestroy() {
      window.removeEventListener('resize', this.handleResize)
   },
   methods: {
      ...mapMutations('StoreNavSide', ['openSideMenu', 'closeSideMenu']),
      handleResize() {
         // console.log(this.collapsed);
         let val = this.collapsed;
         if (val == false || val == 'false' || !val) {
            this.closeSideMenu();
         } else {
            this.openSideMenu();
         }
      },

   }
}
</script>

<style lang="scss">
   @import "~@/assets/css/sideMenu";
</style>
