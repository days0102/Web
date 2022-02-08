<template>
  <div style="background: #c3dff1;">
    <div class="left-page">
      <div style="height: 80px; width: 100%">
        <a-image
          src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fnimg.ws.126.net%2F%3Furl%3Dhttp%253A%252F%252Fdingyue.ws.126.net%252F2021%252F0530%252Ff6edf0a2j00qtvxya000cc000hs00ckc.jpg%26thumbnail%3D650x2147483647%26quality%3D80%26type%3Djpg&refer=http%3A%2F%2Fnimg.ws.126.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1646807044&t=5a7b75520cd219996f97fbbecd60bc05"
          style="width: 100%;height: 80px"></a-image>
      </div>
      <div class="menu">
        <a-menu
          v-model:openKeys="openKeys"
          v-model:selectedKeys="selectedKeys"
          style="background-color: #cce0ee; width: 100%"
          :mode="mode"
          :theme="theme">

          <a-sub-menu
            key="sub1"
            style="background-color: #cce0ee">

            <template #icon>
              <home-outlined />
            </template>
            <template #title>站点首页</template>
            <a-menu-item key="1" @click="Gohome">学会概况</a-menu-item>
            <a-menu-item key="2">站点导航</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <template #icon>
              <user-add-outlined />
            </template>
            <template #title>入会申请</template>
            <a-menu-item key="3">提交申请</a-menu-item>
            <a-menu-item key="4">申请状态</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub3">
            <template #icon>
              <book-outlined />
            </template>
            <template #title>在线学习</template>
            <a-menu-item key="5" @click="Readarticle">浏览文章</a-menu-item>
            <a-menu-item key="6">发布文章</a-menu-item>
            <a-menu-item key="7">发布视频</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </div>
    </div>
    <div class="right-page">
      <div class="head">
        <div style="float: left">
          <h1 class="title">欧美学生会</h1>
        </div>
        <div style="float: right">
          <a-input-search
            v-model:value="value"
            placeholder="input search text"
            enter-button
            @search="onSearch"
            style="padding-top: 25px;padding-right: 15px"
          ></a-input-search>
        </div>
        <div style="float: right">
          <router-link to="/login">
            <a-button style="border-radius: 30px;width: 120px;margin-right: 20px">
              登录/注册
            </a-button>
          </router-link>
        </div>
      </div>
      <div class="page">
        <div>
          <router-view>

          </router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.right-page {
  float: right;
  width: 85%;
}

.head {
  line-height: 80px;
  height: 80px;
  //width: 1260px;
  background: #1E98D7;
}

.title {
  margin-left: 15px;
  width: auto;
}

.page {
  clear: both;
}

.left-page {
  float: left;
  width: 15%;
}

.menu {
  width: 95%;
  height: 1000px;
  background: #cce0ee;
  //clear: both;
}
</style>

<script lang="ts">
// https://www.jianshu.com/p/d3ffec2a3a0b
import { defineComponent, reactive, toRefs, ref } from "vue";
import {
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined
} from "@ant-design/icons-vue";
import type { MenuMode, MenuTheme } from "ant-design-vue";
import router from "@/router";

export default defineComponent({
  components: {
    MailOutlined,
    CalendarOutlined,
    AppstoreOutlined,
    SettingOutlined
  },
  setup() {

    const value = ref<string>("");

    const onSearch = (searchValue: string) => {
      console.log("use value", searchValue);
      console.log("or use this.value", value.value);
    };


    const state = reactive({
      mode: "inline" as MenuMode,
      theme: "light" as MenuTheme,
      selectedKeys: ["1"],
      openKeys: ["sub1"]
    });
    const changeMode = (checked: boolean) => {
      state.mode = checked ? "vertical" : "inline";
    };
    const changeTheme = (checked: boolean) => {
      state.theme = checked ? "dark" : "light";
    };
    return {
      value,
      onSearch,
      ...toRefs(state),
      changeMode,
      changeTheme
    };
  },
  methods: {
    Gohome(){
      router.push('/home');
    },
    Readarticle() {
      router.push('/article')
      console.log("Hello");
    },
  }
});
</script>
