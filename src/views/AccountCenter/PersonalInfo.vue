<template>
  <div class="public-main">
    <el-form :model="roleForm" class="person-form"  ref="refRoleForm" label-width="120px" label-position="left">
      <el-form-item label="员工头像">
         <SingleCropper :autoCropWidth ='100'
                        :autoCropHeight ='100'
                        :isAvater="true"
                        :initUrl="roleForm.avatar"
         @FnUploadPage="FnUpload"></SingleCropper>
      </el-form-item>

      <el-form-item label="姓名" prop="nickName" :rules="{ required: true, message: '请输入姓名', trigger: 'blur' }">
        <el-input v-model="roleForm.nickName" autocomplete="off" placeholder="请输入姓名" clearable></el-input>
      </el-form-item>

      <el-form-item label="手机号码" prop="phonenumber">
        <el-input v-model="roleForm.phonenumber" autocomplete="off" placeholder="请输入手机号码" clearable></el-input>
      </el-form-item>
      <el-form-item label="直属上司" prop="superiorId">
        <el-select placeholder="请选择" v-model="roleForm.superiorId">
          <el-option v-for="(item,index) in userArr" :key="index"
                     :value="item.deptId"
                     :label="item.dept.leader">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="roleForm.sex" placeholder="请选择性别">
          <el-option label="男" value="0"></el-option>
          <el-option label="女" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="roleForm.email" autocomplete="off" placeholder="请输入邮箱" clearable></el-input>
      </el-form-item>
      <el-form-item label="部门" prop="deptId">
        <el-cascader
            v-model="roleForm.deptId"
            :options="deptArr"
            :show-all-levels="false"
            :props="{
                        checkStrictly: true,
                        value:'id',
                        label:'label',
                        emitPath:false
                     }"
            clearable>
          <template slot-scope="{ node, data }">
            <span>{{ data.label }}</span>
            <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
          </template>
        </el-cascader>

      </el-form-item>
      <el-form-item label="岗位" prop="posts">
        <el-select placeholder="请选择" filterable multiple clearable
                   v-model="roleForm.posts">
          <el-option v-for="(item,index) in postArr" :key="index"
                     :value="item.postId"
                     :label="item.postName">
          </el-option>
        </el-select>

      </el-form-item>
      <el-form-item label="公司" prop="company">
        <el-input v-model="roleForm.company" autocomplete="off" placeholder="请输入公司" clearable></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="roles">

        <el-select placeholder="请选择角色" filterable multiple clearable
                   v-model="roleForm.roles">
          <el-option v-for="(item,index) in roleArr" :key="index"
                     :value="item.roleId"
                     :label="item.roleName">
          </el-option>
        </el-select>

      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="postStaffAdd('role')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import SingleCropper from "@/components/cropper/SingleCropper";
import {userProfile, uploadUserAvatar, treeSelDept,listPost,listRole,listUser} from '@/assets/js/api'
export default {
  name: "PersonalInfo",
  components:{SingleCropper},
  // provide(){
  //   return{
  //     uploadPage:this.uploadPage,
  //   }
  // },
  data() {
    return {

      roleForm: {
        dept:[],
        roles:[],
        posts:[],
      }, /*表单*/

      deptArr:[],
      postArr:[],
      roleArr:[],
      userArr:[],
    }
  },
  methods: {
    FnGetUserProfile(){
      userProfile().then(res=>{
        console.log(res.data);
        this.roleForm = res.data;

        /*岗位添加*/
        let postArr = []
        res.data.posts.forEach((item,index)=>{
          postArr.push(item.postId);
        })
        this.roleForm.posts = postArr;

        /*角色添加*/
        let roleArr = []
        res.data.roles.forEach((item,index)=>{
          roleArr.push(item.roleId);
        })
        this.roleForm.roles = roleArr;

        this.roleForm.deptId = res.data.deptId +'';
      })

    },

    /*提交 */
    postStaffAdd(formName) {
      this.$refs['refRoleForm'].validate((valid) => {
        if (valid) {
          let formArr = this.roleForm;
          sessionStorage.removeItem('userProfile');
          console.log(formArr);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    /*上传*/
    FnUpload(data){
      console.log(data);
      let formData = new FormData();
      formData.append("avatarfile", data);
      uploadUserAvatar(formData).then(res => {
        this.$message(res.msg);
      });
    },
    /*部门 获取树状图*/
    FnGetTreeSelDept(){
      treeSelDept().then(res => {
        this.deptArr = res.data;
      });
    },

    /*岗位*/
    FnlistPost(){
      listPost().then(res=>{
        this.postArr = res.data;
      })
    },
    /*角色*/
    FnlistRole(){
      listRole().then(res=>{
        this.roleArr = res.data;
      })
    },

    /*角色*/
    FnlistUser(){
      listUser().then(res=>{
        this.userArr = res.data;
      })
    },

  },
  created() {
    this.FnGetUserProfile();

    this.FnGetTreeSelDept();
    this.FnlistPost();
    this.FnlistRole();
    this.FnlistUser();
  },
}
</script>
