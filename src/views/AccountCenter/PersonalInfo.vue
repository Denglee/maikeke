<template>
  <div class="public-main">
    <el-form :model="roleForm" class="person-form"  ref="refRoleForm" label-width="120px" label-position="left">
      <el-form-item label="员工头像">
         <SingleCropper :autoCropWidth ='100' :autoCropHeight ='100' :isAvater="true"
                        :initUrl="roleForm.avatar"></SingleCropper>
      </el-form-item>

      <el-form-item label="姓名" prop="nickName" :rules="{ required: true, message: '请输入姓名', trigger: 'blur' }">
        <el-input v-model="roleForm.nickName" autocomplete="off" placeholder="请输入姓名" clearable></el-input>
      </el-form-item>

      <el-form-item label="手机号码" prop="phonenumber">
        <el-input v-model="roleForm.phonenumber" autocomplete="off" placeholder="请输入手机号码" clearable></el-input>
      </el-form-item>
      <el-form-item label="直属上司" prop="deptId">
        <el-input v-model="roleForm.deptId" autocomplete="off" placeholder="请输入直属上司" clearable></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="ReportTo">
        <el-select v-model="roleForm.sex" placeholder="请选择性别">
          <el-option label="男" value="0"></el-option>
          <el-option label="女" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="roleForm.email" autocomplete="off" placeholder="请输入邮箱" clearable></el-input>
      </el-form-item>
      <el-form-item label="部门" prop="dept">
        <el-input v-model="roleForm.dept" autocomplete="off" placeholder="请输入部门" clearable></el-input>
      </el-form-item>
      <el-form-item label="岗位" prop="posts">
        <el-input v-model="roleForm.posts" autocomplete="off" placeholder="请输入岗位" clearable></el-input>
      </el-form-item>
      <el-form-item label="公司" prop="company">
        <el-input v-model="roleForm.company" autocomplete="off" placeholder="请输入公司" clearable></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="roles">
        <el-input v-model="roleForm.roles" autocomplete="off" placeholder="请输入角色" clearable></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="postStaffAdd('role')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import SingleCropper from "@/components/cropper/SingleCropper";
import {userProfile, uploadUserAvatar} from '@/assets/js/api'
export default {
  name: "PersonalInfo",
  components:{SingleCropper},
  provide(){
    return{
      uploadPage:this.uploadPage,
    }
  },
  data() {
    return {
      
      /* == 添加员工 ==*/
      formLabelWidth: '120px',
      diaHeadImgUrl: '',  //头像放大 url
      diaVisible: false, //弹出方法头像
      diaImgVisi: false,  //弹出方法头像
      
      imgUrl: '',   //头像 上传路径
      roleForm: {}, /*表单*/

      files:[],//要上传的文件对象
    }
  },
  methods: {
    FnGetUserProfile(){
      userProfile().then(res=>{
        console.log(res.data);
        this.roleForm = res.data;
      })
    },

    /*提交 */
    postStaffAdd(formName) {
      this.$refs['refRoleForm'].validate((valid) => {
        if (valid) {
          let formArr = this.roleForm;
          console.log(formArr);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    /*上传*/
    uploadPage(data){
      console.log(data);
      uploadUserAvatar(data).then(res => {
        this.$message(res.msg);
      });
    },

  },
  created() {
    this.FnGetUserProfile();
  },
}
</script>
