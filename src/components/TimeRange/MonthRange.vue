<template>
   <el-date-picker
      class="public-datePicker"
      v-model="monthTime"
      type="daterange"
      align="right"
      unlink-panels
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      :picker-options="pickerOptions"
      @change="dataTimeChange"
      value-format="yyyy-MM-dd">
   </el-date-picker>
</template>

<script>
export default {
   name: "MonthRange",  // 月份选择器
   data() {
      return {
         monthTime:'',
         pickerOptions: {
            shortcuts: [{
               text: '今天',
               onClick(picker) {
                  const end = new Date();
                  const start = new Date();
                  picker.$emit('pick', [start, end]);
               }
            },
               {
                  text: '昨天',
                  onClick(picker) {
                     const end = new Date();
                     const start = new Date();
                     start.setTime(start.getTime() - 3600 * 1000 * 24);
                     end.setTime(end.getTime() - 3600 * 1000 * 24);
                     picker.$emit('pick', [start, end]);
                  }
               }, {
                  text: '最近7天',
                  onClick(picker) {
                     const end = new Date();
                     const start = new Date();
                     start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                     picker.$emit('pick', [start, end]);
                  }
               }, {
                  text: '最近30天',
                  onClick(picker) {
                     const end = new Date();
                     const start = new Date();
                     start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                     picker.$emit('pick', [start, end]);
                  }
               }, {
                  text: '本月',
                  onClick(picker) {
                     const end = getCurrentMonthLast()
                     const start = getCurrentMonthFirst()
                     picker.$emit('pick', [start, end])
                     function getCurrentMonthFirst() {
                        const date = new Date();
                        console.log(date)
                        date.setDate(1);
                        return date
                     }
                     // 获取当前月的最后一天
                     function getCurrentMonthLast() {
                        const date = new Date();
                        let currentMonth = date.getMonth();
                        const nextMonth = ++currentMonth;
                        const nextMonthFirstDay = new Date(date.getFullYear(), nextMonth, 1);
                        const oneDay = 1000 * 60 * 60 * 24;
                        return new Date(nextMonthFirstDay - oneDay);
                     }

                  }
               },{
                  text: '上月',
                  onClick(picker) {
                     const end = gettimeEnd();
                     const start = gettimeStart();
                     picker.$emit('pick', [start, end]);
                     function gettimeStart() {
                        const nowdays = new Date();
                        let year = nowdays.getFullYear();
                        let month = nowdays.getMonth();
                        if (month === 0) {
                           month = 12
                           year = year - 1
                        }
                        if (month < 10) {
                           month = '0' + month
                        }
                        let firstDayOfPreMonth = year + '-' + month + '-' + '01';
                        firstDayOfPreMonth = firstDayOfPreMonth.toString();
                        return new Date(firstDayOfPreMonth);
                     }
                     function gettimeEnd() {
                        const nowdays = new Date();
                        let year = nowdays.getFullYear();
                        let month = nowdays.getMonth();
                        if (month === 0) {
                           month = 12
                           year = year - 1
                        }
                        if (month < 10) {
                           month = '0' + month
                        }
                        const lastDay = new Date(year, month, 0);
                        let lastDayOfPreMonth = year + '-' + month + '-' + lastDay.getDate();
                        lastDayOfPreMonth = lastDayOfPreMonth.toString();
                        return new Date(lastDayOfPreMonth);
                     }
                  }
               }, ]
         },
      }
   },

   methods: {
      dataTimeChange(){
         // console.log(this.monthTime);
         this.$emit('FnSonMonth',this.monthTime);
      },
   },
   created() {

   },
}
</script>
