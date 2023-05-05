<template>
  <user-card-list :user-list="userList" />

  <van-empty  v-if="userList.length<1" image="search" description="" />

</template>

<script setup>
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugin/myAxios.ts";
import qs from 'qs'
import {showFailToast, showSuccessToast, Toast} from "vant";
import 'vant/es/toast/style';
import UserCardList from "../components/userCardList.vue";
const route = useRoute();
const userList = ref([]);
const content = ref('');

onMounted(async() => {
  const userListData = await myAxios.get('/user/search/tags', {
    params: {
      tagNameList:route.query.tags,
      pageNum:1,
      pageSize:8
    },
    paramsSerializer: params => {
      return qs.stringify(params, { indices: false })
    }
  })
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  console.log(userListData)
  if(userListData.length>0)
  {
    userListData.forEach(user=>{
      if(user.tags){
        user.tags=JSON.parse(user.tags)
      }
    })
    showSuccessToast('搜索成功');
    userList.value=userListData
  }else{
    showFailToast('搜索暂无结果');
  }
})
</script>

<style scoped>

</style>