<template>
  <div>
    <div style="margin:20px;min-width: 1200px;height:20px">
      <div style="float: left;">
        <el-button type="primary" @click="newremark=true">新建文件夹</el-button>
      </div>
      <div class="overtit" style="margin-left:30px;">共{{numberletn}}个文件夹</div>
      <!-- <div style="float: right;">
        <el-input v-model.trim="sechort" placeholder="输入文件夹名" style="width:200px" clearable></el-input>
        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      </div>-->
    </div>
    <div style="margin:20px;min-width: 1200px;clear: both;">
      <div class="goime">
        <div v-for="(item,index) in list" :key="index" @mouseleave="mouseLeave">
          <div class="contback">
            <div class="contone" @click="gotoxq(index,item)">
              <img src="@/assets/offer.png" alt style="width: 100%;padding-top: 6px;" />
              <div :class="item.status==0?classA:classB">{{item.status==0?'文件数据不完整':'计算完成'}}</div>
            </div>
            <div class="conttwo">{{item.name}}</div>
            <i
              @click="showmoa(index)"
              class="el-icon-s-tools"
              style="cursor: pointer;position: absolute;bottom: 0;right: 0;height: 30px;text-align: center;width: 30px;line-height: 40px;"
            ></i>
            <div class="showmodle" v-show="showmo === index">
              <div style="border-bottom: solid 1px #eeeeee;" @click="raname(index,item)">重命名</div>
              <div @click="remove(index,item)">删除</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 新建文件夹 -->
    <el-dialog title="新建文件夹" :visible.sync="newremark" width="500px" @close="nogonewoffer">
      <div>
        <el-input v-model.trim="newcont" placeholder="请输入文件夹名称"></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="nogonewoffer">取 消</el-button>
        <el-button type="primary" @click="gonewoffer">确定</el-button>
      </div>
    </el-dialog>

    <!-- 重命名文件夹 -->
    <el-dialog title="重命名文件夹" :visible.sync="isremark" width="500px" @close="nogonewname">
      <div>
        <el-input v-model.trim="newmane" placeholder="请输入文件夹名称"></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="nogonewname">取 消</el-button>
        <el-button type="primary" @click="gonewname">确定</el-button>
      </div>
    </el-dialog>
    <!-- 分页 -->
    <div style="height:30px;margin-top:20px;clear: both;">
      <el-pagination
        style="float:right"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="tableselectenterMeal.pageindex"
        :page-sizes="[30, 40, 50, 60]"
        :page-size="tableselectenterMeal.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableselectenterMeal.total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  inject: ["reload"],
  name: "CommissionHubei",
  data() {
    return {
      isremark: false,
      newremark: false,
      removeark: false,
      sechort: "",
      showmo: -1,
      newmane: "",
      newmaneid: "",
      revomaneid: "",
      newcont: "",
      numberletn: "",
      list: [],
      classA: "classA",
      classB: "classB",
      tableselectenterMeal: {
        //分页
        pageindex: 1,
        pagesize: 30,
        total: 0
      }
    };
  },
  mounted() {
    this.getworkpace();
  },
  methods: {
    getworkpace() {
      var body = {
        size: this.tableselectenterMeal.pagesize,
        page: this.tableselectenterMeal.pageindex
      };
      this.$network5
        .get("/workspace/list", body)
        .then(res => {
          console.log(res);
          this.list = res.data.workspaces;
          this.numberletn = res.data.count;
          this.tableselectenterMeal.total = res.data.count;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 搜索
    search() {
      console.log(this.sechort);
    },

    // 新建文件
    gonewoffer() {
      var that = this;
      if (this.newcont == "") {
        this.$message.error("请输入新建文件夹名称");
        return;
      }

      var body = {
        name: this.newcont
      };
      this.$network5
        .post("/workspace/create ", body)
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            console.log(this.newcont);
            this.newremark = false;
            this.newcont = "";
            this.$message({
              message: "新建成功",
              type: "success"
            });
            // that.reload();
            this.getworkpace();
          } else {
            this.$message.error("新建文件夹名称重复");
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error(err.msg);
        });
    },
    nogonewoffer() {
      this.newremark = false;
      this.newcont = "";
    },
    // 修改文件夹名称
    gonewname() {
      var that = this;
      if (this.newmane == "") {
        this.$message.error("请输入文件夹名称");
        return;
      } 
      var body = {
        id: this.newmaneid,
        name: this.newmane
      };
      this.$network5
        .post("/workspace/rename", body)
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.$message({
              message: "修改成功",
              type: "success"
            });
            this.isremark = false;
            this.newmane = "";
            this.getworkpace();
            // that.reload();
          } else {
            this.$message.error("修改文件名重复");
          }
        })
        .catch(err => {
          this.$message.error("修改失败");
          console.log(err);
        });
    },
    nogonewname() {
      this.newmane = "";
      this.isremark = false;
    },
    closeDialog() {
      console.log(1);
    },
    // 点击修改名
    raname(index, item) {
      console.log(index, item.id);
      this.newmaneid = item.id;
      this.showmo = -1;
      this.isremark = true;
    },
    // 删除
    remove(index, item) {
      console.log(index, item.id);
      this.revomaneid = item.id;
      this.showmo = -1;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var that = this;
          var body = {
            id: this.revomaneid
          };
          this.$network5
            .get("/workspace/delete", body)
            .then(res => {
              console.log(res);
              this.$message({
                message: "删除成功",
                type: "success"
              });
              that.list.splice(index, 1);
              this.getworkpace();
              // that.reload();
            })
            .catch(err => {
              this.$message.error("删除失败");
              console.log(err);
            });
        })
        .catch(() => {
          console.log(222);
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    // push详情页面
    gotoxq(index, item) {
      console.log(item.id,item.name);
      this.$router.push("/CommissionHB/CommissionMsg?wid=" + item.id);
    },
    // 点击当前显示及隐藏
    showmoa(index) {
      console.log(index);
      let that = this;
      if (that.showmo === index) {
        that.showmo = -1;
      } else {
        that.showmo = index;
      }
    },
    mouseLeave() {
      this.showmo = -1;
    },
    handleSizeChange(val) {
      this.tableselectenterMeal.pagesize = val;
      this.tableselectenterMeal.pageindex = 1;
      this.getworkpace();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.tableselectenterMeal.pageindex = val;
      this.getworkpace();
      console.log(`当前页: ${val}`);
    }
  }
};
</script>
<style lang="scss" scoped>
.allback {
  width: 100%;
  height: 100%;
  top: 0px;
}
.showmodle div {
  height: 50%;
  line-height: 2;
  cursor: pointer;
}
.showmodle {
  background: #fff;
  position: absolute;
  bottom: -45px;
  right: -36px;
  border: solid 1px #eeeeee;
  height: 62px;
  width: 70px;
  text-align: center;
  border-radius: 5px;
}

.classA {
  color: red;
}
.classB {
  color: #5270c7;
}
.goime {
  margin-top: 50px;
}
.contone div {
  position: absolute;
  bottom: 2px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  font-size: 12px;
}
.contone {
  padding: 0px 10px;
  height: 105px;
  position: relative;
  cursor: pointer;
  border-bottom: 1px solid #eee;
}
.conttwo {
  width: 87%;
  padding: 0px 10px;
  text-align: center;
  height: 45px;
  font-size: 13px;
  padding-top: 5px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.contback {
  position: relative;
  display: inline-block;
  width: 130px;
  height: 150px;
  border: solid 1px #eee;
  margin-right: 40px;
  margin-bottom: 80px;
  float: left;
}

.overtit {
  margin-right: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 210px;
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  background: #fff;
  border: 1px solid #dcdfe6;
  color: #606266;
  -webkit-appearance: none;
  text-align: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: 0;
  -webkit-transition: 0.1s;
  transition: 0.1s;
  font-weight: 500;
  padding: 12px 20px;
  font-size: 14px;
  border-radius: 4px;
}
.overtit:hover {
  // cursor: pointer;
  color: #409eff;
  border: 1px solid #409eff;
}
</style>
