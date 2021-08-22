import Vue from 'vue'
import VueRouter from 'vue-router'

//懒加载：滚动页面的时候自动获取更多的数据，自动获取新的数据 不会对原有数据做出影响
const Home =() =>import('../views/home/Home')
const Category =() =>import('../views/category/Category')
const Profile =() =>import('../views/profile/Profile')
const Cart =() =>import('../views/cart/Cart')
const Detail =() =>import('../views/detail/Detail')

// 1.安装插件
Vue.use(VueRouter);

// 2.插件路由对象
const routes = [
  {
    path: '/',
    redirect:'/home'
  },
  {
    path: '/home',
    component:Home
  },
  {
    path: '/category',
    component:Category
  },
  {
    path: '/shopcart',
    component:Cart
  },
  {
    path: '/profile',
    component:Profile
  },
  {
    path:'/detail/:iid',
    component:Detail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
