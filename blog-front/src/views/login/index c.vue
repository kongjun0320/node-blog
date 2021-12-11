<template>
  <el-form
    ref="blogFormRef"
    :model="blogForm"
    :rules="blogFormRules"
    label-width="120px"
    style="width: 800px"
  >
    <el-form-item label="标题" prop="title">
      <el-input v-model="blogForm.title" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="内容" prop="content">
      <el-input v-model="blogForm.content" type="textarea"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">提交</el-button>
      <el-button @click="reset">重制</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { getCurrentInstance, reactive, ref } from 'vue'

const { proxy } = getCurrentInstance()
const blogFormRef = ref(null)
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

const submit = () => {
  proxy.$refs.blogFormRef.validate((valid) => {
    if (valid) {
      alert('submit!')
    } else {
      console.log('error submit!!')
      return false
    }
  })
}

const reset = (formName) => {
  proxy.$refs.blogFormRef.resetFields()
}
</script>

<style lang="scss" scoped></style>
