<template>
  <div>

    <el-form :model="reportForm" class="form-box" ref="addStaffForm" label-width="90px" :inline="true" size="small">

      <el-form-item label="项目名称：">
        <el-input v-model="reportForm.projectName" clearable placeholder="项目名称"></el-input>
      </el-form-item>


      <el-form-item label="店铺名称：">
        <el-select  v-model="chooseStoreName" filterable clearable class="public-select"
                    value-key="id" @change="changeStore" @clear="removeStore()">
          <el-option label="全部店铺" value=""></el-option>
          <el-option v-for="(item, index) in storeArr"
                     :key="index"
                     :label="item.storeName"
                     :value="item.storeName">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="站点：">
        <el-select  v-model="reportForm.site" filterable clearable class="public-select"
                    @clear="removeSite()">
          <el-option label="全部站点" value=""></el-option>
          <el-option v-for="(item, index) in siteArr"
                     :key="index"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="时间：">
        <el-date-picker
            class="public-datePicker"
            v-model="order_time"
            type="daterange"
            unlink-panels
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="changeTime"
            value-format="yyyy-MM-ddTHH:mm:ss"
            :picker-options="pickerTime">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="">
        <el-button icon="el-icon-search" @click="FnSearchShop" :loading="btnState.btnSearchLoad" class="public-btn" size="mini">生成报表</el-button>
      </el-form-item>
    </el-form>
    <div class="tip">*提示：每次下载内容不包含之前已经下载过的记录。</div>

    <el-table
        :data="tableData"
        height="690px"
        class="table-box">
      <el-table-column type="index" label="序号" width="80"></el-table-column>
      <el-table-column label="生成条件" align="center">
        <el-table-column prop="projectName" label="所属项目"></el-table-column>
        <el-table-column prop="store" label="所属店铺">
        </el-table-column>
        <el-table-column prop="site" label="站点">
          <template slot-scope="scope">
            <span v-if=" scope.row.site == 'USA' ">美国</span>
            <span v-else>英国</span>
          </template>
        </el-table-column>
        <el-table-column prop="begintime" label="开始时间">
          <template slot-scope="scope">
            <div class="status-connect">{{ scope.row.begintime | dateFormat1 }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="endtime" label="结束时间">
          <template slot-scope="scope">
            <div class="status-connect">{{ scope.row.endtime | dateFormat1 }}</div>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <span v-if=" scope.row.status == 0 " style="color: #005ad4;">生成中</span>
          <span v-if=" scope.row.status == 1 " style="color: #67C23A;">成功</span>
          <span v-if=" scope.row.status == 2 " style="color: red;">失败</span>
        </template>
      </el-table-column>
      <el-table-column prop="time" label="操作时间">
        <template slot-scope="scope">
          <div class="status-connect">{{ scope.row.time | dateFormat1 }}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="FnDown(scope.row)" size="mini"
                     :loading="scope.row.btnLoad">
            <i class="el-icon-download" style="font-size: 15px;"></i>下载
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
        background
         layout="total,  prev, pager,next, sizes, jumper"
        :page-sizes="[10, 20, 50, 100]"
        :total="pageArr.pageTotalRows"
        :page-size="pageArr.pageSize"
        @current-change="PageCurrent">
    </el-pagination>

  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  name: "KeywordRank",
  data() {
    return {
      pageArr: {
        pageTotalRows: 10,  //总条数
        pageSize:5, //每页个数
        pageNum:1,
      },
      btnState:{
        btnSearchLoad:false,
      },

      tableData: [],

      order_time:'',
      chooseStoreName:[],
      reportForm:{
        projectName:'',
        sellerId:'',
        sellerName:'',
        site:'',
        startdate:'',
        enddate:'',
      },
      /*店铺*/
      // storeArr: [],
      storeArr: [
        {
          "remark": "",
          "createTime": "2021-01-14T11:55:28.000+08:00",
          "createBy": null,
          "updateTime": "2021-01-14T11:55:28.000+08:00",
          "updateBy": null,
          "storeName": "VIWO",
          "storeCode": "VIWO-USA-1-1",
          "site": "1",
          "country": "USA",
          "platform": "1",
          "sellerId": "this_is_test1",
          "authToken": "this_is_test1",
          "principalCode": null,
          "principalName": "charger100",
          "principalEmail": null,
          "advertAuth": 0,
          "principalAuth": 0
        },
        {
          "remark": "",
          "createTime": "2021-01-14T11:57:05.000+08:00",
          "createBy": null,
          "updateTime": "2021-01-14T11:57:05.000+08:00",
          "updateBy": null,
          "storeName": "Canfeifan",
          "storeCode": "Canfeifan-USA-1-1",
          "site": "1",
          "country": "USA",
          "platform": "1",
          "sellerId": "this_is_test2",
          "authToken": "this_is_test2",
          "principalCode": null,
          "principalName": "charger100",
          "principalEmail": null,
          "advertAuth": 0,
          "principalAuth": 0
        }
      ],

      /*站点*/
      siteArr:[
        {
          id:1,
          value:"USA",
          label:'美国',
        },
        {
          id:2,
          value:"UK",
          label:'英国',
        },
      ],

      pickerTime:{
        disabledDate(time) {
          return time.getTime() > Date.now()+1;
        }
      },
    }
  },

  filters: {
    dateFormat1(dataStr) {
      return moment(dataStr).format('YYYY-MM-DD')
    }
  },
  methods: {

    /*时间选择*/
    changeTime(val){
      console.log(val);
      if(val){
        this.reportForm.startdate = val[0];
        this.reportForm.enddate = val[1];
      }
    },

    /*获取店铺*/
    getStore(){
      let that = this;
      this.$axios.get('/storeAuth/selectStoreAuth')
      .then(res => {
        console.log(res.data.data);
        that.storeArr = res.data.data;
      })
      .catch(res => {
        console.log(res);
      });
    },
    /*店铺选择*/
    changeStore(val){
      if(val){
        let obj = {};
        obj = this.storeArr.find((item)=>{
          return item.storeName == val;//筛选出匹配数据
        });
        console.log(obj.sellerId);//我这边的name就是对应label的

        this.reportForm.sellerId = obj.sellerId;
        this.reportForm.sellerName = val;
      }
    },
    removeStore(){
      this.reportForm.sellerId = '';
      this.reportForm.sellerName = '';
    },
    removeSite(){
      this.reportForm.site = '';
    },


    /*生成报道 点击事件*/
    FnSearchShop() {
      console.log(this.reportForm);
      // this.btnStateChange(this, 'btnState', 'btnSearchLoad');
      if(this.reportForm.startdate == '' || this.reportForm.enddate == ''){
          this.$message.error('时间不能为空');
          return
      }

      let reportForm = this.reportForm;
      this.$axios.post('/mkeke-finance-payment/makeReport',reportForm)
        .then(res => {
          console.log(res);
          if(res.data.code  == 200){
            this.$message.error(res.data.message);
            setTimeout(()=>{
              window.location.reload();
            },1000)
          }else{
            this.$message.error(res.data.message);
          }
        })
        .catch(res => {
          console.log(res);
        });
    },

    /*获取生成列表*/
    FnGetList(){
      let that = this;
      let pageArrPar = {
        pageNum:this.pageArr.pageNum,
        pageSize:this.pageArr.pageSize,
      }
      this.$axios.get('/mkeke-finance-report-status/list',{
        params:pageArrPar,
      })
      .then(res=> {
        console.log(res.data);
        that.tableData = res.data.data;
        this.pageArr.pageTotalRows = res.data.total;
      })
      .catch(res => {
        console.log(res);
      });
    },

    /*下载*/
    FnDown(val){
      console.log(val);
      let that = this;
      that.$set(val, 'btnLoad', true);
      setTimeout(()=>{
        that.$set(val, 'btnLoad', false);
      },1000);
      // this.$message.success('下载成功');
      window.location.href=val.url;
    },

    /*分页 */
    PageCurrent(page) {
      console.log(page);
      this.pageArr.pageNum = page;
      this.FnGetList();
    },
  },
  created() {
    this.getStore();
    this.FnGetList();
  },
}
</script>
