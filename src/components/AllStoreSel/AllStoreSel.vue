<template>
   <el-select v-model="store" filterable multiple clearable collapse-tags
              popper-class="elSelect-checkbox" class="public-select"
              @change='chooseStore($event)'
              placeholder="选择店铺">
      <el-option v-for="(item, index) in storeArr"
                 :key="index"
                 :value="item.merchantId"
                 :label="item.merchantId">
         <span class="check"></span>
         <span style="margin-left: 8px">{{ item.merchantId }}</span>
      </el-option>
   </el-select>
</template>

<script>

import {getStoreList} from '@/assets/js/api'
export default {
   name: "AllStoreSel",
   data() {
      return {
         store:[],
         storeArr:[],
      }
   },
   methods: {
      FnGetStoreList() {
         getStoreList().then(res => {
            console.log(res.data);
            this.storeArr = res.data;
         }).catch(res => {
            console.log(res);
         })
      },

      chooseStore(){
         this.$emit('FnSonChooseStore',this.store);
      },
   },
   created() {
      this.FnGetStoreList();
   },
}
</script>
