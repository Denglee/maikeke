let menu = {
   status: 1,
   info: "获取成功",
   data: [

      {
         path: 'home',
         meta: {
            title: '首页',
            icon: 'el-icon-s-home',
         }
      },

      /*基本信息*/
      {
         path: 'BasicInfo',
         meta: {
            title: "基本信息",
            icon: 'el-icon-s-marketing',
         },
         children: [{
            path: "CompanyInfo",
            meta: {title: "企业信息",},
         }, {
            path: "OrganManage",
            meta: {title: "组织机构管理",},
         }, {
            path: "PeopleManage",
            meta: {title: "人员管理",},
         }, {
            path: "ApplyAuthorize",
            meta: {title: "应用授权",},
         },
         ]
      },

      /*角色权限管理*/
      {
         path: "PowerManage",
         meta: {
            title: "角色权限管理",
            icon: 'el-icon-s-tools',
         },
         children: [
            {
               path: "PowerRole",
               meta: {title: "业务系统角色",},
            },
         ]
      },

      /*店铺管理*/
      {
         path: "StoreManage",
         meta: {
            title: "店铺管理",
            icon: 'el-icon-s-shop',
         },
         children: [{
            path: "StoreAuthorize",
            meta: {title: "店铺授权",},
         },
            {
               path: "AdjustEntity",
               meta: {title: "店铺核算主体",},
            },
            {
               path: "AdjustStore",
               meta: {title: "财务核算店铺",},
            },
            {
               path: "StoreEmail",
               meta: {title: "店铺邮箱",},
            },
         ]
      },

      /*应用设置*/
      {
         path: "Parameter",
         meta: {
            title: "参数设置",
            icon: 'el-icon-s-tools',
         },
         children: [
            {
               path: "ApplyManage",
               meta: {title: "应用管理",},
            },
            {
               path: "ExchangeManage",
               meta: {title: "汇率管理",},
            },
            {
               path: "CountryManage",
               meta: {title: "国家管理",},
            },
            {
               path: "RegionManage",
               meta: {title: "区域管理",},
            },
            {
               path: "SiteManage",
               meta: {title: "站点管理",},
            },
            {
               path: "BusinessConfig",
               meta: {title: "业务配置",},
            },
         ]
      },

      /*页面管理*/
      {
         path: "PageManage",
         meta: {
            title: "页面管理",
            icon: 'el-icon-circle-check',
         },
         children: [
            {
               path: "BusinessSystem",
               meta: {title: "业务系统页面",},
            },
         ]
      },

      /*文档管理*/
      {
         path: "PageManage2",
         meta: {
            title: "文档管理",
            icon: 'el-icon-folder',
         },
         children: [
            {
               path: "File",
               meta: {title: "文件档案",},
            },
         ]
      },

      /*日志管理*/
      {
         path: "LogManage",
         meta: {
            title: "日志管理",
            icon: 'el-icon-s-cooperation',
         },
         children: [
            {
               path: "LogLogin",
               meta: {title: "登录日志",},
            },
         ]
      },

      /*账户中心*/
      {
         path: "AccountCenter",
         meta: {
            title: "账户中心",
            icon: 'el-icon-set-up',
         },
         children: [
            {
               path: "PersonalInfo",
               meta: {title: "个人信息",},
            },
            {
               path: "AccountSetup",
               meta: {title: "账户设置",},
            },
         ]
      },

      /*消息中心*/
      {
         path: "MessageCenter",
         meta: {
            title: "消息中心",
            icon: 'el-icon-bell',
         },
         children: [
            {
               path: "MessageList",
               meta: {title: "消息列表",},
            },
         ]
      },

      /*产品信息*/
      // {
      //     path: "ProductInfo",
      //     meta: {
      //         title: "产品信息",
      //         icon: 'el-icon-s-marketing',
      //     },
      //     children: [
      //         {
      //            path: "ClassifiedManage",
      //            meta: {title: "分类管理",},
      //         },
      //         {
      //            path: "BrandManage",
      //            meta: {title: "品牌管理",},
      //         }
      //     ]
      // },


      /*业务工具*/
      {
         path: "BusinessTools",
         meta: {
            title: "业务工具",
            icon: 'el-icon-video-camera',
         },
         children: [
            {
               path: "EvaluateMonitor",
               meta: {title: "评价监控",},
            },
            {
               path: "SellWith",
               meta: {title: "跟卖监控",},
            },
            {
               path: "KeywordRank",
               meta: {title: "品牌键词排名"},
            },
            {
               path: "CompeteMonitor",
               meta: {title: "竞品监控",},
            },
         ]
      },

      /*销售管理*/
      {
         path: "SalesManage",
         meta: {
            title: "销售管理",
            icon: 'el-icon-video-camera',
         },
         children: [
            {
               path: "Listing",
               meta: {title: "Listing",},
            },
            {
               path: "OrderList",
               meta: {title: "订单列表",},
            },
            {
               path: "ReturnOrder",
               meta: {title: "退货订单",},
            },
            {
               path: "RemoveOrder",
               meta: {title: "移除订单",},
            },
            {
               path: "PromotionOrder",
               meta: {title: "促销订单",},
            },
            {
               path: "AmazonShipping",
               meta: {title: "亚马逊配送货件",},
            },
            {
               path: "UserList",
               meta: {title: "用户列表",},
            },
         ]
      },

      /*仓库管理*/
      {
         path: "WarehouseManage",
         meta: {
            title: "仓库管理",
            icon: 'el-icon-circle-check',
         },
         children: [
            {
               path: "WarehouseList",
               meta: {title: "仓库列表",},
            },
            {
               path: "FBAInventory",
               meta: {title: "FBA库存",},
            },
         ]
      },

      /*财务管理*/
      {
         path: "Finance",
         meta: {
            title: "财务管理",
            icon: 'el-icon-shopping-bag-1',
         },
         children: [
            {
               path: "AccountFunds",
               meta: {title: "账户资金",},
            },
            {
               path: "RemittanceRecords",
               meta: {title: "回款记录",},
            },
            {
               path: "SettlementDetails",
               meta: {title: "结算明细",},
            },
         ]
      },

      /*报表中心*/
      /*广告报表*/
      {
         path: "ReportsCenter",
         meta: {
            title: "广告报表",
            icon: 'el-icon-notebook-2',
         },
         children: [
            {
               path: "ADReports",
               meta: {title: "广告活动报表",},
            },
            {
               path: "BusinessReport",
               meta: {title: "业务报告",},
            },
            {
               path: "OrderReport",
               meta: {title: "订单报表",},
            },
            {
               path: "FBIReport",
               meta: {title: "FBI报表",},
            },
         ]
      },


      // {
      //    hidden: true,
      //    meta: {title: "登录"},
      //    name: "Login",
      //    path: "/login",
      // },

   ],

};

export default menu;
