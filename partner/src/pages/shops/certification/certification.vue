<template>
  <div class="certification">
    <div class="line"></div>
    <div v-title>申请认证</div>
    <div class="weui-cells__title">※ 我的信息</div>
    <div class="line"></div>
    <div class="rowAll">
      <div class="row pos">
        <div class="title">
          <label class="weui-label">我的身份</label>
        </div>
        <select v-model="type">
          <option value="" selected style="display:none">请选择</option>
          <option v-for="item in options":value="item.value" >{{item.label}}</option>
        </select>
        <div class="arrow">
          <img src="./arrow.png" class="arrImg" alt=""></div>
      </div>
      <div class="line"></div>

      <!--区域选择-->
      <div class="row">
        <div class="title">
          <label class="weui-label">我的区域</label>
        </div>
        <select v-model="region">
          <option value="" selected style="display:none">请选择</option>
          <option v-for="item in area":value="item.code" >{{item.name}}</option>
        </select>
        <div class="arrow">
          <img src="./arrow.png" class="arrImg" alt=""></div>
      </div>
      <div class="line"></div>
      <div class="row" v-if="type!='super'">
        <div class="title">
          <label class="weui-label">推荐码</label>
        </div>
        <div class="weui-cell__bd">
          <!-- 选代理 总代手机号 -->
          <input class="input" v-model="inviterMobile" type="Number" :placeholder="howName+'手机号'"/>
        </div>
      </div>
    </div>
    <div class="line"></div>
    <div class="weui-cells__title">※ 公司信息</div>
    <div class="line"></div>
    <div class="rowAll">
      <div class="row">
        <div class="title">
          <label class="weui-label">公司名称</label>
        </div>
        <div class="weui-cell__bd">
          <input class="input" v-model="name" type="text" placeholder="公司名称"/>
        </div>
      </div>
      <div class="line"></div>
      <div class="row">
        <div class="title">
          <label class="weui-label">负责人</label>
        </div>
        <div class="weui-cell__bd">
          <input class="input" v-model="admin" type="text" placeholder="负责人"/>
        </div>
      </div>
      <div class="line"></div>
      <div class="row">
        <div class="title">
          <label class="weui-label">纳税识别号</label>
        </div>
        <div class="weui-cell__bd">
          <input
              class="input"
              type="textarea"
              placeholder="纳税人识别号"
              v-model="tax"
             ></input>
      </div>
    </div>
  </div>
  <div class="line"></div>
  <div class="weui-cells__title">※ 银行信息</div>
  <div class="line"></div>
  <div class="rowAll">
    <div class="row">
      <div class="title">
        <label class="weui-label">银行账户</label>
      </div>
      <div class="weui-cell__bd">
        <input class="input" v-model="bankAccount" type="text" placeholder="例 和彩宝（北京）科技有限公司"/>
      </div>
    </div>
    <div class="line"></div>
    <div class="row">
      <div class="title">
        <label class="weui-label">银行账号</label>
      </div>
      <div class="weui-cell__bd">
        <input class="input" v-model="bankNo" type="Number" placeholder="例 6228 4800 1881 6899 277"/>
      </div>
    </div>
    <div class="line"></div>
    <div class="row">
      <div class="title">
        <label class="weui-label">开户行</label>
      </div>
      <div class="weui-cell__bd">
        <input class="input" v-model="bankName" type="text" placeholder="例 平安银行望京支行"/>
      </div>
    </div>
    <div class="line"></div>
    <div class="row">
      <div class="title">
        <label class="weui-label">联系方式</label>
      </div>
      <div class="weui-cell__bd">
        <input class="input" v-model="mobile" type="Number" placeholder="负责人联系方式"/>
      </div>
    </div>
    <div class="line"></div>

    <div class="row">
      <div class="title">
        <label class="weui-label">备注</label>
      </div>
      <div class="weui-cell__bd">
        <input class="input" 
                placeholder="备注"
                v-model="remark"></input>
    </div>
  </div>
</div>

<div class="line"></div>
<footer>
  <p class="tips">{{tipsRed}}</p>
  <div class="certification_btn abled " @click="submitUpload()">确定</div>
