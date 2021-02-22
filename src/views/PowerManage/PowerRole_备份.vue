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
            <div>更新时间 2020-10-29</div>
         </div>
      </div>

      <el-tabs tab-position="left" id="tabs-power" v-model="tabActiveName" @tab-click="FnChangeTab">
         <el-tab-pane
            lazy
            v-for="(tabItem, index) in editableTabs"
            :label="tabItem.title"
            :name="tabItem.name"
            :key="tabItem.name">
            <el-tabs v-model="SubTabActiveName" @tab-click="FnChangeSubTab" id="SubTabs-power">
               <el-tab-pane lazy label="角色用户" name="sub1">
                  <TabRoleUsers :checkID="checkID"></TabRoleUsers>
               </el-tab-pane>
               <el-tab-pane lazy label="角色权限" name="sub2">
                  <TabRolePermissions :checkID="checkID"></TabRolePermissions>
               </el-tab-pane>
            </el-tabs>
         </el-tab-pane>
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

            <el-form-item label="角色描述：" prop="roleInfo">
               <el-input type="textarea" v-model="addForm.roleInfo" autocomplete="off" clearable
                         placeholder="请输入角色描述"></el-input>
            </el-form-item>

            <el-form-item>
               <el-checkbox v-model="btnState.checkedCopy">
                  复制角色信息
                  <el-select v-model="copyRole" placeholder="请选择">
                     <el-option value="1">角色1</el-option>
                     <el-option value="2">角色2</el-option>
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
import TabRoleUsers from "@/views/PowerManage/tab/TabRole";
import TabRolePermissions from "@/views/PowerManage/tab/TabRolePermissions";

import {role,roleList} from "@/assets/js/api"
export default {
   name: "PowerRole",
   data() {
      return {
         tabName:'超级管理员',
         tabActiveName: 'fa1',
         SubTabActiveName: 'sub2',

         addForm: {
            roleName: '',
            roleInfo: '',
         },
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
            checkedCopy: false,
         },
         copyRole: '',
         editableTabs: [
            {
               title: '超级管理员',
               name: 'fa1',
            },
            {
               title: '销售员',
               name: 'fa2',
            },
            {
               title: '销售助理',
               name: 'fa3',
            }
         ],

         checkID: '1',  //选中 传值 到tab 子组件
      }
   }
   ,
   methods: {
      FnGetRoleList(){
         roleList().then(res=>{
            console.log(res);
         })
      },
      /*搜索 */
      FnSearchShop() {
         console.log(this.searchForm.storeName);
      },

      /*添加*/
      FnCreateRole() {
         this.diaState.diaAddRole = true;
      },

      FnCloseAdd(){

      },

      /*添加 提交*/
      FnBtnAddSub() {
         this.GLOBAL.btnStateChange(this, 'btnState', 'btnSubmit');
         role({
            role:this.addForm.roleName
         }).then(res=>{
            console.log(res);
         })
      },

      /*tab 切换点击事件  */
      FnChangeTab(tab) {
         // console.log(tab);
         this.checkID = tab.name;
         this.tabName = tab.label;
      },

      /*subTab 切换点击事件 */
      FnChangeSubTab(subTab) {

      },

   },

   created() {
      this.FnGetRoleList();
   },

   components: {
      TabRoleUsers,
      TabRolePermissions,
   },
}
</script>
