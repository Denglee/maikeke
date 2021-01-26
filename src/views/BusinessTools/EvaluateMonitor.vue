<template>
   <div class="public-main">
      <el-form :model="searchForm" class="public-form" ref="refRoleForm" :inline="true">
         <el-select v-model="searchForm.name" value.key="id" filterable clearable placeholder="请选择店铺负责人"
                    class="public-select">
            <el-option v-for="(item, index) in projectArr" :key="item.id"
                       :value="item.value"
                       :label="item.label">
            </el-option>
         </el-select>

         <el-input v-model="searchForm.SellerInfo" class="public-input" autocomplete="off" placeholder="请输入买家信息"
                   clearable></el-input>

         <el-date-picker
             class="public-datePicker"
             v-model="searchForm.order_time"
             type="daterange"
             unlink-panels
             range-separator="-"
             start-placeholder="开始日期"
             end-placeholder="结束日期"
             value-format="yyyy-MM-dd">
         </el-date-picker>

         <el-button type="primary" class="public-btn" :loading="btnState.btnPost" @click="FnPostSearch()">搜索</el-button>

         <div class="formR-main marbom">
            <el-button @click="diaState.diaSetTr = true">设置</el-button>
         </div>

      </el-form>

      <el-table class="public-table" border
                :data="tableArr"
                ref="refTable"
                height="600">
         <el-table-column type="index" label="序号"></el-table-column>
         <el-table-column v-if="TrCheckedArr[0].iState" prop="img" label="图片"></el-table-column>
         <el-table-column v-if="TrCheckedArr[1].iState" prop="ASIN" label="ASIN"></el-table-column>
         <el-table-column v-if="TrCheckedArr[2].iState" prop="Star" label="评级"></el-table-column>
         <el-table-column v-if="TrCheckedArr[3].iState" prop="valuate" label="评价内容" min-width="300px"></el-table-column>
         <el-table-column v-if="TrCheckedArr[4].iState" prop="BuyersInfo" label="买家信息"></el-table-column>
         <el-table-column v-if="TrCheckedArr[5].iState" prop="Store" label="店铺"></el-table-column>
         <el-table-column v-if="TrCheckedArr[6].iState" prop="Site" label="站点"></el-table-column>
         <el-table-column v-if="TrCheckedArr[7].iState" prop="store" label="评价时间"></el-table-column>
         <el-table-column v-if="TrCheckedArr[8].iState" prop="store" label="更新时间"></el-table-column>
         <el-table-column v-if="TrCheckedArr[9].iState" prop="State" label="状态"></el-table-column>
         <el-table-column v-if="TrCheckedArr[10].iState" prop="Status" label="处理状态" width="120px">
            <template slot-scope="scope">
               <el-select v-model="scope.row.Status">
                  <el-option v-for="(item, index) in statusArr" :key="index"
                             :value="item.value"
                             :label="item.label">
                  </el-option>
               </el-select>
            </template>
         </el-table-column>
         <el-table-column v-if="TrCheckedArr[11].iState" prop="Remark" label="备注"></el-table-column>
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

      <!-- 自定义列 -->
      <el-dialog :append-to-body="true"
                 title="自定义列"
                 :visible.sync="diaState.diaSetTr"
                 custom-class="public-dialog"
                 :close-on-click-modal="false"
                 width="1000px">
         <el-checkbox-group v-model="isTrCheckedArr" class="marbom">

            <el-checkbox v-for="item in AllTrChecked" :label="item" :key="item"></el-checkbox>
         </el-checkbox-group>

         <div class="formR-main">
            <el-button @click="diaState.diaSetTr = false">取消</el-button>
            <el-button @click="FnSaveTrChecked" class="public-btn" style="margin-top: 20px;">保存</el-button>
         </div>
      </el-dialog>

   </div>
</template>

