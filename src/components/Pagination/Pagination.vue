<template>
   <el-pagination
      background
      layout="total, prev, pager,next, sizes, jumper"
      :page-sizes="[1,10, 20, 50, 100]"
      :current-page="pageNum"
      :total="total"
      :page-size="pageSize"
      @size-change='sizeChange'
      @current-change="PageCurrent">
   </el-pagination>
</template>

<script>
export default {
   name: "Pagination",
   props:{
      pageNum:{
         type:Number,
         default:1,
      },
      total:{
         type:Number,
         default:10,
      },
      pageSize:{
         type:Number,
         default:10,
      }
   },
   data() {
      return {}
   },
   methods: {
      sizeChange(pagesize){
         this.$emit('SonSizeChange',pagesize);
      },
      PageCurrent(pageCurrent){
         this.$emit('SonCurrentChange',pageCurrent);
      },
   },
   created() {},
}
</script>
