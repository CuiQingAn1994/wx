<template>
  <div class="site" >
    <div class="err" v-if="err">
      <p>服务器网络错误,请刷新重试!</p>
    </div>
    <div>
      <div v-title>商户中心</div>
      <div class="home-p1">
        <div class="wx_all">
          <div class="wx_img">
            <img :src="userHcb.avatar" alt=""></div>
          <div class="wx_msg">
            <div class="cert">
              <span>{{userHcb.nickname}}</span>
            </div>
            <div class="certMobile">{{userHcb.mobile}}</div>
          </div>
          <div class="idBox">
            <select class="identity" v-model="type">
              <option style="color:#333;" v-if="storeNo"  :value="storeNo">商家</option>
              <option style="color:#333;" v-if="agentNo"  :value="agentNo">代理</option>
              <option style="color:#333;" v-if="superNo" :value="superNo">总代</option>
            </select>
            <img class="switch" src="./down.png" alt="">
          </div>
        </div>
        <div class="top_content">
          <div class="box_left">
            <div class="title" >我的余额</div>
            <div class="balance"  v-if="!apply&&!err" >
              <span style="font-size:40px" >{{ balance | currency("",2)}}</span>
              元
            </div>
            <div class="balance" v-if="apply" >
              <span >-&nbsp;-&nbsp;</span>
            </div>
            <!-- <div class="tip" v-if="!apply&&!err" >结算日期: {{time}}</div>
          <div class="tip" v-if="apply||err">结算日期:-&nbsp;-</div>
          -->
        </div>
        <div class="box_btn">

          <a href="http://wxv3.hcb66.com/recharge/recharge.html">
            <div class="charge">充值</div>
          </a>
        </div>

      </div>
    </div>
    <div class="box_right">
      <div class="item" v-if="!apply&&!err" >
        本月收益 <b>{{topMoney |currency("",2)}}元</b>
      </div>
      <div class="item" v-if="apply||err" >
        本月收益 <b>-&nbsp;-</b>
      </div>
      <div class="item" v-if="!apply&&!err" >
        累计收益
        <b>{{total |currency("",2)}}元</b>
      </div>
      <div class="item" v-if="apply||err" >
        累计收益
        <b>-&nbsp;-</b>
      </div>

      <div class="item"  v-if="!apply&&!err">
        激活设备
        <b>{{deviceCount}}</b>
      </div>
      <div class="item"  v-if="apply||err">
        激活设备
        <b>-&nbsp;-</b>
      </div>
    </div>
    <div class="line"></div>
    <div class="home-tips" v-if="!apply">
      <div class="tips_box">
        <div class="marquee" >
          <img class="bugle" src="./bugle.png" alt="">
          <marquee>
            <span>{{chmessage}}</span>
          </marquee>
        </div>
      </div>
    </div>
    <div class="line"></div>
    <div class="home-menus ">
      <div v-if="!apply" class="content">
        <router-link to="/store/trace">
          <div class="item"  v-if="type==storeNo"  >
            <img src="./river.png" alt="">设备流水</div>
        </router-link>
        <router-link to="/equipmentList">
          <div class="item"  v-if="type==storeNo"  >
            <img src="./list.png" alt="">我的设备</div>
        </router-link>
        <!-- <router-link to="/jkcActive">
          <div class="item item2" @click="tools"   v-if="type==storeNo"  >
            <img src="./jkcActive.png" alt="">即开彩激活</div>
        </router-link> -->
        <!-- <router-link to="/noTicket">
          <div class="item item2"  v-if="type==storeNo" >
            <img src="./lotteryLogo.png" alt="">彩票订单</div>
        </router-link> -->
        <router-link to="/prizeOrder/all/0">
          <div class="item item2"  v-if="type==storeNo" >
            <img src="./prizeOrder.png" alt="">奖品订单</div>
        </router-link>
        <router-link to="/uploadList">
          <div class="item item2"  v-if="type==storeNo" >
            <img src="./manage.png" alt="">奖品管理</div>
        </router-link>
        <!-- <router-link to="/modes">
          <div class="item item2"  v-if="type==storeNo" >
            <img src="./change.png" alt="">彩票模式管理</div>
        </router-link> -->
        <router-link to="/popularize">
          <div class="item item2"  v-if="type==storeNo" >
            <img src="./tgy.png" alt="">推广源管理</div>
        </router-link>
        <!-- 代理列表 -->
         <router-link to="/myShop">
          <div class="item item2"  v-if="type==superNo" >
            <img src="./tgy.png" alt="">我的代理</div>
        </router-link>
        <!-- 商家列表 -->
         <router-link to="/myShop">
          <div class="item item2"  v-if="type==agentNo" >
            <img src="./tgy.png" alt="">我的商家</div>
        </router-link>
        <router-link to="/eventList">
          <div class="item item2"  v-if="type==storeNo||type==superNo||type==agentNo" >
            <img src="./expand.png" alt="">创建比赛</div>
        </router-link>
          <!-- by add zhanghaitao 2018/3/1 彩票业务相关模块 -->

          <!-- <div @click="tools" class="item"  v-if="agentNo"  >
          <img src="./detail.png" alt="">我的收益</div>
        <div @click="tools" class="item"  v-if="agentNo"  >
          <img src="./tx.png" alt="">我的商家</div>
        <div @click="tools" class="item"  v-if="agentNo"  >
          <img src="./detail.png" alt="">商家收益</div>
        <div @click="tools" class="item"  v-if="agentNo"  >
          <img src="./list.png" alt="">设备列表</div>
        <div @click="tools" class="item"  v-if="agentNo"  >
          <img src="./detail.png" alt="">设备收益</div>
        <div @click="tools" class="item"  v-if="agentNo"  >
          <img src="./list.png" alt="">设备流水</div>
        <div @click="tools" class="item"  v-if="agentNo"  >
          <img src="./detail.png" alt="">我的收益</div>
        <div @click="tools" class="item"  v-if="superNo"  >
          <img src="./tx.png" alt="">我的代理</div>
        <div @click="tools" class="item"  v-if="superNo"  >
          <img src="./detail.png" alt="">代理收益</div>
        <div @click="tools" class="item"  v-if="superNo"  >
          <img src="./shop.png" alt="">我的商家</div>
        <div @click="tools" class="item"  v-if="superNo"  >
          <img src="./yue.png" alt="">商家收益</div>
        <div @click="tools" class="item"  v-if="superNo"  >
          <img src="./list.png" alt="">设备列表</div>
        <div @click="tools" class="item"  v-if="superNo"  >
          <img src="./detail.png" alt="">设备收益</div>
        <div @click="tools" class="item"  v-if="superNo"  >
          <img src="./detail.png" alt="">设备流水</div>
        -->
    </div>
    <div class="mt" v-if="apply" @click="disappear" >
      <img src="./arrows.png" alt="" class="arrow">
      <img src="./text.png" alt="" class="text">
    </div>
    <div class="apply" v-if="apply" >
      <router-link  to="/certification" >
        <div class=" certification_btn">申请认证</div>
      </router-link>
    </div>
      <!--   <div class="certificating" v-if="role == 'wait'">
      <img src="./time.png" class="time" alt="">
      <p class="certTitle">认证审核中</p>
      <p class="answer">我们将在1-3个工作日内完成审核</p>
    </div>
    -->
    </div>
  </div>
  <loading v-if="zhuan"></loading>
  <div class="tol" v-if="tol" >
    <div class="tol_con">敬请期待!</div>
  </div>
