<template>
	<section class="addAddress">
    <div v-title>添加新地址</div>
		<div class="address">
      <div class="title">地址信息</div>
      <div class="line"></div>
			   <p class="left"><span class="titleH">收货人</span><input autofocus v-model="consignee" type="text" placeholder="收货人姓名"></p>
         <div  class= "pl">
            <div class="line"></div>
         </div>
      		<p class="left" ><span class="titleH">联系电话</span><input v-model="tel" type="Number" placeholder="手机号" ></p>
          <div  class= "pl">
            <div class="line"></div>
         </div>
      		<p class="left" @click="show" >
            <span class="titleH">所在地区</span>
             <!-- <input type="text" @click="show" v-model="region" placeholder="请选择"> -->
             <span class="region" :style="{color:region=='请选择'?'#777':'#333'}" >{{region}}</span>
             <span v-if="region=='请选择'" style="">
                <img style="height:16px" src="./right.png" alt="">
             </span>
          </p>
          <div  class= "pl">
            <div class="line"></div>
          </div>
          <p class="left last" ></span><input type="text" class="detailAddress" v-model="address" placeholder="请输入详细地址" ></p>
          <div class="line"></div>
          <div class="tip">
            <p class="tips" v-if="tips_show">{{msg}}</p>
            <!-- <p class="tips" v-if="phone_tips">请确认手机号</p> -->
          </div>
          <div class="buttonAdd">
            <p class="btnAdd" @click="save()">保存</p>
          </div>
          <vue-city-picker ref="picker" @select="select"></vue-city-picker>
          <!-- <p>{{consignee}}</p>
          <p>{{tel}}</p>
          <p>{{sheng}}</p>
          <p>{{shi}}</p>
          <p>{{qu}}</p>
          <p>{{detail}}</p> -->
		</div>
    <loading v-if="zhuan"></loading>
    <!-- <success v-if="success"></success> -->
    <success :pMsg="msgData" v-if="success"></success>
	</section>
</template>
  <script>
  import Loading from '../../../../components/loading'
  import Success from '../../../../components/successful/successful'
  import Err from '../../../../components/err/err'
  import vueCityPicker from 'vue-city-bspicker'
  export default {
      components:{Loading,Success,Err,vueCityPicker},
      data(){
        return{
          msgData:"保存成功",
          msg:"",
          id:this.$route.query.id,
          num:this.$route.query.num,
          phone_tips:false,
          tips_show:true,
          zhuan:false,
          success:false,
          router:"",
          tel:"",
          region:"请选择",
          address:"",
          consignee:"",
          List:["北京","北京","北京","北京","北京","北京","北京"],
          params:{userId:hcb.user().uid,address:"",region:"",tel:"",consignee:""}
        }
      },
      watch:{
         consignee(){
          // if(this.consignee.length==1){
          //   this.msg = "收货人姓名不能少于两个字"
          // }
          if(this.consignee.length>1){
            this.msg = "";
          }
         },
         tel(){
          if (this.tel.length>11) {
            this.tel = this.tel.substring(0,11)
          };
          if(this.tel.length==11){
            this.msg = "";
          }
         },
         region(){
          if(this.region!="请选择"){
            this.msg = "";
          }
         },
         address(){
          this.msg = "";
         }


      },
      methods:{
        save(){
          var me = this;
          this.zhuan = true;
          // this.success = true;

          this.router = this.$route.query.router
          this.params.address = this.address;
          this.params.region = this.region;
          this.params.tel = this.tel;
          this.params.consignee = this.consignee;
          console.log(this.params)
          console.log(Boolean(this.params.consignee&&this.params.address&&this.params.region!='请选择'&&this.params.tel))
          if((/^1(3|4|5|7|8)\d{9}$/.test(this.params.tel))&&this.params.consignee&&Boolean(this.params.region!='请选择')&&this.params.address.length>0&&this.params.address.length<31){
            console.log("信息都填对了")
             this.$http.post(_config.server+"/address/save",this.params).then(function(res){
                console.log(res)
                if(res.status==200&&res.data.status==10000){
                  me.zhuan = false;
                  me.success = true;
                  setTimeout(function(){
                    me.$router.push({path:'/'+me.router+'?id='+me.id+'&num='+me.num})
                  },2000)
                }
              })
            // this.zhuan = false;
          }else if(!(/^1(3|4|5|7|8)\d{9}$/.test(this.params.tel))&&this.params.consignee&&Boolean(this.params.region!='请选择')&&this.params.address.length>0&&this.params.address.length<31){
            console.log("请确认手机号")
            this.zhuan = false;
            this.msg = "请确认手机号";
          }else if(this.params.tel&&!this.params.consignee&&Boolean(this.params.region!='请选择')&&this.params.address.length>0&&this.params.address.length<31){
            console.log("请填写用户名")
            this.zhuan = false;
            this.msg = "请填写用户名"
          }else if(this.params.tel&&this.params.consignee&&Boolean(this.params.region=='请选择')&&this.params.address.length>0&&this.params.address.length<31){
            console.log("请选择所在区域")
            this.zhuan = false;
            this.msg = "请选择所在区域";
          }else if(this.params.tel&&this.params.consignee&&Boolean(this.params.region!='请选择')&&this.params.address.length==0){
            console.log("请填写详细地址")
            this.zhuan = false;
            this.msg = "请填写详细地址"
          }else if(this.params.tel&&this.params.consignee&&Boolean(this.params.region!='请选择')&&this.params.address.length>30){
            console.log("详细地址不能超过30个字")
            this.zhuan = false;
          }else {
            console.log("信息未能填写完整")
            this.zhuan = false;
            this.msg = "信息未能填写完整"
          }
          // if(Boolean(this.params.consignee)){
          //   if(this.params.consignee.length<2){
          //     this.msg = "收货人姓名不能少于两个字"
          //     this.tips_show = true;
          //     this.phone_tips = false;
          //     this.zhuan = false;
          //     return
          //   }
          //     if(!(/^1(3|4|5|7|8)\d{9}$/.test(this.params.tel))){
          //       this.zhuan = false;
          //       // this.phone_tips = true;
          //       this.tips_show = true;
          //       this.msg = "请确认手机号"
          //       return;
          //     }else{
          //      console.log(Boolean(this.params.region=='请选择'))
          //       if(Boolean(this.params.region=='请选择')){
          //         this.msg = "请选择收货区域"
          //         this.tips_show = true;
          //         this.phone_tips = false;
          //         this.zhuan = false;
          //         return
          //       }else{
          //         console.log(11111111)
          //         console.log(this.params.address)
          //         if(Boolean(this.params.address)){
          //           if(this.params.address.length>30){
          //             this.msg = "详细地址不能超过30个字"
          //             this.tips_show = true;
          //             this.phone_tips = false;
          //             this.zhuan = false;
          //             return
          //           }
          //             this.$http.post(_config.server+"/address/save",this.params).then(function(res){
          //               console.log(res)
          //               if(res.status==200&&res.data.status==10000){
          //                 me.zhuan = false;
          //                 me.success = true;
          //                 setTimeout(function(){
          //                   me.$router.push({path:'/'+me.router+'?id='+me.id+'&num='+me.num})
          //                 },2000)
          //               }
          //             })
          //         }else{

          //           this.msg = "请输入详细地址"
          //           this.tips_show = true;
          //           this.phone_tips = false;
          //           this.zhuan = false;
          //           return
          //         }
          //       }
          //     }
          // }else{
          //   this.msg = "请输入收货人姓名"
          //   this.tips_show = true;
          //   this.phone_tips = false;
          //   this.zhuan = false;
          //   return
          // }
        },
        show: function(){
            this.$refs['picker'].show();
        },
        select: function(){
            console.log(arguments[2])
           var str = arguments[2].join(' ')
           this.region = str;
        }
      },
      updated(){
        // if(Boolean(this.params.consignee&&this.params.address&&this.params.region!='请选择'&&this.params.tel)){

        //   this.tips_show = false;
        // }
        // if(this.params.tel.length==11){
        //  this.phone_tips = false;

        // }
      }
    }
  </script>
