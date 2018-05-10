<template>
	<section>
		<list v-for="(item,index) in d" :key="index" :leftT="a" :leftB="b" :rightC="c+'元'" ></list>
		<!-- <button @click="tap">点击就变</button> -->
		<Infinite v-on:infinite="infiniteMore" ></Infinite>
		<!-- <loading></loading> -->
	</section>
</template>
<script>
   import Loading from '../../../components/loading'
   import Space from '../../../components/space/space'
   import Err from '../../../components/err/err'
   import List from '../../../components/list/list'
   import Infinite from "vue2-infinite-scroll";
	export default{
        components:{Infinite,Loading,Space,Err,List},
		data(){
			return{
				a:'2017-1-24 13:00',
				b:'今天天不错',
				c:600,
				d:[1,2,3,4,5],
				i:1
			}
		},
		methods:{
			// tap(){
			// 	this.c++;
			// },
			infiniteMore($state) {
				var me = this;
			    this.$http.post("http://api.lottery.haokefuns.com/device/listDeviceByNo",{no:"83EBC34E8FBD43CE9BCAB2237C84BF16",pageNo:this.i,pageSize:"2",type:1}).then(res => {
			          // this.aaa = this.aaa.concat(data.data.b.data);
			          console.log(res)
			          this.d =this.d.concat( res.data.data.deviceList)
			          $state.loaded();   //这次加载完毕
			          me.i++;
			          console.log(res.data.data.deviceList.length)
			          if (res.data.data.deviceList.length<2) {
			          	$state.completed("全部加载完了");
			          }
       			})
   			},

		}
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