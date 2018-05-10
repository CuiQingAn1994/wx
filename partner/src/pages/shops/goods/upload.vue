<template>
	<section>
		<div v-title>添加奖品</div>
		<div class="rowAll">
			<!--  -->
		    <div class="row">
		    	<div class="title">
		    		<label class="weui-label">奖品名称</label>
		    	</div>
		    	<div class="weui-cell__bd">
		    		<input class="input" v-model="name" type="text" placeholder="不超过12个字"/>	    
		    	</div>
		    </div>
		    <div class="line"></div>		    
		    <div class="row">
		    	<div class="title">
		    		<label class="weui-label">价格(元)</label>
		    	</div>
		    	<input
	             class="input"
	             type="number"
	             placeholder="请输入商品价格"
	             v-model="price"></input>
		    </div>
		    <div class="line"></div>		    
		    <div class="row">
		    	<div class="title">
		    		<label class="weui-label">库存</label>
		    	</div>
		    	<input
	             class="input"
	             type="number"
	             placeholder="请输入库存"
	             v-model="num"></input>
		    </div>
		    <div class="line"></div>		    
		    <!-- <div class="row">
		    	<div class="title">
		    		<label class="weui-label">简介</label>
		    	</div>

		    	<input
	             class="input"
	             placeholder="请输入商品简介"
	             v-model="summary"></input>
		    </div> -->

		    <div class="weui-cells weui-cells_form">
		    	<div class="weui-cell">
		    		<div class="weui-cell__bd">
		    			<textarea class="weui-textarea" v-model="summary" placeholder="请输入简介" rows="3"></textarea>
		    			<div class="weui-textarea-counter">
		    				<span>{{length}}</span>
		    				/200
		    			</div>
		    		</div>
		    	</div>
		    </div>
		    <div class="weui_cells weui_cells_form">
		    	<div class="weui_cell">
		    		<div class="weui_cell_bd weui_cell_primary">
		    			<div class="weui_uploader">
		    				<div class="weui_uploader_hd weui_cell">
		    					<div class="weui_cell_bd weui_cell_primary">图片上传</div>
		    				</div>
		    				<div class="weui_uploader_bd">
		    					<ul class="weui_uploader_files">
		    						<li v-if="cdn_url" class="weui_uploader_file" :style="'backgroundImage:url('+cdn_url+')'"></li>
		    					</ul>
		    					<div class="weui_uploader_input_wrp">
		    						<input class="weui_uploader_input" type="file" accept="image/*"  @change="uploadThumb"/>		    
		    					</div>
		    				</div>
		    			</div>
		    		</div>
		    	</div>
      		</div>
		</div>
      	<div class="weui-cell__bd bgShelves">
            <el-checkbox v-model="shelves" class="shelves">上架</el-checkbox>
        </div>
		<div class="warnMsg">{{warnMsg}}</div>
		<div class="btnBox">
			<div class="upBtn" @click="sub">确定</div>
		</div>
		<modals v-if="btnShow" title="确认上传?"></modals>
		<victory v-if="showSuc" victory="true" behavior="上传成功"></victory>
		<div class="bg" v-if="tipsNo">
			<div class="recharge_no">
				<p class="bg_tips">提现失败</p>
				<img src="../../../components/victory/fail.png" alt="" class="icon">		
				<p class="bg_content">{{fail_msg}}</p>
				<button @click="modelHide()">确定</button>
			</div>
		</div>
		<loading v-if="zhuan"></loading>
	</section>	

