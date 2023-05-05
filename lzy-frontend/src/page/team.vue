<template>
  <div id="teamPage">
    <form action="/">
      <van-search
          v-model="value"
          show-action
          placeholder="请输入队伍搜索关键词"
          @search="onSearch"
          @cancel="onCancel"
      />
    </form>
    <van-button type="primary" @click="doJoinTeam">+</van-button>
    <div>
      <van-tabs v-model:active="action" @click-tab="onClickTab">
        <van-tab >
          <template #title>
            <van-icon name="fire-o" color="red"></van-icon>
            公开
          </template>
          <team-card-list :team-list="teamList" />
        </van-tab>
        <van-tab >
          <template #title>
            <van-icon name="lock"></van-icon>
            加密
          </template>
          <team-card-list :team-list="teamList" />
        </van-tab>
        <van-tab >
          <template #title>
            <van-icon name="user-o"></van-icon>
            我的
          </template>
          <team-card-list :team-list="myCreatedList" />
          <team-card-list :team-list="teamList" />
        </van-tab>
      </van-tabs>
    </div>
    
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";
import TeamCardList from "../components/teamCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../plugin/myAxios.ts";
import 'vant/es/toast/style';
import {showFailToast, showSuccessToast} from "vant";
import {getCurrentUser} from '../services/userService'
let action = ref(0)
const router = useRouter()
let curUser = ref({})
const doJoinTeam = () =>{
  router.push({
    path:"/home/team/add"
  })
}
const teamList = ref([]);
const myCreatedList = ref([])
const onClickTab = async() => {
  // console.log(action.value)
  //发送Axios重写teamList
  if(action.value == 2){
    //获取我的队伍
    getMyList()
    getMyCreateList()
  }else if(action.value == 1){
    getList()
  }else if(action.value == 0){
    getList()
  }
}
const getMyList = async (val = '') => {
  const res = await myAxios.post('/team/list/my/join',{
    id: curUser.value.id,
    searchText:val
  })
  if(res.code == 0){
    teamList.value = res.data
  }else{
    showFailToast("加载队伍失败，请重试")
  }
}
const getMyCreateList = async (val='') => {
  const res = await myAxios.post('/team/list/my/create',{
    userId: curUser.value.id,
    searchText:val
  })
  if(res.code == 0){
    myCreatedList.value = res.data
    // myCreatedList.value.userVo = JSON.parse(myCreatedList.value.userVo)
    myCreatedList.value.forEach(item => {
      item.isMyCreated = true
      // item.userVo = JSON.parse(JSON.stringify(item.userVo))
      // item.userVo = JSON.stringify(item.userVo)
      // item.userVo = JSON.parse(item.userVo)
    })
  }else{
    showFailToast("加载创建队伍失败")
  }
}
const getList = async (val = '')=>{
  const res = await myAxios.post("/team/list", {
    searchText:val
  });
  if(res.code===0){
    teamList.value=res.data;
  }else{
    showFailToast("加载队伍失败，请重试")
  }
}

const value = ref('');
const onSearch = (val) => {
  getList(val)
}
const onCancel = () => {
  getList('')
};

//钩子函数
onMounted(async ()=>{
  getList('');
  const res = await getCurrentUser()
  curUser.value = res.data
})
</script>
<style scoped>
.van-button{
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 20px;
  position: fixed;
  z-index: 100;
  bottom: 50px;
  right: 5%;
}
</style>