<template>
    <div class="box">
        <div class="card">
            <div class="ava-box">
                <img :src="props.info.fromUser.avatarUrl" alt="userAva">
            </div>
            <div class="info">
                <div class="msg-info">
                    <p class="msg-p">{{ props.info.fromUser.username}}&nbsp&nbsp&nbsp{{ props.info.createTime }}</p>
                </div>
                <div class="msg">
                    {{ props.info.text }}
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import {ref, onMounted, defineProps} from 'vue'
const props = defineProps(['info'])
// onMounted(() => {
    
// })
</script>


<style scoped>
.box{
    width: 80%;
    display: flex;
    justify-content: flex-start;
    padding: 10px 20px;
}
.ava-box img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
}
.card{
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
}
.info{
    margin-left: 10px;
    overflow: hidden;
    width: 100%;
}
.msg-p{
    color: grey;
    font-size: 1px;
}
.msg-info{
    margin-bottom: 5px;
}
.msg{
    background-color: rgb(223, 223, 223);
    padding: 14px 10px;
    border-radius: 12px;
    /* width: auto; */
    /* position: absolute; */
    float: left;
    max-width: 90%;
}
</style>