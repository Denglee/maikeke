<template>
  <div class="public-main">
    <div class="formR-main">
      <el-button icon="el-icon-folder-add" @click="FnBtnAdd" :loading="btnState.btnAdd" class="public-btn">
        新增应用
      </el-button>
    </div>
    <el-table class="public-table" border
              :data="tableArr"
              ref="refTable"
              height="600">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="applyNum" label="应用编号"></el-table-column>
      <el-table-column prop="applyNum" label="应用编号"></el-table-column>
      <el-table-column prop="applyName" label="应用名称"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="{row}">
          <el-switch
              v-model="row.status"
              active-value="0"
              inactive-value="1"
              active-text="正常"
              inactive-text="停用"
              @change='FnSwitchState(row.state)'>
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-dropdown @command="FnCommand">
            <el-button type="primary">
              操作<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="{ type:'delete', data:scope.row }">删除</el-dropdown-item>
              <el-dropdown-item :command="{ type:'update', data:scope.row }">修改</el-dropdown-item>
              <!--              <el-dropdown-item :command="{ type:'detail', data:scope.row }">查看详情</el-dropdown-item>-->
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <Pagination
        :pageNum="pageArr.pageNum"
        :total="pageArr.total"
        :pageSize="pageArr.pageSize"
        @SonSizeChange='FaSizeChange'
        @SonCurrentChange="FaPageCurrent"></Pagination>

    <!--添加\编辑区域站点 -->
    <el-dialog :append-to-body="true"
               :title="diaTitle"
               :visible.sync="diaState.diaAddApply"
               custom-class="public-dialog"
               :close-on-click-modal="false"
               @close='FnCloseAddSite'
               width="800px">
      <el-form :model="addSiteForm" ref="RefAddSiteForm" label-width="156px" class="public-diaForm">
        <el-form-item label="应用logo：" prop="applyLogo">
          <el-input type="text" v-model="addSiteForm.applyLogo" autocomplete="off" clearable
                    placeholder="应用logo"></el-input>
        </el-form-item>
        <el-form-item label="应用名称：" prop="applyName">
          <el-input type="text" v-model="addSiteForm.applyName" autocomplete="off" clearable
                    placeholder="应用名称"></el-input>
        </el-form-item>

        <el-form-item label="应用编号：" prop="applyNum">
          <el-input type="text" v-model="addSiteForm.applyNum" autocomplete="off" clearable
                    placeholder="应用编号"></el-input>
        </el-form-item>
        <el-form-item label="状态：" prop="status">
          <el-radio v-model="addSiteForm.status" label="0">正常</el-radio>
          <el-radio v-model="addSiteForm.status" label="1">停用</el-radio>
        </el-form-item>

        <el-form-item label="备注：" prop="remark">
          <el-input type="text" v-model="addSiteForm.remark" autocomplete="off" clearable
                    placeholder="备注"></el-input>
        </el-form-item>
        <el-form-item class="alignR">
          <el-button type="primary" @click="diaState.diaAddApply = false;" :loading="btnState.btnCancelSite">取消
          </el-button>
          <el-button type="primary" @click="FnBtnSaveAddSite('RefAddSiteForm')" :loading="btnState.btnSubmitSite">
            保存
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import {addApply, delApply, listApply, updateApply} from '@/assets/js/api'

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
        diaAddApply: false,
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
    /*应用列表 api*/
    FnGetApply() {
      listApply().then(res => {
        console.log(res);
        this.tableArr = res.data;
        this.pageArr.total = res.total;
      })
    },

    /*添加*/
    FnBtnAdd() {
      this.addSiteForm = {};
      this.diaState.diaAddApply = true;
      this.diaTitle = '添加应用';
      this.GLOBAL.btnStateChange(this, 'btnState', 'btnAdd');
    },

    /*删除 方法*/
    FnDelApply(ApplyName, ApplyIds) {
      let that = this;
      this.$confirm('是否确认删除' + ApplyName + '?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        delApply(ApplyIds).then(res => {
          console.log(res);
          that.$message(res.msg);
        })
      })
    },
    /*表格操作*/
    FnCommand(val) {
      console.log(val);
      let that = this;
      /*删除*/
      if (val.type == 'delete') {
        console.log( val.data);
        let Applyname = val.data.applyName;
        let ApplyIds = val.data.applyId;

        that.FnDelApply(Applyname, ApplyIds);
      }

      /*修改*/
      if (val.type == 'update') {
        this.addSiteForm = val.data;
        this.diaState.diaAddApply = true;
        this.diaTitle = "修改应用";
      }
    },

    FnSwitchState(){

    },
    /*关闭*/
    FnCloseAddSite() {},

    /*保存添加、修改*/
    FnBtnSaveAddSite() {
      let ApplyId = this.addSiteForm.applyId;
      console.log(ApplyId);
      this.GLOBAL.btnStateChange(this, 'btnState', 'btnSubmitSite');
      if (ApplyId) {
        /*有 ApplyId， 则修改*/
        updateApply(this.addSiteForm).then(res => {
          console.log(res);
          this.$message(res.msg);
        })
      } else {
        /*没有 ApplyId，则添加*/
        addApply(this.addSiteForm).then(res => {
          console.log(res);
          this.$message(res.msg);
        })
      }
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
    this.FnGetApply();
  },
}
</script>
