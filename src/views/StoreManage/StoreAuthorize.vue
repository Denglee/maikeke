<template>
   <div class="public-main">
      <el-form class="public-form" @submit.native.prevent>
         <!--      @submit.native.prevent-->
         <el-input v-model="searchForm.storeName" placeholder="请输入店铺名称" autocomplete="off" clearable
                   class="public-input"
                   @keyup.enter.native="FnSearchShop">
            <i slot="suffix" class="el-input__icon el-icon-search" @click="FnSearchShop"></i>
         </el-input>

         <div class="formR-main">
            <el-button icon="el-icon-circle-plus-outline" @click="FnBtnAddShow" class="public-btn">店铺授权</el-button>
<!--            <el-button icon="el-icon-folder-add" @click="FnImport" :loading="btnState.btnImport" class="public-btn">-->
<!--               导入店铺-->
<!--            </el-button>-->
         </div>
      </el-form>

      <!--    element-loading-text = "加载中，请稍后..."
          element-loading-spinner = "el-icon-loading"-->

      <el-table class="public-table" border
                v-loading="diaState.loadTable"
                element-loading-text="拼命加载中……"
                element-loading-spinner="el-icon-loading"
                :data="tableArr"
                @selection-change="checkedStore"
                ref="refTable"
                height="600"
                @row-click="handleRowClick">
         <el-table-column type="selection"></el-table-column>
         <el-table-column prop="storeName" label="店铺名称"></el-table-column>
         <el-table-column prop="site" label="站点">
            <template slot-scope="scope">
          <span v-for="(item,index) in siteArr">
            <span v-if="item.value == scope.row.site">{{ item.label }}</span>
          </span>
            </template>
         </el-table-column>
         <el-table-column prop="country" label="国家"></el-table-column>
         <el-table-column prop="platform" label="平台">
            <template slot-scope="scope">
          <span v-for="(item,index) in platformArr">
            <span v-if="item.value == scope.row.platform">{{ item.label }}</span>
          </span>
            </template>
         </el-table-column>
         <el-table-column prop="sellerId" label="Seller ID"></el-table-column>
         <el-table-column prop="principalEmail" label="店铺邮箱"></el-table-column>
         <el-table-column prop="advertAuth" label="广告授权"></el-table-column>
         <el-table-column prop="principalName" label="负责人"></el-table-column>
         <el-table-column prop="principalAuth" label="店铺授权">
            <template slot-scope="scope">
               <div v-if="scope.row.principalAuth == 0 " class="status-connect">授权成功</div>
               <div v-if="scope.row.principalAuth == 1 " class="status-break">去授权</div>
            </template>
         </el-table-column>
         <el-table-column prop="createTime" label="创建时间">
            <template slot-scope="scope">
               <span>{{ scope.row.createTime | timeFormat }}</span>
            </template>
         </el-table-column>

         <el-table-column label="操作">
            <template slot-scope="scope">
               <el-dropdown @command="FnCommand">
                  <el-button type="primary">
                     编辑<i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                     <el-dropdown-item :command="{ type:'put', data:scope.row }">更新</el-dropdown-item>
                     <el-dropdown-item :command="{ type:'manageSubAccount', data:scope.row }">管理子账号</el-dropdown-item>
<!--                     <el-dropdown-item :command="{ type:'a', data:scope.row }">暂停同步</el-dropdown-item>-->
                     <el-dropdown-item :command="{ type:'delete', data:scope.row }">删除店铺</el-dropdown-item>
