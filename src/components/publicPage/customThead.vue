<template>

   <!-- 自定义列 -->
   <el-dialog :append-to-body="true"
              title="自定义列"
              :visible="diaSetTr"
              custom-class="public-dialog"
              :close-on-click-modal="false"
              width="600px"
              @close="FnCloseDia">
      <el-checkbox-group v-model="isTrCheckedArr" class="marbom" @change="checkedTr">
         <el-checkbox v-for="item in AllTrChecked"
                      :label="item"
                      :key="item"></el-checkbox>
      </el-checkbox-group>

      <div class="formR-main">
         <el-button @click="FnCloseDia">取消</el-button>
         <el-button @click="FnSaveTrChecked" class="public-btn" style="margin-top: 20px;">保存</el-button>
      </div>
   </el-dialog>

</template>

<script>
export default {
   name: "EvaluateMonitor",
   props: {
      TrCheckedArr: {},
      pageRefs:'',
      diaSetTr:{
         type:Boolean,
         default:false,
      },
   },
   data() {
      return {
         tableData: [],
         AllTrChecked: [], //全部选项
         isTrCheckedArr: [],//已经勾选
         nowTrCheckedArr:[],
      }
   },
   methods: {
      checkedTr(val){
         // console.log(this.isTrCheckedArr);
         // console.log(this.nowTrCheckedArr);
      },
      /* 获取 自定义列 所有选项 */
      FnGetAllTrChecked() {
         let that = this;
         let cookiePageRefs = this.pageRefs;
         // console.log(cookiePageRefs);
         let isVal = localStorage.getItem(cookiePageRefs);
         // console.log(isVal);
         if (isVal) {  //有储存勾选
            for (let i = 0; i < that.TrCheckedArr.length; i++) {
               that.AllTrChecked.push(that.TrCheckedArr[i].title);
            }
            that.isTrCheckedArr = isVal.split(',');
            that.nowTrCheckedArr = isVal.split(',');
         } else {
            for (let i = 0; i < that.TrCheckedArr.length; i++) {
               that.AllTrChecked.push(that.TrCheckedArr[i].title);
               let aaArr= ['名称','性别'];
               /*初始化不想展示的列可以放在这个条件里*/
               if (that.TrCheckedArr[i].title == aaArr[0]) {
                 continue;
               }
               that.isTrCheckedArr.push(that.TrCheckedArr[i].title);
               that.nowTrCheckedArr.push(that.TrCheckedArr[i].title);
            }
         }
      },

      /* 保存 自定义列 */
      FnSaveTrChecked() {
         let that = this;
         this.$emit('closeDia');
         let cookiePageRefs = this.pageRefs;
         // console.log(cookiePageRefs);
         let checkedArr = this.isTrCheckedArr;
         let noSrr = this.AllTrChecked.filter( i => checkedArr.indexOf(i) < 0); //未选中
         this.TrCheckedArr.filter(i => {
            if (noSrr.indexOf(i.title) != -1) {
               i.iState = false;
            } else {
               i.iState = true;
            }
         });
         // console.log(checkedArr);
         localStorage.setItem(cookiePageRefs, checkedArr);
         this.nowTrCheckedArr = this.isTrCheckedArr;
      },

      /*关闭弹窗*/
      FnCloseDia(){
         // console.log(this.isTrCheckedArr);
         this.$emit('closeDia');
         this.isTrCheckedArr = this.nowTrCheckedArr;
      },
   },
   created() {
      this.FnGetAllTrChecked();
      this.FnSaveTrChecked();
   },

}
</script>
