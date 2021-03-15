<template>
   <div>
      <div class="flex-between">
         <el-form class="public-form" @submit.native.prevent>
            <el-input v-model="FormSearch.userName" placeholder="请输入账号" autocomplete="off" clearable
                      class="public-input">
            </el-input>
            <el-button icon="el-icon-search" :loading="btnState.btnSearch" @click="FnSearchShop" class="public-btn">搜索
            </el-button>
         </el-form>
         <div>
            <el-button icon="el-icon-folder-add" @click="FnAddRole" :loading="btnState.btnAddRole" size="mini"
                       class="public-btn">添加用户
            </el-button>
<!--            <el-button icon="el-icon-folder-add" @click="FnDisatributeList" :loading="btnState.btnDisatribute"-->
<!--                       size="mini" class="public-btn">批量分配店铺-->
<!--            </el-button>-->
<!--            <el-button icon="el-icon-folder-add" @click="FnRemove" :loading="btnState.btnRemove" size="mini"-->
<!--                       class="public-btn">批量移除-->
<!--            </el-button>-->
         </div>
      </div>

      <el-table class="public-table" border
                :data="tableArr"
                @selection-change="FnStoreChecked"
                ref="refTable"
                @row-click="handleRowClick">

         <el-table-column type="selection"></el-table-column>
         <el-table-column prop="userName" label="用户账号"></el-table-column>
         <el-table-column prop="nickName" label="用户昵称"></el-table-column>

         <el-table-column prop="phonenumber" label="手机号码"></el-table-column>
         <el-table-column prop="store" label="可查看的店铺">
            <template slot-scope="{row}">
               <div v-for="item in row.stores">{{item.storeCode}}</div>
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
              <el-dropdown>
                <el-button type="primary">
                  操作<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="FnBtnDistribute(scope.row,'pass')">分配店铺</el-dropdown-item>
<!--                  <el-dropdown-item @click.native="FnBtnDistribute(scope.row,'delete')">移除</el-dropdown-item>-->
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
                       @click="FnBtnSaveRole('RefRoleForm')">保存</el-button>
         </div>
      </el-dialog>

      <!-- 分配店铺-->
      <el-dialog :append-to-body="true"
                 title="分配店铺"
                 :visible.sync="diaState.diaAddStore"
                 custom-class="public-dialog"
                 :close-on-click-modal="false"
                 @close='FnCloseAdd'
                 width="800px">
         <el-tree
            :data="shuttleStoreArr"
            show-checkbox
            default-expand-all
            node-key="id"
            ref="tree"
            highlight-current
            :prop="defaultPorps"
            :default-checked-keys="checkedStore">
         </el-tree>


<!--         <el-transfer v-model="removeRoleForm.checkedStoleArr"-->
<!--                      :data="shuttleStoreArr.children"-->
<!--                      :titles="['添加用户', '已选用户']"-->
<!--                      :button-texts="['加入左边', '加入右边']"-->
<!--                      :props="{-->
<!--                        key: 'id',-->
<!--                        value:'id',-->
<!--                        label: 'label',-->
<!--                      }"></el-transfer>-->
         <div class="formR-main">
            <el-button type="primary" class="public-btn" :loading="btnState.btnSaveStore"
                       @click="FnBtnSaveStore('removeRoleForm')">保存</el-button>
         </div>
      </el-dialog>

   </div>
</template>

