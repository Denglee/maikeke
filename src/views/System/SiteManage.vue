<template>
   <div class="public-main organize-box">
      <div class="organizeL-box" style='padding: 0'>
         <el-button @click="FnBtnAddSite">添加区域站点</el-button>
         <el-menu :default-active="activeMenu">
            <el-submenu :index="indexFirst+''" :data-index="indexFirst+''"
                        v-for="(siteFirst,indexFirst) in platformSite"
                        :key="indexFirst">
               <template slot="title">
                  <div @click="FnChoosePlate(siteFirst)">{{ siteFirst.label }}</div>
               </template>
               <el-menu-item :index="indexFirst+''+'-'+indexSecond+''" :data-index="indexFirst+''+'-'+indexSecond+''"
                             v-for="(siteSecond,indexSecond) in siteFirst.children" :key="indexSecond"
                             class="site-item">
                  <span @click="FnChooseSite(siteSecond)">{{ siteSecond.label }}</span>
                  <el-dropdown size="medium" class="site-dropdown" @command="FnCommand">
                     <span class="el-dropdown-link"><i class="el-icon-arrow-down el-icon&#45;&#45;right"></i></span>
                     <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item :command="{ type:'update', data:siteSecond }">编辑</el-dropdown-item>
                        <el-dropdown-item :command="{ type:'delete', data:siteSecond }">删除</el-dropdown-item>
                     </el-dropdown-menu>
                  </el-dropdown>
               </el-menu-item>
            </el-submenu>

         </el-menu>
      </div>

      <div class="organizeR-box">
         <el-form class="public-form" @submit.native.prevent>
            <el-input v-model="FormSearch.siteName" placeholder="请输入名称" autocomplete="off" clearable
                      class="public-input">
            </el-input>
            <el-button icon="el-icon-search" :loading="btnState.btnSearch" @click="FnSearchShop" class="public-btn">搜索</el-button>

            <div class="formR-main">
               <el-button icon="el-icon-folder-add" @click="FnBtnAddCountry" :loading="btnState.btnAdd" class="public-btn">
                  新增国家站点
               </el-button>
