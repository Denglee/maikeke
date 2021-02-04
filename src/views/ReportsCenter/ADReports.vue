<template>
   <div class="tabs-main">
      <el-tabs :tab-position="tabPosition" id="tabs-message" v-model="tabActiveName" @tab-click="FnChangeTab">
         <el-tab-pane lazy label="SP-广告活动" name="name1">
            <!--中间部分-->
            <div class="tab-content">
               <el-form class="public-form">

                  <AllStoreSel @FnSonChooseStore="FaChangeStore"></AllStoreSel>

                  <el-select placeholder="全部国家" v-model="FormSearch.country" class="public-select">
                     <el-option v-for="(item,index) in projectArr" :key="index"
                                :value="item.value"
                                :label="item.label">
                     </el-option>
                  </el-select>
                  <el-select placeholder="全部店铺" v-model="FormSearch.store" class="public-select">
                     <el-option v-for="(item,index) in projectArr" :key="index"
                                :value="item.value"
                                :label="item.label">
                     </el-option>
                  </el-select>
                  <el-select placeholder="全部类型" v-model="FormSearch.type" class="public-select">
                     <el-option v-for="(item,index) in projectArr" :key="index"
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

                  <el-input v-model="FormSearch.name" class="public-input" autocomplete="off" placeholder="请输入"
                            clearable></el-input>
                  <!--搜索-->
                  <el-button icon="el-icon-search" @click="FnSearchShop" :loading="btnState.btnSearchLoad"
                             class="public-btn">
                     搜索
                  </el-button>

                  <!--设置-->
                  <el-popover
                     placement="bottom"
                     width="400"
                     trigger="manual"
                     v-model="diaState.diaShowPopSet"
                     label-width='180px'
                     popper-class="set-popover">
                     <el-form class="public-form" :model="setForm">
                        <el-form-item label="展示量">
                           <div class="public-selInp">
                              <el-select placeholder="请选择" v-model="setForm.shopType">
                                 <el-option v-for="(item,index) in symbolArr" :key="index"
                                            :value="item.value"
                                            :label="item.label">
                                 </el-option>
                              </el-select>
                              <el-input placeholder="请输入" autocomplete="off" v-model="setForm.shopNum" clearable></el-input>
                           </div>
                        </el-form-item>

                        <el-form-item label="点击量">
                           <div class="public-selInp">
                              <el-select placeholder="请选择" v-model="setForm.clickType">
                                 <el-option v-for="(item,index) in symbolArr" :key="index"
                                            :value="item.value"
                                            :label="item.label"></el-option>
                              </el-select>
                              <el-input placeholder="请输入" autocomplete="off" v-model="setForm.clickNum" clearable></el-input>
                           </div>
                        </el-form-item>

                        <div class="formR-main">
                           <el-button type="primary" class="public-btn" :loading="btnState.btnAddRankMonit"
                                      @click="diaState.diaShowPopSet = false">取消
                           </el-button>
                           <el-button type="primary" class="public-btn" :loading="btnState.btnAddRankMonit"
                                      @click="FnBtnSaveSet">保存
                           </el-button>
                        </div>

                     </el-form>

                     <el-button slot="reference" @click="diaState.diaShowPopSet = !diaState.diaShowPopSet"
                                class="btn-set" icon="el-icon-setting"></el-button>

                  </el-popover>

               </el-form>


               <!-- 表格-->
               <el-table class="public-table" border
                         :data="tableStaff"
                         ref="multipleTable">
                  <el-table-column prop="store" label="店铺"></el-table-column>
                  <el-table-column prop="country" label="国家"></el-table-column>
                  <el-table-column prop="type" label="类型"></el-table-column>
                  <el-table-column prop="active" label="广告活动" sortable width="100px"></el-table-column>
                  <el-table-column prop="day" label="日期">
                     <template slot-scope="{row}">
                        <div class="status-connect">{{ row.time | dateFormat }}</div>
                     </template>
                  </el-table-column>
                  <el-table-column prop="shopNum" label="展示量" sortable width="90px"></el-table-column>
                  <el-table-column prop="clickNum" label="点击量" sortable width="90px"></el-table-column>
                  <el-table-column prop="CTR" label="CTR" sortable width="90px">
                     <template slot-scope="{row}" slot="header">
                        <el-tooltip placement="top">
                           <span class='tr-tooltip'>CTR <i class="el-icon-question"></i></span>
                           <div slot="content">
                              <div>点击率=点击量/展示量。</div>
                              <div>注意：一旦识别出无效点击，系统最多会在 3 天内从您的支出统计数据中删除这些点击记录。
                                 日期范围（含过去 3 天内的支出）可能因点击和支出失效而有所调整。
                              </div>
                           </div>
                        </el-tooltip>
                     </template>
                  </el-table-column>
                  <el-table-column prop="CPC" label="CPC" sortable width="90px">
                     <template slot-scope="{row}" slot="header">
                        <el-tooltip placement="top">
                           <span class='tr-tooltip'>CPC <i class="el-icon-question"></i></span>
                           <div slot="content">每次点击花费=花费/点击量</div>
                        </el-tooltip>
                     </template>
                  </el-table-column>
                  <el-table-column prop="CVR" label="CVR" sortable width="90px">
                     <template slot-scope="{row}" slot="header">
                        <el-tooltip placement="top">
                           <span class='tr-tooltip'>CVR <i class="el-icon-question"></i></span>
                           <div slot="content">转化率=订单量/点击量</div>
                        </el-tooltip>
                     </template>
                  </el-table-column>
                  <el-table-column prop="CPA" label="CPA" sortable width="90px">
                     <template slot-scope="{row}" slot="header">
                        <el-tooltip placement="top">
                           <span class='tr-tooltip'>CPA <i class="el-icon-question"></i></span>
                           <div slot="content">每笔订单花费=花费/订单量</div>
                        </el-tooltip>
                     </template>
                  </el-table-column>
                  <el-table-column prop="money" label="销售额" sortable width="100px">
                     <template slot-scope="{row}" slot="header">
                        <el-tooltip placement="top">
                           <span class='tr-tooltip'>销售额 <i class="el-icon-question"></i></span>
                           <div slot="content">
                              <p>销售额是销售给买家且归因于广告点击的商品的总价值。</p>
                              <p>注意： 最长可能需要12小时才能更新您的销售额数据。因此，销售额数据在“今天”日期范围内可能出现延迟。 付款失败和在72小时内取消的订单将从销售额总计中扣除。</p>
                              <p>对于推广商品，归入的销售额包括广告宣传商品的订单以及在7日内从您的库存购买的其他商品的订单。
                                 对于标题搜索广告，归入的销售额包括广告宣传商品的订单以及您的品牌中由亚马逊自营店和第三方卖家在14天内销售的所有商品的订单。</p>
                           </div>
                        </el-tooltip>
                     </template>
                  </el-table-column>
                  <el-table-column prop="ACOS" label="ACOS" sortable width="100px">
                     <template slot-scope="{row}" slot="header">
                        <el-tooltip placement="top">
                           <span class='tr-tooltip'>ACOS <i class="el-icon-question"></i></span>
                           <div slot="content">
                              <p>花费/广告销售额</p>
                              <p>注意： 最长可能需要12小时才能更新您的销售额数据。 因此，销售额数据在“今天”日期范围内可能出现延迟。 付款失败和在72小时内取消的订单将从销售额总计中扣除。</p>
                              <p>对于推广商品，归入的销售额包括广告宣传商品的订单以及在7日内从您的库存购买的其他商品的订单。
                                 对于标题搜索广告，归入的销售额包括广告宣传商品的订单以及您的品牌中由亚马逊自营店和第三方卖家在14天内销售的所有商品的订单。</p>
                           </div>
                        </el-tooltip>
                     </template>
                  </el-table-column>
               </el-table>

               <el-pagination
                  background
                  layout="total, prev, pager,next, sizes, jumper"
                  :page-sizes="[10, 20, 50, 100]"
                  :current-page="pageArr.pageNum"
                  :total="pageArr.total"
                  :page-size="pageArr.pageSize"
                  @size-change='FaSizeChange'
                  @current-change="FaPageCurrent">
               </el-pagination>
            </div>

         </el-tab-pane>

         <el-tab-pane lazy label="SP-广告组" name="name2">

            <!--中间部分-->
            <div class="tab-content">
               <el-form class="public-form">

                  <AllStoreSel @FnSonChooseStore="FaChangeStore"></AllStoreSel>

                  <el-select placeholder="全部国家" v-model="FormSearch.country" class="public-select">
                     <el-option v-for="(item,index) in projectArr" :key="index"
                                :value="item.value"
                                :label="item.label">
                     </el-option>
                  </el-select>
                  <el-select placeholder="全部店铺" v-model="FormSearch.store" class="public-select">
                     <el-option v-for="(item,index) in projectArr" :key="index"
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

                  <div class="public-selInp">
                     <el-select placeholder="请选择" v-model="FormSearch.shopType">
                        <el-option v-for="(item,index) in projectArr" :key="index"
                                   :value="item.value"
                                   :label="item.label">
                        </el-option>
                     </el-select>
                     <el-input placeholder="请输入" autocomplete="off" v-model="FormSearch.shopNum" clearable></el-input>
                  </div>

                  <!--搜索-->
                  <el-button icon="el-icon-search" @click="FnSearchShop" :loading="btnState.btnSearchLoad"
                             class="public-btn">
                     搜索
                  </el-button>

                  <!--设置-->
                  <el-popover
                     placement="bottom"
                     width="400"
                     trigger="manual"
                     v-model="diaState.diaShowPopSet"
                     label-width='180px'
                     popper-class="set-popover">
                     <el-form class="public-form" :model="setForm">
                        <el-form-item label="展示量">
                           <div class="public-selInp">
                              <el-select placeholder="请选择" v-model="setForm.shopType">
                                 <el-option v-for="(item,index) in symbolArr" :key="index"
                                            :value="item.value"
                                            :label="item.label">
                                 </el-option>
                              </el-select>
                              <el-input placeholder="请输入" autocomplete="off" v-model="setForm.shopNum" clearable></el-input>
                           </div>
                        </el-form-item>

                        <el-form-item label="点击量">
                           <div class="public-selInp">
                              <el-select placeholder="请选择" v-model="setForm.clickType">
                                 <el-option v-for="(item,index) in symbolArr" :key="index"
                                            :value="item.value"
                                            :label="item.label"></el-option>
                              </el-select>
                              <el-input placeholder="请输入" autocomplete="off" v-model="setForm.clickNum" clearable></el-input>
                           </div>
                        </el-form-item>

                        <div class="formR-main">
                           <el-button type="primary" class="public-btn" :loading="btnState.btnAddRankMonit"
                                      @click="diaState.diaShowPopSet = false">取消
                           </el-button>
                           <el-button type="primary" class="public-btn" :loading="btnState.btnAddRankMonit"
                                      @click="FnBtnSaveSet">保存
                           </el-button>
                        </div>

                     </el-form>

                     <el-button slot="reference" @click="diaState.diaShowPopSet = !diaState.diaShowPopSet"
                                class="btn-set" icon="el-icon-setting"></el-button>

                  </el-popover>

               </el-form>


               <!-- 表格-->
               <el-table class="public-table" border
                         :data="tableStaff"
                         ref="multipleTable">
                  <el-table-column prop="time" label="日期"></el-table-column>
                  <el-table-column prop="store" label="店铺"></el-table-column>
                  <el-table-column prop="country" label="国家"></el-table-column>
                  <el-table-column prop="type" label="类型"></el-table-column>
                  <el-table-column prop="active" label="广告组" sortable width="100px"></el-table-column>
                  <el-table-column prop="day" label="日期">
                     <template slot-scope="{row}">
                        <div class="status-connect">{{ row.time | dateFormat }}</div>
                     </template>
                  </el-table-column>
                  <el-table-column prop="shopNum" label="展示量" sortable width="90px"></el-table-column>
                  <el-table-column prop="clickNum" label="点击量" sortable width="90px"></el-table-column>
                  <el-table-column prop="CTR" label="CTR" sortable width="90px">
                     <template slot-scope="{row}" slot="header">
                        <el-tooltip placement="top">
                           <span class='tr-tooltip'>CTR <i class="el-icon-question"></i></span>
                           <div slot="content">
                              <div>点击率=点击量/展示量。</div>
                              <div>注意：一旦识别出无效点击，系统最多会在 3 天内从您的支出统计数据中删除这些点击记录。
                                 日期范围（含过去 3 天内的支出）可能因点击和支出失效而有所调整。
                              </div>
                           </div>
                        </el-tooltip>
                     </template>
                  </el-table-column>
                  <el-table-column prop="CPC" label="CPC" sortable width="90px">
                     <template slot-scope="{row}" slot="header">
                        <el-tooltip placement="top">
                           <span class='tr-tooltip'>CPC <i class="el-icon-question"></i></span>
                           <div slot="content">每次点击花费=花费/点击量</div>
                        </el-tooltip>
                     </template>
                  </el-table-column>
                  <el-table-column prop="CVR" label="CVR" sortable width="90px">
                     <template slot-scope="{row}" slot="header">
                        <el-tooltip placement="top">
                           <span class='tr-tooltip'>CVR <i class="el-icon-question"></i></span>
                           <div slot="content">转化率=订单量/点击量</div>
                        </el-tooltip>
                     </template>
                  </el-table-column>
                  <el-table-column prop="CPA" label="CPA" sortable width="90px">
                     <template slot-scope="{row}" slot="header">
                        <el-tooltip placement="top">
                           <span class='tr-tooltip'>CPA <i class="el-icon-question"></i></span>
                           <div slot="content">每笔订单花费=花费/订单量</div>
                        </el-tooltip>
                     </template>
                  </el-table-column>
                  <el-table-column prop="money" label="销售额" sortable width="100px">
                     <template slot-scope="{row}" slot="header">
                        <el-tooltip placement="top">
                           <span class='tr-tooltip'>销售额 <i class="el-icon-question"></i></span>
                           <div slot="content">
                              <p>销售额是销售给买家且归因于广告点击的商品的总价值。</p>
                              <p>注意： 最长可能需要12小时才能更新您的销售额数据。因此，销售额数据在“今天”日期范围内可能出现延迟。 付款失败和在72小时内取消的订单将从销售额总计中扣除。</p>
                              <p>对于推广商品，归入的销售额包括广告宣传商品的订单以及在7日内从您的库存购买的其他商品的订单。
                                 对于标题搜索广告，归入的销售额包括广告宣传商品的订单以及您的品牌中由亚马逊自营店和第三方卖家在14天内销售的所有商品的订单。</p>
                           </div>
                        </el-tooltip>
                     </template>
                  </el-table-column>
                  <el-table-column prop="ACOS" label="ACOS" sortable width="100px">
                     <template slot-scope="{row}" slot="header">
                        <el-tooltip placement="top">
                           <span class='tr-tooltip'>ACOS <i class="el-icon-question"></i></span>
                           <div slot="content">
                              <p>花费/广告销售额</p>
                              <p>注意： 最长可能需要12小时才能更新您的销售额数据。 因此，销售额数据在“今天”日期范围内可能出现延迟。 付款失败和在72小时内取消的订单将从销售额总计中扣除。</p>
                              <p>对于推广商品，归入的销售额包括广告宣传商品的订单以及在7日内从您的库存购买的其他商品的订单。
                                 对于标题搜索广告，归入的销售额包括广告宣传商品的订单以及您的品牌中由亚马逊自营店和第三方卖家在14天内销售的所有商品的订单。</p>
                           </div>
                        </el-tooltip>
                     </template>
                  </el-table-column>
               </el-table>

               <el-pagination
                  background
                  layout="total, prev, pager,next, sizes, jumper"
                  :page-sizes="[10, 20, 50, 100]"
                  :current-page="pageArr.pageNum"
                  :total="pageArr.total"
                  :page-size="pageArr.pageSize"
                  @size-change='FaSizeChange'
                  @current-change="FaPageCurrent">
               </el-pagination>
            </div>

         </el-tab-pane>

         <el-tab-pane lazy label="SP-推广的商品" name="name3">
            SP-推广的商品
         </el-tab-pane>

         <el-tab-pane lazy label="SP-投放报表" name="name4">
            投放报表
         </el-tab-pane>

         <el-tab-pane lazy label="SP-搜索词" name="name5">
            SP-搜索词
         </el-tab-pane>

         <el-tab-pane lazy label="SP-广告位" name="name6">
            SP-广告位
         </el-tab-pane>

      </el-tabs>
   </div>
