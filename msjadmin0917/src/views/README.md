# 路由参照表

|      |                         |                   |      |      |      |      |      |
| :--- | ----------------------- | ----------------- | ---- | ---- | ---- | ---- | ---- |
| 1、  | accountlist             | 账号列表          |      |      |      |      |      |
|      | addaccount              | 新增/编辑账号     |      |      |      |      |      |
|      | newrole                 | 新增/编辑角色     |      |      |      |      |      |
|      |                         |                   |      |      |      |      |      |
|      |                         |                   |      |      |      |      |      |
| 2、  | addttemlist             | 加项列表          |      |      |      |      |      |
| 3、  | approvallist            | 审批列表          |      |      |      |      |      |
|      | approvalexport          | 审批导出记录      |      |      |      |      |      |
|      | content                 | 审批内容          |      |      |      |      |      |
|      | newapproval             | 新增审批          |      |      |      |      |      |
|      |                         |                   |      |      |      |      |      |
| 4、  | billingdetails          | 账单明细          |      |      |      |      |      |
|      | billingexport           | 账单导出记录      |      |      |      |      |      |
|      |                         |                   |      |      |      |      |      |
| 5、  | categorylist            | 项目类别列表      |      |      |      |      |      |
| 6、  | citylist                | 城市列表          |      |      |      |      |      |
| 7、  | dashboard               | 首页              |      |      |      |      |      |
| 8、  | enterpriselist          | 企业列表          |      |      |      |      |      |
|      | enterpriseconfiguration | 配置套餐          |      |      |      |      |      |
|      |                         |                   |      |      |      |      |      |
| 9、  | error-page              | 错误页面          |      |      |      |      |      |
| 10、 | filmmanagement          | 胶片管理          |      |      |      |      |      |
| 11、 | login                   | 登录              |      |      |      |      |      |
| 12、 | orderlist               | 订单管理          |      |      |      |      |      |
|      | orderdetails            | 订单详情          |      |      |      |      |      |
|      | orderexportrecord       | 订单导出记录      |      |      |      |      |      |
|      |                         |                   |      |      |      |      |      |
| 13、 | packagelist             | 商品列表          |      |      |      |      |      |
|      | additem                 | 新增套餐          |      |      |      |      |      |
|      | 暂无                    | 新增虚拟商品      |      |      |      |      |      |
|      | addpackage              | 新增加项包        |      |      |      |      |      |
|      |                         |                   |      |      |      |      |      |
| 14、 | paymentorder            | 支付订单          |      |      |      |      |      |
|      | filmorderdetails        | 订单详情          |      |      |      |      |      |
|      |                         |                   |      |      |      |      |      |
| 15、 | projectlist             | 体检项目列表      |      |      |      |      |      |
|      | addproject              | 新建/编辑体检项目 |      |      |      |      |      |
|      | newprojectcategory      | 新建/编辑项目类别 |      |      |      |      |      |
|      | projectimportrecord     | 体检项目导入记录  |      |      |      |      |      |
|      | secondarycategorylist   | 二级类别列表      |      |      |      |      |      |
|      |                         |                   |      |      |      |      |      |
| 16、 | reservationlist         | 预约列表          |      |      |      |      |      |
| 17、 | retaillist              | 散户列表          |      |      |      |      |      |
| 18、 | rolelist                | 角色列表          |      |      |      |      |      |
| 19、 | saleslist               | 销售列表          |      |      |      |      |      |
| 20、 | stafflist               | 员工列表          |      |      |      |      |      |
|      | configurationpackage    | 配置套餐          |      |      |      |      |      |
|      | employeeimport          | 员工导入记录      |      |      |      |      |      |
|      | newemployee             | 新增员工          |      |      |      |      |      |
|      |                         |                   |      |      |      |      |      |
| 21、 | statement               | 对账单            |      |      |      |      |      |
| 22、 | storelist               | 门店列表          |      |      |      |      |      |
| 23、 |                         |                   |      |      |      |      |      |
| 24、 |                         |                   |      |      |      |      |      |
| 25、 |                         |                   |      |      |      |      |      |
|      |                         |                   |      |      |      |      |      |
|      |                         |                   |      |      |      |      |      |
|      |                         |                   |      |      |      |      |      |
|      |                         |                   |      |      |      |      |      |
|      |                         |                   |      |      |      |      |      |
|      |                         |                   |      |      |      |      |      |
|      |                         |                   |      |      |      |      |      |
|      |                         |                   |      |      |      |      |      |
|      |                         |                   |      |      |      |      |      |
|      |                         |                   |      |      |      |      |      |
|      |                         |                   |      |      |      |      |      |
|      |                         |                   |      |      |      |      |      |





# 组件大小

size="medium"

# vue模板

```vue
<template>
    <div class="app-container">

    </div>
</template>

<script>
export default {
    name: "",
    components: {
        
  	},
    watch: {
        
    },
    data() {
        return {
            
        };
    },
    mounted() {
        
    },
    methods: {
        
    },
    computed:{

    }
};
</script>

<style lang="scss" scoped>

</style>

```



# 分页

```vue
<!-- 分页 -->
    <div class="block" style="text-align: right;margin-top: 20px;">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[20, 40, 50, 100]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="400">
      </el-pagination>
    </div>


currentPage: 1
```



