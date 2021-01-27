<template>
   <div class="public-main">
      <el-form :model="FormSearch" class="public-form" ref="refRoleForm" @submit.native.prevent
               label-width="120px" label-position="left" :inline="true">
         <el-form-item label="关键词" prop="name">
            <el-input v-model="FormSearch.name" class="public-input" autocomplete="off" placeholder="请输入"
                      clearable></el-input>
         </el-form-item>
         <el-form-item label="名称2" prop="sex" :rules="{ required: true, message: '站点', trigger: 'blur' }">
            <el-input v-model="FormSearch.sex" class="public-input" autocomplete="off" placeholder="请输入"
                      clearable></el-input>
         </el-form-item>

         <el-form-item label="select 单选：" prop="name">
            <el-select v-model="FormSearch.project" value.key="id" filterable clearable placeholder="请选择店铺负责人"
                       class="public-selectFull" @change="changeSel"
                       :rules="{ required: true, message: '店铺负责人', trigger: 'change' }">
               <el-option v-for="(item, index) in projectArr" :key="index"
                          :value="item.value"
                          :label="item.label">
               </el-option>
            </el-select>
         </el-form-item>

         <el-form-item label="select 多选：" prop="name">
            <el-select v-model="FormSearch.project2" filterable multiple clearable collapse-tags
                       popper-class="elSelect-checkbox" class="public-select">
               <el-option v-for="(item, index) in projectArr"
                          :key="index"
                          :value="item.value"
                          :label="item.label">
                  <span class="check"></span>
                  <span style="margin-left: 8px">{{ item.label }}</span>
               </el-option>
            </el-select>
         </el-form-item>

         <el-form-item label="登录时间" prop="loginTime">
            <el-date-picker
               class="public-datePicker"
               v-model="FormSearch.order_time"
               type="daterange"
               unlink-panels
               range-separator="-"
               start-placeholder="开始日期"
               end-placeholder="结束日期"
               value-format="yyyy-MM-dd">
            </el-date-picker>
         </el-form-item>

         <el-form-item>
            <el-button type="primary" class="public-btn" :loading="btnState.btnPost"
                       @click="FnPostSearch('refRoleForm')">提交
            </el-button>
         </el-form-item>

         <div class="formR-main">
            <el-button type="primary" class="public-btn" :loading="btnState.btnSavaASIN"
                       @click="diaState.diaAddASIN = true">添加ASIN
            </el-button>
         </div>

      </el-form>

      <el-table class="public-table" border
                :data="tableArr"
                @selection-change="checkedStore"
                ref="refTable"
                height="600"
                @row-click="handleRowClick">
         <el-table-column type="selection"></el-table-column>
         <el-table-column type="index" label="序号"></el-table-column>
         <el-table-column prop="storeName" label="页面编号"></el-table-column>
         <el-table-column prop="storeNum" label="页面路径"></el-table-column>
         <el-table-column prop="creat_time" label="页面类型"></el-table-column>
         <el-table-column prop="state" label="数据权限状态">
            <template slot-scope="scope">
               <el-switch
                  v-model="scope.row.state"
                  active-value="1"
                  inactive-value="0"
                  active-text="开"
                  inactive-text="关"
                  @change='FnSwitch(scope.row.state)'>
               </el-switch>
            </template>
            <!--      <template slot-scope="scope">
                      <span v-for="(index,item) in projectArr" :key="index">
                        <span v-if="item.id == scope.row.state">{{item.name}}</span>
                      </span>
                    </template>-->
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

      <!--分页-->
      <el-pagination
         background
         layout="total, prev, pager, next, sizes, jumper"
         :page-sizes="[10, 20, 50, 100]"
         :total="pageArr.total"
         :page-size="pageArr.pageSize"
         :current-page="pageArr.pageNum"
         @size-change='sizeChange'
         @current-change="PageCurrent">
      </el-pagination>

      <!--添加授权店铺信息  -->
      <el-dialog :append-to-body="true"
                 title="添加页面"
                 :visible.sync="diaState.diaAdd"
                 custom-class="public-dialog"
                 :close-on-click-modal="false"
                 @close='FnCloseAdd'
                 width="800px">
         <el-form :model="FormAdd" ref="RefAddForm" label-width="136px" class="public-diaForm">
            <!--        <div class="form-subTitle">店铺信息</div>-->
            <el-form-item label="店铺账号名称：" prop="storeName"
                          :rules="{ required: true, message: '请输入店铺账号名称', trigger: 'blur' }">
               <el-input type="text" v-model="FormAdd.storeName" autocomplete="off" clearable
                         placeholder="用于卖家区分各个账号"></el-input>
            </el-form-item>
         </el-form>
      </el-dialog>

   </div>
</template>

<script>
export default {
   name: "LogLogin", //文档管理
   data() {
      return {
         pageArr: {
            total: 100,  //总条数
            pageSize: 20, //每页个数
            pageNum: 1, //当前页数
         },
         FormSearch: {},
         FormAdd: {},

         diaState: {},

         btnState: {
            btnImport: false,
            btnPost: false,
         },

         projectArr: [
            {
               id: '1',
               value: 'shop1',
               label: '店铺1',
            },
            {
               id: '2',
               value: 'shop2',
               label: '店铺2',
            },
         ],
         tableArr: [
            {
               img: '',
               storeName: 'APP_REVIEW',
               storeNum: '留评系统',
               state: '0',
               creat_time: '2020-01-06',
               creater: 'muzi',
            }
         ],
      }
   },
   methods: {
      /* 1、 编辑选中  */
      checkedStore(val) {
         console.log(val);
         this.checkedRows = val;
      },
      /*点击行触发，选中或不选中复选框 */
      handleRowClick(row, column, event) {
         this.$refs.refTable.toggleRowSelection(row);
      },

      /* el-select change */
      changeSel(val) {
         if (val) {
            let obj = {};
            obj = this.storeArr.find((item) => {
               return item.storeName == val;//筛选出匹配数据
            });
            console.log(obj.sellerId);//我这边的name就是对应label的
         }
      },

      /*切换*/
      FnSwitch(val) {
         console.log(val);
      },

      postStaffAdd() {
      },

      /*表格 tr 操作 */
      FnCommand(val) {
         let data = val.data;
         console.log(data);

         /*更新店铺授权*/
         if (val.type == 'delete') {
            console.log('delete');
         }
      },

      /*分页*/
      PageCurrent(page) {
         // console.log(page)
         this.pageArr.pageNum = page;
         // this.getStaffIndex();
      },
      sizeChange(size){
         // console.log(size);
         this.pageArr.pageSize = size;
      },

      /*搜索事件*/
      FnPostSearch(formName) {
         this.GLOBAL.btnStateChange(this, 'btnState', 'btnPost');
         console.log(this.FormSearch);

         // this.$refs[formName].validate((valid) => {
         //   this.GLOBAL.btnStateChange(this, 'btnState', 'btnAddSon');
         //   if (valid) {
         //     console.log(this);
         //   }
         // })
      },

      /* 添加 取消  */
      FnCloseAdd() {
         this.GLOBAL.btnStateChange(this, 'btnState', 'btnCancel')
         // this.diaState.diaAdd = false;
         // this.$refs['RefAddForm'].resetFields();
      },

   },
   created() {

   },
}
</script>
