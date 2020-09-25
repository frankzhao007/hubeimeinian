import store from '@/store'
import operation from './operation';
/*
BranchOffice //分公司
Sales //销售
Hr //企业
Store //门店
daxiang //大象医生
*/
const yunying = [
    //商品管理
    "商品列表",
    "加项列表",
    "加项包组",
    //营销管理
    "配置销售店铺套餐",
    "配置小企业套餐",
    "配置企业入职套餐",
    "短信模板",
    "家庭福利金",
    "免费体检活动",
    //体检项目管理
    "体检项目列表",
    "项目类别列表",
    //订单管理
    "订单列表",
    "预约列表",
    "岗前体检",
    "开票申请列表",
    //销售管理
    "销售列表",
    //企业管理
    "企业列表",
    //员工管理
    "员工列表",
    "散户列表",
    //审批列表
    "审批列表",
    //对账管理
    "账单明细",
    "提现管理",
    //自助机管理
    "支付订单",
    "胶片管理",
    "设备管理",
    //健康俱乐部
    "俱乐部企业列表",
    "会员列表",
    "押金管理",
    "积分规则",
    "积分获取记录",
    "食物类别列表",
    "食物列表",
    "运动项目列表",
    //系统管理
    "账号列表",
    "角色列表",
    "城市列表",
    "门店列表",
    "企业参数配置",
    "白名单设置",
    "系统操作日志",
    "白名单设置",
    "数据统计",
    "短信模板库"
    // vb
    // "商品列表-vb", "加项列表-vb", "订单列表-vb", "预约列表-vb", "体检项目列表-vb", "项目类别列表-vb", "门店列表-vb", "商品_门店列表-vb", "散户列表-vb", "权益列表-vb", "套餐_商品列表-vb", "套餐_商品列表新增-vb", "权益新增-vb"
]
const BranchOffice = [
    "商品列表",
    "加项列表",
    "配置销售店铺套餐",
    "配置小企业套餐",
    "配置企业入职套餐",
    "配置分销员套餐",
    "体检项目列表",
    "订单列表",
    "预约列表",
    "销售列表",
    "岗前体检",
    "分销员列表",
    "员工列表",
    "企业列表",
    "审批列表",
    "账单明细",
    "账号列表",
    "角色列表",
    "数据统计",
    
];
const Sales = [
    "商品列表",
    "加项列表",
    "加项包组",
    "配置销售店铺套餐",
    "配置小企业套餐",
    "配置企业入职套餐",
    "分销客列表",
    "配置分销套餐",
    "订单列表",
    "预约列表",
    "开票申请列表",
    "企业列表",
    "员工列表",
    "审批列表",
    
    "账单明细",
    "账号列表",
    "角色列表"
    
];
const ywy1 = [
    "商品列表",
    "加项列表",
    "配置销售店铺套餐",
    "配置小企业套餐",
    "配置企业入职套餐",
    "分销客列表",
    "配置分销套餐",
    "订单列表",
    "预约列表",
    "开票申请列表",
    "企业列表",
    "员工列表",
    "审批列表",
    "排期管理",
    "下单列表",
    "账单明细",
    "账号列表",
    "角色列表",
    "审核列表",
    "员工设置",
    "套餐设置",
    "项目设置",
    "单位代码设置",
    "审批流程设置",
    "工作空间",
    
    // "业务员提成统计表",
];
const Hr = ["员工列表", "账号列表", "角色列表", "会员列表", "押金管理", "数据统计", "员工疫情列表"];
const Store = ["支付订单", "胶片管理", "账号列表", "角色列表"];
const daxiang = ["胶片管理", "账号列表", "角色列表"];
const weibao = ["商品列表-vb", "加项列表-vb", "订单列表-vb", "预约列表-vb", "体检项目列表-vb", "项目类别列表-vb", "门店列表-vb", "商品_门店列表-vb", "散户列表-vb", "权益列表-vb", "套餐_商品列表-vb", "套餐_商品列表新增-vb", "权益新增-vb"];
const caiwu = ['审核列表']
const neiqin = ['审核列表', '账号列表', '角色列表',"排期管理"]
const msjneiqin = [
    "商品列表",
    "加项列表",
    "配置销售店铺套餐",
    "配置小企业套餐",
    "配置企业入职套餐",
    "体检项目列表",
    "订单列表",
    "预约列表",
    "岗前体检",
    "销售列表",
    "企业列表",
    "员工列表",
    "审批列表",
    "账单明细",
    "账号列表",
    "角色列表",
];
export function filterOperation() {
    var temp = []
    // if (store.getters.getRoleInfo.AccountType=='0') {
    //     //console.log("运营账号")
    //     return operation.Operation
    // }

    console.log(store.getters.getRoleInfo);
    if (store.getters.getRoleInfo.RoleId == "8") {
        return test(ywy1)
    }
       switch ('7') {
//  switch (store.getters.getRoleInfo.AccountType) {
        // switch (store.getters.getRoleInfo.RoleId) {
        case '0':
            //console.log("运营账号")
            temp = test(yunying)
            break;
        case '1':
            //console.log("分公司账号")
            temp = test(BranchOffice)
            break;
        case '2':
            //console.log("销售账号")
            temp = test(Sales)
            break;
        case '3':
            //console.log("企业账号")
            temp = test(Hr)
            break;
        case '4':
            //console.log("门店账号")
            temp = test(Store)
            break;
        case '5':
            //console.log("大象医生账号")
            temp = test(daxiang)
            break;
        case '6':
            //console.log("微保")
            temp = test(weibao)
            break;
        case '7':
            //console.log("内勤")
            temp = test(neiqin)
            break;
        case '8':
            //console.log("内勤")
            temp = test(msjneiqin)
            break;
        case '9':
            //console.log("业务员主管")
            temp = test(ywy1)
            break;
        case '10':
            //console.log("财务")
            temp = test(caiwu)
            break;
        default:
            break;
    }
    //console.log('temp************', temp)
    return temp
}


function test(params) {
    const operations = operation.Operation
    var tempList = []
    for (let i = 0; i < operations.length; i++) {
        for (let j = 0; j < params.length; j++) {
            if (operations[i].listName == params[j]) {
                tempList.push(operations[i]);
            }
        }
    }
    return tempList
}