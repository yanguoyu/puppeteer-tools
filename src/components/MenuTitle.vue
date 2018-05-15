<template>
  <div class="title-main">
    <el-menu :router="true" :default-active = 'activeIndex'
      mode="horizontal">
      <el-menu-item index="1" :route="{ path: '/'}" @click.native="clickHome">
        首页
      </el-menu-item>
      <el-menu-item :index="activeIndex" v-if="activeName">
        {{activeName}}
      </el-menu-item>
      <el-submenu index="3" class="userInfo">
        <template slot="title">{{userInfo.name}}</template>
        <el-menu-item v-on:click="logOut" index="3-1">登出</el-menu-item>
      </el-submenu >
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex'
import actionTypes from '../store/actionTypes'
import mutationTypes from '../store/mutationTypes'

export default {
  name: 'MenuTitle',
  methods: {
    clickHome: function () {
      this[mutationTypes.changeActiveIndex]({
        curIndex: '1',
        curWorkName: null
      })
    },
    ...mapActions([
      actionTypes.getUserInfo,
      actionTypes.logOut
    ]),
    ...mapMutations([mutationTypes.changeActiveIndex])
  },
  created: function () {
    this[actionTypes.getUserInfo]()
  },
  computed: {
    ...mapState({
      userInfo: state => state.home.userInfo,
      activeName: state => state.home.activeName,
      activeIndex: state => state.home.activeIndex
    })
  }
}
</script>

<style>
.title-main .userInfo {
  float: right;
}
</style>
