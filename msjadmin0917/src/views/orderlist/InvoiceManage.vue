<template>
  <div style="margin:20px">
    <!-- table栏 -->
    <div>
      <el-radio-group v-model="seekobj.invoiceStatus"  @change="selectList">
        <el-radio-button label="1">待处理</el-radio-button>
        <el-radio-button label="2">开票中</el-radio-button>
        <el-radio-button label="3">已开票</el-radio-button>
        <el-radio-button label="4">开票失败</el-radio-button>
      </el-radio-group>
      <el-button v-if="$store.getters.getRoleInfo.AccountType==2" type="primary" style="float:right" @click="openkpsq()"> 发票申请管理</el-button>
    </div>
    <!-- 搜索栏 -->
    <div style="margin-top:20px">
      <el-form :inline="true" :model="seekobj" label-position='right' label-width="120px" size="medium" >
        <el-form-item label="抬头名称：">
          <el-input v-model="seekobj.headName" placeholder="请填写" style="width:200px" maxlength="30" clearable></el-input>
        </el-form-item>
        <el-form-item label="申请账号：">
          <el-input v-model="seekobj.applicationPhone" placeholder="请填写" style="width:200px" maxlength="30" clearable></el-input>
        </el-form-item>
        <el-form-item label="订单编号：">
          <el-input v-model="seekobj.orNumber" placeholder="请填写" style="width:200px" maxlength="20" clearable></el-input>
        </el-form-item>
        <el-form-item label="商品名称：">
          <el-input v-model="seekobj.goodsName" placeholder="请填写" style="width:200px" maxlength="20" clearable></el-input>
        </el-form-item>
        <el-form-item label="所属分公司：" v-if="AccountType=='0'">
          <el-select v-model="seekobj.sortCompany" placeholder="" style="width:200px" clearable>
            <el-option v-for="item in fromCompanyData" :key="item.value":label="item.label":value="item.value" ></el-option> 
          </el-select>
        </el-form-item>
        <el-form-item label="所属销售：" v-if="AccountType=='0'">
          <el-select v-model="seekobj.sellerName" placeholder="" style="width:200px" clearable>
            <el-option v-for="item in fromSaleData" :key="item.value":label="item.label":value="item.value" ></el-option> 
          </el-select>
      
        </el-form-item>

        <el-form-item label="申请日期：">
          <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="seekobj.orTime" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item style="float:right">
          <el-button type="primary" @click="seekbtn" >搜 索</el-button>
          <el-button type="primary" @click="isdaochu=true" v-if="seekobj.invoiceStatus=='1'||seekobj.invoiceStatus=='2'||seekobj.invoiceStatus=='3'">导 出</el-button>
          <el-button type="primary" @click="isbatch=true" v-if="seekobj.invoiceStatus=='1'">批量开票</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 数据列表 -->
    <div v-if="!kpsqpup.invoiceFirst">
      <div style="font-size:20px;text-align:center">请先开启发票申请，用户才能申请开票</div>
      <div style="text-align:center;margin:20px">
        <el-button type="primary" @click="invoiceBool(true)">立刻开启</el-button>
      </div>
    </div>
  
    <div v-else>
      <el-table :data="tableobj.list" :row-key="getRowKeys" style="width: 100%" v-loading="tableobj.loading" @selection-change="handleSelectionChange" ref="multipleTable">
        <el-table-column type="selection" :reserve-selection="true" width="45"></el-table-column
        >
        <el-table-column prop="applicationTime" label="申请日期" v-if="seekobj.invoiceStatus=='1'"></el-table-column>
        <el-table-column prop="openInvoiceTime" label="处理日期" v-else-if="seekobj.invoiceStatus=='2'"></el-table-column>
        <el-table-column prop="alreadyInvoiceTime" label="处理日期" v-else-if="seekobj.invoiceStatus=='3'"></el-table-column>
        <el-table-column prop="failureInvoiceTime" label="处理日期" v-else="seekobj.invoiceStatus=='4'"></el-table-column>


        <el-table-column prop="orNumber" label="订单编号" ></el-table-column>
        <el-table-column prop="orderPrice" label="订单金额"></el-table-column>
        <el-table-column prop="goodsName" label="订单商品"></el-table-column>
        <el-table-column prop="invoiceType" label="发票类型"></el-table-column>
        <el-table-column prop="headType" label="抬头类型"></el-table-column>
        <el-table-column prop="headName" label="抬头名称"></el-table-column>
        <el-table-column prop="payTaxesManNumber" label="纳税人识别码"></el-table-column>
        <el-table-column prop="invoicePrice" label="开票金额"></el-table-column>
        <el-table-column label="申请账号" min-width="120"  align="center">
           <template slot-scope="scope">
              <div style="width:100%;text-align: center">{{scope.row.applicationMan}}</div>
              <div style="width:100%;text-align: center">{{scope.row.applicationPhone}}</div>
          </template>
        </el-table-column>
         <el-table-column prop="applicationTime" label="申请日期" v-if="seekobj.invoiceStatus!='1'"></el-table-column>
        <el-table-column label="失败原因" v-if="seekobj.invoiceStatus=='4'" >
          <template slot-scope="scope">
            <el-button type="text" @click="isBeDefeated=true;pitchOnlist=scope.row;">查看</el-button>
          </template>
        </el-table-column>

        <el-table-column prop="sellerName" label="所属销售" v-if="AccountType=='0'"></el-table-column>
        <el-table-column prop="sortCompany" label="所属分公司" v-if="AccountType=='0'"></el-table-column>
        <el-table-column label="开票状态">
         <template slot-scope="scope">
            <span v-if="scope.row.invoiceStatus=='1'">待处理</span>
            <span v-else-if="scope.row.invoiceStatus=='2'">开票中</span>
            <span v-else-if="scope.row.invoiceStatus=='3'">已开票</span>
            <span v-else-if="scope.row.invoiceStatus=='4'">开票失败</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="140px">
          <template slot-scope="scope">
            <div style="display: flex;flex-wrap: wrap;justify-content: space-between;">
              <el-button type="text" size="mini" @click="isdrawer=true;pitchOnlist=scope.row" v-if="seekobj.invoiceStatus=='1'">开票</el-button>  
              <el-button style="margin:0" type="text" size="mini" v-if="seekobj.invoiceStatus=='2'" @click="isuploading=true;pitchOnlist=scope.row;baseimage=''">上传发票</el-button>
              <el-button style="margin:0" type="text" size="mini" @click="isdefeated=true;pitchOnlist=scope.row;defeatedText=''" v-if="seekobj.invoiceStatus=='2'">开票失败</el-button>
              <el-button style="margin:0" type="text" size="mini"  @click="lookinvoiceimage(scope.row)" v-if="seekobj.invoiceStatus=='3'" >查看发票</el-button>
              <el-button style="margin:0" type="text" size="mini" @click="idinquire(scope.row)" v-if="seekobj.invoiceStatus=='1'||'2'" >订单详细</el-button>
              <el-button style="margin:0" type="text" size="mini" @click="billdetails(scope.row)" v-if="seekobj.invoiceStatus=='1'||'2'">票据详细</el-button>        
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div style="height:30px;margin-top:20px;">
        <el-pagination style="float:right" @size-change="" @current-change="" :current-page="seekobj.pageindex" :page-sizes="[10, 20, 30, 40]" :page-size="seekobj.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableobj.total">
        </el-pagination>
      </div>
    </div>


   <!-- 失败弹窗 -->
    <div>
      <el-dialog title="失败原因" :visible.sync="isBeDefeated" width="600px" center>
      
        <div style="margin:30px 0;text-align:center">{{pitchOnlist.invoiceFailureReason}}</div>
        <div style="height:40px"></div>
      </el-dialog>
    </div>

    <!-- 弹窗 -->
    <div>
      <el-dialog title="发票申请" :visible.sync="kpsqpup.isshow" width="600px">
        <div>
          允许申请： <el-radio-group v-model="kpsqpup.Invoice">
            <el-radio :label="true">允许</el-radio>
            <el-radio :label="false">不允许</el-radio>
          </el-radio-group>
        </div>
        <div style="margin:30px 0;text-align:center">关闭申请后，关闭前的提交过的发票申请将保留</div>
        <div style="float:right">
          <el-button @click="kpsqpup.isshow = false">取 消</el-button>
          <el-button type="primary" @click="invoiceBool(kpsqpup.Invoice)">确 定</el-button>
        </div>
        <div style="height:40px"></div>
      </el-dialog>
    </div>
   <!-- style="width:100px;float:left" -->
   <!-- 订单详细弹窗 -->
    <el-dialog title="订单详细" :visible.sync="isindent" width="500px" center>
      <el-row>
        <el-col :span="4" style="line-height: 25px;">商品名称</el-col>
        <el-col :span="20" style="line-height: 25px;">{{ordermessage.goodsName}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4" style="line-height: 25px;">购买渠道</el-col>
        <el-col :span="20" style="line-height: 25px;">{{ordermessage.buyChannel}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4" style="line-height: 25px;">商品类型</el-col>
        <el-col :span="20" style="line-height: 25px;">{{ordermessage.goodsType}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4" style="line-height: 25px;">所属分公司</el-col>
        <el-col :span="20" style="line-height: 25px;">{{ordermessage.sortCompany}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4" style="line-height: 25px;">所属销售</el-col>
        <el-col :span="20" style="line-height: 25px;">{{ordermessage.sellerName}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4" style="line-height: 25px;">支付时间</el-col>
        <el-col :span="20" style="line-height: 25px;">{{ordermessage.payTime}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4" style="line-height: 25px;">买家</el-col>
        <el-col :span="20" style="line-height: 25px;">{{ordermessage.userName}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4" style="line-height: 25px;">订单状态</el-col>
        <el-col :span="20" style="line-height: 25px;">
          <span v-if="ordermessage.orderStatus=='1'">待付款</span>
          <span v-if="ordermessage.orderStatus=='2'">已付款</span>
          <span v-if="ordermessage.orderStatus=='4'">同意退款</span>
          <span v-if="ordermessage.orderStatus=='5'">打款退款</span>
          <span v-if="ordermessage.orderStatus=='6'">拒绝退款</span>
          <span v-if="ordermessage.orderStatus=='7'">订单完成</span>
          <span v-if="ordermessage.orderStatus=='8'">已取消</span>
          <span v-if="ordermessage.orderStatus=='9'">申请退款</span>
        </el-col>
      </el-row>
    </el-dialog>

       <!-- 票据详细弹窗 -->
    <el-dialog title="票据详细" :visible.sync="isbill" width="500px" center>
      <el-row>
        <el-col :span="4" style="line-height: 25px;">发票类型：</el-col>
        <el-col :span="20" style="line-height: 25px;">{{billmessage.invoiceType}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4" style="line-height: 25px;">抬头类型：</el-col>
        <el-col :span="20" style="line-height: 25px;">{{billmessage.headType}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="4" style="line-height: 25px;">发票抬头：</el-col>
        <el-col :span="20" style="line-height: 25px;">{{billmessage.headName}}</el-col>
      </el-row>
     
     <el-row  v-if="billmessage.headType=='企业'">
        <el-col :span="4" style="line-height: 25px;">税号：</el-col>
        <el-col :span="20" style="line-height: 25px;">{{billmessage.payTaxesManNumber}}</el-col>
      </el-row>
      <el-row  v-if="billmessage.headType=='企业'">
        <el-col :span="4" style="line-height: 25px;">开户银行：</el-col>
        <el-col :span="20" style="line-height: 25px;">{{billmessage.openBank}}</el-col>
      </el-row>
      <el-row v-if="billmessage.headType=='企业'">
        <el-col :span="4" style="line-height: 25px;">银行账号：</el-col>
        <el-col :span="20" style="line-height: 25px;">{{billmessage.bankNumber}}</el-col>
      </el-row>
      <el-row v-if="billmessage.headType=='企业'">
      <el-col :span="4" style="line-height: 25px;">企业地址：</el-col>
        <el-col :span="20" style="line-height: 25px;">{{billmessage.companyAddress}}</el-col>
      </el-row>
      <el-row v-if="billmessage.headType=='企业'">
        <el-col :span="4" style="line-height: 25px;">企业电话：</el-col>
        <el-col :span="20" style="line-height: 25px;">{{billmessage.companyPhone}}</el-col>
      </el-row>
      <el-row  v-if="seekobj.invoiceStatus=='3'">
        <el-col :span="4" style="line-height: 25px;">发票内容：</el-col>
         <img :src="billmessage.invoiceUrl" style="width:350px;height:auto;padding-top:10px"/>
        <!-- <el-col :span="20" style="line-height: 25px;">{{billmessage.invoiceContent}}</el-col> -->
      </el-row> 
    </el-dialog>


    <el-dialog title="确定开票" :visible.sync="isdrawer" width="500px" center>
     <div style="width:100%; text-align: center">确定将此申请加入“开票中”</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isdrawer = false">取 消</el-button>
        <el-button type="primary" @click="affirmMake">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="批量开票" :visible.sync="isbatch" width="500px" center>
     <div style="width:100%; text-align: center">确定将{{orNumberlist.length}}条申请加入“开票中”</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isbatch = false">取 消</el-button>
        <el-button type="primary" @click="affirmisbatch">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="导出数据" :visible.sync="isdaochu" width="500px" center>
     <div style="width:100%; text-align: center">确定导出{{orNumberlist.length}}条申请数据？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isdaochu = false">取 消</el-button>
        <el-button type="primary" @click="exportlist">确 定</el-button>
      </span>
    </el-dialog>


    <el-dialog title="上传发票" :visible.sync="isuploading" width="500px" center  >
       <input style="display:none" type="file" id="commodityimage" accept=".jpg,.png" />
      <div style="display: flex;justify-content: center;" v-if="baseimage">
         <img :src="baseimage" style="width:300px;height:auto"/>        
      </div>
      <div style="display: flex;justify-content: center;margin-top:20px;">     
         <el-button type="primary" @click="getFileImg" v-if="baseimage">重新上传</el-button>
         <el-button type="primary" @click="getFileImg" v-else>点击上传</el-button>
      </div>   
      <span slot="footer" class="dialog-footer">
        <el-button @click="isuploading = false">取 消</el-button>
        <el-button type="primary" @click="affirmUploading">确 定</el-button>
      </span>
    </el-dialog>

  

  
<!-- 开票失败弹窗 -->
      <el-dialog title="开票失败" :visible.sync="isdefeated" width="500px"center>
        <el-row>
          <el-col :span="1" style="min-width:150px;text-align:left;margin-bottom:15px">
            <div>请输入失败的理由：</div>
          </el-col>
          <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 5}"
            placeholder="请输入内容"
            maxlength="30"
            show-word-limit
            v-model="defeatedText"
          ></el-input>
        </el-row>
       <span slot="footer" class="dialog-footer">
         <el-button @click="isdefeated = false">取 消</el-button>
         <el-button type="primary"  @click="affirmDefeated">确 定</el-button>
       </span>
    </el-dialog>

     <el-dialog  :visible.sync="islookimage" width="500px"center>
      <img :src="pitchOnlist.invoiceUrl" style="width:450px;height:auto;"/>
    </el-dialog>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {

      getRowKeys(row) {
        return row.checkid;
      },
      seekobj: {
        invoiceStatus: "1",
        headName: "",
        applicationPhone: "",
        orNumber: "",
        goodsName: "",
        sortCompany: "",
        sellerName: "",
        orTime: "",
        pageindex: 1,
        pagesize: 10
      },
      tableobj: {
        list: [],
        total: 0,
        loading: false
      },
      kpsqpup: {
        isshow: false,
        Invoice: false,
        invoiceFirst: false
      },
      orNumberlist:[],//选择的列表编号数组
      pitchOnlist:{},//选中的对象信息
      ordermessage:{},//选中订单的详细信息
      billmessage:{},//选中票据的详细信息
      isindent:false,//订单详细弹窗
      isbill:false,//票据详细弹窗
      isdrawer:false,//开票弹窗
      isuploading:false,//上传发票弹窗
      baseimage:"",//上传base64图片
      islookimage:false,//查看图片弹窗
      isdefeated:false,//开票失败弹窗
      defeatedText:"",//失败理由
      isbatch:false,//批量开票的弹窗
      AccountType:"",//账号类型
      isdaochu:false,//导出弹窗
      isBeDefeated:false,//失败弹窗
      fromCompanyData:[{//分公司选项
            label:"全部",
            value:""
       }],
       fromSaleData:[{//销售选项
            label:"全部",
            value:""
       }],
    
     
    };
    
  },
  created() {
    this.setpagemsg();
  },

  beforeDestroy() {
    this.copypagemsg();
  },
  mounted() {
  this.getrolemessage()
  this.invoiceSearch();
    if (this.$store.getters.getRoleInfo.AccountType == 2) {
      this.invoiceSwitchAfter();
    } else {
      this.kpsqpup.invoiceFirst = true;
    }
  },
  methods: {


   getrolemessage() { //获取角色信息 (0运营1分公司2销售3企业)  
      this.$api
        .get("/account/pullRole")
        .then(res => {     
      
          this.AccountType=res.data.User.AccountType  
          this.getSelectionData(res.data.User.AccountType,res.data.User.AccountName)
        })
        .catch(res => {
          this.$message.error(res.msg);
        });
    },
 
    getSelectionData(types,names){//获取选项
     var body={
          AccountType:types,
          AccountName:names,
      }
      this.$api.get("/account/pullOrg2", body).then(res => {  
      
      for(var i=0;i<res.data.length;i++){
        if(res.data[i].AccountType=="1"){
          res.data[i].Name.map((item,index)=>{
           var arr={
             label:item,
             value:item
           }
           this.fromCompanyData.push(arr)      
         })
        }else if(res.data[i].AccountType=="2"){
          res.data[i].Name.map((item,index)=>{
           var arr={
             label:item,
             value:item
           }
           this.fromSaleData.push(arr)      
         })
        }
         
      }
      }); 
    },


  lookinvoiceimage(val){//查看发票
 
     this.islookimage=true
     this.pitchOnlist=val
    
       var body={
         orNumber:val.orNumber,
       }
        this.$api
        .post("/order/queryInvoice",body)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
  },
  exportlist(){//导出

 
     var body={
         orNumber:this.orNumberlist,
       }
        this.$api
        .post("/order/invoiceExport",body)
        .then(res => {
          this.isdaochu=false
          let a = document.createElement("a");
          a.href = this.$parent.$parent.$parent.weburl + res.data; // href链接指向的地址
          a.download = this.$parent.$parent.$parent.weburl + res.data; // 下载的的名称
          a.click(); // 触发a标签的单击事件
        })
        .catch(err => {
          console.log(err);
        });
  },
   copypagemsg() { 

      var body = {
        invoiceStatus: this.seekobj.invoiceStatus, 
        headName: this.seekobj.headName, 
        applicationPhone: this.seekobj.applicationPhone, 
        orNumber: this.seekobj.orNumber, 
        goodsName: this.seekobj.goodsName, 
        sortCompany: this.seekobj.sortCompany, 
        sellerName: this.seekobj.sellerName, 
        orTime: this.seekobj.orTime, 
        pageindex: this.seekobj.pageindex, 
        pagesize: this.seekobj.pagesize,   
      };
   
      this.$store.commit("setMartOutlistmsg", body);
    },

  setpagemsg() {
    var body = this.$store.getters.getMartOutlistmsg;
     this.seekobj.invoiceStatus=body.invoiceStatus||'1'
     this.seekobj.headName=body.headName||''
     this.seekobj.applicationPhone=body.applicationPhone||''
     this.seekobj.orNumber=body.orNumber||''
     this.seekobj.goodsName=body.goodsName||''
     this.seekobj.sortCompany=body.sortCompany||''
     this.seekobj.sellerName=body.sellerName||''
     this.seekobj.orTime=body.orTime||''
     this.seekobj.pageindex=body.pageindex||1 
     this.seekobj.pagesize=body.pagesize||10
  },

    affirmisbatch(){//批量开票
     var body={
         orNumber:this.orNumberlist,
         invoiceStatus:"2"
       }
        this.$api
        .post("/order/batchOpenUp",body)
        .then(res => {
          this.isbatch=false
          if(this.tableobj.list.length<=1&&this.seekobj.pageindex>1){
             this.seekobj.pageindex=this.seekobj.pageindex-1
          }
          this.invoiceSearch()
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSelectionChange(rows){//选择列表
      console.log(rows)
      this.orNumberlist=rows.map((item)=>{
         return item.orNumber
      })
       console.log()
    },
    affirmDefeated(){//确认开票失败
      var body={
         orNumber:this.pitchOnlist.orNumber,
         invoiceFailureReason:this.defeatedText
       }
        this.$api
        .post("/order/failureInvoice",body)
        .then(res => {
          if(this.tableobj.list.length<=1&&this.seekobj.pageindex>1){
             this.seekobj.pageindex=this.seekobj.pageindex-1
           }
          this.invoiceSearch()
          this.isdefeated=false
        })
        .catch(err => {
          console.log(err);
        });
    },

    getFileImg(){//选择图片
      document.getElementById("commodityimage").addEventListener("change", this.imgChange);//把imgChange的事件绑定到input的change事件上 
      document.getElementById("commodityimage").click();//执行input事件
    },
    imgChange(e){//转化base64
    
  
      var imageSize=e.target.files[0].size
      if(imageSize<5000000){
        var file=e.target.files[0]
        var reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
        document.getElementById('commodityimage').value = null;//保证可用选择重复图片
          this.baseimage=reader.result
        }
        reader.onerror = function (error) {
         console.log('Error: ', error)
      }
      }else{
       document.getElementById('commodityimage').value = null;//保证可用选择重复图片
       this.$message.error('图片超过5MB，上传失败');
      }
    },
    affirmUploading(){//确认上传
    if(this.baseimage){
        const loading = this.$loading({
          lock: true,
          text: '上传中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        var body={
         orNumber:this.pitchOnlist.orNumber,
         img:this.baseimage
       }
        this.$api
        .post("/order/uploadInvoice",body)
        .then(res => {
          this.isuploading=false
          if(this.tableobj.list.length<=1&&this.seekobj.pageindex>1){
             this.seekobj.pageindex=this.seekobj.pageindex-1
          }
           loading.close();
          this.invoiceSearch()
          
        })
        .catch(err => {
          loading.close();
          console.log(err);
        });
    }else{
       this.$message.error('请上传发票');
    }
      
    },

    affirmMake(){//确认开票
      var body={
         orNumber:this.pitchOnlist.orNumber,
         invoiceStatus:"2"
       }
        this.$api
        .post("/order/openUp",body)
        .then(res => {
          this.isdrawer = false
          if(this.tableobj.list.length<=1&&this.seekobj.pageindex>1){
               this.seekobj.pageindex=this.seekobj.pageindex-1
           }  
          this.invoiceSearch()
        })
        .catch(err => {
          console.log(err);
        });
    },
   selectList(e) {
      //选择列表
      this.seekobj.pageindex = 1;
      this.$refs.multipleTable.clearSelection();
      
      this.invoiceSearch()
      // this.tabPosition = e;
      // this.tableshopcombo.shopcomboList = [];
      // this.tableshopcombo.loading = true;
      // this.getmessage();
    },

    invoiceBool(bool) {
      this.$api
        .post("/order/invoiceBool", {
          switch: String(bool)
        })
        .then(res => {
          console.log(res);
          this.kpsqpup.isshow = false;
          this.kpsqpup.Invoice = bool;
          this.invoiceSwitchAfter();
          this.seekobj.pageindex = 1;
          this.invoiceSearch();
        })
        .catch(err => {
          console.log(err);
        });
    },
    invoiceSwitchAfter() {
      this.$api
        .post("/order/invoiceSwitchAfter")
        .then(res => {
          console.log(res);
          this.kpsqpup.Invoice = res.data.invoice;
          this.kpsqpup.invoiceFirst = res.data.invoiceFirstNew;
        })
        .catch(err => {
          console.log(err);
        });
    },
    openkpsq() {
      this.kpsqpup.isshow = true;
      this.invoiceSwitchAfter();
    },
    seekbtn() {
      this.seekobj.pageindex = 1;
      this.invoiceSearch();
    },

    idinquire(val){//订单详情
       this.isindent=true;
       var body={
         orNumber:val.orNumber
       }
        this.$api
        .post("/order/invoiceOrder",body)
        .then(res => {
          this.ordermessage=res.data
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    billdetails(val){//票据详情
       this.isbill=true
       var body={
         orNumber:val.orNumber
       }
        this.$api
        .post("/order/queryInvoice",body)
        .then(res => {
          this.billmessage=res.data
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },

    
    // 03.发票列表搜索
    invoiceSearch() {
      console.log(this.seekobj.orTime)
      var body = {
        invoiceStatus: this.seekobj.invoiceStatus,
        headName: this.seekobj.headName,
        orTime1: "",
        orTime2: "",
        applicationPhone: this.seekobj.applicationPhone,
        orNumber: this.seekobj.orNumber,
        goodsName: this.seekobj.goodsName,
        sortCompany: this.seekobj.sortCompany,
        sellerName: this.seekobj.sellerName,
        each: this.seekobj.pagesize,
        page: this.seekobj.pageindex,
        export:"0"
      };
      if (
        this.seekobj.orTime &&
        Array.isArray(this.seekobj.orTime) &&
        this.seekobj.orTime.length > 1
      ) {
        body.orTime1 = this.seekobj.orTime[0];
        body.orTime2 = this.seekobj.orTime[1];
      }
      this.$api
        .post("/order/invoiceSearch", body)
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.tableobj.total = res.data.count||0;
            this.tableobj.list = res.data.data;
          }
        })
        .catch(err => {
          console.log(err);
          this.tableobj.list = [];
          this.tableobj.total = 0;
        });
    }
  },
  watch: {},
  computed: {}
};
</script>
<style lang="scss" >



</style>