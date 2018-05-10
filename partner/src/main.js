// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'
// import 'we-vue/lib/style.css'
import {Radio,Checkbox,CheckboxButton,CheckboxGroup} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'weui/dist/style/weui.min.css'
import vueCityPicker from 'vue-city-bspicker'
// import 'Font-Awesome/css/font-awesome.min.css'
// Vue.use(vuex);
// 按需引入element ui
Vue.use(Radio);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
// Vue.use(WeVue)
Vue.config.productionTip = false;

axios.defaults.timeout = 10000;
// axios.defaults.baseURL = 'http://golive-xess.dev.haokefuns.com';
Vue.prototype.$http = axios;




Vue.filter('currency', function(price, sign, len) {
  // 保证是正数
  price =  Math.abs(price);
  // 默认值
  // sign = sign || '￥';
  // len = len || 2;
  //  每三位加上一个,
  // 我们可以将价格转化成数组，每三位加上,
  var arr = String(parseInt(price)).split(''); // [1, 2, ',', 3, 4, 5, ',', 6, 7, 8]

  // 添加了成员后面的位置变了，所以从后向前遍历
  // 1 倒数第三个开始处理，首位不能添加
  for (var i = arr.length - 3; i > 0; i -= 3) {
    // 添加,
    arr.splice(i, 0, ',')
  }
  // 转化成小数 原数字减去整数 保留len位小数，去掉整数部分
  var point;
  if((price - parseInt(price)+'').length>(len+2)){
    point= sign + arr.join('') +(price - parseInt(price)+'').substr(1,len+1)
  }else{
    point = sign + arr.join('') + (price - parseInt(price)).toFixed(len).slice(1)
  }
  return point;
  // return sign+price.toFixed(len)
  // console.log(arr)
  // 价格最前面要加上标志
});
Vue.filter('formDate',function (time) {
    // console.log(time)
    var d = new Date(time);
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = d.getDate() <10 ? '0' + d.getDate() : '' + d.getDate();
    var hour = d.getHours();
    var minutes = d.getMinutes()<10 ? '0' + d.getMinutes() : '' + d.getMinutes();
    var seconds = d.getSeconds();
    // console.log(d)
    return year+ '-' + month + '-' + day + ' ' + hour + ':' + minutes
})
Vue.filter('formDateAll',function (input) {
    var d = new Date(input);
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = d.getDate() <10 ? '0' + d.getDate() : '' + d.getDate();
    var hour = d.getHours();
    var minutes = d.getMinutes() <10 ? '0' + d.getMinutes() : '' + d.getMinutes();
    var seconds = d.getSeconds()<10 ? '0' + d.getSeconds() : '' + d.getSeconds();
    return year+ '-' + month + '-' + day + ' ' + hour + ':' + minutes+':'+seconds
 })
// 控制标题
Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.innerText
    el.remove()
  }
});
// input焦点
Vue.directive('focus', {
    // 当绑定元素插入到 DOM 中。

    inserted: function (el) {
        // 聚焦元素
        el.focus()
    },
    //也可以用update,update就是当页面有操作的时候就触发，比如点击按钮，输入框输入都算。
    //有一个要注意的就是，就是你页面有几个input,比如一个input绑定了v-focus,一个没有绑定。你在没绑定v-focus的input输入时，绑定了v-focus的input就是自动获取焦点，这是个bug.
    //update: function (el) {
        //el.focus()
    //}
});

// 路由切换重置滚动条
router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
