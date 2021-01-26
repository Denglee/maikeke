<template>
  <div class="public-main">

    <div class="alignR">
      <el-button icon="el-icon-circle-plus-outline" @click="FnBtnAddShow" class="public-btn">创建店铺核算主体</el-button>
      <el-button icon="el-icon-circle-plus-outline" @click="FnBtnAddShow" class="public-btn">批量删除</el-button>
      <el-button icon="el-icon-folder-add" @click="FnBtnAddShow" :loading="btnState.btnImport" class="public-btn">导入</el-button>
    </div>

    <el-table class="public-table" border
              :data="tableArr"
              @selection-change="checkedStore"
              ref="refTable"
              height="600"
              @row-click="handleRowClick">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="storeName" label="主体名称"></el-table-column>
      <el-table-column prop="storeNum" label="主体编号"></el-table-column>
      <el-table-column prop="storeFinance" label="财务对接状态">
        <template slot-scope="scope">
          <el-switch
              v-model="scope.row.storeFinance"
              active-value="1"
              inactive-value="0"
              active-text="开启"
              inactive-text="关闭"
              @change='FnSwitch(scope.row.storeFinance)'>
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="creat_time" label="创建时间"></el-table-column>
      <el-table-column prop="creater" label="创建人"></el-table-column>
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
           storeName:'主体1',
           storeNum:'MK1',
           storeFinance:'1',
           creat_time:'2020-01-06',
           creater:'muzi',
         },
         {
           storeName:'主体2',
           storeNum:'MK2',
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
