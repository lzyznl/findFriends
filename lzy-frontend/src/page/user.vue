<template>
  <div class="ava">
    <ComponentAva :userInfo="user"></ComponentAva>
  </div>
  <div class="bodyer">
    <ComponentEditBox></ComponentEditBox>
  </div>
</template>

<script setup>
import ComponentAva from '../components/ComponentAva.vue'
import ComponentEditBox from '../components/ComponentEditBox.vue'
import {onMounted, ref } from "vue";
import {getCurrentUser} from "../services/userService.ts";
import { showToast } from "vant";

const user = ref('');
//使用钩子函数

onMounted(async ()=>{
  const res = await getCurrentUser();
  if (res?.code===0){
    user.value=res.data;
    // console.log('user',user.value)
  }
})

</script>

<style scoped>

</style>