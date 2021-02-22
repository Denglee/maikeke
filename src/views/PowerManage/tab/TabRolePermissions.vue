<template>
   <div>
      <el-table :data="tableData6" :span-method="objectSpanMethod" border style="width: 100%; margin-top: 20px">
         <el-table-column prop="name" label="菜单模块" width="180"></el-table-column>
         <el-table-column prop="page" label="页面">
            <template slot-scope="scope">
               <el-checkbox  v-model="scope.row.page.value"
                             @change="checkPage(scope.row)">{{scope.row.page.name}}</el-checkbox>
            </template>
         </el-table-column>
         <el-table-column prop="amount1" label="功能项">
            <template slot-scope="scope">
<!--               <el-checkbox-group v-model="roleArr.effect" @change="checkGN">-->
<!--               <el-checkbox-group v-model="scope.row.amount1" @change="checkGN(scope.row)">-->
                  <el-checkbox v-for="(item,index) in scope.row.amount1" @change="checkGN(scope.row)"
                               :label="item.name"  :key="index" v-model="item.value" >
                  </el-checkbox>
<!--               </el-checkbox-group>-->
            </template>
         </el-table-column>

         <el-table-column prop="amount2" label="数据权限">
            <template slot-scope="scope">
               <el-select v-model="scope.row.amount2"  popper-class="elSelect-checkbox" class="public-select">
                  <el-option v-for="(item, index) in amount2"
                             :key="index"
                             :value="item.value"
                             :label="item.label">
                  </el-option>
               </el-select>
            </template>
         </el-table-column>
         <el-table-column prop="amount3" label="字段权限"></el-table-column>
      </el-table>
   </div>
</template>

<script>

export default {
   name: "RolePermissions",
   props: {
      checkID: {
         type: String,
      },
   },

   data() {
      return {
         roleArr: {
            checkedCities: [],
            effect: [],
         },
         checkedCities:[],

         spanArr: [],
         amount2:[
            {label:'本人',value:'1'},
            {label:'本人以及下属',value:'2'},
         ],
         tableData6: [
            {
               id: '1',
               name: '用户管理',
               page:{
                  name:'附件记录',
                  value:true,
               },
               // amount1: ['增加','修改','查询','查看'],
               amount1: [
                  {
                     name:'增加',
                     value:false,
                  },
                  {
                     name:'修改',
                     value:true,
                  },
                  {
                     name:'查询',
                     value:true,
                  },
                  {
                     name:'查看',
                     value:true,
                  },
               ],
               amount2: 1,
               amount3: 1,
            },
            {
               id: '1',
               name: '用户管理',
               page:{
                  name:'基础设置',
                  value:false,
               },
               amount1: [
                  {
                     name:'增加',
                     value:false,
                  },
                  {
                     name:'修改',
                     value:false,
                  },
               ],
               amount2: 1,
               amount3: 1,
            },
            {
               id: '2',
               name: '微信设置',
               page:{
                  name:'微信用户',
                  value:false,
               },
               amount1: [
                  {
                     name:'增加',
                     value:false,
                  },
                  {
                     name:'修改',
                     value:false,
                  },
               ],
               amount2: 1,
               amount3: 1,
            },
            {
               id: '2',
               name: '微信设置',
               page:{
                  name:'微信设置',
                  value:false,
               },
               amount1: [
                  {
                     name:'增加',
                     value:false,
                  },
                  {
                     name:'修改',
                     value:false,
                  },
               ],
               amount2: 1,
               amount3: 1,
            },
         ],

      }
   },
   methods: {
      checkGN(val){
         console.log(val);
      },
      checkPage(val){
         console.log(val);
      },
      getSpanArr(data) {
         for (var i = 0; i < data.length; i++) {
            if (i === 0) {
               this.spanArr.push(1);
               this.pos = 0
            } else {
               // 判断当前元素与上一个元素是否相同
               if (data[i].id === data[i - 1].id) {
                  this.spanArr[this.pos] += 1;
                  this.spanArr.push(0);
               } else {
                  this.spanArr.push(1);
                  this.pos = i;
               }
            }
         }
      },
      objectSpanMethod({row, column, rowIndex, columnIndex}) {
         if (columnIndex === 0) {
            const _row = this.spanArr[rowIndex];
            const _col = _row > 0 ? 1 : 0;
            return {
               rowspan: _row,
               colspan: _col
            }
         }
      },
},
   created() {
      this.getSpanArr(this.tableData6);
   },
}
</script>
