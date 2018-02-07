console.log('MAIN')

import "regenerator-runtime/runtime";

// main.js
import Vue from 'vue'
import App from './App.vue'
import router from './router.js'

// export a factory function for creating fresh app, router and store
// instances
export function createApp() {
  // create router instance

  const app = new Vue({
    router,
    // the root instance simply renders the App component.
    render: h => h(App)
  });

  return { app, router };
}