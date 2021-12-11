<template>
  <article class="blog-article">
    <p class="title">
      <span @click="getBlogDetail(article.id)">{{ article.title }}</span>
    </p>
    <section class="info">
      <span class="author">{{ article.author }}</span>
      <span class="create-time">{{ article.createtime }}</span>
    </section>
  </article>
  <el-dialog v-model="blogDetailDialogVisible" title="详情" width="30%" center>
    <el-row style="margin-bottom: 10px">
      <el-col :span="4">博客名称</el-col>
      <el-col :span="20">{{ articleDetail?.title }}</el-col>
    </el-row>
    <el-row>
      <el-col :span="4">博客内容</el-col>
      <el-col :span="20">{{ articleDetail?.content }}</el-col>
    </el-row>
  </el-dialog>
</template>

<script setup>
import { getCurrentInstance, ref } from 'vue'

defineProps({
  article: Object
})
const { proxy } = getCurrentInstance()

const blogDetailDialogVisible = ref(false)
const articleDetail = ref(null)

const getBlogDetail = (id) => {
  proxy.$api.getBlogDetail({ id }).then((res) => {
    blogDetailDialogVisible.value = true
    articleDetail.value = res
  })
}
</script>

<style lang="scss" scoped>
.blog-article {
  padding: 20px 0;
  @include bbGray;
  .title {
    color: blue;
    span {
      cursor: pointer;
    }
  }
  .info {
    color: rgb(158, 157, 157);
    margin-top: 10px;
    font-size: 14px;
    .author {
      margin-right: 7px;
    }
  }
}
</style>
