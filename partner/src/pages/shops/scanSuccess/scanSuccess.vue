<template>
    <div class="scanSuccess">
      <div v-title>确认激活</div>
      <!--设备SN码-->
      <div class="weui-cell">
        <div class="weui-cell__hd"><label class="weui-label">设备SN码:</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="deviceNo" type="text"/>
        </div>
      </div>

      <!--设备名称-->
      <div class="weui-cell name_border">
        <div class="weui-cell__hd"><label class="weui-label">设备名称:</label></div>
        <div class="weui-cell__bd">
          <input class="weui-input" v-model="deviceName" type="text" placeholder="请输入设备名称"/>
        </div>
      </div>

      <!--备注-->
      <div class="weui_cells_title">备注:</div>
      <div class="weui_cells weui_cells_form">
        <div class="weui_cell">
          <div class="weui_cell_bd weui_cell_primary">
            <textarea class="weui_textarea" placeholder="请输入备注" rows="6" v-model="remarks"></textarea>
          </div>
        </div>
      </div>

      <footer>
        <p class="tips" v-if="show">{{tipsRed}}</p>
        <div class=" certification_btn" :class="huiseShow?'disabled':'abled'" @click="activation()">确定</div>
      </footer>

      <!-- loading toast -->
      <div id="loadingToast" class="weui_loading_toast" :class="{loadding:checkLoadding}">
        <div class="weui_mask_transparent"></div>
        <div class="weui_toast">
          <div class="weui_loading">
            <div class="weui_loading_leaf weui_loading_leaf_0"></div>
            <div class="weui_loading_leaf weui_loading_leaf_1"></div>
            <div class="weui_loading_leaf weui_loading_leaf_2"></div>
            <div class="weui_loading_leaf weui_loading_leaf_3"></div>
            <div class="weui_loading_leaf weui_loading_leaf_4"></div>
            <div class="weui_loading_leaf weui_loading_leaf_5"></div>
            <div class="weui_loading_leaf weui_loading_leaf_6"></div>
            <div class="weui_loading_leaf weui_loading_leaf_7"></div>
            <div class="weui_loading_leaf weui_loading_leaf_8"></div>
            <div class="weui_loading_leaf weui_loading_leaf_9"></div>
            <div class="weui_loading_leaf weui_loading_leaf_10"></div>
            <div class="weui_loading_leaf weui_loading_leaf_11"></div>
          </div>
          <p class="weui_toast_content">数据加载中</p>
        </div>
      </div>

      <!--激活成功弹窗-->
    <!-- <div class="bg" v-if="ok_alert"> -->
    <div class="bg" v-if="ok_alert">
      <div class="recharge_ok">
        <img src="./success.png" alt="" class="icon">
        <p class="bg_tips">恭喜激活成功</p>
        <p class="success_text">已为此台彩票机创建商家账号</p>
        <p class="success_text">账号:{{storeAccountNo}}   密码:111111</p>
        <router-link to="/site">
          <button>确定</button>
        </router-link>
      </div>
    </div>
      <!--激活成功弹窗-->
      <!-- <div class="weui_dialog_alert" id="dialog1" v-if="ok_alert">
        <div class="weui_mask"></div>
        <div class="weui_dialog">
          <div class="weui_dialog_hd"><strong class="weui_dialog_title">恭喜激活成功</strong></div>
          <div class="weui_dialog_bd">已为此台彩票机创建商家账号</div>
          <div class="weui_dialog_bd">账号:{{storeAccountNo}}   密码:111111</div>
          <div class="weui_dialog_ft">
            <router-link to="/site" class="weui_btn_dialog primary">确定</router-link>
          </div>
        </div>
      </div> -->

      <!--激活失败弹窗-->
    <div class="bg" v-if="no_alert">
      <div class="recharge_ok">
        <img src="./success.png" alt="" class="icon">
        <p class="bg_tips">激活失败</p>
        <p class="bg_content">请重新激活设备</p>
        <router-link to="/site">
          <button>确定</button>
        </router-link>
      </div>
    </div>
      <!--激活失败弹窗-->
     <!--  <div class="weui_dialog_alert" id="dialog2" v-if="no_alert">
        <div class="weui_mask"></div>
        <div class="weui_dialog">
          <div class="weui_dialog_hd"><strong class="weui_dialog_title">激活失败</strong></div>
          <div class="weui_dialog_bd">请重新激活设备</div>
          <div class="weui_dialog_ft">
            <router-link to="/activation" class="weui_btn_dialog primary">确定</router-link>
          </div>
        </div>
      </div> -->


    </div>
