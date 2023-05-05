<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="addFormData.name"
          name="name"
          label="队伍名"
          placeholder="请填写队伍名"
          :rules="[{ required: true, message: '请填写队伍名' }]"
      />

      <van-field
          v-model="addFormData.description"
          rows="4"
          autosize
          label="队伍描述"
          type="textarea"
          placeholder="请填写队伍描述"
      />

      <van-field
          v-model="addFormData.expireTime"
          is-link
          readonly
          name="datePicker"
          label="过期时间"
          :placeholder="addFormData.expireTime??'点击选择过期时间'"
          @click="showPicker = true"
      />
      <van-popup v-model:show="showPicker" position="bottom">
        <van-date-picker @confirm="onConfirm" @cancel="showPicker = false" />
      </van-popup>


      <van-field name="stepper" label="队伍人数">
        <template #input>
          <van-stepper v-model="addFormData.maxNum" max="20" min="3"/>
        </template>
      </van-field>

      <van-field name="radio" label="队伍状态">
        <template #input>
          <van-radio-group v-model="addFormData.status" direction="horizontal">
            <van-radio name="0">公开</van-radio>
            <van-radio name="1">私有</van-radio>
            <van-radio name="2">加密</van-radio>
          </van-radio-group>
        </template>
      </van-field>

      <van-field
          v-if="addFormData.status==='2'"
          v-model="addFormData.password"
          type="password"
          name="密码"
          label="队伍密码"
          placeholder="请填写队伍密码"
          :rules="[{ required: true, message: '请填写队伍密码' }]"
      />

    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup>

import {ref} from "vue";
import myAxios from "../plugin/myAxios.ts";
import {useRouter} from "vue-router";
import 'vant/es/toast/style';
import {showFailToast, showSuccessToast, Toast} from "vant";

const initFormData ={
  "description": "",
  "expireTime": "",
  "maxNum": 0,
  "name": "",
  "password": "",
  "status": 0
}
const addFormData = ref({...initFormData})

const router = useRouter();

const onSubmit = async () =>{
  const dateTime = addFormData.value.expireTime;
  const inputDate = new Date(dateTime);
  const formattedDate = `${inputDate.getFullYear()}-${(inputDate.getMonth() + 1).toString().padStart(2, '0')}-${inputDate.getDate().toString().padStart(2, '0')}`;

  console.log(formattedDate); // 输出：2024-01-04

  const postData ={
    ...addFormData.value,
    status:Number(addFormData.value.status),
    expireTime:formattedDate
  }
  const res = await myAxios.post("/team/add",postData);
  if(res?.code===0&&res.data){
    showSuccessToast("添加成功");
    router.push({
      path: "/home/team",
      replace: true
    })
  }else{
    showFailToast("添加失败");
  }
  console.log(res+"hhhhhhhh")
}



const result = ref('');
const value = ref(1);
const showPicker = ref(false);
const onConfirm = ({ selectedValues }) => {
  addFormData.value.expireTime = selectedValues.join('/');
  showPicker.value = false;
};
</script>

<style scoped>

</style>