<!--                     <el-dropdown-item :command="{ type:'c', data:scope.row }">同步验证</el-dropdown-item>-->
<!--                     <el-dropdown-item :command="{ type:'d', data:scope.row }">财务核算设置</el-dropdown-item>-->
<!--                     <el-dropdown-item :command="{ type:'e', data:scope.row }">分配负责人</el-dropdown-item>-->
                  </el-dropdown-menu>
               </el-dropdown>

            </template>
         </el-table-column>

      </el-table>

      <el-pagination
         background
         layout="total,  prev, pager,next, sizes, jumper"
         :page-sizes="[10, 20, 50, 100]"
         :current-page="pageArr.pageNum"
         :total="pageArr.total"
         :page-size="pageArr.pageSize"
         @size-change='sizeChange'
         @current-change="PageCurrent">
      </el-pagination>


      <!--添加授权店铺信息  -->
      <el-dialog :append-to-body="true"
                 :title="diaState.diaAddTitle"
                 :visible.sync="diaState.diaAdd"
                 custom-class="public-dialog"
                 :close-on-click-modal="false"
                 @close='FnCloseAdd'
                 width="800px">
         <el-form :model="addForm" ref="RefAddForm" label-width="136px" class="public-diaForm">
            <!--        <div class="form-subTitle">店铺信息</div>-->
            <el-form-item label="店铺账号名称：" prop="storeName"
                          :rules="{ required: true, message: '请输入店铺账号名称', trigger: 'blur' }">
               <el-input type="text" v-model="addForm.storeName" autocomplete="off" clearable
                         placeholder="用于卖家区分各个账号"></el-input>
            </el-form-item>
            <el-form-item label="平台：" prop="platform">

               <el-select v-model="addForm.platform" value.key="id" filterable clearable placeholder="请选择平台"
                          class="public-selectFull"
                          :rules="{ required: true, message: '平台', trigger: 'change' }">
                  <el-option v-for="(item, index) in platformArr" :key="item.id"
                             :value="item.value"
                             :label="item.label">
                  </el-option>
               </el-select>
            </el-form-item>

            <el-form-item label="站点：" prop="site">
               <el-select v-model="addForm.site" value.key="id" filterable clearable placeholder="请选择站点"
                          class="public-selectFull" @change='FnChooseSite'
                          :rules="{ required: true, message: '站点', trigger: 'change' }">
                  <el-option v-for="(item, index) in siteArr" :key="item.id"
                             :value="item.value"
                             :label="item.label">
                  </el-option>
               </el-select>
            </el-form-item>

            <el-form-item label="国家：" prop="country">
               <el-select v-model="addForm.country" value.key="id" filterable clearable placeholder="请选择国家"
                          class="public-selectFull"
                          :rules="{ required: true, message: '国家', trigger: 'change' }">
                  <el-option v-for="(item, index) in countryArr" :key="item.id"
                             :value="item.value"
                             :label="item.label">
                  </el-option>
               </el-select>
            </el-form-item>

            <el-form-item label="店铺负责人：" prop="principalName">
               <el-select v-model="addForm.principalName" value.key="id" filterable clearable placeholder="请选择店铺负责人"
                          class="public-selectFull" @change='FnChooseCharge'
                          :rules="{ required: true, message: '店铺负责人', trigger: 'change' }">
                  <el-option v-for="(item, index) in chargeArr" :key="item.id"
                             :value="item.id"
                             :label="item.name">
                  </el-option>
               </el-select>
            </el-form-item>

            <el-form-item label="备注：" prop="remark">
               <el-input type="textarea" :rows="3" v-model="addForm.remark" autocomplete="off" clearable
                         placeholder="备注"></el-input>
            </el-form-item>

            <!--      <div class="form-subTitle">授权信息 </div>-->
            <el-form-item label="Seller Id：" prop="sellerId"
                          :rules="{ required: true, message: '请输入卖家编号', trigger: 'blur' }">
               <el-input type="text" v-model.trim="addForm.sellerId" autocomplete="off" clearable
                         placeholder="请输入卖家编号"></el-input>
               <div>
                  <span>点击复制，获取{{ nowCountyName }}站授权链接，请在常用店铺环境打开，以免关联。</span>
                  <span @click="FnCopy" style="color: #0000FF;cursor: pointer;">复制</span>
               </div>
            </el-form-item>

            <el-form-item label="MWSAuthToken：" prop="authToken"
                          :rules="{ required: true, message: '请输入AWS访问秘钥', trigger: 'blur' }">
               <el-input type="text" v-model="addForm.authToken" autocomplete="off" clearable
                         placeholder="请输入AWS访问秘钥"></el-input>
            </el-form-item>

            <el-form-item class="alignR">
               <el-button type="primary" @click="diaState.diaAdd = false;" :loading="btnState.btnCancel">取消</el-button>
               <el-button type="primary" @click="FnBtnAdd('RefAddForm')" :loading="btnState.btnSubmit">保存</el-button>
            </el-form-item>

         </el-form>
      </el-dialog>

      <!--管理子账号  -->
      <el-dialog :append-to-body="true"
                 title="管理子账号"
                 :visible.sync="diaState.diaAddSub"
                 custom-class="public-dialog"
                 :close-on-click-modal="false"
                 @close='FnCloseSub'
                 width="1000px">
         <el-form :model="diaFormSub" ref="RefAddSubForm" label-width="120px"
                  @submit.native.prevent>
            <div v-for="(countItem, index) in diaFormSub.subCount" :key="index" class="subCount-box">
               <div class="title">子账号{{ index + 1 }}</div>
               <el-form-item
                  label="sellerId："
                  :prop="'subCount.' + index + '.sellerId'"
                  :rules="{
                required: true, message: '子账号sellerId不能为空', trigger: 'blur'
              }">
                  <el-input v-model="countItem.sellerId" class="public-input" :placeholder=" 'sellerId'"
                            style="margin-right: 10px;"></el-input>
               </el-form-item>

               <el-form-item
                  label="用途："
                  :prop="'subCount.' + index + '.remark'">
                  <el-input v-model="countItem.remark" class="public-input" :placeholder="'用途'"
                            style="margin-right: 10px;"></el-input>
               </el-form-item>

               <el-form-item
                  label="ip_端口："
                  :prop="'subCount.' + index + '.ip'">
                  <el-input v-model="countItem.ip" class="public-input" :placeholder="'ip_端口'"
                            style="margin-right: 10px;"></el-input>
               </el-form-item>

               <div class="flex-between">
                  <el-form-item
                     label="是否爬虫："
                     :prop="'subCount.' + index + '.principalAuth'">
                     <el-switch
                        v-model="countItem.principalAuth"
                        :active-value="0"
                        :inactive-value="1"
                        active-text="是"
                        inactive-text="否">
                     </el-switch>

                  </el-form-item>
                  <div style="display: inline-block;text-align: right;padding-right: 40px;">
                     <el-button @click.prevent="removeDomain(countItem)" style="margin-left: 20px;">删除</el-button>
                     <el-button @click.prevent="FnSubFormUpdate('RefAddSubForm',countItem)" :loading="countItem.btnLoad"
                                style="margin-left: 20px;">更新
                     </el-button>
                     <el-button @click.prevent="FnSubForm('RefAddSubForm',countItem)" :loading="countItem.btnLoadSave"
                                style="margin-left: 20px;">保存
                     </el-button>
                  </div>
               </div>

            </div>

            <el-form-item>
               <el-button @click="addDomain">新增子账号</el-button>
               <!--          <el-button type="primary" :loading="btnState.btnAddSon" @click="FnSubForm('RefAddSubForm')">添加</el-button>-->
            </el-form-item>

         </el-form>
      </el-dialog>

   </div>
