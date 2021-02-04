<template>
   <div class="public-main">

      <el-form :model="FormSearch" class="public-form" ref="refRoleForm" @submit.native.prevent
               label-width="120px" label-position="left" :inline="true">

         <el-select placeholder="核算主体" v-model="FormSearch.zhuti" class="public-select">
            <el-option v-for="(item,index) in storeArr" :key="index"
                       :value="item.value"
                       :label="item.label">
            </el-option>
         </el-select>
         <el-select placeholder="核算店铺" v-model="FormSearch.store" class="public-select">
            <el-option v-for="(item,index) in storeArr" :key="index"
                       :value="item.value"
                       :label="item.label">
            </el-option>
         </el-select>
         <el-select placeholder="销售店铺" v-model="FormSearch.store2" class="public-select">
            <el-option v-for="(item,index) in storeArr" :key="index"
                       :value="item.value"
                       :label="item.label">
            </el-option>
         </el-select>
         <el-select placeholder="销售店铺" v-model="FormSearch.country" class="public-select">
            <el-option v-for="(item,index) in storeArr" :key="index"
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
                    @click="FnPostSearch('refRoleForm')">搜索
         </el-button>

      </el-form>

      <!--管理-->
<!--      <customThead :TrCheckedArr="TrCheckedArr" pageRefs="pageRecords" :diaSetTr="diaState.diaSetTr"-->
<!--                   @closeDia='closeDia'></customThead>-->



      <el-table :data="tableData" border ref="refTable">
         <el-table-column type="selection" width="55" align="center"></el-table-column>
         <el-table-column v-if="TrCheckedArr[0].iState" prop="name" label="名称" align="center"></el-table-column>
         <el-table-column v-if="TrCheckedArr[1].iState" prop="select" label="性别" align="center"></el-table-column>
         <el-table-column v-if="TrCheckedArr[2].iState" prop="kafang" label="年龄" align="center"></el-table-column>
         <el-table-column v-if="TrCheckedArr[3].iState" prop="fengbi" label="时间" align="center"></el-table-column>
         <el-table-column v-if="TrCheckedArr[4].iState" prop="isETF" label="事件" align="center"></el-table-column>
         <el-table-column v-if="TrCheckedArr[5].iState" prop="range" label="地点" align="center"></el-table-column>
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
import customThead from '@/components/publicPage/customThead'
import {histogramConfig,} from '@/assets/js/VChartsConfig/VChartsConfig'

import Pagination from "@/components/Pagination/Pagination";
export default {
   name: "AccountFunds", //回款记录
   components:{Pagination},
   data() {
      return {

         btnState:{
            btnPost:false
         },
         pageArr: {
            total: 10,  //总条数
            pageSize: 20, //每页个数
            pageNum: 1, //当前页数
         },
         diaState: {
            diaSetTr: false,
         },
         FormSearch: {},
         storeArr:[
            { label:'', name:'' },
         ],
         TrCheckedArr: [
            {title: "名称", iState: true,},
            {title: "性别", iState: false,},
            {title: "年龄", iState: true,},
            {title: "时间", iState: true,},
            {title: "事件", iState: true,},
            {title: "地点", iState: true,},
         ],
         tableData: [],
      }
   },

   methods: {
      FnPostSearch(){
         console.log(this.FormSearch);
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

   created() {

   },

}
</script>

