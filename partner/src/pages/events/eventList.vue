<template>
	<section>
		<div v-title>游戏列表</div>
		<div v-for="(item,index) in data">
			<router-link :to="'/events?appId='+item.appId+'&key='+item.key+'&name='+item.appName">			
				<list  :key="index" :leftT="'     '+item.appName" :leftB="item.summary" rightC="创建比赛" ></list>
			</router-link>
		</div>
		<loading v-if="zhuan"></loading>
	</section>
</template>
<script>
	import List from '../../components/list/list'
	import Loading from '../../components/loading'
	export default{
		components:{List,Loading},
		data(){
			return {
				data:[],
				zhuan:false
			}
		},
		methods:{
			query(){
				this.zhuan = true;
				this.$http.post(_config.server+"/supplier/app/key/list").then(res=>{
					console.log(res)
					let that = this;
					console.log(res.data.data)
					if(res.data.status==10000){
						this.data = res.data.data
					}
					setTimeout(function(){
						that.zhuan = false;
					}, 200)
				},err=>{
					let that = this;
					setTimeout(function(){
						that.zhuan = false;
					}, 200)
				})
			}
		},
		created(){
			this.query()
		}
	}
</script>
