<template>
  <div class="app-container">
    <!-- 员工 -->
    <!-- 查询表单 -->
    <div>
      <div class="inquire">
        <el-row>
          <el-col :span="6">
            <div class="grid_lable">所属分公司：</div>
            <div class="grid_content">
              <el-select v-model="Inquire.fromCompany" :disabled="fromCompanyData.length == 0" filterable placeholder="请选择所属分公司" size="medium" style="width:100%;">
                <el-option v-for="(item,inex) in fromCompanyData" :key="item.index" :label="item.index" :value="item"></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid_lable">所属销售：</div>
            <div class="grid_content">
              <el-select v-model="Inquire.fromSale" :disabled="fromSaleData.length == 0" filterable placeholder="请选择所属销售" size="medium" style="width:100%;">
                <el-option v-for="(item,inex) in fromSaleData" :key="item.index" :label="item.index" :value="item"></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid_lable">所属企业：</div>
            <div class="grid_content">
              <el-select v-model="Inquire.company" @change="getBranch" :disabled="companyData.length == 0" filterable placeholder="请选择所属企业" size="medium" style="width:100%;">
                <el-option v-for="(item,inex) in companyData" :key="item.index" :label="item.index" :value="item"></el-option>
              </el-select>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid_lable">部门：</div>
            <div class="grid_content">
              <el-select v-model="Inquire.branch" v-loading="branchDataloading" :disabled="Inquire.company=='全部'" placeholder="请先选择企业" size="medium" style="width:100%;">
                <el-option v-for="(item,index) in branchData" :key="item.index" :label="item.index" :value="item"></el-option>
              </el-select>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="inquire">
        <el-row>

          <el-col :span="6">
            <div class="grid_lable">后台标记字段：</div>
            <div class="grid_content">
              <el-select v-model="Inquire.sign" v-loading="singload" :disabled="Inquire.company=='全部'" placeholder="请先选择企业" size="medium" style="width:100%;">
                <el-option v-for="(item,index) in singlist" :key="item.index" :label="item.index" :value="item"></el-option>
              </el-select>
            </div>
          </el-col>

          <el-col :span="6">
            <div class="grid_lable">员工姓名：</div>
            <div class="grid_content">
              <el-input placeholder="请输入内容" v-model="Inquire.name" size="medium" style="width:100%;" clearable></el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid_lable">手机号：</div>
            <div class="grid_content">
              <el-input placeholder="请输入内容" v-model="Inquire.phone" size="medium" style="width:100%;" clearable></el-input>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid_lable">证件号：</div>
            <div class="grid_content">
              <el-input placeholder="请输入证件号" v-model="Inquire.cardNum" size="medium" style="width:100%;" clearable></el-input>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="inquire">
        <el-row>
          <el-col :span="6">
            <div class="grid_lable">审核状态：</div>
            <div class="grid_content">
              <el-select v-model="Inquire.auditStatus" placeholder="请选择" size="medium" style="width:100%;">
                <el-option v-for="(item,index) in auditStatusData" :key="item.index" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </div>
          </el-col>

          <el-col :span="6">
            <div class="grid_lable">时间范围：</div>
            <div class="grid_content">
              <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="timeframe" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </div>
          </el-col>

        </el-row>
      </div>
    </div>
    <!-- 按钮 -->
    <div>
      <div class="inquire">
        <el-button class="grid_button" type="primary" size="medium" :disabled="!Clickable.package" @click="configurationpackage('')" v-if="RoleInfo.AccountType == 0|| RoleInfo.AccountType == 2||RoleInfo.AccountType == 3">套餐配置</el-button>
        <el-button class="grid_button" type="primary" size="medium" :disabled="!Clickable.import" @click="goEmployeeimport()" v-if="RoleInfo.AccountType == 0||RoleInfo.AccountType == 2||RoleInfo.AccountType == 3">导入记录</el-button>
        <!-- <el-button class="grid_button" type="primary" size="medium" :disabled="!Clickable.import" @click="importEmployee()" v-if="RoleInfo.AccountType == 2||RoleInfo.AccountType == 3">批量导入</el-button> -->
        <el-button class="grid_button" type="primary" size="medium" :disabled="!Clickable.inquire" @click="ygplczbtn" v-if="RoleInfo.AccountType == 0||RoleInfo.AccountType == 2||RoleInfo.AccountType == 3">员工批量操作</el-button>
        <el-button class="grid_button" type="primary" size="medium" :disabled="!Clickable.inquire" @click="goSaleswelfarevoucher()" v-if="RoleInfo.AccountType == 0||RoleInfo.AccountType == 2||RoleInfo.AccountType == 3">福利劵批量配置</el-button>
        <el-button class="grid_button" type="primary" size="medium" :disabled="!Clickable.inquire" @click="findEmployees('搜索')" icon="el-icon-search">搜索</el-button>
      </div>
      <div class="inquire">
        <el-button @click="goCreateEmployee()" v-if="RoleInfo.AccountType == 0||RoleInfo.AccountType == 2||RoleInfo.AccountType == 3" type="primary" size="medium" icon="el-icon-plus" :disabled="!Clickable.add">新增员工</el-button>
        <el-button @click="EmployeeExport()" v-if="RoleInfo.AccountType == 0||RoleInfo.AccountType == 2||RoleInfo.AccountType == 3" type="primary" size="medium" :disabled="!Clickable.inquire">员工导出</el-button>
        <el-button type="primary" size="medium" :disabled="!Clickable.delete" @click="DeleteStaff('')" v-if="RoleInfo.AccountType == 0||RoleInfo.AccountType == 2||RoleInfo.AccountType == 3">批量删除</el-button>
        <el-button type="primary" size="medium" :disabled="!Clickable.review" @click="ReviewStaff('批量')" v-if="RoleInfo.AccountType == 0||RoleInfo.AccountType == 2||RoleInfo.AccountType == 3">批量审核</el-button>
      </div>
    </div>
    <!-- 信息列表 -->
    <div>
      <el-table :row-key="getRowKeys" v-loading="tableDataloading" ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column :reserve-selection="true" type="selection" width="55" v-if="RoleInfo.AccountType == 0||RoleInfo.AccountType == 2||RoleInfo.AccountType == 3"></el-table-column>
        <el-table-column prop="name" label="员工姓名"></el-table-column>

        <el-table-column prop="Sign" show-overflow-tooltip label="后台标记字段"></el-table-column>

        <el-table-column prop="registerTime" show-overflow-tooltip label="创建时间"></el-table-column>
        <el-table-column prop="placeCompanyFromSale" label="所属销售" show-overflow-tooltip></el-table-column>
        <el-table-column prop="placeCompanyName" label="所属企业" show-overflow-tooltip></el-table-column>
        <el-table-column prop="branch" label="部门" show-overflow-tooltip></el-table-column>
        <el-table-column prop="phone" label="手机号" show-overflow-tooltip></el-table-column>
        <el-table-column label="审核状态" fixed="right">
          <template slot-scope="scope">
            <div v-if="RoleInfo.AccountType == 0||RoleInfo.AccountType == 2||RoleInfo.AccountType == 3">
              <el-button :disabled="!Clickable.review" @click="ReviewStaff(scope.row)" v-if="scope.row.auditStatus == 1" type="text" size="small">待审核</el-button>
            </div>
            <div v-else>
              <span v-if="scope.row.auditStatus == 1">待审核</span>
            </div>
            <span v-if="scope.row.auditStatus == 2">审核通过</span>
            <span v-if="scope.row.auditStatus == 3">审核未通过</span>
          </template>
        </el-table-column>
        <el-table-column label="员工福利金">
          <template slot-scope="scope">
            <el-button :disabled="RoleInfo.AccountType == 1" type="text" size="medium" @click="goSaleswelfarevoucher(scope.row)">{{scope.row.benefits/100}}元</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" width="180px" v-if="RoleInfo.AccountType == 0||RoleInfo.AccountType == 2||RoleInfo.AccountType == 3">
          <template slot-scope="scope">
            <el-button :disabled="!Clickable.edit" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button :disabled="!Clickable.delete" size="mini" type="danger" @click="DeleteStaff(scope.row)">删除</el-button>
          </template>
        </el-table-column>
        <el-table-column label="公费套餐" fixed="right">
          <template slot-scope="scope">
            <div v-if="RoleInfo.AccountType == 0||RoleInfo.AccountType == 2||RoleInfo.AccountType == 3">
              <el-button :disabled="!Clickable.package" v-if="scope.row.publicExpenses.length == 0" @click="configurationpackage(scope.row,1)" type="text" size="small">套餐配置</el-button>
              <el-button :disabled="!Clickable.package" v-else @click="configurationpackage(scope.row,2)" type="text" size="small">已配置{{scope.row.publicExpenses.length}}个套餐</el-button>
            </div>
            <div v-else>
              <span v-if="scope.row.publicExpenses.length == 0">套餐配置</span>
              <span v-else>已配置{{scope.row.publicExpenses.length}}个套餐</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 批量导入员工弹窗 -->
    <div v-if="dialogImportEmployee">
      <el-dialog title="上传表格" :visible.sync="dialogImportEmployee" width="600px">
        <div v-loading="updataobj.isshow" :element-loading-text="updataobj.loadingtext" element-loading-spinner="el-icon-loading">
          <div>
            <el-form :model="UploadForm" :rules="UploadFormRules" ref="form" style="width:260px;margin-left: 130px;" label-position="left" label-width="80px" size="medium" class="demo-ruleForm">
              <el-form-item label="企业：" prop="company">
                <el-select v-model="UploadForm.company" :disabled="UploadFormcompanyData.length == 0" filterable placeholder="请选择企业" size="medium" style="width:100%;">
                  <el-option v-for="(item,inex) in UploadFormcompanyData" :key="item.index" :label="item.index" :value="item"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div class="stafflist_UploadForm">请按照以下格式上传.xlsx文件：十列数据分别为序号，姓名，后台标记字段，性别，婚否，手机号，证件类型，证件号，出生年月日，部门。请按照要求录入数据。</div>
            <input ref="inputer" id="upload" style="display:none" type="file" @change="importfxx()" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
            <div style="width:100%;text-align:center;margin-top:10px;">
              <el-button size="small" type="primary" @click="returnAllUsers">点击上传</el-button>
              <div style="line-height:30px" v-if="errorFile">格式错误请重新上传！</div>
              <div style="line-height:30px" v-if="filename!=''">已选择"{{filename}}"</div>
              <div style="line-height:30px" v-if="rightWord">匹配到{{goodXlsx.length}}条有效员工信息，{{badXlsx.length}}条无效数据</div>
              <div v-if="badXlsx.length>0">
                无效数据：
                <div v-for="item in badXlsx">
                  序号：{{item.id||"无序号"}} &nbsp&nbsp&nbsp&nbsp&nbsp
                  证件号：{{item.identity||"无证件号"}}
                  证件类型：{{item.cardType=='1'?'身份证':item.cardType=='2'?'港澳台通行证':item.cardType=='3'?'护照':'证件类型错误'}}
                </div>
              </div>

            </div>
            <div style=" text-align: center; margin-top: 15px;">
              <el-button type="text" @click="DownloadTemplate">
                下载模板文件
                <i class="el-icon-download el-icon--right"></i>
              </el-button>
            </div>
          </div>

          <div style="float:right">
            <el-button @click="closeimport">取 消</el-button>
            <el-button type="primary" @click="confirmimport">确 定</el-button>
          </div>
          <div style="height:40px">

          </div>
        </div>

      </el-dialog>
    </div>
    <!-- 审核弹窗 -->
    <div class="stafflist_ReviewDialog">
      <el-dialog title="审核" :visible.sync="ReviewDialog" width="450px" center top="16vh">
        <div class="lineReview">
          <div style="float: left; line-height:50px;padding-left:10px;"><span>姓名</span><span style="color:#F56C6C">*</span></div>
          <div style="float: right;line-height:50px;padding-right:10px;">{{ReviewObj.name}}</div>
        </div>
        <div class="lineReview">
          <div style="float: left; line-height:50px;padding-left:10px;"><span>手机号码</span><span style="color:#F56C6C">*</span></div>
          <div style="float: right;line-height:50px;padding-right:10px;">{{ReviewObj.phone}}</div>
        </div>
        <div class="lineReview">
          <div style="float: left; line-height:50px;padding-left:10px;"><span>证件类型</span><span style="color:#F56C6C">*</span></div>
          <div style="float: right;line-height:50px;padding-right:10px;" v-if="ReviewObj.cardType=='1'">身份证</div>
          <div style="float: right;line-height:50px;padding-right:10px;" v-if="ReviewObj.cardType=='2'">港澳台通行证</div>
          <div style="float: right;line-height:50px;padding-right:10px;" v-if="ReviewObj.cardType=='3'">护照</div>
        </div>
        <div class="lineReview">
          <div style="float: left; line-height:50px;padding-left:10px;"><span>证件号</span><span style="color:#F56C6C">*</span></div>
          <div style="float: right;line-height:50px;padding-right:10px;">{{rowClass()}}</div>
        </div>
        <div class="lineReview">
          <div style="float: left; line-height:50px;padding-left:10px;"><span>出生年月日</span><span style="color:#F56C6C">*</span></div>
          <div style="float: right;line-height:50px;padding-right:10px;">{{ReviewObj.ageOfBirth}}</div>
        </div>
        <div class="lineReview">
          <div style="float: left; line-height:50px;padding-left:10px;"><span>性别</span><span style="color:#F56C6C">*</span></div>
          <div style="float: right;line-height:50px;padding-right:10px;">{{ReviewObj.sex}}</div>
        </div>
        <div class="lineReview">
          <div style="float: left; line-height:50px;padding-left:10px;"><span>婚否</span><span style="color:#F56C6C">*</span></div>
          <div style="float: right;line-height:50px;padding-right:10px;">{{ReviewObj.isMarital}}</div>
        </div>
        <div class="lineReview">
          <div style="float: left; line-height:50px;padding-left:10px;"><span>部门</span><span style="color:#999999">（非必填）</span></div>
          <div style="float: right;line-height:50px;padding-right:10px;">{{ReviewObj.branch}}</div>
        </div>

        <div slot="footer" class="dialog-footer" style="margin-top:20px">
          <el-button @click="ReviewPost(false)">审核不通过</el-button>
          <el-button type="primary" @click="ReviewPost(true)">审核通过</el-button>
        </div>
      </el-dialog>
    </div>

    <div>
      <el-dialog title="员工导入失败" :visible.sync="updataobj.errshow" width="400px">
        <div style="margin: 0 20px">

          <div v-for="item in updataobj.errdata">
            {{item.Num}}&nbsp&nbsp&nbsp&nbsp{{item.identityRemarks}}&nbsp&nbsp&nbsp&nbsp{{item.phoneRemarks}}
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="updataobj.errshow = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 员工批量操作 -->
    <div class="ygplcz">
      <el-dialog title="员工批量操作" :visible.sync="ygplczobj.isshow" width="800px" :before-close="handleClose">
        <el-tabs v-model="ygplczobj.activeName" @tab-click="handleClick" type="border-card">
          <el-tab-pane label="员工批量导入" name="first">
            <div v-loading="ygplczobj.drobj.loading" :element-loading-text="ygplczobj.drobj.loadingtext">
              <span>选择企业：</span>
              <el-select :disabled="ygplczobj.drobj.active!=0" aria-label="选择企业" size="small" v-model="ygplczobj.drobj.company" filterable>
                <el-option v-for="(item,index) in ygplczobj.companyList" :key="index" :label="item" :value="item"></el-option>
              </el-select>
              <el-steps style="margin-top:10px" :active="ygplczobj.drobj.active" finish-status="success" process-status="finish" simple>
                <el-step title="上传文件" icon="el-icon-upload"></el-step>
                <el-step title="执行导入" icon="el-icon-s-platform"></el-step>
                <el-step title="导入完成" icon="el-icon-success"></el-step>
              </el-steps>
              <div v-if="ygplczobj.drobj.active==0">
                <el-card>
                  <div class="box-card">
                    <div>
                      <i style="font-size:50px;margin:10px" class="el-icon-my-download "></i>
                    </div>
                    <div style="width:100%;margin-left:20px">
                      <div style="">
                        <div style="font-size:18px;">填写导入员工信息</div>
                        <div style="font-size:14px; color:#ccc">为提高导入的成功率，请下载并使用系统提供的模板。单次导入不超过5000条</div>
                      </div>
                      <el-button class="carbtn" type="primary" size="small" @click="DownloadTemplate">下载模板</el-button>
                    </div>
                  </div>
                </el-card>
                <el-card>
                  <div class="box-card">
                    <div>
                      <i style="font-size:50px;margin:10px" class="el-icon-my-upload"></i>
                    </div>
                    <div style="width:100%;margin-left:20px">
                      <div style="">
                        <div style="font-size:18px;">上传填好的员工信息表</div>
                        <div style="font-size:14px; color:#9E9E9E">仅支持xlsx或xls（即Excel格式），文件大小≤4M。</div>
                        <div style="font-size:14px; color:#3A83FF">{{ygplczobj.drobj.fileName}} <i v-if="ygplczobj.drobj.fileName" @click="delfile" style="cursor: pointer;" class="el-icon-error"></i></div>
                      </div>
                      <el-button class="carbtn" type="primary" size="small" @click="tgplzcinput">上传文件</el-button>
                    </div>
                  </div>
                </el-card>
                <div style="text-align:center;margin-top:20px">
                  <el-button type="primary" @click="ygplczcheckData">校验数据</el-button>
                </div>
              </div>
              <div v-if="ygplczobj.drobj.active==1">
                <el-card>
                  <div class="box-card">
                    <div style="width:100%;margin-left:20px">
                      <div style="">
                        <div style="font-size:16px;">正确数据条数</div>
                        <div style="font-size:14px; color:#4CCA32 ">{{ygplczobj.drobj.drResult.succCount}}条</div>
                      </div>
                    </div>
                  </div>
                </el-card>
                <el-card>
                  <div class="box-card">
                    <div style="width:100%;margin-left:20px">
                      <div style="">
                        <div style="font-size:16px;">异常数据条数</div>
                        <div style="font-size:14px; color:#F63649  ">{{ygplczobj.drobj.drResult.failCount}}条</div>
                      </div>
                      <el-button class="carbtn" type="primary" size="small" @click="downloadfaildata">下载异常数据</el-button>
                    </div>
                  </div>
                </el-card>
                <div style="margin-top:20px">
                  <el-button type="primary" @click="confirmdrbtn">确认导入</el-button>
                  <el-button style="float:right" @click="resetupload">重新上传</el-button>
                </div>
              </div>
              <div v-if="ygplczobj.drobj.active==2">
                <div style="text-align:center">
                  <div style="font-size:28px;color:#00000;margin:20px">批量导入完成</div>
                  <div style="font-size:16px;color:#4CCA32;margin-bottom:20px">成功导入员工数量{{ygplczobj.drobj.drResult.succCount}}条</div>
                  <el-button type="primary" style="margin:20pxl.;padding:15px 50px" @click="ygplczobj.isshow=false;findEmployees('搜索')">完 成</el-button>
                </div>
              </div>
            </div>

          </el-tab-pane>
          <el-tab-pane label="员工批量修改" name="second">
            <div v-loading="ygplczobj.xgobj.loading" :element-loading-text="ygplczobj.xgobj.loadingtext">
              <span>选择企业：</span>
              <el-select :disabled="ygplczobj.xgobj.active!=0" aria-label="选择企业" size="small" v-model="ygplczobj.xgobj.company" filterable>
                <el-option v-for="(item,index) in ygplczobj.companyList" :key="index" :label="item" :value="item"></el-option>
              </el-select>
              <el-steps style="margin-top:10px" :active="ygplczobj.xgobj.active" finish-status="success" process-status="finish" simple>
                <el-step title="上传文件" icon="el-icon-upload"></el-step>
                <el-step title="执行修改" icon="el-icon-s-platform"></el-step>
                <el-step title="修改完成" icon="el-icon-success"></el-step>
              </el-steps>
              <div v-if="ygplczobj.xgobj.active==0">
                <div style="color:#F63649;line-height:40px">请导出需要修改的员工信息，提前修改好！</div>
                <el-card>
                  <div class="box-card">
                    <div>
                      <i style="font-size:50px;margin:10px" class="el-icon-my-upload"></i>
                    </div>
                    <div style="width:100%;margin-left:20px">
                      <div style="">
                        <div style="font-size:18px;">上传修改好的员工信息表</div>
                        <div style="font-size:14px; color:#9E9E9E">仅支持xlsx或xls（即Excel格式），文件大小≤4M。</div>
                        <div style="font-size:14px; color:#3A83FF">{{ygplczobj.xgobj.fileName}} <i v-if="ygplczobj.xgobj.fileName" @click="delfile" style="cursor: pointer;" class="el-icon-error"></i></div>
                      </div>
                      <el-button class="carbtn" type="primary" size="small" @click="tgplzcinput">上传文件</el-button>
                    </div>
                  </div>
                </el-card>
                <div style="text-align:center;margin-top:20px">
                  <el-button type="primary" @click="ygplczcheckData">校验数据</el-button>
                </div>
              </div>
              <div v-if="ygplczobj.xgobj.active==1">
                <el-card>
                  <div class="box-card">
                    <div style="width:100%;margin-left:20px">
                      <div style="">
                        <div style="font-size:16px;">正确数据条数</div>
                        <div style="font-size:14px; color:#4CCA32 ">{{ygplczobj.xgobj.drResult.succCount}}条</div>
                      </div>
                    </div>
                  </div>
                </el-card>
                <el-card>
                  <div class="box-card">
                    <div style="width:100%;margin-left:20px">
                      <div style="">
                        <div style="font-size:16px;">异常数据条数</div>
                        <div style="font-size:14px; color:#F63649  ">{{ygplczobj.xgobj.drResult.failCount}}条</div>
                      </div>
                      <el-button class="carbtn" type="primary" size="small" @click="downloadfaildata">下载异常数据</el-button>
                    </div>
                  </div>
                </el-card>
                <div style="margin-top:20px">
                  <el-button type="primary" @click="confirmdrbtn">确认修改</el-button>
                  <el-button style="float:right" @click="resetupload">重新上传</el-button>
                </div>
              </div>
              <div v-if="ygplczobj.xgobj.active==2">
                <div style="text-align:center">
                  <div style="font-size:28px;color:#00000;margin:20px">批量修改完成</div>
                  <div style="font-size:16px;color:#4CCA32;margin-bottom:20px">成功修改员工数量{{ygplczobj.xgobj.drResult.succCount}}条</div>
                  <el-button type="primary" style="margin:20pxl.;padding:15px 50px" @click="ygplczobj.isshow=false;findEmployees('搜索')">完 成</el-button>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="员工批量删除" name="third">
            <div v-loading="ygplczobj.scobj.loading" :element-loading-text="ygplczobj.scobj.loadingtext">
              <span>选择企业：</span>
              <el-select :disabled="ygplczobj.scobj.active!=0" aria-label="选择企业" size="small" v-model="ygplczobj.scobj.company" filterable>
                <el-option v-for="(item,index) in ygplczobj.companyList" :key="index" :label="item" :value="item"></el-option>
              </el-select>
              <el-steps style="margin-top:10px" :active="ygplczobj.scobj.active" finish-status="success" process-status="finish" simple>
                <el-step title="上传文件" icon="el-icon-upload"></el-step>
                <el-step title="执行删除" icon="el-icon-s-platform"></el-step>
                <el-step title="删除完成" icon="el-icon-success"></el-step>
              </el-steps>
              <div v-if="ygplczobj.scobj.active==0">
                <el-card>
                  <div class="box-card">
                    <div>
                      <i style="font-size:50px;margin:10px" class="el-icon-my-upload"></i>
                    </div>
                    <div style="width:100%;margin-left:20px">
                      <div style="">
                        <div style="font-size:18px;">上传需要删除的员工信息表</div>
                        <div style="font-size:14px; color:#9E9E9E">仅支持xlsx或xls（即Excel格式），文件大小≤4M。</div>
                        <div style="font-size:14px; color:#3A83FF">{{ygplczobj.scobj.fileName}} <i v-if="ygplczobj.scobj.fileName" @click="delfile" style="cursor: pointer;" class="el-icon-error"></i></div>
                      </div>
                      <el-button class="carbtn" type="primary" size="small" @click="tgplzcinput">上传文件</el-button>
                    </div>
                  </div>
                </el-card>
                <div style="text-align:center;margin-top:20px">
                  <el-button type="primary" @click="ygplczcheckData">校验数据</el-button>
                </div>
              </div>
              <div v-if="ygplczobj.scobj.active==1">
                <el-card>
                  <div class="box-card">
                    <div style="width:100%;margin-left:20px">
                      <div style="">
                        <div style="font-size:16px;">正确数据条数</div>
                        <div style="font-size:14px; color:#4CCA32 ">{{ygplczobj.scobj.drResult.succCount}}条</div>
                      </div>
                    </div>
                  </div>
                </el-card>
                <el-card>
                  <div class="box-card">
                    <div style="width:100%;margin-left:20px">
                      <div style="">
                        <div style="font-size:16px;">异常数据条数</div>
                        <div style="font-size:14px; color:#F63649  ">{{ygplczobj.scobj.drResult.failCount}}条</div>
                      </div>
                      <el-button class="carbtn" type="primary" size="small" @click="downloadfaildata">下载异常数据</el-button>
                    </div>
                  </div>
                </el-card>
                <div style="margin-top:20px">
                  <el-button type="primary" @click="confirmdrbtn">确认删除</el-button>
                  <el-button style="float:right" @click="resetupload">重新上传</el-button>
                </div>
              </div>
              <div v-if="ygplczobj.scobj.active==2">
                <div style="text-align:center">
                  <div style="font-size:28px;color:#00000;margin:20px">批量删除完成</div>
                  <div style="font-size:16px;color:#4CCA32;margin-bottom:20px">成功删除员工数量{{ygplczobj.scobj.drResult.succCount}}条</div>
                  <el-button type="primary" style="margin:20pxl.;padding:15px 50px" @click="ygplczobj.isshow=false;findEmployees('搜索')">完 成</el-button>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-dialog>
    </div>
    <input ref="ygplczinput" id="ygplczinputid" style="display:none" type="file" @change="ygplczimportfxx()" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
    <!-- 分页 -->
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="Inquire.page" :page-sizes="[10, 20, 50, 100]" :page-size="Inquire.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="count"></el-pagination>
    </div>
  </div>
