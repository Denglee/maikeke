<template>
   <div class="public-main">
      <el-form class="public-form" @submit.native.prevent>
         <el-input v-model="FormSearch.rateName" placeholder="请输入名称" autocomplete="off" clearable
                   class="public-input">
         </el-input>
         <el-button icon="el-icon-search" :loading="btnState.btnSearch" @click="FnSearchShop" class="public-btn">搜索
         </el-button>

         <div class="formR-main">
            <el-button icon="el-icon-folder-add" @click="FnBtnAdd" :loading="btnState.btnAdd" class="public-btn">新增汇率
            </el-button>
            <!--            <el-button icon="el-icon-folder-add" @click="FnBtnExport" :loading="btnState.btnExport" class="public-btn">-->
            <!--               导出-->
            <!--            </el-button>-->
         </div>
      </el-form>

      <el-table class="public-table" border
                :data="tableArr"
                ref="refTable"
                height="600"
                v-loading="btnState.loadTable">
         <el-table-column type="index" label="序号"></el-table-column>
         <el-table-column prop="rateNum" label="货币代码"></el-table-column>
         <el-table-column prop="symbol" label="符号"></el-table-column>
         <el-table-column prop="rateName" label="货币名称"></el-table-column>
         <el-table-column prop="officialExchangeRate">
            <template slot-scope="scope" slot="header">
               <el-tooltip placement="top">
                  <span class='tr-tooltip'>官方汇率 <i class="el-icon-question"></i></span>
                  <div slot="content">官方汇率取自于中国银行外汇牌价的中行折算价，每天凌晨更新一次，历史月份保留当月最后一天的汇率</div>
               </el-tooltip>
            </template>
         </el-table-column>
         <el-table-column prop="localExchangeRate" label="我的汇率">
            <template slot-scope="scope" slot="header">
               <el-tooltip placement="top">
                  <span class='tr-tooltip'>我的汇率 <i class="el-icon-question"></i></span>
                  <div slot="content">系统按照【我的汇率】进行币种换算,非月报数据取最新月份的汇率</div>
               </el-tooltip>
            </template>
         </el-table-column>
         <el-table-column prop="updateTime" label="修改时间">
            <template slot-scope="scope" slot="header">
               <el-tooltip placement="top">
                  <span class='tr-tooltip'>修改时间 <i class="el-icon-question"></i></span>
                  <div slot="content">本月修改【我的汇率】的时间</div>
               </el-tooltip>
            </template>
         </el-table-column>
         <el-table-column prop="remark" label="备注"></el-table-column>

         <el-table-column label="操作">
            <template slot-scope="scope">
               <el-dropdown @command="FnCommand">
                  <el-button type="primary">
                     操作<i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                     <el-dropdown-item :command="{ type:'delete', data:scope.row }">删除</el-dropdown-item>
                     <el-dropdown-item :command="{ type:'update', data:scope.row }">修改</el-dropdown-item>
                     <!--<el-dropdown-item :command="{ type:'detail', data:scope.row }">查看详情</el-dropdown-item>-->
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
                 :visible.sync="diaState.diaAddRate"
                 custom-class="public-dialog"
                 :close-on-click-modal="false"
                 width="800px">
         <el-form :model="addSiteForm" ref="RefAddSiteForm" label-width="156px" class="public-diaForm">
            <el-form-item label="汇率名称：" prop="rateName">
               <el-input type="text" v-model="addSiteForm.rateName" autocomplete="off" clearable
                         placeholder="汇率名称"></el-input>
            </el-form-item>
            <el-form-item label="汇率代码：" prop="rateNum">
               <el-input type="text" v-model="addSiteForm.rateNum" autocomplete="off" clearable
                         placeholder="汇率代码"></el-input>
            </el-form-item>
            <el-form-item label="汇率符号：" prop="symbol">
               <el-input type="text" v-model="addSiteForm.symbol" autocomplete="off" clearable
                         placeholder="汇率符号"></el-input>
            </el-form-item>
            <el-form-item label="官方汇率：" prop="officialExchangeRate">
               <el-input type="text" v-model="addSiteForm.officialExchangeRate" autocomplete="off" clearable
                         placeholder="官方汇率"></el-input>
            </el-form-item>
            <el-form-item label="我的汇率：" prop="localExchangeRate">
               <el-input type="text" v-model="addSiteForm.localExchangeRate" autocomplete="off" clearable
                         placeholder="我的汇率"></el-input>
            </el-form-item>
            <el-form-item label="备注：" prop="remark">
               <el-input type="text" v-model="addSiteForm.remark" autocomplete="off" clearable
                         placeholder="备注"></el-input>
            </el-form-item>

            <el-form-item class="alignR">
               <el-button type="primary" @click="diaState.diaAddRate = false;" :loading="btnState.btnCancelSite">取消
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
import {addRate, delRate, listRate, updateRate, listApply} from '@/assets/js/api'

