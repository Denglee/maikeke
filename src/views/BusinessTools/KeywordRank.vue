<template>
  <div class="public-main">
     <el-form :model="FormSearch" class="public-form"  ref="refRoleForm"
              label-width="120px" label-position="left" :inline="true">
        <el-form-item label="关键词" prop="name">
           <el-input v-model="FormSearch.name" class="public-input" autocomplete="off" placeholder="请输入" clearable></el-input>
        </el-form-item>

        <el-form-item label="select 单选：" prop="store">
           <el-select v-model="FormSearch.store" value.key="id" filterable clearable placeholder="请选择店铺"
                      class="public-selectFull">
              <el-option v-for="(item, index) in projectArr" :key="index"
                         :value="item.value"
                         :label="item.label">
              </el-option>
           </el-select>
        </el-form-item>
        <el-button type="primary" class="public-btn" :loading="btnState.btnSearch"
                   @click="FnPostSearch('refRoleForm')">搜索</el-button>

        <div class="formR-main">
           <el-button type="primary" class="public-btn" :loading="btnState.btnAddRankMonit"
                      @click="diaState.diaAddRankMonit = true">添加排名监控
           </el-button>
        </div>

     </el-form>

     <el-table class="public-table" border
               :data="tableArr"
               @selection-change="checkedStore"
               ref="refTable"
               height="600"
               @row-click="handleRowClick">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="ASIN" label="ASIN"></el-table-column>
        <el-table-column prop="keyword" label="关键词"></el-table-column>
        <el-table-column prop="site" label="站点"></el-table-column>
        <el-table-column prop="keywordNum" label="关键词数量"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="founder" label="创建人"></el-table-column>
        <el-table-column label="操作">
           <template slot-scope="scope">
              <el-dropdown @command="FnCommand">
                 <el-button type="primary">
                    操作<i class="el-icon-arrow-down el-icon--right"></i>
                 </el-button>
                 <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command="{ type:'FnDelete', data:scope.row }">删除店铺</el-dropdown-item>
                 </el-dropdown-menu>
              </el-dropdown>
           </template>
        </el-table-column>
     </el-table>

     <el-pagination
        background
        layout="total, prev, pager,next, sizes, jumper"
        :page-sizes="[10, 20, 50, 100]"
        :total="pageArr.total"
        :page-size="pageArr.pageSize"
        @size-change='sizeChange'
        @current-change="PageCurrent">
     </el-pagination>

     <!-- 添加排名监控 -->
     <el-dialog :append-to-body="true"
                title="新增监控排名"
                :visible.sync="diaState.diaAddRankMonit"
                custom-class="public-dialog"
                :close-on-click-modal="false"
                width="1200px">
        <el-form :model="FormAddRank" ref="RefAddForm" label-width="136px" class="" :inline="true">
           <el-form-item label="站点：" prop="site" :rules="{ required: true, message: '请选择', trigger: 'change' }">
              <el-select v-model="FormSearch.site" value.key="id" filterable clearable placeholder="请选择店铺"
                         class="public-selectFull">
                 <el-option v-for="(item, index) in projectArr" :key="index"
                            :value="item.value"
                            :label="item.label">
                 </el-option>
              </el-select>
           </el-form-item>
           <el-form-item label="ASIN：" prop="ASIN" :rules="{ required: true, message: 'ASIN', trigger: 'change' }">
              <el-select v-model="FormSearch.ASIN" value.key="id" filterable clearable placeholder="请选择店铺"
                         class="public-selectFull">
                 <el-option v-for="(item, index) in projectArr" :key="index"
                            :value="item.value"
                            :label="item.label">
                 </el-option>
              </el-select>
           </el-form-item>
        </el-form>
        <div class="flex-between">
           <div>备注：系统会获取默认的关键词排名，还可以通设置邮编的方式获取相应的排名数据</div>
           <el-button type="primary" class="public-btn" :loading="btnState.btnAddKeyword"
                      @click="FnAddKeyword">添加关键词</el-button>
        </div>

        <el-table class="public-table" border
                  :data="tableRankArr"
                  ref="refRankTable">
           <el-table-column prop="keyword" label="关键词">
              <template slot-scope="scope">
                 <el-input v-model="scope.row.keyword" class="public-input" autocomplete="off" placeholder="请输入" clearable></el-input>
              </template>
           </el-table-column>
           <el-table-column prop="keywordType" label="关键词类型">
              <template slot-scope="scope">
                 <el-select v-model="scope.row.keywordType" value.key="id" filterable clearable placeholder="请选择关键词类型"
                            class="public-selectFull">
                    <el-option v-for="(item, index) in keywordTypeArr" :key="index"
                               :value="item.value"
                               :label="item.label">
                    </el-option>
                 </el-select>
              </template>
           </el-table-column>
           <el-table-column prop="keywordCome" label="获取排名来源">
              <template slot-scope="scope">
                 <el-checkbox-group v-model="scope.row.keywordCome">
                    <el-checkbox label="1">PC</el-checkbox>
                    <el-checkbox label="2">移动</el-checkbox>
                 </el-checkbox-group>
              </template>
           </el-table-column>
           <el-table-column prop="codeSet" label="邮编查询设置">
              <template slot-scope="scope">
                 <el-input v-model="scope.row.codeSet" class="public-input" autocomplete="off" placeholder="请输入，以逗号隔开，比如40001,10001" clearable></el-input>
              </template>
           </el-table-column>
           <el-table-column label="设置">
              <template slot-scope="scope">
                 <el-button>删除</el-button>
              </template>
           </el-table-column>
        </el-table>
        <div class="alignR">
           <el-button type="primary" class="public-btn" :loading="btnState.btnSaveAddKeyword"
                      @click="FnSaveAddKeyword">保存
           </el-button>
        </div>

     </el-dialog>

  </div>
