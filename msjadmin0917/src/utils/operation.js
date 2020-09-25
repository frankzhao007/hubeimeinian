let Operation = [
  // {
  //   management: "码上检功能",
  //   managementName: "instructions",
  //   listName: "操作指南",
  //   listAll: "全选",
  //   selected: false,
  //   partitionId: 1,
  //   isIndeterminate: false,
  //   rolesList: [
  //     {
  //       id: "1001",
  //       roleName: "查询",
  //       verifyName: "inquire",
  //       mark: "action",
  //       url: "",
  //       selected: false
  //     }
  //   ]
  // },
  // {
  //   managementName: "instructions",
  //   listName: "引导",
  //   listAll: "全选",
  //   selected: false,
  //   partitionId: 1,
  //   isIndeterminate: false,
  //   rolesList: [
  //     {
  //       id: "1002",
  //       roleName: "查询",
  //       verifyName: "inquire",
  //       mark: "guidance",
  //       url: "",
  //       selected: false
  //     }
  //   ]
  // },
  {
    management: "商品管理",
    managementName: "commodity",
    listName: "商品列表",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "001",
        roleName: "查询",
        verifyName: "inquire",
        mark: "commodity",
        url: "/qrhealth/manage/managequertgoods",
        selected: false
      },
      {
        id: "002",
        roleName: "新增",
        mark: "goodsmsg",
        verifyName: "add",
        url: "/qrhealth/manage/manageInsertGood",
        selected: false
      },
      {
        id: "3",
        roleName: "编辑",
        verifyName: "edit",
        mark: "goodsmsg",
        url: "/qrhealth/manage/manageupdategood",
        selected: false
      },
      {
        id: "4",
        roleName: "删除",
        mark: "commodity",
        verifyName: "delete",
        url: "/qrhealth/manage/managedeletegood",
        selected: false
      },
      {
        id: "5",
        roleName: "上下架",
        mark: "commodity",
        verifyName: "frame",
        url: "/qrhealth/manage/manageputwaygood",
        selected: false
      },
      {
        id: "shsp001",
        roleName: "审核商品",
        mark: "commodity",
        verifyName: "frame",
        url: "",
        selected: false
      }
    ]
  },
  {
    managementName: "commodity",
    listName: "加项列表",
    listAll: "全选",
    selected: false,
    partitionId: 2,
    isIndeterminate: false,
    rolesList: [
      {
        id: "6",
        roleName: "查询",
        mark: "addttemlist",
        verifyName: "inquire",
        url: "/qrhealth/manage/manageQueryAddPackIndex",
        selected: false
      },
      {
        id: "7",
        roleName: "新增",
        mark: "addpackage",
        verifyName: "add",
        url: "/qrhealth/manage/manageInsertAddpackage",
        selected: false
      },
      {
        id: "8",
        roleName: "编辑",
        mark: "addpackage",
        verifyName: "edit",
        url: "/qrhealth/manage/manageUpdateAddpackae",
        selected: false
      },
      {
        id: "9",
        roleName: "删除",
        mark: "addttemlist",
        verifyName: "delete",
        url: "/qrhealth/manage/manageDeleteAddpackage",
        selected: false
      },
      {
        id: "10",
        mark: "addttemlist",
        roleName: "上下架",
        verifyName: "frame",
        url: "/qrhealth/manage/managePutwayAddpackage",
        selected: false
      },
      {
        id: "11",
        roleName: "设置折扣价",
        mark: "addttemlist",
        verifyName: "discount",
        url: "/qrhealth/manage/manageSetSalePrice",
        selected: false
      }
    ]
  },
  {
    managementName: "commodity",
    listName: "加项包组",
    listAll: "全选",
    selected: false,
    partitionId: 2,
    isIndeterminate: false,
    rolesList: [
      {
        id: "apc001",
        roleName: "查询",
        mark: "addpackagecombo",
        verifyName: "query",
        url: "",
        selected: false
      },
      {
        id: "apc002",
        roleName: "编辑",
        mark: "addpackagecombomsg",
        verifyName: "edit",
        url: "",
        selected: false
      },
    ]
  },
  {
    management: "营销管理",
    managementName: "Marketing",
    listName: "配置销售店铺套餐",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "100",
        roleName: "查询",
        verifyName: "inquire",
        mark: "salesshop",
        url: "/qrhealth/manage/querySalerShop",
        selected: false
      },
      {
        id: "101",
        roleName: "新增",
        mark: "salesshop",
        verifyName: "add",
        url: "/qrhealth/manage/insertQueryGoods",
        selected: false
      },
      {
        id: "102",
        roleName: "操作",
        verifyName: "operating",
        mark: "salesshop",
        url: "/qrhealth/manage/deleteSalerShop",
        selected: false
      }
    ]
  },
  {
    managementName: "Marketing",
    listName: "配置小企业套餐",
    listAll: "全选",
    selected: false,
    partitionId: 2,
    isIndeterminate: false,
    rolesList: [
      {
        id: "103",
        roleName: "查询",
        verifyName: "inquire",
        mark: "smallbusiness",
        url: "/qrhealth/manage/findShopGoods",
        selected: false
      },
      {
        id: "104",
        roleName: "新增",
        mark: "smallbusiness",
        verifyName: "add",
        url: "/qrhealth/manage/updateShopGoods",
        selected: false
      },
      {
        id: "105",
        roleName: "操作",
        verifyName: "operating",
        mark: "smallbusiness",
        url: "/qrhealth/manage/deleteShopGoods",
        selected: false
      }
    ]
  },
  {
    managementName: "Marketing",
    listName: "配置企业入职套餐",
    listAll: "全选",
    selected: false,
    partitionId: 2,
    isIndeterminate: false,
    rolesList: [
      {
        id: "106",
        roleName: "查询",
        verifyName: "inquire",
        mark: "enterpriseentry",
        url: "/qrhealth/manage/findShopGoods",
        selected: false
      },
      {
        id: "107",
        roleName: "新增",
        mark: "enterpriseentry",
        verifyName: "add",
        url: "/qrhealth/manage/updateShopGoods",
        selected: false
      },
      {
        id: "108",
        roleName: "操作",
        verifyName: "operating",
        mark: "enterpriseentry",
        url: "/qrhealth/manage/deleteShopGoods",
        selected: false
      }
    ]
  },
  {
    managementName: "Marketing",
    listName: "短信模板",
    listAll: "全选",
    selected: false,
    partitionId: 2,
    isIndeterminate: false,
    rolesList: [
      {
        id: "112",
        roleName: "查询",
        verifyName: "inquire",
        mark: "messagetemplate",
        url: "/qrhealth/SMS/GetAll",
        selected: false
      },
      {
        id: "113",
        roleName: "编辑",
        mark: "messagetemplate",
        verifyName: "edit",
        url: "/qrhealth/SMS/UpdateByID",
        selected: false
      },
    ]
  },
  {
    managementName: "Marketing",
    listName: "配置分销员套餐",
    listAll: "全选",
    selected: false,
    partitionId: 2,
    isIndeterminate: false,
    rolesList: [
      {
        id: "116",
        roleName: "查询",
        verifyName: "inquire",
        mark: "ConfigureDistributor",
        url: "",
        selected: false
      },
      {
        id: "117",
        roleName: "编辑",
        mark: "ConfigureDistributor",
        verifyName: "edit",
        url: "",
        selected: false
      },
    ]
  },
  {
    managementName: "Marketing",
    listName: "家庭福利金",
    listAll: "全选",
    selected: false,
    partitionId: 2,
    isIndeterminate: false,
    rolesList: [
      {
        id: "114",
        roleName: "查询",
        verifyName: "inquire",
        mark: "Familybenefit",
        url: "",
        selected: false
      },
      {
        id: "115",
        roleName: "编辑",
        mark: "Fbselectemp",
        verifyName: "edit",
        url: "",
        selected: false
      },
    ]
  },
  {
    managementName: "Marketing",
    listName: "分销客列表",
    listAll: "全选",
    selected: false,
    partitionId: 2,
    isIndeterminate: false,
    rolesList: [
      {
        id: "lf-001",
        roleName: "查询",
        verifyName: "inquire",
        mark: "marketingGuest",
        url: "",
        selected: false
      },
      {
        id: "lf-002",
        roleName: "编辑",
        mark: "marketingGuest",
        verifyName: "edit",
        url: "",
        selected: false
      },
    ]
  },

  {
    managementName: "Marketing",
    listName: "配置分销套餐",
    listAll: "全选",
    selected: false,
    partitionId: 2,
    isIndeterminate: false,
    rolesList: [
      {
        id: "lf-003",
        roleName: "查询",
        verifyName: "inquire",
        mark: "allocationDistribution",
        url: "",
        selected: false
      },
      {
        id: "lf-004",
        roleName: "编辑",
        mark: "allocationDistribution",
        verifyName: "edit",
        url: "",
        selected: false
      },
    ]
  },
  {
    managementName: "Marketing",
    listName: "免费体检活动",
    listAll: "全选",
    selected: false,
    partitionId: 2,
    isIndeterminate: false,
    rolesList: [
      {
        id: "fm001",
        roleName: "查询",
        verifyName: "inquire",
        mark: "FreeMedical",
        url: "",
        selected: false
      },
      {
        id: "fm002",
        roleName: "编辑",
        mark: "Fbselectemp",
        verifyName: "edit",
        url: "",
        selected: false
      },
    ]
  },
  {
    managementName: "medicalexamination",
    management: "体检项目管理",
    listName: "体检项目列表",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "12",
        roleName: "查询",
        mark: "projectlist",
        verifyName: "inquire",
        url: "/qrhealth/manage/managequerychecks",
        selected: false
      },
      {
        id: "13",
        roleName: "新增",
        mark: "addproject",
        verifyName: "add",
        url: "/qrhealth/manage/manageInsertCheck",
        selected: false
      },
      {
        id: "14",
        roleName: "导入",
        mark: "projectlist",
        verifyName: "import",
        url: "/qrhealth/manage/manageImportChecks",
        selected: false
      },
      {
        id: "15",
        roleName: "编辑",
        mark: "addproject",
        verifyName: "edit",
        url: "/qrhealth/manage/manageUpdateCheck",
        selected: false
      },
      {
        id: "16",
        roleName: "删除",
        mark: "projectlist",
        verifyName: "delete",
        url: "/qrhealth/manage/manageDeleteCheck",
        selected: false
      }
    ]
  },
  {
    managementName: "medicalexamination",
    listName: "项目类别列表",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "17",
        roleName: "查询",
        mark: "categorylist",
        verifyName: "inquire",
        url: "/qrhealth/manage/queryCheckDir",
        selected: false
      },
      {
        id: "18",
        roleName: "新增",
        mark: "newprojectcategory",
        verifyName: "add",
        url: "/qrhealth/manage/insertCheckDir",
        selected: false
      },
      {
        id: "19",
        roleName: "编辑",
        mark: "newprojectcategory",
        verifyName: "edit",
        url: "/qrhealth/manage/updateCheckDirFir",
        selected: false
      },
      {
        id: "20",
        roleName: "删除",
        mark: "categorylist",
        verifyName: "delete",
        url: "/qrhealth/manage/deleteCheckDirFir",
        selected: false
      }
    ]
  },
  {
    managementName: "ordermanagement",
    management: "订单管理",
    listName: "订单列表",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "21",
        roleName: "查询",
        mark: "orderlist",
        verifyName: "inquire",
        url: "/qrhealth/order/orderSearch",
        selected: false
      },
      {
        id: "22",
        roleName: "导出",
        mark: "orderlist",
        verifyName: "export",
        url: "/qrhealth/order/orderDownload",
        selected: false
      },
      {
        id: "23",
        roleName: "退款",
        mark: "orderlist",
        verifyName: "refund",
        url: "/qrhealth/order/operationOrder",
        selected: false
      },
      {
        id: "24",
        roleName: "取消申请退款",
        mark: "orderlist",
        verifyName: "cancel",
        url: "/qrhealth/order/operationOrder",
        selected: false
      },
      {
        id: "25",
        roleName: "发起退款",
        mark: "orderlist",
        verifyName: "delete",
        url: "/qrhealth/order/operationOrder",
        selected: false
      },
      {
        id: "26",
        roleName: "订单完成",
        mark: "orderlist",
        verifyName: "initiate",
        url: "/qrhealth/order/operationOrder",
        selected: false
      },
      {
        id: "27",
        roleName: "备注",
        mark: "orderlist",
        verifyName: "remarks",
        url: "/qrhealth/order/remarks",
        selected: false
      },
      {
        id: "28",
        roleName: "查看详情",
        mark: "ordermsg",
        verifyName: "details",
        url: "/qrhealth/order/lookOrder",
        selected: false
      }
    ]
  },
  {
    managementName: "ordermanagement",
    listName: "预约列表",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "29",
        roleName: "查询",
        mark: "reservationlist",
        verifyName: "inquire",
        url: "/qrhealth/order/reservationSearch",
        selected: false
      },
      {
        id: "30",
        roleName: "导出",
        mark: "reservationlist",
        verifyName: "export",
        url: "/qrhealth/order/orderDownload",
        selected: false
      },
      {
        id: "31",
        roleName: "修改预约状态",
        mark: "reservationlist",
        verifyName: "modify",
        url: "/qrhealth/order/reservationOperate",
        selected: false
      },
      {
        id: "32",
        roleName: "批量修改预约状态",
        mark: "reservationlist",
        verifyName: "batch",
        url: "/qrhealth/order/reservationOperate",
        selected: false
      },
      {
        id: "33",
        roleName: "预约记录",
        mark: "reservationlist",
        verifyName: "record",
        url: "/qrhealth/order/lookDetailsReserve",
        selected: false
      },
      {
        id: "34",
        roleName: "编辑",
        mark: "reservationlist",
        verifyName: "edit",
        url: "/qrhealth/order/updateReserve",
        selected: false
      },
      {
        id: "35",
        roleName: "备注",
        mark: "reservationlist",
        verifyName: "remarks",
        url: "/qrhealth/order/remarks",
        selected: false
      }
    ]
  },
  {
    managementName: "ordermanagement",
    listName: "岗前体检",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "ppp001",
        roleName: "查询",
        mark: "Pppexamination",
        verifyName: "query",
        url: "",
        selected: false
      },
    ]
  },
  {
    managementName: "ordermanagement",
    listName: "开票申请列表",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "KP001",
        roleName: "查询",
        mark: "InvoiceManage",
        verifyName: "query",
        url: "",
        selected: false
      },
      {
        id: "KP002",
        roleName: "编辑",
        mark: "InvoiceManage",
        verifyName: "edit",
        url: "",
        selected: false
      },

    ]
  },
  {
    managementName: "salesmanagement",
    management: "销售管理",
    listName: "销售列表",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "36",
        roleName: "查询",
        mark: "saleslist",
        verifyName: "inquire",
        url: "/qrhealth/sales/findSalesManag",
        selected: false
      },
      {
        id: "37",
        roleName: "新增",
        verifyName: "add",
        mark: "saleslist",
        url: "/qrhealth/account/pushOne",
        selected: false
      },
      {
        id: "38",
        roleName: "绩效配置",
        mark: "saleslist",
        verifyName: "performance",
        url: "/qrhealth/sales/updateSalesKpiInfo",
        selected: false
      }
    ]
  },
  {
    managementName: "salesmanagement",
    listName: "分销员列表",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "3001",
        roleName: "查询",
        mark: "distributionlist",
        verifyName: "query",
        url: "",
        selected: false
      },
      {
        id: "3002",
        roleName: "新增",
        verifyName: "add",
        mark: "distributionlist",
        url: "",
        selected: false
      },
      {
        id: "3003",
        roleName: "编辑",
        mark: "distributionlist",
        verifyName: "edit",
        url: "",
        selected: false
      }
    ]
  },
  {
    managementName: "enterprisemanagement",
    management: "企业管理",
    listName: "企业列表",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "39",
        roleName: "查询",
        mark: "enterpriselist",
        verifyName: "inquire",
        url: "/qrhealth/busines/findBusiness",
        selected: false
      },
      {
        id: "40",
        roleName: "新增",
        verifyName: "add",
        mark: "enterpriselist",
        url: "/qrhealth/account/pushOne",
        selected: false
      },
      {
        id: "41",
        roleName: "套餐配置",
        mark: "enterpriseconfiguration",
        verifyName: "package",
        url: "/qrhealth/manage/manageUpdateSku",
        selected: false
      },
      {
        id: "110",
        roleName: "福利劵金额配置",
        mark: "welfarevoucher",
        verifyName: "amount",
        url: "/qrhealth/sales/insertWelfareVoucher",
        selected: false
      },
      {
        id: "lf-330",
        roleName: "企业参数配置",
        mark: "configurationData",
        verifyName: "select",
        url: "/qrhealth/manage/manageUpdateSku",
        selected: false
      },
      {
        id: "lf-333",
        roleName: "选择短信模板",
        mark: "selectTemplate",
        verifyName: "select",
        url: "/qrhealth/smsTemplate/enterpriseChooseSms",
        selected: false
      },
      {
        id: "lf-0324",
        roleName: "门店个性化",
        mark: "setpersonalized",
        verifyName: "shop",
        url: "/qrhealth/smsTemplate/setpersonalized",
        selected: false
      },
      {
        id: "lf-0325",
        roleName: "排期设置",
        mark: "setschedule",
        verifyName: "schedule",
        url: "/qrhealth/smsTemplate/setschedule",
        selected: false
      },
      {
        id: "lf-0326",
        roleName: "邮寄报告",
        mark: "mailReport",
        verifyName: "site",
        url: "/qrhealth/smsTemplate/mailReport",
        selected: false
      },
      {
        id: "lf-0327",
        roleName: "查看邮寄详情",
        mark: "mailParticulars",
        verifyName: "lookmail",
        url: "/qrhealth/smsTemplate/mailParticulars",
        selected: false
      },
    ]
  },
  {
    managementName: "noteList",
    listName: "短信模板库",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "lf-0302",
        roleName: "查询",
        mark: "shortNote",
        verifyName: "inquire",
        url: "",
        selected: false
      },
      {
        id: "lf-0330",
        roleName: "新增",
        mark: "addNote",
        verifyName: "addNote",
        url: "",
        selected: false
      },
    ]
  },
  {
    managementName: "staffmanagement",
    management: "员工管理",
    listName: "员工列表",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "42",
        roleName: "查询",
        mark: "stafflist",
        verifyName: "inquire",
        url: "/qrhealth/employee/findEmployees",
        selected: false
      },
      {
        id: "43",
        roleName: "新增",
        verifyName: "add",
        mark: "newemployee",
        url: "/qrhealth/employee/addEmployee",
        selected: false
      },
      {
        id: "44",
        roleName: "导入",
        mark: "stafflist",
        verifyName: "import",
        url: "/qrhealth/employee/excelAddEmployees",
        selected: false
      },
      {
        id: "45",
        roleName: "编辑",
        mark: "newemployee",
        verifyName: "edit",
        url: "/qrhealth/employee/updateEmployee",
        selected: false
      },
      {
        id: "46",
        roleName: "删除",
        mark: "stafflist",
        verifyName: "delete",
        url: "/qrhealth/employee/deleteEmployee",
        selected: false
      },
      {
        id: "47",
        roleName: "审核",
        mark: "stafflist",
        verifyName: "review",
        url: "/qrhealth/employee/upStaffManage",
        selected: false
      },
      {
        id: "48",
        roleName: "套餐配置",
        mark: "configurationpackage",
        verifyName: "package",
        url: "/qrhealth/employee/updataPubMeal",
        selected: false
      },
      {
        id: "109",
        roleName: "福利劵金额配置",
        mark: "saleswelfarevoucher",
        verifyName: "amount",
        url: "/qrhealth/sales/insertWelfareVoucher",
        selected: false
      }
    ]
  },

  {
    managementName: "staffmanagement",
    listName: "散户列表",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "49",
        roleName: "查询",
        mark: "retaillist",
        verifyName: "inquire",
        url: "/qrhealth/employee/findCasualClient",
        selected: false
      },
      {
        id: "50",
        roleName: "封号",
        mark: "retaillist",
        verifyName: "banned",
        url: "/qrhealth/employee/upCasualClient",
        selected: false
      }
    ]
  },
  {
    managementName: "approvalmanagement",
    management: "审批管理",
    listName: "审批列表",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "51",
        roleName: "查询",
        mark: "approvallist",
        verifyName: "inquire",
        url: "/qrhealth/approval/findApprovals",
        selected: false
      },
      {
        id: "52",
        roleName: "新增",
        verifyName: "add",
        mark: "newapproval",
        url: "/qrhealth/approval/addApproval",
        selected: false
      },
      {
        id: "53",
        roleName: "预览",
        mark: "content",
        verifyName: "preview",
        url: "/qrhealth/approval/findApprovals",
        selected: false
      },
      {
        id: "54",
        roleName: "导出",
        mark: "approvallist",
        verifyName: "export",
        url: "/qrhealth/approval/excelApproval",
        selected: false
      },
      {
        id: "55",
        roleName: "审核",
        mark: "approvallist",
        verifyName: "review",
        url: "/qrhealth/approval/updateApproval",
        selected: false
      }
    ]
  },
  {
    managementName: "OrderManagement",
    management: "下单管理",
    listName: "下单列表",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "OM001",
        roleName: "查询",
        mark: "OrderManagelist",
        verifyName: "query",
        url: "",
        selected: false
      },
      {
        id: "OM002",
        roleName: "查询/编辑订单基本情况",
        mark: "OrderBasicDetails",
        verifyName: "edit0",
        url: "",
        selected: false
      },
      {
        id: "OM003",
        roleName: "查询/编辑订单套餐信息",
        mark: "OrderComboDetails",
        verifyName: "edit1",
        url: "",
        selected: false
      },
    ]
  },
  {
    managementName: "DataManagement",
    management: "数据管理",
    listName: "员工设置",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "ES001",
        roleName: "查询",
        mark: "EmployeeSettin",
        verifyName: "query",
        url: "",
        selected: false
      },
      {
        id: "ES002",
        roleName: "编辑",
        mark: "EmployeeSettin",
        verifyName: "edit",
        url: "",
        selected: false
      },
    ]
  },
  {
    managementName: "DataManagement",
    listName: "套餐设置",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "PkS001",
        roleName: "查询",
        mark: "PackageSetting",
        verifyName: "query",
        url: "",
        selected: false
      },
      {
        id: "PkS002",
        roleName: "编辑",
        mark: "PackageSettingmsg",
        verifyName: "edit",
        url: "",
        selected: false
      },
      // {
      //   id: "PkS003",
      //   roleName: "编辑",
      //   mark: "PackageSetting",
      //   verifyName: "edit",
      //   url: "",
      //   selected: false
      // },
    ]
  },
  {
    managementName: "DataManagement",
    listName: "项目设置",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "PoS001",
        roleName: "查询",
        mark: "ProjectSeeting",
        verifyName: "query",
        url: "",
        selected: false
      },
      {
        id: "PoS002",
        roleName: "编辑",
        mark: "ProjectSeetingmsg",
        verifyName: "edit",
        url: "",
        selected: false
      },
    ]
  },
  {
    managementName: "DataManagement",
    listName: "单位代码设置",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "UC001",
        roleName: "查询",
        mark: "UnitCode",
        verifyName: "query",
        url: "",
        selected: false
      },
      {
        id: "UC002",
        roleName: "编辑",
        mark: "UnitCodemsg",
        verifyName: "edit",
        url: "",
        selected: false
      },
    ]
  },
  {
    managementName: "DataManagement",
    listName: "审批流程设置",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "APS001",
        roleName: "查询",
        mark: "auditProcessSettings",
        verifyName: "query",
        url: "",
        selected: false
      },
      {
        id: "APS002",
        roleName: "编辑",
        mark: "auditProcessSettings",
        verifyName: "edit",
        url: "",
        selected: false
      },
    ]
  },
  {
    managementName: "CommissionHB",
    management: "提成计算",
    listName: "工作空间",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "chb001",
        roleName: "查询",
        mark: "CommissionHubei",
        verifyName: "query",
        url: "",
        selected: false
      },
      {
        id: "chb002",
        roleName: "编辑",
        mark: "CommissionHubei",
        verifyName: "edit",
        url: "",
        selected: false
      },
    ]
  },
  {
    managementName: "CommissionHB",
    management: "提成计算",
    listName: "业务员提成统计表",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "chb003",
        roleName: "查询",
        mark: "CommissionMsg",
        verifyName: "query",
        url: "",
        selected: false
      },
      {
        id: "chb004",
        roleName: "编辑",
        mark: "CommissionMsg",
        verifyName: "edit",
        url: "",
        selected: false
      },
    ]
  },
  {
    managementName: "AuditManagement",
    management: "审核管理",
    listName: "审核列表",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "AM001",
        roleName: "查询",
        mark: "AuditList",
        verifyName: "query",
        url: "",
        selected: false
      },
      {
        id: "OM002",
        roleName: "查询/编辑订单基本情况",
        mark: "AmOrderBasicDetails",
        verifyName: "edit0",
        url: "",
        selected: false
      },
      {
        id: "OM003",
        roleName: "查询/编辑订单套餐信息",
        mark: "AmOrderComboDetails",
        verifyName: "edit1",
        url: "",
        selected: false
      },
    ]
  },
   {
    managementName: "ScheduleManagement",
    management: "排期管理",
    listName: "排期管理",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "AM001",
        roleName: "查询",
        mark: "ScheduleList",
        verifyName: "query",
        url: "",
        selected: false
      },
      {
        id: "OM002",
        roleName: "查询/编辑订单基本情况",
        mark: "CheckSchedule",
        verifyName: "edit0",
        url: "",
        selected: false
      },
      {
        id: "OM002",
        roleName: "查询/编辑排期基本情况",
        mark: "OrderSchedule",
        verifyName: "edit0",
        url: "",
        selected: false
      }
      
    ]
  },
  {
    managementName: "reconciliationmanagement",
    management: "对账管理",
    listName: "账单明细",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "56",
        roleName: "查询",
        mark: "billingdetails",
        verifyName: "inquire",
        url: "/qrhealth/billDetail/findBillDetails",
        selected: false
      },
      {
        id: "57",
        roleName: "导出",
        mark: "billingdetails",
        verifyName: "export",
        url: "/qrhealth/billDetail/excelBillDetail",
        selected: false
      },
      {
        id: "58",
        roleName: "详情",
        mark: "billingdetails",
        verifyName: "details",
        url: "/qrhealth/order/lookOrder",
        selected: false
      }
    ]
  },
  {
    managementName: "reconciliationmanagement",
    // management: "对账管理",
    listName: "提现管理",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "119",
        roleName: "查询",
        mark: "CashManagement",
        verifyName: "query",
        url: "",
        selected: false
      },
      {
        id: "120",
        roleName: "编辑",
        mark: "CashManagement",
        verifyName: "edit",
        url: "",
        selected: false
      },
    ]
  },


  {
    managementName: "selfServiceDeviceManagement",
    management: "自助机管理",
    listName: "支付订单",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "76",
        roleName: "查询",
        mark: "paymentorder",
        verifyName: "inquire",
        url: "/qrhealth/film/web/searchOrder",
        selected: false
      },
      {
        id: "77",
        roleName: "导出",
        mark: "paymentorder",
        verifyName: "export",
        url: "/qrhealth/film/web/orderExport",
        selected: false
      },
      {
        id: "78",
        roleName: "查看详情",
        mark: "paymentorder",
        verifyName: "details",
        url: "/qrhealth/film/web/orderDetails",
        selected: false
      },
      {
        id: "79",
        roleName: "备注",
        mark: "paymentorder",
        verifyName: "remarks",
        url: "/qrhealth/film/web/setNote",
        selected: false
      }
    ]
  },
  {
    managementName: "selfServiceDeviceManagement",
    listName: "胶片管理",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "80",
        roleName: "查询",
        mark: "filmmanagement",
        verifyName: "inquire",
        url: "/qrhealth/film/web/filmOrder",
        selected: false
      },
      {
        id: "81",
        roleName: "导出",
        mark: "filmmanagement",
        verifyName: "export",
        url: "/qrhealth/film/web/filmOrderExport",
        selected: false
      },
      {
        id: "82",
        roleName: "发货",
        mark: "filmmanagement",
        verifyName: "ship",
        url: "/qrhealth/film/web/singleConsignment",
        selected: false
      },
      {
        id: "83",
        roleName: "批量发货",
        mark: "filmmanagement",
        verifyName: "batch",
        url: "/qrhealth/film/web/bulkConsignment",
        selected: false
      },
      {
        id: "84",
        roleName: "修改发货",
        mark: "filmmanagement",
        verifyName: "modify",
        url: "/qrhealth/film/web/alertLogistics",
        selected: false
      },
      {
        id: "85",
        roleName: "查看详情",
        mark: "filmorderdetails",
        verifyName: "details",
        url: "/qrhealth/film/web/orderDetails",
        selected: false
      },
      {
        id: "86",
        roleName: "备注",
        mark: "filmmanagement",
        verifyName: "remarks",
        url: "/qrhealth/film/web/setNote",
        selected: false
      }
    ]
  },
  {
    managementName: "selfServiceDeviceManagement",
    listName: "设备管理",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "EM001",
        roleName: "查询",
        mark: "EquipmentManagement",
        verifyName: "query",
        url: "",
        selected: false
      },
      {
        id: "EM002",
        roleName: "编辑",
        mark: "EquipmentManagement",
        verifyName: "edit",
        url: "",
        selected: false
      },
    ]
  },
  // 健康俱乐部--------------------------------------------
  {
    managementName: "healthclub",
    management: "健康俱乐部",
    listName: "俱乐部企业列表",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "200",
        roleName: "查询",
        mark: "businesslist",
        verifyName: "inquire",
        url: "",
        selected: false
      },
      {
        id: "201",
        roleName: "新增",
        mark: "businesslist",
        verifyName: "add",
        url: "",
        selected: false
      },
      {
        id: "202",
        roleName: "企业配置",
        mark: "businesslist",
        verifyName: "configuration",
        url: "",
        selected: false
      },
      {
        id: "203",
        roleName: "激励方案",
        mark: "businesslist",
        verifyName: "incentiveplan",
        url: "",
        selected: false
      },
      {
        id: "204",
        roleName: "删除",
        mark: "businesslist",
        verifyName: "delete",
        url: "",
        selected: false
      }
    ]
  },
  {
    managementName: "healthclub",
    // management: "健康俱乐部",
    listName: "会员列表",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "210",
        roleName: "查询",
        mark: "memberlist",
        verifyName: "inquire",
        url: "",
        selected: false
      }
    ]
  },
  {
    managementName: "healthclub",
    listName: "押金管理",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "220",
        roleName: "查询",
        mark: "depositmanagement",
        verifyName: "inquire",
        url: "",
        selected: false
      },
      {
        id: "221",
        roleName: "审核",
        mark: "depositmanagement",
        verifyName: "review",
        url: "",
        selected: false
      }
    ]
  },
  {
    managementName: "healthclub",
    listName: "积分规则",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "230",
        roleName: "查询",
        mark: "integralrules",
        verifyName: "inquire",
        url: "",
        selected: false
      },
      {
        id: "231",
        roleName: "设置",
        mark: "integralrules",
        verifyName: "setting",
        url: "",
        selected: false
      }
    ]
  },
  {
    managementName: "healthclub",
    listName: "积分获取记录",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "240",
        roleName: "查询",
        mark: "integralrecord",
        verifyName: "inquire",
        url: "",
        selected: false
      }
    ]
  },
  {
    managementName: "healthclub",
    listName: "食物类别列表",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "250",
        roleName: "查询",
        mark: "foodcategorylist",
        verifyName: "inquire",
        url: "",
        selected: false
      },
      {
        id: "251",
        roleName: "新增",
        mark: "foodcategorylist",
        verifyName: "add",
        url: "",
        selected: false
      },
      {
        id: "252",
        roleName: "排序",
        mark: "foodcategorylist",
        verifyName: "sort",
        url: "",
        selected: false
      },
      {
        id: "253",
        roleName: "编辑",
        mark: "foodcategorylist",
        verifyName: "edit",
        url: "",
        selected: false
      },
      {
        id: "254",
        roleName: "删除",
        mark: "foodcategorylist",
        verifyName: "delete",
        url: "",
        selected: false
      }
    ]
  },
  {
    managementName: "healthclub",
    listName: "食物列表",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "260",
        roleName: "查询",
        mark: "foodlist",
        verifyName: "inquire",
        url: "",
        selected: false
      },
      {
        id: "261",
        roleName: "新增",
        mark: "foodlist",
        verifyName: "add",
        url: "",
        selected: false
      },
      {
        id: "262",
        roleName: "查看",
        mark: "foodlist",
        verifyName: "view",
        url: "",
        selected: false
      },
      {
        id: "263",
        roleName: "编辑",
        mark: "foodlist",
        verifyName: "edit",
        url: "",
        selected: false
      },
      {
        id: "264",
        roleName: "删除",
        mark: "foodlist",
        verifyName: "delete",
        url: "",
        selected: false
      }
    ]
  },
  {
    managementName: "healthclub",
    listName: "运动项目列表",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "270",
        roleName: "查询",
        mark: "sportslist",
        verifyName: "inquire",
        url: "",
        selected: false
      },
      {
        id: "271",
        roleName: "新增",
        mark: "sportslist",
        verifyName: "add",
        url: "",
        selected: false
      },
      {
        id: "272",
        roleName: "编辑",
        mark: "sportslist",
        verifyName: "edit",
        url: "",
        selected: false
      },
      {
        id: "273",
        roleName: "删除",
        mark: "sportslist",
        verifyName: "delete",
        url: "",
        selected: false
      }
    ]
  },
  // 系统管理--------------------------------------------
  {
    managementName: "accountmanagement",
    management: "系统管理",
    listName: "账号列表",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "59",
        roleName: "查询",
        mark: "accountlist",
        verifyName: "inquire",
        url: "/qrhealth/account/pullAll",
        selected: false
      },
      {
        id: "60",
        roleName: "新增",
        mark: "accountlist",
        verifyName: "add",
        url: "/qrhealth/account/pushOne",
        selected: false
      },
      {
        id: "61",
        roleName: "编辑",
        mark: "accountlist",
        verifyName: "edit",
        url: "/qrhealth/account/update",
        selected: false
      },
      {
        id: "62",
        roleName: "审核",
        mark: "accountlist",
        verifyName: "review",
        url: "/qrhealth/account/check",
        selected: false
      },
      {
        id: "63",
        roleName: "新增子账号",
        mark: "addaccount",
        verifyName: "subAccount",
        url: "/qrhealth/account/pushSon",
        selected: false
      },
      {
        id: "zh001",
        roleName: "编辑账号角色",
        mark: "addaccount",
        verifyName: "UpdateRoleByMobile",
        url: "/qrhealth/account/UpdateRoleByMobile",
        selected: false
      }
    ]
  },
  {
    managementName: "accountmanagement",
    listName: "角色列表",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "64",
        roleName: "查询",
        mark: "rolelist",
        verifyName: "inquire",
        url: "/qrhealth/role/pullAll",
        selected: false
      },
      {
        id: "65",
        roleName: "新增",
        mark: "newrole",
        verifyName: "add",
        url: "/qrhealth/role/pushOne",
        selected: false
      },
      {
        id: "66",
        roleName: "编辑",
        mark: "newrole",
        verifyName: "edit",
        url: "/qrhealth/role/update",
        selected: false
      },
      {
        id: "67",
        roleName: "删除",
        mark: "rolelist",
        verifyName: "delete",
        url: "/qrhealth/role/DeleteById",
        selected: false
      }
    ]
  },
  {
    managementName: "accountmanagement",
    listName: "城市列表",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "68",
        roleName: "查询",
        mark: "citylist",
        verifyName: "inquire",
        url: "/qrhealth/city/pullAll",
        selected: false
      },
      {
        id: "69",
        roleName: "新增",
        mark: "citylist",
        verifyName: "add",
        url: "/qrhealth/city/pushOne",
        selected: false
      },
      {
        id: "70",
        roleName: "编辑",
        mark: "citylist",
        verifyName: "edit",
        url: "/qrhealth/city/update",
        selected: false
      },
      {
        id: "71",
        roleName: "删除",
        mark: "citylist",
        verifyName: "delete",
        url: "/qrhealth/city/delete",
        selected: false
      }
    ]
  },
  {
    managementName: "accountmanagement",
    listName: "门店列表",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "72",
        roleName: "查询",
        mark: "storelist",
        verifyName: "inquire",
        url: "/qrhealth/center/pullAll",
        selected: false
      },
      {
        id: "73",
        roleName: "新增",
        mark: "storelist",
        verifyName: "add",
        url: "/qrhealth/center/pushOne",
        selected: false
      },
      {
        id: "74",
        roleName: "编辑",
        mark: "storelist",
        verifyName: "edit",
        url: "/qrhealth/center/update",
        selected: false
      },
      {
        id: "75",
        roleName: "预览",
        mark: "storelist",
        verifyName: "preview",
        url: "/qrhealth/center/pullOne",
        selected: false
      }
    ]
  },
  {
    managementName: "accountmanagement",
    listName: "企业参数配置",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "121",
        roleName: "查询",
        mark: "EnterpriseOption",
        verifyName: "query",
        url: "",
        selected: false
      },
      {
        id: "122",
        roleName: "编辑",
        mark: "EnterpriseOption",
        verifyName: "edit",
        url: "",
        selected: false
      },
      {
        id: "lf_330",
        roleName: "套餐编码",
        mark: "comboCode",
        verifyName: "code",
        url: "",
        selected: false
      },
    ]
  },
  {
    managementName: "accountmanagement",
    listName: "系统操作日志",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "xt001",
        roleName: "查询",
        mark: "SystemOperationLog",
        verifyName: "query",
        url: "",
        selected: false
      },
      {
        id: "xt002",
        roleName: "查询",
        mark: "SystemOperationLog",
        verifyName: "edit",
        url: "",
        selected: false
      },
    ]
  },
  {
    managementName: "accountmanagement",
    listName: "白名单设置",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "bmd001",
        roleName: "查询",
        mark: "whiteList",
        verifyName: "query",
        url: "",
        selected: false
      },
      {
        id: "bmd002",
        roleName: "编辑",
        mark: "whiteList",
        verifyName: "edit",
        url: "",
        selected: false
      },
    ]
  },

  {
    managementName: "accountmanagement",
    listName: "数据统计",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "lf_021",
        roleName: "查看",
        mark: "dataReport",
        verifyName: "look",
        url: "",
        selected: false
      },
      {
        id: "lf_022",
        roleName: "导出",
        mark: "dataReport",
        verifyName: "export",
        url: "",
        selected: false
      },
      {
        id: "lf_023",
        roleName: "查看详情",
        mark: "staffMessage",
        verifyName: "details",
        url: "",
        selected: false
      },
    ]
  },
  //微保---------------------------------------------------
  {
    management: "商品管理-vb",
    managementName: "MicroInsurance",
    listName: "商品列表-vb",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "vb101",
        roleName: "查询",
        mark: "productCatalogy",
        verifyName: "query",
        url: "",
        selected: false
      },
      {
        id: "vb102",
        roleName: "编辑",
        mark: "packListAdd",
        verifyName: "edit",
        url: "",
        selected: false
      },
    ]
  },
  {
    managementName: "MicroInsurance",
    listName: "加项列表-vb",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "vb201",
        roleName: "查询",
        mark: "packingList",
        verifyName: "query",
        url: "",
        selected: false
      },
      {
        id: "vb202",
        roleName: "编辑",
        mark: "packageadd",
        verifyName: "edit",
        url: "",
        selected: false
      },
    ]
  },


  {
    managementName: "vbordermanage",
    management: "订单管理-vb",
    listName: "订单列表-vb",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "vb601",
        roleName: "查询",
        mark: "vborderList",
        verifyName: "inquire",
        url: "/qrhealth/order/orderSearch",
        selected: false
      },
      {
        id: "vb602",
        roleName: "导出",
        mark: "importexcelorder",
        verifyName: "export",
        url: "/qrhealth/order/orderDownload",
        selected: false
      },
      {
        id: "vb603",
        roleName: "退款",
        mark: "vborderList",
        verifyName: "refund",
        url: "/qrhealth/order/operationOrder",
        selected: false
      },
      {
        id: "vb604",
        roleName: "取消申请退款",
        mark: "vborderList",
        verifyName: "cancel",
        url: "/qrhealth/order/operationOrder",
        selected: false
      },
      {
        id: "vb605",
        roleName: "发起退款",
        mark: "vborderList",
        verifyName: "delete",
        url: "/qrhealth/order/operationOrder",
        selected: false
      },
      {
        id: "vb606",
        roleName: "订单完成",
        mark: "vborderList",
        verifyName: "initiate",
        url: "/qrhealth/order/operationOrder",
        selected: false
      },
      {
        id: "vb607",
        roleName: "备注",
        mark: "vborderList",
        verifyName: "remarks",
        url: "/qrhealth/order/remarks",
        selected: false
      },
      {
        id: "vb608",
        roleName: "查看详情",
        mark: "vbordermsg",
        verifyName: "details",
        url: "/qrhealth/order/lookOrder",
        selected: false
      }
    ]
  },
  {
    managementName: "vbordermanage",
    listName: "预约列表-vb",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "vb1101",
        roleName: "查询",
        mark: "vbyuyuelist",
        verifyName: "inquire",
        url: "/qrhealth/order/reservationSearch",
        selected: false
      },
      {
        id: "vb1102",
        roleName: "导出",
        mark: "vbyuyuelist",
        verifyName: "export",
        url: "/qrhealth/order/orderDownload",
        selected: false
      },
      {
        id: "vb1103",
        roleName: "修改预约状态",
        mark: "vbyuyuelist",
        verifyName: "modify",
        url: "/qrhealth/order/reservationOperate",
        selected: false
      },
      {
        id: "vb1104",
        roleName: "批量修改预约状态",
        mark: "vbyuyuelist",
        verifyName: "batch",
        url: "/qrhealth/order/reservationOperate",
        selected: false
      },
      {
        id: "vb1105",
        roleName: "预约记录",
        mark: "vbyuyuelist",
        verifyName: "record",
        url: "/qrhealth/order/lookDetailsReserve",
        selected: false
      },
      {
        id: "vb1106",
        roleName: "编辑",
        mark: "vbyuyuelist",
        verifyName: "edit",
        url: "/qrhealth/order/updateReserve",
        selected: false
      },
      {
        id: "vb1107",
        roleName: "备注",
        mark: "vbyuyuelist",
        verifyName: "remarks",
        url: "/qrhealth/order/remarks",
        selected: false
      }
    ]
  },
  {
    management: "体检项目管理-vb",
    managementName: "vbmedicalexamination",
    listName: "体检项目列表-vb",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "vb301",
        roleName: "查询",
        mark: "tijianproject",
        verifyName: "inquire",
        url: "/qrhealth/manage/managequerychecks",
        selected: false
      },
      {
        id: "vb302",
        roleName: "新增",
        mark: "tijianprojectadd",
        verifyName: "add",
        url: "/qrhealth/manage/manageInsertCheck",
        selected: false
      },
      {
        id: "vb303",
        roleName: "导入",
        mark: "tijianproject",
        verifyName: "import",
        url: "/qrhealth/manage/manageImportChecks",
        selected: false
      },
      {
        id: "vb304",
        roleName: "编辑",
        mark: "tijianprojectadd",
        verifyName: "edit",
        url: "/qrhealth/manage/manageUpdateCheck",
        selected: false
      },
      {
        id: "vb305",
        roleName: "删除",
        mark: "tijianproject",
        verifyName: "delete",
        url: "/qrhealth/manage/manageDeleteCheck",
        selected: false
      }
    ]
  },
  {
    managementName: "vbmedicalexamination",
    listName: "项目类别列表-vb",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "vb401",
        roleName: "查询",
        mark: "tijiancatalogy",
        verifyName: "inquire",
        url: "/qrhealth/manage/queryCheckDir",
        selected: false
      },
      {
        id: "vb402",
        roleName: "新增",
        mark: "secondProjectAdd",
        verifyName: "add",
        url: "/qrhealth/manage/insertCheckDir",
        selected: false
      },
      {
        id: "vb403",
        roleName: "编辑",
        mark: "secondProjectAdd",
        verifyName: "edit",
        url: "/qrhealth/manage/updateCheckDirFir",
        selected: false
      },
      {
        id: "vb404",
        roleName: "删除",
        mark: "tijiancatalogy",
        verifyName: "delete",
        url: "/qrhealth/manage/deleteCheckDirFir",
        selected: false
      }
    ]
  },
  {
    management: "门店管理-vb",
    managementName: "vbmendianguanli",
    listName: "门店列表-vb",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "vb501",
        roleName: "查询",
        mark: "mendianList",
        verifyName: "inquire",
        url: "/qrhealth/center/pullAll",
        selected: false
      },
      {
        id: "vb502",
        roleName: "预览",
        mark: "mendianList",
        verifyName: "preview",
        url: "/qrhealth/center/pullOne",
        selected: false
      }
    ]
  },
  {
    management: "微保管理-vb",
    managementName: "vbmanager",
    listName: "商品_门店列表-vb",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "vb701",
        roleName: "查询",
        mark: "goods_mendian",
        verifyName: "inquire",
        url: "",
        selected: false
      },
      {
        id: "vb702",
        roleName: "编辑",
        mark: "goods_mendian",
        verifyName: "preview",
        url: "",
        selected: false
      }
    ]
  },
  {
    managementName: "vbmanager",
    listName: "散户列表-vb",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "vb801",
        roleName: "查询",
        mark: "person",
        verifyName: "inquire",
        url: "",
        selected: false
      },
      {
        id: "vb802",
        roleName: "编辑",
        mark: "person",
        verifyName: "preview",
        url: "",
        selected: false
      }
    ]
  },
  {
    managementName: "vbmanager",
    listName: "权益列表-vb",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "vb901",
        roleName: "查询",
        mark: "interest",
        verifyName: "inquire",
        url: "",
        selected: false
      },
      {
        id: "vb902",
        roleName: "编辑",
        mark: "interest",
        verifyName: "preview",
        url: "",
        selected: false
      }
    ]
  },
  {
    managementName: "vbmanager",
    listName: "套餐_商品列表-vb",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "vb1001",
        roleName: "查询",
        mark: "taocan_goods",
        verifyName: "inquire",
        url: "",
        selected: false
      },
      {
        id: "vb1002",
        roleName: "编辑",
        mark: "taocan_goods",
        verifyName: "preview",
        url: "",
        selected: false
      }
    ]
  },
  {
    managementName: "vbmanager",
    listName: "套餐_商品列表新增-vb",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "vb1001",
        roleName: "查询",
        mark: "taocan_goodsAdd",
        verifyName: "inquire",
        url: "",
        selected: false
      },
      {
        id: "vb1002",
        roleName: "编辑",
        mark: "taocan_goodsAdd",
        verifyName: "preview",
        url: "",
        selected: false
      }
    ]
  },
  {
    managementName: "vbmanager",
    listName: "权益新增-vb",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "vb1001",
        roleName: "查询",
        mark: "interestAdd",
        verifyName: "inquire",
        url: "",
        selected: false
      },
      {
        id: "vb1002",
        roleName: "编辑",
        mark: "interestAdd",
        verifyName: "preview",
        url: "",
        selected: false
      }
    ]
  },
  {
    managementName: "ESManagement",
    management: "员工疫情日报",
    listName: "员工疫情列表",
    listAll: "全选",
    selected: false,
    partitionId: 1,
    isIndeterminate: false,
    rolesList: [
      {
        id: "ES0001",
        roleName: "查询",
        mark: "ESEmployeelist",
        verifyName: "query",
        url: "",
        selected: false
      },
      {
        id: "ES0002",
        roleName: "详情",
        mark: "ESEmployeedetails",
        verifyName: "msg",
        url: "",
        selected: false
      },
    ]
  },

];
module.exports = { Operation: Operation };
