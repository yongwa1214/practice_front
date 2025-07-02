<script setup>
import { reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import httpService from '@/services/HttpService';
const state = reactive({
    memo: {
        id: 0,
        title: '',
        content: '',
        createdAt: ''
    }
});

onMounted(() =>{
  const passData = history.state.data
  console.log('history~~', passData);
  if(passData){ // 넘어온 데이터가 있다면 
    state.memo = JSON.parse(passData);
  }
})

const route = useRoute(); //pathVariable 객체 가져오기 위함 
const router = useRouter(); //주소 이동

const procSubmit = async() =>{

  const jsonbody = {
    title: state.memo.title,
    content: state.memo.content
  }

  const data = await httpService.save(jsonbody);
  if(data.resultData === 1){
    router.push({path: '/'});
  } else{
    alert(data.resultMessage);
  }
}


</script>

<template>
  <form class="detail" @submit.prevent="procSubmit">
    <div class="mb-3" v-if="state.memo.createdAt">
      등록일시: {{ state.memo.createdAt }}
    </div>
    <div class="mb-3">
      <label for="title" class="form-label">제목</label>
      <input type="text" id="title" class="form-control p-3" v-model="state.memo.title" />
    </div>
    <div class="mb-3">
      <label for="content" class="form-label">내용</label>
      <textarea id="content" class="form-control p-3" v-model="state.memo.content"></textarea>
    </div>
    <button type="submit" class="btn btn-primary w-100 py-3" >{{state.memo.id > 0 ? '수정' : '저장'}}</button>
  </form>
</template>

<style scoped>
</style>
