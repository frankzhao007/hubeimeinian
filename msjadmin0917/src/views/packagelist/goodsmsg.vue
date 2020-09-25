<template>
  <div class="app-container">
    <div class="goodsmsgtitle">
      <i @click="goback()" class="el-icon-my-back backbtn"></i>
      <span>&nbsp&nbsp&nbsp商品详情</span>
    </div>
    <el-form :inline="true" size="medium" status-icon :model="AddGoodsmsg" :rules="AddGoodsmsgrules" label-width="120px" ref="AddGoodsmsg" style="margin-top:30px" :disabled="$route.query.look">
      <el-form-item label="商品类型：" prop="AddGoodsType">
        <el-select v-model="AddGoodsmsg.AddGoodsType" placeholder="请选择商品类型" style="width:200px" disabled>
          <el-option label="体检套餐" value="体检套餐"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分公司：" prop="Filiale">
        <el-select v-model="AddGoodsmsg.Filiale" placeholder="请选择分公司" style="width:200px" disabled>
          <el-option label value></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品名称：" prop="AddGoodsName">
        <el-input v-model="AddGoodsmsg.AddGoodsName" placeholder="商品名称最多20字" :disabled="isaudit" style="width:200px" maxlength="20"></el-input>
      </el-form-item>
      <div></div>
      <el-form-item label="商品ID：" prop="AddGoodsID">
        <el-input v-model="AddGoodsmsg.AddGoodsID" style="width:200px" disabled placeholder="点击确认后自动生成"></el-input>
      </el-form-item>
      <el-form-item label="门市价：" prop="AddGoodsPrice">
        <el-input v-model="AddGoodsmsg.AddGoodsPrice" :disabled="isaudit" style="width:200px" placeholder="请输入0 ~ 1000000正整数" @input="AddGoodsPriceinput()" maxlength="7" @change="AddGoodsPricechange()"></el-input>
      </el-form-item>
      <div v-if="AddGoodsmsg.AddGoodsType=='虚拟商品'">
        <el-form-item label="使用方式：" prop="usePattern">
          <el-select v-model="AddGoodsmsg.usePattern" :disabled="isaudit" placeholder="请选择使用方式" style="width:200px">
            <el-option label="外部使用" value="外部使用"></el-option>
            <el-option label="内部使用" value="内部使用"></el-option>
          </el-select>
          <!-- <el-input v-model="AddGoodsmsg.usePattern" :disabled="isaudit" style="width:200px" placeholder="" @input="" @change=""></el-input> -->
        </el-form-item>
        <el-form-item v-if="AddGoodsmsg.usePattern=='外部使用'" label="跳转链接：" prop="mipLink">
          <el-input v-model="AddGoodsmsg.mipLink" :disabled="isaudit" style="width:400px" placeholder="" @input="" @change=""></el-input>
        </el-form-item>
        <div></div>
        <el-form-item label="推荐理由：" prop="goodcheckrecommended">
          <el-input type="textarea" v-model="AddGoodsmsg.goodcheckrecommended" maxlength="30" :disabled="isaudit" style="width:300px" placeholder="" @input="" @change=""></el-input>
        </el-form-item>
      </div>
      <div v-if="AddGoodsmsg.AddGoodsType != '虚拟商品'">
        <el-form-item label="预约通道：" prop="AppointmentUrl" v-if="AddGoodsmsg.AddGoodsType == '电子体检卡'">
          <el-select v-model="AddGoodsmsg.AppointmentUrl" style="width:200px" :disabled="isaudit">
            <el-option label="美年好医生" value="美年好医生"></el-option>
            <el-option label="本地体检卡" value="本地体检卡"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="供应成本价：" prop="costprice" v-if="isshowfenxiao()">
          <el-input v-model="AddGoodsmsg.costprice" :disabled="isaudit" style="width:200px" placeholder @input="AddGoodsPriceinput1()" maxlength="7"></el-input>
        </el-form-item>
        <el-form-item label="默认分销价：" prop="pysaleprice" v-if="isshowfenxiao()">
          <el-input v-model="AddGoodsmsg.pysaleprice" :disabled="isaudit" style="width:200px" placeholder @input="AddGoodsPriceinput2()" maxlength="7"></el-input>
        </el-form-item>
        <div></div>
        <el-form-item label="套餐类型：" prop="grouptype" v-if="AddGoodsmsg.AddGoodsType != '电子体检卡'">
          <el-select v-model="AddGoodsmsg.grouptype" placeholder="请选择套餐类型" :disabled="isaudit" style="width:200px">
            <el-option label="全国套餐" value="全国套餐"></el-option>
            <el-option label="地方套餐" value="地方套餐"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="套餐编码：" prop="groupid" v-if="
            AddGoodsmsg.AddGoodsType != '电子体检卡' &&
              AddGoodsmsg.grouptype == '全国套餐'
          ">
          <el-input v-model="AddGoodsmsg.groupid" style="width:200px" :disabled="isaudit" placeholder="请填写套餐编码"></el-input>
        </el-form-item>
        <div></div>
        <el-form-item label="适用性别：" prop="gender">
          <el-select v-model="AddGoodsmsg.gender" placeholder="请选择适用性别" @change="genderchange" style="width:200px">
            <el-option label="通用" value="通用"></el-option>
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="婚姻状况：" prop="marital">
          <el-select v-model="AddGoodsmsg.marital" placeholder="请选择婚姻状况" @change="maritalchange" style="width:200px">
            <el-option label="通用" value="通用"></el-option>
            <el-option label="已婚" value="已婚"></el-option>
            <el-option label="未婚" value="未婚"></el-option>
          </el-select>
        </el-form-item>
      </div>
    </el-form>
    <!-- 上传图片 -->
    <div style="overflow:hidden;">
      <div style="margin-top:20px;">
        <span class="cityboxtitle">
          <!-- <span style="color:#F56C6C;">*</span> -->
          <span>商品图</span>
        </span>
      </div>

      <div style="float:left;width:calc(100% - 130px)">
        <input style="display:none" type="file" id="commodityimage" accept=".jpg, .jpeg, .png" />
        <draggable class="list-group" v-model="AddGoodsmsg.goodimgs" :options="{ animation: 300 }">
          <div v-for="(child, index) in AddGoodsmsg.goodimgs" :key="index" style="float:left;margin-bottom:15px;margin-right:15px; position: relative;" v-on:mouseover="showCross(index)" v-on:mouseout="concealCross(index)">
            <img style="height:120px;width:120px;" :src="child" alt />
            <div style="position: absolute;width:100%;text-align: center; font-size: 18px; bottom:10px; " v-if="index == 0">
              主图
            </div>
            <div style="position: absolute;right:-10px;top:-10px; background: #000000; border-radius:50%;width:20px;height:20px" v-show="imageshow == index" v-if="!isaudit" @click="deletePicture(index)">
              <img src="../../assets/img/close.png" style="width:20px;height:20px" />
            </div>
          </div>
        </draggable>
        <div class="addimage" @click="getFileImg" v-if="AddGoodsmsg.goodimgs.length < 9 && !isaudit">
          <img src="../../assets/img/more.png" style="width:30px;height:30px;" />
        </div>
      </div>

      <!-- <el-button size="medium" @click="getFileImg" type="primary" >选择图片</el-button> -->
    </div>

    <div v-if="AddGoodsmsg.AddGoodsType != '虚拟商品'">
      <!-- 支持的城市 -->
      <div>
        <div style="margin-top:20px;">
          <span class="cityboxtitle">
            <span style="color:#F56C6C;">*</span>
            <span>支持的城市</span>
          </span>

          <el-button size="medium" @click="selectCityBtn()" type="primary" :disabled="$route.query.look || isaudit">选择城市</el-button>
          <span v-if="selectCity.checkedCities[0] != '全国'">
            <span style="margin-left:10px">合计选择：</span>
            <span>{{ selectCity.checkedCities.length || 0 }}个城市</span>
          </span>
        </div>
        <div class="cityselectbox">
          <el-tag v-for="item in selectCity.checkedCities" :key="item" class="cityitembox" :closable="!isaudit" color="#ffffff" @close="Closecity(item)">{{ item }}</el-tag>
        </div>
      </div>
      <!-- 支持的门店 -->
      <div>
        <div style="margin-top:30px;">
          <span class="cityboxtitle">
            <span style="color:#F56C6C;">*</span>
            <span>支持的门店</span>
          </span>
          <el-button size="medium" @click="selectShopBtn()" type="primary" :disabled="$route.query.look || isaudit">选择门店</el-button>
          <el-button size="medium" @click="importShopBtn()" type="primary" :disabled="$route.query.look || isaudit">导入门店</el-button>
          <el-button size="medium" @click="downloadtemplate4()" :disabled="$route.query.look || isaudit">模板下载</el-button>
          <span style="margin-left:10px">合计选择：</span>
          <span>{{ selectShop.confirmshopList.length || 0 }}个门店</span>

          <!-- <el-button style=" border-radius: 18px;" size="medium" icon="el-icon-plus" @click="selectShopBtn1()"></el-button> -->
        </div>
        <div class="cityselectbox">
          <el-tag v-for="item in selectShop.confirmshopList" :key="item.Id" class="cityitembox" :closable="!isaudit" color="#ffffff" @close="Closeshop(item.Id)">{{ item.CenterName }}</el-tag>
        </div>
      </div>
      <!-- 包含的项目 -->
      <div>
        <div style="margin-top:30px;">
          <span class="cityboxtitle">
            <!-- <span style="color:#F56C6C;">*</span> -->
            <span>包含的项目</span>
          </span>
          <el-button size="medium" @click="selectPhysicalBtn()" type="primary" :disabled="$route.query.look || isaudit">选择体检项目</el-button>
          <el-button size="medium" @click="exprottemplate()" type="primary" :disabled="$route.query.look || isaudit">项目导入</el-button>
          <el-button size="medium" @click="exprottemplate1()" type="primary" :disabled="$route.query.look || isaudit">项目导出</el-button>
          <el-button size="medium" @click="downloadtemplate()" :disabled="$route.query.look || isaudit">模板下载</el-button>
          <span style="margin-left:20px">总计：{{ selectPhysical.confirmProjectList.length }} 项</span>
          <span style="margin-left:30px">门市价总计：{{ checkpriceTotal }} 元</span>
          <span style="margin-left:30px">核算价总计：{{ checklowpriceTotal }} 元</span>

          <!-- <el-button style=" border-radius: 18px;" size="medium" icon="el-icon-plus" @click="selectPhysicalBtn1()"></el-button> -->
        </div>
        <div class="cityselectbox1">
          <!-- <div v-for="item in selectPhysical.confirmProjectfirsttype" style="padding:0 10px;line-height:42px">
          {{item}}：
          <el-tag v-for="temp in selectPhysical.confirmProjectList" v-if="item==temp.checktypefirst" :key="temp.checkid" class="cityitembox" closable color="#ffffff" @close="Closeproject(temp.checkid)">{{temp.checkname}}</el-tag>
        </div>-->
          <el-table :data="selectPhysical.confirmProjectList" max-height="500px">
            <el-table-column prop="checktypefirst" label="一级类目" min-width="200px"></el-table-column>
            <el-table-column prop="checktypesec" label="二级类目" min-width="200px" show-overflow-tooltip></el-table-column>
            <el-table-column prop="instcityid" label="项目代码" min-width="140px"></el-table-column>
            <el-table-column prop="checkname" label="项目名称" show-overflow-tooltip min-width="150px"></el-table-column>
            <el-table-column prop="checkdescribe" label="详细描述" show-overflow-tooltip min-width="150px"></el-table-column>
            <el-table-column prop="checkgender" label="性别"></el-table-column>
            <el-table-column prop="checkprice" label="门市价"></el-table-column>
            <el-table-column prop="checklowprice" label="核算价"></el-table-column>
            <el-table-column label="操作" width="170px" fixed="right">
              <template slot-scope="scope">
                <el-button size="mini" type="danger" @click="delconfirmProjectList(scope.$index)" :disabled="$route.query.look || isaudit">删除</el-button>
                <el-button size="mini" type="primary" @click="topconfirmProjectList(scope.$index)" :disabled="$route.query.look || isaudit">置顶</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!-- 关联加项 -->
      <div v-if="IsPack && AddGoodsmsg.AddGoodsType != '电子体检卡'">
        <div style="margin-top:30px;">
          <span class="cityboxtitle">
            <!-- <span style="color:#F56C6C;">*</span> -->
            <span>关联加项</span>
          </span>
          <el-button size="medium" @click="selectAddPackageBtn()" type="primary" :disabled="isaudit">选择加项包</el-button>
          <el-button size="medium" @click="selectAddPackageComboBtn()" type="primary" :disabled="isaudit">选择加项包组</el-button>
          <!-- <el-button style=" border-radius: 18px;" size="medium" icon="el-icon-plus" @click="selectAddPackageBtn1()"></el-button> -->
          <!-- <el-button size="medium">选择虚拟商品</el-button> -->
        </div>
        <div class="cityselectbox1" v-if="selectAddPackage.confirmProjectList.length > 0">
          <div>
            <div style="padding: 10px">
              <span>加项包名称：</span>
              <el-input style="width:200px" size="mini" v-model="selectAddPackage.vargoodsname"></el-input>
              <span style="margin-left:50px">售卖价：</span>
              <el-input style="width:200px" size="mini" v-model="selectAddPackage.varsmj"></el-input>
            </div>
            <!-- 数据表格 -->
            <div>
              <el-table :data="changeconfirmProjectList" style="width: 100%" max-height="400px">
                <el-table-column prop="goodid" label="项目代码" width="200px"></el-table-column>
                <el-table-column prop="goodname" label="项目名称"></el-table-column>
                <el-table-column prop="gender" label="适用性别" width="100px"></el-table-column>
                <el-table-column prop="marital" label="婚姻状态" width="100px"></el-table-column>
                <el-table-column prop="goodsaleprice" label="售卖价：" width="100px"></el-table-column>
                <el-table-column label="操作" width="100px">
                  <template slot-scope="scope">
                    <el-button type="text" size="mini" @click="Closeaddpacket(scope.row.goodid)">删除</el-button>
                    <el-button type="text" size="mini" @click="ToppingBtn(scope.row, scope.$index)">置顶</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <!-- <el-tag v-for="item in selectAddPackage.confirmProjectList" :key="item.goodid" class="cityitembox" :closable="!isaudit" color="#ffffff" @close="Closeaddpacket(item.goodid)">{{item.goodname}}</el-tag> -->
          </div>
        </div>
        <div class="cityselectbox1" v-for="(item, index) in selectaddpackageCombo.comfirmComboList">
          <el-form :model="item" label-position="right" label-width="120px" size="medium">
            <el-form-item label="加项包组名称：">
              {{ item.name }}
              <div style="float:right">
                <el-button type="danger" @click="
                    selectaddpackageCombo.comfirmComboList.splice(index, 1)
                  ">删除</el-button>
                <el-button type="primary" @click="ToppingBtn1(item, index)" plain>置顶</el-button>
              </div>
            </el-form-item>
            <el-form-item label="描述：">
              {{ item.describe || "--" }}
            </el-form-item>
            <el-form-item label="限制条件：">
              可免费选择的数量{{ item.numForFree }} 可选数量上限
              {{ item.number }}
            </el-form-item>
            <el-form-item label="支持加项包：">
              <el-table :data="item.jiaXiangGroup" style="width: 100%" size="mini" max-height="300px">
                <el-table-column prop="jiaXiangName" label="加项包名称"></el-table-column>
                <el-table-column prop="jiaXiangId" label="加项包ID"></el-table-column>
                <el-table-column prop="gender" label="适用性别"></el-table-column>
                <el-table-column prop="marital" label="婚姻状态"></el-table-column>
                <el-table-column prop="price" label="售卖价"></el-table-column>
              </el-table>
            </el-form-item>
          </el-form>
        </div>
      </div>

      <!-- 关联虚拟商品 -->
      <div>
        <div style="margin-top:30px;">
          <span class="cityboxtitle">
            <!-- <span style="color:#F56C6C;">*</span> -->
            <span>关联虚拟商品</span>
          </span>
          <el-button size="medium" @click="selectVirtualGoodsBtn()" type="primary" :disabled="$route.query.look || isaudit">选择虚拟商品</el-button>
        </div>
        <div class="cityselectbox1">
          <el-table :data="selectVirtualGoods.confirmProjectList" max-height="500px">
            <el-table-column prop="goodname" label="虚拟商品名" min-width="200px"></el-table-column>
            <el-table-column prop="mipLink" label="跳转链接" min-width="200px"></el-table-column>
            <el-table-column prop="usePattern" label="使用方式" min-width="200px" show-overflow-tooltip></el-table-column>
            <el-table-column prop="goodcheckrecommended" label="推荐理由" min-width="140px"></el-table-column>
            <el-table-column label="操作" width="170px" fixed="right">
              <template slot-scope="scope">
                <el-button size="mini" type="danger" @click="delVirtualGoodsList(scope.$index)" :disabled="$route.query.look || isaudit">删除</el-button>
                <el-button size="mini" type="primary" @click="topVirtualGoodstList(scope.$index)" :disabled="$route.query.look || isaudit">置顶</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

    </div>

    <!-- 商品详情 -->
    <div style="margin:30px 20px 70px 50px;" v-if="firstTxtisshow">
      <div style="margin:10px 0; color: #606266;">商品详情</div>
      <wangeditor :catchData="catchData" class="myEditor"></wangeditor>
      <!-- 
      <quill-editor style="height:500px" v-model="content" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)" @change="onEditorChange($event)">
      </quill-editor>-->
    </div>
    <!-- <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed" :file-list="fileList">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>-->

    <!-- 按钮 -->
    <div style="float:right;margin:20px 0">
      <template v-if="!isaudit">
        <el-button @click="goback()">取 消</el-button>
        <el-button type="primary" v-if="isedit" @click="manageupdategood('草稿')" :disabled="$route.query.look">保存草稿</el-button>
        <el-button type="primary" v-else @click="manageInsertGood('草稿')" :disabled="$route.query.look">保存草稿</el-button>
        <el-button type="primary" v-if="isedit" @click="affirmCompile()" :disabled="$route.query.look">确 认</el-button>
        <el-button type="primary" v-else @click="manageInsertGood('上架')" :disabled="$route.query.look">确 认</el-button>
      </template>
      <template v-if="isaudit">
        <el-button type="primary" @click="consentAudit()">审核通过</el-button>
        <el-button type="danger" @click="isremark = true">审核拒绝</el-button>
      </template>
    </div>

    <!-- 选择加项包组弹窗 -->
    <div>
      <el-dialog title="选择加项包组" :visible.sync="selectaddpackageCombo.isshow" width="800px">
        <div class="projectmytransfer">
          <el-transfer :props="{ key: 'id', label: 'name' }" :button-texts="['到上边', '到下边']" v-model="selectaddpackageCombo.selectList" :data="selectaddpackageCombo.allAddPackageComboList" filterable v-loading="selectaddpackageCombo.loading" :titles="['未选加项包组', '已选加项包组']"></el-transfer>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="selectaddpackageCombo.isshow = false">取 消</el-button>
          <el-button type="primary" :loading="selectaddpackageCombo.confirmBtnLoading" @click="confirmSelectAddpackageCombo()">确 定</el-button>
        </span>
      </el-dialog>
    </div>

    <!-- 选择城市弹窗 -->
    <el-dialog title="拒绝理由" :visible.sync="isremark" width="500px">
      <el-input type="textarea" placeholder="请填写审核拒绝理由（非必填）" :autosize="{ minRows: 6, maxRows: 8 }" v-model="remarkContent" show-word-limit>
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isremark = false">取 消</el-button>
        <el-button type="primary" @click="refuseAudit()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 选择城市弹窗 -->
    <el-dialog title="选择城市" :visible.sync="selectCity.isshow" width="800px">
      <div style="height:500px;overflow: auto">
        <div style="margin:10px 0px">
          <el-checkbox v-model="selectCity.nationwide" label="全国" @change="citynationwide"></el-checkbox>
          <el-checkbox :disabled="selectCity.nationwide" v-model="selectCity.allcity" label="全选" @change="cityidAll"></el-checkbox>
        </div>
        <div v-for="(city, index) in selectCity.cities" :key="city._id._id" style="margin:15px 0 0 0">
          <div class="mycheckbox">
            <el-checkbox :disabled="selectCity.nationwide" v-model="city._id.checked" :indeterminate="city._id.indeterminate" :label="city._id._id" @change="cityidAllselect(index)"></el-checkbox>
          </div>
          <div>
            <el-checkbox style="min-width:120px;margin:5px 0 0 0" :disabled="selectCity.nationwide" v-model="item.checked" v-for="item in city.citynames" :label="item.city" :key="item.city" @change="handleCheckedCitiesChange(city.citynames, index)"></el-checkbox>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="selectCity.isshow = false">取 消</el-button>
        <el-button type="primary" @click="confirmSelectCity()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 选择门店弹窗 -->
    <div v-if="selectShop.isshow">
      <el-dialog title="选择门店" :visible.sync="selectShop.isshow" width="800px">
        <div v-if="false">
          <el-row style="line-height:32px">
            <el-col :span="3">
              <div style="  text-align: center;">城市：</div>
            </el-col>
            <el-col :span="5">
              <el-select size="small" v-model="selectShop.selectcityseek" placeholder="请选择" filterable>
                <el-option v-for="item in selectCity.checkedCities" :key="item" :label="item" :value="item"></el-option>
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
                <el-table-column type="selection" :reserve-selection="true" width="55"></el-table-column>
                <!-- <el-table-column width="55">
                <el-checkbox></el-checkbox>
                </el-table-column>-->
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
              <el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentChange2" :current-page="selectShop.shopcurrentPage" :page-sizes="[10, 20, 30, 40]" :page-size="selectShop.shoppageSize" layout="total, sizes, prev, pager, next, jumper" :total="selectShop.shopCount"></el-pagination>
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
      <el-dialog title=" 选择体检项目" :visible.sync="selectPhysical.isshow" width="800px">
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
              <el-select v-model="selectPhysical.SecondTypevalue" :disabled="
                  !selectPhysical.FirstTypeValue ||
                    selectPhysical.FirstTypeValue == '' ||
                    selectPhysical.FirstTypeValue == '全部'
                " filterable placeholder="选择一级类别后可选" size="small" style="width:100%;" clearable>
                <el-option v-for="item in selectPhysical.SecondTypeList" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
            <div style="margin:30px;text-align: center;color:#F56C6C" v-if="selectPhysical.projectCount == 0">
              分公司未创建该类型体检项目，请先创建体检项目!
            </div>
            <div v-else>
              <div v-show="selectPhysical.isshowtable">
                <el-table :row-key="getRowKeys" ref="ProjectRef" :data="selectPhysical.projectList" style="width: 100%;" size="medium" @selection-change="handleSelectionChange">
                  <el-table-column type="selection" :reserve-selection="true" width="55"></el-table-column>
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
                      <div class="alinehidden">
                        {{ scope.row.checkdescribe }}
                      </div>
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
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="selectPhysical.projectcurrentPage" :page-sizes="[10, 20, 30, 40]" :page-size="selectPhysical.projectpageSize" layout="total, sizes, prev, pager, next, jumper" :total="selectPhysical.projectCount"></el-pagination>
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
      <el-dialog title=" 选择加项包" :visible.sync="selectAddPackage.isshow" width="1000px">
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
            <div style="margin:30px;text-align: center;color:#F56C6C" v-if="selectAddPackage.projectCount == 0">
              分公司未创建该类型加项包，请先创建加项包!
            </div>
            <div v-else>
              <div v-show="selectAddPackage.isshowtable">
                <el-table :row-key="RowKeyaddproject" ref="ProjectRef" :data="selectAddPackage.projectList" style="width: 100%;" size="medium" @selection-change="handleSelectionChange1">
                  <el-table-column type="selection" :reserve-selection="true" width="55"></el-table-column>
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
                      <div class="alinehidden">
                        {{ scope.row.goodsaleprice }}
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <!-- 分页 -->
              <div class="block" style="text-align: right;margin-top: 20px;">
                <el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1" :current-page="selectAddPackage.projectcurrentPage" :page-sizes="[10, 20, 30, 40]" :page-size="selectAddPackage.projectpageSize" layout="total, sizes, prev, pager, next, jumper" :total="selectAddPackage.projectCount"></el-pagination>
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
    <!-- 导入错误的门店编码 -->
    <div>
      <el-dialog title="门店编码错误" :visible.sync="errorshop.isshow" width="400px">
        <div v-for="item in errorshop.errshoplist" style="text-align:center">
          序号：{{ item.xuhao }} &nbsp&nbsp&nbsp&nbsp&nbsp门店编码不存在
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="errorshop.isshow = false">取 消</el-button>
          <el-button type="primary" @click="errorshop.isshow = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 选择虚拟商品弹窗 -->
    <div>
      <el-dialog title="选择虚拟商品" :visible.sync="selectVirtualGoods.isshow" width="800px">
        <div class="projectmytransfer">
          <el-transfer :props="{ key: 'goodid', label: 'name' }" :button-texts="['到上边', '到下边']" v-model="selectVirtualGoods.selectList" :data="selectVirtualGoods.allselectList" filterable v-loading="selectVirtualGoods.loading" :titles="['未选择虚拟商品', '已选择虚拟商品']"></el-transfer>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="selectVirtualGoods.isshow = false">取 消</el-button>
          <el-button type="primary" :loading="selectVirtualGoods.confirmBtnLoading" @click="confirmSelectVirtualGoods()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <input id="upload" style="display:none" type="file" ref="excel" @change="importfxx(this)" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
    <input id="upload1" style="display:none" type="file" ref="importshop1" @change="importfxx1(this)" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
    <a id="adownload" href download style="display:none">导出</a>
  </div>
