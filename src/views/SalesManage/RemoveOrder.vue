<template>
   <div class="public-main">
      <el-form :model="FormSearch" class="public-form" ref="refRoleForm" :inline="true">
         <el-select v-model="FormSearch.people" value.key="id" filterable clearable placeholder="负责人"
                    class="public-select"  >
            <el-option v-for="(item, index) in projectArr" :key="index"
                       :value="item.value"
                       :label="item.label">
            </el-option>
         </el-select>
         <el-select v-model="FormSearch.country" value.key="id" filterable clearable placeholder="全部国家"
                    class="public-select"  >
            <el-option v-for="(item, index) in projectArr" :key="index"
                       :value="item.value"
                       :label="item.label">
            </el-option>
         </el-select>
         <el-select v-model="FormSearch.store" value.key="id" filterable clearable placeholder="全部店铺"
                    class="public-select"  >
            <el-option v-for="(item, index) in projectArr" :key="index"
                       :value="item.value"
                       :label="item.label">
            </el-option>
         </el-select>
         <el-select v-model="FormSearch.store" value.key="id" filterable clearable placeholder="全部状态"
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
         <el-input v-model="FormSearch.name" class="public-input" autocomplete="off" placeholder="请输入"
                   clearable></el-input>
         <el-button type="primary" class="public-btn" :loading="btnState.btnPost"
                    icon="el-icon-search"   @click="FnPostSearch('refRoleForm')">搜索
         </el-button>
      </el-form>

      <el-table class="public-table" border
                :data="tableArr"
                ref="refTable"
                height="600">
         <el-table-column prop="orderNum" label="订单号" width="120px"></el-table-column>
         <el-table-column prop="MSKU" label="MSKU" width="120px"></el-table-column>
         <el-table-column prop="ASIN" label="FNSKu"></el-table-column>
         <el-table-column prop="store" label="店铺"></el-table-column>
         <el-table-column prop="country" label="国家"></el-table-column>
         <el-table-column prop="SKU" label="品名/SKU"></el-table-column>
         <el-table-column prop="type" label="类型"></el-table-column>
         <el-table-column prop="type" label="状态"></el-table-column>
         <el-table-column prop="type" label="库存属性"></el-table-column>
         <el-table-column prop="buyNum" label="数量"></el-table-column>
         <el-table-column prop="buyNum" label="取消数量"></el-table-column>
         <el-table-column prop="buyNum" label="已处置数量"></el-table-column>
         <el-table-column prop="buyNum" label="已发货"></el-table-column>
      </el-table>
      <Pagination
         :pageNum="pageArr.pageNum"
         :total="pageArr.total"
         :pageSize="pageArr.pageSize"
         @SonSizeChange='FaSizeChange'
         @SonCurrentChange="FaPageCurrent"></Pagination>

   </div>
</template>

<script>

export default {
   name: "RemoveOrder",
   components:{},
   data(){
      return{
         pageArr: {
            total: 10,  //总条数
            pageSize: 20, //每页个数
            pageNum: 1, //当前页数
         },
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
               SKU:'A1-MK7-40mm',
               MSKU:'fs47-grey-xiaohao',
               ASIN:"B07B2WNNB2",
               title:"Adjustable iPad Stand,Table Stand Holders",
               buyNum:'1',
               orderTotal:'LAS2',
               listingErr:'1',
               time:'2020-11-19',
               state:1,
            },
            {
               store:'BYKE-us',
               country:'美国',
               orderNum:'112-286-2336241',
               shopInfo:'Booty Bands，',
               SKU:'A1-MK7-40mm',
               MSKU:'fs47-grey-xiaohao',
               ASIN:"B07B2WNNB2",
               title:"Adjustable iPad Stand,Table Stand Holders",
               buyNum:'1',
               orderTotal:'LAS2',
               listingErr:'1',
               time:'2020-11-19',
               state:1,
            },
         ],

      }
   },
   methods:{
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

      /*分页*/
      FaPageCurrent(page) {
         console.log(page)
         // this.staffPage = page;
         // this.getStaffIndex();
      },
      FaSizeChange(size) {
         console.log(size);
      },
   },
   created(){

   },
}
</script>