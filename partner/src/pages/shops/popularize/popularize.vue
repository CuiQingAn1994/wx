<template>
	<section>
		<div v-title>推广源管理</div>
		<!-- <router-link to="/upload"> -->
			<div class="add" @click="addCom">
				<span class="jia">+</span>
				<span class="title" >添加推广源</span>
			</div>
		<!-- </router-link> -->
		<p class="add_msg" v-if="list.length==0">您还没有推广源,请添加推广源</p>
		<div class="have">
			<ul>
				<li v-for="item in list" class="rela" >
					<!-- <router-link  :to="'/uploadDetail?_id='+item._id"> -->
						<div class="record">
							<div class="center">
								<p class="title">
									<span>{{item.name}}&nbsp;({{item.bit}}%)</span>
								</p>

								<p class = "timer">手机号:{{item.mobile}}</p>
							</div>
							<!-- <div class="right">
								<div >
									<span class="sta" >{{item.bit}}%</span>
								</div>
							</div> -->
						</div>
					<!-- </router-link> -->
						<div class="update">
							<!-- <div class="line"></div> -->
							<div class="updateBox">
								<span @click="compile(item._id)" class="compile">编辑</span>
								<img  @click="compile(item._id)" src="./img/bj.png" alt="">
								<span @click="goDel(item._id)" class="delete">删除</span>
								<img  @click="goDel(item._id)" src="./img/sc.png" alt="">
							</div>
						</div>
					
					<div class="line"></div>
				</li>
			</ul>
		</div>
		<!-- 弹窗 -->
		<div class="bg" v-if="get" >
			<div class="recharge_ok">
				<div class="inBox">
					<p class="labalBox">
						<span class="labal">姓名</span>
						<input type="text" v-if="clickSta=='addCom'" v-focus v-model="name" placeholder="推广源姓名" class="tipsMsg">
						<input type="text" disabled v-if="clickSta=='compile'" autofocus v-model="name" placeholder="推广源姓名" class="tipsMsg">
					</p>
					<div class="line"></div>
					<p class="labalBox">
						<span class="labal">手机号</span>
						<input v-if="clickSta=='addCom'" type="number" v-model="mobile" placeholder="推广源手机号" class="tipsMsg">
						<input v-if="clickSta=='compile'" disabled type="number" v-model="mobile" placeholder="推广源手机号" class="tipsMsg">
					</p>
					<div class="line"></div>
					<p class="labalBox">
						<span class="labal">分润比例(%)</span>
						<input type="number" v-if="clickSta=='addCom'" v-model="bit" placeholder="1-99" class="tipsMsg tipsBit">
						<input type="number" v-if="clickSta=='compile'" v-focus v-model="bit" placeholder="1-99" class="tipsMsg tipsBit">
					</p>
					<div class="line"></div>
					
				</div>
				<div class="btn_M">
					<p class="sure" @click="sure" >确定</p>
					<p class="off" @click="off" >取消</p>
				</div>
				<div class="warn" v-if="warn">{{warnMsg}}</div>
			</div>
		</div>
		<Modals v-if="del" title='确认删除该推广源?'></Modals>
		<loading v-if="zhuan"></loading>
		<victory v-if=tcShow :victory="addResult" :behavior="addMsg"></victory>
	</section>
