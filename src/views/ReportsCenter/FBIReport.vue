<template>
   <div class="tabs-main">
      <el-tabs :tab-position="tabPosition" id="tabs-message" v-model="tabActiveName" @tab-click="FnChangeTab">
         <el-tab-pane lazy label="赔偿" name="name1">
            <!--中间部分-->
            <div class="tab-content">
               <el-form class="public-form">
                  <el-select v-model="FormSearch.projectName" filterable multiple clearable collapse-tags
                             popper-class="elSelect-checkbox" class="public-select" @change='chooseProject($event)'>
                     <el-option v-for="(item, index) in projectArr"
                                :key="index"
                                :value="item.name"
                                :label="item.value">
                        <span class="check"></span>
                        <span style="margin-left: 8px">{{ item.value }}</span>
                     </el-option>
                  </el-select>
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
                             class="public-btn">搜索
                  </el-button>

               </el-form>

               <!-- 表格-->
               <el-table class="public-table" border
                         :data="tableStaff"
                         ref="multipleTable">
                  <el-table-column prop="store" label="店铺"></el-table-column>
                  <el-table-column prop="country" label="国家"></el-table-column>
                  <el-table-column prop="day" label="时间" width="180px">
                     <template slot-scope="{row}">
                        <div class="status-connect">{{ row.day | dateFormat }}</div>
                     </template>
                  </el-table-column>
                  <el-table-column prop="active" label="赔偿编号"></el-table-column>
                  <el-table-column prop="shopNum" label="订单号"></el-table-column>
                  <el-table-column prop="clickNum" label="原因"></el-table-column>
                  <el-table-column prop="money" label="MSKU"></el-table-column>
                  <el-table-column prop="money" label="FNSKU"></el-table-column>
                  <el-table-column prop="money" label="ASIN"></el-table-column>
                  <el-table-column prop="money" label="标题"></el-table-column>
                  <el-table-column prop="money" label="状况"></el-table-column>
                  <el-table-column prop="money" label="币种"></el-table-column>
                  <el-table-column prop="money" label="每件商品赔偿金额" width="120px"></el-table-column>
               </el-table>

               <Pagination
                  :pageNum="pageArr.pageNum"
                  :total="pageArr.total"
                  :pageSize="pageArr.pageSize"
                  @SonSizeChange='FaSizeChange'
                  @SonCurrentChange="FaPageCurrent"></Pagination>
            </div>

         </el-tab-pane>

         <el-tab-pane lazy label="移除货件" name="name2">

            <!--中间部分-->
            <div class="tab-content">
               <el-form class="public-form">
                  <el-select v-model="FormSearch.projectName" filterable multiple clearable collapse-tags
                             popper-class="elSelect-checkbox" class="public-select" @change='chooseProject($event)'>
                     <el-option v-for="(item, index) in projectArr"
                                :key="index"
                                :value="item.name"
                                :label="item.value">
                        <span class="check"></span>
                        <span style="margin-left: 8px">{{ item.value }}</span>
                     </el-option>
                  </el-select>
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


               </el-form>

               <!-- 表格-->
               <el-table class="public-table" border
                         :data="tableStaff"
                         ref="multipleTable">
                  <el-table-column prop="store" label="店铺"></el-table-column>
                  <el-table-column prop="country" label="国家"></el-table-column>
                  <el-table-column prop="day" label="时间" width="180px">
                     <template slot-scope="{row}">
                        <div class="status-connect">{{ row.day | dateFormat }}</div>
                     </template>
                  </el-table-column>
                  <el-table-column prop="active" label="赔偿编号"></el-table-column>
                  <el-table-column prop="shopNum" label="订单号"></el-table-column>
                  <el-table-column prop="clickNum" label="原因"></el-table-column>
                  <el-table-column prop="money" label="MSKU"></el-table-column>
                  <el-table-column prop="money" label="FNSKU"></el-table-column>
                  <el-table-column prop="money" label="ASIN"></el-table-column>
                  <el-table-column prop="money" label="标题"></el-table-column>
                  <el-table-column prop="money" label="状况"></el-table-column>
                  <el-table-column prop="money" label="币种"></el-table-column>
                  <el-table-column prop="money" label="每件商品赔偿金额" width="120px"></el-table-column>
               </el-table>

               <Pagination
                  :pageNum="pageArr.pageNum"
                  :total="pageArr.total"
                  :pageSize="pageArr.pageSize"
                  @SonSizeChange='FaSizeChange'
                  @SonCurrentChange="FaPageCurrent"></Pagination>
            </div>

         </el-tab-pane>

         <el-tab-pane lazy label="月存储费用" name="name3">
            月存储费用
         </el-tab-pane>

         <el-tab-pane lazy label="长期存储费用" name="name4">
            长期存储费用
         </el-tab-pane>

         <el-tab-pane lazy label="已接收库存" name="name5">
            已接收库存
         </el-tab-pane>

         <el-tab-pane lazy label="每日库存历史" name="name6">
            每日库存历史
         </el-tab-pane>

         <el-tab-pane lazy label="每月库存历史" name="name7">
            每月库存历史
         </el-tab-pane>

         <el-tab-pane lazy label="库存动作详情" name="name8">

         </el-tab-pane>

      </el-tabs>
   </div>
</template>

<script>
export default {
   name: "FBIReport",
   inject: ['reLoad'],
   components: {},
   data() {
      return {

         // 数据结构
         tableData: [
            {uid: 'uid20210206', peopleNumber: 100, source: '网站',},
            {uid: 'uid20210206', peopleNumber: 100, source: '网站',},
         ], // 为请求到的table数据
         tableHeader: [  // 表头信息，可根据minWidth修改宽度
            {prop: 'uid', label: '订单号', minWidth: '160px'},
            {
               prop: 'peopleNumber',
               label: '人数',
               sortable: 'custom',
               minWidth: '75px',
            },
            {
               prop: 'source',
               label: '来源',
               columnKey: 'sourceList',
               minWidth: '90px',
               render: (h, params) => {
                  return h('span', params.row.source)
               }
            },
         ],

         countryArr: this.GLOBAL.countryArr,
         tabPosition: 'left',
         tabActiveName: 'name8',
         FormSearch: {
            projectName: '',
            order_time: '',
         },
         pageArr: {
            pageNum: 1,
            total: 10,
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
      /*页面刷新*/
      FnRefresh() {
         // this.reLoad();
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

      handleSort(val) {
         console.log(val);
      },
      handleClick(val) {
         console.log(val);
      },
      filterHandler(val) {
         console.log(val);
      },

   },
   created() {

   },
}
</script>
