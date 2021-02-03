<template>
   <div class="public-main">

      <el-form :model="FormSearch" class="public-form" ref="refRoleForm" @submit.native.prevent
               label-width="120px" label-position="left" :inline="true">

         <el-select placeholder="请选择" v-model="FormSearch.shopType" class="public-select">
            <el-option v-for="(item,index) in storeArr" :key="index"
                       :value="item.value"
                       :label="item.label">
            </el-option>
         </el-select>

         <el-button @click="diaState.diaSetTr = true" class="public-btn">设置</el-button>

      </el-form>

      <!--管理-->
      <customThead :TrCheckedArr="TrCheckedArr" pageRefs="pageRecords" :diaSetTr="diaState.diaSetTr"
                   @closeDia='closeDia'></customThead>

      <el-row :gutter="10" class="funds-history">
         <el-col :span="3" class="funds-left">
            <el-card>
               <h4>回款记录</h4>
               <div>
                  <div>总金额</div>
                  <div>￥2291309.22</div>
               </div>
               <div>
                  <div>未结算金额</div>
                  <div>￥221309.22</div>
               </div>
               <div>
                  <div>已转账金额</div>
                  <div>￥2291309.22</div>
               </div>
            </el-card>

         </el-col>
         <el-col :span="21">
            <el-card>
               <ve-histogram :data="chartData"></ve-histogram>
            </el-card>
         </el-col>
      </el-row>

      <el-table :data="tableData" border ref="refTable">
         <el-table-column type="selection" width="55" align="center"></el-table-column>
         <el-table-column v-if="TrCheckedArr[0].iState" prop="name" label="名称" align="center"></el-table-column>
         <el-table-column v-if="TrCheckedArr[1].iState" prop="select" label="性别" align="center"></el-table-column>
         <el-table-column v-if="TrCheckedArr[2].iState" prop="kafang" label="年龄" align="center"></el-table-column>
         <el-table-column v-if="TrCheckedArr[3].iState" prop="fengbi" label="时间" align="center"></el-table-column>
         <el-table-column v-if="TrCheckedArr[4].iState" prop="isETF" label="事件" align="center"></el-table-column>
         <el-table-column v-if="TrCheckedArr[5].iState" prop="range" label="地点" align="center"></el-table-column>
      </el-table>

   </div>
</template>

<script>
import customThead from '@/components/publicPage/customThead'

export default {
   name: "AccountFunds", //回款记录
   data() {
      return {

         chartData: {
            columns: ['日期', '访问用户',],
            rows: [
               { '日期': '2020-11', '访问用户': 1393,  },
               { '日期': '2020-10', '访问用户': 3530, },
               { '日期': '2020-09', '访问用户': 2923, },
               { '日期': '2020-08', '访问用户': 1723, },
               { '日期': '2020-07', '访问用户': 3792, },
               { '日期': '2020-06', '访问用户': 4593,  },
               { '日期': '2020-05', '访问用户': 4593,  },
               { '日期': '2020-04', '访问用户': 4593,  },
               { '日期': '2020-03', '访问用户': 4593,  },
            ]
         },
         diaState: {
            diaSetTr: false,
         },
         FormSearch: {},
         storeArr:[
            { label:'', name:'' },
         ],
         TrCheckedArr: [
            {title: "名称", iState: true,},
            {title: "性别", iState: false,},
            {title: "年龄", iState: true,},
            {title: "时间", iState: true,},
            {title: "事件", iState: true,},
            {title: "地点", iState: true,},
         ],
         tableData: [],
      }
   },

   methods: {
      closeDia() {
         let that = this;
         this.diaState.diaSetTr = false;
         this.$nextTick(() => {
            that.$refs.refTable.doLayout();
         });
      },
   },

   created() {

   },
   components: {
      customThead,
   }
}
</script>

<style lang="scss">
.funds-history{
   margin: 20px 0;
   .funds-left{
      min-height: 400px;
   }
}
</style>
