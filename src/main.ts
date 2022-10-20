import { createApp, defineComponent, getCurrentInstance } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import naive from 'naive-ui';
import router from './router';
import { userStore } from './Store';
import VueCookies from 'vue-cookies';

// 通用字体
import 'vfonts/Lato.css'
// 等宽字体
import 'vfonts/FiraCode.css'

// 创建 APP
const app = createApp(App)
// 挂载全局 Pinia（vuex）
app.use(createPinia());
// 挂载全局 naive UI 库
app.use(naive)
// 挂载全局路由 router
app.use(router)
// 挂载全局 VueCookies
app.use(VueCookies);
// 设置 userStore 全局访问变量
app.config.globalProperties.$userStore = userStore;
// 设置 VueCookies 全局访问变量
app.config.globalProperties.$cookies = VueCookies;
// 设置 router 全局访问变量
app.config.globalProperties.$router = router;

// 把 APP 挂在到 DOM 上
app.mount('#app')