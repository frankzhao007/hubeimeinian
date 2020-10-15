<template>
  <div>
    <div class="ESboxleft">
      <div style="width:100% ; display: flex;align-items: center;justify-content:center;">
        <el-input
          v-model="dimtext"
          prefix-icon="el-icon-search"
          placeholder="搜索"
          style="width:80%;margin:10px"
        ></el-input>
      </div>
      <div style="width:100% ; display: flex;align-items: center;justify-content:center;">
        <el-radio-group v-model="radio1">
          <el-radio-button label="部门框架"></el-radio-button>
          <el-radio-button label="角色权限"></el-radio-button>
        </el-radio-group>
      </div>
      <div v-if="radio1=='部门框架'" style="margin:20px 10px">
        <!-- <el-tree :data="DepartmentTreelist" :props="{children: 'Son',label: 'Name'}" accordion @node-click="handleNodeClick">
        </el-tree>-->
        <DepartmentTree
          v-if="DepartmentTreelist.length>0"
          :GetDepartmentTreeList="DepartmentTreelist"
          @selectdepartment="selectdepartment"
        ></DepartmentTree>
      </div>

      <div v-if="radio1=='角色权限'">
        <div style="margin-top:20px;text-align:center">
          <el-button
            type="primary"
            size="mini"
            @click="ADDRGroupobj.isshow=true;ADDRGroupobj.Name=''"
          >新增角色组</el-button>
          <el-button type="primary" size="mini" @click="ADDRoleobjbtn">新增角色</el-button>
        </div>
        <div style="margin:20px; font-size: 18px;  line-height: 40px;">
          <div v-for="item in RoleTree">
            <div>
              <i class="el-icon-s-home"></i>
              <span>{{item.RGroup}}</span>
            </div>
            <div style="margin-left:20px" v-if="item.Name">
              <div
                class="bumenclass"
                v-for="(temp,index) in item.Name"
                @click="selectRoleobjbtn(item,index)"
              >{{temp}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ESboxright">
      <div v-if="radio1=='部门框架'">
        <div class="EStitle">湖北美年大健康管理有限公司</div>
        <div class="ESBreadcrumb">
          <span v-for="(item,index) in Breadcrumblist" :key="item">
            <span class="ESBreadcrumbitem">{{item}}</span>
            <span v-if="index!=Breadcrumblist.length-1">></span>
          </span>
        </div>
        <div>
          <div class="nextSector">
            <i style="font-size: 28px;" class="el-icon-my-connections"></i> 下级部门
          </div>
          <el-button size="small" type="primary" @click="Addsubdepartmentbtn">添加子部门</el-button>
          <div class="nextSectorbox">
            <div
              v-if="selectDepartmentobj!=''&&selectDepartmentobj.Son!=null&& selectDepartmentobj.Son.length>0"
            >
              <div class="nextSectorboxitem" v-for="(item,index) in selectDepartmentobj.Son">
                <div style="width:90%">{{item.Name}}</div>
                <el-button type="text" style="float:right" @click="delDepartmentbtn(item,index)">删除</el-button>
                <i class="el-icon-arrow-right"></i>
              </div>
            </div>
            <div v-else>暂无数据</div>
          </div>
        </div>
        <div>
          <div class="nextSector">
            <i style="font-size: 28px;" class="el-icon-s-custom"></i> 部门人员
          </div>
          <el-button size="small" type="primary" @click="addEmployeebtn">添加人员</el-button>
          <el-button size="small" type="primary">批量导入/修改</el-button>
          <el-button size="small" type="primary" @click="changeSectorobjbtn">调整部门</el-button>
          <el-button size="small" type="primary" @click="DelArrStaff">批量删除</el-button>
          <el-table
            :row-key="getRowKeys"
            ref="Employeetable"
            :data="Employeetableobj.list"
            style="width: 100%"
            @selection-change="handleSelectionChange"
            v-loading="Employeetableobj.loading"
            @row-click="lookEmployee"
          >
            <el-table-column type="selection" width="50" :reserve-selection="true"></el-table-column>
            <el-table-column prop="ID" label="ID"></el-table-column>
            <el-table-column prop="Name" label="姓名"></el-table-column>
            <el-table-column prop="Phone" label="手机号码"></el-table-column>
            <el-table-column prop="Position" label="职位"></el-table-column>
          </el-table>
        </div>
      </div>
      <div v-if="radio1=='角色权限'">
        <div style="margin:20px" v-if="selectRoleobj.RGroup&&selectRoleobj.Name">
          <i style="font-size: 28px;" class="el-icon-s-custom"></i>
          <span style="font-size:20px">{{selectRoleobj.RGroup}}</span>
          <span style="font-size: 18px;">— {{selectRoleobj.Name}}</span>
        </div>
        <div style="margin:20px 0px" v-else>
          <i style="font-size: 28px;" class="el-icon-s-custom"></i>
          <span style="font-size:20px">请选择查询的角色</span>
        </div>
        <div>
          <el-button type="primary" size="small" @click="addroleEmploybtn">添加成员</el-button>
          <el-button type="primary" size="small" @click="DelStaffsrole">批量移除</el-button>
        </div>
        <div>
          <el-table
            :row-key="getRowKeys1"
            ref="roleEmployeetable"
            :data="roleEmploylist"
            style="width: 100%"
            @selection-change="handleSelectionChange1"
          >
            <el-table-column type="selection" width="50" :reserve-selection="true"></el-table-column>
            <el-table-column prop="ID" label="ID"></el-table-column>
            <el-table-column prop="Name" label="姓名"></el-table-column>
            <el-table-column prop="Phone" label="手机号"></el-table-column>
            <el-table-column label="权限范围">
              <template slot-scope="scope">
              	<div v-if="scope.row.Position">{{scope.row.Position}}</div>
                <el-button v-else type="text" size="mini" @click="setqxfwbtn(scope.row)">设置</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>

    <!-- 添加子部门 -->
    <div>
      <el-dialog title="添加子部门" :visible.sync="Addsubdepartment.isshow" width="600px">
        <div>
          <el-form
            :model="Addsubdepartment"
            label-position="right"
            label-width="120px"
            size="medium"
          >
            <el-form-item label="部门名称：">
              <el-input v-model="Addsubdepartment.name" placeholder="请填写" style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="上级部门：">
              <el-input
                disabled
                v-model="Addsubdepartment.Superiorobj.Name"
                placeholder="请填写"
                style="width:300px"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="Addsubdepartment.isshow = false">取 消</el-button>
          <el-button
            type="primary"
            @click="AddOneDepartment(Addsubdepartment.Superiorobj.ID,Addsubdepartment.name)"
          >确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 添加员工 -->
    <div v-if="addEmployee.isshow">
      <el-dialog
        title="添加员工"
        :visible.sync="addEmployee.isshow"
        width="500px"
        :before-close="handleClose"
      >
        <div>
          <el-form
            :model="addEmployee"
            ref="myaddEmployee"
            :rules="addEmployeerules"
            label-position="right"
            label-width="120px"
            size="medium"
          >
            <el-form-item label="ID：" prop="ID">
              <el-input v-model="addEmployee.ID" placeholder="请填写" style="width:280px"></el-input>
            </el-form-item>
            <el-form-item label="姓名：" prop="Name">
              <el-input v-model="addEmployee.Name" placeholder="请填写" style="width:280px"></el-input>
            </el-form-item>
            <el-form-item label="手机号码：" prop="Phone">
              <el-input
                v-model="addEmployee.Phone"
                maxlength="11"
                placeholder="请填写"
                style="width:280px"
              ></el-input>
            </el-form-item>
            <el-form-item label="职位：" prop="Position">
              <el-input v-model="addEmployee.Position" placeholder="请填写" style="width:280px"></el-input>
            </el-form-item>
            <el-form-item label="上级部门：">
              <el-input
                disabled
                v-model="addEmployee.Superiorobj.Name"
                placeholder="请填写"
                style="width:280px"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addEmployee.isshow = false">取 消</el-button>
          <el-button type="primary" @click="addEmployeeconfirmbtn">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <!-- 查看员工信息 -->
    <div v-if="Employeemsgobj.isshow">
      <el-dialog title="员工基础信息" :visible.sync="Employeemsgobj.isshow" width="500px">
        <el-form
          ref="myupdataEmployee"
          :model="Employeemsgobj"
          :rules="Employeemsgobjrules"
          label-position="right"
          label-width="120px"
          size="medium"
        >
          <el-form-item label="ID:" prop="ID">
            <el-input disabled v-model="Employeemsgobj.ID" placeholder="请填写" style="width:200px"></el-input>
          </el-form-item>
          <el-form-item label="姓名:" prop="Name">
            <el-input v-model="Employeemsgobj.Name" placeholder="请填写" style="width:200px"></el-input>
          </el-form-item>
          <el-form-item label="手机号:" prop="Phone">
            <el-input
              v-model="Employeemsgobj.Phone"
              maxlength="11"
              placeholder="请填写"
              style="width:200px"
            ></el-input>
          </el-form-item>
          <el-form-item label="职位:" prop="Position">
            <el-input v-model="Employeemsgobj.Position" placeholder="请填写" style="width:200px"></el-input>
          </el-form-item>
          <el-form-item label="角色:">
            <el-input disabled v-model="Employeemsgobj.RName" placeholder="请填写" style="width:200px"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="Employeemsgobj.isshow = false">取 消</el-button>
          <el-button type="primary" @click="uploademploybtn">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 新增角色组 -->
    <div>
      <el-dialog title="新增角色组" :visible.sync="ADDRGroupobj.isshow" width="500px">
        <div>
          <span>角色组名称：</span>
          <el-input v-model="ADDRGroupobj.Name" style="width:250px"></el-input>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="ADDRGroupobj.isshow = false">取 消</el-button>
          <el-button type="primary" @click="ADDRGroup">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 新增角色 -->
    <div>
      <el-dialog title="新增角色" :visible.sync="ADDRoleobj.isshow" width="500px">
        <el-form :model="ADDRoleobj" label-position="right" label-width="120px" size="medium">
          <el-form-item label="所属角色组：">
            <!-- <el-input v-model="ADDRoleobj.RGroup" placeholder="请填写" style="width:200px"></el-input> -->
            <el-select v-model="ADDRoleobj.RGroup" style="width:250px">
              <el-option
                v-for="item in  RGrouplist"
                :key="item.ID"
                :label="item.Name"
                :value="item.ID"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="角色名称：">
            <el-input v-model="ADDRoleobj.Name" placeholder="请填写" style="width:250px"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="ADDRoleobj.isshow = false">取 消</el-button>
          <el-button type="primary" @click="confirmaddrolebtn">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <!-- 批量调整部门 -->
    <div>
      <el-dialog title="调整部门" :visible.sync="changeSectorobj.isshow" width="800px">
        <div slot="footer" class="dialog-footer">
          <el-button @click="changeSectorobj.isshow = false">取 消</el-button>
          <el-button type="primary" @click="changeSectorobj.isshow = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <!-- 角色添加成员 -->
    <div>
      <el-dialog title="添加成员" :visible.sync="addroleEmployobj.isshow" width="800px">
        <div class="roleempclass">
          <div style="width:49%">
            <div>选择：</div>
            <div class="roleempclass_border">
              <div style="padding:15px">
                <el-input prefix-icon="el-icon-search" placeholder="搜索" size="small"></el-input>
                <div style="margin-top:10px">
                  <span v-for="(item,index) in  addroleEmployobj.titlelist" :key="index">
                    <span class="ESBreadcrumbitem" @click="clickEmpbtn(item,index)">{{item.Name}}</span>
                    <span v-if="index!=addroleEmployobj.titlelist.length-1">></span>
                  </span>
                </div>
              </div>
              <div class="roleempclass_itembox" style="padding:0 15px;">
                <div v-for="(item,index) in addroleEmployobj.Dlist" :key="item.ID">
                  <div class="roleempclass_item" @click="rolelookEmployee(item,index)">
                    <div
                      style="width:100%; white-space: nowrap;overflow: hidden;text-overflow: ellipsis;"
                    >{{item.Name}}</div>
                    <div style="color:#409EFF;width:100px" @click.stop="nextdempbtn(item)">下级部门</div>
                    <i v-if="!item.isshow" class="el-icon-arrow-right"></i>
                    <i v-else class="el-icon-arrow-down"></i>
                  </div>
                  <div v-if="item.isshow&&item.Staff1&&item.Staff1.length>0" style="margin:0 20px">
                    <div v-for="temp in item.Staff1">
                      <el-checkbox
                        v-model="temp.checked"
                        @change="changeselectList(temp)"
                      >{{temp.Name}}</el-checkbox>
                    </div>
                  </div>
                  <div
                    v-if="item.isshow&&item.Staff1&&item.Staff1.length==0"
                    style="margin:0 20px"
                  >该部门暂无员工</div>
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
                    <i
                      @click="roleEmployobjdelbtn(item,index)"
                      class="delbtn el-icon-circle-close"
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addroleEmployobj.isshow = false">取 消</el-button>
          <el-button type="primary" @click="AddStaffsbtn">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 权限范围 -->
    <div>
      <el-dialog title="权限范围" :visible.sync="qxfwobj.isshow" width="800px">
        <div class="roleempclass">
          <div style="width:49%">
            <div>选择：</div>
            <div class="roleempclass_border">
              <div style="padding:15px">
                <el-input
                  prefix-icon="el-icon-search"
                  v-model="qxfwobj.querytext"
                  placeholder="搜索"
                  size="small"
                ></el-input>
              </div>
              <div>
                <el-tree
                  ref="myqxfwtree"
                  check-on-click-node
                  default-expand-all
                  :props="{label:'Name',children:'Son'}"
                  node-key="ID"
                  :data="qxfwobj.DepartmentList"
                  show-checkbox
                  @check="handleNodeClick"
                ></el-tree>
              </div>
            </div>
          </div>
          <div style="width:49%">
            <div>已选：</div>
            <div class="roleempclass_border">
              <div style="padding:15px">
                <div v-for="(item,index) in qxfwobj.selectList" :key="item.ID">
                  <div class="roleempclass_item1">
                    {{item.Name}}
                    <i @click="delqxfwbtn(item)" class="delbtn el-icon-circle-close"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="qxfwobj.isshow = false">取 消</el-button>
          <el-button type="primary" @click="UpdateAuth">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import DepartmentTree from "./component/DepartmentTree";
export default {
  components: {
    DepartmentTree
  },
  data() {
    var phonecheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else {
        var myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
        if (!myreg.test(value)) {
          callback(new Error("请输入正确的手机号"));
        } else {
          callback();
        }
      }
    };
    return {
      getRowKeys(row) {
        return row.ID;
      },
      getRowKeys1(row) {
        return row.ID;
      },
      qxfwobj: {
        isshow: false,
        querytext: "",
        DepartmentList: [],
        selectList: [],
        ygobj: ""
      },
      addroleEmployobj: {
        isshow: false,
        Did: "0",
        Dlist: [],
        titlelist: ["湖北美年大健康管理有限公司"],
        selectList: []
      },
      changeSectorobj: {
        isshow: false
      },
      //角色组
      RGrouplist: [],
      //角色下员工
      roleEmploylist: [],
      ADDRoleobj: {
        isshow: false,
        Name: "",
        RGroup: ""
      },
      ADDRGroupobj: {
        isshow: false,
        Name: ""
      },
      selectEmployList: [],
      Employeemsgobj: {
        isshow: false,
        ID: "",
        Name: "",
        Phone: "",
        Position: "",
        RName: "",
        RID: "",
        DID: "",
        OldDID: ""
      },
      Employeemsgobjrules: {
        ID: [{ required: true, message: "请输入员工ID", trigger: "blur" }],
        Name: [{ required: true, message: "请输入员工姓名", trigger: "blur" }],
        Phone: [
          { required: true, message: "请输入员工手机号码", trigger: "blur" },
          { validator: phonecheck, trigger: "blur" }
        ],
        Position: [
          { required: true, message: "请输入员工职位", trigger: "blur" }
        ]
      },
      addEmployee: {
        isshow: false,
        ID: "",
        Name: "",
        Phone: "",
        Position: "",
        Superiorobj: {}
      },
      addEmployeerules: {
        ID: [
          {
            required: true,
            message: "请填写员工ID",
            trigger: "blur"
          }
        ],
        Name: [{ required: true, message: "请填写姓名", trigger: "blur" }],
        Phone: [
          {
            required: true,
            message: "请填写手机号",
            trigger: "blur"
          },
          { validator: phonecheck, trigger: "blur" }
        ],
        Position: [{ required: true, message: "请填写职位", trigger: "blur" }]
      },
      Addsubdepartment: {
        isshow: false,
        name: "",
        Superiorobj: ""
      },
      Employeetableobj: {
        list: [],
        loading: false
      },
      dimtext: "",
      radio1: "部门框架",
      // radio1: "角色权限",
      Breadcrumblist: ["湖北美年大健康管理有限公司"],
      RoleTree: [],
      DepartmentTreelist: [],
      selectDepartmentobj: "", //当前选择的部门
      selectRoleobj: "", //当前选择的角色
      selectroleEmployList: "" //当前选择需要移除角色的员工
    };
  },
  watch: {
    radio1(val) {
      if (val == "部门框架") {
        this.GetDepartmentTree();
        this.GetAllByDID();
      } else if (val == "角色权限") {
        this.GetRoleTree();
      }
    }
  },
  mounted() {
    if (this.radio1 == "部门框架") {
      this.GetDepartmentTree();
      this.GetAllByDID(); //获取人员
    } else if (this.radio1 == "角色权限") {
      this.GetRoleTree();
    }
  },
  methods: {
    //04-更新权限
    UpdateAuth() {
      if (this.qxfwobj.selectList.length > 0) {
        var body = {
          ID: this.qxfwobj.ygobj.ID,
          SeeDID: []
        };
        this.qxfwobj.selectList.forEach(item => {
          body.SeeDID.push(item.ID);
        });
        this.$network3
          .post("/mnoracle/Role/UpdateAuth", body)
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.$message.error("请选择部门！");
      }
    },
    delqxfwbtn(item) {
      console.log(item);
      this.$refs.myqxfwtree.setChecked(item.ID, false, true);
      console.log(this.$refs.myqxfwtree);
      console.log(this.$refs.myqxfwtree.getCheckedNodes());
      this.qxfwobj.selectList = this.$refs.myqxfwtree.getCheckedNodes();
    },
    setqxfwbtn(item) {
      console.log(item);
      this.qxfwobj.ygobj = item;
      this.qxfwobj.isshow = true;
      this.qxfwobj.querytext = "";
      this.qxfwobj.DepartmentList = [];
      this.qxfwobj.selectList = [];
      this.qxfwDepartmentGetTree();
    },
    //权限范围部门查询
    qxfwDepartmentGetTree() {
      this.$network3
        .get("/mnoracle/Department/GetTree", {
          name: this.qxfwobj.querytext
        })
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.qxfwobj.DepartmentList = res.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //10-删除角色下的员工
    DelStaffsrole() {
      console.log(this.selectroleEmployList);
      console.log(this.selectRoleobj);

      if (
        Array.isArray(this.selectroleEmployList) &&
        this.selectroleEmployList.length > 0
      ) {
        this.$confirm("是否移除勾选的员工？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            var body = {
              RID: this.selectRoleobj.ID,
              StaffID: []
            };
            this.selectroleEmployList.forEach(element => {
              body.StaffID.push(element.ID);
            });
            this.$network3
              .post("/mnoracle/Role/DelStaffs", body)
              .then(res => {
                console.log(res);
                if (res.code == 200) {
                  this.GetAllByRID();
                  this.$refs.roleEmployeetable.clearSelection();
                } else {
                  this.$message.error(res.msg);
                }
              })
              .catch(err => {
                console.log(err);
                this.$message.error(err.msg);
              });
          })
          .catch(() => {});
      } else {
        this.$message.error("请选择需要移除的员工");
      }
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
    //分配员工
    AddStaffsbtn() {
      console.log(this.addroleEmployobj.selectList);
      console.log(this.selectRoleobj);
      if (!this.addroleEmployobj.selectList.length > 0) {
        this.$message.error("请选择需要添加的成员");
        return;
      }
      var body = {
        RID: this.selectRoleobj.ID,
        StaffID: []
      };
      this.addroleEmployobj.selectList.forEach(element => {
        body.StaffID.push(element.ID);
      });
      this.$network3
        .post("/mnoracle/Role/AddStaffs", body)
        .then(res => {
          if (res.code == 200) {
            this.$message.success("添加成功");
            this.addroleEmployobj.isshow = false;
            this.GetAllByRID();
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(err => {
          this.$message.error(err.msg);
        });
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
    nextdempbtn(item) {
      console.log(item);
      var Dobj = {
        Did: item.ID,
        Name: item.Name
      };
      this.GetSonDepartment(item.ID, Dobj);
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
    addroleEmploybtn() {
      if (this.selectRoleobj.ID) {
        this.addroleEmployobj.isshow = true;
        this.addroleEmployobj.Did = "0";
        this.addroleEmployobj.Dlist = [];
        this.addroleEmployobj.titlelist = [
          { Name: "湖北美年大健康管理有限公司", Did: "0" }
        ];
        this.addroleEmployobj.selectList = [];
        this.GetSonDepartment(this.addroleEmployobj.Did);
      } else {
        this.$message.error("请选择角色");
      }
    },
    //08-根据部门id查询员工
    roleGetAllByDID(Did) {
      this.$network3
        .get("/mnoracle/Staff/GetAllByDID", {
          DID: Did
        })
        .then(res => {
          console.log(res);
          // this.addroleEmployobj.Dlist = res.data;
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
    selectRoleobjbtn(item, index) {
      console.log(item, index);
      this.selectRoleobj = {
        RGroup: item.RGroup,
        Name: item.Name[index],
        ID: item.ID[index]
      };
      this.GetAllByRID();
    },
    changeSectorobjbtn() {
    	
//    this.changeSectorobj.isshow = true;
    },
    //09-根据角色查询员工
    GetAllByRID() {
      this.$network3
        .get("/mnoracle/Staff/GetAllByRID", {
          RID: this.selectRoleobj.ID
        })
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.roleEmploylist = res.data;
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error(err.msg);
        });
    },
    //确认新增角色按钮
    confirmaddrolebtn() {
      if (!this.ADDRoleobj.Name) {
        this.$message.error("请填写角色名称！");
        return;
      }
      if (!this.ADDRoleobj.RGroup) {
        this.$message.error("请选择所属角色组！");
        return;
      }
      this.$network3
        .post("/mnoracle/Role/ADDRole", {
          Name: this.ADDRoleobj.Name,
          RGroup: this.ADDRoleobj.RGroup
        })
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.ADDRoleobj.isshow = false;
            this.GetRoleTree();
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error(err.msg);
        });
    },
    //新增角色按钮
    ADDRoleobjbtn() {
      this.ADDRoleobj.isshow = true;
      this.ADDRoleobj.Name = "";
      this.ADDRoleobj.RGroup = "";
      this.GetRGroupRole();
    },
    //批量删除员工
    DelArrStaff() {
      if (
        Array.isArray(this.selectEmployList) &&
        this.selectEmployList.length > 0
      ) {
        this.$confirm("是否删除勾选员工？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            var body = [];
            this.selectEmployList.forEach(element => {
              body.push(element.ID);
            });
            this.$network3
              .post("/mnoracle/Staff/DelArr", { ids: body })
              .then(res => {
                console.log(res);
                if (res.code == 200) {
                  this.$message.success(res.msg);
                  this.$refs.Employeetable.clearSelection();
                  this.GetAllByDID();
                } else {
                  this.$message.error(res.msg);
                }
              })
              .catch(err => {
                console.log(err);
                this.$message.error(err.msg);
              });
          })
          .catch(() => {});
      } else {
        this.$message.error("请选择需要删除的员工");
      }
    },
    handleSelectionChange(val) {
      console.log(val);
      this.selectEmployList = val;
    },
    handleSelectionChange1(val) {
      console.log(val);
      this.selectroleEmployList = val;
    },
    // 08-获取所有角色组
    GetRGroupRole() {
      this.$network3
        .get("/mnoracle/Role/GetRGroup")
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.RGrouplist = res.data;
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error(err.msg);
        });
    },
    //07-新增角色组
    ADDRGroup() {
      if (!this.ADDRGroupobj.Name) {
        this.$message.error("请输入角色组名称！");
        return;
      }
      this.$network3
        .post("/mnoracle/Role/ADDRGroup", { Name: this.ADDRGroupobj.Name })
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.$message.success(res.msg);
            this.ADDRGroupobj.isshow = false;
            this.GetRoleTree();
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(err => {
          this.$message.error(err.msg);
          console.log(err);
        });
    },

    uploademploybtn() {
      this.$refs["myupdataEmployee"].validate(valid => {
        if (valid) {
          // alert("submit!");
          console.log(this.Employeemsgobj);
          this.$network3
            .post("/mnoracle/Staff/UpdateByID", {
              ID: this.Employeemsgobj.ID,
              Name: this.Employeemsgobj.Name,
              Phone: this.Employeemsgobj.Phone,
              Position: this.Employeemsgobj.Position,
              DID: this.Employeemsgobj.DID,
              OldDID: this.Employeemsgobj.OldDID,
              RID: this.Employeemsgobj.RID,
              RName: this.Employeemsgobj.RName
            })
            .then(res => {
              console.log(res);
              if (res.code == 200) {
                this.$message.success(res.msg);
                this.Employeemsgobj.isshow = false;
                this.GetAllByDID();
              } else {
                this.$message.error(res.msg);
              }
            })
            .catch(err => {
              console.log(err);
              this.$message.error(err.msg);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    lookEmployee(e) {
      console.log(e);
      this.$network3
        .get("/mnoracle/Staff/GetOne", { ID: e.ID })
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.Employeemsgobj.ID = res.data.ID;
            this.Employeemsgobj.Name = res.data.Name;
            this.Employeemsgobj.Phone = res.data.Phone;
            this.Employeemsgobj.Position = res.data.Position;
            this.Employeemsgobj.RName = res.data.RName;
            this.Employeemsgobj.RID = res.data.RID;
            this.Employeemsgobj.DID = res.data.DID;
            this.Employeemsgobj.OldDID = res.data.OldDID;
          }
        })
        .catch(err => {
          console.log(err);
        });
      this.Employeemsgobj.isshow = true;
    },
    //06-根据id获取上级部门
    GetParent(id) {
      this.$network3
        .get("/mnoracle/Department/GetParent", {
          id: id
        })
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.Breadcrumblist = ["湖北美年大健康管理有限公司"];
            this.changeBreadcrumblist(res.data);
          }
        });
    },
    changeBreadcrumblist(data) {
      if (data.Name) {
        this.Breadcrumblist.push(data.Name);
      }
      if (data.Son) {
        this.changeBreadcrumblist(data.Son[0]);
      }
    },
    //删除部门
    delDepartmentbtn(item, index) {
      console.log(item);
      console.log(this.DepartmentTreelist);
      this.$confirm("是否删除该部门？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(() => {
          // var body = {
          //   ids: [item.ID]
          // };
          this.$network3
            .post("/mnoracle/Department/DelAll", { ids: [item.ID] })
            .then(res => {
              console.log(res);
              if (res.code == 200) {
                this.selectDepartmentobj.Son.splice(index, 1);
                this.GetDepartmentTree();
                this.GetAllByDID();
                this.GetOneDepartment(val.ID);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {});
    },
    //选择部门
    selectdepartment(val) {
      console.log(val);
      this.selectDepartmentobj = val;
      this.GetParent(val.ID);
      // console.log(this.rebuildData(val.ID, this.DepartmentTreelist));

      this.GetAllByDID();
      this.GetOneDepartment(val.ID);
    },
    //id查询部门详细信息
    GetOneDepartment(ID) {
      this.$network3
        .get("/mnoracle/Department/GetOne", {
          id: ID
        })
        .then(res => {
          console.log(res);
          this.selectDepartmentobj.Son = res.data.Son;
        });
    },
    rebuildData(value, arr) {
      // console.log(value,arr);
      let newarr = [];
      arr.forEach(element => {
        if (element.Son && element.Son.length > 0) {
          const ab = this.rebuildData(value, element.Son);
          const obj = {
            ...element,
            Son: ab
          };
          if (ab && ab.length) {
            newarr.push(obj);
          }
        } else {
          if (element.ID.indexOf(value) > -1) {
            newarr.push(element);
          }
        }
      });
      return newarr;
    },

    handleNodeClick(data, data1, data2) {
      console.log(data, data1, data2);
      this.qxfwobj.selectList = data1.checkedNodes;
    },
    //根据部门查员工
    GetAllByDID() {
      this.$network3
        .get("/mnoracle/Staff/GetAllByDID", {
          DID: this.selectDepartmentobj.ID
        })
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.Employeetableobj.list = res.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //02-获取部门树形图 无人员信息
    GetDepartmentTree() {
      this.$network3
        .get("/mnoracle/Department/GetTree2")
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.DepartmentTreelist = []; 
//          this.DepartmentTreelist = res.data;
            this.DepartmentTreelist = res.data||[];
            console.log(this.DepartmentTreelist);
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error(err.msg);
        });
    },
    //添加子部门btn
    Addsubdepartmentbtn() {
      this.Addsubdepartment.name = "";
      console.log(this.selectDepartmentobj);
      if (this.selectDepartmentobj == "") {
        console.log(this.selectDepartmentobj);
        this.Addsubdepartment.Superiorobj = {
          ID: "0",
          Name: "湖北美年大健康管理有限公司"
        };
      } else {
        this.Addsubdepartment.Superiorobj = this.selectDepartmentobj;
      }
      this.Addsubdepartment.isshow = true;
    },
    //添加员工btn
    addEmployeebtn() {
      console.log(this.selectDepartmentobj);
      if (this.selectDepartmentobj == "") {
        console.log(this.selectDepartmentobj);
        this.addEmployee.Superiorobj = {
          ID: "0",
          Name: "湖北美年大健康管理有限公司"
        };
      } else {
        this.addEmployee.Superiorobj = this.selectDepartmentobj;
      }
      this.addEmployee.ID = "";
      this.addEmployee.Name = "";
      this.addEmployee.Phone = "";
      this.addEmployee.Position = "";
      this.addEmployee.isshow = true;
    },
    //确认添加员工btn
    addEmployeeconfirmbtn() {
      this.$refs["myaddEmployee"].validate(valid => {
        if (valid) {
          // alert("submit!");
          this.$network3
            .post("/mnoracle/Staff/AddOne", {
              ID: this.addEmployee.ID,
              Name: this.addEmployee.Name,
              Phone: this.addEmployee.Phone,
              Position: this.addEmployee.Position,
              DID: this.addEmployee.Superiorobj.ID,
              FromCompany: "湖北美年测试账号",
              QRRole: "11"
            })
            .then(res => {
              console.log(res);
              if (res.code == 200) {
                this.$message.success("添加成功");
                this.addEmployee.isshow = false;
                this.GetAllByDID();
              } else {
                this.$message.error(res.msg);
              }
            })
            .catch(err => {
              console.log(err);
              this.$message.error(err.msg);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 01-添加部门
    AddOneDepartment(ID, name) {
      if (name == "") {
        this.$message.error("清输入部门名称！");
        return;
      }
      this.$network3
        .post("/mnoracle/Department/AddOne", {
          PID: ID,
          Name: name
        })
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.Addsubdepartment.isshow = false;
            this.GetDepartmentTree();
            this.GetAllByDID();
            this.GetOneDepartment(ID);
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error(err.msg);
        });
    },

    //02-获取角色 树形图结构
    GetRoleTree() {
      this.$network3
        .get("/mnoracle/Role/GetTree")
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.RoleTree = res.data;
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error(err.msg);
        });
    },
    changepage(val) {
      console.log(val);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>
<style lang="scss" >
.roleempclass {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .roleempclass_border {
    border: 1px solid #cccccc;
    height: 500px;
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
.bumenclass {
  cursor: pointer;
  &:hover {
    background-color: #f0f2f5;
  }
}
.ESboxleft {
  width: 320px;
  position: absolute;
  top: 0%;
  left: 0%;
  bottom: 0%;
  border-right: 1px solid #cccccc;
}
.ESBreadcrumbitem {
  white-space: pre;
  cursor: pointer;
  color: #409eff;
  // cursor: auto;
  // color: #333333;
}
.ESBreadcrumbitem:last-child {
  cursor: auto;
  color: #333333;
}
.ESboxright {
  padding: 10px;
  position: absolute;
  left: 320px;
  top: 0%;
  right: 0%;
  bottom: 0%;
  .EStitle {
    font-size: 20px;
    font-weight: bold;
  }
  .ESBreadcrumb {
    margin-top: 10px;
  }
  .nextSector {
    font-size: 18px;
    margin: 10px 0;
  }
  .nextSectorbox {
    margin: 10px 0;

    .nextSectorboxitem {
      cursor: pointer;
      line-height: 45px;
      font-size: 16px;
      border-bottom: 1px solid #cccccc;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .nextSectorboxitem:last-child {
      border: none;
    }
  }
}
</style>