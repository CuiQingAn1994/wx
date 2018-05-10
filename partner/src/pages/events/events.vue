<template>
	<section>
		<div v-title>{{eventName}}</div>
		<!-- <div v-title>创建比赛</div> -->
		<div>
			<div class="weui-cells weui-cells_form">
				 <!-- <div class="weui-cell"> -->
				 	<!-- <div class="weui-cell__hd">
				 		<label for="" class="weui-label">游戏模式</label>
				 	</div>
				 	<div class="weui-cell__bd">
				 		<select v-model="pattern">
				 			<option value="" selected style="display:none">请选择</option>
				 			<option value="gold">金豆</option>
				 			<option value="point">积分</option>
				 		</select>
				 	</div>
				 	<div class="arrow"><img src="./arrow.png" class="arrImg" alt=""></div> -->
				 <!-- </div> -->
				 <div class="weui-cell">
				 	<div class="weui-cell__hd">
				 		<label for="" class="weui-label">开始时间</label>
				 	</div>
				 	<div class="weui-cell__bd">
				 		<input class="weui-input" v-model="begin" type="datetime-local" value="" placeholder=""/>
				 		<!-- <input type="text"> -->
				 	</div>
				 </div>
			
				<div class="weui-cell">
				 	<div class="weui-cell__hd">
				 		<label for="" class="weui-label">结束时间</label>
				 	</div>
				 	<div class="weui-cell__bd">
				 		<input class="weui-input" v-model="end" type="datetime-local" value="" placeholder=""/>
				 		<!-- <input type="text"> -->
				 	</div>
				 </div>
		
				<div class="weui-cell">
                <div class="weui-cell__hd"><label class="weui-label">报名费(积分)</label></div>
                <div class="weui-cell__bd">
                    <input class="weui-input" v-if="!checked"  v-model="fee" type="text"  placeholder="请输入报名费"/>
                    <input class="weui-input" v-if="checked"  v-model="fee" type="text" disabled  placeholder="免费"/>

                </div>
                <!-- <div class="weui-cell__bd">
                    <el-checkbox v-model="checked" class="">免报名费</el-checkbox>
                </div> -->
            </div>

				<div class="weui-cell">
					<div class="weui-cell__hd">
						<label class="weui-label">赛事标题</label>
					</div>
					<div class="weui-cell__bd">
						<input class="weui-input" v-model="title" type="text" placeholder="不超过8个字"/>				
					</div>
				</div>

				<div class="weui-cell">
					<div class="weui-cell__hd">
						<label class="weui-label">赛事简介</label>
					</div>
					<div class="weui-cell__bd">
						<input class="weui-input" v-model="summary" type="text"  placeholder="不超过88个字"/>				
					</div>
				</div>

				<div class="weui-cell">
					<div class="weui-cell__hd">
						<label class="weui-label">赛事规则</label>
					</div>
					<div class="weui-cell__bd">
						<input class="weui-input" v-model="detail" type="text"  placeholder="请输入赛事介绍"/>				
					</div>
				</div>

				<div class="weui-cell">
					<div class="weui-cell__hd">
						<label class="weui-label">奖励类型</label>
					</div>
					<div class="weui-cell__bd">
						  <el-radio v-model="rewardType" label="money">奖金</el-radio>
  						  <el-radio v-model="rewardType" label="gold">金豆</el-radio>		
					</div>
				</div>

				
				<div class="weui-cell">
					<div class="weui-cell__hd">
						<label class="weui-label">数量(<span v-if="rewardType=='money'">元</span><span v-if="rewardType=='gold'">金豆</span> )</label>
					</div>
					<div class="weui-cell__bd">
						<input class="weui-input" v-model="bonus" type="text" pattern="[0-9]*" :placeholder="prizeMsg"/>				
					</div>
					<div v-if="rewardType=='gold'" class="weui-cell__bd">
						<span style="float:right">{{bonus/100 | currency('¥',2)}}</span>			
					</div>
				</div>
			</div>
			<p>
				<div class="weui-cells__title">{{listTitle}}</div>
				<div class="allChoose">
					
					<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
				</div>
				 <div style="margin: 15px 0;"></div>
				 <el-checkbox-group text-color="#333" v-model="checkedUsers" @change="handleCheckedUsersChange">
				 	<el-checkbox  v-for="(item,index) in userList" :label="idNum.storeNo&&item.deviceNo?item.deviceNo:item._id" :key="index">{{idNum.storeNo&&item.deviceNo?item.deviceNo:item.name}}</el-checkbox>
				 </el-checkbox-group>
			</p>	
		</div>
		<div class="msg">{{msg}}</div>
		<div v-if="loaded" @click="sub" class="btn">创建</div>
		<!-- 创建成功弹窗 -->
		<div class="bg" v-if="ok_alert">
			<div class="recharge_ok">
				<img src="./success.png" alt="" class="icon">		 
				<p class="bg_tips">系统提示</p>
				<p class="bg_content">比赛创建成功</p>
				<router-link to="/eventList">
					<button>确定</button>
				</router-link>
			</div>
		</div>
		<!-- 创建失败弹窗 -->
		<div class="bg" v-if="no_alert">
			<div class="recharge_ok">
				<img src="./failure.png" alt="" class="icon">		 
				<p class="bg_tips">创建失败</p>
				<p class="bg_content">{{fail_msg}}</p>
				<!-- <router-link to="/eventList"> -->
					<button class="failBtn" @click = "cancel">确定</button>
				<!-- </router-link> -->
			</div>
		</div> 
		<loading v-if="zhuan"></loading>
	</section>