<!--               <el-button icon="el-icon-folder-add" @click="FnBtnExport" :loading="btnState.btnExport" class="public-btn">-->
<!--                  导出-->
<!--               </el-button>-->
            </div>
         </el-form>

         <el-table class="public-table" border
                   :data="tableArr"
                   ref="refTable"
                   height="600"
                   v-loading="btnState.loadTable">
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="siteName" label="国家站点"></el-table-column>
            <el-table-column prop="applyId" label="所属区域站点">
               <template slot-scope="{row}">
                  <span v-for="item in platformArr" :key="item.applyId">
                     <span v-if="item.id == row.applyId">{{ item.label }}</span>
                  </span>
               </template>
            </el-table-column>
            <el-table-column prop="state" label="所在国家">
               <template slot-scope="{row}">
            <span v-for="(item,index) in stateArr" :key="index">
              <span v-if="item.stateId == row.state">{{ item.stateName }}</span>
            </span>
               </template>
            </el-table-column>
            <el-table-column prop="currencyTypeName" label="结算货币代码"></el-table-column>
            <el-table-column prop="currencySymbol" label="货币符号"></el-table-column>
            <el-table-column prop="logoUrl" label="站点图片">
               <template slot-scope="{row}">
                  <el-image :src="row.logoUrl">
                     <div slot="error" class="image-slot">
                        <i class="el-icon-picture-outline"
                           style="font-size: 20px;"></i>
                     </div>
                  </el-image>
               </template>
            </el-table-column>
            <el-table-column prop="status" label="状态">
               <template slot-scope="{row}">
                  <span v-if="row.status == 0">正常</span>
                  <span v-else>停用</span>
               </template>
            </el-table-column>
            <el-table-column prop="remark" label="备注"></el-table-column>
            <el-table-column label="操作">
               <template slot-scope="{row}">
                  <el-dropdown @command="FnCommandCountry">
                     <el-button type="primary">
                        操作<i class="el-icon-arrow-down el-icon--right"></i>
                     </el-button>
                     <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item :command="{ type:'delete', data:row }">删除</el-dropdown-item>
                        <el-dropdown-item :command="{ type:'update', data:row }">修改</el-dropdown-item>
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

      </div>

      <!--添加\编辑区域站点 -->
      <el-dialog :append-to-body="true"
                 title="添加\编辑区域站点"
                 :visible.sync="diaState.diaAddSite"
                 custom-class="public-dialog"
                 :close-on-click-modal="false"
                 @close="FnDiaClose('RefAddSiteForm')"
                 width="800px">
         <el-form :model="addSiteForm" ref="RefAddSiteForm" label-width="136px" class="public-diaForm">
            <el-form-item label="区域站点名称：" prop="siteName"
                          :rules="{ required: true, message: '请输入区域站点名称', trigger: 'blur' }">
               <el-input type="text" v-model="addSiteForm.siteName" autocomplete="off" clearable
                         placeholder="区域站点名称"></el-input>
            </el-form-item>
            <el-form-item label="所属平台：" prop="applyId"
                          :rules="{ required: true, message: '请选择所属平台', trigger: 'change' }">
               <el-select placeholder="请选择" v-model="addSiteForm.applyId">
                  <el-option v-for="(item,index) in platformArr" :key="index"
                             :value="item.id"
                             :label="item.label">
                  </el-option>
               </el-select>
            </el-form-item>
            <el-form-item label="描述：" prop="remark">
               <el-input type="textarea" v-model="addSiteForm.remark" autocomplete="off" clearable
                         placeholder="描述"></el-input>
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

      <!--添加国家站点 -->
      <el-dialog :append-to-body="true"
                 title="添加/编辑国家站点"
                 :visible.sync="diaState.diaAddCountry"
                 custom-class="public-dialog"
                 :close-on-click-modal="false"
                 @close="FnDiaClose('RefAddForm')"
                 width="800px">
         <el-form :model="addForm" ref="RefAddForm" label-width="160px" class="public-diaForm">
            <el-form-item label="国家站点编号：" prop="siteNum"
                          :rules="{ required: true, message: '请输入国家站点编号', trigger: 'blur' }">
               <el-input type="text" v-model="addForm.siteNum" autocomplete="off" clearable
                         placeholder="国家站点编号"></el-input>
            </el-form-item>
            <el-form-item label="国家站点名称：" prop="siteName"
                          :rules="{ required: true, message: '请输入国家站点名称', trigger: 'blur' }">
               <el-input type="text" v-model="addForm.siteName" autocomplete="off" clearable
                         placeholder="国家站点名称"></el-input>
            </el-form-item>
            <el-form-item label="所属平台：" prop="applyId"
                          :rules="{ required: true, message: '请选择所属平台', trigger: 'change' }">
               <el-select placeholder="请选择" v-model="addForm.applyId"
                          @change="FnChangeRegion">
                  <el-option v-for="(item,index) in platformArr" :key="index"
                             :value="item.id"
                             :label="item.label">
                  </el-option>
               </el-select>
            </el-form-item>
            <el-form-item label="所属区域站点：" prop="parentSite"
                          :rules="{ required: true, message: '请选择所属区域站点', trigger: 'change' }">
               <el-select placeholder="请选择" v-model="addForm.parentSite">
                  <el-option v-for="(item,index) in regionSiteArr" :key="index"
                             :value="item.siteId"
                             :label="item.siteName">
                  </el-option>
               </el-select>
            </el-form-item>

            <el-form-item label="所在国家：" prop="state"
                          :rules="{ required: true, message: '请选择所在国家', trigger: 'change' }">
               <el-select placeholder="请选择" v-model.number="addForm.state">
                  <el-option v-for="(item,index) in stateArr" :key="index"
                             :value="item.stateId"
                             :label="item.stateName">
                  </el-option>
               </el-select>
            </el-form-item>

            <el-form-item label="交易结算货币类型：" prop="currencyTypeId"
                          :rules="{ required: true, message: '请选择交易结算货币类型', trigger: 'change' }">
               <el-select placeholder="请选择" v-model="addForm.currencyTypeId">
                  <el-option v-for="(item,index) in currencyArr" :key="index"
                             :value="item.rateId"
                             :label="item.rateName">
                  </el-option>
               </el-select>
            </el-form-item>
            <el-form-item label="状态：" prop="status">
               <el-radio v-model="addForm.status" label="0">正常</el-radio>
               <el-radio v-model="addForm.status" label="1">停用</el-radio>
            </el-form-item>
            <el-form-item label="站点图片：" prop="logoUrl">

               <SingleCropper :autoCropWidth='70'
                              :autoCropHeight='70'
                              :imgWidth="70"
                              :imgHeight="70"
                              :isAvater=false
                              :initUrl="addForm.logoUrl"
                              @FnUploadPage="FnUpload">
               </SingleCropper>
            </el-form-item>
            <el-form-item label="备注：" prop="remark">
               <el-input type="text" v-model="addForm.remark" autocomplete="off" clearable
                         placeholder="备注"></el-input>
            </el-form-item>

            <el-form-item class="alignR">
               <el-button type="primary" @click="diaState.diaAddCountry = false;" :loading="btnState.btnCancel">取消
               </el-button>
               <el-button type="primary" @click="FnBtnSaveCountry('RefAddForm')" :loading="btnState.btnSubmit">保存
               </el-button>
            </el-form-item>
         </el-form>
      </el-dialog>

   </div>