</footer>
<!-- loading toast -->
<div id="loadingToast" class="weui_loading_toast" v-bind:class="{loadding:checkLoadding}">
  <div class="weui_mask_transparent"></div>
  <div class="weui_toast">

    <p class="weui_toast_content">数据加载中</p>
  </div>
</div>
<!-- 提交成功弹窗 -->
<div class="bg" v-if="ok_alert">
  <div class="recharge_ok">
    <img src="./success.png" alt="" class="icon">
    <p class="bg_tips">系统提示</p>
    <p class="bg_content">申请成功</p>
    <router-link to="/site">
      <button>确定</button>
    </router-link>
  </div>
</div>

<!--激活失败弹窗-->
<div class="bg" v-if="no_alert">
  <!-- <div class="bg" v-if="no_alert">
  -->
  <div class="recharge_ok">
    <img src="./failure.png" alt="" class="icon">
    <p class="bg_tips">申请失败</p>
    <p class="bg_content">{{msg}}</p>

    <button @click="dialogHide()">确定</button>

  </div>
</div>
<loading v-if="zhuan"></loading>
</div>
</template>

<script>
  import Loading from '../../../components/loading'
  import Space from '../../../components/space/space'
  import Err from '../../../components/err/err'
  export default {
    components:{Loading,Space,Err},
    data(){
      return{
        howName:"推荐人",
        tax:"",
        remark:"",
        bankName:"",
        bankNo:"",
        bankAccount:"",
        admin:"",
        msg:"",
        zhuan:false,
        space:"",
        reason:"",
        bankList:{},
        huiseShow:true,
        ok_alert:false,
        no_alert:false,
        cdn_url:"",
        checkLoadding:false,
        tipsRed:"",
        type:"",
        region:"",
        mobile:"",
        inviterMobile:"",
        name:"",
        bankno:"",
        bankName:"",
        bankUserName:"",
        legalPerson:"",
        bankInfo:"",
        bankBranchInfo:"",
        businessLicenseUrl:"",
        fileList:[],
        area:[{code:"bj",name:"北京市"},{code:"tj",name:"天津市"},{code:"hb",name:"河北省"},{code:"gx",name:"广西省"},{code:"jx",name:"江西省"},{code:"gs",name:"甘肃省"},{code:"hn",name:"海南省"},{code:"cq",name:"重庆市"},{code:"sx",name:"陕西省"},{code:"zj",name:"浙江省"}],
        options: [{
          value: 'store',
          label: '商家'
        }, 
        {
          value: 'agent',
          label: '代理商'
        }, 
        {
          value: 'super',
          label: '总代理商'
        }
        ],
        value: '',
      }
    },
    methods:{
      dialogHide(){
        this.no_alert = false;
      },
      submitUpload() {
        console.log(this.type)
        if(this.type=="" ){
          this.tipsRed="请选择我的身份";
        }else if(this.region==""){
          this.tipsRed="请选择我的区域"
        }else if(this.type!="super"&&!(/^1(3|4|5|7|8)\d{9}$/.test(this.inviterMobile))){
          this.tipsRed="请检查您的推荐码"
        }else if(this.name==""){
          this.tipsRed="请输入公司名称"
        }else if(this.admin==""){
          this.tipsRed="请输入负责人"
        }else if(this.tax==""){
          this.tipsRed="请输入纳税人识别号"
        }else if(this.bankAccount==""){
          this.tipsRed="请输入银行账户"
        }else if(this.bankNo==""){
          this.tipsRed="请输入银行账号"
        }else if(this.bankName==""){
          this.tipsRed="请输入开户行"
        }else if(this.mobile==""){
          this.tipsRed="请输入联系方式"
        }else if(this.remark==""){
          this.tipsRed="请输入备注"
        }else if(!(/^1(3|4|5|7|8)\d{9}$/.test(this.mobile))){
          this.tipsRed="请输入正确联系方式"
        }else if(this.luhmCheck(this.bankNo)){
          this.ifSuccess();       
        }
        let that = this;
        setTimeout(function(){
          that.tipsRed="";
        }, 2000)
      },
      luhmCheck(bankno){
        let _this = this;
        var lastNum=bankno.substr(bankno.length-1,1);//取出最后一位（与luhm进行比较）

        var first15Num=bankno.substr(0,bankno.length-1);//前15或18位
        var newArr=new Array();
        for(var i=first15Num.length-1;i>-1;i--){    //前15或18位倒序存进数组
          newArr.push(first15Num.substr(i,1));
        }
        var arrJiShu=new Array();  //奇数位*2的积 <9
        var arrJiShu2=new Array(); //奇数位*2的积 >9

        var arrOuShu=new Array();  //偶数位数组
        for(var j=0;j<newArr.length;j++){
          if((j+1)%2==1){//奇数位
            if(parseInt(newArr[j])*2<9)
              arrJiShu.push(parseInt(newArr[j])*2);
            else
              arrJiShu2.push(parseInt(newArr[j])*2);
          }
          else //偶数位
            arrOuShu.push(newArr[j]);
        }

        var jishu_child1=new Array();//奇数位*2 >9 的分割之后的数组个位数
        var jishu_child2=new Array();//奇数位*2 >9 的分割之后的数组十位数
        for(var h=0;h<arrJiShu2.length;h++){
          jishu_child1.push(parseInt(arrJiShu2[h])%10);
          jishu_child2.push(parseInt(arrJiShu2[h])/10);
        }

        var sumJiShu=0; //奇数位*2 < 9 的数组之和
        var sumOuShu=0; //偶数位数组之和
        var sumJiShuChild1=0; //奇数位*2 >9 的分割之后的数组个位数之和
        var sumJiShuChild2=0; //奇数位*2 >9 的分割之后的数组十位数之和
        var sumTotal=0;
        for(var m=0;m<arrJiShu.length;m++){
          sumJiShu=sumJiShu+parseInt(arrJiShu[m]);
        }

        for(var n=0;n<arrOuShu.length;n++){
          sumOuShu=sumOuShu+parseInt(arrOuShu[n]);
        }

        for(var p=0;p<jishu_child1.length;p++){
          sumJiShuChild1=sumJiShuChild1+parseInt(jishu_child1[p]);
          sumJiShuChild2=sumJiShuChild2+parseInt(jishu_child2[p]);
        }
        //计算总和
        sumTotal=parseInt(sumJiShu)+parseInt(sumOuShu)+parseInt(sumJiShuChild1)+parseInt(sumJiShuChild2);

        //计算Luhm值
        var k= parseInt(sumTotal)%10==0?10:parseInt(sumTotal)%10;
        var luhm= 10-k;

        if(lastNum==luhm && lastNum.length != 0){
          return true;
        }else{
          this.tipsRed = "请检查银行账号";
          return false;
        }
      },
      ifSuccess(){
        var params = {
          "uid": hcb.user().uid,
          "type": this.type, //1商家用户2代理商3总代理商
          "region": this.region,//区域
          // "mobile": this.mobile,
          "name":this.name,
          "admin":this.admin,
          "bankAccount":this.bankAccount,
          "bankNo":this.bankNo,
          "bankName":this.bankName,
          "mobile":this.mobile,
          "recommand": this.inviterMobile,
          "remark":this.remark,
          "tax":this.tax

        };
        var that = this;
        console.log(params)
        this.$http.post(_config.server + "/user/apply",params).then(function(res){
          console.log(res);
          // that.zhuan = false;
          if(res.data.status== 10001){
          //alert(res.data.msg);
            that.msg = '推荐码有误';
            // if(res.data.data==)
            that.no_alert = true;
            that.ok_alert = false;
          }else if(res.data.status== 10002){
            that.msg = '推荐码有误';
            // if(res.data.data==)
            that.no_alert = true;
            that.ok_alert = false;

          }else if(res.data.status== 10003){
            that.msg = '推荐码有误';
            // if(res.data.data==)
            that.no_alert = true;
            that.ok_alert = false;

          }else if(res.data.status== 10004){
            that.msg = '您已经是商家';
            // if(res.data.data==)
            that.no_alert = true;
            that.ok_alert = false;
          }else if(res.data.status== 10005){
            that.msg = '您已经是代理';
            // if(res.data.data==)
            that.no_alert = true;
            that.ok_alert = false;
          }else if(res.data.status== 10006){
            that.msg = '您已经是总代';
            // if(res.data.data==)
            that.no_alert = true;
            that.ok_alert = false;
          }else if(res.data.status== 10000){
            // store.set("applyTime",new Date().getTime()+ 1000*60*60*24*3);
            that.ok_alert = true;
            that.no_alert = false;
            store.set('role',"");
          }
        });
      },
    },
    watch:{
      type(){
        if(this.type=="store"){
          this.howName = '您的代理'
        }else if(this.type=="agent"){
          this.howName = '您的总代'
        }else if(this.type=="super"){
          this.inviterMobile =""
        }
      }
    }
  }
