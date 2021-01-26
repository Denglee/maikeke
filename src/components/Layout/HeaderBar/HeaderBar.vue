<template>
   <div class="header-bar clear-fix">

            <FullScreen/>
            <!--头部用户信息+退出+更换密码 -->
            <div class="headerTop-userInfo">
<!--               <i class="el-icon-bell icon-bell"></i>-->

               <el-dropdown class="dropdown-header">
                  <div class="el-dropdown-link">
                     <!--          <img class="userHeader" :src='localUrl+"/"+UserInfo.logo || "assets/images/logo-daka.png"' alt="">-->
                     <i class="el-icon-user-solid"></i>
                     <div class="user-name">
                        木子
                        <!--<div>{{ UserInfo.username }}</div>-->
                     </div>
                     <div><i class="el-icon-caret-bottom"></i></div>
                  </div>
                  <el-dropdown-menu slot="dropdown"
                                    hide-timeout="30000"
                                    class="dropdown-HeaderTop">
                     <el-dropdown-item @click.native="FnCommand(scope.$index, scope.row)">个人中心</el-dropdown-item>
                     <el-dropdown-item command="b">更改密码</el-dropdown-item>
                     <el-dropdown-item command="c">企业管理授权</el-dropdown-item>
                  </el-dropdown-menu>
               </el-dropdown>
            </div>

   </div>
</template>

<script>

import FullScreen from './FullScreen/FullScreen'

export default {
   components: {
      FullScreen,
   },
   methods: {
      FnCommand() {

      }
   },
}
</script>

