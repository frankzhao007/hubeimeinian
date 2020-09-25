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
								<el-input v-model="dimtext" prefix-icon="el-icon-search" placeholder="输入项目代码或检查项名称" size="small" style="width:80%;margin-left:10px"></el-input>
							</div>
							<div class="sxmmainclass1">
								<el-checkbox-group v-model="selectxmobj.checkList" @change="checkListchange">
									
									<el-checkbox style="min-width:100%;margin:5px 0 0 10px" v-for="item in dimchange" :key="item.ITEM_ID" :label="item.ITEM_ID+' - '+item.SUBITEM_detail_noID"></el-checkbox>
								</el-checkbox-group>
							</div>
						</div>
					</div>
					<div class="sxmclass" style="position: absolute;right: 0%;top: 0%">
						已选项目：
						<div class="sxmmainclass">
							<div class="sxmmainclassdiv" v-for="(item,index) in selectxmobj.checkList1" :key="item.ITEM_ID">
								<div class="sxmmainclassdiv_span">
									{{item.SUBITEM_detail}}
								</div>
								<i @click="delcheckList(item,index)" class="el-icon-circle-close"></i>
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
				default: false
			},
			selectlist: {
				type: Array,
				default: []
			},
			chooseItem: {
				type: Array,
				default: []
			},
			isEditProject: {
				type: Boolean,
				default: false
			},
			isEditCode: {
				type: String,
				default: ""
			}
		},
		data() {
			return {

				ITEM_IDlist: [],
				dimtext: "",
				selectxmobj: {
					isEditProject: false,
					loading: false,
					isshow: false,
					checkList: [],
					chooseItem:[],
					checkList1: [],
					isEditCode:""
				}
			};
		},
		mounted() {
			this.selectxmobj.checkList = [];
			this.selectxmobj.checkList1 = [];
			this.ITEM_IDlist = [];
		},
		watch: {
			"selectxmobj.isshow": {
				handler(nvl, ovl) {
					this.$emit("changeisshow", nvl);
				},
				deep: true,
				immediate: true
			},
			isshow(val) {
				this.selectxmobj.isshow = val;
				if(val) {
					this.ITEM_IDlist = [];
					this.getITEM_IDlist();
				}
			},
			selectlist(val) {
				this.selectxmobj.checkList1 = val;
				console.log(this.selectxmobj.checkList1);
			},
			chooseItem(val) {
				this.selectxmobj.chooseItem = val;
				console.log(this.selectxmobj.chooseItem);
			},
			isEditProject(val) {
				this.selectxmobj.isEditProject = val;
				console.log(this.selectxmobj.isEditProject);
			},
			isEditCode(val) {
				this.selectxmobj.isEditCode = val;
				console.log(this.selectxmobj.isEditCode);
			}
		},
		methods: {
			selectxmobjbtn() {
				this.selectxmobj.checkList = [];
				this.selectxmobj.checkList1.map(item => {
					this.selectxmobj.checkList.push(item.ITEM_ID + " - " + item.ITEM_NAME);
				});
			},
			getITEM_IDlist() {
				console.log(this.isEditProject);
				this.selectxmobj.loading = true;
				this.$network3
					.get("/mnoracle/item/FindITEMS", {
						pageIndex: 1,
						pageSize: 99999
					})
					.then(res => {
						console.log(res);
						if(res.code == 200) {
							var tempRELATED_ITEM=[];
							for (var i = 0; i < res.data.ITEMlist.length;i++){
								const newObj = JSON.parse(JSON.stringify(res.data.ITEMlist[i]));
								tempRELATED_ITEM.push(newObj)
								
								}
							
							for(var i=0;i<tempRELATED_ITEM.length;i++){ 
								   var str="";
								   tempRELATED_ITEM[i].SUBITEM_detail=""
								   tempRELATED_ITEM[i].SUBITEM_detail_noID=""
								   if(tempRELATED_ITEM[i].SUBITEM.length>0){
								   	   for(var j=0;j<tempRELATED_ITEM[i].SUBITEM.length;j++){
                                    
										str +=tempRELATED_ITEM[i].SUBITEM[j].CHECK_ITEM.toString()
										console.log(str);
										 
									 	tempRELATED_ITEM[i].SUBITEM_detail=tempRELATED_ITEM[i].ITEM_ID+'-'+tempRELATED_ITEM[i].ITEM_NAME+'-'+str
									 	tempRELATED_ITEM[i].SUBITEM_detail_noID=tempRELATED_ITEM[i].ITEM_NAME+'-'+str
									 }
								   }else{
								   		tempRELATED_ITEM[i].SUBITEM_detail_noID=tempRELATED_ITEM[i].ITEM_NAME
									 	tempRELATED_ITEM[i].SUBITEM_detail=tempRELATED_ITEM[i].ITEM_ID+'-'+tempRELATED_ITEM[i].ITEM_NAME
								 
								   	
								   }
								
								
							}
							
							console.log(this.selectxmobj.chooseItem);
							console.log(tempRELATED_ITEM);
							console.log(this.isEditCode);
							if(this.isEditCode){
								for(var i=0;i<tempRELATED_ITEM.length;i++){
									 
										 if(this.isEditCode==tempRELATED_ITEM[i].ITEM_ID){
   
									 	 
									 	tempRELATED_ITEM.splice(i,1)
									 }
								}
							}
							console.log(tempRELATED_ITEM);
							console.log(this.selectxmobj.chooseItem);
							if(this.selectxmobj.chooseItem.length>0){
								for(var i=0;i<tempRELATED_ITEM.length;i++){
									for(var j=0;j<this.selectxmobj.chooseItem.length;j++){
										console.log(this.selectxmobj.chooseItem[j].ITEM_ID);
										 if(tempRELATED_ITEM[i].ITEM_ID==this.selectxmobj.chooseItem[j].ITEM_ID){
   
									 	 
									 	tempRELATED_ITEM.splice(i,1)
									 }
									}
									
								}
								
 
								    console.log(tempRELATED_ITEM);
 									this.ITEM_IDlist = tempRELATED_ITEM;
							}else{
 									this.ITEM_IDlist = tempRELATED_ITEM;
							}
							
							
							this.selectxmobj.loading = false;
							
							this.selectxmobjbtn();
						} else {
							this.selectxmobj.loading = false;
							this.ITEM_IDlist = [];
						}
					})
					.catch(err => {
						console.log(err);
					});
			},
			checkListchange(val) {
				console.log(val);
				this.selectxmobj.checkList1 = [];
				val.map(item => {
					this.ITEM_IDlist.map(temp => {
						if(temp.ITEM_ID == item.split(" - ")[0]) {
							this.selectxmobj.checkList1.push(temp);
						}
					});
				});
			},
			delcheckList(item, index) {
				this.selectxmobj.checkList1.splice(index, 1);
				console.log(item);
				this.selectxmobj.checkList.map((row, index1) => {
					if(row == item.ITEM_ID + " - " + item.ITEM_NAME) {
						this.selectxmobj.checkList.splice(index1, 1);
					}
				});
			},
			confirmselectpackage() {
				console.log("确认", this.selectxmobj.checkList1);
				this.$emit("confirmselectpackage", this.selectxmobj.checkList1);
				this.selectxmobj.isshow = false;
			}
		},
		computed: {
			dimchange() {
				console.log(this.isEditProject)
				//    if (this.dimtext) {
				//      return this.ITEM_IDlist.filter(item => {
				//        if (
				//          item.ITEM_ID.indexOf(this.dimtext) >= 0 ||
				//          item.ITEM_NAME.indexOf(this.dimtext) >= 0
				//        ) {
				//          console.log(item.ITEM_ID);
				//          console.log(item.ITEM_NAME);
				//          return item;
				//        }
				//      });
				//    } else {
				//      return this.ITEM_IDlist;
				//    }
				if(this.isEditProject) {
						console.log(this.selectxmobj.checkList1)
					console.log(this.ITEM_IDlist)
					if(this.dimtext) {
						return this.ITEM_IDlist.filter(item => {
							if(
								item.ITEM_ID.indexOf(this.dimtext) >= 0 ||
								item.ITEM_NAME.indexOf(this.dimtext) >= 0
							) {
								console.log(item.ITEM_ID);
								console.log(item.ITEM_NAME);
								return item;
							}
						});
					} else {
						console.log(this.ITEM_IDlist)
						return this.ITEM_IDlist;
					}
					console.log(this.selectxmobj.checkList1)
				} else {
					console.log(this.ITEM_IDlist)
					console.log(this.selectxmobj.checkList1)
					console.log(this.selectxmobj.checkList)
					if(this.selectxmobj.checkList1.length>0){
					   this.ITEM_IDlist.forEach((item, index) => {
						this.selectxmobj.checkList1.forEach((itm, idx) => {
							if(item.ITEM_ID == itm.ITEM_ID) {

								this.ITEM_IDlist.splice(index, 1)
							}

						})
					});
					
					return this.ITEM_IDlist;
					}else{
						if(this.dimtext) {
						return this.ITEM_IDlist.filter(item => {
							if(
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
						
					}
					
					
				}
			}
		}
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