</template>

<script>
import { formatDate } from "../../api/formatDate.js";

export default {
  name: "stafflist",
  components: {},
  data() {
    return {
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
          loadingtext: ""
        },
        xgobj: {
          company: "", //企业名称，
          fileName: "", //文件名称
          active: 0, //当前步骤
          yglist: [],
          drResult: "",
          loading: false,
          loadingtext: ""
        },
        scobj: {
          company: "", //企业名称，
          fileName: "", //文件名称
          active: 0, //当前步骤
          yglist: [],
          drResult: "",
          loading: false,
          loadingtext: ""
        }
      },
      singlist: ["全部"], //标记下拉框
      singload: false,

      updataobj: {
        isshow: false,
        errshow: false,
        errdata: [],
        loadingtext: ""
      },
      getRowKeys(row) {
        return row.userId;
      },
      timeframe: [],
      // 查询数据
      Inquire: {
        fromCompany: "全部", //	所属分公司
        fromSale: "全部", //	所属销售
        company: "全部", //	企业名称
        name: "", //	姓名
        phone: "", //	电话号码
        cardNum: "",
        branch: "全部", //部门
        auditStatus: "全部", //	审核状态
        sign: "全部", //标记
        page: 1, //
        pageSize: 10 //
      },
      // 上传数据
      UploadForm: {
        company: ""
      },
      UploadFormRules: {
        company: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ]
      },
      UploadFormcompanyData: [],
      count: 0,
      // 下拉框
      fromCompanyData: ["全部"],
      fromSaleData: ["全部"],
      companyData: ["全部"],
      branchData: ["全部"],
      auditStatusData: [
        {
          label: "全部",
          value: "全部"
        },
        {
          label: "待审核",
          value: "1"
        },
        {
          label: "审核通过",
          value: "2"
        },
        {
          label: "审核未通过",
          value: "3"
        }
      ],
      // 列表数据
      tableData: [],
      // 选中数据
      multipleSelection: [],
      // 弹窗
      dialogImportEmployee: false, //批量导入员工弹窗
      ReviewDialog: false, //审核弹窗
      // loading
      tableDataloading: false,
      branchDataloading: false,

      // 上传表格
      goodXlsx: [],
      badXlsx: [],
      errorFile: false,
      rightWord: false,
      filename: "",
      file: "",
      // 审核数据
      ReviewObj: {},
      isbatch: false
    };
  },
  watch: {
    dialogImportEmployee: function(n, o) {
      if (n == false) {
        this.$refs.inputer.value = "";
        this.filename = "";
        this.goodXlsx = [];
        this.badXlsx = [];
        this.errorFile = false;
        this.rightWord = false;
      }
    },
    "Inquire.fromCompany": {
      handler(nvl, ovl) {
        console.log(nvl);
        this.Inquire.fromSale = "全部";
        this.Inquire.company = "全部";
        this.Inquire.branch = "全部";
        if (nvl == "全部") {
          this.fromSaleData = ["全部"];
          if (this.$store.getters.getRoleInfo.AccountType == "0") {
            // 查询分销售赋值
            this.fromSaleData = this.fromSaleData.concat(
              this.$store.getters.getSales
            );
          } else if (this.$store.getters.getRoleInfo.AccountType == "1") {
            this.fromSaleData = this.fromSaleData.concat(
              this.$store.getters.getSales
            );
          }
          return;
        }
        if (this.$store.getters.getRoleInfo.AccountType == "2") {
          this.fromCompanyData = [];
          this.fromSaleData = [];
          // 查询分公司赋值
          this.Inquire.fromCompany = this.$store.getters.getRoleInfo.FromCompany;
          // 查询销售
          this.Inquire.fromSale = this.$store.getters.getRoleInfo.AccountName;
          return;
        }
        if (this.$store.getters.getRoleInfo.AccountType == "3") {
          this.fromCompanyData = [];
          this.fromSaleData = [];
          this.companyData = [];
          // 上传表格企业
          this.UploadFormcompanyData = [];
          // 查询分公司赋值
          this.Inquire.fromCompany = this.$store.getters.getRoleInfo.FromCompany;
          // 查询销售
          this.Inquire.fromSale = this.$store.getters.getRoleInfo.FromSale;
          // 企业
          this.Inquire.company = this.$store.getters.getRoleInfo.AccountName;
          this.UploadForm.company = this.$store.getters.getRoleInfo.AccountName;
          return;
        }

        this.$api
          .get("account/pullOrg2", {
            AccountType: "1",
            AccountName: nvl
          })
          .then(res => {
            this.fromSaleData = ["全部"];
            console.log(res);
            res.data.map(item => {
              if (item.AccountType == "2") {
                item.Name.map(temp => {
                  this.fromSaleData.push(temp);
                });
              }
            });
          });
      }
    },
    "Inquire.fromSale": {
      handler(nvl, ovl) {
        console.log(nvl);
        this.Inquire.company = "全部";
        this.Inquire.branch = "全部";
        if (nvl == "全部") {
          this.companyData = ["全部"];
          if (this.$store.getters.getRoleInfo.AccountType == "0") {
            this.companyData = this.companyData.concat(
              this.$store.getters.getEnterprise
            );
          } else if (this.$store.getters.getRoleInfo.AccountType == "1") {
            this.companyData = this.companyData.concat(
              this.$store.getters.getEnterprise
            );
          }
          return;
        }
        if (this.$store.getters.getRoleInfo.AccountType == "3") {
          this.fromCompanyData = [];
          this.fromSaleData = [];
          this.companyData = [];
          // 上传表格企业
          this.UploadFormcompanyData = [];
          // 查询分公司赋值
          this.Inquire.fromCompany = this.$store.getters.getRoleInfo.FromCompany;
          // 查询销售
          this.Inquire.fromSale = this.$store.getters.getRoleInfo.FromSale;
          // 企业
          this.Inquire.company = this.$store.getters.getRoleInfo.AccountName;
          this.UploadForm.company = this.$store.getters.getRoleInfo.AccountName;
          return;
        }

        this.$api
          .get("account/pullOrg2", {
            AccountType: "2",
            AccountName: nvl
          })
          .then(res => {
            this.companyData = ["全部"];
            console.log(res);
            res.data.map(item => {
              if (item.AccountType == "3") {
                item.Name.map(temp => {
                  this.companyData.push(temp);
                });
              }
            });
          });
      }
    }
  },
  created() {},
  mounted() {
    // 获取选择框数据
    this.getSelectionData();
    // 查询员工列表
    this.findEmployees();
    // 如果是企业直接获取部门数据
    if (this.$store.getters.getRoleInfo.AccountType == 3) {
      this.getBranch();
    }
  },
  created() {
    this.setpagemsg();
  },
  beforeDestroy() {
    this.copypagemsg();
  },
  methods: {
    //确认导入
    confirmdrbtn() {
      var nametemp = "";
      var url = "";
      var type = "";
      var text = "";
      switch (this.ygplczobj.activeName) {
        case "first":
          nametemp = "drobj";
          url = "/employee/excelInsertEmployees";
          type = "1";
          text = "数据导入中,请稍后...";
          break;
        case "second":
          nametemp = "xgobj";
          url = "/employee/excelUpdateEmployees";
          type = "2";
          text = "数据修改中,请稍后...";
          break;
        case "third":
          nametemp = "scobj";
          url = "/employee/excelDelEmployees";
          type = "3";
          text = "数据删除中,请稍后...";
          break;
      }
      if (this.ygplczobj[nametemp].drResult.succCount > 0) {
        var body = {
          operationType: type,
          company: this.ygplczobj[nametemp].company,
          fileName: this.ygplczobj[nametemp].fileName,
          bulkImport: this.ygplczobj[nametemp].drResult.succData
        };
        this.ygplczobj[nametemp].loading = true;
        this.ygplczobj[nametemp].loadingtext = text;
        this.$api
          .post(url, body)
          .then(res => {
            if (res.code == 200) {
              this.$message.success("成功");
              this.ygplczobj[nametemp].active += 1;
              this.ygplczobj[nametemp].loading = false;
              this.ygplczobj[nametemp].loadingtext = "";
            }
          })
          .catch(err => {
            this.$message.error(err.msg);
          });
      } else {
        this.$message.error("暂无正确数据！");
      }
    },
    //删除文件
    delfile() {
      var nametemp = "";
      switch (this.ygplczobj.activeName) {
        case "first":
          nametemp = "drobj";
          break;
        case "second":
          nametemp = "xgobj";
          break;
        case "third":
          nametemp = "scobj";
          break;
        default:
          break;
      }
      this.ygplczobj[nametemp].fileName = "";
      this.ygplczobj[nametemp].yglist = [];
    },
    //重新上传
    resetupload() {
      var nametemp = "";
      switch (this.ygplczobj.activeName) {
        case "first":
          nametemp = "drobj";
          break;
        case "second":
          nametemp = "xgobj";
          break;
        case "third":
          nametemp = "scobj";
          break;
        default:
          break;
      }
      this.ygplczobj[nametemp].active -= 1;
    },
    //下载异常数据
    downloadfaildata() {
      var nametemp = "";
      switch (this.ygplczobj.activeName) {
        case "first":
          nametemp = "drobj";
          break;
        case "second":
          nametemp = "xgobj";
          break;
        case "third":
          nametemp = "scobj";
          break;
        default:
          break;
      }
      if (this.ygplczobj[nametemp].drResult.failCount > 0) {
        this.$api
          .post("/employee/abnormalDataDownload", {
            failData: this.ygplczobj[nametemp].drResult.failData
          })
          .then(res => {
            console.log(res);
            let a = document.createElement("a");
            // console.log(require("../assets/qrcode.png"));
            a.href = res.data; // href链接指向图片的地址
            a.download = res.data; // 下载的图片的名称
            a.click(); // 触发a标签的单击事件
          })
          .catch(err => {
            console.log(err);
            this.$message.error(err.msg);
          });
      } else {
        this.$message.info("暂无异常数据！");
      }
    },
    getpullOrg2account() {
      this.$api
        .get("account/pullOrg2", {
          AccountType: this.$store.getters.getRoleInfo.AccountType,
          AccountName: this.$store.getters.getRoleInfo.AccountName
        })
        .then(res => {
          console.log(res);
          this.ygplczobj.companyList = [];
          res.data.map(item => {
            if (item.AccountType == "3") {
              item.Name.map(temp => {
                this.ygplczobj.companyList.push(temp);
              });
            }
          });
        });
    },
    //员工批量操作数据检验
    ygplczcheckData() {
      var nametemp = "";
      switch (this.ygplczobj.activeName) {
        case "first":
          nametemp = "drobj";
          break;
        case "second":
          nametemp = "xgobj";
          break;
        case "third":
          nametemp = "scobj";
          break;
        default:
          break;
      }
      if (!this.ygplczobj[nametemp].company) {
        this.$message.error("请选择企业");
        return;
      }
      if (!this.ygplczobj[nametemp].fileName) {
        this.$message.error("请上传员工信息表");
        return;
      }
      var body = {
        operationType: "",
        company: this.ygplczobj[nametemp].company,
        fileName: this.ygplczobj[nametemp].fileName,
        bulkImport: this.ygplczobj[nametemp].yglist
      };
      switch (nametemp) {
        case "drobj":
          body.operationType = "1";
          break;
        case "xgobj":
          body.operationType = "2";
          break;
        case "scobj":
          body.operationType = "3";
          break;

        default:
          break;
      }
      this.ygplczobj[nametemp].loading = true;
      this.ygplczobj[nametemp].loadingtext = "数据校验中,请稍后...";
      this.$api
        .post("/employee/checkData", body)
        .then(res => {
          console.log(res);
          this.ygplczobj[nametemp].loading = false;
          this.ygplczobj[nametemp].loadingtext = "";
          if (res.code == 200) {
            this.ygplczobj[nametemp].drResult = res.data;
            this.ygplczobj[nametemp].active += 1;
          } else {
            this.$message.error(res.mag);
          }
        })
        .catch(err => {
          this.ygplczobj[nametemp].loading = false;
          this.ygplczobj[nametemp].loadingtext = "";
          console.log(err);
          this.$message.error(err.mag);
        });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    tgplzcinput() {
      this.$refs.ygplczinput.value = "";
      document.getElementById("ygplczinputid").click();
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    //员工批量操作
    ygplczbtn() {
      this.ygplczobj = {
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
          loadingtext: ""
        },
        xgobj: {
          company: "", //企业名称，
          fileName: "", //文件名称
          active: 0, //当前步骤
          yglist: [],
          drResult: "",
          loading: false,
          loadingtext: ""
        },
        scobj: {
          company: "", //企业名称，
          fileName: "", //文件名称
          active: 0, //当前步骤
          yglist: [],
          drResult: "",
          loading: false,
          loadingtext: ""
        }
      };
      this.ygplczobj.isshow = true;
      this.getpullOrg2account();
    },
    //员工批量操作excel生成json
    ygplczimportfxx(e) {
      let _this = this;
      console.log(event);
      var myevent = event;
      var nametemp = "";
      switch (_this.ygplczobj.activeName) {
        case "first":
          nametemp = "drobj";
          break;
        case "second":
          nametemp = "xgobj";
          break;
        case "third":
          nametemp = "scobj";
          break;
        default:
          break;
      }
      _this.ygplczobj[nametemp].loading = true;
      _this.ygplczobj[nametemp].loadingtext = "数据解析中,请稍后...";
      setTimeout(() => {
        let inputDOM = _this.$refs.inputer;
        // 通过DOM取文件数据
        console.log(myevent);
        var rABS = false; //是否将文件读取为二进制字符串
        var f = myevent.target.files[0];

        _this.ygplczobj[nametemp].fileName = f.name;
        var reader = new FileReader();
        FileReader.prototype.readAsBinaryString = function(f) {
          var binary = "";
          var rABS = false; //是否将文件读取为二进制字符串
          var wb; //读取完成的数据
          var outdata;
          var reader = new FileReader();
          reader.onload = function(e) {
            var bytes = new Uint8Array(reader.result);
            var length = bytes.byteLength;
            for (var i = 0; i < length; i++) {
              binary += String.fromCharCode(bytes[i]);
            }
            var XLSX = require("xlsx");
            if (rABS) {
              wb = XLSX.read(btoa(fixdata(binary)), {
                //手动转化
                type: "base64"
              });
            } else {
              wb = XLSX.read(binary, {
                type: "binary"
              });
            }
            outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]); //outdata就是你想要的东西
            console.log("outdata", outdata);
            _this.ygplczobj[nametemp].yglist = [];
            try {
              outdata.forEach((element, index) => {
                if (!element.序号) {
                  throw new Error("请完善表格序号！");
                }
                if (!element.证件类型) {
                  throw new Error("请完善表格证件类型！");
                }
                if (!element.证件号码) {
                  throw new Error("请完善表格证件号码！");
                }
                let body = {
                  id: Number(element.序号 || index + 1),
                  name: String(element.姓名 || ""),
                  sign: String(element.后台标记字段 || ""),
                  phone: String(element.手机号码 || ""),
                  identity: String(element.证件号码 || ""),
                  sex: String(element.性别 || ""),
                  branch: String(element.部门 || ""),
                  marriage: String(element.婚否 || ""),
                  cardType: String(element.证件类型 || ""),
                  ageOfBirth: "",
                  publicPackage: String(element.公费套餐 || ""),
                  selfCateringPackage: String(element.自费套餐 || ""),
                  position: String(element.岗位 || ""),
                  amountF: Number(element.员工福利金 || 0)
                };
                if (element.证件类型) {
                  switch (element.证件类型) {
                    case "身份证":
                      body.cardType = "1";
                      break;
                    case "港澳台通行证":
                      body.cardType = "2";
                      break;
                    case "护照":
                      body.cardType = "3";
                      break;
                    default:
                      break;
                  }
                }
                if (element.出生年月日) {
                  console.log("有生日", element.出生年月日);
                  body.ageOfBirth = _this.getFormatDate(
                    _this.exceldataParse(element.出生年月日)
                  );
                } else if (element.证件类型 == "身份证" && element.证件号码) {
                  body.ageOfBirth =
                    element.证件号码.substring(6, 10) +
                    "-" +
                    element.证件号码.substring(10, 12) +
                    "-" +
                    element.证件号码.substring(12, 14);
                }
                _this.ygplczobj[nametemp].yglist.push(body);
              });
              console.log(_this.ygplczobj[nametemp].yglist);
              _this.ygplczobj[nametemp].loading = false;
              _this.ygplczobj[nametemp].loadingtext = "";
              _this.$message.success("数据解析完成");
            } catch (error) {
              _this.$message.error(error.message);
              _this.ygplczobj[nametemp].yglist = [];
              _this.ygplczobj[nametemp].fileName = "";
              _this.ygplczobj[nametemp].loading = false;
              _this.ygplczobj[nametemp].loadingtext = "";
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

    getFormatDate(date) {
      // var date = new Date();
      var seperator1 = "-";
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      var currentdate = year + seperator1 + month + seperator1 + strDate;
      return currentdate;
    },
    exceldataParse(date) {
      let result = "";
      if (/^\d{1,5}$/.test(date)) {
        result = new Date(1900, 0, parseInt(date) - 1);
      } else if (/^\d{4}(0[0-9]|1[0-2])([0-3][0-9])?$/.test(date)) {
        if (date.length === 6) {
          date = date.slice(0, 4) + "-" + date.slice(4);
        } else {
          date =
            date.slice(0, 4) + "-" + data.slice(4, 6) + "-" + date.slice(6);
        }
        result = new Date(date);
      } else {
        result = new Date(date);
      }
      if (isNaN(result.getFullYear())) {
        return null;
      }
      return result;
    },

    rowClass: function() {
      var val = this.ReviewObj.identity;
      if (this.ReviewObj.cardType == "1") {
        var id = val.substring(0, 6) + "********" + val.substring(14);
      } else {
        var id = this.ReviewObj.identity;
      }
      return id;
    },

    //保存数据

    getsign() {
      //获取标记下拉框

      this.$api
        .get("/employee/findSignInfo", { company: this.Inquire.company })
        .then(res => {
          this.singlist = this.singlist.concat(res.data.signs);
          console.log(res);
          this.singload = false;
        })
        .catch(err => {
          this.singload = false;
        });
    },
    copypagemsg() {
      var body = {
        fromCompany: this.Inquire.fromCompany,
        fromSale: this.Inquire.fromSale,
        company: this.Inquire.company,
        name: this.Inquire.name,
        phone: this.Inquire.phone,
        branch: this.Inquire.branch,
        auditStatus: this.Inquire.auditStatus,
        page: this.Inquire.page,
        pageSize: this.Inquire.pageSize,
        timeframe: this.timeframe,
        cardNum: this.Inquire.cardNum
      };
      this.$store.commit("setstafflistmsg", body);
    },
    //赋值页面数据
    setpagemsg() {
      if (this.$route.query.auditStatus) {
        this.Inquire.auditStatus = this.$route.query.auditStatus.toString();
        return;
      }
      var body = this.$store.getters.getstafflistmsg;
      this.Inquire.fromCompany = body.fromCompany || "全部";
      this.Inquire.fromSale = body.fromSale || "全部";
      this.Inquire.company = body.company || "全部";
      this.Inquire.name = body.name || "";
      this.Inquire.phone = body.phone || "";
      this.Inquire.branch = body.branch || "全部";
      this.Inquire.auditStatus = body.auditStatus || "全部";
      this.Inquire.cardNum = body.cardNum || "";
      this.Inquire.page = body.page || 1;
      this.Inquire.pageSize = body.pageSize || 10;
      this.timeframe = body.timeframe || [];
      console.log(body);
    },
    //
    goSaleswelfarevoucher(val) {
      if (val) {
        console.log("goSaleswelfarevoucher(val)", val);
        console.log("val.placeCompanyName :", val.placeCompanyName);
        this.$router.push(
          "/staffmanagement/saleswelfarevoucher?id=" +
            val.userId +
            "&company=" +
            val.placeCompanyName
        );
      } else {
        this.$router.push("/staffmanagement/saleswelfarevoucher");
      }
    },
    // 员工导出
    EmployeeExport() {
      var body = JSON.parse(JSON.stringify(this.Inquire));
      var temp = JSON.parse(JSON.stringify(this.multipleSelection));
      var tempId = "";
      if (temp.length == 0) {
        console.log("1", 1);
      } else {
        console.log("2", 2);
        temp.map(i => {
          console.log("i.userId :", i.userId);
          tempId = tempId + i.userId + ",";
        });
        body.userIds = tempId;
      }
      console.log("tempId :", tempId);
      if (
        this.timeframe &&
        Array.isArray(this.timeframe) &&
        this.timeframe.length > 1
      ) {
        console.log(this.timeframe);

        body.startTime = this.timeframe[0];
        body.endTime = this.timeframe[1];
      }
      this.$api
        .post("/employee/excelEmployees", body)
        .then(res => {
          console.log(res.data);
          // window.open(this.$parent.$parent.$parent.weburl + res.data.url);
          let a = document.createElement("a");
          // console.log(require("../assets/qrcode.png"));
          a.href = this.$parent.$parent.$parent.weburl + res.data.url; // href链接指向的地址
          a.download = this.$parent.$parent.$parent.weburl + res.data.url; // 下载的的名称
          a.click(); // 触发a标签的单击事件
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    // 获取选择框数据
    getSelectionData() {
      // 赋值
      console.log(this.$store.getters.getRoleInfo);
      if (this.$store.getters.getRoleInfo.AccountType == "0") {
        // 查询分公司赋值
        this.fromCompanyData = this.fromCompanyData.concat(
          this.$store.getters.getBranchOffice
        );
        // 查询销售
        this.fromSaleData = this.fromSaleData.concat(
          this.$store.getters.getSales
        );
        // 企业
        this.companyData = this.companyData.concat(
          this.$store.getters.getEnterprise
        );
        // 上传表格企业
        this.UploadFormcompanyData = this.$store.getters.getEnterprise;
      } else if (this.$store.getters.getRoleInfo.AccountType == "1") {
        this.fromCompanyData = [];
        // 查询分公司赋值
        this.Inquire.fromCompany =
          this.$store.getters.getRoleInfo.parentName ||
          this.$store.getters.getRoleInfo.AccountName;
        // 查询销售
        this.fromSaleData = this.fromSaleData.concat(
          this.$store.getters.getSales
        );
        // 企业
        this.companyData = this.companyData.concat(
          this.$store.getters.getEnterprise
        );
      } else if (this.$store.getters.getRoleInfo.AccountType == "2") {
        this.fromCompanyData = [];
        this.fromSaleData = [];

         // 查询销售
        this.Inquire.fromSale = this.$store.getters.getRoleInfo.AccountName;
        // 查询分公司赋值
        this.Inquire.fromCompany = this.$store.getters.getRoleInfo.FromCompany; 
        // 企业
        this.companyData = this.companyData.concat(
          this.$store.getters.getEnterprise
        );
        // 上传表格企业
        this.UploadFormcompanyData = this.$store.getters.getEnterprise;
      } else if (this.$store.getters.getRoleInfo.AccountType == "3") {
        this.fromCompanyData = [];
        this.fromSaleData = [];
        this.companyData = [];
        // 上传表格企业
        this.UploadFormcompanyData = [];
        // 查询分公司赋值
        this.Inquire.fromCompany = this.$store.getters.getRoleInfo.FromCompany;
        // 查询销售
        this.Inquire.fromSale = this.$store.getters.getRoleInfo.FromSale;
        // 企业
        this.Inquire.company = this.$store.getters.getRoleInfo.AccountName;
        this.UploadForm.company = this.$store.getters.getRoleInfo.AccountName;
      }else if (this.$store.getters.getRoleInfo.AccountType == "7") {
        this.fromCompanyData = [];
        this.fromSaleData = [];

   
        // 查询分公司赋值
        this.Inquire.fromCompany = this.$store.getters.getRoleInfo.FromCompany; 
        // 企业
        this.companyData = this.companyData.concat(
          this.$store.getters.getEnterprise
        );
        // 上传表格企业
        this.UploadFormcompanyData = this.$store.getters.getEnterprise;
      }
    },
    // 查询员工列表
    findEmployees(val) {
      if (val == "搜索") {
        this.Inquire.page = 1;
      }
      this.tableDataloading = true;
      var temp = JSON.stringify(this.Inquire);
      var body = JSON.parse(temp);

      if (
        this.timeframe &&
        Array.isArray(this.timeframe) &&
        this.timeframe.length > 1
      ) {
        console.log(this.timeframe);

        body.startTime = this.timeframe[0];
        body.endTime = this.timeframe[1];
      }
      this.$api
        .get("/employee/findEmployees", body)
        .then(res => {
          console.log(res.data);
          this.tableData = res.data.data;
          this.count = res.data.count;
          this.tableDataloading = false;
        })
        .catch(err => {
          console.log("err", err);
          this.tableDataloading = false;
        });
    },
    // 获取部门数据
    getBranch() {
      console.log(this.Inquire.company);
      if (this.Inquire.company == "全部") {
        this.branchData = ["全部"];
        this.Inquire.branch = "全部";
        this.Inquire.sign = "全部";
        this.singlist = ["全部"];
        return;
      }

      this.singload = true;
      this.branchDataloading = true;
      this.branchData = ["全部"];
      this.Inquire.branch = "全部";
      this.Inquire.sign = "全部";
      this.singlist = ["全部"];
      this.getsign();
      this.$api
        .get("/employee/getBranch", { company: this.Inquire.company })
        .then(res => {
          console.log(res.data);
          if (res.data.length != 0) {
            this.branchData = this.branchData.concat(res.data);
          }
          this.branchDataloading = false;
        })
        .catch(err => {
          console.log("err", err);
          // this.$message.error("该企业部门数据为空");
          this.branchDataloading = false;
        });
    },
    goEmployeeimport() {
      this.$router.push("/staffmanagement/employeeimport");
    },
    // 下载模板
    DownloadTemplate() {
      // console.log(
      //   this.$parent.$parent.$parent.weburl +
      //     "/film/web/downloadXlsx?xlsxName=EmployeeTemplate.xlsx"
      // );
      // window.open(
      //   this.$parent.$parent.$parent.weburl +
      //     "/film/web/downloadXlsx?xlsxName=EmployeeTemplate.xlsx"
      // );
      var xhr = new XMLHttpRequest();
      var str = "";
      // var str = "id=" + ticketId + "&status=" + status;
      xhr.open(
        "GET",
        this.$parent.$parent.$parent.weburl + "/manage/DownLoadFile?id=3",
        true
      ); //也可以使用POST方式，根据接口
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.responseType = "blob"; //返回类型blob
      xhr.onload = function() {
        //定义请求完成的处理函数
        if (this.status === 200) {
          var blob = this.response;
          if (blob.size > 0) {
            var reader = new FileReader();
            reader.readAsDataURL(blob); // 转换为base64，可以直接放入a标签href
            reader.onload = function(e) {
              // 转换完成，创建一个a标签用于下载
              var a = document.createElement("a");
              var newDate = new Date();
              a.download =
                "员工模板" + newDate.Format("yyyyMMddhhmmss") + ".xlsx";
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
    // 配置套餐---跳转传参
    configurationpackage(val, type) {
      if (val == "") {
        console.log("val空");
        this.$router.push("/staffmanagement/configurationpackage?type=" + "0");
      } else {
        console.log("val:", val, type);
        this.$router.push(
          "/staffmanagement/configurationpackage?type=" +
            type +
            "&userId=" +
            val.userId
        );
      }
    },
    // 审核员工提示
    ReviewStaff(val) {
      if (val == "批量") {
        this.isbatch = true;
        console.log("批量", this.isbatch);
        if (this.multipleSelection.length == 0) {
          this.$message.error("请先勾选员工");
          return;
        }
        var temp = [];
        for (let i = this.multipleSelection.length - 1; i >= 0; i--) {
          console.log(this.multipleSelection[i].auditStatus);
          if (this.multipleSelection[i].auditStatus != 1) {
            // this.multipleSelection.splice(i, 1);
            temp.push(i);
          }
        }
        if (this.multipleSelection.length == temp.length) {
          this.$message.error("无可操作数据");
          this.$refs.multipleTable.clearSelection();
          return;
        }
      }
      if (val != "批量") {
        console.log(val);
        this.isbatch = false;
        console.log("单个", this.isbatch);
      }
      console.log("打开弹窗");
      this.ReviewObj = val;
      this.ReviewDialog = true;
    },
    // 审核员工请求
    ReviewPost(bool) {
      if (this.isbatch) {
        console.log("批量操作");
        var tempArr = [];
        for (let i = 0; i < this.multipleSelection.length; i++) {
          tempArr.push({
            phone: this.multipleSelection[i].phone,
            status: bool
          });
        }
        console.log(tempArr);
        this.$api
          .post("/employee/upStaffManage", tempArr)
          .then(res => {
            console.log(res.data);
            this.$message({
              type: "success",
              message: "操作成功!"
            });
            this.ReviewDialog = false;
            // 查询员工列表
            this.findEmployees();
          })
          .catch(err => {
            console.log("err", err);
          });
      } else {
        console.log("单个操作");
        var arr = [
          {
            phone: this.ReviewObj.phone,
            status: bool
          }
        ];
        console.log(arr);
        this.$api
          .post("/employee/upStaffManage", arr)
          .then(res => {
            console.log(res.data);
            this.$message({
              type: "success",
              message: "操作成功!"
            });
            this.ReviewDialog = false;
            // 查询员工列表
            this.findEmployees();
          })
          .catch(err => {
            console.log("err", err);
          });
      }
    },
    // 删除提示
    DeleteStaff(row) {
      if (row == "") {
        if (this.multipleSelection.length == 0) {
          this.$message.error("请勾选需要删除的数据");
          return;
        }
      }
      this.$confirm("此操作将永久删除该员工, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          if (row == "") {
            this.BatchDeleteStaffPost();
          } else {
            this.DeleteStaffPost(row);
          }
        })
        .catch(() => {
          this.$refs.multipleTable.clearSelection();
          this.$message.info("已取消删除");
        });
    },
    // 删除请求
    DeleteStaffPost(row) {
      console.log("删除", row.phone);
      var tempArr = [row.userId];
      var empInfo = [{ userId: row.userId, company: row.company }];
      console.log("empInfo :", empInfo);
      this.$api
        .post("/employee/deleteEmployee", {
          UserIds: tempArr,
          empInfo: empInfo
        })
        .then(res => {
          console.log(res.data);
          // 查询员工列表
          if (this.tableData.length == 1 && this.Inquire.page > 1) {
            this.Inquire.page = this.Inquire.page - 1;
          }
          this.findEmployees();
          this.$message.success("删除成功!");
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    // 批量删除请求
    BatchDeleteStaffPost() {
      console.log("批量删除", this.multipleSelection);
      var tempArr = [];
      this.multipleSelection.map(item => {
        tempArr.push(item.userId);
      });
      var empInfo = [];
      this.multipleSelection.map(item => {
        empInfo.push({
          userId: item.userId,
          company: item.company
        });
      });
      console.log(tempArr);
      console.log(empInfo);
      this.$api
        .post("/employee/deleteEmployee", {
          UserIds: tempArr,
          empInfo: empInfo
        })
        .then(res => {
          this.$refs.multipleTable.clearSelection();
          console.log(res.data);
          this.Inquire.page = 1;
          // 查询员工列表
          this.findEmployees();
          this.$message.success("删除成功!");
        })
        .catch(err => {
          console.log("err", err);
        });
    },
    // 新建员工
    goCreateEmployee() {
      this.$router.push("/staffmanagement/newemployee");
    },
    // 编辑员工
    handleEdit(index, row) {
      console.log(index, row);
      this.$router.push("/staffmanagement/newemployee?userId=" + row.userId);
    },
    // 全选状态
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
    // 分页
    handleSizeChange(val) {
      this.Inquire.page = 1;
      this.Inquire.pageSize = val;
      this.findEmployees();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.Inquire.page = val;
      this.findEmployees();
      console.log(`当前页: ${val}`);
    },
    //批量导入员工数据
    importEmployee() {
      this.UploadForm.company = "";
      if (this.$store.getters.getRoleInfo.AccountType == "3") {
        this.UploadForm.company = this.$store.getters.getRoleInfo.AccountName;
      }
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
    // 导入请求
    confirmimport() {
      if (this.UploadForm.company == "") {
        this.$message.error("请选择企业名称");
        return;
      }
      if (this.goodXlsx.length == 0) {
        this.$message.error("请上传文件");
        return;
      }

      // console.log(this.goodXlsx);
      var temp = JSON.parse(JSON.stringify(this.goodXlsx));
      // for (let i = 0; i < temp.length; i++) {
      //   const element = temp[i];
      //   element.phone = JSON.stringify(element.phone);
      // }
      var body = {
        company: this.UploadForm.company,
        fileName: this.filename,
        bulkImport: temp
      };
      this.updataobj.isshow = true;
      this.updataobj.loadingtext = "上传员工数据至服务器，请耐心等待...";
      this.$api
        .post("/employee/excelAddEmployees", body)
        .then(res => {
          this.updataobj.isshow = false;
          console.log(res);
          this.$message.success("上传成功！");
          this.closeimport();
          // 查询员工列表
          this.findEmployees();
        })
        .catch(err => {
          this.updataobj.isshow = false;
          console.log("err", err);
          console.log(err.data);
          this.updataobj.errdata = err.data || [];
          if (this.updataobj.errdata.length > 0) {
            this.updataobj.errshow = true;
          } else {
            this.$message.error(err.msg);
          }
          // var str = "";
          // for (let i = 0; i < err.data.length; i++) {
          //   const element = err.data[i];
          //   str =
          //     str +
          //     element.Num +
          //     " " +
          //     element.identityRemarks +
          //     " " +
          //     element.phoneRemarks +
          //     " " +
          //     "<br/>";
          // }

          // this.$msgbox({
          //   title: "上传失败员工数据",
          //   dangerouslyUseHTMLString: true,
          //   message: str,
          //   type: "error"
          // });
          // this.$message({
          //   dangerouslyUseHTMLString: true,
          //   message: str,
          //   type: "error"
          // });
        });
    },
    importfxx(e) {
      let _this = this;
      _this.updataobj.isshow = true;
      _this.updataobj.loadingtext = "解析数据中，请耐心等待...";
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
        FileReader.prototype.readAsBinaryString = function(f) {
          var binary = "";
          var rABS = false; //是否将文件读取为二进制字符串
          var wb; //读取完成的数据
          var outdata;
          var reader = new FileReader();
          reader.onload = function(e) {
            var bytes = new Uint8Array(reader.result);
            var length = bytes.byteLength;
            for (var i = 0; i < length; i++) {
              binary += String.fromCharCode(bytes[i]);
            }
            var XLSX = require("xlsx");
            if (rABS) {
              wb = XLSX.read(btoa(fixdata(binary)), {
                //手动转化
                type: "base64"
              });
            } else {
              wb = XLSX.read(binary, {
                type: "binary"
              });
            }
            outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]); //outdata就是你想要的东西
            console.log("outdata", outdata);
            function getdateOfBirth(value1) {
              if (value1) {
                var y = value1.substring(6, 10);
                var m = value1.substring(10, 12);
                var d = value1.substring(12, 14);
                var days = y + "-" + m + "-" + d;
                return days;
              } else {
                var days = "";
                return days;
              }
            }
            function standardization(value1) {
              if (value1 && value1.length == 8) {
                var y = value1.substring(0, 4);
                var m = value1.substring(4, 6);
                var d = value1.substring(6, 8);
                var days = y + "-" + m + "-" + d;
                console.log(days);
                return days;
              } else {
                var days = "";
                return days;
              }
            }

            outdata.forEach(e => {
              var de = {
                id: e.序号,
                name: e.姓名 || "",
                sign: e.后台标记字段 || "",
                phone: e.手机号 || "",
                identity: e.证件号,
                sex: e.性别 || "",
                branch: e.部门 || "其他",
                marriage: e.婚否 || "",

                cardType:
                  e.证件类型 == "身份证"
                    ? "1"
                    : e.证件类型 == "港澳台通行证"
                    ? "2"
                    : e.证件类型 == "护照"
                    ? "3"
                    : "4",
                ageOfBirth:
                  e.证件类型 == "身份证"
                    ? getdateOfBirth(e.证件号)
                    : standardization(e.出生年月日) || ""
              };
              // console.log(de)
              if (
                de.id &&
                de.identity &&
                (de.cardType == "1" || de.cardType == "2" || de.cardType == "3")
              ) {
                // if (de.id && de.identity ){

                _this.goodXlsx.push(de);
                // console.log(de);
              } else {
                _this.badXlsx.push(de);
                // console.log(de);
              }
              _this.rightWord = true;
            });

            _this.updataobj.isshow = false;
            _this.updataobj.loadingtext = "";
          };
          reader.readAsArrayBuffer(f);
        };
        if (rABS) {
          reader.readAsArrayBuffer(f);
        } else {
          reader.readAsBinaryString(f);
        }
      }, 100);
    }
  },

  computed: {
    // 获取按钮权限信息
    Clickable() {
      var temp = this.$store.getters.getRoles("员工列表");
      console.log("vuex中获取按钮权限*****************");
      console.log("temp.rolesList", temp.rolesList);
      return temp.rolesList;
    },

    // 获取个人权限信息
    RoleInfo() {
      console.log("vuex中获取个人信息");
      console.log(this.$store.getters.getRoleInfo);
      return this.$store.getters.getRoleInfo;
    }
  }
};
</script>

<style lang="scss">
.box-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  .carbtn {
    position: absolute;
    bottom: 10px;
    right: 0%;
  }
}
.ygplcz {
  .el-dialog__body {
    padding: 10px 20px 20px 20px;
  }
}
.stafflist_UploadForm {
  margin: 0 30px;
  font-size: 15px;
}
.stafflist_ReviewDialog {
  .el-dialog__body {
    padding: 10px;
  }
}
.lineReview {
  height: 50px;
  border-bottom: 1px solid #dddddd;
  box-sizing: border-box;
}
</style>