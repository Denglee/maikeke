<template>
  <div class="organize-box ">
    <div class="organizeL-box">

      <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>

      <el-tree
          class="filter-tree"
          :data="treeData"
          default-expand-all
          :highlight-current=true
          :filter-node-method="filterNode"
          @node-click="handleNodeClick"
          ref="tree">
      </el-tree>
    </div>
    <div class="organizeR-box">
      <el-form :model="departmentForm" ref="RefAddForm" label-width="56px" class="public-form">
        <el-form-item label="用户：" prop="storeName">
          <el-input type="text" v-model="departmentForm.storeName" autocomplete="off" clearable
                    placeholder="请输入用户名/姓名/角色/手机号/部门"></el-input>
        </el-form-item>
        <el-form-item label="状态：" prop="storeState">
          <el-select v-model="departmentForm.storeState" filterable multiple clearable>
            <el-option v-for="( item, index ) in postArr" :key="index"
                       :label="item.value"
                       :value="item.name"></el-option>
          </el-select>
        </el-form-item>
        <el-button icon="el-icon-circle-plus-outline" :loading="btnState.btnSearch" @click="FnBtnSearch"
                   class="public-btn">查询
        </el-button>

        <div class="formR-main">
          <el-button icon="el-icon-folder-add" @click="FnBtnAdd" :loading="btnState.btnAdd" class="public-btn">
            新增员工
          </el-button>
          <!--               <el-button icon="el-icon-folder-add" @click="FnBtnExportIn" :loading="btnState.btnAdd" class="public-btn">导入-->
          <!--               </el-button>-->
          <!--               <el-button icon="el-icon-folder-add" @click="FnBtnExportout" :loading="btnState.btnAdd" class="public-btn">导出-->
          <!--               </el-button>-->
          <!--               <el-button icon="el-icon-folder-add" @click="FnBtnDelete" :loading="btnState.btnAdd" class="public-btn">-->
          <!--                  批量删除-->
          <!--               </el-button>-->
        </div>
      </el-form>
      <el-table class="public-table" border
                :data="tableArr"
                ref="refTable">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="userName" label="用户账号"></el-table-column>
        <el-table-column prop="nickName" label="用户昵称"></el-table-column>
        <el-table-column prop="phonenumber" label="电话" width="120px">
