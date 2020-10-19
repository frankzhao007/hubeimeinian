<template>
  <div style="margin: 20px">
    <div style="font-size: 20px">
      <i @click="gotoOML()" class="el-icon-my-back backbtn"></i>
      <span>&nbsp&nbsp&nbsp订单套餐信息</span>
    </div>

    <div style="margin: 10px 0">
      <el-button
        type="primary"
        @click="addcombo()"
        :disabled="tableobj1.loading || auditStatus == 1"
        >新 增</el-button
      >
      <!-- <el-button type="primary" @click="importcombo()" :disabled="tableobj1.loading">导入套餐</el-button> -->
      <!-- <el-button type="primary" @click="importcombo('员工')" :disabled="tableobj1.loading">导入人员</el-button> -->
      <!-- <el-button type="primary" :disabled="tableobj1.loading">审 核</el-button> -->
      <el-button
        type="primary"
        @click="open()"
        :disabled="tableobj1.loading || auditStatus == 1"
        >保 存</el-button
      >

      <!-- <el-button
        type="primary"
        icon="el-icon-download"
        :loading="isshowpdf"
        @click="exportpdf()"
      >导出PDF</el-button>-->
    </div>
    <!-- 数据列表1 -->
    <div>
      <el-table
        :data="tableobj1.list"
        border
        style="width: 100%"
        v-loading="tableobj1.loading"
        max-height="500px"
        ref="singleTable"
        highlight-current-row
        @current-change="handleCurrentChange"
      >
        <el-table-column prop="ID" label="序号" width="80px"></el-table-column>
        <el-table-column prop="GROUPNAME" label="套餐名称"></el-table-column>
        <el-table-column label="性别">
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.OP_DATETIME"
              @change="UpdateCombo"
              placeholder
              :disabled="scope.row.locked == true"
              style="width: 100%"
              size="mini"
            >
              <el-option label="通用" value="0"></el-option>
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="2"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="TRANS_STATUS" label="自选项否">
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.TRANS_STATUS"
              @change="UpdateCombo"
              placeholder
              :disabled="scope.row.locked == true"
              style="width: 100%"
              size="mini"
            >
              <el-option label="是" value="Y"></el-option>
              <el-option label="否" value="N"></el-option>
              <el-option label="检验阳性" value="1"></el-option>
              <el-option label="检验阴性" value="2"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="OLDPRICE" label="原价">
          <template slot-scope="scope">
            <div>{{ yuanjiachange(scope.row.details) }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="PRICE" label="结算价">
          <template slot-scope="scope">
            <el-input
              v-model="scope.row.PRICE"
              @blur="UpdateCombo"
              placeholder="请填写"
              :disabled="scope.row.locked == true"
              style="width: 100%"
              size="mini"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="OLDPRICE" label="套餐折扣率">
          <template slot-scope="scope">
            <div>
              {{toFixed(scope.row.PRICE / yuanjiachange(scope.row.details)*100)}}%
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="costCoefficient"
          v-if="role == '财务' || role == '湖北销售主管'"
          label="成本系数"
        ></el-table-column>
        <el-table-column
          prop="costCoefficientRate"
          v-if="role == '财务' || role == '湖北销售主管'"
          label="成本系数率"
        ></el-table-column>
        <el-table-column prop="ID" label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              :disabled="
                tableobj1.loading ||
                auditStatus == 1 ||
                scope.row.locked == true
              "
              @click="DeleteCombo(scope.row.ID)"
              >删 除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- <div style="height:30px;margin-top:20px;">
        <el-pagination style="float:right" @size-change="" @current-change="" :current-page="tableobj1.pageindex" :page-sizes="[10, 20, 30, 40]" :page-size="tableobj1.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableobj1.total">
        </el-pagination>
      </div>-->
    </div>
    <div>
      <div style="margin: 20px 0 0">
        <span style="font-size: 20px; line-height: 40px">套餐明细</span>
        <span style="margin-left: 20px"
          >总计：{{ tableobj2.list.length || 0 }}&nbsp&nbsp项</span
        >
        <span style="margin-left: 20px"
          >原价：{{ yuanjiachange() }}&nbsp&nbsp元</span
        >
        <span style="margin-left: 20px" v-if="currentRow != ''"
          >结算价：{{ currentRow.PRICE }}&nbsp&nbsp元</span
        >
        <span style="margin-left: 20px" v-else>结算价：0&nbsp&nbsp元</span>
        <div style="float: right">
          <el-button
            type="primary"
            @click="selectxmobjbtn"
            :disabled="
              (tableobj1.loading && tableobj1.length == 0) ||
              auditStatus == 1 ||
              currentRow.locked == true
            "
            >选择体检项目</el-button
          >
          <el-button
            type="primary"
            @click="importProject()"
            :disabled="
              (tableobj1.loading && tableobj1.length == 0) ||
              auditStatus == 1 ||
              currentRow.locked == true
            "
            >项目导入</el-button
          >
          <el-button
            type="primary"
            @click="selectComboTemplate"
            :disabled="
              (tableobj1.loading && tableobj1.length == 0) ||
              auditStatus == 1 ||
              currentRow.locked == true
            "
            >从套餐模板中选</el-button
          >
          <el-button
            type="primary"
            @click="deleteClistEven"
            :disabled="
              (tableobj1.loading && tableobj1.length == 0) ||
              auditStatus == 1 ||
              currentRow.locked == true
            "
            >批量删除</el-button
          >
          <!-- <el-button type="text" icon="el-icon-plus" @click="addcombodetail" :disabled="tableobj1.loading">新增</el-button>
          <el-button type="text" icon="el-icon-plus">下载美年项目表</el-button>
          <el-button type="text" icon="el-icon-plus" @click="downloadXM()">下载项目模板</el-button>-->
        </div>
      </div>
    </div>
    <!-- 数据列表2 套餐明细 -->
    <div>
      <el-table
        :data="tableobj2.list"
        style="width: 100%"
        v-loading="tableobj2.loading"
        max-height="500px"
        @select="handleDeleteSelectionChange"
        border
      >
        <el-table-column
          type="selection"
          width="55"
          align="center"
          :selectable="isDel"
        ></el-table-column>
        <el-table-column label="序号" align="center" width="55">
          <template slot-scope="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column label="项目代码" align="center">
          <template slot-scope="scope">
            {{ scope.row.ITEM_ID }}
            <!-- <el-select v-model="scope.row.ITEM_ID" placeholder="" style="width:200px" size="mini" filterable @change="GetComboItemDetail1(scope.row,scope.$index)">
              <el-option v-for="item in ITEM_IDlist" :label="item.ITEM_ID+'-'+item.ITEM_NAME" :value="item.ITEM_ID" :key="item.ITEM_ID"></el-option>
            </el-select>-->
            <!-- <el-input v-model="scope.row.ITEM_ID" placeholder="请填写" style="width:200px" size="mini" @change="GetComboItemDetail(scope.row,scope.$index)"></el-input> -->
          </template>
        </el-table-column>
        <el-table-column
          prop="ITEM_NAME"
          label="项目名称"
          align="center"
        ></el-table-column>
        <el-table-column prop="SUBITEM" label="详细描述" align="center">
          <template slot-scope="scope">
            <span
              v-if="scope.row.SUBITEM != null && scope.row.SUBITEM.length != 0"
            >
              <span v-for="item in scope.row.SUBITEM">{{
                item.CHECK_ITEM
              }}</span>
            </span>
            <span v-else>无</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="PRICE"
          label="项目价格"
          align="center"
        ></el-table-column>
        <el-table-column
          label="成本系数"
          v-if="role == '财务' || role == '湖北销售主管'"
          align="center"
        >
          <template slot-scope="scope">
            <span v-if="scope.row.DRCC">{{ scope.row.DRCC }}</span>
            <span v-else>{{ scope.row.costCoefficient }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="80px" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="delcombodetail(scope.row, scope.$index)"
              :disabled="
                auditStatus == 1 ||
                scope.row.tag == true ||
                currentRow.locked == true
              "
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- <div style="height:30px;margin-top:20px;">
        <el-pagination style="float:right" @size-change="" @current-change="" :current-page="tableobj2.pageindex" :page-sizes="[10, 20, 30, 40]" :page-size="tableobj2.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableobj2.total">
        </el-pagination>
      </div>-->
    </div>
    <div>
      <!-- <div style="margin:20px 0 0 0 ;border-top:1px solid #cccccc"> -->
      <div style="margin: 20px 0 0 0">
        <span style="font-size: 20px; line-height: 40px">人员明细</span>
        <div style="float: right">
          <el-button type="primary" @click="creatInfo()"
            >生成预约信息</el-button
          >
          <el-button
            type="primary"
            @click="openGuest()"
            :disabled="tableobj1.loading && tableobj1.length == 0"
            >新增/编辑人员</el-button
          >
          <el-button
            type="primary"
            @click="downloadRY()"
            :disabled="tableobj1.loading && tableobj1.length == 0"
            >人员导入</el-button
          >
          <el-button
            type="primary"
            @click="DeleteGlsitEven"
            :disabled="tableobj1.loading && tableobj1.length == 0"
            >批量删除</el-button
          >
        </div>
      </div>
    </div>
    <!-- 数据列表3 人员明细 -->
    <div>
      已分配人员
      <el-table
        :data="tableobj3.list"
        style="width: 100%"
        v-loading="tableobj3.loading"
        max-height="500px"
        border
        @selection-change="handleSelectionChange"
      >
        >
        <el-table-column
          type="selection"
          width="55"
          :selectable="isLocked"
        ></el-table-column>
        <el-table-column label="序号" width="80px">
          <template slot-scope="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column label="姓名" prop="XM"></el-table-column>
        <el-table-column label="性别">
          <template slot-scope="scope">
            <el-select
              v-model="scope.row.XB"
              disabled
              placeholder
              style="width: 100%"
              size="mini"
            >
              <el-option label="男" value="2"></el-option>
              <el-option label="女" value="1"></el-option>
              <el-option label="通用" value="0"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column label="身份号" prop="SFZHM"></el-table-column>
        <el-table-column label="婚否">
          <template slot-scope="scope" prop="HYZK">
            <el-select
              v-model="scope.row.HYZK"
              disabled
              placeholder
              style="width: 100%"
              size="mini"
            >
              <el-option label="已婚" value="01"></el-option>
              <el-option label="未婚" value="02"></el-option>
              <!-- <el-option label="" value="3"></el-option> -->
            </el-select>
          </template>
        </el-table-column>
        <el-table-column prop="K3_ZG_ITEM" label="套餐"></el-table-column>
        <el-table-column label="部门2" prop="K3_ITEM"></el-table-column>
        <el-table-column prop="CW" label="所属套餐"></el-table-column>
        <el-table-column label="操作" width="80px">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              @click="delGuestdetail(scope.row, scope.$index)"
              :disabled="scope.row.locked == true"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- <div style="height:30px;margin-top:20px;">
        <el-pagination style="float:right" @size-change="" @current-change="" :current-page="tableobj3.pageindex" :page-sizes="[10, 20, 30, 40]" :page-size="tableobj3.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableobj3.total">
        </el-pagination>
      </div>-->
    </div>

    <!-- 新增套餐弹窗 -->
    <div>
      <el-dialog
        title="新增套餐"
        :visible.sync="addcomboobj.isshow"
        width="450px"
      >
        <el-form
          :model="addcomboobj"
          label-position="right"
          label-width="120px"
          size="medium"
        >
          <el-form-item label="套餐名称：">
            <el-input
              v-model="addcomboobj.GROUPNAME"
              placeholder="请填写"
              style="width: 200px"
            ></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-select
              v-model="addcomboobj.OP_DATETIME"
              placeholder
              style="width: 200px"
            >
              <el-option label="通用" value="0"></el-option>
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="自选项否：">
            <el-select
              v-model="addcomboobj.TRANS_STATUS"
              placeholder
              style="width: 200px"
            >
              <el-option label="是" value="Y"></el-option>
              <el-option label="否" value="N"></el-option>
              <el-option label="检验阳性" value="1"></el-option>
              <el-option label="检验阴性" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="结算价：">
            <el-input
              v-model="addcomboobj.PRICE"
              placeholder="请填写"
              style="width: 200px"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item label="原价：">
            <el-input v-model="addcomboobj.OLDPRICE" placeholder="请填写" style="width:200px"></el-input>
          </el-form-item>-->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addcomboobj.isshow = false">取 消</el-button>
          <el-button type="primary" @click="addcombobtn()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 新增员工弹窗 -->
    <div>
      <el-dialog
        title="新增/编辑员工"
        :visible.sync="isaddGuest"
        width="1250px"
      >
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="addGuestdetail"
          style="float: right"
          :disabled="tableobj1.loading && tableobj1.length == 0"
          >新增</el-button
        >
        <el-table
          :data="guestList.list"
          style="width: 100%"
          v-loading="guestList.loading"
          max-height="500px"
          border
        >
          <el-table-column label="序号" width="80px">
            <template slot-scope="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column label="姓名">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.XM"
                placeholder="请填写"
                :disabled="scope.row.locked == true"
                style="width: 100%"
                size="mini"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="性别">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.XB"
                placeholder
                :disabled="scope.row.locked == true"
                style="width: 100%"
                size="mini"
              >
                <el-option label="男" value="2"></el-option>
                <el-option label="女" value="1"></el-option>
                <el-option label="通用" value="0"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="身份号">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.SFZHM"
                placeholder="请填写"
                :disabled="scope.row.locked == true"
                style="width: 100%"
                size="mini"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="婚否">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.HYZK"
                placeholder
                :disabled="scope.row.locked == true"
                style="width: 100%"
                size="mini"
              >
                <el-option label="已婚" value="01"></el-option>
                <el-option label="未婚" value="02"></el-option>
                <!-- <el-option label="" value="3"></el-option> -->
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="K3_ZG_ITEM" label="套餐"></el-table-column>
          <el-table-column label="部门2">
            <template slot-scope="scope">
              <el-input
                :disabled="scope.row.locked == true"
                v-model="scope.row.K3_ITEM"
                placeholder="请填写"
                style="width: 100%"
                size="mini"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="CW" label="所属套餐"></el-table-column>
          <el-table-column label="操作" width="80px">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                :disabled="scope.row.locked == true"
                @click="delGuestdetail(scope.row, scope.$index)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button @click="isaddGuest = false">取 消</el-button>
          <el-button type="primary" @click="saveGuestbtn()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- pdf样式 -->
    <div v-show="isshowpdf" class="pdfclass">
      <div id="approvaContent_pdf" style="padding: 20px">
        <div class="pdfhead">
          <div>套餐信息</div>
          <div>
            <el-table
              :data="tableobj1.list"
              style="width: 100%"
              v-loading="tableobj1.loading"
            >
              <el-table-column
                prop="ID"
                label="套餐ID"
                width="80px"
              ></el-table-column>
              <el-table-column
                prop="GROUPNAME"
                label="套餐名称"
              ></el-table-column>
              <el-table-column
                prop="OP_DATETIME"
                label="类别"
              ></el-table-column>
              <el-table-column
                prop="TRANS_STATUS"
                label="自选项否"
              ></el-table-column>
              <el-table-column prop="PRICE" label="成交价"></el-table-column>
              <el-table-column prop="OLDPRICE" label="原价"></el-table-column>
            </el-table>
          </div>
        </div>
        <div class="pdfbody">
          <div>项目详情</div>
          <div v-for="item in tableobj6.list" style="font-size: 20px">
            {{ combonamechange(item) }}
            <el-table :data="combonamechange1(item)" style="width: 100%">
              <el-table-column label="序号" width="80px">
                <template slot-scope="scope">{{ scope.$index + 1 }}</template>
              </el-table-column>
              <el-table-column
                prop="ITEM_ID"
                label="项目代码"
              ></el-table-column>
              <el-table-column
                prop="ITEM_NAME"
                label="项目名称"
              ></el-table-column>
              <el-table-column prop="PRICE" label="金额"></el-table-column>
              <el-table-column
                prop="ID"
                label="所属套餐"
                width="100px"
              ></el-table-column>
            </el-table>
          </div>
        </div>
        <div class="pdffoot">
          <div>人员明细</div>
          <div>
            <el-table :data="tableobj5.list" style="width: 100%">
              <el-table-column label="序号" width="80px">
                <template slot-scope="scope">{{ scope.$index + 1 }}</template>
              </el-table-column>
              <el-table-column label="姓名" prop="XM"></el-table-column>
              <el-table-column label="性别" prop="XB">
                <template slot-scope="scope">{{
                  scope.row.XB == "1" ? "男" : "女"
                }}</template>
              </el-table-column>
              <el-table-column label="身份号" prop="SFZHM"></el-table-column>
              <el-table-column label="婚否" prop="HYZK"></el-table-column>
              <el-table-column label="部门2" prop="K3_ITEM"></el-table-column>
              <el-table-column
                prop="K3_ZG_ITEM"
                label="套餐名称"
              ></el-table-column>
              <el-table-column prop="CW" label="所属套餐"></el-table-column>
            </el-table>
          </div>
        </div>
      </div>
    </div>
    <!-- excel导入选择工作表 -->
    <div>
      <el-dialog
        title="该excel存在多个工作表，请选择"
        :visible.sync="excelselectobj.isshow"
        width="400px"
      >
        <el-radio-group v-model="excelselectSheetNames">
          <el-radio
            v-for="item in excelSheetNames"
            :key="item"
            :label="item"
            style="line-height: 36px; width: 100%"
            >{{ item }}</el-radio
          >
        </el-radio-group>
        <div slot="footer" class="dialog-footer">
          <el-button @click="excelselectobj.isshow = false">取 消</el-button>
          <el-button
            type="primary"
            @click="excelparse(excelwbobj[excelselectSheetNames])"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
    <!-- 选择体检项目 -->
    <div class="sxmobj">
      <el-dialog
        title="选择项目"
        :visible.sync="selectxmobj.isshow"
        width="800px"
      >
        <div style="position: relative">
          <div class="sxmclass">
            未选套餐：
            <div class="sxmmainclass">
              <div class="sxmmainclassinput">
                <el-input
                  v-model="dimtext"
                  prefix-icon="el-icon-search"
                  placeholder="输入项目代码或检查项名称"
                  size="small"
                  style="width: 80%; margin-left: 10px"
                ></el-input>
              </div>
              <div style="height: 30px"></div>
              <el-checkbox-group
                v-model="selectxmobj.checkList"
                style="margin-top: 10px"
                @change="checkListchange"
              >
                <el-checkbox
                  style="min-width: 100%; margin: 5px 0 0 0"
                  v-for="item in dimchange"
                  :key="item.ITEM_ID"
                  :label="item.ITEM_ID + ' - ' + item.ITEM_NAME"
                ></el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
          <div class="sxmclass" style="position: absolute; right: 0%; top: 0%">
            已选套餐：
            <div class="sxmmainclass">
              <div style="margin-top: 10px">
                <div
                  class="sxmmainclassdiv"
                  v-for="(item, index) in selectxmobj.checkList1"
                  :key="item.ITEM_ID"
                >
                  {{ item.ITEM_ID + " - " + item.ITEM_NAME }}
                  <i
                    @click="delcheckList(item, index)"
                    class="el-icon-circle-close"
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="selectxmobj.isshow = false">取 消</el-button>
          <el-button type="primary" @click="selectxmobj.isshow = false"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>

    <!-- 选择体检项目 -->
    <SelectItem
      :isshow="isshowselectItem"
      :selectlist="selectlist"
      :READ_ORNOT="READ_ORNOT"
      :XB="currentRow.OP_DATETIME"
      :itemFilter="itemFilter"
      @changeisshow="listenST"
      @confirmselectpackage="confirmselectpackage"
    ></SelectItem>

    <!-- 选择套餐模板弹窗 -->
    <div>
      <el-dialog
        title="选择套餐模板"
        :visible.sync="selectComboTemplateObj.isShow"
        width="1200px"
      >
        <el-form
          :inline="true"
          :model="selectComboTemplateObj"
          label-position="right"
          label-width="100px"
          size="medium"
        >
          <el-form-item label="套餐名称：">
            <el-input
              v-model="selectComboTemplateObj.GROUPNAME"
              placeholder="请填写"
              style="width: 200px"
            ></el-input>
          </el-form-item>
          <el-form-item label="婚姻状态：">
            <el-select
              v-model="selectComboTemplateObj.HYZK"
              placeholder
              style="width: 200px"
            >
              <el-option label="已婚" value="01"></el-option>
              <el-option label="未婚" value="02"></el-option>
              <el-option label="通用" value="03"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="性别：">
            <el-select v-model="selectComboTemplateObj.XB" style="width: 200px">
              <el-option
                v-if="
                  currentRow.OP_DATETIME == '0' || currentRow.OP_DATETIME == '1'
                "
                label="男"
                value="1"
              ></el-option>
              <el-option
                v-if="
                  currentRow.OP_DATETIME == '0' || currentRow.OP_DATETIME == '2'
                "
                label="女"
                value="2"
              ></el-option>
              <el-option label="通用" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="float: right">
            <el-button type="primary" @click="selectComboTemplateBtn()"
              >搜 索</el-button
            >
          </el-form-item>
        </el-form>
        <div>
          <el-table
            :data="selectComboTemplateObj.templateList"
            style="width: 100%"
            v-loading="selectComboTemplateObj.loading"
            highlight-current-row
            @current-change="handleCurrentChange1"
          >
            <el-table-column
              prop="GROUPNAME"
              label="套餐名称"
            ></el-table-column>
            <el-table-column label="性别">
              <template slot-scope="scope">{{
                XBchange(scope.row.XB)
              }}</template>
            </el-table-column>
            <el-table-column label="婚否">
              <template slot-scope="scope">{{
                HYZkchange(scope.row.HYZK)
              }}</template>
            </el-table-column>
            <el-table-column prop="PRICE" label="价格"></el-table-column>
          </el-table>
          <div style="height: 30px; margin-top: 20px">
            <el-pagination
              style="float: right"
              @size-change
              @current-change
              :current-page="selectComboTemplateObj.pageIndex"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="selectComboTemplateObj.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="selectComboTemplateObj.total"
            ></el-pagination>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="selectComboTemplateObj.isShow = false"
            >取 消</el-button
          >
          <el-button type="primary" @click="confirmslectobj">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <input
      ref="inputer"
      id="upload"
      style="display: none"
      type="file"
      @change="importfxx()"
      accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
    />

    <!-- 项目导入 -->
    <div class="ygplcz">
      <el-dialog
        title="项目批量导入"
        :visible.sync="dialogImportEmployee"
        width="800px"
      >
        <div
          v-loading="updataobj.isshow"
          :element-loading-text="updataobj.loadingtext"
          element-loading-spinner="el-icon-loading"
        >
          <!--<span>选择企业：</span>
              <el-select :disabled="ygplczobj.drobj.active!=0" aria-label="选择企业" size="small" v-model="ygplczobj.drobj.company" filterable>
                <el-option v-for="(item,index) in ygplczobj.companyList" :key="index" :label="item" :value="item"></el-option>
          </el-select>-->
          <el-steps
            style="margin-top: 10px"
            :active="ygplczobj.drobj.active"
            finish-status="success"
            process-status="finish"
            simple
          >
            <el-step title="上传文件" icon="el-icon-upload"></el-step>
            <el-step title="执行导入" icon="el-icon-s-platform"></el-step>
            <el-step title="导入完成" icon="el-icon-success"></el-step>
          </el-steps>
          <div v-if="ygplczobj.drobj.active == 0">
            <el-card>
              <div class="box-card">
                <div>
                  <i
                    style="font-size: 50px; margin: 10px"
                    class="el-icon-my-download"
                  ></i>
                </div>
                <div style="width: 100%; margin-left: 20px">
                  <div style>
                    <div style="font-size: 18px">请按照模板填写信息后导入</div>
                    <div style="font-size: 14px; color: #ccc">
                      为提高导入的成功率，请下载并使用系统提供的模板。单次导入不超过5000条
                    </div>
                  </div>
                  <el-button
                    class="carbtn"
                    type="primary"
                    size="small"
                    @click="DownloadTemplate"
                    >下载模板</el-button
                  >
                </div>
              </div>
            </el-card>
            <el-card>
              <div class="box-card">
                <div>
                  <i
                    style="font-size: 50px; margin: 10px"
                    class="el-icon-my-upload"
                  ></i>
                </div>
                <div style="width: 100%; margin-left: 20px">
                  <div style>
                    <div style="font-size: 18px">上传数据</div>
                    <div style="font-size: 14px; color: #9e9e9e">
                      仅支持xlsx或xls（即Excel格式），文件大小≤4M。
                    </div>
                    <div style="font-size: 14px; color: #3a83ff">
                      {{ filename }}
                    </div>
                  </div>
                  <el-button
                    class="carbtn"
                    type="primary"
                    size="small"
                    @click="returnAllUsers"
                    >上传文件</el-button
                  >
                </div>
              </div>
            </el-card>
            <div style="text-align: center; margin-top: 20px">
              <el-button type="primary" @click="verifyImport">确定</el-button>
            </div>
          </div>
          <div v-if="ygplczobj.drobj.active == 1">
            <el-card>
              <div class="box-card">
                <div style="width: 100%; margin-left: 20px">
                  <div style>
                    <div style="font-size: 16px">正确数据条数</div>
                    <div style="font-size: 14px; color: #4cca32">
                      {{ goodXlsx.length - badXlsx.length }}条
                    </div>
                  </div>
                </div>
              </div>
            </el-card>
            <el-card>
              <div class="box-card">
                <div style="width: 100%; margin-left: 20px">
                  <div style>
                    <div style="font-size: 16px">异常数据条数</div>
                    <div style="font-size: 14px; color: #f63649">
                      {{ badXlsx.length }}条
                    </div>
                  </div>
                  <!--<el-button class="carbtn" type="primary" size="small" @click="downloadfaildata">下载异常数据</el-button>-->
                </div>
              </div>
            </el-card>
            <div style="margin-top: 20px">
              <el-button type="primary" @click="confirmimport"
                >确认导入</el-button
              >
              <el-button style="float: right" @click="resetupload"
                >重新上传</el-button
              >
            </div>
            <div style="margin-top: 20px" v-if="badXlsx.length > 0">
              无效数据：
              <div
                style="text-align: left; position: relative; margin-top: 20px"
                v-for="item in badXlsx"
              >
                <div style="float: left; margin-left: 0px">
                  门店编码：{{ item.localCenterCode || "无门店编码" }}
                </div>

                <div
                  style="
                    max-width: 200px;
                    float: left;
                    color: red;
                    margin-left: 30px;
                  "
                >
                  错误提示：第{{ item.serialNumber }}行，{{
                    item.misdescription
                  }}
                </div>
                <div style="clear: both"></div>
              </div>
            </div>
          </div>
          <div v-if="ygplczobj.drobj.active == 2">
            <div style="text-align: center">
              <div style="font-size: 28px; color: #00000; margin: 20px">
                批量导入完成
              </div>
              <div style="font-size: 16px; color: #4cca32; margin-bottom: 20px">
                成功导入数量{{ goodXlsx.length - badXlsx.length }}条
              </div>
              <el-button
                type="primary"
                style="margin: 20pxl.; padding: 15px 50px"
                @click="okBtn()"
                >完 成</el-button
              >
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
    <!-- 员工导入 -->
    <div class="ygplcz">
      <el-dialog title="员工批量导入" :visible.sync="dialogGuest" width="800px">
        <div
          v-loading="updataobj.isshow"
          :element-loading-text="updataobj.loadingtext"
          element-loading-spinner="el-icon-loading"
        >
          <!--<span>选择企业：</span>
              <el-select :disabled="ygplczobj.drobj.active!=0" aria-label="选择企业" size="small" v-model="ygplczobj.drobj.company" filterable>
                <el-option v-for="(item,index) in ygplczobj.companyList" :key="index" :label="item" :value="item"></el-option>
          </el-select>-->
          <el-steps
            style="margin-top: 10px"
            :active="ygplczobj.drobj.active"
            finish-status="success"
            process-status="finish"
            simple
          >
            <el-step title="上传文件" icon="el-icon-upload"></el-step>
            <el-step title="执行导入" icon="el-icon-s-platform"></el-step>
            <el-step title="导入完成" icon="el-icon-success"></el-step>
          </el-steps>
          <div v-if="ygplczobj.drobj.active == 0">
            <el-card>
              <div class="box-card">
                <div>
                  <i
                    style="font-size: 50px; margin: 10px"
                    class="el-icon-my-download"
                  ></i>
                </div>
                <div style="width: 100%; margin-left: 20px">
                  <div style>
                    <div style="font-size: 18px">请按照模板填写信息后导入</div>
                    <div style="font-size: 14px; color: #ccc">
                      为提高导入的成功率，请下载并使用系统提供的模板。单次导入不超过5000条
                    </div>
                  </div>
                  <el-button
                    class="carbtn"
                    type="primary"
                    size="small"
                    @click="DownloadTemplate2"
                    >下载模板</el-button
                  >
                </div>
              </div>
            </el-card>
            <el-card>
              <div class="box-card">
                <div>
                  <i
                    style="font-size: 50px; margin: 10px"
                    class="el-icon-my-upload"
                  ></i>
                </div>
                <div style="width: 100%; margin-left: 20px">
                  <div style>
                    <div style="font-size: 18px">上传数据</div>
                    <div style="font-size: 14px; color: #9e9e9e">
                      仅支持xlsx或xls（即Excel格式），文件大小≤4M。
                    </div>
                    <div style="font-size: 14px; color: #3a83ff">
                      {{ filename }}
                    </div>
                  </div>
                  <el-button
                    class="carbtn"
                    type="primary"
                    size="small"
                    @click="returnAllUsers"
                    >上传文件</el-button
                  >
                </div>
              </div>
            </el-card>
            <div style="text-align: center; margin-top: 20px">
              <el-button type="primary" @click="verifyImport">确定</el-button>
            </div>
          </div>
          <div v-if="ygplczobj.drobj.active == 1">
            <el-card>
              <div class="box-card">
                <div style="width: 100%; margin-left: 20px">
                  <div style>
                    <div style="font-size: 16px">正确数据条数</div>
                    <div style="font-size: 14px; color: #4cca32">
                      {{ goodXlsx.length - badXlsx.length }}条
                    </div>
                  </div>
                </div>
              </div>
            </el-card>
            <el-card>
              <div class="box-card">
                <div style="width: 100%; margin-left: 20px">
                  <div style>
                    <div style="font-size: 16px">异常数据条数</div>
                    <div style="font-size: 14px; color: #f63649">
                      {{ badXlsx.length }}条
                    </div>
                  </div>
                  <!--<el-button class="carbtn" type="primary" size="small" @click="downloadfaildata">下载异常数据</el-button>-->
                </div>
              </div>
            </el-card>
            <div style="margin-top: 20px">
              <el-button type="primary" @click="confirmimport"
                >确认导入</el-button
              >
              <el-button style="float: right" @click="resetupload"
                >重新上传</el-button
              >
            </div>
            <div style="margin-top: 20px" v-if="badXlsx.length > 0">
              无效数据：
              <div
                style="text-align: left; position: relative; margin-top: 20px"
                v-for="item in badXlsx"
              >
                <div style="float: left; margin-left: 0px">
                  门店编码：{{ item.localCenterCode || "无门店编码" }}
                </div>

                <div
                  style="
                    max-width: 200px;
                    float: left;
                    color: red;
                    margin-left: 30px;
                  "
                >
                  错误提示：第{{ item.serialNumber }}行，{{
                    item.misdescription
                  }}
                </div>
                <div style="clear: both"></div>
              </div>
            </div>
          </div>
          <div v-if="ygplczobj.drobj.active == 2">
            <div style="text-align: center">
              <div style="font-size: 28px; color: #00000; margin: 20px">
                批量导入完成
              </div>
              <div style="font-size: 16px; color: #4cca32; margin-bottom: 20px">
                成功导入数量{{ goodXlsx.length - badXlsx.length }}条
              </div>
              <el-button
                type="primary"
                style="margin: 20pxl.; padding: 15px 50px"
                @click="okBtn()"
                >完 成</el-button
              >
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
    <!--<input ref="inputer" id="upload" style="display:none" type="file" @change="importfxx()" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />-->
  </div>
</template>
<script>
import SelectItem from "../DataManagement/component/SelectItem";
import html2Canvas from "html2canvas";
import JsPDF from "jspdf";
export default {
  components: { SelectItem },
  data() {
    return {
      //				time56:'2020-05-14 00:00:00',
      ygplczobj: {
        isshow: false,
        activeName: "first",
        companyList: [],
        drobj: {
          company: "", //企业名称，
          fileName: "", //文件名称
          active: 0, //当前步骤
          yglist: [],
          drResult: "",
          loading: false,
          loadingtext: "",
        },
      },
      // 上传表格
      goodXlsx: [],
      badXlsx: [],
      READ_ORNOT: "",
      errorFile: false,
      rightWord: false,
      filename: "",
      file: "",
      updataobj: {
        isshow: false,
        errshow: false,
        errdata: [],
        loadingtext: "",
      },
      deleteClist: [],
      deleteGlist: [],
      updataobj: {
        isshow: false,
        errshow: false,
        errdata: [],
        loadingtext: "",
      },
      dialogImportEmployee: false, //批量导入员工弹窗
      dialogGuest: false,
      selectComboTemplateObj: {
        isShow: false,
        templateList: [],
        GROUPNAME: "",
        XB: "0",
        HYZK: "",
        pageIndex: 1,
        pageSize: 10,
        loading: false,
        total: 0,
        selectobj: "",
      },
      isshowselectItem: false,
      selectlist: [],

      dimtext: "",
      //选择体检项目obj
      selectxmobj: {
        isshow: false,
        checkList: [],
        checkList1: [],
      },
      ITEM_IDlist: [],
      selectITEM_IDlist: [],
      isyuangong: false,
      excelselectSheetNames: "",
      excelSheetNames: [],
      excelwbobj: "",
      excelselectobj: {
        isshow: false,
      },
      isshowpdf: false,
      addcomboobj: {
        isshow: false,
        MsjBILLCODE: "",
        GROUPNAME: "",
        OP_DATETIME: "0",
        TRANS_STATUS: "Y",
        PRICE: "",
        OLDPRICE: "",
      },
      isaddGuest: false,
      tableobj1: {
        list: [],
        loading: false,
        total: 0,
      },
      tableobj2: {
        list: [],
        loading: false,
        total: 0,
      },
      tableobj3: {
        list: [],
        loading: false,
        total: 0,
      },
      tableobj4: {
        list: [],
        loading: false,
        total: 0,
      },
      tableobj5: {
        list: [],
        loading: false,
        total: 0,
      },
      tableobj6: {
        list: [],
        loading: false,
        total: 0,
      },
      guestList: {
        list: [],
        loading: false,
        total: 0,
      },
      currentRow: "",
      role: "",
      auditStatus: 0,
      itemFilter: true,
    };
  },
  mounted() {
    if (this.$route.query) {
      this.addcomboobj.MsjBILLCODE = this.$route.query.MsjBILLCODE;
      this.READ_ORNOT = this.$route.query.READ_ORNOT;
      this.auditStatus = this.$route.query.auditStatus;
    }
    //
    console.log(this.$store.getters.getrolemsg);
    this.role = this.$store.getters.getrolemsg;
    // setTimeout(() => {

    // }, 1);
    this.tableobj1.loading = true;
    this.getITEM_IDlist();
    // this.getAccountByMnId();
  },
  methods: {
    confirmslectobj() {
      if (this.selectComboTemplateObj.selectobj == "") {
        this.$message.error("请选择套餐模板");
      } else {
        console.log(this.selectComboTemplateObj.selectobj);
        this.FindOneSetmeal();
      }
    },
    getAccountByMnId() {
      this.$network3
        .get("/qrhealth/manage/QueryAccountByMnId", {
          mnid: this.$store.getters.getRoleInfo.MNId,
        })
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //查询单个套餐
    FindOneSetmeal() {
      this.$network3
        .get("/mnoracle/setmeal/FindOneSetmeal", {
          SETMEALID: this.selectComboTemplateObj.selectobj.SETMEALID,
          pageIndex: 1,
          pageSize: 99999,
        })
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.tableobj2.list = res.data.PackageDetails;
            this.saveComboDetil(res.data.PackageDetails);
            this.selectComboTemplateObj.isShow = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    selectComboTemplateBtn() {
      this.selectComboTemplateObj.pageIndex = 1;
      this.FindSetmeals();
    },
    XBchange(XB) {
      switch (XB) {
        case "1":
          return "男";
          break;
        case "2":
          return "女";
          break;
        case "0":
          return "通用";
          break;
        default:
          break;
      }
    },
    HYZkchange(HYZK) {
      switch (HYZK) {
        case "01":
          return "已婚";
          break;
        case "02":
          return "未婚";
          break;
        case "03":
          return "未知";
          break;
        default:
          break;
      }
    },

    selectComboTemplate() {
      (this.selectComboTemplateObj = {
        isShow: true,
        templateList: [],
        GROUPNAME: "",
        XB: this.currentRow.OP_DATETIME,
        HYZK: "",
        pageIndex: 1,
        pageSize: 10,
        loading: false,
        total: 0,
        selectobj: "",
      }),
        //查询套餐列表
        this.FindSetmeals();
    },
    //查询套餐列表
    FindSetmeals() {
      this.selectComboTemplateObj.loading = true;
      this.$network3
        .get("/mnoracle/setmeal/FindSetmeals", {
          GROUPNAME: this.selectComboTemplateObj.GROUPNAME,
          XB: this.selectComboTemplateObj.XB,
          HYZK: this.selectComboTemplateObj.HYZK,
          pageIndex: this.selectComboTemplateObj.pageIndex,
          pageSize: this.selectComboTemplateObj.pageSize,
        })
        .then((res) => {
          console.log(res);
          this.selectComboTemplateObj.loading = false;
          if (res.code == 200) {
            this.selectComboTemplateObj.templateList = res.data.SETMEALlist;
            this.selectComboTemplateObj.total = res.data.count;
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message.error(err.msg);
        });
    },
    handleSelectionChange(val) {
      console.log(val);
      this.deleteGlist = val;
    },
    handleDeleteSelectionChange(val, row) {
      console.log(val, row);
      this.deleteClist = val;
    },
    isDel(row) {
      return !row.tag;
    },
    isLocked(row) {
      return !row.locked;
    },
    handleCurrentChange1(val) {
      console.log(val);
      this.selectComboTemplateObj.selectobj = val;
    },
    confirmselectpackage(data) {
      console.log(data);
      this.tableobj2.list = data;
      this.saveComboDetil(data);
    },
    listenST(data) {
      console.log(data);
      this.isshowselectItem = data;
    },
    delcheckList(item, index) {
      this.selectxmobj.checkList1.splice(index, 1);
      console.log(item);
      this.selectxmobj.checkList.map((row, index1) => {
        if (row == item.ITEM_ID + " - " + item.ITEM_NAME) {
          this.selectxmobj.checkList.splice(index1, 1);
        }
      });
    },
    checkListchange(val) {
      console.log(val);
      this.selectxmobj.checkList1 = [];
      val.map((item) => {
        this.ITEM_IDlist.map((temp) => {
          if (temp.ITEM_ID == item.split(" - ")[0]) {
            this.selectxmobj.checkList1.push({
              ITEM_ID: temp.ITEM_ID,
              ITEM_NAME: temp.ITEM_NAME,
            });
          }
        });
      });
    },

    selectxmobjbtn() {
      console.log(this.tableobj2.list);
      this.isshowselectItem = true;
      this.selectlist = [...this.tableobj2.list];
      // this.selectxmobj.isshow = true;

      // this.tableobj2.list.map(item => {
      //   this.selectxmobj.checkList.push(item.ITEM_ID + " - " + item.ITEM_NAME);
      //   var selectobj = {
      //     ITEM_ID: item.ITEM_ID,
      //     ITEM_NAME: item.ITEM_NAME
      //   };
      //   this.selectxmobj.checkList1.push(selectobj);
      // });
      // console.log(this.selectxmobj.checkList1);
      // console.log(this.selectxmobj.checkList);
    },
    getITEM_IDlist() {
      this.$network3
        .get("/mnoracle/item/FindITEMS", {
          pageIndex: 1,
          pageSize: 99999,
          XB: this.currentRow.OP_DATETIME,
          itemFilter: this.itemFilter,
        })
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.ITEM_IDlist = res.data.ITEMlist;
            this.GetCombo();
          } else {
            this.ITEM_IDlist = [];
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    importcombo(str) {
      if (str == "员工") {
        this.isyuangong = true;
      } else {
        this.isyuangong = false;
      }
      this.$refs.inputer.value = "";
      this.excelselectSheetNames = "";
      this.excelSheetNames = [];
      this.excelwbobj = "";
      document.getElementById("upload").click();
    },
    importfxx(e) {
      let _this = this;
      console.log(event);
      var myevent = event;
      setTimeout(() => {
        // _this.$refs.inputer.value = "";
        let inputDOM = _this.$refs.inputer;
        // 通过DOM取文件数据
        console.log(myevent);
        _this.file = myevent.target.files[0];
        console.log(_this.file);
        _this.filename = _this.file.name;
        var rABS = false; //是否将文件读取为二进制字符串
        var f = _this.file;
        var reader = new FileReader();
        //if (!FileReader.prototype.readAsBinaryString) {
        FileReader.prototype.readAsBinaryString = function (f) {
          var binary = "";
          var rABS = false; //是否将文件读取为二进制字符串
          var wb; //读取完成的数据
          var outdata;
          var reader = new FileReader();
          reader.onload = function (e) {
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
            outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]); //outdata就是你想要的东西
            console.log("outdata", outdata);
            console.log("wb.SheetNames", wb.SheetNames);
            console.log("wb.SheetNames", wb);
            console.log("outdata1", wb.Sheets[wb.SheetNames[0]]);
            if (wb.SheetNames.length > 1) {
              _this.excelSheetNames = wb.SheetNames;
              _this.excelwbobj = wb.Sheets;
              _this.excelselectobj.isshow = true;
            } else {
              _this.excelparse(wb.Sheets[wb.SheetNames[0]]);
            }
          };
          reader.readAsArrayBuffer(f);
        };
        if (rABS) {
          reader.readAsArrayBuffer(f);
        } else {
          reader.readAsBinaryString(f);
        }
      }, 100);
    },
    excelparse(val) {
      console.log(val);
      if (!val) {
        this.$message.error("请选择工作表");
        return;
      }
      if (this.isyuangong) {
        console.log("人员");
        if (val.A1.v != "姓名") {
          this.$message.error("请传入正确格式的人员表");
          return;
        }
        var tableobj2temp = [];
        for (const key in val) {
          if (val.hasOwnProperty(key)) {
            const element = val[key];
            console.log(key, element);
            if (String(key).substring(0, 1) == "A" && key != "A1") {
              var codenum = {
                index: String(key).substring(1),
                XM: element.v,
                XB: "",
                SFZHM: "",
                HYZK: "",
                K3_ZG_ITEM: this.currentRow.GROUPNAME,
                K3_ITEM: "",
                CW: this.currentRow.ID,
                locked: false,
              };
              tableobj2temp.push(codenum);
            }
          }
        }
        for (const key in val) {
          if (val.hasOwnProperty(key)) {
            const element = val[key];
            console.log(key, element);
            //身份证
            if (String(key).substring(0, 1) == "C" && key != "C1") {
              for (let i = 0; i < tableobj2temp.length; i++) {
                if (tableobj2temp[i].index == String(key).substring(1)) {
                  tableobj2temp[i].SFZHM = element.v.trim();
                  if (tableobj2temp[i].SFZHM.length == 18) {
                    if (
                      parseInt(
                        tableobj2temp[i].SFZHM.charAt(
                          tableobj2temp[i].SFZHM.length - 2
                        )
                      ) %
                        2 ==
                      1
                    ) {
                      tableobj2temp[i].XB = "2";
                    } else {
                      tableobj2temp[i].XB = "1";
                    }
                  } else {
                    this.$message.error("身份证号信息错误，请查询");
                  }
                  // if (tableobj2temp[i].SFZHM.length == 15) {
                  //   String(tableobj2temp[i].SFZHM).substring(5, 11);
                  // }
                  // if (tableobj2temp[i].SFZHM.length == 18) {
                  // }
                }
              }
            }
            //婚姻状况
            if (String(key).substring(0, 1) == "F" && key != "F1") {
              for (let i = 0; i < tableobj2temp.length; i++) {
                if (tableobj2temp[i].index == String(key).substring(1)) {
                  if (element.v == "已婚") {
                    tableobj2temp[i].HYZK = "01";
                  } else {
                    tableobj2temp[i].HYZK = "02";
                  }
                }
              }
            }
            //部门2
            if (String(key).substring(0, 1) == "E" && key != "E1") {
              for (let i = 0; i < tableobj2temp.length; i++) {
                if (tableobj2temp[i].index == String(key).substring(1)) {
                  tableobj2temp[i].K3_ITEM = element.v + "";
                }
              }
            }
          }
        }
        tableobj2temp.pop();
        console.log(tableobj2temp);
        this.guestList.list = this.tableobj3.list.concat(tableobj2temp);
      } else {
        console.log("套餐");

        if (val.A1.v != "项目代码") {
          this.$message.error("请传入正确格式的套餐表");
          return;
        }
        var tableobj2temp = [];
        for (const key in val) {
          if (val.hasOwnProperty(key)) {
            const element = val[key];
            console.log(key, element);
            if (String(key).substring(0, 1) == "A" && key != "A1") {
              // var codenum = {
              //   index: String(key).substring(1),
              //   ITEM_ID:String(element.v) ,
              //   ITEM_NAME: "",
              //   PRICE: 0
              // };
              tableobj2temp.push(String(element.v));
            }
          }
        }
        this.$network3
          .post("/mnoracle/msj/GetManyItemDetail", {
            items: tableobj2temp,
          })
          .then((res) => {
            console.log(res);
            if (res.code == 200 && res.data.length > 0) {
              this.tableobj2.list = this.tableobj2.list.concat(res.data);
            } else {
              this.$message.error("未找到该项目");
            }
          })
          .catch((err) => {
            console.log(err);
            this.$message.error(err.msg);
          });
        // for (const key in val) {
        //   if (val.hasOwnProperty(key)) {
        //     const element = val[key];
        //     console.log(key, element);
        //     if (String(key).substring(0, 1) == "B" && key != "B1") {
        //       for (let i = 0; i < tableobj2temp.length; i++) {
        //         if (tableobj2temp[i].index == String(key).substring(1)) {
        //           tableobj2temp[i].ITEM_NAME = element.v;
        //         }
        //       }
        //     }
        //   }
        // }
        // for (const key in val) {
        //   if (val.hasOwnProperty(key)) {
        //     const element = val[key];
        //     console.log(key, element);
        //     if (String(key).substring(0, 1) == "G" && key != "G1") {
        //       for (let i = 0; i < tableobj2temp.length; i++) {
        //         if (tableobj2temp[i].index == String(key).substring(1)) {
        //           if (element.v == "免费") {
        //             tableobj2temp[i].PRICE == 0;
        //           } else {
        //             tableobj2temp[i].PRICE =Number(element.v);
        //           }
        //         }
        //       }
        //     }
        //   }
        // }
      }

      this.excelselectobj.isshow = false;
    },
    openGuest() {
      this.isaddGuest = true;
      this.guestList.list = JSON.parse(JSON.stringify(this.tableobj3.list));
    },
    toFixed(value) {
      return value.toFixed(2)
    },
    yuanjiachange(data) {
      var price = 0;
      if (data) {
        data.map((item) => {
          price += Number(item.PRICE);
        });
      } else {
        this.tableobj2.list.map((item) => {
          price += Number(item.PRICE);
        });
      }

      return price;
    },
    chengjiaochange() {
      var price = 0;
      this.tableobj1.list.map((item) => {
        price += Number(item.PRICE);
      });
      return price;
    },
    combonamechange(item) {
      console.log(item);
      for (let i = 0; i < this.tableobj1.list.length; i++) {
        if (this.tableobj1.list[i].ID == item) {
          return this.tableobj1.list[i].GROUPNAME;
        }
      }
    },
    combonamechange1(val) {
      return this.tableobj4.list.filter((item) => {
        return item.ID == val;
      });
    },
    downloadRY() {
      this.dialogGuest = true;
      this.isyuangong = true;
    },
    downloadXM() {
      let a = document.createElement("a");
      // console.log(require("../assets/qrcode.png"));
      a.href =
        "https://medicinelibrary.ihaozhuo.com/mnoracle/static/%E5%A5%97%E9%A4%90(%E6%A8%A1%E6%9D%BF).xlsx"; // href链接指向图片的地址
      a.download =
        "https://medicinelibrary.ihaozhuo.com/mnoracle/static/%E5%A5%97%E9%A4%90(%E6%A8%A1%E6%9D%BF).xlsx"; // 下载的图片的名称
      a.click(); // 触发a标签的单击事件
    },
    gotoOML() {
      //  	console.log(55555)
      this.$confirm("您还未保存确定离开当前页面吗", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          this.$router.push("/OrderManagement/OrderManagelist");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    DeleteCombo(ID) {
      this.$network3
        .get("/mnoracle/msj/DeleteCombo", {
          MsjBILLCODE: this.currentRow.MsjBILLCODE,
          ID: ID,
        })
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.tableobj1.list = [];
            this.tableobj2.list = [];
            this.tableobj3.list = [];
            this.guestList.list = [];
            this.currentRow = "";
            this.GetCombo();
            this.GetDetail();
            this.GetGuestDetail();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    creatInfo() {
      this.$confirm(
        "生成预约信息后当前人员信息将无法修改，是否要生成预约信息",
        "",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true,
        }
      )
        .then(() => {
          var body = {
            MsjBILLCODE: this.currentRow.MsjBILLCODE,
            comboID: this.currentRow.ID,
          };
          this.$network3
            .post("/mnoracle/msj/PreOrderGuestInfoLock", body)
            .then((res) => {
              console.log(res);
              if (res.code == 200) {
                this.$message({
                  type: "success",
                  message: "人员信息生成预约成功！",
                });
                this.GetCombo();
                this.GetDetail();
                this.GetGuestDetail();
              } else {
                this.$message.error(res.msg);
              }
            })
            .catch((err) => {
              console.log(err);
              this.$message.error(err.msg);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    UpdateCombo() {
      this.tableobj1.list.map((item) => {
        item.PRICE = parseFloat(item.PRICE);
        item.OLDPRICE = parseFloat(item.OLDPRICE);
      });
      console.log(this.tableobj1.list);
      this.$network3
        .post("/mnoracle/msj/UpdateComboDetail2", this.tableobj1.list)
        .then((res) => {
          console.log(res);
          // this.addcomboobj.isshow = false;
          // this.GetCombo();
        })
        .catch((err) => {
          console.log(err);
          this.$message.error(err.msg);
        });
    },
    open() {
      console.log(this.tableobj2.list);
      console.log(this.tableobj3.list);
      this.$message({
        type: "success",
        message: "保存成功!",
      });
      this.savecombomsgbtn();
    },
    verfity() {
      if (this.tableobj1.list.length == 0) {
        this.$message({
          type: "warning",
          message: "请新增套餐",
        });
        return false;
      }
      if (this.tableobj2.list.length == 0) {
        this.$message({
          type: "warning",
          message: "请选择体检项目",
        });
        return false;
      }
      // if (this.tableobj3.list.length == 0) {
      //   this.$message({
      //     type: "warning",
      //     message: "请新人员"
      //   });
      //   return false;
      // }
    },
    savecombomsgbtn() {
      //校验
      if (this.tableobj2.list.length <= 0) {
        this.$message.error("请添加套餐明细");
        return;
      }
      // if (this.tableobj3.list.length <= 0) {
      //   this.$message.error("请添加人员明细");
      //   return;
      // }
      var tableobj2keyArray = [];
      var tableobj3keyArray = [];
      for (let i = 0; i < this.tableobj2.list.length; i++) {
        if (!this.tableobj2.list[i].ITEM_ID) {
          this.$message.error("请将套餐明细信息填写完整");
          return;
        } else {
          tableobj2keyArray.push(this.tableobj2.list[i].ITEM_ID);
        }
      }
      for (let i = 0; i < this.tableobj3.list.length; i++) {
        if (
          !this.tableobj3.list[i].XM ||
          !this.tableobj3.list[i].XB ||
          !this.tableobj3.list[i].SFZHM ||
          !this.tableobj3.list[i].K3_ITEM ||
          !this.tableobj3.list[i].HYZK
        ) {
          this.$message.error("请将人员明细信息填写完整");
          return;
        } else {
          tableobj3keyArray.push(this.tableobj3.list[i].SFZHM);
        }
      }
      for (let i = 0; i < this.tableobj2.list.length; i++) {
        let copyindex = tableobj2keyArray.indexOf(
          this.tableobj2.list[i].ITEM_ID
        );
        if (copyindex != i) {
          this.$message.error(
            copyindex + 1 + "行与" + (i + 1) + "行，套餐明细数据重复"
          );
          return;
        }
      }
      for (let i = 0; i < this.tableobj3.list.length; i++) {
        let copyindex = tableobj3keyArray.indexOf(this.tableobj3.list[i].SFZHM);
        if (copyindex != i) {
          this.$message.error(
            copyindex + 1 + "行与" + (i + 1) + "行，人员明细数据重复"
          );
          return;
        }
      }
      // this.tableobj1.loading = true;
      this.tableobj2.loading = true;
      this.tableobj3.loading = true;
      this.guestList.loading = true;
      //07-添加套餐项目
      var body1 = [];
      var body4 = [];
      this.tableobj2.list.map((item) => {
        console.log(item);
        if (item.lpsign) {
          //修改套餐明细
          let obj = {
            MsjBILLCODE: this.currentRow.MsjBILLCODE,
            ID: this.currentRow.ID,
            SXH: item.SXH,
            PRICE: item.PRICE,
            SIGNIFICANCE: item.SIGNIFICANCE,
            ITEM_ID: item.ITEM_ID,
            ITEM_NAME: item.ITEM_NAME,
            costCoefficient: parseFloat(item.costCoefficient),
            SUBITEM: item.SUBITEM,
          };
          body4.push(obj);
        } else {
          let obj = {
            MsjBILLCODE: this.currentRow.MsjBILLCODE,
            ID: this.currentRow.ID,
            ITEM_ID: item.ITEM_ID,
            ITEM_NAME: item.ITEM_NAME,
            PRICE: item.PRICE,
            SIGNIFICANCE: item.SIGNIFICANCE,
            costCoefficient: parseFloat(item.costCoefficient),
            SUBITEM: item.SUBITEM,
          };
          body1.push(obj);
        }
      });
      console.log(body1);
      console.log(body4);
      //修改套餐明细接口调用
      this.$network3
        .post("/mnoracle/msj/UpdateComboDetail", body1)
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.$message.error(res.msg);
            this.tableobj2.loading = false;
            this.tableobj3.loading = false;
            this.guestList.loading = false;
          } else {
            if (body4.length > 0) {
              this.$network3
                .post("/mnoracle/msj/UpdateComboDetail", body4)
                .then((res) => {
                  this.tableobj2.loading = false;
                  //08-添加人员
                  var body2 = [];
                  var body3 = [];
                  this.tableobj3.list.map((item, index) => {
                    if (item.CID) {
                      //修改人员明细 操作
                      let obj = {
                        MsjBILLCODE: this.currentRow.MsjBILLCODE,
                        CID: item.CID,
                        XM: item.XM,
                        XB: item.XB,
                        SFZHM: item.SFZHM,
                        HYZK: item.HYZK,
                        CW: item.CW,
                        K3_ITEM: item.K3_ITEM,
                        K3_ZG_ITEM: item.K3_ZG_ITEM,
                        locked: item.locked,
                      };
                      body3.push(obj);
                    } else {
                      let obj = {
                        MsjBILLCODE: this.currentRow.MsjBILLCODE,
                        XM: item.XM, //姓名
                        XB: item.XB, //性别
                        CSRQ: "1990-12-13 00:00:00",
                        SFZHM: item.SFZHM,
                        HYZK: item.HYZK,
                        MZ: "",
                        GJ: "",
                        DWDM: this.$route.query.DWDM, //单位代码
                        DJSJ: "2020-01-03 00:00:00", //到检时间
                        CITY: "8S",
                        CW: item.CW,
                        ZHYE: "0",
                        TRANS_STATUS: "0",
                        YWYDM: "1172",
                        YXJB: "0",
                        CUST_REGION: "1",
                        K3_ITEM: item.K3_ITEM,
                        K3_ZG_ITEM: item.K3_ZG_ITEM,
                        BGD_LB: "0",
                        GRGZ_YE: "0",
                        XGSJ: "2020-01-01 00:00:00",
                        USER_PASSWORD: "394702",
                        PASSWORD_XGSJ: "2020-01-01 00:00:00",
                        ZZHS: "8S",
                      };
                      body2.push(obj);
                    }
                  });
                  this.$network3
                    .post("/mnoracle/msj/UpdateGuestDetail", body2)
                    .then((res) => {
                      console.log(res);
                      if (res.code == 200) {
                        // this.tableobj2.loading=false;
                        if (body3.length > 0) {
                          this.$network3
                            .post("/mnoracle/msj/UpdateGuestDetail", body3)
                            .then((res) => {
                              console.log(res);
                              this.tableobj3.loading = false;
                              this.guestList.loading = false;
                              this.$message({
                                type: "success",
                                message: "保存成功!",
                              });
                            }); //修改人员明细 操作 doing...
                        } else {
                          this.tableobj3.loading = false;
                          this.guestList.loading = false;
                        }
                      } else {
                        this.tableobj3.loading = false;
                        this.guestList.loading = false;
                        this.$message.error(res.msg);
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                      this.$message.error(err.msg);
                    });
                });
            } else {
              this.tableobj2.loading = false;
              //08-添加人员
              var body2 = [];
              var body3 = [];
              this.tableobj3.list.map((item, index) => {
                if (item.CID) {
                  //修改人员明细 操作
                  let obj = {
                    CID: item.CID,
                    XM: item.XM,
                    XB: item.XB,
                    SFZHM: item.SFZHM,
                    HYZK: item.HYZK,
                    CW: item.CW,
                    K3_ITEM: item.K3_ITEM,
                    K3_ZG_ITEM: item.K3_ZG_ITEM,
                    locked: item.locked,
                  };
                  body3.push(obj);
                } else {
                  let obj = {
                    MsjBILLCODE: this.currentRow.MsjBILLCODE,
                    XM: item.XM, //姓名
                    XB: item.XB, //性别
                    CSRQ: "1990-12-13 00:00:00",
                    SFZHM: item.SFZHM,
                    HYZK: item.HYZK,
                    MZ: "",
                    GJ: "",
                    DWDM: this.$route.query.DWDM, //单位代码
                    DJSJ: "2020-01-03 00:00:00", //到检时间
                    CITY: "8S",
                    CW: item.CW,
                    ZHYE: "0",
                    TRANS_STATUS: "0",
                    YWYDM: "1172",
                    YXJB: "0",
                    CUST_REGION: "1",
                    K3_ITEM: item.K3_ITEM,
                    K3_ZG_ITEM: item.K3_ZG_ITEM,
                    BGD_LB: "0",
                    GRGZ_YE: "0",
                    XGSJ: "2020-01-01 00:00:00",
                    USER_PASSWORD: "394702",
                    PASSWORD_XGSJ: "2020-01-01 00:00:00",
                    ZZHS: "8S",
                  };
                  body2.push(obj);
                }
              });
              this.$network3
                .post("/mnoracle/msj/UpdateGuestDetail", body2)
                .then((res) => {
                  console.log(res);
                  if (res.code == 200) {
                    // this.tableobj2.loading=false;
                    if (body3.length > 0) {
                      this.$network3
                        .post("/mnoracle/msj/UpdateGuestDetail", body3)
                        .then((res) => {
                          console.log(res);
                          this.tableobj3.loading = false;
                          this.guestList.loading = false;
                        }); //修改人员明细 操作 doing...
                    } else {
                      this.tableobj3.loading = false;
                      this.guestList.loading = false;
                    }
                  } else {
                  }
                })
                .catch((err) => {
                  console.log(err);
                  this.$message.error(err.msg);
                });
            }
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message.error(err.msg);
        });
    },
    saveComboDetil(data) {
      //07-添加套餐项目
      var body1 = [];
      var body4 = [];
      data.map((item) => {
        console.log(item);
        //修改套餐明细
        let obj = {};
        if (item.DRCC) {
          obj = {
            MsjBILLCODE: this.currentRow.MsjBILLCODE,
            ID: this.currentRow.ID,
            ITEM_ID: item.ITEM_ID,
            ITEM_NAME: item.ITEM_NAME,
            PRICE: item.PRICE,
            SIGNIFICANCE: item.SIGNIFICANCE,
            costCoefficient: parseFloat(item.DRCC),
            SUBITEM: item.SUBITEM,
          };
        } else {
          obj = {
            MsjBILLCODE: this.currentRow.MsjBILLCODE,
            ID: this.currentRow.ID,
            ITEM_ID: item.ITEM_ID,
            ITEM_NAME: item.ITEM_NAME,
            PRICE: item.PRICE,
            SIGNIFICANCE: item.SIGNIFICANCE,
            costCoefficient: parseFloat(item.costCoefficient),
            SUBITEM: item.SUBITEM,
          };
        }
        body1.push(obj);
      });
      console.log(body1);
      //修改套餐明细接口调用
      this.$network3
        .post("/mnoracle/msj/UpdateComboDetail", body1)
        .then((res) => {
          if (res.code == 200) {
            console.log(res);
            this.deleteClist = [];
            this.GetCombo();
          } else {
            this.$message.error(res.msg);
            this.deleteClist = [];
            this.GetCombo();
          }
        })
        .catch((err) => {
          console.log(err);
          this.$message.error(err.msg);
        });
    },
    GetComboItemDetail(row, index) {
      console.log(row, index);
      // if (!row.ITEM_ID) {
      //   return;
      // }
      this.$network3
        .get("/mnoracle/GetComboItemDetail", {
          ITEM_ID: row.ITEM_ID,
        })
        .then((res) => {
          console.log(res);
          if (res.code == 200 && res.data.length > 0) {
            this.tableobj2.list[index].ITEM_NAME = res.data[0].ITEM_NAME;
            this.tableobj2.list[index].PRICE = res.data[0].PRICE;
          } else {
            this.$message.error("未找到该项目，请重新填写");
            this.tableobj2.list[index].ITEM_ID = "";
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    GetComboItemDetail1(row, index) {
      console.log(row, index);
      this.ITEM_IDlist.map((item) => {
        if (item.ITEM_ID == row.ITEM_ID) {
          this.tableobj2.list[index].ITEM_NAME = item.ITEM_NAME;
          this.tableobj2.list[index].PRICE = item.PRICE;
        }
      });
      // if (!row.ITEM_ID) {
      //   return;
      //
    },
    delGuestdetail(row, index) {
      this.tableobj3.loading = true;
      this.guestList.loading = true;
      if (row.XM == "") {
        console.log(11);
        this.guestList.list.splice(index, 1);
        this.tableobj3.loading = false;
        this.guestList.loading = false;
      } else {
        this.guestList.list.splice(index, 1);
        console.log(row);
        if (this.guestList.list.length != 0) {
          this.$network3
            .post("/mnoracle/msj/DeleteGuest", this.guestList.list)
            .then((res) => {
              console.log(res);
              this.tableobj3.loading = false;
              this.guestList.loading = false;
              if (res.code == 200) {
                this.GetGuestDetail();
              } else {
                this.$message.error(res.msg);
              }
            })
            .catch((err) => {
              this.$message.error(err.msg);
            });
        } else {
          this.$network3
            .post("/mnoracle/msj/DeleteGuest", [
              {
                MsjBILLCODE: row.MsjBILLCODE,
                CW: row.CW,
              },
            ])
            .then((res) => {
              console.log(res);
              this.tableobj3.loading = false;
              this.guestList.loading = false;
              if (res.code == 200) {
                this.GetGuestDetail();
              } else {
                this.$message.error(res.msg);
              }
            })
            .catch((err) => {
              this.$message.error(err.msg);
              console.log(err);
            });
        }
      }

      console.log(index);
    },
    delGuestList() {
      this.tableobj3.loading = true;
      this.guestList.loading = true;
      if (this.guestList.list.length != this.deleteGlist.length) {
        this.deleteGlist.forEach((item) => {
          this.guestList.list.splice(
            this.guestList.list.findIndex((v) => v.MsjCID == item.MsjCID),
            1
          );
        });

        this.$network3
          .post("/mnoracle/msj/DeleteGuest", this.guestList.list)
          .then((res) => {
            console.log(res);
            this.tableobj3.loading = false;
            this.guestList.loading = false;
            if (res.code == 200) {
              this.GetGuestDetail();
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch((err) => {
            console.log(err);
            this.$message.error(err.msg);
          });
      } else {
        console.log(222);
        this.$network3
          .post("/mnoracle/msj/DeleteGuest", [
            {
              MsjBILLCODE: this.deleteGlist[0].MsjBILLCODE,
              CW: this.deleteGlist[0].CW,
            },
          ])
          .then((res) => {
            console.log(res);
            this.tableobj3.loading = false;
            this.guestList.loading = false;
            if (res.code == 200) {
              this.GetGuestDetail();
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch((err) => {
            this.$message.error(err.msg);
            console.log(err);
          });
      }
    },
    DeleteGlsitEven() {
      if (this.deleteGlist.length != 0) {
        this.delGuestList();
      } else {
        this.$message.error("请选择删除的人员");
      }
    },
    deleteClistEven() {
      if (this.deleteClist.length != 0) {
        // for (let i = 0; i < this.deleteClist.length; i++) {
        //   if (!this.this.deleteClist[i].tag) {
        //   }
        // }
        this.tableobj2.list = this.tableobj2.list.filter(
          (item) =>
            !this.deleteClist.some((ele) => ele.ITEM_ID === item.ITEM_ID)
        );
        this.saveComboDetil(this.tableobj2.list);
      } else {
        this.$message.error("请选择删除的套餐");
      }
    },
    delcombodetail(row, index) {
      console.log(row);
      this.tableobj2.loading = true;
      this.tableobj2.list.splice(index, 1);

      if (this.tableobj2.list.length != 0) {
        this.saveComboDetil(this.tableobj2.list);
      } else {
        this.$network3
          .post("/mnoracle/msj/DeleteComboDetail", [
            {
              MsjBILLCODE: row.MsjBILLCODE,
              ID: row.ID,
            },
          ])
          .then((res) => {
            console.log(res);
            this.tableobj2.loading = false;
            if (res.code == 200) {
              this.GetCombo();
            }
          });
      }
    },
    addcombodetail() {
      this.tableobj2.list.push({
        ITEM_ID: "",
        ITEM_NAME: "",
        STATUS: "",
      });
    },
    addGuestdetail() {
      this.guestList.list.push({
        XM: "",
        XB: "",
        SFZHM: "",
        HYZK: "",
        K3_ZG_ITEM: this.currentRow.GROUPNAME,
        K3_ITEM: "",
        CW: this.currentRow.ID,
        locked: false,
      });
    },
    handleCurrentChange(val) {
      this.currentRow = val;
      console.log(this.currentRow);
      this.tableobj2.loading = true;
      this.tableobj3.loading = true;
      this.guestList.loading = true;
      this.GetDetail();
      // this.GetGuestDetail();
    },
    addcombo() {
      if (this.tableobj1.list == 0) {
        this.addcomboobj.isshow = true;
        this.addcomboobj.GROUPNAME = "";
        this.addcomboobj.OP_DATETIME = "0";
        this.addcomboobj.TRANS_STATUS = "N";
        this.addcomboobj.PRICE = "";
        this.addcomboobj.OLDPRICE = "";
      } else {
        if (this.tableobj2.list.length > 0) {
          this.addcomboobj.isshow = true;
          this.addcomboobj.GROUPNAME = "";
          this.addcomboobj.OP_DATETIME = "0";
          this.addcomboobj.TRANS_STATUS = "N";
          this.addcomboobj.PRICE = "";
          this.addcomboobj.OLDPRICE = "";
        } else {
          this.$message.error("请将信息填写完整");
        }
      }
    },
    addcombobtn() {
      if (this.addcomboobj.GROUPNAME == "" || this.addcomboobj.PRICE == "") {
        this.$message.error("请将信息填写完整");
        return;
      }
      this.$network3
        .post("/mnoracle/msj/AddCombo", {
          MsjBILLCODE: this.addcomboobj.MsjBILLCODE,
          GROUPNAME: this.addcomboobj.GROUPNAME,
          PRICE: Number(this.addcomboobj.PRICE),
          OLDPRICE: Number(this.addcomboobj.OLDPRICE),
          OP_DATETIME: this.addcomboobj.OP_DATETIME,
          TRANS_STATUS: this.addcomboobj.TRANS_STATUS,
        })
        .then((res) => {
          console.log(res);
          this.addcomboobj.isshow = false;
          if (Number(this.addcomboobj.PRICE) >= 100) {
            this.$message({
              message: "该套餐结算价大于等于100元，已为您添加免费早餐项目",
              type: "success",
            });
          }

          this.GetCombo();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    saveGuestbtn() {
      //08-添加人员
      var tableobj2keyArray = [];
      var tableobj3keyArray = [];
      var body2 = [];
      var body3 = [];
      var idcardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      this.guestList.list.map((item, index) => {
        let obj = {
          MsjBILLCODE: this.currentRow.MsjBILLCODE,
          XM: item.XM, //姓名
          XB: item.XB, //性别
          CSRQ: "1990-12-13 00:00:00",
          SFZHM: item.SFZHM,
          HYZK: item.HYZK,
          MZ: "",
          GJ: "",
          DWDM: this.$route.query.DWDM, //单位代码
          DJSJ: "2020-01-03 00:00:00", //到检时间
          CITY: "8S",
          CW: item.CW,
          ZHYE: "0",
          TRANS_STATUS: "0",
          YWYDM: "1172",
          YXJB: "0",
          CUST_REGION: "1",
          K3_ITEM: item.K3_ITEM,
          K3_ZG_ITEM: item.K3_ZG_ITEM,
          BGD_LB: "0",
          GRGZ_YE: "0",
          XGSJ: "2020-01-01 00:00:00",
          USER_PASSWORD: "394702",
          PASSWORD_XGSJ: "2020-01-01 00:00:00",
          ZZHS: "8S",
          locked: item.locked,
        };
        body2.push(obj);
      });
      for (let i = 0; i < this.guestList.list.length; i++) {
        if (
          !this.guestList.list[i].XM ||
          !this.guestList.list[i].XB ||
          !this.guestList.list[i].SFZHM ||
          !this.guestList.list[i].K3_ITEM ||
          !this.guestList.list[i].HYZK
        ) {
          this.$message.error("身份信息请填写完整");
          return;
        } else {
          if (idcardReg.test(this.guestList.list[i].SFZHM)) {
            tableobj3keyArray.push(this.guestList.list[i].SFZHM);
          } else {
            this.$message.error("身份证格式错误");
            return;
          }
        }
      }
      for (let i = 0; i < this.guestList.list.length; i++) {
        let copyindex = tableobj3keyArray.indexOf(this.guestList.list[i].SFZHM);
        if (copyindex != i) {
          this.$message.error(
            copyindex + 1 + "行与" + (i + 1) + "行，人员明细数据重复"
          );
          return;
        }
        if (
          this.guestList.list[i].SFZHM.charAt(
            this.guestList.list[i].SFZHM.length - 2
          ) %
            2 ==
          parseInt(this.guestList.list[i].XB) % 2
        ) {
          console.log(
            parseInt(this.guestList.list[i].XB) % 2,
            this.guestList.list[i].SFZHM.charAt(
              this.guestList.list[i].SFZHM.length - 2
            ) % 2
          );
          this.$message.error("第" + (i + 1) + "行性别不符，生成预约失败");
          return;
        }
      }
      console.log(body2);
      console.log(body3);
      this.$network3
        .post("/mnoracle/msj/UpdateGuestDetail", body2)
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            // this.tableobj2.loading=false;
            if (body3.length > 0) {
              this.$network3
                .post("/mnoracle/msj/UpdateGuestDetail", body3)
                .then((res) => {
                  console.log(res);
                  this.tableobj3.loading = false;
                  this.guestList.loading = false;
                  this.tableobj3.list = JSON.parse(
                    JSON.stringify(this.guestList.list)
                  );
                  this.GetGuestDetail();
                  this.isaddGuest = false;
                }); //修改人员明细 操作 doing...
            } else {
              this.tableobj3.loading = false;
              this.guestList.loading = false;
              this.tableobj3.list = JSON.parse(
                JSON.stringify(this.guestList.list)
              );
              this.GetGuestDetail();
              this.isaddGuest = false;
            }
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 03-获取订单套餐信息
    GetCombo() {
      this.tableobj1.loading = true;
      this.$network3
        .get("/mnoracle/msj/GetCombo", {
          MsjBILLCODE: this.addcomboobj.MsjBILLCODE,
        })
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.tableobj1.list = res.data;
            this.tableobj1.loading = false;
            if (this.tableobj1.list.length > 0) {
              if (this.currentRow && this.currentRow != "") {
                this.tableobj1.list.map((item, index) => {
                  if (item.ID == this.currentRow.ID) {
                    this.$refs.singleTable.setCurrentRow(
                      this.tableobj1.list[index]
                    );
                  }
                });
              } else {
                this.$refs.singleTable.setCurrentRow(this.tableobj1.list[0]);
              }
            } else {
              this.currentRow = "";
            }
          }
        });
    },
    // 04-获取套餐明细详情
    GetDetail() {
      this.tableobj2.loading = true;
      console.log(this.currentRow);
      if (!this.currentRow || !this.currentRow.MsjBILLCODE) {
        this.tableobj2.loading = false;
        this.GetGuestDetail();
        return;
      }
      this.$network3
        .get("/mnoracle/msj/GetDetail", {
          MsjBILLCODE: this.currentRow.MsjBILLCODE,
          ID: this.currentRow.ID,
          READ_ORNOT: this.READ_ORNOT,
        })
        .then((res) => {
          console.log(res);
          this.tableobj2.loading = false;
          if (res.code == 200) {
            res.data.map((item) => {
              item.lpsign = true;
              return item;
            });
            this.tableobj2.list = res.data;
            this.GetGuestDetail();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //20-获取人员信息详情
    GetGuestDetail() {
      this.tableobj3.loading = true;
      this.guestList.loading = true;
      console.log(this.currentRow);
      if (this.currentRow != null) {
        this.$network3
          .get("/mnoracle/msj/GetGuestDetail", {
            DWDM: this.$route.query.DWDM,
            CW: this.currentRow.ID,
            MsjBILLCODE: this.currentRow.MsjBILLCODE,
          })
          .then((res) => {
            console.log(res);
            this.tableobj3.loading = false;
            this.guestList.loading = false;
            if (res.code == 200) {
              this.tableobj3.list = res.data || [];
              this.guestList.list = res.data || [];
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.tableobj3.loading = false;
        this.guestList.loading = false;
      }
    },
    // exportpdf() {
    //   this.isshowpdf = true;
    //   this.$network3
    //     .get("/mnoracle/msj/GetDetail", {
    //       MsjBILLCODE: this.$route.query.MsjBILLCODE
    //     })
    //     .then(res => {
    //       console.log(res);
    //       if (res.code == 200) {
    //         this.tableobj4.list = res.data;
    //         this.tableobj4.list.map(item => {
    //           if (this.tableobj6.list.indexOf(item.ID) == -1) {
    //             this.tableobj6.list.push(item.ID);
    //           }
    //         });
    //         console.log(this.tableobj6.list);

    //         this.$network3
    //           .get("/mnoracle/msj/GetGuestDetail", {
    //             DWDM: this.$route.query.DWDM
    //           })
    //           .then(res => {
    //             console.log(res);
    //             if (res.code == 200) {
    //               this.tableobj5.list = res.data;

    //               var than = this;
    //               setTimeout(() => {
    //                 html2Canvas(document.querySelector("#approvaContent_pdf"), {
    //                   allowTaint: true,
    //                   dpi: 400
    //                 }).then(function(canvas) {
    //                   let contentWidth = canvas.width;
    //                   let contentHeight = canvas.height;
    //                   console.log(contentWidth);
    //                   console.log(contentHeight);
    //                   // 592.28  841.89
    //                   //一页pdf显示html页面生成的canvas高度;
    //                   var pageHeight = (contentWidth / 592.28) * 841.89;
    //                   //未生成pdf的html页面高度
    //                   var leftHeight = contentHeight;
    //                   //页面偏移
    //                   var position = 20;
    //                   //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
    //                   var imgWidth = 595.28;
    //                   var imgHeight = (592.28 / contentWidth) * contentHeight;
    //                   var pageData = canvas.toDataURL("image/jpeg", 1.0);
    //                   var pdf = new JsPDF("", "pt", "a4");
    //                   //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
    //                   //当内容未超过pdf一页显示的范围，无需分页
    //                   if (leftHeight < pageHeight) {
    //                     pdf.addImage(
    //                       pageData,
    //                       "JPEG",
    //                       0,
    //                       0,
    //                       imgWidth,
    //                       imgHeight
    //                     );
    //                   } else {
    //                     while (leftHeight > 0) {
    //                       pdf.addImage(
    //                         pageData,
    //                         "JPEG",
    //                         0,
    //                         position,
    //                         imgWidth,
    //                         imgHeight
    //                       );
    //                       leftHeight -= pageHeight;
    //                       position -= 841.89;
    //                       //避免添加空白页
    //                       if (leftHeight > 0) {
    //                         pdf.addPage();
    //                       }
    //                     }
    //                   }
    //                   than.isshowpdf = false;
    //                   pdf.save(title + ".pdf");
    //                 });
    //               }, 100);
    //             }
    //           });
    //         var title = "套餐明细清单";
    //       }
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });

    //   // return;
    // },
    //批量导入项目数据
    importEmployee() {
      //    this.UploadForm.company = "";
      //    if (this.$store.getters.getRoleInfo.AccountType == "3") {
      //      this.UploadForm.company = this.$store.getters.getRoleInfo.AccountName;
      //    }
      this.dialogImportEmployee = true;
    },
    closeimport() {
      this.$refs.inputer.value = "";
      this.filename = "";
      this.goodXlsx = [];
      this.badXlsx = [];
      this.errorFile = false;
      this.rightWord = false;
      this.dialogImportEmployee = false;
    },
    returnAllUsers() {
      this.$refs.inputer.value = "";
      this.filename = "";
      this.goodXlsx = [];
      this.badXlsx = [];
      this.errorFile = false;
      this.rightWord = false;
      document.getElementById("upload").click();
    },
    // 下载模板
    DownloadTemplate() {
      window.open("https://whiot.ihaozhuo.com/mnoracle/static/xmmb.xlsx");
      // console.log(
      //   this.$parent.$parent.$parent.weburl +
      //     "/film/web/downloadXlsx?xlsxName=EmployeeTemplate.xlsx"
      // );
      // window.open(
      //   this.$parent.$parent.$parent.weburl +
      //     "/film/web/downloadXlsx?xlsxName=EmployeeTemplate.xlsx"
      // );

      //				var body = {
      //
      //
      //						}
      //						this.$api
      //							.get('/xinguan/DownLoad', body)
      //							.then(res => {
      //								console.log(res)
      //								if(res.code == 200) {
      //
      //
      //								}
      //							})
      //							.catch(err => {
      //								console.log(err)
      //							})

      // var xhr = new XMLHttpRequest();
      // var str = "";

      // xhr.open(
      //   "GET",
      //   this.$parent.$parent.$parent.weburl + "/manage/DownLoadFile?id=5",
      //   true
      // ); //也可以使用POST方式，根据接口
      // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      // xhr.responseType = "blob"; //返回类型blob
      // xhr.onload = function() {
      //   console.log(11111111111);
      //   //定义请求完成的处理函数
      //   if (this.status === 200) {
      //     console.log(2222222222222);
      //     var blob = this.response;
      //     if (blob.size > 0) {
      //       var reader = new FileReader();
      //       reader.readAsDataURL(blob); // 转换为base64，可以直接放入a标签href
      //       reader.onload = function(e) {
      //         // 转换完成，创建一个a标签用于下载
      //         var a = document.createElement("a");
      //         var newDate = new Date();
      //         a.download = "上传导入预约信息模板" + ".xlsx";
      //         a.href = e.target.result;
      //         document.body.appendChild(a);
      //         // $("body").append(a); // 修复firefox中无法触发click
      //         a.click();
      //         // $(a).remove();
      //         a.remove();
      //         // window.location.reload();
      //       };
      //     } else {
      //       // window.location.reload();
      //     }
      //   }
      // };
      // xhr.send();
    },
    DownloadTemplate2() {
      window.open("https://whiot.ihaozhuo.com/mnoracle/static/客人(模板).xlsx");
    },
    // 校验导入请求
    verifyImport() {
      var that = this;
      //				if(this.UploadForm.company == "") {
      //					this.$message.error("请选择企业名称");
      //					return;
      //				}
      console.log(this.goodXlsx);
      if (this.filename == "") {
        this.$message.error("请上传文件");
        return;
      }
      if (this.isyuangong) {
        this.saveGuestbtn();
        this.filename = "";
        this.dialogGuest = false;
      } else {
        this.saveComboDetil(this.tableobj2.list);
        this.dialogImportEmployee = false;
        this.filename = "";
      }

      // // console.log(this.goodXlsx);
      // var goodXlsxTemp = [];
      // //				this.goodXlsx.forEach(e => {
      // //
      // //								var de = {
      // //									localCenterCode: e.localCenterCode.toString(),
      // //									date: e.date.toString(),
      // //									numberMorning: Number(e.numberMorning),
      // //									numberAfternoon: Number(e.numberAfternoon),
      // //
      // //
      // //								}
      // //							 goodXlsxTemp.push(de)
      // //							})

      // var temp = JSON.parse(JSON.stringify(this.goodXlsx));
      // // for (let i = 0; i < temp.length; i++) {
      // //   const element = temp[i];
      // //   element.phone = JSON.stringify(element.phone);
      // // }
      // console.log(temp);
      // var body = {
      //   msjId: this.paiqiID,
      //   storeId: this.storeId,
      //   formInfos: temp
      // };
      // this.updataobj.isshow = true;
      // this.updataobj.loadingtext = "数据校验中，请耐心等待...";
      // this.$api
      //   .post("/MSJschedule/verifySchedule", body)
      //   .then(res => {
      //     that.updataobj.isshow = false;
      //     console.log(res);

      //     console.log("res", res);
      //     console.log(res.data);
      //     that.badXlsx = res.data.errFormInfo || [];
      //     that.updataobj.errdata = res.data.errFormInfo || [];
      //     if (that.updataobj.errdata.length > 0) {
      //       that.updataobj.errshow = true;
      //       that.errorFile = true;
      //     } else {
      //       //							that.$message.error(res.msg)
      //     }
      //     that.updataobj.isshow = false;
      //     that.ygplczobj.drobj.active += 1;
      //     console.log(res);
      //     console.log(that.ygplczobj);
      //     console.log(that.updataobj.errdata);
      //   })
      //   .catch(err => {
      //     //						this.updataobj.isshow = false
      //     console.log("err", err);
      //     console.log(err.data);

      //     this.updataobj.errdata = err.data || [];
      //     if (this.updataobj.errdata.length > 0) {
      //       this.updataobj.errshow = true;
      //     } else {
      //       this.$message.error(err.msg);
      //     }

      //     // var str = "";
      //     // for (let i = 0; i < err.data.length; i++) {
      //     //   const element = err.data[i];
      //     //   str =
      //     //     str +
      //     //     element.Num +
      //     //     " " +
      //     //     element.identityRemarks +
      //     //     " " +
      //     //     element.phoneRemarks +
      //     //     " " +
      //     //     "<br/>";
      //     // }

      //     // this.$msgbox({
      //     //   title: "上传失败员工数据",
      //     //   dangerouslyUseHTMLString: true,
      //     //   message: str,
      //     //   type: "error"
      //     // });
      //     // this.$message({
      //     //   dangerouslyUseHTMLString: true,
      //     //   message: str,
      //     //   type: "error"
      //     // });
      //   });
    },
    //批量导入员工数据
    importProject() {
      //    this.UploadForm.company = "";
      //    if (this.$store.getters.getRoleInfo.AccountType == "3") {
      //      this.UploadForm.company = this.$store.getters.getRoleInfo.AccountName;
      //    }
      this.dialogImportEmployee = true;
      this.isyuangong = false;
    },
    okBtn() {
      this.dialogImportEmployee = false;
      this.closeimport();
      this.ygplczobj.drobj.active = 0;
      this.getmessage();
      console.log(this.ygplczobj.drobj.active);
    },
  },
  watch: {},
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
      height: 450px;
      padding: 10px;
      width: 95%;
      margin-top: 5px;
      border: 1px solid #cccccc;
      overflow: auto;
      .sxmmainclassdiv {
        min-width: 100%;
        margin: 5px 0 0 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        position: relative;
        i {
          position: absolute;
          font-size: 20px;
          right: 5px;
          cursor: pointer;
        }
      }
      .sxmmainclassinput {
        position: absolute;
        width: 90%;
        height: 50px;
        top: 0px;
        left: 1px;
        z-index: 1000;
        background-color: #fff;
        display: flex;
        align-items: center;
      }
    }
  }
}

.login-form-input .el-input__inner {
  border: 0 none;
}
.pdfhead {
  text-align: center;
  font-size: 30px;
}
.pdfbody {
  text-align: center;
  font-size: 30px;
}
.pdffoot {
  text-align: center;
  font-size: 30px;
}
.pdfclass {
  position: absolute;
  width: 100%;
  top: -10000px;
}
</style>