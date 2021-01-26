<template>
  <div class="public-main">

    <div class="alignR">
      <el-button icon="el-icon-circle-plus-outline" @click="FnBtnAddShow" class="public-btn">绑定邮箱</el-button>
      <el-button icon="el-icon-folder-add" @click="FnBtnAddShow" :loading="btnState.btnImport" class="public-btn">导入邮箱</el-button>
    </div>

    <el-table class="public-table" border
              :data="tableArr"
              @selection-change="checkedStore"
              ref="refTable"
              height="600"
              @row-click="handleRowClick">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="storeName" label="店铺名称"></el-table-column>
      <el-table-column prop="country" label="国家"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="state" label="状态"></el-table-column>
      <el-table-column prop="emailPower" label="邮箱权限"></el-table-column>
      <el-table-column prop="creatTime" label="创建时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-dropdown @command="FnCommand">
            <el-button type="primary">
              编辑<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="{ type:'delete', data:scope.row }">暂停同步</el-dropdown-item>
              <el-dropdown-item :command="{ type:'delete', data:scope.row }">删除邮箱</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
export default {
    name: "AdjustEntity", //店铺核算主体

    data(){
     return{
       searchForm:{

       },
       btnState:{
         btnImport:false,
       },
       tableArr:[
         {
           storeName:'店铺1',
           country:'美国',
           email:'1007@qq.com',
           emailPower:'1',
           state:'1',
           creatTime:'2020-01-06',
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
        // this.$refs.refTable.toggleRowSelection(row);
      },

      FnBtnAddShow(){},

      /*切换*/
      FnSwitch(val){
        console.log(val);
      },

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
