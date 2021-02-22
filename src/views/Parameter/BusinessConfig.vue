<template>
   <div class="tabs-main">
      <el-tabs :tab-position="tabPosition" id="tabs-message" v-model="tabActiveName" @tab-click="FnChangeTab">
         <el-tab-pane lazy label="企业微信管理" name="name1">

         </el-tab-pane>
         <el-tab-pane lazy label="消息通知设置" name="name2">
            <div class="flex-between">
               <div>消息设置</div>
               <el-button>保存</el-button>
            </div>
            <el-table class="public-table" border
                      :data="tableStaff"
                      ref="multipleTable">
               <el-table-column prop="type" label="消息类型"></el-table-column>
               <el-table-column prop="message" label="站内消息">
                  <template slot-scope="scope">
                     <el-checkbox-group v-model="scope.row.message">
                        <el-checkbox></el-checkbox>
                     </el-checkbox-group>
                  </template>
               </el-table-column>
               <el-table-column prop="email" label="邮件通知">
                  <template slot-scope="scope">
                     <el-checkbox-group v-model="scope.row.email">
                        <el-checkbox></el-checkbox>
                     </el-checkbox-group>
                  </template>
               </el-table-column>
               <el-table-column prop="note" label="备注"></el-table-column>
            </el-table>

         </el-tab-pane>
         <el-tab-pane lazy label="欢迎语设置" name="name3">

         </el-tab-pane>
         <el-tab-pane lazy label="登录设置" name="name4">

         </el-tab-pane>
      </el-tabs>

   </div>
</template>

<script>

export default {
   name: "BusinessConfig",
   data() {
      return {
         tabPosition: 'left',
         tabActiveName: 'name2',
         tableStaff:[
            {
               type:'跟卖消息',
               message:true,
               email:true,
               note:'有新增的跟卖',
            },
            {
               type:'中差评提醒',
               message:true,
               email:false,
               note:'有新增的跟卖',
            },
            {
               type:'广告预算超支',
               message:true,
               email:false,
               note:'超出预算被暂停',
            },
            {
               type:'Listing主页打不开',
               message:true,
               email:false,
               note:'Listing主页打不开',
            },
            {
               type:'店铺异常',
               message:true,
               email:false,
               note:'店铺被暂停销售',
            },
            {
               type:'Listing主页信息变化',
               message:true,
               email:false,
               note:'主页的标题、图片、价格、购物车等发生变化',
            },
         ],
      }
   }
   ,
   methods: {
      /*搜索 */
      FnSearchShop() {
         console.log(this.searchForm.storeName);
      },

      /*添加*/
      FnCreateRole() {
         this.diaState.diaAdd = true;
      },

      /* 添加 取消  */
      FnCloseAdd() {
         this.GLOBAL.btnStateChange(this, 'btnState', 'btnCancel')
         // this.diaState.diaAdd = false;
         // this.$refs['RefAddForm'].resetFields();
      },

      /*添加 提交*/
      FnBtnAddSub() {
         this.GLOBAL.btnStateChange(this, 'btnState', 'btnSubmit');
         3
         console.log('sd');
      },

      /*tab 切换点击事件  */
      FnChangeTab(tab) {
         console.log(tab);
         this.checkID = tab.name;
      },

      /*subTab 切换点击事件 */
      FnChangeSubTab(subTab) {

      },

   },

   created() {

   },

   components: {}
}
</script>
