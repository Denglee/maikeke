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
         <el-table-column type="selection"></el-table-column>
         <el-table-column prop="store" label="店铺"></el-table-column>
         <el-table-column prop="country" label="国家"></el-table-column>
         <el-table-column prop="orderNum" label="订单号"></el-table-column>
         <el-table-column prop="shopInfo" label="商品信息"></el-table-column>
         <el-table-column prop="SKU" label="本地品名/SKU"></el-table-column>
         <el-table-column prop="buyerInfo" label="买家信息"></el-table-column>
         <el-table-column prop="orderTotal" label="订单总金额"></el-table-column>
         <el-table-column prop="time" label="订单时间"></el-table-column>
         <el-table-column prop="state" label="状态">
            <template slot-scope="scope">
               <span v-if="scope.row.state == 1" style="color:green;">在售</span>
               <span v-else class="stop">停售</span>
            </template>
         </el-table-column>
         <el-table-column label="操作">
            <template slot-scope="scope">
               <el-button @click.native.stop="FnDiaOrderDetail(scope.row,$event)">详情</el-button>
            </template>
         </el-table-column>
      </el-table>


   </div>
</template>

<script>
export default {
   name: "PromotionOrder",
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
               store:'BYKE-us',
               country:'美国',
               orderNum:'112-286-2336241',
               shopInfo:'Booty Bands，',
               SKU:'',
               buyerInfo:'',
               orderTotal:'',
               listingErr:'1',
               time:'2020-11-19',
               state:1,
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