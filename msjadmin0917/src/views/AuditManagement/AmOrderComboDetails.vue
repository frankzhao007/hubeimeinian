<template>
  <div style="margin:20px">
    <div style="font-size:20px">
      <i @click="gotoOML()" class="el-icon-my-back backbtn"></i><span>&nbsp&nbsp&nbsp订单套餐信息</span>
    </div>

    <div style="margin:10px 0">
      <!-- <el-button type="primary" @click="addcombo()" :disabled="tableobj1.loading">新 增</el-button>
      <el-button type="primary" @click="importcombo()" :disabled="tableobj1.loading">导入套餐</el-button>
      <el-button type="primary" @click="importcombo('员工')" :disabled="tableobj1.loading">导入人员</el-button>
      <el-button type="primary" @click="savecombomsgbtn()" :disabled="tableobj1.loading">保 存</el-button>
      <el-button type="primary" :disabled="tableobj1.loading" @click="DeleteCombo()">删 除</el-button> -->
      <el-button type="primary" icon="el-icon-download" :loading="isshowpdf" @click="exportpdf()">导出PDF</el-button>

    </div>
    <!-- 数据列表1 -->
    <div>
      <el-table :data="tableobj1.list" style="width: 100%" v-loading="tableobj1.loading" max-height="500px" ref="singleTable" highlight-current-row @current-change="handleCurrentChange">
        <el-table-column prop="ID" label="序号" width="80px"></el-table-column>
        <el-table-column prop="GROUPNAME" label="套餐名称"></el-table-column>
        <el-table-column label="性别">
          <template slot-scope="scope">
            <el-select v-model="scope.row.OP_DATETIME" placeholder="" :disabled="true" style="width:100%" size="mini">
              <el-option label="通用" value="0"></el-option>
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="2"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="TRANS_STATUS" label="自选项否">
          <template slot-scope="scope">
            <el-select v-model="scope.row.TRANS_STATUS" placeholder="" :disabled="true" style="width:100%" size="mini">
              <el-option label="是" value="Y"></el-option>
              <el-option label="否" value="N"></el-option>
              <el-option label="检验阳性" value="1"></el-option>
              <el-option label="检验阴性" value="2"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="OLDPRICE" label="原价">
          <template slot-scope="scope">
            <el-input v-model="scope.row.OLDPRICE" :disabled="true" placeholder="请填写" style="width:100%" size="mini"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="PRICE" label="结算价">
          <template slot-scope="scope">
            <el-input v-model="scope.row.PRICE" :disabled="true" placeholder="请填写" style="width:100%" size="mini"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="costCoefficient" v-if="role=='财务'" label="成本系数">
        	<template slot-scope="scope">
            <el-input  v-model="scope.row.costCoefficient" :disabled="true" placeholder="请填写" style="width:100%" size="mini"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="costCoefficientRate" v-if="role=='财务'" label="成本系数率">
        	<template slot-scope="scope">
            <el-input v-model="scope.row.costCoefficientRate" :disabled="true" placeholder="请填写" style="width:100%" size="mini"></el-input>
          </template>
        </el-table-column>
        
      </el-table>
      <!-- <div style="height:30px;margin-top:20px;">
        <el-pagination style="float:right" @size-change="" @current-change="" :current-page="tableobj1.pageindex" :page-sizes="[10, 20, 30, 40]" :page-size="tableobj1.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableobj1.total">
        </el-pagination>
      </div> -->
    </div>
    <div>
      <div style="margin:20px 0  0">
        <span style="font-size:20px;line-height:40px">套餐明细</span>
        <span style="margin-left:20px">总计：{{tableobj2.list.length||0}}&nbsp&nbsp项</span>
        <span style="margin-left:20px">原价：{{yuanjiachange()}}&nbsp&nbsp元</span>
        <span style="margin-left:20px">结算价：{{chengjiaochange()}}&nbsp&nbsp元</span>
        <!--<div style="float:right">
          <el-button type="text" icon="el-icon-plus" @click="addcombodetail" :disabled="tableobj1.loading">新增</el-button>
          <el-button type="text" icon="el-icon-plus">下载美年项目表</el-button>
          <el-button type="text" icon="el-icon-plus" @click="downloadXM()">下载项目模板</el-button>
        </div>-->
      </div>
    </div>
    <!-- 数据列表2 套餐明细 -->
    <div>
      <el-table :data="tableobj2.list" style="width: 100%" v-loading="tableobj2.loading" max-height="500px">
        <el-table-column label="序号" width="80px">
          <template slot-scope="scope">
            {{scope.$index+1}}
          </template>
        </el-table-column>
        <el-table-column label="项目代码">
          <template slot-scope="scope">
            <el-input v-model="scope.row.ITEM_ID" :disabled="true" placeholder="请填写" style="width:200px" size="mini" @change="GetComboItemDetail(scope.row,scope.$index)"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="ITEM_NAME" label="项目名称">
        </el-table-column>
        <el-table-column prop="PRICE" label="项目价格">
        </el-table-column>
        <!--<el-table-column label="操作" width="80px">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="delcombodetail(scope.row,scope.$index)">删除</el-button>
          </template>
        </el-table-column>-->
      </el-table>
      <!-- <div style="height:30px;margin-top:20px;">
        <el-pagination style="float:right" @size-change="" @current-change="" :current-page="tableobj2.pageindex" :page-sizes="[10, 20, 30, 40]" :page-size="tableobj2.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableobj2.total">
        </el-pagination>
      </div> -->
    </div>
    <div>
      <!-- <div style="margin:20px 0 0 0 ;border-top:1px solid #cccccc"> -->
      <div style="margin:20px 0 0 0">
        <span style="font-size:20px;line-height:40px">人员明细</span>
        <!--<div style="float:right">
          <el-button type="text" icon="el-icon-plus" @click="addGuestdetail" :disabled="tableobj1.loading">新增</el-button>
          <el-button type="text" icon="el-icon-plus" @click="downloadRY()">下载人员模板</el-button>
        </div>-->
      </div>
    </div>
    <!-- 数据列表3 人员明细 -->
    <div>
      <el-table :data="tableobj3.list" style="width: 100%" v-loading="tableobj3.loading" max-height="500px">
        <el-table-column label="序号" width="80px">
          <template slot-scope="scope">
            {{scope.$index+1}}
          </template>
        </el-table-column>
        <el-table-column label="姓名">
          <template slot-scope="scope">
            <el-input v-model="scope.row.XM" placeholder="请填写" :disabled="true" style="width:100%" size="mini"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="性别">
          <template slot-scope="scope">
            <el-select v-model="scope.row.XB" placeholder="" :disabled="true" style="width:100%" size="mini">
              <el-option label="男" value="2"></el-option>
              <el-option label="女" value="1"></el-option>
              <el-option label="通用" value="0"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="身份号">
          <template slot-scope="scope">
            <el-input v-model="scope.row.SFZHM" placeholder="请填写" :disabled="true" style="width:100%" size="mini"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="婚否">
          <template slot-scope="scope">
            <el-select v-model="scope.row.HYZK" placeholder=""  :disabled="true" style="width:100%" size="mini">
              <el-option label="已婚" value="01"></el-option>
              <el-option label="未婚" value="02"></el-option>
               <el-option label="未知" value="03"></el-option> 
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="K3_ZG_ITEM" label="套餐"></el-table-column>
        <el-table-column label="部门2">
          <template slot-scope="scope">
            <el-input v-model="scope.row.K3_ITEM" placeholder="请填写" :disabled="true" style="width:100%" size="mini"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="CW" label="所属套餐"></el-table-column>
        <!--<el-table-column label="操作" width="80px">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="delGuestdetail(scope.row,scope.$index)">删除</el-button>
          </template>
        </el-table-column>-->
      </el-table>
      <!-- <div style="height:30px;margin-top:20px;">
        <el-pagination style="float:right" @size-change="" @current-change="" :current-page="tableobj3.pageindex" :page-sizes="[10, 20, 30, 40]" :page-size="tableobj3.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableobj3.total">
        </el-pagination>
      </div> -->
    </div>

    <!-- 新增套餐弹窗 -->
    <div>
      <el-dialog title="新增套餐" :visible.sync="addcomboobj.isshow" width="450px">
        <el-form :model="addcomboobj" label-position='right' label-width="120px" size="medium">
          <el-form-item label="套餐名称：">
            <el-input v-model="addcomboobj.GROUPNAME" placeholder="请填写" style="width:200px"></el-input>
          </el-form-item>
          <el-form-item label="套餐类别：">
            <el-select v-model="addcomboobj.OP_DATETIME" placeholder="" style="width:200px">
              <el-option label="全部" value="0"></el-option>
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="自选项否：">
            <el-select v-model="addcomboobj.TRANS_STATUS" placeholder="" style="width:200px">
              <el-option label="是" value="Y"></el-option>
              <el-option label="否" value="N"></el-option>
              <el-option label="检验阳性" value="1"></el-option>
              <el-option label="检验阴性" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="成交价：">
            <el-input v-model="addcomboobj.PRICE" placeholder="请填写" style="width:200px"></el-input>
          </el-form-item>
          <el-form-item label="原价：">
            <el-input v-model="addcomboobj.OLDPRICE" placeholder="请填写" style="width:200px"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addcomboobj.isshow = false">取 消</el-button>
          <el-button type="primary" @click="addcombobtn()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <div v-show="isshowpdf" class="pdfclass">
      <div id="approvaContent_pdf" style="padding:20px">
        <div class="pdfhead">
          <div>套餐信息</div>
          <div>
            <el-table :data="tableobj1.list" style="width: 100%" v-loading="tableobj1.loading">
              <el-table-column prop="ID" label="套餐ID" width="80px"></el-table-column>
              <el-table-column prop="GROUPNAME" label="套餐名称"></el-table-column>
              <el-table-column prop="OP_DATETIME" label="类别"></el-table-column>
              <el-table-column prop="TRANS_STATUS" label="自选项否"></el-table-column>
              <el-table-column prop="PRICE" label="成交价"></el-table-column>
              <el-table-column prop="OLDPRICE" label="原价"></el-table-column>
            </el-table>
          </div>
        </div>
        <div class="pdfbody">
          <div>项目详情</div>
          <div v-for="item in tableobj6.list" style="font-size:20px">
            {{combonamechange(item)}}
            <el-table :data="combonamechange1(item) " style="width: 100%">
              <el-table-column label="序号" width="80px">
                <template slot-scope="scope">
                  {{scope.$index+1}}
                </template>
              </el-table-column>
              <el-table-column prop="ITEM_ID" label="项目代码">
              </el-table-column>
              <el-table-column prop="ITEM_NAME" label="项目名称">
              </el-table-column>
              <el-table-column prop="PRICE" label="金额">
              </el-table-column>
              <el-table-column prop="ID" label="所属套餐" width="100px">
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="pdffoot">
          <div>人员明细</div>
          <div>
            <el-table :data="tableobj5.list" style="width: 100%">
              <el-table-column label="序号" width="80px">
                <template slot-scope="scope">
                  {{scope.$index+1}}
                </template>
              </el-table-column>
              <el-table-column label="姓名" prop="XM"></el-table-column>
              <el-table-column label="性别" prop="XB">
                <template slot-scope="scope">
                  {{scope.row.XB=='1'?'男':'女'}}
                </template>
              </el-table-column>
              <el-table-column label="身份号" prop="SFZHM"></el-table-column>
              <el-table-column label="婚否" prop="HYZK"></el-table-column>
              <el-table-column label="部门2" prop="K3_ITEM"></el-table-column>
              <el-table-column prop="K3_ZG_ITEM" label="套餐名称"></el-table-column>
              <el-table-column prop="CW" label="所属套餐"></el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <div>
      <el-dialog title="该excel存在多个工作表，请选择" :visible.sync="excelselectobj.isshow" width="400px">
        <el-radio-group v-model="excelselectSheetNames">
          <el-radio v-for="item in excelSheetNames" :key="item" :label="item" style="line-height:36px;width:100%">{{item}}</el-radio>
        </el-radio-group>
        <div slot="footer" class="dialog-footer">
          <el-button @click="excelselectobj.isshow = false">取 消</el-button>
          <el-button type="primary" @click="excelparse(excelwbobj[excelselectSheetNames])">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <input ref="inputer" id="upload" style="display:none" type="file" @change="importfxx()" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
  </div>
