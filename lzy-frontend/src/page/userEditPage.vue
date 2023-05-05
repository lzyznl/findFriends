<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="editUser.currentValue"
          :name="editUser.editKey"
          :label="editUser.editLabel"
          :placeholder="`请输入${editUser.editLabel}`"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交修改
      </van-button>
    </div>
  </van-form>

</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import {useRoute, useRouter} from "vue-router";
import myAxios from "../plugin/myAxios";
import {showFailToast, showSuccessToast} from "vant";
import {getCurrentUser} from "../services/userService";
import 'vant/es/toast/style';
const route = useRoute();
const router = useRouter();
const editUser = ref({
  editKey:route.query.editKey,
  editLabel:route.query.editLabel,
  currentValue:route.query.currentValue
})
const onSubmit= async ()=>{
  const currentUser = await getCurrentUser();
  console.log(currentUser,'hhh')
  const res = await myAxios.post("/user/updateUser",{
    'id':currentUser.data.id,
    [editUser.value.editKey as string]: editUser.value.currentValue,
  })
  console.log(res)
  if(res.code===0&&res.data>0){
    showSuccessToast('修改成功');
    router.back();
  }else{
    showFailToast('修改失败');
  }
}

</script>

<style scoped>

</style>