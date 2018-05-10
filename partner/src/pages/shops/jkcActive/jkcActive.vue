<template>
	<section class="jkcActive">
		<div v-title>即开彩激活</div>
		<div class="nav">
			<p class="bar" :style="{borderBottomColor:idx==0?'#ffe400':'#fff',color:idx==0?'#333333':'#999999'}" @click="active()" >激活
            </p>
			<p class="bar" :style="{borderBottomColor:idx==1?'#ffe400':'#fff',color:idx==1?'#333333':'#999999'}" @click="actived()">已激活</p>
		  <div class="line" style="float:left" ></div>
        </div>
		<div v-if="idx==0" class="activing">
			<div class="line"></div>
			<div class="box">
				<span class="codeTitle">票面数字</span>
                <input class="codeNum" type="text" autofocus v-model="code" placeholder="请输入前13位或15位数字" >
                <img class="close" v-if="code" @click="clear()" src="./clear.png" alt="">
			</div>
			<div class="line"></div>
			<div class="tips">{{check}}</div>
            <div class="button">
			    <p class="btn" @click="sub()">确认</p>
            </div>
			<!-- <div class="line"></div> -->
			<div class="bottom">
				<p>说明</p>
				<p class="intro">1、票面数字指下图气泡内红色区域。</p>
				<!-- <p>2、输入前13位数字.</p> -->
				<img src="./active.png" alt="">
			</div>
		</div>
		<div v-if="idx==1">
			<div v-if="con">
                 <space></space>        
            </div>
            <div v-if ="!con" class="content" >
               <!--  <div class="line"></div>
                <div class="title">总激活:{{list.length}}次</div> -->
                <div class="line"></div>
                <div class="list" v-for="(item,index) in list" >
                    <p class="ticNum">票面数字:{{item.sn}}</p>
                    <p class="creatTime">激活时间:{{item.createdAt | formDate}}</p>
                    <div class="line"v-if="index+1!=list.length"></div>
                </div>
                <div class="line"></div>
            </div>
            <loading v-if="zhuan"></loading>
            <Infinite v-on:infinite="infiniteMore" ></Infinite>
        </div>
        <div class="bg" v-if="success">
            <div class="recharge_ok">
                <img class="icon" src="./success.png" alt="">
                <p class="bg_content">激活成功!</p>
            </div>
        </div>
        <div class="bg" v-if="fail">
            <div class="recharge_ok">
                <img class="icon" src="./fail.png" alt="">
                <p class="bg_content">激活失败!</p>
            </div>
        </div>
         <loading v-if="zhuan"></loading>
         <!-- <loading ></loading> -->
	</section>
</template>
<script>
    import Loading from '../../../components/loading'
    import Space from '../../../components/space/space'
    import Err from '../../../components/err/err'
    import Infinite from "vue2-infinite-scroll";
	export default{
        components:{Infinite,Loading,Space,Err},
		data(){
			return{
                arr:[],
                skip:0,
                con:false,
                fail:false,
                success:false,
                zhuan:false,
				code:"",
				idx:0,
				check:"",
				codeNum:"",
                list:[]

			}
		},
		updated(){
            console.log(this.code.length>=15)
            this.codeNum = this.code.replace(/\s/g,"")
			if((this.code.length==15||this.code.length==17)&&this.checkNumber(this.codeNum)){
				this.check="";
                console.log(this.code.length)
			}
            this.code =this.code.replace(/\s/g,'').replace(/(\d{2})(?=\d)/,'$1 ').replace(/(\d{4})(?=\d)/,'$1 ').replace(/(\d{9})(?=\d)/,'$1 ');
			// this.code =this.code.replace(/\s/g,'').replace(/(\d{2})(?=\d)/,'$1 ').replace(/(\d{4})(?=\d)/,'$1 ').replace(/(\d{7})(?=\d)/,'$1 ');
			if(this.code.length>=18){
				this.code =this.code.substr(0,18)
			}
            // if(this.code==""){
            //     this.check="";
            // }
		},
		methods:{
			
			active(){
				this.idx=0;
			},
			actived(){
                var that = this;
                this.zhuan = true;
				this.idx=1;
                this.$http.get( _config.server+"/intant/active/list?storeNo="+hcb.user().storeNo+"&limit=20&skip=0").then(function(res){
                    if(res.status==200&&res.data.status==10000){
                        console.log(res)
                        setTimeout(function(){

                         that.zhuan = false;  
                        }, 300)
                        that.list = res.data.data;
                        for(var i = 0;i<that.list.length;i++){
                            // that.list[i].sn = that.list[i].sn.replace(/\s/g,'').replace(/(\d{2})(?=\d)/,'$1 ').replace(/(\d{4})(?=\d)/,'$1 ').replace(/(\d{7})(?=\d)/,'$1 ');
                            that.list[i].sn = that.list[i].sn.replace(/\s/g,'').replace(/(\d{2})(?=\d)/,'$1 ').replace(/(\d{4})(?=\d)/,'$1 ')
                        }
                        if(res.data.data.length==0){
                            that.con = true;

                        }else{
                            that.con = false;
                        }
                    }else{

                    }
                })
			},
            infiniteMore($state) {
                var me = this;
                this.skip=this.skip+20;
                // var arr=[];
                this.$http.get( _config.server+"/intant/active/list?storeNo="+hcb.user().storeNo+"&limit=20&skip="+this.skip).then(res => {
                      // this.aaa = this.aaa.concat(data.data.b.data);
                      console.log(res)
                      this.arr= res.data.data;
                      for(var i = 0;i<this.arr.length;i++){
                            // that.list[i].sn = that.list[i].sn.replace(/\s/g,'').replace(/(\d{2})(?=\d)/,'$1 ').replace(/(\d{4})(?=\d)/,'$1 ').replace(/(\d{7})(?=\d)/,'$1 ');
                           this.arr[i].sn = this.arr[i].sn.replace(/\s/g,'').replace(/(\d{2})(?=\d)/,'$1 ').replace(/(\d{4})(?=\d)/,'$1 ')
                        }
                      this.list =this.list.concat(this.arr)
                      $state.loaded();   //这次加载完毕
                      console.log(res.data.data.length)
                      if (res.data.data.length<20) {
                        $state.completed("全部加载完了");
                      }
                })
            },
			sub(){
                var that = this;
                this.codeNum = this.code.replace(/\s/g,"")
                console.log(this.codeNum)
                if(this.codeNum.length!=13&&this.codeNum.length!=15){
                    this.check="票面数字输入有误!"
                }else if(!this.checkNumber(this.codeNum)){
                    this.check = "票面数字格式有误!"
                }else if(this.codeNum.length==13||this.codeNum.length==15){
                    this.zhuan = true;
                    console.log({"storeNo":hcb.user().storeNo,"sn":this.codeNum, "uid":hcb.user().uid})
                    this.$http.post(_config.server+'/intant/active/create',{"storeNo":hcb.user().storeNo,"sn":this.codeNum, "uid":hcb.user().uid}).then(function(res){
                        console.log(res)
                        if(res.status==200&&res.data.status==10000){
                            that.zhuan = false;
                            that.success = true;
                            setTimeout(function(){
                                that.success = false;
                                that.code = ""
                            }, 1000)
                        }else{
                            that.zhuan = false;
                            that.fail = true;
                            setTimeout(function(){
                                 that.fail = false;
                            }, 1000)
                        }
                    })
                }
				// console.log()
			},
			checkNumber(str){
				  var reg = /^[0-9][0-9][0-9]*$/g;
				  if (reg.test(str)) {
				    return true;
				  }
				  return false;
			},
            clear(){
                this.code = "";
            }
		}
	}
