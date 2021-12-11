<template>
  <GlobalHeader title="管理中心" />
  <el-button type="primary" @click="addBlog" class="add-blog-btn"
    >新建博客</el-button
  >
  <section class="search-blog">
    <el-input
      class="search-input"
      v-model="keyword"
      placeholder="请输入搜索内容"
    />
    <el-button type="primary" @click="handleSearch">搜索</el-button>
  </section>
  <el-table :data="blogTable" style="width: 100%" border>
    <el-table-column prop="id" label="编号" />
    <el-table-column prop="title" label="博客标题" />
    <el-table-column prop="content" label="博客内容" />
    <el-table-column
      prop="createtime"
      :formatter="handleFormatter"
      label="创建时间"
    />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
          >Delete</el-button
        >
      </template>
    </el-table-column>
  </el-table>

  <el-dialog v-model="blogDialogVisible" title="新增博客">
    <el-form
      ref="blogFormRef"
      :model="blogForm"
      :rules="blogFormRules"
      label-width="120px"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="blogForm.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input v-model="blogForm.content" type="textarea"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSaveBlog">提交</el-button>
        <el-button @click="reset">重制</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { getCurrentInstance, ref, reactive } from 'vue'
import GlobalHeader from '@/components/global-header/index.vue'
import { formatDate } from '../../utils/formatTime'

const { proxy } = getCurrentInstance()

const blogTable = ref([])
const keyword = ref('')
const blogFormRef = ref(null)
const blogDialogVisible = ref(false)

const blogForm = reactive({
  title: '',
  content: ''
})

const blogFormRules = reactive({
  title: [
    {
      required: true,
      message: '请输入标题',
      trigger: 'blur'
    }
  ],
  content: [
    {
      required: true,
      message: '请输入内容',
      trigger: 'blur'
    }
  ]
})

const handleSaveBlog = () => {
  proxy.$refs.blogFormRef.validate((valid) => {
    if (valid) {
      const params = { ...blogForm }
      proxy.$api.createBlog(params).then((res) => {
        console.log(res)
        blogDialogVisible.value = false
        getBlogList()
      })
    } else {
      console.log('error submit!!')
      return false
    }
  })
}

const reset = (formName) => {
  proxy.$refs.blogFormRef.resetFields()
}

const handleFormatter = (row, column, value) => {
  return formatDate(value)
}

const getBlogList = () => {
  const params = { keyword: keyword.value, isAdmin: true }
  proxy.$api.getBlogList(params).then((res) => {
    blogTable.value = res
  })
}
getBlogList()

const handleDelete = (row) => {
  proxy.$api.deleteBlog({ id: row.id }).then((res) => {
    blogTable.value = res
    getBlogList()
  })
}

const addBlog = () => {
  blogDialogVisible.value = true
}

const handleSearch = () => {
  getBlogList()
}
</script>

<style lang="scss" scoped>
.add-blog-btn {
  margin: 20px 0;
}
.search-blog {
  display: flex;
  margin-bottom: 20px;
  .search-input {
    width: 220px;
    margin-right: 20px;
  }
}
</style>
