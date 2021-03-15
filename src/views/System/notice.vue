<template>
  <div class="public-main">
    <div class="formR-main">
      <el-button icon="el-icon-folder-add" @click="FnBtnAdd" :loading="btnState.btnAdd" class="public-btn">
        新增公告
      </el-button>
    </div>
    <el-table class="public-table" border
              :data="tableArr"
              ref="refTable"
              height="600"
              v-loading="btnState.loadTable">
      <el-table-column label="序号" align="center" prop="noticeId" width="100" />
      <el-table-column
          label="公告标题"
          align="center"
          prop="noticeTitle"
          :show-overflow-tooltip="true"
      />
      <el-table-column label="公告类型" align="center" prop="noticeType" width="100">
        <template slot-scope="{row}">
          <span v-for="item in noticeTypeArr" :key="item.dictCode">
            <span v-if="row.noticeType == item.dictValue">{{item.dictLabel}}</span>
          </span>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" prop="status" width="100">
        <template slot-scope="{row}">
          <span v-if="row.status == 0">正常</span>
          <span v-else>停用</span>
        </template>
      </el-table-column>
      <el-table-column label="创建者" align="center" prop="createBy" width="100" />
      <el-table-column label="创建时间" align="center" prop="createTime" width="100"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-dropdown @command="FnCommand">
            <el-button type="primary">
              操作<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item :command="{ type:'delete', data:scope.row }">删除</el-dropdown-item>
              <el-dropdown-item :command="{ type:'update', data:scope.row }">修改</el-dropdown-item>
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

    <!--添加\编辑区域公告 -->
    <el-dialog :append-to-body="true"
               :title="diaTitle"
               :visible.sync="diaState.diaAddNotice"
               custom-class="public-dialog"
               :close-on-click-modal="false"
               width="800px">
      <el-form :model="addSiteForm" ref="RefAddSiteForm" label-width="156px" class="public-diaForm">
        <el-form-item label="公告名称：" prop="noticeTitle">
          <el-input type="text" v-model="addSiteForm.noticeTitle" autocomplete="off" clearable
                    placeholder="公告名称"></el-input>
        </el-form-item>
        <el-form-item label="状态：" prop="status">
          <el-radio v-model="addSiteForm.status" label="0">正常</el-radio>
          <el-radio v-model="addSiteForm.status" label="1">停用</el-radio>
        </el-form-item>
        <el-form-item label="公告类型" prop="noticeType">
          <el-select v-model="addSiteForm.noticeType" placeholder="请选择">
            <el-option
                v-for="dict in noticeTypeArr"
                :key="dict.dictValue"
                :label="dict.dictLabel"
                :value="dict.dictValue"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="内容：" prop="noticeContent">
          <el-input type="text" v-model="addSiteForm.noticeContent" autocomplete="off" clearable
                    placeholder="内容"></el-input>
        </el-form-item>

        <el-form-item class="alignR">
          <el-button type="primary" @click="diaState.diaAddNotice = false;" :loading="btnState.btnCancelSite">取消
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
import {addNotice, delNotice, listNotice, updateNotice,getDictType} from '@/assets/js/api'

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
        diaAddNotice: false,
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
      noticeTypeArr:[],
    }
  },
  methods: {
    FnGetNotice() {
      listNotice().then(res => {
        console.log(res);
        this.tableArr = res.data;
        this.pageArr.total = res.total;
        this.btnState.loadTable = false;
      }).catch(res=>{
        this.btnState.loadTable = false;
      })
    },

    /*dictype*/
    FnGetDicType(type,typeArr){
      getDictType(type).then(res=>{
        this[typeArr] = res.data;
      })
    },
    /*添加*/
    FnBtnAdd() {
      this.addSiteForm = {};
      this.diaState.diaAddNotice = true;
      this.diaTitle = '添加公告';
      this.GLOBAL.btnStateChange(this, 'btnState', 'btnAdd');
    },

    /*删除公告 方法*/
    FnDelNotice(NoticeName, NoticeIds) {
      let that = this;
      this.$confirm('是否确认删除' + NoticeName + '?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        delNotice(NoticeIds).then(res => {
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
        let Noticename = val.data.noticeTitle;
        let NoticeIds = val.data.noticeId;

        console.log(Noticename);
        console.log(NoticeIds);
        that.FnDelNotice(Noticename, NoticeIds);
      }

      /*修改*/
      if (val.type == 'update') {
        this.addSiteForm = Object.assign({},val.data);
        this.diaState.diaAddNotice = true;
        this.diaTitle = "修改公告";
      }
    },

    /*保存添加、修改*/
    FnBtnSaveAddSite() {
      let NoticeId = this.addSiteForm.noticeId;
      console.log(NoticeId);

      this.GLOBAL.btnStateChange(this, 'btnState', 'btnSubmitSite');
      if (NoticeId) {
        /*有 NoticeId， 则修改*/
        updateNotice(this.addSiteForm).then(res => {
          console.log(res);
          this.$message(res.msg);
        })
      } else {
        /*没有 NoticeId，则添加*/
        addNotice(this.addSiteForm).then(res => {
          console.log(res);
          this.$message(res.msg);
        })
      }
    },

    /*分页 */
    FaPageCurrent(page) {
      this.pageArr.pageNum = page;
      this.FnGetNotice();
    },
    FaSizeChange(size) {
      this.pageArr.pageSize = size;
      this.FnGetNotice();
    },
  },
  created() {
    this.FnGetNotice();

    this.FnGetDicType('sys_notice_type','noticeTypeArr')
  },
}
</script>
