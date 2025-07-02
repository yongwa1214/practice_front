<script setup>
import { reactive, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import httpService from '@/services/HttpService';

const route = useRoute();
const router = useRouter();

const state = reactive({
    memo: {
        id: 0,
        title: '',
        content: '',
        createdAt: ''
    }
});

onMounted(async()=>{
  const id = route.params.id
  const data = await httpService.findById(id);
  state.memo = data.resultData;

});

 // 객체를 문자열로 바꿈 왜/ 객체인 상태로는 전달이 안됨 

 const moveToForm = () => {
  const json = JSON.stringify(state.memo);
  router.push({
    path:'/memo/add',
    state: {
      data: json,
    },
  });
};

</script>

<template>
    <div class="mb-3" v-if="state.memo.createdAt">
      등록일시: {{ state.memo.createdAt }}
    </div>
    <div class="mb-3">
      제목 {{ state.memo.title }}
      
    </div>
    <div class="mb-3">
      내용 {{ state.memo.content }}

    </div>
    
    <button @click="moveToForm" type="button" class="btn btn-primary w-100 py-3">수정</button>
  
</template>

<style scoped>
</style>
