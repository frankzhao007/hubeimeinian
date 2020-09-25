<template>
  <div id="wangeditor">
    <div ref="editorElem" style="text-align:left"></div>
  </div>
</template>

<script>
import E from "wangeditor";
import axios from "axios";
export default {
  name: "editorElem",
  watch: {
    firstTxt(value) {
      console.log("111111111111111111111111111111111111111");
      this.editor.txt.html(value);
    }
  },
  data() {
    return {
      editorContent: "",
      firstTxt: "",
      editor: null
    };
  },
  props: ["catchData"], //接收父组件的方法
  mounted() {
    var that = this;

    that.editor = new E(this.$refs.editorElem); //创建富文本实例
    that.editor.customConfig.onchange = html => {
      this.editorContent = html;
      this.catchData(html); //把这个html通过catchData的方法传入父组件
      // this.editorContent = html;
    };
    that.editor.customConfig.uploadImgServer =
      "https://whiot.ihaozhuo.com/t/web_uploadIllustration";
    that.editor.customConfig.uploadFileName = "你自定义的文件名";
    that.editor.customConfig.uploadImgHeaders = {
      Accept: "*/*"
      // Authorization: "Bearer " + token //头部token
    };
    that.editor.customConfig.menus = [
      //菜单配置
      "head",
      "list", // 列表
      "justify", // 对齐方式
      "bold",
      "fontSize", // 字号
      "italic",
      "underline",
      "image", // 插入图片
      "foreColor", // 文字颜色
      "undo", // 撤销
      "redo" // 重复
    ];
    that.editor.customConfig.pasteFilterStyle = false
    that.editor.customConfig.pasteIgnoreImg = true;
     that.editor.customConfig.pasteTextHandle = function (content) {
      // content 即粘贴过来的内容（html 或 纯文本），可进行自定义处理然后返回
      if (content == '' && !content) return ''
      var str = content
      // str = str.replace(/<xml>[\s\S]*?<\/xml>/ig, '')
      // str = str.replace(/<style>[\s\S]*?<\/style>/ig, '')
      // str = str.replace(/<\/?[^>]*>/g, '')
      // str = str.replace(/[ | ]*\n/g, '\n')
      // str = str.replace(/&nbsp;/ig, '')
      console.log('****', content)
      console.log('****', str)
      return str
    }
    that.editor.customConfig.customUploadImg = function(files, insert) {
      // files 是 input 中选中的文件列表
      // insert 是获取图片 url 后，插入到编辑器的方法
      for (var i = 0; i < files.length; i++) {
        const formData = new FormData();
        console.log(files);
        formData.append("illustration", files[i]);
        console.log(formData);
        var date = that.uploadImg(formData);
        date.then(function(data) {
          console.log(data);
          if (data.code == 200) {
            insert(data.illustration);
            // this.imgUrl = Object.values("https://whiot.ihaozhuo.com/t/img/" + data.illustration).toString();
          } else {
            return {
              prevent: true,
              msg: "放弃上传"
            };
          }
        });
      }
      // 上传代码返回结果之后，将图片插入到编辑器中
      // insert(that.imgUrl)
    };
    that.editor.customConfig.linkImgCallback = function(url, insert) {
      console.log(url); // url 即插入图片的地址
      // insert(url);
    };

    that.firstTxt = that.$parent.firstTxt;
    console.log(that.$parent);

    that.editor.create();
    console.log("5555555555555555555555555555555555555555");
  },
  methods: {
    uploadImg(fd) {
      var instance = axios.create();
      return new Promise((resolve, reject) => {
        instance({
          method: "post",
          //url: `${API}${url}`,
          url: `https://whiot.ihaozhuo.com/t/web_uploadIllustration`,
          xhrFields: {
            withCredentials: true
          },
          crossDomain: true,
          data: fd,
          headers: {
            "Content-Type": "application/json"
            //				'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
          .then(res => {
            console.log(res);
            resolve(res.data);
          })
          .catch(error => {
            console.log(error);
            reject(error);
          });
      });
      // return axios({
      //   method: "post",
      //   //url: `${API}${url}`,
      //   url: `https://whiot.ihaozhuo.com/t/web_uploadIllustration`,
      //   xhrFields: {
      //     withCredentials: true
      //   },
      //   crossDomain: true,
      //   data: fd,
      //   headers: {
      //     "Content-Type": "application/json"
      //     //				'Content-Type': 'application/x-www-form-urlencoded'
      //   }
      // })
      //   .then(response => {
      //     console.log(response);
      //     if (response.status >= 200 && response.status < 300) {
      //       return response.data;
      //     } else {
      //       console.log(response.statusText);
      //     }
      //   })
      //   .catch(err => {
      //     console.log(err.message);
      //     return err.message;
      //   });
    }
  }
};
</script>
<style>
.w-e-text-container {
  z-index: 1 !important;
}
.w-e-menu {
  z-index: 100 !important;
}
</style>