</div>
</template>

<script>
import Loading from '../../components/loading'
  export default {
    components:{Loading},
    data(){
      return{
        userHcb:hcb.user(),
        storeNo:hcb.user().storeNo,
        agentNo:hcb.user().agentNo,
        superNo:hcb.user().superNo,
        idName:"",
        userMsg:"",
        apply:false,
        tol:false,
        appear:true,
        name:hcb.user().nickname,
        notice:"",
        zhuan:false,
        err:false,
        invite: false,
        phone:hcb.user().mobile,
        topMoney:0,
        total:0,
        type:store.get('role')?store.get('role'):hcb.user().superNo?hcb.user().superNo:hcb.user().agentNo?hcb.user().agentNo:hcb.user().storeNo,
        role:"9",
        roleNo:"",
        time:new Date(),
        chmessage:"[通告]庆祝和彩宝上市，凡提前预定新机型的用户可获得精美礼品一份.",
        deviceCount:0,
        aginTime:"",
        id:false,
        balance:0

      }
    },
    methods:{
      // 获取用户信息
      user:function(){
        var me = this;
        this.$http.post(_config.server+"/user/info",{uid:hcb.user().uid}).then(function(res){
          console.log(res)
          if(res.data.status==10000){
            setTimeout(function(){
              me.zhuan = false;
            }, 300)
            store.set('_user',res.data.data)
            me.userMsg = hcb.user()
            me.storeNo=hcb.user().storeNo
            me.agentNo=hcb.user().agentNo
            me.superNo=hcb.user().superNo
            me.identity();
            if(hcb.user().storeNo==""&&hcb.user().agentNo==""&&hcb.user().superNo==""){
              me.apply = true;
            }else{
              me.apply = false;
            }
          }
        },function(err){
          me.zhuan = false;
          me.err = true;
        })
      },
      // 身份
      identity:function(){
        if(store.get('role')){
          this.type = store.get('role');
          // alert('')
        }else{
          this.type = hcb.user().superNo?hcb.user().superNo:hcb.user().agentNo?hcb.user().agentNo:hcb.user().storeNo;
          store.set('role',this.type)
        }
        this.idName = this.type==this.storeNo?'商家':this.type==this.agentNo?'代理':'总代'
      },
      // 商家账户余额
      account:function(){
        var params = {
          roleType:this.type==hcb.user().superNo?'super':this.type==hcb.user().agentNo?'agent':'store',
          roleId:this.type
        }
         this.$http.post(_config.server+'/user/role/info',params).then(res=>{
          if(res.status==200&&res.data.status==10000){
              // console.log('商家余额',res)
              this.balance = res.data.data.balance;
          }
         },err=>{
            this.err = true;
            this.role = 'err';
            this.zhuan = false;
         })
      },
      // 敬请期待
      tools:function(){
        // console.log(111111111)
          this.tol=true;
          var that = this;
        setTimeout(function(){
          that.tol=false;

        }, 2000)
      },
      disappear:function(){
        this.appear = false;
      },
      // 设备激活
      // scanning:function(){
      //   console.log("1111111111")
      //     let _this = this;
      //   // let failureUrl = "http://wx.hcb66.com/partner/activation";
      //   let deviceNo = this.$route.query.deviceNo;
      //     wx.config({
      //       debug: false
      //     });
      //     wx.scanQRCode({
      //       needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
      //       scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
      //       success: function (res) {
      //         console.log(res)
      //         let result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
      //         _this.$router.push({path:'/scanSuccess?deviceNo='+result});
      //       }
      //     });
      // },
      // 收益
      loadCount:function(that){
        var user = hcb.user();
        var idNo = ""
        var url = "";
        if(this.type==user.superNo){
          url = "/settler/super/count";
          idNo = user.superNo;
        }
        else if(this.type==user.agentNo){
          url = "/settler/agent/count";
          idNo = user.agentNo;
        }
        else if(this.type==user.storeNo){
          url = "/settler/store/count";
          idNo = user.storeNo;
        }
        // console.log("_config.server",_config.server)
        // 本月收益
        that.$http.get(_config.server + url + "?id=" + idNo).then(function(res){
              console.log(res);
              setTimeout(function(){
                that.zhuan = false;
              }, 300)
              that.total = res.data.data.total.gold + res.data.data.total.point;
              that.topMoney = res.data.data.current.gold + res.data.data.current.point;
              console.log("根据roleNo:"+that.total)
              if( user.storeNo){
                 that.loadCountGolive(that);
              }

            },function (err){
              that.err = true;
              that.role = 'err';
          });
      },
      // 设备数
      loadCountGolive:function(that){
        var user = hcb.user();
        var params={}
        if(this.type==user.superNo){
          params = {
            superNo:user.superNo
          }
        }else if(this.type==user.agentNo){
           params = {
            agentNo:user.agentNo
          }
        }else if(this.type==user.storeNo){
           params = {
            storeNo:user.storeNo
          }
        }
        // console.log(params)
        that.$http.post(_config.server + "/user/device/list",params).then(res=>{
              // console.log(res)
              setTimeout(function(){that.zhuan = false;},300);
              // console.log(res)
              that.deviceCount = res.data.data.length
           },function (err){
              that.err = true;
              that.role = 'err';
              that.zhuan = false;
        });
      },
      // 结算日期
      getNextMonth:function(that) {
            var date=new Date();
            var nextMonthDay = new Date(date.getFullYear(),date.getMonth()+1,15);
            that.time = nextMonthDay.getFullYear() + "-" + (nextMonthDay.getMonth()+1) + "-" + nextMonthDay.getDate();
      },
      // 通告
      message:function(that){
        var user = hcb.user();
        this.$http.get(_config.server + "/message/query?uid=" + user.uid).then(function(res){
            console.log(res)
            that.chmessage = res.data.data.content
            setTimeout(function(){
              that.zhuan = false;
            }, 300)
        },function (err){
              that.err = true;
              that.role = 'err';
              that.zhuan = false;
        });
      }
    },
    created:function () {
      this.zhuan = true;
      this.account();
      this.user();
      this.getNextMonth(this);
      this.loadCount(this);
      // this.identity();
      // this.message(this);
    },
    watch:{
      type(){
        this.zhuan = true;
        this.account();
        this.user();
        this.getNextMonth(this);
        this.loadCount(this);
        store.set('role',this.type)
        this.idName = this.type==this.storeNo?'商家':this.type==this.agentNo?'代理':'总代'
      }
    }
  }
  // <style scoped lang="less"></script>
