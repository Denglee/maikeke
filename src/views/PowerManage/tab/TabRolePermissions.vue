<template>
   <div>
      <el-form :model="PermissForm" >
         <div class="power-box">
            <div class="power-row">
               <div class="power-left">菜单模块</div>
               <div class="power-right">
                  <ul class="power-row2">
                     <li class="power-left2">页面</li>
                     <li class="power-left3">功能项</li>
                     <li class="power-right2">数据权限</li>
                  </ul>
               </div>
            </div>
            <div class="power-row" v-for="(itemFirst, index) in tableData6" :key="index">
               <div class="power-left">{{itemFirst.menuName}}</div>

               <div class="power-right">
                  <ul class="power-row2" v-for="(itemSecond, index2) in itemFirst.children" :key="index2">
                     <li class="power-left2">
                        <el-checkbox-group v-model="PermissForm.PermissPage">
                           <el-checkbox :label="itemSecond.menuId" :value="itemSecond.menuId" >{{itemSecond.menuName}}</el-checkbox>
                        </el-checkbox-group>
                     </li>
                     <li class="power-left3">
                        <el-checkbox-group v-model="PermissForm.PermissFunction" v-for="(itemThird, index3) in itemSecond.children" :key="index3">
                           <el-checkbox  :label="itemThird.menuId" :value="itemThird.menuId" >{{itemThird.menuName}}</el-checkbox>
                        </el-checkbox-group>
                     </li>
                     <li class="power-right2">
                        <el-select v-model="itemSecond.dataScope"
                                   @change="changeLevel(itemSecond)"
                                    v-if="itemSecond.ifScope == 1">
                           <el-option :value="0" label="未分配"></el-option>
                           <el-option :value="1" label="所有数据权限"></el-option>
                           <el-option :value="2" label="本部门数据权限"></el-option>
                           <el-option :value="3" label="本部门及以下数据权限"></el-option>
                           <el-option :value="4" label="本人及以下部门数据权限"></el-option>
                           <el-option :value="5" label="本人"></el-option>
                        </el-select>

                     </li>
                  </ul>
               </div>

            </div>
         </div>
      </el-form>

      <el-button @click="FnSaveRole">保存</el-button>
   </div>
</template>

<script>

