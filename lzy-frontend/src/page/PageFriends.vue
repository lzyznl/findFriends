<template>
    <div class="page-friend">
        <div class="input-box">
            <input type="text" placeholder="搜索">
            <van-button plain type="primary">搜索</van-button>
        </div>
        <div class="friends-box">
            <h3 class="title">我的好友</h3>
            <div>
                <van-empty description="暂无好友" v-if="friendsList.length == 0" />
            </div>
            <div class="list">
                <ComponentFriendList v-for="item in friendsList" :friendInfo="item"></ComponentFriendList>
            </div>
        </div>
    </div>
</template>


<script setup>
import {Empty, showFailToast, showSuccessToast} from 'vant';
import {ref, onMounted} from 'vue'
import ComponentFriendList from '../components/CompomentFriendList.vue'
import myAxios from '../plugin/myAxios'
let friendsList = ref([])

onMounted(async() => {
    try{
        const res = await myAxios.post('/friends/getFriends')
        
        if(res.code == 0){
            friendsList.value = res.data
            // friendsList.value.isFriend = true
            showSuccessToast("好友加载成功")
        }else{
            showFailToast("好友加载失败")
        }
    }catch{
        showFailToast("好友加载失败")
    }
    
})
</script>

<style scoped>
.input-box{
    /* margin-top: 20px; */
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    width: 90%;
    margin: 10px auto;
    /* justify-content: space-between; */
}
.input-box input{
    padding:12px 10px;
    width: 75%;
    border: 1px solid rgb(194, 194, 194);
    border-radius: 5px;
}
.friends-box{
    width: 100%;
}
.title{
    margin-left: 20px;
}
</style>