<script setup>

const props = defineProps({
  item: Object,
  deleteItem: Function
});


</script>

<!-- props item에 Home에서 돌린 for문의 m값이 object에 들어감  -->
<template>
  <router-link :to="`/mod/${props.item.id}`" class="item">
    <div class="d-flex pt-3">
      <div class="pb-3 mb-0 w-100">
        <div class="d-flex justify-content-between">
          <b>{{ props.item.title }}</b>
          <div>
            <span role="button" @click.prevent="$emit('deleteItem', props.item.id)">
              삭제
            </span>
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