<!--          <template slot-scope="scope">-->
<!--            <el-input v-model="scope.row.phonenumber" @blur="blurInp"></el-input>-->
<!--          </template>-->
        </el-table-column>
        <el-table-column prop="dept.deptName" label="所属部门"></el-table-column>
        <el-table-column prop="posts" label="岗位" width="120px">
          <template slot-scope="scope">
            <el-tag v-for="(item,index) in scope.row.posts">{{item.postName}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="dept.leader" label="直属上司"></el-table-column>
        <el-table-column prop="roles" label="角色" width="120px">
          <template slot-scope="scope">
            <el-tag v-for="(item,index) in scope.row.roles">{{item.roleName}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="账户状态" min-width="140px">
          <template slot-scope="scope">
            <el-switch
                v-model="scope.row.status"
                active-value="0"
                inactive-value="1"
                active-text="正常"
                inactive-text="停用"
                @change='FnSwitchStatus(scope.row.status)'>
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="180px">
          <template slot-scope="scope">
            <el-button @click="FnBtnDetail(scope.row)">查看</el-button>
            <el-button @click="FnBtnEdit(scope.row)">编辑</el-button>
            <el-button @click="FnBtnPass(scope.row)">重置密码</el-button>
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
                 :title="diaState.diaUserTitle"
                 :visible.sync="diaState.diaAddUser"
                 custom-class="public-dialog"
                 :close-on-click-modal="false"
                 @close='FnCloseAddUser'
                 min-width="70%">
        <el-form :model="addUserForm" ref="RefAddSiteForm" label-width="120px" class="public-diaForm"
                 :inline="true">
          <div>账户信息</div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="用户账号：" prop="userName"
                            :rules="{ required: true, message: '请输入用户账号', trigger: 'blur' }">
                <el-input type="text" v-model="addUserForm.userName" autocomplete="off" clearable
                          placeholder="用户账号"></el-input>
              </el-form-item>
              <el-form-item label="初始密码：" prop="password"
                            :rules="{ required: true, message: '请输入初始密码', trigger: 'blur' }">
                <el-input type="password" v-model="addUserForm.password" autocomplete="off" clearable
                          placeholder="初始密码"></el-input>
              </el-form-item>
              <el-form-item label="用户昵称：" prop="nickName"
                            :rules="{ required: true, message: '请输入用户昵称', trigger: 'blur' }">
                <el-input type="text" v-model="addUserForm.nickName" autocomplete="off" clearable
                          placeholder="用户昵称"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <SingleCropper :autoCropWidth='200'
                             :autoCropHeight='200'
                             :imgWidth="200"
                             :imgHeight="200"
                             :isAvater=true
                             :initUrl="addUserForm.avatar"></SingleCropper>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="状态：" prop="status">
                <el-switch
                    v-model="addUserForm.status"
                    active-value="0"
                    inactive-value="1"
                    active-text="正常"
                    inactive-text="停用">
                </el-switch>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="性别：" prop="sex"
                            :rules="{ required: true, message: '请选择性别', trigger: 'change' }">
                <el-radio v-model="addUserForm.sex" label="1">男</el-radio>
                <el-radio v-model="addUserForm.sex" label="2">女</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="所属角色：" prop="roleIds"
                        :rules="{ required: true, message: '请选择所属角色', trigger: 'change' }">
            <el-select v-model="addUserForm.roleIds" multiple filterable clearable placeholder="请选择角色"
                       class="public-selectFull">
              <el-option v-for="(item, index) in roleArr" :key="item.id"
                         :value="item.roleId"
                         :label="item.roleName">
              </el-option>
            </el-select>
          </el-form-item>

          <div>组织关系</div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="所属部门：" prop="deptId"
                            :rules="{ required: true, message: '请选择部门', trigger: 'change' }">
                <el-cascader
                    v-model="addUserForm.deptId"
                    :options="deptArr"
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
              <el-form-item label="直属上司：" prop="superiorId">
                <el-select v-model="addUserForm.superiorId" value.key="id" filterable clearable placeholder="请选择平台"
                           class="public-selectFull">
                  <el-option v-for="(item, index) in tableArr" :key="item.id"
                             :value="item.userId"
                             :label="item.nickName">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="所属岗位：" prop="postIds">
                <el-select v-model="addUserForm.postIds" value.key="id" multiple filterable clearable
                           placeholder="请选择平台"
                           class="public-selectFull"
                           :rules="{ required: true, message: '所属岗位', trigger: 'change' }">
                  <el-option v-for="(item, index) in postArr" :key="item.postId"
                             :value="item.postId"
                             :label="item.postName">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="员工工号：" prop="wno">
                <el-input type="text" v-model="addUserForm.wno" autocomplete="off" clearable
                          placeholder="员工工号"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <div>个人信息</div>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="手机号码：" prop="phonenumber">
                <el-input type="text" v-model="addUserForm.phonenumber" autocomplete="off" clearable
                          placeholder="手机号码"></el-input>
              </el-form-item>
              <el-form-item label="QQ：" prop="qqNum">
                <el-input type="text" v-model="addUserForm.qqNum" autocomplete="off" clearable
                          placeholder="QQ"></el-input>
              </el-form-item>
              <el-form-item label="微信：" prop="wechat">
                <el-input type="text" v-model="addUserForm.wechat" autocomplete="off" clearable
                          placeholder="微信"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="邮箱：" prop="email">
                <el-input type="text" v-model="addUserForm.email" autocomplete="off" clearable
                          placeholder="邮箱"></el-input>
              </el-form-item>
              <el-form-item label="身份证：" prop="idNum">
                <el-input type="text" v-model="addUserForm.idNum" autocomplete="off" clearable
                          placeholder="身份证"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-button icon="el-icon-folder-add" @click="FnBtnUserSave('RefAddSiteForm')" :loading="btnState.btnAddSubmit"
                     class="public-btn">保存</el-button>

        </el-form>
      </el-dialog>

    </div>
  </div>
</template>

<script>
import SingleCropper from "@/components/cropper/SingleCropper";
import {addUser, updateUser, listUser, treeSelDept, listRole, listPost} from '@/assets/js/api'

export default {
  components: { SingleCropper},
  name: 'PeopleManage',
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  data() {
    return {
      filterText: '',
      departmentForm: {
        storeName: '',
        storeState: '',
      },
      btnState: {
        btnSearch: false,
        btnAdd: false,

        btnAddSubmit: false,
      },
      diaState: {
        diaUserTitle: '添加',
        diaAddUser: false,
      },
      pageArr: {
        total: 10,  //总条数
        pageSize: 20, //每页个数
        pageNum: 1, //当前页数
      },

      /*添加表单*/
      addUserForm: {
        avatar: '',
        status: '0',
        sex: '1',
        superiorId:0,
        postIds:[],
        deptId:'',
        roleIds:[],
      },
      roleArr: [], //角色数组
      postArr: [], //岗位数组
      deptArr: [], //部门数组


      /*部门数组*/
      treeData: [],

      tableArr: [],
    }
  },
  methods: {
    blurInp(val) {
      console.log(val);
    },
    /*节点过滤*/
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    /*tree 点击事件*/
    handleNodeClick(data) {
      console.log(data);
    },

    /*添加弹窗*/
    FnBtnAdd() {
      this.addUserForm = {
        avatar: '',
        status: '0',
        sex: '1',
        superiorId:0,
        postIds:[],
        deptId:'',
        roleIds:[],
      };
      this.diaState.diaAddUser = true;
      this.diaState.diaUserTitle = '添加用户';
      this.GLOBAL.btnStateChange(this, 'btnState', 'btnAdd');
    },
    /*关闭弹窗*/
    FnCloseAddUser() {
      this.addUserForm = {
        avatar: '',
        status: '0',
        sex: '1',
        superiorId:0,
        postIds:[],
        deptId:'',
        roleIds:[],
      };
    },
    /*提交 保存*/
    FnBtnUserSave(formName) {
      console.log(this.addUserForm);
      this.$refs[formName].validate((valid) => {
        this.GLOBAL.btnStateChange(this, 'btnState', 'btnAddSubmit');
        if (valid) {
          if (!this.addUserForm.userId) {
            /*添加*/
            addUser(this.addUserForm).then(res => {
              console.log(res);
              this.$message.success(res.msg);

              //sessionStorage.removeItem('userProfile');
            })
          } else {
            /*修改*/
            updateUser(this.addUserForm).then(res => {
              console.log(res);
              this.$message.success(res.msg);

              //sessionStorage.removeItem('userProfile');
            })
          }
        }
      })

    },

    FnBtnSearch() {

    },
    /*状态修改*/
    FnSwitchStatus() {

    },

    /*查看详情*/
    FnBtnDetail() {

    },
    /*编辑*/
    FnBtnEdit(val) {
      // console.log(val);
      // console.log(val.deptId);
      // console.log(val.posts);
      // console.log(val.roles);
      // console.log(val.superiorId);

      let rolesArr = [];
      val.roles.forEach((item,index)=>{
        rolesArr.push(item.roleId)
      })

      let postsArr = [];
      val.posts.forEach((item,index)=>{
        postsArr.push(item.postId)
      })

      this.addUserForm = val;
      this.addUserForm.superiorId = val.superiorId;
      this.addUserForm.postIds = postsArr;
      this.addUserForm.deptId = val.deptId +'';
      this.addUserForm.roleIds = rolesArr;

      this.diaState.diaAddUser = true;
      this.diaState.diaUserTitle = '修改';
    },

    /*修改密码*/
    FnBtnPass() {

    },


    /*获取 用户列表 api 事件*/
    FnGetListUser(id) {
      listUser(id).then(res => {
        // console.log(res);
        this.tableArr = res.data;
        this.pageArr.total = res.total;
      })
    },
    /*获取部门列表 api 事件*/
    FnGetTreeSelDept() {
      treeSelDept().then(res => {
        // console.log(res);
        this.treeData = res.data;
        this.deptArr = res.data;
      })
    },
    /*获取角色 api 事件*/
    FnGetListRole() {
      listRole().then(res => {
        this.roleArr = res.data;
      })
    },
    /*获取岗位 api 事件*/
    FnGetListPost() {
      listPost().then(res => {
        this.postArr = res.data;
      })
    },

    /*分页*/
    FaPageCurrent(page) {
      console.log(page)
      // this.staffPage = page;
      // this.getStaffIndex();
    },
    FaSizeChange(size) {
      console.log(size);
    },
  },
  created() {
    this.FnGetListUser();
    this.FnGetTreeSelDept();
    this.FnGetListRole();
    this.FnGetListPost();
  }
}
</script>
