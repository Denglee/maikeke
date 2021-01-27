import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout/Layout'
import { asyncRoutes } from './AsyncRoutes'

Vue.use(Router)

/**
 * hidden: true                  如果设置为 true，该项菜单将不会显示在菜单栏中(默认为 false)
 * meta : {
    title: 'title'               菜单名
    icon: 'icon-name'            图标名
    fixed: true                  如果设置为 true，该项 tag 将一直存在 tag 栏中(默认为 false)
  }
 * */

/*constantRoutes 常驻 默认有 首页、login、404等*/
export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login/Login'),
    hidden: true,
    meta: { title: '登录' }
  },

  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'Home',
      component: () => import(/* webpackChunkName: "Home" */ '../views/Home/Home'),
      meta: {
        title: '首页',
        icon: 'el-icon-s-home',
        fixed: true
      }
    }]
  },

  {
    path: '*',
    name: '*',
    component: Layout,
    redirect: '/404',
    meta: {
      title: '错误页面',
      icon: 'vue-dsn-icon-bug'
    },
    children: [
      {
        path: '/404',
        name: '404',
        component: () => import(/* webpackChunkName: "404" */ '../views/ErrorPage/404'),
        hidden: true,
        meta: { title: '404' }
      },
    ]
  },



/*  {
    name: '*',
    path: '*',
    redirect: '/404',
    children: [

    ],
  },
  {
    path: '/401',
    name: '401',
    component: () => import(/!* webpackChunkName: "404" *!/ '../views/ErrorPage/401'),
    hidden: true,
    meta: { title: '401' }
  },
  {
    path: '/404',
    name: '404',
    component: () => import(/!* webpackChunkName: "404" *!/ '../views/ErrorPage/404'),
    hidden: true,
    meta: { title: '404' }
  },*/


  /*{
    path: 'https://github.com/baimingxuan/vue-admin-design.git',
    name: 'doc',
    component: Layout,
    meta: {
      title: '文档',
      icon: 'vue-dsn-icon-wendang'
    }
  },
  {
    path: '/',
    name: 'Layout2',
    component: Layout,
    redirect: '/user-center',
    hidden: true,
    children: [{
      path: 'user-center',
      name: 'UserCenter',
      component: () => import(/!* webpackChunkName: "404" *!/ '../views/UserCenter'),
      meta: {
        title: '个人中心'
      }
    }]
  }*/
]

const routes = [...constantRoutes, ...asyncRoutes]

export default new Router({
  routes
})

