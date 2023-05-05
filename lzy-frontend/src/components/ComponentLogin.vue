<template>
    <div class="login-box">
        <div class="login-ops">
            <div class="ops-item" :style="isLogin ? 'color:rgb(0, 140, 255)' : ''" @click="handleOps('登录')">
                登录
                <span class="item-border" v-if="isLogin"></span>
            </div>
            <div class="ops-item" :style=" !isLogin ? 'color:rgb(0, 140, 255)' : ''" @click="handleOps('注册')">
                注册
                <span class="item-border" v-if="!isLogin"></span>
            </div>
        </div>
        <div class="line-box">Welcome!</div>
        <div>
            <!-- <ComponentLoginInput></ComponentLoginInput> -->
            <component :is="isLogin ? ComponentLoginInput : ComponentRegister"></component>
        </div>
        <div class="decorate">
            <div class="dc-item"></div>
        </div>
    </div>
</template>


<script setup lang="ts">
import ComponentLoginInput from '../components/CompomentLoginInput.vue'
import ComponentRegister from '../components/ComponentRegister.vue'
import {ref} from 'vue';

let isLogin: Boolean = ref(true);
const handleOps = (ops: String) => {
    ops === '登录' ? isLogin.value = true
    : ops === '注册' ? isLogin.value = false
    : '';
}

</script>


<style scoped >
*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
.login-box{
    width: 90%;
    height: 400px;
    /* border: 1px solid grey; */
    box-shadow: 0 0 10px 2px rgb(210, 210, 210);
    padding: 10px 10px;
    transform: translateY(-50px);
    background-color: white;
    position: relative;
    border-radius: 20px;
}
.login-ops{
    display: flex;
    justify-content: space-around;
}
.login-ops .ops-item{
    width: 90px;
    padding: 7px 10px;
    text-align: center;
    color: rgb(160, 160, 160);
    font-weight: 500;
    position: relative;
    /*选中样式*/
    
}
.line-box{
    /* margin-top: 20px; */
    margin-top: 10px;
    width: 100%;
    text-align: center;
    padding: 5px 7px;
    color: rgb(108, 108, 108);
    position: relative;
}
.line-box::before{
    content: '';
    position: absolute;
    width: 60px;
    border-bottom: 2px solid ;
    border-image: linear-gradient(to left, #a9a9a9, rgb(255, 255, 255)) 1;
    bottom: 50%;
    transform: translateY(1px);
    left: 20%;
}
.line-box::after{
    content: '';
    position: absolute;
    width: 60px;
    border-bottom: 2px solid;
    border-image: linear-gradient(to right,  #a9a9a9, rgb(255, 255, 255)) 1;
    bottom: 50%;
    transform: translateY(1px);
    right: 20%;
}
.ops-item .item-border{
    position: absolute;
    width: 30px;
    border-bottom: 3px solid rgb(75, 174, 255);
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
}
.item-border::after{
    content: '';
    width: 3px;
    border-bottom: 3px solid rgb(167, 215, 255);
    position: absolute;
    right: -5px;
    border-radius: 50%;
}
.item-border::before{
    content: '';
    width: 3px;
    border-bottom: 3px solid rgb(167, 215, 255);
    position: absolute;
    left: -5px;
    border-radius: 50%;
}
.decorate{
    position: absolute;
    width: 100px;
    height: 100px;
    bottom: 0;
    right: 0;
    background-color: rgb(38, 125, 255);
    border-radius: 100% 0 20px 0;
}
.decorate .dc-item{
    width: 60px;
    height: 60px;
    background-color: rgb(95, 159, 255);
    position: absolute;
    right: 0;
    bottom: 0;
    border-radius: 100% 0 20px 0;
}
</style>