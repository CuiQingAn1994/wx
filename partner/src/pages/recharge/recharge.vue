<template>
	<section>
		<div class="top">
			<p class="title">请输入充值金额</p>
			<input v-model="num" class="number" type="text" placeholder="每次充值不少于1元"><span>(元)</span>
			<div class="cbtn">
				<div v-for="item in moneyNum" @click="chooseNum(item)"  class="price"><p class="pri">{{item}}元</p></div>
			</div>
		</div>
		<div class="size">支付方式</div>
		<div class="bottom">
			<div >
				<img class="wx" src="./wx.png" alt="">
				<span class="wxName">微信</span>
			</div>
		</div>
		<div class="reBtn">	
			<div @click="goRecharge" class="rechargeBtn">立即充值</div>
		</div>
	</section>	
</template>
<script>
	export default{
			data(){
				return{
					moneyNum:[10,20,30,50,100,200],
					num:'',
					
				}
			},
			methods:{
				chooseNum(num){
					this.num = num;
				},
				goRecharge(){
					var params= {
						uid:hcb.user().uid,
						title:'charge',
						roleNo:hcb.user().superNo?hcb.user().superNo:hcb.user().agentNo?hcb.user().agentNo:hcb.user().storeNo,
						roleType:hcb.user().superNo?"super":hcb.user().agentNo?"agent":"store",
						num:this.num
					}
					console.log(params)
					console.log(_config.server+'/wechat/store/charge')
					alert(window.location.href)
					this.$http.post(_config.server + '/wechat/signature' , {url:window.location.href}).then(res=>{
			            if (res.data.status == 10000) {
			                var data = res.data.data;
			                console.log(data)
				            wx.config({
			                    debug: false,
			                    appId: data.appId,
			                    timestamp: data.timestamp,
			                    nonceStr: data.noncestr,
			                    signature: data.signature,
			                    jsApiList: [
			                        "onMenuShareTimeline",
			                        "onMenuShareAppMessage",
			                        "onMenuShareQQ",
			                        "onMenuShareQZone",
			                        "onMenuShareWeibo",
			                        "chooseWXPay",
			                        "openLocation",
			                        "previewImage",
			                        "getLocation",
			                        "scanQRCode",
			                        "hideMenuItems",
			                        "closeWindow"
			                    ]
			                });
			                wx.ready(function() {
			                    wx.isReady = true;
			                    console.log("wx-ready");
			                    wx.hideMenuItems({
			                        menuList: [
			                            "menuItem:share:appMessage",
			                            "menuItem:share:timeline",
			                            "menuItem:share:qq",
			                            "menuItem:share:weiboApp",
			                            "menuItem:favorite",
			                            "menuItem:share:facebook",
			                            "menuItem:share:QZone",
			                            "menuItem:editTag",
			                            "menuItem:delete",
			                            "menuItem:copyUrl",
			                            "menuItem:originPage",
			                            "menuItem:readMode",
			                            "menuItem:openWithQQBrowser",
			                            "menuItem:openWithSafari",
			                            "menuItem:share:email",
			                            "menuItem:share:brand"
			                        ]
			                    });
			                });
			                wx.error(function() {
			                    wx.isReady = true;
			                    console.log("wx-error");
			                });
			                // 调用支付
							this.$http.post(_config.server+'/wechat/store/charge',params).then(res=>{
								console.log(res)
								if(res.status==200&&res.data.status==10000){
									wx.chooseWXPay({
										// appId:res.data.data.appId,
									    timestamp: res.data.data.timestamp,
									    nonceStr: res.data.data.nonceStr, 
									    package: res.data.data.package,
									    signType: res.data.data.signType,
									    paySign: res.data.data.paySign, 
									    success: function (res) {
									        alert("支付成功");
									    }
									})
								}
							},err=>{
								console.log(err)
							})
			            }
			        })
				}
			}
	}
</script>
<style scoped>
	section{
		color:#333;
	}
	.top{
		padding-left: 15px;
		background: #fff;
	}
	.title{
		line-height: 40px;
	}
	.number{
		border: 1px solid #999;
		height:30px;
		width:80%;
		text-align: center;
	}
	.cbtn{
		width:100%;
		overflow: hidden;
	}
	.price{
		float: left;
		width:33.33333333%;
		box-sizing:border-box;
		padding:15px;
	}
	.pri{
		border-radius: 5px;
		border: 1px solid #999;
		text-align: center;
		height:40px;
		line-height: 40px;
	}
	.size{
		line-height: 50px;
		padding-left: 15px;
	}
	.wx{
		width:20px;
	}
	.bottom{
		background: #fff;
		height:80px;
		padding-left:15px;
		line-height: 80px;
		border-bottom:1px solid #999;
	}
	.reBtn{
		padding:30px 15px;
	}
	.rechargeBtn{
		width:100%;
		height:45px;
		line-height: 45px;
		background-image:-webkit-linear-gradient(left,#FFEC1C ,#FFD40C);
		border-radius: 10px;
		text-align: center;
	}
</style>