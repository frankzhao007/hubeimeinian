<template>
  <div style="margin:20px">
    <!-- 企业参数配置 -->
    <div>
      <!-- 搜索栏 -->
      <div>
        <el-form :inline="true" :model="seekobj" label-position='right' label-width="120px" size="medium">
          <el-form-item label="企业名称：">
            <el-select v-model="seekobj.company" placeholder="请选择" style="width:200px" filterable>
              <el-option :label="item.Name" :value="item.Name" :key="item.ID" v-for="item in seekCompanylist"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="配置类型：">
            <el-select v-model="seekobj.confStatus" placeholder="请选择" style="width:200px">
              <el-option label="全部" value=""></el-option>
              <el-option label="全国单预约配置" value="1"></el-option>
              <el-option label="企业公告信息" value="2"></el-option>
              <el-option label="人工预约排期配置" value="3"></el-option>
              <el-option label="到店方式配置" value="4"></el-option>
              <el-option label="免费套餐Banner" value="5"></el-option>
              <el-option label="升级套餐Banner" value="6"></el-option>
              <el-option label="自费套餐Banner" value="7"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="配置状态：">
            <el-select v-model="seekobj.status" placeholder="请选择" style="width:200px">
              <el-option label="全部" value=""></el-option>
              <el-option label="有效" value="1"></el-option>
              <el-option label="已删除" value="2"></el-option>
              <el-option label="已失效" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="float:right">
            <el-button type="primary" icon="el-icon-search" @click="seekbtn()">搜 索</el-button>
            <el-button type="primary" icon="el-icon-plus" @click="newOption()">新增配置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 数据表格 -->
      <div>
        <el-table :data="tableobj.list" style="width: 100%" v-loading="tableobj.loading">
          <el-table-column prop="ActivityName" label="活动名称" show-overflow-tooltip min-width="150px"></el-table-column>
          <el-table-column prop="Company" label="企业名称" min-width="150px"></el-table-column>
          <el-table-column label="配置类型" min-width="140px">
            <template slot-scope="scope">
              {{ConfStatuschange(scope.row.ConfStatus)}}
            </template>
          </el-table-column>
          <el-table-column label="配置信息" min-width="90px">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="lookOption(scope.row)">查看</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="CreateDate" label="创建时间" min-width="160px"></el-table-column>
          <el-table-column label="活动周期" show-overflow-tooltip min-width="200px">
            <template slot-scope="scope">
              {{scope.row.StartTime}} 至 {{scope.row.EndTime}}
            </template>
          </el-table-column>
          <el-table-column prop="CreatedBy" label="操作人" min-width="100px" show-overflow-tooltip></el-table-column>
          <el-table-column prop="Status" label="配置状态" min-width="100px">
            <template slot-scope="scope">
              {{Statuschange(scope.row.Status)}}
            </template>
          </el-table-column>
          <el-table-column prop="date" label="操作" min-width="100px" fixed="right">
            <template slot-scope="scope">
              <div v-if="scope.row.Status==1">
                <el-button type="text" size="mini" @click="editOption(scope.row)">编辑</el-button>
                <el-button type="text" size="mini" @click="delOption(scope.row.Id)">删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div style="height:30px;margin-top:20px;">
          <el-pagination style="float:right" @size-change="tablesizechange" @current-change="tablepagechange" :current-page="seekobj.pageindex" :page-sizes="[10, 20, 30, 40]" :page-size="seekobj.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableobj.total">
          </el-pagination>
        </div>
      </div>

      <!-- 弹窗 -->
      <div>
        <!-- 新增/编辑弹窗 -->
        <div>
          <!-- 常用弹窗+穿梭框 -->
          <el-dialog title="企业配置" :visible.sync="popEnterpriseobj.isshow" width="500px">
            <div style="width:100%;max-height:500px;overflow:auto">
            <el-form :model="popEnterpriseobj" label-position='right' label-width="150px" size="medium">
              <el-form-item label="活动名称：">
                <el-input :disabled="popEnterpriseobj.isedit" v-model="popEnterpriseobj.ActivityName" maxlength="20" placeholder="请填写活动名称" style="width:200px"></el-input>
              </el-form-item>
              <el-form-item label="选择企业：">
                <el-select :disabled="popEnterpriseobj.isedit" v-model="popEnterpriseobj.CompanyId" placeholder="请选择企业" style="width:200px" filterable>
                  <el-option :label="item.Name" :value="item.ID" :key="item.ID" v-for="item in Companylist"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="配置类型：">
                <el-select :disabled="popEnterpriseobj.isedit" v-model="popEnterpriseobj.ConfStatus" placeholder="请选择" style="width:200px">
                  <el-option label="全国单预约配置" value="1"></el-option>
                  <el-option label="企业公告信息" value="2"></el-option>
                  <el-option label="人工预约排期配置" value="3"></el-option>
                  <el-option label="到店方式配置" value="4"></el-option>
                  <el-option label="免费套餐Banner" value="5"></el-option>
                  <el-option label="升级套餐Banner" value="6"></el-option>
                  <el-option label="自费套餐Banner" value="7"></el-option>
                </el-select>
              </el-form-item>
              <div  v-if="popEnterpriseobj.ConfStatus=='1'">
                <div v-for="(item,index) in secretKey" :key="index" >
                <div style="width:150px;float:left;text-align: right;line-height:36px">全国单密钥{{changToWord(index+1)}}</div>
                 <el-button :disabled="popEnterpriseobj.islook" type="primary" size="mini" style="float:right;margin-right:65px;margin-top: 4px;" @click="appDelete(index)">删除</el-button>
                <!-- <div style="width:150px;float:left;text-align: right;line-height:36px">全国单秘钥一</div> -->
              <div  style="width:100%;display: flex;justify-content: center;">
                <!-- <el-form-item label="Appkey：">
                  <el-input v-model="popEnterpriseobj.Appkey" :disabled="popEnterpriseobj.islook" placeholder="请输入APPkey" style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="Password：">
                  <el-input v-model="popEnterpriseobj.PassWord" :disabled="popEnterpriseobj.islook" placeholder="请输入Password" style="width:200px"></el-input>
                </el-form-item> -->

             
                <el-card style="width:320px" >
                  <div style="overflow:hidden;">
                    <div style="width:100px;float:left;text-align: right;line-height:32px">密钥名称：</div>
                     <el-input :disabled="popEnterpriseobj.islook" v-model="item.skname" maxlength="20" placeholder="请填写密钥名称" size="small" style="float:left;margin-left:10px;width:calc(100% - 110px);"></el-input>
                  </div> 
                  <div style="overflow:hidden;margin-top:10px">
                    <div style="width:100px;float:left;text-align: right;line-height:32px">Appkey：</div>
                     <el-input :disabled="popEnterpriseobj.islook" v-model="item.appkey" maxlength="50" placeholder="请填写Appkey" size="small" style="float:left;margin-left:10px;width:calc(100% - 110px);"></el-input>
                  </div> 
                  <div style="overflow:hidden;margin-top:10px">
                    <div style="width:100px;float:left;text-align: right;line-height:32px">Password：</div>
                     <el-input :disabled="popEnterpriseobj.islook" v-model="item.password" maxlength="50" placeholder="请填写Password" size="small" style="float:left;margin-left:10px;width:calc(100% - 110px);"></el-input>
                  </div> 
                  <div style="overflow:hidden;margin-top:10px">
                    <div style="width:100px;float:left;text-align: right;line-height:32px">支持套餐编码：</div>
                     <el-button type="primary" size="mini" style="float:left;margin-left:10px;" @click="lookcode(item)">查看详情</el-button>            
                  </div> 
                </el-card>
               </div>
               
               
              </div>
              <el-button :disabled="popEnterpriseobj.islook" type="primary" size="mini" style="float:left;margin-left:10px;" @click="appADD()">新增</el-button>
            </div>

              <div v-if="popEnterpriseobj.ConfStatus=='2'">
                <el-form-item label="公告文本：">
                  <el-input v-model="popEnterpriseobj.ActivityText" :disabled="popEnterpriseobj.islook" maxlength="200" type="textarea" placeholder="请输入公告内容，限制200个字" style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="活动链接：">
                  <el-input v-model="popEnterpriseobj.ActivityUrl" :disabled="popEnterpriseobj.islook" placeholder="请输入链接地址" style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="配置城市：">
                  <div v-if="selectCity.checkedCities.length>4">
                    <span>{{selectCity.checkedCities[0]}}</span>
                    <span>{{selectCity.checkedCities[1]}}</span>
                    <span>{{selectCity.checkedCities[2]}}</span>
                    <span>{{selectCity.checkedCities[3]}}</span> ...等{{selectCity.checkedCities.length}}个城市
                  </div>
                  <div v-else>
                    <span v-for="item in selectCity.checkedCities">
                      {{item}}
                    </span>
                  </div>
                  <el-button type="primary" :disabled="popEnterpriseobj.islook" icon="el-icon-plus" size="mini" @click="selectCityBtn"></el-button><span style="color:#C0C4CC;margin-left:10px">多选非必填</span>
                </el-form-item>
              </div>
              <div v-if="popEnterpriseobj.ConfStatus=='3'">
                <el-form-item label="排期设置：">
                  <el-button type="primary" v-if="!popEnterpriseobj.isedit" disabled size="mini">创建活动后编辑</el-button>
                  <el-button type="primary" :disabled="popEnterpriseobj.islook" v-else size="mini" @click="openAppointmentConfs()">编辑人工排期</el-button>
                </el-form-item>
                <el-form-item label="提前可预约天数：">
                  <el-input v-model="popEnterpriseobj.AppointmentDays" @input="AppointmentDaysinput" :disabled="popEnterpriseobj.islook" placeholder="输入0-30，默认为2" style="width:200px"></el-input>
                </el-form-item>
              </div>
              <div v-if="popEnterpriseobj.ConfStatus=='4'">
                <el-form-item label="配置城市：">
                  <div v-if="selectCity.checkedCities.length>4">
                    <span>{{selectCity.checkedCities[0]}}</span>
                    <span>{{selectCity.checkedCities[1]}}</span>
                    <span>{{selectCity.checkedCities[2]}}</span>
                    <span>{{selectCity.checkedCities[3]}}</span> ...等{{selectCity.checkedCities.length}}个城市
                  </div>
                  <div v-else>
                    <span v-for="item in selectCity.checkedCities">
                      {{item}}
                    </span>
                  </div>
                  <el-button type="primary" :disabled="popEnterpriseobj.islook" icon="el-icon-plus" size="mini" @click="selectCityBtn"></el-button><span style="color:#C0C4CC;margin-left:10px">多选非必填</span>
                </el-form-item>
                <el-form-item label="配置门店：">
                  <!-- selectShop.confirmshopList -->
                  <div v-if="selectShop.confirmshopList.length>4">
                    <span>{{selectShop.confirmshopList[0].CenterName}}</span>
                    <span>{{selectShop.confirmshopList[1].CenterName}}</span>
                    <span>{{selectShop.confirmshopList[2].CenterName}}</span>
                    <span>{{selectShop.confirmshopList[3].CenterName}}</span> ...等{{selectShop.confirmshopList.length}}个城市
                  </div>
                  <div v-else>
                    <span v-for="item in selectShop.confirmshopList">
                      {{item.CenterName}}
                    </span>
                  </div>
                  <el-button type="primary" :disabled="popEnterpriseobj.islook" icon="el-icon-plus" size="mini" @click="selectShopBtn"></el-button><span style="color:#C0C4CC;margin-left:10px">多选非必填</span>
                </el-form-item>
                <el-form-item label="配置日期：">
                  <div>
                    <div v-if="ConfigureDateobj.confirmselectdateArr.length>2">
                      <div>{{ConfigureDateobj.confirmselectdateArr[0].date}}</div>
                      <div>{{ConfigureDateobj.confirmselectdateArr[1].date}} ...等{{ConfigureDateobj.confirmselectdateArr.length}}个日期</div>

                    </div>
                    <div v-else>
                      <div v-for="item in ConfigureDateobj.confirmselectdateArr">
                        {{item.date}}
                      </div>
                    </div>
                  </div>
                  <el-button type="primary" :disabled="popEnterpriseobj.islook" icon="el-icon-plus" size="mini" @click="ConfigureDate"></el-button><span style="color:#C0C4CC;margin-left:10px">多选非必填</span>
                </el-form-item>
              </div>
              <div v-if="popEnterpriseobj.ConfStatus=='5'||popEnterpriseobj.ConfStatus=='6'||popEnterpriseobj.ConfStatus=='7'">
                <el-form-item :label="bannerchange(popEnterpriseobj.ConfStatus)" style="margin-right:80px">
                  <!-- <img :src="popEnterpriseobj.banner" alt="" @click="selectbannerimg" style="width:100%"> -->
                  <el-button v-if="popEnterpriseobj.banner==''" type="primary" :disabled="popEnterpriseobj.islook" icon="el-icon-plus" size="mini" @click="selectbannerimg"></el-button>
                  <el-image v-else style="width: 180px;" :src="popEnterpriseobj.banner" :preview-src-list="[popEnterpriseobj.banner]">
                  </el-image>
                  <el-button v-if="popEnterpriseobj.banner!=''" :disabled="popEnterpriseobj.islook" @click="popEnterpriseobj.banner=''" style="float:right" type="danger" icon="el-icon-delete" circle></el-button>
                </el-form-item>
                <el-form-item label="跳转链接：">
                  <el-input v-model="popEnterpriseobj.ActivityUrl" :disabled="popEnterpriseobj.islook" placeholder="请输入链接地址" style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="配置城市：">
                  <div v-if="selectCity.checkedCities.length>4">
                    <span>{{selectCity.checkedCities[0]}}</span>
                    <span>{{selectCity.checkedCities[1]}}</span>
                    <span>{{selectCity.checkedCities[2]}}</span>
                    <span>{{selectCity.checkedCities[3]}}</span> ...等{{selectCity.checkedCities.length}}个城市
                  </div>
                  <div v-else>
                    <span v-for="item in selectCity.checkedCities">
                      {{item}}
                    </span>
                  </div>
                  <el-button type="primary" :disabled="popEnterpriseobj.islook" icon="el-icon-plus" size="mini" @click="selectCityBtn"></el-button><span style="color:#C0C4CC;margin-left:10px">多选非必填</span>
                </el-form-item>
              </div>

              <el-form-item label="开始时间：" v-if="popEnterpriseobj.ConfStatus!='1'">
                <el-date-picker :disabled="popEnterpriseobj.isedit&&popEnterpriseobj.ConfStatus!='3'" :picker-options="pickerOptions" v-model="popEnterpriseobj.StartTime" value-format="yyyy-MM-dd" type="date" style="width:200px" placeholder="选择日期时间">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="结束时间：" v-if="popEnterpriseobj.ConfStatus!='1'">
                <el-date-picker :disabled="popEnterpriseobj.isedit&&popEnterpriseobj.ConfStatus!='3'" :picker-options="pickerOptions1" v-model="popEnterpriseobj.EndTime" value-format="yyyy-MM-dd" type="date" style="width:200px" placeholder="选择日期时间">
                </el-date-picker>
              </el-form-item>
              
            </el-form>
            <!-- 配置人工排期 -->
            <el-dialog width="1000px" title="人工排期" :visible.sync="popEnterpriseobj.isshow1" append-to-body>
              <el-form :inline="true" :model="popEnterpriseobj" label-position='right' label-width="120px" size="medium">
                <el-form-item label="门店名称：">
                  <el-input v-model="popEnterpriseobj.artificialobj.centerName" placeholder="请填写" style="width:200px"></el-input>
                </el-form-item>
                <el-form-item label="预约日期">
                  <el-date-picker v-model="popEnterpriseobj.artificialobj.scheduleDate" value-format="yyyy-MM-dd" style="width:200px" type="date" placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item style="float:right">
                  <el-button type="primary" @click="seekbtn1">搜 索</el-button>
                </el-form-item>
                <el-form-item style="float:right">
                  <el-button @click="exportexcel()">导出预约排期表</el-button>
                  <el-button type="primary" @click="importexcel()" :loading="popEnterpriseobj.loadingbtn">导入预约排期表</el-button>
                </el-form-item>
              </el-form>
              <div style="margin-top:30px">
                <!-- 数据表格 -->
                <div>
                  <el-table :data="popEnterpriseobj.AppointmentConf" style="width: 100%" v-loading="popEnterpriseobj.artificialobj.loading">
                    <el-table-column prop="CenterName" label="门店编码/名称" min-width="200px" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="scheduleDate" label="预约日期" min-width="100px"></el-table-column>
                    <el-table-column prop="personCount" label="总预约数量" min-width="100px"></el-table-column>
                    <el-table-column prop="AlreadyAppointment" label="已预约数量" min-width="100px"></el-table-column>
                    <el-table-column prop="SurplusAppointment" label="剩余可约数量" min-width="100px"></el-table-column>
                    <el-table-column label="操作" min-width="120px">
                      <template slot-scope="scope">
                        <el-button type="text" size="mini" @click="delAppointmentConf(scope.row.AppId)">删除</el-button>
                        <el-button type="text" size="mini" @click="openupdateConfNum(scope.row)">修改总预约数量</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div style="height:30px;margin-top:20px;">
                    <el-pagination style="float:right" @size-change="tablesizechange1" @current-change="tablepagechange1" :current-page="popEnterpriseobj.artificialobj.pageindex" :page-sizes="[10, 20, 30, 40]" :page-size="popEnterpriseobj.artificialobj.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="popEnterpriseobj.artificialobj.total">
                    </el-pagination>
                  </div>
                </div>
              </div>

              <el-dialog width="600px" title="修改预约数量" :visible.sync="popEnterpriseobj.isshow2" append-to-body>
                <div><span>当前总预约数量：{{popEnterpriseobj.updateConfNumobj.personCount}}</span></div>
                <div><span>修改总预约数量：</span>
                  <el-input style="width:200px;margin-top:20px" v-model="popEnterpriseobj.changeupdatePersonCount" placeholder="请输入整数0-10000"></el-input>
                </div>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="popEnterpriseobj.isshow2 = false">取 消</el-button>
                  <el-button type="primary" @click="updateEnterParamConfNum()">确 定</el-button>
                </div>
              </el-dialog>

              <div slot="footer" class="dialog-footer">
                <el-button @click="popEnterpriseobj.isshow1 = false">取 消</el-button>
                <el-button type="primary" @click="popEnterpriseobj.isshow1 = false">确 定</el-button>
              </div>
            </el-dialog>

            <!-- 选择城市弹窗 -->
            <el-dialog title="配置城市" :visible.sync='selectCity.isshow' width="800px" append-to-body>
              <div style="height:500px;overflow: auto">
                <div style="margin:10px 0px">
                  <!-- <el-checkbox v-model="selectCity.nationwide" label="全国" @change="citynationwide"></el-checkbox> -->
                  <el-checkbox :disabled="selectCity.nationwide" v-model="selectCity.allcity" label="全选" @change="cityidAll"></el-checkbox>
                </div>
                <div v-for="(city,index) in selectCity.cities" :key="city._id._id" style="margin:15px 0 0 0">
                  <div class="mycheckbox">
                    <el-checkbox :disabled="selectCity.nationwide" v-model="city._id.checked" :indeterminate="city._id.indeterminate" :label="city._id._id" @change="cityidAllselect(index)"></el-checkbox>
                  </div>
                  <div>
                    <el-checkbox style="min-width:120px;margin:5px 0 0 0" :disabled="selectCity.nationwide" v-model="item.checked" v-for="item in city.citynames" :label="item.city" :key="item.city" @change="handleCheckedCitiesChange(city.citynames,index)"></el-checkbox>
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
              <el-dialog title="配置门店" :visible.sync='selectShop.isshow' width="800px" append-to-body>
                <div class="mytransfer">
                  <el-transfer v-loading="selectShop.loading" :titles="['未选门店', '已选门店']" v-model="selectShop.selecshopList" filterable filter-placeholder="请输入" :data="selectShop.shopList"></el-transfer>
                </div>

                <span slot="footer" class="dialog-footer">
                  <el-button @click="selectShop.isshow = false">取 消</el-button>
                  <el-button type="primary" @click="confirmshopBtn()">确 定</el-button>
                </span>
              </el-dialog>
            </div>

            <!-- 配置日期 -->
            <div v-if="ConfigureDateobj.isshow">
              <el-dialog title="配置日期" :visible.sync="ConfigureDateobj.isshow" width="800px" append-to-body>
                <calendar :date="ConfigureDateobj.date" :selectdatetemp="ConfigureDateobj.confirmselectdateArr" @selectdate="listselectdate"></calendar>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="ConfigureDateobj.isshow = false">取 消</el-button>
                  <el-button type="primary" @click="confirmselectdatebtn">确 定</el-button>
                </div>
              </el-dialog>

            </div>
