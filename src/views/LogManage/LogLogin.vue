<template>
   <div class="public-main">
      <el-form :model="FormSearch" class="public-form" ref="refRoleForm"
               label-width="80px" label-position="left" :inline="true">
         <el-form-item label="姓名" prop="userName">
            <el-input v-model="FormSearch.userName" autocomplete="off" class="public-input" placeholder="请输入"
                      clearable></el-input>
         </el-form-item>

         <el-form-item label="IP地址" prop="operIp">
            <el-input v-model="FormSearch.operIp" autocomplete="off" class="public-input" placeholder="请输入"
                      clearable></el-input>
         </el-form-item>

<!--         <el-form-item label="登录时间" prop="loginTime">-->
<!--            <el-date-picker-->
<!--               class="public-datePicker"-->
<!--               v-model="FormSearch.loginTime"-->
<!--               type="daterange"-->
<!--               unlink-panels-->
<!--               range-separator="-"-->
<!--               start-placeholder="开始日期"-->
<!--               end-placeholder="结束日期"-->
<!--               value-format="yyyy-MM-dd">-->
<!--            </el-date-picker>-->
<!--         </el-form-item>-->

         <el-form-item>
            <el-button type="primary" class="btn-public" :loading="btnState.btnPost" @click="postStaffAdd('role')">提交
            </el-button>
         </el-form-item>

      </el-form>

      <el-table class="public-table" border
                :data="tableArr"
                @selection-change="checkedStore"
                ref="refTable"
                height="600"
                @row-click="handleRowClick">
         <el-table-column type="selection" width="55" align="center"/>
         <el-table-column label="访问编号" align="center" prop="infoId"/>
         <el-table-column label="用户名称" align="center" prop="userName"/>
         <el-table-column label="登录地址" align="center" prop="ipaddr" width="130" :show-overflow-tooltip="true"/>
         <el-table-column label="登录地点" align="center" prop="loginLocation" :show-overflow-tooltip="true"/>
         <el-table-column label="浏览器" align="center" prop="browser"/>
         <el-table-column label="操作系统" align="center" prop="os"/>
         <el-table-column label="登录状态" align="center" prop="status">
            <template slot-scope="{row}">
               <span v-if="row.status == 0">正常</span>
               <span v-if="row.status == 1">异常</span>
            </template>
         </el-table-column>
         <el-table-column label="操作信息" align="center" prop="msg" width="120px"/>
         <el-table-column label="登录日期" align="center" prop="accessTime" width="180"></el-table-column>
      </el-table>

      <Pagination
         :pageNum="pageArr.pageNum"
         :total="pageArr.total"
         :pageSize="pageArr.pageSize"
         @SonSizeChange='FaSizeChange'
         @SonCurrentChange="FaPageCurrent"></Pagination>

   </div>
</template>

<script>
import {loginInfoList} from '@/assets/js/api'

export default {
   name: "LogLogin", //文档管理
   data() {
      return {
         FormSearch: {},
         pageArr: {
            pageNum: 1,
            total: 20,
            pageSize: 10,
         },

         btnState: {
            btnImport: false,
            btnPost: false,
         },

         tableArr: [],
      }
   },
   methods: {

      /*树table */
      FnGetLoginInfoList() {
         loginInfoList({
            pageSize: this.pageArr.pageSize,
            pageNum: this.pageArr.pageNum,
            userName: this.FormSearch.userName,
            operIp: this.FormSearch.operIp,
         }).then(res => {
            console.log(res);
            this.tableArr = res.data;
            this.pageArr.total = res.total;
         })
      },


      /* 1、 编辑选中  */
      checkedStore(val) {
         console.log(val);
         this.checkedRows = val;
      },
      /*点击行触发，选中或不选中复选框 */
      handleRowClick(row, column, event) {
         this.$refs.refTable.toggleRowSelection(row);
      },

      /*搜索*/
      postStaffAdd() {
         this.GLOBAL.btnStateChange(this,'btnState','btnPost');
         this.FnGetLoginInfoList();
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
      FaPageCurrent(page) {
         this.pageArr.pageNum = page;
         this.FnGetLoginInfoList();
      },
      FaSizeChange(size) {
         this.pageArr.pageSize = size;
         this.FnGetLoginInfoList();
      },

   },
   created() {
      this.FnGetLoginInfoList();
   },
}
</script>