</template>

<script>

export default {
  name: "KeywordRank",
  data() {
    return{
       pageArr:{
          total:20,
          pageSize:10
       },
       FormSearch:{

       },
       btnState:{
          btnSearch:false,
          btnAddRankMonit:false,

          btnAddKeyword:false,
          btnSaveAddKeyword:false,
       },
       diaState:{
          diaAddRankMonit:false,  //新增监控排名
       },

       FormAddRank:{

       },
       keywordTypeArr:[
          {
             value: '1',
             label: '自然关键词',
          },
          {
             value: '2',
             label: '广告关键词',
          },
       ],
       projectArr: [
          {
             id:'1',
             value: 'shop1',
             label: '店铺1',
          },
          {
             id:'2',
             value: 'shop2',
             label: '店铺2',
          },
       ],

       /*新增排名监控 表格*/
       tableRankArr:[
          {
             keyword:'bihailantian',
             keywordType:'1',
             keywordCome:['2'],
             codeSet:'1001',
         },
       ],

       /*排名监控*/
       tableArr:[
          {
             ASIN:'B08B8BDG42',
             keyword:'Dispsable Face Masks',
             site:'1',
             keywordNum:'1',
             createTime:'2020-12-10',
             founder:'王小宝',
          }
       ],
    }
  },
  methods:{
     /* 1、 编辑选中  */
     checkedStore(val) {
        console.log(val);
        this.checkedRows = val;
     },
     /*点击行触发，选中或不选中复选框 */
     handleRowClick(row, column, event) {
        this.$refs.refTable.toggleRowSelection(row);
     },

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

     /*分页*/
     PageCurrent(page){
        console.log(page)
        // this.staffPage = page;
        // this.getStaffIndex();
     },
     sizeChange(size){
        console.log(size);
     },

      /*添加关键词*/
     FnAddKeyword(){
        // let parentId = this.parentId;
        this.tableRankArr.push({
           keyword:'',
           keywordType:'',
           keywordCome:['1'],
           codeSet:'',
        });
     },

     /*保存 排名监控*/
     FnSaveAddKeyword(){

     },

  },
  created() {

  },
}
</script>

<style scoped lang="scss">

</style>