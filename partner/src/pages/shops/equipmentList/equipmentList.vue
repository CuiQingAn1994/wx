<template>
  <div class="equipmentList">
    
    <err v-if="err"></err>
    <!-- <err ></err> -->
    <div v-if="!err">
      <space v-if="qsy"></space>
      <div v-else>
        <div v-title>设备列表</div>
        <ul>
          <li class="list" v-for="item in equipmentData">
            <div class="listIn" >
              <!--设备名称-->
            <!--   <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">设备名称:</label></div>
                <div class="weui-cell__bd">
                  <span class="weui-input">{{item.deviceName}}</span>
                </div>
                <div class="weui-cell__hd"><label class="weui-label">商家编号:</label></div>
                <div class="weui-cell__bd">
                  <span class="weui-input">{{item.storeAccountNo}}</span>
                </div> 
              </div> -->
              <!--设备SN码-->
              <div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">设备SN:</label></div>
                <div class="weui-cell__bd">
                  <!-- <input class="weui-input" disabled v-model="item.deviceNo" type="text"/> -->
                  <span class="weui-input">{{item.deviceNo}}</span>
                </div>
              </div>
            </div>
            <span class="unbind" @click="goUnbind(item.deviceNo)">解绑设备</span>
            <div class="line"></div>
          </li>
          <!-- <span class="more" v-if="btn_show" @click="loading()">{{more}}</span>
          <span class="more" v-if="msg_show">{{more}}</span> -->
          <!-- <Infinite v-on:infinite="infiniteMore" ></Infinite> -->
        </ul>
        
        <!-- <div class="qsy" v-if="qsy">
          <img src="./qsy.png" alt="">
          <p>暂无激活设备</p>
        </div> -->
      </div>
    </div>
    <loading v-if="zhuan"></loading>
      <!-- 发送手机验证码 -->
    <div class="send" v-if="check" >
      <div class="getCode">
        <p class="tipTitle">提示验证</p>
        <p class="warn">请验证手机号!</p>
        <p class="phone">手机号:{{phone}}</p>
        <p class="codes">
          <span class="inCode">
            <input type="Number" v-model="inputCode" placeholder="请输入验证码" ></span>
          <span class="code" :style="{color:send?'#999':'#333' }" @click="getCode()">{{codeText}}</span>
        </p>
        <div class="line"></div>
        <p class="tips" v-if="nullCode">请输入验证码</p>
        <p class="tips" v-if="codeWarn">{{msg}}</p>
        <p class="btn_all">
          <span class="btn_w" @click="cancel()" >取消</span>
          <span class="btn_r" @click="unbind()" >解绑</span>
        </p>
      </div>
    </div>
    <victory v-if="relieve" :victory="victory" :behavior="behavior"></victory>
  </div>
