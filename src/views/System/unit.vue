<template>
   <div class="public-main">
      <el-form class="public-form" @submit.native.prevent>
         <el-input v-model="FormSearch.unitName" placeholder="请输入名称" autocomplete="off" clearable
                   class="public-input">
         </el-input>
         <el-button icon="el-icon-search" :loading="btnState.btnSearch" @click="FnSearchShop" class="public-btn">搜索
         </el-button>

         <div class="formR-main">
            <el-button icon="el-icon-folder-add" @click="FnBtnAdd" :loading="btnState.btnAdd" class="public-btn">
               新增单位
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
         <el-table-column prop="unitNum" label="单位编号"></el-table-column>
         <el-table-column prop="unitName" label="单位名称"></el-table-column>
         <el-table-column prop="orderNum" label="排序"></el-table-column>
         <el-table-column prop="status" label="状态">
            <template slot-scope="{row}">
               <el-switch
                  v-model="row.status"
                  active-value="0"
                  inactive-value="1"
                  active-text="正常"
                  inactive-text="停用"
                  @change='FnSwitchState(row)'>
               </el-switch>
            </template>
         </el-table-column>

         <el-table-column label="操作">
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
                 :visible.sync="diaState.diaAddUnit"
                 custom-class="public-dialog"
                 :close-on-click-modal="false"
                 width="800px">
         <el-form :model="addSiteForm" ref="RefAddSiteForm" label-width="156px" class="public-diaForm">
            <el-form-item label="单位名称：" prop="unitName">
               <el-input type="text" v-model="addSiteForm.unitName" autocomplete="off" clearable
                         placeholder="单位名称"></el-input>
            </el-form-item>
            <el-form-item label="单位编号：" prop="unitNum">
               <el-input type="text" v-model="addSiteForm.unitNum" autocomplete="off" clearable
                         placeholder="单位编号"></el-input>
            </el-form-item>
            <el-form-item label="显示排序：" prop="orderNum">
               <el-input-number v-model="addSiteForm.orderNum" controls-position="right" :min="0"/>
            </el-form-item>
            <el-form-item label="状态：" prop="status">
               <el-radio v-model="addSiteForm.status" label="0">正常</el-radio>
               <el-radio v-model="addSiteForm.status" label="1">停用</el-radio>
            </el-form-item>

            <el-form-item class="alignR">
               <el-button type="primary" @click="diaState.diaAddUnit = false;" :loading="btnState.btnCancelSite">取消
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
import {addUnit, delUnit, listUnit, updateUnit} from '@/assets/js/api'

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
            diaAddUnit: false,
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
         FormSearch:{},
      }
   },
   methods: {
      /*单位列表 api*/
      FnGetUnit() {
         listUnit({
            pageSize: this.pageArr.pageSize,
            pageNum: this.pageArr.pageNum,
            unitName: this.FormSearch.unitName,
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
         this.diaState.diaAddUnit = true;
         this.diaTitle = '添加单位';
         this.GLOBAL.btnStateChange(this, 'btnState', 'btnAdd');
      },

      FnSearchShop() {
         this.GLOBAL.btnStateChange(this, 'btnState', 'btnSearch');
         this.FnGetUnit();
      },

      /*删除 方法*/
      FnDelUnit(UnitName, UnitIds) {
         let that = this;
         this.$confirm('是否确认删除' + UnitName + '?', "警告", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
         }).then(function () {
            delUnit(UnitIds).then(res => {
               console.log(res);
               that.$message.success(res.msg);
               that.FnGetUnit();
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
            let Unitname = val.data.unitName;
            let UnitIds = val.data.unitId;

            console.log(Unitname);
            console.log(UnitIds);
            that.FnDelUnit(Unitname, UnitIds);
         }

         /*修改*/
         if (val.type == 'update') {
            this.addSiteForm = Object.assign({}, val.data);

            this.diaState.diaAddUnit = true;
            this.diaTitle = "修改单位";
         }
      },

      /*状态切换*/
      FnSwitchState(val) {
         this.addSiteForm = Object.assign({}, val);
         this.FnUpdateApply();
      },

      /*状态 更新api*/
      FnUpdateApply() {
         updateUnit(this.addSiteForm).then(res => {
            console.log(res);
            this.diaState.diaAddUnit = false;
            this.$message.success(res.msg);
            this.FnGetUnit();
         })
      },

      /*保存添加、修改*/
      FnBtnSaveAddSite() {
         let UnitId = this.addSiteForm.unitId;
         console.log(UnitId);
         this.GLOBAL.btnStateChange(this, 'btnState', 'btnSubmitSite');
         if (UnitId) {
            /*有 UnitId， 则修改*/
            this.FnUpdateApply();
         } else {
            /*没有 UnitId，则添加*/
            addUnit(this.addSiteForm).then(res => {
               console.log(res);
               this.diaState.diaAddUnit = false;
               this.$message.success(res.msg);
               this.FnGetUnit();
            })
         }
      },

      /*分页 */
      FaPageCurrent(page) {
         this.pageArr.pageNum = page;
         this.FnGetUnit();
      },
      FaSizeChange(size) {
         this.pageArr.pageSize = size;
         this.FnGetUnit();
      },

   },
   created() {
      this.FnGetUnit();
   },
}
</script>