</div>

            <div slot="footer" class="dialog-footer">
              <el-button @click="popEnterpriseobj.isshow = false">取 消</el-button>
              <el-button type="primary" :disabled="popEnterpriseobj.islook" @click="neworeditOption()">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
    </div>

    <input id="upload" style="display:none" type="file" ref="excel" @change="importfxx(this)" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel">
    <input style="display:none" type="file" id="imgTest" ref='imgTest' @change="imgChange" accept=".gif, .jpg, .jpeg, .png">
  </div>
</template>
<script>
import calendar from "./components/calendar";
export default {
  components: {
    calendar
  },
  data() {
    return {
    	 
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      seekCompanylist: [],
      Companylist: [],
      seekobj: {
        company: "全部",
        confStatus: "",
        status: "",
        pageindex: 1,
        pagesize: 10
      },
      tableobj: {
        list: [],
        loading: false,
        total: 0
      },
      popEnterpriseobj: {
        AppointmentDays: 2, //提前可预约天数
        loadingbtn: false, //导入按钮loading
        islook: false, //是否为查看
        isedit: false, //是否为编辑
        isshow: false, //新增或编辑弹窗
        isshow1: false, //人工排期弹窗
        isshow2: false, //修改可预约排期弹窗
        CompanyId: "", //企业id
        Company: "", //企业名称
        Appkey: "",
        PassWord: "",

        ActivityUrl: "", //活动url
        ActivityText: "", //活动文本
        ActivityName: "", //活动名称

        AppointmentConf: [], //预约排期配置
        ConfStatus: "1", //1.全国XX 2. 企业公告 3.预约排期
        StartTime: "", //活动开始时间
        EndTime: "", //活动结束时间

        // Citylist: [], //配置城市
        // Shoplist: [], //配置门店
        // Timelist: [], //配置时间
        banner: "",

        artificialobj: {
          pqlist: [],
          loading: false,
          centerName: "",
          scheduleDate: "",
          pageindex: 1,
          pagesize: 10,
          total: 0
        },
        updateConfNumobj: "",
        changeupdatePersonCount: ""
      },

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
        shopList: [], //门店列表
        shopCount: 0, //体检项目总数
        shoppageSize: 10, //每页条数
        shopcurrentPage: 1, //当前页
        selecshopList: [],
        confirmshopList: [],
        centerName: "",
        selectcityseek: "",
        loading: false
      },
      ConfigureDateobj: {
        isshow: false,
        date: "",
        selectdateArr: [],
        confirmselectdateArr: []
      },
      secretKey:[{ 
        skname:'',
        appkey:'',
        password:''
      }],
    };
  },
  watch: {},
  mounted() {
  	console.log(this.$route.query)
  	if(this.$route.query.secretKey){
  		var secretKey=this.$route.query.secretKey
  	  var secretKeyParse=JSON.parse(secretKey)
  	  this.secretKey=secretKeyParse
  	  console.log(secretKeyParse)
  	}
  	console.log(this.$route.query.judgeMsg)
  	if(this.$route.query.judgeMsg){
  		var judgeMsg=this.$route.query.judgeMsg
  		var judgeMsgParse=JSON.parse(judgeMsg)
  		
  		this.popEnterpriseobj.islook=judgeMsgParse.islook
  		this.popEnterpriseobj.isedit=judgeMsgParse.isedit
  		this.popEnterpriseobj.isshow=judgeMsgParse.isshow
		this.popEnterpriseobj.ActivityName=judgeMsgParse.ActivityName
		this.popEnterpriseobj.CompanyId=judgeMsgParse.CompanyId
		this.popEnterpriseobj.ConfStatus=judgeMsgParse.ConfStatus
  		
  		 
  
  		console.log(judgeMsgParse)
  	}
  	
//	this.judgeMsg.secretKey=secretKeyParse
//	this.judgeMsg.islook=judgeMsgParse.islook
//	this.judgeMsg.isedit=judgeMsgParse.isedit 
//	this.judgeMsg.isshow=judgeMsgParse.isshow
//	console.log(this.judgeMsg)
  	
  	
    this.getCompanylist();
    this.getseekCompanylist();
    this.findEnterParamConfs();
  },
  created() {
    this.setpagemsg();
  },
  beforeDestroy() {
    this.copypagemsg();
  },
  methods: {
  	appADD(){
  		
  		this.secretKey.push({
  			skname:'',
        appkey:'',
        password:''
  			
  		})
  		
  	},
  	appDelete(e){
  		console.log(e)
  		this.secretKey.splice(e,1)
  		console.log(this.secretKey)
  		
  		
  		
  	},
  	
  	changToWord(section) {
                var chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
                var chnUnitSection = ["", "万",  "亿", "万亿", "亿亿"];
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
                        var str1=chnStr.substr(1,chnStr.length)
                        
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
    AppointmentDaysinput() {
      this.popEnterpriseobj.AppointmentDays = this.popEnterpriseobj.AppointmentDays.replace(
        /[^\.\d]/g,
        ""
      );
      this.popEnterpriseobj.AppointmentDays = this.popEnterpriseobj.AppointmentDays.replace(
        ".",
        ""
      );
    },
    selectbannerimg() {
      console.log(this.$refs);
      this.$refs.imgTest.value = ""; //清空上一次的数据
      document.getElementById("imgTest").click();
    },
    imgChange(e) {
      console.log(e);
      var that = this;
      var evn = e;
      console.log(e.target.files);
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
        // console.log(e.target.result); //转换后的文件数据存储在e.target.result中
        imgobj.imgContent = e.target.result;
        console.log(imgobj);
        that.popEnterpriseobj.banner = imgobj.imgContent;
      };
    },
    bannerchange(val) {
      switch (val) {
        case "5":
          return "免费套餐banner：";
          break;
        case "6":
          return "升级套餐banner：";
          break;
        case "7":
          return "自费套餐banner：";
          break;

        default:
          break;
      }
    },
    listselectdate(date) {
      console.log(date);
      this.ConfigureDateobj.selectdateArr = date;
      console.log(this.ConfigureDateobj.selectdateArr);
      console.log(this.ConfigureDateobj.confirmselectdateArr);
    },
    confirmselectdatebtn() {
      this.ConfigureDateobj.confirmselectdateArr = this.ConfigureDateobj.selectdateArr;
      this.ConfigureDateobj.isshow = false;
    },
    ConfigureDate() {
      this.ConfigureDateobj.date = new Date();
      this.ConfigureDateobj.isshow = true;
      console.log(this.ConfigureDateobj.date);
    },
    //确认选择的门店Btn
    confirmshopBtn() {
      if (this.selectShop.addshop) {
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
          cityNames: this.selectCity.checkedCities
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
          .then(res => {
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
            this.selectShop.confirmshopList.map(item => {
              this.selectShop.selecshopList.push(item.Id);
            });
            this.selectShop.loading = false;
          });
      } else {
        this.selectShop.loading = false;
        this.$message.error("请先选择城市！");
      }
    },
    //确认选择城市
    confirmSelectCity() {
      this.selectShop.confirmshopList = [];
      if (this.selectCity.nationwide) {
        this.selectCity.checkedCities = ["全国"];
        this.selectCity.isshow = false;
      } else {
        this.selectCity.checkedCities = [];
        this.selectCity.cities.map(item => {
          item.citynames.map(temp => {
            if (temp.checked) {
              this.selectCity.checkedCities.push(temp.city);
            }
          });
        });
        console.log(this.selectCity.checkedCities);
        this.selectCity.isshow = false;
      }
    },
    //全国
    citynationwide(val) {
      console.log(val);
      this.selectCity.allcity = false;
      this.cityidAll(this.selectCity.allcity);
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
    //城市勾选按钮事件
    handleCheckedCitiesChange(city_id, index) {
      console.log(city_id);

      var num = 0;
      city_id.map(temp => {
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
    //选择城市按钮
    selectCityBtn() {
      console.log(this.selectCity.checkedCities);
      this.selectCity.allcity = false;
      this.selectCity.cities = [];
      this.selectCity.isshow = true;
      this.$api.get("/city/pullCityByProvince").then(res => {
        console.log(res);
        if (res.code == "200") {
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
    //保存数据
    copypagemsg() {
      var body = {
        company: this.seekobj.company,
        confStatus: this.seekobj.confStatus,
        status: this.seekobj.status,
        pageindex: this.seekobj.pageindex,
        pagesize: this.seekobj.pagesize
      };
      this.$store.commit("setEnterpriseOption", body);
    },
    //赋值页面数据
    setpagemsg() {
      var body = this.$store.getters.getEnterpriseOption;
      this.seekobj.company = body.company || "全部";
      this.seekobj.confStatus = body.confStatus || "";
      this.seekobj.status = body.status || "";
      this.seekobj.pageindex = body.pageindex || 1;
      this.seekobj.pagesize = body.pagesize || 10;
      console.log(this.$store.getters.getEnterpriseOption);
    },
    updateEnterParamConfNum() {
      console.log(this.popEnterpriseobj.updateConfNumobj);
      if (
        !this.popEnterpriseobj.changeupdatePersonCount ||
        this.popEnterpriseobj.changeupdatePersonCount == ""
      ) {
        this.$message.error("请输入可预约数量！");
        return;
      }
      this.$api
        .post("/enterParam/updateEnterParamConfNum", {
          Id: this.popEnterpriseobj.Id,
          AppId: this.popEnterpriseobj.updateConfNumobj.AppId,
          // LocalCenterCode: this.popEnterpriseobj.updateConfNumobj.CenterName.split(
          //   "-"
          // )[0],
          PersonCount: Number(this.popEnterpriseobj.changeupdatePersonCount)
        })
        .then(res => {
          console.log(res);
          this.findAppointmentConfs();
          this.popEnterpriseobj.isshow2 = false;
        })
        .catch(err => {
          this.$message.error(err.msg);
        });
    },
    openupdateConfNum(row) {
      this.popEnterpriseobj.isshow2 = true;
      this.popEnterpriseobj.updateConfNumobj = row;
      this.popEnterpriseobj.changeupdatePersonCount = "";
    },
    tablesizechange(val) {
      this.seekobj.pageindex = 1;
      this.seekobj.pagesize = val;
      this.findEnterParamConfs();
    },
    tablepagechange(val) {
      this.seekobj.pageindex = val;
      this.findEnterParamConfs();
    },
    tablesizechange1(val) {
      this.popEnterpriseobj.artificialobj.pageindex = 1;
      this.popEnterpriseobj.artificialobj.pagesize = val;
      this.findAppointmentConfs();
    },
    tablepagechange1(val) {
      this.popEnterpriseobj.artificialobj.pageindex = val;
      this.findAppointmentConfs();
    },
    exportexcel() {
      this.findAppointmentConfs("1");
    },
    importexcel() {
      this.$refs.excel.value = ""; //清空上一次的数据
      document.getElementById("upload").click();
    },
    dataParse(date) {
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
    getNowFormatDate1(date) {
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
    importfxx(obj) {
      this.popEnterpriseobj.loadingbtn = true;
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
          console.log(wb.Sheets[wb.SheetNames[0]]);

          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]); //outdata就是你想要的东西
          console.log(outdata);
          if (Array.isArray(outdata) && outdata.length > 0) {
          } else {
            _this.popEnterpriseobj.loadingbtn = false;
            _this.$message.error("请导入正确的门店预约数据");
            return;
          }
          // outdata.map(item=>{
          //   let
          // }
          // )
          let keylist = Object.getOwnPropertyNames(outdata[0]);
          if (
            keylist.indexOf("门店编码") < 0 ||
            keylist.indexOf("预约日期") < 0 ||
            keylist.indexOf("预约数量") < 0
          ) {
            _this.popEnterpriseobj.loadingbtn = false;
            _this.$message.error(
              "请导入正确的门店预约数据，'门店编码'、'预约日期'、'预约数量'"
            );
            return;
          }

          //  console.log( );
          let AppointmentConf = [];
          outdata.forEach((item, key) => {
            let obj = {
              LocalCenterCode: String(item.门店编码),
              ScheduleDate: _this.getNowFormatDate1(
                _this.dataParse(item.预约日期)
              ),
              PersonCount: item.预约数量
            };
            AppointmentConf.push(obj);
          });
          console.log(AppointmentConf);
          console.log(_this.popEnterpriseobj);

          _this.$api
            .post("/enterParam/insertEnterParamConf", {
              Company: _this.popEnterpriseobj.Company,
              CompanyId: _this.popEnterpriseobj.CompanyId,
              Id: _this.popEnterpriseobj.Id,
              AppointmentConf: AppointmentConf,
              AppointmentDays: Number(_this.popEnterpriseobj.AppointmentDays),
              ConfStatus: "3"
            })
            .then(res => {
              console.log(res);
              _this.popEnterpriseobj.loadingbtn = false;
              _this.findAppointmentConfs();
              _this.$message({
                message: "导入成功！",
                type: "success"
              });
            })
            .catch(err => {
              _this.popEnterpriseobj.loadingbtn = false;
              console.log(err);
              _this.$message.error(err.msg);
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
    openAppointmentConfs() {
      this.popEnterpriseobj.isshow1 = true;
      this.findAppointmentConfs();
    },
    delAppointmentConf(Id) {
      this.$confirm("此操作将删除该门店, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api
            .post("/enterParam/delAppointmentConf", {
              Id: this.popEnterpriseobj.Id,
              Ids: [Id]
            })
            .then(res => {
              if (res.code == 200) {
                this.$message.success("删除成功");
                this.findAppointmentConfs();
              }
            })
            .catch(res => {
              this.$message.error(res.msg);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    seekbtn1() {
      this.popEnterpriseobj.artificialobj.pageindex = 1;
      this.findAppointmentConfs();
    },
    //002-查询企业下的预约排期配置
    findAppointmentConfs(isExcel) {
      this.$api
        .get("/enterParam/findAppointmentConfs", {
          id: this.popEnterpriseobj.Id,
          centerName: this.popEnterpriseobj.artificialobj.centerName,
          scheduleDate: this.popEnterpriseobj.artificialobj.scheduleDate,
          page: this.popEnterpriseobj.artificialobj.pageindex,
          pageSize: this.popEnterpriseobj.artificialobj.pagesize,
          isExcel: isExcel
        })
        .then(res => {
          console.log(res);
          if (isExcel == "1") {
            let a = document.createElement("a");
            // console.log(require("../assets/qrcode.png"));
            a.href = this.$parent.$parent.$parent.weburl + res.data.url; // href链接指向图片的地址
            a.download = this.$parent.$parent.$parent.weburl + res.data.url; // 下载的图片的名称
            a.click(); // 触发a标签的单击事件
          } else {
            this.popEnterpriseobj.artificialobj.total = res.data.count;
            this.popEnterpriseobj.AppointmentConf = res.data.data;
          }
        })
        .catch(err => {
          this.$message.error(err);
        });
    },

    delOption(Id) {
      this.$confirm("删除后不可恢复，请确认后操作！", "删除确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api
            .post("/enterParam/updateEnterParamConfStatus", {
              Ids: [Id]
            })
            .then(res => {
              console.log(res);
              if (res.code == 200) {
                this.findEnterParamConfs();
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    ConfStatuschange(val) {
      switch (val) {
        case "1":
          return "全国单预约配置";
          break;
        case "2":
          return "企业公告信息";
          break;
        case "3":
          return "人工预约排期配置";
          break;
        case "4":
          return "到店方式配置";
          break;
        case "5":
          return "免费套餐Banner";
          break;
        case "6":
          return "升级套餐Banner";
          break;
        case "7":
          return "自费套餐Banner";
          break;

        default:
          break;
      }
    },
    Statuschange(val) {
      switch (val) {
        case "1":
          return "有效";
          break;
        case "2":
          return "已删除";
          break;
        case "3":
          return "已失效";
          break;

        default:
          break;
      }
    },
    getCompanylist() {
      this.Companylist = [];
      this.$api
        .get("/account/pullOrg2", {
          AccountType: "0",
          AccountName: "运营"
        })
        .then(res => {
          console.log(res);

          res.data.map(item => {
            if (item.AccountType == "3") {
              item.Name.map((temp, index) => {
                let obj = {
                  Name: temp,
                  ID: item.ID[index]
                };
                this.Companylist.push(obj);
              });
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    getseekCompanylist() {
      this.seekCompanylist = [
        {
          Name: "全部",
          ID: ""
        }
      ];
      this.$api
        .get("/account/pullOrg2", {
          AccountType: "0",
          AccountName: "运营"
        })
        .then(res => {
          console.log(res);
          res.data.map(item => {
            if (item.AccountType == "3") {
              item.Name.map((temp, index) => {
                let obj = {
                  Name: temp,
                  ID: item.ID[index]
                };
                this.seekCompanylist.push(obj);
              });
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    inputvalidation() {
      if (
        !this.popEnterpriseobj.ActivityName ||
        this.popEnterpriseobj.ActivityName.trim() == ""
      ) {
        this.$message.error("请输入活动名称！");
        return false;
      }
      if (
        !this.popEnterpriseobj.CompanyId ||
        this.popEnterpriseobj.CompanyId == ""
      ) {
        this.$message.error("请选择企业！");
        return false;
      }
      console.log(this.popEnterpriseobj.ConfStatus)
      if (this.popEnterpriseobj.ConfStatus == "1") {
      	console.log(this.secretKey)  
      	if(this.secretKey.length>0){
      		
      		for (var i=0;i<this.secretKey.length;i++) {
      				if(!this.secretKey[i].skname||this.secretKey[i].skname.trim() == ""){
      		 		console.log(this.secretKey)
      		 		console.log(11111111111111)
      		 		this.$message.error("请输入全国单密钥"+this.changToWord(i+1)+"密钥名称");
              return false;
      		 	}
      		 	if(!this.secretKey[i].appkey||this.secretKey[i].appkey.trim() == ""){
      		 		this.$message.error("请输入全国单密钥"+this.changToWord(i+1)+"appkey");
              return false;
      		 	}
      		 	if(!this.secretKey[i].password||this.secretKey[i].password.trim() == ""){
      		 		this.$message.error("请输入全国单密钥"+this.changToWord(i+1)+"密码");
              return false;
      		 	}
      		}
      		
      		
      		
//    		 this.secretKey.map((item,index)=>{
//    		 	console.log(this.secretKey)
//    		 	if(!item.skname||this.popEnterpriseobj.ActivityText.trim() == ""){
//    		 		console.log(this.secretKey)
//    		 		console.log(11111111111111)
//    		 		this.$message.error("请输入全国单密钥"+this.changToWord(index+1)+"密钥名称");
//            return false;
//    		 	}
//    		 	if(!item.appkey||this.popEnterpriseobj.ActivityText.trim() == ""){
//    		 		this.$message.error("请输入全国单密钥"+this.changToWord(index+1)+"appkey");
//            return false;
//    		 	}
//    		 	if(!item.password||this.popEnterpriseobj.ActivityText.trim() == ""){
//    		 		this.$message.error("请输入全国单密钥"+this.changToWord(index+1)+"密码");
//            return false;
//    		 	}
//    		 	
//    		 	
//    		 })
      	}
//      if (
//        !this.popEnterpriseobj.Appkey ||
//        this.popEnterpriseobj.Appkey.trim() == ""
//      ) {
//        this.$message.error("请输入Appkey！");
//        return false;
//      }
//      if (
//        !this.popEnterpriseobj.PassWord ||
//        this.popEnterpriseobj.PassWord.trim() == ""
//      ) {
//        this.$message.error("请输入PassWord！");
//        return false;
//      }
      }
      if (this.popEnterpriseobj.ConfStatus == "2") {
        if (
          !this.popEnterpriseobj.ActivityText ||
          this.popEnterpriseobj.ActivityText.trim() == ""
        ) {
          this.$message.error("请输入公告文本！");
          return false;
        }
      }
      if (this.popEnterpriseobj.ConfStatus == "3") {
        if (
          Number(this.popEnterpriseobj.AppointmentDays) < 0 ||
          Number(this.popEnterpriseobj.AppointmentDays) > 30
        ) {
          this.$message.error("提前可预约天数范围0~30，请重新输入！");
          return false;
        }
      }
      if (
        this.popEnterpriseobj.ConfStatus == "5" ||
        this.popEnterpriseobj.ConfStatus == "6" ||
        this.popEnterpriseobj.ConfStatus == "7"
      ) {
        if (
          !this.popEnterpriseobj.banner ||
          this.popEnterpriseobj.banner == ""
        ) {
          this.$message.error("请上传banner图片");
          return false;
        }
      }
    if(!this.popEnterpriseobj.ConfStatus == "1"){
    	 if (
        !this.popEnterpriseobj.StartTime ||
        this.popEnterpriseobj.StartTime == ""
      ) {
        this.$message.error("请选择开始时间！");
        return false;
      }
      if (
        !this.popEnterpriseobj.EndTime ||
        this.popEnterpriseobj.EndTime == ""
      ) {
        this.$message.error("请选择结束时间！");
        return false;
      }
      if (
        Number(new Date(this.popEnterpriseobj.StartTime)) >
        Number(new Date(this.popEnterpriseobj.EndTime))
      ) {
        this.$message.error("开始时间不可大于结束时间");
        return false;
      }
    	
    }

     
      return true;
    },
    neworeditOption() {
//  	console.log(this.inputvalidation())
      if (this.inputvalidation()) {
        var body = {
          CompanyId: this.popEnterpriseobj.CompanyId,
          StartTime: this.popEnterpriseobj.StartTime,
          EndTime: this.popEnterpriseobj.EndTime,
          ConfStatus: this.popEnterpriseobj.ConfStatus,
          ActivityName: this.popEnterpriseobj.ActivityName.trim()
        };
        this.Companylist.map(item => {
          if (item.ID == body.CompanyId) {
            body.Company = item.Name;
          }
        });
        if (body.ConfStatus == "1") {
        	
        	console.log(this.secretKey)
        	body.secretkeys=this.secretKey
//        body.Appkey = this.popEnterpriseobj.Appkey.trim();
//        body.PassWord = this.popEnterpriseobj.PassWord.trim();
        }
        if (body.ConfStatus == "2") {
          body.ActivityText = this.popEnterpriseobj.ActivityText.trim();
          body.ActivityUrl = this.popEnterpriseobj.ActivityUrl.trim();
          body.FromCity = this.selectCity.checkedCities;
        }
        if (body.ConfStatus == "3") {
          body.AppointmentConf = this.popEnterpriseobj.AppointmentConf;
          body.AppointmentDays = Number(
            this.popEnterpriseobj.AppointmentDays || 2
          );
        }
        if (body.ConfStatus == "4") {
          //到店方式配置
          body.FromCity = this.selectCity.checkedCities;
          body.InstPointName = [];
          this.selectShop.confirmshopList.map(item => {
            let temp = {
              CenterName: item.CenterName,
              Id: item.Id,
              LocalCenterCode: item.LocalCenterCode,
              CityName: item.CityName
            };
            body.InstPointName.push(temp);
          });
          body.ConfDate = [];
          this.ConfigureDateobj.confirmselectdateArr.map(temp => {
            body.ConfDate.push(temp.date);
          });
        }
        if (
          body.ConfStatus == "5" ||
          body.ConfStatus == "6" ||
          body.ConfStatus == "7"
        ) {
          body.FromCity = this.selectCity.checkedCities;
          body.BannerImg = this.popEnterpriseobj.banner;
          body.ActivityUrl = this.popEnterpriseobj.ActivityUrl.trim();
        }
        if (this.popEnterpriseobj.isedit) {
          body.Id = this.popEnterpriseobj.Id;
        }
        console.log(body);

        this.$api
          .post("/enterParam/insertEnterParamConf", body)
          .then(res => {
            console.log(res);
            if (res.code == 200) {
              this.popEnterpriseobj.isshow = false;
              this.findEnterParamConfs();
            }
          })
          .catch(err => {
            this.$message.error(err.msg);
          });
      }
    },
    editOption(row) {
      console.log(row);
      this.popEnterpriseobj.islook = false;
      this.popEnterpriseobj.isedit = true;
      this.popEnterpriseobj.isshow = true;
      this.popEnterpriseobj.Id = row.Id;
      this.popEnterpriseobj.CompanyId = row.CompanyId;
      this.popEnterpriseobj.Company = row.Company;
      this.popEnterpriseobj.Appkey = row.Appkey;
      this.popEnterpriseobj.PassWord = row.PassWord;
      this.popEnterpriseobj.AppointmentDays = row.AppointmentDays;
      this.popEnterpriseobj.ActivityUrl = row.ActivityUrl;
      this.popEnterpriseobj.ActivityText = row.ActivityText;
      this.popEnterpriseobj.ActivityName = row.ActivityName;

      this.popEnterpriseobj.AppointmentConf = row.AppointmentConf;
      this.popEnterpriseobj.ConfStatus = row.ConfStatus;
      this.popEnterpriseobj.StartTime = row.StartTime;
      this.popEnterpriseobj.EndTime = row.EndTime;
      this.popEnterpriseobj.banner = row.BannerImg;

      this.selectCity.checkedCities = row.FromCity || [];
      this.selectShop.confirmshopList = row.InstPointName || [];
      this.ConfigureDateobj.confirmselectdateArr = [];
      if (row.ConfStatus == "4") {
        if (
          row.ConfDate &&
          Array.isArray(row.ConfDate) &&
          row.ConfDate.length > 0
        ) {
          row.ConfDate.map(item => {
            this.ConfigureDateobj.confirmselectdateArr.push({
              date: item,
              year: item.split("-")[0],
              month: item.split("-")[1],
              day: item.split("-")[2]
            });
          });
        }
      }else if(row.ConfStatus == "1"){
      	var SecretKeysTemp=[];
      	this.secretKey=[];
      	if(row.SecretKeys.length>0){
      		 row.SecretKeys.map((item,index)=>{
      		 	  var obj={
      		 	  	appkey:item.Appkey,
      		 	  	skname:item.SkName,
      		 	  	password:item.PassWord,
      		 	  	
      		 	  }
      		 	SecretKeysTemp.push(obj)
      		 })
      		 this.secretKey=SecretKeysTemp
      	}
      }
      
      
    },
    lookOption(row) {
      console.log(row);
      
      if(row.SecretKeys.length>=0){
      	for (var i=0;i<row.SecretKeys.length;i++) {
      		row.SecretKeys[i].appkey=row.SecretKeys[i].Appkey
      		row.SecretKeys[i].password=row.SecretKeys[i].PassWord
      		row.SecretKeys[i].skname=row.SecretKeys[i].SkName
      	}
      	
      }
      this.secretKey=row.SecretKeys
      console.log(this.secretKey);
      this.popEnterpriseobj.islook = true;
      this.popEnterpriseobj.isedit = true;
      this.popEnterpriseobj.isshow = true;
      this.popEnterpriseobj.Id = row.Id;
      this.popEnterpriseobj.CompanyId = row.CompanyId;
      this.popEnterpriseobj.Company = row.Company;
      this.popEnterpriseobj.Appkey = row.Appkey;
      this.popEnterpriseobj.PassWord = row.PassWord;
      this.popEnterpriseobj.AppointmentDays = row.AppointmentDays;
      this.popEnterpriseobj.ActivityUrl = row.ActivityUrl;
      this.popEnterpriseobj.ActivityText = row.ActivityText;
      this.popEnterpriseobj.ActivityName = row.ActivityName;

      this.popEnterpriseobj.AppointmentConf = row.AppointmentConf;
      this.popEnterpriseobj.ConfStatus = row.ConfStatus;
      this.popEnterpriseobj.StartTime = row.StartTime;
      this.popEnterpriseobj.EndTime = row.EndTime;
      this.popEnterpriseobj.banner = row.BannerImg;

      this.selectCity.checkedCities = row.FromCity || [];
      this.selectShop.confirmshopList = row.InstPointName || [];
      this.ConfigureDateobj.confirmselectdateArr = [];
      if (row.ConfStatus == "4") {
        row.ConfDate.map(item => {
          if (
            row.ConfDate &&
            Array.isArray(row.ConfDate) &&
            row.ConfDate.length > 0
          ) {
            this.ConfigureDateobj.confirmselectdateArr.push({
              date: item,
              year: item.split("-")[0],
              month: item.split("-")[1],
              day: item.split("-")[2]
            });
          }
        });
      }
    },

    lookcode(e){
    	console.log(e) 
    	if(!this.popEnterpriseobj.CompanyId){
    		
    		this.$message.error("请选择企业 ");
        return ;
    	}
    	if(!e.appkey){
    		
    		this.$message.error("请输入企业Appkey");
        return ;
    	}
    	
    	
//  	   islook: false, //是否为查看
//      isedit: false, //是否为编辑
//      isshow: false, //新增或编辑弹窗
    	console.log(this.popEnterpriseobj.isedit)
    	console.log(this.secretKey) 
    	var judgeMsg={
    		islook:this.popEnterpriseobj.islook,
    		isedit:this.popEnterpriseobj.isedit,
    		isshow: this.popEnterpriseobj.isshow,
    		ActivityName:this.popEnterpriseobj.ActivityName,
    		CompanyId:this.popEnterpriseobj.CompanyId,
    		ConfStatus:this.popEnterpriseobj.ConfStatus,
    	}
    	var judgeMsgString=JSON.stringify(judgeMsg)
    	var secretKeyString=encodeURIComponent(JSON.stringify(this.secretKey))
    	console.log(judgeMsg) 
      this.$router.push("/accountmanagement/comboCode?appkey="+e.appkey+"&&judgeMsg="+judgeMsgString+"&&companyId="+this.popEnterpriseobj.CompanyId+"&&secretKey="+secretKeyString)
    },
    newOption() {

          // 
      this.popEnterpriseobj.islook = false;
      this.popEnterpriseobj.isedit = false;
      this.popEnterpriseobj.isshow = true;
      this.popEnterpriseobj.CompanyId = ""; //企业id
      this.popEnterpriseobj.Company = ""; //企业名称
      this.popEnterpriseobj.Appkey = "";
      this.popEnterpriseobj.PassWord = "";
      this.popEnterpriseobj.ActivityUrl = ""; //活动url
      this.popEnterpriseobj.ActivityText = ""; //活动文本
      this.popEnterpriseobj.ActivityName = ""; //活动名称

      this.popEnterpriseobj.AppointmentConf = []; //预约排期配置
      this.popEnterpriseobj.ConfStatus = "1"; //1.全国XX 2. 企业公告 3.预约排期
      this.popEnterpriseobj.StartTime = ""; //活动开始时间
      this.popEnterpriseobj.EndTime = ""; //活动结束时间
      this.popEnterpriseobj.AppointmentDays = 2;

      this.popEnterpriseobj.banner = "";

      this.selectCity.checkedCities = [];
      this.selectShop.selecshopList = [];
      this.selectShop.confirmshopList = [];
      this.ConfigureDateobj.confirmselectdateArr = [];
      
      this.secretKey=[{ 
        skname:'',
        appkey:'',
        password:''
      }],
      
      
      this.getCompanylist();
    },
    seekbtn() {
      this.seekobj.pageindex = 1;
      this.findEnterParamConfs();
    },
    //001-查询企业预约参数配置
    findEnterParamConfs() {
      this.tableobj.loading = true;
      this.$api
        .get("/enterParam/findEnterParamConfs", {
          company: this.seekobj.company.replace("全部", ""),
          confStatus: this.seekobj.confStatus,
          page: this.seekobj.pageindex,
          pageSize: this.seekobj.pagesize,
          status: this.seekobj.status
        })
        .then(res => {
          console.log(res);
          this.tableobj.loading = false;
          this.tableobj.list = res.data.data;
          this.tableobj.total = res.data.count;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="scss" >
.mycheckbox {
  .el-checkbox__label {
    font-size: 14px;
    font-weight: bold;
    
  }
}
</style>