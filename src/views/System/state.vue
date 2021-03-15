<template>
   <div class="public-main">
      <el-form class="public-form" @submit.native.prevent>
         <el-input v-model="FormSearch.stateName" placeholder="请输入名称" autocomplete="off" clearable
                   class="public-input">
         </el-input>
         <el-button icon="el-icon-search" :loading="btnState.btnSearch" @click="FnSearchShop" class="public-btn">搜索
         </el-button>

         <div class="formR-main">
            <el-button icon="el-icon-folder-add" @click="FnBtnAdd" :loading="btnState.btnAdd" class="public-btn">
               新增国家
            </el-button>
            <!--            <el-button icon="el-icon-folder-add" @click="FnBtnExport" :loading="btnState.btnExport" class="public-btn">-->
            <!--               导出-->
            <!--            </el-button>-->
         </div>
      </el-form>

      <el-table class="public-table" border
                v-loading='btnState.loadTable'
                :data="tableArr"
                ref="refTable"
                height="600">
         <el-table-column prop="stateId" label="ID"></el-table-column>
         <el-table-column prop="stateName" label="国家名称"></el-table-column>
         <el-table-column prop="twoForShort" label="二位字母"></el-table-column>
         <el-table-column prop="threeForShort" label="三位字母"></el-table-column>
         <el-table-column prop="code" label="数字代号"></el-table-column>
         <el-table-column prop="englishName" label="ios英文用名"></el-table-column>
         <el-table-column prop="isoCode" label="ios 3166-2 相应代码" width="134px"></el-table-column>
         <el-table-column prop="taiwanName" label="台湾惯用名"></el-table-column>
         <el-table-column prop="hongkongName" label="香港惯用名"></el-table-column>
         <el-table-column prop="orderNum" label="排序"></el-table-column>
         <el-table-column prop="remark" label="备注"></el-table-column>
         <el-table-column prop="endTime" label="操作">
            <template slot-scope="scope">
               <el-dropdown @command="FnCommand">
                  <el-button type="primary">
                     操作<i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                     <el-dropdown-item :command="{ type:'delete', data:scope.row }">删除</el-dropdown-item>
                     <el-dropdown-item :command="{ type:'update', data:scope.row }">修改</el-dropdown-item>
                     <!--              <el-dropdown-item :command="{ type:'detail', data:scope.row }">查看详情</el-dropdown-item>-->

                  </el-dropdown-menu>
               </el-dropdown>
            </template>
         </el-table-column>
      </el-table>

      <Pagination
         :pageNum="pageArr.pageNum"
         :total="pageArr.total"
         :pageSize="pageArr.pageSize"
         @SonSizeChange='FaSizeChange'
         @SonCurrentChange="FaPageCurrent"></Pagination>

      <!--添加\编辑区域站点 -->
      <el-dialog :append-to-body="true"
                 :title="diaTitle"
                 :visible.sync="diaState.diaAddSite"
                 custom-class="public-dialog"
                 :close-on-click-modal="false"
                 width="800px">
         <el-form :model="addSiteForm" ref="RefAddSiteForm" label-width="156px" class="public-diaForm">
            <el-form-item label="国家名称：" prop="stateName">
               <el-input type="text" v-model="addSiteForm.stateName" autocomplete="off" clearable
                         placeholder="国家名称"></el-input>
            </el-form-item>
            <el-form-item label="二位字母：" prop="twoForShort">
               <el-input type="text" v-model="addSiteForm.twoForShort" autocomplete="off" clearable
                         placeholder="二位字母"></el-input>
            </el-form-item>
            <el-form-item label="三位字母：" prop="threeForShort">
               <el-input type="text" v-model="addSiteForm.threeForShort" autocomplete="off" clearable
                         placeholder="三位字母"></el-input>
            </el-form-item>
            <el-form-item label="数字代号：" prop="code">
               <el-input type="text" v-model="addSiteForm.code" autocomplete="off" clearable
                         placeholder="数字代号"></el-input>
            </el-form-item>

            <el-form-item label="ios英文用名：" prop="englishName">
               <el-input type="text" v-model="addSiteForm.englishName" autocomplete="off" clearable
                         placeholder="ios英文用名"></el-input>
            </el-form-item>
            <el-form-item label="ISO 3166-2相应代码：" prop="isoCode">
               <el-input type="text" v-model="addSiteForm.isoCode" autocomplete="off" clearable
                         placeholder="ISO 3166-2相应代码"></el-input>
            </el-form-item>
            <el-form-item label="台湾惯用名：" prop="taiwanName">
               <el-input type="text" v-model="addSiteForm.taiwanName" autocomplete="off" clearable
                         placeholder="台湾惯用名"></el-input>
            </el-form-item>
            <el-form-item label="香港惯用名：" prop="hongkongName">
               <el-input type="text" v-model="addSiteForm.hongkongName" autocomplete="off" clearable
                         placeholder="香港惯用名"></el-input>
            </el-form-item>
            <el-form-item label="排序：" prop="orderNum">
               <el-input-number v-model="addSiteForm.orderNum" controls-position="right" :min="0"></el-input-number>
            </el-form-item>
            <el-form-item label="备注：" prop="remark">
               <el-input type="text" v-model="addSiteForm.remark" autocomplete="off" clearable
                         placeholder="备注"></el-input>
            </el-form-item>

            <el-form-item class="alignR">
               <el-button type="primary" @click="diaState.diaAddSite = false;" :loading="btnState.btnCancelSite">取消
               </el-button>
               <el-button type="primary" @click="FnBtnSaveAddSite('RefAddSiteForm')" :loading="btnState.btnSubmitSite">
                  保存
               </el-button>
            </el-form-item>
         </el-form>
      </el-dialog>
   </div>
