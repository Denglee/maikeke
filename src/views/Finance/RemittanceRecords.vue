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

       <el-row :gutter="10" class="funds-history">
          <el-col :span="4" class="funds-left">
             <el-card>
                <h4 class="funds-title">回款记录</h4>
                <div class="funds-subTitle">总金额</div>
                <div class="funds-price">￥2291309.22</div>
                <div class="borderBom"></div>
                <div class="funds-subTitle">未结算金额</div>
                <div class="funds-price">￥221309.22</div>
                <div class="funds-subTitle">已转账金额</div>
                <div class="funds-price">￥2291309.22</div>
             </el-card>

          </el-col>
          <el-col :span="20">
             <el-card>
                <ve-histogram
                   :data="chartData"
                   height="280px"
                   :colors="HisColor"
                   :extend="histogramConfig"
                ></ve-histogram>
             </el-card>
          </el-col>
       </el-row>

       <el-table class="public-table" border
                 :data="tableArr"
                 ref="refTable"
                 height="600">
          <el-table-column prop="time" label="日期"></el-table-column>
          <el-table-column prop="store" label="店铺"></el-table-column>
          <el-table-column prop="country" label="国家"></el-table-column>
          <el-table-column prop="MSKU" label="昨日余额"></el-table-column>
          <el-table-column prop="ASIN" label="标准订单回款" width="100px"></el-table-column>
          <el-table-column prop="MSKU" label="发票支付订单回款" width="130px"></el-table-column>
          <el-table-column prop="MSKU" label="回款总额"></el-table-column>
          <el-table-column prop="MSKU" label="预留金额"></el-table-column>
          <el-table-column prop="MSKU" label="未结算的标准订单金额" width="150px"></el-table-column>
          <el-table-column prop="MSKU" label="未结算的发票支付订单" width="150px"></el-table-column>
          <el-table-column prop="MSKU" label="未结算单"></el-table-column>
          <el-table-column prop="MSKU" label="可结算金额/可用资金" width="150px"></el-table-column>
          <el-table-column prop="MSKU" label="今日账户余额" width="100px"></el-table-column>
          <el-table-column prop="MSKU" label="较昨日业务增长额" width="130px"></el-table-column>
          <el-table-column prop="MSKU" label="核算主体"></el-table-column>
          <el-table-column prop="MSKU" label="核算店铺"></el-table-column>
          <el-table-column prop="title" label="更新时间" orderable></el-table-column>
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

import {histogramConfig,} from '@/assets/js/VChartsConfig/VChartsConfig'
import Pagination from "@/components/Pagination/Pagination";

export default {
    name: "RemittanceRecords", //回款记录
   components:{Pagination},
    data(){
     return{
        HisColor:histogramConfig.color,
        histogramConfig:histogramConfig,
        chartData: {
           columns: ['日期', '访问用户',],
           rows: [
              { '日期': '2020-11', '访问用户': 1393,  },
              { '日期': '2020-10', '访问用户': 3530, },
              { '日期': '2020-09', '访问用户': 2923, },
              { '日期': '2020-08', '访问用户': 1723, },
              { '日期': '2020-07', '访问用户': 3792, },
              { '日期': '2020-06', '访问用户': 4593,  },
              { '日期': '2020-05', '访问用户': 4593,  },
              { '日期': '2020-04', '访问用户': 4593,  },
              { '日期': '2020-03', '访问用户': 4593,  },
           ]
        },

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

        tableArr:[
           {
              store:'BYKE-us',
              country:'美国',
              MSKU:'',
              ASIN:"B07B2WNNB2",
              time:'2020-11-19',
           },
           {
              store:'BYKE-us',
              country:'美国',
              MSKU:'',
              ASIN:"B07B2WNNB2",
              time:'2020-11-19',
           },
        ],
     }
    },

    methods:{
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

    created(){
    
    },

}
</script>
