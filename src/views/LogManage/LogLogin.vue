<template>
  <div class="public-main">
    <el-form :model="searchForm" class="public-form"  ref="refRoleForm"
             label-width="80px" label-position="left" :inline="true">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="searchForm.username" autocomplete="off" class="public-input" placeholder="请输入" clearable></el-input>
      </el-form-item>

      <el-form-item label="IP地址" prop="sex">
        <el-input v-model="searchForm.sex" autocomplete="off" class="public-input" placeholder="请输入" clearable></el-input>
      </el-form-item>

      <el-form-item label="登录时间" prop="loginTime">
        <el-date-picker
            class="public-datePicker"
            v-model="searchForm.loginTime"
            type="daterange"
            unlink-panels
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" class="btn-public" :loading="btnState.btnPost" @click="postStaffAdd('role')">提交</el-button>
      </el-form-item>

    </el-form>

    <el-table class="public-table" border
              :data="tableArr"
              @selection-change="checkedStore"
              ref="refTable"
              height="600"
              @row-click="handleRowClick">
      <el-table-column type="selection"></el-table-column>
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="username" label="姓名/用户名"></el-table-column>
      <el-table-column prop="part" label="主属部门"></el-table-column>
      <el-table-column prop="equipment" label="登录终端型号"></el-table-column>
      <el-table-column prop="system" label="操作系统"></el-table-column>
      <el-table-column prop="IP" label="IP"></el-table-column>
      <el-table-column prop="state" label="登录状态"></el-table-column>
      <el-table-column prop="info" label="操作信息"></el-table-column>
      <el-table-column prop="loginTime" label="登录时间"></el-table-column>
    </el-table>

  </div>
</template>

<script>
export default {
  name: "LogLogin", //文档管理
  data(){
    return{
      searchForm:{

      },

      btnState:{
        btnImport:false,
        btnPost:false,
      },

      projectArr: [
        {
          value: 'shop1',
          label: '店铺1',
        },
        {
          value: 'shop2',
          label: '店铺2',
        },
      ],
      tableArr:[
        {
          username:'董小姐',
          part:'技术部',
          equipment:'Chrome',
          system:'Windows 10',
          IP:'124.126.244.150 / 四川 成都',
          state:'1',
          info:'1',
          loginTime:'2020-01-12',
        },
      ],
    }
  },
  methods:{
    /* 1、 编辑选中  */
    checkedStore(val) {
      console.log(val);
      this.checkedRows = val;
    },
    /*点击行触发，选中或不选中复选框 */
    handleRowClick(row, column, event) {
      this.$refs.refTable.toggleRowSelection(row);
    },


    /*切换*/
    FnSwitch(val){
      console.log(val);
    },

    postStaffAdd(){},

    /*表格 tr 操作 */
    FnCommand(val) {
      let data = val.data;
      console.log(data);

      /*更新店铺授权*/
      if(val.type == 'delete'){
        console.log('delete');
      }
    },

  },
  created(){

  },
}
</script>
