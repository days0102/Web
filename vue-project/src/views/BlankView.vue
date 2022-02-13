<template>
  <div style="width: 256px">
<!--    <a-button type="primary" style="margin-bottom: 16px" @click="toggleCollapsed">-->
<!--      <MenuUnfoldOutlined v-if="collapsed" />-->
<!--      <MenuFoldOutlined v-else />-->
<!--    </a-button>-->
    <a-menu
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      mode="inline"
      theme="dark"
      :inline-collapsed="collapsed"
    >
      <a-sub-menu
        key="sub1"
        style="background-color: #f7f8fa">

        <template #icon>
          <home-outlined />
        </template>
        <template #title>站点首页</template>
        <a-menu-item key="1" @click="">学会概况</a-menu-item>
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
        <a-menu-item key="5" @click="">浏览文章</a-menu-item>
        <a-menu-item key="6" @click="">发布文章</a-menu-item>
        <a-menu-item key="7" @click="test">发布视频</a-menu-item>
        <a-menu-item key="8">内容管理</a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from 'vue';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  MailOutlined,
  DesktopOutlined,
  InboxOutlined,
  AppstoreOutlined,
} from '@ant-design/icons-vue';
export default defineComponent({
  components: {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    MailOutlined,
    DesktopOutlined,
    InboxOutlined,
    AppstoreOutlined,
  },
  setup() {
    const state = reactive({
      collapsed: false,
      selectedKeys: ['1'],
      openKeys: ['sub1'],
      preOpenKeys: ['sub1'],
    });

    // watch(
    //   () => state.openKeys,
    //   (_val, oldVal) => {
    //     state.preOpenKeys = oldVal;
    //   },
    // );
    const toggleCollapsed = () => {
      state.collapsed = !state.collapsed;
      state.openKeys = state.collapsed ? [] : state.preOpenKeys;
    };

    return {
      ...toRefs(state),
      toggleCollapsed,
    };
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        this.screenWidth= document.body.clientWidth
      })()
    }
  },
  data(){
    return {
      screenWidth:document.body.clientWidth,
    }
  },
  watch: {
    screenWidth() {
      console.log(this.screenWidth)
      if (this.screenWidth < 1025) {
        console.log("<1025")
        if(!this.collapsed) {
          this.toggleCollapsed();
        }
      } else {
        if (this.collapsed) {
          this.toggleCollapsed()
        }
      }
    }
  },
  methods:{
    test(){
      this.toggleCollapsed()
    }
  }
});
</script>

