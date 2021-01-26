let menu = {
    status: 1,
    info: "获取成功",
    data:[

      {
        path: 'home',
        meta: {
          title: '首页',
          icon: 'el-icon-s-home',
        }
      },

      /*基本信息*/
      {
        path:'BasicInfo',
        meta:{
          title: "基本信息",
          icon:'el-icon-s-marketing',
        },
        children: [{
            path: "CompanyInfo",
            meta:{
              title: "企业信息",
            },
          }, {
            path: "OrganManage",
            meta:{
              title: "组织机构管理",
            },
          }, {
            path: "PeopleManage",
            meta:{
              title: "人员管理",
            },
          }, {
            path: "ApplyAuthorize",
            meta:{
              title: "应用授权",
            },
          },
        ]
      },

      /*广告报表*/
      {
        path: "ReportsCenter",
        meta:{
          title:'广告报表',
          icon: "el-icon-shopping-bag-1",
        },
        children: [{
            path: "ADReports",
            meta:{
              title: "广告活动报表",
            },
          }]
      },


      {
        hidden: true,
        meta: {title: "登录"},
        name: "Login",
        path: "/login",
      },
    ],

};

export default menu;
