<template>
    <div>
        <van-field
        v-model="fieldValue"
        is-link
        readonly
        label="性别"
        placeholder="选择性别"
        @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" round position="bottom">
        <van-picker
            :columns="columns"
            @cancel="showPicker = false"
            @confirm="onConfirm"
        />
        </van-popup>
        <div style="margin: 16px;">
      <van-button round block type="primary" @click="onSubmit">
        提交修改
      </van-button>
    </div>
    </div>
</template>


<script setup>
import {ref, onMounted} from 'vue'
import {useRoute,useRouter} from 'vue-router'
import {getCurrentUser} from '../services/userService'
const route = useRoute()
const router = useRouter()
const fieldValue = ref('');
const fieldIndex = ref(0)
const showPicker = ref(false);
onMounted(()=>{
    // console.log(route.query.currentValue)
    fieldValue.value = columns[route.query.currentValue].text;
    fieldIndex.value = columns[route.query.currentValue].value
})
const onConfirm = ({ selectedOptions }) => {
    showPicker.value = false;
    fieldValue.value = selectedOptions[0].text;
    fieldIndex.value = selectedOptions[0].value
};
const columns = [
    { text: '女', value: 0 },
    { text: '男', value: 1 },
]
const onSubmit = async() => {
    const currentUser = await getCurrentUser();
    // console.log(currentUser,'hhh')
    const res = await myAxios.post("/user/updateUser",{
        'id':currentUser.data.id,
        'gender': fieldIndex.value
    })
    // console.log(res)
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