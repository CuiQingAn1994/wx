<template>
  <div class="recharge">
      <div v-title>中奖兑换</div>
      <!-- <loading v-if="zhuan"></loading> -->
    <section>
      <div class="recharge_number">
        <p class="number">兑换金额</p>
        <p class="recharge_input">
          <em style="line-height:33px; color:#333;">¥</em><input class="amount" type="Number" placeholder="不低于0.01元" v-model="price" >
          <span class="chongzhi">{{Math.round(price*100)}} 菜豆</span>
        </p>
        <div class="line"></div>
      </div>
      <div class="recharge_number recharge_border">
        <span>可用金额</span><span class="remaining"><em>{{all_price | currency("",2)}}</em>元</span>
      </div>
    </section>
      <div class="line"></div>
    <footer>
      <p class="tip1s" v-if="showBig">无法兑换，兑换金额大于可用余额</p>
      <p class="tip1s" v-if="showSmall">无法兑换，兑换金额小于0.01元</p>
      <!-- <p class="tip1s" v-if="showFive">无法兑换，兑换金额大于500元</p> -->
      <!--<router-link to="/success">-->
        <span class="submit" :class="btn_bg?'abled':'disabled'" @click="submit()">兑换</span>
      <!--</router-link>-->
    </footer>

    <!--模态框-->
    <div class="bg" v-if="tipsOk">
      <div class="recharge_ok">
        <img src="./success.png" alt="" class="icon">
        <p class="bg_tips">系统提示</p>
        <p class="bg_content">恭喜您兑换成功</p>
        <router-link to="/site">
          <button>确定</button>
        </router-link>
      </div>
    </div>
    <!-- <div class="bg" v-if="true"> -->
    <div class="bg" v-if="tipsNo">
      <div class="recharge_no">
        <img src="./failure.png" alt="" class="icon">
        <p class="bg_tips">系统提示</p>
        <p class="bg_content">兑换失败</p>
        <button @click="modelHide()">确定</button>
      </div>
    </div>
    <loading v-if="zhuan"></loading>
    <modals v-if="change" title="确认兑换?"></modals>
  </div>
</template>

<script>
    import Loading from '../../components/loading'
    import Modals from '../../components/modals/modals'
  export default {
    components:{Loading,Modals},
    created(){
      this.all_price = this.$route.query.gainBean;
      this.user = hcb.user();
      this.bean.userNo = this.user.uid;
      // this.bean.deviceNo = this.user.deviceNo;
      // this.zhuan = true;
      var me = this;
      // setTimeout(function(){
      //   me.zhuan = false;
      // },100)
    },
    updated(){
      if(this.price){
        this.btn_bg = true;
      }else{
        this.btn_bg = false;   
      }
      // 只允许输入两位小数
      if(this.price.indexOf('.')!=-1){
         var len = this.price.substring(this.price.indexOf('.')+1)
         console.log(len.substring(0,2))
        this.price =''+ parseInt(this.price)+'.'+len.substring(0,2)
       }
       console.log(this.price>this.all_price)
       console.log(this.price)
       console.log(this.all_price)
      if(+this.price>+this.all_price){
        console.log(222)
        this.price = this.all_price;
      }
    },
    data (){
      return{
        change:false,
        zhuan:false,
        price:"",
        all_price:300,
        showBig:false,
        showSmall:false,
        showFive:false,
        tipsOk:false,
        tipsNo:false,
        btn_bg:false,
        user:{},
        bean:{
          userNo:"",
          money:"",
//           deviceNo:"",
          isSignKey:"49EAF85F41694CE5A4DEEB7AE49022B9"
        }
      }
    },

    methods:{
      showTips(){
        this.price = "";
      },
      allNumber(){
        this.price = this.all_price;
      },
      modelHide(){
        this.tipsNo = false;

      },
      confirm(){
          this.zhuan = true;
          var params ={
            uid:hcb.user().uid,
            type:'bean',
            num:this.price
          }
          console.log(params)
          this.$http.post(_config.server +"/user/exchange/bean",params).then(res=>{
            this.zhuan = false;
            console.log(res)
            if(res.status==200&&res.data.status==10000){
              this.tipsOk = true;
              this.tipsNo = false;
              this.change = false;
            }else{
              this.tipsOk = false;
              this.tipsNo = true;
              this.change = false;
            }
            // setTimeout(function(){

            //   if(res.data.code=='0'&&res.data.msg=='success'){
            //     _this.zhuan = false;
            //     _this.tipsOk = true;
            //     _this.tipsNo = false;
            //   }else{
            //     _this.zhuan = false;
            //     _this.tipsOk = false;
            //     _this.tipsNo = true;
            //   }
            // }, 300)
          })
      },
      cancel(){
        // alert("取消兑换")
        this.change = false
        console.log(2222222)
      },
      submit(){
        let _this = this;
        if(!this.price){
          return;
        }
        if(+_this.price>+_this.all_price){
          _this.showBig = true;
          _this.showSmall = false;
          _this.showFive = false
          setTimeout(()=>{
            _this.showBig = false;
            _this.showFive = false;
            _this.showSmall = false;
            _this.price=""
          },2000)
        }else if(+_this.price<0.01){
          _this.showBig = false;
          _this.showSmall = true;
          _this.showFive = false
          setTimeout(()=>{
            _this.showBig = false;
            _this.showSmall = false;
            _this.showFive = false
            _this.price=""
          },2000)
        }else{
           
            this.change = true;
          }
        }
      },
    }
