<template>
  <div>
    <!-- 选择体检项目 -->
    <div class="sxmobj">
      <el-dialog title="选择项目" :visible.sync="selectxmobj.isshow" width="800px">
        <div style="position: relative;" v-loading="selectxmobj.loading">
          <div class="sxmclass">
            全部项目：
            <div class="sxmmainclass">
              <div class="sxmmainclassinput">
                <el-input
                  v-model="dimtext"
                  prefix-icon="el-icon-search"
                  placeholder="输入项目代码或检查项名称"
                  size="small"
                  style="width:80%;margin-left:10px"
                ></el-input>
              </div>
              <div class="sxmmainclass1">
                <el-checkbox-group v-model="selectxmobj.checkList" @change="checkListchange">
                  <el-checkbox
                    style="min-width:100%;margin:5px 0 0 10px"
                    v-for="item in dimchange"
                    :key="item.ITEM_ID"
                    :disabled="item.tag"
                    :label="item.ITEM_ID+' - '+item.ITEM_NAME+' - '+item.SUBITEM"
                  >
                    <div v-if="item.SUBITEM.length>0">
                      {{item.ITEM_ID+' - '+item.ITEM_NAME+' - '}}
                      <span
                        v-for="(item2,index) in item.SUBITEM"
                      >{{item2.CHECK_ITEM}}</span>
                    </div>
                    <div v-else>{{item.ITEM_ID+' - '+item.ITEM_NAME+' - '+'无'}}</div>
                  </el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
          </div>
          <div class="sxmclass" style="position: absolute;right: 0%;top: 0%">
            已选项目：
            <div class="sxmmainclass">
              <div
                class="sxmmainclassdiv"
                v-for="(item,index) in selectxmobj.checkList1"
                :key="item.ITEM_ID"
              >
                <div class="sxmmainclassdiv_span">
                  <el-tooltip placement="top" v-if="item.SUBITEM.length>0">
                    <span slot="content">
                      <span>
                        {{item.ITEM_ID+' - '+item.ITEM_NAME+' - '}}
                        <span
                          v-for="(item2,index) in item.SUBITEM"
                        >{{item2.CHECK_ITEM}}</span>
                      </span>
                    </span>
                    <span>
                      {{item.ITEM_ID+' - '+item.ITEM_NAME+' - '}}
                      <span
                        v-for="(item2,index) in item.SUBITEM"
                      >{{item2.CHECK_ITEM}}</span>
                    </span>
                  </el-tooltip>
                  <span v-else>{{item.ITEM_ID+' - '+item.ITEM_NAME+' - '+'无'}}</span>
                </div>
                <i @click="delcheckList(item,index)" v-if="!item.tag" class="el-icon-circle-close"></i>
                <i @click="delcheckList2(item,index)" v-else class="el-icon-circle-close"></i>
              </div>
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="selectxmobj.isshow = false;">取 消</el-button>
          <el-button type="primary" @click="confirmselectpackage">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    isshow: {
      type: Boolean,
      default: false,
    },
    selectlist: {
      type: Array,
      default: [],
    },
    READ_ORNOT: {
      type: String,
      default: "",
    },
    XB: {
      type: String,
      default: "",
    },
    itemFilter: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      ITEM_IDlist: [],
      dimtext: "",
      selectxmobj: {
        loading: false,
        isshow: false,
        itemFilter: false,
        checkList: [],
        checkList1: [],
        READ_ORNOT: "",
        XB: "",
      },
    };
  },
  mounted() {
    this.selectxmobj.checkList = [];
    this.selectxmobj.checkList1 = [];
    this.ITEM_IDlist = [];
    console.log(this.selectxmobj);
  },
  watch: {
    "selectxmobj.isshow": {
      handler(nvl, ovl) {
        this.$emit("changeisshow", nvl);
      },
      deep: true,
      immediate: true,
    },

    isshow(val) {
      this.selectxmobj.isshow = val;
      if (val) {
        this.ITEM_IDlist = [];
        this.getITEM_IDlist();
      }
    },
    selectlist(val) {
      this.selectxmobj.checkList1 = val;
      console.log(this.selectxmobj.checkList1);
    },
    READ_ORNOT(val) {
      this.selectxmobj.READ_ORNOT = val;
    },
    XB(val) {
      this.selectxmobj.XB = val;
    },
  },
  methods: {
    selectxmobjbtn() {
      this.selectxmobj.checkList = [];
      this.selectxmobj.checkList1.map((item) => {
        if (item.SUBITEM == null) {
          item.SUBITEM = [];
        }
        this.selectxmobj.checkList.push(
          item.ITEM_ID + " - " + item.ITEM_NAME + " - " + item.SUBITEM
        );
      });
      console.log(this.selectxmobj.checkList);
    },
    getITEM_IDlist() {
      this.selectxmobj.loading = true;
      var body = {};
      console.log(this.selectxmobj);
      if (this.selectxmobj.XB == "" || this.selectxmobj.READ_ORNOT == "") {
        if (this.itemFilter == false) {
          body = {
            pageIndex: 1,
            pageSize: 99999,
          };
        } else {
          body = {
            pageIndex: 1,
            pageSize: 99999,
            itemFilter: this.itemFilter,
          };
        }
      } else {
        body = {
          pageIndex: 1,
          pageSize: 99999,
          READ_ORNOT: this.selectxmobj.READ_ORNOT,
          XB: this.selectxmobj.XB,
          itemFilter: this.itemFilter,
        };
      }

      this.$network3
        .get("/mnoracle/item/FindITEMS", body)
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.selectxmobj.loading = false;
            this.ITEM_IDlist = res.data.ITEMlist;
            this.selectxmobjbtn();
          } else {
            this.selectxmobj.loading = false;
            this.ITEM_IDlist = [];
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    checkListchange(val) {
      console.log(val);
      this.selectxmobj.checkList1 = [];
      val.map((item) => {
        this.ITEM_IDlist.map((temp) => {
          if (temp.ITEM_ID == item.split(" - ")[0]) {
            this.selectxmobj.checkList1.push(temp);
          }
        });
      });
      console.log(this.selectxmobj.checkList1);
    },
    delcheckList(item, index) {
      this.selectxmobj.checkList1.splice(index, 1);
      this.selectxmobj.checkList.map((row, index1) => {
        if (row.split(" - ")[0] == item.ITEM_ID) {
          this.selectxmobj.checkList.splice(index1, 1);
        }
      });
    },
    confirmselectpackage() {
      console.log("确认", this.selectxmobj.checkList1);
      this.$emit("confirmselectpackage", this.selectxmobj.checkList1);
      this.selectxmobj.isshow = false;
    },
  },
  computed: {
    dimchange() {
      if (this.dimtext) {
        return this.ITEM_IDlist.filter((item) => {
          if (
            item.ITEM_ID.indexOf(this.dimtext) >= 0 ||
            item.ITEM_NAME.indexOf(this.dimtext) >= 0
          ) {
            console.log(item.ITEM_ID);
            console.log(item.ITEM_NAME);
            return item;
          }
        });
      } else {
        return this.ITEM_IDlist;
      }
    },
  },
};
</script>


<style lang="scss" scope>
.sxmobj {
  .el-dialog__body {
    padding: 10px 20px;
  }
  .sxmclass {
    width: 49%;
    position: relative;
    .sxmmainclass {
      position: relative;
      height: 450px;
      padding: 10px;
      width: 95%;
      margin-top: 5px;
      border: 1px solid #cccccc;
      .sxmmainclassdiv {
        min-width: 100%;
        margin: 5px 0 0 0;

        position: relative;

        i {
          position: absolute;
          font-size: 20px;
          right: 5px;
          top: 0px;
          cursor: pointer;
        }
      }
      .sxmmainclassdiv_span {
        width: 93%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .sxmmainclassinput {
        position: absolute;
        width: 90%;
        height: 50px;
        top: 0;
        left: 5px;
        z-index: 1000;
        background-color: #fff;
        display: flex;
        align-items: center;
      }
      .sxmmainclass1 {
        position: absolute;
        top: 50px;
        left: 0px;
        right: 0px;
        bottom: 0%;
        overflow: auto;
      }
    }
  }
}
</style>