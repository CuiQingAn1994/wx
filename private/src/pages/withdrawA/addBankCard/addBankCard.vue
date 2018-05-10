<template>
  <div class="addbankcard">
    <div v-title>添加银行卡</div>
    <div class="line"></div>
    <section>
      <p class="left box" :class="{'active': nameBorder}"><span>开户银行</span>
        <!-- <input type="text" placeholder="例：平安银行"  @focus="borderName()"> -->
        <select   v-model="bankCode">
          <option  v-for="(value,key) in bankList" :value="key">{{value}}</option> 
        </select>
        <img class="down" src="./down.png" alt="">
        <!-- span class="pull">工商银行</span>
        <ul class = "select">
          <li class="option" v-for="(value,key) in bankList">{{value}}</li>
        </ul> -->
       <!--  <div class="weui-cell__hd">
                    <select class="weui-select" name="select2">
                        <option value="1">+86</option>
                    </select>
        </div> -->
      </p>
      <div class="line"></div>
      <!-- <p class="left" :class="{'active': bankBorder}"><span>开户支行</span>
        <input type="text" placeholder="例:北京国贸支行" v-model="bankBranch" @focus="borderBank()">
        
      </p>
      <div class="line"></div> -->
      <p class="left" :class="{'active': redBorder}"><span>银行卡号</span><input type="text" placeholder="请输入银行卡号" v-model="bankNo" @focus="borderShow()"></p>
      <div class="line"></div>
      <p class="left" :class="{'active': parsonBorder}"><span>持卡人姓名</span><input type="text" placeholder="请输入姓名" v-model="userName" @focus="borderParson()"></p>
      <div class="line"></div>
      <p class="left" :class="{'active': idBorder}"><span>身份证号</span><input type="text" placeholder="请输入身份证号" v-model="idCard" @focus="borderId()"></p>
      <div class="line"></div>
    </section>
    <footer>
      <p class="tips" v-if="show">{{tipsRed}}</p>
      <p class="tips" v-if="show">{{tipsRedId}}</p>
      <span class="submit"  :class="btn_bg?'abled':'disabled'"  @click="addBank(idCard,bankNo)">{{change}}</span>
        <!-- <h1 >银行:{{bankCode}}</h1> -->
    </footer>

    <!--模态框-->
    <div class="bg" v-if="tipsOk">
    <!-- <div class="bg" v-if="true"> -->
      <div class="recharge_ok">
        <img src="./success.png" alt="" class="icon">
        <p class="bg_tips">系统提示</p>
        <p class="bg_content">恭喜您{{change}}银行卡成功</p>
        <router-link :to="'/withdraw'">
          <button>确定</button>
        </router-link>
      </div>
    </div>
    <!-- <div class="bg" v-if="true"> -->
    <div class="bg" v-if="tipsNo">
      <div class="recharge_no">
        <img src="./failure.png" alt="" class="icon">
        <p class="bg_tips">系统提示</p>
        <p class="bg_content">{{change}}银行卡失败</p>
        <button @click="modelHide()">确定</button>
      </div>
    </div>
    <!-- <div class="bg_zhuan" v-if="zhuan">
      <div class = "zhuan">
          <img src="./zhuan.png" alt="" class="icon_zhuan">
          <p>加载中...</p>
      </div>
    </div> -->
    <loading v-if="zhuan"></loading>
  </div>