</template>
<script>
	import Loading from '../../../components/loading'
	import Victory from '../../../components/victory/victory'
	import Modals from '../../../components/modals/modals'
	export default{
		components:{Loading,Victory,Modals},
		data(){
			return{
				list:[],
				zhuan:false,
				get:false,
				name:"",
				mobile:"",
				bit:'',
				warnMsg:"",
				warn:false,
				clickSta:'',
				addMsg:"添加成功!",
				addResult:true,
				tcShow:false,
				pid:'',
				del:false

			}
		},
		created(){
			this.query();
		},
		methods:{
			// 拉取推广源列表
			query(){
				let that = this;
				this.zhuan = true;
				this.$http.post(_config.server+'/promoter/list',{storeNo:hcb.user().storeNo}).then(res=>{
					console.log(res)
					if(res.status==200&&res.data.status==10000){
						this.list = res.data.data
					}
					setTimeout(function(){
						that.zhuan = false;
					}, 200)
				})
			},
			// 确认添加/修改推广源
			sure(){
				let that = this;
				if (this.name=='') {
						this.warn = true
						this.warnMsg = '请输入推广源姓名'
						setTimeout(function(){
							that.warn = false;

						}, 2000)
				}else if(this.mobile==''){
					this.warn = true
					this.warnMsg = '请输入推广源手机号'
					setTimeout(function(){
						that.warn = false;
					}, 2000)
				}else if(!(/^1(3|4|5|7|8)\d{9}$/.test(this.mobile))){
					this.warn = true
					this.warnMsg = '手机号错误'
					setTimeout(function(){
						that.warn = false;
					}, 2000)
				}else if(this.bit==''){
					this.warn = true
					this.warnMsg = '请输入分润比例'
					setTimeout(function(){
						that.warn = false;
					}, 2000)
				}else{
					
					if(this.clickSta=='addCom'){
						var paramsAdd = {
							storeNo:hcb.user().storeNo,
							name:this.name,
							mobile:this.mobile,
							bit:this.bit
						}
						// 添加推广源
						this.$http.post(_config.server+'/promoter/join',paramsAdd).then(res=>{
							console.log(res)
							if(res.status==200&&res.data.status==10000){
								this.tcShow = true;
								this.addMsg = '添加成功!'
								this.name = '';
								this.mobile = '';
								this.bit = '';
								this.get = false;
								this.addResult = true;
								setTimeout(function(){
									that.tcShow = false;
									that.query();
								}, 1500)
							}else{
								this.tcShow = true;
								this.addResult = false;
								this.addMsg = res.data.data;
								// this.name = '';
								// this.mobile = '';
								// this.bit = '';
								this.get = false;
								setTimeout(function(){
									that.tcShow = false;
									that.get = true;
									// that.query();
								}, 1500)
							}
						})
					}else if(this.clickSta=='compile'){
						var paramsCom = {
							pid:this.pid,
							bit:this.bit
						}
						// 修改推广源比例
						this.$http.post(_config.server+'/promoter/update',paramsCom).then(res=>{
							console.log(res)
							if(res.status==200&&res.data.status==10000){
								this.addResult = true;
								this.tcShow = true;
								this.addMsg = '修改成功!'
								this.name = '';
								this.mobile = '';
								this.bit = '';
								this.get = false;
								setTimeout(function(){
									that.tcShow = false;
									that.query();
								}, 1500)
							}
						})
					}
				}
			},
			// 取消
			off(){
				this.get = false;
			},
			// 修改
			compile(id){
				this.pid = id;
				this.$http.post(_config.server+'/promoter/detail',{pid:id}).then(res=>{
					// console.log(res)
					this.clickSta = 'compile'
					this.get = true;
					this.name = res.data.data.name;
					this.mobile = res.data.data.mobile;
					this.bit = res.data.data.bit;
				})
			},
			// 添加
			addCom(){
				this.clickSta = 'addCom'
				this.get = true;
				this.name = '';
				this.mobile = '';
				this.bit = ''
			},
			// 点击删除
			goDel(id){
				this.pid = id;
				this.del = true;
			},
			// 确认删除
			confirm(){
				let that = this;
				console.log({pid:this.pid})
				this.$http.post(_config.server+'/promoter/delete',{pid:this.pid}).then(res=>{
					if(res.status==200&&res.data.status==10000){
						this.addResult = true;
						this.del = false;
						this.tcShow = true;
						this.addMsg = '删除成功!'
						setTimeout(function(){
							that.tcShow = false;
							that.query();
						}, 2000)
					}
				},err=>{
					this.addResult = false;
					this.del = false;
					this.tcShow = true;
					this.addMsg = '删除失败!'
					setTimeout(function(){
						that.tcShow = false;
						// that.query();
						// that.del = true;
					}, 2000)
				})
			},
			// 取消删除
			cancel(){
				this.del = false;
			}
		},
		watch:{
			name(){
				if(this.name.length>10){
					this.name = this.name.substring(0,10)
				}
			},
			mobile(){
				if(this.mobile.length>11){
					this.mobile = this.mobile.substring(0,11)
				}
			},
			bit(){

				if(this.bit<1&&this.bit!=''){
					this.bit=1
				}else if(this.bit>99){
					this.bit=99
				}
				if(this.bit){
			        if((this.bit+'').indexOf('.')!=-1){
			          var len = this.bit.substring(this.bit.indexOf('.')+1)
			          console.log(len.substring(0,2))
			          this.bit =''+ parseInt(this.bit)+'.'+len.substring(0,2)
			        }
      			}
			}
		}

	}
