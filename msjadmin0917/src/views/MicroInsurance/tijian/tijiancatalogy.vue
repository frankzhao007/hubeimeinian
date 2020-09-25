<template>
	<div>
		<el-row>
			<el-col :span="2.5" style="margin-top: 4px;">
				<div class="grid_lable">一级类别：</div>
			</el-col>
			<el-col :span="4">
				<div class="grid_content">
					<el-select v-model="selecttype" placeholder="请选择" size="medium" style="width:100%;" clearable>
						<el-option v-for="item in projectTypeoptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</div>
			</el-col>
		</el-row>

		<!-- 按钮 -->
		<el-row style="margin-top: 10px;">
			<div class="inquire">
				<!--<el-col :span="4" style="float: right;">
					<el-button class="grid_button" type="primary" size="medium" icon="el-icon-plus" @click="AddProjectTypeBtn()">新增项目类别</el-button>
				</el-col>-->
				<el-col :span="3" style="float: right;">
					<el-button class="grid_button" type="primary" size="medium" icon="el-icon-search" @click="queryCheckDir()">搜索</el-button>
				</el-col>
			</div>
		</el-row>

		<!-- 表格 -->
		<div>
			<el-table :data="projectTypeList" style="width: 100%;" size="medium">
				<el-table-column label="一级类别" width="200px">
					<template slot-scope="scope">
						<span>{{ scope.row.checktypefirst }}</span>
					</template>
				</el-table-column>
				<el-table-column label="二级类别">
					<template slot-scope="scope">
						<el-button v-if="!scope.row.checksec||scope.row.checksec.length==0" type="text" @click="AddSecondTypeBtn(scope.row.checkid)">编辑</el-button>
						<div class="alinehidden_tiajiancatalogy" v-else>
							<el-button type="text" @click="AddSecondTypeBtn(scope.row.checkid)">{{ tostringcheck(scope.row.checksec) }}</el-button>
						</div>
					</template>
				</el-table-column>
				<el-table-column label="备注">
					<template slot-scope="scope">
						<span>{{ scope.row.checkattention }}</span>
					</template>
				</el-table-column>
				<!--<el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button :disabled="!Clickable.edit" size="small" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button :disabled="!Clickable.delete" size="small" type="danger" @click="DeleteFirstTypeBtn(scope.row.checkid)">删除</el-button>
          </template>
        </el-table-column>-->
			</el-table>
		</div>

		<!-- 新建/编辑一级类别 弹窗 -->
		<el-dialog :visible.sync="ProjectTypePop.isshow" width="500px">
			<el-form size="medium" status-icon :model="ProjectTypePop.ProjectType" :rules="ProjectTypePop.ProjectTyperRules" label-width="120px" ref="ProjectTypePop" style="margin-top:20px">
				<el-form-item label="一级类别：" prop="ProjectType_Name">
					<el-input v-model="ProjectTypePop.ProjectType.ProjectType_Name" style="width:250px" maxlength="10" placeholder="最多可输入10个汉字"></el-input>
				</el-form-item>
				<el-form-item label="备注：" prop="ProjectType_Msgs">
					<el-input type="textarea" show-word-limit v-model="ProjectTypePop.ProjectType.ProjectType_Msg" maxlength="20" placeholder="最多可输入20个汉字" style="width:250px"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
        <el-button @click="ProjectTypePop.isshow = false">取 消</el-button>
        <el-button v-if="ProjectTypePop.isedit" type="primary" @click="EditProjectTypePopBtn()">确 定</el-button>
        <el-button v-else type="primary" @click="AddProjectTypePopBtn()">确 定</el-button>
      </span>
		</el-dialog>

	</div>
</template>