</template>
<script>
 import Loading from '../../../components/loading'
  export default {
     components:{Loading},
    mounted (){
      var me = this;
      this.user = hcb.user();
      console.log(this.user)
      this.addbankcard.userNo = this.user.uid;
      this.addbankcard.deviceNo = this.user.deviceNo;
       if(this.$route.query.bankName==undefined){
          this.change = "添加";
       }else{
          this.change = "更改";

       }

      this.$http.post(_config.golive +"/lottery/bankList").then(function(res){
      // this.$http.post("http://golive-xess.dev.haokefuns.com/lottery/bankList").then(function(res){
        console.log(res)
        me.bankList = res.data
      })
    },
    updated (){
      // console.log( this.bankInfo)
      this.bankNo =this.bankNo.replace(/\s/g,'').replace(/[^\d]/g,'').replace(/(\d{4})(?=\d)/g,'$1 ');
      // 银行卡最多19位
      if(this.bankNo.length>23){
        this.bankNo = this.bankNo.substring(0,23)
      }
      // if(this.bankBranch && this.bankCode && this.bankNo && this.userName&& this.idCard){
      if(this.bankCode && this.bankNo && this.userName&& this.idCard){
          this.btn_bg = true;
      }else{
          this.btn_bg = false;
      }
    },
    data(){
      return{
        zhuan:false,
        change:"",
        bankList:{},
        bankInfo:"",
        bankCode:"1001",
        bankBranch:"",
        addbankcard:{
          userNo:"",
          deviceNo:"",
          userName:"",
          bankInfo:"",
          bankCode:"",
          // bankBranch:"",
          bankNo:"",
          originType:"2",
          isSignKey:"49EAF85F41694CE5A4DEEB7AE49022B9"
        },
        user:{},
        userName:"",
        bankNo:"",
        idCard:"",
        // bankBranch:"",
        btn_bg:"",
        show:false,
        tipsRed:"",
        tipsRedId:"",
        nameBorder:false,
        bankBorder:false,
        redBorder:false,
        parsonBorder:false,
        idBorder:false,
        tipsOk:false,
        tipsNo:false,
        send:false

      }
    },
    methods:{
      addBank(idCard,bankNo){
        // 是否全部输入内容
        if(!this.btn_bg){
          return;
        }else{
          bankNo = bankNo.replace(/\s/g,"");
          console.log(bankNo) 
          this.luhmCheck(bankNo);
          if(this.send){
            var _this = this;
            
            // this.addbankcard.userName = this.userName;
            // console.log(this)
            // this.addbankcard.bankNo = this.bankNo;
            this.addbankcard.bankNo = this.bankNo.replace(/\s/g,"");
            console.log(this.addbankcard.bankNo)
            this.addbankcard.userName = this.userName;
            this.addbankcard.bankInfo = this.bankList[this.bankCode];
            this.addbankcard.bankCode = this.bankCode;
            // this.addbankcard.bankBranch = this.bankBranch;
             
               _this.zhuan = true;
            "object" == typeof this.addbankcard && (this.addbankcard = JSON.stringify(this.addbankcard));
            var add = this.BASE64.encoder(this.DES3.encrypt("golive_lottery@123456#$%~",this.addbankcard));
            // console.log(this.$route.query.bankName==undefined)
            if(this.$route.query.bankName==undefined){
              console.log("添加银行卡")
              this.$http.post(_config.golive+"/lottery/bindCard",add).then(function(res){
              // this.$http.post("http://golive-xess.dev.haokefuns.com/lottery/bindCard",add).then(function(res){
                  console.log(res)
                if(res.data.code=='0'&&res.data.msg=="success"){
                  _this.zhuan = false;
                  _this.tipsOk = true;
                  _this.tipsNo = false;
                }else{
                  _this.zhuan = false;
                  _this.tipsOk = false;
                  _this.tipsNo = true;
                }
              })
            }else{
              console.log("变更")
              this.$http.post(_config.golive+"/lottery/changeCard",add).then(function(res){
                console.log(res)
                 if(res.data.code=='0'&&res.data.msg=="success"){
                  _this.zhuan = false;
                  _this.tipsOk = true;
                  _this.tipsNo = false;
                }else{
                  _this.zhuan = false;
                  _this.tipsOk = false;
                  _this.tipsNo = true;
                }
              })
            }
          } 
        }
        // 某项没有填写则输入框变红提示
        // if(this.bankName==""){
        //   this.nameBorder = true;
        // }
        // if(this.bankInfo==""){
        //    this.bankBorder = true;
        // }
        // if(this.userName==""){
        //   this.parsonBorder = true;
        // }
        // if(this.idCard==""){
        //   this.idBorder = true;
        // }
        // 全部合法后点击发送请求

      },
      borderName(){
          this.nameBorder = false;
      },
      borderBank(){
        this.bankBorder = false;
      },
      borderShow(){
        this.redBorder = false;
      },
      borderParson(){
        this.parsonBorder = false;
      },
      borderId(){
        this.idBorder = false;
      },
      modelHide(){
        this.tipsNo = false;
      },

      luhmCheck(bankNo){
        let _this = this;
        var lastNum=bankNo.substr(bankNo.length-1,1);//取出最后一位（与luhm进行比较）

        var first15Num=bankNo.substr(0,bankNo.length-1);//前15或18位
        var newArr=new Array();
        for(var i=first15Num.length-1;i>-1;i--){    //前15或18位倒序存进数组
          newArr.push(first15Num.substr(i,1));
        }
        var arrJiShu=new Array();  //奇数位*2的积 <9
        var arrJiShu2=new Array(); //奇数位*2的积 >9

        var arrOuShu=new Array();  //偶数位数组
        for(var j=0;j<newArr.length;j++){
          if((j+1)%2==1){//奇数位
            if(parseInt(newArr[j])*2<9)
              arrJiShu.push(parseInt(newArr[j])*2);
            else
              arrJiShu2.push(parseInt(newArr[j])*2);
          }
          else //偶数位
            arrOuShu.push(newArr[j]);
        }

        var jishu_child1=new Array();//奇数位*2 >9 的分割之后的数组个位数
        var jishu_child2=new Array();//奇数位*2 >9 的分割之后的数组十位数
        for(var h=0;h<arrJiShu2.length;h++){
          jishu_child1.push(parseInt(arrJiShu2[h])%10);
          jishu_child2.push(parseInt(arrJiShu2[h])/10);
        }

        var sumJiShu=0; //奇数位*2 < 9 的数组之和
        var sumOuShu=0; //偶数位数组之和
        var sumJiShuChild1=0; //奇数位*2 >9 的分割之后的数组个位数之和
        var sumJiShuChild2=0; //奇数位*2 >9 的分割之后的数组十位数之和
        var sumTotal=0;
        for(var m=0;m<arrJiShu.length;m++){
          sumJiShu=sumJiShu+parseInt(arrJiShu[m]);
        }

        for(var n=0;n<arrOuShu.length;n++){
          sumOuShu=sumOuShu+parseInt(arrOuShu[n]);
        }

        for(var p=0;p<jishu_child1.length;p++){
          sumJiShuChild1=sumJiShuChild1+parseInt(jishu_child1[p]);
          sumJiShuChild2=sumJiShuChild2+parseInt(jishu_child2[p]);
        }
        //计算总和
        sumTotal=parseInt(sumJiShu)+parseInt(sumOuShu)+parseInt(sumJiShuChild1)+parseInt(sumJiShuChild2);

        //计算Luhm值
        var k= parseInt(sumTotal)%10==0?10:parseInt(sumTotal)%10;
        var luhm= 10-k;

        if(lastNum==luhm && lastNum.length != 0){
          this.show = false;
          this.tipsRed = "";
          this.isIdCardNo(this.idCard);
          return true;
        }
        else{
          this.show = true;
          this.tipsRed = "银行卡号码有误";
          this.redBorder = true;
          setTimeout(()=>{
            _this.show = false;
            _this.tipsRed = "";
          },3000);
          return false;
        }
      },

      isIdCardNo(idCard){
        let _this = this;
        //15位和18位身份证号码的正则表达式
        var regIdCard=/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
        //如果通过该验证，说明身份证格式正确，但准确性还需计算
        if(regIdCard.test(idCard)){
          if(idCard.length==18){
            var idCardWi=new Array( 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ); //将前17位加权因子保存在数组里
            var idCardY=new Array( 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
            var idCardWiSum=0; //用来保存前17位各自乖以加权因子后的总和
            for(var i=0;i<17;i++){
              idCardWiSum+=idCard.substring(i,i+1)*idCardWi[i];
            }
            var idCardMod=idCardWiSum%11;//计算出校验码所在数组的位置
            var idCardLast=idCard.substring(17);//得到最后一位身份证号码

            //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
            if(idCardMod==2){
              if(idCardLast=="X"||idCardLast=="x"){
                //alert("恭喜通过验证啦！");
                this.send = true;
                return true;
              }else{
                //alert("身份证号码错误！");
                this.show = true;
                this.tipsRedId = "身份证号码有误";
                this.idBorder = true;
                setTimeout(()=>{
                  _this.show = false;
                  _this.tipsRedId = "";
                },3000);
                return false;
              }
            }else{
              //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
              if(idCardLast==idCardY[idCardMod]){
                //alert("恭喜通过验证啦！");
                this.send = true;
                return true;
              }else{
                // alert("身份证号码还是错误！");
                this.show = true;
                this.tipsRedId = "身份证号码有误";
                this.idBorder = true;
                setTimeout(()=>{
                  _this.show = false;
                  _this.tipsRedId = "";
                },3000);
                return false;
              }
            }
          }
        }else{
          //alert("身份证格式不正确!");
          this.show = true;
          this.tipsRedId = "身份证号码有误";
          this.idBorder = true;
          setTimeout(()=>{
            _this.show = false;
            _this.tipsRedId = "";
          },3000);
          return false;
        }
      }
    },
  }
</script>

<style scoped>
 @-webkit-keyframes rotation{
    from {-webkit-transform: rotate(0deg);}
    to {-webkit-transform: rotate(360deg);}
  }
  .down{
    width:16px;
    vertical-align: middle;
    float: right;
    margin-right:15px;
    margin-top:17px;
  }
  .zhuan{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 60%;
    height: 20%;
    background: white;
    border-radius: 5px;
    color: #777777;
    padding: 16px 0;
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
  }
  .bg_zhuan .zhuan{
    background: rgba(0,0,0,0.6);
    color:#fff;
  }
  .bg_zhuan .zhuan .icon_zhuan{
    margin-bottom:15px;

  }
  .addbankcard{
    padding-top:9px;
    height: 100vh;
    background: #f6f6f6;
    color: #333;
  }
  select{
    height:99%;
    outline: none;
    border:none;
    width:60%;
    color: #777;
    font-size: 16px;
    background: #fff;
    padding-left: 7px;
    -webkit-appearance:none;
  }
  section{
    padding: 0 0 0 15px;
    background: #fff;
    /*border-bottom: 1px solid #dadcdf;*/
  }
  /*.box{
    position: relative;
  }*/
 /* .box .select{
    position: absolute;
    width:68%;
    left:20%;
    top:64px;
    height:240px;
    background:#fff;
    overflow: auto;
    box-sizing:border-box;
    border-bottom:1px solid #ffe400;
    border-left:1px solid #ffe400;
    border-right:1px solid #ffe400;
  }*/
 /* .box .select .option{
    box-sizing:border-box;
    width:100%;
    height:40px;
    border-bottom:;
    line-height: 40px;
    font-size: 14px;

  }*/


  .left .pull{
    width:66%;
    display: inline-block;  

  }
 
  .left{
    text-align: left;
    height: 50px;
    line-height: 50px;
    color:#333;
    /*border-bottom: 1px solid #dadcdf;*/
  }
  /*.left:last-child{*/
    /*border-bottom:none;*/
  /*}*/
  .left span{
    display: inline-block;
    width: 80px;
    font-size: 16px;
  }
  .left input{
    width: 65%;
    border: none;
    outline: none;
    -webkit-appearance: none;
    font-size: 16px;
    height:40px;
    line-height: 40px;
    padding-left:10px;
  }
  .addbankcard .left input::placeholder{
      font-size: 16px;
      color: #d0d0d0;
    }
  @media screen and (max-width: 374px){
    .left span{
      font-size: 14px;
    }
  }
  @media screen and (max-width: 374px){
    .left input{
      font-size: 16px;
      color: #333;
    }
    .left input::placeholder{
      font-size: 16px;
      color: #d0d0d0;
    }
    .left input::-webkit-input-placeholder{
      font-size: 16px;
      color: #d0d0d0;
    }
    .left input::-moz-placeholder{
      font-size: 16px;
      color: #d0d0d0;
    }
  }
  @media screen and (min-width: 375px){
    .left input{
      font-size: 16px;
      color: #333;
    }
    .left input::placeholder{
      color: #d0d0d0;
      font-size: 16px;
    }
    .left input::-webkit-input-placeholder{
      color: #333;
      font-size: 16px;
    }
    .left input::-moz-placeholder{
      color: #333;
      font-size: 16px;
    }
  }

  /*提交*/
  footer{
    position: relative;
    margin-top: 65px;
    padding: 0 15px;
  }
  .tips{
    position: absolute;
    top: -50px;
    left: 0;
    right: 0;
    color: #FF565C;
    text-align: left;
    padding-left:15px;
    font-size: 14px;
  }
  .submit{
    display: block;
    width: 100%;
    height: 44px;
    line-height: 44px;
    background: #ffe400;
    border-radius: 5px;
    color: #333;
    /*letter-spacing:15px;*/
  }
  .active{
    border-bottom: 1px solid red;
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
    /*padding: 16px 0;*/
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
    /*position: absolute;*/
    /*left: 0;*/
    /*right: 0;*/
    /*bottom: 16px;*/
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
