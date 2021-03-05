import Layout from '@/components/Layout/Layout'

/**
 * hidden: true                  如果设置为 true，该项菜单将不会显示在菜单栏中(默认为 false)
 * meta : {
    title: 'title'               菜单名
    icon: 'icon-name'            图标名
    fixed: true                  如果设置为 true，该项 tag 将一直存在 tag 栏中(默认为 false)
  }
 * */

/* asyncRoutes 异步路由 后台返回*/
export const asyncRoutes = [
   /*系统管理*/
   {
      path: "/system",
      name: 'system',
      component: Layout,
      meta: {
         title: '系统管理',
         icon: 'el-icon-notebook-2', /*此处icon无效， menu js 才有效*/
      },
      children: [
         {
            path: "menu",
            name: 'menu',
            component: () => import(/* webpackChunkName: "menu" */ '../views/System/MenuManage2'),
            meta: {title: '菜单管理'}
         },
         {
            path: "user",
            name: 'user',
            component: () => import(/* webpackChunkName: "PeopleManage" */ '../views/System/user'),
            // component: () => import(/* webpackChunkName: "user" */ '../views/System/user'),
            meta: {title: '用户管理'}
         },

         {
            path: "dict",
            name: 'dict',
            component: () => import(/* webpackChunkName: "dict" */ '../views/System/dict'),
            meta: {title: '字典管理'}
         },
         {
            path: "dictData/:id",
            name: 'dictData',
            component: () => import(/* webpackChunkName: "dictData" */ '../views/System/dictData'),
            meta: {title: '字典数据'}
         },
         {
            path: "dept",
            name: 'dept',
            component: () => import(/* webpackChunkName: "dept" */ '../views/System/dept'),
            meta: {title: '部门管理'}
         },

         {
            path: "post",
            name: 'post',
            component: () => import(/* webpackChunkName: "post" */ '../views/System/post'),
            meta: {title: '岗位管理'}
         },
         {
            path: "role",
            name: 'role',
            // component: () => import(/* webpackChunkName: "post" */ '../views/System/role'),
            component: () => import(/* webpackChunkName: "PowerRole" */ '../views/System/PowerRole'),
            meta: {title: '角色管理'}
         },
         {
            path: "state",
            name: 'state',
            component: () => import(/* webpackChunkName: "state" */ '../views/System/state'),
            meta: {title: '国家管理'},
         },
         {
            path: "site",
            name: 'SiteManage',
            component: () => import(/* webpackChunkName: "SiteManage" */ '../views/System/SiteManage'),
            meta: {title: '站点管理'},
         },
         {
            path: "ApplyManage",
            name: 'ApplyManage',
            component: () => import(/* webpackChunkName: "ApplyManage" */ '../views/System/ApplyManage'),
            meta: {title: '应用管理'},
         },
         {
            path: "rate",
            name: 'rate',
            component: () => import(/* webpackChunkName: "ExchangeManage" */ '../views/System/rate'),
            meta: {title: '汇率管理'},
         },
         {
            path: "area",
            name: 'RegionManage',
            component: () => import(/* webpackChunkName: "RegionManage" */ '../views/System/RegionManage'),
            meta: {title: '区域管理'},
         },
         {
            path: 'enterprise',
            name: 'CompanyInfo',
            component: () => import(/* webpackChunkName: "CompanyInfo" */ '../views/System/CompanyInfo'),
            meta: {title: '企业信息'}
         },
         {
            path: "unit",
            name: 'unit',
            component: () => import(/* webpackChunkName: "unit" */ '../views/System/unit'),
            meta: {title: '单位管理'},
         },
         {
            path: "message",
            name: 'message',
            component: () => import(/* webpackChunkName: "message" */ '../views/System/message'),
            meta: {title: '消息通知'},
         },
         {
            path: "userinfo",
            name: 'userinfo',
            component: () => import(/* webpackChunkName: "userinfo" */ '../views/AccountCenter/PersonalInfo'),
            meta: {title: '个人中心'},
         },
      ],
   },

   /*基本信息*/
   {
      path: "/BasicInfo",
      name: 'BasicInfo',
      component: Layout,
      meta: {
         title: '基本信息',
         icon: 'el-icon-notebook-2', /*此处icon无效， menu js 才有效*/
      },
      children: [
         // {
         //    path: 'OrganManage',
         //    name: 'OrganManage',
         //    component: () => import(/* webpackChunkName: "OrganManage" */ '../views/BasicInfo/OrganManage'),
         //    meta: {title: '组织结构管理'}
         // },
         // {
         //    path: 'PeopleManage',
         //    name: 'PeopleManage',
         //    component: () => import(/* webpackChunkName: "PeopleManage" */ '../views/System/PeopleManage'),
         //    meta: {title: '人员管理'}
         // },
         // {
         //    path: 'ApplyAuthorize',
         //    name: 'ApplyAuthorize',
         //    component: () => import(/* webpackChunkName: "ApplyAuthorize" */ '../views/BasicInfo/ApplyAuthorize'),
         //    meta: {title: '应用授权'}
         // }

      ]
   },

   /*角色权限管理*/
   {
      path: "/PowerManage",
      name: 'PowerManage',
      component: Layout,
      meta: {
         title: "角色权限管理",
         icon: 'el-icon-s-tools',
      },
      children: [
         {
            path: "PowerRole",
            name: 'PowerRole',
            component: () => import(/* webpackChunkName: "PowerRole" */ '../views/System/PowerRole'),
            meta: {title: '业务系统角色'}
         },
         // {
         //    path: "MenuManage",
         //    name: 'MenuManage',
         //    component: () => import(/* webpackChunkName: "MenuManage" */ '../views/System/MenuManage'),
         //    meta: {title: '菜单管理'}
         // },

      ]
   },

   /*店铺管理*/
   {
      path: "/StoreManage",
      name: "StoreManage",
      component: Layout,
      meta: {
         title: "店铺管理",
         icon: 'el-icon-s-bag-1',
      },
      children: [
         {
            path: "StoreAuthorize",
            name: 'StoreAuthorize',
            component: () => import(/* webpackChunkName: "StoreAuthorize" */ '../views/StoreManage/StoreAuthorize'),
            meta: {title: '应用授权'},
         },
         {
            path: "AdjustEntity",
            name: 'AdjustEntity',
            component: () => import(/* webpackChunkName: "AdjustEntity" */ '../views/StoreManage/AdjustEntity'),
            meta: {title: '店铺核算主体'},
         },
         {
            path: "AdjustStore",
            name: 'AdjustStore',
            component: () => import(/* webpackChunkName: "AdjustStore" */ '../views/StoreManage/AdjustStore'),
            meta: {title: '财务核算店铺'},
         },
         {
            path: "StoreEmail",
            name: 'StoreEmail',
            component: () => import(/* webpackChunkName: "StoreEmail" */ '../views/StoreManage/StoreEmail'),
            meta: {title: '店铺邮箱'},
         },
      ]
   },

   /*应用设置*/
   {
      path: "/Parameter",
      name: "Parameter",
      component: Layout,
      meta: {
         title: "参数设置",
         icon: 'el-icon-s-postcard',
      },
      children: [
         // {
         //    path: "CountryManage",
         //    name: 'CountryManage',
         //    component: () => import(/* webpackChunkName: "CountryManage" */ '../views/System/CountryManage'),
         //    meta: {title: '国家管理'},
         // },

         {
            path: "BusinessConfig",
            name: 'BusinessConfig',
            component: () => import(/* webpackChunkName: "BusinessConfig" */ '../views/Parameter/BusinessConfig'),
            meta: {title: '业务配置'},
         },
      ]
   },

   /*页面管理*/
   {
      path: "/PageManage",
      name: "PageManage",
      component: Layout,
      meta: {
         title: "页面管理",
         icon: 'el-icon-circle-check',
      },
      children: [
         {
            path: "BusinessSystem",
            name: 'BusinessSystem',
            component: () => import(/* webpackChunkName: "BusinessSystem" */ '../views/PageManage/BusinessSystem'),
            meta: {title: '业务系统页面'},
         },
      ]
   },

   /*文档管理*/
   {
      path: "/PageManage1",
      name: "PageManage1",
      component: Layout,
      meta: {
         title: "文档管理",
         icon: 'el-icon-folder',
      },
      children: [
         {
            path: "File",
            name: 'File',
            component: () => import(/* webpackChunkName: "File" */ '../views/PageManage/File'),
            meta: {title: '文件档案'},
         },
      ]
   },

   /*日志管理*/
   {
      path: "/LogManage",
      name: "LogManage",
      component: Layout,
      meta: {
         title: "日志管理",
         icon: 'el-icon-s-cooperation',
      },
      children: [
         {
            path: "LogLogin",
            name: 'LogLogin',
            component: () => import(/* webpackChunkName: "LogLogin" */ '../views/LogManage/LogLogin'),
            meta: {title: '登录日志'},
         },
      ]
   },

   /*账户中心*/
   {
      path: "/AccountCenter",
      name: "AccountCenter",
      component: Layout,
      meta: {
         title: "账户中心",
         icon: 'el-icon-set-up',
      },
      children: [
         {
            path: "PersonalInfo",
            name: 'PersonalInfo',
            component: () => import(/* webpackChunkName: "PersonalInfo" */ '../views/AccountCenter/PersonalInfo'),
            meta: {title: '个人信息'},
         },
         {
            path: "AccountSetup",
            name: 'AccountSetup',
            component: () => import(/* webpackChunkName: "AccountSetup" */ '../views/AccountCenter/AccountSetup'),
            meta: {title: '账户设置'},
         },
      ]
   },

   /*消息中心*/
   {
      path: "/MessageCenter",
      name: "MessageCenter",
      component: Layout,
      meta: {
         title: "消息中心",
         icon: 'el-icon-bell',
      },
      children: [
         {
            path: "MessageList",
            name: 'MessageList',
            component: () => import(/* webpackChunkName: "MessageList" */ '../views/MessageCenter/MessageList'),
            meta: {title: '消息列表'},
         },
      ]
   },

   /*产品信息*/
   {
      path: "/ProductInfo",
      name: "ProductInfo",
      component: Layout,
      meta: {
         title: "产品信息",
         icon: 'el-icon-s-marketing',
      },
      children: [
         {
            path: "ClassifiedManage",
            name: 'ClassifiedManage',
            component: () => import(/* webpackChunkName: "ClassifiedManage" */ '../views/ProductInfo/ClassifiedManage'),
            meta: {title: '分类管理'},
         },
         {
            path: "BrandManage",
            name: 'BrandManage',
            component: () => import(/* webpackChunkName: "BrandManage" */ '../views/ProductInfo/BrandManage'),
            meta: {title: '品牌管理'},
         }
      ]
   },


   /*业务工具*/
   {
      path: "/BusinessTools",
      name: "BusinessTools",
      component: Layout,
      meta: {
         title: "业务工具",
         icon: 'el-icon-video-camera',
      },
      children: [
         {
            path: "EvaluateMonitor",
            name: 'EvaluateMonitor',
            component: () => import(/* webpackChunkName: "EvaluateMonitor" */ '../views/BusinessTools/EvaluateMonitor'),
            meta: {title: '评价监控'},
         },
         {
            path: "SellWith",
            name: 'SellWith',
            component: () => import(/* webpackChunkName: "SellWith" */ '../views/BusinessTools/SellWith'),
            meta: {title: '跟卖监控'},
         },
         {
            path: "KeywordRank",
            name: 'KeywordRank',
            component: () => import(/* webpackChunkName: "KeywordRank" */ '../views/BusinessTools/KeywordRank'),
            meta: {title: '关键词排名'},
         },
         {
            path: "CompeteMonitor",
            name: 'CompeteMonitor',
            component: () => import(/* webpackChunkName: "CompeteMonitor" */ '../views/BusinessTools/CompeteMonitor'),
            meta: {title: '竞品监控'},
         },
      ]
   },

   /*销售管理*/
   {
      path: "/SalesManage",
      name: "SalesManage",
      component: Layout,
      meta: {
         title: "销售管理",
         icon: 'el-icon-video-camera',
      },
      children: [
         {
            path: "Listing",
            name: 'Listing',
            component: () => import(/* webpackChunkName: "Listing" */ '../views/SalesManage/Listing'),
            meta: {title: 'Listing'},
         },
         {
            path: "OrderList",
            name: 'OrderList',
            component: () => import(/* webpackChunkName: "OrderList" */ '../views/SalesManage/OrderList'),
            meta: {title: '订单列表'},
         },
         {
            path: "ReturnOrder",
            name: 'ReturnOrder',
            component: () => import(/* webpackChunkName: "ReturnOrder" */ '../views/SalesManage/ReturnOrder'),
            meta: {title: '退货订单'},
         },
         {
            path: "RemoveOrder",
            name: 'RemoveOrder',
            component: () => import(/* webpackChunkName: "RemoveOrder" */ '../views/SalesManage/RemoveOrder'),
            meta: {title: '移除订单'},
         },
         {
            path: "PromotionOrder",
            name: 'PromotionOrder',
            component: () => import(/* webpackChunkName: "PromotionOrder" */ '../views/SalesManage/PromotionOrder'),
            meta: {title: '促销订单'},
         },
         {
            path: "AmazonShipping",
            name: 'AmazonShipping',
            component: () => import(/* webpackChunkName: "AmazonShipping" */ '../views/SalesManage/AmazonShipping'),
            meta: {title: '亚马逊配送货件'},
         },
         {
            path: "UserList",
            name: 'UserList',
            component: () => import(/* webpackChunkName: "UserList" */ '../views/SalesManage/UserList'),
            meta: {title: '用户列表'},
         },
      ]
   },

   /*仓库管理*/
   {
      path: "/WarehouseManage",
      name: "WarehouseManage",
      component: Layout,
      meta: {
         title: "仓库管理",
         icon: 'el-icon-circle-check',
      },
      children: [
         {
            path: "WarehouseList",
            name: 'WarehouseList',
            component: () => import(/* webpackChunkName: "WarehouseList" */ '../views/WarehouseManage/WarehouseList'),
            meta: {title: '仓库列表'},
         },
         {
            path: "FBAInventory",
            name: 'FBAInventory',
            component: () => import(/* webpackChunkName: "FBAInventory" */ '../views/WarehouseManage/FBAInventory'),
            meta: {title: 'FBA库存'},
         },
      ]
   },

   /*财务管理*/
   {
      path: "/Finance",
      name: "Finance",
      component: Layout,
      meta: {
         title: "财务管理",
         icon: 'el-icon-shopping-bag-1',
      },
      children: [
         {
            path: "AccountFunds",
            name: 'AccountFunds',
            component: () => import(/* webpackChunkName: "AccountFunds" */ '../views/Finance/AccountFunds'),
            meta: {title: '账户资金'},
         },
         {
            path: "RemittanceRecords",
            name: 'RemittanceRecords',
            component: () => import(/* webpackChunkName: "RemittanceRecords" */ '../views/Finance/RemittanceRecords'),
            meta: {title: '回款记录'},
         },
         {
            path: "SettlementDetails",
            name: 'SettlementDetails',
            component: () => import(/* webpackChunkName: "SettlementDetails" */ '../views/Finance/SettlementDetails'),
            meta: {title: '结算明细'},
         },
      ]
   },

   /*报表中心*/
   /*广告报表*/
   {
      path: "/ReportsCenter",
      name: 'ReportsCenter',
      component: Layout,
      meta: {
         title: '广告报表',
         icon: 'el-icon-notebook-2'
      },
      children: [
         {
            path: 'ADReports',
            name: 'ADReports',
            component: () => import(/* webpackChunkName: "ADReports" */ '../views/ReportsCenter/ADReports'),
            meta: {title: '广告活动报表'}
         },
         {
            path: 'BusinessReport',
            name: 'BusinessReport',
            component: () => import(/* webpackChunkName: "BusinessReport" */ '../views/ReportsCenter/BusinessReport'),
            meta: {title: '业务报告'}
         },
         {
            path: 'OrderReport',
            name: 'OrderReport',
            component: () => import(/* webpackChunkName: "OrderReport" */ '../views/ReportsCenter/OrderReport'),
            meta: {title: '订单报表'}
         },
         {
            path: 'FBIReport',
            name: 'FBIReport',
            component: () => import(/* webpackChunkName: "FBIReport" */ '../views/ReportsCenter/FBIReport'),
            meta: {title: 'FBI报表'}
         },
      ]
   },


   // {
   //   path: 'image',
   //   name: 'Image',
   //   component: Layout,
   //   redirect: "/image/image-cropper',
   //   meta: {
   //     title: '图片处理',
   //     icon: 'vue-dsn-icon-picture'
   //   },
   //   children: [
   //     {
   //       path: 'image-cropper',
   //       name: 'ImageCropper',
   //       component: () => import(/* webpackChunkName: "404" */ '../views/image/ImageCropper'),
   //       meta: {
   //         title: '图片裁剪'
   //       }
   //     },
   //     {
   //       path: 'image-compress',
   //       name: 'ImageCompress',
   //       component: () => import(/* webpackChunkName: "404" */ '../views/image/ImageCompress'),
   //       meta: {
   //         title: '图片压缩'
   //       }
   //     },
   //     {
   //       path: 'image-synthesizer',
   //       name: 'ImageSynthesizer',
   //       component: () => import(/* webpackChunkName: "404" */ '../views/image/ImageSynthesizer'),
   //       meta: {
   //         title: '图片合成'
   //       }
   //     }
   //   ]
   // },

   // {
   //   path: 'error-page',
   //   name: 'ErrorPage',
   //   component: Layout,
   //   redirect: "/error-page/page-401',
   //   meta: {
   //     title: '错误页面',
   //     icon: 'vue-dsn-icon-bug'
   //   },
   //   children: [
   //     {
   //       path: 'page-401',
   //       name: 'Page401',
   //       component: () => import(/* webpackChunkName: "404" */ '../views/error-page/401'),
   //       meta: {
   //         title: '401页面'
   //       }
   //     },
   //     {
   //       path: 'page-404',
   //       name: 'Page404',
   //       component: () => import(/* webpackChunkName: "404" */ '../views/error-page/404'),
   //       meta: {
   //         title: '404页面'
   //       }
   //     }
   //   ]
   // }
]
