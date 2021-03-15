<template>
   <div class="tabs-main" style="background:none;">
      <div style="display: flex;">
         <el-form class="roleL-form">
            <el-input v-model="searchForm.storeName" placeholder="角色名称" autocomplete="off" clearable
                      class="public-input"
                      @keyup.enter.native="FnSearchShop">
               <i slot="suffix" class="el-input__icon el-icon-search" @click="FnSearchShop"></i>
            </el-input>
            <el-button icon="el-icon-folder-add" @click="FnCreateRole" :loading="btnState.btnCreateRole" size="mini"
                       class="btn-role">创建角色
            </el-button>
         </el-form>
         <div class="powerR-subnav">
            <h4>{{ tabName }}</h4>
            <div>更新时间 </div>
         </div>
      </div>

      <el-tabs tab-position="left" id="tabs-power" v-model="tabActiveName" @tab-click="FnChangeTab">
         <el-tab-pane
            lazy
            v-for="(tabItem, index) in editableTabs"
            :label="tabItem.roleName"
            :name="tabItem.roleId+''"
            :key="tabItem.name"
            :dataid="tabItem.roleId">
         </el-tab-pane>
         <el-tabs v-model="SubTabActiveName" @tab-click="FnChangeSubTab" id="SubTabs-power">
            <el-tab-pane lazy label="角色用户" name="sub0" >
               <TabRoleUsers :checkRoleId="checkRoleId" ref="refTabRole"></TabRoleUsers>
            </el-tab-pane>
            <el-tab-pane lazy label="角色权限" name="sub1">
               <TabRolePermissions :checkRoleId="checkRoleId" ref="refTabRolePermiss"></TabRolePermissions>
            </el-tab-pane>
         </el-tabs>

      </el-tabs>

      <!--添加角色-->
      <el-dialog :append-to-body="true"
                 title="添加角色"
                 :visible.sync="diaState.diaAddRole"
                 custom-class="public-dialog"
                 :close-on-click-modal="false"
                 @close='FnCloseAdd'
                 width="600px">
         <el-form :model="addForm" status-icon ref="RefAddForm" label-width="136px" class="public-diaForm">

            <el-form-item label="角色名称：" prop="roleName"
                          :rules="{ required: true, message: '请输入角色名称', trigger: 'blur' }">
               <el-input type="text" v-model="addForm.roleName" autocomplete="off" clearable
                         placeholder="请输入角色名称"></el-input>
            </el-form-item>
            <el-form-item label="角色标识：" prop="roleKey" >
               <el-input type="text" v-model="addForm.roleKey" autocomplete="off" clearable
                         placeholder="请输入角色标识"></el-input>
            </el-form-item>

            <el-form-item label="角色描述：" prop="remark">
               <el-input type="textarea" v-model="addForm.remark" autocomplete="off" clearable
                         placeholder="请输入角色描述"></el-input>
            </el-form-item>
            <el-form-item label="显示顺序：" prop="roleSort">
               <el-input-number v-model="addForm.roleSort" controls-position="right" :min="0" />
            </el-form-item>
            <el-form-item label="显示状态：" prop="status">
               <el-radio-group v-model="addForm.status">
                  <el-radio label='0'>正常</el-radio>
                  <el-radio label='1'>停用</el-radio>
               </el-radio-group>
            </el-form-item>

            <el-form-item>
               <el-checkbox v-model="checkedCopy">
                  复制角色信息
                  <el-select v-model="addForm.roleId" placeholder="请选择">
                    <el-option :label="item.roleName" :value="item.roleId"
                               :disabled="item.roleId == 1"
                               v-for="(item,index) in copyRoleArr" :key="index"></el-option>
                  </el-select>
               </el-checkbox>
            </el-form-item>

            <el-form-item class="alignR">
               <el-button type="primary" @click="diaState.diaAddRole = false;" :loading="btnState.btnCancel">取消
               </el-button>
               <el-button type="primary" @click="FnBtnAddSub('RefAddForm')" :loading="btnState.btnSubmit">保存</el-button>
            </el-form-item>

         </el-form>
      </el-dialog>

   </div>
