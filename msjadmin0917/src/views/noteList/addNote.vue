<template>



  <!-- 配置分销套餐 -->
  <div class="app-container" style="position:relative">

    <div class="goodsmsgtitle">
      <i @click="goback()" class="el-icon-my-back backbtn"></i>
      <span>&nbsp&nbsp&nbsp创建短信模板</span>
    </div>

   <el-form size="medium" :model="AddNote"  label-width="120px" style="margin-top:30px;position:relative">
     <el-form-item label="标题：" >
        <el-input v-model="AddNote.title" style="width:200px" maxlength="10" placeholder="请输入短信标题，最多10个字" ></el-input>
      </el-form-item>
     <el-form-item label="短信权限：" >
          <el-select v-model="AddNote.jurisdiction" placeholder style="width:200px" disabled>
            <el-option label="运营+销售" value='运营+销售'></el-option>    
            <el-option label="运营" value="运营"></el-option>
          </el-select>
     </el-form-item>
     <el-form-item label="短信ID：" >
        <el-input v-model="AddNote.smsId" style="width:200px" :disabled="!iscompile" placeholder="请输入短信id"></el-input>
      </el-form-item>
      <el-form-item label="短信内容：" >
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6}" placeholder="请输入短信内容" v-model="AddNote.smsContent" style="width:200px" ></el-input>
      </el-form-item>
      <el-form-item label="节点：" >
        <el-select v-model="AddNote.node" placeholder style="width:200px">
            <el-option label="商品购买成功" value="商品购买成功"></el-option>
            <el-option label="体检预约成功" value="体检预约成功"></el-option>
            <el-option label="体检预约到期前3天" value="体检预约到期前3天"></el-option>
            <el-option label="体检预约到期前2天" value="体检预约到期前2天"></el-option>
            <el-option label="体检预约到期前1天" value="体检预约到期前1天"></el-option>
            <el-option label="已出体检报告" value="已出体检报告"></el-option>
            <el-option label="卡密已经发送短信" value="卡密已经发送短信"></el-option>
            <el-option label="销售账号订单短信提醒" value="销售账号订单短信提醒"></el-option>
            <el-option label="扫企业二维码审核通过提醒" value="扫企业二维码审核通过提醒"></el-option>
            <el-option label="扫企业二维码审核不通过提醒" value="扫企业二维码审核不通过提醒"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注：" >
        <el-input v-model="AddNote.remark" style="width:200px" maxlength="20" placeholder="请输入备注，最多20个字"></el-input>
      </el-form-item>
      <el-form-item label="是否默认：" >
        <el-switch  v-model="AddNote.default" active-color="#13ce66"  inactive-color="#DDDDDD" active-value="true" inactive-value="flase"></el-switch>
      </el-form-item>
   </el-form>

     <div class="addprojectBtn">
      <el-button @click="goback()">取 消</el-button>
      <el-button  type="primary" @click="affirmAdd()">确 认</el-button> 
    </div>
  </div>

</template>
<script>

