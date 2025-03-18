import { createWebHistory, createRouter } from 'vue-router';
import blog from '../views/blog.vue';
import login from '../views/login.vue';
import register from '../views/register.vue';
import product from '../views/product.vue';
import { getAuth, onAuthStateChanged  } from "firebase/auth";
const routes = [
    {
        path: '/blog',
        name: 'blog',
        component: blog
    },  
    
    {
        path: '/product',
        name: 'product',
        component: product
    },  

    {
        path: '/login',
        name: 'login',
        component: login
    },
    {
        path: '/register',
        name: 'register',
        component: register
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
});
router.beforeEach((to, from, next) => {
    const auth = getAuth();
  
    // Asynchronous check for authentication state
    onAuthStateChanged(auth, (user) => {
      // Case 1: If user is not logged in and tries to access anything other than /login or /register, redirect to /login
      if (!user && (to.path !== '/login' && to.path !== '/register')) {
        next('/login');
      } 
      // Case 2: If user is logged in and tries to access /login or /register, redirect to /blog
      else if (user && (to.path === '/login' || to.path === '/register')) {
        next('/blog');
      }
      // Case 3: Otherwise, proceed with the navigation
      else {
        next();
      }
    });
  });

export default router;