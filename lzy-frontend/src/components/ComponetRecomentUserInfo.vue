<template>
    <div class="img-box">
        <div class="ava-box">
            <input type="file" >
            <img :src="userInfo.avatarUrl" alt="Ava">
        </div>
  </div>
  <div>
    <van-cell title="昵称" :value="userInfo.username" icon="user-o"></van-cell>
    <van-cell title="账号" :value="userInfo.userAccount" icon="user-circle-o"></van-cell>
    <van-cell title="性别" :value="userInfo.gender" icon="like-o"></van-cell>
    <van-cell title="联系方式" :value="userInfo.phone" icon="comment-o"></van-cell>
    <van-cell title="邮箱" :value="userInfo.email" icon="envelop-o"></van-cell>
    <van-cell title="已加入队伍" icon="cluster-o" is-link @click="watchUserTeams"></van-cell>
    <van-cell title="简介" :value="userInfo.profile" icon="chat-o"></van-cell>
  </div>
  <div class="btn">
    <van-button type="primary" size="large" @click="addFriend()" v-if="!isFriend">添加好友</van-button>
    <van-button type="danger" size="large" @click="delFriend()" v-if="isFriend" style="margin-top: 10px;">删除好友</van-button>
  </div>
  <van-dialog v-model:show="isShow" :title="title" show-cancel-button @confirm="onConfirm()" @cancel="onCancel()">
    <van-cell-group>
        <van-field v-model="remark" placeholder="备注" id="input"></van-field>
    </van-cell-group>
  </van-dialog>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import {Cell, CellGroup, Icon, showDialog, Field, showFailToast, showSuccessToast, showToast, showConfirmDialog  } from 'vant'
import myAxios from '../plugin/myAxios'
const router = useRouter()
const route = useRoute()
let userInfo = ref({})
let isShow = ref(false)
let remark = ref('')
let title = ref('')
let isFriend = ref(false)
onMounted(() => {
    //拿到当前点击用户的信息
    userInfo.value = route.query
    userInfo.value.gender = userInfo.value.gender == 1 ? '男' : '女';
    title.value = `添加好友：${userInfo.value.username}`
    if(route.query.isFriend){
        isFriend.value = route.query.isFriend
    }
})
const addFriend = () => {
    isShow.value = true
}
const onConfirm = async() => {
    // console.log('con')
    //axios
    // console.log(userInfo.value.id)
    try{
        let res = await myAxios.post('/friends/apply',{
            id: userInfo.value.id,
            remark: remark.value
        })
        if(res.code == 0 && res.data){
            showSuccessToast('申请成功');
            remark.value = ''
        }else{
            showFailToast('申请失败')
        }
    }catch{
        showFailToast('申请失败')
    }
}
const onCancel = () => {
    remark.value = ''
}

const delFriend = async() => {
    showConfirmDialog({
        title:"删除好友",
        message:"确认删除好友？"
    }).then(async() => {
        console.log(userInfo.value.id)
        try{
            const res = await myAxios.post('/friends/deleteFriend',{
                friendId:userInfo.value.id
            })
            console.log(res)
            if(res.code == 0 && res.data){
                showSuccessToast("删除成功")
            }else{
                showFailToast("删除失败!")
            }
        }catch{
            showFailToast("删除失败")
        }
    }).catch(() => {

    })
}
const watchUserTeams = () => {
    // console.log(11)
    userInfo.value.isOtherWatching = true
    router.push({
        path: '/home/user/list/teams',
        query: userInfo.value 
    })
}
</script>

<style scoped>
img{
        width: 135px;
        height: 135px;
        position: absolute;
        z-index: -1;
        border-radius: 20px;
        box-shadow: 0 0 20px 5px rgb(212, 212, 212);
    }
    .img-box{
        margin-top: 20px;
        margin-bottom: 20px;
        min-height: 170px;
        width: 100%;
        /* background-color: black; */
    }
    .img-box .ava-box{
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .ava-box input[type="file"]{
        width: 135px;
        height: 135px;
        /* background-color: black; */
        color: transparent;
        background-color: transparent;
        outline: none;
        border: none;
        opacity: 0;
        z-index: -100;
    }
    .btn{
        margin: 0 auto;
        margin-top: 12px;
        width: 95%;
    }
    .van-field /deep/ input{
        width: 60%;
        margin: 0 auto;
    }
</style>