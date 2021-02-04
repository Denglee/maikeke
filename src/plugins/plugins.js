/*https://liubing.me/vue-auto-regist-global-component-and-plugin.html
1、项目中新建plugins目录，和components目录保持同级。
2、plugins目录中新建index.js
3、以引入element-ui为例：再在plugins目录中新建element.js
4、plugins目录中的index.js中引入element.js
5、main.js中引入plugins中的index.js
这样main.js看起来就清爽很多了，后面有新增的插件，只需要再plugins目录下新建相应的插件名称，然后在index.js中引入即可，再多的插件也可以很方便的进行维护。
*/

import Vue from 'vue'
import axios from 'axios';

/*引用axios*/
import Axios from 'axios'
Vue.prototype.$axios = Axios;
/*第一层if判断生产环境和开发环境*/
if (process.env.NODE_ENV === 'production') {
    /*第二层if，根据.env文件中的VUE_APP_FLAG判断是生产环境还是测试环境*/
    if (process.env.VUE_APP_FLAG === 'pro') {
        // console.log('production 生产环境发布 地址 线上 pro');
        // let localUrl2 = window.location.origin;
        Axios.defaults.baseURL = 'http://192.168.1.34:7040';//正式 路径
    } else {
        // console.log('production 生产环境发布 地址 线上 test');
        Axios.defaults.baseURL = 'http://192.168.1.30:9201';//测试环境路径
    }
} else {
    // console.log(' development (默认) dev 开发环境 本地 /api ');
    Axios.defaults.baseURL = '/apiTest';
}

/*Chrome51 版本以后，Chrome 增加了新的事件捕获机制－Passive Event Listeners；
* https://blog.csdn.net/weixin_40716786/article/details/90045802*/
import 'default-passive-events'

/*  A、 引入 element*/
import ElementUI from 'element-ui';
import '@/assets/theme/index.css'
Vue.use(ElementUI, {
    size: 'small'
});

/* 1、引入自定义的全局的css*/
import '@/assets/css/public.scss'
import '@/assets/css/page.scss'


/* 2.1、 全局 通用iframe 组件*/
// import publicIframe from '@/components/publicIframe/publicIframe'
// Vue.component(publicIframe.name,publicIframe);

/* 2.2、  引用 自定义  回到顶部*/
// import goTop from "@/components/goTop";
// Vue.component(goTop.name,goTop)



 /*6、 引入 moment 时间转换*/
/*凡是用的prototype 使用都要this.继承 console.log(this.$moment().format("YYYY-MM"));*/
import moment from 'moment'  //引用moment js
Vue.prototype.$moment = moment;//赋值使用
moment.locale('zh-cn');//需要汉化

// 6 moment 用法将时间戳转日期格式的 全局 过滤器
Vue.filter('dateFormat', (dataStr, pattern = 'YYYY-MM-DD') =>{
    return moment(dataStr*1000).format(pattern)
});
Vue.filter('timeFormat', (timeStr, pattern = 'YYYY-MM-DD') =>{
    return moment(timeStr).format(pattern)
});
Vue.filter('minuteFormat', (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') =>{
    return moment(dataStr*1000).format(pattern)
})
Vue.filter('tempTme', (dataStr) => {
    return dataStr*1000
});

// Vue.filter('mathFloor', (math) => {
//     return Math.abs(Number(math))
// });



/*8、引入v-charts 官网：https://v-charts.js.org/#/histogram*/
import VCharts from 'v-charts'
import VeLine from 'v-charts/lib/line.common'  //折线图
import VeBar from 'v-charts/lib/bar.common' //条形图
import VeHistogram from 'v-charts/lib/histogram.common' //柱状图
import VePie from 'v-charts/lib/pie.common' //饼图
import VeRing from 'v-charts/lib/ring.common' //环图
// import VeFunnel from 'v-charts/lib/funnel.common' //图

Vue.component(VeLine.name, VeLine);
Vue.component(VeBar.name, VeBar);
Vue.component(VeHistogram.name, VeHistogram);
Vue.component(VePie.name, VePie);
Vue.component(VeRing.name, VeRing);
// Vue.component(VeFunnel.name, VeLine);
Vue.use(VCharts);


/*9、old 打印   https://www.cnblogs.com/dhpong/p/10500370.html */
// import Print from 'vue-print-nb'
// Vue.use(Print);  //注册

/*9、打印   https://www.cnblogs.com/dhpong/p/10500370.html */
// import Print from '@/assets/js/print'
// Vue.use(Print);  //注册


/* 2、 引用 自定义 全局js*/
import GLOBAL from  '@/assets/js/global.js'
Vue.prototype.GLOBAL = GLOBAL;