<template>
  <div class="tabs-main" style="background-color: #fff;">
<!--    <div>消息列表</div>-->

    <el-tabs :tab-position="tabPosition" id="tabs-message" v-model="tabActiveName" @tab-click="FnChangeTab">
      <el-tab-pane lazy name="name1">
        <div slot="label">
          <span>全部消息</span>
          <span style="color: #a30014a5;">(50000)</span>
        </div>
        <!--中间部分-->
        <div class="tab-content">
          <el-form class="public-form">
            <el-select  v-model="formData.projectName" filterable multiple clearable collapse-tags
                        popper-class="elSelect-checkbox" class="public-select"  @change = 'chooseProject($event)'>
              <el-option v-for="(item, index) in projectArr"
                         :key="index"
                         :value="item.name"
                         :label="item.value">
                <span class="check"></span>
                <span style="margin-left: 8px">{{item.value}}</span>
              </el-option>
            </el-select>

            <el-date-picker
                class="public-datePicker"
                v-model="formData.order_time"
                type="daterange"
                unlink-panels
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd">
            </el-date-picker>

            <!--搜索-->
            <el-button icon="el-icon-search" @click="FnSearchShop" :loading="btnState.btnSearchLoad" class="public-btn">搜索</el-button>

            <div class="formR-main">
              <el-button icon="el-icon-search" @click="FnSearchShop" :loading="btnState.btnSearchLoad" class="public-btn">标记为已读</el-button>
              <el-button icon="el-icon-delete" @click="FnSearchShop" :loading="btnState.btnSearchLoad" class="public-btn">删除</el-button>
              <el-button icon="el-icon-refresh" @click="FnSearchShop" :loading="btnState.btnSearchLoad" class="public-btn">刷新</el-button>
            </div>

          </el-form>

          <!-- 表格-->
          <el-table class="public-table" border
                    :data="tableStaff"
                    @selection-change="checkedStaff"
                    ref="multipleTable"
                    @row-click="handleRowClick">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="title" label="消息标题"></el-table-column>

            <el-table-column prop="lock" label="消息类型">
              <template slot-scope="scope">
                <div v-if="scope.row.type == 0 " class="status-connect">跟卖消息</div>
                <div v-if="scope.row.type == 1 " class="status-break">中差评提醒</div>
                <div v-if="scope.row.type == 2 " class="status-break">发货提醒</div>
              </template>
            </el-table-column>
            <el-table-column prop="register_time" label="消息时间" sortable>
              <template slot-scope="scope">
                <div class="status-connect">{{ scope.row.time | dateFormat }}</div>
              </template>
            </el-table-column>

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

      </el-tab-pane>

      <el-tab-pane label="跟卖消息" lazy name="name2">

      </el-tab-pane>

      <el-tab-pane label="中差评提醒" lazy name="name3">

      </el-tab-pane>

      <el-tab-pane label="广告预算超支" lazy name="name4">

      </el-tab-pane>

      <el-tab-pane label="Listing打不开" lazy name="name5">

      </el-tab-pane>

      <el-tab-pane label="店铺异常" lazy name="name6">

      </el-tab-pane>

      <el-tab-pane label="Listen 信息变化" lazy name="name7">

      </el-tab-pane>

      <el-tab-pane label="发货提醒" lazy name="name8">

      </el-tab-pane>

      <el-tab-pane label="审批任务" lazy name="name9">

      </el-tab-pane>

      <el-tab-pane label="系统消息" lazy name="name10">

      </el-tab-pane>

    </el-tabs>
  </div>

</template>

<script>
export default {
    name: "MessageList",
    inject:['reLoad'],
    data(){
     return{
       tabPosition: 'left',
       tabActiveName:'name1',

       formData: {
         projectName: '',
         order_time: '',
       },
       pageArr: {
         pageTotalRows: 100,  //总条数
         pageListRows: 20, //每页个数
       },

       btnState: {
         btnSearchLoad: false,
       },

       tableStaff: [
         {
           title: '店铺 Renom 跟读了您的产品 B07W',
           type: 1,
           time: '1608538812',
         },
         {
           title: '店铺 Renom 跟读了您的产品 B07W',
           type: 0,
           time: '1608538812',
         },
         {
           title: '店铺 Renom 跟读了您的产品 B07W',
           type: 2,
           time: '1608538812',
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
    methods:{
      /*页面刷新*/
      FnRefresh(){
        // this.reLoad();
        // window.location.href="http://localhost:8282/ ";
      },

      /*tab 切换点击事件  */
      FnChangeTab(tab,e){
        console.log(tab);
        console.log(e);
      },

      chooseProject(val){
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
      PageCurrent(page) {
        console.log(page);
        // this.staffPage = page;
        // this.getStaffIndex();
      },
      sizeChange(size){
        console.log(size);
      },
    },
    created(){
      // this.addNum();
    },
}
</script>
