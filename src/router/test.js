import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

const _import = require("./_import_" + process.env.NODE_ENV);
import Layout from "@/views/Layout/layout";

export const constantRouterMap = [
  {
    path: "/Login",
    component: () => import("@/views/Login/index"),
    hidden: true,
  },
  { path: "/Ticket", component: () => import("@/views/Ticket"), hidden: true }, //发票打印
  {
    path: "/Receipt",
    component: () => import("@/views/Receipt"),
    hidden: true,
  }, //收据打印
  {
    path: "/",
    component: Layout,
    hidden: true,
    redirect: "/Home",
    name: "首页",
    children: [
      {
        path: "Home",
        name: "首页",
        component: () => import("@/views/Home"),
      },
    ],
  },
  { path: "/404", component: () => import("@/views/404"), hidden: true },

  //二级模板--组织机构模块
  {
    path: "/Organization",
    component: Layout,
    name: "组织机构",
    icon: "OrganizationIcon",
    children: [
      {
        path: "OrganizationLevel",
        name: "机构级别",
        component: () => import("@/views/Organization/OrganizationLevel"), //机构级别
        meta: { title: "OrganizationLevel" },
        children: [],
      },
      {
        path: "Institutional",
        name: "组织架构",
        component: () => import("@/views/Organization/Institutional"), //组织架构
        meta: { title: "Institutional" },
        children: [],
      },
    ],
  },
  //二级模板--基础档案模块
  {
    path: "/BasicManagement",
    component: Layout,
    name: "基础档案",
    icon: "BasicManagementIcon",
    children: [
      {
        path: "ResourceFile",
        name: "资源档案",
        component: () => import("@/views/BasicManagement/ResourceFile"), //资源档案
        meta: { title: "ResourceFile" },
        children: [],
      },
      {
        path: "CustomerFile",
        name: "客户档案",
        component: () => import("@/views/BasicManagement/CustomerFile"), //客户档案
        meta: { title: "CustomerFile" },
        children: [],
      },
    ],
  },
  //二级模板--收费管理模块
  {
    path: "/FeeManagement",
    component: Layout,
    name: "收费管理",
    icon: "FinancialIcon",
    children: [
      {
        path: "FeeNavigation",
        name: "收费管理流程图",
        component: () => import("@/views/FeeManagement/FeeNavigation"), //收费管理流程图
        meta: { title: "FeeNavigation" },
        children: [],
      },
      {
        path: "ParameterSettings",
        name: "参数设置",
        component: () => import("@/views/FeeManagement/ParameterSettings"), //参数设置
        meta: { title: "ParameterSettings" },
        children: [],
      },
      {
        path: "StandardDefinition",
        name: "标准定义",
        component: () => import("@/views/FeeManagement/StandardDefinition"), //标准定义
        meta: { title: "StandardDefinition" },
        children: [],
      },
      {
        path: "StandardsSelection",
        name: "标准选用",
        component: () => import("@/views/FeeManagement/StandardsSelection"), //标准选用
        meta: { title: "StandardsSelection" },
        children: [],
      },
      {
        path: "AllocationSettings",
        name: "分摊设置",
        component: () => import("@/views/FeeManagement/AllocationSettings"), //分摊设置
        meta: { title: "AllocationSettings" },
        children: [],
      },
      {
        path: "WalkthroughEntry",
        name: "走表数据录入",
        component: () => import("@/views/FeeManagement/WalkthroughEntry"), //走表数据录入
        meta: { title: "WalkthroughEntry" },
        children: [],
      },
      {
        path: "DataComputing",
        name: "数据计算",
        component: () => import("@/views/FeeManagement/DataComputing"), //数据计算
        meta: { title: "DataComputing" },
        children: [],
      },
      {
        path: "ReceivablesRegister",
        name: "收款登记",
        component: () => import("@/views/FeeManagement/ReceivablesRegister"), //收款登记
        meta: { title: "ReceivablesRegister" },
        children: [],
      },
      {
        path: "Monthknots",
        name: "月结",
        component: () => import("@/views/FeeManagement/Monthknots"), //月结
        meta: { title: "Monthknots" },
        children: [],
      },
    ],
  },
  //二级模板--票据管理
  {
    path: "/BillManagement",
    component: Layout,
    name: "票据管理",
    icon: "FinancialIcon",
    children: [
      {
        path: "BillNumber",
        name: "票据号设置",
        component: () => import("@/views/BillManagement/BillNumber"), //票据号设置
        meta: { title: "BillNumber" },
        children: [],
      },
      {
        path: "BillClass",
        name: "票据分类",
        component: () => import("@/views/BillManagement/BillClass"), //票据分类
        meta: { title: "BillClass" },
        children: [],
      },
      {
        path: "BillBook",
        name: "票据本",
        component: () => import("@/views/BillManagement/BillBook"), //票据本
        meta: { title: "BillBook" },
        children: [],
      },
    ],
  },
  //二级模板--报表管理
  {
    path: "/ReportManagement",
    component: Layout,
    name: "报表管理",
    icon: "FinancialIcon",
    children: [
      {
        path: "QueryReport",
        name: "通用查询报表",
        component: () => import("@/views/ReportManagement/QueryReport"), //通用查询报表
        meta: { title: "QueryReport" },
        children: [],
      },
      {
        path: "CustomReport",
        name: "高级自定义报表",
        component: () => import("@/views/ReportManagement/CustomReport"), //高级自定义报表
        meta: { title: "CustomReport" },
        children: [],
      },
    ],
  },
  //二级模板--系统维护
  {
    path: "/SystemMaintain",
    component: Layout,
    name: "系统维护",
    icon: "FinancialIcon",
    children: [
      {
        path: "OriginalDataimport",
        name: "原始数据导入",
        component: () => import("@/views/SystemMaintain/OriginalDataimport"), //原始数据导入
        meta: { title: "OriginalDataimport" },
        children: [],
      },
    ],
  },
  //二级模板--公共维修金管理
  {
    path: "/PublicRepairManager",
    component: Layout,
    name: "公共维修金管理",
    icon: "FinancialIcon",
    children: [
      {
        path: "ParameterSetting",
        name: "参数设定",
        component: () => import("@/views/PublicRepairManager/ParameterSetting"), //参数设定
        meta: { title: "ParameterSetting" },
        children: [],
      },
      {
        path: "HouseAccounts",
        name: "户帐建立",
        component: () => import("@/views/PublicRepairManager/HouseAccounts"), //户帐建立
        meta: { title: "HouseAccounts" },
        children: [],
      },
      {
        path: "LadderHouse",
        name: "梯户关系",
        component: () => import("@/views/PublicRepairManager/LadderHouse"), //梯户关系
        meta: { title: "LadderHouse" },
        children: [],
      },
      {
        path: "RepairRegister",
        name: "维修登记",
        component: () => import("@/views/PublicRepairManager/RepairRegister"), //维修登记
        meta: { title: "RepairRegister" },
        children: [],
      },
      {
        path: "RepairApply",
        name: "维修申请",
        component: () => import("@/views/PublicRepairManager/RepairApply"), //维修申请
        meta: { title: "RepairApply" },
        children: [],
      },
      {
        path: "RepairPlan",
        name: "维修方案",
        component: () => import("@/views/PublicRepairManager/RepairPlan"), //维修方案
        meta: { title: "RepairPlan" },
        children: [],
      },
      {
        path: "ExaminePlan",
        name: "审核方案",
        component: () => import("@/views/PublicRepairManager/ExaminePlan"), //审核方案
        meta: { title: "ExaminePlan" },
        children: [],
      },
      {
        path: "CostRaising",
        name: "费用筹集",
        component: () => import("@/views/PublicRepairManager/CostRaising"), //费用筹集
        meta: { title: "CostRaising" },
        children: [],
      },
      {
        path: "ProjectImplement",
        name: "工程实施",
        component: () => import("@/views/PublicRepairManager/ProjectImplement"), //工程实施
        meta: { title: "ProjectImplement" },
        children: [],
      },
      {
        path: "ProjectSettlement",
        name: "工程结算",
        component: () =>
          import("@/views/PublicRepairManager/ProjectSettlement"), //工程结算
        meta: { title: "ProjectSettlement" },
        children: [],
      },
      {
        path: "AuditVouchers",
        name: "审核凭证",
        component: () => import("@/views/PublicRepairManager/AuditVouchers"), //审核凭证
        meta: { title: "AuditVouchers" },
        children: [],
      },
      {
        path: "FeeCollection",
        name: "费用领取",
        component: () => import("@/views/PublicRepairManager/FeeCollection"), //费用领取
        meta: { title: "FeeCollection" },
        children: [],
      },
    ],
  },
];

export default new Router({
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: constantRouterMap,
});

//获取后台动态路由
var runAsyncRouterMap = function (previewTreeData) {
  //store/modules/user.js 左边菜单传参第三步 3
  var RouterMap = new Promise(function (resolve, reject) {
    //左上角下拉选择小区，根据小区显示不同的左边菜单start
    var rdata = [];
    rdata = previewTreeData.previewTree;
    for (var i = 0; i < rdata.length; i++) {
      rdata[i].component = Layout;
      if (rdata[i].children) {
        for (var j = 0; j < rdata[i].children.length; j++) {
          //二级
          rdata[i].children[j].component = _import(
            rdata[i].children[j].component
          );

          if (rdata[i].children[j].children) {
            //三级
            for (var k = 0; k < rdata[i].children[j].children.length; k++) {
              rdata[i].children[j].children[k].component = _import(
                rdata[i].children[j].children[k].component
              );
            }
          }
        }
      }
    }
    // console.log(rdata);//查询接口新的路由

    rdata.push({ path: "*", redirect: "/404", hidden: true });
    resolve(rdata);
    //左上角下拉选择小区，根据小区显示不同的左边菜单end
  });
  return RouterMap;
};

export { runAsyncRouterMap };
