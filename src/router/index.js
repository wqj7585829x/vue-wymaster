import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

//在使用push或者replace的时候，需要使用catch来处理异常
const originalPush = Router.prototype.push;
// 重写了原型上的push方法，统一的处理了错误信息
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

// const _import = require('./_import_' + process.env.NODE_ENV)
import Layout from "@/views/Layout/layout";

//路由页面路径公共函数
function getViews(path) {
  return (resolve) => {
    require.ensure([], (require) => {
      resolve(require("@/views/" + path));
    });
  };
}
export const constantRouterMap = [
  {
    path: "/Login",
    component: (resolve) => require(["@/views/Login/index"], resolve),
    hidden: true,
  },
  {
    path: "/Ticket",
    component: (resolve) => require(["@/views/Ticket"], resolve),
    hidden: true,
  }, //纸质发票打印
  {
    path: "/Receipt",
    component: (resolve) => require(["@/views/Receipt"], resolve),
    hidden: true,
  }, //纸质收据打印
  {
    path: "/elReceipt",
    component: (resolve) => require(["@/views/elReceipt"], resolve),
    hidden: true,
  }, //电子收据打印
  {
    path: "/settleprint",
    component: (resolve) => require(["@/views/settleprint"], resolve),
    hidden: true,
  }, //结算清单预览打印
  {
    path: "/reportprint",
    component: (resolve) => require(["@/views/reportprint"], resolve),
    hidden: true,
  }, //收费通知单打印
  {
    path: "/ReceiptPrint/pwy_test_jjshequ_com",
    component: (resolve) =>
      require(["@/views/ReceiptPrint/pwy_test_jjshequ_com"], resolve),
    hidden: true,
  }, //收据套打打印
  {
    path: "/HouseTicket",
    component: (resolve) => require(["@/views/HouseTicket"], resolve),
    hidden: true,
  }, //房屋租赁纸质发票打印
  {
    path: "/HouseReceipt",
    component: (resolve) => require(["@/views/HouseReceipt"], resolve),
    hidden: true,
  }, //房屋租赁纸质收据打印
  {
    path: "/HouseelReceipt",
    component: (resolve) => require(["@/views/HouseelReceipt"], resolve),
    hidden: true,
  }, //房屋租赁电子收据打印
  {
    path: "/HouseReceiptPrint/pwy_test_jjshequ_com",
    component: (resolve) =>
      require(["@/views/HouseReceiptPrint/pwy_test_jjshequ_com"], resolve),
    hidden: true,
  }, //房屋租赁收据套打打印
  {
    path: "/ReceiptPrint/smctwy",
    component: (resolve) => require(["@/views/ReceiptPrint/smctwy"], resolve),
    hidden: true,
  }, //三明城发纸质收据打印
  {
    path: "/ReceiptPrint/jindiwy",
    component: (resolve) => require(["@/views/ReceiptPrint/jindiwy"], resolve),
    hidden: true,
  }, //金帝纸质收据打印
  {
    path: "/ReceiptPrint/tangren",
    component: (resolve) => require(["@/views/ReceiptPrint/tangren"], resolve),
    hidden: true,
  }, //唐人物业纸质收据打印--套打
  {
    path: "/billDetail",
    component: (resolve) => require(["@/components/billDetail"], resolve),
    hidden: true,
  }, //pos扫码票据展示

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
        component: (resolve) => require(["@/views/Home"], resolve),
        meta: { title: "Home" },
      },
    ],
  },
  {
    path: "/404",
    component: (resolve) => require(["@/views/404"], resolve),
    hidden: true,
  },
  {
    path: "/HomePage",
    component: Layout,
    name: "首页模块",
    icon: "sideBar10_feedback",
    hidden: true,
    children: [
      {
        path: "KSSF",
        name: "快速收费",
        component: (resolve) =>
          require(["@/views/Home/components/Popup/KSSF"], resolve),
        meta: { title: "KSSF" },
      },
      {
        path: "KSKP",
        name: "快速开票",
        component: (resolve) =>
          require(["@/views/Home/components/Popup/KSKP"], resolve),
        meta: { title: "KSKP" },
      },
      {
        path: "SKTJB",
        name: "收款统计表",
        component: (resolve) =>
          require(["@/views/Home/components/Popup/SKTJB"], resolve),
        meta: { title: "SKTJB" },
      },
      {
        path: "PJCX",
        name: "票据查询",
        component: (resolve) =>
          require(["@/views/Home/components/Popup/PJCX"], resolve),
        meta: { title: "PJCX" },
      },
      {
        path: "PJCX_201111",
        name: "票据查询",
        component: (resolve) =>
          require(["@/views/Home/components/Popup/PJCX_201111"], resolve),
        meta: { title: "PJCX_201111" },
      },
      {
        path: "NYYE",
        name: "年营业额",
        component: (resolve) =>
          require(["@/views/Home/components/Popup/NYYE"], resolve),
        meta: { title: "NYYE" },
      },
      {
        path: "NDZJ_1",
        name: "年度总结(领导)",
        component: (resolve) =>
          require(["@/views/Home/components/Popup/NDZJ_1"], resolve),
        meta: { title: "NDZJ_1" },
      },
      {
        path: "NDZJ_2",
        name: "年度总结",
        component: (resolve) =>
          require(["@/views/Home/components/Popup/NDZJ_2"], resolve),
        meta: { title: "NDZJ_2" },
      },
      {
        path: "JRSRZE",
        name: "今日收费总额",
        component: (resolve) =>
          require(["@/views/Home/components/Popup/JRSRZE"], resolve),
        meta: { title: "JRSRZE" },
      },
      {
        path: "ZHS_1",
        name: "总户数(领导)",
        component: (resolve) =>
          require(["@/views/Home/components/Popup/ZHS_1"], resolve),
        meta: { title: "ZHS_1" },
      },
      {
        path: "ZHS_2",
        name: "总户数",
        component: (resolve) =>
          require(["@/views/Home/components/Popup/ZHS_2"], resolve),
        meta: { title: "ZHS_2" },
      },
      {
        path: "ZMJ",
        name: "总面积",
        component: (resolve) =>
          require(["@/views/Home/components/Popup/ZMJ"], resolve),
        meta: { title: "ZMJ" },
      },
      {
        path: "GWJJY",
        name: "公维金管理",
        component: (resolve) =>
          require(["@/views/Home/components/Popup/GWJJY"], resolve),
        meta: { title: "GWJJY" },
      },
    ],
  },

  {
    path: "/BasicManagementEpedigree",
    component: Layout,
    name: "电子档案",
    hidden: true,
    children: [
      {
        path: "Epedigree",
        name: "电子档案",
        component: (resolve) =>
          require(["@/views/BasicManagementEpedigree/Epedigree"], resolve),
        meta: { title: "Epedigree" },
      },
    ],
  },
  //二级模板--预交管理
  // {
  //   path:'/PrepayManagement',
  //   component:Layout,
  //   name:'预交管理',
  //   icon:'sidebar15_prepay',
  //   children:[
  //     {
  //       path: 'PrepayScheme',
  //       name: '预交方案设置',
  //       component: resolve => require(['@/views/PrepayManagement/PrepayScheme'], resolve),//预交方案设置
  //       meta: { title: 'PrepayScheme' },
  //       children: []
  //     },
  //     {
  //       path: 'PrepayCollection',
  //       name: '预交收款',
  //       component: resolve => require(['@/views/PrepayManagement/PrepayCollection'], resolve),//预交收款
  //       meta: { title: 'PrepayCollection' },
  //       children: []
  //     },
  //     {
  //       path:'PrepayMent',
  //       name:'预交冲抵',
  //       component: resolve => require(['@/views/PrepayManagement/PrepayMent'], resolve),//预交冲抵
  //       meta:{ title:'PrepayMent'},
  //       children: []
  //     },
  //     {
  //       path:'PrepayUse',
  //       name:'预交使用',
  //       component: resolve => require(['@/views/PrepayManagement/PrepayUse'], resolve),//预交使用
  //       meta:{ title:'PrepayUse'},
  //       children: []
  //     }
  //   ]
  // },
  //二级模板--应收管理模块
  // {
  //   path:'/ReceivableManage',
  //   component:Layout,
  //   name:'应收管理',
  //   icon:'sideBar01-group',
  //   children:[
  //     {
  //       path:'ReceivableList',
  //       name:'应收列表',
  //       component: resolve => require(['@/views/ReceivableManage/ReceivableList'], resolve),//应收列表
  //       meta:{ title:'ReceivableList'},
  //       children: []
  //     },
  //     {
  //       path:'AdjustmentList',
  //       name:'调整应收列表',
  //       component: resolve => require(['@/views/ReceivableManage/AdjustmentList'], resolve),//调整应收列表
  //       meta:{ title:'AdjustmentList'},
  //       children: []
  //     },
  //     {
  //       path:'ActualList',
  //       name:'实际应收列表',
  //       component: resolve => require(['@/views/ReceivableManage/ActualList'], resolve),//实际应收列表
  //       meta:{ title:'ActualList'},
  //       children: []
  //     },
  //   ]
  // },
  // 二级模板--先票后款模块
  // {
  //   path: '/TicketPayment',
  //   component: Layout,
  //   name: '先票后款',
  //   icon: 'sideBar10_feedback',
  //   children: [
  //     {
  //       path: 'BillExamine',
  //       name: '开票资料审核',
  //       component: () => import('@/views/TicketPayment/BillExamine'),//开票资料审核
  //       meta: { title: 'BillExamine' },
  //       children: []
  //     },
  //     {
  //       path: 'RemindList',
  //       name: '开票提醒列表',
  //       component: () => import('@/views/TicketPayment/RemindList'),//开票提醒列表
  //       meta: { title: 'RemindList' },
  //       children: []
  //     }, {
  //       path: 'BillingApplication',
  //       name: '开票申请',
  //       component: () => import('@/views/TicketPayment/BillingApplication'),//开票申请
  //       meta: { title: 'BillingApplication' },
  //       children: []
  //     }, {
  //       path: 'BillinGexamine',
  //       name: '开票审核',
  //       component: () => import('@/views/TicketPayment/BillinGexamine'),//开票审核
  //       meta: { title: 'BillinGexamine' },
  //       children: []
  //     }, {
  //       path: 'Bill',
  //       name: '票据',
  //       component: () => import('@/views/TicketPayment/Bill'),//票据
  //       meta: { title: 'Bill' },
  //       children: []
  //     }
  //   ]
  // },
  //二级模板--反馈平台模块
  //  {
  //     path: '/Feedbackplat',
  //     component: Layout,
  //     name: '反馈平台',
  //     icon: 'sideBar10_feedback',
  //     children: [
  //       {
  //         path: 'FeedbackList',
  //         name: '反馈列表',
  //         component: () => import('@/views/Feedbackplat/FeedbackList'),//反馈列表
  //         meta: { title: 'FeedbackList' },
  //         children: []
  //       }
  //     ]
  //   },
  //二级模板--门禁模块
  // {
  //   path: '/AccessControl',
  //   component: Layout,
  //   name: '门禁管理',
  //   icon: 'OrganizationIcon',
  //   children: [
  //     {
  //       path: 'DoorKeyReview',
  //       name: '门禁钥匙审核',
  //       component: () => import('@/views/AccessControl/DoorKeyReview'),//门禁钥匙审核
  //       meta: { title: 'DoorKeyReview' },
  //       children: []
  //     },
  //     {
  //       path: 'DoordeviceManager',
  //       name: '门禁设备管理',
  //       component: () => import('@/views/AccessControl/DoordeviceManager'),//门禁设备管理
  //       meta: { title: 'DoordeviceManager' },
  //       children: []
  //     },
  //     {
  //       path: 'DoorCardManager',
  //       name: '门禁卡管理',
  //       component: () => import('@/views/AccessControl/DoorCardManager'),//门禁卡管理
  //       meta: { title: 'DoorCardManager' },
  //       children: []
  //     },
  //     {
  //       path: 'VisitorAudit',
  //       name: '访客登记审核',
  //       component: () => import('@/views/AccessControl/VisitorAudit'),//访客登记审核
  //       meta: { title: 'VisitorAudit' },
  //       children: []
  //     },
  //     {
  //       path: 'OpeningRecord',
  //       name: '访客记录',
  //       component: () => import('@/views/AccessControl/OpeningRecord'),//访客记录
  //       meta: { title: 'OpeningRecord' },
  //       children: []
  //     },
  //     {
  //       path: 'DoorKeyReview_new',
  //       name: '通行证审核',
  //       component: () => import('@/views/AccessControl/DoorKeyReview_new'),//通行证
  //       meta: { title: 'DoorKeyReview_new' },
  //       children: []
  //     },
  //   ]
  // },

  //二级模板--组织机构模块
  //   {
  //     path:'/Organization',
  //     component:Layout,
  //     name:'组织机构',
  //     icon:'OrganizationIcon',
  //     children:[
  //       {
  //         path:'OrganizationLevel',
  //         name:'机构级别',
  //         component:()=>import('@/views/Organization/OrganizationLevel'),//机构级别
  //         meta:{ title:'OrganizationLevel'},
  //         children: []
  //       },
  //       {
  //         path:'Institutional',
  //         name:'组织架构',
  //         component:()=>import('@/views/Organization/Institutional'),//组织架构
  //         meta:{ title:'Institutional'},
  //         children: []
  //       },

  //     ]
  //   },
  //二级模板--基础档案模块
  // {
  //   path:'/BasicManagement',
  //   component:Layout,
  //   name:'基础档案',
  //   icon:'BasicManagementIcon',
  //   children:[
  //     {
  //       path:'ResourceFile',
  //       name:'资源档案',
  //       component:()=>import('@/views/BasicManagement/ResourceFile'),//资源档案
  //       meta:{ title:'ResourceFile'},
  //       children: []
  //     },
  //     {
  //       path:'CustomerFile',
  //       name:'客户档案',
  //       component:()=>import('@/views/BasicManagement/CustomerFile'),//客户档案
  //       meta:{ title:'CustomerFile'},
  //       children: []
  //     },
  //     {
  //       path:'RoomManager',
  //       name:'房间管理',
  //       component:()=>import('@/views/BasicManagement/RoomManager'),//房间管理
  //       meta:{ title:'RoomManager'},
  //       children: []
  //     }
  //   ]
  // },
  //二级模板--收费管理模块
  // {
  //   path: '/FeeManagement',
  //   component: Layout,
  //   name: '收费管理',
  //   icon: 'FinancialIcon',
  //   children: [
  //     {
  //       path: 'FeeNavigation',
  //       name: '收费管理流程图',
  //       component: () => import('@/views/FeeManagement/FeeNavigation'),//收费管理流程图
  //       meta: { title: 'FeeNavigation' },
  //       children: []
  //     },
  //     {
  //       path: 'ParameterSettings',
  //       name: '参数设置',
  //       component: () => import('@/views/FeeManagement/ParameterSettings'),//参数设置
  //       meta: { title: 'ParameterSettings' },
  //       children: []
  //     },
  //     {
  //       path: 'StandardDefinition',
  //       name: '标准定义',
  //       component: () => import('@/views/FeeManagement/StandardDefinition'),//标准定义
  //       meta: { title: 'StandardDefinition' },
  //       children: []
  //     },
  //     {
  //       path: 'StandardsSelection',
  //       name: '标准选用',
  //       component: () => import('@/views/FeeManagement/StandardsSelection'),//标准选用
  //       meta: { title: 'StandardsSelection' },
  //       children: []
  //     },
  //     {
  //       path: 'AllocationSettings',
  //       name: '分摊设置',
  //       component: () => import('@/views/FeeManagement/AllocationSettings'),//分摊设置
  //       meta: { title: 'AllocationSettings' },
  //       children: []
  //     },
  //     {
  //       path: 'WalkthroughEntry',
  //       name: '走表数据录入',
  //       component: () => import('@/views/FeeManagement/WalkthroughEntry'),//走表数据录入
  //       meta: { title: 'WalkthroughEntry' },
  //       children: []
  //     },
  //     {
  //       path: 'DataComputing',
  //       name: '数据计算',
  //       component: () => import('@/views/FeeManagement/DataComputing'),//数据计算
  //       meta: { title: 'DataComputing' },
  //       children: []
  //     },
  //     {
  //       path: 'ParkingCostComputing',
  //       name: '车位费用计算',
  //       component: () => import('@/views/FeeManagement/ParkingCostComputing'),//车位费用计算
  //       meta: { title: 'ParkingCostComputing' },
  //       children: []
  //     },
  //     // {
  //     //   path:'ReceivablesRegister',
  //     //   name:'收款登记',
  //     //   component:()=>import('@/views/FeeManagement/ReceivablesRegister'),//收款登记
  //     //   meta:{ title:'ReceivablesRegister'},
  //     //   children: []
  //     // },
  // {
  //   path: 'ReceivablesRegister_new',
  //   name: '收款登记',
  //   component: () => import('@/views/FeeManagement/ReceivablesRegister_new'),//收款登记
  //   meta: { title: 'ReceivablesRegister_new' },
  //   children: []
  // },
  //     {
  //       path: 'Monthknots',
  //       name: '月结',
  //       component: () => import('@/views/FeeManagement/Monthknots'),//月结
  //       meta: { title: 'Monthknots' },
  //       children: []
  //     }
  //   ]
  // },
  // {
  //   path: '/SharedHydropowerDesign',
  //   component: Layout,
  //   name: '公摊管理',
  //   icon: 'SharedHydropowerDesignIcon',
  //   children: [
  //     {
  //       path: 'ApportionmentSettings',
  //       name: '分摊表设置',
  //       component: () => import('@/views/SharedHydropowerDesign/ApportionmentSettings'),//分摊表设置
  //       meta: { title: 'ApportionmentSettings' },
  //       children: []
  //     },
  //     {
  //       path: 'RelationshipSetting',
  //       name: '关系设定',
  //       component: () => import('@/views/SharedHydropowerDesign/RelationshipSetting'),//关系设定
  //       meta: { title: 'RelationshipSetting' },
  //       children: []
  //     },
  //     {
  //       path: 'AllocationEntry',
  //       name: '分摊录入',
  //       component: () => import('@/views/SharedHydropowerDesign/AllocationEntry'),//分摊录入
  //       meta: { title: 'AllocationEntry' },
  //       children: []
  //     },
  //     {
  //       path: 'UserAllocationDetails',
  //       name: '用户分摊明细',
  //       component: () => import('@/views/SharedHydropowerDesign/UserAllocationDetails'),//用户分摊明细
  //       meta: { title: 'UserAllocationDetails' },
  //       children: []
  //     },
  //   ]
  // },
  //  //二级模板--票据管理
  //  {
  //   path:'/BillManagement',
  //   component:Layout,
  //   name:'票据管理',
  //   icon:'FinancialIcon',
  //   children:[
  //     {
  //       path:'BillClass',
  //       name:'票据分类',
  //       component:()=>import('@/views/BillManagement/BillClass'),//票据分类
  //       meta:{ title:'BillClass'},
  //       children: []
  //     },
  //     {
  //       path:'BillBook',
  //       name:'票据本',
  //       component:()=>import('@/views/BillManagement/BillBook'),//票据本
  //       meta:{ title:'BillBook'},
  //       children: []
  //     }

  //   ]
  //  },
  //   //二级模板--报表管理
  // {
  //   path: '/ReportManagement',
  //   component: Layout,
  //   name: '报表管理',
  //   icon: 'FinancialIcon',
  //   children: [
  //     {
  //       path: 'NewReport',
  //       name: '基础报表',
  //       component: () => import('@/views/ReportManagement/NewReport'),//基础报表
  //       meta: { title: 'NewReport' },
  //       children: []
  //     }
  //   ]
  // },
  //      //二级模板--系统维护
  //   {
  //     path:'/SystemMaintain',
  //     component:Layout,
  //     name:'系统维护',
  //     icon:'FinancialIcon',
  //     children:[
  //       {
  //         path:'OriginalDataimport',
  //         name:'原始数据导入',
  //         component:()=>import('@/views/SystemMaintain/OriginalDataimport'),//原始数据导入
  //         meta:{ title:'OriginalDataimport'},
  //         children: []
  //       }
  //     ]
  //    },
  //      //二级模板--公共维修金管理
  //   {
  //     path:'/PublicRepairManager',
  //     component:Layout,
  //     name:'公共维修金管理',
  //     icon:'FinancialIcon',
  //     children:[
  //       {
  //         path:'ParameterSetting',
  //         name:'参数设定',
  //         component:()=>import('@/views/PublicRepairManager/ParameterSetting'),//参数设定
  //         meta:{ title:'ParameterSetting'},
  //         children: []
  //       },
  //       {
  //         path:'HouseAccounts',
  //         name:'户帐建立',
  //         component:()=>import('@/views/PublicRepairManager/HouseAccounts'),//户帐建立
  //         meta:{ title:'HouseAccounts'},
  //         children: []
  //       },
  //       {
  //         path:'LadderHouse',
  //         name:'梯户关系',
  //         component:()=>import('@/views/PublicRepairManager/LadderHouse'),//梯户关系
  //         meta:{ title:'LadderHouse'},
  //         children: []
  //       },
  //       {
  //         path:'RepairRegister',
  //         name:'维修登记',
  //         component:()=>import('@/views/PublicRepairManager/RepairRegister'),//维修登记
  //         meta:{ title:'RepairRegister'},
  //         children: []
  //       },
  //       {
  //         path:'RepairApply',
  //         name:'维修申请',
  //         component:()=>import('@/views/PublicRepairManager/RepairApply'),//维修申请
  //         meta:{ title:'RepairApply'},
  //         children: []
  //       },
  //       {
  //         path:'RepairPlan',
  //         name:'维修方案',
  //         component:()=>import('@/views/PublicRepairManager/RepairPlan'),//维修方案
  //         meta:{ title:'RepairPlan'},
  //         children: []
  //       },
  //       {
  //         path:'ExaminePlan',
  //         name:'审核方案',
  //         component:()=>import('@/views/PublicRepairManager/ExaminePlan'),//审核方案
  //         meta:{ title:'ExaminePlan'},
  //         children: []
  //       },
  //       {
  //         path:'CostRaising',
  //         name:'费用筹集',
  //         component:()=>import('@/views/PublicRepairManager/CostRaising'),//费用筹集
  //         meta:{ title:'CostRaising'},
  //         children: []
  //       },
  //       {
  //         path:'ProjectImplement',
  //         name:'工程实施',
  //         component:()=>import('@/views/PublicRepairManager/ProjectImplement'),//工程实施
  //         meta:{ title:'ProjectImplement'},
  //         children: []
  //       },
  //       {
  //         path:'ProjectSettlement',
  //         name:'工程结算',
  //         component:()=>import('@/views/PublicRepairManager/ProjectSettlement'),//工程结算
  //         meta:{ title:'ProjectSettlement'},
  //         children: []
  //       },
  //       {
  //         path:'AuditVouchers',
  //         name:'审核凭证',
  //         component:()=>import('@/views/PublicRepairManager/AuditVouchers'),//审核凭证
  //         meta:{ title:'AuditVouchers'},
  //         children: []
  //       },
  //       {
  //         path:'FeeCollection',
  //         name:'费用领取',
  //         component:()=>import('@/views/PublicRepairManager/FeeCollection'),//费用领取
  //         meta:{ title:'FeeCollection'},
  //         children: []
  //       }
  //     ]
  //    },
  // 二级模板--房屋租赁
  // {
  //   path: '/Realtor',
  //   component: Layout,
  //   name: '房屋租赁',
  //   icon: 'sideBar11_rent',

  //   children: [
  //     {
  //       path: 'Contractwarning',
  //       name: '预警周期设置',
  //       component: () => import('@/views/Realtor/Contractwarning'),//预警周期设置
  //       meta: { title: 'Contractwarning' },
  //       children: []
  //     },
  //     {
  //       path: 'WarningList',
  //       name: '合同到期预警',
  //       component: () => import('@/views/Realtor/WarningList'),//合同到期预警
  //       meta: { title: 'WarningList' },
  //       children: []
  //     },
  //     {
  //       path: 'LessorInformation',
  //       name: '出租方信息',
  //       component: () => import('@/views/Realtor/LessorInformation'),//出租方信息
  //       meta: { title: 'LessorInformation' },
  //       children: []
  //     },
  //     {
  //       path: 'HousingResources',
  //       name: '房源档案',
  //       component: () => import('@/views/Realtor/HousingResources'),//客户档案
  //       meta: { title: 'HousingResources' },
  //       children: []
  //     },
  //     {
  //       path: 'Customer',
  //       name: '租户档案',
  //       component: () => import('@/views/Realtor/Customer'),//客户档案
  //       meta: { title: 'Customer' },
  //       children: []
  //     },
  //     {
  //       path: 'Contract',
  //       name: '合同管理',
  //       component: () => import('@/views/Realtor/Contract'),//合同管理
  //       meta: { title: 'Contract' },
  //       children: []
  //     },
  //     {
  //       path: 'ReceivableManagement',
  //       name: '应收管理',
  //       component: () => import('@/views/Realtor/ReceivableManagement'),//应收管理
  //       meta: { title: 'ReceivableManagement' },
  //       children: []
  //     },
  //     {
  //       path: 'ChargeManagement',
  //       name: '收费管理',
  //       component: () => import('@/views/Realtor/ChargeManagement'),//收费管理
  //       meta: { title: 'ChargeManagement' },
  //       children: []
  //     }
  //   ]
  // },
  //二级模板--测试
  // {
  //   path:'/test',
  //   component:Layout,
  //   name:'测试页面',
  //   icon:'sideBar11_rent',
  //   children:[
  //     {
  //       path:'test1',
  //       name:'测试页面1',
  //       component:()=>import('@/views/test/test1'),//测试页面1
  //       meta:{ title:'test1'},
  //       children: []
  //     },
  //     {
  //       path:'test2',
  //       name:'测试页面2',
  //       component:()=>import('@/views/test/test2'),//测试页面1
  //       meta:{ title:'test2'},
  //       children: []
  //     },
  //   ]
  // },
  // {
  //   path: '/BankReconciliation',
  //   component: Layout,
  //   name: '银行对账',
  //   icon: 'sideBar12_bank',
  //   children: [
  //     {
  //       path: 'CashCollection',
  //       name: '现金收款明细导入',
  //       component: () => import('@/views/BankReconciliation/CashCollection'),//现金收款明细导入
  //       meta: { title: 'CashCollection' },
  //       children: []
  //     },
  //     {
  //       path: 'UnmatchedReconciliation',
  //       name: '未匹配对账列表',
  //       component: () => import('@/views/BankReconciliation/UnmatchedReconciliation'),//出租方信息
  //       meta: { title: 'UnmatchedReconciliation' },
  //       children: []
  //     },
  //     {
  //       path: 'TransferAccounts',
  //       name: '转账列表',
  //       component: () => import('@/views/BankReconciliation/TransferAccounts'),//转账列表
  //       meta: { title: 'TransferAccounts' },
  //       children: []
  //     },
  //     {
  //       path: 'POSPayCard',
  //       name: 'POS刷卡列表',
  //       component: () => import('@/views/BankReconciliation/POSPayCard'),//POS刷卡列表
  //       meta: { title: 'POSPayCard' },
  //       children: []
  //     },
  //     {
  //       path: 'POSWeChat',
  //       name: 'POS支付宝/微信列表',
  //       component: () => import('@/views/BankReconciliation/POSWeChat'),//POS支付宝/微信列表
  //       meta: { title: 'POSWeChat' },
  //       children: []
  //     },
  //     {
  //       path: 'WeChatPlatform',
  //       name: '微信平台列表',
  //       component: () => import('@/views/BankReconciliation/WeChatPlatform'),//微信平台列表
  //       meta: { title: 'WeChatPlatform' },
  //       children: []
  //     }
  //   ]
  // },
];

export default new Router({
  // mode: 'history',
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: constantRouterMap,
});

//获取后台动态路由
var runAsyncRouterMap = function (previewTreeData) {
  //store/modules/user.js 左边菜单传参第三步 3
  var RouterMap = new Promise(function (resolve) {
    //左上角下拉选择小区，根据小区显示不同的左边菜单start
    var rdata = [];
    rdata = previewTreeData.previewTree;
    for (var i = 0; i < rdata.length; i++) {
      rdata[i].component = Layout;
      if (rdata[i].children) {
        for (var j = 0; j < rdata[i].children.length; j++) {
          //二级
          // rdata[i].children[j].component = _import(rdata[i].children[j].component)
          rdata[i].children[j].component = getViews(
            rdata[i].children[j].component
          );

          if (rdata[i].children[j].children) {
            //三级
            for (var k = 0; k < rdata[i].children[j].children.length; k++) {
              // rdata[i].children[j].children[k].component = _import(rdata[i].children[j].children[k].component)
              rdata[i].children[j].children[k].component = getViews(
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
    //右上角下拉选择小区，根据小区显示不同的左边菜单end
  });
  return RouterMap;
};

export { runAsyncRouterMap };
