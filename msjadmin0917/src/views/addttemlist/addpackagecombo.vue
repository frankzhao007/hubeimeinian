<template>
  <div style="margin:20px">
    <!-- 搜索栏 -->
    <div>
      <el-form :inline="true" :model="seekobj" label-position='right' label-width="120px" size="medium">
        <el-form-item label="加项包组名称：">
          <el-input v-model="seekobj.name" placeholder="请填写" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="加项包组ID：">
          <el-input v-model="seekobj.id" placeholder="请填写" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="当前状态：">
          <!-- <el-input v-model="seekobj.status" placeholder="请填写" style="width:200px"></el-input> -->
          <el-select v-model="seekobj.status" placeholder="请选择" style="width:200px">
            <el-option label="全部" value=""></el-option>
            <el-option label="上架" value="上架"></el-option>
            <el-option label="下架" value="下架"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属分公司：">
          <!-- <el-input v-model="seekobj.instName" placeholder="请填写" style="width:200px"></el-input> -->
          <el-select v-model="seekobj.instName" :disabled="Filialelist.length<=0" placeholder="请选择" style="width:200px" clearable filterable @change="instNameChange($event)">
            <el-option v-for="item in Filialelist" :key="item.ID" :value="item.ID" :label="item.Name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="加项包名称：">
          <el-input v-model="seekobj.jiaXiangName" placeholder="请填写" style="width:200px"></el-input>
        </el-form-item>
        <el-form-item label="创建人：">
          <!-- <el-input :disabled="!seekobj.instName||seekobj.instName=='优健康自营'" v-model="seekobj.creatPeople" placeholder="请选择" style="width:200px"></el-input> -->
          <el-select v-model="seekobj.creatPeople" :disabled="!seekobj.instName||seekobj.instName=='优健康自营'" placeholder="请选择" style="width:200px" clearable filterable>
            <el-option v-for="item in creatPeoplelist" :key="item.ID" :value="item.ID" :label="item.Name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="float:right">
          <el-button type="primary" @click="seekBtn" icon="el-icon-search">搜 索</el-button>
          <el-button type="primary" @click="" icon="el-icon-plus" @click="newAddPackageCombo">新 增</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 数据表格 -->
    <div>
      <el-table :data="tableobj.list" v-loading="tableobj.loading" style="width: 100%;">
        <el-table-column prop="name" label="加项包组名称"></el-table-column>
        <el-table-column prop="creatTime" label="添加时间"></el-table-column>
        <el-table-column prop="creatPeople" label="添加人"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            {{scope.row.status}}
            <el-switch @change="UpdateStatusJiaXiangGroup(scope.row)" v-model="scope.row.status" inactive-value="下架" active-value="上架">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="editAddPackageCombo(scope.row)">编辑</el-button>
            <el-button type="text" size="mini" @click="delAddPackageCombo(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="height:30px;margin-top:20px;">
        <el-pagination style="float:right" @size-change="sizechange" @current-change="pagechange" :current-page="seekobj.pageindex" :page-sizes="[10, 20, 30, 40]" :page-size="seekobj.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableobj.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      Filialelist: [],
      creatPeoplelist: [],
      seekobj: {
        name: "",
        // creatTime: "",
        status: "",
        instName: "",
        creatPeople: "",
        id: "",
        pageindex: 1,
        pagesize: 10,
        jiaXiangName: "",
        jiaXiangId: ""
      },
      tableobj: {
        list: [],
        loading: false,
        total: 0
      }
    };
  },
  mounted() {
    console.log(this.$route.query);

    this.seekobj.jiaXiangName = this.$route.query.jiaXiangName || "";
    this.QueryAllJiaXiangGroup();
    this.getDropDownData();
  },
  methods: {
    sizechange(val) {
      this.seekobj.pagesize = val;
      this.seekobj.pageindex = 1;
      this.QueryAllJiaXiangGroup();
    },
    pagechange(val) {
      this.seekobj.pageindex = val;
      this.QueryAllJiaXiangGroup();
    },
    UpdateStatusJiaXiangGroup(row) {
      console.log(row);

      this.$api.get("/manage/UpdateStatusJiaXiangGroup", {
        id: row.id,
        status: row.status
      });
      // .then(res => {
      //   console.log(res);
      // })
      // .catch(err => {
      //   this.$message.error(err.msg);
      // });
    },
    instNameChange(ev) {
      this.seekobj.creatPeople = "";
      this.creatPeoplelist = [{ Name: "全部", ID: "" }];
      console.log(ev);
      if (ev == "" || ev == "优健康自营") {
        return;
      }
      var selectobj = {};
      this.Filialelist.forEach(element => {
        if (ev == element.ID) {
          console.log(element);
          selectobj = element;
        }
      });
      this.pullOrg2("1", selectobj.Name)
        .then(DropDownData => {
          console.log(DropDownData);
          if (Array.isArray(DropDownData)) {
            DropDownData.forEach(element => {
              if (element.AccountType == 2) {
                //分公司下销售数据
                element.Name.forEach((item, index) => {
                  var obj = {
                    Name: item,
                    ID: element.ID[index]
                  };
                  this.creatPeoplelist.push(obj);
                });
              }
            });
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error(err.msg);
        });
    },
    getDropDownData() {
      this.pullOrg2(
        this.$store.getters.getRoleInfo.AccountType,
        this.$store.getters.getRoleInfo.AccountName
      )
        .then(DropDownData => {
          console.log(DropDownData);
          if (Array.isArray(DropDownData)) {
            DropDownData.forEach(element => {
              if (element.AccountType == 1) {
                //分公司数据
                if (this.$store.getters.getRoleInfo.AccountType == 0) {
                  this.Filialelist = [
                    { Name: "全部", ID: "" },
                    { Name: "优健康自营", ID: "优健康自营" }
                  ];
                } else {
                  this.Filialelist = [];
                  this.seekobj.instName = element.ID[0];
                }
                element.Name.forEach((item, index) => {
                  var obj = {
                    Name: item,
                    ID: element.ID[index]
                  };
                  this.Filialelist.push(obj);
                });
              }
            });
          }
        })
        .catch(err => {
          this.$message.error(err.msg);
        });
    },
    //查询账号链表
    pullOrg2(AccountType, AccountName) {
      return new Promise((resolve, reject) => {
        this.$api
          .get("/account/pullOrg2", {
            AccountType: AccountType,
            AccountName: AccountName
          })
          .then(res => {
            console.log(res);
            if (res.code == 200) {
              resolve(res.data);
            } else {
              reject(res);
            }
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    //删除
    delAddPackageCombo(row) {
      this.$confirm("是否删除该加项包组？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(res => {
          console.log(res);
          // 08-加项包组列表-删除
          this.tableobj.loading = true;
          this.$api
            .get("manage/DeleteJiaXiangGroup", {
              id: row.id
            })
            .then(res => {
              this.tableobj.loading = false;
              console.log(res);
              if (res.code == 200) {
                this.QueryAllJiaXiangGroup();
                this.$message.success("删除成功！");
              } else {
                this.$message.error(res.msg);
              }
            })
            .catch(err => {
              console.log(err);
              this.$message.error(err.msg);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //编辑
    editAddPackageCombo(row) {
      this.$router.push({
        path: "/commodity/addpackagecombomsg",
        query: { id: row.id }
      });
    },
    newAddPackageCombo() {
      this.$router.push("/commodity/addpackagecombomsg");
    },
    seekBtn() {
      this.seekobj.pageindex = 1;
      this.QueryAllJiaXiangGroup();
    },
    //05-加项包组列表-首页查询
    QueryAllJiaXiangGroup() {
      this.tableobj.loading = true;
      this.$api
        .post("manage/QueryAllJiaXiangGroup", {
          name: this.seekobj.name,
          // creatTime: this.seekobj.creatTime,
          status: this.seekobj.status,
          instName: this.seekobj.instName,
          creatPeople: this.seekobj.creatPeople,
          id: this.seekobj.id,
          page: this.seekobj.pageindex,
          pagesize: this.seekobj.pagesize,
          jiaXiangName: this.seekobj.jiaXiangName
        })
        .then(res => {
          console.log(res);
          this.tableobj.loading = false;
          if (res.code == 200) {
            this.tableobj.list = res.data.data;
            this.tableobj.total = res.data.count;
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