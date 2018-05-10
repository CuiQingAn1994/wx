<template name="site">
    <section class="site" >
        <div v-title>个人中心</div>
        <div v-if="err" class="warn">
            <p>服务器网络错误,请刷新重试!</p>
        </div>
        <div >           
            <div class="header">
                <div class="wx_all">
                    <div class="wx_img"><img :src="user.avatar" alt=""></div>
                    <div class="wx_msg">       
                        <div class="cert">{{user.nickname}}</div>
                        <!-- <div class="cert" v-if="err"> --</div> -->
                        <div class="cert certMobile"> {{user.mobile}} </div>
                        <!-- <div class="cert" v-if="err" > -- </div> -->
                     </div>
                    <div v-if="tg" class="idBox">
                        推广源
                    </div>
                </div>
                <div class="header_content">
                    <div class="title">奖金</div>
                    <div class="balance" v-if="!err"><span>{{data.balance|currency("",2)}}</span> 元</div>
                    <div class="balance" v-if="err"><span>--</span> 元</div>
                    <div class="tx" @click="goWithdraw" >奖金提现</div>
                </div>
            </div>
            <div class="home-count ">

                <div class="item ">
                    <p>
                        <span class="name">积分</span></p>
                    <span class ="num" v-if="!err">{{Number(data.point) |currency("",0)}}</span>
                    <span class ="num" v-if="err">--</span>
                </div>
                <div class="item ">
                    <p>
                        <span class="name">金豆</span></p>
                    <span class ="num" v-if="!err">{{Number(data.gold) |currency("",0)}}</span>
                    <span class ="num" v-if="err">--</span>
                </div>         
            </div>
            <div class="line"></div>
            <div class="home-tips">
                    <div class="tips_box">
                        <div class="marquee" >
                           <img class="bugle" src="./site_img/bugle.png" alt=""> <marquee><span>{{notice.content}}</span></marquee>
                        </div>
                   </div>
            </div>
            <div class="line"></div>
            <div class="home-menus">
                <div class="content">
                    <router-link to="/bill">
                        <p class="item1" ><img src="./site_img/detail.png" alt="">流水明细</p>
                    </router-link>
                    <!--  <router-link to="/orders/0?order_status=">
                        <p class="item1" ><img src="./site_img/all.png" alt="">全部订单</p>
                    </router-link>
                    <router-link to="/orders/1?order_status=3">
                        <p class="item1" ><img src="./site_img/zj.png" alt="">中奖订单</p>
                    </router-link>
                    <router-link to="/orders/2?order_status=2">
                        <p class="item1" ><img src="./site_img/dkj.png" alt="">待开奖订单</p>
                    </router-link>
                    <router-link to="/orders/3?order_status=4">
                        <p class="item1"><img src="./site_img/wcg.png" alt="">未中奖订单</p>
                    </router-link> -->
                    <router-link :to="'/mallOrders?userId='+user.uid">
                        <p class="item1"><img src="./site_img/shop.png" alt="">我的奖品</p>
                    </router-link>
                    <router-link v-if="tg" :to="'/tgFacility'">
                        <p class="item1"><img src="./site_img/tgsb.png" alt="">推广的设备</p>
                    </router-link>
                    <router-link v-if="tg" :to="'/tgEarnings'">
                        <p class="item1"><img src="./site_img/tgsy.png" alt="">推广收益</p>
                    </router-link>
                </div>
            </div>
        </div>
        <loading v-if="zhuan"></loading>
        <div class="tol" v-if="tol" >
          <div class="tol_con">暂不开放!</div>
        </div>
    </section>
