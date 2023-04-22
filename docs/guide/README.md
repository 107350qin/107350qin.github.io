# vue3学习

## 模板语法

```js
{{ name }}        // 内容绑定
{{ age + 10 }}
{{ flag ? "a" : "b" }}

v-html=""         // 展示html内容

v-bind:id=""      // 属性绑定
:id=""
```

## 条件渲染

```javascript
v-if=""   // 适合条件切换比较少
v-else

v-show="" // 适合条件切换比较多
```

## 列表渲染

```html
// 加上key渲染时间提升
<li v-for="user in userlist" :key="user.name"></li>

<li v-for="(user,index) in userlist" :key="index"></li>
```

## 监听事件

```html
<button v-on:click="age=age+1">点击</button>
<button @click="age=age+1">点击</button>

<p>{{ info }}</p>
<button @click="clearMsg">点击</button>
methods: {
    clearMsg(event) {
        this.info = ""
        event.target.innerHTML="大大的按钮"
    }
}

<li @click="showName(user)" v-for="(user,index) in users" :key="index">{{ user }}</li>
methods: {
    showName(name,event) {
    	console.log(name)
    }
}
```

## 表单输入绑定

```javascript
// 输入的同时立刻同步到输出,开销比较大
<input type="text" v-model="name">
<p>{{ name }}</p>

//lazy: 当鼠标失去焦点或者敲击回车是才同步到输出,开销小
<input type="text" v-model.lazy="name">
<p>{{ name }}</p>

//干掉首尾空格
<input type="text" v-model.lazy.trim="name">
```

## 组件基础

### 定义组件

```html
//定义组件
<template>
    <h1>你好呀vue</h1>
</template>

<script setup>
</script>
<style>
h1 {
    color: 'red'
}
</style>
```

### 使用组件

```html
//使用
<script setup>
import Hi from "./components/Haha.vue"
</script>

<template>
  <Hi/>
</template>
```

### 注意

**scoped**

```html
// 如果希望样式仅仅在当前组件中使用,那么请加上scoped
<style scoped>
</style>
```

**setup**

```html
//如果script没写setup，那么import之后要使用export里面的components进行挂载才能使用

<script>
import Hi from "./components/Haha.vue"

export default{
  components:{
    Hi
  }
}
</script>



//如果使用了setup则只需要import之后可以直接使用,目前使用前者吧

<script setup>
import Hi from "./components/Haha.vue"
</script>
```

## 组件交互

### props正向数据传递

#### 父组件定义传递数据

```html
<script>
import Hi from "./components/Haha.vue"

export default {
  data() {
    return {
      title: '我要学习vue',
      names:['刘亦菲','张靓颖','唐嫣'],
      home:{
        country:'中国',
        province:'云南省',
        city:'宣威市'
      }
    }
  },
  components: {
    Hi
  }
}
</script>

<template>
  <Hi :hahaTitle="title" :hahaNames="names" :hahaHome="home"/>
</template>

```

#### 子组件接受使用数据

```html
<template>
    <h1>{{ hahaTitle }}</h1>
    <ul>
        <li v-for="(name, index) in hahaNames" :key="index">
            {{ name }}</li>
    </ul>
    <div>
        <h2>{{ hahaHome.country }},{{ hahaHome.province }},{{ hahaHome.city }}</h2>
    </div>
</template>

<script>
export default {
    props: {
        hahaTitle: {
            type: String,
            default: ""
        },
        hahaNames: {
            type: Array,
            default: []
        },
        hahaHome: {
            type: Object,
            default: {}
        }
    }
}
</script>
```

### $emit反向数据传递【自定义事件实现组件交互】

#### 子组件定义、触发事件

```html
<template>
    <button @click="transferTitle">点击子组件触发事件</button>
</template>

<script>
export default {
    data(){
        return{
            title:'秦时明月之君临天下'
        }
    },
    methods:{
        transferTitle(){
            this.$emit('onHahaClick', this.title);
        }
    }

}
</script>
```

#### 父组件监听、响应事件

```html
		<script>
import Hi from "./components/Haha.vue"

export default {
  data() {
    return {
      titleFromChirld: ''
    }
  },
  components: {
    Hi
  },
  methods: {
    setChirldTitle(value) {
      this.titleFromChirld = value
    }
  }
}
</script>

<template>
  <Hi @onHahaClick="setChirldTitle" />

  <h1>{{ titleFromChirld }}</h1>
</template>
```

## 组件生命周期

1. 生命周期函数
   1. 创建时：beforeCreate、created
   2. 渲染时：beforeMount、mounted
   3. 更新时：beforeUpdate、updated
   4. 卸载时：beforeUnmount、unmounted

## vue引入第三方

可能有些不支持vue3

- https://awesomejs.dev/for/vue/
- https://github.com/vuejs/awesome-vue

