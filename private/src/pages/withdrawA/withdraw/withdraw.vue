<!-- 中奖提现 -->
<template>
  <!-- <section></section> -->
  <div class="withdraw">

    <div v-title>奖金提现</div>
    <loading v-if="zhuan"></loading>
   <!--  <div class="bg_zhuan" v-if="zhuan">
        <div class = "zhuan">
            <img src="./zhuan.png" alt="" class="icon_zhuan">
            <p>加载中...</p>
        </div>
    </div> -->
    <err v-if="err"></err>
    <div v-else> 
      <div class="line"></div>
      <section>
        <div class="withdraw_number">
          <p class="number">提现金额</p>
          <p class="withdraw_input"><em style="line-height:30px;">¥</em><input class="txInput" type="Number" placeholder="不少于1元" v-model="price"></p>
          <div class="line"></div>
        </div>
        <div class="withdraw_number withdraw_border">
          <span>可用金额</span>
          <span class="remaining"><em>{{all_price | currency("",2)}}</em>元</span>
          <span class="all" @click="allNumber()">全部提现</span>
        </div>
      </section>
      <div class="line"></div>
      <footer>
        <div class='h30'>
          
          <p class="tip1s" v-if="show">无法提现，提现金额不能少于1元</p>
          <p class="tip1s" v-if="showBig">无法提现，提现金额大于可用余额</p>
          <p class="tip1s" v-if="showWu">无法提现，提现金额不能大于20000元</p>
        </div>
        <!--<router-link to="/success">-->
          <span class="submit" :class="btn_bg?'abled':'disabled'"  @click="submit()">提现</span>
        <!--</router-link>-->
      </footer>
      <!-- <modals v-if="check" title="确认提现?"></modals> -->
      <div class="bg" v-if="tipsNo">
        <div class="recharge_no">
          <p class="bg_tips">提现失败</p>
          <img src="./failure.png" alt="" class="icon">
          <p class="bg_content">{{fail_msg}}</p>
          <button @click="modelHide()">确定</button>
        </div>
      </div>
       <div class="bg" v-if="check">
        <div class="recharge_no">
          <p class="name_tips">实名认证</p>
          <!-- <img src="./failure.png" alt="" class="icon"> -->
          <p class="bg_content"><input class="name" v-model="name" placeholder="请输入真实姓名" type="text"></p>
          <button @click="confirm()">确定</button>
        </div>
      </div>


    </div>
  </div>