</template>
<script>
import Loading from '../../components/loading'
import Victory from '../../components/victory/victory'
    export default{
        components:{Loading,Victory},
        created(){
            this.zhuan = true;
            this.user = hcb.user()
            this.query();
    
        },
        methods:{
            // 获取用户信息
            query(){
                 var _this=this;
                 this.$http.post(_config.server+"/user/info",{uid:hcb.user().uid}).then(res=>{
                        // console.log(res)
                    if(res.data.status==10000){
                        var msg = res.data.data;
                        // console.log(msg)
                        // msg.q="123"
                        store.set('_user',msg);
                         this.display = "block";
                        this.data = res.data.data;
                        setTimeout(function(){
                            _this.zhuan = false;
                        }, 100)

                    }else{
                        _this.zhuan = false;
                        _this.err = true;
                        _this.display = "block";
                    }
                 },
                 function(err){
                     _this.display = "block";
                    _this.err = true;
                    console.log(_this.zhuan)
                    _this.zhuan = false;
                 })
                 this.$http.post(_config.server+'/promoter/check/user',{uid:hcb.user().uid}).then(res=>{
                    // console.log(res)
                    if(res.data.status==10000){
                        this.tg = true;
                    }else if(res.data.status==10001){
                        this.tg = false;
                    }
                 })
            },
            message(){
                this.$http.get(_config.server + "/message/query?uid=" + this.user.uid).then(res=>{
                    this.notice.content = res.data.data.content
                })
            },
            // 点击去提现
            goWithdraw(){
                this.$router.push({path:'withdraw'})
            },
            // 敬请期待
            tools(){
                console.log(111111111)
                this.tol=true;
                var that = this;
                setTimeout(function(){
                that.tol=false;

                }, 1000)
            },
        },
        data(){
            return {
                tol:false,
                warn:false,
                withdrawShow:false,
                zhuan:false,
                err:false,
                myWallet:{
                    userNo:"",
                    isSignKey:"49EAF85F41694CE5A4DEEB7AE49022B9"
                },
                user:{
                },
                data:{
                    gainBean:0,
                    caiDou:0,
                    kidneyBean:0,
                    golds:0,
                    couponNum:0
                },
                notice:{
                    content:'[通告]庆祝和彩宝上市，凡提前预定新机型的用户可获得精美礼品一份.'
                },
                display:"none",
                tg:false
            }
        }

    }

