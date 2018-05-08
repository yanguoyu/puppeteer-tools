<template>
  <div>
    <el-menu
      mode="horizontal">
      <el-menu-item index="1">
        <a href="#/allWork">首页</a>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">工程</template>
        <el-menu-item index="2-0">所有工程</el-menu-item>
        <el-menu-item index="2-1">创建新工程</el-menu-item>
      </el-submenu>
      <el-submenu index="3" class="userInfo">
        <template slot="title">{{userInfo.name}}</template>
        <el-menu-item index="3-0">查看个人信息</el-menu-item>
        <el-menu-item v-on:click="logOut" index="3-1">登出</el-menu-item>
      </el-submenu >
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import actionTypes from '../store/actionTypes'

export default {
  name: 'MenuTitle',
  methods: {
    ...mapActions([
      actionTypes.getUserInfo,
      actionTypes.logOut
    ])
  },
  created: function () {
    this.getUserInfo()
  },
  computed: {
    ...mapState({
      userInfo: state => state.home.userInfo
    })
  }
}
</script>

<style scoped>
.userInfo {
  float: right;
}
</style>
