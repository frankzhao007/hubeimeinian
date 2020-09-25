<template>
	<div class="app-container">
		<div class="goodsmsgtitle">
			<i @click="goback()" class="el-icon-my-back backbtn"></i><span>&nbsp&nbsp&nbsp商品详情</span>
		</div>
		<el-form :inline="true" size="medium" status-icon :model="AddGoodsmsg" :rules="AddGoodsmsgrules" label-width="120px" ref="AddGoodsmsg" style="margin-top:30px" :disabled="$route.query.look">
			<el-form-item label="商品类型：" prop="AddGoodsType">
				<el-select v-model="AddGoodsmsg.AddGoodsType" placeholder="请选择商品类型" style="width:200px" disabled>
					<el-option label="体检套餐" value="体检套餐"> </el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="分公司：" prop="Filiale">
				<el-select v-model="AddGoodsmsg.Filiale" placeholder="请选择分公司" style="width:200px" disabled>
					<el-option label="" value=""> </el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="商品名称：" prop="AddGoodsName">
				<el-input v-model="AddGoodsmsg.AddGoodsName" placeholder="商品名称最多20字" style="width:200px" maxlength="20"></el-input>
			</el-form-item>
			<div></div>
			<el-form-item label="商品ID：" prop="AddGoodsID">
				<el-input v-model="AddGoodsmsg.AddGoodsID" style="width:200px" disabled placeholder="点击确认后自动生成"></el-input>
			</el-form-item>
			<el-form-item label="套餐原价：" prop="AddGoodsPrice">
				<el-input v-model="AddGoodsmsg.AddGoodsPrice" style="width:200px" placeholder="请输入0 ~ 1000000正整数" @input="AddGoodsPriceinput()" maxlength="7" @change="AddGoodsPricechange()"></el-input>
			</el-form-item>

			<el-form-item label="适用性别：" prop="sex">
				<el-select v-model="AddGoodsmsg.sex" placeholder="请选择性别" style="width:200px">
					<el-option label="通用" value="通用"> </el-option>
					<el-option label="男" value="男"> </el-option>
					<el-option label="女" value="女"> </el-option>
				</el-select>
			</el-form-item>
			<!-- <el-form-item label="最低价：" prop="AddGoodsMiniprice">
        <el-input v-model="AddGoodsmsg.AddGoodsMiniprice" style="width:200px" placeholder="请先填写售价" @input="AddGoodsMinipriceinput()" maxlength="7" :disabled="AddGoodsmsg.AddGoodsPrice==null||AddGoodsmsg.AddGoodsPrice==''||AddGoodsmsg.AddGoodsPrice==0"></el-input>
      </el-form-item> -->
			<div></div>
			<el-form-item label="套餐类型：" prop="grouptype">
				<el-select v-model="AddGoodsmsg.grouptype" placeholder="请选择套餐类型" style="width:200px">
					<el-option label="全国套餐" value="全国套餐"> </el-option>
					<el-option label="地方套餐" value="地方套餐"> </el-option>
					<el-option label="其他" value="其他"> </el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="套餐编码：" prop="groupid" >
				<el-input v-model="AddGoodsmsg.groupid" style="width:200px" placeholder="请填写套餐编码"></el-input>
			</el-form-item>
			<el-form-item label="婚姻状况：" prop="marriage">
				<el-select v-model="AddGoodsmsg.marriage" placeholder="请选择婚姻状况" style="width:200px">
					<el-option label="通用" value="通用"> </el-option>
					<el-option label="未婚" value="未婚"> </el-option>
					<el-option label="已婚" value="已婚"> </el-option>
				</el-select>
			</el-form-item>
			<div></div>
			<el-form-item label="实际价格：" prop="goodlineprice">
				<el-input v-model="AddGoodsmsg.goodlineprice" style="width:200px" placeholder="请输入0 ~ 1000000正整数" @input="goodlinepriceinput()" maxlength="7" @change="goodlinepricechange()"></el-input>
			</el-form-item>
		</el-form>
		<!-- 支持的城市 -->
		<div>
			<div style="margin-top:20px;">
				<span class="cityboxtitle">
          <span style="color:#F56C6C;">*</span>
				<span>支持的城市</span>
				</span>
				<el-button size="medium" @click="selectCityBtn()" type="primary" :disabled="$route.query.look">选择城市</el-button>
			</div>
			<div class="cityselectbox">
				<el-tag v-for="item in selectCity.checkedCities" :key="item" class="cityitembox" closable color="#ffffff" @close="Closecity(item)">{{item}}</el-tag>
			</div>
		</div>
		<!-- 支持的门店 -->
		<div>
			<div style="margin-top:30px;">
				<span class="cityboxtitle">
          <span style="color:#F56C6C;">*</span>
				<span>支持的门店</span>
				</span>
				<el-button size="medium" @click="selectShopBtn()" type="primary" :disabled="$route.query.look">选择门店</el-button>
				<!-- <el-button style=" border-radius: 18px;" size="medium" icon="el-icon-plus" @click="selectShopBtn1()"></el-button> -->
			</div>
			<div class="cityselectbox">
				<el-tag v-for="item in selectShop.confirmshopList" :key="item.Id" class="cityitembox" closable color="#ffffff" @close="Closeshop(item.Id)">{{item.CenterName}}</el-tag>
			</div>
		</div>
		<!-- 包含的项目 -->
		<div>
			<div style="margin-top:30px;">
				<span class="cityboxtitle">
          <!-- <span style="color:#F56C6C;">*</span> -->
				<span>包含的项目</span>
				</span>
				<el-button size="medium" @click="selectPhysicalBtn()" type="primary" :disabled="$route.query.look">选择体检项目</el-button>
				<el-button size="medium" @click="exprottemplate()" type="primary" :disabled="$route.query.look">项目导入</el-button>
				<el-button size="medium" @click="exprottemplate1()" type="primary" :disabled="$route.query.look">项目导出</el-button>
				<el-button size="medium" @click="downloadtemplate()" :disabled="$route.query.look">模板下载</el-button>
				<span style="margin-left:20px"> 总计：{{selectPhysical.confirmProjectList.length}} 项</span>
				<span style="margin-left:30px"> 门市价总计：{{checkpriceTotal}} 元</span>
				<span style="margin-left:30px"> 核算价总计：{{checklowpriceTotal}} 元</span>

				<!-- <el-button style=" border-radius: 18px;" size="medium" icon="el-icon-plus" @click="selectPhysicalBtn1()"></el-button> -->
			</div>
			<div class="cityselectbox1">
				<!-- <div v-for="item in selectPhysical.confirmProjectfirsttype" style="padding:0 10px;line-height:42px">
          {{item}}：
          <el-tag v-for="temp in selectPhysical.confirmProjectList" v-if="item==temp.checktypefirst" :key="temp.checkid" class="cityitembox" closable color="#ffffff" @close="Closeproject(temp.checkid)">{{temp.checkname}}</el-tag>
        </div> -->
				<el-table :data="selectPhysical.confirmProjectList">
					<el-table-column prop="checktypefirst" label="一级类目" min-width="200px"></el-table-column>
					<el-table-column prop="checkdescribe" label="二级类目" min-width="200px" show-overflow-tooltip></el-table-column>
					<el-table-column prop="instcityid" label="项目代码" min-width="140px"></el-table-column>
					<el-table-column prop="checkname" label="项目名称" show-overflow-tooltip min-width="150px"></el-table-column>
					<el-table-column prop="checkdescribe" label="详细描述" show-overflow-tooltip min-width="150px"></el-table-column>
					<el-table-column prop="checkgender" label="性别"></el-table-column>
					<el-table-column prop="checkprice" label="门市价"></el-table-column>
					<el-table-column prop="checklowprice" label="核算价"></el-table-column>
					<el-table-column label="操作" width="170px">
						<template slot-scope="scope">
							<el-button size="mini" type="danger" @click="delconfirmProjectList(scope.$index)" :disabled="$route.query.look">删除</el-button>
							<el-button size="mini" type="primary" @click="topconfirmProjectList(scope.$index)" :disabled="$route.query.look">置顶</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
		<!-- 关联加项 -->
		<div v-if="IsPack">
			<div style="margin-top:30px;">
				<span class="cityboxtitle">
          <!-- <span style="color:#F56C6C;">*</span> -->
				<span>关联加项</span>
				</span>
				<el-button size="medium" @click="selectAddPackageBtn()" type="primary">选择加项包</el-button>
				<!-- <el-button style=" border-radius: 18px;" size="medium" icon="el-icon-plus" @click="selectAddPackageBtn1()"></el-button> -->

				<!-- <el-button size="medium">选择虚拟商品</el-button> -->
			</div>
			<div class="cityselectbox">
				<div v-if="selectAddPackage.confirmProjectList.length>0" style="padding:0 10px">
					加项包：
					<el-tag v-for="item in selectAddPackage.confirmProjectList" :key="item.goodid" class="cityitembox" closable color="#ffffff" @close="Closeaddpacket(item.goodid)">{{item.goodname}}</el-tag>
				</div>
			</div>
		</div>

		<!-- 商品详情 -->

		<div style="margin:30px 20px 70px 50px;" v-if="firstTxtisshow">

			<div style="margin:10px 0; color: #606266;">商品详情</div>
			<wangeditor :catchData="catchData" class="myEditor"></wangeditor>
			<!-- 
      <quill-editor style="height:500px" v-model="content" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @change="onEditorChange($event)">
      </quill-editor> -->

		</div>
		<!-- <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload> -->

		<!-- 按钮 -->
		<div style="float:right;margin:20px 0">
			<el-button @click="goback()">取 消</el-button>
			<el-button type="primary" v-if="isedit" @click="manageupdategood('草稿')" :disabled="$route.query.look">保存草稿</el-button>
			<el-button type="primary" v-else @click="manageInsertGood('草稿')" :disabled="$route.query.look">保存草稿</el-button>
			<el-button type="primary" v-if="isedit" @click="manageupdategood('上架')" :disabled="$route.query.look">确 认</el-button>
			<el-button type="primary" v-else @click="manageInsertGood('上架')" :disabled="$route.query.look">确 认</el-button>
		</div>

		<!-- 选择城市弹窗 -->
		<el-dialog title="选择城市" :visible.sync='selectCity.isshow' width="800px">
			<div style="margin:10px 0px">
				<el-checkbox v-model="selectCity.nationwide" label="全国" @change="citynationwide"></el-checkbox>
				<el-checkbox :disabled="selectCity.nationwide" v-model="selectCity.allcity" label="全选" @change="cityidAll"></el-checkbox>
			</div>
			<div v-for="(city,index) in selectCity.cities" :key="city._id._id">
				<el-checkbox :disabled="selectCity.nationwide" v-model="city._id.checked" :indeterminate="city._id.indeterminate" :label="city._id._id" @change="cityidAllselect(index)"></el-checkbox>
				<div style="margin:5px 30px">
					<el-checkbox :disabled="selectCity.nationwide" v-model="item.checked" v-for="item in city.citynames" :label="item.city" :key="item.city" @change="handleCheckedCitiesChange(city.citynames,index)"></el-checkbox>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
        <el-button @click="selectCity.isshow = false">取 消</el-button>
        <el-button type="primary" @click="confirmSelectCity()">确 定</el-button>
      </span>
		</el-dialog>
		<!-- 选择门店弹窗 -->
		<div v-if="selectShop.isshow">
			<el-dialog title="选择门店" :visible.sync='selectShop.isshow' width="800px">
				<div v-if="false">
					<el-row style="line-height:32px">
						<el-col :span="3">
							<div style="  text-align: center;">城市：</div>
						</el-col>
						<el-col :span="5">
							<el-select size="small" v-model="selectShop.selectcityseek" placeholder="请选择" filterable>
								<el-option v-for="item in selectCity.checkedCities" :key="item" :label="item" :value="item">
								</el-option>
							</el-select>
							<!-- <el-input size="small" v-model="selectShop.selectcityseek"></el-input> -->
						</el-col>
						<el-col :span="3">
							<div style="float:right">门店名称：</div>
						</el-col>
						<el-col :span="5">
							<el-input size="small" v-model="selectShop.centerName" style="width:100%" clearable></el-input>
						</el-col>
						<el-col :span="6">
							<el-button size="small" type="primary" style="float:right" @click="pullByCityNames()">搜 索</el-button>
						</el-col>
					</el-row>
					<div style="margin:30px">
						<div style="position: relative;">
							<!-- <el-checkbox style="position:absolute;top:12px;left:12px;" ></el-checkbox> -->
							<el-table :row-key="RowKeysshop" ref="shopProjectRef" :data="selectShop.shopList" style="width: 100%;" size="medium" @selection-change="handleSelectionChange2" @select="SelectionChangeshop">
								<el-table-column type="selection" :reserve-selection="true" width="55">
								</el-table-column>
								<!-- <el-table-column width="55">
                <el-checkbox></el-checkbox>
              </el-table-column> -->
								<el-table-column label="城市">
									<template slot-scope="scope">
										<span>{{ scope.row.CityName }}</span>
									</template>
								</el-table-column>
								<el-table-column label="门店名称">
									<template slot-scope="scope">
										<span>{{ scope.row.CenterName }}</span>
									</template>
								</el-table-column>
							</el-table>
						</div>
						<!-- 分页 -->
						<div class="block" style="text-align: right;margin-top: 20px;">
							<el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentChange2" :current-page="selectShop.shopcurrentPage" :page-sizes="[10, 20, 30, 40]" :page-size="selectShop.shoppageSize" layout="total, sizes, prev, pager, next, jumper" :total="selectShop.shopCount">
							</el-pagination>
						</div>
					</div>
				</div>
				<div class="mytransfer">
					<el-transfer v-loading="selectShop.loading" :titles="['未选门店', '已选门店']" v-model="selectShop.selecshopList" filterable filter-placeholder="请输入" :data="selectShop.shopList"></el-transfer>
				</div>

				<span slot="footer" class="dialog-footer">
          <el-button @click="selectShop.isshow = false">取 消</el-button>
          <el-button type="primary" @click="confirmshopBtn()">确 定</el-button>
        </span>
			</el-dialog>
		</div>

		<!-- 选择体检项目弹窗 -->
		<div>
			<el-dialog title=" 选择体检项目" :visible.sync='selectPhysical.isshow' width="800px">
				<div v-if="false">
					<el-row style="line-height:32px;">
						<el-col :span="2">
							<div style="float:right">一级类别：</div>
						</el-col>
						<el-col :span="3">
							<el-select v-model="selectPhysical.FirstTypeValue" placeholder="请选择" size="small" style="width:100%;" clearable>
								<el-option v-for="item in selectPhysical.FirstTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</el-col>
						<el-col :span="2">
							<div style="float:right">二级类别：</div>
						</el-col>
						<el-col :span="3">
							<el-select v-model="selectPhysical.SecondTypevalue" :disabled="!selectPhysical.FirstTypeValue||selectPhysical.FirstTypeValue==''||selectPhysical.FirstTypeValue=='全部'" filterable placeholder="选择一级类别后可选" size="small" style="width:100%;" clearable>
								<el-option v-for="item in selectPhysical.SecondTypeList" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-col>
						<el-col :span="2">
							<div style="float:right">项目名称：</div>
						</el-col>
						<el-col :span="3">
							<el-input size="small" style="width:100%;" placeholder="点击输入" v-model="selectPhysical.seekPackageName" clearable></el-input>
						</el-col>
						<el-col :span="2">
							<div style="float:right">性别：</div>
						</el-col>
						<el-col :span="3">
							<el-select v-model="selectPhysical.seeksex" placeholder="请选择" size="small" style="width:100%;" clearable>
								<el-option v-for="item in selectPhysical.AddPackageseeklist.sex" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</el-col>
						<el-col :span="3">
							<el-button size="small" type="primary" style="float:right" @click="ProjectListQuery('1')">搜 索</el-button>
						</el-col>
					</el-row>
					<div style="margin:30px">
						<div style="margin:30px;text-align: center;color:#F56C6C" v-if="selectPhysical.projectCount==0">分公司未创建该类型体检项目，请先创建体检项目!</div>
						<div v-else>
							<div v-show="selectPhysical.isshowtable">
								<el-table :row-key="getRowKeys" ref="ProjectRef" :data="selectPhysical.projectList" style="width: 100%;" size="medium" @selection-change="handleSelectionChange">
									<el-table-column type="selection" :reserve-selection="true" width="55">
									</el-table-column>
									<el-table-column label="一级类目">
										<template slot-scope="scope">
											<span>{{ scope.row.checktypefirst }}</span>
										</template>
									</el-table-column>
									<el-table-column label="二级类目">
										<template slot-scope="scope">
											<span>{{ scope.row.checktypesec }}</span>
										</template>
									</el-table-column>
									<el-table-column label="项目名称">
										<template slot-scope="scope">
											<div class="alinehidden">{{ scope.row.checkname }}</div>
										</template>
									</el-table-column>
									<el-table-column label="详细描述">
										<template slot-scope="scope">
											<div class="alinehidden">{{ scope.row.checkdescribe }}</div>
										</template>
									</el-table-column>
									<el-table-column label="性别" width="100">
										<template slot-scope="scope">
											<div>{{ scope.row.checkgender }}</div>
										</template>
									</el-table-column>
								</el-table>
							</div>
							<!-- 分页 -->
							<div class="block" style="text-align: right;margin-top: 20px;">
								<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="selectPhysical.projectcurrentPage" :page-sizes="[10, 20, 30, 40]" :page-size="selectPhysical.projectpageSize" layout="total, sizes, prev, pager, next, jumper" :total="selectPhysical.projectCount">
								</el-pagination>
							</div>
						</div>
					</div>
				</div>
				<div class="projectmytransfer">
					<el-transfer v-loading="selectPhysical.loading" :titles="['未选项目', '已选项目']" :button-texts="['到上边', '到下边']" v-model="selectPhysical.selectProjectList" filterable filter-placeholder="请输入" :data="selectPhysical.projectList"></el-transfer>
				</div>
				<span slot="footer" class="dialog-footer">
          <el-button @click="selectPhysical.isshow = false">取 消</el-button>
          <el-button type="primary" @click="confirmProjectBtn()">确 定</el-button>
        </span>
			</el-dialog>
		</div>
		<!-- 选择加项包弹窗 -->
		<div v-if="selectAddPackage.isshow">
			<el-dialog title=" 选择加项包" :visible.sync='selectAddPackage.isshow' width="1000px">
				<div v-if="false">
					<el-row style="line-height:32px;">
						<el-col :span="3">
							<div style="float:right">加项包名称：</div>
						</el-col>
						<el-col :span="4">
							<el-input size="small" style="width:100%;" placeholder="点击输入" v-model="selectAddPackage.seekPackageName" clearable></el-input>
						</el-col>
						<el-col :span="3">
							<div style="float:right">类别：</div>
						</el-col>
						<el-col :span="4">
							<el-select v-model="selectAddPackage.SecondTypevalue" placeholder="选择一级类别后可选" size="small" style="width:100%;" clearable>
								<el-option label="单项" value="单项"></el-option>
								<el-option label="多项" value="多项"></el-option>
							</el-select>
						</el-col>
						<el-col :span="8">
							<el-button size="small" style="float:right" type="primary" @click="manageQueryAddPackIndex()">搜 索</el-button>
						</el-col>
					</el-row>
					<div style="margin:30px">
						<div style="margin:30px;text-align: center;color:#F56C6C" v-if="selectAddPackage.projectCount==0">分公司未创建该类型加项包，请先创建加项包!</div>
						<div v-else>
							<div v-show="selectAddPackage.isshowtable">
								<el-table :row-key="RowKeyaddproject" ref="ProjectRef" :data="selectAddPackage.projectList" style="width: 100%;" size="medium" @selection-change="handleSelectionChange1">
									<el-table-column type="selection" :reserve-selection="true" width="55">
									</el-table-column>
									<el-table-column label="所属分公司">
										<template slot-scope="scope">
											<span>{{ scope.row.instname }}</span>
										</template>
									</el-table-column>
									<el-table-column label="商品名称">
										<template slot-scope="scope">
											<span>{{ scope.row.goodname }}</span>
										</template>
									</el-table-column>
									<el-table-column label="类别">
										<template slot-scope="scope">
											<div class="alinehidden">{{ scope.row.goodtype }}</div>
										</template>
									</el-table-column>
									<el-table-column label="折扣价">
										<template slot-scope="scope">
											<div class="alinehidden">{{ scope.row.goodsaleprice }}</div>
										</template>
									</el-table-column>
								</el-table>
							</div>
							<!-- 分页 -->
							<div class="block" style="text-align: right;margin-top: 20px;">
								<el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1" :current-page="selectAddPackage.projectcurrentPage" :page-sizes="[10, 20, 30, 40]" :page-size="selectAddPackage.projectpageSize" layout="total, sizes, prev, pager, next, jumper" :total="selectAddPackage.projectCount">
								</el-pagination>
							</div>
						</div>
					</div>
				</div>
				<div class="projectmytransfer">
					<el-transfer v-loading="selectAddPackage.loading" :titles="['未选加项', '已选加项']" :button-texts="['到上边', '到下边']" v-model="selectAddPackage.selectProjectList" filterable filter-placeholder="请输入" :data="selectAddPackage.projectList"></el-transfer>
				</div>
				<span slot="footer" class="dialog-footer">
          <el-button @click="selectAddPackage.isshow = false">取 消</el-button>
          <el-button type="primary" @click="confirmAddPackageBtn()">确 定</el-button>
        </span>
			</el-dialog>
		</div>
		<input id="upload" style="display:none" type="file" ref="excel" @change="importfxx(this)" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel">
		<a id="adownload" href="" download="" style="display:none">导出</a>
	</div>