</template>

<script>
import { formatDate } from "../../api/formatDate.js";
import draggable from "vuedraggable";
import wangeditor from "./WangEditor";
export default {
  name: "goodsmsg",
  components: {
    wangeditor,
    draggable,
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
        if (!nv || nv == "" || nv == "全部") {
          this.selectPhysical.SecondTypevalue = "";
        } else {
          this.selectPhysical.SecondTypevalue = "";
          this.queryAllCheckDirSec();
        }
      },
      deep: true,
      immediate: true,
    },
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value < 0 || value > 1000000) {
        callback(new Error("请输入0 ~ 1000000正整数"));
      } else {
        callback();
      }
    };
    var validatePass1 = (rule, value, callback) => {
      if (Number(value) > Number(this.AddGoodsmsg.AddGoodsPrice)) {
        callback(new Error("最低价不得大于售价"));
      } else if (value == "") {
        callback(new Error("最低价为空（选填）"));
      } else {
        callback();
      }
    };
    return {
      selectVirtualGoods: {
        confirmProjectList: [],
        isshow: false,
        selectList: [],
        allselectList: [],
        loading: false,
        confirmBtnLoading: false,
      },
      selectaddpackageCombo: {
        isshow: false,
        selectList: [],
        allAddPackageComboList: [],
        loading: false,
        confirmBtnLoading: false,
        comfirmComboList: [],
      },
      CloseAudit: true, //是否需要审核
      state: "1", //审核状态
      AccountType: "", //当前账号的权限
      commodityid: "", //商品id
      isaudit: false, //是否是审核
      remarkContent: "", //拒绝理由
      isremark: false, //拒绝弹窗

      imageshow: "null", //控制图片上面的删除
      errorshop: {
        isshow: false,
        errshoplist: [],
      },
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
      IsPack: false,
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
        nationwide: false, //全国
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
        loading: false,
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
          sex: [
            {
              value: "通用",
              label: "通用",
            },
            {
              value: "男",
              label: "男",
            },
            {
              value: "女",
              label: "女",
            },
          ],
        },
        projectList: [], //体检项目列表
        projectCount: 0, //体检项目总数
        projectpageSize: 10, //每页条数
        projectcurrentPage: 1, //当前页
      },
      selectAddPackage: {
        vargoodsname: "",
        varsmj: "",
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
        projectcurrentPage: 1, //当前页
      },
      AddGoodsmsg: {
        goodimgs: [], //上传的图片
        AddGoodsType: "",
        Filiale: "",
        AddGoodsName: "",
        AddGoodsID: "",
        AddGoodsPrice: "",
        AddGoodsMiniprice: "",
        AddGoodsCity: [],
        groupid: "", //套餐编码
        grouptype: "地方套餐", //套餐类型
        usePattern: "", //虚拟商品使用方式
        mipLink: "", //虚拟商品跳转链接
        goodcheckrecommended: "", //商品推荐理由
        gooddescribe: "", //
        AppointmentUrl: "", //预约链接
        costprice: "", //分销成本价
        pysaleprice: "", //分销默认价
        gender: "",
        marital: "",
      },

      AddGoodsmsgrules: {
        usePattern: [
          { required: true, message: "请选择使用方式", trigger: "change" },
        ],
        mipLink: [
          { required: true, message: "请输入跳转链接", trigger: "blur" },
        ],
        costprice: [
          { required: true, message: "请输入分销成本价", trigger: "blur" },
        ],
        gender: [
          { required: true, message: "请选择适用性别", trigger: "blur" },
        ],
        marital: [
          { required: true, message: "请选择婚姻状态", trigger: "blur" },
        ],
        AppointmentUrl: [
          { required: true, message: "请输入预约链接", trigger: "blur" },
        ],
        pysaleprice: [
          { required: true, message: "请输入分销默认价", trigger: "blur" },
        ],
        AddGoodsType: [
          { required: true, message: "请选择商品类型", trigger: "change" },
        ],
        grouptype: [
          { required: true, message: "请选择套餐类型", trigger: "change" },
        ],
        Filiale: [
          { required: true, message: "请选择分公司", trigger: "change" },
        ],
        AddGoodsName: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],

        groupid: [
          { required: true, message: "请输入套餐编码", trigger: "blur" },
        ],
        AddGoodsID: [
          { required: true, message: "请输入商品ID", trigger: "blur" },
        ],
        AddGoodsPrice: [
          { required: true, message: "请输入商品售价", trigger: "change" },
          { validator: validatePass, trigger: "change" },
        ],
        AddGoodsMiniprice: [{ validator: validatePass1, trigger: "change" }],
      },
    };
  },
  mounted() {
    console.log(this.$route.query.look);
    this.AccountType = this.$store.getters.getRoleInfo.AccountType;
    this.commodityid = this.$route.query.goodsid;
    this.isaudit = this.$route.query.audit;
    console.log(this.$route.query);
    if (this.$route.query.audit) {
      this.isaudit = true;
    } else {
      this.isaudit = false;
    }

    if (this.$route.query.state) {
      this.state = this.$route.query.state;
    }

    if (
      this.$route.query.goodsname &&
      this.$route.query.Filiale &&
      this.$route.query.type
    ) {
      this.AddGoodsmsg.AddGoodsType = this.$route.query.type;
      this.AddGoodsmsg.Filiale = this.$route.query.Filiale;
      this.AddGoodsmsg.AddGoodsName = this.$route.query.goodsname;
    }
    if (this.$route.query && this.$route.query.goodsid) {
      if (this.$route.query.copy) {
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
    genderchange() {
      this.selectAddPackage.confirmProjectList = [];
      this.selectaddpackageCombo.comfirmComboList = [];
    },
    maritalchange() {
      this.selectAddPackage.confirmProjectList = [];
      this.selectaddpackageCombo.comfirmComboList = [];
    },
    //确认选项加项包组
    confirmSelectAddpackageCombo() {
      console.log(this.selectaddpackageCombo.selectList);
      this.QueryJiaXiangGroupDetailByIds();
    },
    //12-新增修改套餐-查询加项包组详情
    QueryJiaXiangGroupDetailByIds() {
      this.selectaddpackageCombo.confirmBtnLoading = true;
      this.$api
        .post("manage/QueryJiaXiangGroupDetailByIds", {
          ids: this.selectaddpackageCombo.selectList,
        })
        .then((res) => {
          this.selectaddpackageCombo.confirmBtnLoading = false;
          console.log(res);
          if (res.code == 200) {
            this.selectaddpackageCombo.isshow = false;
            this.selectaddpackageCombo.comfirmComboList = res.data;
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message.error(err.msg);
        });
    },
    //选择加项包组按钮
    selectAddPackageComboBtn() {
      if (!this.AddGoodsmsg.gender) {
        this.$message.error("请选择适用性别！");
        return;
      }
      if (!this.AddGoodsmsg.marital) {
        this.$message.error("请选择婚姻状况！");
        return;
      }
      this.selectaddpackageCombo.isshow = true;
      this.selectaddpackageCombo.selectList = [];
      this.selectaddpackageCombo.allAddPackageComboList = [];
      this.selectaddpackageCombo.comfirmComboList.forEach((element) => {
        this.selectaddpackageCombo.selectList.push(element.id);
      });
      this.ManageQueryAllJiaXiangGroup();
    },
    // 11-新增修改套餐-查询所有加项包组
    ManageQueryAllJiaXiangGroup() {
      this.selectaddpackageCombo.loading = true;
      this.$api
        .post("manage/ManageQueryAllJiaXiangGroup", {
          instName: this.AddGoodsmsg.Filiale,
          gender: this.AddGoodsmsg.gender,
          marital: this.AddGoodsmsg.marital,
        })
        .then((res) => {
          console.log(res);
          this.selectaddpackageCombo.loading = false;
          if (res.code == 200) {
            this.selectaddpackageCombo.allAddPackageComboList = res.data;
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message.error(err.msg);
        });
    },
    //置顶btn
    ToppingBtn(row, index) {
      this.selectAddPackage.confirmProjectList.splice(index, 1);
      this.selectAddPackage.confirmProjectList.unshift(row);
    },
    ToppingBtn1(row, index) {
      this.selectaddpackageCombo.comfirmComboList.splice(index, 1);
      this.selectaddpackageCombo.comfirmComboList.unshift(row);
    },
    getFileImg() {
      //选择图片
      //  var input = document.getElementById("imgTest");
      //    console.log(input);
      console.log("888888");
      document
        .getElementById("commodityimage")
        .addEventListener("change", this.imgChange); //把imgChange的事件绑定到input的change事件上
      document.getElementById("commodityimage").click(); //执行input事件
    },

    showCross(e) {
      //显示叉号
      this.imageshow = e;
      // console.log(e+'显示')
    },
    concealCross(e) {
      //隐藏叉号
      this.imageshow = "null";
      // console.log(e+'隐藏')
    },

    deletePicture(e) {
      //删除图片
      this.AddGoodsmsg.goodimgs.splice(e, 1);
    },
    imgChange(e) {
      //转化图片
      console.log(e.target.files[0].size);
      var imageSize = e.target.files[0].size;
      if (imageSize > 2000000) {
        document.getElementById("commodityimage").value = null; //保证可用选择重复图片
        this.$message.error("图片大小不能超过2M");
      } else {
        var file = e.target.files[0];
        var fd = new FormData();
        fd.append("imgs", file);
        var body = {};
        this.$api
          .post("/manage/msjGoodsImgInsert", fd)
          .then((res) => {
            console.log(res.data[0]);
            this.AddGoodsmsg.goodimgs.push(res.data[0]);
            document.getElementById("commodityimage").value = null; //保证可用选择重复图片
          })
          .catch((res) => {});
      }
    },

    importShopBtn() {
      this.$refs.importshop1.value = null; //清空上一次的数据
      document.getElementById("upload1").click();
    },
    isshowfenxiao() {
      if (this.$store.getters.getRoleInfo.AccountName == "优健康分公司") {
        return true;
      } else {
        return false;
      }
    },
    // 18-根据名称和类型获取账户信息
    GetOneByName() {
      if (this.AddGoodsmsg.Filiale == "优健康自营") {
        this.IsPack = true;
        console.log(123123123123123, this.IsPack);
      } else {
        this.$api
          .get("/account/GetOneByName", {
            accountName: this.AddGoodsmsg.Filiale,
            accountType: "1",
          })
          .then((res) => {
            console.log(res);
            this.CloseAudit = res.data.CloseAudit;
            this.IsPack = res.data.IsPack;
          })
          .catch((res) => {
            console.log(res);
          });
      }
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
      import("@/api/Export2Excel").then((excel) => {
        const tHeader = [
          "一级类目",
          "二级类目",
          "项目代码",
          "项目名称",
          "详细描述",
          "性别",
          "门市价",
          "核算价",

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
          "checklowprice",
        ]; // 表头对应字段名
        const list = this.selectPhysical.confirmProjectList; // 数据来源
        const data = this.formatJson(filterVal, list); //对导出数据格式化处理
        excel.export_json_to_excel({
          header: tHeader, //表头 必填
          data, //具体数据 必填
          filename: "体检项目", // 可自定义文件名，非必填
          autoWidth: true, //是否自适应宽度，非必填，默认true
        });
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
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
        this.$parent.$parent.$parent.weburl + "/manage/DownLoadFile?id=2",
        true
      ); //也可以使用POST方式，根据接口
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.responseType = "blob"; //返回类型blob
      xhr.onload = function () {
        //定义请求完成的处理函数
        if (this.status === 200) {
          var blob = this.response;
          if (blob.size > 0) {
            var reader = new FileReader();
            reader.readAsDataURL(blob); // 转换为base64，可以直接放入a标签href
            reader.onload = function (e) {
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
    downloadtemplate4() {
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
        this.$parent.$parent.$parent.weburl + "/manage/DownLoadFile?id=4",
        true
      ); //也可以使用POST方式，根据接口
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.responseType = "blob"; //返回类型blob
      xhr.onload = function () {
        //定义请求完成的处理函数
        if (this.status === 200) {
          var blob = this.response;
          if (blob.size > 0) {
            var reader = new FileReader();
            reader.readAsDataURL(blob); // 转换为base64，可以直接放入a标签href
            reader.onload = function (e) {
              // 转换完成，创建一个a标签用于下载
              var a = document.createElement("a");
              var newDate = new Date();
              console.log(newDate.format);

              a.download =
                "门店模板" + newDate.Format("yyyyMMddhhmmss") + ".xlsx";
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
      FileReader.prototype.readAsBinaryString = function (f) {
        var binary = "";
        var rABS = false; //是否将文件读取为二进制字符串
        var pt = this;
        var wb; //读取完成的数据
        var outdata;
        var reader = new FileReader();
        reader.onload = function (e) {
          console.log(e);

          var bytes = new Uint8Array(reader.result);
          var length = bytes.byteLength;
          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          var XLSX = require("xlsx");
          if (rABS) {
            wb = XLSX.read(btoa(fixdata(binary)), {
              //手动转化
              type: "base64",
            });
          } else {
            wb = XLSX.read(binary, {
              type: "binary",
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
            checkim: [],
          };
          for (const key in wb.Sheets[wb.SheetNames[0]]) {
            //  console.log(key,'----',wb.Sheets[wb.SheetNames[0]][key]);
            if (key.substring(0, 1) == "A" || key.substring(0, 1) == "B") {
              if (key == "A1") {
                continue;
              }
              if (key == "B1") {
                continue;
              }
              if (key.substring(0, 1) == "A") {
                var obj = {
                  xuhao: key.substring(1, key.length),
                  cityids: String(wb.Sheets[wb.SheetNames[0]][key].v),
                };
                body.checkim.push(obj);
              } else if (key.substring(0, 1) == "B") {
                var indexnum = 0;
                body.checkim.map((item, index) => {
                  if (item.xuhao == key.substring(1, key.length)) {
                    indexnum++;
                    body.checkim[index].checkname = String(
                      wb.Sheets[wb.SheetNames[0]][key].v
                    );
                  }
                });
                if (indexnum == 0) {
                  var obj = {
                    xuhao: key.substring(1, key.length),
                    checkname: String(wb.Sheets[wb.SheetNames[0]][key].v),
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
            .then((res) => {
              if (res.code == 200) {
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
            .catch((res) => {
              console.log(res);
              if (res.code == 800) {
                // res.data
                _this
                  .$confirm(
                    "导入数据：" +
                      res.data.join(",") +
                      ",行数据错误，请检查完整后重新上传！",
                    "错误提醒",
                    {
                      confirmButtonText: "确定",
                      cancelButtonText: "取消",
                      type: "warning",
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
            type: "success",
          });
        };
        reader.readAsArrayBuffer(f);
      };
      if (rABS) {
        reader.readAsArrayBuffer(f);
      } else {
        reader.readAsBinaryString(f);
      }
    },
    importfxx1(obj) {
      let _this = this;
      let inputDOM = this.$refs.excel;
      // 通过DOM取文件数据
      this.file = event.currentTarget.files[0];
      var rABS = false; //是否将文件读取为二进制字符串
      var f = this.file;
      var reader = new FileReader();
      //if (!FileReader.prototype.readAsBinaryString) {
      FileReader.prototype.readAsBinaryString = function (f) {
        var binary = "";
        var rABS = false; //是否将文件读取为二进制字符串
        var pt = this;
        var wb; //读取完成的数据
        var outdata = [];
        var reader = new FileReader();
        reader.onload = function (e) {
          console.log(e);

          var bytes = new Uint8Array(reader.result);
          var length = bytes.byteLength;
          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          var XLSX = require("xlsx");
          if (rABS) {
            wb = XLSX.read(btoa(fixdata(binary)), {
              //手动转化
              type: "base64",
            });
          } else {
            wb = XLSX.read(binary, {
              type: "binary",
            });
          }
          console.log(wb);
          console.log(wb.Sheets);
          console.log(wb.Sheets[wb.SheetNames[0]]);

          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]); //outdata就是你想要的东西
          var shoplist = [];
          console.log(outdata);
          if (outdata.length > 0) {
            var itemkeys = [];

            itemkeys = Object.keys(outdata[0]);
            console.log(itemkeys);

            if (
              itemkeys.indexOf("序号") != -1 &&
              itemkeys.indexOf("门店编码") != -1
            ) {
            } else {
              _this.$message.error("请导入有效文件！");
              return;
            }
          } else {
            _this.$message.error("请导入有效文件！");
            return;
          }
          outdata.map((item) => {
            let shopitem = {
              xuhao: item.序号,
              localcode: String(item.门店编码 || ""),
            };
            shoplist.push(shopitem);
          });
          _this.$api
            .post("/manage/importCityAndMenDian", shoplist)
            .then((res) => {
              console.log(res);
              if (res.code == 200) {
                _this.selectShop.confirmshopList = [];
                res.data.centers.map((item) => {
                  let obj = item;
                  obj.label = item.label;
                  obj.key = item.Id;
                  _this.selectShop.confirmshopList.push(obj);
                });
                _this.selectCity.checkedCities = res.data.citys;
              }
            })
            .catch((err) => {
              console.log(err);
              _this.errorshop.isshow = true;
              _this.errorshop.errshoplist = err.data;
            });
        };
        reader.readAsArrayBuffer(f);
      };
      if (rABS) {
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
      confirmlist.map((item) => {
        if (confirmlist1.indexOf(item.instcityid) < 0) {
          confirmlist1.push(item.instcityid);
        }
      });
      confirmlist1.map((item, index) => {
        for (let i = 0; i < confirmlist.length; i++) {
          if (item == confirmlist[i].instcityid) {
            confirmlist2.push(confirmlist[i]);
            break;
          }
        }
      });
      confirmlist = confirmlist2;

      var checkfirstlist = [];
      confirmlist.map((item) => {
        checkfirstlist.push(item.checktypefirst);
      });
      checkfirstlist = checkfirstlist.filter((item, index, arr) => {
        return arr.indexOf(item) === index;
      });
      console.log(checkfirstlist);
      //获取
      var allfirstlist = [];
      this.selectPhysical.FirstTypeList.map((item) => {
        allfirstlist.push(item.value);
      });
      console.log(allfirstlist);
      this.selectPhysical.confirmProjectfirsttype = [];
      allfirstlist.map((item) => {
        if (checkfirstlist.indexOf(item) >= 0) {
          this.selectPhysical.confirmProjectfirsttype.push(item);
        }
      });
      console.log(this.selectPhysical.confirmProjectfirsttype);
      //按一级类别排序原数组
      // var confirmlist = res.data.goodchecktypes;
      console.log(confirmlist);
      this.selectPhysical.confirmProjectList = [];
      this.selectPhysical.confirmProjectfirsttype.map((item) => {
        for (let i = 0; i < confirmlist.length; i++) {
          if (item == confirmlist[i].checktypefirst) {
            this.selectPhysical.confirmProjectList.push(confirmlist[i]);
          }
        }
      });
    },
    //id查询商品
    manageQueryGoodById(val) {
      this.$api
        .post("/manage/manageQueryGoodById", { goodid: val })
        .then((res) => {
          if (res.code == "200") {
            console.log(res);
            this.editgoodsobj = res.data;
            this.selectaddpackageCombo.comfirmComboList =
              res.data.jiaxianggroup;
            this.AddGoodsmsg.goodimgs = res.data.goodimgs || [];
            this.AddGoodsmsg.AddGoodsType = res.data.goodtype;
            this.AddGoodsmsg.Filiale = res.data.instname;
            this.AddGoodsmsg.AddGoodsName = res.data.goodname;
            this.AddGoodsmsg.usePattern = res.data.usePattern; //虚拟 使用方式
            this.AddGoodsmsg.mipLink = res.data.mipLink; //虚拟 使用方式
            this.AddGoodsmsg.goodcheckrecommended =
              res.data.goodcheckrecommended; //虚拟 使用方式
            this.firstTxt = res.data.gooddescribe;
            this.content = this.firstTxt;
            this.firstTxtisshow = true;
            if (this.$route.query.copy) {
              this.AddGoodsmsg.AddGoodsID = "";
            } else {
              this.AddGoodsmsg.AddGoodsID = res.data.goodid;
            }
            this.AddGoodsmsg.AddGoodsPrice = res.data.goodprice;
            this.AddGoodsmsg.AddGoodsMiniprice = res.data.goodlowprice;
            this.selectAddPackage.confirmProjectList =
              res.data.goodaddpackage || [];
            this.AddGoodsmsg.grouptype = res.data.grouptype;
            this.AddGoodsmsg.groupid = res.data.groupid;
            this.AddGoodsmsg.costprice = res.data.costprice;
            this.AddGoodsmsg.pysaleprice = res.data.pysaleprice;
            this.AddGoodsmsg.AppointmentUrl = res.data.AppointmentUrl;
            this.AddGoodsmsg.gender = res.data.gender;
            this.AddGoodsmsg.marital = res.data.marital;
            this.selectVirtualGoods.confirmProjectList =
              res.data.goodvirtaulproduct;
            res.data.goodinst.map((item) => {
              this.selectCity.checkedCities.push(item.instcity);
              item.instsalepointname.map((temp) => {
                this.selectShop.confirmshopList.push(temp);
              });
            });
            if (res.data.goodchecktypes && res.data.goodchecktypes.length > 0) {
              res.data.goodchecktypes.map((item) => {
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
            this.selectPhysical.FirstTypeList.map((item) => {
              allfirstlist.push(item.value);
            });
            console.log(allfirstlist);
            //排序
            var checkfirstlist = this.selectPhysical.confirmProjectfirsttype;
            this.selectPhysical.confirmProjectfirsttype = [];
            allfirstlist.map((item) => {
              if (checkfirstlist.indexOf(item) >= 0) {
                this.selectPhysical.confirmProjectfirsttype.push(item);
              }
            });
            //按一级类别排序原数组
            var confirmlist = res.data.goodchecktypes;
            console.log(confirmlist);
            this.selectPhysical.confirmProjectList = [];
            this.selectPhysical.confirmProjectfirsttype.map((item) => {
              for (let i = 0; i < confirmlist.length; i++) {
                if (item == confirmlist[i].checktypefirst) {
                  this.selectPhysical.confirmProjectList.push(confirmlist[i]);
                }
              }
            });
            this.GetOneByName();
          }
        });
    },
    //Closecity
    Closecity(obj) {
      if (this.$route.query.look) {
      } else {
        console.log(obj);
        this.selectCity.checkedCities.splice(
          this.selectCity.checkedCities.indexOf(obj),
          1
        );
        if (obj == "全国") {
          this.selectShop.confirmshopList = [];
          return;
        }
        this.selectShop.confirmshopList = this.selectShop.confirmshopList.filter(
          (item) => item.CityName != obj
        );
      }
    },
    //Closeshop
    Closeshop(obj) {
      console.log(obj);
      if (this.$route.query.look) {
      } else {
        this.selectShop.confirmshopList.map((item, index) => {
          if (item.Id == obj) {
            this.selectShop.confirmshopList.splice(index, 1);
          }
        });
      }
    },
    //Closeproject
    Closeproject(obj) {
      this.selectPhysical.confirmProjectList.map((item, index) => {
        if (item.checkid == obj) {
          this.selectPhysical.confirmProjectList.splice(index, 1);
        }
      });
      console.log(this.selectPhysical.confirmProjectList);
      this.selectPhysical.confirmProjectfirsttype.map((item, index) => {
        var num = 0;
        this.selectPhysical.confirmProjectList.map((temp) => {
          if (item == temp.checktypefirst) {
            num++;
          }
        });
        if (num == 0) {
          this.selectPhysical.confirmProjectfirsttype.splice(index, 1);
        }
      });
    },
    //Closeaddpacket
    Closeaddpacket(obj) {
      // selectAddPackage.confirmProjectList
      this.selectAddPackage.confirmProjectList.map((item, index) => {
        if (item.goodid == obj) {
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
    AddGoodsPriceinput1() {
      this.AddGoodsmsg.costprice = this.AddGoodsmsg.costprice.replace(
        /[^\.\d]/g,
        ""
      );
      this.AddGoodsmsg.costprice = this.AddGoodsmsg.costprice.replace(".", "");
    },
    AddGoodsPriceinput2() {
      this.AddGoodsmsg.pysaleprice = this.AddGoodsmsg.pysaleprice.replace(
        /[^\.\d]/g,
        ""
      );
      this.AddGoodsmsg.pysaleprice = this.AddGoodsmsg.pysaleprice.replace(
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
        instname: this.AddGoodsmsg.Filiale,
      };
      this.$api.post("/manage/managequerychecks2", body).then((res) => {
        if (res.code == "200") {
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
      var body = {
        goodtype: this.selectAddPackage.SecondTypevalue,
        goodname: this.selectAddPackage.seekPackageName,
        instname: this.AddGoodsmsg.Filiale,
        gender: this.AddGoodsmsg.gender,
        marital: this.AddGoodsmsg.marital,
        goodputaway: "上架",
        page: 1,
        pagesize: 99999999,
      };
      this.$api.post("/manage/ManageQueryAllAddPack", body).then((res) => {
        // this.$api.post("/manage/manageQueryAddPackIndex2", body).then(res => {
        if (res.code == "200") {
          this.selectAddPackage.loading = false;
          this.selectAddPackage.projectCount = res.data.count;
          if (res.data.data && res.data.data.length > 0) {
            this.selectAddPackage.projectList = res.data.data;
            console.log(this.selectAddPackage.projectList);
            this.selectAddPackage.projectList.map((item, index) => {
              this.selectAddPackage.projectList[index].key = item.goodid;
              this.selectAddPackage.projectList[
                index
              ].label = `${item.goodid} - ${item.gender} - ${item.marital} -  ${item.goodname} `;
            });
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
      this.$api.get("/city/pullCityByProvince").then((res) => {
        console.log(res);
        if (res.code == "200") {
          res.data.map((city_id, n) => {
            let mc = {
              _id: city_id._id,
              checked: false,
              indeterminate: false,
            };
            res.data[n]._id = mc;
            city_id.citynames.map((temp, m) => {
              let ms = {
                city: temp,
                checked: false,
              };
              res.data[n].citynames[m] = ms;
            });
          });
          this.selectCity.cities = res.data;
          console.log(res.data);
          this.selectCity.checkedCities.map((city) => {
            this.selectCity.cities.map((item, n) => {
              item.citynames.map((temp, m) => {
                if (city == temp.city) {
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
      if (this.selectCity.checkedCities.length > 0) {
        this.selectShop.shopcurrentPage = 1;
        this.selectShop.isshow = true;
        var body = {
          page: this.selectShop.shopcurrentPage,
          pageSize: 100000,
          cityNames: this.selectCity.checkedCities,
        };
        // let cityNames = "";
        // this.selectCity.checkedCities.map(item => {
        //   cityNames = cityNames + "cityNames=" + item + "&";
        // });
        this.$api
          .post(
            "/center/pullByCityNames?page=" +
              this.selectShop.shopcurrentPage +
              "&pageSize=10000000",
            body
          )
          .then((res) => {
            console.log(res);
            if (res.code == "200") {
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
            this.selectShop.confirmshopList.map((item) => {
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
        centerName: this.selectShop.centerName,
      };
      if (!this.selectShop.selectcityseek) {
        var cityNames = "";
        this.selectCity.checkedCities.map((item) => {
          cityNames = cityNames + "cityNames=" + item + "&";
        });
      } else {
        cityNames = "cityNames=" + this.selectShop.selectcityseek;
      }
      this.$api
        .get("/center/pullByCityNames?" + cityNames, body)
        .then((res) => {
          console.log(res);
          if (res.code == "200") {
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
      this.selectPhysical.confirmProjectList.map((item) => {
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
      if (this.selectPhysical.addPhysical) {
        this.selectPhysical.confirmProjectList.map((item) => {
          this.selectPhysical.selectProjectList = this.selectPhysical.selectProjectList.filter(
            (temp) => temp.checkid != item.checkid
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
          for (let i = 0; i < this.selectPhysical.projectList.length; i++) {
            if (this.selectPhysical.projectList[i].checkid == item) {
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
      this.selectPhysical.FirstTypeList.map((item) => {
        allfirstlist.push(item.value);
      });
      console.log(allfirstlist);

      //需要排序的一级类别数据
      var checkfirstlist = [];
      this.selectPhysical.confirmProjectList.map((item, index) => {
        if (checkfirstlist.indexOf(item.checktypefirst) < 0) {
          checkfirstlist.push(item.checktypefirst);
        }
      });
      console.log(checkfirstlist);

      //排序
      this.selectPhysical.confirmProjectfirsttype = [];
      allfirstlist.map((item) => {
        if (checkfirstlist.indexOf(item) >= 0) {
          this.selectPhysical.confirmProjectfirsttype.push(item);
        }
      });
      console.log(this.selectPhysical.confirmProjectfirsttype);

      //按一级类别排序原数组
      var confirmlist = this.selectPhysical.confirmProjectList;
      console.log(confirmlist);
      this.selectPhysical.confirmProjectList = [];
      this.selectPhysical.confirmProjectfirsttype.map((item) => {
        for (let i = 0; i < confirmlist.length; i++) {
          if (item == confirmlist[i].checktypefirst) {
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
      if (!this.AddGoodsmsg.gender) {
        this.$message.error("请选择适用性别！");
        return;
      }
      if (!this.AddGoodsmsg.marital) {
        this.$message.error("请选择婚姻状况！");
        return;
      }
      this.selectAddPackage.loading = true;
      this.selectAddPackage.isshow = true;
      this.selectAddPackage.addpackage = false;
      this.selectAddPackage.isshowtable = false;
      this.selectAddPackage.projectList = [];
      this.selectAddPackage.projectcurrentPage = 1;
      this.selectAddPackage.FirstTypeValue = "";
      this.selectAddPackage.SecondTypevalue = "";
      this.selectAddPackage.selectProjectList = [];
      this.selectAddPackage.confirmProjectList.map((item) => {
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
      if (this.selectAddPackage.addpackage) {
        this.selectAddPackage.confirmProjectList.map((item) => {
          this.selectAddPackage.selectProjectList = this.selectAddPackage.selectProjectList.filter(
            (temp) => temp.goodid != item.goodid
          );
        });
        this.selectAddPackage.confirmProjectList = this.selectAddPackage.confirmProjectList.concat(
          this.selectAddPackage.selectProjectList
        );
      } else {
        this.selectAddPackage.projectList.map((item) => {
          if (
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
      if (this.selectShop.addshop) {
        this.selectShop.confirmshopList.map((item) => {
          this.selectShop.selecshopList = this.selectShop.selecshopList.filter(
            (temp) => temp.Id != item.Id
          );
        });
        this.selectShop.confirmshopList = this.selectShop.confirmshopList.concat(
          this.selectShop.selecshopList
        );
      } else {
        console.log(this.selectShop.selecshopList);

        this.selectShop.selecshopList.map((item, index) => {
          for (let i = 0; i < this.selectShop.shopList.length; i++) {
            if (item == this.selectShop.shopList[i].key) {
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
    //选择虚拟商品按钮
    selectVirtualGoodsBtn() {
      this.selectVirtualGoods.isshow = true;
      this.selectVirtualGoods.loading = true;
      //       manage/QueryAllVirGood
      // 13-新增修改套餐-查询虚拟商品
      this.$api
        .post("/manage/QueryAllVirGood", {
          instName: this.AddGoodsmsg.Filiale,
        })
        .then((res) => {
          console.log(res);
          res.data.data.map((item) => {
            item.name = `${item.goodid} - ${item.goodname} - ${item.usePattern} `;
            return item;
          });
          this.selectVirtualGoods.loading = false;
          this.selectVirtualGoods.allselectList = res.data.data;
          this.selectVirtualGoods.selectList = [];
          this.selectVirtualGoods.confirmProjectList.map((item) => {
            this.selectVirtualGoods.selectList.push(item.goodid);
          });
        })
        .catch((err) => {
          console.log(err);
          this.selectVirtualGoods.loading = false;
        });
    },

    confirmSelectVirtualGoods() {
      console.log(this.selectVirtualGoods.selectList);
      this.selectVirtualGoods.confirmProjectList = [];
      this.selectVirtualGoods.allselectList.map((item) => {
        if (this.selectVirtualGoods.selectList.indexOf(item.goodid) > -1) {
          this.selectVirtualGoods.confirmProjectList.push(item);
        }
      });
      this.selectVirtualGoods.isshow = false;
    },

    //查询所有--一级类目
    queryAllCheckDirFir() {
      this.selectPhysical.FirstTypeList = [
        {
          value: "全部",
          label: "全部",
        },
      ];
      this.$api.post("/manage/queryAllCheckDirFir").then((res) => {
        console.log(res);
        if (res.code == "200") {
          res.data.map((item) => {
            var temp = {
              value: item.checktypefirst,
              label: item.checktypefirst,
            };
            this.selectPhysical.FirstTypeList.push(temp);
          });
          if (this.isedit || this.$route.query.copy) {
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
          checktypefirst: this.selectPhysical.FirstTypeValue,
        })
        .then((res) => {
          console.log(res);
          if (res.code == "200") {
            res.data.map((item) => {
              var temp = {
                value: item.checktypesec,
                label: item.checktypesec,
              };
              this.selectPhysical.SecondTypeList.push(temp);
            });
          }
        });
    },
    //输入校验
    Inputvalidation() {
      if (!this.AddGoodsmsg.AddGoodsType) {
        this.$message.error("请选择商品类型");
        return false;
      }
      if (!this.AddGoodsmsg.Filiale) {
        this.$message.error("请选择分公司");
        return false;
      }
      if (!this.AddGoodsmsg.AddGoodsName) {
        this.$message.error("请输入商品名称");
        return false;
      }
      if (!this.AddGoodsmsg.AddGoodsPrice) {
        this.$message.error("请输入门市价");
        return false;
      }
      if (this.AddGoodsmsg.AddGoodsPrice == 0) {
        this.$message.error("售价不可为0");
        return false;
      }
      if (this.AddGoodsmsg.AddGoodsType == "虚拟商品") {
        if (!this.AddGoodsmsg.usePattern) {
          this.$message.error("请选择使用方式");
          return false;
        }
        if (
          this.AddGoodsmsg.usePattern == "外部使用" &&
          !this.AddGoodsmsg.mipLink
        ) {
          this.$message.error("请填写跳转链接");
          return false;
        }
      } else {
        if (
          this.AddGoodsmsg.grouptype == "全国套餐" &&
          !this.AddGoodsmsg.groupid
        ) {
          this.$message.error("请输入套餐编码");
          return false;
        }
        if (
          Number(this.AddGoodsmsg.AddGoodsPrice) <
          Number(this.AddGoodsmsg.AddGoodsMiniprice)
        ) {
          this.$message.error("最低价不能大于售价");
          return false;
        }
        if (this.selectCity.checkedCities.length <= 0) {
          this.$message.error("请选择城市");
          return false;
        }
        if (this.selectShop.confirmshopList.length <= 0) {
          this.$message.error("请选择门店");
          return false;
        }
        if (this.AddGoodsmsg.AddGoodsType == "电子体检卡") {
          if (
            !this.AddGoodsmsg.AppointmentUrl ||
            this.AddGoodsmsg.AppointmentUrl == ""
          ) {
            this.$message.error("请输入预约链接");
            return false;
          }
        }

        if (this.isshowfenxiao()) {
          if (
            !this.AddGoodsmsg.costprice ||
            this.AddGoodsmsg.costprice == "" ||
            this.AddGoodsmsg.costprice == 0
          ) {
            this.$message.error("请输入商品供应成本价");
            return false;
          }
          if (
            !this.AddGoodsmsg.pysaleprice ||
            this.AddGoodsmsg.pysaleprice == "" ||
            this.AddGoodsmsg.pysaleprice == 0
          ) {
            this.$message.error("请输入商品分销价");
            return false;
          }
          if (
            Number(this.AddGoodsmsg.pysaleprice) <
            Number(this.AddGoodsmsg.costprice)
          ) {
            this.$message.error("分销价格不能低于供应成本价");
            return false;
          }
          if (
            Number(this.AddGoodsmsg.pysaleprice) >
            Number(this.AddGoodsmsg.AddGoodsPrice)
          ) {
            this.$message.error("分销价格不能大于门市价");
            return false;
          }
        }
      }

      // if (this.selectPhysical.confirmProjectList.length <= 0) {
      //   this.$message.error("请选择体检项目");
      //   return false;
      // }
      return true;
    },
    //新增商品按钮/保存草稿按钮
    manageInsertGood(str) {
      if (this.Inputvalidation()) {
        var body = {
          goodimgs: this.AddGoodsmsg.goodimgs,
          goodtype: this.AddGoodsmsg.AddGoodsType,
          goodname: this.AddGoodsmsg.AddGoodsName,
          instname: this.AddGoodsmsg.Filiale,
          goodprice: Number(this.AddGoodsmsg.AddGoodsPrice),
          goodlowprice: Number(this.AddGoodsmsg.AddGoodsMiniprice),
          goodinst: [],
          goodchecktypes: [],
          goodaddpackage: [],
          goodvirtaulproduct: this.selectVirtualGoods.confirmProjectList,
          goodputaway: str,
          grouptype: this.AddGoodsmsg.grouptype,
          gender: this.AddGoodsmsg.gender,
          marital: this.AddGoodsmsg.marital,

          groupid: this.AddGoodsmsg.groupid,
          AppointmentUrl: this.AddGoodsmsg.AppointmentUrl,
          usePattern: this.AddGoodsmsg.usePattern,
          mipLink:
            this.AddGoodsmsg.usePattern == "外部使用"
              ? this.AddGoodsmsg.mipLink
              : "",
          goodcheckrecommended: this.AddGoodsmsg.goodcheckrecommended,
          gooddescribe: this.content,
          costprice: Number(this.AddGoodsmsg.costprice),
          pysaleprice: Number(this.AddGoodsmsg.pysaleprice),
        };
        this.selectCity.checkedCities.map((item) => {
          let obj = {
            instcity: item,
            instsalepointname: [],
          };
          body.goodinst.push(obj);
        });
        console.log(body.goodinst);
        if (body.goodinst.length == 1 && body.goodinst[0].instcity == "全国") {
          this.selectShop.confirmshopList.map((temp) => {
            let obj = {
              CenterName: temp.CenterName,
              Id: temp.Id,
              CityName: temp.CityName,
            };
            body.goodinst[0].instsalepointname.push(obj);
          });
        } else {
          body.goodinst.map((item, index) => {
            this.selectShop.confirmshopList.map((temp) => {
              if (item.instcity == temp.CityName) {
                let obj = {
                  CenterName: temp.CenterName,
                  Id: temp.Id,
                  CityName: temp.CityName,
                };
                body.goodinst[index].instsalepointname.push(obj);
              }
            });
          });
        }

        body.goodchecktypes.goodchecktypes = [];
        this.selectPhysical.confirmProjectfirsttype.map((item) => {
          let obj = {
            goodchecktypefirst: item,
            goodcheckdetail: [],
          };
          body.goodchecktypes.push(obj);
        });
        body.goodchecktypes.map((item, n) => {
          this.selectPhysical.confirmProjectList.map((temp) => {
            if (item.goodchecktypefirst == temp.checktypefirst) {
              let goodcheckdetail = {
                checkdescribe: temp.checkdescribe,
                checkname: temp.checkname,
                checkprice: temp.checkprice,
                checkid: temp.checkid,
                checklowprice: temp.checklowprice,
                checksignificance: temp.checksignificance,
              };
              body.goodchecktypes[n].goodcheckdetail.push(goodcheckdetail);
            }
          });
        });
        this.selectAddPackage.confirmProjectList.map((item) => {
          let obj = {
            goodname: item.goodname,
            goodsaleprice: item.goodsaleprice,
            goodcheckrecommended: item.goodcheckrecommended,
            goodid: item.goodid,
          };
          body.goodaddpackage.push(obj);
        });
        body.jiaxianggroup = [];
        if (this.selectaddpackageCombo.comfirmComboList.length > 0) {
          this.selectaddpackageCombo.comfirmComboList.forEach((element) => {
            var obj = {
              id: element.id,
            };
            body.jiaxianggroup.push(obj);
          });
        }
        this.$api
          .post("/manage/manageInsertGood", body)
          .then((res) => {
            console.log(res);
            if (res.code == "200") {
              this.$router.go(-1);
              this.$message.success("新增商品成功！");
            }
          })
          .catch((res) => {
            this.$message.error(res.msg);
          });
      }
    },

    affirmCompile() {
      //确认编辑商品
      if (this.state == "1" || this.CloseAudit == true) {
        var tty = "上架";
      } else {
        var tty = "下架";
      }

      if (
        this.AccountType == "2" &&
        this.state == "1" &&
        this.CloseAudit == false
      ) {
        this.$confirm("提交套餐将需要重新审核, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.manageupdategood(tty);
          })
          .catch(() => {});
      } else {
        this.manageupdategood(tty);
      }
    },
    //编辑商品按钮/保存草稿按钮
    manageupdategood(str) {
      if (this.Inputvalidation()) {
        var body = {};
        body = this.editgoodsobj;
        body.goodimgs = this.AddGoodsmsg.goodimgs;
        body.goodtype = this.AddGoodsmsg.AddGoodsType;
        body.goodname = this.AddGoodsmsg.AddGoodsName;
        body.instname = this.AddGoodsmsg.Filiale;
        body.goodprice = Number(this.AddGoodsmsg.AddGoodsPrice);
        body.goodlowprice = Number(this.AddGoodsmsg.AddGoodsMiniprice);
        body.grouptype = this.AddGoodsmsg.grouptype;
        body.groupid = this.AddGoodsmsg.groupid;
        body.costprice = Number(this.AddGoodsmsg.costprice);
        body.pysaleprice = Number(this.AddGoodsmsg.pysaleprice);
        body.AppointmentUrl = this.AddGoodsmsg.AppointmentUrl;
        body.gender = this.AddGoodsmsg.gender;
        body.marital = this.AddGoodsmsg.marital;
        body.usePattern = this.AddGoodsmsg.usePattern;
        body.mipLink =
          this.AddGoodsmsg.usePattern == "外部使用"
            ? this.AddGoodsmsg.mipLink
            : "";
        body.goodvirtaulproduct = this.selectVirtualGoods.confirmProjectList;
        body.goodcheckrecommended = this.AddGoodsmsg.goodcheckrecommended;

        body.goodputaway = str;
        body.goodinst = [];
        body.goodchecktypes = [];
        body.goodaddpackage = [];
        body.gooddescribe = this.content;
        console.log(this.selectCity.checkedCities);

        this.selectCity.checkedCities.map((item) => {
          let obj = {
            instcity: item,
            instsalepointname: [],
          };
          body.goodinst.push(obj);
        });
        if (body.goodinst.length == 1 && body.goodinst[0].instcity == "全国") {
          console.log(11111);

          this.selectShop.confirmshopList.map((temp) => {
            let obj = {
              CenterName: temp.CenterName,
              Id: temp.Id,
              CityName: temp.CityName,
            };
            body.goodinst[0].instsalepointname.push(obj);
          });
          console.log(body.goodinst);
        } else {
          body.goodinst.map((item, index) => {
            this.selectShop.confirmshopList.map((temp) => {
              if (item.instcity == temp.CityName) {
                let obj = {
                  CenterName: temp.CenterName,
                  Id: temp.Id,
                  CityName: temp.CityName,
                };
                body.goodinst[index].instsalepointname.push(obj);
              }
            });
          });
        }
        body.goodchecktypes.goodchecktypes = [];
        console.log(this.selectPhysical.confirmProjectfirsttype);

        this.selectPhysical.confirmProjectfirsttype.map((item) => {
          let obj = {
            goodchecktypefirst: item,
            goodcheckdetail: [],
          };
          body.goodchecktypes.push(obj);
        });
        body.goodchecktypes.map((item, n) => {
          this.selectPhysical.confirmProjectList.map((temp) => {
            if (item.goodchecktypefirst == temp.checktypefirst) {
              let goodcheckdetail = {
                checkdescribe: temp.checkdescribe,
                checkname: temp.checkname,
                checkprice: temp.checkprice,
                checkid: temp.checkid,
                checklowprice: temp.checklowprice,
                checksignificance: temp.checksignificance,
              };
              body.goodchecktypes[n].goodcheckdetail.push(goodcheckdetail);
            }
          });
        });
        console.log(this.selectAddPackage.confirmProjectList);
        if (Array.isArray(this.selectAddPackage.confirmProjectList)) {
          this.selectAddPackage.confirmProjectList.map((item) => {
            let obj = {
              goodname: item.goodname,
              goodsaleprice: item.goodsaleprice,
              goodcheckrecommended: item.goodcheckrecommended,
              goodid: item.goodid,
            };
            body.goodaddpackage.push(obj);
          });
        }

        body.jiaxianggroup = [];
        if (this.selectaddpackageCombo.comfirmComboList.length > 0) {
          this.selectaddpackageCombo.comfirmComboList.forEach((element) => {
            var obj = {
              id: element.id,
            };
            body.jiaxianggroup.push(obj);
          });
        }
        this.$api
          .post("/manage/manageupdategood", body)
          .then((res) => {
            console.log(res);
            if (res.code == "200") {
              this.$router.go(-1);
              this.$message.success("修改商品成功！");
            }
          })
          .catch((res) => {
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
      for (var i = 0; i < obj.length; i++) {
        var keys = Object.keys(obj[i]);
        keys.sort(function (a, b) {
          return Number(a) - Number(b);
        });
        var str = "";
        for (var j = 0; j < keys.length; j++) {
          str += JSON.stringify(keys[j]);
          str += JSON.stringify(obj[i][keys[j]]);
        }
        if (!stringify.hasOwnProperty(str)) {
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
      city_id.map((temp) => {
        if (temp.checked) {
          num++;
        }
      });
      if (num == city_id.length) {
        this.selectCity.cities[index]._id.checked = true;
        this.selectCity.cities[index]._id.indeterminate = false;
      } else if (num > 0) {
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
        if (this.selectCity.cities[val]._id.checked) {
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
      if (val) {
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
      // this.selectShop.confirmshopList = [];
      console.log(this.selectShop.confirmshopList);

      if (this.selectCity.nationwide) {
        this.selectCity.checkedCities = ["全国"];
        this.selectCity.isshow = false;
      } else {
        this.selectCity.checkedCities = [];
        this.selectCity.cities.map((item) => {
          item.citynames.map((temp) => {
            if (temp.checked) {
              this.selectCity.checkedCities.push(temp.city);
            }
          });
        });
        console.log(this.selectCity.checkedCities);
        this.selectShop.confirmshopList = this.selectShop.confirmshopList.filter(
          (item) => {
            return this.selectCity.checkedCities.indexOf(item.CityName) >= 0;
          }
        );
      }

      // console.log(templist);
      this.selectCity.isshow = false;
    },
    delconfirmProjectList(index) {
      this.$confirm("是否删除该体检项目", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.selectPhysical.confirmProjectList.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
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
      this.selectPhysical.confirmProjectfirsttype.map((item) => {
        selectProjectListtemp.map((temp) => {
          if (item == temp.checktypefirst) {
            this.selectPhysical.confirmProjectList.push(temp);
          }
        });
      });
    },
    delVirtualGoodsList(index) {
      this.$confirm("是否删除该虚拟商品项目", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.selectVirtualGoods.confirmProjectList.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    topVirtualGoodstList(index) {
      var temp = this.selectVirtualGoods.confirmProjectList[index];
      this.selectVirtualGoods.confirmProjectList.splice(index, 1);
      this.selectVirtualGoods.confirmProjectList.unshift(temp);
      // var checktypefirsttemp = temp.checktypefirst;
      // var confirmProjectfirsttypeindex = this.selectPhysical.confirmProjectfirsttype.indexOf(
      //   checktypefirsttemp
      // );
      // this.selectPhysical.confirmProjectfirsttype.splice(
      //   confirmProjectfirsttypeindex,
      //   1
      // );
      // this.selectPhysical.confirmProjectfirsttype.unshift(checktypefirsttemp);

      // var selectProjectListtemp = this.selectPhysical.confirmProjectList;
      // this.selectPhysical.confirmProjectList = [];
      // this.selectPhysical.confirmProjectfirsttype.map(item => {
      //   selectProjectListtemp.map(temp => {
      //     if (item == temp.checktypefirst) {
      //       this.selectPhysical.confirmProjectList.push(temp);
      //     }
      //   });
      // });
    },

    consentAudit() {
      //同意审核

      this.$confirm("您确定要审核通过吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          var body = {
            id: this.commodityid,
            status: "1",
          };
          this.$api
            .get("/manage/CheckAudit", body)
            .then((res) => {
              this.$router.go(-1);
              this.$message({
                type: "success",
                message: "审核已通过!",
              });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch(() => {});
    },
    refuseAudit() {
      //拒绝审核
      var body = {
        id: this.commodityid,
        status: "2",
        command: this.remarkContent,
      };
      this.$api
        .get("/manage/CheckAudit", body)
        .then((res) => {
          this.$message({
            type: "success",
            message: "审核已拒绝!",
          });
          this.$router.go(-1);
        })
        .catch((err) => {
          console.log(err);
        });
    },

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
    changeconfirmProjectList() {
      var objlist = this.selectAddPackage.confirmProjectList.filter((item) => {
        if (
          item.goodname.indexOf(this.selectAddPackage.vargoodsname) >= 0 &&
          String(item.goodsaleprice).indexOf(this.selectAddPackage.varsmj) >= 0
        ) {
          return true;
        }
      });
      return objlist;
    },
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
    // selectPhysical.confirmProjectList  checkprice checklowprice
    checklowpriceTotal() {
      var checklowpriceTotalnum = 0;
      if (this.selectPhysical.confirmProjectList) {
        this.selectPhysical.confirmProjectList.map((item) => {
          // console.log(item);

          checklowpriceTotalnum += Number(item.checklowprice);
        });
        return checklowpriceTotalnum;
      }
    },
    checkpriceTotal() {
      var checkpriceTotalnum = 0;
      if (this.selectPhysical.confirmProjectList) {
        this.selectPhysical.confirmProjectList.map((item) => {
          // console.log(item);

          checkpriceTotalnum += Number(item.checkprice);
        });
        return checkpriceTotalnum;
      }
    },
  },
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
  min-height: 100px;
  margin: 20px 20px 20px 120px;
  border: 1px solid #cccccc;
  border-radius: 4px;
  // padding-bottom: 10px;
  .el-form-item {
    margin-bottom: 0%;
  }
}
.cityitembox {
  margin: 10px 0px 0 10px;
}
.mycheckbox {
  .el-checkbox__label {
    font-size: 14px;
    font-weight: bold;
  }
}
.addimage {
  width: 120px;
  height: 120px;
  box-sizing: border-box;
  border: 2px dashed #dddddd;
  float: left;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>
