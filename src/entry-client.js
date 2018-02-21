import { createApp } from './main.js';

(async() => {
    let appRta = await createApp()
    const { app } = appRta;
    // this assumes App.vue template root element has `id="app"`
    app.$mount('#app')
})().catch(console.error);