</template>

<script>

import AllStoreSel from "@/components/AllStoreSel/AllStoreSel";

export default {
   name: "ADReports",
   inject: ['reLoad'],
   components: {AllStoreSel},
   data() {
      return {
         tabPosition: 'left',
         tabActiveName: 'name1',
         FormSearch: {
            projectName: '',
            order_time: '',
            store:[],
         },
         pageArr: {
            pageNum: 1,
             total: 20,
            pageSize: 10,
         },
         setForm: {
            shopType: '',
            shopNum: '',
            clickType: '',
            clickNum: '',
         },
         diaState: {
            diaShowPopSet: false,
         },
         btnState: {
            btnSearchLoad: false,
         },
         symbolArr: [
            {
               value: '1',
               label: '>',
            }, {
               value: '2',
               label: '=',
            }, {
               value: '3',
               label: '<',
            }
         ],

         tableStaff: [
            {
               store: '店铺1',
               country: 0,
               type: 0,
               active: 'JR1 jump rope',
               day: '1608538812',
               shopNum: 1923,
               clickNum: 139,
               CTR: '7.23%',
               money: '$202.84',
            },
            {
               store: '店铺2',
               country: 0,
               type: 0,
               active: 'JR1 jump rope自动',
               day: '1608538812',
               shopNum: 3074,
               clickNum: 37,
               CTR: '1.23%',
               money: '$22.84',
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

      FaChangeStore(val){
         console.log(val);
         this.FormSearch.store = val;
      },

      /*页面刷新*/
      FnRefresh() {
         // this.reLoad();
         // window.location.href="http://localhost:8282/ ";
      },

      /*tab 切换点击事件  */
      FnChangeTab(tab, e) {
         console.log(tab);
      },

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
         console.log(this.FormSearch);
         this.GLOBAL.btnStateChange(this, 'btnState', 'btnSearchLoad');
      },

      /*保存设置*/
      FnBtnSaveSet() {
         // this.btnState.btnSaveSet = true;
         console.log(this.setForm);
      },

      /*分页 */
      FaPageCurrent(page) {
         console.log(page);
         // this.staffPage = page;
         // this.getStaffIndex();
      },
      FaSizeChange(size) {
         console.log(size);
      },



   },
   created() {

   },

}
</script>