</script>
<style scoped>
    @import "../../../static/css/reset.css";
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
    .err img{
        padding-top:150px;
        padding-bottom:15px;
        width:50%;
    }
    .err p{
        font-size: 20px;
        color:#777;
    }
    .site{
        height:100vh;
        background: #fff;
    }
    .header{
        background:#FFDD00;
        width:100%;
        padding:0 0 15px;
        position: relative;
        /*border-bottom: 1px solid #f3d600;*/
    }
    .idBox{
          float: right;
          width:60px;
          height:25px;
          box-sizing:border-box;
          line-height: 25px;
          border-radius:15px;
          overflow:hidden;
          background-image:-webkit-linear-gradient(left,#FF5164,#FF7850);
          color:#fff;
          font-size: 12px;
    }
    .header_content{
        position: relative;
        padding-top:30px;
    }
    .title{
        font-size:12px;
        /*line-height: 20px;*/
        color:#333;
        width:100%;
        text-align: left;
        padding-left:15px;
    }
    .balance{
        text-align: left;
        padding-left:15px;
        color:#000;
        font-size: 12px;
        width:100%;
        height:56px;
        line-height: 56px;
    }
    .balance span{
        font-size:40px;
        color:#000;
    }

    .tip{
        padding-right:20px;
        font-size:12px;
        color:#333;
        text-align: right;
        width:50%;
        float: right;
    }
    .wx_all{
        width:100%;
        padding:13px 15px 0;
        height:70px;
        background: #fff;
        overflow: hidden;
    }
    .header_content .tx{
        /*float: right;*/
        position: absolute;
        top:40px;
        right:30px;
        width:85px;
        height:38px;
        background: #fff;
        /*border: 2px solid #FF565C;*/
        border-radius: 5px;
        font-size: 14px;
        line-height: 38px;
        color:#333;
    }
    .wx_all .wx_img{
        width:44px;
        height:44px;
        border-radius: 50%;
        overflow:hidden;
        float: left;
    }
    .wx_all .wx_img img{
        width:44px;
        height:44px;
        border-radius: 50%;
    }
    .wx_all .wx_msg{
        height:44px;
        float: left;
        margin-left:15px;
    }
    .cert{
        /*position: absolute;
        left:20px;
        bottom:10px;*/
        font-size:14px;
        color:#333;
        height:22px;
        line-height: 22px;
        /*width:50%;*/
        text-align: left;
    }
    .certMobile{
        color:#999;
    }

    .home-count{
        width:100%;
        padding:0px 0px 37px 0px;
        background:#FFDD00 ;
        overflow: hidden;
        position: relative;
        z-index:1;
    }
    .home-count div.item{
        float: left;
        width:50%;
        height:60px;
        font-size: 12px;
        background: #FFDD00;
        /*border-top:1px solid ;*/
    }
    .home-count div.item p{
        /*box-sizing:border-box;*/
        margin:0;
        height:30px;
        padding-top:8px;
        text-align: left;
        text-align: center;
    }
    .home-count div.item p .name{
        font-size: 12px;

    }
    .home-count .item{
        text-align: center;
        font-size:14px;
        /*border-left:1px dashed #eee;*/
    }
    .home-count .item span.num{
        font-size:14px;
        display: block;
        width:100%;
        /*text-align: center;*/
        line-height: 30px;
        color:#A68C00;
        /*font-weight: normal;*/
        text-align: center;
        
    }
    .home-count .item:first-child{
        border-left:0;
    }
    .home-menus{
        padding:0px 5px;
        background: #fff;
    }
    .home-menus .content{
        background:#fff;
        width:100%;
        padding:0 5px;
    }
    .home-menus .content .item1{
        box-sizing:border-box;
        float:left;
        width:25%;
        height:100px;
        text-align: center;
        font-size:12px;
        /*line-height: 60px;*/
        color:#333;
        padding-top:25px;
        
    }
  /*  .home-menus .content .item1 p{
        display: block;
        width:100%;
        font-size:35px;
        line-height: 45px;
        margin-bottom:0;

    }*/
    .home-menus .content .item1  img{

        height:50px;
        display: block;
        margin:0 auto;
        margin-bottom:12.5px;
    }
    .home-tips{
        width:100%;
        font-size:12px;
        line-height: 44px;
        width:100%;
        color:#333;
        background: #f6f6f6;

    }
    .home-tips .tips_box{
        position: relative;
        top:-22px;
        width:100%;
        padding:0 15px;
        z-index:1;
    }
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
        /*width:20px;*/
        /*display: block;*/
        width:20px;
    }
   /* .home-tips img{
        height:12px;
        float: left;margin-top:6.5px;

    }*/
    .home-tips p{
        text-overflow:ellipsis;
        overflow: hidden;
    }
    .warp {
        padding: 10px;
    }
    .section {
        background: #fff;
        padding: 10px;
    }
    .section h1 {
        font-size: 16px;
        line-height: 40px;
        border-bottom: 1px solid #ddd;
        padding: 0px 5px;
    }



    .home-exit{
       /* padding:0px;
        padding-top:15px;*/
        height:50px;
        line-height: 50px;
    }
    .home-exit div{
        display: block;
        width:100%;
        line-height: 45px;
        text-align: center;
        background:#fff;
        font-size: 14px;
        color:#777;
        border-top:1px solid #eee;
        border-bottom:1px solid #eee;

    }
    .home-exit div img{
        margin-top:18px;
        height:14px;
        margin-right:3%;

    }
    .warn{
        position: fixed;
        width:100%;
        height:100%;
        top:0;
        left:0;
        right:0;
        left:0;
        z-index:9;
    }
    .warn p{
        font-size:14px;
        color:#FF565C;
        height:40px;
        line-height:40px;
        text-align:center;
        background:rgba(0,0,0,.6)
    }
    .cut{
        height:44px;
        background: #f6f6f6;
    }
</style>
