<template>
  <!-- using for minimap
    http://patorjk.com/software/taag/#p=display&f=Roman&t=code

                          .                                          oooo                .             
                        .o8                                          `888              .o8             
                      .o888oo  .ooooo.  ooo. .oo.  .oo.   oo.ooooo.   888   .oooo.   .o888oo  .ooooo.  
                        888   d88' `88b `888P"Y88bP"Y88b   888' `88b  888  `P  )88b    888   d88' `88b 
                        888   888ooo888  888   888   888   888   888  888   .oP"888    888   888ooo888 
                        888 . 888    .o  888   888   888   888   888  888  d8(  888    888 . 888    .o 
                        "888" `Y8bod8P' o888o o888o o888o  888bod8P' o888o `Y888""8o   "888" `Y8bod8P' 
                                                          888                                         
                                                          o888o                                        
  ============================================================================================================

  -->
  <div class="app-entry">
    <div class="login">
      <div class="field">
        <a-input
          class="user input"
          v-model:value="username"
          placeholder="请输入用户名"
        ></a-input>
      </div>

      <div class="field">
        <a-input
          class="password input"
          type="password"
          v-model:value="pwd"
          placeholder="请输入密码"
        ></a-input>
      </div>
      <div class="field control-panel">
        <a-button @click="login">登录</a-button>
        <a-button @click="listUser">列出用户</a-button>
      </div>
    </div>

    <div class="field">
      <div v-for="u in users" :key="u.id" class="record">
        <div class="label item">{{ u.id }}:</div>
        <div class="item">
          <a-input
            v-model:value="u.account"
            @change="() => (u.accountChange = true)"
          ></a-input>
        </div>
        <div class="item">
          <a-input
            v-model:value="u.password"
            @change="() => (u.passwordChange = true)"
          ></a-input>
        </div>
        <div class="item">
          <a-button @click="update(u, 'update')">确定</a-button>
        </div>
        <div class="item">
          <a-button @click="update(u, 'delete')">删除</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
/* using for minimap
  ===============================================================================    
                                  .               oooo            
                                .o8               `888            
                      .oooo.o .o888oo oooo    ooo  888   .ooooo.  
                      d88(  "8   888    `88.  .8'   888  d88' `88b 
                      `"Y88b.    888     `88..8'    888  888ooo888 
                      o.  )88b   888 .    `888'     888  888    .o 
                      8oo888P'   "888"     .8'     o888o `Y8bod8P' 
                                      .o..P'                      
                                      `Y8P'      
  ===============================================================================                                      
*/
.app-entry {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;

  overflow: scroll;

  .login {
    padding: 6em 0;
  }
  .field {
    padding: 0.5em 0;
    .input {
      width: 16em;
    }
    .record {
      display: flex;
      align-items: center;
      padding: 0.5em;

      .item {
        padding-left: 0.5em;
      }
    }
  }
}
</style>

<script lang="ts">
/* using for minimap
  ===============================================================================    
                                               .o8            
                                              "888            
                      .ooooo.   .ooooo.   .oooo888   .ooooo.  
                      d88' `"Y8 d88' `88b d88' `888  d88' `88b 
                      888       888   888 888   888  888ooo888 
                      888   .o8 888   888 888   888  888    .o 
                      `Y8bod8P' `Y8bod8P' `Y8bod88P" `Y8bod8P'        

  ===============================================================================
 */

// https://www.jianshu.com/p/d3ffec2a3a0b
import {
  defineComponent,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onActivated,
  onDeactivated,
  onErrorCaptured,
  onServerPrefetch,
  onScopeDispose,
  onRenderTracked,
  onRenderTriggered,
  reactive,
  watch,
  ref,
} from 'vue';
import { message } from 'ant-design-vue';

class User {
  id?: number;
  account?: string;
  mobilePhone?: string;
}

export default defineComponent({
  name: 'VueComponentSkeleton',

  components: {},

  computed: {
    // 计算属性
  },
  watch: {
    // 数据监听
  },
  setup() {
    console.log('setup');
    onRenderTracked((e) => {
      // onRenderTracked函数——状态追踪
      // 它会追踪页面上**所有**响应式变量和方法的状态，即我们在setup中return出去的值，
      // 一旦页面有更新，他都会进行追踪，然后生成一个event对象，我们通过event对象来查找程序的问题所在
      // - key 那边变量发生了变化
      // - newValue 更新后变量的值
      // - oldValue 更新前变量的值
      // - target 目前页面中的响应变量和函数
      console.log('onRenderTracked', e);
    });

    onRenderTriggered((e) => {
      // 它不像onRenderTracked函数，这个函数不会跟踪所有值的变化，而是给你变化值的信息，并
      // 且新值和旧值都会给你明确的展示出来
      // - key 那边变量发生了变化
      // - newValue 更新后变量的值
      // - oldValue 更新前变量的值
      // - target 目前页面中的响应变量和函数
      console.log('onRenderTriggered', e);
    });

    onBeforeMount(() => {
      // 在挂载开始之前被调用：相关的 render 函数首次被调用。
      console.log('onBeforeMount');
    });
    onMounted(() => {
      console.log('onMounted');
    });
    onBeforeUpdate(() => {
      // 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。 你可以
      // 在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。
      console.log('onBeforeUpdate');
    });
    onUpdated(() => {
      // 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
      // 当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。
      // 然而在大多数情况下，你应该避免在此期间更改状态，因为这可能会导致更新无限循环
      console.log('onUpdated');
    });
    onBeforeUnmount(() => {
      // 实例销毁之前调用。在这一步，实例仍然完全可用。
      console.log('onBeforeUnmount');
    });
    onUnmounted(() => {
      // Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事
      // 件监听器会被移除，所有的子实例也会被销毁。 该钩子在服务器端渲染期间不被调用。
      console.log('onUnmounted');
    });
    onActivated(() => {
      // 激活<keep-alive>组件时
      console.log('onActivated');
    });
    onDeactivated(() => {
      // 离开<keep-alive>组件时
      console.log('onDeactivated');
    });
    onErrorCaptured(() => {
      // 当捕获一个来自子孙组件的异常时激活钩子函数
      console.log('onErrorCaptured');
    });
    onServerPrefetch(() => {
      console.log('onServerPrefetch');
    });
    onScopeDispose(() => {
      console.log('onScopeDispose');
    });

    //ref返回一个对象，该对象可以被监测
    const counter = ref(0);//counter是Number的实例
    watch(counter, (newValue, oldValue) => {
      if (+newValue !== 6) {
        console.log(oldValue);
        return;
      }

      console.log('it is 6');
    });

    //打开页面时显示的数据
    return reactive({
      username: 'mickey',
      pwd: '1234',
      gender: 'male',
      counter,
      users: [],
    });
  },

  beforeCreate() {
    // 在实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用。
    console.log('beforeCreate');
  },

  created() {
    // 实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：数据观测(data observer)，
    //  属性和方法的运算， watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见。
    console.log('created');
  },

  //用户绑定的事件在methods中定义
  //methods中定义的方法this始终指向vue实列
  methods: {
    // 方法定义
    trial() {
      console.log('trial');
    },

    //列出用户响应函数
    listUser() {
      let url = '/api/user/mgr';
      //fetch第一个参数为请求信息，第二个为可选的Request初始化
      fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        redirect: 'follow',
      })
        //.then()为异步方法，保证前面执行完后再开始，可以避免数据没有获取到
        .then((v) => {
          return v.json();
        })
        .then((v) => {
          this.users = v.data;
          console.log(this.users);
        });
    },

    //登录响应函数
    login() {
      let url = '/api/user/login';
      fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        redirect: 'follow',
        //JSON.stringify()用于将一个对象转换成json字符串
        /**
        JSON.stringify(value, [, replacer], [, space])
        value: 必选字段，指输入的对象，比如数组这些。
        replacer，该参数是可选的，它可以有两种类型，第一种是数组，第二种是函数方法。
        space: 该参数的含义是指使用什么来做分隔符的。
        1）如果该参数省略的话，那么显示出来的值是没有分隔符的。
        2）如果是一个数字的话，那么它的含义是 缩进几个字符的意思，最大值为10.
        3）如果是一个转义字符的话，比如 '\t', 表示回车，那么它每行一个回车。
        4）如果是字符串的话，那么每行输出值的时候把这些字符串附加上去，最大长度也是10个字符。
         */
        body: JSON.stringify({
          user: this.username,
          cert: this.pwd,
        }),
      })
        .then((v) => {
          console.log(v);
          return v.json();
        })
        .then((v) => {
          if (!v) {
            //message.error()为显示红色×提示悬浮信息
            message.error('null response');
            return;
          }

          if (v.status !== 0) {
            message.error(v.msg);
            return;
          }
          //message.success()为显示绿色√提示悬浮信息
          message.success('登录成功');
        })
        .catch((err) => {
          console.log(err);
          message.error(err);
        });
    },

    //更新和删除的响应函数
    update(u: any, action: string) {
      let query = [];
      query.push(`id=${u.id}`); //将id存储起来
      if (u.accountChange && u.account) {   //如果账号发生了改变则将账号存储起来
        query.push(`account=${u.account}`);
      }
      if (u.passwordChange && u.password) {//如果密码发生改变则将密码存储起来
        query.push(`password=${u.password}`);
      }

      //账号和密码都没有发生改变则不做修改
      if (query.length === 1 && action === 'update') {
        return;
      }
      //向元组中加入分隔符&
      let q = query.join('&');
      let method = 'PUT';
      if (action === 'delete') {
        method = 'DELETE';
      }
      let url = `/api/user/mgr?${q}`;
      fetch(url, {
        method,
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        redirect: 'follow',
      })
        .then((v) => {
          console.log(v);
          return v.json();
        })
        .then((v) => {
          if (v.status !== 0) {
            this.$message.error(v.msg);
            return;
          }
          if (action === 'delete') {
            let idx = this.users.findIndex((e) => e.id === u.id);
            if (idx < 0) {
              this.$message.error('can not find id equal to ' + u.id);
              return;
            }
            this.users.splice(idx, 1);
            this.$message.success('删除成功');
            return;
          }
          this.$message.success('更新成功');
        });
    },
  },
});
</script>