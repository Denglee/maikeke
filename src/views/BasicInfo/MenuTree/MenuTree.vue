<template>
   <div>
      <template v-for="(item,index) in menuData">
         <el-submenu v-if="item.children && item.children.length>0" :key="item.id"
                     :index="index +''">
            <template slot="title">{{ item.label }}</template>
            <MenuTree :menuData="item.children"></MenuTree>
         </el-submenu>
         <el-menu-item v-else :key="item.id" :index="index +''">
            <span slot="title" :data="index">{{ item.label }}</span>
         </el-menu-item>
      </template>
   </div>
</template>

<script>
export default {
   name: "MenuTree",
   props: ['menuData'],
   data() {
      return {}
   },
   methods: {},
   created() {

   },
}
</script>
