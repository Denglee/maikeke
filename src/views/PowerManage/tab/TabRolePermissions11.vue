<template>
   <div>
      <el-form :model="form">
         <div class="power-box">
            <!--            <div class="power-row">-->
            <!--               <div class="power-left">菜单模块</div>-->
            <!--               <div class="power-right">-->
            <!--                  <ul class="power-row2">-->
            <!--                     <li class="power-left2">页面</li>-->
            <!--                     <li class="power-left3">功能项</li>-->
            <!--                     <li class="power-right2">数据权限</li>-->
            <!--                  </ul>-->
            <!--               </div>-->
            <!--            </div>-->

            <div v-for="(itemFirst, index) in tableData6" :key="index" style="display: flex">
               <div v-if="itemFirst.menuType == 'M'">
                  <span>11{{ itemFirst.menuName }}</span>
               </div>
               <div v-if="itemFirst.menuType == 'C'">
                  <el-checkbox :checked="itemFirst.checked == 1">
                     22{{ itemFirst.menuName }}
                  </el-checkbox>
               </div>
               <div v-if="itemFirst.menuType == 'F'">
                  <el-checkbox :checked="itemFirst.checked == 1">
                     33{{ itemFirst.menuName }}
                  </el-checkbox>
               </div>
            </div>

            <!--            <div class="power-row" v-for="(itemFirst, index) in tableData6" :key="index">
                           <div class="power-left" v-if="itemFirst.menuType == 'M'">11{{itemFirst.menuName}}</div>
                           <div class="power-right">
                              <ul class="power-row2">
                                 <li class="power-left2" v-if="itemFirst.menuType == 'C'">22{{itemFirst.menuName}}</li>
                                 <li class="power-left3" v-if="itemFirst.menuType == 'F'">33{{itemFirst.menuName}}</li>
            &lt;!&ndash;                     <li class="power-right2">数据权限</li>&ndash;&gt;
                              </ul>
                           </div>
                        </div>-->

         </div>
      </el-form>

      <el-button @click="saveRole">保存</el-button>
   </div>
</template>

<script>

import {menuRoleTree, selectMenuTable} from '@/assets/js/api'

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

         form: {
            models: [],
            second: [2002, 2020],
            third: [2009],
         },
         // roleArr: {
         //    checkedCities: [],
         //    effect: [],
         // },


         amount2: [
            {label: '本人', value: '1'},
            {label: '本人以及下属', value: '2'},
         ],

         tableData6: [],
      }
   },
   methods: {
      // handleCheckAllChange(val) {
      //    this.checkedCities = val ? this.form.third : [];
      //    this.isIndeterminate = false;
      // },
      // handleCheckedCitiesChange(value) {
      //    let checkedCount = value.length;
      //    this.checkAll = checkedCount === this.tableData6.children.length;
      //    this.isIndeterminate = checkedCount > 0 && checkedCount < this.tableData6.children.length;
      // },
      FnGetMenuRoleTree(checkRoleId) {
         // menuRoleTree(checkRoleId).then(res=>{
         selectMenuTable().then(res => {
            console.log(res);
            // this.deptList = this.GLOBAL.handleTree(res.data, "parentId");
            // console.log(this.GLOBAL.handleTree(res.data, "parentId"));


            this.tableData6 = res.data;
            this.third = res.checkedKeys;
         })
      },

      changeLevel(val) {
         console.log(val);
      },

      checkGN(val) {
         console.log(val.id);
      },

      saveRole() {
         console.log(this.form);
      },

   },
   created() {

   },
   mounted() {
      this.FnGetMenuRoleTree(this.checkRoleId);
   },
}
</script>
<style lang="scss">
.power-box {
   width: 100%;
   height: auto;
   border: 1px solid #eee;
}

.power-row {
   display: flex;
   background: #fff;
   border-bottom: 1px solid #eee;

   &:last-child {
      border: 0;
   }
}

.power-row2 {
   display: flex;
   border-bottom: solid 1px #eee;

   &:last-child {
      border: 0;
   }
}

.power-left {
   width: 15%;
   flex-shrink: 0;
   border-right: 1px solid #eee;
   padding: 5px;
   -webkit-box-sizing: border-box;
   box-sizing: border-box;
}

.power-left2 {
   border-right: solid 1px #ddd;
   padding: 5px;
   display: flex;
   width: 20%;
   flex-shrink: 0;
}

.power-left3 {
   padding: 5px;
   display: flex;
   flex-wrap: wrap;
   width: 65%;

   .el-checkbox-group {
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

.power-right2 {
   width: 15%;
   border-left: solid 1px #eee;
   padding: 5px;
}
</style>