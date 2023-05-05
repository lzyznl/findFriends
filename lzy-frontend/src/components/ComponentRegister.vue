<template>
    <div class="register-box">
        <div class="input-box">
            <input type="text" placeholder="Account" v-model="userAccount">
            <input type="password" placeholder="Password" v-model="userPassword">
            <input type="password" placeholder="Repeate Password" v-model="checkPassword">
        </div>
        <div class="btn-item">
            <button class="btn-account">Have Account?</button>
        </div>
        <div class="register">
            <button class="btn-rg" @click="onRegister()">注册</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {useRouter} from 'vue-router'
import myAxios from '../plugin/myAxios.ts'
import {showFailToast} from 'vant'
let userAccount = ref('')
let userPassword = ref('')
let checkPassword = ref('')
const router = useRouter()
const onRegister =  async() => {
    try{
        let res = await myAxios.post("/user/register", {
            userAccount: userAccount.value,
            userPassword: userPassword.value,
            checkPassword: checkPassword.value
        })
        // console.log(res)
        if(res.code == 0){
            router.push("/home")
        }

    }catch{
        showFailToast("注册失败")
    }
}


</script>


<style scoped>
    .register-box{
        width: 100%;
    }
    .input-box{
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
    }
    .input-box input{
        width: 70%;
        margin: 0 auto;
        margin-top: 20px;
        padding: 5px 10px;
        /* font-size: 20px; */
        
        border: none;
        outline: none;
        border-bottom: 2px solid rgb(170, 217, 255);
        /* border-radius: 13px; */
    }
    .input-box input::placeholder{
        color: rgb(148, 148, 148);
    }
    .btn-item{
        width: 100%;
        overflow: hidden;
        margin-top: 10px;
    }
    .btn-account{
        background-color: transparent;
        border: none;
        outline: none;
        float: right;
        margin-right: 12px;
        color: rgb(91, 146, 255);
    }
    .register{
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .register .btn-rg{
        /* margin: 0 auto; */
        background-color: transparent;
        border: 0;
        background-image: linear-gradient(to right, #4c9fff, #4866ff);
        color: white;
        padding: 10px 20px;
        border-radius: 15px;
    }
</style>