<style scoped>
.left input::placeholder{
  color:#777;
}
.addAddress{
	/*background: #fff;*/
	/*height:100vh;*/
  /*padding-left:22px;*/
  color:#333;
}
.left .detailAddress{
  width:100%;
  padding-right:15px;
}
.tip{
  margin-top:10px;
  height:40px;
}
.tips{
  text-align: left;
  color: #FF565C;
  padding-left:15px;
  font-size: 14px;

}
.addAddress .address .buttonAdd{
  padding: 0 15px;
}
.addAddress .address .btnAdd{
  width:100%;
  height:44px;
  line-height: 44px;
  text-align: center;
  /*margin:40px auto;*/
  /*border:1px solid #777;*/
 background-image:-webkit-linear-gradient(left,#FFEC1C ,#FFD40C);
  border-radius: 5px;
  /*transform:translateX(-11px);*/
  /*margin-left:-11px;*/
}
.addAddress .address .title{
    color:#999;
    text-align: left;
    height: 44px;
    line-height: 44px;
    padding-left:15px;
    font-size:14px;
    /*border-bottom: 1px solid #dfdfdf;*/
}
select{
  /*-webkit-appearance: menu;*/
}
textarea{
  border:none;
  outline: none;
  -webkit-appearance: none;
}
.left .pull{
    width:66%;
    display: inline-block;  
}
 
.left{
    color:#333;
    text-align: left;
    height: 50px;
    line-height: 50px;
    /*border-bottom: 1px solid #dadcdf;*/
    padding-left:15px;
    background: #fff;
    /*overflow: hidden;*/
    /*position: relative;*/
}
  /*.left:last-child{*/
    /*border-bottom:none;*/
  /*}*/
.left span{
    display: inline-block;
    /*width: 29%;*/
    
    font-size: 16px;
    float: left;
}
.left .titleH{
  display: inline-block;
  width:80px;
}
.left input{
    width: 67%;
    border: none;
    outline: none;
    -webkit-appearance: none;
    font-size: 16px;
    color:#333;
}
.left .region{
  display: inline-block;
   width: 67%;
   color:#777;
   overflow: auto;
   text-overflow:ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
.left.last{
  margin-left:0;
  padding-left:95px;
}
.ml{
  margin-left:15px;
}


</style>