</script>
<style scoped>
/*订单列表*/
	input{
		font-size: 16px;
		background: #fff;
	}
	input::placeholder{
		font-size: 14px;
	}
	 .record{
		box-sizing:border-box;
		padding:0 15px;
		overflow: hidden;
		height:74px;
		background: #fff;
		/*border-bottom: 1px solid #eee;*/

	}
	 div.left{
		width:50px;
		text-align: center;
		float: left;
		height:90px;
	}
	 div.right{
		width:20%;
		text-align: center;
		float: right;
		height:90px;
	}
	 div.left{
		overflow: hidden;
	}
	 div.left img{
		width:30px;
		float: left;
		margin-top:22px;
		
	}
	 div.center{
		width:50%;
		text-align: center;
		float: left;
		height:74px;
		padding:15px 0;
		box-sizing:border-box;
	}
	 div.center p{
		height:20px;
		line-height: 20px;
		text-align: left;
	}
	 div.center p.title{
		height:24px;
		line-height: 24px;
		font-size: 14px;
		color:#333;
		display: block;
   		text-overflow:ellipsis;
   		white-space: nowrap;
   		overflow: hidden;
	}
	 div.center p.jifen{
		height:18px;
		line-height: 18px;
		height:20px;
		line-height: 20px;
		font-size: 12px;
		color:#777;
		text-align: left;
	}
	 div.center p.timer{
		height:20px;
		line-height: 20px;
		color:#999;
		font-size: 12px;
		color:#999;
	}
	 div.right {	
		font-size: 14px;
		width:30%;
		color:#777;
		height:74px;
		box-sizing:border-box;
	} 
	 .btn{
		width:100%;
		height:50px;
		line-height: 50px;
		text-align: center;
		background: #f6f6f6;
		color:#999;
		font-size: 14px;

	}
	 .sta{
		float: right;
		width:120px;
		line-height: 74px;
		font-size: 14px;
		text-align: right;

	}
	 .detail{
		float: right;
		/*height:16px;*/
		width:8px;
		/*height:14px;*/
		/*padding-top:27px;*/
		margin-top:28px;
	}
	.add{
		height:60px;
		border-bottom: 1px solid #999;
		text-align: center;
		line-height: 60px;
		background: #fff;
	}
	.add span{
		float: left;
		width:33.33333333%;
	}
	.jia{
		font-size: 40px
	}
	.add_msg{
		text-align: center;
		padding-top: 15px;
    	font-size: 14px;
    	color: #999;
	}
	li.rela{
		position: relative;
		width:100%;
	}
	.update{
		background: #fff;
		padding-left:15px;
		width:150px;
		font-size: 14px;
		position: absolute;
		right:0;
		top:50%;
		transform:translateY(-50%);
		
	}
	.updateBox{
		padding:10px 15px 10px 0;
		overflow: hidden;
	}
	.update img{
    	width: 20px;
    	height: 20px;
    	margin-right: 3px;
    	float: right;
	}
	.compile{
		float:right;
	}
	.delete{
		float: right;
		margin-right:10px;
	}


	/*弹窗*/
	.bg{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background: rgba(0,0,0,0.6);
    z-index:1;
  }
  .recharge_ok{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
   	width: 300px;
    height: 200px;
    background: #fff;
    /*border-radius: 5px;*/
    color: #333;
    /*padding: 16px 0;*/
    text-align: center;
    overflow: hidden;
    font-size: 18px;

  }
  .btn_M{
    height:45px;
    overflow: hidden;
    padding:0 15px;
    position: absolute;
    bottom: 15px;
  }
 .btn_M p{
    width:130px;
    float: left;
  	border-radius: 5px;
    line-height: 44px;
    height: 44px;
    font-size: 16px;
    color:#333;
    text-align: center;
  }
.off{
    border:2px solid #d0d0d0;

  }
.sure{
    background-image:-webkit-linear-gradient(left,#FFEC1C ,#FFD40C);
  	border:none;
  	margin-right:10px;
  }
  .tipsMsg{
  	width:100%;
  	height:40px;
  	left:0;
  	top:0;
  	float: left;
  	padding-left:100px;
  	border:none;
  	outline: none;
  	position: absolute;
  	/*border-bottom:1px solid #;*/
  }
/*  .tipsBit{
  	width:100px;
  }*/
  .inBox{
  	padding:10px 15px 0;
  	font-size: 16px;
  }
  .labalBox{
  	overflow: hidden;
  	width:100%;
  	height:40px;
  	position: relative;
  }
  .labal{
  	/*width:92px;*/
  	height:40px;
  	line-height: 40px;
  	float: left;
  	display: inline-block;
  	text-align: left;
  	position: absolute;
  	left:0;
  	top:0;
  	z-index:1;
  }
  .warn{
  	position: absolute;
  	top:50%;
  	left:50%;
  	transform:translate(-50%,-50%);
  	width:150px;
    height:35px;
	background:rgba(0,0,0,.7);
    border-radius:20px;
    font-size:14px;
    color:#fff;
    line-height: 35px;
    text-align: center;
  }
</style>