</template>
<script>
  import Loading from '../../../components/loading'
  import Err from '../../../components/err/err'
  import Modals from '../../../components/modals/modals'
  export default {
    components:{Loading,Err,Modals},
    created(){
      this.rotate="rotate(45deg)"
      this.user = hcb.user();
      this.query();
    },
    updated (){
      // 判断是否输入金额
      if(this.price){
        this.btn_bg = true;
      }else{
        this.btn_bg = false;
      }
      if(this.price){
        // console.log(this.price.indexOf('.'))
        // 只允许输入两位小数
        if((this.price+'').indexOf('.')!=-1){
          var len = this.price.substring(this.price.indexOf('.')+1)
          console.log(len.substring(0,2))
          this.price =''+ parseInt(this.price)+'.'+len.substring(0,2)
        }
      }
    },
    data () {
      return{
        name:"",
        check:false,
        abled:"abled",
        disabled:"disabled",
        msg:"",
        send:false,
        err:false,
        zhuan:false,
        rotate:"rotate(0deg)",
        lock:true,
        price:"",
        all_price:0,
        show:false,
        showBig:false,
        showWu:false,
        tipsNo:false,
        btn_bg:false,
        fail_msg:""

      }
      
    },
    methods:{
      query(){
        var _this=this;
        this.zhuan = true;
        this.$http.post(_config.server+"/user/info",{uid:hcb.user().uid}).then(res=>{
               console.log(res)
           if(res.data.status==10000){
               var msg = res.data.data;
               console.log(msg)
               // msg.q="123"
               store.set('_user',msg);
                this.display = "block";
               this.all_price = res.data.data.balance;
               setTimeout(function(){
                   _this.zhuan = false;
               })           
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
      },
      allNumber(){
        this.price = ''+this.all_price;
      },
      submit(){
        let _this = this;
        if(!_this.price){
          return;
        }else{
            // 判断输入金额是否大于余额
            if(+_this.price>+_this.all_price){
              // console.log(_this.price)
              _this.showBig = true;
              setTimeout(()=>{
                _this.showBig = false;
                _this.price = "";
              },2000)
            }else{
              // 判断是否小于1
                if(+_this.price<1){
                  // console.log(_this.price)
                  this.show = true;
                  setTimeout(()=>{
                  _this.show = false;
                  _this.price = "";
                },2000)
              }
              // 是否大于500
              if(+_this.price>20000){
                  // console.log(_this.price)
                  this.showWu = true;
                  setTimeout(()=>{
                  _this.showWu = false;
                  _this.price = "";
                },2000)
              }
            }
           // 符合条件
            if(_this.price>=1&& _this.price<=_this.all_price&&_this.price<=20000){
              _this.check = true;
            }
        }
      },
      confirm(){
        var _this = this;
        _this.zhuan = true;
        var parmas = {
          // uid:'5a73e59d3f3c5e158287996a',
          uid:hcb.user().uid,
          num:this.price,
          name:this.name
        }  
        this.check = false;
        console.log("参数",parmas)
        this.$http.post(_config.server+"/user/withDrawals",parmas).then(res=>{
         console.log("提现",res)
         if(res.status==200&&res.data.status==10000){
            this.zhuan = false;
            this.$router.push({path:'/success'})
         }else{
          this.fail_msg = res.data.data
          this.zhuan = false;
          this.tipsNo = true;
         }
        })

      },
      cancel(){
        this.check = false;
        this.msg = "";
      },
      modelHide(){
        this.tipsNo = false;
        this.name = '';
      }
    }
  }
</script>

<style scoped>
  .withdraw{
    background: #fff;
    color: #D9D9D9;
  }
  .name{
    height:35px;
    font-size: 16px;
    padding-left:8px;
    border:1px solid #d9d9d9;
    outline: none;
    
  }
  .txInput{
    width:70%;
    outline: none;
    vertical-align: top;
    border: none;
    margin-left: 14px;
    /*margin-top: 3px;*/
    color: #333333;
    font-size: 16px;
    height:30px;
    line-height: 30px;
    -webkit-appearance: none;
  }
  /*没有银行卡*/
  .bank_mei{
    height: 50px;
    line-height: 50px;
    padding: 0 15px;
    font-size: 16px;
    /*border-bottom: 1px solid #dadcdf;*/
    background: white;
  }
  .bank_mei .mei_card{
    float: left;
    width: 30px;
    height: 30px;
    vertical-align: top;
    margin-top: 21px;
    margin-right: 15px;
  }
  .bank_mei .mei_more{
    float: right;
    /*width: 20px;*/
    height: 20px;
    vertical-align: top;
    margin-top: 26px;
  }
  .mei_detail{
    float: left;
  }
  a{
    color: #999999;
  }
  .card_add{
    text-align: left;
    height:42px;
    line-height: 72px;
    color:#333;
    font-size: 14px;
  }
  .card_name{
    margin-bottom: 5px;
    font-size: 14px;
    color:#333;
  }
  .card_number{
    font-size: 14px;
    color:#999;
  }

  /*有银行卡*/
  .bank_you{
    /*display: none;*/
    height: 76px;
    padding: 0 15px;
    font-size: 16px;
    /*border-bottom: 1px solid #dadcdf;*/
    background: white;
  }
  .bank_you .bank_card{
    float: left;
    width: 30px;
    height: 30px;
    vertical-align: top;
    margin-top: 21px;
    margin-right: 15px;
  }
  .bank_you .more{
    float: right;
    /*width: 20px;*/
    height: 20px;
    vertical-align: top;
    margin-top: 28px;
  }
  .card_detail{
    float: left;
    width: 70%;
    padding: 20px 0 10px;
    
  }
  .card_detail p{
    line-height: 16px;
    text-align: left;
    display: block;
    text-overflow:ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  /*.card_name{
    margin-bottom: 14px;
  }*/

  /*提现金额*/
  header{
    height:72px;
    margin-bottom: 9px;
    overflow: hidden;
    background: #fff;
    
  }
  section{
    height: 138px;
    padding: 0 0 0 15px;
    /*border-top: 1px solid #dadcdf;
    border-bottom: 1px solid #dadcdf;*/
    background: white;
  }
  .withdraw_number{
    width: 100%;
    text-align: left;
    padding-right:15px;
    color:#999999;
    /*box-sizing:border-box;*/
  }
  .number{
    font-size: 14px;
    color: #333;
    margin: 16px 0;
  }
  .withdraw_number span{
    font-size: 14px;
  }
  /*.withdraw_number input{
    outline: none;
    vertical-align: top;
    border: none;
    margin-left: 14px;
    margin-top: 1px;
    color: #999999;
  }*/
  input::placeholder{
    font-size: 14px;
  }
  .withdraw_number input::placeholder{
    color: #d0d0d0;
  }
  .withdraw_number input::-webkit-input-placeholder{
    color: #d0d0d0;
  }
  .withdraw_number input::-moz-placeholder{
    color: #d0d0d0;
  }
  .withdraw_number em{
    font-style: normal;
  }
  .remaining{
    margin-left: 14px;
    font-size: 16px;
  }
  .withdraw_border{
    padding: 16px 0;
  }
  .withdraw_input{
    height:41px;
    /*padding-bottom: 16px;*/
    /*border-bottom: 1px solid #dadcdf;*/
  }
  .all{
    float: right;
    color: #2A9FFF;
    padding:2px 15px 0 0;
  }

  /*提交*/
  footer{
    position: relative;
    /*padding-top: 72px;*/
    padding: 0 15px;
    background: #f6f6f6;
    height:110px;
  }
  .tip1s{
    /*position: absolute;*/
    text-align: left;
    color: #FF565C;
    line-height: 54px;
    font-size: 14px;
  }
  .submit{
    display: block;
    width: 100%;
    height: 44px;
    line-height: 44px;
    /*background: #ffe400;*/
    border-radius: 7px;
    color: #333;
    font-size: 16px;
    /*position: absolute;*/
    /*margin-top:64px;*/
    /*margin:0 15px;*/
    /*letter-spacing:10px;*/
  }
  .abled{
    background-image:-webkit-linear-gradient(left,#FFEC1C ,#FFD40C);
    
  }
  .disabled{
    background: #e5e5e5;
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
    font-weight: bold;
    font-size: 18px;
  }
  .name_tips{
    padding:22px 0 10px;
    color:#333;
    font-weight: bold;
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
    /*padding: 16px 0;*/
  }
  .icon{
    position: absolute;
    height:90px;
    left:50%;
    top:-45px;
    transform:translatex(-50%);
  }
  @-webkit-keyframes rotation{
    from {-webkit-transform: rotate(0deg);}
    to {-webkit-transform: rotate(360deg);}
  }
  .zhuan{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 60%;
    height: 25%;
    background: white;
    border-radius: 5px;
    color: #777777;
    padding: 25px 0;
  }
  .icon_zhuan{
    /*position: fixed;*/
    width:40px;
    left:0;
    right:0;
    top:0;
    bottom: 0;
    margin:auto;
    -webkit-transform: rotate(360deg);
    animation: rotation 3s linear infinite;
    -moz-animation: rotation 3s linear infinite;
    -webkit-animation: rotation 3s linear infinite;
    -o-animation: rotation 3s linear infinite;
  }
  .bg_zhuan{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index:99999;
  }
  .bg_zhuan .zhuan{
    background: rgba(0,0,0,0.6);
    color:#fff;
  }
  .bg_zhuan .zhuan .icon_zhuan{
    margin-bottom:15px;

  }
  .bg_content{
    /*margin-top: 2%;*/
    margin-top: 8px;
    font-size: 14px;
    color:#999;
    padding-bottom:20px;
  }
  button{
   /* position: absolute;
    left: 0;
    right: 0;
    bottom: 16px;*/
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
  /*手机验证码*/
   .send{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background: rgba(0,0,0,0.6);
  }
  .getCode{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 300px;
    height: 250px;
    background: white;
    border-radius: 5px;
    color: #333;
    padding-top: 10px;
    text-align: left;
    overflow: hidden;
    /*padding:10px 20px;*/
  }
  .getCode .inCode{
    height:42px;
    width:130px;
    float: left;
    /*background: #eff0f0;*/
  }
  .getCode input{
    /*width:40%;*/
    height:40px;
    width:130px;
    padding-left:10px;
    font-size: 16px;
    -webkit-appearance: none;
    outline: none;
    border:none;
    background: rgba(0,0,0,0)
  }
  .getCode input::input-placeholder{
    font-size: 16px
  }
  .getCode .code{
    float: right;
    width:130px;
    height:40px;
    margin-left:10px;
    border-radius: 5px;
    text-align: center;
    line-height: 40px;
  }
  .getCode .tipTitle{
    font-size :18px;
    padding-left:15px;
    color:#333;
    text-align: center;
    height:40px;
    line-height: 40px;
  }
  .getCode .warn{
    /*text-align: center;*/
    font-size: 16px;
    padding-left:20px;
    height:28px;
    line-height: 28px;
    color:#333;

  }
  .getCode .phone{
    padding-left:20px;
    font-size: 15px;
    height:28px;
    line-height: 28px;
    color: #333;
  }
  .getCode .codes{
    padding:0 15px;
    font-size: 15px;
    height:45px;
    line-height: 45px;
    color:#555555;
  }
  .getCode .tips{
    text-align: center;
    color:red;
    font-size: 14px;
    /*padding-top:10px;*/
    height:42px;
    line-height: 42px;
    text-align: left;
    padding-left: 15px;

  }
  .getCode .btn{
    position: absolute;
    padding:0 15px;
    width:100%;
    height:60px;
    bottom:0;
    left:0;
    overflow: hidden;
    line-height: 60px;
    text-align: center;
    color:#555555;
  }
  .getCode .btn .btn_w{
    width:130px;
    float: left;
    height:44px;
    line-height: 44px;
    margin-right:10px;
    border-radius: 5px;
    border:1px solid #d0d0d0;
  }

  .getCode .btn .btn_r{
    width:130px;
    height:44px;
    float: left;
     background-image:-webkit-linear-gradient(left,#FFEC1C ,#FFD40C);
    line-height: 44px;
    border-radius: 5px;
  }
  .h9{
    height:9px;
    background: #f6f6f6;
  }
  .h30{
    height:64px;
  }
</style>

