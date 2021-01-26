<template>
   <div class="public-main">
      <el-form :model="searchForm" class="public-form" ref="refRoleForm">
         <el-select v-model="searchForm.name" value.key="id" filterable clearable placeholder="请选择"
                    class="public-select">
            <el-option v-for="(item, index) in projectArr" :key="index"
                       :value="item.value"
                       :label="item.label">
            </el-option>
         </el-select>
         <el-input v-model="searchForm.SellerInfo" class="public-input" autocomplete="off" placeholder="请输入买家信息"
                   clearable></el-input>

         <el-button type="primary" class="public-btn" :loading="btnState.btnSavaASIN" @click="FnPostSearch('refRoleForm')">
            提交
         </el-button>

         <div class="formR-main">
            <el-button type="primary" class="public-btn" :loading="btnState.btnSavaASIN"
                       @click="diaState.diaAddASIN = true">添加ASIN
            </el-button>
         </div>
      </el-form>

      <el-table class="public-table" border
                :data="tableArr"
                ref="refTable"
                height="600">
         <el-table-column type="section"></el-table-column>
         <el-table-column prop="img" label="图片"></el-table-column>
         <el-table-column prop="ASIN" label="ASIN"></el-table-column>
         <el-table-column prop="title" label="标题"></el-table-column>
         <el-table-column prop="site" label="站点"></el-table-column>
         <el-table-column prop="site" label="跟买次数"></el-table-column>
         <el-table-column prop="site" label="排除店铺"></el-table-column>
         <el-table-column prop="site" label="开始监控时间"></el-table-column>
         <el-table-column prop="site" label="更新时间"></el-table-column>
         <el-table-column prop="site" label="监护人"></el-table-column>
         <el-table-column prop="site" label="操作">
            <template slot-scope="scope">
               <el-dropdown @command="FnCommand">
                  <el-button type="primary">
                     编辑<i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                     <el-dropdown-item :command="{ type:'FnSet', data:scope.row }">设置监控人</el-dropdown-item>
                     <el-dropdown-item :command="{ type:'FnRemove', data:scope.row }">排除店铺</el-dropdown-item>
                     <el-dropdown-item :command="{ type:'FnDelete', data:scope.row }">删除店铺</el-dropdown-item>
                  </el-dropdown-menu>
               </el-dropdown>
            </template>
         </el-table-column>
      </el-table>

      <!-- 添加ASIN -->
      <el-dialog :append-to-body="true"
                 title="添加ASIN"
                 :visible.sync="diaState.diaAddASIN"
                 custom-class="public-dialog"
                 :close-on-click-modal="false"
                 width="800px">
         <el-form :model="addASINForm" ref="RefAddForm" label-width="136px" class="public-diaForm">
            <el-form-item label="国家：" prop="country" :rules="{ required: true, message: '请输入', trigger: 'blur' }">
               <el-input type="text" v-model="addASINForm.country" autocomplete="off" clearable
                         placeholder="监控人"></el-input>
            </el-form-item>
            <el-form-item label="监控人：" prop="storeName" :rules="{ required: true, message: '请输入', trigger: 'blur' }">
               <el-input type="text" v-model="addASINForm.storeName" autocomplete="off" clearable
                         placeholder="监控人"></el-input>
            </el-form-item>

            <el-form-item label="ASIN：" prop="ASIN"
                          :rules="{ required: true, message: '请输入一个或者多个ASIN，一行一个，回车换行，请勿输入其他符号及空行。', trigger: 'blur' }">
               <el-input type="textarea" rows="4" v-model="addASINForm.ASIN" autocomplete="off" clearable
                         placeholder="请输入一个或者多个ASIN，一行一个，回车换行，请勿输入其他符号及空行。"></el-input>
            </el-form-item>
            <el-form-item label="排除店铺：" prop="removeStore"
                          :rules="{ required: true, message: '请输入要排除的店铺，一行一个，回车换行，请勿输入其他符号及空行。', trigger: 'blur' }">
               <el-input type="textarea" rows="4" v-model="addASINForm.removeStore" autocomplete="off" clearable
                         placeholder="请输入排除店铺，一行一个，回车换行，请勿输入其他符号及空行。"></el-input>
            </el-form-item>
            <div class="formR-main">
               <el-button type="primary" class="public-btn" :loading="btnState.btnSavaASIN" @click="FnBtnSaveASIN">保存</el-button>
            </div>
         </el-form>
      </el-dialog>

      <!-- 设置监控人 -->
      <el-dialog :append-to-body="true"
                 title="设置监控人"
                 :visible.sync="diaState.diaSetMonitor"
                 custom-class="public-dialog"
                 :close-on-click-modal="false"
                 width="800px">
         <el-form :model="addMonitorForm" ref="RefMonitorForm" label-width="136px" class="public-diaForm">
            <el-form-item label="ASIN：" prop="ASIN">
               <el-input type="text" v-model="addMonitorForm.ASIN" autocomplete="off" clearable
                         placeholder="ASIN"></el-input>
            </el-form-item>
            <el-form-item label="监控人：" prop="monitor">
               <el-select v-model="addMonitorForm.monitor" filterable multiple clearable collapse-tags
                          popper-class="elSelect-checkbox" class="public-selectFull"
                          :rules="{ required: true, message: '请选择', trigger: 'change' }">
                  <el-option v-for="(item, index) in projectArr"
                             :key="index"
                             :value="item.value"
                             :label="item.label">
                     <span class="check"></span>
                     <span style="margin-left: 8px">{{ item.label }}</span>
                  </el-option>
               </el-select>
            </el-form-item>

            <el-form-item class="formR-main">
               <el-button type="primary" class="public-btn" :loading="btnState.btnSaveMonitor"
                          @click="FnBtnSaveMonitor('RefMonitorForm')">保存</el-button>
            </el-form-item>

         </el-form>
      </el-dialog>

      <!-- 排除店铺 -->
      <el-dialog :append-to-body="true"
                 title="排除店铺"
                 :visible.sync="diaState.diaRemoveStore"
                 custom-class="public-dialog"
                 :close-on-click-modal="false"
                 width="800px">
         <el-transfer v-model="removeStoreForm.storeVal"
                      :data="storeArr"
                      :titles="['所有店铺', '排除店铺']"
                      :button-texts="['加入左边', '加入右边']"
                      :props="{
                        key: 'value',
                        label: 'label',
                      }"></el-transfer>
         <div class="formR-main">
            <el-button type="primary" class="public-btn" :loading="btnState.btnSaveStore"
                       @click="FnBtnSaveRemoveStore('removeStoreForm')">保存</el-button>
         </div>

      </el-dialog>

   </div>
