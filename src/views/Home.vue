<script setup>
import { reactive, onMounted } from "vue";
import httpService from "@/services/HttpService";
import MemoCard from "@/components/MemoCard.vue";


const state = reactive({
  memos: [],
});

onMounted(() => {
  getItems({});
});

// 통신 했을 때(HttpService참조)
// resultDate 배열에 들어있는 값을 위 state.memos에 넣어준다(axios 덕분에 객체로 넣어줌)
// getItems읽어오는 데이터 통신
const getItems = async (params) => {
  const data = await httpService.getMemoList(params);
  state.memos = data.resultData;
  //console.log("state.memos :", state.memos);
};

// 삭제와 데이터 불러오는거랑 같은 공간에 있게하기 위해 이 작업을 한다고?
const removeItem = async (id) => {
  console.log("removeItem: ", id);

  if (confirm("삭제하시겠습니까?")) {
    console.log("삭제하겠다.");

    //axios는 객체를 보내면 쿼리스트링으로 만들어줌
    // 여기서 parmas로 객체를 날려줘야함
    // 백엔드에서 쿼리스트링 키값은 memo_id로 받음 그러면 키값은 memo_id고
    // 백엔드가 id를 통해 지우니까 value는 props.item.id를 준다
    const params = {
      memo_id: id,
    };
    const data = await httpService.deleteMemo(params);

    if (data.resultData === 1) {
      // getItems({}); // 이건 다시 통신하는 거
      
      
      // 아래는 통신 없이 처리 보통 이렇게 처리함 
      // 아래 idx가 없으면 -1이 넘어옴
      const deleteIdx = state.memos.findIndex((item) => item.id === id);
      if(deleteIdx >= 0){
        state.memos.splice(deleteIdx,1);
      }
    }
  }
};
</script>

<template>
  <div class="memo-list">
    <router-link to="/add" class="add btn btn-light">
      + 추가하기
    </router-link>
    <!-- state.memos 배열의 값을 순차적으로 m이라는 곳에 담는다
        아 m.id는 state.memos의 id구나 
        item ="m"은 MemoCard.vue에 item: Object 오브젝트 자리에  m들어간다 
        
        "removeItem" ""안에 이름은 위 함수명(removeItem)과 똑같아야함
        @delete-item은 메모카드 컴포넌트에 props객체로 넘어간다(넘어갈때 카멜케이스로 넘어감)
        -->
    <MemoCard
      @delete-item="removeItem"
      v-for="m in state.memos"
      :item="m"
      :key="m.id"
    />

    
  </div>
</template>

<style lang="scss" scoped>
// .memo-list {
//   .item {
//     background-color: #F8F9FA;
//     border: 1px solid #eee;
//     display: block;
//     color: #000;
//     text-decoration: none;
//     padding: 20px 30px;
//     margin: 15px 0;
//     &:hover {
//       border-color: #aaa;
//     }
//   }
// }
.add {
  display: block;
  padding: 25px;
  border: 1px solid #eee;
}
</style>
