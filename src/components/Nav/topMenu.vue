<template>
    <div id="topMenu" class="clearfix">
        <div id="topMenuLeft" class="clearfix">
            <n-menu id="logo" v-model:value="activeKey" mode="horizontal" :options="menuOptions" />
            <n-space id="search">
                <n-input :loading="false" placeholder="搜索">
                    <template #suffix>
                        <n-icon :component="FlashOutline" />
                    </template>
                </n-input>
            </n-space>
        </div>
        <div id="topMenuMain">
            <n-button @click="store.changeThemeNaive('dark')">
                深色
            </n-button>
            <n-button @click="store.changeThemeNaive('light')">
                浅色
            </n-button>
        </div>
        <div id="topMenuRight">
            <n-button @click="store.changeThemeNaive('dark')">
                深色
            </n-button>
            <n-button @click="logout">
                登出
            </n-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineComponent, h, ref, Component, getCurrentInstance } from 'vue'
import { NIcon } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import {
    BookOutline as BookIcon,
    Leaf,
    PersonOutline as PersonIcon,
    FlashOutline,
    WineOutline as WineIcon
} from '@vicons/ionicons5'
// import { storeToRefs } from 'pinia'
const { proxy } = getCurrentInstance() as any
const store = getCurrentInstance()?.appContext.config.globalProperties.$userStore();

function renderIcon(icon: Component) {
    return () => h(NIcon, null, { default: () => h(icon) })
}

let activeKey = ref<string | null>(null)
const menuOptions: MenuOption[] = [
    {
        label: () =>
            h(
                'a',
                {
                    href: '#',
                    target: '_blank',
                    rel: 'noopenner noreferrer'
                },
                '卷王笔记'
            ),
        key: 'hear-the-wind-sing',
        icon: renderIcon(Leaf)
        // Terminal
        // Leaf
    }
]

function logout() {
    const cookies = proxy.$cookies;
    console.log(cookies)
    if (cookies.get('xxxxx')) {
        cookies.remove('xxxxx')
    }
    if (cookies.get('userKey')) {
        cookies.remove('userKey')
    }
}

</script>

<style lang="scss" scoped>
#topMenu {
    width: 100%;
    height: 50px;

    #topMenuLeft {
        padding-right: 20px;
        margin-top: 5px;

        #search {
            line-height: 40px;
        }

        #logo,
        #search {
            float: left;
        }
    }

    #topMenuMain {
        line-height: 50px;
    }

    #topMenuRight {
        float: right;
        line-height: 50px;
    }

    #topMenuLeft,
    #topMenuMain {
        float: left;
    }
}
</style>