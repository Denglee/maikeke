<template>
  <div class="public-main">

    <el-form :model="roleForm" class="addForm-box" ref="refRoleForm" label-width="120px" label-position="left">
      <el-form-item label="企业名称" prop="companyName" :rules="{ required: true, message: '请输入企业名称', trigger: 'blur' }">
        <el-input v-model="roleForm.companyName" autocomplete="off" placeholder="请输入企业名称" clearable></el-input>
      </el-form-item>

      <el-form-item label="联系人" prop="contacts">
        <el-input v-model="roleForm.contacts" autocomplete="off" placeholder="请输入联系人" clearable></el-input>
      </el-form-item>

      <el-form-item label="联系电话" prop="tel">
        <el-input v-model="roleForm.tel" autocomplete="off" placeholder="请输入联系电话" clearable></el-input>
      </el-form-item>
      <el-form-item label="企业地址" prop="site">
        <el-input type="textarea" v-model="roleForm.site" autocomplete="off" placeholder="请输入企业地址" clearable></el-input>
      </el-form-item>
      <el-form-item label="企业LOGO" prop="ReportTo">
        <SingleCropper :autoCropWidth='200'
                       :autoCropHeight='100'
                       :imgWidth="200"
                       :imgHeight="100"
                       :initUrl="roleForm.logoPath"
                       @FnUploadPage="uploadLogo"></SingleCropper>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="postStaffAdd('role')">提交</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import SingleCropper from "@/components/cropper/SingleCropper";
import {listDetails, upload, updateDetails,} from "@/assets/js/api";

export default {
  name: "PersonalInfo",
  components: {SingleCropper},
  data() {
    return {
      roleForm: {
        logoPath: '',
      }, /*表单*/
    }

  },
  methods: {

    /*提交 */
    postStaffAdd(formName) {
      this.$refs['refRoleForm'].validate((valid) => {
        if (valid) {
          updateDetails(this.roleForm).then(res => {
            console.log(res);
            this.$message(res.msg);
          })
          // this.updateDetails
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    /*获取 信息 aip*/
    FnGetListDetails() {
      listDetails().then(res => {
        console.log(res);
        this.roleForm = res.data[0];
      })
    },

    /*logo上传*/
    uploadLogo(data) {
      let formData = new FormData();
      formData.append('file', data);
      upload(formData).then(res => {
        this.$message(res.msg);
        if (res.code == 200) {
          this.roleForm.logoPath = res.data.url;
        }
      });
    },

  },
  created() {
    this.FnGetListDetails();
  },
}
</script>

<style scoped lang="scss">
.addForm-box {
  .el-input,
  .el-select,
  .el-textarea {
    width: 320px !important;
  }
}
</style>