import {menuRoleTree, selectMenuTable, saveRole, updateDept} from '@/assets/js/api'
export default {
   name: "RolePermissions",
   props: {
      checkRoleId: {
         type: String | Number,
      }
   },

   data() {
      return {
         isIndeterminate: true,
         checkAll: false,

         PermissForm:{
            PermissPage:[],  //页面
            PermissFunction:[],  //功能项
         },
         dataRoleMenuPage:[],  //页面集合
         dataRoleMenuArr:[],  //菜单集合

         amount2:[
            {label:'本人',value:'1'},
            {label:'本人以及下属',value:'2'},
         ],

         tableData6:[],

         /*保存提交 携带参数*/
         RoleParm:{
            roleSort:0,
            roleName:'',
            roleKey:'',
         },
      }
   },
   methods: {
      FnGetMenuRoleTree(checkRoleId){
         // console.log(checkRoleId);
         this.PermissForm.PermissPage = [];
         this.PermissForm.PermissFunction = [];
         this.dataRoleMenuPage = [];
         this.dataRoleMenuArr = [];

         selectMenuTable(checkRoleId).then(res=>{
            let menuData = res.data.list;
            this.tableData6 = menuData;

            this.RoleParm = {
               roleSort:res.data.roleSort,
               roleName:res.data.roleName,
               roleKey:res.data.roleKey,
            };

            /*循环选中 */
            menuData.forEach((menu,index)=>{
               // console.log(item.menuId);
               /*第一级别 菜单模块 保存menuid*/
               this.dataRoleMenuArr.push({
                  dataScope:0,
                  menuId:menu.menuId,
               })
               menu.children.forEach((page2,index2)=>{
                  // console.log(item2);
                  /*如果checked == 1 就添加到选中*/
                  if(page2.checked == 1){
                     /*页面*/
                     this.PermissForm.PermissPage.push(page2.menuId);
                     this.dataRoleMenuPage.push({
                        dataScope:page2.dataScope,
                        menuId:page2.menuId,
                     })
                  }
                  page2.children.forEach((fun3,index3)=>{
                     if(fun3.checked == 1){
                        /*功能*/
                        this.PermissForm.PermissFunction.push(fun3.menuId);
                     }
                  })
               });
            })
            // console.log(this.PermissForm.PermissFunction);
            // console.log(this.dataRoleMenuPage);
            // console.log(this.PermissForm.PermissPage);
         })
      },

      /*分配 select 减少*/
      changeLevel(val){
         console.log(val);

         /*循环修改*/
         this.dataRoleMenuPage.forEach((item,index)=>{
            if(val.menuId == item.menuId){
               item.dataScope = val.dataScope;
            }
         })
         // console.log(this.dataRoleMenuPage);
      },

      /*保存*/
      FnSaveRole(){
         // console.log(this.PermissForm);
         // console.log(this.dataRoleMenuPage);
         let roleMenuVosArr = [];

         /*菜单集合*/
         this.dataRoleMenuArr.forEach((item,index)=>{
            roleMenuVosArr.push({
               dataScope:item.dataScope,
               menuId:item.menuId,
            });
         })

         /*页面 + 数据 id一样添加*/
         this.PermissForm.PermissPage.forEach((item,index)=>{
            this.dataRoleMenuPage.forEach((item2,index2)=>{
               if(item == item2.menuId){
                  roleMenuVosArr.push({
                     dataScope:item2.dataScope,
                     menuId:item2.menuId,
                  })
               }
            })
         })
         // console.log( this.PermissForm.PermissFunction);

         /*功能 集合*/
         this.PermissForm.PermissFunction.forEach((item,index)=>{
            roleMenuVosArr.push({
               dataScope:0,
               menuId:item,
            });
         })

         // console.log(roleMenuVosArr);

         let dataParm = {
            roleMenuVos:roleMenuVosArr,
            roleId:this.checkRoleId,
            roleSort:this.RoleParm.roleSort,
            roleName:this.RoleParm.roleName,
            roleKey:this.RoleParm.roleKey,
         };

         console.log(dataParm);
         /*保存接口*/
         saveRole(dataParm).then(res=>{
            console.log(res);
            if(res.code== 200){
               this.$message.success(res.msg);
            }else{
               this.$message.error(res.msg);
            }
         })
      },

},
   created() {

   },
   mounted(){
      this.FnGetMenuRoleTree(this.checkRoleId);
   },
}
</script>
<style lang="scss">
.power-box{
   width: 100%;
   height: auto;
   border: 1px solid #eee;
}
.power-row{
   display: flex;
   background: #fff;
   border-bottom: 1px solid #eee;
   &:last-child {
      border: 0;
   }
}
.power-row2{
   display: flex;
   border-bottom: solid 1px #eee;
   &:last-child {
      border: 0;
   }
}
.power-left{
   width:15%;
   flex-shrink: 0;
   border-right: 1px solid #eee;
   padding: 5px;
   -webkit-box-sizing: border-box;
   box-sizing: border-box;
}
.power-left2{
   border-right: solid 1px #ddd;
   padding: 5px;
   display: flex;
   width: 20%;
   flex-shrink: 0;
}
.power-left3{
   padding: 5px;
   display: flex;
   flex-wrap: wrap;
   width: 65%;
   .el-checkbox-group{
      margin-right: 10px;
   }
}

.power-right {
   border-right: 1px solid #eee;
   width: 85%;
   //padding:0 5px;
   &:last-child {
      border-right: 0;
   }
}
.power-right2{
   width: 15%;
   border-left: solid 1px #eee;
   padding: 5px;
}
</style>