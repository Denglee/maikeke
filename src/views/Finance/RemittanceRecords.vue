<template>
    <div class="public-main">

       <el-form :model="FormSearch" class="public-form" ref="refRoleForm" @submit.native.prevent
                label-width="120px" label-position="left" :inline="true">
          <el-form-item label="关键词" prop="name">
             <el-input v-model="FormSearch.name" class="public-input" autocomplete="off" placeholder="请输入"
                       clearable></el-input>
          </el-form-item>

          <el-button @click="diaState.diaSetTr = true" class="public-btn">设置</el-button>

       </el-form>

      <!--管理-->
       <customThead :TrCheckedArr="TrCheckedArr" pageRefs="pageRecords" :diaSetTr="diaState.diaSetTr"
       @closeDia = 'closeDia'></customThead>

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
    name: "RemittanceRecords", //回款记录
    data(){
     return{
        diaState: {
           diaSetTr: false,
        },
        FormSearch:{

        },
        TrCheckedArr: [
           { title: "名称",iState: true, },
           { title: "性别",iState: false, },
           { title: "年龄",iState: true, },
           { title: "时间",iState: true, },
           { title: "事件",iState: true, },
           { title: "地点",iState: true, },
        ],
        tableData:[],
     }
    },

    methods:{
      closeDia(){
         let that = this;
         this.diaState.diaSetTr =  false;
         this.$nextTick(() => {
           that.$refs.refTable.doLayout();
         });
      },
    },

    created(){
    
    },
   components:{
      customThead,
   }
}
</script>