</template>

<script>

import {listState, addState, updateState, getState, delState, delDict} from '@/assets/js/api'

export default {
   name: "CountryManage",
   data() {
      return {
         pageArr: {
            pageNum: 1,
            total: 20,
            pageSize: 10,
         },
         diaState: {
            diaAddSite: false,
         },
         btnState: {
            loadTable: true,
            btnAdd: false,
            btnCancelSite: false,
            btnSubmitSite: false,
            btnSearch: false,
         },

         /*添加表单*/
         addSiteForm: {},
         diaTitle: '添加国家',
         tableArr: [],
         FormSearch:{},
      }
   },
   methods: {
      FnGetListState() {
         listState({
            pageSize: this.pageArr.pageSize,
            pageNum: this.pageArr.pageNum,
            stateName: this.FormSearch.stateName,
         }).then(res => {
            this.btnState.loadTable = false;
            console.log(res);
            this.tableArr = res.data;
            this.pageArr.total = res.total;
         }).catch(res => {
            this.btnState.loadTable = false;
         })
      },

      /*添加*/
      FnBtnAdd() {
         this.addSiteForm = {};
         this.diaState.diaAddSite = true;
         this.diaTitle = '添加国家';
         this.GLOBAL.btnStateChange(this, 'btnState', 'btnAdd');
      },

      FnSearchShop() {
         console.log(this.FormSearch);
         this.GLOBAL.btnStateChange(this, 'btnState', 'btnSearch');
         this.FnGetListState();
      },

      /*删除站点 方法*/
      FnDelState(stateName, stateIds) {
         let that = this;
         this.$confirm('是否确认删除' + stateName + '?', "警告", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
         }).then(function () {
            delState(stateIds).then(res => {
               console.log(res);
               that.$message.success(res.msg);
               that.FnGetListState();
            })
         })

      },
      /*表格操作*/
      FnCommand(val) {
         console.log(val);
         let that = this;
         /*删除*/
         if (val.type == 'delete') {
            let statename = val.data.stateName;
            let stateIds = val.data.stateId;
            that.FnDelState(statename, stateIds);
         }

         /*修改*/
         if (val.type == 'update') {
            this.addSiteForm = Object.assign({}, val.data);
            this.diaState.diaAddSite = true;
            this.diaTitle = "修改国家";
         }
      },

      /*保存添加、修改*/
      FnBtnSaveAddSite() {
         let stateId = this.addSiteForm.stateId;
         console.log(stateId);
         this.GLOBAL.btnStateChange(this, 'btnState', 'btnSubmitSite');
         if (stateId) {
            /*有 stateId， 则修改*/
            updateState(this.addSiteForm).then(res => {
               console.log(res);
               this.$message.success(res.msg);
               this.FnGetListState();
               this.diaState.diaAddSite = false;
            })
         } else {
            /*没有 stateId，则添加*/
            addState(this.addSiteForm).then(res => {
               console.log(res);
               this.$message.success(res.msg);
               this.FnGetListState();
               this.diaState.diaAddSite = false;
            })
         }

      },

      /*分页 */
      FaPageCurrent(page) {
         this.pageArr.pageNum = page;
         this.FnGetListState();
      },
      FaSizeChange(size) {
         this.pageArr.pageSize = size;
         this.FnGetListState();
      },
   },
   created() {
      this.FnGetListState();
   },
}
</script>
