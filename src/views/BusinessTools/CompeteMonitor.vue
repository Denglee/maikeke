<template>
   <div class="public-main">
      <el-form :model="FormSearch" class="public-form" ref="refRoleForm"
               label-width="120px" label-position="left" :inline="true">

         <el-input v-model="FormSearch.ASIN" class="public-input" autocomplete="off" placeholder="请输入ASIN"
                   clearable></el-input>
         <el-input v-model="FormSearch.people" class="public-input" autocomplete="off" placeholder="请输入创建人"
                   clearable></el-input>

         <el-button type="primary" class="public-btn" :loading="btnState.btnSearch"
                    icon="el-icon-search"  @click="FnPostSearch('refRoleForm')">搜索
         </el-button>

         <div class="formR-main">
            <el-button type="primary" class="public-btn" :loading="btnState.btnAddRankMonit"
                       @click="diaState.diaAddRankMonit = true">添加竞品
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
         <el-table-column prop="img" label="图片">
            <tempalte slot-scope="{row}">
               <el-image
                 class="public-imgTd"
                  :src="row.img"
                  :fit="fit"></el-image>
            </tempalte>
         </el-table-column>
         <el-table-column prop="ASIN" label="ASIN"></el-table-column>
         <el-table-column prop="keyword" label="标题"></el-table-column>
         <el-table-column prop="site" label="Reviews/Rating/Stars"></el-table-column>
         <el-table-column prop="keywordNum" label="销售排名"></el-table-column>
         <el-table-column prop="createTime" label="销售价格"></el-table-column>
         <el-table-column prop="createTime" label="购物车拥有者"></el-table-column>
         <el-table-column prop="createTime" label="BEST SELLER"></el-table-column>
         <el-table-column prop="createTime" label="coupon"></el-table-column>
         <el-table-column prop="createTime" label="秒杀"></el-table-column>
         <el-table-column prop="founder" label="创建人"></el-table-column>
         <el-table-column label="操作">
            <template slot-scope="scope">
               <el-dropdown @command="FnCommand">
                  <el-button type="primary">
                     操作<i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                  <el-dropdown-menu slot="dropdown">
                     <el-dropdown-item :command="{ type:'FnDelete', data:scope.row }">删除</el-dropdown-item>
                     <el-dropdown-item :command="{ type:'FnHistory', data:scope.row }">历史信息</el-dropdown-item>
                  </el-dropdown-menu>
               </el-dropdown>
            </template>
         </el-table-column>
      </el-table>

      <!--分页-->
      <Pagination
         :pageNum="pageArr.pageNum"
         :total="pageArr.total"
         :pageSize="pageArr.pageSize"
         @SonSizeChange='FaSizeChange'
         @SonCurrentChange="FaPageCurrent"></Pagination>

      <!-- 添加排名监控 -->
      <el-dialog :append-to-body="true"
                 title="新增监控排名"
                 :visible.sync="diaState.diaAddRankMonit"
                 custom-class="public-dialog"
                 :close-on-click-modal="false"
                 width="1200px">
         <el-form :model="FormAddRank" ref="RefAddForm" label-width="136px" class="" :inline="true">
            <el-form-item label="站点：" prop="site"
                          :rules="{ required: true, message: '请选择', trigger: 'change' }">
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
                       @click="FnAddKeyword">添加关键词
            </el-button>
         </div>

         <el-table class="public-table" border
                   :data="tableRankArr"
                   ref="refRankTable">
            <el-table-column prop="keyword" label="关键词">
               <template slot-scope="scope">
                  <el-input v-model="scope.row.keyword" class="public-input" autocomplete="off" placeholder="请输入"
                            clearable></el-input>
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
                  <el-input v-model="scope.row.codeSet" class="public-input" autocomplete="off"
                            placeholder="请输入，以逗号隔开，比如40001,10001" clearable></el-input>
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


      <!-- 历史竞品 -->
      <el-dialog :append-to-body="true"
                 title="历史竞品"
                 :visible.sync="diaState.diaHisCom"
                 custom-class="public-dialog"
                 :close-on-click-modal="false"
                 width="1200px">
         <el-form :model="FormSearch" class="public-form" ref="refRoleForm"
                  label-width="120px" label-position="left" :inline="true">
            <el-date-picker
               class="public-datePicker"
               v-model="FormSearch.order_time"
               type="daterange"
               unlink-panels
               range-separator="-"
               start-placeholder="开始日期"
               end-placeholder="结束日期"
               value-format="yyyy-MM-dd">
            </el-date-picker>

            <el-button type="primary" class="public-btn" :loading="btnState.btnSearch"
                       icon="el-icon-search"    @click="FnPostSearch('refRoleForm')">搜索
            </el-button>

         </el-form>

         <el-table class="public-table" border
                   :data="tableArr"
                   ref="refTable">
            <el-table-column prop="img" label="图片">
               <tempalte slot-scope="{row}">
                  <el-image
                     class="public-imgTd"
                     :src="row.img"
                     :fit="fit"></el-image>
               </tempalte>
            </el-table-column>
            <el-table-column prop="ASIN" label="ASIN"></el-table-column>
            <el-table-column prop="keyword" label="标题"></el-table-column>
            <el-table-column prop="site" label="Reviews/Rating/Stars"></el-table-column>
            <el-table-column prop="keywordNum" label="销售排名"></el-table-column>
            <el-table-column prop="createTime" label="销售价格"></el-table-column>
            <el-table-column prop="createTime" label="购物车拥有者"></el-table-column>
            <el-table-column prop="createTime" label="BEST SELLER"></el-table-column>
            <el-table-column prop="createTime" label="coupon"></el-table-column>
            <el-table-column prop="createTime" label="秒杀"></el-table-column>
            <el-table-column prop="founder" label="创建人"></el-table-column>
         </el-table>

         <!--分页-->
         <Pagination
            :pageNum="pageArr.pageNum"
            :total="pageArr.total"
            :pageSize="pageArr.pageSize"
            @SonSizeChange='FaSizeChange'
            @SonCurrentChange="FaPageCurrent"></Pagination>
      </el-dialog>

   </div>
