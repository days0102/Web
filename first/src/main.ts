/*
 * @Author: Outsider
 * @Date: 2022-01-25 11:49:01
 * @LastEditors: Outsider
 * @LastEditTime: 2022-01-25 16:36:14
 * @Description: In User Settings Edit
 * @FilePath: \first\src\main.ts
 */
import { createApp } from "vue";

import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import antDesign from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import * as antIcons from "@ant-design/icons-vue";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(antDesign);

const icons: any = antIcons;
for (const i in icons) {
  app.component(i, icons[i]);
}

app.mount("#app");