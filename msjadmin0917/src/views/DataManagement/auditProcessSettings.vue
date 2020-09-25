<template>
  <!-- 审核流程设置 -->
  <div style="margin:20px">
    <div style="margin-bottom:20px;text-align:center">
      <el-radio-group v-model="radio1">
        <el-radio-button label="1">折扣审批</el-radio-button>
        <el-radio-button label="2">制单审核</el-radio-button>
      </el-radio-group>
    </div>
    <div v-if="radio1==1">
      <el-button type="primary">新增审批规则</el-button>
      <!-- 数据表格 -->
      <div>
        <el-table :data="tableobj.list" style="width: 100%" v-loading="tableobj.loading" border>
          <el-table-column prop="date" label="名称"></el-table-column>
          <el-table-column prop="date" label="折扣"></el-table-column>
          <el-table-column prop="date" label="创建时间"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text">编辑</el-button>
              <el-button type="text">删除</el-button>
              <el-button type="text">配置审批流程</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="height:30px;margin-top:20px;">
          <el-pagination style="float:right" @size-change="" @current-change="" :current-page="tableobj.pageindex" :page-sizes="[10, 20, 30, 40]" :page-size="tableobj.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableobj.total">
          </el-pagination>
        </div>
      </div>
    </div>
    <div v-if="radio1==2">
      <el-button type="primary" @click="addaAuditFlowCreateBtn">新增制单流程</el-button>
      <!-- 数据表格 -->
      <div>
        <el-table :data="tableobj1.list" style="width: 100%" v-loading="tableobj1.loading" border>
          <el-table-column prop="name" label="名称"></el-table-column>
          <el-table-column prop="id" label="流程ID"></el-table-column>
          <el-table-column label="创建时间">
            <template slot-scope="scope">
              {{getFormatDate(scope.row.createdAt)}}
            </template>
          </el-table-column>
          <el-table-column label="是否启用">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.enable" @change="changeEnable(scope.row)"></el-switch>
            </template>
          </el-table-column>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <!-- <el-button type="text" size="mini">编辑</el-button> -->
              <el-button type="text" size="mini" @click="deleteAuditFlow(scope.row)">删除</el-button>
              <el-button type="text" size="mini" @click="editAuditFlow(scope.row)">配置审批流程</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="height:30px;margin-top:20px;">
          <el-pagination style="float:right" @size-change="t1pagesizeChange" @current-change="t1pageindexChange" :current-page="tableobj1.pageindex" :page-sizes="[10, 20, 30, 40]" :page-size="tableobj1.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableobj1.total">
          </el-pagination>
        </div>
      </div>

    </div>

    <!-- 弹窗 -->
    <div>
      <!-- 新增制单流程弹窗 -->
      <div>
        <el-dialog title="新增制单流程" :visible.sync="addaAuditFlowCreate.isshow" width="500px">
          <span>流程名称：</span>
          <el-input style="width:250px" v-model.trim="addaAuditFlowCreate.name" size="small"></el-input>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addaAuditFlowCreate.isshow = false">取 消</el-button>
            <el-button type="primary" @click="confirmAddAuditFlowCreate">确 定</el-button>
          </div>
        </el-dialog>
      </div>

      <!-- 流程详情弹窗 -->
      <el-dialog title="流程详情" :visible.sync="AuditFlowMsg.isshow" width="500px">
        <el-timeline style="margin-right:20px" v-loading="AuditFlowMsg.loading">
          <el-timeline-item placement="top">
            <el-card>
              <div>发起人</div>
              <div v-if="AuditFlowMsg.AuditFlowobj.nodes&&AuditFlowMsg.AuditFlowobj.nodes[0].members.length>0">
                <!-- AuditFlowMsg.AuditFlowobj.nodes[0] -->
              </div>
              <el-button v-else type="text" size="mini">所有人</el-button>
            </el-card>
            <div style="text-align:center;margin-top:10px">
              <el-button type="primary" circle icon="el-icon-plus" @click="addNode(AuditFlowMsg.AuditFlowobj.nodes[0].id)"></el-button>
            </div>
          </el-timeline-item>
          <el-timeline-item placement="top" v-for="(item,index) in AuditFlowMsg.AuditFlowobj.nodes" :key="item.id" v-if="index!=0">
            <el-card style="position: relative;">
              <el-button style="position: absolute;top:10px;right:10px" type="danger" circle icon="el-icon-delete" @click="delNode(item.id)"></el-button>
              <div>审批人</div>
              <!-- <div v-for="item in item.members"></div> -->
              <div>{{`${item.members.length}人会签`}}</div>
              <el-button type="text" size="mini" @click="setOperatorBtn(item)">选择审批人</el-button>
            </el-card>
            <div style="text-align:center;margin-top:10px">
              <el-button type="primary" circle icon="el-icon-plus" @click="addNode(item.id)"></el-button>
            </div>
          </el-timeline-item>
          <el-timeline-item placement=" top">
            <el-card>
              <div>流程结束</div>
            </el-card>
          </el-timeline-item>
        </el-timeline>
        <div slot="footer" class="dialog-footer">
          <el-button @click="AuditFlowMsg.isshow = false">取 消</el-button>
          <el-button type="primary" @click="AuditFlowMsg.isshow = false">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 选择审批人 -->
      <el-drawer title="审批人" :visible.sync="setOperatorobj.drawer" size="40%" :with-header="false">
        <div class="drawer_box">
          <div style="flex:1">
            <h2>审批人</h2>
            <h3>设置审批人</h3>
            <el-button type="primary" @click="setStaffBtn()" size="small">添加指定成员</el-button>
            <div style="height:20px"></div>
            <el-tag style="margin-left:10px" @close="setOperatorobj.selectList.splice(index,1)" v-for="(tag,index) in setOperatorobj.selectList" :key="tag.ID" closable>
              {{tag.Name}}
            </el-tag>
            <div>
              <h3>多人审批时采用的审批方式</h3>
              <el-radio v-model="setOperatorobj.radio" label="1">会签（须所有审批人同意）</el-radio>
              <div style="height:10px"></div>
              <!-- <el-radio v-model="setOperatorobj.radio" label="2">或签（一名审批人同意或拒绝即可）</el-radio> -->
            </div>
          </div>
          <div>
            <el-button @click="">取 消</el-button>
            <el-button type="primary" @click="auditFlowsetOperator()">确 定</el-button>
          </div>
        </div>
        <el-drawer :with-header="false" title="选择审批人员" size="50%" :append-to-body="true" :visible.sync="setOperatorobj.innerDrawer">
          <div class="drawer_box">
            <div style="flex:1">
              <h3>选择审批人</h3>
              <div class="roleempclass">
                <div style="width:49%">
                  <div>选择：</div>
                  <div class="roleempclass_border">
                    <div style="padding:15px">
                      <el-input prefix-icon="el-icon-search" placeholder="搜索" size="small"></el-input>
                      <div style="margin-top:10px">
                        <span v-for="(item,index) in  addroleEmployobj.titlelist" :key="index">
                          <span class="ESBreadcrumbitem" @click="clickEmpbtn(item,index)">{{item.Name}}</span>
                          <span v-if="index!=addroleEmployobj.titlelist.length-1"> > </span>
                        </span>
                      </div>
                    </div>
                    <div class="roleempclass_itembox" style="padding:0 15px;">
                      <div v-for="(item,index) in addroleEmployobj.Dlist" :key="item.ID">
                        <div class="roleempclass_item" @click="rolelookEmployee(item,index)">
                          <div style="width:100%; white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"> {{item.Name}}</div>
                          <div style="color:#409EFF;width:100px" @click.stop="nextdempbtn(item)">下级部门</div>
                          <i v-if="!item.isshow" class="el-icon-arrow-right"></i>
                          <i v-else class="el-icon-arrow-down"></i>
                        </div>
                        <div v-if="item.isshow&&item.Staff1&&item.Staff1.length>0" style="margin:0 20px">
                          <div v-for="temp in item.Staff1">
                            <el-checkbox v-model="temp.checked" @change="changeselectList(temp)">{{temp.Name}}</el-checkbox>
                          </div>
                        </div>
                        <div v-if="item.isshow&&item.Staff1&&item.Staff1.length==0" style="margin:0 20px">
                          该部门暂无员工
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div style="width:49%">
                  <div>已选：</div>
                  <div class="roleempclass_border">
                    <div style="padding:20px">
                      <div v-for="(item,index) in addroleEmployobj.selectList" :key="item.ID">
                        <div class="roleempclass_item1">
                          {{item.Name}}
                          <i @click="roleEmployobjdelbtn(item,index)" class="delbtn el-icon-circle-close"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <el-button @click="setOperatorobj.innerDrawer=false">取 消</el-button>
              <el-button type="primary" @click="confrimSelectEmploy()">确 定</el-button>
            </div>
          </div>
        </el-drawer>

      </el-drawer>
    </div>

  </div>
