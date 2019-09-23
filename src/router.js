import Vue from 'vue'
import Router from 'vue-router'
import NotFound from './views/NotFound.vue'
import SignIn from './views/signIn.vue'
import Restaurants from './views/Restaurants.vue'
import store from './store'

Vue.use(Router)

const authorizeIsAdmin = (to, from, next) => {
  const currentUser = store.state.currentUser
  if (currentUser && !currentUser.isAdmin) {
    next('/404')
    return
  }
  next()
}

const router = new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: '/signin'
    },
    {
      path: '/signin',
      name: 'sign-in',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'sign-up',
      component: () => import('./views/signUp.vue')
    },
    {
      path: '/restaurants',
      name: 'restaurants',
      component: Restaurants
    },
    {
      path: '/restaurants/feeds',
      name: 'restaurants-feeds',
      component: () => import('./views/RestaurantsFeeds')
    },
    {
      path: '/restaurants/top',
      name: 'restaurants-tops',
      component: () => import('./views/RestaurantsTop')
    },
    {
      path: '/restaurants/:id',
      name: 'restaurant',
      component: () => import('./views/Restaurant')
    },
    {
      path: '/restaurants/:id/dashboard',
      name: 'restaurant-dashboard',
      component: () => import('./views/RestaurantDashboard')
    },
    {
      path: '/users/top',
      name: 'users-tops',
      component: () => import('./views/UsersTop')
    },
    {
      path: '/users/:id',
      name: 'user',
      component: () => import('./views/User')
    },
    {
      path: '/users/:id/edit',
      name: 'user-edit',
      component: () => import('./views/UserEdit')
    },
    {
      path: '/admin',
      exact: true,
      redirect: '/admin/restaurants'
    },
    {
      path: '/admin/restaurants',
      name: 'admin-restaurants',
      component: () => import('./views/AdminRestaurants'),
      beforeEnter: authorizeIsAdmin
    },
    {
      path: '/admin/restaurants/new',
      name: 'admin-restaurant-new',
      component: () => import('./views/AdminRestaurantNew'),
      beforeEnter: authorizeIsAdmin
    },
    {
      path: '/admin/restaurants/:id/edit',
      name: 'admin-restaurant-edit',
      component: () => import('./views/AdminRestaurantEdit'),
      beforeEnter: authorizeIsAdmin
    },
    {
      path: '/admin/restaurants/:id',
      name: 'admin-restaurant',
      component: () => import('./views/AdminRestaurant'),
      beforeEnter: authorizeIsAdmin
    },
    {
      path: '/admin/categories',
      name: 'admin-categories',
      component: () => import('./views/AdminCategories.vue'),
      beforeEnter: authorizeIsAdmin
    },
    {
      path: '/admin/users',
      name: 'admin-users',
      component: () => import('./views/AdminUsers.vue'),
      beforeEnter: authorizeIsAdmin
    },
    {
      path: '*',
      name: 'Not-found',
      component: NotFound
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const tokenInLocalStorage = localStorage.getItem('token')
  const tokenInStore = store.state.token
  let isAuthenticated = store.state.isAuthenticated

  // 比較 localStorage 和 store 中的 token 是否一樣
  if (tokenInLocalStorage && tokenInLocalStorage !== tokenInStore) {
    isAuthenticated = await store.dispatch('fetchCurrentUser')
  }

  // 對於不需要驗證 token 的頁面
  const pathsWithoutAuthentication = ['sign-up']
  if (pathsWithoutAuthentication.includes(to.name)) {
    next()
    return
  }

  // 如果 token 無效則轉址到登入頁
  if (!isAuthenticated && to.name !== 'sign-in') {
    next('/signin')
    return
  }

  // 如果 token 有效則轉址到餐聽首頁
  if (isAuthenticated && to.name === 'sign-in') {
    next('/restaurants')
    return
  }

  next()
})

export default router