<style scoped lang="less">
  @import '../../../static/css/color.import.less';
   @-webkit-keyframes arrow{
    from {bottom:80px}
    to {bottom:65px}
  }
  *{
    font-family:PingFangSC-Semibold;
  }
  .tol{
    position:fixed;
    top:0;
    left:0;
    top:0;
    right:0;
    height:100%;
  }
  .tol_con{
   margin: 330px auto 0;
    width:150px;
    height:50px;
    color:#fff;
    line-height:50px;
    text-align:center;
    background:rgba(0,0,0,.7);
    border-radius:5px;
    font-size:14px;

  }

  .err {
     position:fixed;
     top:0;
     left:0;
     right:0;
     left:0;
     z-index:999999999999999;
  }
  .err p{
    font-size:14px;
    color:#FF565C;
    height:40px;
    line-height:40px;
    text-align:center;
    background:rgba(0,0,0,.6)

   }
  .site{
    height: 100vh;
    background: #fff;
  }
  .home-p1{
    background:#FFE000;
    width:100%;
    // padding:10px 0 ;
    position: relative;
    .wx_all{
      width:100%;
      padding:13px 15px 0;
      height:70px;
      background: #fff;
      overflow: hidden;
      .wx_img{
        width:44px;
        height:44px;
        border-radius: 50%;
        overflow:hidden;
        float: left;
        img{
          width:44px;
          height:44px;
          border-radius: 50%;
       }
      }
      .wx_msg{
        height:44px;
        float: left;
        margin-left:15px;
      }
      .idBox{
          float: right;
          width:80px;
          height:30px;
          box-sizing:border-box;
          border-radius:15px;
          overflow:hidden;
          position: relative;
          background-image:-webkit-linear-gradient(left,#FF5164,#FF7850);
        .identity{
            display:inline-block;
            width:60px;
            height:30px;
            background-image:-webkit-linear-gradient(left,#FF5164,#FF7850);
            font-size:12px;
            color:#fff;
            text-align:center;
            line-height:25px;
            margin-left:15px;
            border:none;
            outline:none;
            float: left;
            padding-bottom:1px;
            -webkit-appearance: none;
          }
        .switch{
          position: absolute;
          top:50%;
          right:15px;
          width:10px;
          transform:translateY(-50%)
        }
      }
    }
    .top_content{
      background:#FFDD00;
      overflow:hidden;
      padding:30px 15px 10px;

      .box_left{
        width:66.66666666%;
        float: left;
        .title{
            color:#333;
            text-algin:left;
            font-size:12px;
        }
        .balance{
          font-size:12px;
          height:46px;
          line-height:56px;
        }
        .tip{
          font-size:12px;
          height:40px;
          line-height: 40px;
        }

      }
      .box_btn{
        width:33.33333333%;
        height:105px;
        position: relative;
        float: left;
        .charge{
          position: absolute;
          right:0;
          top:20px;
          font-size:12px;
          height:38px;
          width:85px;
          border-radius:5px;
          background:#fff;
          line-height: 38px;
          text-align:center;
          color:#333;
        }
      }

    }
    .cert{
        font-size:12px;
        color:#333;
    }
  }
  .box_right{
        width:100%;
        color:#666;
        overflow:hidden;
        padding:0 15px 10px;
        background: #FFDD00;
        .item{
          width:33.33333333%;
          float: left;
          text-align: center;
          font-size:12px;
          color:#333;
          margin-bottom:15px;
          b{
            font-size:12px;
            color:#A68C00;
            display: block;
            width:100%;
            text-align: center;
            font-weight: normal;
          }
        }
      }


  .certMobile{
      font-size:12px;
      color:#999;
  }


  .home-menus{
    background:#fff;
    overflow:hidden;
    .content{
      overflow:hidden;
      width:100%;
       padding:10px 15px;
      .item{
        background:#fff;
        float:left;
        flex: 1;
        box-sizing: border-box;
        width:25%;
        height:100px;
        text-align: center;
        font-size:12px;
        line-height: 35px;
        color:#333;
        padding-top:20px;
        img{
          width:50px;
        }
        i{
          display: block;
          width:100%;
          font-size:35px;
          line-height: 45px;

        }
      }
      .item2{
        // border-right:1px dashed #eee;
      }
    }
    .certificating{
      padding-top:30px;
      .time{
        width:90px;
        display:block;
        margin:0 auto;
      }
      .fail{
        width:200px;
        margin:0 auto;
        display:block;
      }
      .certTitle{
        color:#333;
        font-weight:bold;
        text-align:center;
        font-size:18px;
        padding-top:30px;
      }
      .answer{
        font-size:14px;
        padding:0 30px;
        text-align:center;
        color:#999;
        padding-top:15px;
      }
    }
  }
  .home-menus .content .item{

  }
  .home-tips{
    width:100%;
    font-size:12px;
    color:#333;
    line-height: 44px;
    background: #f6f6f6;
    .tips_box{
        position: relative;
        top:-22px;
        width:100%;
        padding:0 15px;
        z-index:1;
        .marquee{
          position: relative;
          height:44px;
          background: #fff;
          border-radius: 30px;
          padding-left: 35px;
          padding-right: 25px;
        }
        .bugle{
          position: absolute;
          left:12px;
          top:14px;
          width:20px;
        }
    }
  }
  .warp {
    padding: 10px;
  }
  .section {
    background: #fff;
    padding: 10px;
    h1 {
      font-size: 16px;
      line-height: 40px;
      // border-bottom: 1px solid #ddd;
      padding: 0px 5px;
    }
    .static {
      padding: 20px 0;
      .item {
        text-align: center;
        font-size: 12px;
        line-height: 60px;
        b {
          font-weight: 800;
          font-size: 32px;
          color: @base;
          padding: 0px 10px;
        }
      }
    }
  }
  .list-block {
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    align-content: space-between;
    flex-wrap:  wrap;
    justify-content: flex-start;
    -webkit-transition: all .3s ease-in-out 0s;
    transition: all .3s ease-in-out 0s;
    padding: 10px 0;
    .item {
      width: 25%;
      padding: 10px ;
      .content {
        height: 300px;
        width:100%;
        background: #fff;
        -webkit-transition: all .3s ease-in-out 0s;
        transition: all .3s ease-in-out 0s;
        position: relative;
      }

      .app-bar{
        position: absolute;
        bottom: 0px;
        width:100%;
        left:0px;
        line-height: 30px;
        // border-top:1px solid #ddd;
        text-align: center;
      }
      .content:hover {
        -webkit-transition: all .3s ease-in-out 0s;
        transition: all .3s ease-in-out 0s;
      }
      .app-thumb{
        width:100%;
        height:180px;
        background-color:#ddd;
        background-size:100% auto;
        background-position: center;
        -webkit-transition: all .3s ease-in-out 0s;
        transition: all .3s ease-in-out 0s;
      }
      .app-action{
        -webkit-transition: all .3s ease-in-out 0s;
        transition: all .3s ease-in-out 0s;

      }
      .app-action:hover{
        -webkit-transition: all .3s ease-in-out 0s;
        transition: all .3s ease-in-out 0s;
        background:@base;
        color:#fff;
      }
      .app-name{
        padding:10px 10px 0 10px ;
        font-size:14px;
        font-weight:800;
        i{
          font-size:12px;
          color:#ddd;
          font-weight: 300;
        }
      }
      .app-summary{
        padding:0px 10px 10px 10px;
        color:#666;
      }
      .app-play{
        color:green;
      }
      .app-stop{
        color:red;
      }
    }

    .item:hover{

      -webkit-transition: all .3s ease-in-out 0s;
      transition: all .3s ease-in-out 0s;
      .app-thumb{
        background-size:105% auto;
        -webkit-transition: all .3s ease-in-out 0s;
        transition: all .3s ease-in-out 0s;
      }

    }

    .plus {
      cursor: pointer;
      text-align: center;
      color: #ddd;
      .content{
        padding-top: 100px;
        i {
          line-height: 100px;
          font-size: 80px;
        }
      }

    }
    .plus:hover {
      .content{
        background: @base;
        color: #fff;
      }
    }
  }
  .apply{
      width:100%;
      padding:0 15px;
      position: fixed;
      bottom:15px;
      left:0;
      right:0;
      z-index:2;
  }
  .mt{
      position: fixed;
      top:0;
      left:0;
      right:0;
      bottom:0;
      background:rgba(0,0,0,.6)
  }
  .arrow{
    width:40px;
    position: absolute;
    bottom:80px;
    right:60px;
    // animation: arrow 0.6s linear infinite;
    //  -webkit-animation: arrow 0.6s linear infinite alternate ;
  }
  .text{
    width:220px;
    position: absolute;
    bottom:130px;
    right:15px;
  }
  .certification_btn{
    width: 100%;
    height:44px;
    // margin: 100px auto 30px;
    // background: #dc6348;
    background-image:-webkit-linear-gradient(left,#FFEC1C ,#FFD40C);
    text-align:center;
    line-height:44px;
    color:#333;
    border-radius:5px;
    font-size:16px;
  }
  .certification_btn:active{
    background-color:#ea8872;
  }
  .under_review{
    width: 60%;
    margin: 100px auto 30px;
    text-align: center;
  }
  .item>img{
    width: 40%;
    display: block;
    margin: 0 auto 5px;
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
  .mb{
    margin-bottom:9.5px;
  }
  .el-input__inner{
    border:none;
  }
</style>