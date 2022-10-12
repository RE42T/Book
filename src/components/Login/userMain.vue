<template>
    <div id="userMain">
        <div class="head" :style="themeStyle()">
            <img class="headPortrait" src="img/headPortrait.jpg" alt="">
            <h3 class="userName">君大大人</h3>
            <p class="remark">明日方舟真好玩ヾ(◍°∇°◍)ﾉﾞ！！！</p>
        </div>
        <!-- <n-divider /> -->
        <div class="main">
            <n-card style="margin-bottom: 16px">
                <n-tabs type="line" animated>
                <n-tab-pane name="oasis" tab="我的笔记">
                    <n-list>
                        <n-scrollbar style="max-height: 482px">
                            <n-list-item v-for="(item,index) in noteList" :key="index">
                                <ul class="list clearfix">
                                    <li>{{item}}</li>
                                    <li>
                                        <n-dynamic-tags v-model:value="tags" />
                                    </li>
                                    <li>这篇讲的是白色</li>
                                    <li class="operation">
                                        <n-icon size="20">
                                            <EllipsisVertical />
                                        </n-icon>
                                    </li>
                                </ul>
                            </n-list-item>
                        </n-scrollbar>
                        <!-- <n-list-item>
                            <ul class="list clearfix">
                                <li>fff</li>
                                <li>
                                    <n-dynamic-tags v-model:value="tags" />
                                </li>
                                <li>这篇讲的是白色</li>
                                <li class="operation">
                                    <n-icon size="20">
                                        <EllipsisVertical />
                                    </n-icon>
                                </li>
                            </ul>
                        </n-list-item>
                        <n-list-item>
                            <ul class="list clearfix">
                                <li>fff</li>
                                <li>
                                    <n-dynamic-tags v-model:value="tags" />
                                </li>
                                <li>这篇讲的是白色</li>
                                <li class="operation">
                                    <n-icon size="20">
                                        <EllipsisVertical />
                                    </n-icon>
                                </li>
                            </ul>
                        </n-list-item> -->
                    </n-list>
                </n-tab-pane>
                <n-tab-pane name="the beatles" tab="收藏笔记">
                    Hey Jude
                </n-tab-pane>
                <n-tab-pane name="userMain" tab="个人信息">
                    七里香
                </n-tab-pane>
                <n-tab-pane name="remark" tab="留言板">
                    七里香
                </n-tab-pane>
                </n-tabs>
            </n-card>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, watch, reactive, ref, onMounted, getCurrentInstance } from 'vue'
import {
    FormInst,
    FormItemInst,
    FormItemRule,
    FormRules
} from 'naive-ui'
import { EllipsisVertical } from '@vicons/ionicons5'
// import varScss from '@/assets/scss/_var.module.scss'
// console.log(varScss.userMainTop_BGI_URL)
// import { storeToRefs } from 'pinia'
const { proxy } = getCurrentInstance() as any
const store = proxy.$userStore();
let themeStyle = () => {
    const dark = {
        backgroundImage: "url('img/userMainBG-B.jpg')",
        boxShadow: "inset 0px 0px 90px 1px rgba(0, 0, 0, 1)",
    }
    const light = {
        backgroundImage: "url('img/userMainBG-W.jpg')",
        boxShadow: "inset 0px 0px 90px 1px rgb(255, 255, 255)",
    }
    const themes = {
        dark,
        light
    }
    return themes[store.themeMD]
}
let message = proxy.$message;
let tags = ref(['教师', '程序员'])
let noteList = ref (['fff','fff','fff','fff','fff','fff','fff','fff','fff','fff','fff'])
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_var.module.scss';
#userMain {
    width: 100%;
    .head{
        padding: 40px;
        height: 200px;
        // background-image: url($userMainTop_BGI_URL);
        // background-image: url(var(--userMainTop_BGI_URL));
        background-position: 0 70%;
        background-repeat: no-repeat;
        background-size: 100%;
        // box-shadow: inset 0px 0px 90px 1px rgba(0, 0, 0, 1);
        // box-shadow: inset 0px 0px 90px 1px rgb(255, 255, 255);
        transition: 1s;
        .headPortrait {
            width: 100px;
            height: 100px;
        }
        .userName {
            font-size: 24px;
            line-height: 25px;
        }
        .remark {
            margin-top: 20px;
        }
    }
    .main {
        .list {
            line-height: 28px;
            li {
                list-style: none;
                width: 30%;
                float: left;
            }
            .operation {
                font-size: 10px;
                text-align: right;
                width: calc(10% - 10px);
                padding-right: 10px;
            }
        }
    }
}
</style>