</template>

<script>

export default {
   name: "KeywordRank",
   components:{},
   data() {
      return {
         pageArr: {
            total: 10,  //总条数
            pageSize: 20, //每页个数
            pageNum: 1, //当前页数
         },
         FormSearch: {},
         btnState: {
            btnSearch: false,
            btnAddRankMonit: false,

            btnAddKeyword: false,
            btnSaveAddKeyword: false,

         },
         diaState: {
            diaAddRankMonit: false,  //新增监控排名
            diaHisCom: true,
         },

         FormAddRank: {},
         keywordTypeArr: [
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

         /*新增排名监控 表格*/
         tableRankArr: [
            {
               keyword: 'bihailantian',
               keywordType: '1',
               keywordCome: ['2'],
               codeSet: '1001',
            },
         ],

         /*排名监控*/
         tableArr: [
            {
               img: 'https://images-na.ssl-images-amazon.com/images/I/7181lYhgidL._AC_SX679_.jpg',
               ASIN: 'B08B8BDG42',
               title: 'Oral Thermoment for Adults.',
               Stars: {
                  reviews: 894,
                  ratings: 2348,
                  stars: 4,
               },
               keyword: 'Dispsable Face Masks',
               site: '1',
               keywordNum: '1',
               createTime: '2020-12-10',
               founder: '王小宝',
            }
         ],
      }
   },
   methods: {


      /* 1、 编辑选中  */
      checkedStore(val) {
         console.log(val);
         this.checkedRows = val;
      },
      /*点击行触发，选中或不选中复选框 */
      handleRowClick(row, column, event) {
         this.$refs.refTable.toggleRowSelection(row);
      },
      FnPostSearch(){

      },


      /*表格 tr 操作 */
      FnCommand(val) {
         console.log(val);
         /*删除*/
         if (val.type == 'FnDelete') {

         }
         /*删除*/
         if (val.type == 'FnHistory') {
            this.diaState.diaHisCom = true;
         }

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

      /*添加关键词*/
      FnAddKeyword() {
         // let parentId = this.parentId;
         this.tableRankArr.push({
            keyword: '',
            keywordType: '',
            keywordCome: ['1'],
            codeSet: '',
         });
      },

      /*保存 排名监控*/
      FnSaveAddKeyword() {

      },

   },
   created() {

   },
}
</script>

<style scoped lang="scss">

</style>