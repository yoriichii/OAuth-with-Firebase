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
        component: blog,
        meta: { requiresAuth: true }
    },  
    
    {
        path: '/product',
        name: 'product',
        component: product,
        meta: { requiresAuth: true }
    },  

    {
        path: '/login',
        name: 'login',
        component: login,
    },
    {
        path: '/register',
        name: 'register',
        component: register,
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
});


const getCurrentUser = () => new Promise(resolve => 
  onAuthStateChanged(getAuth(), user => resolve(user))
);

router.beforeEach(async (to, from, next) => {
  const user = await getCurrentUser();

  // Prevent logged-in users from accessing login or register pages
  if (user && (to.path === '/login' || to.path === '/register')) {
    next('/blog'); // Redirect to blog or any other protected route
  } 
  // Protect routes that require authentication
  else if (to.meta.requiresAuth && !user) {
    next('/login');
  } 
  else {
    next();
  }
});


export default router;