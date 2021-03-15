/** 字体 */
// fnResize();
//  window.onresize = function () {
//    fnResize()
//  };
//  function fnResize() {
//    let deviceWidth = document.documentElement.clientWidth || window.innerWidth;
//    console.log(deviceWidth);
//    if (deviceWidth >= 750) {
//      deviceWidth = 750;
//    }
//    if (deviceWidth <= 320) {
//      deviceWidth = 320
//    }
//    document.documentElement.style.fontSize = (deviceWidth / 7.5*2) + 'px';
//    console.log( document.documentElement.style.fontSize);
//  }

// let  screenWidth =  document.body.clientWidth;
// console.log(screenWidth);

// if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
//    alert('移动端')
// }

/** session 存储

 sessionStorage.setItem('currentIndex', 0)
 // 获取
 index=sessionStorage.getItem('currentIndex');
 // 删除一个
 sessionStorage.removeItem("currentIndex");
 // 删除全部
 sessionStorage.clear();

 //对象
 let obb = {
      name:'zhangyachoa',
      age:'18'
  }
 let str = JSON.stringify(obb)//把对象转化为字符串（stringify）存放进sessionStorage
 sessionStorage.setItem('obbj',str)

 JSON.parse(sessionStorage.getItem('obbj')

 */

import {get, post} from './axios';
import {Message} from 'element-ui';

// 全局 js
let localUrl = '';  //全局路径
let localOrigin = window.location.origin;
// console.log(localOrigin);
if (localOrigin == 'http://localhost:8282') {
   // localUrl = 'http://vikily.f3322.net:20000';
} else {
   localUrl = localOrigin;
}
console.log(localUrl);


/*elementui把上传的图片转为base64
https://blog.csdn.net/woshidamimi0/article/details/86082428
页面  直接 this.GLOBAL.getEleBase64调用
GLOBAL在main.js中声明了*/
function getEleBase64(file) {
   return new Promise(function (resolve, reject) {
      let reader = new FileReader();
      let imgResult = "";
      reader.readAsDataURL(file);
      reader.onload = function () {
         imgResult = reader.result;
      };
      reader.onerror = function (error) {
         reject(error);
      };
      reader.onloadend = function () {
         resolve(imgResult);
      };
   });
}

/*按钮点击状态 变化*/
function btnStateChange(that, id, val, state = true, time = 1500) {
   that[id][val] = state;
   // that[id].text = textTrue;
   setTimeout(() => {
      that[id][val] = false;
      // that[id].text = textFalse;
   }, time);

   /*使用方法  搜索中 记得加状态 true */
   //this.GLOBAL.btnStateChange(this,'loadState','searchLoad');
}

/* axios 成功回调后的 弹窗提示 和 刷新页面 */
function axiosSuc(that = this, msg = '成功', time = 1500) {
   Message({
      type: 'success',
      message: msg,
      duration: 1000,
      offset: 40,
   });
   setTimeout(() => {
      that.reLoad()
   }, time)
}

// 表单重置
// export function resetForm(that, refName) {
//    if (this.$refs[refName] !== undefined) {
//       that.$refs[refName].resetFields();
//    }
// }
export function resetForm(refName) {
   if (this.$refs[refName]) {
      this.$refs[refName].resetFields();
   }
}

export function isMobile() {
   return navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
}

export function  handleTree(data, id, parentId, children, rootId) {
   id = id || 'id'
   parentId = parentId || 'parentId'
   children = children || 'children'
   rootId = rootId || Math.min.apply(Math, data.map(item => { return item[parentId] })) || 0
   //对源数据深度克隆
   const cloneData = JSON.parse(JSON.stringify(data))
   //循环所有项
   const treeData = cloneData.filter(father => {
      let branchArr = cloneData.filter(child => {
         //返回每一项的子级数组
         return father[id] === child[parentId]
      });
      branchArr.length > 0 ? father.children = branchArr : '';
      //返回第一层
      return father[parentId] === rootId;
   });
   return treeData != '' ? treeData : data;
}


function FnDownload(content,filename){
   console.log(content)
   // const content = res.data
   const blob = new Blob([content])
   if ('download' in document.createElement('a')) {
      const elink = document.createElement('a')
      elink.download = filename
      elink.style.display = 'none'
      elink.href = URL.createObjectURL(blob)
      document.body.appendChild(elink)
      elink.click()
      URL.revokeObjectURL(elink.href)
      document.body.removeChild(elink)
   } else {
      navigator.msSaveBlob(blob, filename)
   }
}

export default {
   localUrl,
   getEleBase64: getEleBase64,
   btnStateChange: btnStateChange,
   axiosSuc: axiosSuc,
   resetForm,
   handleTree,

   FnDownload,
}