<template>
	<div style="margin:30px">
		<div style="font-size:20px">
			<i @click="gotoback" class="el-icon-my-back backbtn"></i><span>&nbsp&nbsp&nbsp新增/编辑项目</span>
		</div>
		<div style="margin-top:20px">
			<el-form :model="projectmsgobj" label-position='right' label-width="150px" size="medium">
				<el-form-item label="* 项目代码：">
					<el-input v-model="projectmsgobj.ITEM_ID" placeholder="请填写" style="width:200px" clearable></el-input>
				</el-form-item>
				<el-form-item label="* 项目名称：">
					<el-input v-model="projectmsgobj.ITEM_NAME" placeholder="请填写" style="width:200px"></el-input>
				</el-form-item>
				<!--* 指标代码changToWord(index+1)-->
				<div style=" ">
				<div v-if="projectmsgobj.SUBITEM.length==1" style="margin-right: 15px; float: left;margin-bottom: 20px" v-for="(item,index) in projectmsgobj.SUBITEM">
					<div style="width:350px;margin-right: 15px; float: left;">
							<el-form-item :label="'* 指标代码'+' '+changToWord(index+1)+':'">
							<el-input v-model="item.CHECK_ID" placeholder="请填写" style="width:200px"></el-input>
							</el-form-item>
							<el-form-item :label="'* 明细指标名称'+' '+changToWord(index+1)+':'">
								<el-input v-model="item.CHECK_ITEM" placeholder="请填写" style="width:200px"></el-input>
							</el-form-item>
					</div>		
				  
				</div>
				<div v-if="projectmsgobj.SUBITEM.length>1" style="margin-right: 15px; float: left;margin-bottom: 20px;" v-for="(item,index) in projectmsgobj.SUBITEM">
					<div style="width:350px;margin-right: 15px; float: left;">
							<el-form-item :label="'* 指标代码'+' '+changToWord(index+1)+':'">
							<el-input v-model="item.CHECK_ID" placeholder="请填写" style="width:200px"></el-input>
							</el-form-item>
							<el-form-item :label="'* 明细指标名称'+' '+changToWord(index+1)+':'">
								<el-input v-model="item.CHECK_ITEM" placeholder="请填写" style="width:200px"></el-input>
							</el-form-item>
					</div>		
					<div @click="decreaseItem(index)"   style="cursor:pointer;border-radius:2px;width: 30px;height: 30px;background: #BC1E21;color: #FFFFFF;line-height: 30px;text-align: center;font-size: 26px;float: left;">-</div>
				</div>
				
				</div>
				<!--v-if="projectmsgobj.SUBITEM.length>0"-->
				<div v-if="projectmsgobj.SUBITEM.length>0" @click="addItem" style="cursor:pointer;border-radius:2px;width: 30px;height: 30px;background: #2299DD;color: #FFFFFF;line-height: 30px;text-align: center;font-size: 26px;float: left;">+</div>
				<div style="clear: both;"></div>
				<el-form-item label="* 成本系数：">
					<el-input v-model="projectmsgobj.DRCC" placeholder="请填写" style="width:200px"></el-input>
				</el-form-item>
				<el-form-item label="* 性别：">
					<el-select v-model="projectmsgobj.XB" placeholder="" style="width:200px">
						<el-option label="男" value="1"></el-option>
						<el-option label="女" value="0"></el-option>
						<el-option label="全部" value="3"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="* 婚否：">
					<el-select v-model="projectmsgobj.HYZK" placeholder="" style="width:200px">
						<el-option label="已婚" value="01"></el-option>
						<el-option label="未婚" value="02"></el-option>
						<el-option label="通用" value="03"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="* 价格：">
					<el-input v-model="projectmsgobj.PRICE" placeholder="请填写" style="width:200px"></el-input>
				</el-form-item>
				<el-form-item label="* 生效时间：">
					<el-input v-model="effectiveTime" placeholder="0000-00-00" style="width:200px" @input="effectiveTimeinput"></el-input>
				</el-form-item>
				<el-form-item label="* 结束时间：">
					<el-input v-model="endTime" placeholder="0000-00-00" style="width:200px" @input="endTimeinput"></el-input>
				</el-form-item>
				<el-form-item label="意义：">
					<el-input type="textarea" v-model="projectmsgobj.SIGNIFICANCE" placeholder="请填写" style="width:600px"></el-input>
				</el-form-item>
				<el-form-item label="关联项目：">
					<el-button type="primary" @click="selectglbtn()">选择关联项目</el-button>
					<el-table :data="projectmsgobj.RELATED_ITEM" style="width: 100%">
						<el-table-column prop="ITEM_ID" label="项目代码"></el-table-column>
						<el-table-column prop="ITEM_NAME" label="项目名称"></el-table-column>
						<!--<el-table-column prop="CHECK_ITEM" label="所属检查项"></el-table-column>-->
						<el-table-column prop="XB" label="性别">
							<template slot-scope="scope">
								{{sexchange(scope.row.XB) }}
							</template>
						</el-table-column>
						<el-table-column prop="HYZK" label="婚否">
							<template slot-scope="scope">
								{{HYZKchange(scope.row.HYZK) }}
							</template>
						</el-table-column>
						<el-table-column prop="SIGNIFICANCE" label="意义" show-overflow-tooltip></el-table-column>
						<el-table-column prop="PRICE" label="价格"></el-table-column>
						<el-table-column prop="date" label="操作">
							<template slot-scope="scope">
								<el-button type="text" size="mini" @click="delprojectitem(scope.$index)">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
				</el-form-item>
				<el-form-item label="互斥项目：">
					<el-button type="primary" @click="selecthcbtn()">选择互斥项目</el-button>
					<el-table :data="projectmsgobj.MUTEX_ITEM" style="width: 100%">
						<el-table-column prop="ITEM_ID" label="项目代码"></el-table-column>
						<el-table-column prop="ITEM_NAME" label="项目名称"></el-table-column>
						<!--<el-table-column prop="CHECK_ITEM" label="所属检查项"></el-table-column>-->
						<el-table-column prop="XB" label="性别">
							<template slot-scope="scope">
								{{sexchange(scope.row.XB) }}
							</template>
						</el-table-column>
						<el-table-column prop="HYZK" label="婚否">
							<template slot-scope="scope">
								{{HYZKchange(scope.row.HYZK) }}
							</template>
						</el-table-column>
						<el-table-column prop="SIGNIFICANCE" label="意义" show-overflow-tooltip></el-table-column>
						<el-table-column prop="PRICE" label="价格"></el-table-column>
						<el-table-column prop="date" label="操作">
							<template slot-scope="scope">
								<el-button type="text" size="mini" @click="delprojectitem1(scope.$index)">删除</el-button>
							</template>
						</el-table-column>
					</el-table>
				</el-form-item>
			</el-form>
		</div>
		<div style="height:40px">
			<div style="float:right">
				<el-button @click="gotoback">取 消</el-button>
				<!--<el-button type="primary" @click="">保存草稿</el-button>-->
				<el-button type="primary" @click="setUpITEM">保存上传</el-button>
			</div>
		</div>

		<SelectItemProject :isshow="isshowselectItem" :isEditCode="isEditCode" :isEditProject="isEditProject" :chooseItem="chooseItem" :selectlist="selectlist" @changeisshow="listenST" @confirmselectpackage="confirmselectpackage"></SelectItemProject>
	</div>
