import state from './state'
// import getters from './getters'
// import actions from './actions'
import { defineStore } from 'pinia'
import { darkTheme } from 'naive-ui'
// import { getImageFileFromUrl } from '../lib/file'

// useStore 可以是任何类似 useUser、useCart 的东西
// 第一个参数是应用程序中存储的唯一 id
export const userStore = defineStore('main', {
    // 储存状态
    // 必须是箭头函数
    // 为了防止交叉请求造成数据污染和更好的 TS 推导
    state: () => {
        return state
    },
    // 储存计算属性，有缓存
    getters: {
        // changeCountG(state) {
        //     console.log(state.countG)
        //     return state.countG += 1
        // },
        // changeThemeMD(): string {
        //     return this.themeMD
        // },
        
    },
    // 封装逻辑业务，修改 state
    actions: {
        // changeCountA() {
        //     console.log(this.countA)
        //     return this.countA += 1
        // },
        changeScreenWidth(screenWidth: number) {
            this.screenWidth = screenWidth
            // userMainHeadBackgroundImage
            // 690
            // 1070
        },
        changeThemeNaive(theme: string) {
            this.themeMD = theme
            // console.log(theme)
            let dom: any = document.querySelector('body');
            if (theme == 'dark') {
                this.themeNaive = darkTheme
                dom.style.backgroundColor = 'rgb(8 9 14)';
            } else {
                this.themeNaive = null
                dom.style.backgroundColor = '#fff';
            }
        },
        loadingShowChange() {
            // console.log(this.loadingShow)
            this.loadingShow = !this.loadingShow
            if (this.loadingShow) {
                this.loadingOpacity = 1
            } else {
                this.loadingOpacity = 0
            }
        },
    },
})