</template>

<script >
  export default {
    data () {
      return{
        storeAccountNo:"",
        storeNo:"",
        deviceName:"",
        deviceNo:"",
        remarks:"",
        checkLoadding:false,
        ok_alert:false,
        no_alert:false,
        getDetail:{},
        name:"",
        show:false,
        tipsRed:"",
        huiseShow:true,
      }
    },
    updated:function(){
      if(!(this.deviceName===""||this.remarks==="")){
        this.huiseShow = false;
      }
      if(this.deviceName===""||this.remarks===""){
        this.huiseShow = true;
      }
    },
    created:function () {
      alert(this.$route.query.deviceNo);
      this.deviceNo = this.$route.query.deviceNo;
      this.getData();
    },
    methods:{
      getData(){
        let _this = this;
        let params = {
          type:hcb.user().role,
          no:hcb.user().roleNo,
        };
        this.huiseShow = true;
        this.$http.post(_config.golive + "/agent/getDetailByNo",params).then((res)=>{
//          console.log(res.data.data);
          _this.getDetail = res.data.data;
        },(err)=>{
          console.log(err);
        })
      },
      activation(){
        let _this = this;
        let params = {
          // deviceName:this.deviceName,
          // remark:this.remarks,
          // storeNo:this.getDetail.storeNo,
          deviceNo:this.$route.query.deviceNo,
          recommand:hcb.user().mobile
        };
        if(this.deviceName===""||this.remarks===""){
          this.show=true;
          this.tipsRed="资料未填写完整";
          setTimeout(()=>{
            this.show = false;
            this.tipsRed = "";
          },3000);
          return false;
        }else {
         

          this.$http.post(_config.golive + "/device/active",params).then((res)=>{

            console.log(res.data);
            if(res.status == 10000){
              _this.ok_alert = true;
              _this.storeAccountNo = res.data.data.storeAccountNo;
              // _this.storeAccountNo = 111111;
            }else {
              _this.no_alert = true;
            }
          })
        }
      },
    },
  }
</script>

<style scoped>
  .scanSuccess{
    width: 100%;
    height: 100vh;
    background: white;
  }
  .weui-cell{
    font-size: 16px;
  }
  .weui_cells_title{
    font-size: 16px;
    color: black;
  }
  .weui_textarea{
    font-family: '微软雅黑';
    font-size: 16px;
  }
  .name_border:after {
    content: " ";
    position: absolute;
    left: 15px;
    bottom: 0;
    right: 0;
    height: 1px;
    border-top: 1px solid #e5e5e5;
    color: #e5e5e5;
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    -webkit-transform: scaleY(.5);
    transform: scaleY(.5);
    z-index: 2;
  }
  .weui-btn2{
    position: relative;
    display: block;
    margin-left: auto;
    margin-right: auto;
    padding-left: 14px;
    padding-right: 14px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-size: 18px;
    text-align: center;
    text-decoration: none;
    color: #fff;
    line-height: 2.55555556;
    border-radius: 5px;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    overflow: hidden;
  }
  .certification_btn{
    display: block;
    width: 100%;
    height:44px;
    line-height: 44px;
    border-radius: 5px;
    text-align: center;
    margin: 50px auto 30px;
    color:#333;
    font-size: 16px;
  }
  .huise{
    display: block;
    width: 80%;
    margin: 50px auto 30px;
    background: #999999;
  }
  .huise:active{
    background: #999999;
    color: white;
  }
  .weui_loading_toast{
    display:none;
  }
  .loadding{
    display:block;
  }
  footer{
    position: relative;
    padding:0 15px;
  }
  .tips{
    position: absolute;
    top: -42px;
    left: 0;
    right: 0;
    color: #f52323;
    text-align: center;
  }
  @media screen and (max-width: 320px){
    .weui-cell{
      font-size: 14px;
    }
    .weui_cells_title{
      font-size: 14px;
    }
    .weui_textarea{
      font-size: 14px;
    }
  }
  .abled{
    background-image:-webkit-linear-gradient(left,#FFEC1C ,#FFD40C);
    
  }
  .disabled{
    background: #e5e5e5;
  }
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
    text-align: center;
  }
  .success_text{
    font-size: 14px;
    color:#999;
    text-align: center;
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
</style>
