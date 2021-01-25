<template>
  <div class="public-main">
    <el-table class="public-table" border
              :data="tableArr"
              ref="refTable"
              height="600">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="appNo" label="应用编号"></el-table-column>
      <el-table-column prop="type" label="应用类型" ></el-table-column>
      <el-table-column prop="userNo" label="用户编号"></el-table-column>
      <el-table-column prop="userType" label="用户类型"></el-table-column>
      <el-table-column prop="state" label="应用状态"></el-table-column>
      <el-table-column prop="creatTime" label="创建时间"></el-table-column>
      <el-table-column prop="openTime" label="开通时间"></el-table-column>
      <el-table-column prop="endTime" label="到期时间"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "ApplyAuthorize",
  data() {
    return {
      tableArr:[
        {
          appNo:'App_Ymz',
          type:'跨境电商业务系统',
          userNo:'MK2020深圳市唛壳科技有限公司',
          userType:'公司',
          state:'1',
          creatTime:'2020-12-01',
          openTime:'2020-12-01',
          endTime:'2021-12-01',
        }
      ]
    }
  },
  methods: {},
  created() {

  },
}
</script>
