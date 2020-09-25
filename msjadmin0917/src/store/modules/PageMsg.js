const state = {
    packagelistmsg: {},// 商品列表页面信息
    addttemlistmsg: {},//加项列表页面信息
    salesshopmsg: {},//销售店铺页面信息
    smallbusinessmsg: {},//小企业页面信息
    enterpriseentrymsg: {},//企业入职msg
    messagetemplatemsg: {},//短信模板msg
    projectlistmsg: {},//体检项目msg
    orderlistmsg: {},//订单列表msg
    reservationlistmsg: {},//预约列表msg
    saleslistmsg: {},//销售列表msg
    enterpriselistmsg: {},//企业列表msg
    stafflistmsg: {},//员工列表
    retaillistmsg: {},//散户列表msg
    Familybenefitmsg: {},//家庭福利金msg
    approvallistmsg: {},//审批列表
    billingdetailsmag: {},//账单明细
    EnterpriseOption: {},//企业配置参数
    ConfigureDistributormsg: {},//配置分销员msg
    FreeMedical: {},//免费体检活动msg
    WithdrawDeposit: {},//提现列表1
    Distributionlist: {},//分销套餐列表1
    Auditdistribution: {},//分销客列表

    OrderBasicDetailsmsg: {},//订单基本情况（制单）
    MartOutlistmsg: {},
    Statisticsmsg: {},//数据统计列表1
    Notemsg: {},//短信模板库
};
const getters = {
    // 获取商品列表页面信息
    getpackagelistmsg: state => state.packagelistmsg,
    //获取加项列表页面信息
    getaddttemlistmsg: state => state.addttemlistmsg,
    //获取销售店铺页面信息
    getsalesshopmsg: state => state.salesshopmsg,
    //获取小企业msg
    getsmallbusinessmsg: state => state.smallbusinessmsg,
    //获取企业入职msg
    getenterpriseentrymsg: state => state.enterpriseentrymsg,
    //获取短信模板msg
    getmessagetemplatemsg: state => state.messagetemplatemsg,
    //获取体检项目msg
    getprojectlistmsg: state => state.projectlistmsg,
    //获取订单列表msg
    getorderlistmsg: state => state.orderlistmsg,
    //获取预约列表msg
    getreservationlistmsg: state => state.reservationlistmsg,
    //获取预约列表msg
    getsaleslistmsg: state => state.saleslistmsg,
    //获取企业列表msg
    getenterpriselistmsg: state => state.enterpriselistmsg,
    //获取员工列表
    getstafflistmsg: state => state.stafflistmsg,
    //获取散户列表
    getretaillistmsg: state => state.retaillistmsg,
    //获取家庭福利金列表
    getFamilybenefitmsg: state => state.Familybenefitmsg,
    //获取免费体检活动
    getFreeMedical: state => state.FreeMedical,
    //获取审批列表
    getapprovallistmsg: state => state.approvallistmsg,
    //获取账单明细
    getbillingdetailsmag: state => state.billingdetailsmag,
    //获取企业参数配置
    getEnterpriseOption: state => state.EnterpriseOption,
    //获取配置分销员套餐
    getConfigureDistributormsg: state => state.ConfigureDistributormsg,
    //获取提现列表1
    getWithdrawDeposit: state => state.WithdrawDeposit,
    //获取分销套餐列表1
    getDistributionlist: state => state.Distributionlist,
    //获取分销客列表1
    getAuditdistribution: state => state.Auditdistribution,
    //获取订单基本情况（制单）
    getOrderBasicDetailsmsg: state => state.OrderBasicDetailsmsg,

    //获取开票列表1
    getMartOutlistmsg: state => state.MartOutlistmsg,
    //获取数据统计1
    getStatisticsmsg: state => state.Statisticsmsg,
    //获取短信模板
    getNotemsg: state => state.Notemsg,

};
const mutations = {
    // 赋值给商品列表
    setpackagelistmsg: (state, val) => (state.packagelistmsg = val),
    // 赋值给加项列表
    setaddttemlistmsg: (state, val) => (state.addttemlistmsg = val),
    //赋值给销售店铺页面信息
    setsalesshopmsg: (state, val) => (state.salesshopmsg = val),
    //赋值小企业msg
    setsmallbusinessmsg: (state, val) => (state.smallbusinessmsg = val),
    //赋值企业入职msg
    setenterpriseentrymsg: (state, val) => (state.enterpriseentrymsg = val),
    //赋值短信模板msg
    setmessagetemplatemsg: (state, val) => (state.messagetemplatemsg = val),
    //赋值体检项目msg
    setprojectlistmsg: (state, val) => (state.projectlistmsg = val),
    //赋值订单列表msg
    setorderlistmsg: (state, val) => (state.orderlistmsg = val),
    //赋值预约列表msg
    setreservationlistmsg: (state, val) => (state.reservationlistmsg = val),
    //赋值预约列表msg
    setsaleslistmsg: (state, val) => (state.saleslistmsg = val),
    //赋值企业列表msg
    setenterpriselistmsg: (state, val) => (state.enterpriselistmsg = val),
    //赋值员工列表msg
    setstafflistmsg: (state, val) => (state.stafflistmsg = val),
    //赋值散户列表msg
    setretaillistmsg: (state, val) => (state.retaillistmsg = val),
    //赋值家庭福利金msg
    setFamilybenefitmsg: (state, val) => (state.Familybenefitmsg = val),
    //赋值免费体检活动
    setFreeMedical: (state, val) => (state.FreeMedical = val),
    //赋值审批列表msg
    setapprovallistmsg: (state, val) => (state.approvallistmsg = val),
    //赋值账单明细msg
    setbillingdetailsmag: (state, val) => (state.billingdetailsmag = val),
    //赋值企业参数配置
    setEnterpriseOption: (state, val) => (state.EnterpriseOption = val),
    //赋值配置分销员套餐
    setConfigureDistributormsg: (state, val) => (state.ConfigureDistributormsg = val),
    //赋值提现列表1
    setWithdrawDeposit: (state, val) => (state.WithdrawDeposit = val),
    //赋值分销套餐列表1
    setDistributionlist: (state, val) => (state.Distributionlist = val),
    //赋值分销客列表1
    setAuditdistribution: (state, val) => (state.Auditdistribution = val),
    //赋值订单基本情况（制单）
    setOrderBasicDetailsmsg: (state, val) => (state.OrderBasicDetailsmsg = val),


    //赋值开票列表1
    setMartOutlistmsg: (state, val) => (state.MartOutlistmsg = val),
    //赋值短信模板列表1
    setNotemsg: (state, val) => (state.Notemsg = val),

    //赋值数据统计1
    setStatisticsmsg: (state, val) => (state.Statisticsmsg = val),



};
const actions = {};
export default {
    state,
    getters,
    mutations,
    actions
};
