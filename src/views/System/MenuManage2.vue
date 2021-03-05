<template>
  <div class="public-main">
    <el-form :model="queryParams" ref="queryForm" :inline="true" v-show="showSearch">
      <el-form-item label="菜单名称" prop="menuName">
        <el-input
            v-model="queryParams.menuName"
            placeholder="请输入菜单名称"
            clearable
            size="small"
            @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="菜单状态" clearable size="small">
          <el-option
              v-for="dict in statusOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
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
        >新增
        </el-button>
      </el-col>
      <!--         <right-toolbar :showSearch.sync="showSearch" @queryTable="FnGetMenuList"></right-toolbar>-->
    </el-row>

    <el-table
        v-loading="loading"
        :data="menuList"
        row-key="menuId"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="menuName" label="菜单名称" :show-overflow-tooltip="true" width="160"></el-table-column>
      <el-table-column prop="icon" label="图标" align="center" width="100">
        <template slot-scope="scope">
          <i :icon-class="scope.row.icon"/>
        </template>
      </el-table-column>
      <el-table-column prop="orderNum" label="排序" width="60"></el-table-column>
      <el-table-column prop="perms" label="权限标识" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="component" label="组件路径" :show-overflow-tooltip="true"></el-table-column>
      <el-table-column prop="status" label="状态" :formatter="statusFormat" width="80"></el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime">
        <template slot-scope="scope">
          <!--               <span>{{ parseTime(scope.row.createTime) }}</span>-->
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini"
                     type="text"
                     icon="el-icon-edit"
                     @click="handleUpdate(scope.row)"
          >修改
          </el-button>

          <el-button
              size="mini"
              type="text"
              icon="el-icon-plus"
              @click="handleAdd(scope.row)"
          >新增
          </el-button>
          <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加或修改菜单对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="上级菜单">
              <el-cascader
                  v-model="form.parentId"
                  :options="menuOptions"
                  :show-all-levels="false"
                  :props="{
                                checkStrictly: true,
                                value:'id',
                                label:'label',
                                emitPath:false
                             }"
                  clearable>
                <template slot-scope="{ node, data }">
                  <span>{{ data.label }}</span>
                  <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
                </template>
              </el-cascader>
            </el-form-item>

          </el-col>
          <el-col :span="24">
            <el-form-item label="菜单类型" prop="menuType">
              <el-radio-group v-model="form.menuType">
                <el-radio label="M">目录</el-radio>
                <el-radio label="C">菜单</el-radio>
                <el-radio label="F">按钮</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="菜单名称" prop="menuName">
              <el-input v-model="form.menuName" placeholder="请输入菜单名称"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示排序" prop="orderNum">
              <el-input-number v-model="form.orderNum" controls-position="right" :min="0"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="form.menuType != 'F'" label="是否外链">
              <el-radio-group v-model="form.isFrame">
                <el-radio label="0">是</el-radio>
                <el-radio label="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="form.menuType != 'F'" label="路由地址" prop="path">
              <el-input v-model="form.path" placeholder="请输入路由地址"/>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="form.menuType == 'C'">
            <el-form-item label="组件路径" prop="component">
              <el-input v-model="form.component" placeholder="请输入组件路径"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="form.menuType != 'M'" label="权限标识">
              <el-input v-model="form.perms" placeholder="请权限标识" maxlength="50"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="form.menuType != 'F'" label="显示状态">
              <el-radio-group v-model="form.visible">
                <el-radio label="0">显示</el-radio>
                <el-radio label="1">隐藏</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="form.menuType != 'F'" label="菜单状态">
              <el-radio-group v-model="form.status">
                <el-radio label="0">正常</el-radio>
                <el-radio label="1">停用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <!--               <el-col :span="12">-->
          <!--                  <el-form-item v-if="form.menuType == 'C'" label="是否缓存">-->
          <!--                     <el-radio-group v-model="form.isCache">-->
          <!--                        <el-radio label="0">缓存</el-radio>-->
          <!--                        <el-radio label="1">不缓存</el-radio>-->
          <!--                     </el-radio-group>-->
          <!--                  </el-form-item>-->
          <!--               </el-col>-->
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="FnBtnCancel">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { listMenu, getMenu, delMenu, addMenu, updateMenu } from "@/api/system/menu";
import {addMenu, updateMenu, getMenu, menuDelRouters, getMenuTable, listMenu, menuGetRouters} from "@/assets/js/api";

import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
// import IconSelect from "@/components/IconSelect";

