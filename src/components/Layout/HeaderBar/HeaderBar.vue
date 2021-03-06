<template>
  <div class="header-bar clear-fix">

    <FullScreen/>
    <!--头部用户信息+退出+更换密码 -->
    <div class="headerTop-userInfo">
      <!--               <i class="el-icon-bell icon-bell"></i>-->

      <el-dropdown class="dropdown-header">
        <div class="el-dropdown-link">
          <el-avatar :src='UserInfo.avatar' :size="40"></el-avatar>
          <div class="user-name" style="margin-left: 10px;">{{UserInfo.nickName}}</div>
          <div><i class="el-icon-caret-bottom"></i></div>
        </div>
        <el-dropdown-menu slot="dropdown"
                          hide-timeout="30000"
                          class="dropdown-HeaderTop">
          <el-dropdown-item @click.native="FnGoUserInfo()">个人中心</el-dropdown-item>
          <el-dropdown-item :command="{type:'b'}">更改密码</el-dropdown-item>
          <el-dropdown-item :command="{type:'c'}">企业管理授权</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

  </div>
</template>

<script>

import FullScreen from './FullScreen/FullScreen'
import {userProfile} from '@/assets/js/api'

export default {
  components: {
    FullScreen,
  },
  data(){
    return {
      UserInfo:{},
    }
  },
  methods: {
    FnGoUserInfo() {
      this.$router.push({
        path: '/system/userinfo'
      })
    },

    /*获取用户信息 apii*/
    FnGetUserProfile(){
      userProfile().then(res=>{
        let UserInfoArr = {
          avatar:res.data.avatar,
          nickName:res.data.nickName,
          userId:res.data.userId,
        }
        this.UserInfo = UserInfoArr;
        sessionStorage.setItem('userProfile',JSON.stringify(UserInfoArr))
      })
    }
  },
  created(){
    let userProfile = sessionStorage.getItem('userProfile');
    if(userProfile){
      let UserInfoArr = JSON.parse(userProfile);
      this.userInfo = UserInfoArr;
    }else{
      this.FnGetUserProfile();
    }

  },
}
</script>

