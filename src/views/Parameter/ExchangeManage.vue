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
            <div slot="content">官方汇率</div>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="myExchange" label="我的汇率"></el-table-column>
      <el-table-column prop="endTime" label="修改时间"></el-table-column>
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
