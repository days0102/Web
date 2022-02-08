<template>
  <div style="width: 1260px">
    <a-list bordered="true" item-layout="vertical" size="default" :pagination="pagination" :data-source="listData"
            style="margin-left: 10px">
      <template #footer>
        <div>

        </div>
      </template>
      <template #renderItem="{ item }">
        <a-list-item key="item.title">
          <template #actions>
          <span v-for="{ type, text } in actions" :key="type">
            <component :is="type" style="margin-right: 8px;"/>
            {{ text }}
          </span>
          </template>
          <template #extra>
            <img
              width="250"
              alt="logo"
              src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
            />
          </template>
          <a-list-item-meta :description="item.description">
            <template #title>
              <a :href="item.href">{{ item.title }}</a>
            </template>
            <template #avatar>
              <a-avatar :src="item.avatar" />
            </template>
          </a-list-item-meta>
          {{ item.content }}
        </a-list-item>
      </template>
    </a-list>
  </div>

  <div>
    <a-list
      v-if="comments.length"
      :data-source="comments"
      :header="`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`"
      item-layout="horizontal"
    >
      <template #renderItem="{ item }">
        <a-list-item>
          <a-comment
            :author="item.author"
            :avatar="item.avatar"
            :content="item.content"
            :datetime="item.datetime"
          />
        </a-list-item>
      </template>
    </a-list>
  </div>
  <a-comment>
    <template #avatar>
      <a-avatar
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        alt="Han Solo"
      />
    </template>
    <template #content>
      <a-form-item>
        <a-textarea v-model:value="value" :rows="4" />
      </a-form-item>
      <a-form-item>
        <a-button html-type="submit" :loading="submitting" type="primary" @click="handleSubmit">
          Add Comment
        </a-button>
      </a-form-item>
    </template>
  </a-comment>
</template>

<script lang="ts">
// export default {
//   name: "ArticleView.vue"
// };
import { StarOutlined, LikeOutlined, MessageOutlined } from "@ant-design/icons-vue";
import { defineComponent, ref } from "vue";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import assert from "assert";

dayjs.extend(relativeTime);

type Comment = Record<string, string>;

const listData: Record<string, string>[] = [];

for (let i = 0; i < 23; i++) {
  listData.push({
    href: "https://www.antdv.com/",
    title: `ant design vue part ${i}`,
    avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    description:
      "Ant Design, a design language for background applications, is refined by Ant UED Team.",
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently."
  });
}

export default defineComponent({
  components: {
    StarOutlined,
    LikeOutlined,
    MessageOutlined
  },
  setup() {
    //列表
    const pagination = {
      onChange: (page: number) => {
        console.log(page);
      },
      pageSize: 3
    };
    const actions: Record<string, string>[] = [
      { type: "StarOutlined", text: "666" },
      { type: "LikeOutlined", text: "156" },
      { type: "MessageOutlined", text: "2" }
    ];

    //评论
    const comments = ref<Comment[]>([]);
    const submitting = ref<boolean>(false);
    const value = ref<string>("");
    const handleSubmit = () => {
      if (!value.value) {
        return;
      }

      submitting.value = true;

      setTimeout(() => {
        submitting.value = false;
        comments.value = [
          {
            author: "Han Solo",
            avatar: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
            content: value.value,
            datetime: dayjs().fromNow()
          },
          ...comments.value
        ];
        value.value = "";
      }, 1000);
    };

    return {
      //列表
      listData,
      pagination,
      actions,

      //评论
      comments,
      submitting,
      value,
      handleSubmit
    };
  },
  methods:{
    func(){
      console.assert("Hello");
    }
  }
});
</script>

<style scoped>

</style>