</template>
<script>
	import SelectItemProject from "./component/SelectItemProject";
	export default {
		components: {
			SelectItemProject
		},
		data() {
			return {
				isEditCode:"",
				isEditProject:true,
				effectiveTimeShow: false,
				effectiveTimeLastLegth:0,
				endTimeShow: false,
				endTimeLastLegth:0,

				effectiveTime: '',
				endTime: '',
				isadd: false,
				projectmsgobj: {
					targetCode:'',
//					effectiveTime: '',
//					endTime: '',
					MSJID: "",
					CHECK_ITEM: "",
					CREATETIME: "",
					DRCC: "",
					HEAT: "",
					HYZK: "",
					ITEM_ID: "",
					ITEM_NAME: "",
					MUTEX_ITEM: [], //互斥项
					PRICE: "",
					RELATED_ITEM: [],//关联项
					SERIALNUMBER: "",
					SIGNIFICANCE: "",
					XB: "",
					SUBITEM:[{
						CHECK_ITEM:'',
						CHECK_ID:''
					} ]
					
				},
				isshowselectItem: false,
				selectlist: [],
				chooseItem:[],
				tag: "",
				ischange: false
			};
		},
		computed: {
			newName() {
				return this.projectmsgobj.effectiveTime;
			}

		},
		watch: {
			effectiveTime(val) {
				console.log(val)
				console.log(this.effectiveTime)
				this.effectiveTime = val;
			}
		},
		mounted() {
			console.log(this.$route.query.isadd);
			if(this.$route.query.isadd == "true") {
				this.isadd = true;
				this.ischange = false;
			} else {
				this.isadd = false;
				this.projectmsgobj.MSJID = this.$route.query.MSJID;
				this.FindOneItem();
			}
		},
		methods: {
			decreaseItem(index){
				this.projectmsgobj.SUBITEM.splice(index,1)
				
			},
			addItem(){
				
				this.projectmsgobj.SUBITEM.push({
					CHECK_ITEM:'',
					CHECK_ID:''
				})
			},
			changToWord(section) {
                var chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
                var chnUnitSection = ["", "万",  "亿", "万亿",  "亿亿"];
                var chnUnitChar = ["", "十", "百", "千"];
                var strIns = '',
                    chnStr = '';
                var unitPos = 0;
                var zero = true;
                console.log(section)
                if(section>9&&section<=19){
                   var chnStrTemp=""
                  while(section > 0) {
                    var v = section % 10;
                    if(v === 0) {
                        if(!zero) {
                            zero = true;
                            chnStr =  chnNumChar[v] + chnStr;
                            console.log(chnStr)
                        }
                    }
                    else {
                       
                            zero = false;
                            console.log(section)
                        strIns = chnNumChar[v];
                        strIns +=  chnUnitChar[unitPos];
                        console.log(strIns)
                        console.log(chnStr)
                        chnStr = strIns +  chnStr;
                        console.log(chnStr)
                        console.log(chnStr.length)
                        var str=chnStr.substr(0,1)
                        var  str1=chnStr.substr(1,chnStr.length)
                        
                        console.log(str1)
                        chnStrTemp=str1
                        console.log(chnStr)
                         
                    }
                    unitPos++;
                    section = Math.floor(section  / 10);
                }
                  chnStr=chnStrTemp
                }else{
                   while(section > 0) {
                    var v = section % 10;
                    if(v === 0) {  
                        if(!zero) {
                            zero = true;
                            chnStr =  chnNumChar[v] + chnStr;
                            console.log(chnStr)
                        }
                    }
                    else {
                            zero = false;
                            console.log(section)
                        strIns = chnNumChar[v];
                        strIns +=  chnUnitChar[unitPos];
                        chnStr = strIns +  chnStr;
                        console.log(chnStr)
                        
                    }
                    unitPos++;
                    section = Math.floor(section  / 10);
                }
                  
                }
                
                console.log(chnStr)
                return chnStr;
            },
			endTimeinput(e){
				var endTime= this.endTime;
		        var eTemp=e
		        console.log(this.endTimeLastLegth)
				console.log(endTime.length)
		        if(this.endTimeLastLegth<endTime.length){
		        	this.endTimeShow = false
		        }else{
		        	this.endTimeShow = true
		        }
				console.log(e)
				console.log(this.endTimeShow)
				console.log(e.length)
 				
				if(this.endTimeShow == false) {
					if(e.length == 5) {
						this.endTime = this.endTime.substring(0, 4) + "-";

					} else if(e.length == 8) {
						var temp=e;
						console.log(88888888888888)
						this.endTime = temp.substring(0, 4) + "-"+temp.substring(5, 7)+ "-";
					} else if(e.length >=10) {
						this.endTime = this.endTime.substring(0, 4) + "-"+this.endTime.substring(5, 7)+ "-"+this.endTime.substring(8, 10);
					    if(Number(this.effectiveTime.substring(8, 10))>31){
							this.effectiveTime = this.effectiveTime.substring(0, 4) + "-"+this.effectiveTime.substring(5, 7)+ "-"
						}
					}

				} else {
					console.log(e.length)
					if(e.length==8){
					//this.effectiveTime=this.effectiveTime.substring(0,7)
					}
					if(e.length==5){
					// this.effectiveTime=this.effectiveTime.substring(0,4)
					}

				}
				if(e.length > 10) {
					// this.effectiveTimeShow = true
					this.endTime = e.substring(0, 10)
					if(Number(this.effectiveTime.substring(8, 10))>31){
							this.effectiveTime = this.effectiveTime.substring(0, 4) + "-"+this.effectiveTime.substring(5, 7)+ "-"
						}
				}
				this.endTimeLastLegth=this.endTime.length
				console.log(e)
				console.log(this.endTime)
				
			},
			effectiveTimeinput(e) {
		        var effectiveTime= this.effectiveTime;
		        var eTemp=e
		        console.log(this.effectiveTimeLastLegth)
						console.log(effectiveTime.length)
		        if(this.effectiveTimeLastLegth<effectiveTime.length){
		        	this.effectiveTimeShow = false
		        }else{
		        	this.effectiveTimeShow = true
		        }
				console.log(e)
				console.log(this.effectiveTimeShow)
				console.log(e.length)
				
				 
				if(this.effectiveTimeShow == false) {
					console.log(this.effectiveTime)
					console.log(e.length)
					console.log(this.effectiveTime.substring(4, 5))
					if(e.length == 5) {
						this.effectiveTime = this.effectiveTime.substring(0, 4) + "-"+this.effectiveTime.substring(4, 5);

					} else if(e.length == 8) {
						var temp=e;
						console.log(88888888888888)
						this.effectiveTime = temp.substring(0, 4) + "-"+temp.substring(5, 7)+ "-"+temp.substring(7, 8);
						if(Number(this.effectiveTime.substring(5, 7))>12){
							this.effectiveTime = temp.substring(0, 4)+ "-"
						}
					} else if(e.length >=10) {
						console.log(88888888888888)
						this.effectiveTime = this.effectiveTime.substring(0, 4) + "-"+this.effectiveTime.substring(5, 7)+ "-"+this.effectiveTime.substring(8, 10);
					   if(Number(this.effectiveTime.substring(8, 10))>31){
							this.effectiveTime = this.effectiveTime.substring(0, 4) + "-"+this.effectiveTime.substring(5, 7)+ "-"
						}
					}

				} else {
					console.log(e.length)
					if(e.length==8){
					// this.effectiveTime=this.effectiveTime.substring(0,7)
					}
					if(e.length==5){
					// this.effectiveTime=this.effectiveTime.substring(0,4)
					}
   

				}
				if(e.length > 10) {
					console.log(this.effectiveTime)
					// this.effectiveTimeShow = true
					this.effectiveTime = e.substring(0, 10)
					if(Number(this.effectiveTime.substring(8, 10))>31){
						 this.effectiveTime = this.effectiveTime.substring(0, 4) + "-"+this.effectiveTime.substring(5, 7)+ "-"
						}
				}
					this.effectiveTimeLastLegth=this.effectiveTime.length
					console.log(e)
					console.log(this.effectiveTime)

			},
			delprojectitem(index) {
				console.log(index);
				this.projectmsgobj.RELATED_ITEM.splice(index, 1);
			},
			delprojectitem1(index) {
				console.log(index);
				this.projectmsgobj.MUTEX_ITEM.splice(index, 1);
			},
			confirmselectpackage(data) {
				console.log(data);
				console.log(this.tag);
				if(this.tag == "gl") {
					this.projectmsgobj.RELATED_ITEM = data;
				}
				if(this.tag == "hc") {
					this.projectmsgobj.MUTEX_ITEM = data;
				}
			},
			listenST(data) {
				console.log(data);
				this.isshowselectItem = data;
			},
			selectglbtn() {
				 console.log(this.projectmsgobj.RELATED_ITEM);
				 console.log(this.projectmsgobj.MUTEX_ITEM);

				this.chooseItem=this.projectmsgobj.MUTEX_ITEM;
				this.selectlist = this.projectmsgobj.RELATED_ITEM;
				console.log(this.projectmsgobj.RELATED_ITEM);
				this.isshowselectItem = true;
				this.tag = "gl";
				console.log(this.selectlist)
			},
			selecthcbtn() {
				console.log(this.selectlist)
				console.log(this.projectmsgobj.MUTEX_ITEM);
				console.log(this.projectmsgobj.RELATED_ITEM);
				this.chooseItem=this.projectmsgobj.RELATED_ITEM;
				this.selectlist = this.projectmsgobj.MUTEX_ITEM;
				this.isshowselectItem = true;
				this.tag = "hc";
				console.log(this.selectlist)
			},
			verify() {
				var that=this;
				if(!this.projectmsgobj.ITEM_ID) {
					this.$message({
						message: '请输入项目代码',
						type: 'warning'
					});
					return false;
				}
				if(!this.projectmsgobj.ITEM_NAME) {
					this.$message({
						message: '请输入项目名称',
						type: 'warning'
					});
					return false;
				}
//				if(!this.projectmsgobj.targetCode) {
//					this.$message({
//						message: '请输入指标代码',
//						type: 'warning'
//					});
//					return false;
//				}
				if(this.projectmsgobj.SUBITEM.length>0){
				 
					for(var i=0;i<this.projectmsgobj.SUBITEM.length;i++){
						if(!this.projectmsgobj.SUBITEM[i].CHECK_ITEM){
							var index=that.changToWord(i+1)
							this.$message({
							message: '请输入明细指标名称'+index,
							type: 'warning'
						});
						 
						return false;
						}
						if(!this.projectmsgobj.SUBITEM[i].CHECK_ID){
							var index=that.changToWord(i+1)
							this.$message({
							message: '请输入指标代码'+index,
							type: 'warning'
						});
				 
						return false;
						}
					}
					 
				}
//				if(!this.projectmsgobj.targetName) {
//					this.$message({
//						message: '请输入明细指标名称',
//						type: 'warning'
//					});
//					return false;
//				}
				if(!this.projectmsgobj.DRCC) {
					this.$message({
						message: '请输入成本系数',
						type: 'warning'
					});
					return false;
				}
				if(!this.projectmsgobj.XB) {
					this.$message({
						message: '请输入性别',
						type: 'warning'
					});
					return false;
				}
				if(!this.projectmsgobj.HYZK) {
					this.$message({
						message: '请输入婚姻状况',
						type: 'warning'
					});
					return false;
				}
				if(!this.projectmsgobj.PRICE) {
					this.$message({
						message: '请输入价格',
						type: 'warning'
					});
					return false;
				}

			},

			saveitem() {},
			setUpITEM() {
				var verifyJudge = this.verify();
				if(verifyJudge == false) {
					return;
				}

				if(this.isadd) {
					//新增时
					var body = {
//						targetName:this.projectmsgobj.targetName,
//						targetCode:this.projectmsgobj.targetCode,
						effectiveTime:this.effectiveTime,
						endTime:this.endTime,
						CHECK_ITEM: this.projectmsgobj.CHECK_ITEM,
						DRCC: this.projectmsgobj.DRCC,
						HYZK: this.projectmsgobj.HYZK,
						ITEM_ID: this.projectmsgobj.ITEM_ID,
						ITEM_NAME: this.projectmsgobj.ITEM_NAME,
						MUTEXS: [], //互斥项
						PRICE: Number(this.projectmsgobj.PRICE),
						RELATEDS: [], //关联项
						// SERIALNUMBER: this.projectmsgobj.SERIALNUMBER,
						SIGNIFICANCE: this.projectmsgobj.SIGNIFICANCE,
						XB: this.projectmsgobj.XB,
						SUBITEM:this.projectmsgobj.SUBITEM
					};
					this.projectmsgobj.MUTEX_ITEM.map(item => {
						body.MUTEXS.push(item.ITEM_ID);
					});
					this.projectmsgobj.RELATED_ITEM.map(item => {
						body.RELATEDS.push(item.ITEM_ID);
					});
				} else {
					//编辑时
					var body = {
//						targetName:this.projectmsgobj.targetName,
//						targetCode:this.projectmsgobj.targetCode,
						effectiveTime:this.effectiveTime,
						endTime:this.endTime,
						MSJID: this.projectmsgobj.MSJID,
						CHECK_ITEM: this.projectmsgobj.CHECK_ITEM,
						CREATETIME: this.projectmsgobj.CREATETIME,
						DRCC: this.projectmsgobj.DRCC,
						HEAT: this.projectmsgobj.HEAT,
						HYZK: this.projectmsgobj.HYZK,
						ITEM_ID: this.projectmsgobj.ITEM_ID,
						ITEM_NAME: this.projectmsgobj.ITEM_NAME,
						MUTEXS: [], //互斥项
						PRICE: Number(this.projectmsgobj.PRICE),
						RELATEDS: [], //关联项
						SERIALNUMBER: this.projectmsgobj.SERIALNUMBER,
						SIGNIFICANCE: this.projectmsgobj.SIGNIFICANCE,
						XB: this.projectmsgobj.XB,
						SUBITEM:this.projectmsgobj.SUBITEM
					};
					console.log(this.projectmsgobj.MUTEX_ITEM);
					console.log(this.projectmsgobj.RELATED_ITEM);

					this.projectmsgobj.MUTEX_ITEM.map(item => {
						body.MUTEXS.push(item.ITEM_ID);
					});
					this.projectmsgobj.RELATED_ITEM.map(item => {
						body.RELATEDS.push(item.ITEM_ID);
					});
				}
				this.$network3
					.post("/mnoracle/item/UpITEM", body)
					.then(res => {
						console.log(res);
						if(res.code == 200) {
							this.$message.success("保存成功！");
							this.$router.go(-1);
						} else {
							this.$message.error(err.msg);
						}
					})
					.catch(err => {
						console.log(err);
						this.$message.error(err.msg);
					});
			},
			FindOneItem() {
				this.$network3
					.get("/mnoracle/item/FindOneItem", {
						MSJID: this.projectmsgobj.MSJID
					})
					.then(res => {
						console.log(res);
						if(res.code == 200) {
							this.projectmsgobj = res.data;
							this.effectiveTime= res.data.effectiveTime;
							this.isEditCode=res.data.ITEM_ID;
				      this.endTime= res.data.endTime;
 
							setTimeout(() => {
								this.ischange = false;
								console.log("-----------------");
							}, 100);
						} else {
							this.$message.error(err.msg);
						}
					})
					.catch(err => {
						console.log(err);
						this.$message.error(err.msg);
					});
			},
			sexchange(xb) {
				switch(xb) {
					case "0":
						return "女";
						break;
					case "1":
						return "男";
						break;
					case "3":
						return "全部";
						break;
					default:
						break;
				}
			},
			HYZKchange(HYZK) {
				switch(HYZK) {
					case "01":
						return "已婚";
						break;
					case "02":
						return "未婚";
						break;
					case "03":
						return "通用";
						break;
					default:
						break;
				}
			},
			gotoback() {
				if(this.ischange) {
					console.log("++++++++++++++++++");
					this.$confirm("您还未保存，离开将不保存该数据", "提示", {
							confirmButtonText: "确认",
							cancelButtonText: "取消",
							type: "warning"
						})
						.then(() => {
							this.$router.go(-1);
						})
						.catch(() => {});
				} else {
					this.$router.go(-1);
				}
			}
		},
		watch: {
			//     CHECK_ITEM
			// DRCC
			// HYZK
			// ITEM_ID
			// ITEM_NAME
			// MUTEX_ITEM
			// PRICE
			// RELATED_ITEM
			// SIGNIFICANCE
			// XB
			"projectmsgobj.CHECK_ITEM": {
				handler(nvl, ovl) {
					console.log(nvl);
					this.ischange = true;
				},
				deep: true,
				immediate: false
			},
			"projectmsgobj.DRCC": {
				handler(nvl, ovl) {
					console.log(nvl);
					this.ischange = true;
				},
				deep: true,
				immediate: false
			},
			"projectmsgobj.HYZK": {
				handler(nvl, ovl) {
					console.log(nvl);
					this.ischange = true;
				},
				deep: true,
				immediate: false
			},
			"projectmsgobj.ITEM_ID": {
				handler(nvl, ovl) {
					console.log(nvl);
					this.ischange = true;
				},
				deep: true,
				immediate: false
			},
			"projectmsgobj.ITEM_NAME": {
				handler(nvl, ovl) {
					console.log(nvl);
					this.ischange = true;
				},
				deep: true,
				immediate: false
			},
			"projectmsgobj.MUTEX_ITEM": {
				handler(nvl, ovl) {
					console.log(nvl);
					this.ischange = true;
				},
				deep: true,
				immediate: false
			},
			"projectmsgobj.PRICE": {
				handler(nvl, ovl) {
					console.log(nvl);
					this.ischange = true;
				},
				deep: true,
				immediate: false
			},
			"projectmsgobj.RELATED_ITEM": {
				handler(nvl, ovl) {
					console.log(nvl);
					this.ischange = true;
				},
				deep: true,
				immediate: false
			},
			"projectmsgobj.SIGNIFICANCE": {
				handler(nvl, ovl) {
					console.log(nvl);
					this.ischange = true;
				},
				deep: true,
				immediate: false
			},
			"projectmsgobj.XB": {
				handler(nvl, ovl) {
					console.log(nvl);
					this.ischange = true;
				},
				deep: true,
				immediate: false
			}
		},

	};
</script>
<style lang="scss">
	.el-tooltip__popper {
		font-size: 14px;
		max-width: 30%
	}
	/*设置显示隐藏部分内容，按50%显示*/
</style>