<script>
import PersonalInfo from '@/views/System/AccountCenter/PersonalInfo'
import {queryUser,getRole,listByRole,listUser,saveRoleRelation,selectTreeAuth,saveUserStore} from '@/assets/js/api'
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
         checkedStore:[], /*选中的 已分配的店铺*/
         defaultPorps:{
            children: 'children',
            label: 'label'
         },
         pageArr: {
            pageNum: 1,
            total: 10,
            pageSize: 10,
         },
         btnState: {
            btnAddRole: false,
            btnDisatribute: false,
            btnRemove: false,
            btnSaveStore:false,
         },
         diaState: {
            diaAddUser: false,  //添加用户

            diaAddStore: false,  //分配店铺
         },
         searchForm: {
            trueName: '',
         },
         removeRoleForm:{
            checkedRoleArr:[],
         },

         /*分配店铺*/
         removeStoreForm:{
            checkedStoleArr:[],
         },

         shuttleRoleArr:[],   /*穿梭框 配置人员*/
         shuttleStoreArr:[],   /*穿梭框 分配店铺*/

         /*角色信息 table*/
         tableArr: [ ],
         checkUserid:undefined,
         FormSearch:{},
      }
   },
   methods: {
      /*根据角色编号获取所关联人员详情*/
      FnGetUser(checkRoleId){
         queryUser(checkRoleId).then(res=>{
            console.log(res);
            this.shuttleRoleArr = res.data.checked.concat(res.data.users);
            console.log(this.shuttleRoleArr);
            let checkedArr =[];
            res.data.checked.forEach((item,index)=>{
               checkedArr.push(item.userId)
            })
            console.log(checkedArr);
            this.removeRoleForm.checkedRoleArr = checkedArr;
         });
      },

      /*获取 角色id 下的用户列表*/
      FnGetListByRole(checkRoleId){
         listByRole(checkRoleId,{
            pageSize:this.pageArr.pageSize,
            pageNum:this.pageArr.pageNum,
            userName: this.FormSearch.userName,
         }).then(res=>{
            // console.log(res);
            this.tableArr = res.data;
            this.pageArr.total = res.total;
         })
      },

      /*搜索用户名或者真实姓名 */
      FnSearchShop() {
         console.log(this.searchForm.storeName);
      },

      /* 添加 取消  */
      FnCloseAdd() {
         this.GLOBAL.btnStateChange(this, 'btnState', 'btnCancel')
         this.diaState.diaAddRole = false;
         // this.$refs['RefAddForm'].resetFields();
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
         this.FnGetUser(this.checkRoleId);
      },

      /*添加用户 确定*/
      FnBtnSaveRole(){
         console.log(this.removeRoleForm.checkedRoleArr);
         saveRoleRelation( this.checkRoleId,
            this.removeRoleForm.checkedRoleArr,
         ).then(res=>{
            console.log(res);
            if(res.code == 200){
               this.$message.success(res.msg);
               this.diaState.diaAddUser = false;
               this.FnGetListByRole(this.checkRoleId);
            }
         })
      },

      /*全部店铺 api*/
      FnselectTreeAuth(id){
         selectTreeAuth(id).then(res=>{
            let checkedArr = [];
            res.data.forEach((item,index)=>{
               item.children.forEach((child,index2)=>{
                  console.log(child);
                  if(child.checked > 0){
                     checkedArr.push(child.id);
                  }
               })
            })
            console.log(checkedArr);
            this.checkedStore = checkedArr;
            this.shuttleStoreArr = res.data;
         })
      },

      /*分配*/
      FnBtnDistribute(val) {
         console.log(val);
         this.diaState.diaAddStore = true;
         this.checkUserid = val.id;
         this.FnselectTreeAuth(val.id);
      },

      /*分配店铺确定*/
      FnBtnSaveStore(){
         console.log(this.checkUserid);

         let getCheckedNodes = this.$refs.tree.getCheckedNodes();
         // console.log(getCheckedNodes);
         let storeIds = [];
         getCheckedNodes.forEach((item,index)=>{
            if( !item.children ){
               storeIds.push(item.id);
            }
         })
         saveUserStore(this.checkUserid,storeIds).then(res=>{
            this.$message.success(res.msg);
            // this.FnGetListByRole(this.checkRoleId);
         })
      },

      /*批量分配店铺*/
      FnDisatributeList() {},

      /*批量移除*/
      FnRemove() {},

      /* 1、 编辑选中  */
      FnStoreChecked(val) {
         console.log(val);
         this.checkedRows = val;
      },
      /*点击行触发，选中或不选中复选框 */
      handleRowClick(row, column, event) {
         // this.$refs.refTable.toggleRowSelection(row);
      },

      /*分页 */
      FaPageCurrent(page) {
         this.pageArr.pageNum = page;
         this.FnGetListByRole(this.checkRoleId);
      },
      FaSizeChange(size) {
         this.pageArr.pageSize = size;
         this.FnGetListByRole(this.checkRoleId);
      },

   },
   created() {

   },
   mounted(){
      this.FnGetListUser();
      this.FnGetListByRole(this.checkRoleId);
   },
}
</script>
