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

const getItems = async (params) => {
  const data = await httpService.getMemoList(params);
  state.memos = data.resultData;
  console.log("state.memos :", state.memos);
};

</script>


<template>
  <div class="memo-list">

    <!-- state.memos 배열의 값을 순차적으로 m이라는 곳에 담는다
        아 m.id는 state.memos의 id구나 
        item ="m"은 MemoCard.vue에 item: Object 오브젝트 자리에  m들어간다 -->
    <MemoCard v-for="m in state.memos" :item="m" :key="m.id"/>

    <router-link to="/memos/add" class="add btn btn-light">
      + 추가하기
    </router-link>
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