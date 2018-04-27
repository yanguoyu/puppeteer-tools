<template>
  <div>
    <el-input v-model="workName" placeholder="工程名称"></el-input>
    <el-input v-model="pageUrl" placeholder="请输入待解析的网站"></el-input>
    <el-input v-model="selector" placeholder="请输入开始解析的selector"></el-input>
    <el-input v-model="workId" placeholder="请输入workId"></el-input>
    <el-button v-on:click = "getPageModel" >查询</el-button>
    <el-button v-on:click = "saveWorkMethod" >保存</el-button>
    <el-button v-on:click = "excuteWorkMethod" >执行</el-button>
    <img v-bind:src="shotUrl" />
    <el-tree
      :data="urlInfo"
      :props="defaultProps"
      accordion
    >
    </el-tree>
    <p>{{urlInfo}}</p>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import actionTypes from '../store/actionTypes'

export default {
  name: 'NewWork',
  data () {
    return {
      workName: '',
      pageUrl: '',
      selector: '',
      workId: '',
      defaultProps: {
        children: 'childrens',
        label: function (data, node) {
          let res = ''
          if (data.elementSelectKey.select) {
            res += `selector:${data.elementSelectKey.select}`
          }
          if (data.content) {
            res += `--content:${data.content}`
          }
          return res
        }
      }
    }
  },
  methods: {
    getPageModel: function () {
      this[actionTypes.getUrlPageAc]({pageUrl: this.pageUrl, selector: this.selector})
    },
    saveWorkMethod: function () {
      this[actionTypes.saveWork]()
    },
    excuteWorkMethod: function () {
      this[actionTypes.excuteWork]({workId: this.workId})
    },
    ...mapActions([
      actionTypes.getUrlPageAc,
      actionTypes.saveWork,
      actionTypes.excuteWork
    ])
  },
  computed: {
    ...mapState({
      urlInfo: state => state.work.urlInfo,
      shotUrl: state => state.work.shotUrl
    })
  }
}
</script>

<style scoped>

</style>