export default {
   name: "ExchangeManage",
   data() {
      return {
         pageArr: {
            pageNum: 1,
            total: 20,
            pageSize: 10,
         },
         diaState: {
            diaAddRate: false,
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
         diaTitle: '添加',
         tableArr: [],
         FormSearch: {},

      }
   },
   methods: {
      FnGetRate() {
         listRate({
            pageSize: this.pageArr.pageSize,
            pageNum: this.pageArr.pageNum,
            rateName: this.FormSearch.rateName,
         }).then(res => {
            console.log(res);
            this.tableArr = res.data;
            this.pageArr.total = res.total;
            this.btnState.loadTable = false;
         }).catch(res => {
            this.btnState.loadTable = false;
         })
      },
      FnSearchShop() {
         this.GLOBAL.btnStateChange(this, 'btnState', 'btnSearch');
         this.FnGetRate();
      },
      /*添加*/
      FnBtnAdd() {
         this.addSiteForm = {};
         this.diaState.diaAddRate = true;
         this.diaTitle = '添加汇率';
         this.GLOBAL.btnStateChange(this, 'btnState', 'btnAdd');
      },

      /*删除站点 方法*/
      FnDelRate(RateName, RateIds) {
         let that = this;
         this.$confirm('是否确认删除' + RateName + '?', "警告", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
         }).then(function () {
            delRate(RateIds).then(res => {
               console.log(res);
               that.$message.success(res.msg);
               that.FnGetRate();
            })
         })

      },
      /*表格操作*/
      FnCommand(val) {
         console.log(val);
         let that = this;
         /*删除*/
         if (val.type == 'delete') {
            console.log(val.data);
            let Ratename = val.data.rateName;
            let RateIds = val.data.rateId;

            console.log(Ratename);
            console.log(RateIds);
            that.FnDelRate(Ratename, RateIds);
         }

         /*修改*/
         if (val.type == 'update') {
            this.addSiteForm = Object.assign({}, val.data);
            this.diaState.diaAddRate = true;
            this.diaTitle = "修改汇率";
         }
      },

      /*保存添加、修改*/
      FnBtnSaveAddSite() {
         let RateId = this.addSiteForm.rateId;
         console.log(RateId);
         this.GLOBAL.btnStateChange(this, 'btnState', 'btnSubmitSite');
         if (RateId) {
            /*有 RateId， 则修改*/
            updateRate(this.addSiteForm).then(res => {
               console.log(res);
               this.diaState.diaAddRate = false;
               this.$message.success(res.msg);
               this.FnGetRate();
            })
         } else {
            /*没有 RateId，则添加*/
            addRate(this.addSiteForm).then(res => {
               console.log(res);
               this.diaState.diaAddRate = false;
               this.$message.success(res.msg);
               this.FnGetRate();
            })
         }
      },

      /*分页 */
      FaPageCurrent(page) {
         this.pageArr.pageNum = page;
         this.FnGetRate();
      },
      FaSizeChange(size) {
         this.pageArr.pageSize = size;
         this.FnGetRate();
      },


   },
   created() {
      this.FnGetRate();
   },
}
</script>
