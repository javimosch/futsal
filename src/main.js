//require(`quasarCss${__THEME}.css`)

console.log('MAIN')

import "regenerator-runtime/runtime";

import './css/variables.scss';

// main.js
import Vue from 'vue'
//import App from './App.vue'
import router from './router.js'
import BootstrapVue from 'bootstrap-vue'
import sidevue from 'sidevue';

Vue.component('sidevue', sidevue);
Vue.use(BootstrapVue);

// export a factory function for creating fresh app, router and store
// instances
export async function createApp() {
  // create router instance
  
  const app = new Vue({
    router,
    // the root instance simply renders the App component.
    //render: h => h(App)
    render: h => h(require('./App').default)
  });

  return { app, router };
}
