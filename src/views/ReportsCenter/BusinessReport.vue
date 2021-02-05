<template>
   <div class="tabs-main">
      <el-tabs :tab-position="tabPosition" id="tabs-message" v-model="tabActiveName" @tab-click="FnChangeTab">
         <el-tab-pane lazy label="按ASIN-详情页面表现" name="name1">
            <!--中间部分-->
            <div class="tab-content">
               <el-form class="public-form">
<!--                  <el-select v-model="FormSearch.projectName" filterable multiple clearable collapse-tags-->
<!--                             popper-class="elSelect-checkbox" class="public-select" @change='chooseProject($event)'>-->
<!--                     <el-option v-for="(item, index) in projectArr"-->
<!--                                :key="index"-->
<!--                                :value="item.name"-->
<!--                                :label="item.value">-->
<!--                        <span class="check"></span>-->
<!--                        <span style="margin-left: 8px">{{ item.value }}</span>-->
<!--                     </el-option>-->
<!--                  </el-select>-->

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
                  <MonthRange @FnSonMonth="FaMonthRange"></MonthRange>
                  <div class="public-selInp">
                     <el-select placeholder="请选择" v-model="FormSearch.shopType">
                        <el-option v-for="(item,index) in projectArr" :key="index"
                                   :value="item.value"
                                   :label="item.label">
                        </el-option>
                     </el-select>
                     <el-input placeholder="请输入" autocomplete="off" v-model="FormSearch.shopNum" clearable></el-input>
                  </div>