</template>
<script>
import Loading from '../../../components/loading'
import Space from '../../../components/space/space'
import Err from '../../../components/err/err'
import Victory from '../../../components/victory/victory'
 import Infinite from "vue2-infinite-scroll";
  export default {
    components:{Loading,Space,Err,Infinite,Victory},
    data () {
      return{
        // 验证码
        second:60,
        codeText:"获取验证码",
        check:false,
        phone:hcb.user().mobile,
        inputCode:"",
        send:false,
        nullCode:false,
        codeWarn:false,
        msg:"",
        params:{
          deviceNo:"",
          // uid:hcb.user().uid,
          code:""

        },
        relieve:false,
        victory:true,
        behavior:'解绑成功!',

        space:false,
        zhuan:false,
        err:false,
        equipmentData:[],
        name:"",
        snCode:"",
        qsy:false,
        btn_show:true,
        msg_show:false,
        more:"加载更多",
        params:{
          // "type":hcb.user().role,//1商家用户2代理商3总代理商
          // "no":hcb.user().roleNo,//商家用户、代理商、总代理商的标识no
          // "pageNo":"1",//当前页码，默认1
          // "pageSize":"20",//每页条数，默认20但不大于50
          storeNo:hcb.user().storeNo,
          skip:0,
          limit:20
        },
      }
    },
    created:function () {
      var _this = this;
      this.zhuan = true;
      this.getEquipmentData();
    },
    watch:{
      inputCode(){
        if(this.inputCode!=''){
          this.nullCode = false;
        }
        this.codeWarn = false;
      }
    },
    methods:{
      // 获取设备列表
      getEquipmentData(){
        let _this = this;
        console.log(_config.server+"/user/device/list",this.params)
        this.$http.post(_config.server+"/user/device/list",this.params).then(function (res) {
          console.log(res)
          setTimeout(function(){
            _this.zhuan = false;
          }, 300)
          if(res.data.status==10000){
            console.log(res)
            _this.equipmentData = res.data.data
             if(_this.equipmentData.length < 1){
              _this.qsy = true;
              // _this.space = true;
            }
          }
        },function (err){
            setTimeout(function(){
            _this.zhuan = false;
          }, 300)
            _this.err = true;
          })
      },
      // 加载更多
      infiniteMore($state) {
        var me = this;
        this.params.skip+=20;
        console.log(this.params)
          this.$http.post(_config.server+"/user/device/list",this.params).then(res => {
                // this.aaa = this.aaa.concat(data.data.b.data);
                console.log(res)
                if(res.data.status==10000){
                  this.equipmentData = this.equipmentData.concat(res.data.data)
                  $state.loaded();   //这次加载完毕
                  if (res.data.data.length<20) {
                    $state.completed("全部加载完了");
                  }
                }
            })
      },
      // 去解绑
      goUnbind(deviceNo){
        // alert("解绑"+deviceNo)
        this.check = true;
        this.params.deviceNo = deviceNo;
        console.log(this.params)
      },
      // 取消解绑
      cancel(){
        this.check = false;
        this.nullCode = false;
        this.codeWarn = false;
        this.inputCode = '';
      },
      // 解绑设备
      unbind(){
        var that = this;
        if(this.inputCode==''){
          this.nullCode = true;
        }else{
          this.params.code = this.inputCode;
          console.log('解绑设备')
          console.log(this.params)
          console.log(_config.server+'device/relieve')
          this.zhuan = true;
          this.$http.post(_config.server+'/device/relieve',this.params).then(res=>{
            console.log(res)
            this.zhuan = false;
            if(res.status==200&&res.data.status==10000){
              // alert("解绑成功")
              this.check = false;
              this.inputCode = '';
              this.getEquipmentData();
              this.relieve = true;
              this.codeText = "获取验证码";
              this.second = 60;
              this.send = false;
              clearInterval(window.timer);
              setTimeout(function(){
                 that.relieve = false;
              }, 1000)
            }else{
              this.codeWarn = true;
              this.msg = res.data.data
            }
          })
        }   

      },
      // 获取验证码
      getCode(){
        this.toGetCode = true;
        console.log(_config.server)
        if(this.send){
          return;
        }
        if(!this.send){
          console.log("获取验证码")
          this.inputCode = "";
          var that = this;
          this.send = true;
          var time = new Date().getTime()+60000;
          this.$http.post(_config.server +"/device/relieve/code",{deviceNo:this.params.deviceNo}).then(res=>{
              console.log(res)
              if(res.status==200&&res.data.status==10000){
                this.codeText = '60s后重新获取'
                window.timer = setInterval(function(){
                  that.second = Math.round((time - new Date().getTime())/1000);
                  if(that.second<=0){
                    that.second = 0; 
                  }
                  that.codeText = that.second+'s后重新获取'
                  if(that.second==0){
                    clearInterval(window.timer);
                    that.codeText = "获取验证码";
                    that.second = 60;
                    that.send = false;
                  }
                },1000)  
              }
          })
        }
        
      },
    },
  }
</script>
<style>
  div.wh_completed{
    height:50px;
    line-height: 50px;
  }
  div.ring-2{
    border:3px solid #666;
  }
  .ball-holder .ball{
    background: #f6f6f6;
  }
</style>
<style scoped>
  .err img{
      padding-top:150px;
      padding-bottom:15px;
      width:50%;
      display: block;
      margin:0 auto;
  }
  .err p{
      font-size: 20px;
      color:#777;
      text-align: center;

   }
  .equipmentList{
    width: 100%;
    height: 100vh;
    background: #f6f6f6;
    font-size: 14px;
  }
  ul .list{
    position: relative;
    background: white;
    /*padding:10px 0;*/
    height:54px;
  }
  ul .list .listIn{
    padding:10px 0;
  }
  .weui-input{
    color: #666;
  }
  .weui-label{
    color:#444;
  }
  .border:after{
    content: " ";
    position: absolute;
    left: 0;
    bottom: -6px;
    right: 0;
    height: 1px;
    background: #ECECEC;
    border-top: 1px solid #e5e5e5;
    color: #e5e5e5;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
    z-index: 2;
  }
/*  .qsy{
    display: block;
    position: absolute;
    width: 30%;
    height: 25%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    text-align: center;
    color: #777;
  }
  .qsy>img{
    width: 70%;
  }*/
  .more{
    display: block;
    width: 100%;
    margin:5px auto 0;
    text-align: center;
    height:50px;
    font-size: 14px;
    line-height: 50px;
    color:#777;
    background: #f6f6f6;
  }
  .weui-label{
    width:65px;
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
  .weui-cell__bd{
    display: block;
      text-overflow:ellipsis;
      white-space: nowrap;
      overflow: hidden;
  }
  .weui-cell{
    padding:5px 15px;
  }
  .list .weui-cell:before{
    border:none;
  }
  .unbind{
    /*float: right;*/
    position: absolute;
    right:15px;
    width:80px;
    top:9.5px;
    height:35px;
    text-align: center;
    line-height: 35px;
    background-image:-webkit-linear-gradient(left,#FFEC1C ,#FFD40C);
    border-radius: 5px;

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
  .getCode .btn_all{
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
  .getCode .btn_all .btn_w{
    width:130px;
    float: left;
    height:44px;
    line-height: 44px;
    margin-right:10px;
    border-radius: 5px;
    border:1px solid #d0d0d0;
  }

  .getCode .btn_all .btn_r{
    width:130px;
    height:44px;
    float: left;
    background-image:-webkit-linear-gradient(left,#FFEC1C ,#FFD40C);
    line-height: 44px;
    border-radius: 5px;
  }
</style>
