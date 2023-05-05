<template>
    <div class="list-box">
        <div class="ava-box" @click="handleUserInfo()">
            <img :src="userInfo.avatarUrl" alt="userAva">
            <p>{{ userInfo.username }}</p>
        </div>
        <div class="icon" @click="handleChat()">
            <van-icon name="chat-o"></van-icon>
        </div>
    </div>
</template>



<script setup>
import {ref, defineProps, onMounted} from 'vue'
import {useRouter} from 'vue-router'
const router = useRouter()
const props = defineProps(['friendInfo'])
let userInfo = ref({})
onMounted(() => {
    userInfo.value = props.friendInfo
    userInfo.value.isFriend = true
    // console.log(userInfo.value)
    userInfo.value.avatarUrl = userInfo.value.avatarUrl === '' ? './src/assets/images.jpg' : userInfo.value.avatarUrl;
})
const handleUserInfo = () => {
    router.push({
        path: '/home/index/user',
        query: userInfo.value
    })
}
const handleChat = () => {
    // console.log(userInfo.value.id)
    router.push({
        path: '/home/friend/chat',
        query:{
            type: 0,
            scdId: userInfo.value.id
        }
    })
}
</script>


<style scoped>
.list-box{
    box-sizing: border-box;
    width: 100%;
    height: 56px;
    border-bottom: 1px solid rgb(218, 218, 218);
    padding: 7px 20px;
    display: flex;
    justify-content: space-between;
}
.ava-box{
    height: 100%;
    display: flex;
}
.icon{
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
}
.ava-box p{
    box-sizing: border-box;
    margin: 0;
    line-height: 40px;
    height: 100%;
    font-size: 15px;
    font-weight: 600;
    margin-left: 10px;
}
.ava-box img{
    height: 40px;
    width: 40px;
    border-radius: 50%;
}
</style>