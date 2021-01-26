<template>
   <div class="public-main">
      <el-form :model="FormSearch" class="public-form" ref="refRoleForm" :inline="true">
         <el-select v-model="FormSearch.type" value.key="id" filterable clearable placeholder="仓库类型"
                    class="public-select"  >
            <el-option v-for="(item, index) in projectArr" :key="index"
                       :value="item.value"
                       :label="item.label">
            </el-option>
         </el-select>
         <el-select v-model="FormSearch.country" value.key="id" filterable clearable placeholder="所在国家"
                    class="public-select"  >
            <el-option v-for="(item, index) in countryArr" :key="index"
                       :value="item.value"
                       :label="item.label">
            </el-option>
         </el-select>
         <el-select v-model="FormSearch.store" value.key="id" filterable clearable placeholder="对应店铺"
                    class="public-select"  >
            <el-option v-for="(item, index) in storeArr" :key="index"
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
                ref="refTable"
                show-summary
                height="600">
         <el-table-column prop="name" label="仓库名称"></el-table-column>
         <el-table-column prop="type" label="仓库类型"></el-table-column>
         <el-table-column prop="shopType" label="商品种类"></el-table-column>
         <el-table-column prop="use" label="可用量"></el-table-column>
         <el-table-column prop="noSale" label="次品量/不可售量" width="160px">
            <template slot-scope="scope" slot="header">
               <el-tooltip placement="top" >
                  <span class='tr-tooltip'>次品量/不可售量 <i class="el-icon-question"></i></span>
                  <div slot="content">自建仓对应次品量，FBA对应不可售库存。</div>
               </el-tooltip>
            </template>
         </el-table-column>
         <el-table-column prop="reserve" label="预留库存量" width="120px"></el-table-column>
         <el-table-column prop="delivered" label="已发货未入库货件量" width="200px">
            <template slot-scope="scope" slot="header">
               <el-tooltip placement="top" >
                  <span class='tr-tooltip'>已发货未入库货件量 <i class="el-icon-question"></i></span>
                  <div slot="content">
                     <div>已发货未入库货件量 = 亚马逊物流入库发货数量 + 亚马逊物流入库接收数量</div>
                     <div>亚马逊物流入库发货数量 ：已通知亚马逊并提供追踪编码的入库货件中某个 SKU 的商品数量。</div>
                     <div>亚马逊物流入库接收数量：亚马逊运营中心尚未接收以进行处理，但属于其中某些商品已被接收并处理的入库货件的某个 SKU 的商品数量</div>
                  </div>
               </el-tooltip>
            </template>
         </el-table-column>
         <el-table-column prop="inspected" label="待质检量" width="100px">
            <template slot-scope="scope" slot="header">
               <el-tooltip placement="top" >
                  <span class='tr-tooltip'>待质检量 <i class="el-icon-question"></i></span>
                  <div slot="content">对应自建仓中需要进行质检的产品数量</div>
               </el-tooltip>
            </template>
         </el-table-column>
         <el-table-column prop="total" label="总量">
            <template slot-scope="scope" slot="header">
               <el-tooltip placement="top" >
                  <span class='tr-tooltip'>总量 <i class="el-icon-question"></i></span>
                  <div slot="content">总量 =  可用量 + 次品量/不可用量 + 预留数量 + 已发货未入库货件量 + 待质检量</div>
               </el-tooltip>
            </template>
         </el-table-column>
         <el-table-column prop="value" label="货值">
            <template slot-scope="scope" slot="header">
               <el-tooltip placement="top" >
                  <span class='tr-tooltip'>货值 <i class="el-icon-question"></i></span>
                  <div slot="content">
                     <div>FBA仓库库存，根据FNSKU所配对商品的采购成本统计得出</div>
                     <div>FBA库存货值=（配对商品的采购成本）* 总量</div>
                  </div>
               </el-tooltip>
            </template>
         </el-table-column>
         <el-table-column prop="cost" label="库存成本"  width="100px">
            <template slot-scope="scope" slot="header">
               <el-tooltip placement="top" >
                  <span class='tr-tooltip'>库存成本 <i class="el-icon-question"></i></span>
                  <div slot="content">对应自建仓中需要进行质检的产品数量</div>
               </el-tooltip>
            </template>
         </el-table-column>
      </el-table>
   </div>
</template>

<script>
export default {
   name: "WarehouseList",
   data() {
      return {
         /*搜索表单*/
         FormSearch:{
            type:'',
            store:'',
            country:'',
         },
         btnState:{
            btnPost:false,
         },
         projectArr:[
            {
               label:'成功',
               value:1,
            },
            {
               label:'等待中',
               value:2,
            }
         ],
         countryArr:[],
         storeArr:[],
         tableArr:[
            {
               name:'VIWO-US美国仓',
               type:'FBA',
               shopType:'8',
               use:999,
               noSale:0,
               reserve:0,
               delivered:2833,
               inspected:86,
               total:12918,
               value:0,
               cost:0,
            },
            {
               name:'VIWO-US美国仓',
               type:'FBA',
               shopType:'8',
               use:'$999',
               noSale:0,
               reserve:0,
               delivered:2833,
               inspected:86,
               total:12918,
               value:0,
               cost:0,
            },
         ],
      }
   },
   methods: {
      /*搜索提交*/
      FnPostSearch(){
         console.log(this.FormSearch);
      },
   },
   created() {

   },
}
</script>