</script>

<style scoped> 
	.box {
         overflow: hidden;
         margin:0 auto;
         padding:0 20px;
         background: #fff;
         height:50px;
     }
     .box .codeTitle{
     	float: left;
     	height:50px;
     	line-height: 50px;
     	width:78px;
     	font-size: 16px;
        background: #fff;

     }
     .box .codeNum{
         width:65%;
         height:50px;
         float:left;
         font-size: 16px;
         border:none;
         outline: none;
         /*padding-left:10px;*/
         background: #fff;
     }
     .box .close{
        float: right;
        width:20px;
        margin-top:15px;
     }

     .nav{
     	width:100%;
     	height:50px;
     	font-size: 16px;
     	line-height: 50px;
     	overflow: hidden;
        background: #fff;
       /* position: fixed;
        top:11px;
        left:0;*/
     }
     .nav .bar{
     	float: left;
     	width:50%;
     	height:49px;
     	text-align: center;
     	border-bottom:2px solid #999;
     	color:#999999;
     }
     .activing{
     	margin-top:10px;
     }
     .button{
        padding:0 15px;
     }
     .btn{
     	width:100%;
     	height:40px;
     	background-image:-webkit-linear-gradient(left,#FFEC1C ,#FFD40C);
     	margin:0 auto;
     	text-align: center;
     	line-height: 40px;
     	border-radius: 5px;
     	margin-bottom:25px;
     }
     .tips{
     	width:100%;
     	text-align: left;
     	font-size: 14px;
     	color:#FF565C;
     	height:50px;
     	line-height: 50px;
        padding-left:15px;
     }
     .bottom{
     	margin:10px 20px;
     }
     .bottom p{
     	font-size: 14px;
        color:#333333;
     }
     .bottom img{
     	padding-top:10px;
     	width:90%;
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
    .bg{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background: rgba(0,0,0,0.6);
  }
  .recharge_ok{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 240px;
    height: 180px;
    background: white;
    /*border-radius: 5px;*/
    color: #333;
    text-align: center;
  }
  .recharge_ok .icon{
    position: absolute;
    height:90px;
    left:50%;
    top:-50px;
    transform:translatex(-50%);
  }
   .recharge_ok .bg_content{
        line-height: 180px;
        font-size: 18px;
        color:#333;
    }
  button{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 16px;
    width: 30%;
    height: 28px;
    line-height: 30px;
    margin: auto;
    border-radius: 5px;
    background: #ffe400;
    outline: none;
    border: none;
    color: #666666;
    font-size: 16px;
  }
  .bottom .intro{
    color:#999;
  }
  .content{
    margin-top:10px;
  }
  .title{
    height:50px;
    line-height: 50px;
    font-size:16px;
    padding:0 15px;
    color:#333333;
    background: #fff;
  }
  .list{
    padding:0 0 0 15px;
    background: #fff;

  }
  .list .ticNum{
    padding-top:15px;
    font-size: 16px;
    color:#333333;
    line-height: 32px;
  }
  .list .creatTime{
    padding-bottom:15px;
    font-size: 14px;
    color:#999999;
  }
  .bg_zhuan{
    top:61px;
  }
</style>
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