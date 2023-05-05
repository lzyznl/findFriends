<template>
    <div class="bodyer">
        <div class="img-box">
            <div class="ava-box">
                <img src="../assets/images.jpg">
            </div>
            <van-divider>{{ teamInfo.name }}</van-divider>
        </div>
        <div>
            <van-cell icon="award-o" title="队伍名称" :value="teamInfo.name"></van-cell>
            <van-cell icon="points" title="队伍ID" :value="teamInfo.id"></van-cell>
            <van-cell icon="friends-o" title="队伍人数" :value="teamInfo.maxNum"></van-cell>
            <van-cell icon="manager-o" title="队长" :value="teamInfo.userVo ? teamInfo.userVo.username : ''"></van-cell>
            <van-cell icon="label-o" title="队伍描述" :value="teamInfo.description"></van-cell>
            <van-cell icon="chat-o" title="队伍聊天室" is-link @click="handleChat"></van-cell>
        </div>
    </div>
</template>


<script setup>
import {ref, onMounted, computed, nextTick} from 'vue'
import {useRoute, useRouter} from 'vue-router'
const route = useRoute()
const router = useRouter()
let teamInfo = ref({})
onMounted(() => {
    teamInfo.value = JSON.parse(route.query.teamInfo)
})
const handleChat = () => {
    
    router.push({
        path: '/home/chat',
        query: {
            type: 2,
            scdId: teamInfo.value.id
        }
    })
}
</script>



<style scoped>
    img{
        width: 135px;
        height: 135px;
        /* position: absolute; */
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

</style>