</script>

<style scoped>
  .recharge{
    width: 100%;
    height: 100vh;
    background: #fafafa;
    font-size: 16px;
    color: #333;
  }


  /*兑换金额*/
  section{
    padding: 0 15px;
    /*border-bottom: 1px solid #dadcdf;*/
    background: white;
  }
  .recharge_number{
    width: 100%;
    text-align: left;
    color:#999;
  }
  .number{
    font-size: 16px;
    color: #333;
    padding: 16px 0;
  }
  .recharge_number span{
    font-size: 12px;
  }
  .recharge_number .amount{
    width: 80%;
    outline: none;
    vertical-align: top;
    border: none;
    margin-left: 14px;
    /*margin-top: 3px;*/
    color: #333;
    font-size: 16px;
    height:40px;
    line-height: 40px;
    -webkit-appearance: none;
    /*font-size: 16px;*/
  }
  .recharge_number .amount::placeholder{
    color: #999;
  }
  .recharge_number .amount::-webkit-input-placeholder{
    color: #999;
  }
  .recharge_number .amount::-moz-placeholder{
    color: #999;
  }
  .recharge_number em{
    display: inline-block;
    font-style: normal;
    margin-top: 3px;
  }
  .remaining{
    margin-left: 14px;
  }
  .recharge_border{
    padding: 16px 0;
  }
  .recharge_input{
    height:47px;
    /*padding-bottom: 16px;*/
    /*border-bottom: 1px solid #dadcdf;*/
    position: relative;
  }
  .chongzhi{
    /*float: right;*/
    position: absolute;
    right:0;
    /*height: 25px;*/
    font-size: 12px;
    text-align: right;
    color: #2A9FFF;
    /*margin-top: 3px;*/
    font-style: normal;
    /*padding-top:5px;*/
    line-height: 40px;
  }

  /*提交*/
  footer{
    position: relative;
    margin-top: 52px;
    padding: 0 15px;
  }
  .tip1s{
    position: absolute;
    top: -42px;
    left: 0;
    right: 0;
    color: #FF565C;
    font-size: 14px;
    text-align: left;
    padding-left:15px;
  }
  .submit{
    display: block;
    width: 100%;
    height: 46px;
    line-height: 46px;
    /*background: #ffe400;*/
    border-radius: 5px;
    color: #333;
    /*letter-spacing:15px;*/
  }

  /*模态框*/
  .bg{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background: rgba(0,0,0,0.6);
  }
  .bg_tips{
    padding-top:60px;
    color:#333;
    font-size: 18px;
  }
  .recharge_ok,.recharge_no{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width:300px;
    height:200px;
    /*height: 25%;*/
    background: white;
    border-radius: 5px;
    color: #777777;
    box-sizing:border-box;
    padding:0 15px;
  }
  .icon{
    position: absolute;
    height:90px;
    left:50%;
    top:-45px;
    transform:translatex(-50%);
  }
  .bg_content{
     margin-top: 8px;
    font-size: 14px;
    color:#999;
    padding-bottom:20px;
  }
  button{
     width: 100%;
    height: 44px;
    line-height: 44px;
    margin: auto;
    border-radius: 5px;
    background-image:-webkit-linear-gradient(left,#FFEC1C ,#FFD40C);
    outline: none;
    border: none;
    color: #333;
    font-size: 16px;
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
  .abled{
    background-image:-webkit-linear-gradient(left,#FFEC1C ,#FFD40C);
    
  }
  .disabled{
    background: #e5e5e5;
  }
</style>
