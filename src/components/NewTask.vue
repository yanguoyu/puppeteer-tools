<template>
  <div>
    <el-dialog
      title="创建任务"
      :visible.sync="displayStatus"
      >
      <el-form :model="taskInfo" ref="taskInfo" label-width="100px">
        <el-form-item :rules="[
              { required: true, whitespace: true, message: '任务名称不能为空'},
              { pattern: '^[^\\s]{1,10}$', message: '任务名称不超过10位'}
          ]"
          label="任务名称" prop="name">
          <el-input v-model="taskInfo.name" auto-complete="off" placeholder="任务名称"/>
        </el-form-item>
        <el-form-item label="前置操作" prop="preOp">
          <el-button @click="addPreOp" size="small">新增前置操作</el-button>
          <el-tag :key="index" class="preOp"
            v-for="(tag, index) in taskInfo.preOp" closable :disable-transitions="false" @close="removePre(index)">
            {{tag.name}}
          </el-tag>
        </el-form-item>
        <el-form-item label="操作" prop="operatorItem" >
          <operator-model class="operator-item"
            :key="index" @removeItem="taskInfo.operatorItems.splice(index)"
            :isFirst="index===0" @addItem="taskInfo.operatorItems.push({})"
            v-for="(operator, index) in taskInfo.operatorItems"
            v-model="taskInfo.operatorItems[index]"/>
        </el-form-item>
        <el-form-item
          label="期望" prop="opType">
          <expect v-model="taskInfo.expectModel"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click.prevent="saveTaskInfo">保存</el-button>
      </span>
    </el-dialog>
    <el-dialog title="选择前置操作" :visible.sync="visiblePre">
      <el-table :data="allComOp">
        <el-table-column prop="name" label="操作名称" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type='text' @click="chooseOp(scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import actionTypes from '../store/actionTypes'
import OperatorModel from './OperatorModel'
import Expect from './Expect'
import untils from '../shared/untils/index'

export default {
  name: 'NewTask',
  props: {
    dialogVisible: Boolean
  },
  components: {
    OperatorModel: OperatorModel,
    Expect: Expect
  },
  mounted: function () {
    this.workId = this.$route.params.workId
  },
  computed: {
    displayStatus: {
      get: function () {
        return this.dialogVisible
      },
      set: function (newValue) {
        this.$emit('update:dialogVisible', newValue)
      }
    }
  },
  methods: {
    closeDialog: function () {
      this.$emit('update:dialogVisible', false)
      this.taskInfo = {
        operatorItems: [{}],
        expectModel: {
          opType: 'PageShot',
          useFirst: true,
          onlyGet: true
        },
        preOp: []
      }
      this.$refs.taskInfo.resetFields()
    },
    saveTaskInfo: function () {
      this.$refs.taskInfo.validate((valid) => {
        if (valid) {
          this[actionTypes.saveTask]({taskInfo: JSON.parse(JSON.stringify(this.taskInfo)), workId: this.workId})
          this.closeDialog()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    removePre: function (index) {
      this.taskInfo.preOp.splice(index, 1)
    },
    chooseOp: function (choosedOp) {
      this.visiblePre = false
      this.taskInfo.preOp.push(choosedOp)
    },
    addPreOp: function () {
      this.visiblePre = true
      untils.createApi.get({
        config: {
          url: '/getOperatorItems',
          params: {
            workId: this.$route.params.workId
          }
        },
        success: (res) => {
          this.allComOp = res
        }
      })
    },
    ...mapActions([
      actionTypes.saveTask,
      actionTypes.getTaskInfo
    ])
  },
  data: function () {
    return {
      taskInfo: {
        operatorItems: [{}],
        expectModel: {
          opType: 'PageShot',
          useFirst: true,
          onlyGet: true
        },
        preOp: []
      },
      workId: null,
      allComOp: [],
      visiblePre: false
    }
  }
}
</script>

<style>
.operator-item {
  margin-bottom: 10px;
}
.preOp {
  margin-right: 10px;
}
</style>
