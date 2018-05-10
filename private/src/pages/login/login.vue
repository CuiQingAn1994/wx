<template name="login">
   <section class="login">
    <div v-title>登录</div>
      <div class="headline">快速登录和彩宝</div>
       <div class="content">
           <div class="tel"><input type="text" @blur="show()" placeholder="手机号" v-model="tpl" ></div>
           <div class="verification"><input type="text" placeholder="验证码"></div>
           <p class="agree"><img src="./gou.png" alt="">我已阅读和彩用户使用协议</p>
       </div>
       <div class="allbtn">
           <button  class="get" @click="getCode()">{{dev}}</button>
           <button  class="go" >快速登录</button>
       </div>
       <div v-if="tip" class="tips">请正确输入手机号</div>
   </section> 
</template>
<script>
     export default{
        data:function(){
            return {
                dev:"获取验证码",
                second:7,
                disable:false,
                tpl:"",
                tip:false,
                lock:true,

            }
        },
        created:function(){
          
        },
        updated:function(){
            if(this.tpl.length==11){
                this.disable=true
            }else{
                this.disable=false
            }
        },
        methods:{
           getCode:function(){
            if(!this.lock){
              return;
            }
            var me =this
            if(this.disable){
              this.lock=false;
                 var time = setInterval(function(){
                    me.second--;
                    me.dev= me.second+"s"+"重新发送"
                    console.log(me.second)
                    if(me.second==-1){
                       
                        clearInterval(time)
                        me.dev = "获取验证码"
                        console.log(me.dev)
                        console.log(me.second)
                        me.second = 7; 
                        me.lock = true;
                    }

                }, 1000)
            }else{

                if(!this.tpl){
                    this.tip=true
                    setTimeout(function(){
                        me.tip=false
                        console.log(11111111)
                    }, 2000)
                }
            }
           
           },
           show:function(){
              var me = this;
              if(this.tpl.length!=11){
                  this.tip=true
                  setTimeout(function(){
                      me.tip=false
                      console.log(11111111)
                  }, 2000)
              }

           },

        }
     }
</script>
<style scoped>
  .login .headline{
      font-size:20px;
      color:#219fc0; 
      padding:20px 0 25px;
      border-bottom:1px solid #219fc0;
  }
  .content{
      margin-top: 50px;
  }
  .tel,.verification{
     width: 80%;
     margin: 0 auto;
  }
    input{

      width: 100%;
      height: 44px;
      font-size: 16px;
      color: #666666;
      outline: none;
      padding-left: 10px;
      margin-bottom: 10px;
      box-sizing:border-box;
    }
    input::placeholder{
      color: #999999;
    }
    input::-webkit-input-placeholder{
      color: #999999;
    }
    input::-moz-placeholder{
      color: #999999;
    }
    .agree{
        font-size: 10px;
        text-align: left;
        text-indent: 10%;
        color:#949494;
        margin: 13px 0px;
    }
    .agree img{
      width:12px;
      margin-right:6px;
      vertical-align: top;
      margin-top: 3px;
    }
    .allbtn{
        width:80%;
        margin: 0 auto;
    }
    .allbtn button{
        width:45%;
        line-height: 40px;
        border-radius: 5%;
        border:none;
        color:#FFF;
        outline: none;
    }
    .allbtn .get{
        float: left;
        background: #219fc0;
    }
    .allbtn .go{
        float: right;
        background: #ef5050;
    }
    .tips{
        position: fixed;
        width: 50%;
        height: 30px;
        line-height: 30px;
        top: 0;
        left: 0;
        right: 0;
        margin:auto; 
        border-radius: 2px;
        color: white;
        background: rgba(255,0,0,0.7);
        z-index: 100;
    }
</style>