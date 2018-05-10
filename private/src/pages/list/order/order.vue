<template>
	<section class="order" >
		<div v-title>订单详情</div>
		<div class="err" v-if="err">
            <img src="./img/err.png" alt="">
            <p>服务器错误!</p>
        </div>
        <div v-else :style="{display:display}">
        	<div class="header" v-if="data.lotteryName=='11选5'||data.lotteryName=='大乐透'||data.lotteryName=='竞足'">
        		<div class="left">
        			<img v-if="data.lotteryName=='11选5'" src="../orders/img/11xuan5.png" alt="">        
        			<img v-if="data.lotteryName=='大乐透'" src="../orders/img/daletou.png" alt="">        
        			<img v-if="data.lotteryName=='竞足'" src="../orders/img/zucai.png" alt="">
        		</div>
        		<div class="center" v-if="data.lotteryName=='11选5'||data.lotteryName=='大乐透'">
        			<p >
        				<span v-if="data.type=='GAME'">金豆</span>{{data.lotteryName}}
        			</p>
        			<p class="issue" >第{{data.issueNumber}}期</p>
        		</div>
        		<div class="center" v-if="data.lotteryName=='竞足'">
        			<p class="sport">
        				<span v-if="data.type=='GAME'">金豆</span>{{data.lotteryName}}
        			</p>
        		</div>
        		<div class="right">
        			<p class="status" v-if="data.order_status==3" :style="{color:data.order_status==3 ? '#f63400':'#777'}">
        				<!-- <p v-if="data.order_status==3" :style="{color:data.order_status==3 ? '#f63400':'#777'}">        
        				-->
        				<span style="display:block; height:25px;line-height:25px; text-align:right; font-size:14px;" v-if="data.order_status==3">已中奖</span>
        				<span v-if="data.type=='GAME'" style="display:block;height:25px;line-height:25px;text-align:right; font-size:14px;" >{{parseInt(data.winningMoney*100)}}金豆</span>
        				<span v-if="data.type=='TD'||data.type=='REMOTE'"  style="display:block;height:25px;line-height:25px;text-align:right; font-size:14px;" >{{data.winningMoney | currency('',2)}}元</span>
        			</p>
        			<p class="status" v-else >
        				<span style="display:block;height:56px;line-height:56px;text-align:right; font-size:14px;" v-if="data.order_status==0" >未支付</span>
        				<span style="display:block;height:56px;line-height:56px;text-align:right; font-size:14px;" v-if="data.order_status==1" >待出票</span>
        			
		        		<span style="display:block;height:56px;line-height:56px;text-align:right; font-size:14px;" v-if="data.order_status==2" >待开奖</span>
		        		<span style="display:block;height:56px;line-height:56px;text-align:right; font-size:14px;" v-if="data.order_status==4" >未中奖</span>
		        		<span style="display:block;height:56px;line-height:56px;text-align:right; font-size:14px;" v-if="data.order_status==6" >已退款</span>
        			</p>
       			 </div>
        	</div>
	        <div class="line"></div>
	        <div class="thanks">感谢您助力公益事业~</div>
	        <div class="line mb"></div>
	        <div class="line"></div>
	        <!-- 开奖号码 -->
	        <div v-if="(data.lotteryName=='11选5'|| data.lotteryName=='大乐透')&&data.awardNumber!=''" >
	        	<h3 class = "tTitle">开奖信息</h3>
	        	<div class="line ml" ></div>
	        	<div class="msg">
	        		<p  class="title codeNum" style="float:left">
	        			开奖号码&nbsp;:
	        			<!-- 11选5开奖号码 -->        
	        			<p class="codeNum code" v-if="data.lotteryName=='11选5'">
	        				<span class=" circle" v-for="(item,$index) in data.awardNumber" :style = "{backgroundColor:'#2A9FFF'}" >{{item}}</span>
	        			</p>
	        			<!-- 大乐透开奖号码 -->        
		        		<p class="codeNum code" v-if="data.lotteryName=='大乐透'">
		        			<span class=" circle" v-for="(item,$index) in data.awardNumber.redBall" :style = "{backgroundColor:'#FF565C'}" >{{item}}</span>
		        			<span class=" circle" v-for="(item,$index) in data.awardNumber.blueBall" :style = "{backgroundColor:'#2A9FFF'}" >{{item}}</span>
		        		</p>
					</p>
	        	</div>
	        	<div class="line mb"></div>
	        	<div class="line"></div>
	        </div>
	        <!-- 投注方案 -->
	        <h3 class="tTitle">
	        	彩票方案
	        	<i class="playType" v-if="data.lotteryName=='竞足'&&data.tableData.playName=='xspf'" >让球胜平负</i>
		        <i class="playType" v-if="data.lotteryName=='竞足'&&data.tableData.playName=='spf'" >胜平负</i>
		        <i class="playType" v-if="data.lotteryName=='竞足'&&data.tableData.playName=='bf'" >比分</i>
		        <i class="playType" v-if="data.lotteryName=='竞足'&&data.tableData.playName=='jqs'" >进球数</i>
		        <i class="playType" v-if="data.lotteryName=='竞足'&&data.tableData.playName=='bqc'" >半全场</i>
	        </h3>
	        <div class="line ml"  ></div>
	        <div class="project">
		        <div class="dlt"  v-if="data.lotteryName=='11选5'||data.lotteryName=='大乐透'" v-for="itemTable in data.tableData">
		        	<p  class="title codeNum" style="float:left">彩票号码&nbsp;:</p>
		        	<!-- 11选5投注号码 -->        
		        	<p class="codeNum code" v-if="data.lotteryName=='11选5'&&(itemTable.playName==9||itemTable.playName==10)">
		        		<span style="overflow:hidden;" >
		        			<span class=" circle" v-for="(item,$index) in itemTable.code[0]" :style = "{backgroundColor:'#FF565C '}" >{{item}}</span>
		        			<span class="space" >|</span>
		        		</span>
		        		<span style="overflow:hidden;" >
		        			<span class=" circle" v-for="(item,$index) in itemTable.code[1]" :style = "{backgroundColor:'#FF565C '}" >{{item}}</span>
		        			<span class="space" v-if="itemTable.playName==10">|</span>
		        		</span>
		        		<span style="overflow:hidden;" >
		        			<span class=" circle" v-for="(item,$index) in itemTable.code[2]" :style = "{backgroundColor:'#FF565C '}" >{{item}}
		        			</span>
		        		</span>
		       	 	</p>
			        <p class="codeNum code" v-if="data.lotteryName=='11选5'&&(itemTable.playName!=9&&itemTable.playName!=10)">
			        	<span class=" circle" v-for="(item,$index) in itemTable.code" :style = "{backgroundColor:'#FF565C '}" >{{item}}</span>
			        </p>
			        <!-- 大乐透投注号码 -->        
			        <p class="codeNum code" v-if="data.lotteryName=='大乐透'">
			        	<span class="circle" v-for="(item,$index) in itemTable.redBall" :style = "{backgroundColor:'#FF565C'}" >{{item}}</span>
			        	<span class="circle" v-for="(item,$index) in itemTable.blueBall" :style = "{backgroundColor:'#2A9FFF'}" >{{item}}</span>
			        </p>
			        <p class="play">
				        <span  class="title">玩&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;法&nbsp;:</span>
				        <!-- 11选5玩法 -->        
				        <span v-if="data.lotteryName=='11选5'&&itemTable.playName==1" >前一</span>
				        <span v-if="data.lotteryName=='11选5'&&itemTable.playName==2" >任二</span>
				        <span v-if="data.lotteryName=='11选5'&&itemTable.playName==3" >任三</span>
				        <span v-if="data.lotteryName=='11选5'&&itemTable.playName==4" >任四</span>
				        <span v-if="data.lotteryName=='11选5'&&itemTable.playName==5" >任五</span>
				        <span v-if="data.lotteryName=='11选5'&&itemTable.playName==6" >任六</span>
				        <span v-if="data.lotteryName=='11选5'&&itemTable.playName==7" >任七</span>
				        <span v-if="data.lotteryName=='11选5'&&itemTable.playName==8" >任八</span>
				        <span v-if="data.lotteryName=='11选5'&&itemTable.playName==9" >前二直选</span>
				        <span v-if="data.lotteryName=='11选5'&&itemTable.playName==10">前三直选</span>
				        <span v-if="data.lotteryName=='11选5'&&itemTable.playName==11">前二组选</span>
				        <span v-if="data.lotteryName=='11选5'&&itemTable.playName==12">前三组选</span>
				        <!-- 大乐透玩法 -->        
				        <span v-if="data.lotteryName=='大乐透'&&itemTable.playName==1" >普通</span>
				        <span v-if="data.lotteryName=='大乐透'&&itemTable.playName==2" >最佳</span>      
			        </p>
			         <p class="play">
				        <span class="title">倍&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;数&nbsp;:</span>
				        <span class="">{{itemTable.investCount}}注{{itemTable.multiple}}倍</span>
			        </p>
			        <p class="play">
				        <span class="title" v-if="data.type=='TD'||data.type=='REMOTE'">消费积分&nbsp;:</span>
				        <span class="title" v-if="data.type=='GAME'" >消费金豆&nbsp;:</span>
				        <span class="">{{itemTable.money*100}}</span>
				        <span class="rmb">({{itemTable.money | currency("¥",2)}})</span>
			        </p> 
		        </div>
		        <div class="zc" v-if="data.lotteryName=='竞足'">
		        	<p class="play">
		        		<div class="zcPlay"  >过关方式&nbsp;:
		        			<i  v-if="data.tableData.playType==0" >单关</i>
		        			<i  v-if="data.tableData.playType!=0">{{data.tableData.playType}}串1</i>
		        			
		        		</div>
		        		<div class="zcPlay" style="text-align:right;" >倍数&nbsp;:&nbsp;<i  v-if="data.lotteryName=='竞足'" >{{data.tableData.investCount}}注{{data.tableData.multiple}}倍</i></div>      	
		        	</p>
		        	<!-- 胜平负 比分-->
		        	<div class="team" v-if="data.tableData.playName=='spf'||data.tableData.playName=='bf'||data.tableData.playName=='jqs'">
		        		<span>主队VS客队</span>
		        		<span class="center">赛果</span>
		        		<span>所选结果</span>
		        	</div>
		        	<ul class="game" v-for="(item,index) in data.tableData.dzList" v-if="data.tableData.playName=='spf'||data.tableData.playName=='bf'||data.tableData.playName=='jqs'" >
		        		<li style="border-right:1px solid #eee;box-sizing:border-box">
		        			<p class="week">{{item.date}}</p>
		        			<p class="match">{{item.title}}</p>
		        		</li>
		        		<li class="gameResult" style="border-right:1px solid #eee;">
		        			<i v-if="item.Results==''">-</i>
		        			<i v-if="item.Results!=''">{{item.Results.hs}}:{{item.Results.as}}</i>
		        		</li>
		        		<li style="padding-top:0px;" >
		        			<div style="line-height:20px;" v-if="data.tableData.playName=='spf'" v-for="(resultItem,resultIndex) in item.liveSp">
		        				<i v-if="resultIndex==0&&resultItem">胜({{resultItem}})</i>
		        				<i v-if="resultIndex==0&&resultItem==''">-</i>
		        				<i v-if="resultIndex==1&&resultItem">平({{resultItem}})</i>
		        				<i v-if="resultIndex==1&&resultItem==''">-</i>
		        				<i v-if="resultIndex==2&&resultItem">负({{resultItem}})</i>
		        				<i v-if="resultIndex==2&&resultItem==''">-</i>	
		        			</div>
		        			<div  v-if="data.tableData.playName=='bf'">
			        			<div  style="lineHeight:60px" v-if="item.liveSp.length==1">
			        				<i  v-for="bfItem in item.liveSp">{{bfItem.BF}} ({{bfItem.PL}})</i>
			        			</div>
			        			<div  v-if="item.liveSp.length==2">
			        				<i  style="lineHeight:30px;display:block;" v-for="bfItem in item.liveSp">{{bfItem.BF}} ({{bfItem.PL}})</i>
			        			</div>
			        			<div  v-if="item.liveSp.length==3">
			        				<i  style="lineHeight:20px;display:block;" v-for="bfItem in item.liveSp">{{bfItem.BF}} ({{bfItem.PL}})</i>
			        			</div>
			        			<div @click="more(index)" v-if="item.liveSp.length>3">
			        				<i  style="lineHeight:60px;display:block;color:" v-for="bfItem in item.liveSp">点击查看</i>
			        			</div>
		        			</div>
		        			<div  v-if="data.tableData.playName=='jqs'">
			        			<div  style="lineHeight:60px" v-if="item.liveSp.length==1">
			        				<i  v-for="bfItem in item.liveSp">{{bfItem.QS}}({{bfItem.PL}})</i>
			        			</div>
			        			<div  v-if="item.liveSp.length==2">
			        				<i  style="lineHeight:30px;display:block;" v-for="bfItem in item.liveSp">{{bfItem.QS}}({{bfItem.PL}})</i>
			        			</div>
			        			<div  v-if="item.liveSp.length==3">
			        				<i  style="lineHeight:20px;display:block;" v-for="bfItem in item.liveSp">{{bfItem.QS}}({{bfItem.PL}})</i>
			        			</div>
			        			<div @click="more(index)" v-if="item.liveSp.length>3">
			        				<i  style="lineHeight:60px;display:block;color:" v-for="bfItem in item.liveSp">点击查看</i>
			        			</div>
		        			</div>
		        			<div  v-if="data.tableData.playName=='bqc'">
			        			<div  style="lineHeight:60px" v-if="item.liveSp.length==1">
			        				<i  v-for="bfItem in item.liveSp">{{bfItem.BQC}}({{bfItem.PL}})</i>
			        			</div>
			        			<div  v-if="item.liveSp.length==2">
			        				<i  style="lineHeight:30px;display:block;" v-for="bfItem in item.liveSp">{{bfItem.BQC}}({{bfItem.PL}})</i>
			        			</div>
			        			<div  v-if="item.liveSp.length==3">
			        				<i  style="lineHeight:20px;display:block;" v-for="bfItem in item.liveSp">{{bfItem.BQC}}({{bfItem.PL}})</i>
			        			</div>
			        			<div @click="more(index)" v-if="item.liveSp.length>3">
			        				<i  style="lineHeight:60px;display:block;color:" v-for="bfItem in item.liveSp">点击查看</i>
			        			</div>
		        			</div>
		        		</li>
		        	</ul>
		        	<!-- 半全场 -->
		        	<div class="team" v-if="data.tableData.playName=='bqc'">
		        		<span style="width:32.5%">主队VS客队</span>
		        		<span style="width:22.5%" class="center">半场赛果</span>
		        		<span style="width:22.5%" >全场赛果</span>
		        		<span style="width:22.5%" >所选结果</span>
		        	</div>
		        	<ul class="game" v-for="(item,index) in data.tableData.dzList" v-if="data.tableData.playName=='bqc'" >
		        		<li style="border-right:1px solid #eee;box-sizing:border-box;width:32.5%;">
		        			<p class="week">{{item.date}}</p>
		        			<p class="match">{{item.title}}</p>
		        		</li>
		        		<li class="gameResult" style="border-right:1px solid #eee;width:22.5%;">
		        			<i v-if="item.Results==''">-</i>
		        			<i v-if="item.Results!=''">{{item.Results.hhs}}:{{item.Results.ahs}}</i>
		        		</li>
		        		<li class="gameResult" style="border-right:1px solid #eee;width:22.5%;">
		        			<i v-if="item.Results==''">-</i>
		        			<i v-if="item.Results!=''">{{item.Results.hs}}:{{item.Results.as}}</i>
		        		</li>
		        		<li style="padding-top:0px;width:22.5%;" >
		        			<div style="line-height:20px;" v-if="data.tableData.playName=='spf'" v-for="(resultItem,resultIndex) in item.liveSp">
		        				<i v-if="resultIndex==0&&resultItem">胜({{resultItem}})</i>
		        				<i v-if="resultIndex==0&&resultItem==''">-</i>
		        				<i v-if="resultIndex==1&&resultItem">平({{resultItem}})</i>
		        				<i v-if="resultIndex==1&&resultItem==''">-</i>
		        				<i v-if="resultIndex==2&&resultItem">负({{resultItem}})</i>
		        				<i v-if="resultIndex==2&&resultItem==''">-</i>	
		        			</div>
		        			<div  v-if="data.tableData.playName=='bf'">
			        			<div  style="lineHeight:60px" v-if="item.liveSp.length==1">
			        				<i  v-for="bfItem in item.liveSp">{{bfItem.BF}} ({{bfItem.PL}})</i>
			        			</div>
			        			<div  v-if="item.liveSp.length==2">
			        				<i  style="lineHeight:30px;display:block;" v-for="bfItem in item.liveSp">{{bfItem.BF}} ({{bfItem.PL}})</i>
			        			</div>
			        			<div  v-if="item.liveSp.length==3">
			        				<i  style="lineHeight:20px;display:block;" v-for="bfItem in item.liveSp">{{bfItem.BF}} ({{bfItem.PL}})</i>
			        			</div>
			        			<div @click="more(index)" v-if="item.liveSp.length>3">
			        				<i  style="lineHeight:60px;display:block;color:" v-for="bfItem in item.liveSp">点击查看</i>
			        			</div>
		        			</div>
		        			<div  v-if="data.tableData.playName=='jqs'">
			        			<div  style="lineHeight:60px" v-if="item.liveSp.length==1">
			        				<i  v-for="bfItem in item.liveSp">{{bfItem.QS}}({{bfItem.PL}})</i>
			        			</div>
			        			<div  v-if="item.liveSp.length==2">
			        				<i  style="lineHeight:30px;display:block;" v-for="bfItem in item.liveSp">{{bfItem.QS}}({{bfItem.PL}})</i>
			        			</div>
			        			<div  v-if="item.liveSp.length==3">
			        				<i  style="lineHeight:20px;display:block;" v-for="bfItem in item.liveSp">{{bfItem.QS}}({{bfItem.PL}})</i>
			        			</div>
			        			<div @click="more(index)" v-if="item.liveSp.length>3">
			        				<i  style="lineHeight:60px;display:block;color:" v-for="bfItem in item.liveSp">点击查看</i>
			        			</div>
		        			</div>
		        			<div  v-if="data.tableData.playName=='bqc'">
			        			<div  style="lineHeight:60px" v-if="item.liveSp.length==1">
			        				<i  v-for="bfItem in item.liveSp">{{bfItem.BQC}}({{bfItem.PL}})</i>
			        			</div>
			        			<div  v-if="item.liveSp.length==2">
			        				<i  style="lineHeight:30px;display:block;" v-for="bfItem in item.liveSp">{{bfItem.BQC}}({{bfItem.PL}})</i>
			        			</div>
			        			<div  v-if="item.liveSp.length==3">
			        				<i  style="lineHeight:20px;display:block;" v-for="bfItem in item.liveSp">{{bfItem.BQC}}({{bfItem.PL}})</i>
			        			</div>
			        			<div @click="more(index)" v-if="item.liveSp.length>3">
			        				<i  style="lineHeight:60px;display:block;color:" v-for="bfItem in item.liveSp">点击查看</i>
			        			</div>
		        			</div>
		        		</li>
		        	</ul>
		        	<!-- 让球胜平负 -->
		        	<div class="team"v-if="data.tableData.playName=='xspf'">
		        		<span style="width:40%">主队VS客队</span>
		        		<span style="width:15%" class="center">赛果</span>
		        		<span style="width:30%" >所选结果</span>
		        		<span style="width:15%" >让球</span>
		        	</div>
		        	<ul class="game" v-for="item in data.tableData.dzList" v-if="data.tableData.playName=='xspf'" >
		        		<li style="border-right:1px solid #eee;box-sizing:border-box;width:40%">
		        			<p class="week">{{item.date}}</p>
		        			<p class="match">{{item.title}}</p>
		        		</li>
		        		<li class="gameResult" style="border-right:1px solid #eee;width:15%">
		        			<i v-if="item.Results==''">-</i>
		        			<i v-if="item.Results!=''">{{item.Results.hs}}:{{item.Results.as}}</i>
		        		</li>
		        		<li style="padding-top:0px; border-right:1px solid #eee;width:30%">
		        			<div style="line-height:20px;" v-for="(resultItem,resultIndex) in item.liveSp">	 <i v-if="resultIndex==0&&resultItem">胜({{resultItem}})</i>
		        				<i v-if="resultIndex==0&&resultItem==''">-</i>
		        				<i v-if="resultIndex==1&&resultItem">平({{resultItem}})</i>
		        				<i v-if="resultIndex==1&&resultItem==''">-</i>
		        				<i v-if="resultIndex==2&&resultItem">负({{resultItem}})</i>
		        				<i v-if="resultIndex==2&&resultItem==''">-</i>
		        				
		        			</div>
		        		</li>
		        		<li style="padding-top:0px;width:15%" >
		        			<div style="line-height:60px;">
		        				<i v-if="item.hand>0">+</i>{{item.hand}}
		        			</div>
		        		</li>
		        	</ul>
		        	<!-- 比分查看更多结果(大于三个结果) -->
		        	<div class="moreBox" v-if="moreBet" @click="hide()" >
		        		<div class="moreCon">
		        			<div class="content clearfix">
		        				<div class="moreResult">
		        					<div class="bfTItle" v-if="data.tableData.playName=='bf'" >比分</div>
		        					<div class="bfTItle" v-if="data.tableData.playName=='jqs'">进球数</div>
		        					<div class="bfTItle"  v-if="data.tableData.playName=='bqc'">半全场</div>
		        					<div class="bfTItle">赔率</div>
		        				</div>	
		        				<div class="moreResult" v-if="data.tableData.dzList[idx].liveSp.length>1">
		        					<div class="bfTItle" v-if="data.tableData.playName=='bf'" >比分</div>
		        					<div class="bfTItle" v-if="data.tableData.playName=='jqs'">进球数</div>
		        					<div class="bfTItle"  v-if="data.tableData.playName=='bqc'">半全场</div>
		        					<div class="bfTItle">赔率</div>
		        				</div>	
		        				<div v-for="moreItem in data.tableData.dzList[idx].liveSp" class="moreResult">
		        					<div class="bfTItle" v-if="data.tableData.playName=='bf'" >{{moreItem.BF}}</div>
		        					<div class="bfTItle" v-if="data.tableData.playName=='jqs'" >{{moreItem.QS}}</div>
		        					<div class="bfTItle" v-if="data.tableData.playName=='bqc'" >{{moreItem.BQC}}</div>
		        					<div class="bfTItle">{{moreItem.PL}}</div>
		        					
		        				</div>
		        			</div>
		        		</div>
		        	</div>
		        </div>
        	</div>
	        <div class="line mb"></div>
	        <div class="line"></div>
	        <!-- 订单信息 -->
	        <h3 class = "tTitle">订单信息</h3>
	        <div class="line ml" ></div>
	        <div class="msg">
	        <p class="betMsg">
		        <span class="title">订单编号&nbsp;:</span>
		        <span class="">{{data.orderNumber}}</span>
	        </p>
	        <p class="betMsg">
	       		<span class="title">订单总额&nbsp;:</span>
		        <span class="" v-if="data.type=='GAME'">
		        {{data.moneySum*100}}金豆({{data.moneySum | currency("¥",2)}})
		        </span>
		        <span class="" v-if="data.type=='TD'||data.type=='REMOTE'">
		        {{data.moneySum*100}}积分({{data.moneySum | currency("¥",2)}})
		        </span>
	        </p>
	        <p class="betMsg">
		        <span class="title">订单时间&nbsp;:</span>
		        <span class="">{{data.creat_time}}</span>
	        </p>
	        </div>

	        <div class="line"></div>
	        <div class="hint" v-if="data.type=='REMOTE'">
	        <h3 class="tTitle tips">温馨提示</h3>
	        <!-- <div class="line" style="borderBottomColor:#aaa" ></div>
	        -->
	        <p>1. 彩票中奖后，一万元以下将直接转入您的和彩宝账户余额;一万元以上请联系客服 400  689 3373。</p>
	        <p>2. 如因故未能成功出票，我们将退款至您的账户余额。</p>
	        <p>&nbsp;&nbsp;&nbsp;&nbsp;工作时间:周一~周五(10:00-18:30)。</p>
	        </div>
	        <div class="hint" v-if="data.type=='GAME'">
	        <h3 class="tTitle tips">温馨提示</h3>
	        <!-- <div class="line" style="borderBottomColor:#aaa" ></div>
	        -->
	        <p>1. 彩票中奖后，直接打款至您的金豆余额。</p>
	        <p>2. 如因故未能成功出票，我们将退款至您的金豆余额。</p>
	        <p>3. 如有疑问，请联系和彩宝客服 400  689 3373。</p>
	        <p>&nbsp;&nbsp;&nbsp;&nbsp;工作时间:周一~周五(10:00-18:30)。</p>
	        </div>
	        <div class="hint" v-if="data.type=='TD'">
	        <h3 class="tTitle tips">温馨提示</h3>
	        <!-- <div class="line" style="borderBottomColor:#aaa" ></div>
	        -->
	        <p>1. 如您中奖,请拿着纸质彩票,去彩票店进行兑奖。</p>
	        <p>2. 如有疑问,请联系和彩宝客服 400  689 3373。</p>
	        <p>&nbsp;&nbsp;&nbsp;&nbsp;工作时间:周一~周五(10:00-18:30)。</p>
	        </div>
	        </div>
	        <loading v-if="zhuan"></loading>
	</section>
