<template>
  <div>
    <ul class="main-body panel">
      <VPost v-for="(post, index) in posts" :key="index" :post="post" />
    </ul>
  </div>
</template>

<script>
import VPost from "@/components/UI/VPost.vue";

export default {
  components: { VPost },
  data() {
    return {
      posts: [1, 2, 3, 4],
    };
  },
};
</script>

<style>
.main-body {
  margin-top: 5%;
}

ul {
  list-style: none;
}

.v-avatar img {
  object-fit: cover;
}
</style>