</template>
<script>
import html2Canvas from "html2canvas";
import JsPDF from "jspdf";
export default {
  components: {},
  data() {
    return {
    	role:'',
      isyuangong: false,
      excelselectSheetNames: "",
      excelSheetNames: [],
      excelwbobj: "",
      excelselectobj: {
        isshow: false
      },
      isshowpdf: false,
      addcomboobj: {
        isshow: false,
        MsjBILLCODE: "",
        GROUPNAME: "",
        OP_DATETIME: "0",
        TRANS_STATUS: "Y",
        PRICE: "",
        OLDPRICE: ""
      },
      tableobj1: {
        list: [],
        loading: false,
        total: 0
      },
      tableobj2: {
        list: [],
        loading: false,
        total: 0
      },
      tableobj3: {
        list: [],
        loading: false,
        total: 0
      },
      tableobj4: {
        list: [],
        loading: false,
        total: 0
      },
      tableobj5: {
        list: [],
        loading: false,
        total: 0
      },
      tableobj6: {
        list: [],
        loading: false,
        total: 0
      },
      currentRow: ""
    };
  },
  mounted() {
    if (this.$route.query) {
      this.addcomboobj.MsjBILLCODE = this.$route.query.MsjBILLCODE;
    }
    this.GetCombo();
    this.role = this.$store.getters.getrolemsg
  },
  methods: {
    importcombo(str) {
      if (str == "员工") {
        this.isyuangong = true;
      } else {
        this.isyuangong = false;
      }
      this.$refs.inputer.value = "";
      this.excelselectSheetNames = "";
      this.excelSheetNames = [];
      this.excelwbobj = "";
      document.getElementById("upload").click();
    },
    importfxx(e) {
      let _this = this;
      console.log(event);
      var myevent = event;
      setTimeout(() => {
        // _this.$refs.inputer.value = "";
        let inputDOM = _this.$refs.inputer;
        // 通过DOM取文件数据
        console.log(myevent);
        _this.file = myevent.target.files[0];
        console.log(_this.file);
        _this.filename = _this.file.name;
        var rABS = false; //是否将文件读取为二进制字符串
        var f = _this.file;
        var reader = new FileReader();
        //if (!FileReader.prototype.readAsBinaryString) {
        FileReader.prototype.readAsBinaryString = function(f) {
          var binary = "";
          var rABS = false; //是否将文件读取为二进制字符串
          var wb; //读取完成的数据
          var outdata;
          var reader = new FileReader();
          reader.onload = function(e) {
            var bytes = new Uint8Array(reader.result);
            var length = bytes.byteLength;
            for (var i = 0; i < length; i++) {
              binary += String.fromCharCode(bytes[i]);
            }
            var XLSX = require("xlsx");
            if (rABS) {
              wb = XLSX.read(btoa(fixdata(binary)), {
                //手动转化
                type: "base64"
              });
            } else {
              wb = XLSX.read(binary, {
                type: "binary"
              });
            }
            outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]); //outdata就是你想要的东西
            console.log("outdata", outdata);
            console.log("wb.SheetNames", wb.SheetNames);
            console.log("wb.SheetNames", wb);
            console.log("outdata1", wb.Sheets[wb.SheetNames[0]]);
            if (wb.SheetNames.length > 1) {
              _this.excelSheetNames = wb.SheetNames;
              _this.excelwbobj = wb.Sheets;
              _this.excelselectobj.isshow = true;
            } else {
              _this.excelparse(wb.Sheets[wb.SheetNames[0]]);
            }
          };
          reader.readAsArrayBuffer(f);
        };
        if (rABS) {
          reader.readAsArrayBuffer(f);
        } else {
          reader.readAsBinaryString(f);
        }
      }, 100);
    },
    excelparse(val) {
      console.log(val);
      if (!val) {
        this.$message.error("请选择工作表");
        return;
      }
      if (this.isyuangong) {
        console.log("人员");
        if (val.A1.v != "姓名") {
          this.$message.error("请传入正确格式的人员表");
          return;
        }
        var tableobj2temp = [];
        for (const key in val) {
          if (val.hasOwnProperty(key)) {
            const element = val[key];
            console.log(key, element);
            if (String(key).substring(0, 1) == "A" && key != "A1") {
              var codenum = {
                index: String(key).substring(1),
                XM: element.v,
                XB: "",
                SFZHM: "",
                HYZK: "",
                K3_ZG_ITEM: this.currentRow.GROUPNAME,
                K3_ITEM: "",
                CW: this.currentRow.ID
              };
              tableobj2temp.push(codenum);
            }
          }
        }
        for (const key in val) {
          if (val.hasOwnProperty(key)) {
            const element = val[key];
            console.log(key, element);
            //身份证
            if (String(key).substring(0, 1) == "E" && key != "E1") {
              for (let i = 0; i < tableobj2temp.length; i++) {
                if (tableobj2temp[i].index == String(key).substring(1)) {
                  tableobj2temp[i].SFZHM = element.v;
                  if (Number(tableobj2temp[i].SFZHM.slice(-2, -1)) % 2 == 1) {
                    tableobj2temp[i].XB = "0";
                  } else {
                    tableobj2temp[i].XB = "1";
                  }
                  // if (tableobj2temp[i].SFZHM.length == 15) {
                  //   String(tableobj2temp[i].SFZHM).substring(5, 11);
                  // }
                  // if (tableobj2temp[i].SFZHM.length == 18) {
                  // }
                }
              }
            }
            //婚姻状况
            if (String(key).substring(0, 1) == "J" && key != "J1") {
              for (let i = 0; i < tableobj2temp.length; i++) {
                if (tableobj2temp[i].index == String(key).substring(1)) {
                  if (element.v == "已婚") {
                    tableobj2temp[i].HYZK = "0001";
                  } else {
                    tableobj2temp[i].HYZK = null;
                  }
                }
              }
            }
            //部门2
            if (String(key).substring(0, 1) == "O" && key != "O1") {
              for (let i = 0; i < tableobj2temp.length; i++) {
                if (tableobj2temp[i].index == String(key).substring(1)) {
                  tableobj2temp[i].K3_ITEM = element.v;
                }
              }
            }
          }
        }
        console.log(tableobj2temp);
        this.tableobj3.list = this.tableobj3.list.concat(tableobj2temp);
      } else {
        console.log("套餐");

        if (val.A1.v != "项目代码") {
          this.$message.error("请传入正确格式的套餐表");
          return;
        }
        var tableobj2temp = [];
        for (const key in val) {
          if (val.hasOwnProperty(key)) {
            const element = val[key];
            console.log(key, element);
            if (String(key).substring(0, 1) == "A" && key != "A1") {
              // var codenum = {
              //   index: String(key).substring(1),
              //   ITEM_ID:String(element.v) ,
              //   ITEM_NAME: "",
              //   PRICE: 0
              // };
              tableobj2temp.push(String(element.v));
            }
          }
        }
        this.$network3
          .post("/mnoracle/msj/GetManyItemDetail", {
            items: tableobj2temp
          })
          .then(res => {
            console.log(res);
            if (res.code == 200 && res.data.length > 0) {
              this.tableobj2.list = this.tableobj2.list.concat(res.data);
            } else {
              this.$message.error("未找到改项目");
            }
          })
          .catch(err => {
            console.log(err);
            this.$message.error(err.msg);
          });
        // for (const key in val) {
        //   if (val.hasOwnProperty(key)) {
        //     const element = val[key];
        //     console.log(key, element);
        //     if (String(key).substring(0, 1) == "B" && key != "B1") {
        //       for (let i = 0; i < tableobj2temp.length; i++) {
        //         if (tableobj2temp[i].index == String(key).substring(1)) {
        //           tableobj2temp[i].ITEM_NAME = element.v;
        //         }
        //       }
        //     }
        //   }
        // }
        // for (const key in val) {
        //   if (val.hasOwnProperty(key)) {
        //     const element = val[key];
        //     console.log(key, element);
        //     if (String(key).substring(0, 1) == "G" && key != "G1") {
        //       for (let i = 0; i < tableobj2temp.length; i++) {
        //         if (tableobj2temp[i].index == String(key).substring(1)) {
        //           if (element.v == "免费") {
        //             tableobj2temp[i].PRICE == 0;
        //           } else {
        //             tableobj2temp[i].PRICE =Number(element.v);
        //           }
        //         }
        //       }
        //     }
        //   }
        // }
      }

      this.excelselectobj.isshow = false;
    },
    yuanjiachange() {
      var price = 0;
      console.log(this.tableobj2)
      this.tableobj2.list.map(item => {
        price += Number(item.PRICE);
      });
      return price;
    },
    chengjiaochange() {
    	console.log(this.currentRow);
//    var price = 0;
//    this.tableobj1.list.map(item => {
//      price += Number(item.PRICE);
//    });
//    return price;
     if(this.currentRow){
     	 return this.currentRow.PRICE;
     }
     
    },
    combonamechange(item) {
      console.log(item);
      for (let i = 0; i < this.tableobj1.list.length; i++) {
        if (this.tableobj1.list[i].ID == item) {
          return this.tableobj1.list[i].GROUPNAME;
        }
      }
    },
    combonamechange1(val) {
      return this.tableobj4.list.filter(item => {
        return item.ID == val;
      });
    },
    downloadRY() {
      let a = document.createElement("a");
      // console.log(require("../assets/qrcode.png"));
      a.href =
        "https://medicinelibrary.ihaozhuo.com/mnoracle/static/%E5%AE%A2%E4%BA%BA(%E6%A8%A1%E6%9D%BF).xlsx"; // href链接指向图片的地址
      a.download =
        "https://medicinelibrary.ihaozhuo.com/mnoracle/static/%E5%AE%A2%E4%BA%BA(%E6%A8%A1%E6%9D%BF).xlsx"; // 下载的图片的名称
      a.click(); // 触发a标签的单击事件
    },
    downloadXM() {
      let a = document.createElement("a");
      // console.log(require("../assets/qrcode.png"));
      a.href =
        "https://medicinelibrary.ihaozhuo.com/mnoracle/static/%E5%A5%97%E9%A4%90(%E6%A8%A1%E6%9D%BF).xlsx"; // href链接指向图片的地址
      a.download =
        "https://medicinelibrary.ihaozhuo.com/mnoracle/static/%E5%A5%97%E9%A4%90(%E6%A8%A1%E6%9D%BF).xlsx"; // 下载的图片的名称
      a.click(); // 触发a标签的单击事件
    },
    gotoOML() {
      this.$router.push("/AuditManagement/AuditList");
    },
    DeleteCombo() {
      this.$network3
        .get("/mnoracle/msj/DeleteCombo", {
          MsjBILLCODE: this.currentRow.MsjBILLCODE,
          ID: this.currentRow.ID
        })
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.GetCombo();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    savecombomsgbtn() {
      //校验
      if (this.tableobj2.list.length <= 0) {
        this.$message.error("请添加套餐明细");
        return;
      }
      if (this.tableobj3.list.length <= 0) {
        this.$message.error("请添加人员明细");
        return;
      }
      var tableobj2keyArray = [];
      var tableobj3keyArray = [];
      for (let i = 0; i < this.tableobj2.list.length; i++) {
        if (!this.tableobj2.list[i].ITEM_ID) {
          this.$message.error("请将套餐明细信息填写完整");
          return;
        } else {
          tableobj2keyArray.push(this.tableobj2.list[i].ITEM_ID);
        }
      }
      for (let i = 0; i < this.tableobj3.list.length; i++) {
        if (
          !this.tableobj3.list[i].XM ||
          !this.tableobj3.list[i].XB ||
          !this.tableobj3.list[i].SFZHM ||
          !this.tableobj3.list[i].K3_ITEM
        ) {
          this.$message.error("请将人员明细信息填写完整");
          return;
        } else {
          tableobj3keyArray.push(this.tableobj3.list[i].SFZHM);
        }
      }
      for (let i = 0; i < this.tableobj2.list.length; i++) {
        let copyindex = tableobj2keyArray.indexOf(
          this.tableobj2.list[i].ITEM_ID
        );
        if (copyindex != i) {
          this.$message.error(
            copyindex + 1 + "行与" + (i + 1) + "行，套餐明细数据重复"
          );
          return;
        }
      }
      for (let i = 0; i < this.tableobj3.list.length; i++) {
        let copyindex = tableobj3keyArray.indexOf(this.tableobj3.list[i].SFZHM);
        if (copyindex != i) {
          this.$message.error(
            copyindex + 1 + "行与" + (i + 1) + "行，人员明细数据重复"
          );
          return;
        }
      }
      // this.tableobj1.loading = true;
      this.tableobj2.loading = true;
      this.tableobj3.loading = true;
      //07-添加套餐项目
      var body1 = [];
      var body4 = [];
      this.tableobj2.list.map(item => {
        if (item.lpsign) {
          //修改套餐明细
          let obj = {
            MsjBILLCODE: this.currentRow.MsjBILLCODE,
            ID: this.currentRow.ID,
            SXH: item.SXH,
            ITEM_ID: item.ITEM_ID,
            ITEM_NAME: item.ITEM_NAME
          };
          body4.push(obj);
        } else {
          let obj = {
            MsjBILLCODE: this.currentRow.MsjBILLCODE,
            ID: this.currentRow.ID,
            ITEM_ID: item.ITEM_ID,
            ITEM_NAME: item.ITEM_NAME,
            PRICE: item.PRICE
          };
          body1.push(obj);
        }
      });
      //修改套餐明细接口调用
      this.$network3
        .post("/mnoracle/msj/AddDetail", body1)
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            if (body4.length > 0) {
              this.$network3
                .post("/mnoracle/msj/UpdateComboDetail", body4)
                .then(res => {
                  console.log(res);
                  this.tableobj2.loading = false;
                  //08-添加人员
                  var body2 = [];
                  var body3 = [];
                  this.tableobj3.list.map((item, index) => {
                    if (item.CID) {
                      //修改人员明细 操作
                      let obj = {
                        CID: item.CID,
                        XM: item.XM,
                        XB: item.XB,
                        SFZHM: item.SFZHM,
                        HYZK: item.HYZK,
                        CW: item.CW,
                        K3_ITEM: item.K3_ITEM,
                        K3_ZG_ITEM: item.K3_ZG_ITEM
                      };
                      body3.push(obj);
                    } else {
                      let obj = {
                        XM: item.XM, //姓名
                        XB: item.XB, //性别
                        CSRQ: "1990-12-13 00:00:00",
                        SFZHM: item.SFZHM,
                        HYZK: item.HYZK,
                        MZ: "",
                        GJ: "",
                        DWDM: this.$route.query.DWDM, //单位代码
                        DJSJ: "2020-01-03 00:00:00", //到检时间
                        CITY: "8S",
                        CW: item.CW,
                        ZHYE: "0",
                        TRANS_STATUS: "0",
                        YWYDM: "1172",
                        YXJB: "0",
                        CUST_REGION: "1",
                        K3_ITEM: item.K3_ITEM,
                        K3_ZG_ITEM: item.K3_ZG_ITEM,
                        BGD_LB: "0",
                        GRGZ_YE: "0",
                        XGSJ: "2020-01-01 00:00:00",
                        USER_PASSWORD: "394702",
                        PASSWORD_XGSJ: "2020-01-01 00:00:00",
                        ZZHS: "8S"
                      };
                      body2.push(obj);
                    }
                  });
                  this.$network3
                    .post("/mnoracle/msj/AddGuest", body2)
                    .then(res => {
                      console.log(res);
                      if (res.code == 200) {
                        // this.tableobj2.loading=false;
                        if (body3.length > 0) {
                          this.$network3
                            .post("/mnoracle/msj/UpdateGuestDetail", body3)
                            .then(res => {
                              console.log(res);
                              this.tableobj3.loading = false;
                            }); //修改人员明细 操作 doing...
                        } else {
                          this.tableobj3.loading = false;
                        }
                      }
                    })
                    .catch(err => {
                      console.log(err);
                    });
                });
            } else {
              this.tableobj2.loading = false;
              //08-添加人员
              var body2 = [];
              var body3 = [];
              this.tableobj3.list.map((item, index) => {
                if (item.CID) {
                  //修改人员明细 操作
                  let obj = {
                    CID: item.CID,
                    XM: item.XM,
                    XB: item.XB,
                    SFZHM: item.SFZHM,
                    HYZK: item.HYZK,
                    CW: item.CW,
                    K3_ITEM: item.K3_ITEM,
                    K3_ZG_ITEM: item.K3_ZG_ITEM
                  };
                  body3.push(obj);
                } else {
                  let obj = {
                    XM: item.XM, //姓名
                    XB: item.XB, //性别
                    CSRQ: "1990-12-13 00:00:00",
                    SFZHM: item.SFZHM,
                    HYZK: item.HYZK,
                    MZ: "",
                    GJ: "",
                    DWDM: this.$route.query.DWDM, //单位代码
                    DJSJ: "2020-01-03 00:00:00", //到检时间
                    CITY: "8S",
                    CW: item.CW,
                    ZHYE: "0",
                    TRANS_STATUS: "0",
                    YWYDM: "1172",
                    YXJB: "0",
                    CUST_REGION: "1",
                    K3_ITEM: item.K3_ITEM,
                    K3_ZG_ITEM: item.K3_ZG_ITEM,
                    BGD_LB: "0",
                    GRGZ_YE: "0",
                    XGSJ: "2020-01-01 00:00:00",
                    USER_PASSWORD: "394702",
                    PASSWORD_XGSJ: "2020-01-01 00:00:00",
                    ZZHS: "8S"
                  };
                  body2.push(obj);
                }
              });
              this.$network3
                .post("/mnoracle/msj/AddGuest", body2)
                .then(res => {
                  console.log(res);
                  if (res.code == 200) {
                    // this.tableobj2.loading=false;
                    if (body3.length > 0) {
                      this.$network3
                        .post("/mnoracle/msj/UpdateGuestDetail", body3)
                        .then(res => {
                          console.log(res);
                          this.tableobj3.loading = false;
                        }); //修改人员明细 操作 doing...
                    } else {
                      this.tableobj3.loading = false;
                    }
                  }
                })
                .catch(err => {
                  console.log(err);
                });
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    GetComboItemDetail(row, index) {
      console.log(row, index);
      // if (!row.ITEM_ID) {
      //   return;
      // }
      this.$network3
        .get("/mnoracle/msj/GetComboItemDetail", {
          ITEM_ID: row.ITEM_ID
        })
        .then(res => {
          console.log(res);
          if (res.code == 200 && res.data.length > 0) {
            this.tableobj2.list[index].ITEM_NAME = res.data[0].ITEM_NAME;
            this.tableobj2.list[index].PRICE = res.data[0].PRICE;
          } else {
            this.$message.error("未找到改项目，请重新填写");
            this.tableobj2.list[index].ITEM_ID = "";
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    delGuestdetail(row, index) {
      if (row.CID) {
        this.tableobj3.loading = true;
        this.$network3
          .get("/mnoracle/msj/DeleteGuest", { CID: row.CID })
          .then(res => {
            console.log(res);
            this.tableobj3.loading = false;
            if (res.code == 200) {
              this.tableobj3.list.splice(index, 1);
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.tableobj3.list.splice(index, 1);
      }
      console.log(index);
    },
    delcombodetail(row, index) {
      if (row.SXH) {
        console.log(row);
        this.tableobj2.loading = true;
        this.$network3
          .get("/mnoracle/msj/DeleteComboDetail", {
            MsjBILLCODE: row.MsjBILLCODE,
            ID: row.ID,
            SXH: row.SXH
          })
          .then(res => {
            console.log(res);
            this.tableobj2.loading = false;
            if (res.code == 200) {
              this.tableobj2.list.splice(index, 1);
            }
          });
      } else {
        console.log(index);
        this.tableobj2.list.splice(index, 1);
      }
    },
    addcombodetail() {
      this.tableobj2.list.push({
        ITEM_ID: "",
        ITEM_NAME: "",
        STATUS: ""
      });
    },
    addGuestdetail() {
      this.tableobj3.list.push({
        XM: "",
        XB: "",
        SFZHM: "",
        HYZK: "",
        K3_ZG_ITEM: this.currentRow.GROUPNAME,
        K3_ITEM: "",
        CW: this.currentRow.ID
      });
    },
    handleCurrentChange(val) {
      this.currentRow = val;
      console.log(this.currentRow);
      this.tableobj2.loading = true;
      this.tableobj3.loading = true;
      this.GetDetail();
      // this.GetGuestDetail();
    },
    addcombo() {
      this.addcomboobj.isshow = true;
      this.addcomboobj.GROUPNAME = "";
      this.addcomboobj.OP_DATETIME = "0";
      this.addcomboobj.TRANS_STATUS = "Y";
      this.addcomboobj.PRICE = "";
      this.addcomboobj.OLDPRICE = "";
    },
    addcombobtn() {
      if (
        this.addcomboobj.GROUPNAME == "" ||
        this.addcomboobj.PRICE == "" ||
        this.addcomboobj.OLDPRICE == ""
      ) {
        this.$message.error("请将信息填写完整");
        return;
      }
      this.$network3
        .post("/mnoracle/msj/AddCombo", {
          MsjBILLCODE: this.addcomboobj.MsjBILLCODE,
          GROUPNAME: this.addcomboobj.GROUPNAME,
          PRICE: Number(this.addcomboobj.PRICE),
          OLDPRICE: Number(this.addcomboobj.OLDPRICE),
          OP_DATETIME: this.addcomboobj.OP_DATETIME,
          TRANS_STATUS: this.addcomboobj.TRANS_STATUS
        })
        .then(res => {
          console.log(res);
          this.addcomboobj.isshow = false;
          this.GetCombo();
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 03-获取订单套餐信息
    GetCombo() {
      this.tableobj1.loading = true;
      this.$network3
        .get("/mnoracle/msj/GetCombo", {
          MsjBILLCODE: this.addcomboobj.MsjBILLCODE
        })
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.tableobj1.list = res.data;
            this.tableobj1.loading = false;
            if (this.tableobj1.list.length > 0) {
              if (this.currentRow && this.currentRow != "") {
                this.tableobj1.list.map((item, index) => {
                  if (item.ID == this.currentRow.ID) {
                    this.$refs.singleTable.setCurrentRow(
                      this.tableobj1.list[index]
                    );
                  }
                });
              } else {
                this.$refs.singleTable.setCurrentRow(this.tableobj1.list[0]);
              }
            }
          }
        });
    },
    // 04-获取套餐明细详情
    GetDetail() {
      this.tableobj2.loading = true;
      this.$network3
        .get("/mnoracle/msj/GetDetail", {
          MsjBILLCODE: this.currentRow.MsjBILLCODE,
          ID: this.currentRow.ID
        })
        .then(res => {
          console.log(res);
          this.tableobj2.loading = false;
          if (res.code == 200) {
            res.data.map(item => {
              item.lpsign = true;
              return item;
            });
            this.tableobj2.list = res.data;
            this.GetGuestDetail();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //20-获取人员信息详情
    GetGuestDetail() {
      this.tableobj3.loading = true;
      this.$network3
        .get("/mnoracle/msj/GetGuestDetail", {
          DWDM: this.$route.query.DWDM,
          CW: this.currentRow.ID,
          MsjBILLCODE: this.$route.query.MsjBILLCODE
        })
        .then(res => {
          console.log(res);
          this.tableobj3.loading = false;
          if (res.code == 200) {
            this.tableobj3.list = res.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    exportpdf() {
      this.isshowpdf = true;
      this.$network3
        .get("/mnoracle/msj/GetDetail", {
          MsjBILLCODE: this.$route.query.MsjBILLCODE
        })
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.tableobj4.list = res.data;
            this.tableobj4.list.map(item => {
              if (this.tableobj6.list.indexOf(item.ID) == -1) {
                this.tableobj6.list.push(item.ID);
              }
            });
            console.log(this.tableobj6.list);

            this.$network3
              .get("/mnoracle/msj/GetGuestDetail", {
                DWDM: this.$route.query.DWDM
              })
              .then(res => {
                console.log(res);
                if (res.code == 200) {
                  this.tableobj5.list = res.data;

                  var than = this;
                  setTimeout(() => {
                    html2Canvas(document.querySelector("#approvaContent_pdf"), {
                      allowTaint: true,
                      dpi: 400
                    }).then(function(canvas) {
                      let contentWidth = canvas.width;
                      let contentHeight = canvas.height;
                      console.log(contentWidth);
                      console.log(contentHeight);
                      // 592.28  841.89
                      //一页pdf显示html页面生成的canvas高度;
                      var pageHeight = (contentWidth / 592.28) * 841.89;
                      //未生成pdf的html页面高度
                      var leftHeight = contentHeight;
                      //页面偏移
                      var position = 20;
                      //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
                      var imgWidth = 595.28;
                      var imgHeight = (592.28 / contentWidth) * contentHeight;
                      var pageData = canvas.toDataURL("image/jpeg", 1.0);
                      var pdf = new JsPDF("", "pt", "a4");
                      //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
                      //当内容未超过pdf一页显示的范围，无需分页
                      if (leftHeight < pageHeight) {
                        pdf.addImage(
                          pageData,
                          "JPEG",
                          0,
                          0,
                          imgWidth,
                          imgHeight
                        );
                      } else {
                        while (leftHeight > 0) {
                          pdf.addImage(
                            pageData,
                            "JPEG",
                            0,
                            position,
                            imgWidth,
                            imgHeight
                          );
                          leftHeight -= pageHeight;
                          position -= 841.89;
                          //避免添加空白页
                          if (leftHeight > 0) {
                            pdf.addPage();
                          }
                        }
                      }
                      than.isshowpdf = false;
                      pdf.save(title + ".pdf");
                    });
                  }, 100);
                }
              });
            var title = "套餐明细清单";
          }
        })
        .catch(err => {
          console.log(err);
        });

      // return;
    }
  },
  watch: {},
  computed: {}
};
</script>
<style lang="scss">
.login-form-input .el-input__inner {
  border: 0 none;
}
.pdfhead {
  text-align: center;
  font-size: 30px;
}
.pdfbody {
  text-align: center;
  font-size: 30px;
}
.pdffoot {
  text-align: center;
  font-size: 30px;
}
.pdfclass {
  position: absolute;
  width: 100%;
  top: -10000px;
}
</style>