<template>
  <h1 class="blog-title">{{ title }}</h1>
</template>

<script setup>
defineProps({
  title: String
})
</script>

<style lang="scss" scoped>
.blog-title {
  font-size: 26px;
  padding: 20px 0 26px;
  @include bbGray;
}
</style>
