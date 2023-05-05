<template>
    <div class="input-box">
        <div class="input-item">
            <input type="text" 
            :class="inputFlag.userName.isClick ? 'input-add' : ''" 
            @click="handleInput('userName')"
            @blur="blurInput('userName')"
            v-model="userName">
            <p :class="inputFlag.userName.isClick ? 'p-add' : ''">用户名</p>
        </div>
        <div class="input-item">
            <input type="password" 
            :class="inputFlag.userPassword.isClick ? 'input-add' : ''" 
            @click="handleInput('userPassword')"
            @blur="blurInput('userPassword')"
            v-model="userPassword">
            <p :class="inputFlag.userPassword.isClick ? 'p-add' : ''">密码</p>
        </div>
        <div class="btn-item">
            <button class="btn-login" @click="onSubmit()">登录</button>
        </div>
    </div>
</template>


<script lang="ts" setup>

import {ref, reactive, watch} from 'vue';
import myAxios from '../plugin/myAxios';
import {useRouter} from 'vue-router';
import { showFailToast, showSuccessToast } from 'vant';
const router = useRouter();
let inputFlag: Object = reactive({
    userName: {
        isClick: false,
        isInput: false
    },
    userPassword: {
        isClick: false,
        isInput: false
    }
})
let userName: String = ref('');
let userPassword: String = ref('');
watch(
    () => userName.value,
    (newValue: String) => {
        console.log(newValue)
        if(newValue !== ''){
            inputFlag.userName.isInput = true
        }else{
            inputFlag.userName.isInput = false
        }
    }
)
watch(
    () => userPassword.value,
    (newValue: String) => {
        if(newValue !== ''){
            inputFlag.userPassword.isInput = true
        }else{
            inputFlag.userPassword.isInput = false
        }
    }
)
const handleInput = (flagName: String) => {
    inputFlag[flagName].isClick = true 
}
const blurInput = (flagName: String) => {
    if(!inputFlag[flagName].isInput){
        inputFlag[flagName].isClick = false
    }
}
const onSubmit = async() => {
    try{
        const res = await myAxios.post("/user/login",{
            userAccount:userName.value,
            userPassword:userPassword.value
        })
        console.log(res)
        if(res.code == 0){
            showSuccessToast('登陆成功')
            router.push('/home')
        }
    }
    catch{
        showFailToast('登陆失败')
    }
}
</script>


<style scoped>
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .input-box{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px 10px;
    }
    .input-item:first-child{
        /* margin-top: 10px; */
    }
    .input-item{
        width: 80%;
        margin-bottom: 40px;
        position: relative;
    }
    .btn-item{
        width: 80%;
    }
    .input-item input{
        width: 100%;
        /* border: none; */
        border: 2px solid transparent ;
        outline: none;
        border-bottom: 2px solid rgb(192, 192, 192);
        padding: 7px 13px;
        background-color: transparent;
        font-size: 20px;
        transition: all 1s ease;
    }
    .input-add{
        /* border: none; */
        border: 2px solid rgb(167, 215, 255) !important;
        border-radius: 15px;
    }
    .input-item p{
        position: absolute;
        top: 8px;
        z-index: -1;
        left: 5%;
        transition: all 1s ease;
    }
    .p-add{
        top: -10px !important;
        left: 30px !important;
        color: rgb(61, 168, 255) !important;
        background-color: white !important;
        z-index: 1 !important;
        padding-left: 5px !important;
        padding-right: 5px !important;
    }
    .btn-login{
        padding: 10px 25px;
        background: none;
        border: none;
        outline: none;
        width: 100%;
        color: white;
        border-radius: 20px;
        background-image: linear-gradient(to right, #89c0ff,rgb(57, 136, 255), #6789fa);
    }
</style>