<script setup>
import { User,Lock} from '@element-plus/icons-vue'
import {ElMessage} from "element-plus";

// 通过isRegister控制展示注册/登录
import {ref} from 'vue'

// 用于注册/登录的数据
const registerData = ref({
  username:'',
  password:'',
  rePassword:''
})

//控制展示注册/登录 与 清空数据模型的数据
const isRegister = ref(false)
const changepage = () => {
  isRegister.value = !isRegister.value
  registerData.value = {
    username: '',
    password: '',
    rePassword: ''
  }
}

// 确认密码的校验函数(自定义校验规则函数)
const rePasswordValid = (rule,value,callback) =>{
  if(value == null || value === ''){
    callback(new Error('请再次输入密码'))
  }
  if(value !== registerData.value.password){
    callback(new Error('两次输入密码不一致'))
  }
}

// 表单校验
const registerRules = ref({
  username:[
      {required:true,message:'请输入用户名',trigger:'blur'},
      { min: 5, max: 16, message: '用户名须5~16位', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 5, max: 16, message: '密码长度必须为5~16位', trigger: 'blur' }
  ],
  rePassword: [
    { validator: rePasswordValid, trigger: 'blur' }
  ]
})
/**
 * 1.注册相关业务
 */
// 注册事件
import { registerService} from "@/api/user.js";
const register = async () =>{
  // console.log(registerData.value)
 await registerService(registerData.value)
  ElMessage.success('注册成功')

}
/**
 * 2.登录相关业务
 */

// 登录事件
import {useTokenStore} from'@/stores/token.js'
const tokenStore = useTokenStore()
import { loginService } from "@/api/user.js";
import router from "@/router/index.js";
const login = async () =>{
  // console.log('登录')
  // console.log(registerData.value)
  let result = await loginService(registerData.value)
  // console.log(result)
  // tokenStore.setToken(result.data)
  tokenStore.setToken(result.data)
  ElMessage.success('登录成功')
  router.push('/')
}

</script>

<template>
  <el-row class="login-page">
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <!-- 一、注册表单 -->
      <el-form ref="form" :model="registerData" :rules="registerRules" size="large" autocomplete="off" v-if="isRegister">
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input v-model="registerData.username" :prefix-icon="User"  placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="registerData.password" :prefix-icon="Lock" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="rePassword">
          <el-input v-model="registerData.rePassword" :prefix-icon="Lock" type="password" placeholder="请输入再次密码"></el-input>
        </el-form-item>
        <!-- 注册按钮 -->
        <el-form-item>
          <el-button class="button" type="primary" auto-insert-space @click="register">
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="changepage">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>

      <!-- 二、登录表单 -->
      <el-form ref="form" :model="registerData" :rules="registerRules" size="large" autocomplete="off" v-else>
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input v-model="registerData.username" :prefix-icon="User" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="registerData.password" name="password" :prefix-icon="Lock" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <!-- 登录按钮 -->
        <el-form-item>
          <el-button @click="login" class="button" type="primary" auto-insert-space>登录</el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="changepage">
            注册 →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">
.login-page {
  height: 100vh;
  background-color: #fff;

  .bg {
    background: url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
    url('@/assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;

    .title {
      margin: 0 auto;
    }

    .button {
      width: 100%;
    }

    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>