</template>

<script>
	import { formatDate } from "../../../api/formatDate.js";
	import wangeditor from "../../packagelist/WangEditor";
	export default {
		name: "goodsmsg",
		components: {
			wangeditor
		},
		props: {},
		watch: {
			content(value) {
				console.log(value);
			},
			// "AddGoodsmsg.AddGoodsPrice": {
			//   handler(nv, ov) {
			//     if (nv || nv == "" || nv == null) {
			//       this.AddGoodsmsg.AddGoodsMiniprice = "";
			//     }
			//   },
			//   deep: true,
			//   immediate: true
			// },

			"selectPhysical.FirstTypeValue": {
				handler(nv) {
					if(!nv || nv == "" || nv == "全部") {
						this.selectPhysical.SecondTypevalue = "";
					} else {
						this.selectPhysical.SecondTypevalue = "";
						this.queryAllCheckDirSec();
					}
				},
				deep: true,
				immediate: true
			}
		},
		data() {
			var validatePass = (rule, value, callback) => {
				if(value < 0 || value > 1000000) {
					callback(new Error("请输入0 ~ 1000000正整数"));
				} else {
					callback();
				}
			};
			var validatePass1 = (rule, value, callback) => {
				if(Number(value) > Number(this.AddGoodsmsg.AddGoodsPrice)) {
					callback(new Error("最低价不得大于售价"));
				} else if(value == "") {
					callback(new Error("最低价为空（选填）"));
				} else {
					callback();
				}
			};
			return {
				filterMethod(CenterName, item) {
					console.log(CenterName, item);

					return item.pinyin.indexOf(query) > -1;
				},
				getRowKeys(row) {
					return row.checkid;
				},
				RowKeysshop(row) {
					return row.Id;
				},
				RowKeyaddproject(row) {
					return row.goodid;
				},
				IsPack: true,
				content: "",
				firstTxt: "",
				firstTxtisshow: false,
				// editorOption: {
				//   placeholder: "商品详情",
				//   modules: {
				//     toolbar: {
				//       container: [
				//         ["bold", "italic", "underline", "strike"], //加粗，斜体，下划线，删除线
				//         //  ["blockquote", "code-block"], //引用，代码块
				//         [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
				//         [{ list: "ordered" }, { list: "bullet" }], //列表
				//         [{ script: "sub" }, { script: "super" }], // 上下标
				//         [{ indent: "-1" }, { indent: "+1" }], // 缩进
				//         [{ direction: "rtl" }], // 文本方向

				//         [{ size: ["small", false, "large", "huge"] }], // 字体大小
				//         [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题

				//         [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
				//         [{ font: [] }], //字体
				//         [{ align: [] }], //对齐方式

				//         ["clean"], //清除字体样式
				//         ["image"] //上传图片、上传视频
				//         // ["image", "video"] //上传图片、上传视频
				//       ],
				//       handlers: {
				//         image: function(value) {
				//           if (value) {
				//             alert(value);
				//           } else {
				//             this.quill.format("image", false);
				//           }
				//         }
				//       }
				//     }

				//     // imageDrop: true
				//   }
				// },

				isedit: false, //是否为编辑
				editgoodsobj: "", //通过id获取的商品数据
				selectCity: {
					isshow: false,
					checkedCities: [], //选择的城市
					cities: [], //城市数据
					allcity: false, //全选
					nationwide: false //全国
				},
				selectShop: {
					isshow: false,
					addshop: false,
					shopList: [], //体检项目列表
					shopCount: 0, //体检项目总数
					shoppageSize: 10, //每页条数
					shopcurrentPage: 1, //当前页
					selecshopList: [],
					confirmshopList: [],
					centerName: "",
					selectcityseek: "",
					loading: false
				},
				selectPhysical: {
					loading: false,
					addPhysical: false,
					confirmProjectList: [],
					confirmProjectfirsttype: [],
					selectProjectList: [],
					isshow: false,
					isshowtable: false,
					FirstTypeList: [], //一级类别列表
					FirstTypeValue: "", //一级类别选择的值
					SecondTypeList: [], //二级类别列表，根据一级类别生成
					SecondTypevalue: "", //二级类别选择的值
					seeksex: "", //搜索框性别
					seekPackageName: "", //搜索栏项目名称
					//搜索栏属性列表
					AddPackageseeklist: {
						sex: [{
								value: "通用",
								label: "通用"
							},
							{
								value: "男",
								label: "男"
							},
							{
								value: "女",
								label: "女"
							}
						]
					},
					projectList: [], //体检项目列表
					projectCount: 0, //体检项目总数
					projectpageSize: 10, //每页条数
					projectcurrentPage: 1 //当前页
				},
				selectAddPackage: {
					loading: false,
					addpackage: false,
					confirmProjectList: [],
					selectProjectList: [],
					isshow: false,
					isshowtable: false,
					seekPackageName: "", //加项包名称：
					SecondTypevalue: "", //加项包类别：
					projectList: [], //加项包列表
					projectCount: 0, //加项包目总数
					projectpageSize: 10, //每页条数
					projectcurrentPage: 1 //当前页
				},
				AddGoodsmsg: {
					AddGoodsType: "",
					Filiale: "",
					AddGoodsName: "",
					AddGoodsID: "",
					AddGoodsPrice: "",
					AddGoodsMiniprice: "",
					AddGoodsCity: [],
					goodaddpackage: [],
					groupid: "", //套餐编码
					grouptype: "地方套餐", //套餐类型
					gooddescribe: "",
					sex: "通用",
					marriage: '通用',
					goodlineprice: ''
				},
				AddGoodsmsgrules: {
					AddGoodsType: [{
						required: true,
						message: "请选择商品类型",
						trigger: "change"
					}],
					grouptype: [{
						required: true,
						message: "请选择套餐类型",
						trigger: "change"
					}],
					Filiale: [{
						required: true,
						message: "请选择分公司",
						trigger: "change"
					}],
					AddGoodsName: [{
							required: true,
							message: "请输入商品名称",
							trigger: "blur"
						},
						{
							min: 1,
							max: 20,
							message: "长度在 1 到 20 个字符",
							trigger: "blur"
						}
					],
					AddGoodsID: [{
						required: true,
						message: "请输入商品ID",
						trigger: "blur"
					}],
					AddGoodsPrice: [{
							required: true,
							message: "请输入套餐原价",
							trigger: "change"
						},
						{
							validator: validatePass,
							trigger: "change"
						}
					],
					goodlineprice: [{
							required: true,
							message: "请输入实际价格",
							trigger: "change"
						},
						{
							validator: validatePass,
							trigger: "change"
						}
					],
					AddGoodsMiniprice: [{
						validator: validatePass1,
						trigger: "change"
					}],
					sex: [{
						required: true,
						message: "请选择性别",
						trigger: "change"
					}],
					marriage: [{
						required: true,
						message: "请选择婚姻状况",
						trigger: "change"
					}],

				}
			};
		},
		mounted() {
			
			if(
				this.$route.query.goodsname &&
				this.$route.query.Filiale &&
				this.$route.query.type
			) {
				this.AddGoodsmsg.AddGoodsType = this.$route.query.type;
				this.AddGoodsmsg.Filiale = this.$route.query.Filiale;
				this.AddGoodsmsg.AddGoodsName = this.$route.query.goodsname;
			}
			if(this.$route.query && this.$route.query.goodsid) {
				if(this.$route.query.copy) {
					this.isedit = false;
				} else {
					this.isedit = true;
				}
				this.queryAllCheckDirFir();
			} else {
				this.isedit = false;
				this.queryAllCheckDirFir();
			}
		},
		methods: {
			catchData(value) {
      this.content = value; //在这里接受子组件传过来的参数，赋值给data里的参数
    },
			// 18-根据名称和类型获取账户信息
			GetOneByName() {
				//    if (this.AddGoodsmsg.Filiale == "优健康自营") {
				//      this.IsPack = true;
				//      console.log(123123123123123, this.IsPack);
				//    } else {
				//      this.$api
				//        .get("/account/GetOneByName", {
				//          accountName: this.AddGoodsmsg.Filiale,
				//          accountType: "1"
				//        })
				//        .then(res => {
				//          console.log(res);
				//          this.IsPack = res.data.IsPack;
				//        })
				//        .catch(res => {
				//          console.log(res);
				//        });
				//    }
			},
			catchData(value) {
				this.content = value; //在这里接受子组件传过来的参数，赋值给data里的参数
			},
			//项目导入
			exprottemplate() {
				this.$refs.excel.value = null; //清空上一次的数据
				document.getElementById("upload").click();
			},
			// 项目导出
			exprottemplate1() {
				console.log(this.selectPhysical.confirmProjectList);
				import("@/api/Export2Excel").then(excel => {
					const tHeader = [
						"一级类目",
						"二级类目",
						"项目代码",
						"项目名称",
						"详细描述",
						"性别",
						"门市价",
						"核算价"

						// "商品库存",
						// "适用人群",
					]; // 表头
					const filterVal = [
						"checktypefirst",
						"checktypesec",
						"instcityid",
						"checkname",
						"checkdescribe",
						"checkgender",
						"checkprice",
						"checklowprice"
					]; // 表头对应字段名
					const list = this.selectPhysical.confirmProjectList; // 数据来源
					const data = this.formatJson(filterVal, list); //对导出数据格式化处理
					excel.export_json_to_excel({
						header: tHeader, //表头 必填
						data, //具体数据 必填
						filename: "体检项目", // 可自定义文件名，非必填
						autoWidth: true //是否自适应宽度，非必填，默认true
					});
				});
			},
			formatJson(filterVal, jsonData) {
				return jsonData.map(v => filterVal.map(j => v[j]));
			},

			//模板下载
			downloadtemplate() {
				// this.$api
				//   .get("/manage/downLoadCheckCityIdExcel")
				//   .then(res => {
				//     if (res.code == 200) {
				//       console.log(res);
				//       const adownload = document.getElementById("adownload");
				//       adownload.setAttribute(
				//         "download",
				//         this.$parent.$parent.$parent.weburl + res.data
				//       ); // download属性
				//       adownload.setAttribute(
				//         "href",
				//         this.$parent.$parent.$parent.weburl + res.data
				//       ); // href链接
				//       adownload.click();
				//     } else {
				//       this.$message.error(res.msg);
				//     }
				//   })
				//   .catch(res => {
				//     this.$message.error(res.msg);
				//   });
				var xhr = new XMLHttpRequest();
				var str = "";
				// var str = "id=" + ticketId + "&status=" + status;
				xhr.open(
					"GET",
					this.$parent.$parent.$parent.weburl+"/manage/DownLoadFile?id=2",
					true
				); //也可以使用POST方式，根据接口
				xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				xhr.responseType = "blob"; //返回类型blob
				xhr.onload = function() {
					//定义请求完成的处理函数
					if(this.status === 200) {
						var blob = this.response;
						if(blob.size > 0) {
							var reader = new FileReader();
							reader.readAsDataURL(blob); // 转换为base64，可以直接放入a标签href
							reader.onload = function(e) {
								// 转换完成，创建一个a标签用于下载
								var a = document.createElement("a");
								var newDate = new Date();
								console.log(newDate.format);

								a.download =
									"城市项目代码" + newDate.Format("yyyyMMddhhmmss") + ".xlsx";
								a.href = e.target.result;
								document.body.appendChild(a);
								// $("body").append(a); // 修复firefox中无法触发click
								a.click();
								// $(a).remove();
								a.remove();
								// window.location.reload();
							};
						} else {
							// window.location.reload();
						}
					}
				};
				xhr.send();
			},
			goback() {
				window.history.go(-1);
			},
			importfxx(obj) {
				let _this = this;
				let inputDOM = this.$refs.excel;
				// 通过DOM取文件数据
				this.file = event.currentTarget.files[0];
				var rABS = false; //是否将文件读取为二进制字符串
				var f = this.file;
				var reader = new FileReader();
				//if (!FileReader.prototype.readAsBinaryString) {
				FileReader.prototype.readAsBinaryString = function(f) {
					var binary = "";
					var rABS = false; //是否将文件读取为二进制字符串
					var pt = this;
					var wb; //读取完成的数据
					var outdata;
					var reader = new FileReader();
					reader.onload = function(e) {
						console.log(e);

						var bytes = new Uint8Array(reader.result);
						var length = bytes.byteLength;
						for(var i = 0; i < length; i++) {
							binary += String.fromCharCode(bytes[i]);
						}
						var XLSX = require("xlsx");
						if(rABS) {
							wb = XLSX.read(btoa(fixdata(binary)), {
								//手动转化
								type: "base64"
							});
						} else {
							wb = XLSX.read(binary, {
								type: "binary"
							});
						}
						console.log(wb);
						console.log(wb.Sheets);
						console.log(wb.Sheets[wb.SheetNames[0]]);

						// outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]); //outdata就是你想要的东西
						// console.log(outdata);
						// outdata=[]
						var body = {
							instname: _this.AddGoodsmsg.Filiale,
							checkim: []
						};
						for(const key in wb.Sheets[wb.SheetNames[0]]) {
							//  console.log(key,'----',wb.Sheets[wb.SheetNames[0]][key]);
							if(key.substring(0, 1) == "A" || key.substring(0, 1) == "B") {
								if(key == "A1") {
									continue;
								}
								if(key == "B1") {
									continue;
								}
								if(key.substring(0, 1) == "A") {
									var obj = {
										xuhao: key.substring(1, key.length),
										cityids: String(wb.Sheets[wb.SheetNames[0]][key].v)
									};
									body.checkim.push(obj);
								} else if(key.substring(0, 1) == "B") {
									var indexnum = 0;
									body.checkim.map((item, index) => {
										if(item.xuhao == key.substring(1, key.length)) {
											indexnum++;
											body.checkim[index].checkname = String(
												wb.Sheets[wb.SheetNames[0]][key].v
											);
										}
									});
									if(indexnum == 0) {
										var obj = {
											xuhao: key.substring(1, key.length),
											checkname: String(wb.Sheets[wb.SheetNames[0]][key].v)
										};
										console.log(obj);

										body.checkim.push(obj);
									}
								}

								// console.log(key, "----", wb.Sheets[wb.SheetNames[0]][key]);
							}
						}

						// outdata.map(item=>{
						//   // body.cityids.push(item.)
						// })
						_this.$api
							.post("/manage/checkImport", body)
							.then(res => {
								if(res.code == 200) {
									_this.$message.success(res.msg);

									_this.selectPhysical.confirmProjectList = _this.selectPhysical.confirmProjectList.concat(
										res.data.data
									);
									_this.pupconfirmProjectList(
										_this.selectPhysical.confirmProjectList
									);
								} else {
									_this.$message.error(res.msg);
								}
							})
							.catch(res => {
								console.log(res);
								if(res.code == 800) {
									// res.data
									_this
										.$confirm(
											"导入数据：" +
											res.data.join(",") +
											",行数据错误，请检查完整后重新上传！",
											"错误提醒", {
												confirmButtonText: "确定",
												cancelButtonText: "取消",
												type: "warning"
											}
										)
										.then(() => {
											// _this.$message({
											//   type: "success",
											//   message: "删除成功!"
											// });
										})
										.catch(() => {
											// _this.$message({
											//   type: "info",
											//   message: "已取消删除"
											// });
										});
								} else {
									_this.$message.error(res.msg);
								}
							});
						_this.$message({
							message: "请耐心等待导入成功",
							type: "success"
						});
					};
					reader.readAsArrayBuffer(f);
				};
				if(rABS) {
					reader.readAsArrayBuffer(f);
				} else {
					reader.readAsBinaryString(f);
				}
			},
			//按一级类别排序list
			pupconfirmProjectList(confirmlist) {
				console.log(confirmlist);
				//去重
				var confirmlist1 = [];
				var confirmlist2 = [];
				confirmlist.map(item => {
					if(confirmlist1.indexOf(item.instcityid) < 0) {
						confirmlist1.push(item.instcityid);
					}
				});
				confirmlist1.map((item, index) => {
					for(let i = 0; i < confirmlist.length; i++) {
						if(item == confirmlist[i].instcityid) {
							confirmlist2.push(confirmlist[i]);
							break;
						}
					}
				});
				confirmlist = confirmlist2;

				var checkfirstlist = [];
				confirmlist.map(item => {
					checkfirstlist.push(item.checktypefirst);
				});
				checkfirstlist = checkfirstlist.filter((item, index, arr) => {
					return arr.indexOf(item) === index;
				});
				console.log(checkfirstlist);
				//获取
				var allfirstlist = [];
				this.selectPhysical.FirstTypeList.map(item => {
					allfirstlist.push(item.value);
				});
				console.log(allfirstlist);
				this.selectPhysical.confirmProjectfirsttype = [];
				allfirstlist.map(item => {
					if(checkfirstlist.indexOf(item) >= 0) {
						this.selectPhysical.confirmProjectfirsttype.push(item);
					}
				});
				console.log(this.selectPhysical.confirmProjectfirsttype);
				//按一级类别排序原数组
				// var confirmlist = res.data.goodchecktypes;
				console.log(confirmlist);
				this.selectPhysical.confirmProjectList = [];
				this.selectPhysical.confirmProjectfirsttype.map(item => {
					for(let i = 0; i < confirmlist.length; i++) {
						if(item == confirmlist[i].checktypefirst) {
							this.selectPhysical.confirmProjectList.push(confirmlist[i]);
						}
					}
				});
			},
			//id查询商品
			manageQueryGoodById(val) {
				this.$api
					.get("/manage/queryWeiBaoGoodById", {
						goodid: val
					})
					.then(res => {
						if(res.code == "200") {
							console.log(res);
							this.editgoodsobj = res.data;
							this.AddGoodsmsg.sex=res.data.gender;
					        this.AddGoodsmsg.marriage=res.data.marital;
					        this.AddGoodsmsg.goodlineprice=res.data.goodlineprice;
					        this.AddGoodsmsg.groupid=res.data.groupid;
							this.AddGoodsmsg.AddGoodsType = res.data.goodtype;
							this.AddGoodsmsg.Filiale = res.data.instname;
							this.AddGoodsmsg.AddGoodsName = res.data.goodname;
							this.AddGoodsmsg.goodaddpackage = res.data.goodaddpackage;
							this.firstTxt = res.data.gooddescribe;
							this.content = this.firstTxt;
							this.firstTxtisshow = true;
							if(this.$route.query.copy) {
								this.AddGoodsmsg.AddGoodsID = "";
							} else {
								this.AddGoodsmsg.AddGoodsID = res.data.goodid;
							}
							this.AddGoodsmsg.AddGoodsPrice = res.data.goodprice;
							this.AddGoodsmsg.AddGoodsMiniprice = res.data.goodlowprice;
							this.selectAddPackage.confirmProjectList = res.data.goodaddpackage;
							this.AddGoodsmsg.grouptype = res.data.grouptype;
							this.AddGoodsmsg.groupid = res.data.groupid;
							res.data.goodinst.map(item => {
								this.selectCity.checkedCities.push(item.instcity);
								item.instsalepointname.map(temp => {
									this.selectShop.confirmshopList.push(temp);
								});
							});
							console.log(res.data.goodchecktypes)
							if(res.data.goodchecktypes && res.data.goodchecktypes.length > 0) {
								res.data.goodchecktypes.map(item => {
									this.selectPhysical.confirmProjectfirsttype.push(
										item.checktypefirst
									);
								});
							} else {
								this.selectPhysical.confirmProjectfirsttype = [];
							}

							console.log(this.selectPhysical.confirmProjectfirsttype);
							this.selectPhysical.confirmProjectfirsttype = this.selectPhysical.confirmProjectfirsttype.filter(
								(item, index, arr) => {
									return arr.indexOf(item) === index;
								}
							);
							console.log(this.selectPhysical.confirmProjectfirsttype);

							//所有一级类别数据
							var allfirstlist = [];
							this.selectPhysical.FirstTypeList.map(item => {
								allfirstlist.push(item.value);
							});
							console.log(allfirstlist);
							//排序
							var checkfirstlist = this.selectPhysical.confirmProjectfirsttype;
							this.selectPhysical.confirmProjectfirsttype = [];
							allfirstlist.map(item => {
								if(checkfirstlist.indexOf(item) >= 0) {
									this.selectPhysical.confirmProjectfirsttype.push(item);
								}
							});
							//按一级类别排序原数组
							var confirmlist = res.data.goodchecktypes;
							console.log(confirmlist);
							this.selectPhysical.confirmProjectList = [];
							this.selectPhysical.confirmProjectfirsttype.map(item => {
								for(let i = 0; i < confirmlist.length; i++) {
									if(item == confirmlist[i].checktypefirst) {
										this.selectPhysical.confirmProjectList.push(confirmlist[i]);
									}
								}
							});

							this.GetOneByName();

							// console.log(this.selectPhysical.FirstTypeList);
							// var tempcfpflt = [];
							// this.selectPhysical.FirstTypeList.map(item => {
							//   tempcfpflt.push(item.value);
							// });
							// console.log(tempcfpflt);
							// var tempcfpflt1 = this.selectPhysical.confirmProjectfirsttype;
							// this.selectPhysical.confirmProjectfirsttype = [];
							// tempcfpflt.map(item => {
							//   if (tempcfpflt1.indexOf(item) >= 0) {
							//     this.selectPhysical.confirmProjectfirsttype.push(item);
							//     tempcfpflt1.splice(tempcfpflt1.indexOf(item), 1);
							//   }
							// });
							// console.log(this.selectPhysical.confirmProjectfirsttype);
							// this.selectPhysical.confirmProjectfirsttype.map(item => {
							//   res.data.goodchecktypes.map((temp, index) => {
							//     if (item == temp.goodchecktypefirst) {
							//       temp.goodcheckdetail.map(good => {
							//         let obj = {
							//           checktypefirst: temp.goodchecktypefirst,
							//           checkdescribe: good.checkdescribe,
							//           checkid: good.checkid,
							//           checklowprice: good.checklowprice,
							//           checkname: good.checkname,
							//           checkprice: good.checkprice,
							//           checksignificance: good.checksignificance
							//         };
							//         this.selectPhysical.confirmProjectList.push(obj);
							//       });
							//     }
							//   });
							// });
						}
					});
			},
			//Closecity
			Closecity(obj) {
				if(this.$route.query.look) {} else {
					console.log(obj);
					this.selectCity.checkedCities.splice(
						this.selectCity.checkedCities.indexOf(obj),
						1
					);
					this.selectShop.confirmshopList = this.selectShop.confirmshopList.filter(
						item => item.CityName != obj
					);
				}
			},
			//Closeshop
			Closeshop(obj) {
				console.log(obj);
				if(this.$route.query.look) {} else {
					this.selectShop.confirmshopList.map((item, index) => {
						if(item.Id == obj) {
							this.selectShop.confirmshopList.splice(index, 1);
						}
					});
				}
			},
			//Closeproject
			Closeproject(obj) {
				this.selectPhysical.confirmProjectList.map((item, index) => {
					if(item.checkid == obj) {
						this.selectPhysical.confirmProjectList.splice(index, 1);
					}
				});
				console.log(this.selectPhysical.confirmProjectList);
				this.selectPhysical.confirmProjectfirsttype.map((item, index) => {
					var num = 0;
					this.selectPhysical.confirmProjectList.map(temp => {
						if(item == temp.checktypefirst) {
							num++;
						}
					});
					if(num == 0) {
						this.selectPhysical.confirmProjectfirsttype.splice(index, 1);
					}
				});
			},
			//Closeaddpacket
			Closeaddpacket(obj) {
				// selectAddPackage.confirmProjectList
				this.selectAddPackage.confirmProjectList.map((item, index) => {
					if(item.goodid == obj) {
						this.selectAddPackage.confirmProjectList.splice(index, 1);
					}
				});
			},
			//商品售价输入限制
			AddGoodsPriceinput() {
				this.AddGoodsmsg.AddGoodsPrice = this.AddGoodsmsg.AddGoodsPrice.replace(
					/[^\.\d]/g,
					""
				);
				this.AddGoodsmsg.AddGoodsPrice = this.AddGoodsmsg.AddGoodsPrice.replace(
					".",
					""
				);
			},
			//商品售价change
			AddGoodsPricechange() {
				// if (
				//   !this.AddGoodsmsg.AddGoodsPrice ||
				//   this.AddGoodsmsg.AddGoodsPrice == "" ||
				//   this.AddGoodsmsg.AddGoodsPrice == null
				// ) {
				this.AddGoodsmsg.AddGoodsMiniprice = "";
				// }
			},
			//划线价输入限制
			goodlinepriceinput() {
				console.log(this.AddGoodsmsg.goodlineprice)
				this.AddGoodsmsg.goodlineprice = this.AddGoodsmsg.goodlineprice.replace(
					/[^\.\d]/g,
					""
				);
				this.AddGoodsmsg.goodlineprice = this.AddGoodsmsg.goodlineprice.replace(
					".",
					""
				);
			},
			//划线价change
			goodlinepricechange() {
				// if (
				//   !this.AddGoodsmsg.AddGoodsPrice ||
				//   this.AddGoodsmsg.AddGoodsPrice == "" ||
				//   this.AddGoodsmsg.AddGoodsPrice == null
				// ) {
				//				this.AddGoodsmsg.goodlineprice = "";
				// }
			},
			//商品最低价输入限制
			AddGoodsMinipriceinput() {
				this.AddGoodsmsg.AddGoodsMiniprice = this.AddGoodsmsg.AddGoodsMiniprice.replace(
					/[^\.\d]/g,
					""
				);
				this.AddGoodsmsg.AddGoodsMiniprice = this.AddGoodsmsg.AddGoodsMiniprice.replace(
					".",
					""
				);
			},
			//查询体检项目列表
			ProjectListQuery(bool) {
				var body = {
					checktypefirst: this.selectPhysical.FirstTypeValue,
					checktypesec: this.selectPhysical.SecondTypevalue,
					checkname: this.selectPhysical.seekPackageName,
					checkgender: this.selectPhysical.seeksex,
					page: 1,
					pagesize: 99999999,
					instname: this.AddGoodsmsg.Filiale
				};
				this.$api.get("/manage/queryWeiBaoCheckForGoods", body).then(res => {
					if(res.code == "200") {
						this.selectPhysical.loading = false;
						this.selectPhysical.projectList = res.data.data;
						this.selectPhysical.projectCount = res.data.count;
						console.log(this.selectPhysical.projectList);
						this.selectPhysical.projectList.map((item, index) => {
							this.selectPhysical.projectList[index].key = item.checkid;
							this.selectPhysical.projectList[index].label =
								item.instcityid +
								" - " +
								item.checkname +
								" - " +
								item.checkdescribe;
						});
						// if (bool == "1") {
						// }
					} else {
						this.selectPhysical.loading = false;
						this.$message.error(res.msg);
					}
				});
			},
			//查询加项包列表
			manageQueryAddPackIndex(bool) {
				this.selectAddPackage.loading = true;
				var goodids = [];
				this.AddGoodsmsg.goodaddpackage.map(item => {
					goodids.push(item.goodid);

				});
				var body = {
					//					goodtype: this.selectAddPackage.SecondTypevalue,
					//					goodname: this.selectAddPackage.seekPackageName,
					//					instname: this.AddGoodsmsg.Filiale,
					//					goodputaway: "上架",
					goodids: goodids,
					page: 1,
					pagesize: 99999999
				};
				this.$api.get("/manage/queryWeiBaoAddPackageForGoods", body).then(res => {
					if(res.code == "200") {
						this.selectAddPackage.loading = false;
						this.selectAddPackage.projectCount = res.data.count;
						if(res.data.data && res.data.data.length > 0) {
							this.selectAddPackage.projectList = res.data.data;
							console.log(this.selectAddPackage.projectList);
							console.log(this.selectAddPackage);
							this.selectAddPackage.projectList.map((item, index) => {
								this.selectAddPackage.projectList[index].key = item.goodid;
//								console.log(item.goodid)
								if(item.gender){
									if(item.gender=="通用"){
										if(item.marital){
											if(item.marital=="通用"){
											this.selectAddPackage.projectList[index].label =
									        item.goodid + " - " + item.goodtype + " - " + item.goodname;
										}else{
											this.selectAddPackage.projectList[index].label =
									        item.goodid + " - " + item.goodtype + " - " + item.goodname+" - " + item.marital;
											
										   }
										}else{
											
											this.selectAddPackage.projectList[index].label =
									       item.goodid + " - " + item.goodtype + " - " + item.goodname;
										}
									}else{
										if(item.marital){
											if(item.marital=="通用"){
											this.selectAddPackage.projectList[index].label =
									        item.goodid + " - " + item.goodtype + " - " + item.goodname+ " - " + item.gender;
										}else{
											this.selectAddPackage.projectList[index].label =
									        item.goodid + " - " + item.goodtype + " - " + item.goodname+ " - " + item.gender+ " - " + item.marital;
											
										   }
										}else{
											
											this.selectAddPackage.projectList[index].label =
									       item.goodid + " - " + item.goodtype + " - " + item.goodname;
										}
										
									   
										
									}
									
								}else{
									this.selectAddPackage.projectList[index].label =
									 item.goodid + " - " + item.goodtype + " - " + item.goodname;
									
								}
								
							});
							console.log(this.selectAddPackage.projectList);
						} else {
							this.selectAddPackage.projectList = [];
							this.$message.error("暂无可选加项");
						}

						// if (bool == "1") {
						//   this.selectAddPackage.isshow = true;
						//   if (this.selectAddPackage.projectCount > 0) {
						//     setTimeout(() => {
						//       this.$refs.ProjectRef.clearSelection();
						//       setTimeout(() => {
						//         this.selectAddPackage.isshowtable = true;
						//       }, 0);
						//       // this.confirmProjectList.map(element => {
						//       //   this.selectPhysical.projectList.map((item, info) => {
						//       //     if (item.checkid == element.checkid) {
						//       //       this.$refs.ProjectRef.toggleRowSelection(item);
						//       //     }
						//       //   });
						//       // });
						//     }, 0);
						//   }
						// }
					}
				});
			},
			//选择城市按钮
			selectCityBtn() {
				console.log(this.selectCity.checkedCities);

				this.selectCity.allcity = false;
				this.selectCity.cities = [];
				this.selectCity.isshow = true;
				this.$api.get("/city/pullCityByProvince").then(res => {
					console.log(res);
					if(res.code == "200") {
						res.data.map((city_id, n) => {
							let mc = {
								_id: city_id._id,
								checked: false,
								indeterminate: false
							};
							res.data[n]._id = mc;
							city_id.citynames.map((temp, m) => {
								let ms = {
									city: temp,
									checked: false
								};
								res.data[n].citynames[m] = ms;
							});
						});
						this.selectCity.cities = res.data;
						console.log(res.data);
						this.selectCity.checkedCities.map(city => {
							this.selectCity.cities.map((item, n) => {
								item.citynames.map((temp, m) => {
									if(city == temp.city) {
										this.selectCity.cities[n].citynames[m].checked = true;
										this.handleCheckedCitiesChange(item.citynames, n);
									}
								});
							});
						});
					}
				});
			},
			//选择门店按钮
			selectShopBtn() {
				this.selectShop.loading = true;
				this.selectShop.addshop = false;
				if(this.selectCity.checkedCities.length > 0) {
					this.selectShop.shopcurrentPage = 1;
					this.selectShop.isshow = true;
					var body = {
						page: this.selectShop.shopcurrentPage,
						pageSize: 100000,
						cityNames: this.selectCity.checkedCities
					};
					// let cityNames = "";
					// this.selectCity.checkedCities.map(item => {
					// cityNames = cityNames + "cityNames=" + item + "&";
					// });
					this.$api.post("/center/pullByCityNames", body).then(res => {
						console.log(res);
						if(res.code == "200") {
							this.selectShop.shopList = res.data.data;
							this.selectShop.shopCount = res.data.count;
						}
						console.log(this.selectShop.shopList);
						this.selectShop.shopList.map((item, index) => {
							this.selectShop.shopList[index].label = item.CenterName;
							this.selectShop.shopList[index].key = item.Id;
						});
						console.log(this.selectShop.selecshopList);
						this.selectShop.selecshopList = [];
						console.log(this.selectShop.confirmshopList);
						this.selectShop.confirmshopList.map(item => {
							this.selectShop.selecshopList.push(item.Id);
						});
						// this.selectShop.tempshopList = this.selectShop.confirmshopList;
						// this.$refs.shopProjectRef.clearSelection();
						// this.selectShop.tempshopList.map(item => {
						//   this.selectShop.shopList.map(temp => {
						//     if (item.Id == temp.Id) {
						//       this.$refs.shopProjectRef.toggleRowSelection(temp);
						//     }
						//   });
						// });
						//
						this.selectShop.loading = false;
					});
				} else {
					this.selectShop.loading = false;
					this.$message.error("请先选择城市！");
				}
			},
			//添加门店按钮
			// selectShopBtn1() {
			//   this.selectShopBtn();
			//   this.selectShop.addshop = true;
			// },
			//通过城市查询门店接口
			pullByCityNames() {
				var body = {
					page: this.selectShop.shopcurrentPage,
					pageSize: this.selectShop.shoppageSize,
					centerName: this.selectShop.centerName
				};
				if(!this.selectShop.selectcityseek) {
					var cityNames = "";
					this.selectCity.checkedCities.map(item => {
						cityNames = cityNames + "cityNames=" + item + "&";
					});
				} else {
					cityNames = "cityNames=" + this.selectShop.selectcityseek;
				}
				this.$api.get("/center/pullByCityNames?" + cityNames, body).then(res => {
					console.log(res);
					if(res.code == "200") {
						this.selectShop.shopList = res.data.data;
						this.selectShop.shopCount = res.data.count;

						// this.selectShop.tempshopList.map(item => {
						//   this.selectShop.shopList.map(temp => {
						//     if (item.Id == temp.Id) {
						//       this.$refs.shopProjectRef.toggleRowSelection(temp);
						//     }
						//   });
						// });
					}
				});
			},
			//选择体检项目按钮
			selectPhysicalBtn() {
				this.selectPhysical.loading = true;
				console.log(this.selectPhysical.confirmProjectList);
				this.selectPhysical.selectProjectList = [];
				this.selectPhysical.confirmProjectList.map(item => {
					this.selectPhysical.selectProjectList.push(item.checkid);
				});
				this.selectPhysical.addPhysical = false;
				this.selectPhysical.isshowtable = false;
				this.selectPhysical.isshow = true;

				this.selectPhysical.projectList = [];
				this.selectPhysical.projectcurrentPage = 1;
				this.selectPhysical.FirstTypeValue = "";
				this.selectPhysical.SecondTypevalue = "";
				this.ProjectListQuery("1"); //查询体检项目
			},
			// selectPhysicalBtn1() {
			//   this.selectPhysicalBtn();
			//   this.selectPhysical.addPhysical = true;
			// },
			//确认选择的体检项目btn
			confirmProjectBtn() {
				if(this.selectPhysical.addPhysical) {
					this.selectPhysical.confirmProjectList.map(item => {
						this.selectPhysical.selectProjectList = this.selectPhysical.selectProjectList.filter(
							temp => temp.checkid != item.checkid
						);
					});
					this.selectPhysical.confirmProjectList = this.selectPhysical.confirmProjectList.concat(
						this.selectPhysical.selectProjectList
					);
				} else {
					console.log(this.selectPhysical.selectProjectList);
					console.log(this.selectPhysical.projectList);
					this.selectPhysical.confirmProjectList = [];
					this.selectPhysical.selectProjectList.map((item, index) => {
						for(let i = 0; i < this.selectPhysical.projectList.length; i++) {
							if(this.selectPhysical.projectList[i].checkid == item) {
								this.selectPhysical.selectProjectList[
									index
								] = this.selectPhysical.projectList[i];
								break;
							}
						}
					});
					this.selectPhysical.confirmProjectList = this.selectPhysical.selectProjectList;
				}
				this.selectPhysical.confirmProjectfirsttype = [];
				console.log(this.selectPhysical.confirmProjectList);
				console.log(this.selectPhysical.FirstTypeList);
				//所有一级类别数据
				var allfirstlist = [];
				this.selectPhysical.FirstTypeList.map(item => {
					allfirstlist.push(item.value);
				});
				console.log(allfirstlist);

				//需要排序的一级类别数据
				var checkfirstlist = [];
				this.selectPhysical.confirmProjectList.map((item, index) => {
					if(checkfirstlist.indexOf(item.checktypefirst) < 0) {
						checkfirstlist.push(item.checktypefirst);
					}
				});
				console.log(checkfirstlist);

				//排序
				this.selectPhysical.confirmProjectfirsttype = [];
				allfirstlist.map(item => {
					if(checkfirstlist.indexOf(item) >= 0) {
						this.selectPhysical.confirmProjectfirsttype.push(item);
					}
				});
				console.log(this.selectPhysical.confirmProjectfirsttype);

				//按一级类别排序原数组
				var confirmlist = this.selectPhysical.confirmProjectList;
				console.log(confirmlist);
				this.selectPhysical.confirmProjectList = [];
				this.selectPhysical.confirmProjectfirsttype.map(item => {
					for(let i = 0; i < confirmlist.length; i++) {
						if(item == confirmlist[i].checktypefirst) {
							this.selectPhysical.confirmProjectList.push(confirmlist[i]);
						}
					}
				});
				console.log(this.selectPhysical.confirmProjectList);
				// var selectProjectListtemp = this.selectPhysical.confirmProjectList;
				// this.selectPhysical.confirmProjectList = [];
				// console.log(this.selectPhysical.confirmProjectList);
				// var tempcfpflt = [];
				// this.selectPhysical.FirstTypeList.map(item => {
				//   tempcfpflt.push(item.value);
				// });
				// console.log(tempcfpflt);
				// var tempcfpflt1 = this.selectPhysical.confirmProjectfirsttype;
				// this.selectPhysical.confirmProjectfirsttype = [];
				// tempcfpflt.map(item => {
				//   if (tempcfpflt1.indexOf(item) >= 0) {
				//     this.selectPhysical.confirmProjectfirsttype.push(item);
				//     tempcfpflt1.splice(tempcfpflt1.indexOf(item), 1);
				//   }
				// });

				// this.selectPhysical.confirmProjectfirsttype.map(item => {
				//   selectProjectListtemp.map(temp => {
				//     if (item == temp.checktypefirst) {
				//       this.selectPhysical.confirmProjectList.push(temp);
				//     }
				//   });
				// });
				// console.log(this.selectPhysical.confirmProjectList);

				this.selectPhysical.isshow = false;
			},
			//选择加项包按钮
			selectAddPackageBtn() {
				this.selectAddPackage.loading = true;
				this.selectAddPackage.isshow = true;
				this.selectAddPackage.addpackage = false;
				this.selectAddPackage.isshowtable = false;
				this.selectAddPackage.projectList = [];
				this.selectAddPackage.projectcurrentPage = 1;
				this.selectAddPackage.FirstTypeValue = "";
				this.selectAddPackage.SecondTypevalue = "";
				this.selectAddPackage.selectProjectList = [];
				this.selectAddPackage.confirmProjectList.map(item => {
					this.selectAddPackage.selectProjectList.push(item.goodid);
				});
				this.manageQueryAddPackIndex("1");
			},
			// selectAddPackageBtn1() {
			//   this.selectAddPackageBtn();
			//   this.selectAddPackage.addpackage = true;
			// },
			//确认选择的加项包btn
			confirmAddPackageBtn() {
				this.selectAddPackage.confirmProjectList = [];
				console.log(this.selectAddPackage.selectProjectList);
				console.log(this.selectAddPackage.addpackage);
				if(this.selectAddPackage.addpackage) {
					this.selectAddPackage.confirmProjectList.map(item => {
						this.selectAddPackage.selectProjectList = this.selectAddPackage.selectProjectList.filter(
							temp => temp.goodid != item.goodid
						);
					});
					this.selectAddPackage.confirmProjectList = this.selectAddPackage.confirmProjectList.concat(
						this.selectAddPackage.selectProjectList
					);
				} else {
					this.selectAddPackage.projectList.map(item => {
						if(
							this.selectAddPackage.selectProjectList.indexOf(item.goodid) >= 0
						) {
							this.selectAddPackage.confirmProjectList.push(item);
						}
					});
					// this.selectAddPackage.confirmProjectList = this.selectAddPackage.selectProjectList;
				}
				console.log(this.selectAddPackage.projectList);
				console.log(this.selectAddPackage.selectProjectList);
				console.log(this.selectAddPackage.confirmProjectList);
				this.selectAddPackage.isshow = false;
			},
			//确认选择的门店Btn
			confirmshopBtn() {
				if(this.selectShop.addshop) {
					this.selectShop.confirmshopList.map(item => {
						this.selectShop.selecshopList = this.selectShop.selecshopList.filter(
							temp => temp.Id != item.Id
						);
					});
					this.selectShop.confirmshopList = this.selectShop.confirmshopList.concat(
						this.selectShop.selecshopList
					);
				} else {
					console.log(this.selectShop.selecshopList);

					this.selectShop.selecshopList.map((item, index) => {
						for(let i = 0; i < this.selectShop.shopList.length; i++) {
							if(item == this.selectShop.shopList[i].key) {
								this.selectShop.selecshopList[index] = this.selectShop.shopList[
									i
								];
								break;
							}
						}
					});
					this.selectShop.confirmshopList = this.selectShop.selecshopList;
				}
				this.selectShop.isshow = false;
				console.log(this.selectShop.confirmshopList);
			},
			//查询所有--一级类目
			queryAllCheckDirFir() {
				this.selectPhysical.FirstTypeList = [{
					value: "全部",
					label: "全部"
				}];
				this.$api.post("/manage/queryAllCheckDirFir").then(res => {
					console.log(res);
					if(res.code == "200") {
						res.data.map(item => {
							var temp = {
								value: item.checktypefirst,
								label: item.checktypefirst
							};
							this.selectPhysical.FirstTypeList.push(temp);
						});
						if(this.isedit || this.$route.query.copy) {
							this.manageQueryGoodById(this.$route.query.goodsid);
						} else {
							this.GetOneByName();
							this.firstTxtisshow = true;
						}
					}
				});
			},
			//查询所有--二级类目
			queryAllCheckDirSec() {
				this.selectPhysical.SecondTypeList = [];
				this.$api
					.post("/manage/queryAllCheckDirSec", {
						checktypefirst: this.selectPhysical.FirstTypeValue
					})
					.then(res => {
						console.log(res);
						if(res.code == "200") {
							res.data.map(item => {
								var temp = {
									value: item.checktypesec,
									label: item.checktypesec
								};
								this.selectPhysical.SecondTypeList.push(temp);
							});
						}
					});
			},
			//输入校验
			Inputvalidation() {
				if(!this.AddGoodsmsg.AddGoodsType) {
					this.$message.error("请选择商品类型");
					return false;
				}
				if(!this.AddGoodsmsg.Filiale) {
					this.$message.error("请选择分公司");
					return false;
				}
				if(!this.AddGoodsmsg.AddGoodsName) {
					this.$message.error("请输入商品名称");
					return false;
				}
				if(this.AddGoodsmsg.AddGoodsPrice==="") {
					this.$message.error("请输入套餐原价");
					return false;
					if(this.AddGoodsmsg.AddGoodsPrice<=-1){
						this.$message.error("套餐原价大于等于0");
					    return false;
					}
				}
				console.log(this.AddGoodsmsg.goodlineprice)
				if(this.AddGoodsmsg.goodlineprice==="") {
					console.log(11111111)
					this.$message.error("请输入实际价格");
					return false;
					if(this.AddGoodsmsg.goodlineprice<=-1){
						this.$message.error("实际价格大于等于0");
					    return false;
					}
				}
//				if(this.AddGoodsmsg.AddGoodsPrice <0) {
//					this.$message.error("售价不可小于0");
//					return false;
//				}
				if(
					Number(this.AddGoodsmsg.AddGoodsPrice) <
					Number(this.AddGoodsmsg.AddGoodsMiniprice)
				) {
					this.$message.error("最低价不能大于售价");
					return false;
				}
				if(this.selectCity.checkedCities.length <= 0) {
					this.$message.error("请选择城市");
					return false;
				}
				if(this.selectShop.confirmshopList.length <= 0) {
					this.$message.error("请选择门店");
					return false;
				}
				// if (this.selectPhysical.confirmProjectList.length <= 0) {
				//   this.$message.error("请选择体检项目");
				//   return false;
				// }
				return true;
			},
			//新增商品按钮/保存草稿按钮
			manageInsertGood(str) {
				if(this.Inputvalidation()) {
					var body = {
						gender:this.AddGoodsmsg.sex,
						marital:this.AddGoodsmsg.marriage,
						goodtype: this.AddGoodsmsg.AddGoodsType,
						goodname: this.AddGoodsmsg.AddGoodsName,
						instname: this.AddGoodsmsg.Filiale,
						goodprice: Number(this.AddGoodsmsg.AddGoodsPrice),
						goodlowprice: Number(this.AddGoodsmsg.AddGoodsMiniprice),
						goodinst: [],
						goodchecktypes: [],
						goodaddpackage: [],
						goodputaway: str,
						grouptype: this.AddGoodsmsg.grouptype,
						groupid: this.AddGoodsmsg.groupid,
						gooddescribe: this.content,
						goodlineprice: Number(this.AddGoodsmsg.goodlineprice),
					};
					this.selectCity.checkedCities.map(item => {
						let obj = {
							instcity: item,
							instsalepointname: []
						};
						body.goodinst.push(obj);
					});
					console.log(body.goodinst);
					if(body.goodinst.length == 1 && body.goodinst[0].instcity == "全国") {
						this.selectShop.confirmshopList.map(temp => {
							let obj = {
								CenterName: temp.CenterName,
								Id: temp.Id,
								CityName: temp.CityName
							};
							body.goodinst[0].instsalepointname.push(obj);
						});
					} else {
						body.goodinst.map((item, index) => {
							this.selectShop.confirmshopList.map(temp => {
								if(item.instcity == temp.CityName) {
									let obj = {
										CenterName: temp.CenterName,
										Id: temp.Id,
										CityName: temp.CityName
									};
									body.goodinst[index].instsalepointname.push(obj);
								}
							});
						});
					}

					body.goodchecktypes.goodchecktypes = [];
					this.selectPhysical.confirmProjectfirsttype.map(item => {
						let obj = {
							goodchecktypefirst: item,
							goodcheckdetail: []
						};
						body.goodchecktypes.push(obj);
					});
					body.goodchecktypes.map((item, n) => {
						this.selectPhysical.confirmProjectList.map(temp => {
							if(item.goodchecktypefirst == temp.checktypefirst) {
								let goodcheckdetail = {
									checkdescribe: temp.checkdescribe,
									checkname: temp.checkname,
									checkprice: temp.checkprice,
									checkid: temp.checkid,
									checklowprice: temp.checklowprice,
									checksignificance: temp.checksignificance
								};
								body.goodchecktypes[n].goodcheckdetail.push(goodcheckdetail);
							}
						});
					});
					this.selectAddPackage.confirmProjectList.map(item => {
						let obj = {
							goodname: item.goodname,
							goodsaleprice: item.goodsaleprice,
							goodcheckrecommended: item.goodcheckrecommended,
							goodid: item.goodid
						};
						body.goodaddpackage.push(obj);
					});
					this.$api
						.post("/manage/insertWeiBaoGood", body)
						.then(res => {
							console.log(res);
							if(res.code == "200") {
								this.$router.go(-1);
								this.$message.success("新增商品成功！");
							}
						})
						.catch(res => {
							this.$message.error(res.msg);
						});
				}
			},
			//编辑商品按钮/保存草稿按钮
			manageupdategood(str) {
				console.log(this.selectShop);
				console.log(this.AddGoodsmsg);
				if(this.Inputvalidation()) {
					var body = {};
					body = this.editgoodsobj;
					body.gender=this.AddGoodsmsg.sex,
					body.marital=this.AddGoodsmsg.marriage,
					body.goodtype = this.AddGoodsmsg.AddGoodsType;
					body.goodname = this.AddGoodsmsg.AddGoodsName;
					body.instname = this.AddGoodsmsg.Filiale;
					body.goodprice = Number(this.AddGoodsmsg.AddGoodsPrice);
					body.goodlowprice = Number(this.AddGoodsmsg.AddGoodsMiniprice);
					body.grouptype = this.AddGoodsmsg.grouptype;
					body.groupid = this.AddGoodsmsg.groupid;
					body.goodputaway = str;
					body.goodinst = [];
					body.goodchecktypes = [];
					body.goodaddpackage = [];
					body.gooddescribe = this.content;
					body.goodlineprice=Number(this.AddGoodsmsg.goodlineprice);

					this.selectCity.checkedCities.map(item => {
						let obj = {
							instcity: item,
							instsalepointname: []
						};
						body.goodinst.push(obj);
					});
					if(body.goodinst.length == 1 && body.goodinst[0].instcity == "全国") {
						console.log(11111);

						this.selectShop.confirmshopList.map(temp => {
							let obj = {
								CenterName: temp.CenterName,
								Id: temp.Id,
								CityName: temp.CityName
							};
							body.goodinst[0].instsalepointname.push(obj);
						});
						console.log(body.goodinst);
					} else {
						body.goodinst.map((item, index) => {
							this.selectShop.confirmshopList.map(temp => {
								if(item.instcity == temp.CityName) {
									let obj = {
										CenterName: temp.CenterName,
										Id: temp.Id,
										CityName: temp.CityName
									};
									body.goodinst[index].instsalepointname.push(obj);
								}
							});
						});
					}
					console.log(body.goodinst);
					body.goodchecktypes.goodchecktypes = [];
					this.selectPhysical.confirmProjectfirsttype.map(item => {
						let obj = {
							goodchecktypefirst: item,
							goodcheckdetail: []
						};
						body.goodchecktypes.push(obj);
					});
					body.goodchecktypes.map((item, n) => {
						this.selectPhysical.confirmProjectList.map(temp => {
							if(item.goodchecktypefirst == temp.checktypefirst) {
								let goodcheckdetail = {
									checkdescribe: temp.checkdescribe,
									checkname: temp.checkname,
									checkprice: temp.checkprice,
									checkid: temp.checkid,
									checklowprice: temp.checklowprice,
									checksignificance: temp.checksignificance
								};
								body.goodchecktypes[n].goodcheckdetail.push(goodcheckdetail);
							}
						});
					});
					this.selectAddPackage.confirmProjectList.map(item => {
						let obj = {
							goodname: item.goodname,
							goodsaleprice: item.goodsaleprice,
							goodcheckrecommended: item.goodcheckrecommended,
							goodid: item.goodid
						};
						body.goodaddpackage.push(obj);
					});
					this.$api
						.post("/manage/updateWeiBaoGood", body)
						.then(res => {
							console.log(res);
							if(res.code == "200") {
								this.$router.go(-1);
								this.$message.success("修改商品成功！");
							}
						})
						.catch(res => {
							this.$message.error(res.msg);
						});
				}
			},

			//体检项目table多选事件
			handleSelectionChange(val) {
				console.log(val);
				this.selectPhysical.selectProjectList = val;
			},
			//加项包table多选事件
			handleSelectionChange1(val) {
				console.log(val);
				this.selectAddPackage.selectProjectList = val;
			},
			//门店table多选事件
			handleSelectionChange2(val) {
				console.log(this.deteleObject(val));
				console.log(this.selectShop.selecshopList);
				this.selectShop.selecshopList = this.deteleObject(val);
			},
			SelectionChangeshop(val, n, m) {
				console.log(val, n, m);
			},
			deteleObject(obj) {
				var uniques = [];
				var stringify = {};
				for(var i = 0; i < obj.length; i++) {
					var keys = Object.keys(obj[i]);
					keys.sort(function(a, b) {
						return Number(a) - Number(b);
					});
					var str = "";
					for(var j = 0; j < keys.length; j++) {
						str += JSON.stringify(keys[j]);
						str += JSON.stringify(obj[i][keys[j]]);
					}
					if(!stringify.hasOwnProperty(str)) {
						uniques.push(obj[i]);
						stringify[str] = true;
					}
				}
				uniques = uniques;
				return uniques;
			},
			//体检项目分页条数
			handleSizeChange(val) {
				this.selectPhysical.projectpageSize = val;
				console.log(`每页 ${val} 条`);
				this.ProjectListQuery();
			},
			//体检项目分页当前页
			handleCurrentChange(val) {
				this.selectPhysical.projectcurrentPage = val;
				console.log(`当前页: ${val}`);
				this.ProjectListQuery();
			},
			//加项包分页条数
			handleSizeChange1(val) {
				this.selectAddPackage.projectpageSize = val;
				console.log(`每页 ${val} 条`);
				this.manageQueryAddPackIndex();
			},
			//加项包分页当前页
			handleCurrentChange1(val) {
				this.selectAddPackage.projectcurrentPage = val;
				console.log(`当前页: ${val}`);
				this.manageQueryAddPackIndex();
			},
			//门店分页条数
			handleSizeChange2(val) {
				this.selectCity.shopcurrentPage = 1;
				this.selectShop.shoppageSize = val;
				console.log(`每页 ${val} 条`);
				this.pullByCityNames();
			},
			//门店分页当前页
			handleCurrentChange2(val) {
				this.selectShop.shopcurrentPage = val;
				console.log(`当前页: ${val}`);
				this.pullByCityNames();
			},
			//城市勾选按钮事件
			handleCheckedCitiesChange(city_id, index) {
				console.log(city_id);

				var num = 0;
				city_id.map(temp => {
					if(temp.checked) {
						num++;
					}
				});
				if(num == city_id.length) {
					this.selectCity.cities[index]._id.checked = true;
					this.selectCity.cities[index]._id.indeterminate = false;
				} else if(num > 0) {
					this.selectCity.cities[index]._id.indeterminate = true;
				} else {
					this.selectCity.cities[index]._id.checked = false;
					this.selectCity.cities[index]._id.indeterminate = false;
				}
			},
			//省份全选事件
			cityidAllselect(val) {
				this.selectCity.cities[val]._id.indeterminate = false;
				this.selectCity.cities[val].citynames.map((item, index) => {
					if(this.selectCity.cities[val]._id.checked) {
						this.selectCity.cities[val].citynames[index].checked = true;
					} else {
						this.selectCity.cities[val].citynames[index].checked = false;
					}
				});
				// this.checkedCities = val ? cityOptions : [];
			},
			//全选城市
			cityidAll(val) {
				console.log(val);
				if(val) {
					this.selectCity.cities.map((item, index) => {
						this.selectCity.cities[index]._id.checked = true;
						this.selectCity.cities[index]._id.indeterminate = false;
						this.cityidAllselect(index);
					});
				} else {
					this.selectCity.cities.map((item, index) => {
						this.selectCity.cities[index]._id.checked = false;
						this.selectCity.cities[index]._id.indeterminate = false;
						this.cityidAllselect(index);
					});
				}
			},
			//全国
			citynationwide(val) {
				console.log(val);
				this.selectCity.allcity = false;
				this.cityidAll(this.selectCity.allcity);
			},
			//确认选择城市
			confirmSelectCity() {
				this.selectShop.confirmshopList = []
				if(this.selectCity.nationwide) {
					this.selectCity.checkedCities = ["全国"];
					this.selectCity.isshow = false;
				} else {
					this.selectCity.checkedCities = [];
					this.selectCity.cities.map(item => {
						item.citynames.map(temp => {
							if(temp.checked) {
								this.selectCity.checkedCities.push(temp.city);
							}
						});
					});
					console.log(this.selectCity.checkedCities);
					this.selectCity.isshow = false;
				}
			},
			delconfirmProjectList(index) {
				this.$confirm("是否删除该体检项目", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						type: "warning"
					})
					.then(() => {
						this.selectPhysical.confirmProjectList.splice(index, 1);
						this.$message({
							type: "success",
							message: "删除成功!"
						});
					})
					.catch(() => {
						this.$message({
							type: "info",
							message: "已取消删除"
						});
					});
			},
			topconfirmProjectList(index) {
				var temp = this.selectPhysical.confirmProjectList[index];
				this.selectPhysical.confirmProjectList.splice(index, 1);
				this.selectPhysical.confirmProjectList.unshift(temp);
				// var checktypefirsttemp = temp.checktypefirst;
				// var confirmProjectfirsttypeindex = this.selectPhysical.confirmProjectfirsttype.indexOf(
				//   checktypefirsttemp
				// );
				// this.selectPhysical.confirmProjectfirsttype.splice(
				//   confirmProjectfirsttypeindex,
				//   1
				// );
				// this.selectPhysical.confirmProjectfirsttype.unshift(checktypefirsttemp);

				var selectProjectListtemp = this.selectPhysical.confirmProjectList;
				this.selectPhysical.confirmProjectList = [];
				this.selectPhysical.confirmProjectfirsttype.map(item => {
					selectProjectListtemp.map(temp => {
						if(item == temp.checktypefirst) {
							this.selectPhysical.confirmProjectList.push(temp);
						}
					});
				});
			}

			// onEditorReady(editor) {
			//   // 准备编辑器
			// },
			// onEditorBlur() {}, // 失去焦点事件
			// onEditorFocus() {}, // 获得焦点事件
			// onEditorChange(e) {
			//   console.log(e);
			//   this.content = e.html;
			// }, // 内容改变事件
			// saveHtml: function(event) {
			//   alert(this.content);
			// }
		},
		computed: {
			editor() {
				return this.$refs.myQuillEditor.quill;
			},
			// selectPhysical.confirmProjectList  checkprice checklowprice
			checklowpriceTotal() {
				var checklowpriceTotalnum = 0;
				if(this.selectPhysical.confirmProjectList) {
					this.selectPhysical.confirmProjectList.map(item => {
						// console.log(item);

						checklowpriceTotalnum += Number(item.checklowprice);
					});
					return checklowpriceTotalnum;
				}
			},
			checkpriceTotal() {
				var checkpriceTotalnum = 0;
				if(this.selectPhysical.confirmProjectList) {
					this.selectPhysical.confirmProjectList.map(item => {
						// console.log(item);

						checkpriceTotalnum += Number(item.checkprice);
					});
					return checkpriceTotalnum;
				}
			}
		}
	};
</script>

<style lang="scss">
	.mytransfer {
		width: 80%;
		// height: 500px;
		margin: 20px auto;
	}
	
	.goodsmsgtitle {
		font-size: 20px;
	}
	
	.cityboxtitle {
		width: 120px;
		text-align: right;
		float: left;
		font-size: 14px;
		color: #606266;
		line-height: 40px;
		padding: 0 12px 0 0;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
	}
	
	.cityselectbox {
		min-height: 100px;
		margin: 20px 200px 20px 120px;
		border: 1px solid #cccccc;
		border-radius: 4px;
		padding-bottom: 10px;
	}
	
	.cityselectbox1 {
		// min-height: 100px;
		margin: 20px 20px 20px 120px;
		// border: 1px solid #cccccc;
		// border-radius: 4px;
		// padding-bottom: 10px;
	}
	
	.cityitembox {
		margin: 10px 0px 0 10px;
	}
</style>