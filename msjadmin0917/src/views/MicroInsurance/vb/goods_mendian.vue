<template>
  <div class="app-container">
    <div class="inquire">
      <el-row>
        <el-col :span="6">
          <div class="grid_lable">商品名称：</div>
          <div class="grid_content">
            <el-input
              placeholder="请输入商品名称"
              v-model="commodityName"
              clearable
              size="medium"
              style="width:100%;"
            ></el-input>
          </div>
        </el-col>

        <el-col :span="6">
          <div class="grid_lable">商品预约类型：</div>
          <div class="grid_content">
            <el-select v-model="commodityValue" placeholder="请选择" size="medium" style="width:100%;">
              <el-option
                v-for="item in commodityList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div> 
        </el-col>
        <el-col :span="6">
          <el-button
            class="grid_button"
            @click="sousuo"
            type="primary"
            size="medium"
            icon="el-icon-search"
          >搜索</el-button>
        
        </el-col>
      </el-row>
    </div>

       <el-dialog title="支持门店"  :modal-append-to-body="false" width="800px" :visible.sync="menDianShow" >
        <el-row style="margin-bottom:20px;">
           <el-col :span="19" style="display:flex">
              <div style="line-height:40px;text-align:left">门店名称：</div>
              <div style="margin-left:0px">
                <el-input v-model="name" placeholder="请输入内容"  clearable> ></el-input>
              </div>
           </el-col>
           <el-col :span="5">
             <div style="float:right;text-align:right" @click="search()">
                 <el-button 
                 type="primary
                 "icon="el-icon-search"
                 @click="search()"
                 size="medium">搜索
                 </el-button>	
             </div>
           </el-col>

        </el-row>
        <el-table
          :data="GoodSListDataById"
          height="600"
          :header-cell-style="{background:'#F2F2F2',color:'#353535'}"
          style="width: 100%;"
          v-loading="goodsloading"
        >
          <el-table-column fixed prop="inst.centername" label="门店名称"></el-table-column>
          <el-table-column label="门店预约类型" width="230" fixed="right">
            <template slot-scope="scope" fixed="right">
              <el-select
                v-model="scope.row.inst.appointtype"
                @change="menSelect(scope.row.inst)"
                placeholder="请选择"
                size="medium"
                style="width:100%;"
              >
                <el-option
                  v-for="item in commodityList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
        </el-table>
        
        <!--分页 -->
        <div class="GMfenlelan" style="margin-bottom:0">
          <el-pagination
            background
            @size-change="toSizeChange"
            @current-change="toCurrentChange"
            :current-page="tocurrentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="topagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tosumpage"
          ></el-pagination>
       </div>

         <div slot="footer" class="dialog-footer">
          <el-button @click="menDianShow = false">取 消</el-button>
          <el-button type="primary" @click="menDianChangeSure()">确 定</el-button>
        </div>
      </el-dialog> 


    <!-- 信息列表 -->
    <div style="margin-top: 20px;">
      <el-table
        :data="GoodSListData"
        height="600"
        :header-cell-style="{background:'#F2F2F2',color:'#353535'}"
        style="width: 100%;"
        v-loading="goodsloading"
      >
        <el-table-column fixed prop="goodName" label="商品名称"></el-table-column>
        <el-table-column prop="goodType" label="商品预约类型"></el-table-column>

        <el-table-column label="支持门店" width="230" fixed="right">
          <template slot-scope="scope" fixed="right">
            <el-button @click="Edit(scope.row.goodId)" size="small" type="text">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="GMfenlelan">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="sumpage"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "packagelist",
  components: {},
  watch: {},
  data() {
    return {
      GoodSListDataById: [],
      name:'',
      tocurrentPage:1,  //弹框当前页
      topagesize:10  , //弹框单页条数
      tosumpage:10 , //弹框总条数
      isSousuo:false, 
      //分页栏属性
      // pageNum: 10,
      goodid:"" , //商品id
      id:[],    //门店id
      appointType:"",   //预约类型
      menDianShow: false,
      currentPage: 1, //当前页
      pagesize: 10, //单页条数
      sumpage: 10, //总条数
      isSearch:false,
      goodsloading: false,
      commodityName: "", //商品名字
      commodityValue: "", //商品类型
      commodityList: [
        {
          value: "全部",
          label: "全部"
        },
        {
          value: "全国预约",
          label: "全国预约"
        },
        {
          value: "地方预约",
          label: "地方预约"
        }
      ],
      GoodSListData: []
    };
  },
  created() {},
  mounted() {
    this.getAlltaocan();
  },
  methods: {
    reset() {
      this.commodityName = "";
      this.currentPage = 1;
      this.pagesize = 10;
      this.getAlltaocan();
    },
    sousuo(){
      this.currentPage=1
     if(this.commodityValue=="全部"){
         this.commodityValue=''
      }
      this.getAlltaocan();
       if(this.commodityValue==""){
         this.commodityValue='全部'
      }
      this.isSousuo=true
    },
    getAlltaocan() {
      var that = this;
      
      var body = {
        goodname:this.commodityName,  //商品名字
        goodtype:this.commodityValue,  //商品类型
        page: this.currentPage,   //当前页
        size: this.pagesize    //单页条数
      };
      if (body.goodtype=='全部') {
        body.goodtype=''
      }
      this.$api
        .get("manage/queryWeiBaoInstGoods", body)
        .then(res => {
          if (res.code == "200") {
            console.log(res.data.data)
            this.GoodSListData = res.data.data;
            this.sumpage = res.data.count;
          }
        })
        .catch(res => {
          this.goodsloading = false;
        });
    },
    getAlltaocanById(goodid){
      var that = this;
     
      var body = {
        goodid: goodid,
        page:this.tocurrentPage,
        size:this.topagesize,
        name:this.name
      };
      this.$api
        .post("manage/queryWeiBaoInstGoodDetail", body)
        .then(res => {
          console.log(res);
          console.log(res.data);
          if (res.code == "200") {
            this.GoodSListDataById=res.data.data
            this.tosumpage=res.data.count
          }
        })
        .catch(res => {
          this.goodsloading = false;
        });
    },
    menDianChangeSure() {
      console.log(this.goodid)
      console.log(this.id)
      console.log(this.appointType)
      var body={
          goodid:this.goodid,
          inst:this.id
      };
      this.$api
        .post("manage/updateWeiBaoGoodsAndInst", body)
        .then(res => {
          console.log(res);
          console.log(res.data);
          if (res.code == "200") {
            this.menDianShow = false;
            this.$message(res.msg);
            this.id=[]
          }
        })
        .catch(res => {
          
        });
    },
    menSelect(e) {
      // this.id.push(e.id)
      // this.appointType=e.appointtype
      this.id.push({id:e.id,appointtype:e.appointtype})
      console.log(this.id)
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },

    Edit(e) {
      var that = this;
      this.name="";
      this.goodid=e;
      this.getAlltaocanById(e);
      this.menDianShow = true;
      
    },
    search(){
      console.log(this.name)
      console.log(this.goodid)
       this.tocurrentPage=1
      this.isSearch=true
      this.getAlltaocanById(this.goodid)
      
    },
    //选择条数
    toSizeChange(val){
      this.currentPage=1;
      this.topagesize=val
      if(this.isSousuo==true){
        this.search()
      }else{
        this.getAlltaocanById(this.goodid)
      }
      
    },
    //选择页数
    toCurrentChange(val){
       console.log(val)
      this.tocurrentPage=val
      this.getAlltaocanById(this.goodid)
      // if(this.isSearch==true){
      //   this.search()
      // }else{
        
      // }
    },
    handleSizeChange(val) {
      console.log(454545455);
      console.log(`每页 ${val} 条`);
      var that = this;
      				this.currentPage = 1;
      that.pagesize = val;
      //				console.log(that.isSousuo)
       that.getAlltaocan();
      // if (that.isSearch==true) {
      //   that.sousuo();
      // } else {
       
      // }
    },
    handleCurrentChange(val) {
      var that = this;
      this.currentPage = val;
      console.log(val);
      that.getAlltaocan();
      // if (that.isSousuo==true) {
      //   console.log("sousuo");
      //   that.sousuo();
      // } else {
      //   console.log("getProductinfo");
        
      // }
    }
  },
  computed: {}
};
</script>

<style>
.GMfenlelan {
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>