</template>
<script>
import { dateFormat } from "@/utils/util.js";
export default {
  data() {
    return {
      addroleEmployobj: {
        isshow: false,
        Did: "0",
        Dlist: [],
        titlelist: ["湖北美年大健康管理有限公司"],
        selectList: []
      },
      setOperatorobj: {
        selectobj: "",
        drawer: false,
        innerDrawer: false,
        radio: "1",
        selectList: []
      },

      radio1: "2",
      //新增制单流程obj
      addaAuditFlowCreate: {
        isshow: false,
        name: ""
      },
      //流程详情obj
      AuditFlowMsg: {
        isshow: false,
        loading: false,
        AuditFlowobj: {}
        // auditFlowNodeList: [""]
      },
      tableobj: {
        list: [],
        loading: false,
        pageindex: 1,
        pagesize: 10,
        total: 0
      },
      tableobj1: {
        list: [],
        loading: false,
        pageindex: 1,
        pagesize: 10,
        total: 0
      }
    };
  },
  watch: {
    radio1(nvl) {
      if (nvl == "2") {
        this.auditFlowlist();
      }
    }
  },
  mounted() {
    if (this.radio1 == "2") {
      this.auditFlowlist();
    }
  },
  methods: {
    //06-制单审核-在审批流程节点中设置审批操作人列表
    auditFlowsetOperator() {
      var body = {
        fid: this.AuditFlowMsg.AuditFlowobj.id,
        nid: this.setOperatorobj.selectobj.id,
        members: []
      };
      this.setOperatorobj.selectList.forEach(item => {
        body.members.push({
          userID: item.ID,
          userName: item.Name
        });
      });
      this.$network3
        .post("/mnoracle/auditFlow/setOperator", body)
        .then(res => {
          this.AuditFlowMsg.loading = false;
          console.log(res);
          if (res.code == 200) {
            this.setOperatorobj.drawer=false;
            this.auditFlowdetail(this.AuditFlowMsg.AuditFlowobj.id);
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error(err.msg);
        });
    },
    //确认选择审核员Btn
    confrimSelectEmploy() {
      console.log(this.addroleEmployobj.selectList);
      this.setOperatorobj.innerDrawer = false;
      this.setOperatorobj.selectList = this.addroleEmployobj.selectList;
    },
    changeselectList(item) {
      console.log(item);
      if (item.checked) {
        this.addroleEmployobj.selectList.push(item);
      } else {
        this.addroleEmployobj.selectList.forEach((element, index) => {
          if (element.ID == item.ID) {
            this.addroleEmployobj.selectList.splice(index, 1);
          }
        });
      }
    },
    roleEmployobjdelbtn(item, index) {
      this.addroleEmployobj.Dlist.forEach(element => {
        if (element.Staff1 && Array.isArray(element.Staff1)) {
          element.Staff1.forEach(temp => {
            if (temp.ID == item.ID) {
              temp.checked = false;
            }
          });
        }
      });
      this.addroleEmployobj.selectList.splice(index, 1);
    },
    rolelookEmployee(item, index) {
      if (item.isshow) {
        this.addroleEmployobj.Dlist[index].isshow = !this.addroleEmployobj
          .Dlist[index].isshow;
        return;
      }
      console.log(item);
      // this.roleGetAllByDID(item.ID)
      this.$network3
        .get("/mnoracle/Staff/GetAllByDID", {
          DID: item.ID
        })
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            res.data.forEach((element, index) => {
              this.$set(res.data[index], "checked", false);
            });
            this.$set(this.addroleEmployobj.Dlist[index], "Staff1", res.data);
            this.addroleEmployobj.Dlist[index].isshow = !this.addroleEmployobj
              .Dlist[index].isshow;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    clickEmpbtn(item, index) {
      console.log(item, index);
      this.$network3
        .get("/mnoracle/Department/GetSon", {
          id: item.Did
        })
        .then(res => {
          console.log(res);
          if (res.data.length > 0) {
            res.data.forEach((element, index) => {
              this.$set(res.data[index], "isshow", false);
            });
            this.addroleEmployobj.Dlist = res.data;
            this.addroleEmployobj.titlelist.splice(index + 1);
          } else {
            this.$message.error("该部门暂无下级部门");
            // this.addroleEmployobj.titlelist.pop();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 07-根据id获取下级部门
    GetSonDepartment(Did, Dobj) {
      this.$network3
        .get("/mnoracle/Department/GetSon", {
          id: Did
        })
        .then(res => {
          console.log(res);
          if (res.data.length > 0) {
            res.data.forEach((element, index) => {
              this.$set(res.data[index], "isshow", false);
            });
            this.addroleEmployobj.Dlist = res.data;
            if (Dobj) {
              this.addroleEmployobj.titlelist.push(Dobj);
            }
          } else {
            this.$message.error("该部门暂无下级部门");
            // this.addroleEmployobj.titlelist.pop();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    nextdempbtn(item) {
      console.log(item);
      var Dobj = {
        Did: item.ID,
        Name: item.Name
      };
      this.GetSonDepartment(item.ID, Dobj);
    },
    //设置审批人Btn
    setStaffBtn() {
      this.setOperatorobj.innerDrawer = true;

      this.addroleEmployobj.Did = "0";
      this.addroleEmployobj.Dlist = [];
      this.addroleEmployobj.titlelist = [
        { Name: "湖北美年大健康管理有限公司", Did: "0" }
      ];
      this.addroleEmployobj.selectList = [];
      this.GetSonDepartment(this.addroleEmployobj.Did);
    },
    //操作审核人员Btn
    setOperatorBtn(item) {
      console.log(item);
      this.setOperatorobj.selectobj = item;
      item.members = item.members.map(temp => {
        temp.ID = temp.userID;
        temp.Name = temp.UserName;
        return temp;
      });
      this.setOperatorobj.selectList = item.members;
      this.setOperatorobj.drawer = true;
    },
    //05-制单审核-切换流程禁用/启用
    changeEnable(e) {
      console.log(e);
      this.$network3
        .post("/mnoracle/auditFlow/switch", {
          id: e.id,
          on: e.enable
        })
        .then(res => {
          console.log(res);
          if ((res.code = 200)) {
            this.auditFlowlist();
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error(err.msg);
        });
    },
    //删除审批流程
    deleteAuditFlow(row) {
      this.$confirm("确认删除该审核流程?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.auditFlowremove(row.id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //04-制单审核-删除流程
    auditFlowremove(id) {
      this.$network3
        .post("/mnoracle/auditFlow/remove", {
          id: id
        })
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.auditFlowlist();
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error(err.msg);
        });
    },
    //配置审批流程
    editAuditFlow(row) {
      console.log(row);
      this.AuditFlowMsg.isshow = true;
      this.auditFlowdetail(row.id);
    },
    //03-制单审核-获取单个审批流程详情
    auditFlowdetail(id) {
      this.AuditFlowMsg.loading = true;
      this.$network3
        .get("/mnoracle/auditFlow/detail", {
          id: id
        })
        .then(res => {
          this.AuditFlowMsg.loading = false;
          console.log(res);
          if (res.code == 200) {
            this.AuditFlowMsg.AuditFlowobj = res.data;
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error(err.msg);
        });
    },
    //时间转换
    getFormatDate(data) {
      return dateFormat(data * 1000, false);
    },
    //添加节点
    addNode(id) {
      //审批流程添加流程节点
      this.$network3
        .post("/mnoracle/auditFlow/addNode", {
          fid: this.AuditFlowMsg.AuditFlowobj.id,
          nid: id
        })
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.auditFlowdetail(this.AuditFlowMsg.AuditFlowobj.id);
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error(err.msg);
        });
    },
    //删除节点
    delNode(id) {
      //审批流程删除流程节点
      this.$network3
        .post("/mnoracle/auditFlow/delNode", {
          fid: this.AuditFlowMsg.AuditFlowobj.id,
          nid: id
        })
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.auditFlowdetail(this.AuditFlowMsg.AuditFlowobj.id);
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error(err.msg);
        });
    },
    //确认创建审核流程
    confirmAddAuditFlowCreate() {
      if (!this.addaAuditFlowCreate.name) {
        this.$message.error("请填写流程名称！");
        return;
      }
      this.auditFlowcreate();
    },
    //新增审核流程按钮
    addaAuditFlowCreateBtn() {
      this.addaAuditFlowCreate.isshow = true;
      this.addaAuditFlowCreate.name = "";
    },
    t1pagesizeChange(val) {
      this.tableobj1.pagesize = val;
      this.tableobj1.pageindex = 1;
      this.auditFlowlist();
    },
    t1pageindexChange(val) {
      this.tableobj1.pageindex = val;
      this.auditFlowlist();
    },
    //01-制单审核-查询流程列表
    auditFlowlist() {
      this.tableobj1.loading = true;
      this.$network3
        .post("/mnoracle/auditFlow/list", {
          page: this.tableobj1.pageindex,
          size: this.tableobj1.pagesize
        })
        .then(res => {
          this.tableobj1.loading = false;
          console.log(res);
          if (res.code == 200) {
            this.tableobj1.list = res.data.data;
            this.tableobj1.total = res.data.count;
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error(err.msg);
        });
    },
    //02-制单审核-创建审批流程
    auditFlowcreate() {
      this.$network3
        .post("/mnoracle/auditFlow/create", {
          name: this.addaAuditFlowCreate.name
        })
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.auditFlowlist();
            this.addaAuditFlowCreate.isshow = false;
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error(err.msg);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.roleempclass {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .roleempclass_border {
    border: 1px solid #cccccc;
    height: 400px;
    position: relative;
    overflow: auto;
  }
  // .roleempclass_itembox {
  // position: absolute;
  // left: 0;
  // right: 0;
  // top: 93px;
  // bottom: 0%;
  // overflow: auto;
  // }
  .roleempclass_item1 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 3px;
    .delbtn {
      cursor: pointer;
    }
  }
  .roleempclass_item {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 30px;
    &:hover {
      background-color: #f0f2f5;
    }
    .el-icon-arrow-down:before {
      color: rgb(96, 98, 102);
    }
  }
}
.drawer_box {
  padding: 20px;
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>