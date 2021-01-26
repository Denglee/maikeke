<template>
   <div class="public-main">
      <el-form :model="FormSearch" class="public-form" ref="refRoleForm" :inline="true">
         <el-radio-group v-model="FormSearch.orderType">
            <el-radio-button label="1">全部订单</el-radio-button>
            <el-radio-button label="2">测评订单</el-radio-button>
            <el-radio-button label="3">留评订单</el-radio-button>

         </el-radio-group>
         <el-select v-model="FormSearch.project" value.key="id" filterable clearable placeholder="请选择状态"
                    class="public-select"  >
            <el-option v-for="(item, index) in projectArr" :key="index"
                       :value="item.value"
                       :label="item.label">
            </el-option>
         </el-select>
         <el-select v-model="FormSearch.project" value.key="id" filterable clearable placeholder="请选择配对"
                    class="public-select"  >
            <el-option v-for="(item, index) in projectArr" :key="index"
                       :value="item.value"
                       :label="item.label">
            </el-option>
         </el-select>
         <el-date-picker
            class="public-datePicker"
            v-model="FormSearch.order_time"
            type="daterange"
            unlink-panels
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd">
         </el-date-picker>

         <el-button type="primary" class="public-btn" :loading="btnState.btnPost"
                    @click="FnPostSearch('refRoleForm')">提交
         </el-button>
      </el-form>

      <el-table class="public-table" border
                :data="tableArr"
                @selection-change="checkedStore"
                ref="refTable"
                height="600"
                @row-click="handleRowClick">
         <el-table-column prop="dp" label="店铺"></el-table-column>
         <el-table-column prop="dpgj" label="店铺国家"></el-table-column>
         <el-table-column prop="yx" label="邮箱"></el-table-column>
         <el-table-column prop="zdds" label="总订单数" sortable></el-table-column>
         <el-table-column prop="tkdds" label="退款订单数"></el-table-column>
         <el-table-column prop="zzgmsj" label="最早购买时间"></el-table-column>
         <el-table-column prop="zjgmsj" label="最近购买时间"></el-table-column>
         <el-table-column prop="mjgj" label="买家国家"></el-table-column>
      </el-table>

   </div>
</template>

<script>
export default {
   name: "UserList",
   data(){
      return{
         FormSearch:{
            orderType:1,
         },
         btnState:{

         },
         diaState:{

         },
         projectArr: [
            {
               id: '1',
               value: 'shop1',
               label: '店铺1',
            },
            {
               id: '2',
               value: 'shop2',
               label: '店铺2',
            },
         ],
         tableArr:[
            {
               dp:'BYKE-US',
               dpgj:'美国',
               yx:'jvjw82lf@make.amazon.com',
               zdds:'876',
               tkdds:'1',
               zzgmsj:'2020-06-26',
               zjgmsj:'2020-11-11',
               mjgj:'US',
            },
            {
               dp:'VIWO-US',
               dpgj:'美国',
               yx:'w80csh@make.amazon.com',
               zdds:'750',
               tkdds:'2',
               zzgmsj:'2020-07-26',
               zjgmsj:'2020-11-11',
               mjgj:'US',
            },
            {
               dp:'VIWO-US',
               dpgj:'美国',
               yx:'l137sh@make.amazon.com',
               zdds:'650',
               tkdds:'2',
               zzgmsj:'2020-09-26',
               zjgmsj:'2020-12-11',
               mjgj:'US',
            },
         ],

      }
   },
   methods:{
      /* 1、 编辑选中  */
      checkedStore(val) {
         console.log(val);
         this.checkedRows = val;
      },
      /*点击行触发，选中或不选中复选框 */
      handleRowClick(row, column, event) {
         this.$refs.refTable.toggleRowSelection(row);
      },

      FnPostSearch(){
         console.log(this.FormSearch);
      },

      changeLisErr(val){
         console.log(val);
      },

      /*详情弹窗*/
      FnDiaOrderDetail(val,e){
         console.log(val);
      },

   },
   created(){

   },
   components:{

   },
}
</script>
