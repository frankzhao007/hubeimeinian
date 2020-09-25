import api from "../../api";
const state = {
  BranchOffice: "",
  Store: "",
  Sales: "",
  Enterprise: "",
  BranchOfficeMobile: "",
  SalesMobile: "",
  EnterpriseMobile: ""
};
const getters = {
  // 分公司
  getBranchOffice: state => state.BranchOffice,
  // 门店
  getStore: state => state.Store,
  // 销售
  getSales: state => state.Sales,
  // 企业
  getEnterprise: state => state.Enterprise,
  // 企业带手机号
  getBranchOfficeMobile: state => state.BranchOfficeMobile,
  // 企业带手机号
  getSalesMobile: state => state.SalesMobile,
  getEnterpriseMobile: state => state.EnterpriseMobile
};
const mutations = {
  setBranchOffice: (state, BranchOffice) => (state.BranchOffice = BranchOffice),
  setStore: (state, Store) => (state.Store = Store),
  setSales: (state, Sales) => (state.Sales = Sales),
  setEnterprise: (state, Enterprise) => (state.Enterprise = Enterprise),
  setEnterpriseMobile: (state, EnterpriseMobile) => (state.EnterpriseMobile = EnterpriseMobile),
  setSalesMobile: (state, SalesMobile) => (state.SalesMobile = SalesMobile),
  setBranchOfficeMobile: (state, BranchOfficeMobile) =>
    (state.BranchOfficeMobile = BranchOfficeMobile)
};
const actions = {
  async GetInstitutions({ commit }) {
    const res = await api.get("/account/pullOrg");
    // console.log('/************/***********/***********/')
    // console.log("actions--------", res.data);
    var BranchOffice = [];
    var Store = [];
    var Sales = [];
    var Enterprise = [];
    var BranchOfficeMobile = [];
    var SalesMobile = [];
    var EnterpriseMobile = [];
    for (let i = 0; i < res.data.length; i++) {
      switch (res.data[i].AccountType) {
        case "1":
          BranchOffice = res.data[i].Name;
          BranchOfficeMobile = res.data[i];
          // console.log("111", res.data[i]);
          break;
        case "2":
          Sales = res.data[i].Name;
          SalesMobile = res.data[i]
          // console.log("222", res.data[i]);
          break;
        case "3":
          Enterprise = res.data[i].Name;
          // BranchOfficeMobile = res.data[i];
          EnterpriseMobile = res.data[i];
          // console.log("333", res.data[i]);
          break;
        case "4":
          Store = res.data[i].Name;
          // BranchOfficeMobile = res.data[i];
          // console.log("444", res.data[i]);
          break;

        default:
          break;
      }
    }
    // console.log("BranchOffice :", BranchOffice);
    // console.log("Sales :", Sales);
    // console.log("Enterprise :", Enterprise);
    // console.log("Store :", Store);
    // console.log('BranchOfficeMobile', BranchOfficeMobile)
    commit("setBranchOffice", BranchOffice);
    commit("setStore", Store);
    commit("setSales", Sales);
    commit("setEnterprise", Enterprise);
    commit("setBranchOfficeMobile", BranchOfficeMobile);
    commit("setSalesMobile", SalesMobile);
    commit("setEnterpriseMobile", EnterpriseMobile);

  }
  // async GetCity({ commit }) {
  //   const res = await api.get("/account/pullOrg");
  // },
};
export default {
  state,
  getters,
  mutations,
  actions
};
