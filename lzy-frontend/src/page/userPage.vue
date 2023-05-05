<template>
  <template v-if="user">
  <van-cell title="编号"  :value="user.id" />
  <van-cell title="头像" is-link>
    <img style="height: 80px" :src="user.avatarUrl">
  </van-cell>
  <van-cell title="账号"  :value="user.userAccount"  />
  <van-cell title="昵称" is-link :value="user.username" @click="doEdit('userAccount','昵称',user.username)" />
  <van-cell title="性别" is-link :value="user.gender" @click="doEditGender('gender','性别',user.gender)"/>
  <van-cell title="电话" is-link :value="user.phone" @click="doEdit('phone','电话',user.phone)"/>
  <van-cell title="邮箱" is-link :value="user.email" @click="doEdit('email','邮箱',user.email)"/>
  <van-cell title="个人介绍" is-link :value="user.profile" @click="doEdit('profile','个人介绍',user.profile)"/>
  <van-cell title="星球编号"  :value="user.planetCode" />
  <van-cell title="创建时间"  :value="user.createTime" />
  </template>
<!--  <van-empty image="error" description="" v-if="!user"/>-->
</template>

<script setup lang="ts">

import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugin/myAxios";
import {showFailToast, showSuccessToast} from "vant";
import 'vant/es/toast/style';
import {getCurrentUser} from "../services/userService";

const router = useRouter();
const user=ref('');
//用一个钩子函数加载页面
onMounted (async ()=>{
  const res = await getCurrentUser();
  if(res){
    user.value=res.data;
  }else{
    showFailToast('加载用户信息失败');
  }
})
const doEdit=(editKey: string,editLabel:string,currentValue : string)=>
{
  router.push({
    path: '/home/user/edit',
    query:{
      editKey,
      editLabel,
      currentValue
    }
  })
}
const doEditGender = (editKey: string,editLabel:string,currentValue : string) => {
  router.push({
    path: '/home/user/editGender',
    query:{
      editKey,
      editLabel,
      currentValue
    }
  })
}

</script>

<style scoped>

</style>