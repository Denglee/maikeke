<template>
  <div id="app">
<!--    <router-view v-if="isRouterAlive" :key="key"/>-->
    <router-view ></router-view>

  </div>
</template>

<script>
export default {
  name:"App",
  /*声明reload方法，控制router-view的显示或隐藏，从而控制页面的再次加载*/
  provide(){
    return{
      reLoad:this.reLoad,
    }
  },

  data(){
    return {
      isRouterAlive:true,
    }
  },
  computed: {
    key() {
      return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
    }
  },

  methods:{
    /*刷新方法*/
    reLoad(){
      this.isRouterAlive = false;
      this.$nextTick(()=>{
        this.isRouterAlive = true;
      })
    },

  },
  created(){
    // const { Producer  } = require("apache-rocketmq");
    // const producer = new Producer("GROUP_ID", "INSTANCE_NAME", {
    //   nameServer: "127.0.0.1:9876",
    // });

    // producer.start().then((res) => {
    //   console.log(res);
    // }).catch(err => {
    //   console.log(res);
    // });
  },


}

/*
* App 页面申明
* 其他页面使用：
*inject:['reLoad'], //注入依赖 App 中的reLoad方法
* methods:{
* shuain:{
* this.reLoad();  //直接调用就好
* }
* }
* */
</script>

