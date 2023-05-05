<template>
  <van-nav-bar
      :title="title"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>

  <div id="content">
    <router-view/>
  </div>

  <van-tabbar route>
  <van-tabbar-item to="/home/index" icon="home-o" name="index">用户</van-tabbar-item>
  <van-tabbar-item to="/home/friends" icon="friends-o" name="index">好友</van-tabbar-item>
  <van-tabbar-item :to="{path:'/home/chat',query:{type: 1}}" icon="chat-o" name="index">聊天厅</van-tabbar-item>
  <van-tabbar-item to="/home/team" icon="search" name="team">队伍</van-tabbar-item>
  <van-tabbar-item to="/home/user" icon="manager-o" name="user">个人</van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import { ref } from 'vue';
import {useRouter} from "vue-router";
// import router from '../config/route.ts'
// router.beforeEach((to,from,next) => {
//   title.value = from.meta.title
//   next()
// })
let title = ref('首页')
const router = useRouter();
router.beforeEach((to,from,next)=>{
  title.value = to.meta.title;
  next()
})
const onClickLeft = () => {
  router.back()
}
const onClickRight = () => {
  router.push("/home/SearchPage");
};
const active = ref("index");
</script>

<style scoped>
#content{
  padding-bottom: 80px;
}
</style>