[轮播图](https://swiperjs.com/vue)

## Axios网络请求

```shell
npm install --save axios
```

### 后台数据

```java
import lombok.Data;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @GetMapping("/getList")
    public List<String> getUserList() {
        List<String> list = new ArrayList<>();
        list.add("刘亦菲");
        list.add("林心如");
        list.add("唐嫣");
        list.add("黄圣依");
        return list;
    }
    @PostMapping("/update")
    public String update(@RequestBody User user) {
        return user.getName()+" updated";
    }
}
@Data
class User{
    private String id;
    private String name;
}
```

### get请求

```javascript
// get请求
<script>
import axios from 'axios'
export default{
    mounted(){
        axios({
            method:"get",
            url:"/api/user/getList"
        }).then(res=>{
            console.log(res.data);
        })
        
        //或者使用简便的方式
        axios.get("/api/user/getList").then(res => {
            console.log(res.data);
        })
    }
}
</script>
```

> http://localhost:5173/api/user/getList
> // 通过代理变为
> http://localhost:8080/user/getList

### post请求

```javascript
// post请求
<script>
import axios from 'axios'
export default{
    mounted(){
        axios({
            method:"post",
            url:"/api/user/update",
            data:{
                id:1,
                name:'刘亦菲'
            }
        }).then(res=>{
            console.log(res.data);
        })
        
        //或者使用简便的方式
        axios.post("/api/user/update", {
            id: 1,
            name: '刘亦菲'
        }).then(res => {
            console.log(res.data);
        })
    }
}
</script>
```

### 跨域报错怎么解决？

```js
// 添加代理,前端端口是5173，后台端口是8080，以下proxy表示有对应关系：
//   http://localhost:5173/api/user/getList
//=> http://localhost:8080/user/getList
//当前端路由匹配到api时，将api去掉，同时将端口换成对应的端口8080
//实际使用axios访问时使用url:"/api/user/getList"即可
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
```

### 将axios绑定到全局

**main.js**

```js
import axios from 'axios'

const app=createApp(App)
app.config.globalProperties.$axios = axios
app.mount('#app')
```

**xxx.vue**

```javascript
export default {
    mounted() {
        this.$axios.post("/api/user/update", {
            id: 1,
            name: '刘亦菲'
        }).then(res => {
            console.log(res.data);
        })
    }
}
```

## 网络请求封装

### util/request.js

```javascript
import axios from "axios"

const errorHandle = (status, info) => {
    switch (status) {
        case 400:
            console.log("语义有误");
            break;
        case 401:
            console.log("服务器认证失败");
            break;
        case 403:
            console.log("服务器拒绝访问");
            break;
        case 404:
            console.log("地址错误");
            break;
        case 500:
            console.log("服务器遇到意外");
            break;
        case 502:
            console.log("服务器无响应");
            break;
        default:
            console.log(info);
            break;
    }
}

//参考地址：https://www.kancloud.cn/yunye/axios/234845
const instance = axios.create({
    //网络请求的公共配置
    timeout: 5000
})

//发送数据之前
instance.interceptors.request.use(
    config => {
        //包含网络请求的所有信息
        return config
    },
    error => {
        Promise.reject(error)
    }
)

//获取数据之前
instance.interceptors.response.use(
    response => {
        return response.status === 200 ? Promise.resolve(response) : Promise.reject(response)
    },
    error => {
        const { response } = error
        errorHandle(response.status, response.info)
    }
)

export default instance
```

### api/path.js

```javascript
const base = {
    baseUrl: "http://localhost:5173/api",

    getUserList: "/user/getList",
    updateUser: "/user/update",
}

export default base
```

### api/index.js

```javascript
import axios from "../util/request";
import path from "./path"

const api = {
    getUserList() {
        return axios.get(path.baseUrl + path.getUserList)
    },
    updateUser(data) {
        return axios.post(path.baseUrl + path.updateUser, data)
    }
}

export default api 
```

### 请求示例

```html
<script>
import api from "../api"

export default {
    mounted() {
        api.updateUser({ id: "1", name: "黄圣依1" }).then(res => {
            console.log(res.data);
        })
    }
}
</script>
```

## vue-router路由配置

```javascript
npm instal --save vue-router
```

### views/HomeView.vue

```html
<template>
    <h3>主页页面</h3>
</template>
```

### views/AboutView.vue

```html
<template>
    <h3>关于页面</h3>
</template>
```

### router/index.js

```javascript
import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/HomeView.vue"

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/about',
        name: 'about',
        component: ()=>import("../views/AboutView.vue")
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router
```

### main.js

```javascript
import router from './router'
const app=createApp(App)
app.use(router)
```

### App.vue

router-view显示主页面

```html
<script>
</script>

<template>
  <router-link to="/">主页</router-link>
  <router-link to="/about">关于</router-link>
  <router-view/>
</template>
```

## 路由传递参数

### 路由配置中指定参数key

```javascript
    {
        path: '/news/detail/:name',
        name: 'newsDetail',
        component: ()=>import("../views/NewsDetailView.vue")
    },
```

### 跳转时携带参数

```html
<template>
    <ul>
        <li><router-link to="/news/detail/wangyi">网易新闻</router-link></li>
        <li><router-link to="/news/detail/baidu">百度新闻</router-link></li>
        <li><router-link to="/news/detail/toutiao">头条新闻</router-link></li>
    </ul>
</template>
```

### 目的页读取携带的参数

```html
<template>
    <h3>新闻内容</h3>
    <h3>{{ $route.params.name }}</h3>
</template>
```

## 嵌套路由配置

### views/subAbout/Us.vue

```html
<template>
    <h3>关于我们[内容]</h3>
</template>
```

### views/subAbout/Info.vue

```
<template>
    <h3>关于网站[内容]</h3>
</template>
```

### router/index.js

```javascript
{
        path: '/about',
        name: 'about',
        component: () => import("../views/AboutView.vue"),  //重定向到默认路由
        redirect: '/about/us',
        children: [
            {
                path: 'us', //二级导航不加斜杠
                component: () => import("../views/subAbout/Us.vue"),
            },
            {
                path: 'info',
                component: () => import("../views/subAbout/Info.vue"),
            }
        ]
},
```

### views/AboutView.vue

```html
<template>
    <div>
        <router-link to="/about/us">关于我们</router-link> |
        <router-link to="/about/info">关于网站</router-link>
        
        <!-- 指定子路由显示的位置 -->
        <router-view/>
    </div>
</template>
```

## vue状态管理vuex

```shell
npm install --save vuex
```

### store/index.js

```javascript
import { createStore } from "vuex";

export default createStore({
    state: {
        counter: 0
    }
})
```

### main.js

```javascript
import store from './store'
app.use(store)
```

### 使用数据

方式一

```html
{{ $store.state.counter }}
```

方式二

```html
<script>
// vuex提供的state快捷读取方式
import { mapState } from "vuex"
export default {
  //专门读取vuex的数据
  computed: {
    ...mapState(["counter"])
  }
}
</script>

<template>
  {{ counter  }}
</template>
```

## 状态管理核心

### getters

**store/index.js**

```javascript
import { createStore } from "vuex";

export default createStore({
    state: {
        counter: 100
    },
    getters: {
        getCounter(state) {
            return state.counter > 100 ? state.counter : '没有超过100'
        }
    }
})
```

使用方式一

```html
 {{ $store.getters.getCounter  }}
```

使用方式二

```html
<script>
import { mapGetters } from "vuex"
export default {
  computed: {
    ...mapGetters(['getCounter'])
  }
}
</script>
```

### mutations

数据修改

**store/index.js**

```javascript
import { createStore } from "vuex";

export default createStore({
    state: {
        counter: 101
    },
    mutations: {
        addCounter(state, num) {
            state.counter = state.counter + num;
        }
    }
})
```

使用方式一

```html
<script>
export default{
  methods:{
    addSome(){
      this.$store.commit("addCounter",10)
    }
  }
}
</script>

<template>
  {{ $store.state.counter  }}
  <button @click="addSome">点击增加</button>
</template>

```

使用方式二

```html
<script>
import { mapMutations } from "vuex"

export default {
  methods: {
    ...mapMutations(["addCounter"]),  //这里不能放到computed里面,否则会报错找不到
    addSome() {
      this.addCounter(10)
    }
  },
}
</script>

<template>
  {{ $store.state.counter }}
  <button @click="addSome()">点击增加</button>
</template>

```

### action

类似于mutation，但action可以异步

**store/index.js**

```javascript
import { createStore } from "vuex";
import axios from "axios";

export default createStore({
    state: {
        counter: 101
    },
    mutations: {
        addCounter(state, num) {
            state.counter += num;
        }
    },
    actions:{
        asyncAdd({commit}){
            axios.get("http://localhost:5173/api/user/getAddNum").then(res=>{
                commit("addCounter",res.data)
            })
        }
    }
})
```

使用方式一

```html
<script>
export default {
  methods: {
    addAsyncSome() {
      this.$store.dispatch("asyncAdd")
    }
  },
}
</script>

<template>
  {{ $store.state.counter }}
  <button @click="addAsyncSome()">点击增加</button>
</template>

```

使用方式二

```html
<script>

import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions(['asyncAdd']),
    addAsyncSome() {
      this.asyncAdd()
    }
  },
}
</script>

<template>
  {{ $store.state.counter }}
  <button @click="addAsyncSome()">点击增加</button>
</template>

```

## vue3的新特性

## element

