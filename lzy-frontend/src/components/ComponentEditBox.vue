<template>
    <van-cell-group>
        <van-cell title="昵称" icon="user-o" is-link :value="curUser.username" @click="onRouter('username', '昵称', curUser.username)"></van-cell>
        <van-cell title="账号" icon="user-circle-o" :value="curUser.userAccount"></van-cell>
        <van-cell title="性别" icon="like-o" is-link  @click="doEditGender('gender', '性别', curUser.gender)"></van-cell>
        <van-cell title="联系方式" icon="comment-o" is-link @click="onRouter('phone', '联系方式', curUser.phone)"></van-cell>
        <van-cell title="我的标签" icon="label-o" is-link value="点击查看" to="/home/SearchPage"></van-cell>
        <van-cell title="更多信息" icon="ellipsis" is-link value="更多信息" to="/home/user/more"></van-cell>
        <van-cell title="简介" icon="chat-o" is-link :value="profile" @click="onRouter('profile', '简介', curUser.profile)"></van-cell>
    </van-cell-group>
    <div class="btn">
        <van-button type="primary" size="large" @click="onLogout()">退出登录</van-button>
    </div>
</template>


<script setup>
import {ref, onMounted, computed, watch, nextTick,onBeforeMount} from 'vue'
import {Cell, CellGroup, Icon} from 'vant'
import {getCurrentUser} from '../services/userService'
import {useRouter} from 'vue-router'
import myAxios from '../plugin/myAxios'
import { showSuccessToast, showFailToast } from 'vant';
let curUser = ref({
  username: '',
  userAccount: '',
  gender: '',
  phone: '',
  profile: ''
})
const router = useRouter()

let profile = ref('')
onMounted(async () => {
    const tempData = await getCurrentUser()
    curUser.value = tempData.data    
})
watch(
    () => curUser.value,
    () => {
        profile.value = curUser.value.profile!==null ? curUser.value.profile : '暂无简介'
    }
)
const onRouter = (editKey, editLabel, currentValue) => {
    router.push({
        path: '/home/user/edit',
        query: {
            editKey,
            editLabel,
            currentValue
        }
    })
}
const onLogout = async() => {
    try{
        let res = await myAxios.post('/user/logout')
        if(res.code == 0){
            console.log(window.history)
            const historyLen = window.history.length - 1
            console.log(historyLen)
            router.go(-historyLen)
            showSuccessToast("退出成功")
        }else{
            showFailToast("退出失败")
        }
    }catch{
        showFailToast("退出失败")
    }
}
const doEditGender = (editKey,editLabel, currentValue) => {
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
.btn{
    width: 95%;
    margin: 0 auto;
    margin-top: 13px;
}
</style>