</template>
<script>
	import Loading from '../../../components/loading'
	export default{
		components:{Loading},
		mounted:function(){
			this.user = hcb.user();
			this.orderNumber = this.$route.query.orderNumber;
			this.query();
		
		},
		data:function(){
			return{
				zhuan:false,
				err:false,
				user:{},
				orderNumber:'',
				data:{
				},
				display:"block",
				idx:"",
				moreBet:false
			}
		},
		methods:{
			query(){
				var params = {
					user_id:this.user.uid,
					order_id:this.orderNumber
					// orderNumber:this.orderNumber
				}	
				console.log(params)
				this.zhuan = true;
				this.$http.post(_config.server +"/user/order/detail",params).then(res=>{
					console.log(res)
					var me = this;
					setTimeout(function(){
						me.zhuan = false; 
					}, 100)
					if(res.status == 200 && res.data.status== 10000){
						this.display = 'block';
						console.log("订单详情",res)
						me.data =res.data.data.data;
					}
				},function(err){
					me.zhuan = false;
	                me.err = true;
	            })
			},
			more(index){
				this.idx = index;
				this.moreBet = true;
				// var arr = this.data.tableData[this.idx]
				// console.log(arr)
				// console.log(this.idx)
			},
			hide(){
				this.moreBet = false;
			}
		}
	}
