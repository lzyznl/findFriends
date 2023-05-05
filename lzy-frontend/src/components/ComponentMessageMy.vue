<template>
    <div class="box">
        <div class="card">
            <div class="info">
                <div class="msg">
                    {{ props.info.text }}
                </div>
            </div>
            <div class="ava-box">
                <img :src="props.info.fromUser.avatarUrl" alt="userAva">
            </div>
        </div>
    </div>
</template>


<script setup>
import {ref, onMounted, defineProps} from 'vue'
const props = defineProps(['info'])

</script>


<style scoped>
.box{
    width: 80%;
    display: flex;
    justify-content: flex-end;
    padding: 10px 20px;
    float: right;
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
    margin-right: 10px;
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
    background-color: rgb(86, 150, 247);
    padding: 14px 10px;
    border-radius: 12px;
    /* width: auto; */
    /* position: absolute; */
    float: left;
    max-width: 90%;
    color: white;
}
</style>