<script>
export default {
   name: "EvaluateMonitor",
   data() {
      return {
         searchForm: {},
         btnState: {
            btnPost: false,
         },
         diaState: {
            diaSetTr: false,
         },

         pageArr: {
            pageTotalRows: 100,
            pageListRows: 10,
         },

         statusArr: [
            {
               id: 1,
               label: '待处理',
               value: 1,
            },
            {
               id: 2,
               label: '处理中',
               value: 2,
            },
            {
               id: 3,
               label: '已完成',
               value: 3,
            },
         ],
         projectArr: [
            {
               id: 1,
               label: '负责人1',
               value: 'charge100',
            },
            {
               id: 2,
               label: '负责人2',
               value: 'charge200',
            },
         ],
         tableArr: [
            {
               img: '',
               ASIN: 'B08B8BDG42',
               Star: '5',
               valuate: 'This is the best protector I have purchased for my Apple Watch. It is easy to put on and has stayed clear, the others I have purcha…',
               BuyersInfo: 'D.Json',
               Store: 'En vo-US',
               Site: 1,
               State: 1,
               Status: 1,
               Remark: '备注',
            },
            {
               img: '',
               ASIN: 'B08B8BDG42',
               Star: '5',
               valuate: 'This is the best',
               BuyersInfo: 'D.Json',
               Store: 'En vo-US',
               Site: 2,
               State: 1,
               Status: 2,
               Remark: '备注',
            },
         ],


         TrCheckedArr: [
            {title: "图片", iState: true},
            {title: "ASIN", iState: true},
            {title: "评级", iState: true},
            {title: "评价内容", iState: true},
            {title: "买家信息", iState: true},
            {title: "店铺", iState: true},
            {title: "站点", iState: true},
            {title: "评价时间", iState: true},
            {title: "更新时间", iState: true},
            {title: "状态", iState: true},
            {title: "处理状态", iState: true},
            {title: "备注", iState: true},
         ],
         AllTrChecked: [], //全部选项
         isTrCheckedArr: [],//已经勾选
      }
   },
   methods: {

      /*搜索事件*/
      FnPostSearch() {
         this.GLOBAL.btnStateChange(this, 'btnState', 'btnPost');
         console.log(this.searchForm);
      },

      /*分页*/
      PageCurrent(page) {
         console.log(page)
         // this.staffPage = page;
         // this.getStaffIndex();
      },

      /* 获取 自定义列 所有选项 */
      FnGetAllTrChecked() {
         let that = this;
         let isVal = localStorage.getItem('isTrCheckedEv');
         if (isVal) {  //有储存勾选
            for (let i = 0; i < that.TrCheckedArr.length; i++) {
               that.AllTrChecked.push(that.TrCheckedArr[i].title);
            }
            that.isTrCheckedArr = isVal.split(',');
         } else {
            for (let i = 0; i < that.TrCheckedArr.length; i++) {
               that.AllTrChecked.push(that.TrCheckedArr[i].title);
               /*初始化不想展示的列可以放在这个条件里*/
               // if (that.TrCheckedArr[i].title == '名称') {
               //   continue;
               // }
               that.isTrCheckedArr.push(that.TrCheckedArr[i].title);
            }
         }

      },
      /* 保存 自定义列 */
      FnSaveTrChecked() {
         this.diaState.diaSetTr = false;
         let checkedArr = this.isTrCheckedArr;
         let noSrr = this.AllTrChecked.filter(i => checkedArr.indexOf(i) < 0); // 未选中
         this.TrCheckedArr.filter(i => {
            if (noSrr.indexOf(i.title) != -1) {
               i.iState = false;
            } else {
               i.iState = true;
            }
         });
         localStorage.setItem('isTrCheckedEv', checkedArr);
         this.$nextTick(() => {
            this.$refs.refTable.doLayout();
         });
      },

   },
   created() {
      this.FnGetAllTrChecked();
      this.FnSaveTrChecked();
   },
}
</script>
