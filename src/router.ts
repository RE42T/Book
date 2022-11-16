import { createRouter, createWebHashHistory } from "vue-router";
// import { getCurrentInstance } from 'vue'
// const { proxy } = getCurrentInstance() as any
// const cookies = proxy.$cookies;
function getCookie(name: string) {
var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    // return arr
    if (arr != null) {
        return unescape(arr[2])
    } else {
        return null
    }
}
const routes: any = [
    {
        path:"/",
        name:"home",
        component:()=>import("./components/Nav/index.vue"),
        beforeEnter:(to:any, from:any, next:any) =>{
            //to是当用户点击进入当前页面的时候,我们可以进行一些拦截设置
            //from当来自其他页面进入当前页面的时候，我们也可以进行拦截提示用户
            console.log('我是路由独享守卫！！！');
            // console.log(getCookie('xxxxx'));
            console.log(from.path + '=>' + to.path);
            const key = getCookie('userKey');
            console.log(key);
            if (key) {
                console.log(1);
                next();
            } else {
                console.log(2);
                next({path: '/login'});
            }
        },
        children: [
            {
                path: 'editorMD',
                component:()=>import("./components/mdEditor.vue"),
            },
            {
                path: 'userMain',
                component:()=>import("./components/userMain.vue"),
            },
        ]
    },
    {
        path:"/login",
        name:"login",
        component:()=>import("./components/Login/index.vue")
    },
    {
        path:"/register",
        name:"register",
        component:()=>import("./components/Login/register.vue")
    }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
});
export default router;