</script>

<style scoped>
  select{
    -webkit-appearance: none;
    border:none;
    font-size: 16px;
    height:45px;
    padding-left: 15px;
    float: left;
    width:100%;
    outline: none;
    background: #fff;
    position: absolute;
  }
  .rowAll{
    /*height:45px;*/
    background: #fff;
    padding-left:15px;
    overflow: hidden;
  }
  .pos{
    position: relative;
  }
  .row{
    height:45px;
    background: #fff;
    overflow: hidden;
    /*padding-left:15px;*/
    position: relative;
  }
  .row div{
    float: left;
    height:45px;
    line-height: 45px;
  }
  .row input.input{
    float: left;
    border:none;
    outline: none;
    height:45px;
    width:90%;
    padding-left: 15px;
  }
  .row .arrow{
    float: right;
    /*margin-right:15px;*/
    position: absolute;
    right:15px;
  }
  .row .arrow img{
    width:8px;
    /*height:28px;*/
  }
  .certification{
    /*height:100vh;*/
    /*background: #fff;*/
    outline: none;
    /*padding-top:10px;*/

    color: #333;
  }
  .row div.weui-cell__bd{
    font-size: 16px;
    width:100%;
    position: absolute;
    left:80px;
    top:0px;
    /*width:100%;*/
  }
   @media screen and (max-width: 374px){
    input{
      font-size: 16px;
      color: #333;
    }
    input::placeholder{
      font-size: 16px;
      color: #999;
    }
    input::-webkit-input-placeholder{
      font-size: 16px;
      color: #999;
    }
    input::-moz-placeholder{
      font-size: 16px;
      color: #999;
    }
  }
  @media screen and (min-width: 375px){
    input{
      font-size: 16px;
      color: #333;
    }
    input::placeholder{
      color: #999;
      font-size: 16px;
    }
    input::-webkit-input-placeholder{
      color: #999;
      font-size: 16px;
    }
    input::-moz-placeholder{
      color: #999;
      font-size: 16px;
    }
  }
  .weui-cells{
    margin-top: 0;
  }
  .weui_cells{
    margin-top: 0;
  }
 .weui-label{
  width:80px;
 }
  footer{
    position: relative;
    padding:0 15px;
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
    text-align: center;
    border-radius: 5px;
    margin: 50px auto 30px;
    /*background-color: #1aad19;*/
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
  .tips{
    position: absolute;
    top: -42px;
    left: 15px;
    right: 0;
    color: #FF565C ;
    font-size: 14px;
    text-align: left;

  }
  .weui_loading_toast{
    display:none;
  }
  .loadding{
    display:block;
  }
  .el-input__inner{
    height: 40px;
    border: none;
    /*margin-top: -10px;*/
  }
  .el-input__inner input{
    border:none;
  }
  .weui-input{
    color: #5a5e66;
    padding-left: 15px;
  }
  .primary{
    text-align: center;
    margin: 0 auto;
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
  .abled{
    background-image:-webkit-linear-gradient(left,#FFEC1C ,#FFD40C);
    
  }
  .disabled{
    background: #e5e5e5;
  }
  .weui-cell {
    height:60px;
  }
  .weui-cells__title{
    /*padding:0;*/
    /*text-align: center;*/
  }
</style>
