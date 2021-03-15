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

    <el-form :model="accountFormPWD" class="account-form"
             ref="changePassForm" label-width="120px"
             :rules="changeRules">
      <div><h4 class="account-subTitle">登录密码</h4>安全性高的密码可以使账号更安全，建议您定期更换，设置一个包含字母，符号或数组中至少两项，且长度在6-20位的密码。</div>
      <el-form-item label="原密码" prop="oldPassword">
        <el-input v-model="accountFormPWD.oldPassword" autocomplete="off" placeholder="请输入原密码" clearable></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input v-model="accountFormPWD.newPassword" autocomplete="off" placeholder="请输入新密码" clearable></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="rawPassword">
        <el-input v-model="accountFormPWD.rawPassword" autocomplete="off" placeholder="请确认密码" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"  :loading="btnState.btnCancelSite" @click="FnUpdateSWD('changePassForm')">确定</el-button>
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
import { updatePwd } from '@/assets/js/api'
export default {
    name: "AccountSetup",   //账户设置
    data(){
      /*旧密码验证规则*/
      let validateOldPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('旧密码不能为空'));
        } else if(value.length<=5){
          callback(new Error('密码不能少于6位数'));
        }  else {
          callback();
        }
      };
      /*新密码验证规则*/
      let validateNewPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('新密码不能为空'));
        } else if(value.length<=5){
          callback(new Error('密码不能少于6位数'));
        }  else {
          callback();
        }
      };
      /*确认密码验证规则*/
      let validateCheckPass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if(value.length<=5){
          callback(new Error('密码不能少于6位数'));
        } else if (value !== this.accountFormPWD.newPassword) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
     return{
       /*修改密码 form  changeRules 对应 :rules*/
       changeRules: {
         oldPassword: [
           { validator: validateOldPass, trigger: 'blur' }
         ],
         newPassword: [
           { validator: validateNewPass, trigger: 'blur' }
         ],
         rawPassword: [  //确认密码
           { validator: validateCheckPass, trigger: 'blur' }
         ],
       },

       accountForm:{

       },

       /*密码*/
       accountFormPWD:{
         oldPassword:"123456",
         newPassword:"123456",
         // rawPassword:"123456",
       },
       btnState:{
         btnCancelSite:false,
       },
     }
    },
    methods:{

      /*更新密码*/
      FnUpdateSWD(changePassForm) {
        this.GLOBAL.btnStateChange(this,'btnState','btnCancelSite')
        this.$refs[changePassForm].validate((valid) => {
          if (valid ) {
            console.log(this.accountFormPWD);
            updatePwd({
              oldPassword:this.accountFormPWD.oldPassword,
              newPassword:this.accountFormPWD.newPassword,
            }).then(res=>{
              this.$message(res.msg);
            })
          }
        })
      }
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