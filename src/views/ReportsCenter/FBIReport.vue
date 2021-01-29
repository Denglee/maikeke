<template>
  <div class="tabs-main">
    <el-tabs :tab-position="tabPosition" id="tabs-message" v-model="tabActiveName" @tab-click="FnChangeTab">
      <el-tab-pane lazy label="赔偿" name="name1">
        <!--中间部分-->
        <div class="tab-content">
          <el-form class="public-form">
            <el-select v-model="formData.projectName" filterable multiple clearable collapse-tags
                       popper-class="elSelect-checkbox" class="public-select" @change='chooseProject($event)'>
              <el-option v-for="(item, index) in projectArr"
                         :key="index"
                         :value="item.name"
                         :label="item.value">
                <span class="check"></span>
                <span style="margin-left: 8px">{{ item.value }}</span>
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
            <el-button icon="el-icon-search" @click="FnSearchShop" :loading="btnState.btnSearchLoad" class="public-btn">
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

          <el-pagination
              background
              layout="total, prev, pager,next, sizes, jumper"
              :page-sizes="[10, 20, 50, 100]"
              :current-page="pageArr.pageNum"
              :total="pageArr.total"
              :page-size="pageArr.pageSize"
              @size-change='sizeChange'
              @current-change="PageCurrent">
          </el-pagination>
        </div>

      </el-tab-pane>

      <el-tab-pane lazy label="移除货件" name="name2">

      </el-tab-pane>

      <el-tab-pane lazy label="月存储费用" name="name3">

      </el-tab-pane>

      <el-tab-pane lazy label="长期存储费用" name="name4">

      </el-tab-pane>

      <el-tab-pane lazy label="已接收库存" name="name5">

      </el-tab-pane>

      <el-tab-pane lazy label="每日库存历史" name="name6">

      </el-tab-pane>

      <el-tab-pane lazy label="每月库存历史" name="name7">

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
  data() {
    return {
      tabPosition: 'left',
      tabActiveName: 'name1',
      formData: {
        projectName: '',
        order_time: '',
      },
      pageArr: {
        pageNum: 1,
        total: 110,
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
      console.log(this.formData);
      this.GLOBAL.btnStateChange(this, 'btnState', 'btnSearchLoad');
    },

    /*保存设置*/
    FnBtnSaveSet() {
      // this.btnState.btnSaveSet = true;
      console.log(this.setForm);
    },

    /*分页 */
    PageCurrent(page) {
      console.log(page);
      // this.staffPage = page;
      // this.getStaffIndex();
    },
    sizeChange(size) {
      console.log(size);
    },


  },
  created() {
    // this.addNum();
  },
}
</script>
