<template>
	<section>
	<div v-title>大乐透</div>		
		<div class="box">
			<ul class="head">
				<li v-for="(item,index) in head" @click="chooseRed(index)" :style="{background:redBall.indexOf(index)==-1?'#fff':'red'}" >{{item}}</li>
			</ul>
			<ul class="foot">
				<li v-for="(item,index) in foot" @click="chooseBlue(index)" :style="{background:blueBall.indexOf(index)==-1?'#fff':'blue'}" >{{item}}</li>
			</ul>
		</div>
		<div>共选择了{{betsNum}}注,共{{betsNum*2*times}}元</div>
		<div><span class="reduce" @click="reduce()">－</span><input type="text" class="times" v-model="times"><span class="add" @click="add()" >＋</span></div>
		<div class="btn" @click="Rondom" >机选一注</div>

	</section>
</template>
<script>
	export default{
		data(){
			return{
	 			head:['01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','21','24','25','26','27','28','29','30','31','32','33','34','35'],
	 			foot:['01','02','03','04','05','06','07','08','09','10','11','12'],
	 			redBall:[],
	 			blueBall:[],
	 			// idxRed:'',
	 			// idxBlue:'',
	 			// clickRed:false,
	 			betsNum:0,
	 			times:1
			}
		},
		computed:{
		},
		methods:{
			// 点击红球
			chooseRed(index){
				// this.idx=index;
				console.log(this.redBall.indexOf(index))
				if(this.redBall.indexOf(index)==-1){
					this.redBall.push(index)
				}else{
					this.redBall.splice(this.redBall.indexOf(index),1)
				}
				this.redBall.sort(function(a,b){
					return a-b>0
				})
				console.log(this.redBall)
			},
			// 点击蓝球
			chooseBlue(index){
				// this.idx=index;
				console.log(this.blueBall.indexOf(index))
				if(this.blueBall.indexOf(index)==-1){
					this.blueBall.push(index)
				}else{
					this.blueBall.splice(this.blueBall.indexOf(index),1)
				}
				this.blueBall.sort(function(a,b){
					return a-b>0
				})
				console.log(this.blueBall)
			},
			// 随机一注
			Rondom(){
				this.redBall = new Array(35)
    				.fill(0)
    				.map((v,i)=>i)
    				.sort(()=>0.5 - Math.random())
    				.filter((v,i)=>i<5);
    				// console.log(array)
    			this.blueBall = new Array(12)
    				.fill(0)
    				.map((v,i)=>i)
    				.sort(()=>0.5 - Math.random())
    				.filter((v,i)=>i<2);
    				// console.log(array)
			},
			// 阶乘
			jC(num){
				var sum = 1;
				for(var i=1;i<=num;i++){
					sum = sum*i
					// console.log(sum)
				}
				return sum
			},
			// 组合
			zH(all,choseNum){
				return this.jC(all)/(this.jC(choseNum)*this.jC(all-choseNum))
			},
			// 减倍数
			reduce(){
				this.times--
				if(this.times<1){
					this.times=1;
				}
				console.log(this.times)
			},
			// 增加倍数
			add(){
				this.times++
				if(this.times>99){
					this.times=99;
				}
			}
		},
		created(){
			this.$http.post("http://192.168.1.166:3000/user/code",{mobile:15501297314}).then(function(res){
				console.log(res)

			})
		},
		updated(){
			if(this.redBall.length<5||this.blueBall.length<2){
				this.betsNum = 0;
			}else{
				// this.betsNum =this.zH(this.redBall.length,5)*this.zH(this.blueBall.length,2)
				this.betsNum =Math.round(this.zH(this.redBall.length,5)*this.zH(this.blueBall.length,2))
			}
			if(this.times>99){
				this.times=99;
			}
			if(this.times<1){
				this.times= 1;
			}
			console.log(this.betsNum)
			console.log(this.$store.state.num)	
		}
	}
</script>
<style>
	.box li{
		float: left;
		width:25px; 
		height:25px;
		border-radius: 50%;
		margin-right:5px;
		margin-bottom:5px;
	}
	.box .head{
		overflow: hidden;
		background: #fff;
	}
	.box .head li{
		/*background: red;*/
		border:1px solid red;
	}
	.box .foot{
		overflow: hidden;
		background: #fff;
	}
	.box .foot li{
		/*background: blue;*/
		border:1px solid blue;
	}
	.times{
		text-align: center;
	}
</style>