<template>
  <div class="public-main">
    <div class="formR-main">
      <el-button icon="el-icon-folder-add" @click="FnBtnAdd" :loading="btnState.btnAdd" class="public-btn">
        新增字典
      </el-button>
    </div>
    <el-table class="public-table" border
              :data="tableArr"
              ref="refTable"
              height="600">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="字典编码" align="center" prop="dictCode" />
      <el-table-column label="字典标签" align="center" prop="dictLabel" />
      <el-table-column label="字典键值" align="center" prop="dictValue" />
      <el-table-column label="字典排序" align="center" prop="dictSort" />
      <el-table-column label="状态" align="center" prop="status"/>
      <el-table-column label="备注" align="center" prop="remark"/>
      <el-table-column label="创建时间" align="center" prop="createTime" width="180"></el-table-column>

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
               :visible.sync="diaState.diaAddDict"
               custom-class="public-dialog"
               :close-on-click-modal="false"
               @close='FnCloseAddSite'
               width="800px">
      <el-form :model="addSiteForm" ref="RefAddSiteForm" label-width="156px" class="public-diaForm">
        <el-form-item label="字典类型">

          <el-input v-model="addSiteForm.dictType" :disabled="true" />
        </el-form-item>
        <el-form-item label="数据标签" prop="dictLabel">
          <el-input v-model="addSiteForm.dictLabel" placeholder="请输入数据标签" />
        </el-form-item>
        <el-form-item label="数据键值" prop="dictValue">
          <el-input v-model="addSiteForm.dictValue" placeholder="请输入数据键值" />
        </el-form-item>
        <el-form-item label="显示排序" prop="dictSort">
          <el-input-number v-model="addSiteForm.dictSort" controls-position="right" :min="0" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="addSiteForm.status">
<!--            <el-radio-->
<!--                v-for="dict in statusOptions"-->
<!--                :key="dict.dictValue"-->
<!--                :label="dict.dictValue"-->
<!--            >{{dict.dictLabel}}</el-radio>-->
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="addSiteForm.remark" type="textarea" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item class="alignR">
          <el-button type="primary" @click="diaState.diaAddDict = false;" :loading="btnState.btnCancelSite">取消
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
import {addDictData, listDictData,getDict, updateDictData, delDictData} from '@/assets/js/api'

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
        diaAddDict: false,
      },
      btnState: {
        loadTable: true,
        btnAdd: false,
        btnCancelSite: false,
        btnSubmitSite: false,
      },

      /*添加表单*/
      addSiteForm: {

      },
      diaTitle: '添加',
      tableArr: [],

      /*typeArr*/
      dictDataArr:{},
      dictType:'',
    }
  },
  methods: {
    /*字典列表 type api*/
    FnGetDictType(id) {
      getDict(id).then(res => {
        console.log(res);
        this.dictDataArr = res.data;
        this.dictType = res.data.dictType;
        this.FnGetDictList(res.data.dictType);
      })
    },

    /*字典列表 type api*/
    FnGetDictList(type) {
      listDictData({
        dictType:type,
      }).then(res => {
        console.log(res);
        this.tableArr = res.data;
        this.pageArr.total = res.total;
      })
    },

    /*添加*/
    FnBtnAdd() {
      this.addSiteForm = {};
      this.addSiteForm.dictType = this.dictType;
      this.diaState.diaAddDict = true;
      this.diaTitle = '添加字典';
      this.GLOBAL.btnStateChange(this, 'btnState', 'btnAdd');
    },

    /*删除 方法*/
    FnDelDict(DictName, DictIds) {
      let that = this;
      this.$confirm('是否确认删除' + DictName + '?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        delDictData(DictIds).then(res => {
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
        let Dictname = val.data.dictLabel;
        let DictIds = val.data.dictCode;

        console.log(Dictname);
        console.log(DictIds);
        that.FnDelDict(Dictname, DictIds);
      }

      /*修改*/
      if (val.type == 'update') {
        this.addSiteForm = val.data;
        this.diaState.diaAddDict = true;
        this.diaTitle = "修改字典";
      }
    },

    /*关闭*/
    FnCloseAddSite() {},

    /*保存添加、修改*/
    FnBtnSaveAddSite() {
      let DictId = this.addSiteForm.dictCode;
      console.log(DictId);
      this.GLOBAL.btnStateChange(this, 'btnState', 'btnSubmitSite');
      if (DictId) {
        /*有 DictId， 则修改*/
        updateDictData(this.addSiteForm).then(res => {
          console.log(res);
          this.$message(res.msg);
        })
      } else {
        /*没有 DictId，则添加*/
        addDictData(this.addSiteForm).then(res => {
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
    const dictId = this.$route.params.id;
    console.log(dictId);

    this.FnGetDictType(dictId);
  },
}
</script>
