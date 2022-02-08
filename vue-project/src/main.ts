/*
 * @Author: Outsider
 * @Date: 2022-01-25 14:54:11
 * @LastEditors: Outsider
 * @LastEditTime: 2022-01-28 22:12:26
 * @Description: In User Settings Edit
 * @FilePath: \vue-project\src\main.ts
 */
import { createApp } from "vue";

import { createPinia } from "pinia";

// @ts-ignore
import App from "./App.vue";
import router from "./router";

import antDesign from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import * as antIcons from "@ant-design/icons-vue";


const app = createApp(App);


app.use(createPinia());
app.use(router);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
app.use(antDesign);

const icons: any = antIcons;
for (const i in icons) {
  app.component(i, icons[i]);
}

app.mount("#app");