</template>
<script>
	let userOptions = [];
	import Loading from '../../components/loading'
	export default{
		components:{Loading},
		data(){
			return{
				type:"",
				pattern:"",
				fail_msg:'',
				checked: true,
				i:0,
				abled:true,
				eventName:"",
				zhuan:false,
				loaded:false,
				msg:"",
				ok_alert:false,
				no_alert:false,
				idNum:hcb.user(),
				colors:[],
				checkAll: false,
        	 	checkedUsers: [],
        	 	userList: [],
        	 	isIndeterminate: false,
        	 	listTitle:"",
        	 	begin:"",
		    	end:"",
		    	fee:"",
		    	title:"",
		    	summary:"",
		    	detail:"",
		    	key:"",
		    	appId:"",
		    	bonus:"",
		    	rewardType:"gold",
		    	prizeMsg:"输入奖励数量",
			}
		},
		methods:{
			query(){
				// 设置默认时间
				this.begin = this.timeFormat(new Date())
				this.end = this.timeFormat(new Date())
				console.log(this.begin)
				// 设置v-title
				this.eventName = this.$route.query.name;
				this.zhuan = true;
				var that = this;
				if(this.type==hcb.user().superNo){
						this.listTitle="选择参加比赛的代理"
						this.$http.post(_config.server+"/user/agent/list",{superNo:hcb.user().superNo}).then(res=>{
							console.log(res,'总代下的代理')
							setTimeout(function(){
								that.zhuan = false;
							}, 300)
							if(res.data.status==10000){
								this.loaded = true;
								this.userList = res.data.data
								console.log(this.userList)
								for(let i = 0;i<this.userList.length;i++ ){
									
										userOptions.push(this.userList[i]._id)
								}
							}
						})
				}else if(this.type==hcb.user().agentNo){
					this.listTitle="选择参加比赛的商户"
					console.log({agentNo:hcb.user().agentNo})
					this.$http.post(_config.server+"/user/store/list",{agentNo:hcb.user().agentNo}).then(res=>{
						console.log(res,'代理下的商户')
						setTimeout(function(){
							that.zhuan = false;
						}, 300)
						if(res.data.status==10000){
							this.loaded = true;
							this.userList = res.data.data
							// userOptions = res.data.data
							for(let i = 0;i<this.userList.length;i++ ){
								
								userOptions.push(this.userList[i]._id)
								
							}
						}
					})
				}
				else if(this.type==hcb.user().storeNo){
					this.listTitle="选择参加比赛的设备"
					this.$http.post(_config.server+"/user/device/list",{storeNo:hcb.user().storeNo}).then(res=>{
						console.log(res,'商户下的设备')
						setTimeout(function(){
							that.zhuan = false;
						}, 300)
						if(res.data.status==10000){
							this.loaded = true;
							this.userList = res.data.data
							for(let i = 0;i<this.userList.length;i++ ){
								userOptions.push(this.userList[i].deviceNo)		
							}
						}
					})
				}
			},
			handleCheckAllChange(val) {
				console.log(val)
				console.log(userOptions)
		        this.checkedUsers = val ? userOptions : [];
		        console.log(this.checkedUsers)
		        this.isIndeterminate = false;
		      },
		    handleCheckedUsersChange(value) {
		    	console.log(value)
		        let checkedCount = value.length;
		        this.checkAll = checkedCount === this.userList.length;
		        this.isIndeterminate = checkedCount > 0 && checkedCount < this.userList.length;
		      },
		    sub(){
		    	var that = this;
		    	let parmas = {
		    		uid:hcb.user().uid,
		    		deviceNo:hcb.user().storeNo?this.checkedUsers.join(','):"",
		    		storeNo:hcb.user().agentNo?this.checkedUsers.join(','):"",
		    		agentNo:hcb.user().superNo?this.checkedUsers.join(','):"",
		    		begin:new Date(this.begin).getTime()-8*60*60*1000,
		    		end:new Date(this.end).getTime()-8*60*60*1000,
		    		// begin:new Date(this.getLocalTime(8,this.begin)).getTime(),
		    		// end:new Date(this.getLocalTime(8,this.end)).getTime(),
		    		fee:this.fee,
		    		title:this.title,
		    		summary:this.summary,
		    		rule:this.detail,
		    		key:this.$route.query.key,
		    		appId:this.$route.query.appId,
		    		bonus:this.bonus,
		    		role:hcb.user().superNo==this.type?"super":hcb.user().agentNo==this.type?"agent":"store",
		    		pattern:'point',
		    		rewardType:this.rewardType,
		    		roleId:this.type
		    	}
		    	console.log(JSON.stringify(parmas))
		    	// alert("开始时间:"+new Date(parmas.begin).getTime()+"结束时间:"+new Date(parmas.end).getTime()+'当前时间:'+new Date())
		    	if(parmas.fee==''){
		    		parmas.fee='0'
		    	}
		    	console.log(parmas.begin&&parmas.end&&parmas.fee&&parmas.title&&parmas.summary&&parmas.rule&&parmas.bonus)
		    	console.log(parmas)
		    	if(parmas.begin&&parmas.end&&parmas.fee&&parmas.title&&parmas.summary&&parmas.rule&&parmas.bonus){
		    		if(hcb.user().superNo==this.type){
		    			if(parmas.agentNo==""){
		    				this.msg="请选择参赛的代理"
		    				return
		    			}
		    		}
		    		if(hcb.user().agentNo==this.type){
		    			if(parmas.storeNo==""){
		    				this.msg="请选择参赛的商家"
		    				return
		    			}
		    		}
		    		if(hcb.user().storeNo==this.type){
		    			if(parmas.deviceNo==""){
		    				this.msg="请选择参赛的设备"
		    				return
		    			}
		    		}
		    		if(parmas.begin>=parmas.end){
		    			this.msg="结束时间要大于开始时间"
		    			return;
		    		}else {
		    			if(parmas.end<=new Date().getTime()){
		    				this.msg="结束时间要大于当前时间"
		    				return;
		    			}
		    		}
		    		// console.log(+parmas.fee!=0&&+parmas.fee<10)
		    		// if(+parmas.fee!=0&&+parmas.fee<10){
		    		// 	this.msg='请输入10以上的金币'
		    		// 	return
		    		// }
		    		this.zhuan = true;
		    		this.msg = '';
			    	this.$http.post(_config.server+"/bn/match/create",parmas).then(res=>{
			    		console.log(res)
			    		setTimeout(function(){
			    			that.zhuan = false;
			    		}, 300)
			    		if(res.data.status==10000){
			    			this.ok_alert = true;
			    		}else {
			    			this.no_alert = true;
			    			this.fail_msg = res.data.data;
			    		}
			    	},err=>{
			    		that.zhuan = false;
			    	})
		    	}else if(!parmas.title){
		    		this.msg="请输入赛事标题"
		    	}else if(!parmas.summary){
		    		this.msg="请输入赛事简介"
		    	}else if(!parmas.rule){
		    		this.msg="请输入赛事规则"
		    	}else if(!parmas.bonus){
		    		this.msg="请输入奖励数量"
		    	}	
		    },
		    timeFormat(input){
		    	var d = new Date(input);
    			var year = d.getFullYear();
    			var month = d.getMonth()+1 <10 ?'0' + (d.getMonth()+1) : '' + (d.getMonth()+1);
    			var day = d.getDate() <10 ? '0' + d.getDate() : '' + d.getDate();
    			var hour = d.getHours()<10?'0'+d.getHours():''+d.getHours();
    			var minutes = d.getMinutes() <10 ? '0' + d.getMinutes() : '' + d.getMinutes();
    			var seconds = d.getSeconds();
    			return year+ '-' + month + '-' + day + 'T' + hour + ':' + minutes
		    },
		    getLocalTime(i,t) {
        		//参数i为时区值数字，比如北京为东八区则输进8,西5输入-5
        		if (typeof i !== 'number') return;
        		var d = new Date(t);
        		//得到1970年一月一日到现在的秒数
        		var len = d.getTime();
        		//本地时间与GMT时间的时间偏移差
        		var offset = d.getTimezoneOffset() * 60000;
        		//得到现在的格林尼治时间
        		var utcTime = len + offset;
        		return new Date(utcTime + 3600000 * i);
   			},
   			cancel(){
   				this.no_alert = false;
   			},
   			free(){
   				if(this.i%2){
   					this.i++;
   					this.abled = true;
   					this.fee = '';
   					this.entryFee = '免报名费'
   				}else{
   					this.i++;
   					this.abled = false;
   					this.fee = '0';
   					this.entryFee = '输入报名费'
   				}
   			}

		},
		created(){
			// console.log(this.now)
			this.type = store.get('role')
			this.query()
		},
		watch:{
			// 报名费不能为小数
			fee(){
				this.fee=this.fee.replace(/[^0-9]/g,'')
				this.msg = "";
			},
			// 奖金不能位小数
			bonus(){
				// if(this.bonus.indexOf('.')!=-1){
					// console.log(this.bonus.indexOf('.'))
     				// this.bonus= this.bonus.substring(0,this.bonus.indexOf('.'))
        		// }
        		this.bonus=this.bonus.replace(/[^0-9]/g,'')
        		if(+this.bonus>500&&this.rewardType=='money'){
					this.bonus = 500+'';
				}else if(+this.bonus>100000000&&this.rewardType=='gold'){
					this.bonus = 100000000+'';
				}
				this.msg = "";
			},
			// 标题最多八位
			title(){
				if(this.title.length>8){
					this.title = this.title.substring(0,8)
				}
				this.msg = "";
			},
			// 简介最多88位
			summary(){
				if(this.summary.length>88){
					this.summary = this.summary.substring(0,88)
				}
				console.log(this.summary.length)
				this.msg = "";
			},
			checked(){
				if(this.checked){
					this.fee = '';
				}else {
					this.fee = '10'
				}
			},
			rewardType(){
				if(this.rewardType=="money"){
					this.prizeMsg = "输入奖励数量"
				}else if(this.rewardType=="gold"){
					this.prizeMsg = "输入奖励数量"
				}
			},
			checkedUsers(){
				this.msg = "";
			},
			begin(){
				this.msg = "";
			},
			end(){
				this.msg = "";
			}
		},
		updated(){
		}
	}
