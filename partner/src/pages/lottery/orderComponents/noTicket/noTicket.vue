<template>
    <div class="order">
      <div v-title>待出票</div>
      <loading v-if="zhuan"></loading>
      <!--未出票列表-->
      <div v-if="new_o">
        <err v-if="new_err"></err>
        <div v-else>
          <space v-if="new_show"></space>
          <div v-else>
            <ul>
              <li class="list" v-for="(item,index) in lottery">
                <div class="title"><span>订单号: {{item.orderNumber}}</span><span class="species">{{item.creat_time}}</span>
                </div>
                <p class="line"></p>

                <!--数字类彩票样式-->
                <div class="content" v-if="item.lotteryName == '11选5'||item.lotteryName == '大乐透'">
                  <p class="date">第{{item.issueNumber}}期<span class="species2">{{item.lotteryName}}</span></p>
                  <p class="line"></p>
                  <ul>
                    <li class="content_list" v-for="(code,indexCode) in item.tableData">
                      <p class="betting_num" v-if="item.lotteryName=='11选5'" v-show="code.playName==1||code.playName==2||code.playName==3||code.playName==4||code.playName==5||code.playName==6||code.playName==7||code.playName==8||code.playName==11||code.playName==12">彩票号码&nbsp;:<span class="num" v-for="(itemCode,indexCode) in code.code">{{itemCode}}</span></p>
                      <p class="betting_num" v-if="item.lotteryName=='11选5'" v-show="code.playName==9||code.playName==10">彩票号码&nbsp;:<span class="qianer_num" v-for="(itemCode,indexCode) in code.code">{{itemCode}}</span></p>
                      <p class="betting_num" v-if="item.lotteryName=='大乐透'">彩票号码&nbsp;:<span class="num" v-for="(redball,indexCode) in code.redBall">{{redball}}</span><span class="numBlue" v-for="(blueball,indexCode) in code.blueBall">{{blueball}}</span></p>
                      <p class="multiple">彩票倍数&nbsp;:{{code.investCount}}注{{code.multiple}}倍</p>
                      <!--<p>金额: {{code.money}}元</p>-->
                      <p v-if="item.lotteryName=='11选5'">
                        <span>玩&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;法&nbsp;:</span>
                        <!-- 11选5玩法 -->
                        <span v-show="code.playName==1">前一</span>
                        <span v-show="code.playName==2">任二</span>
                        <span v-show="code.playName==3">任三</span>
                        <span v-show="code.playName==4">任四</span>
                        <span v-show="code.playName==5">任五</span>
                        <span v-show="code.playName==6">任六</span>
                        <span v-show="code.playName==7">任七</span>
                        <span v-show="code.playName==8">任八</span>
                        <span v-show="code.playName==9">前二直选</span>
                        <span v-show="code.playName==10">前三直选</span>
                        <span v-show="code.playName==11">前二组选</span>
                        <span v-show="code.playName==12">前三组选</span>
                      </p>
                      <p v-if="item.lotteryName=='大乐透'">
                        <span>玩&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;法&nbsp;:</span>
                        <!-- 大乐透玩法 -->
                        <span v-show="code.playName==1">普通</span>
                        <span v-show="code.playName==2">最佳</span>
                      </p>
                    </li>
                    <p class="line"></p>
                  </ul>
                </div>

                <!--竞猜类彩票样式-->
                <div class="content" v-if="item.lotteryName == '竞足'">
                  <p class="date">周三 002<span class="species2">竞彩足球</span></p>
                  <p class="line"></p>
                  <div class="content_list">
                    <p class="multiple">彩票方案&nbsp;:<span style="color: red">请在详情查看</span></p>
                    <p class="multiple">彩票倍数&nbsp;:{{item.tableData.investCount}}注{{item.tableData.multiple}}倍</p>
                  </div>
                  <p class="line"></p>
                </div>
                <p class="tel"><span>手机号: {{item.phone}}</span><span class="price">总金额: {{item.moneySum}}元</span></p>
                <p class="line"></p>
                <div class="operating">
                  <span class="end_btn" @click="openBtn(item,index)">完成出票</span>
                  <router-link :to="'/lotteryOrderDetail/' + item._id.$id + '?orderNumber=' + item.orderNumber">
                    <span class="detail_btn">订单详情</span>
                  </router-link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

    <modals v-if="modelShow" title="是否确认出票"></modals>
    </div>
