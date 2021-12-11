<template>
  <el-form
    ref="loginFormRef"
    :model="loginForm"
    :rules="loginFormRules"
    label-width="120px"
    style="width: 800px"
  >
    <el-form-item label="用户名" prop="username">
      <el-input v-model="loginForm.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        v-model="loginForm.password"
        type="password"
        autocomplete="off"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">登陆</el-button>
      <el-button @click="reset">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { getCurrentInstance, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'

const { proxy } = getCurrentInstance()
const loginFormRef = ref(null)
const loginForm = reactive({
  username: '',
  password: ''
})

const loginFormRules = reactive({
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    }
  ]
})

const submit = () => {
  proxy.$refs.loginFormRef.validate((valid) => {
    if (valid) {
      proxy.$api
        .login({
          username: loginForm.username,
          password: loginForm.password
        })
        .then(() => {
          proxy.$router.push({ name: 'BlogAdmin' })
        })
        .catch((error) => {
          ElMessage({
            message: error,
            type: 'error'
          })
        })
    } else {
      console.log('error submit!!')
      return false
    }
  })
}

const reset = (formName) => {
  proxy.$refs.loginFormRef.resetFields()
}
</script>

<style lang="scss" scoped></style>
