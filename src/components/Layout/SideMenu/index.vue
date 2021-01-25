<template>
  <div class="side-menu-wrapper">
    <el-scrollbar wrap-class="scrollbar">
      <el-menu
        :default-active="activeMenu"
        :collapse="collapsed"
        background-color="#263238"
        text-color="#fff"
        active-text-color="#409eff"
      >

        <SideMenuItem
          v-for="route in routes.data"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SideMenuItem from './SideMenuItem'
import menuNav from '@/assets/js/menu'

export default {
  name: 'SideMenu',
  components: { SideMenuItem },
  data() {
    return {
      routes: menuNav,
    }
  },

  computed: {
    ...mapGetters('app2', ['collapsed']),
    // routes() {
    //   console.log(this.$router.options.routes);
    //   console.log(menuNav);
    //   return this.$router.options.routes
    //
    //   // return menuNav
    // },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      console.log(meta)
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    }
  },
  methods:{
    get(){
      console.log(menuNav.data)
    }
  },
  created(){
    this.get();
  },

}
</script>

<style lang="scss">
@import "~@/assets/css/side-menu";
</style>
