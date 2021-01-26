<template>
  <div class="public-main">
    <el-table class="public-table" border
              :data="tableArr"
              ref="refTable"
              height="600">
      <el-table-column type="selection" label="序号"></el-table-column>
      <el-table-column prop="regionID" label="区域ID"></el-table-column>
      <el-table-column prop="name" label="名称" ></el-table-column>
      <el-table-column prop="name2" label="简称"></el-table-column>
      <el-table-column prop="postalCode" label="邮政编码"></el-table-column>
      <el-table-column prop="origin" label="所属国家"></el-table-column>
      <el-table-column prop="level" label="级别"></el-table-column>
      <el-table-column prop="order" label="排序"></el-table-column>
      <el-table-column prop="state" label="状态"></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "RegionManage",
  data() {
    return {
      tableArr:[
        {
          regionID:'US001',
          name:'Alabama',
          name2:'人命币',
          postalCode:'001010',
          origin:'USA',
          level:'1',
          order:'1',
          state:'',
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
