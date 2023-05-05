<template>
  <div class="search-box">
    <van-search v-model="searchText" placeholder="请输入搜索关键词" class="search-input"/>
    <button class="btn" @click="handleSearch">搜索</button>
  </div>
  <user-card-list  :user-list="userList"/>
</template>

<script setup>
import UserCardList from "../components/userCardList.vue";
import myAxios from "../plugin/myAxios.ts";
import {onMounted, ref} from "vue";
import { showFailToast } from "vant";

let searchText = ref('')
const userList = ref('');
onMounted(async ()=>{
  const res = await myAxios.get("/user/recommend",{
    params:{
      pageSize:20,
      pageNum:1
    }
  });
  console.log(res,'hahahahha');
  // res=JSON.parse(res)
  if(res.code===0&&res.data.records.length>0){
    res.data.records.forEach(user=>{
      if(user.tags){
        user.tags=JSON.parse(user.tags.replace(/'/g, "\""))
      }
      user.avatarUrl = user.avatarUrl == '' ? 'src/assets/images.jpg' : user.avatarUrl
      user.profile = user.profile == '' ? '这个用户很懒，还没有简介哦' : user.profile
      user.tags = user.tags == '' ? '该用户暂未设置标签' : user.tags
    })
    userList.value=res.data.records;
    // userList.value.forEach(item => {
    //   item.isOtherWatching = true
    // })
    // console.log(userList.value)
  }
});
const handleSearch = async() => {
  // console.log(searchText.value)
  try{
    console.log(searchText.value+"xxxxxxxx")
    const res = await myAxios.get('/user/search',{
      params:{
        username:searchText.value
      }
    })
  }catch{
    showFailToast("搜索失败")
  }
  searchText.value = ''
}
</script>

<style scoped>
.search-box{
  display: flex;
  flex-wrap: nowrap;
}
.search-box .search-input{
  width: 85%;
}
.search-box .btn{
  background-color: #fff;
  outline: none;
  border: none;
  color: rgb(83, 172, 255);
}
</style>