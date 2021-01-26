<template>
  <div class="public-main">
    <el-form :model="searchForm" class="public-form"  ref="refRoleForm" :inline="true">
      <el-select v-model="searchForm.name" value.key="id" filterable clearable placeholder="请选择店铺负责人"
                 class="public-select">
        <el-option v-for="(item, index) in projectArr" :key="item.id"
                   :value="item.value"
                   :label="item.label">
        </el-option>
      </el-select>

      <el-input v-model="searchForm.SellerInfo" class="public-input" autocomplete="off" placeholder="请输入买家信息" clearable></el-input>

      <el-date-picker
          class="public-datePicker"
          v-model="searchForm.order_time"
          type="daterange"
          unlink-panels
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd">
      </el-date-picker>

      <el-button type="primary" class="public-btn" :loading="btnState.btnPost" @click="FnPostSearch()">搜索</el-button>

    </el-form>

    <el-table class="public-table" border
              :data="tableArr"
              ref="refTable"
              height="600">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="img" label="图片"></el-table-column>
      <el-table-column prop="ASIN" label="ASIN"></el-table-column>
      <el-table-column prop="valuate" label="评价内容" min-width="300px"></el-table-column>
      <el-table-column prop="store" label="店铺"></el-table-column>
    </el-table>

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
  name: "EvaluateMonitor",
  data() {
    return {
      searchForm:{

      },
      btnState:{
        btnPost:false,
      },

      pageArr:{
        pageTotalRows:100,
        pageListRows:10,
      },

      projectArr:[
        {
          id:1,
          label:'负责人1',
          value:'charge100',
        },
        {
          id:2,
          label:'负责人2',
          value:'charge200',
        },
      ],
      tableArr:[
        {
          img:'',
          ASIN:'B08B8BDG42',
          valuate:'This is the best protector I have purchased for my Apple Watch. It is easy to put on and has stayed clear, the others I have purcha…',
          store:'En vo-US',
        }
      ],
    }
  },
  methods: {

    /*搜索事件*/
    FnPostSearch(){
      this.GLOBAL.btnStateChange(this, 'btnState', 'btnPost');
      console.log(this.searchForm);
    },

    /*分页*/
    PageCurrent(page){
      console.log(page)
      // this.staffPage = page;
      // this.getStaffIndex();
    },

  },
  created() {

  },
}
</script>
