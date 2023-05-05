<template>
    <div class="info-box">
        <van-cell-group>
            <van-cell title="昵称" icon="user-o" is-link :value="curUser.username" @click="handleEdit('username','昵称',curUser.username)"></van-cell>
            <van-cell title="账号" icon="user-circle-o" :value="curUser.userAccount"></van-cell>
            <van-cell title="联系方式" icon="comment-o" is-link @click="handleEdit('phone','联系方式',curUser.phone)"></van-cell>
            <van-cell title="我的标签" icon="label-o" is-link value="点击查看" to="/home/SearchPage"></van-cell>
            <van-cell title="性别" icon="like-o" is-link :value="curUser.gender" @click="doEditGender('gender','性别',curUser.gender)"></van-cell>
            <van-cell title="修改密码" icon="eye-o" is-link value="点击修改" @click="handleEdit('userPassword','密码',curUser.userPassword)"></van-cell>
            <van-cell title="角色" icon="cluster-o" value="普通用户" ></van-cell>
            <van-cell title="邮箱" icon="envelop-o" is-link @click="handleEdit('email','邮箱',curUser.email)"></van-cell>
            <van-cell title="简介" icon="chat-o" is-link :value="curUser.profile" @click="handleEdit('profile','简介',curUser.profile)"></van-cell>
        </van-cell-group>
    </div>
    <div class="btn">
        <van-button type="primary" size="large" @click="onBack()">返回</van-button>
    </div>
</template>


<script setup>
import {Cell, CellGroup, Icon} from 'vant'
import {getCurrentUser} from '../services/userService.ts'
import {ref, onMounted} from 'vue'
import {useRouter} from 'vue-router'
let curUser = ref({})
const router = useRouter()
onMounted(async () => {
    try{
        let res = await getCurrentUser();
        curUser.value = res.data
        //重写
        curUser.value.gender = curUser.value.gender == 1 ? '男' : '女'
        curUser.value.profile = curUser.value.profile == null ? '暂无简介' : curUser.value.profile
    }catch{
        console.error("请求失败")
    }
})
const handleEdit = (editKey, editLabel, currentValue) => {
    router.push({
        path: '/home/user/edit',
        query: {
            editKey,
            editLabel,
            currentValue
        }
    })
}
const onBack = () => {
    router.back()
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