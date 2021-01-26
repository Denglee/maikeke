<template>
    <div>

      <div class="flex-between">
        <el-form>
          <el-input v-model="searchForm.trueName" placeholder="搜索用户名或者真实姓名" autocomplete="off" clearable
                    @keyup.enter.native = "FnSearchShop">
            <i slot="suffix" class="el-input__icon el-icon-search" @click="FnSearchShop"></i>
          </el-input>
        </el-form>
        <div>
          <el-button icon="el-icon-folder-add" @click="FnAddRole" :loading="btnState.btnAddRole" size="mini" class="public-btn">创建角色</el-button>
          <el-button icon="el-icon-folder-add" @click="FnDisatributeList" :loading="btnState.btnDisatribute" size="mini" class="public-btn">批量分配店铺</el-button>
          <el-button icon="el-icon-folder-add" @click="FnRemove" :loading="btnState.btnRemove" size="mini" class="public-btn">批量移除</el-button>
        </div>
      </div>

      <el-table class="public-table" border
                :data="tableArr"
                @selection-change="checkedStore"
                ref="refTable"
                @row-click="handleRowClick">

        <el-table-column type="selection""></el-table-column>
        <el-table-column prop="userName" label="用户名"></el-table-column>
        <el-table-column prop="trueName" label="真实姓名"></el-table-column>
        <el-table-column prop="tel" label="手机号"></el-table-column>
        <el-table-column prop="store" label="可查看的店铺">
          <template slot-scope="scope">
            <span v-if="scope.row.store == 1">已分配</span>
            <span v-else>未分配</span>
          </template>
        </el-table-column>
        <el-table-column prop="product" label="可查看的产品">
          <template slot-scope="scope">
            <span v-if="scope.row.product == 1">已分配</span>
            <span v-else>未分配</span>
          </template>
        </el-table-column>
        <el-table-column prop="email" label="可查看的店铺邮箱">
          <template slot-scope="scope">
            <span v-if="scope.row.email == 1">已分配</span>
            <span v-else>未分配</span>
          </template>
        </el-table-column>

        <el-table-column  label="操作">
            <template slot-scope="scope">
              <el-button @click="FnBtnDistribute(scope.row)">分配店铺</el-button>
              <el-button @click="FnBtnDistribute(scope.row)">移除</el-button>
            </template>
        </el-table-column>
      </el-table>

    </div>
</template>

<script>
export default {
    name: "RoleUsers",
    props:{
      checkID:{
        type: String,
      }
    },

    data(){
     return{
       btnState:{
         btnAddRole:false,
         btnDisatribute:false,
         btnRemove:false,
       },

       searchForm:{
         trueName:'',
       },

       tableArr: [
         {
           userName:'MK001',
           trueName:'王小宝',
           tel:'17688829444',
           store:'1',
           product:'1',
           email:'1',
         }
       ],    //table数据
     }
    },
    methods:{
      /*搜索用户名或者真实姓名 */
      FnSearchShop() {
        console.log(this.searchForm.storeName);
      },

      /*添加用户*/
      FnAddRole(){},

      /*批量分配店铺*/
      FnDisatributeList(){},

      /*批量移除*/
      FnRemove(){},

      /* 1、 编辑选中  */
      checkedStore(val) {
        console.log(val);
        this.checkedRows = val;
      },
      /*点击行触发，选中或不选中复选框 */
      handleRowClick(row, column, event) {
        // this.$refs.refTable.toggleRowSelection(row);
      },

      /*分配*/
      FnBtnDistribute(val){
        console.log(val);
      },

    },
    created(){
    
    },
}
</script>
