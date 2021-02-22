<template>
  <div class="public-main">
    <el-table class="public-table" border
              :data="tableArr"
              ref="refTable"
              height="600">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="code" label="货币代码"></el-table-column>
      <el-table-column prop="symbol" label="符号" ></el-table-column>
      <el-table-column prop="name" label="货币名称"></el-table-column>
      <el-table-column prop="exchange">
        <template slot-scope="scope" slot="header">
          <el-tooltip placement="top" >
            <span class='tr-tooltip'>官方汇率 <i class="el-icon-question"></i></span>
            <div slot="content">官方汇率取自于中国银行外汇牌价的中行折算价，每天凌晨更新一次，历史月份保留当月最后一天的汇率</div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="myExchange" label="我的汇率">
         <template slot-scope="scope" slot="header">
            <el-tooltip placement="top" >
               <span class='tr-tooltip'>我的汇率 <i class="el-icon-question"></i></span>
               <div slot="content">系统按照【我的汇率】进行币种换算,非月报数据取最新月份的汇率</div>
            </el-tooltip>
         </template>
      </el-table-column>
      <el-table-column prop="endTime" label="修改时间">
         <template slot-scope="scope" slot="header">
            <el-tooltip placement="top" >
               <span class='tr-tooltip'>修改时间 <i class="el-icon-question"></i></span>
               <div slot="content">本月修改【我的汇率】的时间</div>
            </el-tooltip>
         </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "ExchangeManage",
  data() {
    return {
      tableArr:[
        {
          code:'CNY',
          symbol:'￥',
          name:'人命币',
          exchange:'1.000',
          myExchange:'1.000',
          endTime:'2021-12-01 10:47',
        },
      ]
    }
  },
  methods: {

  },
  created() {

  },
}
</script>