<!--                  <el-date-picker-->
<!--                     class="public-datePicker"-->
<!--                     v-model="FormSearch.order_time"-->
<!--                     type="daterange"-->
<!--                     unlink-panels-->
<!--                     range-separator="-"-->
<!--                     start-placeholder="开始日期"-->
<!--                     end-placeholder="结束日期"-->
<!--                     value-format="yyyy-MM-dd">-->
<!--                  </el-date-picker>-->

                  <!--搜索-->
                  <el-button icon="el-icon-search" @click="FnSearchShop" :loading="btnState.btnSearchLoad"
                             class="public-btn">搜索</el-button>

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
                  <el-table-column prop="store" label="商品">
                     <template slot-scope="scope">
                        <el-popover
                           placement="right"
                           title="图片"
                           trigger="hover">
                           <img src="https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1603365312,3218205429&fm=26&gp=0.jpg"/>
                           <img slot="reference"
                                src="https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1603365312,3218205429&fm=26&gp=0.jpg"
                                style="width:100px;height:100px;max-height: 50px;max-width: 150px">
                        </el-popover>
                     </template>
                  </el-table-column>
                  <el-table-column prop="day" label="日期">
                     <template slot-scope="{row}">
                        <div class="status-connect">{{ row.time | dateFormat }}</div>
                     </template>
                  </el-table-column>
                  <el-table-column prop="country" label="ParentASIN" width="90px"></el-table-column>
                  <el-table-column prop="type" label="ASIN"></el-table-column>
                  <el-table-column prop="active" label="商品名称"></el-table-column>
                  <el-table-column prop="shopNum" label="MKSU"></el-table-column>
                  <el-table-column prop="clickNum" label="本地SKU"></el-table-column>
                  <el-table-column prop="store" label="店铺"></el-table-column>
                  <el-table-column prop="country" label="国家"></el-table-column>
                  <el-table-column prop="lookNum" label="买家访问次数" width="120px"></el-table-column>
                  <el-table-column prop="lookNumRace" label="买家访问次数百分比" width="130px"></el-table-column>
                  <el-table-column prop="lookNum" label="页面浏览次数" width="120px"></el-table-column>
                  <el-table-column prop="lookNumRace" label="页面浏览次数百分比" width="130px"></el-table-column>
                  <el-table-column prop="lookNumRace" label="购买按钮赢的率" width="130px"></el-table-column>
                  <el-table-column prop="lookNum" label="已订购商品数量" width="120px"></el-table-column>
                  <el-table-column prop="lookNum" label="订购数量-B2B" width="120px"></el-table-column>
                  <el-table-column prop="lookNumRace" label="订单商品数量转化率" width="130px"></el-table-column>
                  <el-table-column prop="money" label="销售额"></el-table-column>
               </el-table>

               <Pagination
                  :pageNum="pageArr.pageNum"
                  :total="pageArr.total"
                  :pageSize="pageArr.pageSize"
                  @SonSizeChange='FaSizeChange'
                  @SonCurrentChange="FaPageCurrent"></Pagination>
            </div>
         </el-tab-pane>

         <el-tab-pane lazy label="按ASIN-子商品详情页面表现" name="name2">
            <!--中间部分-->
            <div class="tab-content">
               <el-form class="public-form">
                  <!--                  <el-select v-model="FormSearch.projectName" filterable multiple clearable collapse-tags-->
                  <!--                             popper-class="elSelect-checkbox" class="public-select" @change='chooseProject($event)'>-->
                  <!--                     <el-option v-for="(item, index) in projectArr"-->
                  <!--                                :key="index"-->
                  <!--                                :value="item.name"-->
                  <!--                                :label="item.value">-->
                  <!--                        <span class="check"></span>-->
                  <!--                        <span style="margin-left: 8px">{{ item.value }}</span>-->
                  <!--                     </el-option>-->
                  <!--                  </el-select>-->

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
                  <MonthRange @FnSonMonth="FaMonthRange"></MonthRange>
                  <div class="public-selInp">
                     <el-select placeholder="请选择" v-model="FormSearch.shopType">
                        <el-option v-for="(item,index) in projectArr" :key="index"
                                   :value="item.value"
                                   :label="item.label">
                        </el-option>
                     </el-select>
                     <el-input placeholder="请输入" autocomplete="off" v-model="FormSearch.shopNum" clearable></el-input>
                  </div>
                  <!--                  <el-date-picker-->
                  <!--                     class="public-datePicker"-->
                  <!--                     v-model="FormSearch.order_time"-->
                  <!--                     type="daterange"-->
                  <!--                     unlink-panels-->
                  <!--                     range-separator="-"-->
                  <!--                     start-placeholder="开始日期"-->
                  <!--                     end-placeholder="结束日期"-->
                  <!--                     value-format="yyyy-MM-dd">-->
                  <!--                  </el-date-picker>-->

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
                     label-width='180px'>
                     <el-form class="public-form" :model="setForm">

                        <el-form-item label="展示量">
                           <div class="public-selInp">
                              <el-select placeholder="请选择" v-model="setForm.shopType">
                                 <el-option v-for="(item,index) in symbolArr" :key="index"
                                            :value="item.value"
                                            :label="item.label">
                                 </el-option>
                              </el-select>
                              <el-input placeholder="请输入" autocomplete="off" v-model="setForm.shopNum"
                                        clearable></el-input>
                           </div>
                        </el-form-item>

                        <el-form-item label="点击量">
                           <div class="public-selInp">
                              <el-select placeholder="请选择" v-model="setForm.clickType">
                                 <el-option v-for="(item,index) in symbolArr" :key="index"
                                            :value="item.value"
                                            :label="item.label"></el-option>
                              </el-select>
                              <el-input placeholder="请输入" autocomplete="off" v-model="setForm.clickNum"
                                        clearable></el-input>
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
                  <el-table-column prop="store" label="商品">
                     <template slot-scope="scope">
                        <el-popover
                           placement="right"
                           title="图片"
                           trigger="hover">
                           <img src="https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1603365312,3218205429&fm=26&gp=0.jpg"/>
                           <img slot="reference"
                                src="https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1603365312,3218205429&fm=26&gp=0.jpg"
                                style="width:100px;height:100px;max-height: 50px;max-width: 150px">
                        </el-popover>
                     </template>
                  </el-table-column>
                  <el-table-column prop="day" label="日期">
                     <template slot-scope="{row}">
                        <div class="status-connect">{{ row.time | dateFormat }}</div>
                     </template>
                  </el-table-column>
                  <el-table-column prop="country" label="ParentASIN" width="90px"></el-table-column>
                  <el-table-column prop="type" label="ASIN"></el-table-column>
                  <el-table-column prop="active" label="商品名称"></el-table-column>
                  <el-table-column prop="shopNum" label="MKSU"></el-table-column>
                  <el-table-column prop="clickNum" label="本地SKU"></el-table-column>
                  <el-table-column prop="store" label="店铺"></el-table-column>
                  <el-table-column prop="country" label="国家"></el-table-column>
                  <el-table-column prop="lookNum" label="买家访问次数" width="120px"></el-table-column>
                  <el-table-column prop="lookNumRace" label="买家访问次数百分比" width="130px"></el-table-column>
                  <el-table-column prop="lookNum" label="页面浏览次数" width="120px"></el-table-column>
                  <el-table-column prop="lookNumRace" label="页面浏览次数百分比" width="130px"></el-table-column>
                  <el-table-column prop="lookNumRace" label="购买按钮赢的率" width="130px"></el-table-column>
                  <el-table-column prop="lookNum" label="已订购商品数量" width="120px"></el-table-column>
                  <el-table-column prop="lookNum" label="订购数量-B2B" width="120px"></el-table-column>
                  <el-table-column prop="lookNumRace" label="订单商品数量转化率" width="130px"></el-table-column>
                  <el-table-column prop="money" label="销售额"></el-table-column>
               </el-table>

               <Pagination
                  :pageNum="pageArr.pageNum"
                  :total="pageArr.total"
                  :pageSize="pageArr.pageSize"
                  @SonSizeChange='FaSizeChange'
                  @SonCurrentChange="FaPageCurrent"></Pagination>
            </div>
         </el-tab-pane>

      </el-tabs>
   </div>
</template>

<script>

import MonthRange from "@/components/TimeRange/MonthRange";

export default {
   name: "BusinessReport",
   inject: ['reLoad'],
   components:{MonthRange,},
   data() {
      return {
         tabPosition: 'left',
         tabActiveName: 'name1',
         FormSearch: {
            projectName: '',
            order_time: '',
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
               lookNum: 7565,
               lookNumRace: '21%',
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
               lookNum: 7565,
               lookNumRace: '21%',
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
      FaMonthRange(val){
        console.log(val);
        this.FormSearch.order_time=val;
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
      // this.addNum();
   },
}
</script>