export default {
  data() {
    return {
      
    isfangw:true,
    iscompile:false,
    smsTemplateId:"",
    AddNote:{
        title:"",
        jurisdiction:"运营",
        smsId:"",
        smsContent:"",
        node:"体检预约到期前1天",
        remark:"",
        default:'false',
    }
     
     

 
  
    };
  },
  components: {
     
  },
   mounted(){
 
    if(this.$route.query.smsTemplateId){
        this.iscompile=false
        this.smsTemplateId=this.$route.query.smsTemplateId
        this.getmessage()
    }else{
        this.smsTemplateId=''
        this.iscompile=true
    }
  },
  methods: {

    getmessage(id){
     var body = {
        smsTemplateId:this.smsTemplateId
      };
      this.$api
        .post("/smsTemplate/querySmsTemp", body)
        .then(res => {
    //          AddNote:{
    //     title:"",
    //     jurisdiction:"运营+销售",
    //     smsId:"",
    //     smsContent:"",
    //     node:"体检预约到期前1天",
    //     remark:"",
    //     default:'false',
    // }
          this.AddNote.title=res.data.Title
          this.AddNote.smsId=res.data.smsId
          this.AddNote.smsContent=res.data.smsContent
          this.AddNote.node=res.data.node
          this.AddNote.remark=res.data.remark
          this.AddNote.default=res.data.ifDefault

          if(res.data.SmsAuthority.length>1){
            this.AddNote.jurisdiction="运营+销售"
          }else{
            this.AddNote.jurisdiction="运营"
          }
          console.log(res.data);
     
        })
        .catch(err => {
          console.log("err", err);
         
        });
    },
 
    goback() {//返回
      this.$router.go(-1);
    },



    affirmAdd(){

      if(this.isfangw){

      if(!this.AddNote.title){
        this.$message.error("短信标题不能为空");   
      }else if(!this.AddNote.jurisdiction){
         this.$message.error("请选择短信权限");
      }else if(!this.AddNote.smsId){
         this.$message.error("短信ID不能为空");
      }else if(!this.AddNote.smsContent){
         this.$message.error("短信内容不能为空");
      }else if(!this.AddNote.node){
         this.$message.error("请选择节点");
      }else if(!this.AddNote.remark){
         this.$message.error("备注不能为空");
      }else{   
          if(this.iscompile){
            this.AddprojectBtn() 
          } else{
            this.compileprojectBtn()         
          }       
       }
      }
      
    },
    compileprojectBtn(){

     this.isfangw=false
     if(this.AddNote.jurisdiction=='运营'){
       var smsAuthority=['0']
     }else if(this.AddNote.jurisdiction=='运营+销售'){
       var smsAuthority=['0','2']
     }
      var body = {
        smsTemplateId:this.smsTemplateId,
        title:this.AddNote.title,   
        smsAuthority:smsAuthority,
        smsId:this.AddNote.smsId,
        smsContent:this.AddNote.smsContent,
        node:this.AddNote.node,
        remark:this.AddNote.remark,
        ifDefault:this.AddNote.default,
      };
      this.$api
        .post("/smsTemplate/updateSmsTemplate", body)
        .then(res => {
           this.isfangw=true
           this.$router.go(-1);
        })
        .catch(err => {
           this.isfangw=true
            //  this.$message.error(err.msg);
          console.log("err", err);
         
        });
    },
    AddprojectBtn(){
     
     this.isfangw=false
     if(this.AddNote.jurisdiction=='运营'){
       var smsAuthority=['0']
     }else if(this.AddNote.jurisdiction=='运营+销售'){
       var smsAuthority=['0','2']
     }
      var body = {
        title:this.AddNote.title,
        // smsAuthority:this.AddNote.jurisdiction,
        smsAuthority:smsAuthority,
        smsId:this.AddNote.smsId,
        smsContent:this.AddNote.smsContent,
        node:this.AddNote.node,
        remark:this.AddNote.remark,
        ifDefault:this.AddNote.default,
      };
      this.$api
        .post("/smsTemplate/insertSmsTemplate", body)
        .then(res => {
           this.isfangw=true

           this.$router.go(-1);
        })
        .catch(err => {
           this.isfangw=true
            //  this.$message.error(err.msg);
          console.log("err", err);
         
        });

    },
   

  },
  watch: {}
};
</script>
<style>

.title{
  width: 200px;
  height: 30px;
  background: #dddddd;
  line-height: 30px;
  padding-left: 20px;
  box-sizing: border-box;
 
  /* margin-left: 35px; */
}

body .el-table th.gutter {
    display: table-cell !important
}



.addimage{
   width:100px;
   height:100px;
   box-sizing: border-box;
   border:2px dashed #DDDDDD;
   float:left;
   border-radius:4px;
   display:flex; 
   justify-content:center;
   align-items:center;
   cursor: pointer; 
}

.goodsmsgtitle {
  font-size: 20px;
}
.addprojectBtn {
  position: absolute;
  bottom: 20px;
  right: 30px;
}
</style>




