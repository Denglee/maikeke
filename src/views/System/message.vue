<template>
  <div class="public-main">
    <div class="formR-main">
      <el-button icon="el-icon-folder-add" @click="FnBtnSaveAddSite" :loading="btnState.btnAdd" class="public-btn">
        保存</el-button>
    </div>
    <el-table class="public-table" border
              :data="tableArr"
              ref="refTable"
              height="600">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="msgType" label="消息类型"></el-table-column>
      <el-table-column prop="inStation" label="站内消息">
        <template slot-scope="{row}">
          <el-checkbox v-model="row.inStation==0" @change="FnChangeMes(row,'inStation')">
            <div style="width: 80px;border: solid 0px red;padding: 8px"> &nbsp;  </div>
          </el-checkbox>
        </template>
      </el-table-column>
      <el-table-column prop="mail" label="邮件通知">
        <template slot-scope="{row}">
          <el-checkbox v-model="row.mail===0" @change="FnChangeMes(row,'mail')">
            <div style="width: 80px;border: solid 0px red;padding: 8px"> &nbsp;  </div>
          </el-checkbox>
        </template>
      </el-table-column>
      <el-table-column prop="wechat" label="企业微信">
        <template slot-scope="{row}">
          <el-checkbox v-model="row.wechat == 0" @change="FnChangeMes(row,'wechat')">
            <div style="width: 80px;border: solid 0px red;padding: 8px"> &nbsp;  </div>
          </el-checkbox>
        </template>
      </el-table-column>
      <el-table-column prop="textMsg" label="短信通知">
        <template slot-scope="{row}">
          <el-checkbox v-model="row.textMsg == 0" @change="FnChangeMes(row,'textMsg')">
            <div style="width: 80px;border: solid 0px red;padding: 8px"> &nbsp;  </div>
          </el-checkbox>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="电话通知">
        <template slot-scope="{row}">
          <el-checkbox v-model="row.phone == 0" @change="FnChangeMes(row,'phone')">
            <div style="width: 80px;border: solid 0px red;padding: 8px"> &nbsp;  </div>
          </el-checkbox>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
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
import {addMessage, delMessage, listMessage, updateMessage} from '@/assets/js/api'

export default {
  name: "ExchangeManage",
  data() {
    return {
      pageArr: {
        pageNum: 1,
        total: 20,
        pageSize: 10,
      },
      
      diaState: {
        diaAddMessage: false,
      },
      btnState: {
        loadTable: true,
        btnAdd: false,
        btnCancelSite: false,
        btnSubmitSite: false,
      },

      /*添加表单*/
      addSiteForm: {},
      diaTitle: '添加',
      tableArr: [],
    }
  },
  methods: {
    /*消息列表 api*/
    FnGetMessage() {
      listMessage().then(res => {
        console.log(res);
        this.tableArr = res.data;
        this.pageArr.total = res.total;
      })
    },

    FnChangeMes(val,type){
      console.log(val);
      if(val[type] == 1){
        val[type] =0;
      }else {
        val[type] =1;
      }
    },

    /*保存添加、修改*/
    FnBtnSaveAddSite() {
      console.log(this.tableArr);
      this.GLOBAL.btnStateChange( this,'btnState','btnAdd');
      updateMessage(this.tableArr).then(res=>{
        console.log(res);
        this.$message(res.msg);
      })
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
    this.FnGetMessage();
  },
}
</script>