</template>

<script>
export default {
   name: "SellWith", /*跟卖*/
   data() {
      return {

         btnState: {
            btnSavaASIN: false,

            btnSaveMonitor: false,
            btnSaveStore: false,
         },
         diaState: {
            diaAddASIN: false,    /*添加ASIN*/

            diaSetMonitor: false,  /*设置监控人*/

            diaRemoveStore: true,  /*排除店铺*/
         },

         /*表单搜索*/
         searchForm: {},
         projectArr: [
            {
               id: '1',
               value: 'shop1',
               label: '店铺1',
            },
            {
               id: '2',
               value: 'shop2',
               label: '店铺2',
            },
         ],
         tableArr: [
            {
               img: '',
               ASIN: 'B0B08BDG42',
               title: 'Mkeke',
               site: '1',
               sellNo: '5',
            }
         ],

         /*弹窗 add ASIN */
         addASINForm: {},

         /*设置监控人*/
         addMonitorForm: {
            ASIN: '',
            monitor: '',
         },

         /*排除店铺*/
         removeStoreForm:{
            storeVal:['store1'],
         },
         storeArr:[
            {
               label:'店铺1',
               value:'store1',
            },
            {
               label:'店铺2',
               value:'store2',
            },
            {
               label:'店铺3',
               value:'store3',
            },
         ],
      }
   },
   methods: {
      /*表格 tr 操作 */
      FnCommand(val) {
         console.log(val);
         /*设置监控人*/
         if(val.type == 'FnSet'){
            this.diaState.diaSetMonitor = true;
         }
         /*移除店铺*/
         if(val.type == 'FnRemove'){
            this.diaState.diaRemoveStore = true;
         }
         /*删除*/
         if(val.type == 'FnDelete'){

         }
      },

      /*搜索提交*/
      FnPostSearch() {

      },


      /*@keyup.enter.native="FnEnter"*/
      /*监听 enter 键*/
      FnEnter() {
         let ary = this.addASINForm.ASIN.split('\n');
         let list = new Array();
         for (let i = 0; i < ary.length; i++) {
            if (ary[i] != null && ary[i].trim() != "")
               list.push(ary[i]);
         }
         console.log(list);
      },

      /*保存ASIN*/
      FnBtnSaveASIN() {
         console.log(this.addASINForm);
         this.FnEnter();
      },

      /*保存设置监控人*/
      FnBtnSaveMonitor(formName) {
         let that = this;
         console.log(this.addMonitorForm);
         that.$refs[formName].validate((valid) => {
            this.GLOBAL.btnStateChange(this, 'btnState', 'btnSaveMonitor');
            if (valid) {
               console.log(valid);
            }
         })
      },

      /*保存 排除店铺*/
      FnBtnSaveRemoveStore(){
         console.log(this.removeStoreForm.storeVal);
      },

   },
   created() {

   },
}
</script>