</template>

<script>
import {
   addSite,
   updateSite,
   listSite,
   getSite,
   siteTreeSel,
   delSite,
   listState,
   listRate,
   listApplyTree,
   upload
} from "@/assets/js/api"
import App from "@/App";

import SingleCropper from "@/components/cropper/SingleCropper";

export default {
   name: "SiteManage",
   components: {SingleCropper},
   data() {
      return {
         activeMenu: '',
         btnState: {
            loadTable: true,
            btnAdd: false,
            btnCancel: false,

            btnAddSite: false,
            btnCancelSite: false,
            btnSubmitSite: false,
         },
         diaState: {
            diaAddTitle: '添加',
            diaAddSite: false,  /*添加站点*/

            diaAddCountry: false,   /*添加国家站点*/
         },

         FormSearch:{},
         /*区域站点*/
         addSiteForm: {},
         addForm: {
            logoUrl: '',
         },
         addType: '',
         siteArr: [],
         tableArr: [],
         platformSite: [],
         platformArr: [],   /* 平台 */
         regionSiteArr: [],   /*平台下的区域站点*/
         stateArr: [],      /*国家*/
         currencyArr: [],   /*货币*/

         pageArr: {
            total: 0,
            pageSize: 10,
            pageNum: 1,
         }

      }
   },
   methods: {

      /*上传*/
      FnUpload(data) {
         let formData = new FormData();
         formData.append("file", data);
         upload(formData).then(res => {
            this.$message(res.msg);
            this.addForm.logoUrl = res.data.url;
         });
      },

      /*删除 方法*/
      FnDelApply(ApplyName, ApplyIds) {
         let that = this;
         this.$confirm('是否确认删除' + ApplyName + '?', "警告", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
         }).then(function () {
            delSite(ApplyIds).then(res => {
               console.log(res);
               that.$message.success(res.msg);
               that.FnGetListSite();
            })
         })
      },
      /*区域站点操作*/
      FnCommand(val) {
         console.log(val);
         if (val.type == 'update') {
            this.addType = 'update';
            this.diaState.diaAddSite = true;
            getSite(val.data.id).then(res => {
               console.log(res);
               this.addSiteForm = Object.assign({}, res.data);
               this.addSiteForm.applyId = res.data.applyId + '';
               this.addSiteForm.logoUrl = '1';
            })
         }
         if (val.type == 'delete') {
            let Applyname = val.data.label;
            let ApplyIds = val.data.id;
            console.log(Applyname);
            this.FnDelApply(Applyname, ApplyIds);
         }
      },
      /*平台点击*/
      FnChoosePlate(val) {
         console.log(val);
         this.FnGetListSite(val.id);
      },
      /*点击区域站点 选中*/
      FnChooseSite(val) {
         console.log(val.id);
         this.FnGetListSite('', val.id);
      },

      /*区域站点 A 添加 弹出*/
      FnBtnAddSite(val) {
         this.addSiteForm = {};
         this.addType = 'add';
         this.diaState.diaAddSite = true;
      },

      /*区域站点 C 保存 */
      FnBtnSaveAddSite() {
         let addType = this.addType;
         console.log(addType);
         if (addType == 'update') {
            this.addSiteForm.type = 0;
            updateSite(this.addSiteForm).then(res => {
               console.log(res);
               this.$message.success(res.msg);
               this.FnGetSiteTreeSel(0);
               this.diaState.diaAddSite = false;
            })
         } else {
            this.addSiteForm.type = 0;
            addSite(this.addSiteForm).then(res => {
               console.log(res);
               this.$message.success(res.msg);
               this.FnGetSiteTreeSel(0);
               this.diaState.diaAddSite = false;
            })
         }
      },


      /** 添加 国家站点 */
      FnBtnAddCountry() {
         this.addForm = {};
         this.addSiteForm.logoUrl = '1';
         this.addForm.type = 1;
         this.diaState.diaAddCountry = true;
         this.diaState.submitType = 'add';
      },
      /*添加 弹窗 关闭*/
      FnDiaClose(formName){
         console.log(formName);
         this.$refs[formName].resetFields();
      },
      /*提交 国家站点*/
      FnBtnSaveCountry() {
         let ApplyId = this.addForm.siteId;
         console.log(ApplyId);

         this.GLOBAL.btnStateChange(this, 'btnState', 'btnSubmit');
         if (ApplyId) {
            /*有 ApplyId， 则修改*/
            updateSite(this.addForm).then(res => {
               console.log(res);
               this.$message.success(res.msg);
               this.FnGetListSite();
               this.diaState.diaAddCountry = false;
            })
         } else {
            /*没有 ApplyId，则添加*/
            addSite(this.addForm).then(res => {
               console.log(res);
               this.$message.success(res.msg);
               this.FnGetListSite();
               this.diaState.diaAddCountry = false;
            })
         }

      },
      /*国家站点编辑*/
      FnCommandCountry(val) {
         console.log(val);
         if (val.type == 'update') {
            this.addForm = Object.assign({}, val.data);
            this.addForm.state = Number(val.data.state);
            this.addForm.applyId = val.data.applyId + '';
            this.addForm.parentSite = val.data.parentSite;
            this.diaState.diaAddCountry = true;

            this.FnChangeRegion(val.applyId);
         }
         if (val.type == 'delete') {
            let Applyname = val.data.siteName;
            let ApplyIds = val.data.siteId;
            this.FnDelApply(Applyname, ApplyIds);
         }
      },
      /*搜索*/
      FnSearchShop(){
         this.FnGetListSite();
      },

      /* table 列表 */
      FnGetListSite(applyId, parentId = '') {
         listSite({
            pageSize: this.pageArr.pageSize,
            pageNum: this.pageArr.pageNum,
            parentSite: parentId,
            applyId: applyId,
            siteName:this.FormSearch.siteName,
            type: 1,
         }).then(res => {
            console.log(res);
            this.tableArr = res.data;
            this.btnState.loadTable = false;
            this.pageArr.total = res.total;
         }).catch(res => {
            this.btnState.loadTable = false;
         })
      },

      /*表单平台 sel选择 然后 赋值给区域*/
      FnChangeRegion(val) {
         console.log(val);
         listSite({
            applyId: val,
            type: 0,
         }).then(res => {
            console.log(res);
            this.regionSiteArr = res.data;
         })
      },

      /*站点 + 平台选择列表*/
      FnGetSiteTreeSel(type = 0, applyId) {
         siteTreeSel(type, {
            applyId: applyId,
         }).then(res => {
            console.log(res);
            this.platformSite = res.data;
         })
      },

      /*参数*/
      FnGetSel() {
         /*平台*/
         listApplyTree().then(res => {
            this.platformArr = res.data;
         });
         /*国家列表 api */
         listState().then(res => {
            this.stateArr = res.data;
         })
         /*利率 币种 api*/
         listRate().then(res => {
            this.currencyArr = res.data;
         })
      },

      /*分页 */
      FaPageCurrent(page) {
         this.pageArr.pageNum = page;
         this.FnGetListSite();
      },
      FaSizeChange(size) {
         this.pageArr.pageSize = size;
         this.FnGetListSite();
      },

   },

   created() {
      this.FnGetListSite();
      this.FnGetSiteTreeSel(0);
      this.FnGetSel();
   },
}
</script>
<style lang="scss">
.site-item {
   display: flex;
   height: 42px !important;
   line-height: 42px !important;
   padding: 0 0 0 30px !important;

   &:hover {
      background-color: #f4f4f4;
      cursor: pointer;
   }

   span {
      //border: solid 1px red;
      flex: 1;
   }

   .site-dropdown {
      text-align: right;
      flex: 1;

      i {
         width: 80px;
         display: inline-block;
         padding: 6px 0;
         text-align: right;
      }
   }
}


.organizeL-box {
   .is-opened .el-submenu__title {
      //border-left: solid 2px #005ad4;
   }
}

</style>