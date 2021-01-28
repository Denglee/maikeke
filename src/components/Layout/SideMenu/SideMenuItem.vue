<template>
  <!--   <li v-if="!item.hidden" class="side-menu-item">-->
  <!--      <template v-if="hasOnlyOneChild(item, item.children) && (onlyOneChild.noChildren || !onlyOneChild.children)">-->
  <!--         <LinkItem v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">-->
  <!--            <el-menu-item :index="resolvePath(onlyOneChild.path)">-->
  <!--               <Item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title"/>-->
  <!--            </el-menu-item>-->
  <!--         </LinkItem>-->
  <!--      </template>-->
  <!--      <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>-->
  <!--         <template slot="title">-->
  <!--            <Item :icon="item.meta && item.meta.icon" :title="item.meta && item.meta.title"/>-->
  <!--         </template>-->
  <!--         <SideMenuItem-->
  <!--            v-for="child in item.children"-->
  <!--            :key="child.path"-->
  <!--            :item="child"-->
  <!--            :base-path="resolvePath(child.path)"-->
  <!--         />-->
  <!--      </el-submenu>-->
  <!--   </li>-->

  <li v-if="!item.hidden" class="side-menu-item">
    <template v-if="hasOnlyOneChild(item, item.children) && (onlyOneChild.noChildren || !onlyOneChild.children)">
      <!--         <LinkItem v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">-->
      <!--            <el-menu-item :index="resolvePath(onlyOneChild.path)">-->
      <!--               <Item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title"/>-->
      <!--            </el-menu-item>-->
      <!--         </LinkItem>-->

      <router-link :to="resolvePath(onlyOneChild.path)" custom v-slot="{ navigate }">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" @click="navigate">
          <i :class="onlyOneChild.meta.icon||(item.meta && item.meta.icon)"></i>
          <span>{{ onlyOneChild.meta.title }}</span>
        </el-menu-item>
      </router-link>
    </template>

    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <!--<Item :icon="item.meta && item.meta.icon" :title="item.meta && item.meta.title"/>-->
        <i :class="item.meta && item.meta.icon"></i>
        <span>{{ item.meta && item.meta.title }}</span>
      </template>
      <SideMenuItem
          v-for="child in item.children"
          :key="child.path"
          :item="child"
          :base-path="resolvePath(child.path)"
          :dataPath="resolvePath(child.path)"
      />
    </el-submenu>
  </li>

</template>

<script>
import path from 'path'
// import {isExternal} from '@/assets/js/utils/validate'
import LinkItem from './LinkItem'
import Item from './Item'

export default {
  name: 'SideMenuItem',
  components: {LinkItem, Item},
  props: {
    item: {
      required: true,
      type: Object,
      default: () => {
      }
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      onlyOneChild: null
    }
  },
  methods: {
    isExternal(path) {
      // console.log(path);
      return /^(https?:|mailto:|tel:)/.test(path)
    },
    hasOnlyOneChild(parent, children = []) {
      if (children.length === 0) {
        this.onlyOneChild = {...parent, path: '', noChildren: true}
        return true
      } else if (children.length === 1) {
        this.onlyOneChild = children[0]
        return false
        /*return true */  //初始为true
      } else {
        return false
      }
    },
    resolvePath(routePath) {
      // console.log(routePath);
      if (this.isExternal(routePath)) {
        return routePath
      }
      if (this.isExternal(this.basePath)) {
        return this.basePath
      }
      // console.log(this.basePath, routePath);
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>

<style lang="scss">
.side-menu-item {
  .side-menu-item {
    .el-icon-arrow-down {
      display: none;
    }
  }
}
</style>