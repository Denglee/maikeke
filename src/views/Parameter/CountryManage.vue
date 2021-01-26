<template>
  <div class="public-main">
    <el-table class="public-table" border
              :data="tableArr"
              ref="refTable"
              height="600">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="ID" label="ID"></el-table-column>
      <el-table-column prop="name" label="国家名称" ></el-table-column>
      <el-table-column prop="letter2" label="二位字母"></el-table-column>
      <el-table-column prop="letter3" label="三位字母"></el-table-column>
      <el-table-column prop="noCode" label="数字代号"></el-table-column>
      <el-table-column prop="ios" label="ios英文用命"></el-table-column>
      <el-table-column prop="ios3166" label="ios 3166-2 相应代码"></el-table-column>
      <el-table-column prop="Taiwan" label="台湾惯用名"></el-table-column>
      <el-table-column prop="HongKong" label="香港惯用名"></el-table-column>
      <el-table-column prop="order" label="排序"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column prop="endTime" label="操作"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "CountryManage",
  data() {
    return {
      tableArr:[
        {

          ID:'CNY',
          name:'美国',
          letter2:'US',
          letter3:'USA',
          noCode:'840',
          ios:'United States of America(USA)',
          ios3166:'ISO 3166-2:US',
          Taiwan:'美国',
          HongKong:'美国',
          order:'',
          remark:'',
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
