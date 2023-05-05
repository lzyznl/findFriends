<template>
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="请输入要搜索的标签"
        @search="onSearch"
        @cancel="onCancel"
    />
  </form>
  <van-divider
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
  >
    已选择标签
  </van-divider>
  <div v-if="activeId.length===0">请选择标签</div>

  <van-row gutter="20">
    <van-col  v-for="tag in activeId" >
      <van-tag closeable size="medium" type="primary" @close="close(tag)">
        {{tag}}
      </van-tag>
    </van-col>
  </van-row>


  <van-divider
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
  >
    未选择标签
  </van-divider>

  <van-tree-select
      v-model:active-id="activeId"
      v-model:main-active-index="activeIndex"
      :items="useTagList"
  />

  <van-button block type="primary" @click="doSearch">搜索</van-button>
</template>

<script setup>
import { ref } from 'vue';
import {useRouter} from "vue-router";
const router = useRouter();

const oragintagList = [
  {
    text: '性別',
    children: [
      {text: '男', id: '男'},
      {text: '女', id: '女'},
    ],
  },
  {
    text: '方向',
    children: [
      {text: 'c++', id: 'c++'},
      {text: 'java', id: 'java'},
      {text: 'python', id: 'python'},
    ],
  },
];

//创建响应式对象
let useTagList = ref(oragintagList);


const searchText = ref('');
const onSearch = (val) => {
  //进行标签的搜索过滤
  useTagList.value=oragintagList.map(parentTag=>{
    const tempParentTag = {...parentTag};
    const tempChildTag = [...parentTag.children];
    tempParentTag.children=tempChildTag.filter(item=>item.text.includes(searchText.value));
    return tempParentTag;
  })
  for(let i=0;i<useTagList.value.length;++i)
  {
    if(useTagList.value[i].text==='方向'&&useTagList.value[i].children.length!==0)
    {
      activeIndex.value=1;
    }
  }
};
const onCancel = () => {
  searchText.value=' ';
  useTagList=oragintagList;
  activeIndex.value=0;
};


//标签的删除方法
const close = (tag) =>
{
  activeId.value=activeId.value.filter(item=>{
    return tag!==item;
  })
}

const activeId = ref([]); //右侧的索引，可以传入数组
const activeIndex = ref(0); //左侧索引


const doSearch=()=>
{
  console.log(activeId.value)
  router.push({
    path:'/home/user/search',
    query:{
      tags:activeId.value
    }
  })
}

</script>

<style scoped>

</style>