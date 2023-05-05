<template>
    <div class="page">
        <div class="room-body">
            <component v-for="(item,index) in info"
            :is="curUser.id === item.fromUser.id ? componentName[1] : componentName[0]" :info="item"
            >
            </component>
        </div>
        <div class="room-footer">
            <ComponentEmoji @getMsg="getMsg"></ComponentEmoji>
        </div>
    </div>
    
</template>


<script setup>
import ComponentEmoji from '../components/ComponentEmoji.vue'
import ComponentMessageMy from '../components/ComponentMessageMy.vue'
import ComponentMessageOther from '../components/ComponentMessageOther.vue'
import {getCurrentUser} from '../services/userService'
import {ref, onMounted,onUnmounted} from 'vue'
import {useRoute} from 'vue-router'
import { showFailToast, showSuccessToast } from 'vant'
let componentName = [ComponentMessageOther,ComponentMessageMy]
let curUser = ref({})
const route = useRoute()
onMounted(async() => {
    try{
        const res = await getCurrentUser()
        if(res.code == 0){
            curUser.value = res.data
        }
        console.log(curUser.value)
    }catch{

    }
})
let info = ref([{
    fromUser: {
        id: 460787,
        username: '努力的大刘',
        userAccount: 'lzyyyy',
        avatarUrl: 'https://i.postimg.cc/Znt1jWYF/user.jpg'
    },
    toUser: {
        id: 4,
        username: 'Aiis',
        userAccount: 'aiis123',
        avatarUrl: 'https://i.postimg.cc/Znt1jWYF/user.jpg'
    },
    teamId: 0,
    text: "hello worldhello worldhello worldhello worldhello worldhello worldhello world",
    chatType: 0,
    createTime: '2023年04月30日 19:39:29'
}])

let ws;
let scdId = 0;
onMounted(async()=>{
    const res = await getCurrentUser()
    const curUser = res.data
    //当前用户id，作为第一个参数
    const userId = curUser.id
    if(route.query.scdId && route.query.type == 2){
        scdId = route.query.scdId
    }
    // console.log(curUser.id)
    //创建对象
    ws = new WebSocket(`ws://192.168.3.155:8080/api/webSocket/${userId}/${scdId}`)
    //启动socket服务
    ws.addEventListener('open',()=>{
        showSuccessToast("连接服务已启动")
    })
    //接受数据
    ws.addEventListener('message',(e)=>{
      console.log(e.data+"tt")
        info.value.push(JSON.parse(e.data))
      // console.log(info.value)
    })
    
})
onUnmounted(()=>{
   ws.close()
})
const getMsg = (msg) => {
    // console.log(msg)
    let toId = 0;
    let teamId = 0;
    if(route.query.scdId){
        toId = route.query.type == 0 ? route.query.scdId : 0;
        teamId = route.query.type == 2 ? route.query.scdId : 0;
    }
    ws.send(JSON.stringify({
        toId,
        teamId,
        text: msg,
        chatType: route.query.type
    }))
}
</script>


<style scoped>
    .page{
        min-height: 100%;
        width: 100%;
        position: relative;
    }
    
    .room-footer{
        border-top: 1px solid black;
        position: fixed;
        bottom: 50px;
        z-index: 100;
        width: 100%;
    }
    .room-body{
        width: 100%;
        padding-bottom: 60px;
        overflow: hidden;
    }
</style>