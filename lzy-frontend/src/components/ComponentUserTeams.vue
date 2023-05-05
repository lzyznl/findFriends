<template>
    <div class="page">
        <div class="header">
            <van-tabs v-model:active="active">
                <van-tab>
                    <template #title>
                        <van-icon name="fire-o" color="#ee0a24"></van-icon>
                        公开
                    </template>
                    <TeamCard :teamList="teamList"></TeamCard>
                    <van-empty description="暂无加入队伍" v-if="teamList.length == 0"/>
                </van-tab>
                <van-tab>
                    <template #title>
                        <van-icon name="lock"></van-icon>
                        加密
                    </template>
                    <TeamCard :teamList="teamList"></TeamCard>
                    <van-empty description="暂无加入队伍" v-if="teamList.length == 0"/>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import {useRoute} from 'vue-router'
import myAxios from '../plugin/myAxios.ts'
import { showFailToast } from 'vant'
import TeamCard from './teamCardList.vue'
let active = ref(0)
let teamList = ref([])
let userInfo = ref({})
const route = useRoute()

onMounted(async()=>{
    userInfo.value = route.query
    try{
        const res = await myAxios.post("/team/list/my/join",{
            userId: userInfo.value.id
        })
        if(res.code == 0){
            teamList.value = res.data
            teamList.value.forEach((item)=>{
                item.isOtherWatching = true
            })
        }else{
            showFailToast("加载队伍失败");
        }
    }catch{
        showFailToast("加载队伍失败");
    }
})

watch(
    () => active.value,
    async() => {
        //ajax
        try{
            const res = await myAxios.post("/team/list/my/join",{
                userId: userInfo.value.id
            })
            if(res.code == 0){
                teamList.value = res.data
                teamList.value.forEach((item)=>{
                item.isOtherWatching = true
            })
            }else{
                showFailToast("加载队伍失败");
            }
        }catch{
            showFailToast("加载队伍失败");
        }
    }
)
</script>

<style scoped>

</style>