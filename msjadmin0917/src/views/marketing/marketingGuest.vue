<template>
  <div style="margin:20px">
    <div style=" font-size: 20px;">
      <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;" @change="selectList">
        <el-radio-button label="2">审核列表</el-radio-button>
        <el-radio-button label="1">通过列表</el-radio-button>
      </el-radio-group>
      <div>
        <el-form
          :inline="true"
          :model="seekshopcombo"
          label-position="right"
          label-width="120px"
          size="medium"
        >
          <el-form-item label="所属公司:">
            <el-select
              v-model="seekshopcombo.company"
              placeholder
              style="width:200px"
              v-loading="subordinateCompanies.loading"
              @change="choicecompany"
            >
              <el-option
                v-for="item in subordinateCompanies.array"
                :label="item.label"
                :value="item.value"
                :key="item.label"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="姓名：">
            <el-input v-model="seekshopcombo.Name" placeholder="请填写" style="width:200px" maxlength="20"   @change="choicename"></el-input>
          </el-form-item>
          <el-form-item label="手机号：">
            <el-input v-model="seekshopcombo.phone" placeholder="请填写" style="width:200px" maxlength="11" @change="choicephone"></el-input>
          </el-form-item>

          <el-form-item style="float:right">
            <el-button type="primary" @click="search"  icon="el-icon-search">搜 索</el-button>
            <el-button type="primary" v-if="tabPosition=='2'" @click="introduction">准入门槛管理</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 审核列表 -->
      <div :style="{'display':tabPosition=='1'?'none':'inline'}">
        <el-table
          :data="tableshopcombo.shopcomboList"
          style="width: 100%"
          v-loading="tableshopcombo.loading"
        >
          <el-table-column
            prop="SaleApplyTime"
            label="申请时间"
            min-width="100px"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="placeCompanyName"
            label="企业名称"
            min-width="100px"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="name" label="姓名" min-width="100px" show-overflow-tooltip></el-table-column>
          <el-table-column prop="phone" label="手机号" min-width="100px" show-overflow-tooltip></el-table-column>
          <el-table-column prop="TotalMoney" label="消费金额" min-width="100px" show-overflow-tooltip></el-table-column>

          <el-table-column label="操作" width="200px">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="consent(scope.row)">同意</el-button>
              <el-button type="text" size="small" @click="refusedJoin(scope.row)">拒绝</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!--通过列表 none-->
      <div :style="{'display':tabPosition=='2'?'none':'inline'}">
        <el-table
          :data="tableshopcombo.shopcomboList"
          style="width: 100%"
          v-loading="tableshopcombo.loading"
        >
          <el-table-column
            prop="placeCompanyName"
            label="企业名称"
            min-width="100px"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column prop="name" label="名称" min-width="100px" show-overflow-tooltip></el-table-column>
          <el-table-column prop="phone" label="手机号" min-width="100px" show-overflow-tooltip></el-table-column>
          <el-table-column label="累计分红/打款分红"  min-width="100px" show-overflow-tooltip>
             <template slot-scope="scope">
              <div>{{scope.row.TotalMoney}}</div>
              <div>{{scope.row.OutMoney}}</div>
            </template>
           
          </el-table-column>


          <el-table-column
            prop="SaleBecomeTime"
            label="创建时间"
            min-width="100px"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column label="状态" min-width="100px" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-if="scope.row.DisableSale==false">启用</span>
              <span v-if="scope.row.DisableSale==true">停用</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200px">
            <template slot-scope="scope">
              <el-button size="small" @click="isblockUp(scope.row)" style="color: #000000;border-color: #DCDFE6;background-color: #FFFFFF;" >
                <span v-if="scope.row.DisableSale==true">启用</span>
                <span v-if="scope.row.DisableSale==false">停用</span>
              </el-button>

              
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 弹窗1 -->
      <el-dialog title="准入门槛管理" :visible.sync="windowsManage.isintroduction" width="800px">
        <div style="overflow:hidden;width:100%;margin-left:30px">
          <div style="float:left;line-height:28px;">可入公司:</div>
          <div style="float:left;line-height:28px;margin-left:15px">
            <div>
              <el-radio v-model="introductionMessage.allcompany" :label="true">全部公司</el-radio>
            </div>
            <div>
              <el-radio
                v-model="introductionMessage.allcompany"
                :label="false"
                style="margin-right:15px"
              >部分公司</el-radio>
              <el-button
                size="mini"
                :disabled="introductionMessage.allcompany==false?false:true"
                @click="selectCompany"
              >选 择</el-button>
            </div>
          </div>
        </div>
        <div style="overflow:hidden;width:100%;margin-top:10px;margin-left:30px">
          <div style="float:left;line-height:28px;">是否需要审核:</div>
          <div style="float:left;line-height:28px;margin-left:15px">
            <div>
              <el-radio v-model="introductionMessage.audit" :label="true">是</el-radio>
            </div>
            <div>
              <el-radio
                v-model="introductionMessage.audit"
                :label="false"
                style="margin-right:15px"
              >否</el-radio>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="windowsManage.isintroduction = false">取 消</el-button>
          <el-button type="primary" @click="updateDistribution">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 弹窗2 -->
      <el-dialog title="选择公司" :visible.sync="windowsManage.iscompany" width="1200px">
        <div class="mybigtransfer" style="margin-left:80px;">
          <el-transfer 
            filterable
            :filter-method="filterMethod"
            :titles="['选择准入公司', '已经加入的公司']"
            filter-placeholder="请输入"
            v-model="introductionMessage.selectStores"
            :data="allenterpriselist"
          ></el-transfer>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button @click="windowsManage.iscompany = false">取 消</el-button>
          <el-button type="primary" @click="windowsManage.iscompany = false">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 拒绝弹窗 -->
      <el-dialog title="拒绝加入分销" :visible.sync="windowsManage.isrefuse" width="500px">
        <el-row>
          <el-col :span="1" style="min-width:150px;text-align:left;margin-bottom:15px">
            <div>请输入拒绝理由：</div>
          </el-col>
          <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 5}"
            placeholder="请输入内容"
            maxlength="20"
            show-word-limit
            v-model="refundmsg"
          ></el-input>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="windowsManage.isrefuse = false">取 消</el-button>
          <el-button type="primary" @click="affirmRefuse">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 分页 -->
      <div style="height:30px;margin-top:20px;" v-if="!tableshopcombo.loading">
        <el-pagination
          style="float:right"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="tableselectenterMeal.pageindex"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="tableselectenterMeal.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableselectenterMeal.total"
        ></el-pagination>
      </div>
 
      
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
     auditpage:1,//审核列表页数
     auditsize:10,//每页数量
     passpage:1,//通过列表页数
     passsize:10,//每页数量
     auditseekshopcombo: {//审核列搜索信息
        company: "", //所属公司
        Name: "", //姓名
        phone: "" //手机号
     }, 
     passseekshopcombo: {//通过列搜索信息
        company: "", //所属公司
        Name: "", //姓名
        phone: "" //手机号
     }, 
      selectUser: {}, //选择用户
      subordinateCompanies: {
        //所属公司下拉框
        array: [{ label: "全部", value: "" }],
        loading: false
      },
      RoleInfolist: {}, //销售信息
      allenterpriselist: [], //销售的所有企业
      introductionMessage: {
        //修改门槛的信息
        allcompany: true, //可入公司
        audit: true, //是否审核
        selectStores: [] //选择的企业id
        
      },
      tabPosition: "2", //选择的列表
      seekshopcombo: {//搜索信息
        company: "", //所属公司
        Name: "", //姓名
        phone: "" //手机号
      }, 

      tableshopcombo: {
        //列表
        loading: false,
        shopcomboList: []
      },

      windowsManage: {
        //弹窗管理
        isintroduction: false,
        iscompany: false,
        isrefuse: false
      },

      refundmsg: "", //退款理由：

      tableselectenterMeal: {
        //分页
        pageindex: 1,
        pagesize: 10,
        total: 0
      }
    };
  },
  watch: {},
  created() {
    this.setpagemsg();
  },

  beforeDestroy() {
    this.copypagemsg();
  },
  mounted() {
    // this.getrolemessage();
    this.tableshopcombo.loading = true;
    this.getmessage1();
    // this.getEnterprise()
  },
 
  methods: {

  copypagemsg() { 

      var body = {
        auditseekshopcombocompany:this.auditseekshopcombo.company,        
        auditseekshopcomboName:this.auditseekshopcombo.Name,
        auditseekshopcombophone:this.auditseekshopcombo.phone,

        passseekshopcombocompany:this.passseekshopcombo.company,        
        passseekshopcomboName:this.passseekshopcombo.Name,
        passseekshopcombophone:this.passseekshopcombo.phone,

        passpage:this.passpage,
        passsize:this.passsize,
        auditpage:this.auditpage,
        auditsize:this.auditsize,

      
        tabPosition:this.tabPosition,
        company: this.seekshopcombo.company,
        Name: this.seekshopcombo.Name,  
        phone: this.seekshopcombo.phone, 
        pagesize: this.tableselectenterMeal.pagesize,
        pageindex: this.tableselectenterMeal.pageindex,  
      };
    console.log(body)
      this.$store.commit("setAuditdistribution", body);
    },

  setpagemsg() {

      var body = this.$store.getters.getAuditdistribution;
      console.log(body)
   
      this.passseekshopcombo.company=body.passseekshopcombocompany||"";
      this.passseekshopcombo.Name= body.passseekshopcomboName || "";
      this.passseekshopcombo.phone= body.passseekshopcombophone || "";

      this.auditseekshopcombo.company=body.auditseekshopcombocompany||"";
      this.auditseekshopcombo.Name= body.auditseekshopcomboName || "";
      this.auditseekshopcombo.phone= body.auditseekshopcombophone || "";

      this.auditsize=body.auditsize||10;
      this.passsize=body.passsize||10;
      this.passpage= body.passpage || 1;
      this.auditpage= body.auditpage || 1;

      this.tabPosition=body.tabPosition ||"2";
      this.seekshopcombo.company= body.company || "";
      this.seekshopcombo.Name= body.Name || "";
      this.seekshopcombo.phone= body.phone || "";
      this.tableselectenterMeal.pageindex = body.pageindex || 1;
      this.tableselectenterMeal.pagesize= body.pagesize || 10;
  },

    getmessage() {
      //获取列表信息
      if(this.tabPosition=="1"){
         this.tableselectenterMeal.pageindex=this.passpage
         this.tableselectenterMeal.pagesize=this.passsize

         this.seekshopcombo.company=this.passseekshopcombo.company
         this.seekshopcombo.Name=this.passseekshopcombo.Name
         this.seekshopcombo.phone=this.passseekshopcombo.phone

         console.log(this.seekshopcombo)

        // this.tableselectenterMeal.pageindex=2
      }else{
         this.tableselectenterMeal.pageindex=this.auditpage
         this.tableselectenterMeal.pagesize=this.auditsize


         this.seekshopcombo.company=this.auditseekshopcombo.company
         this.seekshopcombo.Name=this.auditseekshopcombo.Name
         this.seekshopcombo.phone=this.auditseekshopcombo.phone

         console.log(this.seekshopcombo)
      }
      
      var body = {
        AccountName: this.RoleInfolist.AccountName,
        SaleStatus: parseInt(this.tabPosition),
        Name: this.seekshopcombo.Name,
        phone: this.seekshopcombo.phone,
        company: this.seekshopcombo.company,
        page: this.tableselectenterMeal.pageindex,
        pageSize: this.tableselectenterMeal.pagesize
      };

      this.$api.get("/account/GetDistributes", body).then(res => {
        console.log(this.tableselectenterMeal.pageindex);
        if (res.code == 200) {
          this.tableshopcombo.loading = false;
          this.tableshopcombo.shopcomboList = res.data.data;
          this.tableselectenterMeal.total = res.data.count;
        }
      });
    },
    search() {
      //搜索
    
      this.tableshopcombo.shopcomboList = [];
      this.tableshopcombo.loading = true;
      if(this.tabPosition=="1"){
        this.passpage=1
      }else{
        this.auditpage=1
      }
      this.getmessage();
    },

    isblockUp(e) {
      //是否停用
  
        if (e.DisableSale == true) {
            var disableSale = false
            var hititext="是否启用该分销客?"
          } else {
            var disableSale = true
            var hititext="是否停用该分销客?"
          }
        this.$confirm(hititext, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var body = {
            userID: e.userId,
            disableSale: disableSale
          };
          this.$api
            .post("/account/SwitchDistribute", body)
            .then(res => {
              if (res.code == 200) {
                
                this.getmessage();
                this.$message({
                  message: "成功",
                  type: "success"
                });
              }
            })
            .catch(res => {
              this.$message.error(res.msg);
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
     
    },

    filterMethod(query, item) {
      //商品搜索规则
  
      return item.label.indexOf(query) > -1;
    },
    selectList(e) {
      //选择列表
      console.log(e);

     
      this.tabPosition = e;
      this.tableshopcombo.shopcomboList = [];
      this.tableshopcombo.loading = true;

      this.getmessage();
    },
    consent(e) {
      //同意
      this.selectUser = e;
      var body = {
        SaleStatus: 1,
        userId: this.selectUser.userId,
        // FailUreMsg: this.refundmsg,
        FromID:this.selectUser.FromID,
        OpenID:this.selectUser.OpenID,
        placeCompanyFromSale:this.selectUser.placeCompanyFromSale
      };
      this.$api
        .post("/account/AuditDistribute", body)
        .then(res => {
          if (res.code == 200) {
         
           	if(this.tableshopcombo.shopcomboList.length<=1&&this.tableselectenterMeal.pageindex>1){
	              this.tableselectenterMeal.pageindex=this.tableselectenterMeal.pageindex-1
            }	 
            this.auditpage=this.tableselectenterMeal.pageindex
            this.tabPosition = "1";
            this.tableshopcombo.shopcomboList = [];
            this.tableshopcombo.loading = true;
            this.getmessage();
            this.$message({
              message: "成功",
              type: "success"
            });
          }
        })
        .catch(res => {
          this.$message.error(res.msg);
        });
    },
    refusedJoin(e) {
      //拒绝  
      this.windowsManage.isrefuse = true;
      this.selectUser = e;
      console.log(e);
    },
    affirmRefuse() {
      //确认拒绝
      var body = {
        SaleStatus: 3,
        userId: this.selectUser.userId,
        FailUreMsg: this.refundmsg,
        FromID:this.selectUser.FromID,
        OpenID:this.selectUser.OpenID,
        placeCompanyFromSale:this.selectUser.placeCompanyFromSale
      };
      this.$api
        .post("/account/AuditDistribute", body)
        .then(res => {
          if (res.code == 200) {
            if(this.tableshopcombo.shopcomboList.length<=1&&this.tableselectenterMeal.pageindex>1){
	              this.tableselectenterMeal.pageindex=this.tableselectenterMeal.pageindex-1
            }	 
            this.auditpage=this.tableselectenterMeal.pageindex
            this.getmessage();
            this.windowsManage.isrefuse=false
            this.$message({
              message: "成功",
              type: "success"
            });
          }
        })
        .catch(res => {
          this.$message.error(res.msg);
        });
    },
    updateDistribution() {
      //更新分销门槛

      var body = {
        mobile: this.RoleInfolist.Mobile,

        hasallcompany: this.introductionMessage.allcompany,
        hasaudit: this.introductionMessage.audit,
        companylist: this.introductionMessage.selectStores
      };

      this.$api
        .post("/account/UpdateDistributeConfig", body)
        .then(res => {
          if (res.code == 200) {
            this.windowsManage.isintroduction = false;
            this.RoleInfolist.HasAllCompany = this.introductionMessage.allcompany;
            this.RoleInfolist.HasAudit = this.introductionMessage.audit;
            this.RoleInfolist.CompanyList = this.introductionMessage.selectStores;
            // var body=JSON.parse(JSON.stringify(this.RoleInfolist))
            // this.$store.commit("setRoleInfo", body);
            this.getrolemessage();
            console.log(this.RoleInfolist);
          }
        })
        .catch(res => {
          this.$message.error(res.msg);
        });
    },

       getrolemessage() {
      //获取角色信息
      this.$api
        .get("/account/pullRole")
        .then(res => {
          console.log(res);
          this.RoleInfolist = res.data.User;
          this.introductionMessage.allcompany = this.RoleInfolist.HasAllCompany;
          this.introductionMessage.audit = this.RoleInfolist.HasAudit;
          this.introductionMessage.selectStores = this.RoleInfolist.CompanyList||[];
          this.getEnterprise();
        })
        .catch(res => {
          this.$message.error(res.msg);
        });
    },

    getmessage1() { //初次获取列表  
      this.$api
        .get("/account/pullRole")
        .then(res => {
          console.log(res);
          this.RoleInfolist = res.data.User;
          this.introductionMessage.allcompany = this.RoleInfolist.HasAllCompany;
          this.introductionMessage.audit = this.RoleInfolist.HasAudit;
          this.introductionMessage.selectStores = this.RoleInfolist.CompanyList||[];
       
          this.getmessage()
          this.getEnterprise();
        })
        .catch(res => {
          this.$message.error(res.msg);
        });
    },

    introduction(e) {
      //准入门槛管理
      this.windowsManage.isintroduction = true;
      this.getrolemessage();

      //    introductionMessage:{//修改门槛的信息
      //    allcompany:true,//可入公司
      //    audit:true,//是否审核
      //    selectStores:[],//选择的企业id
      // },
    },

    selectCompany(e) {
      //选择公司
      this.getEnterprise();
      this.windowsManage.iscompany = true;
    },

    getEnterprise() {
      //获取销售的企业
      this.subordinateCompanies.loading = true;
      var body = {
        AccountType: this.RoleInfolist.AccountType,
        AccountName: this.RoleInfolist.AccountName
      };
      this.$api.get("/account/pullOrg2", body).then(res => {
        console.log(res);
        if (res.code == 200) {
          var obj1 = res.data[0].Name;
          var obj2 = res.data[0].ID;
      
          this.allenterpriselist = obj1.map((item, index) => {
            return { label: item, key: obj2[index] };
          });
     

           console.log(this.allenterpriselist);

          var obj3 = obj1.map((item, index) => {
            return { label: item, value: item };
          });
          this.subordinateCompanies.array = [{ label: "全部", value: "" }];
          this.subordinateCompanies.array = this.subordinateCompanies.array.concat(
            obj3
          );
          this.subordinateCompanies.loading = false;
          console.log(this.subordinateCompanies.array);
        }
      });
    },

choicecompany(){//选择分公司搜索
    if(this.tabPosition=="1"){
        this.passseekshopcombo.company=this.seekshopcombo.company         
      }else{
        this.auditseekshopcombo.company=this.seekshopcombo.company  
    }
},
choicename(){//输入姓名搜索
     if(this.tabPosition=="1"){
        this.passseekshopcombo.Name=this.seekshopcombo.Name  
       
      }else{
        this.auditseekshopcombo.Name=this.seekshopcombo.Name    
    }
},
choicephone(){//输入手机号搜索
     if(this.tabPosition=="1"){
        this.passseekshopcombo.phone=this.seekshopcombo.phone 
      }else{
        this.auditseekshopcombo.phone=this.seekshopcombo.phone     
     }
},
    // selectable可做勾选数据筛选
    handleSizeChange(val) {
      this.tableselectenterMeal.pagesize = val;
      this.tableselectenterMeal.pageindex = 1;

      if(this.tabPosition=="1"){
        this.passpage=this.tableselectenterMeal.pageindex
        this.passsize=this.tableselectenterMeal.pagesize
      }else{
        this.auditpage=this.tableselectenterMeal.pageindex
        this.auditsize=this.tableselectenterMeal.pagesize
      }

      this.getmessage();

      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.tableselectenterMeal.pageindex = val;
      if(this.tabPosition=="1"){
        this.passpage=this.tableselectenterMeal.pageindex
      }else{
        this.auditpage=this.tableselectenterMeal.pageindex    
      }
      this.getmessage();
      console.log(`当前页: ${val}`);
    }
  }
};
</script>
<style  scoped>
 
</style>