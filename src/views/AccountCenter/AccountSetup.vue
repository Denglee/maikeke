<template>
  <div class="public-main">
    <div></div>
    <el-form :model="accountForm" class="account-form"  ref="accountForm" label-width="120px">
      <div><h4 class="account-subTitle">手机号号码</h4>修改手机号系统会发送验证码到新的手机号码上</div>
      <el-form-item label="手机号码" prop="phone">
        <el-input v-model="accountForm.phone" autocomplete="off" placeholder="请输入手机号码" clearable></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="phone">
        <el-input v-model="accountForm.phone" autocomplete="off" placeholder="请输入验证码" clearable class="input-code"></el-input>
        <el-button type="primary" class="btn-code">获取验证码</el-button>
      </el-form-item>
      <el-form-item label="" >
        <el-button type="primary">提交</el-button>
      </el-form-item>
    </el-form>

    <el-form :model="accountForm" class="account-form"  ref="accountForm" label-width="120px">
      <div><h4 class="account-subTitle">登录密码</h4>安全性高的密码可以使账号更安全，建议您定期更换，设置一个包含字母，符号或数组中至少两项，且长度在6-20位的密码。</div>
      <el-form-item label="原密码" prop="oldpass">
        <el-input v-model="accountForm.oldpass" autocomplete="off" placeholder="请输入原密码" clearable></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newpass">
        <el-input v-model="accountForm.newpass" autocomplete="off" placeholder="请输入新密码" clearable></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="surepass">
        <el-input v-model="accountForm.surepass" autocomplete="off" placeholder="请确认密码" clearable></el-input>
      </el-form-item>
      <el-form-item label="" >
        <el-button type="primary">提交</el-button>
      </el-form-item>
    </el-form>

    <div class="flex-between account-form">
      <div><h4 class="account-subTitle">邮箱账号</h4>修改邮箱号系统会发送验证码到当前绑定手机号码上。</div>
      <div>
        <span class="email-num">1007541540@qq.com</span>
        <span class="email-tip">暂不支持修改</span>
      </div>
    </div>

  </div>
</template>

<script>
export default {
    name: "AccountSetup",   //账户设置
    data(){
     return{
       accountForm:{

       },
     }
    },
    methods:{
    
    },
    created(){
    
    },
}
</script>
<style lang="scss">
  .account-form{
    border-top: solid 1px #eff2f9;
    padding: 20px;
    .account-subTitle{
      display: inline-block;
      margin:0 20px 20px 0;
    }
    .el-input{
      width: 300px;
    }
    .input-code{
      width: 160px;
    }
    .btn-code{
      width: 132px;
      margin-left: 8px;
    }
    .email-num{
      color: #005ad4;
      margin-right: 40px;
    }
    .email-tip{
      color: #979797;
    }

  }
</style>