export default {
  name: "MenuManage",
  components: {Treeselect},
  data() {
    return {
      // 遮罩层
      loading: true,

      // 显示搜索条件
      showSearch: true,

      // 菜单表格树数据
      menuList: [],

      // 菜单树选项
      menuOptions: [],

      // 弹出层标题
      title: "",

      // 是否显示弹出层
      open: false,

      // 显示状态数据字典
      visibleOptions: [],

      // 菜单状态数据字典
      statusOptions: [
        {
          dictLabel: '正常',
          dictValue: 0,
        },
        {
          dictLabel: '停用',
          dictValue: 1,
        },
      ],

      // 查询参数
      queryParams: {
        menuName: undefined,
        visible: undefined
      },
      // 表单参数
      form: {},

      // 表单校验
      rules: {
        menuName: [
          {required: true, message: "菜单名称不能为空", trigger: "blur"}
        ],
        orderNum: [
          {required: true, message: "菜单顺序不能为空", trigger: "blur"}
        ],
        path: [
          {required: true, message: "路由地址不能为空", trigger: "blur"}
        ]
      }
    };
  },
  created() {
    this.FnGetMenuList();

    this.getTreeselect();

    // this.getDicts("sys_show_hide").then(response => {
    //    this.visibleOptions = response.data;
    // });
  },
  methods: {
    handleTree(data, id, parentId, children, rootId) {
      id = id || 'id'
      parentId = parentId || 'parentId'
      children = children || 'children'
      rootId = rootId || Math.min.apply(Math, data.map(item => { return item[parentId] })) || 0
      //对源数据深度克隆
      const cloneData = JSON.parse(JSON.stringify(data))
      //循环所有项
      const treeData = cloneData.filter(father => {
        let branchArr = cloneData.filter(child => {
          //返回每一项的子级数组
          return father[id] === child[parentId]
        });
        branchArr.length > 0 ? father.children = branchArr : '';
        //返回第一层
        return father[parentId] === rootId;
      });

      console.log(treeData);
      return treeData != '' ? treeData : data;
    },


    /** 查询菜单列表 */
    FnGetMenuList() {
      this.loading = true;
      listMenu(this.queryParams).then(res => {
        console.log(res);

        this.menuList = this.handleTree(res.data, "menuId");
        this.loading = false;
      })
    },

    /** 查询菜单下拉树结构 */
    getTreeselect() {
      getMenuTable().then(res => {
        this.menuOptions = res.data;
      });
    },

    // 菜单状态字典翻译
    statusFormat(row, column) {
      // if (row.menuType == "F") {
      //    return "";
      // }
      // return this.selectDictLabel(this.statusOptions, row.status);
    },
    // 取消按钮
    FnBtnCancel() {
      this.open = false;
      this.reset();
    },
    resetForm(formName) {
      // this.$refs[formName].resetFields()
    },

    // 表单重置
    reset() {
      this.form = {
        menuId: undefined,
        parentId: 0,
        menuName: undefined,
        icon: undefined,
        menuType: "M",
        orderNum: undefined,
        isFrame: "1",
        isCache: "0",
        visible: "0",
        status: "0"
      };
      this.resetForm("form");
    },

    /** 搜索按钮操作 */
    handleQuery() {
      this.FnGetMenuList();
    },

    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    /** 新增按钮操作 */
    handleAdd(row) {
      this.reset();
      if (row != null && row.menuId) {
        this.form.parentId = row.menuId+'';
      } else {
        this.form.parentId = 0;
      }
      this.open = true;
      this.title = "添加菜单";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {

      this.reset();

      getMenu(row.menuId).then(response => {
        this.form = response.data;
        this.form.parentId = response.data.parentId + '';
        console.log(this.form.parentId);
        this.open = true;
        this.title = "修改菜单";
      });
    },
    /** 提交按钮 */
    submitForm: function () {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.menuId != undefined) {
            updateMenu(this.form).then(response => {
              this.$message.success("修改成功");
              this.open = false;
              this.FnGetMenuList();
            });
          } else {
            addMenu(this.form).then(response => {
              this.$message.success("新增成功");
              this.open = false;
              this.FnGetMenuList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      this.$confirm('是否确认删除名称为"' + row.menuName + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        console.log(row);
        menuDelRouters(row.menuId).then(res => {
          console.log(res);
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.FnGetMenuList();
          } else {
            this.$message.error(res.msg);
          }
        })
      })
    }
  }
};
</script>
