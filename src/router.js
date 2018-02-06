// router.js
import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home.vue';
import About from './components/About.vue';
import AuthCallback from './components/AuthCallback.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About },
    {
      path: '/callback',
      name: 'Callback',
      component: AuthCallback
    },
    { path: '*', component: Home },
  ]
});
