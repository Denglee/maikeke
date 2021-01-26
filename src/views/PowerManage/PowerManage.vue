<template>
  <div class="tabs-main">
    <div style="display: flex;">
      <el-form class="roleL-form">
        <el-input v-model="searchForm.storeName" placeholder="角色名称" autocomplete="off" clearable class="public-input"
                  @keyup.enter.native = "FnSearchShop">
          <i slot="suffix" class="el-input__icon el-icon-search" @click="FnSearchShop"></i>
        </el-input>
        <el-button icon="el-icon-folder-add" @click="FnCreateRole" :loading="btnState.btnCreateRole" size="mini" class="btn-role">创建角色</el-button>
      </el-form>
      <div class="powerR-subnav">
        <h4>销售助理</h4>
        <div>更新时间 2020-10-29 </div>
      </div>
    </div>

    <el-tabs tab-position="left" id="tabs-power" v-model="tabActiveName" @tab-click="FnChangeTab">
      <el-tab-pane
          lazy
          :key="item.name"
          v-for="(item, index) in editableTabs"
          :label="item.title"
          :name="item.name">
          <el-tabs v-model="SubTabActiveName" @tab-click="FnChangeSubTab" id="SubTabs-power">
            <el-tab-pane lazy label="角色用户" name="sub1">
              <TabRoleUsers :checkID="checkID"></TabRoleUsers>
            </el-tab-pane>
            <el-tab-pane lazy label="角色权限" name="sub2">
              <TabRolePermissions :checkID="checkID"></TabRolePermissions>
            </el-tab-pane>
          </el-tabs>
      </el-tab-pane>
    </el-tabs>

    <!--    添加角色-->
    <el-dialog :append-to-body="true"
               title="添加角色"
               :visible.sync="diaState.diaAdd"
               custom-class="public-dialog"
               :close-on-click-modal="false"
               @close='FnCloseAdd'
               width="600px">
      <el-form :model="addForm" status-icon ref="RefAddForm" label-width="136px" class="public-diaForm">

        <el-form-item label="角色名称：" prop="roleName" :rules="{ required: true, message: '请输入角色名称', trigger: 'blur' }">
          <el-input type="text" v-model="addForm.roleName" autocomplete="off" clearable placeholder="请输入角色名称"></el-input>
        </el-form-item>

        <el-form-item label="角色描述：" prop="roleInfo">
          <el-input type="textarea" v-model="addForm.roleInfo" autocomplete="off" clearable placeholder="请输入角色描述"></el-input>
        </el-form-item>

        <el-form-item>
            <el-checkbox v-model="btnState.checkedCopy">
              复制角色信息
              <el-select v-model="value1" placeholder="请选择">
                <el-option value="1">sd</el-option>
                <el-option value="2">sd1</el-option>
              </el-select>
            </el-checkbox>
        </el-form-item>

        <el-form-item class="alignR">
          <el-button type="primary" @click="diaState.diaAdd = false;" :loading="btnState.btnCancel">取消</el-button>
          <el-button type="primary" @click="FnBtnAddSub('RefAddForm')" :loading="btnState.btnSubmit">保存</el-button>
        </el-form-item>

      </el-form>
    </el-dialog>

    <!-- 添加用户-->
    <el-dialog :append-to-body="true"
               title="添加用户"
               :visible.sync="diaState.diaAddRole"
               custom-class="public-dialog"
               :close-on-click-modal="false"
               @close='FnCloseAdd'
               width="800px">
      <el-transfer
          class="transfer-box"
          v-model="value"
         :data="treeData"
         filterable
         :filter-method="filterMethod"></el-transfer>
    </el-dialog>

  </div>
</template>

<script>
  import TabRoleUsers from "@/views/PowerManage/tab/TabRoleUsers";
  import TabRolePermissions from "@/views/PowerManage/tab/TabRolePermissions";
  export default {
    name: "PowerManage",
    data() {

      const generateData = _ => {
        const data = [];
        const cities = ['上海', '北京', '广州', '深圳', '南京', '西安', '成都'];
        // const pinyin = ['上海', 'beijing', 'guangzhou', 'shenzhen', 'nanjing', 'xian', 'chengdu'];
        cities.forEach((city, index) => {
          data.push({
            label: city,
            key: index,
            // pinyin: pinyin[index]
          });
        });
        return data;
      };

      return {
        treeData: generateData(),
        value: [1, 4],
        filterMethod(query, item) {
          return item.label.indexOf(query) > -1;
        },

        addForm:{
          roleName:'',
          roleInfo:'',
        },
        searchForm:{
          storeName:'',
        },

        diaState:{
          diaAdd:false,  //添加 角色
          diaAddRole:false,  //添加用户
        },

        value1:'',
        btnState:{
          btnCancel:false,
          btnSubmit:false,
          btnCreateRole:false,
          checkedCopy:false,
        },

        tabActiveName: '1',
        SubTabActiveName:'sub2',
        editableTabs: [
          {
            title: '超级管理员',
            name: '1',
            content: '超级管理员',
          },
          {
            title: '销售员',
            name: '2',
            content: '销售员',
          },
          {
            title: '销售助理',
            name: '3',
            content: '销售助理',
          }
        ],

        checkID:'1',

      }
    }
    ,
    methods: {
      /*搜索 */
      FnSearchShop() {
        console.log(this.searchForm.storeName);
      },

      /*添加*/
      FnCreateRole(){
        this.diaState.diaAdd = true;
      },

      /* 添加 取消  */
      FnCloseAdd() {
        this.GLOBAL.btnStateChange(this, 'btnState', 'btnCancel')
        // this.diaState.diaAdd = false;
        // this.$refs['RefAddForm'].resetFields();
      },

      /*添加 提交*/
      FnBtnAddSub(){
        this.GLOBAL.btnStateChange(this, 'btnState', 'btnSubmit');3
        console.log('sd');
      },

      /*tab 切换点击事件  */
      FnChangeTab(tab) {
        console.log(tab);
        this.checkID = tab.name;
      },

      /*subTab 切换点击事件 */
      FnChangeSubTab(subTab){

      },

    },

    created() {

    },

    components:{
      TabRoleUsers,
      TabRolePermissions,
    }
  }
</script>
<style lang="scss">
  .transfer-box{
    .el-input{
      width: 150px !important;
    }
  }

  /*二级 tabs*/
  #SubTabs-power{
    padding: 10px;
  }

</style>
