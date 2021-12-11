<template>
  <GlobalHeader title="博客首页" />
  <BlogArticle v-for="list in blogLists" :key="list.id" :article="list" />
</template>

<script setup>
import GlobalHeader from '@/components/global-header'
import BlogArticle from '@/components/blog-list/BlogArticle.vue'

import { getCurrentInstance, ref } from 'vue'

const { proxy } = getCurrentInstance()

const blogLists = ref([])

proxy.$api.getBlogList().then((res) => {
  blogLists.value = res
})
</script>

<style lang="scss" scoped></style>
