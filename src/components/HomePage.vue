<template>
  <div class="hello">
    <el-menu
      mode="horizontal">
      <el-menu-item index="1">首页</el-menu-item>
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
    <el-row>
      <el-col  class="workInfoItems" :span="6"
        :key="index" v-for="(workinfo, index) in allWorkInfo" >
        <workCard v-bind:workInfo="workinfo">
        </workCard>
      </el-col>
    </el-row>
    <div class="footer">
      <el-button size="small" >快速入门</el-button>
      <el-button @click="dialogVisible = true" size="small" type="primary">新建工程</el-button>
    </div>
    <el-dialog
      title="创建工程"
      :visible.sync="dialogVisible"
      width="800">
      <el-form :model="newWork" status-icon ref="newWorkForm" label-width="100px">
        <el-form-item :rules="[
              { required: true, whitespace: true, message: '工程名称不能为空'},
              { pattern: '^[^\\s]{1,10}$', message: '工程名称不超过10位'}
          ]"
          label="工程名称" prop="name">
          <el-input v-model="newWork.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :rules="[
              { required: true , whitespace: true, message: '网站地址不能为空'},
              { type: 'url', message: '格式为网址'}
          ]"
          label="网站" prop="url">
          <el-input v-model="newWork.url" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item :rules="[
              { min: 0, max: 30, message: '描述不能超过30个字符'}
          ]"
          label="描述" prop="desc">
          <el-input v-model="newWork.desc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveWorkInfo">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import actionTypes from '../store/actionTypes'
import WorkCard from './WorkCard'

export default {
  name: 'HomePage',
  components: {
    'workCard': WorkCard
  },
  methods: {
    saveWorkInfo: function (e) {
      e.preventDefault()
      this.$refs.newWorkForm.validate((valid) => {
        if (valid) {
          this[actionTypes.saveWork](this.newWork)
          this.dialogVisible = false
          this.newWork = {}
          this.$refs.newWorkForm.resetFields()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    ...mapActions([
      actionTypes.getTaskInfo,
      actionTypes.logOut,
      actionTypes.getAllWorkInfo,
      actionTypes.saveWork
    ])
  },
  beforeMount: function () {
    this[actionTypes.getAllWorkInfo]()
  },
  created: function () {
    this.$store.dispatch('increment')
  },
  data () {
    return {
      dialogVisible: false,
      newWork: {
        name: null,
        url: null,
        desc: null
      }
    }
  },
  computed: {
    ...mapState({
      // 箭头函数可使代码更简练
      userInfo: state => state.home.userInfo,
      allWorkInfo: state => state.home.allWorkInfo
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.userInfo {
  float: right;
}

.footer {
  margin: 20px;
}

.workInfoItems {
  padding: 10px;
}
</style>
