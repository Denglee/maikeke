<template>
   <div class="public-main">
      <el-form :model="FormSearch" class="public-form" ref="refRoleForm" :inline="true">

         <el-select v-model="FormSearch.countryId" filterable clearable multiple placeholder="选择国家"
                    class="public-select">
            <el-option v-for="(item, index) in stateArr" :key="index"
                       :value="item.siteId"
                       :label="item.siteName">
            </el-option>
         </el-select>

         <el-select v-model="FormSearch.sellerId" filterable clearable multiple placeholder="选择店铺"
                    class="public-select">
            <el-option v-for="(item, index) in storeArr" :key="index"
                       :value="item.id"
                       :label="item.label">
            </el-option>
         </el-select>

         <MonthRange @FnSonMonth="FaMonthRange"></MonthRange>

         <div class="public-selInp" style="width: 300px">
            <el-select placeholder="请选择" v-model="searchType"
                       @change="FnSearchType">
               <el-option v-for="(item,index) in searchTypeArr" :key="index"
                          :value="item.value"
                          :label="item.label">
               </el-option>
            </el-select>
            <el-input placeholder="请输入" autocomplete="off" v-model="searchTypeValue" clearable></el-input>
         </div>

         <el-button type="primary" class="public-btn" :loading="btnState.btnSearch"
                    icon="el-icon-search" @click="FnPostSearch('refRoleForm')">搜索
         </el-button>
         <el-button type="primary" class="public-btn" :loading="btnState.btnExport"
                    icon="el-icon-search" @click="FnExport('refRoleForm')">导出
         </el-button>
      </el-form>

      <el-table class="public-table" border
                :data="tableArr"
                ref="refTable"
                height="620"
               v-loading="btnState.loadTable">
<!--         <el-table-column type="selection"></el-table-column>-->
         <el-table-column prop="amazonOrderId" label="订单编号" width="120px"></el-table-column>
         <el-table-column prop="shipmentId" label="货件编号"></el-table-column>
         <el-table-column prop="shipmentItemId" label="货件商品编号" width="120px"></el-table-column>
         <el-table-column prop="sku" label="MSKU"></el-table-column>
         <el-table-column prop="asin" label="ASIN"></el-table-column>
         <el-table-column prop="productName" label="标题" width="200px"></el-table-column>
         <el-table-column prop="" label="本地品名/SKU" width="120px"></el-table-column>
         <el-table-column prop="storeName" label="店铺"></el-table-column>
         <el-table-column prop="countrySite" label="国家"></el-table-column>
         <el-table-column prop="purchaseDate" label="下单时间"></el-table-column>
         <el-table-column prop="paymentsDate" label="付款时间"></el-table-column>
         <el-table-column prop="shipmentDate" label="配送时间"></el-table-column>
         <el-table-column prop="reportingDate" label="配送报告时间" width="120px"></el-table-column>
         <el-table-column prop="buyerEmail" label="买家邮箱"></el-table-column>
         <el-table-column prop="buyerName" label="买家姓名"></el-table-column>
         <el-table-column prop="quantity_shipped" label="商品数量"></el-table-column>
         <el-table-column prop="quantityShipped" label="配送数量"></el-table-column>
         <el-table-column prop="itemPrice" label="商品金额"></el-table-column>
         <el-table-column prop="itemTax" label="商品税收"></el-table-column>
         <el-table-column prop="shippingPrice" label="运费金额"></el-table-column>
         <el-table-column prop="shippingTax" label="运费税"></el-table-column>
         <el-table-column prop="giftWrapPrice" label="礼品包装金额" width="120px"></el-table-column>
         <el-table-column prop="giftWrapTax" label="礼品包装金额税" width="120px"></el-table-column>
         <el-table-column prop="shipServiceLevel" label="配送服务类型" width="120px"></el-table-column>
         <el-table-column prop="recipientName" label="收件人"></el-table-column>
         <el-table-column prop="shipAddress1" label="地址一"></el-table-column>
         <el-table-column prop="shipAddress2" label="地址二"></el-table-column>
         <el-table-column prop="shipAddress3" label="地址三"></el-table-column>
         <el-table-column prop="shipCity" label="城市"></el-table-column>
         <el-table-column prop="shipState" label="州"></el-table-column>
         <el-table-column prop="shipPostalCode" label="邮编"></el-table-column>
         <el-table-column prop="shipCountry" label="国家"></el-table-column>
         <el-table-column prop="itemPromotionDiscount" label="商品促销折扣" width="120px"></el-table-column>
         <el-table-column prop="shipPromotionDiscount" label="配送的促销折扣" width="120px"></el-table-column>
         <el-table-column prop="carrier" label="承运人"></el-table-column>
         <el-table-column prop="trackingNumber" label="追踪编号"></el-table-column>
         <el-table-column prop="estimatedArrivalDate" label="预计收货时间" width="120px"></el-table-column>
         <el-table-column prop="fulfillmentCenterId" label="配送运营中心" width="120px"></el-table-column>
         <el-table-column prop="fulfillmentChannel" label="配送方式"></el-table-column>
         <el-table-column prop="salesChannel" label="订单来源"></el-table-column>
         <el-table-column prop="amazonOrderItemId" label="商品订单唯一编号" width="120px"></el-table-column>
         <el-table-column prop="merchantOrderItemId" label="商品唯一编号" width="120px"></el-table-column>
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
import {listOrder, exportOrder, listSite, selectListByUserId, } from "@/assets/js/api";
import MonthRange from "@/components/TimeRange/MonthRange";

