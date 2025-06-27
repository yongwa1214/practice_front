<script setup>
import httpService from "@/services/HttpService";

const props = defineProps({
  item: Object,
});

//삭제버튼 누르면 콘솔에 id값 출력되게 해주세요

const remove = async () => {
  console.log("id:", props.item.id);
  if (confirm("삭제하시겠습니까?")) {
    console.log("삭제하겠다.");

    //axios는 객체를 보내면 쿼리스트링으로 만들어줌
    // 여기서 parmas로 객체를 날려줘야함
    // 백엔드에서 쿼리스트링 키값은 memo_id로 받음 그러면 키값은 memo_id고
    // 백엔드가 id를 통해 지우니까 value는 props.item.id를 준다
    const params = {
      memo_id: props.item.id,
    };
    const data = httpService.deleteMemo(params);
  }
};
</script>

<!-- props item에 Home에서 돌린 for문의 m값이 object에 들어감  -->
<template>
  <router-link :to="`/memos/${props.item.id}`" class="item">
    <div class="d-flex pt-3">
      <div class="pb-3 mb-0 w-100">
        <div class="d-flex justify-content-between">
          <b>{{ props.item.title }}</b>
          <div>
            <span role="button" @click.prevent="remove(props.item.id)"
              >삭제</span
            >
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<style lang="scss" scoped>
.item {
  background-color: #f8f9fa;
  border: 1px solid #eee;
  display: block;
  color: #000;
  text-decoration: none;
  padding: 20px 30px;
  margin: 15px 0;
  &:hover {
    border-color: #aaa;
  }
}
</style>