</script>
<style scoped>
	.playType{
		float: right;
		padding-right: 15px;
	}
	/*查看比分更多结果*/
	.moreBox{
		position: fixed;
		top:0;
		left:0;
		right:0;
		bottom: 0;
		background: rgba(0,0,0,.6);
		z-index:1;
	}
	.moreCon{
		position: absolute;
		top:50%;
		left:50%;
		transform:translate(-50%,-50%);
		width:80%;
		/*height:80%;*/
		background: #fff;
		box-sizing:border-box;
		padding:15px;
	}
	.content{
		border-top:1px solid #eee;
		border-left:1px solid #eee;
		/*border-bottom:1px solid #eee;*/
		/*overflow: hidden;*/
	}
	.moreResult{
		width:50%;
		float: left;
		font-size: 14px;
		height:30px;
		line-height: 30px;
		color:#666;
	}
	.bfTItle{
		width:50%;
		float: left;
		border-right:1px solid #eee;
		border-bottom:1px solid #eee;
	}

	/********************/
	i{
		font-style: normal;
		font-size: 12px;
	}
	.space{
		float: left;
		color:#999;
		font-size: 19px;
		/*margin-top: -3px;*/
		/*padding-left: 3px;*/
		height:25px;
		width:25px;
		line-height: 25px;
		text-align: center;
		display: inline-block;
	}
	.err img{
	        padding-top:150px;
	        padding-bottom:15px;
	        width:50%;
	    }
    .err p{
        font-size: 20px;
        color:#777;
     }
     body{
     	background: #fff;
     }
	.order{
		overflow: hidden;
	}
	.order .header{
		height:85px;
		padding: 15px;
		color:#333;
		background: #fff;
		overflow: hidden;
	}
	div.center,div.left,div.right{
		float: left;
		
	}
	.order .header div.center{
		width:50%;
		text-align: left;
	}
	.sport{
		height:56px;
		line-height: 56px;
	}
	.order .header div.centerNum{
		width:50%;
		text-align: left;
		height:56px;
		line-height: 56px;
	}
	.order .header div.right{
		width:30%;
		float: right;
	}
	.order .header div.left{
		width:50px;
		padding-top:10px;
	}
	.order .header div.center p.issue{
		font-size: 12px;
		color:#999;
		line-height: 32px;

	}
	.order .header div.left img{
		height:30px;
		float: left;
	}
	.order .header div.right p.status{
		width:100%;
		height:64px;
		font-size: 12px;
		color:#999;
		text-align: right;
	}
	.order .thanks{
		height:45px;
		line-height: 45px;
		font-size: 14px;
		/*background: #eee;
		/*color:#777;*/
		text-align: center;
		background: #fff;
	}
	.tTitle{
		text-align: left;
		font-size: 16px;
		height:45px;
		line-height: 45px;
		font-weight: normal;
		color:#333;
		background: #fff;
		padding-left:15px;
	}
	.order .project{
		padding-left:15px ;
		background: #fff;
	}
	.order .project .dlt{
		color:#666;
		padding:10px 0;
	}
	.order .project .zc{
		overflow: hidden;
		padding-right:15px;
		padding-bottom:15px;
	}
	.zcPlay{
		text-align:left;
		font-size:14px;
		color:#666;
		/*line-height: 30px;*/
		padding:10px 0;
		width:50%;
		float: left;
	}
	.order .project .zc .team{
		overflow: hidden;
		height:30px;
		line-height: 30px;
		background: #f8f8f8;
		border: 1px solid #eee;
		
	}
	.order .project .zc ul{
		overflow: hidden;
		/*padding:10px 0 0;*/
		width:100%;
		float: left;
		border-left:1px solid #eee;
		border-right:1px solid #eee;
		border-bottom:1px solid #eee;
	}
	/*.order .project .zc ul:last-child{
		border-bottom: 1px solid #eee;
	}*/
	.order .project .zc ul li{
		float: left;
		width:40%;
		height:60px;
		text-align: center;
		line-height: 40px;
		font-size: 12px;
		color:#333;
		box-sizing:border-box;
		padding-top:10px;
	}
	.order .project .zc ul li.gameResult{
		width:20%;
	}
	.order .project .zc ul li p.week,p.match{
		height:20px;
		line-height: 20px;
		width:100%; 
		font-size: 12px;
		padding:0;
		text-align: center;
		background: #FFF;
		color:#333;

		display: block;
   		text-overflow:ellipsis;
   		white-space: nowrap;
   		overflow: hidden;
	}
	.order .project .zc ul li p.match{
		font-size: 12px;
	}
	.order .project .zc ul li p.week{
		color:#333;
	}

	.order .project .zc span{
		float: left;
		display: block;
		width:40%;
		font-size:14px;
		background: #fff;
		color:#999;
		/*border-bottom:1px solid #d9d9d9;*/
		/*padding:10px 0;*/
	}
	.order .project .zc span.center{
		width:20%;
	}
	.order .project .zc p.play span.zuWay{
		font-size: 14px;
		color:#777;
		padding:12px 0;
	}
	.order p.play{
		/*background: #eee;*/
		padding-top:5px;
		text-align: left;
		font-size: 13px;
	}
	.order .project p .title{
		display: inline-block;
		/*width: 30%;*/
		color:#666;
	}
	.order .msg {
		color:#666;
		/*padding-top:10px;
		padding-left:15px;*/
		padding:10px 0 10px 15px;
		font-size: 14px;
		background: #fff;
	}
	.order .msg p{
		/*background: #eee;*/
		/*padding:10px 0px 10px 40px;*/
		/*padding-bottom:10px; */
		text-align: left;
		font-size: 14px;
	}
	.hint{
		background: #f6f6f6;
		padding-bottom:15px;
	}
	.hint p{
		font-size: 12px;
		text-align: left;
		color:#3F3F3F;
		padding-left:15px;

	}
	.msg .rmb{
		margin-left:10%;

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
  .mb{
  	margin-bottom:9.5px;
  }
  .ml{
  	margin-left:15px;
  }
  .circle{
  	float: left;
  	width:25px;
  	height:25px;
  	border-radius: 30px;
  	text-align: center;
  	line-height: 25px;
	color:#fff;
	border:1px solid #fff;
	font-size:14px;
	margin-left:3px;

  }
  .tTitle.tips{
  	background: #f6f6f6;
  }
 .code{
 	overflow: hidden;

 }
 .sline{
 	 width: 1px;
	 height: 10px;
	 border-left: 1px solid #D9D9D9;
	 color: #D9D9D9;
	 -webkit-transform-origin: 0 0;
	 transform-origin: 0 0;
	 -webkit-transform: scaleX(0.5);
	 transform: scaleX(0.5)
 }
 .betMsg{
 	padding-top: 5px;
 }
 .codeNum{
 	font-size: 14px;
 }
 .clearfix:after{
 	content:""; 
 	display:block; 
 	height:0; 
 	visibility:hidden;
 	clear:both;
 }
 .clearfix {
 	zoom:1; 
 }
</style>