import FeedComponent from './components/FeedComponent';
import ProfileComponent from './components/ProfileComponent';
import ProfileInfoComponent from './components/ProfileInfoComponent';
import LoginComponent from './components/LoginComponent'
import RegisterComponent from './components/RegisterComponent'
import NameSearchComponent from './components/NameSearchComponent'
import FriendshipComponent from './components/FriendshipComponent'
import FriendsComponent from './components/FriendsComponent'
import Router from 'vue-router'
import Vue from 'vue'
import store from './store'
//import Login from './components/LoginComponent';
Vue.use(Router)


let router = new Router({
mode: 'history',
routes:[
    {path:'/',
    component:FeedComponent,
    meta: { 
      requiresAuth: true
    }
  
    },
    {
      path:'/feed',component:FeedComponent,
      meta: { 
        requiresAuth: true
      }
  
    },
    {
      path: '/profile/infoPessoais',
      component: ProfileInfoComponent,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path:'/profile/:id',
      component:ProfileComponent,
      meta: { 
        requiresAuth: true
      }
    },
    {path: '/register', component:RegisterComponent},
    {path: '/login', component:LoginComponent},
    {
      path: '/nome/:nome',
      component:NameSearchComponent,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/pedidosAmizade',
      component: FriendshipComponent,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/amigos/:id',
      component: FriendsComponent,
      meta: { 
        requiresAuth: true
      }
    },
]
})


router.beforeEach((to, from, next) => {
    if (store.getters.isLoggedIn) {

      if (to.fullPath == '/register') {
        next('/feed') 
        return
      }
      if (to.fullPath == '/login') {
        next('/feed') 
        return

      }
    }
    if(to.matched.some(record => record.meta.requiresAuth)) {
      if (store.getters.isLoggedIn) {
        
        next()
        return
      }
      next('/login') 
    } else {
      next() 
    }
  })

export default router

