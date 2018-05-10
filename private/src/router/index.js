import Vue from 'vue'
import Router from 'vue-router'
import Site from '../pages/site/site'
import Login from '../pages/login/login'
import Bill from '../pages/bill/bill'
import Orders from '../pages/list/orders/orders'
import Order from '../pages/list/order/order'
import addBankCard from '../pages/withdrawA/addBankCard/addBankCard'
import withdraw from '../pages/withdrawA/withdraw/withdraw'
import myBank from '../pages/withdrawA/myBank/myBank'
import success from '../pages/withdrawA/success/success'
import recharge from '../pages/recharge/recharge'
import mallOrders from '../pages/mallOrders/mallOrders'
import mallDetail from '../pages/mallOrders/mallDetail'
import jkc from '../pages/jkc/jkc'
import dlt from '../pages/dlt/dlt'
import card from '../pages/card/card'
// 推广的设备
import tgFacility from '../pages/popularize/tgFacility'
// 推广的收益
import tgEarnings from '../pages/popularize/tgEarnings'

Vue.use(Router);
import axios from 'axios'
Vue.prototype.$http = axios
// Vue.use($);

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'site',
      meta: {keepAlive: false}
    },
    // 首页
    {
      path: '/site',
      name: 'site',
      component: Site,
      meta: {keepAlive: false}
    },
    // 登录页
     {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {keepAlive: false}
    },
    // 流水明细
     {
      path: '/bill',
      name: 'bill',
      component: Bill,
      meta: {keepAlive: false}
    },
    // 全部订单
    {
      path: '/orders/:status',
      name: 'orders',
      component: Orders,
      meta: {keepAlive: true}
    },
     //订单详情
    {
      path: '/order',
      name: 'order',
      component: Order,
      meta: {keepAlive: false}
    },
    // 添加银行卡
    {
      path: '/addBankCard',
      name: 'addBankCard',
      component: addBankCard,
      meta: {keepAlive: false}
    },
   // 我的银行卡
    {
      path: '/myBank',
      name: 'myBank',
      component: myBank,
      meta: {keepAlive: false}
    },
    // 提现成功
    {
      path: '/success',
      name: 'success',
      component: success,
      meta: {keepAlive: false}
    },
    // 提现
    {
      path: '/withdraw',
      name: 'withdraw',
      component: withdraw,
      meta: {keepAlive: false}
    },
    // 中奖兑换
    {
      path: '/recharge',
      name: 'recharge',
      component: recharge,
      meta: {keepAlive: false}
    },
    // 商城
    {
      path: '/mallOrders',
      name: 'mallOrders',
      component: mallOrders,
      meta: {keepAlive: false}
    }, {
      path: '/mallDetail',
      name: 'mallDetail',
      component: mallDetail,
      meta: {keepAlive: false}
    }, 
    // 兑奖记录
    {
      path: '/jkc',
      name: 'jkc',
      component: jkc,
      meta: {keepAlive: false}
    },
    {
      path: '/dlt',
      name: 'dlt',
      component: dlt,
      meta: {keepAlive: false}
    },
    {
      path: '/card',
      name: 'card',
      component: card,
      meta: {keepAlive: false}
    },
    // 推广的设备
    {
      path: '/tgFacility',
      name: 'tgFacility',
      component: tgFacility,
      meta: {keepAlive: false}
    },
    // 推广的收益
    {
      path: '/tgEarnings',
      name: 'tgEarnings',
      component: tgEarnings,
      meta: {keepAlive: false}
    },
   


  ]
})

