<template>
   <div class="public-main">
      <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch" label-width="68px">
         <el-form-item label="字典名称" prop="dictName">
            <el-input
               v-model="queryParams.dictName"
               placeholder="请输入字典名称"
               clearable
               size="small"
               style="width: 240px"
               @keyup.enter.native="handleQuery"
            />
         </el-form-item>
         <el-form-item label="字典类型" prop="dictType">
            <el-input
               v-model="queryParams.dictType"
               placeholder="请输入字典类型"
               clearable
               size="small"
               style="width: 240px"
               @keyup.enter.native="handleQuery"
            />
         </el-form-item>
         <el-form-item label="状态" prop="status">
            <el-select
               v-model="queryParams.status"
               placeholder="字典状态"
               clearable
               size="small"
               style="width: 240px"
            >
               <el-option
                  v-for="dict in statusOptions"
                  :key="dict.dictValue"
                  :label="dict.dictLabel"
                  :value="dict.dictValue"
               />
            </el-select>
         </el-form-item>
<!--         <el-form-item label="创建时间">-->
<!--            <el-date-picker-->
<!--               v-model="dateRange"-->
<!--               size="small"-->
<!--               style="width: 240px"-->
<!--               value-format="yyyy-MM-dd"-->
<!--               type="daterange"-->
<!--               range-separator="-"-->
<!--               start-placeholder="开始日期"-->
<!--               end-placeholder="结束日期"-->
<!--            ></el-date-picker>-->
<!--         </el-form-item>-->
         <el-form-item>
            <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
         </el-form-item>
      </el-form>

      <el-row :gutter="10" class="mb8">
         <el-col :span="1.5">
            <el-button
               type="primary"
               plain
               icon="el-icon-plus"
               size="mini"
               @click="handleAdd"
            >新增</el-button>
         </el-col>
<!--         <el-col :span="1.5">-->
<!--            <el-button-->
<!--               type="success"-->
<!--               plain-->
<!--               icon="el-icon-edit"-->
<!--               size="mini"-->
<!--               :disabled="single"-->
<!--               @click="handleUpdate"-->
<!--            >修改</el-button>-->
<!--         </el-col>-->
         <el-col :span="1.5">
            <el-button
               type="danger"
               plain
               icon="el-icon-delete"
               size="mini"
               :disabled="multiple"
               @click="handleDelete"
            >删除</el-button>
         </el-col>
<!--         <el-col :span="1.5">-->
<!--            <el-button-->
<!--               type="warning"-->
<!--               plain-->
<!--               icon="el-icon-download"-->
<!--               size="mini"-->
<!--               @click="handleExport"-->
<!--            >导出</el-button>-->
<!--         </el-col>-->
<!--         <el-col :span="1.5">-->
<!--            <el-button-->
<!--               type="danger"-->
<!--               plain-->
<!--               icon="el-icon-refresh"-->
<!--               size="mini"-->
<!--               @click="handleClearCache"-->
<!--            >清理缓存</el-button>-->
<!--         </el-col>-->
<!--         <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>-->
      </el-row>

      <el-table v-loading="loading" :data="typeList" @selection-change="handleSelectionChange"
      class="public-table" border>
         <el-table-column type="selection" width="55" align="center" />
         <el-table-column label="字典编号" align="center" prop="dictId" />
         <el-table-column label="字典名称" align="center" prop="dictName" :show-overflow-tooltip="true" />
         <el-table-column label="字典类型" align="center" :show-overflow-tooltip="true">
            <template slot-scope="scope">
<!--               <router-link :to="'/dictData/' + scope.row.dictId" class="link-type">
                  <span>{{ scope.row.dictType }}</span>
               </router-link>-->
              <router-link :to="'/system/dictData/' + scope.row.dictId" class="link-type">
                <span>{{ scope.row.dictType }}</span>
              </router-link>
            </template>
         </el-table-column>
         <el-table-column label="状态" align="center" prop="status"/>
         <el-table-column label="备注" align="center" prop="remark" :show-overflow-tooltip="true" />
         <el-table-column label="创建时间" align="center" prop="createTime" width="180">
            <template slot-scope="scope">
<!--               <span>{{ parseTime(scope.row.createTime) }}</span>-->
            </template>
         </el-table-column>
         <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
            <template slot-scope="scope">
               <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-edit"
                  @click="handleUpdate(scope.row)"
               >修改</el-button>
               <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-delete"
                  @click="handleDelete(scope.row)"
               >删除</el-button>
            </template>
         </el-table-column>
      </el-table>

     <Pagination
         :pageNum="pageArr.pageNum"
         :total="pageArr.total"
         :pageSize="pageArr.pageSize"
         @SonSizeChange='FaSizeChange'
         @SonCurrentChange="FaPageCurrent"></Pagination>

      <!-- 添加或修改参数配置对话框 -->
      <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
         <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="字典名称" prop="dictName">
               <el-input v-model="form.dictName" placeholder="请输入字典名称" />
            </el-form-item>
            <el-form-item label="字典类型" prop="dictType">
               <el-input v-model="form.dictType" placeholder="请输入字典类型" />
            </el-form-item>
            <el-form-item label="状态" prop="status">
               <el-radio-group v-model="form.status">
                  <el-radio
                     v-for="dict in statusOptions"
                     :key="dict.dictValue"
                     :label="dict.dictValue"
                  >{{dict.dictLabel}}</el-radio>
               </el-radio-group>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
               <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"></el-input>
            </el-form-item>
         </el-form>
         <div slot="footer" class="dialog-footer">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="submitForm" :loading="btnState.btnSaveMenu">确 定</el-button>
         </div>
      </el-dialog>
   </div>