</template>

<script>
  import Modals from '../../../../components/modals/modals'
  import Loading from '../../../../components/loading'
  import Space from '../../../../components/space/space'
  import Err from '../../../../components/err/err'
  export default{
    components:{Loading,Space,Err,Modals},
    data(){
      return {
        storeNo:hcb.user().storeNo,
        lottery:[], //未出票数据
        zhuan:false,
        new_show:false,
        new_err:false,
        new_o:true,
        id:'',
        modelShow:false,
        orderNumber:'',
        index:'', //当前点击出票下标
        pageLeft:1,
        timeLx:'',
      }
    },
    mounted(){
      this.query();
      //轮询
      this.timeLx = setInterval(() => {
        this.qLeft();
      },2000);
    },
    methods:{
      query(){
//        document.body.scrolltop = '0px';
        this.zhuan = true;
        this.qLeft();
      },
      qLeft(){
        this.times = 0;
        let _this = this;
        let params = {
          storeNo: this.storeNo,
          order_status: 1,
          page: this.pageLeft,
        };
        _this.$http.post(_config.lottery+'/happyEleven/GetOrderList',params).then((res)=>{
//           console.log(res.data.data);
          setTimeout(function(){
            _this.zhuan = false;
          },300);
          if(res.data.code == 0){
            let data1 = res.data.data;
            _this.lottery = JSON.parse(JSON.stringify(data1));
            _this.pageLeft = res.data.page;
          }
          if(res.data.code == 4){
            _this.new_show = true;
          }
        },(err)=>{
          console.log(err);
          _this.new_err = true;
          _this.zhuan = false;
        });
      },
      openBtn(item,index){
        this.modelShow = true;
        this.orderNumber = item.orderNumber;
        this.index = index;
      },
      bg(){
        this.modelShow = false;
      },
      cancel(){
        this.modelShow = false;
      },
      confirm(){
        this.modelShow = false;
        let _this = this;
        let params = {
          orderNumber:this.orderNumber
        };
        _this.zhuan = true;
        _this.$http.post(_config.lottery+'/happyEleven/updateOrderStatus',params).then((res)=>{
          // console.log(res.data);
          setTimeout(function(){
            _this.zhuan = false;
          }, 200)
          if(res.data.code == 0){
            this.lottery.splice(this.index,1);
            // console.log(this.lottery.length);
          }
        },(err)=>{
          console.log(err);
        })
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
  .list{
    background: white;
    border-bottom: 5px solid #e9e9e9;
  }
  .title{
    padding: 0 24px;
    width: 100%;
    height: 30px;
    line-height: 30px;
  }
  .species{
    float: right;
  }
  .species2{
    float: right;
    color: red;
  }
  .content{
    padding: 5px 24px 0;
  }
  .date{
    padding-bottom: 5px;
  }
  .content_list{
    margin: 10px 0;
  }
  .num{
    color: red;
    padding-right: 5px;
  }
  .qianer_num{
    display: inline-block;
    color: red;
    padding: 0 5px;
    border-right: 1px solid #999;
  }
  .qianer_num:last-child{
    border: none;
  }
  .numBlue{
    color: blue;
    padding-right: 5px;
  }
  .tel{
    padding: 5px 24px;
  }
  .price{
    float: right;
  }
  .operating{
    padding: 10px 24px 0;
    width: 100%;
    height: 50px;
  }
  .detail_btn,.end_btn{
    float: right;
    width: 80px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-image: -webkit-linear-gradient(left,#FFEC1C ,#FFD40C);
  }
  .detail_btn{
    color: #333;
  }
  .end_btn{
    margin-left: 20px;
  }
  .detail_btn:active,.end_btn:active{
    background: #ccc;
  }
</style>
