<template>
	<div class="err">
       	<img src="./err.png" alt="">
        <p>服务器网络错误!</p>
        <p class="little">请检查网络连接或刷新重试</p>
    </div>		
</template>
<style>
	.err img{
        display: block;
        margin:0 auto;
        padding-top:50px;
        padding-bottom:15px;
        width:50%;
    }
    .err p{
        font-size: 18px;
        color:#333;
        text-align: center;
        line-height: 36px;
     }
     .err p.little{
        font-size: 14px;
        color:#999;
     }
</style>