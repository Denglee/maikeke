<template>
  <div class="public-main">
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



    </el-form>

    <!-- 表格-->
    <el-table class="public-table" border
              :data="tableStaff"
              ref="multipleTable">
      <el-table-column prop="store" label="订单"></el-table-column>
      <el-table-column prop="country" label="配送日期"></el-table-column>
      <el-table-column prop="type" label="MSKU"></el-table-column>
      <el-table-column prop="active" label="标题"></el-table-column>
      <el-table-column prop="shopNum" label="本地品名/SKU"></el-table-column>
      <el-table-column prop="clickNum" label="店铺"></el-table-column>
      <el-table-column prop="money" label="国家"></el-table-column>
      <el-table-column prop="money" label="FNSKU"></el-table-column>
      <el-table-column prop="money" label="货币类型"></el-table-column>
      <el-table-column prop="money" label="商品金额"></el-table-column>
      <el-table-column prop="money" label="商品金额"></el-table-column>
      <el-table-column prop="money" label="数量"></el-table-column>
      <el-table-column prop="money" label="运费"></el-table-column>
      <el-table-column prop="money" label="礼品金额"></el-table-column>
      <el-table-column prop="money" label="收货城市"></el-table-column>
      <el-table-column prop="money" label="收货州"></el-table-column>
      <el-table-column prop="money" label="收货地邮政编码"></el-table-column>
    </el-table>

     <Pagination
        :pageNum="pageArr.pageNum"
        :total="pageArr.total"
        :pageSize="pageArr.pageSize"
        @SonSizeChange='FaSizeChange'
        @SonCurrentChange="FaPageCurrent"></Pagination>

  </div>
</template>

<script>
import Pagination from "@/components/Pagination/Pagination";
export default {
  name: "OrderReport",
  inject: ['reLoad'],
   components:{Pagination},
  data() {
    return {

      tabPosition: 'left',
      tabActiveName: 'name1',
      formData: {
        projectName: '',
        order_time: '',
      },
      pageArr: {
        pageNum:1,
        total:110,
        pageSize:10,
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
          store:'店铺1',
          country:0,
          type:0,
          active:'JR1 jump rope',
          day:'1608538812',
          shopNum:1923,
          clickNum:139,
          CTR:'7.23%',
          money:'$202.84',
        },
        {
          store:'店铺2',
          country:0,
          type:0,
          active:'JR1 jump rope自动',
          day:'1608538812',
          shopNum:3074,
          clickNum:37,
          CTR:'1.23%',
          money:'$22.84',
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
