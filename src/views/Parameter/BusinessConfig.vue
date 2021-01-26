<template>
  <div class="tabs-main">

    <el-tabs tab-position="left" id="tabs-power" v-model="tabActiveName" @tab-click="FnChangeTab">
      <el-tab-pane lazy label="企业微信管理" name="sub1">
         企业微信管理
      </el-tab-pane>
      <el-tab-pane lazy label="消息通知设置" name="sub2">
         消息通知设置
      </el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>

export default {
  name: "BusinessConfig",
  data() {

    return {
      tabActiveName:'sub1',
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

  }
}
</script>
