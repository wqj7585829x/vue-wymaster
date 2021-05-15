import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
const _import = require("./_import_" + process.env.NODE_ENV);

import Layout from "@/views/Layout/layout";
import { menuRouter } from "@/api/Router/index.js"; //路由接口

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

  //三级路由模板--收费管理模块
  {
    path: "/Financial",
    component: Layout,
    name: "财务管理1",
    icon: "FinancialIcon",
    children: [
      {
        path: "ApportionManagement",
        name: "分摊管理",
        component: () => import("@/views/Financial/ApportionManagement"), //分摊管理
        children: [
          {
            path: "ApportionNavigation",
            name: "分摊操作导航",
            component: () =>
              import(
                "@/views/Financial/ApportionManagement/0_ApportionNavigation"
              ), //分摊操作导航
          },
          {
            path: "ApportionTableSetting",
            name: "分摊表设置",
            component: () =>
              import(
                "@/views/Financial/ApportionManagement/1_ApportionTableSetting"
              ), //分摊表设置
          },
          {
            path: "ApportionRelation",
            name: "分摊关系",
            component: () =>
              import(
                "@/views/Financial/ApportionManagement/2_ApportionRelation"
              ), //分摊关系
          },
          {
            path: "ApportionTableEntry",
            name: "分摊表读数录入",
            component: () =>
              import(
                "@/views/Financial/ApportionManagement/3_ApportionTableEntry"
              ), //分摊表读数录入
          },
          {
            path: "ApportionQuery",
            name: "分摊查询",
            component: () =>
              import("@/views/Financial/ApportionManagement/4_ApportionQuery"), //分摊查询
          },
        ],
      },
      {
        path: "FeeNavigation",
        name: "财务管理导航",
        component: () =>
          import("@/views/Financial/ChargeManagement/FeeNavigation"), //财务管理导航
        children: [],
      },
      {
        path: "ChargeManagement",
        name: "收费管理",
        component: () => import("@/views/Financial/ChargeManagement"), //收费管理
        children: [
          {
            path: "FeeNavigation",
            name: "收费管理导航",
            component: () =>
              import("@/views/Financial/ChargeManagement/FeeNavigation"), //收费管理导航
          },
          {
            path: "MeterRead",
            name: "抄表录入",
            component: () =>
              import("@/views/Financial/ChargeManagement/MeterRead"), //抄表录入
          },
          {
            path: "ChargeGeneration",
            name: "费用生成",
            component: () =>
              import("@/views/Financial/ChargeManagement/ChargeGeneration"), //费用生成
          },
          {
            path: "CollectionReg",
            name: "收款登记",
            component: () =>
              import("@/views/Financial/ChargeManagement/CollectionReg"), //收款登记
          },
          {
            path: "PrepaidRecharge",
            name: "预交充值管理",
            component: () =>
              import("@/views/Financial/ChargeManagement/PrepaidRecharge"), //预交充值管理
          },
          {
            path: "ApplicationPay",
            name: "交款申请",
            component: () =>
              import("@/views/Financial/ChargeManagement/ApplicationPay"), //交款申请
          },
        ],
      },
      {
        path: "BillManagement",
        name: "票据管理",
        component: () => import("@/views/Financial/BillManagement"), //票据管理
        children: [
          {
            path: "BillCenter",
            name: "票据中心",
            component: () =>
              import("@/views/Financial/BillManagement/BillCenter"), //票据中心
          },
          {
            path: "BillPrintModel",
            name: "管理票据打印模板",
            component: () =>
              import("@/views/Financial/BillManagement/BillPrintModel"), //管理票据打印模板
          },
        ],
      },
      {
        path: "ChargeMonth",
        name: "收费月结",
        component: () => import("@/views/Financial/ChargeMonth"), //收费月结
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
var runAsyncRouterMap = function () {
  var RouterMap = new Promise(function (resolve, reject) {
    //未接菜单接口start555
    var rdata = [];
    rdata.push({ path: "*", redirect: "/404", hidden: true });
    resolve(rdata);
    //未接菜单接口end

    // menuRouter().then(response => {
    //   //var rdata = response.returnData
    //   var rdata=[]
    //   //debugger
    //   for (var i = 0; i < rdata.length; i++) {
    //     rdata[i].component = Layout
    //     if (rdata[i].meta) {
    //       rdata[i].meta = { role: rdata[i].meta.split(',') };
    //     }
    //     if (rdata[i].children) {
    //       for (var j = 0; j < rdata[i].children.length; j++) {//二级
    //         rdata[i].children[j].component = _import(rdata[i].children[j].component)
    //         if (rdata[i].children[j].meta) {
    //           rdata[i].children[j].meta = { role: rdata[i].children[j].meta.split(',') };
    //         }

    //         if (rdata[i].children[j].children) {//三级
    //           for (var k = 0; k < rdata[i].children[j].children.length; k++) {
    //             rdata[i].children[j].children[k].component = _import(rdata[i].children[j].children[k].component)
    //             if (rdata[i].children[j].children[k].meta) {
    //               rdata[i].children[j].children[k].meta = { role: rdata[i].children[j].children[k].meta.split(',') };
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    //   //alert(JSON.stringify(rdata))
    //   rdata.push({ path: '*', redirect: '/404', hidden: true })
    //   resolve(rdata)
    // })
  });
  return RouterMap;
};

export { runAsyncRouterMap };
