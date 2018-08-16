import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/** note: submenu only apppear when children.length>=1
*   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
**/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/authredirect', component: () => import('@/views/login/authredirect'), hidden: true },
  { path: '/404', component: () => import('@/views/errorPage/404'), hidden: true },
  { path: '/401', component: () => import('@/views/errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'dashboard',
      meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
    }]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/channelManagement',
    component: Layout,
    name: 'channelManagement',
    meta: {
      title: 'channelManagement',
      icon: 'table'
    },
    children: [
      {
        path: '/newManagement',
        component: () => import('@/views/table/complexTable'),
        name: 'newManagement',
        meta: { title: 'newManagement' },
        children: [
          { path: 'complex-table', component: () => import('@/views/table/complexTable'), name: 'newChannel', meta: { title: 'newChannel' }},
          { path: 'complex-table', component: () => import('@/views/table/complexTable'), name: 'newSubChannel', meta: { title: 'newSubChannel' }}
        ]
      },
      {
        path: '/cooperationManagement',
        component: () => import('@/views/table/complexTable'),
        name: 'cooperationManagement',
        meta: { title: 'cooperationManagement' },
        children: [
          { path: 'complex-table', component: () => import('@/views/table/complexTable'), name: 'cooperationChannel', meta: { title: 'cooperationChannel' }},
          { path: 'complex-table', component: () => import('@/views/table/complexTable'), name: 'inStopProcess', meta: { title: 'inStopProcess' }},
          { path: 'complex-table', component: () => import('@/views/table/complexTable'), name: 'stopChannel', meta: { title: 'stopChannel' }}
        ]
      },
      {
        path: 'contact',
        component: () => import('@/views/svg-icons/index'),
        name: 'contact',
        meta: { title: 'contact' }
      },
      {
        path: 'levelChange',
        component: () => import('@/views/svg-icons/index'),
        name: 'levelChange',
        meta: { title: 'levelChange' }
      }
    ]
  },
  {
    path: '/goodManagement',
    component: Layout,
    name: 'goodManagement',
    meta: {
      title: 'goodManagement',
      icon: 'table'
    },
    children: [
      {
        path: 'brandList',
        component: () => import('@/views/table/complexTable'),
        name: 'brandList',
        meta: { title: 'brandList' }
      },
      {
        path: 'goodList',
        component: () => import('@/views/table/complexTable'),
        name: 'goodList',
        meta: { title: 'goodList' }
      },
      {
        path: '/sourceGeneration',
        component: () => import('@/views/table/complexTable'),
        name: 'sourceGeneration',
        meta: { title: 'sourceGeneration' },
        children: [
          { path: 'complex-table', component: () => import('@/views/table/complexTable'), name: 'sourceCodeManagement', meta: { title: 'sourceCodeManagement' }},
          { path: 'complex-table', component: () => import('@/views/table/complexTable'), name: 'boxCodeManagement', meta: { title: 'boxCodeManagement' }}
        ]
      },
      {
        path: '/sourceTracking',
        component: () => import('@/views/table/complexTable'),
        name: 'sourceTracking',
        alwaysShow: true,
        meta: { title: 'sourceTracking' },
        children: [
          { path: 'inventoryTracking', component: () => import('@/views/table/complexTable'), name: 'inventoryTracking', meta: { title: 'inventoryTracking' }}
        ]
      }
    ]
  },
  {
    path: '/orderManagement',
    component: Layout,
    // redirect: '/channelCooperator/billManagement',
    name: 'orderManagement',
    meta: {
      title: 'orderManagement',
      icon: 'table'
    },
    children: [
      {
        path: '/channelCooperator',
        name: 'channelCooperator',
        component: () => import('@/views/orderManagement/channelCooperator/billManagement'),
        redirect: '/channelCooperator/billManagement',
        meta: { title: 'channelCooperator' },
        children: [
          {
            path: 'billManagement',
            component: () => import('@/views/orderManagement/channelCooperator/billManagement'),
            name: 'billManagement',
            meta: { title: 'billManagement' }
          },
          {
            path: 'mergeRefundOrders',
            component: () => import('@/views/orderManagement/channelCooperator/mergeRefundOrders'),
            name: 'mergeRefundOrders',
            meta: { title: 'mergeRefundOrders' }
          },
          {
            path: 'payOrder',
            component: () => import('@/views/orderManagement/channelCooperator/payOrder'),
            name: 'payOrder',
            meta: { title: 'payOrder' }
          }
        ]
      },
      {
        path: '/refundManagement',
        name: 'refundManagement',
        component: () => import('@/views/orderManagement/refundManagement/receivedRefund'),
        redirect: '/refundManagement/receivedRefund',
        meta: { title: 'refundManagement' },
        children: [
          {
            path: 'receivedRefund',
            component: () => import('@/views/orderManagement/refundManagement/receivedRefund'),
            name: 'receivedRefund',
            meta: { title: 'receivedRefund' }
          },
          {
            path: 'payRefund',
            component: () => import('@/views/orderManagement/refundManagement/payRefund'),
            name: 'payRefund',
            meta: { title: 'payRefund' }
          }
        ]
      },
      {
        path: '/compensationManagement',
        name: 'compensationManagement',
        component: () => import('@/views/orderManagement/compensationManagement/receivedCompensation'),
        redirect: '/compensationManagement/receivedCompensation',
        meta: { title: 'compensationManagement' },
        children: [
          {
            path: 'receivedCompensation',
            component: () => import('@/views/orderManagement/compensationManagement/receivedCompensation'),
            name: 'receivedCompensation',
            meta: { title: 'receivedCompensation' }
          },
          {
            path: 'payCompensation',
            component: () => import('@/views/orderManagement/compensationManagement/payCompensation'),
            name: 'payCompensation',
            meta: { title: 'payCompensation' }
          }
        ]
      },
      {
        path: '/problematicProductManagement',
        name: 'problematicProductManagement',
        component: () => import('@/views/table/complexTable'),
        redirect: '/problematicProductManagement/defectiveProduct',
        meta: { title: 'problematicProductManagement' },
        children: [
          {
            path: 'defectiveProduct',
            component: () => import('@/views/table/complexTable'),
            name: 'defectiveProduct',
            meta: { title: 'defectiveProduct' }
          },
          {
            path: 'damagedProduct',
            component: () => import('@/views/table/complexTable'),
            name: 'damagedProduct',
            meta: { title: 'damagedProduct' }
          },
          {
            path: 'lessCargoProduct',
            component: () => import('@/views/table/complexTable'),
            name: 'lessCargoProduct',
            meta: { title: 'lessCargoProduct' }
          }
        ]
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
