<template>
  <div class="app-container">
    <!-- 健康俱乐部 --- 食物类别列表 --- foodcategorylist -->
    <div>
      <el-table :data="foodcategorylist" style="width: 100%" row-key="id">
        !
        <el-table-column prop label="分类图片" style="text-align: center">
          <template slot-scope="scope">
            <el-image :src="scope.row.imageUrl" alt srcset class="imgFoot" ></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="nameA" label="所属分类"></el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" :disabled="scope.$index==0" @click="sortFoodsCategory((scope.$index+1).toString(),scope.$index.toString())">上移</el-button>
            <el-button type="text" size="small" :disabled="scope.$index==foodcategorylist.length-1" @click="sortFoodsCategory((scope.$index+1).toString(),(scope.$index+2).toString())">下移</el-button>
            <el-button type="text" size="small" @click="EditShow(scope.row)">编辑</el-button>
            <el-button type="text" size="small" disabled>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="分类编辑" :visible.sync="changeShow" width="30%" center>
      <div>
        分类名称：
        <el-input style="width:300px;" :disabled="true" v-model="tempcategory.nameA"></el-input>
      </div>
      <div class="lineBox">
        <input style="display:none" type="file" id="imgTest" accept=".gif, .jpg, .jpeg, .png" />
        <span class="lineWord">分类图片：</span>
        <el-image :src="tempcategory.imageUrl" srcset class="EditImg" ></el-image>
        <!-- <el-button  size="mini">默认按钮</el-button> -->
        <el-button class="lineBtn" type="primary" @click="getImg">
          修改
          <i class="el-icon-upload el-icon--right"></i>
        </el-button>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeShow">取 消</el-button>
        <el-button type="primary" @click="confirShow">确认修改</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Sortable from "sortablejs";
var i = 0;
export default {
  name: "foodcategorylist",
  components: {},
  data() {
    return {
      foodcategorylist: [],
      changeShow: false,
      tempcategory: "",
      file: ""
    };
  },
  created() {},
  mounted() {
    console.log("145125 :", 145125);
    this.foodcategoryQuery();
    this.rowDrop();
  },
  methods: {
    rowDrop() {
      const tbody = document.querySelector(".el-table__body-wrapper tbody");
      const _this = this;
      Sortable.create(tbody, {
        onEnd({ newIndex, oldIndex }) {
          console.log(newIndex, oldIndex);
          const currRow = _this.foodcategorylist.splice(oldIndex, 1)[0];
          _this.foodcategorylist.splice(newIndex, 0, currRow);
          _this.sortFoodsCategory(
            (oldIndex + 1).toString(),
            (newIndex + 1).toString()
          );
        }
      });
    },
    foodcategoryQuery() {
      this.foodcategorylist=[]
      this.$network
        .post("/healthClub/hm/listFoodsCategory")
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            for (let i = 0; i < res.data.foodcategory.length; i++) {
              this.$set(res.data.foodcategory[i], "img");
              res.data.foodcategory[i].img = [];
              res.data.foodcategory[i].img.push(
                res.data.foodcategory[i].imageUrl
              );
            }
            console.log(res.data.foodcategory);
             
            this.foodcategorylist = res.data.foodcategory;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    sortFoodsCategory(startIndex, endIndex) {
      var body = {
        startIndex: startIndex,
        endIndex: endIndex
      };
      this.$network.post("/healthClub/hm/sortFoodsCategory", body).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.foodcategoryQuery();
        }
      });
    },
    EditShow(arry) {
      this.tempcategory = JSON.parse(JSON.stringify(arry));
      this.changeShow = true;
    },
    closeShow() {
      this.tempcategory = "";
      this.changeShow = false;
    },
    confirShow() {
      let formData = new FormData();
      formData.append("name", this.tempcategory.nameA);
      formData.append("file", this.file);
      this.$network
        .post("/healthClub/hm/updateFoodsCategory", formData)
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.tempcategory = "";
            this.changeShow = false;
            this.foodcategoryQuery();
          }
        });
    },
    getImg() {
      var input = document.getElementById("imgTest");
      console.log(input);
      document
        .getElementById("imgTest")
        .addEventListener("change", this.imgChange);
      document.getElementById("imgTest").click();
    },
    imgChange(e) {
      console.log(e);
      console.log(e.target.files);
      var that = this;
      var evn = e;
      that.file = e.target.files[0];
      if (i < e.target.files.length) {
        var imgobj = {};
        var fileObj = e.target.files[0]; //获取文件对象
        var lastindex = e.target.files[0].name.lastIndexOf(".");
        console.log(e.target.files[0].name.lastIndexOf("."));
        imgobj.imgName = e.target.files[0].name.substring(0, lastindex);
        console.log(e.target.files[0]);
        console.log(imgobj.name);
        let reader = new FileReader(); //新建一个FileReader对象
        reader.readAsDataURL(fileObj); //将读取的文件转换成base64格式
        reader.onload = function(e) {
          console.log(e);
          that.tempcategory.imageUrl = e.target.result;
          that.tempcategory.img[0] = e.target.result;
          console.log(imgobj);
          that.imgChange(evn);
          i++;
        };
        console.log(reader);
      } else {
        e.target.value = "";
        i = 0;
      }
      console.log(that.file);
      console.log(e.target.files);
    }
  },
  watch: {},
  computed: {}
};
</script>

<style lang="scss">
.imgFoot {
  height: 40px;
  width: 40px;
}
.EditImg {
  height: 100px;
  width: 100px;
  // position: absolute;
}
.lineBox {
  height: 100px;
  margin-top: 10px;
  position: relative;
}
.lineWord {
  float: left;
  top: 0;
}
.lineBtn {
  position: absolute;
  bottom: 0;
  right: 30px;
}
</style>