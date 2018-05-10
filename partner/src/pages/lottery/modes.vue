<template>
	<section>
		<div v-title>彩票模式管理</div>
		<err v-if="wErr"></err>
		<div v-if="!wErr">
			
			<div class="weui-cells__title">请选择彩票模式(所有设备)</div>
			<div class="weui-cells weui-cells_radio">
				<label class="weui-cell weui-check__label" for="x11">
			 		<div class="weui-cell__bd">
			 			<p>金豆模式</p>
			 		</div>
			 		<div class="weui-cell__ft">
			 			<input type="radio" v-model="check" class="weui-check" value="GAME"  name="radio1" id="x11"/>		 
			 			<span class="weui-icon-checked"></span>
			 		</div>
				</label>
				<label class="weui-cell weui-check__label" for="x12">

			 		<div class="weui-cell__bd">
			 			<p>积分模式</p>
			 		</div>
			 		<div class="weui-cell__ft">
			 			<input type="radio" name="radio1"  v-model="check" value="TD"  class="weui-check" id="x12" />		 
			 			<span class="weui-icon-checked"></span>
			 		</div>
				</label>
				<!-- <label class="weui-cell weui-check__label" for="x13">

			 		<div class="weui-cell__bd">
			 			<p>出票模式</p>
			 		</div>
			 		<div class="weui-cell__ft">
			 			<input type="radio" v-model="check"   value="REMOTE" name="radio1" class="weui-check" id="x13" />		 
			 			<span class="weui-icon-checked"></span>
			 		</div>
				</label> -->
			</div>
			<!-- <div class="msg">设置商家名下所有设备</div> -->
			<div class="btnBox">
				<div class="upBtn" @click="sub">确定</div>
			</div>
			<modals v-if="showModel" :title="check=='GAME'?'设置彩票模式为:金豆模式?':check=='TD'?'设置彩票模式为:积分模式?':'设置彩票模式为:出票模式?'"></modals>
			<loading v-if="zhuan"></loading>
			<victory v-if="success" :victory="true" behavior="设置成功"></victory>
			<victory v-if="fail" :victory="false" behavior="设置失败"></victory>
		</div>
	</section>
</template>
<script>
	import Modals from '../../components/modals/modals'
	import Loading from '../../components/loading'
	import Err from '../../components/err/err'
	import Victory from '../../components/victory/victory'
	export default{
		components:{Modals,Loading,Victory,Err},
		data(){
			return{
				check:'GAME',
				showModel:false,
				zhuan:false,
				success:false,
				fail:false,
				wErr:false
			}
		},
		methods:{
			query(){
				this.zhuan = true;
				this.$http.post(_config.server+'/device/mode/query',{storeNo:hcb.user().storeNo}).then(res=>{
					var that = this;
					if(res.status==200&&res.data.status==10000){
						this.check = res.data.data;
					}else{
						this.wErr = true;
					}
					setTimeout(function(){
						that.zhuan = false; 
					},300)
				},err=>{
					this.zhuan = false;
					this.wErr = true;
				})
			},
			sub(){
				this.showModel = true;
			},
			// 确认
			confirm(){
				var params = {
					storeNo:hcb.user().storeNo,
					mode:this.check
				}
				this.zhuan = true;
				this.$http.post(_config.server+'/device/mode/change',params).then(res=>{
					console.log(res)
					if(res.status==200&&res.data.status==10000){
						this.zhuan = false;
						this.showModel = false;
						this.success = true;
						var that = this;
						setTimeout(function(){
							that.success = false;
							that.$router.push({path:'/site'})
						}, 1000)

					}else{
						this.zhuan = false;
						this.showModel = false;
						this.fail = true;
						var that = this;
						setTimeout(function(){
							that.fail = false;
						}, 2000)
					}
				},err=>{
					this.zhuan = false;
					this.showModel = false;
					this.fail = true;
					var that = this;
					setTimeout(function(){
						that.fail = false;
					}, 2000)
				})
			},
			cancel(){
				this.showModel = false;
			}
		},
		created(){
			this.query()
		}
	}
</script>
<style scoped>
   section{
   	height:100vh;
   	overflow: hidden;
   }
  .btnBox{
  	padding:15px;
  	margin-top:40px;
  }
  .upBtn{
  	width:100%;
  	height:45px;
  	line-height: 45px;
  	text-align: center;
  	background-image:-webkit-linear-gradient(left,#FFEC1C ,#FFD40C);
  	border-radius: 5px;
  }
</style>