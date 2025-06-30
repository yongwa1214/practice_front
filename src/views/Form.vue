<script setup>
// 수정 시 통신을 한 번해야함 > onMounted
import { reactive, onMounted, useTemplateRef } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import httpService from '@/services/HttpService';



const state = reactive({
  memo:{
    memoId: 0,
    title: '',
    ctnts: '',
    createdAt: ''
  }
})



const router = useRouter(); // 주소 이동(라우터 처리)
const route = useRoute(); // PathVariable데이터 가져오기용

const refTitle = useTemplateRef('ref_title');
const refCtnts = useTemplateRef('ref_ctnts');


console.log('route.params.memoId:',route.params.memoId);


const submit = async() =>{
  // 간단한 validation(유효성 검사)
  // 제목에 대용이 없다면 alert('제목을 작성해주세요.')
  // 내용에 내용이 없다면 alert('내용을 작성해주세요.')
  if(state.memo.title === '' ){ // 또는 state.memo.title.length === 0
    alert('제목을 작성해주세요');
    refTitle.value.focus();
    return;

  } else if(state.memo.ctnts === ''){
    alert('내용을 작성해주세요');
    refCtnts.value.focus();
    return;
    
  }

  if(state.memo.title.length > 20 ){ // 또는 state.memo.title.length === 0
    alert('제목은 20자 이내로 작성해주세요');
    return;
  } else if(state.memo.ctnts.length > 200){
    alert('내용은 200자 이내로 작성해주세요 작성해주세요');
    return;
    
  }

  console.log("안녕");
  // 등록, 수정 처리인지 구분이 되어야 한다.
  if(route.params.memoId){// 수정처리
    
    return;
  }

  const bodyJson = {
    title: state.memo.title,
    ctnts: state.memo.ctnts
  }


   // 등록 처리
  const data = await httpService.save(bodyJson);
  console.log('글등록', data.resultMessage);
  if(data.resultData === 1){ // 등록 성공
    //홈화면으로 라우터 처리
    router.push({path: '/'});
    
  }else{ // 등록 실패
    alert(data.resultMessage)
  }

};

const findById = async ()=>{
  const data = await httpService.findById(route.params.memoId);
  state.memo = data.resultData;
}

onMounted(()=>{
  if(route.params.memoId){
    findById();
  }
});

</script>

<template>

  <!-- prevent: 버블링 막겠다-->
<form class="detail" @submit.prevent="submit">
  <div class="mb-3" v-if="state.memo.createdAt">
      등록일시: {{ state.memo.createdAt }}
  </div>
  <div class="mb-3">
    <label for="title" class="form-label">제목</label>
    <input type="text" ref="ref_title" id="title" class="form-control p-3" 
        v-model="state.memo.title" placeholder="20자 이내">
  </div>
  <div class="mb-3">
    <label for="content" class="form-label">내용</label>
    <textarea id="content" class="form-control p-3"
              v-model="state.memo.ctnts" placeholder="200자 이내"  ref="ref_ctnts"></textarea>
  </div>
  <div class="count mb-1" :style="{ color: state.memo.ctnts.length > 200 ? '#ff123d' : '#1c1c1c' }">
    {{ state.memo.ctnts.length }} / 200
  </div>
  <!-- button은 원래 type="submit" 이 적용됨" -->
  <button class="btn btn-primary w-100 py-3">저장</button>
</form>

</template>

<style scoped>
.count{
  display: flex;
  justify-content: flex-end;
}
</style>