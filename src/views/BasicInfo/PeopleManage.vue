<template>
   <div class="organize-box ">
      <div class="organizeL-box">

         <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>

         <el-tree
            class="filter-tree"
            :data="treeData"
            default-expand-all
            :filter-node-method="filterNode"
            @node-click="handleNodeClick"
            ref="tree">
         </el-tree>

      </div>
      <div class="organizeR-box">
         <el-form :model="departmentForm" ref="RefAddForm" label-width="56px" class="public-form">
            <el-form-item label="用户：" prop="storeName">
               <el-input type="text" v-model="departmentForm.storeName" autocomplete="off" clearable
                         placeholder="请输入用户名/姓名/角色/手机号/部门"></el-input>
            </el-form-item>
            <el-form-item label="状态：" prop="storeState">
               <el-select v-model="departmentForm.storeState" filterable multiple clearable>
                  <el-option v-for="( item, index ) in stateArr" :key="index"
                             :label="item.value"
                             :value="item.name"></el-option>
               </el-select>
            </el-form-item>
            <el-button icon="el-icon-circle-plus-outline" :loading="btnState.btnSearch" @click="FnBtnSearch"
                       class="public-btn">查询
            </el-button>

            <div class="formR-main">
               <el-button icon="el-icon-folder-add" @click="FnBtnAdd" :loading="btnState.btnAdd" class="public-btn">
                  新增员工
               </el-button>
               <el-button icon="el-icon-folder-add" @click="FnBtnAdd" :loading="btnState.btnAdd" class="public-btn">导入
               </el-button>
               <el-button icon="el-icon-folder-add" @click="FnBtnAdd" :loading="btnState.btnAdd" class="public-btn">到处
               </el-button>
               <el-button icon="el-icon-folder-add" @click="FnBtnAdd" :loading="btnState.btnAdd" class="public-btn">
                  批量删除
               </el-button>
            </div>
         </el-form>
         <el-table class="public-table" border
                   :data="tableArr"
                   ref="refTable">
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="nickName" label="用户名"></el-table-column>
            <el-table-column prop="userName" label="姓名"></el-table-column>
            <el-table-column prop="phonenumber" label="电话">
               <template slot-scope="scope">
                  <el-input v-model="scope.row.phonenumber" @blur="blurInp"></el-input>
               </template>
            </el-table-column>
            <el-table-column prop="department" label="所属部门"></el-table-column>
            <el-table-column prop="station" label="岗位"></el-table-column>
            <el-table-column prop="leader" label="直属领导"></el-table-column>
            <el-table-column prop="role" label="角色"></el-table-column>
            <el-table-column prop="state" label="账户状态" min-width="120px">
               <template slot-scope="scope">
                  <el-switch
                     v-model="scope.row.status"
                     active-value="0"
                     inactive-value="1"
                     active-text="正常"
                     inactive-text="停用"
                     @change='FnBtnAdd(scope.row.status)'>
                  </el-switch>
               </template>
            </el-table-column>
            <el-table-column label="操作" min-width="180px">
               <template slot-scope="scope">
                  <el-button @click="FnBtnAdd(scope.row)">查看</el-button>
                  <el-button @click="FnBtnAdd(scope.row)">编辑</el-button>
                  <el-button @click="FnBtnAdd(scope.row)">重置密码</el-button>
               </template>
            </el-table-column>
         </el-table>

      </div>
   </div>
</template>

<script>
import {addUser,listUser,treeSelDept} from '@/assets/js/api'
export default {
   name: 'PeopleManage',
   watch: {
      filterText(val) {
         this.$refs.tree.filter(val);
      },
   },
   data() {
      return {
         filterText: '',

         departmentForm: {
            storeName: '',
            storeState: '',
         },
         btnState: {
            btnSearch: false,
            btnAdd: false,
         },

         stateArr: [
            {
               name: '部门1',
               value: 'bumen1',
            }
         ],
         treeData: [
            {
               id: 2,
               label: '财务部',
               children: [
                  {
                     id: 11,
                     label: '财务部',
                  },
               ]
            },
            {
               id: 1,
               label: '业务部',
               children: [
                  {
                     id: 11,
                     label: '业务一部',
                  },
                  {
                     id: 12,
                     label: '业务二部',
                  },
               ]
            },
         ],

         tableArr:[],
      }
   },
   methods: {
      blurInp(val) {
         console.log(val);
      },
      /*节点过滤*/
      filterNode(value, data) {
         if (!value) return true;
         return data.label.indexOf(value) !== -1;
      },
      /*tree 点击事件*/
      handleNodeClick(data) {
         console.log(data);
      },

      FnBtnAdd() {

      },
      FnBtnSearch() {

      },

      /*获取 用户列表 api 事件*/
      FnGetListUser(){
         listUser().then(res=>{
            console.log(res);
            this.tableArr =res.data;
         })
      },

      /*获取部门列表 api 事件*/
      FnGetTreeSelDept(){
         treeSelDept().then(res=>{
            console.log(res);
            this.treeData=res.data;
         })
      },


   },
   created(){
      this.FnGetListUser();
      this.FnGetTreeSelDept();
   }
}
</script>
