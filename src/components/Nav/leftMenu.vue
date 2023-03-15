<template>
  <div>
    <n-layout has-sider id="leftMenu">
      <n-layout-sider
        bordered
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :collapsed="collapsed"
        show-trigger
        @collapse="collapsed = true"
        @expand="collapsed = false"
      >
        <n-menu
          @update:value="menuSelect"
          :collapsed="collapsed"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuOptions"
          key-field="whateverKey"
          label-field="whateverLabel"
          children-field="whateverChildren"
        />
      </n-layout-sider>
      <router-view></router-view>
      <!-- <MdEditor id="editorMD" /> -->
    </n-layout>
  </div>
</template>

<script setup lang="ts">
import MdEditor from "../mdEditor.vue";
import { defineComponent, h, ref, Component, getCurrentInstance } from "vue";
import { NIcon } from "naive-ui";
import type { MenuOption } from "naive-ui";
import router from "../../router";
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  WineOutline as WineIcon,
} from "@vicons/ionicons5";
// import { storeToRefs } from 'pinia'

const { proxy } = getCurrentInstance() as any;
const store = proxy.$userStore();
function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}
let collapsed = ref(true);
const menuOptions: MenuOption[] = [
  {
    whateverLabel: "写笔记",
    whateverKey: "editorMD",
    icon: renderIcon(BookIcon),
  },
  {
    whateverLabel: "个人笔记",
    whateverKey: "userMain",
    icon: renderIcon(BookIcon),
    // disabled: true,
    // whateverChildren: [
    //     {
    //         whateverLabel: '鼠',
    //         whateverKey: 'rat'
    //     }
    // ]
  },
  {
    whateverLabel: "寻羊冒险记",
    whateverKey: "a-wild-sheep-chase",
    disabled: true,
    icon: renderIcon(BookIcon),
  },
  {
    whateverLabel: "舞，舞，舞",
    whateverKey: "dance-dance-dance",
    icon: renderIcon(BookIcon),
    whateverChildren: [
      {
        type: "group",
        whateverLabel: "人物",
        whateverKey: "people",
        whateverChildren: [
          {
            whateverLabel: "叙事者",
            whateverKey: "narrator",
            icon: renderIcon(PersonIcon),
          },
          {
            whateverLabel: "羊男",
            whateverKey: "sheep-man",
            icon: renderIcon(PersonIcon),
          },
        ],
      },
      {
        whateverLabel: "饮品",
        whateverKey: "beverage",
        icon: renderIcon(WineIcon),
        whateverChildren: [
          {
            whateverLabel: "威士忌",
            whateverKey: "whisky",
          },
        ],
      },
      {
        whateverLabel: "食物",
        whateverKey: "food",
        whateverChildren: [
          {
            whateverLabel: "三明治",
            whateverKey: "sandwich",
          },
        ],
      },
      {
        whateverLabel: "过去增多，未来减少",
        whateverKey: "the-past-increases-the-future-recedes",
      },
    ],
  },
];
const menuSelect = (key: string | number) => {
  // console.log(key)
  router.push("/" + key);
};

// // import { Client } from 'whatsapp-web.js'
// // import.meta.globEager(""
// // const WAWebJS = import.meta.globEager('../../../node_modules/whatsapp-web.js/index.d.ts')
// // const a = {
// //     '../../../node_modules/whatsapp-web.js/index.js': () => import('../../../node_modules/whatsapp-web.js')
// // }
// // const a = import.meta.glob('whatsapp-web.js')
// const { Client } = import.meta.glob('whatsapp-web.js')
// // const { Client } = require('whatsapp-web.js');
// console.log(1);
// // console.log(WAWebJS);

// const clientA = new Client();
// console.log(2);

// clientA.on('qr', (qr: any) => {
//     // Generate and scan this code with your phone
//     console.log('QR RECEIVED', qr);
// });
// console.log(3);

// clientA.on('ready', () => {
//     console.log('Client is ready!');
// });
// console.log(4);

// clientA.on('message', (msg: { body: string; reply: (arg0: string) => void }) => {
//     if (msg.body == '!ping') {
//         msg.reply('pong');
//     }
// });
// console.log(5);

// clientA.initialize();
// console.log(6);
</script>

<style lang="scss" scoped>
#leftMenu {
  position: fixed;
  top: 50px;
  width: 100%;
  height: calc(100% - 50px);
}
</style>
