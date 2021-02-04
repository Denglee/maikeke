<template>
   <div class="public-main">
      <!--中间部分-->
      <div class="">
         <el-form class="public-form">

            <el-select placeholder="核算主体" v-model="FormSearch.zhuti" class="public-select">
               <el-option v-for="(item,index) in projectArr" :key="index"
                          :value="item.value"
                          :label="item.label">
               </el-option>
            </el-select>
            <el-select placeholder="核算店铺" v-model="FormSearch.store" class="public-select">
               <el-option v-for="(item,index) in projectArr" :key="index"
                          :value="item.value"
                          :label="item.label">
               </el-option>
            </el-select>
            <el-select placeholder="销售店铺" v-model="FormSearch.store2" class="public-select">
               <el-option v-for="(item,index) in projectArr" :key="index"
                          :value="item.value"
                          :label="item.label">
               </el-option>
            </el-select>
            <el-select placeholder="销售店铺" v-model="FormSearch.country" class="public-select">
               <el-option v-for="(item,index) in projectArr" :key="index"
                          :value="item.value"
                          :label="item.label">
               </el-option>
            </el-select>

            <el-date-picker
               v-model="formData.order_time"
               type="daterange"
               unlink-panels
               range-separator="-"
               start-placeholder="开始日期"
               end-placeholder="结束日期"
               value-format="yyyy-MM-dd">
            </el-date-picker>

            <!--搜索-->
            <el-button icon="el-icon-search" @click="FnSearchShop" :loading="btnState.btnSearchLoad" class="public-btn">
               搜索
            </el-button>

            <!--设置-->
            <el-popover
               placement="bottom"
               width="400"
               trigger="manual"
               v-model="diaState.diaShowPopSet"
               popper-class="set-popover">
               <el-form class="public-form" :model="setForm">

                  <el-select v-model="setForm.type" placeholder="全部分类" class="public-selectFull">
                     <el-option label="全部" value="0"></el-option>
                     <el-option v-for="( item, index ) in projectArr" :key="index"
                                :label="item.value"
                                :value="item.name">
                     </el-option>
                  </el-select>

                  <el-select v-model="setForm.shop" placeholder="全部品牌" class="public-selectFull">
                     <el-option label="全部" value="0"></el-option>
                     <el-option v-for="( item, index ) in projectArr" :key="index"
                                :label="item.value"
                                :value="item.name">
                     </el-option>
                  </el-select>

                  <el-select v-model="setForm.store" placeholder="核算店铺" class="public-selectFull">
                     <el-option label="全部" value="0"></el-option>
                     <el-option v-for="( item, index ) in projectArr" :key="index"
                                :label="item.value"
                                :value="item.name">
                     </el-option>
                  </el-select>

                  <el-select v-model="setForm.hesuan" placeholder="核算主体" class="public-selectFull">
                     <el-option label="全部" value="0"></el-option>
                     <el-option v-for="( item, index ) in projectArr" :key="index"
                                :label="item.value"
                                :value="item.name">
                     </el-option>
                  </el-select>

                  <div class="formR-main">
                     <el-button type="primary" class="public-btn" :loading="btnState.btnAddRankMonit"
                                @click="diaState.diaShowPopSet = false">取消
                     </el-button>
                     <el-button type="primary" class="public-btn" :loading="btnState.btnAddRankMonit"
                                @click="btnState.btnSaveSet = true">保存
                     </el-button>
                  </div>

               </el-form>

               <el-button slot="reference" @click="diaState.diaShowPopSet = !diaState.diaShowPopSet" icon="el-icon-setting"></el-button>

            </el-popover>

         </el-form>

         <!-- 表格-->
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

         <!--分页-->
         <Pagination
            :pageNum="pageArr.pageNum"
            :total="pageArr.total"
            :pageSize="pageArr.pageSize"
            @SonSizeChange='FaSizeChange'
            @SonCurrentChange="FaPageCurrent"></Pagination>

      </div>
   </div>
</template>

<script>
import Pagination from "@/components/Pagination/Pagination";
export default {
   name: "SettlementDetails",
   components:{Pagination},
   data() {
      return {
         formData: {
            projectName: '',
            order_time: '',
         },
         setForm:{
            type:1,
         },
         FormSearch:{},
         pageArr: {
            total: 40,  //总条数
            pageSize: 20, //每页个数
            pageNum: 1, //当前页数
         },

         btnState: {
            btnSearchLoad: false,
         },
         diaState:{
            diaShowPopSet:false,
         },

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

         projectArr: [
            {
               name: 'shop1',
               value: '店铺1',
            },
            {
               name: 'shop2',
               value: '店铺2',
            },
            {
               name: 'shop3',
               value: '店铺3',
            },
            {
               name: 'shop4',
               value: '店铺4',
            }
         ],

         checkedRows: [],  //选中的值

      }
   },
   methods: {

      chooseProject(val) {
         console.log(val);
      },

      /* 1.10、 编辑选中 */
      checkedStaff(val) {
         console.log(val);
         this.checkedRows = val;
      },

      //点击行触发，选中或不选中复选框
      handleRowClick(row, column, event) {
         this.$refs.multipleTable.toggleRowSelection(row);
      },

      /*搜索*/
      FnSearchShop() {
         console.log(this.formData);
         this.GLOBAL.btnStateChange(this, 'btnState', 'btnSearchLoad');
      },

      /*分页 */
      FaPageCurrent(page) {
         console.log(page)
         // this.staffPage = page;
         // this.getStaffIndex();
      },
      FaSizeChange(size){
         console.log(size);
      },
   },
}
</script>

<style lang="scss">

</style>