# 查询条件模板

```vue
<template>
  <div class="app-container">
    <!-- 查询表单 -->
    <div>
      <div class="inquire">
        <el-row>
          <el-col :span="6">
            <div class="grid_lable">一级类目：</div>
            <div class="grid_content">
              <el-select v-model="value" placeholder="请选择" size="medium" style="width:100%;">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid_lable">二级类目：</div>
            <div class="grid_content">
              <el-select v-model="value" filterable placeholder="请选择" size="medium" style="width:100%;">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid_lable">项目名称：</div>
            <div class="grid_content">
              <el-input placeholder="请输入内容" v-model="input" clearable size="medium" style="width:100%;">
              </el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid_lable">性别：</div>
            <div class="grid_content">
              <el-select v-model="value" placeholder="请选择" size="medium" style="width:100%;">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="inquire">
        <el-row>
          <el-col :span="6">
            <div class="grid_lable">区域：</div>
            <div class="grid_content">
              <el-select v-model="value" filterable placeholder="请选择" size="medium" style="width:100%;">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid_lable">区域项目代码：</div>
            <div class="grid_content">
              <el-input placeholder="请输入内容" v-model="input" clearable size="medium" style="width:100%;">
              </el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid_lable">城市：</div>
            <div class="grid_content">
              <el-select v-model="value" filterable placeholder="请选择" size="medium" style="width:100%;">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid_lable">城市项目代码：</div>
            <div class="grid_content">
              <el-input placeholder="请输入内容" v-model="input" clearable size="medium" style="width:100%;">
              </el-input>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 按钮 -->
    <div>
      <div class="inquire">
        <el-button class="grid_button" type="primary" size="medium">导入记录</el-button>
        <el-button class="grid_button" type="primary" size="medium">导入</el-button>
        <el-button class="grid_button" type="primary" size="medium">重置</el-button>
        <el-button class="grid_button" type="primary" size="medium" icon="el-icon-search">搜索</el-button>
      </div>
      <div class="inquire">
        <el-button type="primary" size="medium" icon="el-icon-plus">新增体检项目</el-button>
      </div>
    </div>
    <!-- 表格 -->
    <div>
      <el-table :data="tableData" style="width: 100%;" size="medium">
        <el-table-column label="区域项目代码" width="180">
          <template slot-scope="scope">

            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="城市项目代码" width="180">
          <template slot-scope="scope">

            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="一级类目" width="180">
          <template slot-scope="scope">

            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="二级类目" width="180">
          <template slot-scope="scope">

            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="项目名称" width="180">
          <template slot-scope="scope">

            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="详细描述" width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>{{ scope.row.address }}</p>
              <div slot="reference" class="name-wrapper">
                {{ scope.row.address }}
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="核算价" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column label="门市价" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="block" style="text-align: right;margin-top: 20px;">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[20, 40, 50, 100]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="400">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "filmmanagement",
  components: {},
  watch: {},
  data() {
    return {
      options: [
        {
          value: "所有",
          label: "所有"
        },
        {
          value: "黄金糕",
          label: "黄金糕"
        },
        {
          value: "双皮奶",
          label: "双皮奶"
        },
        {
          value: "蚵仔煎",
          label: "蚵仔煎"
        },
        {
          value: "龙须面",
          label: "龙须面"
        },
        {
          value: "北京烤鸭",
          label: "北京烤鸭"
        }
      ],
      value: "全部",

      input: "",
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        }
      ],
      currentPage: 1
    };
  },
  mounted() {},
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
  computed: {}
};
</script>

<style lang="scss">
</style>


```

# input(可清空)

<https://element.eleme.cn/#/zh-CN/component/input>

```
<el-input
  placeholder="请输入内容"
  v-model="input"
  clearable
  size="medium" style="width:100%;"
  >
</el-input>
<script>
  export default {
    data() {
      return {
        input: ''
      }
    }
  }
</script>
```

# Select 选择器(普通)

<https://element.eleme.cn/#/zh-CN/component/select>

```
<template>
  <el-select v-model="value" placeholder="请选择" size="medium" style="width:100%;">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
  export default {
    data() {
      return {
        options: [{
          value: '黄金糕',
          label: '黄金糕'
        }, {
          value: '双皮奶',
          label: '双皮奶'
        }, {
          value: '蚵仔煎',
          label: '蚵仔煎'
        }, {
          value: '龙须面',
          label: '龙须面'
        }, {
          value: '北京烤鸭',
          label: '北京烤鸭'
        }],
        value: ''
      }
    }
  }
</script>
```

# Select 选择器（可搜索）

<https://element.eleme.cn/#/zh-CN/component/select>

```
<template>
  <el-select v-model="value" filterable placeholder="请选择" size="medium" style="width:100%;">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
  export default {
    data() {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
      }
    }
  }
</script>
```

分页

```vue
<!-- 分页 -->
    <div class="block" style="text-align: right;margin-top: 20px;">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[20, 40, 50, 100]" :page-size="20" layout="total, sizes, prev, pager, next, jumper" :total="400">
      </el-pagination>
    </div>
    
    <script>
  export default {
    data() {
      return {
            currentPage: 1
      }
    }
  }
</script>

```

# 请求服务器post