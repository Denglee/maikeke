//封装的table组件
<template>
  <!-- 列表 -->
  <el-table
      stripe
      :border="border"
      :data="dataSource"
      @selection-change="handleSelectionChange"
      v-loading="listLoading"
      @row-dblclick="rowClick"
      highlight-current-row
      @row-click="clickTable"
      ref="refTable"
      @expand-change="expandChange">
    <!--数据源-->
    <el-table-column
        v-for="(column, index) in columns"
        header-align="center"
        v-if="true || column.isShow"
        :sortable="column.hasSort"
        :key="column.prop"
        :prop="column.prop"
        :label="column.label"
        :align="column.align"
        :width="column.width">
    </el-table-column >
  </el-table>
</template>
<script>
export default {
  name:"tables",
  props:{
    listLoading:{
      type: Boolean,
      default:false,
    },
    border: {
      type: Boolean,
      default:true,
    },
    dataSource: {// 表格数据源 默认为空数组
      type: Array,
      default: ()=> []
    },
    columns: {// 表格的字段展示 默认为空数组
      type: Array,
      default: ()=>[]
    },
  },
  components: {
    //
  },
  watch:{
    //
  },
  mounted(){
    //
  },
  methods: {
    expandChange(){

    },
    handleSelectionChange(){

    },
    rowClick(){

    },
    clickTable(){

    },
  }
}
</script>
