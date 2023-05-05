<template>
  <van-card
      v-for="user in userList"
      :desc="'简介：'+user.profile"
      :title="user.username"
      :thumb="user.avatarUrl"
      @click="handleUserInfo(user.id)"
  >
    <template #price>
      <p class="tag-p">标签：</p>
      <van-tag plain type="danger" v-for="tag in user.tags" style="margin-right: 8px;margin-top: 5px; font-weight: 400;">
        {{tag}}
      </van-tag>
    </template>
    <!-- <template #footer>
      <van-button size="mini">联系我</van-button>
    </template> -->
  </van-card>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import {userType} from "../model/user";
import {useRouter} from 'vue-router'

const router = useRouter()
interface userCardListProps{
  userList:userType[];
}
const handleUserInfo = (id) => {
  // console.log('点我了')
  const index = props.userList.findIndex(item => {
    return item.id === id
  })
  router.push({
    path: '/home/index/user',
    query: props.userList[index]
  })
}
onMounted(() => {
  console.log(props.userList)
})
const props = defineProps<userCardListProps>()
</script>

<style scoped>
.tag-p{
  margin: 0;
}
.van-card /deep/ .van-card__title{
  font-size: 16px;
}
.van-card /deep/ .van-image{
  border-radius: 10px;
  box-shadow: 3px 0px 4px 2px rgb(182, 182, 182);
}
</style>