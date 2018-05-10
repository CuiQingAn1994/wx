<template>
	<div class="bg_zhuan">
      <div class = "zhuan">
          <img src="./zhuan.png" alt="" class="icon_zhuan">
          <p class="load">加载中...</p>
      </div>
    </div>
</template>
<style>
 @-webkit-keyframes rotation{
    from {-webkit-transform: rotate(0deg);}
    to {-webkit-transform: rotate(360deg);}
  }
  .zhuan{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      width: 40%;
      height: 20%;
      /*background: white;*/
      border-radius: 5px;
      color: #777777;
      padding: 25px 0;
      box-sizing:border-box;
      text-align: center;
      background: rgba(0,0,0,0.6);
      color:#fff;
    }
    .bg_zhuan{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      background: #fff;
      z-index: 9999999;
    }
    .icon_zhuan{
      position: fixed;
      width:40px;
      left:0;
      right:0;
      top:47%;
      bottom: 0;
      margin:auto;
      margin-top: -20px;
      -webkit-transform: rotate(360deg);
      animation: rotation 1s linear infinite;
      -moz-animation: rotation 1s linear infinite;
      -webkit-animation: rotation 1s linear infinite;
      -o-animation: rotation 1s linear infinite;
    }
    .load{
      position: fixed;
       left:0;
      right:0;
      top:54%;
      bottom: 0;
      font-size: 14px;
    }
</style>