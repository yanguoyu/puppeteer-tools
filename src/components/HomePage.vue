<template>
  <div>
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
      <el-form :model="newWork" ref="newWorkForm" label-width="100px">
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
        <el-row>
          <el-col :span="12">
            <el-form-item :rules="[
                  { required: true , message: '请输入定时间隔'},
                  { type: 'integer',  message: '只能为整数'},
                  { type: 'number', min: 1,  max: 60, message: '取值范围为1-60'}
              ]"
              label="定时执行" prop="cycleTime">
              <el-input v-model.number="newWork.cycleTime" auto-complete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="cycleTimeType">
              <el-select v-model="newWork.cycleTimeType" placeholder="定时时间类型">
                <el-option label="分钟" value="Minute"></el-option>
                <el-option label="小时" value="Hour"></el-option>
                <el-option label="天" value="Day"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="启动数据库" prop="useSql">
          <el-switch v-model="newWork.useSql"/>
        </el-form-item>
        <el-row v-if="newWork.useSql">
          <el-col :span="10">
            <el-form-item label="数据库配置" prop="dbInfo.host" :rules="[
                  { required: true , message: '请输入host'}
              ]">
              <el-input v-model="newWork.dbInfo.host" placeholder="请输入host" />
            </el-form-item>
          </el-col>
          <el-col :span="5" :offset="1">
            <el-form-item prop="dbInfo.port" label-width='0px' :rules="[
                  { required: true , message: '请输入port'}
              ]">
              <el-input v-model="newWork.dbInfo.port" placeholder="请输入port" />
            </el-form-item>
          </el-col>
          <el-col :span="5" :offset="1">
            <el-form-item prop="dbInfo.database" label-width='0px' :rules="[
                  { required: true , message: '请输入database'}
              ]">
              <el-input v-model="newWork.dbInfo.database" placeholder="请输入database" />
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="dbInfo.user" :rules="[
                  { required: true , message: '请输入用户名'}
              ]">
              <el-input v-model="newWork.dbInfo.user" placeholder="请输入用户名" />
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset="1">
            <el-form-item prop="dbInfo.password" label-width='0px' :rules="[
                  { required: true , message: '请输入密码'}
              ]">
              <el-input type="password" v-model="newWork.dbInfo.password" placeholder="请输入密码" />
            </el-form-item>
          </el-col>
        </el-row>
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
          this[actionTypes.saveWork](JSON.parse(JSON.stringify(this.newWork)))
          this.dialogVisible = false
          this.newWork = {
            cycleTime: 1,
            cycleTimeType: 'Hour',
            useSql: false,
            dbInfo: {
            }
          }
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
  data () {
    return {
      dialogVisible: false,
      newWork: {
        name: null,
        url: null,
        desc: null,
        cycleTime: 1,
        cycleTimeType: 'Hour',
        useSql: false,
        dbInfo: {
        }
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
