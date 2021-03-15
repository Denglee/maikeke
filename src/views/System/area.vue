<template>
   <div class="public-main">
      <el-form class="public-form" @submit.native.prevent>
         <el-input v-model="FormSearch.areaName" placeholder="请输入名称" autocomplete="off" clearable
                   class="public-input">
         </el-input>
         <el-button icon="el-icon-search" :loading="btnState.btnSearch" @click="FnSearchShop" class="public-btn">搜索</el-button>

         <div class="formR-main">
            <el-button icon="el-icon-folder-add" @click="FnBtnAdd" :loading="btnState.btnAdd" class="public-btn">
               新增区域
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
         <el-table-column prop="areaNum" label="区域代码"></el-table-column>
         <el-table-column prop="areaName" label="区域名称"></el-table-column>
         <el-table-column prop="areaForShort" label="区域简称"></el-table-column>
         <el-table-column prop="postcode" label="邮编"></el-table-column>
         <el-table-column prop="state" label="国家">
            <template slot-scope="{row}">
          <span v-for="item in stateArr" :key="item.id">
            <span v-if="row.state == item.stateId">{{ item.stateName }}</span>
          </span>
            </template>
         </el-table-column>
         <!--      <el-table-column prop="parentArea" label="上级区域"></el-table-column>-->
         <el-table-column prop="orderNum" label="排序"></el-table-column>
         <el-table-column prop="status" label="状态" width="180px">
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
                 :visible.sync="diaState.diaAddArea"
                 custom-class="public-dialog"
                 :close-on-click-modal="false"
                 width="800px">
         <el-form :model="addSiteForm" ref="RefAddSiteForm" label-width="156px" class="public-diaForm">
            <el-form-item label="区域代码：" prop="areaNum">
               <el-input type="text" v-model="addSiteForm.areaNum" autocomplete="off" clearable
                         placeholder="区域代码"></el-input>
            </el-form-item>
            <el-form-item label="区域名称：" prop="areaName">
               <el-input type="text" v-model="addSiteForm.areaName" autocomplete="off" clearable
                         placeholder="区域名称"></el-input>
            </el-form-item>
            <el-form-item label="区域简称：" prop="areaForShort">
               <el-input type="text" v-model="addSiteForm.areaForShort" autocomplete="off" clearable
                         placeholder="区域简称"></el-input>
            </el-form-item>
            <el-form-item label="邮编：" prop="postcode">
               <el-input type="text" v-model="addSiteForm.postcode" autocomplete="off" clearable
                         placeholder="邮编"></el-input>
            </el-form-item>
            <el-form-item label="国家：" prop="state">
               <el-select placeholder="请选择" v-model.number="addSiteForm.state">
                  <el-option v-for="(item,index) in stateArr" :key="index"
                             :value="item.stateId"
                             :label="item.stateName">
                  </el-option>
               </el-select>
            </el-form-item>

            <el-form-item label="区域：" prop="parentArea">
               <el-cascader
                  v-model="addSiteForm.parentArea"
                  :options="areaTreeSelectArr"
                  :show-all-levels="false"
                  :props="{
                  checkStrictly: true,
                  value:'id',
                  label:'label',
                  emitPath:false
               }"
                  clearable>
                  <template slot-scope="{ node, data }">
                     <span>{{ data.label }}</span>
                     <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
                  </template>
               </el-cascader>
            </el-form-item>

            <el-form-item label="显示排序：" prop="orderNum">
               <el-input-number v-model="addSiteForm.orderNum" controls-position="right" :min="0"/>
            </el-form-item>
            <el-form-item label="状态：" prop="status">
               <el-radio v-model="addSiteForm.status" label="0">正常</el-radio>
               <el-radio v-model="addSiteForm.status" label="1">停用</el-radio>
            </el-form-item>
            <el-form-item label="备注：" prop="remark">
               <el-input type="text" v-model="addSiteForm.remark" autocomplete="off" clearable
                         placeholder="备注"></el-input>
            </el-form-item>
            <el-form-item class="alignR">
               <el-button type="primary" @click="diaState.diaAddArea = false;" :loading="btnState.btnCancelSite">取消
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
import {addArea, delArea, listState, listArea, areaTreeSelect, updateArea} from '@/assets/js/api'

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
            diaAddArea: false,
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
         FormSearch:{

         },

         stateArr: [],   //国家
         areaTreeSelectArr: [], //区域
      }
   },
   methods: {
      /*区域列表 api*/
      FnGetArea() {
         listArea({
            pageSize: this.pageArr.pageSize,
            pageNum: this.pageArr.pageNum,
            areaName:this.FormSearch.areaName,
         }).then(res => {
            console.log(res);
            this.tableArr = res.data;
            this.pageArr.total = res.total;
            this.btnState.loadTable = false;
         }).catch(res => {
            this.btnState.loadTable = false;
         })
      },
      /*搜索*/
      FnSearchShop() {
         console.log(this.searchForm);
         this.GLOBAL.btnStateChange(this,'btnState','btnSearch');
         this.FnGetArea();
      },

      /*获取国家列表*/
      FnGetListState() {
         listState().then(res => {
            this.stateArr = res.data;
         })
      },
      /*获取下拉区域列表*/
      FnAreaTreeSelect() {
         areaTreeSelect().then(res => {
            this.areaTreeSelectArr = res.data;
         })
      },

      /*添加*/
      FnBtnAdd() {
         this.addSiteForm = {};
         this.diaState.diaAddArea = true;
         this.diaTitle = '添加区域';
         this.GLOBAL.btnStateChange(this, 'btnState', 'btnAdd');
      },

      /*删除 方法*/
      FnDelArea(AreaName, AreaIds) {
         let that = this;
         this.$confirm('是否确认删除' + AreaName + '?', "警告", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
         }).then(function () {
            delArea(AreaIds).then(res => {
               console.log(res);
               that.$message.success(res.msg);
               that.FnGetArea();
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
            let Areaname = val.data.areaName;
            let AreaIds = val.data.areaId;

            that.FnDelArea(Areaname, AreaIds);
         }

         /*修改*/
         if (val.type == 'update') {
            this.addSiteForm = Object.assign({}, val.data);
            this.addSiteForm.state = Number(val.data.state);
            this.diaState.diaAddArea = true;
            this.diaTitle = "修改区域";
         }
      },

      /*状态切换*/
      FnSwitchState(val) {
         this.addSiteForm = val;
         console.log(this.addSiteForm);
         this.FnUpdateApply();
      },

      FnUpdateApply() {
         updateArea(this.addSiteForm).then(res => {
            console.log(res);
            this.$message.success(res.msg);
            this.FnGetArea();
            this.diaState.diaAddArea = false;
         })
      },
      /*保存添加、修改*/
      FnBtnSaveAddSite() {
         let AreaId = this.addSiteForm.areaId;
         console.log(AreaId);
         this.GLOBAL.btnStateChange(this, 'btnState', 'btnSubmitSite');
         if (AreaId) {
            /*有 AreaId， 则修改*/
            this.FnUpdateApply();
         } else {
            /*没有 AreaId，则添加*/
            addArea(this.addSiteForm).then(res => {
               console.log(res);
               this.$message.success(res.msg);
               this.FnGetArea();
               this.diaState.diaAddArea = false;
            })
         }
      },

      /*分页 */
      FaPageCurrent(page) {
         this.pageArr.pageNum = page;
         this.FnGetArea();
      },
      FaSizeChange(size) {
         this.pageArr.pageSize = size;
         this.FnGetArea();
      },

   },
   created() {
      this.FnGetArea();

      this.FnGetListState();
      this.FnAreaTreeSelect();
   },
}
</script>
