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

const app = createApp(App)
app.use(createPinia());
app.use(naive)
app.use(router)
app.use(VueCookies);
app.config.globalProperties.$userStore = userStore;
app.config.globalProperties.$cookies = VueCookies;
app.config.globalProperties.$router = router;

app.mount('#app')