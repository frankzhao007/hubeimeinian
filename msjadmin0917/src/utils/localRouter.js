let OperationRouter = [{
  path: "/",
  component: "Layout",
  redirect: "/commodity/packagelist"
},
{
  path: "/commodity",
  component: "Layout",
  redirect: "/commodity/packagelist",
  name: "commodity",
  meta: {
    title: "商品管理",
    icon: "el-icon-my-commodity"
  },
  children: [{
    path: "packagelist",
    name: "packagelist",
    component: "packagelist/index",
    meta: {
      title: "商品列表",
      mark: "commodity",
      icon: "PackageList"
    }
  },
  {
    path: "addttemlist",
    name: "addttemlist",
    component: "addttemlist/index",
    meta: {
      title: "加项列表",
      mark: "addttemlist",
      icon: "AddItemList"
    }
  },
  {
    path: "addpackagecombo",
    name: "addpackagecombo",
    component: "addttemlist/addpackagecombo",
    meta: {
      title: "加项包组",
      mark: "addpackagecombo",
      icon: "addpackagecombo"
    }
  },
  {
    path: "addpackagecombomsg",
    name: "addpackagecombomsg",
    component: "addttemlist/addpackagecombomsg",
    hidden: "true",
    meta: {
      title: "新增/修改加项包组",
      mark: "addpackagecombomsg",
      icon: "addpackagecombomsg",
      hidden: "true"
    }
  },
  {
    path: "addpackage",
    name: "addpackage",
    component: "addttemlist/addpackage",
    hidden: "true",
    meta: {
      title: "新建/编辑加项包",
      mark: "addpackage",
      icon: "SelfService",
      hidden: "true"
    }
  },
  {
    path: "goodsmsg",
    name: "goodsmsg",
    component: "packagelist/goodsmsg",
    hidden: "true",
    meta: {
      title: "商品详情",
      mark: "goodsmsg",
      icon: "goodsmsg",
      hidden: "true"
    }
  }
  ]
},
{
  path: "/marketing",
  component: "Layout",
  redirect: "/marketing/salesshop",
  name: "Marketing",
  meta: {
    title: "营销管理",
    icon: "el-icon-my-Marketing"
  },
  children: [{
    path: 'salesshop',
    name: 'salesshop',
    component: "marketing/salesshop",
    meta: {
      title: "配置销售店铺套餐",
      mark: "salesshop",
      icon: "salesshop"
    }
  },
  {
    path: 'smallbusiness',
    name: 'smallbusiness',
    component: "marketing/smallbusiness",
    meta: {
      title: '配置小企业套餐',
      mark: "smallbusiness",
      icon: "smallbusiness"
    }
  },
  {
    path: 'enterpriseentry',
    name: 'enterpriseentry',
    component: "marketing/enterpriseentry",
    meta: {
      title: '配置企业入职套餐',
      mark: "enterpriseentry",
      icon: "enterpriseentry"
    }
  },
  {
    path: 'messagetemplate',
    name: 'messagetemplate',
    component: "marketing/messagetemplate",
    meta: {
      title: '短信模板',
      mark: "messagetemplate",
      icon: "messagetemplate"
    }
  },
  {
    path: 'ConfigureDistributor',
    name: 'ConfigureDistributor',
    component: "marketing/ConfigureDistributor",
    meta: {
      title: '配置分销员套餐',
      mark: "ConfigureDistributor",
      icon: "ConfigureDistributor"
    }
  },

  {
    path: 'Familybenefit',
    name: 'Familybenefit',
    component: "marketing/Familybenefit",
    meta: {
      title: '家属福利金',
      mark: "Familybenefit",
      icon: "Familybenefit"
    }
  },
  {
    path: 'marketingGuest',
    name: 'marketingGuest',
    component: "marketing/marketingGuest",
    meta: {
      title: '分销客列表',
      mark: "marketingGuest",
      icon: "marketingGuest"
    }
  },

  {
    path: 'allocationDistribution',
    name: 'allocationDistribution',
    component: "marketing/allocationDistribution",
    meta: {
      title: '配置分销套餐',
      mark: "allocationDistribution",
      icon: "allocationDistribution"
    }
  },
  {
    path: 'Fbselectemp',
    name: 'Fbselectemp',
    component: "marketing/Fbselectemp",
    hidden: "true",
    meta: {
      title: '员工名单详情',
      mark: "Fbselectemp",
      icon: "Fbselectemp",
      hidden: "true"
    }
  },
  {
    path: 'FreeMedical',
    name: 'FreeMedical',
    component: "marketing/FreeMedical",
    meta: {
      title: '免费体检活动',
      mark: "FreeMedical",
      icon: "FreeMedical"
    }
  },
  ]
},
{
  path: "/medicalexamination",
  component: "Layout",
  redirect: "/medicalexamination/projectlist",
  name: "medicalexamination",
  meta: {
    title: "体检项目管理",
    icon: "el-icon-my-medicalExamination"
  },
  children: [{
    path: "projectlist",
    name: "projectlist",
    component: "projectlist/index",
    meta: {
      title: "体检项目列表",
      mark: "projectlist",
      icon: "ProjectList"
    }
  },
  {
    path: "categorylist",
    name: "categorylist",
    component: "categorylist/index",
    meta: {
      title: "项目类别列表",
      mark: "categorylist",
      icon: "CategoryList"
    }
  },
  {
    path: "addproject",
    name: "addproject",
    component: "projectlist/addproject",
    hidden: "true",
    meta: {
      title: "新建/编辑体检项目",
      mark: "addproject",
      icon: "SelfService",
      hidden: "true"
    }
  },
  {
    path: "projectimportrecord",
    name: "projectimportrecord",
    component: "projectlist/projectimportrecord",
    hidden: "true",
    meta: {
      title: "体检项目导入记录",
      mark: "projectlist",
      icon: "SelfService",
      hidden: "true"
    }
  },
  {
    path: "newprojectcategory",
    name: "newprojectcategory",
    component: "projectlist/newprojectcategory",
    hidden: "true",
    meta: {
      title: "新建/编辑项目类别",
      mark: "newprojectcategory",
      icon: "SelfService",
      hidden: "true"
    }
  },
  {
    path: "secondarycategorylist",
    name: "secondarycategorylist",
    component: "categorylist/secondarycategorylist",
    hidden: "true",
    meta: {
      title: "二级类别列表",
      mark: "categorylist",
      icon: "SelfService",
      hidden: "true"
    }
  }
  ]
},
{
  path: "/ordermanagement",
  component: "Layout",
  redirect: "/ordermanagement/orderlist",
  name: "ordermanagement",
  meta: {
    title: "订单管理",
    icon: "el-icon-my-order"
  },
  children: [{
    path: "orderlist",
    name: "orderlist",
    component: "orderlist/index",
    meta: {
      title: "订单列表",
      mark: "orderlist",
      icon: "OrderList"
    }
  },
  {
    path: "reservationlist",
    name: "reservationlist",
    component: "reservationlist/index",
    meta: {
      title: "预约列表",
      mark: "reservationlist",
      icon: "ReservationList"
    }
  },
  {
    path: "Pppexamination",
    name: "Pppexamination",
    component: "orderlist/Pppexamination",
    meta: {
      title: "岗前体检",
      mark: "Pppexamination",
      icon: "Pppexamination"
    }
  },
  {
    path: "InvoiceManage",
    name: "InvoiceManage",
    component: "orderlist/InvoiceManage",
    meta: {
      title: "开票申请列表",
      mark: "InvoiceManage",
      icon: "InvoiceManage"
    }
  },
  {
    path: "ordermsg",
    name: "ordermsg",
    component: "orderlist/ordermsg",
    hidden: "true",
    meta: {
      title: "订单详情",
      mark: "ordermsg",
      icon: "SelfService",
      hidden: "true"
    }
  },
  {
    path: "orderexportrecord",
    name: "orderexportrecord",
    component: "orderlist/orderexportrecord",
    hidden: "true",
    meta: {
      title: "订单导出记录",
      mark: "orderlist",
      icon: "SelfService",
      hidden: "true"
    }
  }
  ]
},
{
  path: "/salesmanagement",
  component: "Layout",
  redirect: "/salesmanagement/saleslist",
  name: "salesmanagement",
  meta: {
    title: "销售管理",
    icon: "el-icon-my-sales"
  },
  children: [
    {
      path: "saleslist",
      name: "saleslist",
      component: "saleslist/index",
      meta: {
        title: "销售列表",
        mark: "saleslist",
        icon: "SalesList"
      }
    },
    {
      path: "distributionlist",
      name: "distributionlist",
      component: "saleslist/distributionlist",
      meta: {
        title: "分销员列表",
        mark: "distributionlist",
        icon: "distributionlist"
      }
    }
  ]
},
{
  path: "/enterprisemanagement",
  component: "Layout",
  redirect: "/enterprisemanagement/enterpriselist",
  name: "enterprisemanagement",
  meta: {
    title: "企业管理",
    icon: "el-icon-my-enterprise"
  },
  children: [{
    path: "enterpriselist",
    name: "enterpriselist",
    component: "enterpriselist/index",
    meta: {
      title: "企业列表",
      mark: "enterpriselist",
      icon: "Enterpriselist"
    }
  },
  {
    path: "enterpriseconfiguration",
    name: "enterpriseconfiguration",
    component: "enterpriselist/enterpriseconfiguration",
    hidden: "true",
    meta: {
      title: "配置套餐",
      mark: "enterpriseconfiguration",
      icon: "SelfService",
      hidden: "true"
    }
  },
  {
    path: "welfarevoucher",
    name: "welfarevoucher",
    component: "enterpriselist/welfarevoucher",
    hidden: "true",
    meta: {
      title: "福利劵金额配置",
      mark: "welfarevoucher",
      icon: "SelfService",
      hidden: "true"
    }
  },
  {
    path: "configurationData",
    name: "configurationData",
    component: "enterpriselist/configurationData",
    hidden: "true",
    meta: {
      title: "企业参数配置",
      mark: "configurationData",
      icon: "configurationData",
      hidden: "true",
    }
  },
  {
    path: "selectTemplate",
    name: "selectTemplate",
    component: "enterpriselist/selectTemplate",
    hidden: "true",
    meta: {
      title: "短信模板选择",
      mark: "selectTemplate",
      icon: "selectTemplate",
      hidden: "true",
    }
  },
  {
    path: "shortNote",
    name: "shortNote",
    component: "noteList/shortNote",
    meta: {
      title: "短信模板库",
      mark: "shortNote",
      icon: "shortNote",
    }
  },
  {
    path: "addNote",
    name: "addNote",
    component: "noteList/addNote",
    hidden: "true",
    meta: {
      title: "创建短信模板",
      mark: "addNote",
      icon: "addNote",
      hidden: "true"
    }
  },
  {
    path: "setpersonalized",
    name: "setpersonalized",
    component: "enterpriselist/setpersonalized",
    hidden: "true",
    meta: {
      title: "门店个性化",
      mark: "setpersonalized",
      icon: "setpersonalized",
      hidden: "true"
    }
  },
  {
    path: "setschedule",
    name: "setschedule",
    component: "enterpriselist/setschedule",
    hidden: "true",
    meta: {
      title: "排期设置",
      mark: "setschedule",
      icon: "setschedule",
      hidden: "true"
    }
  },
  {
    path: "mailReport",
    name: "mailReport",
    component: "enterpriselist/mailReport",
    hidden: "true",
    meta: {
      title: "邮寄报告",
      mark: "mailReport",
      icon: "mailReport",
      hidden: "true"
    }
  },
  {
    path: "mailParticulars",
    name: "mailParticulars",
    component: "enterpriselist/mailParticulars",
    hidden: "true",
    meta: {
      title: "查看邮寄详情",
      mark: "mailParticulars",
      icon: "mailParticulars",
      hidden: "true"
    }
  },
  ]
},
{
  path: "/staffmanagement",
  component: "Layout",
  redirect: "/staffmanagement/stafflist",
  name: "staffmanagement",
  meta: {
    title: "员工管理",
    icon: "el-icon-my-staff"
  },
  children: [{
    path: "stafflist",
    name: "stafflist",
    component: "stafflist/index",
    meta: {
      title: "员工列表",
      mark: "stafflist",
      icon: "Stafflist"
    }
  },
  {
    path: "retaillist",
    name: "retaillist",
    component: "retaillist/index",
    meta: {
      title: "散户列表",
      mark: "retaillist",
      icon: "RetailList"
    }
  },
  {
    path: "newemployee",
    name: "newemployee",
    component: "stafflist/newemployee",
    hidden: "true",
    meta: {
      title: "新增员工",
      mark: "newemployee",
      icon: "SelfService",
      hidden: "true"
    }
  },
  {
    path: "employeeimport",
    name: "employeeimport",
    component: "stafflist/employeeimport",
    hidden: "true",
    meta: {
      title: "员工导入记录",
      mark: "stafflist",
      icon: "SelfService",
      hidden: "true"
    }
  },
  {
    path: "configurationpackage",
    name: "configurationpackage",
    component: "stafflist/configurationpackage",
    hidden: "true",
    meta: {
      title: "配置套餐",
      mark: "configurationpackage",
      icon: "SelfService",
      hidden: "true"
    }
  },
  {
    path: "saleswelfarevoucher",
    name: "saleswelfarevoucher",
    component: "stafflist/saleswelfarevoucher",
    hidden: "true",
    meta: {
      title: "福利劵金额配置",
      mark: "saleswelfarevoucher",
      icon: "SelfService",
      hidden: "true"
    }
  }
  ]
},
{
  path: "/ESManagement",
  component: "Layout",
  redirect: "/ESManagement/ESEmployeelist",
  name: "ESManagement",
  meta: {
    title: "员工疫情日报",
    icon: "el-icon-my-staff"
  },
  children: [
    {
      path: "ESEmployeelist",
      name: "ESEmployeelist",
      component: "ESManagement/ESEmployeelist",
      meta: {
        title: "员工疫情列表",
        mark: "ESEmployeelist",
        icon: "ESEmployeelist"
      }
    },
    {
      path: "ESEmployeedetails",
      name: "ESEmployeedetails",
      component: "ESManagement/ESEmployeedetails",
      hidden: "true",
      meta: {
        title: "员工疫情详情",
        mark: "ESEmployeedetails",
        icon: "ESEmployeedetails",
        hidden: "true",
      }
    },
  ]
},
{
  path: "/approvalmanagement",
  component: "Layout",
  redirect: "/approvalmanagement/approvallist",
  name: "approvalmanagement",
  meta: {
    title: "审批管理",
    icon: "el-icon-my-overview"
  },
  children: [{
    path: "approvallist",
    name: "approvallist",
    component: "approvallist/index",
    meta: {
      title: "审批列表",
      mark: "approvallist",
      icon: "ApprovalList"
    }
  },
  {
    path: "content",
    name: "content",
    component: "approvallist/content",
    hidden: "true",
    meta: {
      title: "审批内容",
      mark: "content",
      icon: "SelfService",
      hidden: "true"
    }
  },
  {
    path: "newapproval",
    name: "newapproval",
    component: "approvallist/newapproval",
    hidden: "true",
    meta: {
      title: "新增审批",
      mark: "newapproval",
      icon: "SelfService",
      hidden: "true"
    }
  },
  {
    path: "approvalexport",
    name: "approvalexport",
    component: "approvallist/approvalexport",
    hidden: "true",
    meta: {
      title: "审批导出记录",
      mark: "approvallist",
      icon: "SelfService",
      hidden: "true"
    }
  }
  ]
},
{
  path: "/OrderManagement",
  component: "Layout",
  redirect: "/OrderManagement/OrderManagelist",
  name: "OrderManagement",
  meta: {
    title: "下单管理",
    icon: "el-icon-my-ordermanagement"
  },
  children: [
    {
      path: "OrderManagelist",
      name: "OrderManagelist",
      component: "OrderManagement/OrderManagelist",
      meta: {
        title: "下单列表",
        mark: "OrderManagelist",
        icon: "OrderManagelist"
      }
    },
    {
      path: "OrderBasicDetails",
      name: "OrderBasicDetails",
      component: "OrderManagement/OrderBasicDetails",
      hidden: "true",
      meta: {
        title: "订单基本情况",
        mark: "OrderBasicDetails",
        icon: "OrderBasicDetails",
        hidden: "true"
      }
    },
    {
      path: "OrderComboDetails",
      name: "OrderComboDetails",
      component: "OrderManagement/OrderComboDetails",
      hidden: "true",
      meta: {
        title: "订单套餐信息",
        mark: "OrderComboDetails",
        icon: "OrderComboDetails",
        hidden: "true"
      }
    },
  ]
},
{
  path: "/DataManagement",
  component: "Layout",
  redirect: "/DataManagement/EmployeeSettin",
  name: "DataManagement",
  meta: {
    title: "数据管理",
    icon: "el-icon-my-ordermanagement"
  },
  children: [
    {
      path: "EmployeeSettin",
      name: "EmployeeSettin",
      component: "DataManagement/EmployeeSettin",
      meta: {
        title: "员工设置",
        mark: "EmployeeSettin",
        icon: "EmployeeSettin"
      }
    },
    {
      path: "PackageSetting",
      name: "PackageSetting",
      component: "DataManagement/PackageSetting",
      meta: {
        title: "套餐设置",
        mark: "PackageSetting",
        icon: "PackageSetting"
      }
    },
    {
      path: "PackageSettingmsg",
      name: "PackageSettingmsg",
      component: "DataManagement/PackageSettingmsg",
      hidden: "true",
      meta: {
        title: "新增/编辑套餐模板",
        mark: "PackageSettingmsg",
        icon: "PackageSettingmsg",
        hidden: "true"
      }
    },
    {
      path: "ProjectSeeting",
      name: "ProjectSeeting",
      component: "DataManagement/ProjectSeeting",
      meta: {
        title: "项目设置",
        mark: "ProjectSeeting",
        icon: "ProjectSeeting"
      }
    },
    {
      path: "ProjectSeetingmsg",
      name: "ProjectSeetingmsg",
      component: "DataManagement/ProjectSeetingmsg",
      hidden: "true",
      meta: {
        title: "新增/编辑项目",
        mark: "ProjectSeetingmsg",
        icon: "ProjectSeetingmsg",
        hidden: "true"
      }
    },
    {
      path: "UnitCode",
      name: "UnitCode",
      component: "DataManagement/UnitCode",
      meta: {
        title: "单位代码设置",
        mark: "UnitCode",
        icon: "UnitCode"
      }
    },
    {
      path: "UnitCodemsg",
      name: "UnitCodemsg",
      component: "DataManagement/UnitCodemsg",
      hidden: "true",
      meta: {
        title: "新增/编辑单位",
        mark: "UnitCodemsg",
        icon: "UnitCodemsg",
        hidden: "true",
      }
    },
    {
      path: "auditProcessSettings",
      name: "auditProcessSettings",
      component: "DataManagement/auditProcessSettings",
      meta: {
        title: "审批流程设置",
        mark: "auditProcessSettings",
        icon: "auditProcessSettings"
      }
    },

  ]
},

{
  path: "/CommissionHB",
  component: "Layout",
  redirect: "/CommissionHB/CommissionHubei",
  name: "CommissionHB",
  meta: {
    title: "提成计算",
    icon: "el-icon-my-ordermanagement"
  },
  children: [
    {
      path: "CommissionHubei",
      name: "CommissionHubei",
      component: "CommissionHB/CommissionHubei",
      meta: {
        title: "工作空间",
        mark: "CommissionHubei",
        icon: "CommissionHubei"
      }
    },
    {
      path: "CommissionMsg",
      name: "CommissionMsg",
      component: "CommissionHB/CommissionMsg",
      hidden: "true",
      meta: {
        title: "业务员提成统计表",
        mark: "CommissionMsg",
        icon: "CommissionMsg",
        hidden: "true"
      }
    },






  ]
},


{
  path: "/AuditManagement",
  component: "Layout",
  redirect: "/AuditManagement/AuditList",
  name: "AuditManagement",
  meta: {
    title: "审核管理",
    icon: "el-icon-my-amordermanagement"
  },
  children: [
    {
      path: "AuditList",
      name: "AuditList",
      component: "AuditManagement/AuditList",
      meta: {
        title: "审核列表",
        mark: "AuditList",
        icon: "AuditList"
      }
    },
    {
      path: "AmOrderBasicDetails",
      name: "AmOrderBasicDetails",
      component: "AuditManagement/AmOrderBasicDetails",
      hidden: "true",
      meta: {
        title: "订单基本情况",
        mark: "AmOrderBasicDetails",
        icon: "AmOrderBasicDetails",
        hidden: "true"
      }
    },
    {
      path: "AmOrderComboDetails",
      name: "AmOrderComboDetails",
      component: "AuditManagement/AmOrderComboDetails",
      hidden: "true",
      meta: {
        title: "订单套餐信息",
        mark: "AmOrderComboDetails",
        icon: "AmOrderComboDetails",
        hidden: "true"
      }
    },
  ]
},
  {
    path: "/TuanAdmin",
    component: "Layout",
    redirect: "/TuanAdmin/ScheduleAdmin",
    name: "TuanAdmin",
    meta: {
      title: "团单管理员",
      icon: "el-icon-my-amordermanagement"
    },
    children: [
      {
        path: "ScheduleAdmin",
        name: "ScheduleAdmin",
        component: "TuanAdmin/ScheduleAdmin",
        meta: {
          title: "排期审核",
          mark: "ScheduleAdmin",
          icon: "ScheduleAdmin"
        }
      },
      {
        path: "CheckTuanDetail",
        name: "CheckTuanDetail",
        component: "TuanAdmin/CheckTuanDetail",
        meta: {
          title: "查看排期",
          mark: "CheckTuanDetail",
          icon: "CheckTuanDetail",
          // hidden: "false"
        }
      },{
        path: "TijianCapacity",
        name: "TijianCapacity",
        component: "TuanAdmin/TijianCapacity",
        meta: {
          title: "体检容量设置",
          mark: "TijianCapacity",
          icon: "TijianCapacity",
        }
      },
      {
        path:"BranchMM",
        name:"BranchMM",
        component:"TuanAdmin/BranchMM",
        meta:{
          title:"分院管理",
          mark:"BranchMM",
          icon:"BranchMM"
        }
      },
      {
        path:"AddBranchMM",
        name:"AddBranchMM",
        component:"TuanAdmin/AddBranchMM",
        hidden:"false",
        meta:{
          title:"新增/编辑分院",
          mark:"AddBranchMM",
          icon:"AddBranchMM",
        }
      },

    ]
  },
{
  path: "/ScheduleManagement",
  component: "Layout",
  redirect: "/ScheduleManagement/ScheduleList",
  name: "ScheduleManagement",
  meta: {
    title: "排期管理",
    icon: "el-icon-my-amordermanagement"
  },
  children: [
    {
      path: "ScheduleList",
      name: "ScheduleList",
      component: "ScheduleManagement/ScheduleList",
      meta: {
        title: "排期列表",
        mark: "ScheduleList",
        icon: "ScheduleList"
      }
    },
     {
      path: "CheckHospitalSchedule",
      name: "CheckHospitalSchedule",
      component: "ScheduleManagement/CheckHospitalSchedule",
      meta: {
        title: "查看分院排期",
        mark: "CheckHospitalSchedule",
        icon: "CheckHospitalSchedule"
      }
    },
    {
      path: "CheckSchedule",
      name: "CheckSchedule",
      component: "ScheduleManagement/CheckSchedule",
      hidden: "true",
      meta: {
        title: "查看排期",
        mark: "CheckSchedule",
        icon: "CheckSchedule"
      }
    },
     {
      path: "OrderSchedule",
      name: "OrderSchedule",
      component: "ScheduleManagement/OrderSchedule",
      meta: {
        title: "订单排期",
        mark: "OrderSchedule",
        icon: "OrderSchedule"
      }
    }

  ]
},

{
  path: "/reconciliationmanagement",
  component: "Layout",
  redirect: "/reconciliationmanagement/billingdetails",
  name: "reconciliationmanagement",
  meta: {
    title: "对账管理",
    icon: "el-icon-my-cityStore"
  },
  children: [
    {
      path: "billingdetails",
      name: "billingdetails",
      component: "billingdetails/index",
      meta: {
        title: "账单明细",
        mark: "billingdetails",
        icon: "BillingDetails"
      }
    },
    {
      path: "CashManagement",
      name: "CashManagement",
      component: "billingdetails/CashManagement",
      meta: {
        title: "提现管理",
        mark: "CashManagement",
        icon: "CashManagement"
      }
    },
    {
      path: "billingexport",
      name: "billingexport",
      component: "billingdetails/billingexport",
      hidden: "true",
      meta: {
        title: "账单导出记录",
        mark: "billingdetails",
        icon: "SelfService",
        hidden: "true"
      }
    }
  ]
},
{
  path: "/selfServiceDeviceManagement",
  component: "Layout",
  redirect: "/selfservicedevicemanagement/paymentorder",
  name: "selfServiceDeviceManagement",
  meta: {
    title: "自助设备管理",
    icon: "el-icon-my-branchOffice"
  },
  children: [{
    path: "paymentorder",
    name: "paymentorder",
    component: "paymentorder/index",
    meta: {
      title: "支付订单",
      mark: "paymentorder",
      icon: "SelfService"
    }
  },
  {
    path: "filmmanagement",
    name: "filmmanagement",
    component: "filmmanagement/index",
    meta: {
      title: "胶片管理",
      mark: "filmmanagement",
      icon: "SelfService"
    }
  },
  {
    path: "EquipmentManagement",
    name: "EquipmentManagement",
    component: "paymentorder/EquipmentManagement",
    meta: {
      title: "设备管理",
      mark: "EquipmentManagement",
      icon: "SelfService"
    }
  },
  {
    path: "filmorderdetails",
    name: "filmorderdetails",
    component: "paymentorder/filmorderdetails",
    hidden: "true",
    meta: {
      title: "订单详情",
      mark: "filmorderdetails",
      icon: "SelfService",
      hidden: "true"
    }
  }
  ]
},
{
  path: "/accountmanagement",
  component: "Layout",
  redirect: "/accountmanagement/accountlist",
  name: "accountmanagement",
  meta: {
    title: "系统管理",
    icon: "el-icon-my-character"
  },
  children: [{
    path: "accountlist",
    name: "accountlist",
    component: "accountlist/index",
    meta: {
      title: "账号列表",
      mark: "accountlist",
      icon: "AccountList"
    }
  },
  {
    path: "rolelist",
    name: "rolelist",
    component: "rolelist/index",
    meta: {
      title: "角色列表",
      mark: "rolelist",
      icon: "RoleList"
    }
  },
  {
    path: "citylist",
    name: "citylist",
    component: "citylist/index",
    meta: {
      title: "城市列表",
      mark: "citylist",
      icon: "CityList"
    }
  },
  {
    path: "storelist",
    name: "storelist",
    component: "storelist/index",
    meta: {
      title: "门店列表",
      mark: "storelist",
      icon: "StoreList"
    }
  },
  {
    path: "EnterpriseOption",
    name: "EnterpriseOption",
    component: "accountlist/EnterpriseOption",
    meta: {
      title: "企业参数配置",
      mark: "EnterpriseOption",
      icon: "EnterpriseOption"
    }
  },
  {
    path: "comboCode",
    name: "comboCode",
    component: "accountlist/comboCode",
    hidden: "true",
    meta: {
      title: "套餐编码",
      mark: "comboCode",
      icon: "comboCode",
      hidden: "true"
    }
  },
  {
    path: "whiteList",
    name: "whiteList",
    component: "accountlist/whiteList",
    meta: {
      title: "白名单设置",
      mark: "whiteList",
      icon: "whiteList"
    }
  },
  {
    path: "SystemOperationLog",
    name: "SystemOperationLog",
    component: "accountlist/SystemOperationLog",
    meta: {
      title: "系统操作日志",
      mark: "SystemOperationLog",
      icon: "SystemOperationLog"
    }
  },
  {
    path: "whiteList",
    name: "whiteList",
    component: "accountlist/whiteList",
    meta: {
      title: "白名单设置",
      mark: "whiteList",
      icon: "whiteList"
    }
  },
  {
    path: "addaccount",
    name: "addaccount",
    component: "accountlist/addaccount",
    hidden: "true",
    meta: {
      title: "账号设置",
      mark: "addaccount",
      icon: "addaccount",
      hidden: "true"
    }
  },
  {
    path: "newrole",
    name: "newrole",
    component: "accountlist/newrole",
    hidden: "true",
    meta: {
      title: "新增/编辑角色",
      mark: "newrole",
      icon: "newrole",
      hidden: "true"
    }
  },
  {
    path: "dataReport",
    name: "dataReport",
    component: "dataReport/index",
    meta: {
      title: "数据统计",
      mark: "dataReport",
      icon: "dataReport",
    }
  },

  {
    path: "staffMessage",
    name: "staffMessage",
    component: "dataReport/staffMessage",
    hidden: "true",
    meta: {
      title: "员工体检信息",
      mark: "staffMessage",
      icon: "staffMessage",
      hidden: "true"
    }
  },
  ]
},
// 健康俱乐部 -----------------------------------------------------
{
  path: "/healthclub",
  component: "Layout",
  redirect: "/healthclub",
  name: "healthclub",
  nesting: "true",
  meta: {
    title: "健康俱乐部",
    icon: "el-icon-my-heart"
  },
  children: [{
    path: "businesslist",
    name: "businesslist",
    component: "healthclub/business/businesslist",
    meta: {
      title: "俱乐部企业列表",
      mark: "businesslist",
      icon: "businesslist"
    }
  },
  {
    path: "memberlist",
    name: "memberlist",
    component: "healthclub/member/memberlist",
    meta: {
      title: "会员列表",
      mark: "memberlist",
      icon: "memberlist"
    }
  },
  {
    path: "depositmanagement",
    name: "depositmanagement",
    component: "healthclub/member/depositmanagement",
    meta: {
      title: "押金管理",
      mark: "depositmanagement",
      icon: "depositmanagement"
    }
  },
  {
    path: "integralrules",
    name: "integralrules",
    component: "healthclub/member/integralrules",
    meta: {
      title: "积分规则",
      mark: "integralrules",
      icon: "integralrules"
    }
  },
  {
    path: "integralrecord",
    name: "integralrecord",
    component: "healthclub/member/integralrecord",
    meta: {
      title: "积分获取记录",
      mark: "integralrecord",
      icon: "integralrecord"
    }
  },
  {
    path: "foodcategorylist",
    name: "foodcategorylist",
    component: "healthclub/module/foodcategorylist",
    meta: {
      title: "食物类别列表",
      mark: "foodcategorylist",
      icon: "foodcategorylist"
    }
  },
  {
    path: "foodlist",
    name: "foodlist",
    component: "healthclub/module/foodlist",
    meta: {
      title: "食物列表",
      mark: "foodlist",
      icon: "foodlist"
    }
  },
  {
    path: "sportslist",
    name: "sportslist",
    component: "healthclub/module/sportslist",
    meta: {
      title: "运动项目列表",
      mark: "sportslist",
      icon: "sportslist"
    }
  },
  {
    path: "configuration",
    name: "configuration",
    component: "healthclub/business/configuration",
    hidden: "true",
    meta: {
      title: "企业配置",
      mark: "businesslist",
      icon: "configuration",
      hidden: "true"
    }
  },
  {
    path: "incentiveplan",
    name: "incentiveplan",
    component: "healthclub/business/incentiveplan",
    hidden: "true",
    meta: {
      title: "激励方案",
      mark: "businesslist",
      icon: "incentiveplan",
      hidden: "true"
    }
  },
  {
    path: "depositDetails",
    name: "incentiveplan",
    component: "healthclub/member/depositDetails",
    hidden: "true",
    meta: {
      title: "押金明细",
      mark: "memberlist",
      icon: "depositDetails",
      hidden: "true"
    }
  },
  {
    path: "memberDetails",
    name: "memberDetails",
    component: "healthclub/member/memberDetails",
    hidden: "true",
    meta: {
      title: "会员详情",
      mark: "memberlist",
      icon: "memberDetails",
      hidden: "true"
    }
  },
  {
    path: "foodMsg",
    name: "foodMsg",
    component: "healthclub/module/foodMsg",
    hidden: "true",
    meta: {
      title: "查看/新增/编辑食物",
      mark: "foodlist",
      icon: "foodMsg",
      hidden: "true"
    }
  }

  ]
},
//微保-------------------------------------------------------------
{
  path: "/MicroInsurance",
  component: "Layout",
  redirect: "/MicroInsurance/productCatalogy",
  name: "MicroInsurance",
  meta: {
    title: "商品管理",
    icon: "el-icon-my-commodity"
  },
  children: [
    {
      path: 'productCatalogy',
      name: 'productCatalogy',
      component: "MicroInsurance/product/productCatalogy",
      meta: {
        title: '商品列表',
        mark: "productCatalogy",
        icon: "productCatalogy"
      }
    },
    {
      path: 'packingList',
      name: 'packingList',
      component: "MicroInsurance/product/packingList",
      meta: {
        title: '加项列表',
        mark: "packingList",
        icon: "packingList"
      }
    },
    {
      path: 'packageadd',
      name: 'packageadd',
      component: "MicroInsurance/product/packageadd",
      hidden: "true",
      meta: {
        title: '新增/编辑加项包',
        mark: "packageadd",
        icon: "packageadd",
        hidden: "true",
      }
    },
    {
      path: 'packListAdd',
      name: 'packListAdd',
      component: "MicroInsurance/product/packListAdd",
      hidden: "true",
      meta: {
        title: '新增/编辑商品',
        mark: "packListAdd",
        icon: "packListAdd",
        hidden: "true",
      }
    },
  ]
},
{
  path: "/vbordermanage",
  component: "Layout",
  redirect: "/vbordermanage/vborderList",
  name: "vbordermanage",
  meta: {
    title: "订单管理",
    icon: "el-icon-my-order"
  },
  children: [
    {
      path: 'vborderList',
      name: 'vborderList',
      component: "MicroInsurance/order/vborderList",
      meta: {
        title: '订单列表',
        mark: "vborderList",
        icon: "vborderList"
      }
    },
    {
      path: 'vbyuyuelist',
      name: 'vbyuyuelist',
      component: "MicroInsurance/order/vbyuyuelist",
      meta: {
        title: '预约列表',
        mark: "vbyuyuelist",
        icon: "vbyuyuelist"
      }
    },
    {
      path: 'vbordermsg',
      name: 'vbordermsg',
      component: "MicroInsurance/order/vbordermsg",
      hidden: "true",
      meta: {
        title: '订单详情',
        mark: "vbordermsg",
        icon: "vbordermsg",
        hidden: "true",
      }
    },
    {
      path: 'importexcelorder',
      name: 'importexcelorder',
      component: "MicroInsurance/order/importexcelorder",
      hidden: "true",
      meta: {
        title: '订单导出记录',
        mark: "importexcelorder",
        icon: "importexcelorder",
        hidden: "true",
      }
    },
  ]
},

{
  path: "/vbmedicalexamination",
  component: "Layout",
  redirect: "/vbmedicalexamination/tijianproject",
  name: "vbmedicalexamination",
  meta: {
    title: "体检项目管理",
    icon: "el-icon-my-medicalExamination"
  },
  children: [
    {
      path: 'tijianproject',
      name: 'tijianproject',
      component: "MicroInsurance/tijian/tijianproject",
      meta: {
        title: '体检项目列表',
        mark: "tijianproject",
        icon: "tijianproject"
      }
    },
    {
      path: 'tijianprojectadd',
      name: 'tijianprojectadd',
      component: "MicroInsurance/tijian/tijianprojectadd",
      hidden: "true",
      meta: {
        title: '新增/编辑体检项目',
        mark: "tijianprojectadd",
        icon: "tijianprojectadd",
        hidden: "true",
      }
    },
    {
      path: 'tijiancatalogy',
      name: 'tijiancatalogy',
      component: "MicroInsurance/tijian/tijiancatalogy",
      meta: {
        title: '项目类别列表',
        mark: "tijiancatalogy",
        icon: "tijiancatalogy"
      }
    },
    {
      path: 'secondProjectAdd',
      name: 'secondProjectAdd',
      component: "MicroInsurance/tijian/secondProjectAdd",
      hidden: "true",
      meta: {
        title: '二级类别',
        mark: "secondProjectAdd",
        icon: "secondProjectAdd",
        hidden: "true"
      }
    },
  ]
},
{
  path: "/vbmendianguanli",
  component: "Layout",
  redirect: "/vbmendianguanli/mendianList",
  name: "vbmendianguanli",
  meta: {
    title: "门店管理",
    icon: "el-icon-my-character"
  },
  children: [
    {
      path: 'mendianList',
      name: 'mendianList',
      component: "MicroInsurance/mendian/mendianList",
      meta: {
        title: '门店列表',
        mark: "mendianList",
        icon: "mendianList"
      }
    },
  ]
},
{
  path: "/vbmanager",
  component: "Layout",
  redirect: "/vbmanager/goods_mendian",
  name: "vbmanager",
  meta: {
    title: "微保管理",
    icon: "el-icon-my-staff"
  },
  children: [
    {
      path: 'goods_mendian',
      name: 'goods_mendian',
      component: "MicroInsurance/vb/goods_mendian",
      meta: {
        title: '商品-门店列表',
        mark: "goods_mendian",
        icon: "goods_mendian"
      }
    },
    {
      path: 'person',
      name: 'person',
      component: "MicroInsurance/vb/person",
      meta: {
        title: '散户列表',
        mark: "person",
        icon: "person"
      }
    },
    {
      path: 'interest',
      name: 'interest',
      component: "MicroInsurance/vb/interest",
      meta: {
        title: '权益列表',
        mark: "interest",
        icon: "interest"
      }
    },
    {
      path: 'taocan_goods',
      name: 'taocan_goods',
      component: "MicroInsurance/vb/taocan_goods",
      meta: {
        title: '套餐-商品列表',
        mark: "taocan_goods",
        icon: "taocan_goods"
      }
    },
    {
      path: 'taocan_goodsAdd',
      name: 'taocan_goodsAdd',
      component: "MicroInsurance/vb/taocan_goodsAdd",
      hidden: "true",
      meta: {
        title: '套餐-商品列表新增/编辑',
        mark: "taocan_goodsAdd",
        icon: "taocan_goodsAdd",
        hidden: "true",
      }
    },
    {
      path: 'interestAdd',
      name: 'interestAdd',
      component: "MicroInsurance/vb/interestAdd",
      hidden: "true",
      meta: {
        title: '新增/编辑权益',
        mark: "interestAdd",
        icon: "interestAdd",
        hidden: "true",
      }
    },
  ]
},

]
module.exports = {
  OperationRouter: OperationRouter
};
