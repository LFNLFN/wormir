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
      meta: { title: 'dashboard', icon: 'home', noCache: true }
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
      icon: 'channelManagement'
    },
    children: [
      {
        path: '/newManagement',
        component: () => import('@/views/layout/routerWrap'),
        name: 'newManagement',
        meta: { title: 'newManagement', fontSizeSmall: true },
        children: [
          { path: 'newChannel', component: () => import('@/views/channelManagement/newManagement/newChannel'), name: 'newChannel', meta: { title: 'newChannel' }},
          { path: 'newSubChannel', component: () => import('@/views/channelManagement/newManagement/newSubChannel'), name: 'newSubChannel', meta: { title: 'newSubChannel' }}
          // { path: 'complex-table', component: () => import('@/views/table/complexTable'), name: 'newSubChannel', meta: { title: 'newSubChannel' }}
        ]
      },
      {
        path: '/cooperationManagement',
        component: () => import('@/views/layout/routerWrap'),
        name: 'cooperationManagement',
        meta: { title: 'cooperationManagement', fontSizeSmall: true },
        children: [
          { path: 'cooperationChannel', component: () => import('@/views/channelManagement/cooperationManagement/cooperationChannel'), name: 'cooperationChannel', meta: { title: 'cooperationChannel' }},
          { path: 'inStopProcess', component: () => import('@/views/channelManagement/cooperationManagement/inStopProcess'), name: 'inStopProcess', meta: { title: 'inStopProcess' }},
          { path: 'stopChannel', component: () => import('@/views/channelManagement/cooperationManagement/stopChannel'), name: 'stopChannel', meta: { title: 'stopChannel' }}
        ]
      },
      {
        path: 'contact',
        component: () => import('@/views/channelManagement/contact'),
        name: 'contact',
        meta: { title: 'contact' }
      },
      {
        path: 'levelChange',
        component: () => import('@/views/channelManagement/levelChange/index'),
        name: 'levelChange',
        meta: { title: 'levelChange' }
      }
    ]
  },
  {
    path: '/goodManagement',
    component: Layout,
    redirect: '/goodManagement/brandList',
    name: 'goodManagement',
    meta: {
      title: 'goodManagement',
      icon: 'goodManagement'
    },
    children: [
      {
        path: 'brandList',
        component: () => import('@/views/goodManagement/brandList'),
        name: 'brandList',
        meta: { title: 'brandList' }
      },
      {
        path: 'goodList',
        component: () => import('@/views/goodManagement/goodList'),
        name: 'goodList',
        meta: { title: 'goodList' }
      },
      {
        path: 'sourceGeneration',
        component: () => import('@/views/goodManagement/sourceGeneration'),
        name: 'sourceGeneration',
        meta: { title: 'sourceGeneration' }
      },
      {
        path: 'stockManagement',
        component: () => import('@/views/goodManagement/stockManagement/index'),
        name: 'stockManagement',
        alwaysShow: true,
        meta: { title: 'stockManagement' }
      },
      {
        path: 'abnormalTracking',
        component: () => import('@/views/goodManagement/abnormalTracking/index'),
        name: 'abnormalTracking',
        meta: { title: 'abnormalTracking' }
      },
      {
        path: 'customerTracking',
        component: () => import('@/views/goodManagement/customerTracking/index'),
        name: 'customerTracking',
        alwaysShow: true,
        meta: { title: 'customerTracking' }
      },
      {
        path: 'verifySetting',
        component: () => import('@/views/goodManagement/verifySetting/index'),
        name: 'verifySetting',
        alwaysShow: true,
        meta: { title: 'verifySetting' }
      }
    ]
  },
  {
    path: '/orderManagement',
    component: Layout,
    redirect: '/channelCooperator/billManagement/index.vue',
    name: 'orderManagement',
    meta: {
      title: 'orderManagement',
      icon: 'orderManagement'
    },
    children: [
      {
        path: '/channelCooperator',
        name: 'channelCooperator',
        component: () => import('@/views/layout/routerWrap'),
        redirect: '/channelCooperator/billManagement/index.vue',
        meta: { title: 'channelCooperator', fontSizeSmall: true },
        children: [
          {
            path: 'billManagement',
            component: () => import('@/views/orderManagement/channelCooperator/billManagement/index.vue'),
            name: 'billManagement',
            meta: { title: 'billManagement' }
          },
          {
            path: 'mergeRefundOrders',
            component: () => import('@/views/orderManagement/channelCooperator/mergeRefundOrders/index.vue'),
            name: 'mergeRefundOrders',
            meta: { title: 'mergeRefundOrders' }
          },
          {
            path: 'payOrder',
            component: () => import('@/views/orderManagement/channelCooperator/payOrder/index.vue'),
            name: 'payOrder',
            meta: { title: 'payOrder' }
          },
          {
            path: 'salesPromotion',
            component: () => import('@/views/orderManagement/channelCooperator/salesPromotion/index.vue'),
            name: 'salesPromotion',
            meta: { title: 'salesPromotion' }
          }
        ]
      },
      {
        path: '/refundManagement',
        name: 'refundManagement',
        component: () => import('@/views/layout/routerWrap'),
        redirect: '/refundManagement/receivedRefund',
        meta: { title: 'refundManagement', fontSizeSmall: true },
        children: [
          {
            path: 'receivedRefund',
            component: () => import('@/views/orderManagement/refundManagement/receivedRefund/index.vue'),
            name: 'receivedRefund',
            meta: { title: 'receivedRefund' }
          },
          {
            path: 'payRefund',
            component: () => import('@/views/orderManagement/refundManagement/payRefund/index.vue'),
            name: 'payRefund',
            meta: { title: 'payRefund' }
          }
        ]
      },
      {
        path: '/compensationManagement',
        name: 'compensationManagement',
        component: () => import('@/views/layout/routerWrap'),
        redirect: '/compensationManagement/receivedCompensation/index.vue',
        meta: { title: 'compensationManagement', fontSizeSmall: true },
        children: [
          {
            path: 'receivedCompensation',
            component: () => import('@/views/orderManagement/compensationManagement/receivedCompensation/index.vue'),
            name: 'receivedCompensation',
            meta: { title: 'receivedCompensation' }
          },
          {
            path: 'payCompensation',
            component: () => import('@/views/orderManagement/compensationManagement/payCompensation/index.vue'),
            name: 'payCompensation',
            meta: { title: 'payCompensation' }
          }
        ]
      },
      {
        path: '/problematicProductManagement',
        name: 'problematicProductManagement',
        component: () => import('@/views/layout/routerWrap'),
        redirect: '/problematicProductManagement/defectiveProduct',
        meta: { title: 'problematicProductManagement', fontSizeSmall: true },
        children: [
          {
            path: 'defectiveProduct',
            component: () => import('@/views/orderManagement/problematicProductManagement/defectiveProduct/index.vue'),
            name: 'defectiveProduct',
            meta: { title: 'defectiveProduct' }
          },
          {
            path: 'damagedProduct',
            component: () => import('@/views/orderManagement/problematicProductManagement/damagedProduct/index.vue'),
            name: 'damagedProduct',
            meta: { title: 'damagedProduct' }
          },
          {
            path: 'lessCargoProduct',
            component: () => import('@/views/orderManagement/problematicProductManagement/lessCargoProduct/index.vue'),
            name: 'lessCargoProduct',
            meta: { title: 'lessCargoProduct' }
          }
        ]
      }
    ]
  },
  {
    path: '/accountManagement',
    component: Layout,
    name: 'accountManagement',
    meta: {
      title: 'accountManagement',
      icon: 'orderManagement'
    },
    alwaysShow: true,
    children: [
      {
        path: 'settingManagement',
        component: () => import('@/views/accountManagement/settingManagement/index.vue'),
        name: 'settingManagement',
        meta: { title: 'settingManagement' }
      },
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
