<template>
    <div class="img-box">
        <div class="ava-box">
            <input type="file" @change="onChanged($event)">
            <img :src="avaUrl ? avaUrl : defaultUrl" alt="Ava">
        </div>
   </div>
</template>


<script setup>
import {ref, defineProps, onMounted, onBeforeMount} from 'vue'
import myAxios from '../plugin/myAxios.ts'
import {getCurrentUser} from "../services/userService.ts";
import {showFailToast, showSuccessToast} from "vant";
const props = defineProps({
    userInfo: {
        type: Object,
        default: ()=> ({})
    }
})
let avaUrl = ref('')
// onMounted(async () => {
//   const res = await getCurrentUser()
//     avaUrl.value = res.data.avatarUrl
// })
onBeforeMount(async ()=>{
  const res = await getCurrentUser()
  avaUrl.value = res.data.avatarUrl
})
const getAva = async () => {
  const res = await getCurrentUser()
  avaUrl.value = res.data.avatarUrl
}
const defaultUrl = ref('./src/assets/images.jpg')

const onChanged = async (e) => {
    console.log(e.target.files[0])
    const file = e.target.files[0]
    const formData = new FormData();
    formData.append('files',file);
    try{
        let res = await myAxios.post("/user/upload",formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        if(res.code == 0){
            avaUrl.value = res.data
            showSuccessToast("上传成功")
        }
        
    }
    catch(error){
        console.log(error)
        showFailToast("上传失败")
    }
}

</script>


<style scoped>
    img{
        width: 135px;
        height: 135px;
        position: absolute;
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
    .ava-box input[type="file"]{
        width: 135px;
        height: 135px;
        /* background-color: black; */
        color: transparent;
        background-color: transparent;
        outline: none;
        border: none;
        opacity: 0;
    }
</style>