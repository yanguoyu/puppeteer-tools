<template>
<div class="body-main">
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>登录</span>
    </div>
    <el-button @click="loginByGithub">使用github账号登录</el-button>
  </el-card>
</div>
</template>

<script>
import { mapActions } from 'vuex'
import actionTypes from '../store/actionTypes'

export default {
  name: 'Login',
  beforeMount: function () {
    this[actionTypes.hasLogin]()
  },
  methods: {
    ...mapActions([actionTypes.loginByGithub, actionTypes.hasLogin])
  }
}
</script>

<style>
.body-main {
  height: 100%;
  padding-top: 100px;
  background: url('../assets/1.svg');
  background-color: #eee;
}

.box-card {
  width: 400px;
  height: 300px;
  margin: 0 auto;
}
</style>