export default {
   name: "AmazonShipping",
   components: {MonthRange},
   data() {
      return {
         FormSearch: {  /*搜索表单*/
            sellerId: [],   /*店铺id*/
            countryId: [],   /*国家id*/
            beginTime: '',
            endTime: '',
            amazonOrderId: '',  //订单编号
            asin: '',   //ASIN
            shipmentId: '', //货件编号
            shipmentItemId: '', // 货件商品编号
            sku: '',  //MSKU
         },
         btnState: {
            btnSearch: false,
            btnExport: false,

            loadTable:true,
         },
         storeArr: [],  /*全部店铺*/
         stateArr: [],  /*全部国家*/
         tableArr: [],  /*table*/

         pageArr: {
            pageNum: 1,
            total: 10,
            pageSize: 10,
         },
         searchType: 'amazonOrderId',
         searchTypeValue: '',
         searchTypeArr: [
            {label: '订单编号', value: 'amazonOrderId'},
            {label: 'ASIN', value: 'asin'},
            {label: '货件编号', value: 'shipmentId'},
            {label: '货件商品编号', value: 'shipmentItemId'},
            {label: 'MSKU', value: 'sku'},
         ]
      }
   },
   methods: {
      /* 1、 编辑选中  */
      checkedStore(val) {
         console.log(val);
         this.checkedRows = val;
      },
      /*点击行触发，选中或不选中复选框 */
      handleRowClick(row, column, event) {
         this.$refs.refTable.toggleRowSelection(row);
      },

      /*月份选择*/
      FaMonthRange(time) {
         console.log(time);
         this.FormSearch.beginTime = time[0];
         this.FormSearch.endTime = time[1];
      },

      /*类型选择*/
      FnSearchType(val) {
         console.log(val);
         this.searchTypeArr.forEach((item, index) => {
            if(item.value != val){
               this.FormSearch[item.value] = '';
            }else{
               this.FormSearch[item.value] = this.searchTypeValue;
            }
         })
      },

      /*搜索*/
      FnPostSearch() {
         this.GLOBAL.btnStateChange(this, 'btnState', 'btnSearch');
         this.FormSearch[this.searchType] = this.searchTypeValue;
         console.log(this.FormSearch);

         this.FnGetlistOrder();
      },

      /*导出*/
      FnExport() {
         this.GLOBAL.btnStateChange(this, 'btnState', 'btnExport');
         this.FormSearch[this.searchType] = this.searchTypeValue;
         console.log(this.FormSearch);
         // return
         exportOrder(this.FormSearch).then(res => {
            console.log(res);
            let nowDay = this.$moment(new Date()).format('YYYY-MM-DD');
            let fileName = `Distribution_${nowDay}_${new Date().getTime()}.xlsx`;
            this.GLOBAL.FnDownload(res.data, fileName);
         })
      },

      /*详情弹窗*/
      FnDiaOrderDetail(val, e) {
         console.log(val);
      },

      /*table 列表 api*/
      FnGetlistOrder() {
         listOrder(this.FormSearch, {
            params: {
               pageNum: this.pageArr.pageNum,
               pageSize: this.pageArr.pageSize,
            }
         }).then(res => {
            this.btnState.loadTable = false;
            this.tableArr = res.data;
            this.pageArr.total = res.total;
         })
      },

      /*搜索 表单 selArr*/
      FnGetSel() {
         /*国家站点*/
         listSite({
            type:1,
         }).then(res => {
            this.stateArr = res.data;
         });

         /*店铺*/
         selectListByUserId().then(res => {
            this.storeArr = res.data;
         });
      },
      /*分页 */
      FaPageCurrent(page) {
         this.pageArr.pageNum = page;
         this.FnGetlistOrder();
      },
      FaSizeChange(size) {
         this.pageArr.pageSize = size;
         this.FnGetlistOrder();
      },

   },
   created() {
      this.FnGetlistOrder();

      this.FnGetSel();
   },

}
</script>