</template>

<script>
import {
   addStoreAuth, updateStoreAuth, selectStoreAuth, delStoreAuth, delStoreAuthList,
   authSonAdd, authSonList, authSondelete, authSonUpdate
} from "@/assets/js/api";

export default {
   name: "StoreAuthorize",
   inject: ['reLoad'],

   data() {
      return {
         pageArr: {
            pageTotalRows: 1
         },
         searchForm: {  //查找form data
            storeName: '',
            pageSize: 10,
            pageNum: 1,
         },

         diaState: {   //弹出框状态
            loadTable: true,
            diaAdd: false,
            submitType: 'add',
            diaAddTitle: '添加店铺授权',

            diaAddSub: false, /*管理子账号弹窗*/
         },

         btnState: {  //按钮状态
            btnImport: false,
            btnCancel: false,
            btnSubmit: false,

            btnAddSon: false,
            btnUpdateSon: false,
         },

         checkedRows: [],

         tableArr: [
            // {
            //   storeName: '',
            //   platform: '',
            //   site:'1',  /*站点*/
            //   country:'USA',
            //   principalName :'',
            //   remark: '',
            //   sellerId: '',
            //   authToken: '',
            // }
         ],    //table数据

         /*站点*/
         siteArr: [
            {
               id: 1,
               label: '北美',
               value: '1'
            },
            {
               id: 2,
               label: '欧洲',
               value: '2'
            },
         ],
         platformArr: [
            {
               id: 1,
               label: 'Amazon',
               value: '1'
            },
            {
               id: 2,
               label: 'Ebay',
               value: '2'
            },
         ],

         /*国家*/
         countryArr: [
            {
               id: 1,
               label: '美国',
               value: 'USA'
            },
            {
               id: 2,
               label: '英国',
               value: 'UK'
            },
         ],

         chargeArr: [
            {name: '负责人1', id: 'charger100'},
            {name: '负责人2', id: 'charger200'},
            {name: '负责人3', id: 'charger300'},
         ],


         addForm: {  /*添加弹窗表单数据*/
            storeName: '',
            platform: '',
            site: '1',  /*站点*/
            country: 'USA',
            principalName: '',
            remark: '',
            sellerId: '',
            authToken: '',
         },
         nowCountyName: '北美',   //当前选中国家名称
         nowCountySite: '',   //当前校对域名

         diaSubConutArr: [],
         diaFormSub: {
            subCount: [
               // {
               //   sellerId: 'id11',
               //   remark: 'remark1',
               //   ip: 'ip2',
               //   principalAuth: '1',
               // parentId:''
               // },
            ],
         },

      }

   },
   methods: {
      /*子账号A 删除*/
      removeDomain(item) {
         console.log(item);
         authSondelete(item.sellerId).then(res => {
            console.log(res);
            if (res.code == 200) {
               this.$message.success('删除成功');
               let index = this.diaFormSub.subCount.indexOf(item)
               if (index !== -1) {
                  this.diaFormSub.subCount.splice(index, 1)
               }
            }
         }).catch(res => {
            console.log(res);
         });
      },

      /*子账号B 添加*/
      addDomain() {
         let parentId = this.parentId;
         this.diaFormSub.subCount.push({
            parentId: parentId,
            sellerId: '',
            remark: '',
            ip: '',
            principalAuth: '0',
         });
      },

      /*子账号C 关闭  */
      FnCloseSub() {
      },

      /*子账号D 保存*/
      FnSubForm(formName, item) {
         let that = this;

         that.$set(item, 'btnLoadSave', true);
         setTimeout(() => {
            that.$set(item, 'btnLoadSave', false);
         }, 1000);
         console.log(item);
         that.$refs[formName].validate((valid) => {
            this.GLOBAL.btnStateChange(this, 'btnState', 'btnAddSon');

            // console.log(this.diaSubConutArr);
            // console.log(this.diaFormSub.subCount);
            // return
            if (valid) {
               // console.log(this.diaFormSub.subCount);

               // return;
               // authSonAdd(this.diaFormSub.subCount).then(res=>{
               //   console.log(res);
               //   // this.GLOBAL.axiosSuc(this,res.mag)
               // }).catch(res=>{
               //   console.log(res);
               // });

               let arr = [];
               arr.push(item);
               authSonAdd(arr).then(res => {
                  console.log(res);
                  if (res.code == 200) {
                     this.$message.success('保存成功');
                  } else {
                     this.$message.error('保存失败');
                  }
                  // this.GLOBAL.axiosSuc(this,res.mag)
               }).catch(res => {
                  console.log(res);
               })
            }
         })
      },

      /*子账号E 更新   */
      FnSubFormUpdate(formName, item) {
         console.log(item);
         let that = this;
         that.$set(item, 'btnLoad', true);
         setTimeout(() => {
            that.$set(item, 'btnLoad', false);
         }, 1000);
         that.$refs[formName].validate((valid) => {
            this.GLOBAL.btnStateChange(this, 'btnState', 'btnUpdateSon');
            if (valid) {
               authSonUpdate(item).then(res => {
                  console.log(res);
                  if (res.code == 200) {
                     this.$message.success('更新成功');
                  } else {
                     this.$message.error('更新失败');
                  }
                  // this.GLOBAL.axiosSuc(this,res.mag);
               }).catch(res => {
                  console.log(res);
               })
            }
         })
      },


      /*搜索*/
      FnSearchShop() {
         console.log(this.searchForm.storeName);
      },

      /*分页*/
      PageCurrent(page) {
         console.log(page);
         this.searchForm.pageNum = page;
         this.FnSelectStoreAuth();
      },
      sizeChange(size){
         console.log(size);
      },

      /* 1、 编辑选中  */
      checkedStore(val) {
         console.log(val);
         this.checkedRows = val;
      },
      /*点击行触发，选中或不选中复选框 */
      handleRowClick(row, column, event) {
         // this.$refs.refTable.toggleRowSelection(row);
      },

      /*复制 封装 方法*/
      MethodCopy(text) {
         var textareaEl = document.createElement('textarea');
         textareaEl.setAttribute('readonly', 'readonly'); // 防止手机上弹出软键盘
         textareaEl.value = text;
         document.body.appendChild(textareaEl);
         textareaEl.select();
         var res = document.execCommand('copy');
         document.body.removeChild(textareaEl);
         console.log("复制成功");
         this.$message.success('复制成功');
         return res;

      },
      /*点击复制 事件*/
      FnCopy() {
         let site = this.addForm.site;

         const developerName = 'DK';
         const devMWSAccountId = '1912-3969-1582';
         if (site == 1) {  //北美
            this.nowCountyName = '北美';
            this.nowCountySite = 'http://sellercentral.amazon.com/gp/mws/registration/register.html?signInPageDisplayed=2&developerName=' + developerName + '&devMWSAccountId=' + devMWSAccountId;
         }
         if (site == 2) { //欧洲
            this.nowCountyName = '欧洲';
            this.nowCountySite = 'https://sellercentral.amazon.co.uk/gp/mws/registration/register.html?signInPageDisplayed=2&developerName=' + developerName + '&devMWSAccountId=' + devMWSAccountId;
         }

         console.log(site);
         this.MethodCopy(this.nowCountySite);
      },

      /*选择负责人*/
      FnChooseCharge(id) {
         console.log(id);

         /*let obj = {};
         obj = this.chargeArr.find((item)=>{
           return item.id == id;//筛选出匹配数据
         });
         console.log(obj.name);//我这边的name就是对应label的*/
      },

      /*选择站点*/
      FnChooseSite(val) {
         console.log(val);

         let obj = {};
         obj = this.siteArr.find((item) => {
            return item.id == val;//筛选出匹配数据
         });
         this.nowCountyName = obj.label;
         console.log(obj.label);//我这边的name就是对应label的

      },

      /* 国家 多选 级联 */
      FnChooseCounty(val) {
         console.log(val);
         this.addForm.site = val[0];
         this.addForm.country = val[1];
      },

      /*导入*/
      FnImport() {
      },

      /*添加显示*/
      FnBtnAddShow() {

         this.diaState.diaAdd = true;
         this.diaState.submitType = 'add';
         this.diaState.diaAddTitle = '添加店铺授权';

         // this.$refs['RefAddForm'].resetFields();
      },

      /*添加 提交  */
      FnBtnAdd(formName) {
         let that = this;
         let submitType = this.diaState.submitType;
         that.$refs[formName].validate((valid) => {
            this.GLOBAL.btnStateChange(this, 'btnState', 'btnSubmit');
            if (valid) {
               console.log(this.addForm);

               if (submitType == 'add') {
                  addStoreAuth(this.addForm).then(res => {
                     console.log(res.message);
                     this.GLOBAL.axiosSuc(that, '添加成功');
                  }).catch(res => {
                     console.log(res);
                  })
               } else {
                  console.log('put');
                  updateStoreAuth(this.addForm).then(res => {
                     console.log(res.message);
                     this.GLOBAL.axiosSuc(that, '更新成功');
                  }).catch(res => {
                     console.log(res);
                  })
               }
            }
            ;
         })
      },

      /* 添加 取消  */
      FnCloseAdd() {
         // console.log('取消');
         this.GLOBAL.btnStateChange(this, 'btnState', 'btnCancel')
         // this.diaState.diaAdd = false;

         // this.$nextTick(() => {
         //
         // })
         // this.$refs['RefAddForm'].resetFields();
         // console.log(this.addForm);
         this.addForm = {  /*添加弹窗表单数据*/
            storeName: '',
            platform: '',
            site: '1',  /*站点*/
            country: 'USA',
            principalName: '',
            remark: '',
            sellerId: '',
            authToken: '',
         };
      },


      /*表格 tr 操作 */
      FnCommand(val) {
         let valData = val.data;
         console.log(valData);

         /*管理子账号 */
         if (val.type == 'manageSubAccount') {
            this.diaState.diaAddSub = true;
            authSonList({
               parentId: valData.sellerId,
            }).then(res => {
               console.log(res);
               // this.diaSubConutArr = res.data;
               this.parentId = valData.sellerId;
               this.diaFormSub.subCount = res.data;
            }).catch(res => {
               console.log(res);
            })
         }

         /*更新店铺授权*/
         if (val.type == 'put') {
            this.diaState.diaAdd = true;
            this.diaState.submitType = 'put';
            this.diaState.diaAddTitle = '更新店铺授权';
            this.addForm = valData;
            // let arr = [];
            // arr.push(valData.site, valData.country);
            // console.log(arr);
            // this.addForm.countryData = arr;
            console.log(this.addForm);
         }

         /*删除操作  */
         if (val.type == 'delete') {
            // this.FnDelStoreAuthList();
            this.FnDelStoreAuth(valData.sellerId);
         }
      },

      /* 查询 获取 table */
      FnSelectStoreAuth() {
         selectStoreAuth(this.searchForm).then(res => {
            console.log(res);
            this.diaState.loadTable = false;
            this.tableArr = res.data;
            this.pageArr.pageTotalRows = res.total;
         }).catch(res => {
            this.diaState.loadTable = false;
            console.log(res);
         })
      },

      /* id 删除 table */
      FnDelStoreAuth(id) {
         delStoreAuth(id).then(res => {
            // console.log(res);
            this.GLOBAL.axiosSuc(this, res.message);
         }).catch(res => {
            console.log(res);
         })
      },
      /*多个、批量 删除 店铺 */
      FnDelStoreAuthList() {
         console.log('sellerId');
         let sellerId = [];
         this.checkedRows.forEach((row) => {
            sellerId.push(row.sellerId);
         });
         delStoreAuthList(sellerId).then(res => {
            console.log(res);
         }).catch(res => {
            console.log(res)
         })
      },

   },

   created() {
      this.FnSelectStoreAuth();
   },
}
</script>

<style lang="scss">
.subCount-box {
   border-bottom: solid 1px #f4f4f4;
   margin-bottom: 10px;

   .title {
      margin-left: 16px;
      font-size: 16px;
      font-weight: 500;
   }

   .el-form-item {
      display: inline-block;
   }
}
</style>