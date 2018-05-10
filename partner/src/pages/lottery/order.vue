<template>
    <div class="order">
      <div v-title>彩票订单</div>
      <loading v-if="zhuan"></loading>
      <div class="header">
        <p class="tab" v-for="(item,index) in header" @click="choose(index,item)" :style="{borderBottomColor:routePath===item.path? '#FFD40C':'#fff',color:routePath===item.path? '#333':'#999'}">
          <span :style="{color:routePath===item.path? '#333':'#999'}">{{item.name}}</span>
          <!--<router-link :to="item.path"><span :style="{color:routePath===item.path? '#333':'#999'}">{{item.name}}</span></router-link>-->
        </p>
        <div class="line fd"></div>
      </div>
      <div class="height-50"></div>

      <router-view></router-view>
    </div>
</template>

<script>
  export default{
    data(){
      return {
        storeNo:hcb.user().storeNo,
        header:[
          {
            name:'待出票',
            path:'noTicket',
          },{
            name:'已出票',
            path:'alreadyIssued',
          },{
            name:'已退款',
            path:'refunded',
          },
        ],
        idx:0,
        routePath:this.$route.path.slice(1),
        lottery:[], //未出票数据
        lotteryRight:[], //已出票数据
        newLottery:[], //下滑分页数据
        zhuan:false,
        new_show:false,
        fin_show:false,
        new_err:false,
        fin_err:false,
        new_o:true,
        fin_o:false,
        id:'',
        modelShow:false,
        orderNumber:'',
        index:'', //当前点击出票下标
        pageLeft:1,
        pageRight:1,
        pageRefund:1,
        timeLx:'',
        timeStatus:true,
      }
    },
    methods:{
      choose(index,item){
        this.routePath = item.path;
        this.$router.replace({path:item.path});
      },
    },
  }
</script>

<style scoped>
  .order{
    width: 100%;
    height: 100vh;
    background: white;
    font-size: 14px;
  }
  .header{
     position: fixed;
     top:0;
     left: 0;
     width:100%;
     background: #fff;
     z-index:999999999;
     height:56px;
     overflow: hidden;
  }
  .tab{
    font-size: 14px;
    width:33.33%;
    text-align: center;
    height:55px;
    float: left;
    line-height:55px;
    border-bottom:2px solid #fff;
  }
  .tab a{
    display: inline-block;
    width:100%;
    height:55px;
  }
  .tab a span{
    display: inline-block;
    width:100%;
    height:55px;
  }
  .line{
    width: 100%;
    height: 1px;
    border-top: 1px solid #D9D9D9;
    color: #D9D9D9;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
  .fd{
    float: left;
  }
  .height-50{
    height: 56px;
  }
</style>
