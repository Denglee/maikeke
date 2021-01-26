<template>
    <div class="public-main">
       <el-form :model="FormSearch" class="public-form" ref="refRoleForm" :inline="true">
          <el-select v-model="FormSearch.project" value.key="id" filterable clearable placeholder="请选择状态"
                     class="public-select"  >
             <el-option v-for="(item, index) in projectArr" :key="index"
                        :value="item.value"
                        :label="item.label">
             </el-option>
          </el-select>
          <el-select v-model="FormSearch.project" value.key="id" filterable clearable placeholder="请选择配对"
                     class="public-select"  >
             <el-option v-for="(item, index) in projectArr" :key="index"
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
                     @click="FnPostSearch('refRoleForm')">提交
          </el-button>
       </el-form>


       <el-table class="public-table" border
                 :data="tableArr"
                 @selection-change="checkedStore"
                 ref="refTable"
                 height="600"
                 @row-click="handleRowClick">
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="img" label="图片"></el-table-column>
          <el-table-column prop="MSKU" label="MSKU/FNSKU"></el-table-column>
          <el-table-column prop="ASIN" label="ASIN"></el-table-column>
          <el-table-column prop="SKU" label="本地产品/SKU"></el-table-column>
          <el-table-column prop="listingErr" label="Listing异常">
             <template slot-scope="scope">
                <el-select v-model="scope.row.listingErr" @change="changeLisErr">
                   <el-option value="1" label="内容改变待确认"></el-option>
                   <el-option value="2" label="打开异常待确认"></el-option>
                   <el-option value="3" label="购物车丢失待确认"></el-option>
                </el-select>
             </template>
          </el-table-column>
          <el-table-column prop="store" label="店铺"></el-table-column>
          <el-table-column prop="country" label="国家"></el-table-column>
          <el-table-column prop="price" label="价格"></el-table-column>
          <el-table-column prop="FBA" label="FBA可售"></el-table-column>
          <el-table-column prop="salesNum" label="销量"></el-table-column>
          <el-table-column prop="SalesTotal" label="销售额"></el-table-column>
          <el-table-column prop="AD" label="广告费"></el-table-column>
          <el-table-column prop="rank" label="最新排名"></el-table-column>
          <el-table-column prop="pendingBad" label="待处理差评"></el-table-column>
          <el-table-column prop="state" label="状态">
             <template slot-scope="scope">
                <span v-if="scope.row.state == 1" style="color:green;">在售</span>
                <span v-else class="stop">停售</span>
             </template>
          </el-table-column>
          <el-table-column label="操作">
             <template slot-scope="scope">
                {{scope.row.state}}
             </template>
          </el-table-column>
       </el-table>
    </div>
</template>

<script>

export default {
    name: "Listing",
    data(){
     return{
        FormSearch:{},
        btnState:{},
        projectArr: [
           {
              id: '1',
              value: 'shop1',
              label: '店铺1',
           },
           {
              id: '2',
              value: 'shop2',
              label: '店铺2',
           },
        ],
        tableArr:[
           {
              img:'',
              MSKU:'AR-XR-Clear X0028s3K7u',
              ASIN:'',
              SKU:'',
              listingErr:'1',
              store:'',
              country:'',
              price:'',
              FBA:'',
              salesNum:'4',
              SalesTotal:'',
              AD:'',
              rank:'',
              state:1,
              pendingBad:'',
           },
        ],

     }
    },
    methods:{
       /* 1、 编辑选中  */
       checkedStore(val) {
          console.log(val);
          this.checkedRows = val;
       },
       /*点击行触发，选中或不选中复选框 */
       handleRowClick(row, column, event) {
          this.$refs.refTable.toggleRowSelection(row);
       },

       FnPostSearch(){

       },

       changeLisErr(val){
          console.log(val);
       },

    },
    created(){
    
    },
   components:{

   },
}
</script>