</template>

<script>
import TabRoleUsers from "@/views/System/PowerManage/TabRole";
import TabRolePermissions from "@/views/System/PowerManage/TabRolePermissions";

import {addRole, updateRole,getRole ,listRole,saveRole,delRole,changeRoleStatus,optionRole,queryOptionRole} from "@/assets/js/api"
export default {
   name: "PowerRole",
   data() {
      return {
         tabName:'超级管理员',
         tabActiveName: '0',
         SubTabActiveName: 'sub1',

         addForm: {

         },
         checkedCopy: false,
         searchForm: {
            storeName: '',
         },

         diaState: {
            diaAddRole: false,  //添加 角色
         },

         btnState: {
            btnCancel: false,
            btnSubmit: false,
            btnCreateRole: false,
         },
         editableTabs: [ ],

         checkRoleId: '1',  //选中 传值 到tab 子组件

         copyRoleArr:[],  //复制角色下拉框数组
      }
   },
   methods: {
      /*获取列表接口*/
      FnGetRoleList(){
         listRole().then(res=>{
            console.log(res);
            if(res.code == 200){
               this.editableTabs = res.data;

               /*如果没有缓存 则获第一个*/
               let tabActiveName = window.localStorage.getItem('tabActiveName');
               if(!tabActiveName){
                  this.tabActiveName = res.data[0].roleId+'';
                  this.checkRoleId = res.data[0].roleId;
               }
            }
         });
      },

      /*获取下拉 角色 option 复制角色Arr*/
      FnGetOptionRole(){
         optionRole().then(res=>{
            console.log(res);
            this.copyRoleArr = res.data;
         })
      },

      /*搜索 */
      FnSearchShop() {
         console.log(this.searchForm.storeName);
      },

      /*添加*/
      FnCreateRole() {
         this.FnGetOptionRole();
         this.diaState.diaAddRole = true;
      },

      FnCloseAdd(){

      },

      /*添加 角色 提交*/
      FnBtnAddSub(formName) {
         this.$refs[formName].validate((valid) => {
            this.GLOBAL.btnStateChange(this, 'btnState', 'btnAddSubmit');
            if (valid) {
               console.log(this.checkedCopy);
               if(this.checkedCopy == false){
                  this.addForm.roleId = '';
               }

               addRole(this.addForm).then(res=>{
                  console.log(res);
                  if(res.code == 200){
                     this.$message.success(res.msg);
                     this.diaState.diaAddRole = false;
                  }else{
                     this.$message.error(res.msg);
                  }
               })
            }
         })
      },

      /*tab 切换点击事件  */
      FnChangeTab(tab,e) {
         console.log(tab.name);
         this.checkRoleId = tab.name;
         this.tabName = tab.label;
         window.localStorage.setItem('tabActiveName',tab.name);

         console.log(this.SubTabActiveName);
         if(this.SubTabActiveName == 'sub0'){
            this.$refs.refTabRole.FnGetListByRole(tab.name);
         }else{
            this.$refs.refTabRolePermiss.FnGetMenuRoleTree(tab.name);
         }
      },

      /*subTab 切换点击事件 */
      FnChangeSubTab(subTab) {
         // console.log(subTab.name);
         window.localStorage.setItem('SubTabPowerRoleActiveName',subTab.name);
      },

   },

   created() {
      this.FnGetRoleList();

      let SubTabActiveName = window.localStorage.getItem('SubTabPowerRoleActiveName');
      if(SubTabActiveName){
         // console.log(SubTabActiveName);
         this.SubTabActiveName = SubTabActiveName;
      }

      let tabActiveName = window.localStorage.getItem('tabActiveName');
      if(tabActiveName){
         // console.log(tabActiveName);
         this.tabActiveName = tabActiveName;
         this.checkRoleId = tabActiveName;
      }
   },

   components: {
      TabRoleUsers,
      TabRolePermissions,
   },
}
</script>