</script>
<style>
	.el-checkbox-group .el-checkbox{
		display: block;
		margin-left:30px;
		margin-bottom:10px;
		
	}
	.el-checkbox-group .el-checkbox .el-checkbox__label{
		font-size: 16px;
	}

	.weui-cells{
		margin-top:0;
	}
</style>
<style scoped>
	input::placeholder{
		font-size: 15px;
	}
	select{
	    -webkit-appearance: none;
	    border:none;
	    font-size: 16px;
	    height:25px;
	    padding-left: 15px;
	    float: left;
	    width:100%;
	    outline: none;
	    background: #fff;
  	}
	.arrow{
	    float: right;
	}
	 .arrow img{
    	width:8px;
    }








	.allChoose{
		margin-left:15px;
	}
	.btn{
		height:45px;
		/*width:100%;*/
		margin:0 15px;
		border-radius: 5px;
		background-image:-webkit-linear-gradient(left,#FFEC1C ,#FFD40C);
		text-align: center;
		line-height: 45px;
		margin-bottom:30px;
	}
	.msg{
		width:100%;
		padding-left: 15px;
		height:30px;
		line-height: 30px;
		color:red;
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
    z-index:999;
  }
  .bg_tips{
    padding-top:60px;
    color:#333;
    font-size: 18px;
    text-align: center;
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
  .btn_0{
    position: absolute;
    top:12.5px;
    right:15px;
    /*float: right;*/
  }
  .icon{
    position: absolute;
    height:90px;
    width:90px;
    left:50%;
    top:-45px;
    transform:translatex(-50%);
  }
  .bg_content{
     margin-top: 8px;
    font-size: 14px;
    color:#999;
    padding-bottom:20px;
    text-align: center;
  }
  button{
    width: 270px;
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
  .failBtn{
  	position: absolute;
  	bottom:15px;
  	left:15px;
  }
</style>