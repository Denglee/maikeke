<template>
  <div class="public-main">
    <el-form :model="roleForm" class="addForm-box"  ref="refRoleForm"
             label-width="120px" label-position="left" :inline="true">
      <el-form-item label="关键词" prop="name">
        <el-input v-model="roleForm.name" autocomplete="off" placeholder="请输入关键词" clearable></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="postStaffAdd('role')">提交</el-button>
      </el-form-item>
    </el-form>

    <el-table class="public-table" border
              :data="tableArr"
              @selection-change="checkedStore"
              ref="refTable"
              height="600"
              @row-click="handleRowClick">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="storeName" label="页面编号"></el-table-column>
      <el-table-column prop="storeNum" label="页面路径"></el-table-column>
      <el-table-column prop="creat_time" label="页面类型"></el-table-column>
      <el-table-column prop="storeFinance" label="数据权限状态">
        <template slot-scope="scope">
          <el-switch
              v-model="scope.row.storeFinance"
              active-value="1"
              inactive-value="0"
              active-text="开"
              inactive-text="关"
              @change='FnSwitch(scope.row.storeFinance)'>
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-dropdown @command="FnCommand">
            <el-button type="primary">
              编辑<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="{ type:'delete', data:scope.row }">删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
export default {
  name: "File", //文档管理
  data(){
    return{
      roleForm:{

      },

      searchForm:{

      },
      btnState:{
        btnImport:false,
      },
      tableArr:[
        {
          img:'',
          storeName:'APP_YMZ',
          storeNum:'跨境电商业务系统',
          storeFinance:'1',
          creat_time:'2020-01-06',
          creater:'muzi',
        },
        {
          img:'',
          storeName:'APP_REVIEW',
          storeNum:'留评系统',
          storeFinance:'0',
          creat_time:'2020-01-06',
          creater:'muzi',
        }
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
