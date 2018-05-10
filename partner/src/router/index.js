import Vue from 'vue'
import Router from 'vue-router'
import site from '../pages/site/site.vue'
import events from '../pages/events/events.vue'
import eventList from '../pages/events/eventList.vue'
// 商家
import certification from '../pages/shops/certification/certification.vue'
import scanSuccess from '../pages/shops/scanSuccess/scanSuccess.vue'
import equipmentList from '../pages/shops/equipmentList/equipmentList.vue'
import jkc from '../pages/shops/jkc/jkc/jkc.vue'
import myJkc from '../pages/shops/jkc/jkc/myJkc.vue'
import orderDetail from '../pages/shops/jkc/orderDetail/orderDetail.vue'
import form from '../pages/shops/jkc/form/form.vue'
import recDetail from '../pages/shops/jkc/recDetail/recDetail.vue'
import addAddress from '../pages/shops/jkc/addAddress/addAddress.vue'
import success from '../pages/shops/jkc/success/success.vue'
import addressList from '../pages/shops/jkc/addressList/addressList.vue'
import addressManage from '../pages/shops/jkc/addressManage/addressManage.vue'
import addressUpdate from '../pages/shops/jkc/addressUpdate/addressUpdate.vue'
import storeTrace from '../pages/shops/trace/index.vue'
import jkcActive from '../pages/shops/jkcActive/jkcActive.vue'
import popularize from '../pages/shops/popularize/popularize.vue'
// 商城
import upload from '../pages/shops/goods/upload.vue'
import uploadList from '../pages/shops/goods/uploadList.vue'
import uploadDetail from '../pages/shops/goods/uploadDetail.vue'
import prizeOrder from '../pages/shops/goods/prizeOrder.vue'
import all from '../pages/shops/goods/prizeChild/all.vue'
import unclaimed from '../pages/shops/goods/prizeChild/unclaimed.vue'
import finished from '../pages/shops/goods/prizeChild/finished.vue'
import prizeDetail from '../pages/shops/goods/prizeDetail.vue'
// 彩票模块
import lotteryOrderList from '../pages/lottery/order.vue'
import lotteryOrderDetail from '../pages/lottery/detail.vue'
// 彩票模式管理
import modes from '../pages/lottery/modes.vue'
// 代理
import shopIncome from '../pages/agency/shopIncome/shopIncome.vue'
// 总代理

// 商家/代理/总代充值
import recharge from '../pages/recharge/recharge.vue'

// 我的商家/代理
import myShop from '../pages/agency/myShop/myShop'



Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'site',
    },
    // 首页
    {
      path: '/site',
      name: 'site',
      component: site
    },
    {
      path: '/events',
      name: 'events',
      component: events
    },
      {
      path: '/eventList',
      name: 'eventList',
      component: eventList
    },
    // ------------------------------商户--------------------------------------------------
    // ------------------------------商户--------------------------------------------------
    {
      path: '/certification',
      name: 'certification',
      component: certification
    },
    // {
    //   path: '/activation',
    //   name: 'activation',
    //   component: activation
    // },
    {
      path: '/scanSuccess',
      name: 'scanSuccess',
      component: scanSuccess
    },
    {
      path: '/equipmentList',
      name: 'equipmentList',
      component: equipmentList
    },
     {
      path: '/jkc/:pages',
      name: 'jkc',
      component: jkc
    },
    {
      path: '/myJkc/:pages',
      name: 'myJkc',
      component: myJkc
    },
     {
      path: '/orderDetail',
      name: 'orderDetail',
      component: orderDetail
    },
     {
      path: '/form',
      name: 'form',
      component: form
    },
     {
      path: '/recDetail',
      name: 'recDetail',
      component: recDetail
    },
     {
      path: '/store/trace',
      name: 'storeTrace',
      component: storeTrace
    },{
      path: '/addAddress',
      name: 'addAddress',
      component: addAddress
    },
     {
      path: '/success',
      name: 'success',
      component: success
    },
     {
      path: '/addressList',
      name: 'addressList',
      component: addressList
    },
    // 地址管理
     {
      path: '/addressManage',
      name: 'addressManage',
      component: addressManage
    },
    // 添加地址
     {
      path: '/addressUpdate',
      name: 'addressUpdate',
      component: addressUpdate
    },
     {
      path: '/jkcActive',
      name: 'jkcActive',
      component: jkcActive
    },
    // 推广源
    {
      path: '/popularize',
      name: 'popularize',
      component: popularize
    },
    // 彩票模块
     {
      path: '/lotteryOrderList',
      name: 'lotteryOrderList',
      component: lotteryOrderList,
      children:[
        {
          path: '/noTicket',
          component: resolve => require(['../pages/lottery/orderComponents/noTicket/noTicket.vue'], resolve)
        },
        {
          path: '/alreadyIssued',
          component: resolve => require(['../pages/lottery/orderComponents/alreadyIssued/alreadyIssued.vue'], resolve)
        },
        {
          path: '/refunded',
          component: resolve => require(['../pages/lottery/orderComponents/refunded/refunded.vue'], resolve)
        },
      ]
    },
    {
      path: '/lotteryOrderDetail/:id',
      name: 'lotteryOrderDetail',
      component: lotteryOrderDetail
    },
    // 彩票模式管理
    {
      path: '/modes',
      name: 'modes',
      component: modes
    },
    // -----------------------------------代理------------------------------
    // -----------------------------------代理------------------------------
    {
      path: '/shopIncome',
      name: 'shopIncome',
      component: shopIncome
    },
    {
      path: '/recharge',
      name: 'recharge',
      component: recharge
    },
    // 商家上传商品
     {
      path: '/upload',
      name: 'upload',
      component: upload
    },
     {
      path: '/uploadList',
      name: 'uploadList',
      component: uploadList
    },
    {
      path: '/uploadDetail',
      name: 'uploadDetail',
      component: uploadDetail
    },
     {
      path: '/prizeDetail',
      name: 'prizeDetail',
      component: prizeDetail
    },
    {
      path: '/prizeOrder',
      name: 'prizeOrder',
      component: prizeOrder,
      children:[
          { path: 'all/:id', component: all},
          { path: 'unclaimed/:id', component: unclaimed},
          { path: 'finished/:id', component: finished},
      ]
    },
     // 我的代理/商家
     {
      path: '/myShop',
      name: 'myShop',
      component: myShop,
    },
  ]
})
