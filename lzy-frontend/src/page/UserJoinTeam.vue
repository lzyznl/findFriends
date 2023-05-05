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
    <team-card-list :team-list="teamList" />
  </div>
</template>

<script setup>
import {useRouter} from "vue-router";
import TeamCardList from "../components/teamCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../plugin/myAxios.ts";
import 'vant/es/toast/style';
import {showFailToast, showSuccessToast} from "vant";

const router = useRouter()
const doJoinTeam = () =>{
  router.push({
    path:"/home/team/add"
  })
}
const teamList = ref([]);


const getList = async (val = '')=>{
  console.log(val+"xxxxxxxxx")
  const res = await myAxios.post("/team/list/my/join", {
    searchText:val
  });
  if(res.code===0){
    teamList.value=res.data;
    // teamList.value.forEach(item => {
    //   item.isOtherWtaching = true
    // })
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
})
</script>
<style scoped>

</style>