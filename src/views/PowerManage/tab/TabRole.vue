<template>
   <div>
      <div class="flex-between">
         <el-form>
            <el-input v-model="searchForm.trueName" placeholder="搜索用户名或者真实姓名" autocomplete="off" clearable
                      icon="el-icon-search" @keyup.enter.native="FnSearchShop">
               <i slot="suffix" class="el-input__icon el-icon-search" @click="FnSearchShop"></i>
            </el-input>
         </el-form>
         <div>
            <el-button icon="el-icon-folder-add" @click="FnAddRole" :loading="btnState.btnAddRole" size="mini"
                       class="public-btn">添加用户
            </el-button>
            <el-button icon="el-icon-folder-add" @click="FnDisatributeList" :loading="btnState.btnDisatribute"
                       size="mini" class="public-btn">批量分配店铺
            </el-button>
            <el-button icon="el-icon-folder-add" @click="FnRemove" :loading="btnState.btnRemove" size="mini"
                       class="public-btn">批量移除
            </el-button>
         </div>
      </div>

      <el-table class="public-table" border
                :data="tableArr"
                @selection-change="checkedStore"
                ref="refTable"
                @row-click="handleRowClick">

         <el-table-column type="selection"></el-table-column>
         <el-table-column prop="userName" label="用户账号"></el-table-column>
         <el-table-column prop="nickName" label="用户昵称"></el-table-column>

         <el-table-column prop="phonenumber" label="手机号码"></el-table-column>
         <el-table-column prop="tel" label="手机号"></el-table-column>
         <el-table-column prop="store" label="可查看的店铺">
            <template slot-scope="scope">
               <span v-if="scope.row.store == 1">已分配</span>
               <span v-else>未分配</span>
            </template>
         </el-table-column>
         <el-table-column prop="product" label="可查看的产品">
            <template slot-scope="scope">
               <span v-if="scope.row.product == 1">已分配</span>
               <span v-else>未分配</span>
            </template>
         </el-table-column>
         <el-table-column prop="email" label="可查看的店铺邮箱">
            <template slot-scope="scope">
               <span v-if="scope.row.email == 1">已分配</span>
               <span v-else>未分配</span>
            </template>
         </el-table-column>

         <el-table-column label="操作">
            <template slot-scope="scope">

               <el-button @click="FnBtnDistribute(scope.row)">分配店铺</el-button>
               <el-button @click="FnBtnDistribute(scope.row)">移除</el-button>
            </template>
         </el-table-column>
      </el-table>

      <!-- 添加用户-->
      <el-dialog :append-to-body="true"
                 title="添加用户"
                 :visible.sync="diaState.diaAddUser"
                 custom-class="public-dialog"
                 :close-on-click-modal="false"
                 @close='FnCloseAdd'
                 width="800px">

         <el-transfer v-model="removeRoleForm.checkedRoleArr"
                      :data="shuttleRoleArr"
                      :titles="['添加用户', '已选用户']"
                      :button-texts="['加入左边', '加入右边']"
                      :props="{
                        key: 'userId',
                        value:'userId',
                        label: 'userName',
                      }"></el-transfer>
         <div class="formR-main">
            <el-button type="primary" class="public-btn" :loading="btnState.btnSaveStore"
                       @click="FnBtnSaveRole('removeRoleForm')">保存</el-button>
         </div>
      </el-dialog>

   </div>
</template>

<script>
import PersonalInfo from '@/views/System/AccountCenter/PersonalInfo'
import {queryUser,getRole,listByRole,listUser,saveRoleRelation} from '@/assets/js/api'
export default {
   name: "RoleUsers",
   props: {
      checkRoleId: {
         type: String | Number,
      }
   },
   components:{PersonalInfo},
   data() {
      return {

         btnState: {
            btnAddRole: false,
            btnDisatribute: false,
            btnRemove: false,
            btnSaveStore:false,
         },
         diaState: {
            diaAddUser: false,  //添加用户
         },
         searchForm: {
            trueName: '',
         },
         removeRoleForm:{
            checkedRoleArr:[],
         },

         /*穿梭框 配置人员*/
         shuttleRoleArr:[],

         /*角色信息 table*/
         tableArr: [ ],
      }
   },
   methods: {
      /*根据角色编号获取所关联人员详情*/
      FnGetUser(checkRoleId){
         queryUser(checkRoleId).then(res=>{
            console.log(res);
            let queryUserArr = res.data;
            this.tableArr = queryUserArr;

            this.removeRoleForm.checkedRoleArr= [];
            queryUserArr.forEach((item,index)=>{
               this.removeRoleForm.checkedRoleArr.push(item.id);
            });
         });

         /*根据角色编号获取详细信息 api*/
         // getRole(this.checkRoleId).then(res=>{
         //    console.log(res);
         // });
      },

      /*搜索用户名或者真实姓名 */
      FnSearchShop() {
         console.log(this.searchForm.storeName);
      },

      /* 添加 取消  */
      FnCloseAdd() {
         this.GLOBAL.btnStateChange(this, 'btnState', 'btnCancel')
         // this.diaState.diaAddRole = false;
         // this.$refs['RefAddForm'].resetFields();
      },

      /*获取 角色id 下的用户列表*/
      FnGetListByRole(checkRoleId){
         listByRole(checkRoleId).then(res=>{
            console.log(res);
            // this.shuttleRoleArr = res.data
         })
      },

      /*全部 用户 列表*/
      FnGetListUser(){
         listUser().then(res=>{
            console.log(res);
            this.shuttleRoleArr = res.data;
         })
      },

      /*添加用户*/
      FnAddRole() {
         this.diaState.diaAddUser = true;
         console.log(this.checkRoleId);
         this.FnGetListByRole(this.checkRoleId);

      },

      /*添加用户 确定*/
      FnBtnSaveRole(){
         console.log(this.removeRoleForm.checkedRoleArr);

         saveRoleRelation( this.checkRoleId,
            this.removeRoleForm.checkedRoleArr,
         ).then(res=>{
            console.log(res);
         })
      },

      /*批量分配店铺*/
      FnDisatributeList() {

      },

      /*批量移除*/
      FnRemove() {

      },

      /* 1、 编辑选中  */
      checkedStore(val) {
         console.log(val);
         this.checkedRows = val;
      },
      /*点击行触发，选中或不选中复选框 */
      handleRowClick(row, column, event) {
         // this.$refs.refTable.toggleRowSelection(row);
      },

      /*分配*/
      FnBtnDistribute(val) {
         console.log(val);
      },

   },
   created() {

   },
   mounted(){
      this.FnGetListUser();
      this.FnGetUser(this.checkRoleId);
   },
}
</script>
