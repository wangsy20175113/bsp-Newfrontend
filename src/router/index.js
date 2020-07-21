import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */


/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    hidden: true,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  }

]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [

 {
    path: '/admin',
    component: Layout,
    name: 'admin',
    meta: {
      title: 'admin',
      icon: 'people'
    },
    children: [
      {
        path: 'adminAudit',
        component: () => import('@/views/admin/adminAudit'),
        name: 'adminAudit',
        meta: { title: 'Money Audit' , icon:'Wallet' }
      },
      {
        path: 'roleMenu',
        component: () => import('@/views/admin/roleMenu/role_menu'),
        name: 'roleMenu',
        meta: { title: 'role menu',icon:'menu' }
      },
      {
        path: 'rolePath',
        component: () => import('@/views/admin/roleMenu/role_path'),
        name: 'rolePath',
        hidden: true,
        meta: { title: 'role permission' }
      }
    ]
  },

  {
    path: '/mvo',
    component: Layout,
    name: 'MVO',
    meta: {
      title: 'MVO',
      icon: 'conpany information'
    },
    children: [
      {
        path: 'myInfo',
        component: () => import('@/views/mvo/mvo-myInfo'),
        name: 'myinfo',
        meta: { title: 'My Infomation',icon:'companyreg' }
      },
      {
        path: '/mvo-mycompany',
        component: () => import('@/views/mvo/mvo-mycompany'),
        name: 'mvo-mycompany',
        hidden: true,
        meta: { title: 'Company Information' }
      },
      {
        path: '/mvo-brand',
        component: () => import('@/views/mvo/mvo-brand'),
        name: 'brandDetail',
        hidden: true,
        meta: { title: 'Brand Information' }
      },
      {
        path: 'goodsInput',
        component: () => import('@/views/mvo/mvo-productInput'),
        name: 'goodsinput',
        meta: { title: 'Product Input', icon: 'products'  }
      },
      {
        path: 'goodsCategory',
        component: () => import('@/views/mvo/mvo-product-category'),
        name: 'productCategory',
        meta: { title: 'Product Category', icon: 'category'  }
      },
      {
        path: 'myorder',
        component: () => import('@/views/mvo/mvo-order'),
        name: 'MVOOrderManagement',
        meta: { title: 'Order Management',icon:'shopping' }
      },
      {
        path: '/mvoProduct',
        component: () => import('@/views/mvo/mvo-productDetail'),
        name: 'mvoproduct',
        hidden: true,
        meta: { title: 'Product Detail'}
      },
      {
        path: 'mvo-myWallet',
        component: () => import('@/views/mvo/mvo-myWallet'),
        name: 'mvo-myWallet',
        meta: { title: 'My Wallet',icon:'Wallet' }
      },
      {
        path: 'mvo-myWalletRegister',
        component: () => import('@/views/mvo/mvo-myWalletRegister'),
        name: 'mvo-myWalletRegister',
        meta: { title: 'My Wallet Registion' },
        hidden:true
      },
      {
        path: 'mvo-myWalletBalance',
        component: () => import('@/views/mvo/mvo-myWalletBalance'),
        name: 'mvo-myWalletBalance',
        meta: { title: 'My Balance' },
        hidden:true
      }
    ]
  },
  {
    path: '/bvo',
    component: Layout,
    name: 'BVO',
    meta: {
      title: 'BVO',
      icon: 'icon_ customer'
    },
    children: [
      {
        path: 'myInfo',
        component: () => import('@/views/bvo/bvo-myinfo/bvo-myInfo'),
        name: 'myInfo',
        meta: { title: 'My Infomation',icon:'information' }
      },
      {
        path: 'myStore',
        component: () => import('@/views/bvo/bvo-store/component/bvo-myStore'),
        name: 'mystore',
        meta: { title: 'My Store',icon:'store' }
      },
      {
        path: 'goodslist',
        component: () => import('@/views/bvo/bvo-productScan/bvo-productScan'),
        name: 'goodslist',
        meta: { title: 'Goods List' ,icon:'Products_in_basket'}
      },
      {
        path: 'wishlist',
        component: () => import('@/views/bvo/bvo-wish/bvo-wishList'),
        name: 'wishlist',
        meta: { title: 'Wishlist' ,icon:'wishlist'}

      },
      {
        path: 'orderlist',
        component: () => import('@/views/bvo/bvo-order/orderlist'),
        name: 'orderlist',
        meta: { title: 'Order List', icon:'shopping' }
        // meta: { title: 'Wishlist', icon: 'list' }
      },
      {
        path: 'order-payment',
        component: () => import('@/views/bvo/bvo-order/order-payment'),
        name: 'order-payment',
        hidden:true,
        meta: { title: 'Order Payment' }
        // meta: { title: 'Wishlist', icon: 'list' }
      },
      {
        path: 'order_delivery',
        component: () => import('@/views/bvo/bvo-order/order_delivery'),
        name: 'order_delivery',
        hidden:true,
        meta: { title: 'Tracking Delivery Status' }
        // meta: { title: 'Wishlist', icon: 'list' }
      },
      {
        path: 'productDetail',
        component: () => import('@/views/bvo/bvo-wish/component/product-detail'),
        name: 'productDetail',
        hidden:true,
        meta: { title: 'productDetail' }
        // meta: { title: 'Wishlist', icon: 'list' }
      },
      {
        path: 'storechoose',
        component: () => import('@/views/bvo/bvo-wish/storechoose'),
        name: 'storechoose',
        hidden:true,
        meta: { title: 'storeChoose' }
        // meta: { title: 'storeChoose', icon: 'list' }
      },
      {
        path: 'bvo_wallet_login',
        component: () => import('@/views/bvo/bvo-wallet/bvo_wallet_login'),
        name: 'bvo_wallet_login',
        meta: { title: 'My Wallet',icon:'Wallet'}
      },
      {
        path: 'bvo_wallet_register',
        component: () => import('@/views/bvo/bvo-wallet/bvo_wallet_register'),
        name: 'bvo_wallet_register',
        hidden:true,
        meta: { title: 'bvo_wallet_register' }
      },
      {
        path: 'bvo_wallet_fund',
        component: () => import('@/views/bvo/bvo-wallet/bvo_wallet_fund'),
        name: 'bvo_wallet_fund',
        hidden:true,
        meta: { title: 'bvo_wallet_fund' }
      },
      //
      // {
      //   path: 'theme',
      //   component: () => import('@/views/theme/index'),
      //   name: 'Theme',
      //   meta: { title: 'Theme', icon: 'theme' }
      // }


    ]
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