</template>

<script>
import { listDict, getDict, delDict, addDict, updateDict, } from "@/assets/js/api";

export default {
   name: "Dict",
   data() {
      return {
        pageArr: {
          pageNum: 1,
          total: 20,
          pageSize: 10,
        },
         btnState:{
            btnSaveMenu:false
         },

         // 遮罩层
         loading: true,
         // 选中数组
         ids: [],
         // 非单个禁用
         single: true,
         // 非多个禁用
         multiple: true,
         // 显示搜索条件
         showSearch: true,
         // 总条数
         total: 0,
         // 字典表格数据
         typeList: [],

         // 弹出层标题
         title: "",
         // 是否显示弹出层
         open: false,
         // 状态数据字典
         statusOptions: [],
         // 日期范围
         dateRange: [],

         // 查询参数
         queryParams: {
            dictName: undefined,
            dictType: undefined,
            status: undefined
         },

         // 表单参数
         form: {},
         // 表单校验
         rules: {
            dictName: [
               { required: true, message: "字典名称不能为空", trigger: "blur" }
            ],
            dictType: [
               { required: true, message: "字典类型不能为空", trigger: "blur" }
            ]
         }
      };
   },
   created() {
      this.getList();
      // this.getDicts("sys_normal_disable").then(response => {
      //    this.statusOptions = response.data;
      // });
   },
   methods: {
      /** 查询字典类型列表 */
      getList() {
         this.loading = true;
         console.log(this.pageArr);
        this.queryParams, this.dateRange,this.pageArr
         listDict({
           pageSize: this.pageArr.pageSize,
           pageNum: this.pageArr.pageNum,
           dictName:this.queryParams.dictName,
           dictType:this.queryParams.dictType,
           status:this.queryParams.status,
         }).then(res => {
               this.typeList = res.data;
               this.pageArr.total = res.total;
               this.loading = false;
            }
         );
      },

      // 取消按钮
      cancel() {
         this.open = false;
         this.reset();
      },
      // 表单重置
      reset() {
         this.form = {
            dictId: undefined,
            dictName: undefined,
            dictType: undefined,
            status: "0",
            remark: undefined
         };
         // this.GLOBAL.resetForm(this,"form");
      },
      /** 搜索按钮操作 */
      handleQuery() {
         this.pageArr.pageNum = 1;
         this.getList();
      },
      /** 重置按钮操作 */
      resetQuery() {
         this.dateRange = [];
         this.resetForm("queryForm");
         this.handleQuery();
      },
      /** 新增按钮操作 */
      handleAdd() {
         this.reset();
         this.open = true;
         this.title = "添加字典类型";
      },
      // 多选框选中数据
      handleSelectionChange(selection) {
         this.ids = selection.map(item => item.dictId)
         this.single = selection.length!=1
         this.multiple = !selection.length
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
         this.reset();
         const dictId = row.dictId || this.ids
         getDict(dictId).then(response => {
            this.form = response.data;
            this.open = true;
            this.title = "修改字典类型";
         });
      },
      /** 提交按钮 */
      submitForm: function() {
         this.GLOBAL.btnStateChange(this,'btnState','btnSaveMenu');
         this.$refs["form"].validate(valid => {
            if (valid) {
               if (this.form.dictId != undefined) {
                  updateDict(this.form).then(response => {
                     this.$message.success("修改成功");
                     this.open = false;
                     this.getList();
                  });
               } else {
                  addDict(this.form).then(response => {
                     this.$message.success("新增成功");
                     this.open = false;
                     this.getList();
                  });
               }
            }
         });
      },
      /** 删除按钮操作 */
      handleDelete(row) {
         const dictIds = row.dictId || this.ids;
         this.$confirm('是否确认删除字典编号为"' + dictIds + '"的数据项?', "警告", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
         }).then(function() {
            return delDict(dictIds);
         }).catch(() => {
            this.getList();
            this.$message("删除成功");
         })
      },
      /** 导出按钮操作 */
      handleExport() {
         const queryParams = this.queryParams;
         this.$confirm('是否确认导出所有类型数据项?', "警告", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
         }).then(function() {
            return exportType(queryParams);
         }).then(response => {
            this.download(response.msg);
         })
      },

      /** 清理缓存按钮操作 */
      handleClearCache() {
         clearCache().then(response => {
            this.$message("清理成功");
         });
      },

     /*分页*/
     FaPageCurrent(page) {
       this.pageArr.pageNum = page;
       this.getList();
     },
     FaSizeChange(size) {
       this.pageArr.pageSize = size;
       this.getList();
     },
   }
};
</script>