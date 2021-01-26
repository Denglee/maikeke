<template>
   <div class="public-main">
      <el-form :model="FormSearch" class="public-form" ref="refRoleForm" :inline="true">
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

      <el-table class="public-table total-table" border
                :data="tableArr"
                ref="refTable"
                show-summary
                :fit="false">
         <el-table-column prop="name" label="仓库" min-width="120px"></el-table-column>
         <el-table-column prop="type" label="图片"></el-table-column>
         <el-table-column prop="SAIN" label="SAIN" sortable></el-table-column>
         <el-table-column prop="MSKU" label="MSKU" sortable min-width="100px"></el-table-column>
         <el-table-column prop="FNSKU" label="FNSKU" sortable min-width="100px"></el-table-column>
         <el-table-column prop="FNSKU" label="品名/SKU" sortable min-width="120px"></el-table-column>
         <el-table-column prop="FNSKU" label="售价"></el-table-column>
         <el-table-column prop="FNSKU" label="每件售出费用预览" width="140px" ></el-table-column>
         <el-table-column prop="noSale" label="库存成本" min-width="100px">
            <template slot-scope="scope" slot="header">
               <el-tooltip placement="top" >
                  <span class='tr-tooltip'>库存成本 <i class="el-icon-question"></i></span>
                  <div slot="content">
                     <div>FBA仓库库存，根据FNSKU所配对商品的 统计得出</div>
                     <div>库存成本=（配对商品的采购成本+默认头程费用）*（可售+不可售+预留数量 + 货件在途 + 货件入库中 ）</div>
                  </div>
               </el-tooltip>
            </template>
         </el-table-column>
         <el-table-column prop="noSale" label="货值">
            <template slot-scope="scope" slot="header">
               <el-tooltip placement="top" >
                  <span class='tr-tooltip'>货值 <i class="el-icon-question"></i></span>
                  <div slot="content">
                     <div>FBA仓库库存，根据FNSKU所配对商品的采购成本统计得出</div>
                     <div>货值 = 配对商品的采购成本*（可售+不可售+预留数量 + 货件 在途 + 货件入库中 ）</div>
                  </div>
               </el-tooltip>
            </template>
         </el-table-column>
         <el-table-column prop="noSale" label="库存总量" min-width="100px">
            <template slot-scope="scope" slot="header">
               <el-tooltip placement="top" >
                  <span class='tr-tooltip'>库存总量 <i class="el-icon-question"></i></span>
                  <div slot="content">库存总量 = 可售+不可售+预留数量</div>
               </el-tooltip>
            </template>
         </el-table-column>
         <el-table-column prop="FNSKU" label="可售" sortable></el-table-column>
         <el-table-column prop="noSale" label="不可售">
            <template slot-scope="scope" slot="header">
               <el-tooltip placement="top" >
                  <span class='tr-tooltip'>不可售 <i class="el-icon-question"></i></span>
                  <div slot="content">库存总量 = 可售+不可售+预留数量</div>
               </el-tooltip>
            </template>
         </el-table-column>
         <el-table-column prop="FNSKU" label="预留数量" sortable min-width="100px"></el-table-column>
         <el-table-column prop="FNSKU" label="预留_买家订单" sortable min-width="130px"></el-table-column>
         <el-table-column prop="FNSKU" label="预留_运营中心转运" sortable min-width="150px"></el-table-column>
         <el-table-column prop="FNSKU" label="预留_运营中心处理中" sortable min-width="160px"></el-table-column>
         <el-table-column prop="FNSKU" label="货件计划入库" sortable min-width="130px"></el-table-column>
         <el-table-column prop="FNSKU" label="货件在途" sortable min-width="130px"></el-table-column>
         <el-table-column prop="FNSKU" label="货件入库中" sortable min-width="130px"></el-table-column>
         <el-table-column prop="FNSKU" label="物流总量" sortable min-width="130px"></el-table-column>
      </el-table>

      <!--分页-->
      <el-pagination
         background
         layout="total,  prev, pager,next, sizes, jumper"
         :page-sizes="[10, 20, 50, 100]"
         :current-page="pageArr.pageNum"
         :total="pageArr.total"
         :page-size="pageArr.pageSize"
         @size-change='sizeChange'
         @current-change="PageCurrent">
      </el-pagination>

   </div>
</template>

<script>
export default {
   name: "FBAInventory",
   data() {
      return {
         pageArr: {
            total: 100,
            pageSize: 10,
            pageNum: 4,
         },
         FormSearch:{

         },
         btnState:{

         },
         projectArr:{

         },
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

      /*分页*/
      /*分页*/
      PageCurrent(page) {
         console.log(page)
         this.pageArr.pageNum = page;
         // this.getStaffIndex();
      },
      sizeChange(size){
         console.log(size);
         this.pageArr.pageSize = size;
      },

   },
   created() {

   },
}
</script>
<style lang="scss">
   .total-table{
      overflow: auto;
      &::after {
         position: relative ;
      }
      .el-table__body-wrapper,
      .el-table__header-wrapper,
      .el-table__footer-wrapper {
         overflow: visible;
      }
   }
</style>