</template>
<script>
import Loading from '../../../components/loading'
import Modals from '../../../components/modals/modals'
import Victory from '../../../components/victory/victory'

	export default{
		 components:{Loading,Modals,Victory},
		data(){
			return{
				name:"",
				price:"",
				num:"",
				thumb:"",
				summary:"",
				cdn_url:"",
				btnShow:false,
				warnMsg:"",
				shelves:false,
				showSuc:false,
				fail_msg:"",
				tipsNo:false,
				zhuan:false,
				length:0
			}
		},
		methods:{
			sub(){
				if(this.name&&this.price&&this.num&&this.summary&&this.cdn_url){
					this.btnShow = true
				}else{
					if (this.name=="") {
						this.warnMsg = '请输入正确商品名称!'
					}else if(this.price==""){
						this.warnMsg = '请输入正确格式的价格!'
					}else if(this.num==""){
						this.warnMsg = '请输入正确格式的库存!'
					}else if(this.summary==""){
						this.warnMsg = '请输入简介!'
					}else if(this.cdn_url==""){
						this.warnMsg = '请上传图片!'
					}
					var that = this;
					setTimeout(function(){
						that.warnMsg = ""
					}, 3000)
				}
			},
			// 确认
			confirm(){
				var params = {
					name:this.name,
					type:'entity',
					thumb:this.cdn_url,
					summary:this.summary,
					num:this.num,
					recommand:false,
					storeNo:hcb.user().storeNo,
					shelves:this.shelves,
					tag:'gold',
					priceNum:this.price*1200,
					original:this.price
				}
				console.log(params)
				this.zhuan = true;
				this.$http.post(_config.server+'/shop/goods/save',params).then(res=>{
					console.log(res)
					if(res.status==200&&res.data.status==10000){
						this.zhuan = false;
						this.showSuc = true;
						this.btnShow = false;
						var that = this;
						setTimeout(function(){
							that.showSuc = false;
							that.$router.push({path:'/uploadList'})
						}, 1000)
					}else{
						this.zhuan = false;
						this.tipsNo = true;
						this.fail_msg = res.data.data;
						this.btnShow = false;
					}
				})
			},
			// 取消
			cancel(){
				this.btnShow = false
			},
			// 上传图片
			uploadThumb(event){
		        var that = this;
		        if(event.srcElement.files[0]){
		          var file = event.srcElement.files[0];
		          this.$http.get(_config.server+"/oss/policy").then(function(response){
		            var policy = response.data;
		            console.log(policy);
		            function guid() {
		              return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		                var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
		                return v.toString(16);
		              });
		            }
		            guid();
		              var unionkey = guid();
		                var key = policy.dir + "/" + unionkey + "." + file.name.split(".")[file.name.split(".").length -1 ];
		                var request = new FormData();
		                request.append('OSSAccessKeyId', policy.accessid);
		                request.append('policy', policy.policy);
		                request.append('signature', policy.signature);
		                request.append('key', key);
		                request.append('file', file);
		                request.append('submit', "Upload to oss");

		                console.log(policy.host);
		                that.$http.post(policy.host,request).then(function(res){
		                  that.cdn_url = policy.cdn + "/" + key;
		                  console.log(that.cdn_url)
		                });
		          });
		        }
			},
			modelHide(){
				this.tipsNo = false;
			}
		},
		watch:{
			name(){
				if(this.name.length>12){
					this.name = this.name.substring(0,12)
				}
			},
			price(){
				if((this.price+'').indexOf('.')!=-1){
		          var len = this.price.substring(this.price.indexOf('.')+1)
		          // console.log(len.substring(0,2))
		          this.price =''+ parseInt(this.price)+'.'+len.substring(0,2)
		        }
		        if(this.price.length>8){
					this.price = this.price.substring(0,8)
				}
			},
			num(){
				this.num=this.num.replace(/[^0-9]/g,'');
				if(this.num.length>5){
					this.num = this.num.substring(0,5)
				}
			},
			summary(){
				this.length = this.summary.length;
				if(this.summary.length>200){
					this.summary = this.summary.substring(0,200)
				}
			}

		}
	}
</script>
<style scoped>
 .rowAll{
    /*height:45px;*/
    background: #fff;
    padding-left:15px;
    overflow: hidden;
  }
 .row{
    height:45px;
    background: #fff;
    overflow: hidden;
    /*padding-left:15px;*/
  }
  .row div{
    float: left;
    height:45px;
    line-height: 45px;
  }
  .row input{
    float: left;
    border:none;
    outline: none;
    height:45px;
    padding-left: 15px;
    font-size: 16px;
  }
  input::placeholder{

  }
  .row .arrow{
    float: right;
    margin-right:15px;
  }
  /*weui*/
  .weui_cells{
  	margin-top:0;
  }
  .weui_cell{
  	padding-left: 0;
  }
  .weui-label{
  	width:80px;
  }
  /*weui*/
  .warnMsg{
  	height:30px;
  	line-height: 30px;
  	font-size: 14px;
  	padding-left: 15px;
  	color:#FF565C;
  }
  .btnBox{
  	padding:15px;
  }
  .upBtn{
  	width:100%;
  	height:45px;
  	line-height: 45px;
  	text-align: center;
  	background-image:-webkit-linear-gradient(left,#FFEC1C ,#FFD40C);
  	border-radius: 5px;
  }
  .bgShelves{
  	background: #f6f6f6
  }
  .shelves{
  	float: right;
  	padding-right:15px;
  }


  /*模态框*/
  .bg{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background: rgba(0,0,0,0.6);
    text-align: center;
    z-index:1;
  }
  .bg_tips{
    padding-top:60px;
    color:#333;
    font-weight: bold;
    font-size: 18px;
  }
  .name_tips{
    padding-top:32px;
    color:#333;
    font-weight: bold;
    font-size: 18px;
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
    /*padding: 16px 0;*/
  }
  .icon{
    position: absolute;
    height:90px;
    left:50%;
    top:-45px;
    transform:translatex(-50%);
  }
  .bg_content{
    margin-top: 8px;
    font-size: 14px;
    color:#999;
    padding-bottom:20px;
  }
  button{
    width: 100%;
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
  .weui-cells:after, .weui-cells:before{
  	z-index:0;
  	border:none;
  }
  .weui-cells{
  	margin-top:0px;
  }
</style>