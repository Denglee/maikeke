<template>
   <div class="public-main">
      <el-button icon="el-icon-folder-add" @click="FnBtnAdd" :loading="btnUnit.btnAdd" class="public-btn">
         新增国家
      </el-button>
      <el-table class="public-table" border
                v-loading= 'btnUnit.loadTable'
                :data="tableArr"
                ref="refTable"
                height="600">
         <el-table-column type="selection"></el-table-column>
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
                     <el-dropdown-item :command="{ type:'update', data:scope.row }">修改</el-dropdown-item>
                     <el-dropdown-item :command="{ type:'delete', data:scope.row }">删除</el-dropdown-item>
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
                 :visible.sync="diaUnit.diaAddSite"
                 custom-class="public-dialog"
                 :close-on-click-modal="false"
                 @close='FnCloseAddSite'
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
               <el-button type="primary" @click="diaUnit.diaAddSite = false;" :loading="btnUnit.btnCancelSite">取消
               </el-button>
               <el-button type="primary" @click="FnBtnSaveAddSite('RefAddSiteForm')" :loading="btnUnit.btnSubmitSite">
                  保存</el-button>
            </el-form-item>
         </el-form>
      </el-dialog>
   </div>
</template>

<script>

import {listUnit, addUnit, updateUnit, getUnit, delUnit, delDict} from '@/assets/js/api'

export default {
   name: "CountryManage",
   data() {
      return {
         pageArr: {
            pageNum: 1,
            total: 20,
            pageSize: 10,
         },
         diaUnit: {
            diaAddSite: false,
         },
         btnUnit: {
            loadTable:true,
            btnAdd: false,
            btnCancelSite: false,
            btnSubmitSite: false,
         },

         /*添加表单*/
         addSiteForm: {},
         diaTitle: '添加国家',
         tableArr: [],
      }
   },
   methods: {
      FnGetListUnit() {
         listUnit().then(res => {
            this.btnUnit.loadTable = false;
            console.log(res);
            this.tableArr = res.data;
            this.pageArr.total = res.total;
         })
      },

      /*添加*/
      FnBtnAdd() {
         this.addSiteForm = {};
         this.diaUnit.diaAddSite = true;
         this.diaTitle = '添加国家';
         this.GLOBAL.btnUnitChange(this, 'btnUnit', 'btnAdd');
      },

      /*删除站点 方法*/
      FnDelUnit(statename,stateIds){
         let that = this;
         this.$confirm('是否确认删除' + statename + ' 的数据项?', "警告", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
         }).then(function() {
            delUnit(stateIds).then(res=>{
               console.log(res);
               that.$message(res.msg);
            })
         })

      },
      /*表格操作*/
      FnCommand(val) {
         console.log(val);
         let that = this;
         /*删除*/
         if(val.type == 'delete'){
            let statename = val.data.englishName;
            let stateIds = val.data.stateId;
            that.FnDelUnit(statename,stateIds);
         }

         /*修改*/
         if(val.type == 'update'){
            this.addSiteForm = val.data;
            this.diaUnit.diaAddSite = true;
            this.diaTitle = "修改国家";
         }
      },

      /*关闭*/
      FnCloseAddSite() {

      },

      /*保存添加、修改*/
      FnBtnSaveAddSite() {
         let stateId = this.addSiteForm.stateId;
         console.log(stateId);
         this.GLOBAL.btnUnitChange(this, 'btnUnit', 'btnSubmitSite');
         if(stateId){
            /*有 stateId， 则修改*/
            updateUnit(this.addSiteForm).then(res => {
               console.log(res);
            })
         }else{
            /*没有 stateId，则添加*/
            addUnit(this.addSiteForm).then(res => {
               console.log(res);
            })
         }


      },

      /*分页 */
      FaPageCurrent(page) {
         console.log(page);
         // this.staffPage = page;
         // this.getStaffIndex();
      },
      FaSizeChange(size) {
         console.log(size);
      },
   },
   created() {
      this.FnGetListUnit();
   },
}
</script>
