<template>
    <div class="box">
        <div class="emoji-box">
            <EmojiPicker @select="selectEmoji" v-if="isShowEmoji"/>
            <button class="btn" @click="handleShow">😀</button>
        </div>
        <div>
            <textarea v-model="text" id="textarea" cols="30" rows="3" placeholder="聊点什么吧..."></textarea>
        </div>
        <div class="btn-box">
            <button class="send" @click="handleSend"><van-icon name="guide-o" /></button>
        </div>
    </div>
</template>


<script setup>
import { EmojiPicker } from 'vue3-twemoji-picker-final'
import {ref, defineEmits} from 'vue'
let isShowEmoji = ref(false)
let text = ref('')
const emit = defineEmits(['getMsg'])
const selectEmoji = (e) => {
  console.log(e, 'e')
  text.value += e.i
  isShowEmoji.value = false
}
const handleShow = () => {
    isShowEmoji.value = !isShowEmoji.value
}
const handleSend = () => {
    //发送ajax
    emit('getMsg',text.value)
    text.value = ''
}
</script>


<style scoped>
.box{
    display: flex;
    width: 100%;
    background-color: #fff;
    /* justify-content: center; */
}
.send{
    background-color: #fff;
    outline: none;
    border: none;
    height: 100%;
    font-size: 40px;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    /* margin-right: 0; */
    /* border: 1px solid black */
}
#textarea{
    border: none;
}
.btn-box{
    border-left: 1px solid black;
    flex-grow: 1;
    /* text-align: center; */
    color: rgb(74, 147, 230);
    display: flex;
    /* text-align: center */
    justify-content: center;
    /* align-items: center; */
}
.emoji-box{
    display: flex;
    /* width: 60%; */
    /* border-right: 1px solid gray; */
}
.btn{
    font-size: 30px;
    background-color: transparent;
    border: none;
    outline: none;
}
.emoji-picker{
    width: 210px;
    height: 200px;
    overflow: scroll;
    box-sizing: border-box;
    padding: 0;
    box-shadow: 0 0 10px 5px rgb(218, 218, 218);
    position: absolute;
    left: 5%;
    bottom: 95%;
    z-index: 200;
    background-color: #fff;
}
.emoji-picker /deep/ .emoji-header{
    width: 184px;
    overflow: hidden;
}
.emoji-picker /deep/ .emoji-search{
    display: none !important;
}
.emoji-picker /deep/ .emoji-footer{
    display: none;
}
</style>