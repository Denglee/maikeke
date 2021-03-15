<template>
   <div class="header-bar clear-fix">

      <FullScreen/>
      <!--头部用户信息+退出+更换密码 -->
      <div class="headerTop-userInfo">
         <!--               <i class="el-icon-bell icon-bell"></i>-->

         <el-dropdown class="dropdown-header">
            <div class="el-dropdown-link">
               <el-avatar :src='UserInfo.avatar' :size="40"></el-avatar>
               <div class="user-name" style="margin-left: 10px;">{{ UserInfo.nickName }}</div>
               <div><i class="el-icon-caret-bottom"></i></div>
            </div>
            <el-dropdown-menu slot="dropdown"
                              hide-timeout="30000"
                              class="dropdown-HeaderTop">
               <el-dropdown-item @click.native="FnGoUserInfo()">个人中心</el-dropdown-item>
               <el-dropdown-item @click.native="FnLoginOut">退出登录</el-dropdown-item>
               <el-dropdown-item @click.native="FnGoBusiness">业务管理系统</el-dropdown-item>
            </el-dropdown-menu>
         </el-dropdown>
      </div>

   </div>
</template>

<script>

import FullScreen from './FullScreen/FullScreen'
import {userProfile, LoginOut, delDictData} from '@/assets/js/api'

export default {
   components: {
      FullScreen,
   },
   data() {
      return {
         UserInfo: {},
      }
   },
   methods: {
      FnGoUserInfo() {
         this.$router.push({
            path: '/system/userinfo'
         })
      },

      /*获取用户信息 api*/
      FnGetUserProfile() {
         userProfile().then(res => {
            let UserInfoArr = {
               avatar: res.data.avatar,
               nickName: res.data.nickName,
               userId: res.data.userId,
            }
            this.UserInfo = UserInfoArr;
            sessionStorage.setItem('userProfile', JSON.stringify(UserInfoArr))
         })
      },

      /*退出登录*/
      FnLoginOut() {
         let that = this;
         this.$confirm('是否确定退出登录？', "警告", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
         }).then(function () {
            LoginOut().then(res => {
               sessionStorage.removeItem('userProfile');
               that.$router.push({
                  path: '/login',
               });
               that.$message(res.msg);
            })
         })
      },

      FnGoBusiness(){
         let token = localStorage.getItem('accessToken');
         console.log(token);
         // return
         window.location='http://192.168.6.189:8083/#/index?token='+token;
      },
   },

   created() {
      let userProfile = sessionStorage.getItem('userProfile');
      if (userProfile) {
         let UserInfoArr = JSON.parse(userProfile);
         this.UserInfo = UserInfoArr;
      } else {
         this.FnGetUserProfile();
      }

   },
}
</script>