<script>
	export default {
		name: "categorylist",
		components: {},
		watch: {},
		data() {
			return {
				//  新建/编辑一级类别弹窗属性
				editcheckid: "",
				ProjectTypePop: {
					isshow: false,
					isedit: false,
					ProjectType: {
						ProjectType_Name: "",
						ProjectType_Msg: ""
					},
					ProjectTyperRules: {
						ProjectType_Name: [{
								required: true,
								message: "请填写一级类别",
								trigger: "blur"
							},
							{
								min: 1,
								max: 10,
								message: "长度在 1 到 10 个字符",
								trigger: "blur"
							}
						]
					}
				},
				projectTypeList: [],
				projectTypeoptions: [],
				selecttype: "全部",

			};
		},
		mounted() {
			this.queryCheckDir();
			this.GetAllTypelist();
		},
		methods: {
			//二级类别名称合并
			tostringcheck(row) {
				console.log(row);
				var arrayrow = [];
				for(let i = 0; i < row.length; i++) {
					arrayrow.push(row[i].checktypesec);
				}
				return arrayrow.join("，");
			},
			//新增项目类别确认按钮
			AddProjectTypePopBtn() {
				this.$refs["ProjectTypePop"].validate(valid => {
					if(valid) {} else {
						console.log("error submit!!");
						return false;
					}
				});
				if(!this.ProjectTypePop.ProjectType.ProjectType_Name) {
					this.$message.error("请输入一级类别名称");
					return;
				}
				var body = {
					checktypefirst: this.ProjectTypePop.ProjectType.ProjectType_Name,
					checkattention: this.ProjectTypePop.ProjectType.ProjectType_Msg
				};
				this.$api
					.post("/manage/insertCheckDir", body)
					.then(res => {
						console.log(res);
						if(res.code == "200") {
							this.$message({
								message: "成功添加一级类别",
								type: "success"
							});
							this.ProjectTypePop.isshow = false;
							this.queryCheckDir();
						}
					})
					.catch(res => {
						console.log(res);
						this.$message.error(res.msg);
					});
			},
			//编辑二级类别
			AddSecondTypeBtn(row) {
				console.log(row);
				this.$router.push(
					"/vbmedicalexamination/secondProjectAdd?checkid=" + row
				);
			},
			//新增项目类别按钮
			AddProjectTypeBtn() {
				console.log("新增");
				this.ProjectTypePop.ProjectType = {
					ProjectType_Name: "",
					ProjectType_Msg: ""
				};
				this.ProjectTypePop.isshow = true;
				this.ProjectTypePop.isedit = false;
			},
			//查询项目类别
			queryCheckDir() {
				var body = {
					checktypefirst: this.selecttype
				};
				this.$api.post("/manage/queryCheckDir", body).then(res => {
					console.log(res);
					if(res.code == "200") {
						this.projectTypeList = res.data;
					}
				});
			},
			//获取所有项目类别
			GetAllTypelist() {
				this.projectTypeoptions = [{
					value: "全部",
					label: "全部"
				}];
				var body = {
					checktypefirst: ""
				};
				this.$api.post("/manage/queryCheckDir", body).then(res => {
					console.log(res);
					if(res.code == "200") {
						for(let i = 0; i < res.data.length; i++) {
							let item = {
								value: res.data[i].checktypefirst,
								label: res.data[i].checktypefirst
							};
							this.projectTypeoptions.push(item);
						}
						console.log(this.projectTypeoptions);
					}
				});
			},
		},
		computed: {

		}
	};
</script>

<style>
	.inquire {
		/*float: right;*/
		min-width: 1100px;
		margin-bottom: 20px;
		font-size: 14px;
		overflow: hidden;
	}
	
	.alinehidden_tiajiancatalogy {
		text-align: left;
		/*width: 900px;*/
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.el-button--text {
		max-width: 100%;
		overflow: hidden;
		/*超出部分隐藏*/
		white-space: nowrap;
		/*让文本强制在一行不换行*/
		text-overflow: ellipsis;
		/*显示省略号来代表被修剪的文本*/
	}
</style>