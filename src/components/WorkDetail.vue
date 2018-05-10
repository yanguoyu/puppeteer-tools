<template>
  <div class="main">
    <el-form :inline="true" :model="taskFilter">
      <el-form-item label="任务名称">
        <el-input v-model="taskFilter.name" placeholder="任务名称" size="small"></el-input>
      </el-form-item>
      <el-form-item label="任务状态">
        <el-select v-model="taskFilter.status" placeholder="任务状态" size="small">
          <el-option label="未执行" value="noExcute"></el-option>
          <el-option label="执行成功" value="success"></el-option>
          <el-option label="执行失败" value="failed"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small">查询</el-button>
      </el-form-item>
      <el-form-item class="new-task">
        <el-button type="primary" size="small" @click="opDialogVisible=true">新增常用操作</el-button>
        <el-button type="primary" size="small" @click="dialogVisible=true">新增任务</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="allTaskInfo" :row-class-name="tableRowClassName" class="task-tables">
      <el-table-column prop="name" label="名称"/>
      <el-table-column prop="createdAt" label="创建时间" :formatter="formatTime"/>
      <el-table-column prop="updatedAt" label="最后更新时间" :formatter="formatTime"/>
      <el-table-column prop="lastStatus" label="状态">
        <template slot-scope="scope">
          <span>{{ getStatusText(scope.row.lastStatus) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="viewTaskInstance(scope.row.objectId)">查看执行实例</el-button>
          <el-button type="text" :disabled="scope.row.lastStatus === 'pending'"
            @click="excuteTask({index: scope.$index, workId: $route.params.workId})">
            {{ scope.row.lastStatus === 'pending' ?'执行中': '手动执行' }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <newTask v-bind:dialogVisible.sync="dialogVisible" />
    <el-dialog
      title="任务执行实例"
      :visible.sync="taskInstanceVisiable"
      width="60%">
        <el-table :data="taskInsInfos" :row-class-name="tableRowInsClassName" class="task-tables">
            <el-table-column prop="updatedAt" label="执行时间" :formatter="formatTime"/>
            <el-table-column prop="status" label="状态">
              <template slot-scope="scope">
                <span>{{ scope.row.status===true?'成功': "失败"}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="value" label="执行结果"/>
        </el-table>
    </el-dialog>
    <el-dialog
      title="新增常用操作"
      :visible.sync="opDialogVisible"
      width="800">
      <el-form :model="operatorItems" status-icon ref="operatorItems" label-width="100px">
        <el-form-item :rules="[
              { required: true, whitespace: true, message: '常用操作名称不能为空'},
              { pattern: '^[^\\s]{1,10}$', message: '常用操作名称不超过10位'}
          ]"
          label="操作名称" prop="name">
          <el-input v-model="operatorItems.name" auto-complete="off" placeholder="常用操作名称"/>
        </el-form-item>
        <el-form-item label="常用操作项" prop="items">
          <operator-model class="operator-item"
            :key="index" @removeItem="operatorItems.items.splice(index)"
            :isFirst="index===0" @addItem="operatorItems.items.push({})"
            v-for="(operator, index) in operatorItems.items"
            v-model="operatorItems.items[index]"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="opDialogVisible=false">取消</el-button>
        <el-button type="primary" @click.prevent="saveOperatorClick">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import actionTypes from '../store/actionTypes'
import NewTask from './NewTask'
import untils from '../shared/untils/index'
import OperatorModel from './OperatorModel'
import moment from 'moment'

export default {
  name: 'NewWork',
  components: {
    newTask: NewTask,
    OperatorModel: OperatorModel
  },
  data () {
    return {
      taskFilter: {
        name: '',
        status: null
      },
      dialogVisible: false,
      opDialogVisible: false,
      taskInsInfos: [],
      taskInstanceVisiable: false,
      operatorItems: {
        name: null,
        items: [{}]
      }
    }
  },
  created: function () {
    this[actionTypes.getAllTask](this.$route.params.workId)
  },
  methods: {
    getPageModel: function () {
      this[actionTypes.getUrlPageAc]({pageUrl: this.pageUrl, selector: this.selector})
    },
    saveOperatorClick: function () {
      this.opDialogVisible = false
      this[actionTypes.saveOperator]({operator: this.operatorItems, workId: this.$route.params.workId})
      this.operatorItems = {
        name: null,
        items: [{}]
      }
    },
    viewTaskInstance: function (taskId) {
      this.taskInstanceVisiable = true
      untils.createApi.get({
        config: {
          url: '/getTaskInstance',
          params: {
            taskId
          }
        },
        success: (res) => {
          this.taskInsInfos = res
        }
      })
    },
    tableRowClassName ({row, rowIndex}) {
      if (row.lastStatus === true) {
        return 'success-row'
      } else if (row.lastStatus === false) {
        return 'failed-row'
      } else if (row.lastStatus === 'pending') {
        return 'pending-row'
      }
      return 'no-excute-row'
    },
    getStatusText (status) {
      if (status === true) {
        return '成功'
      } else if (status === false) {
        return '失败'
      } else if (status === 'pending') {
        return '执行中'
      }
      return '未执行'
    },
    tableRowInsClassName ({row}) {
      if (row.status === true) {
        return 'success-row'
      }
      return 'failed-row'
    },
    formatTime (row, column, cellValue) {
      return moment(cellValue).format('YYYY-MM-DD hh:mm:ss')
    },
    ...mapActions([
      actionTypes.getUrlPageAc,
      actionTypes.excuteTask,
      actionTypes.getAllTask,
      actionTypes.saveOperator
    ])
  },
  computed: {
    ...mapState({
      allTaskInfo: state => state.work.allTaskInfo
    })
  }
}
</script>

<style>
.main {
  margin: 1em;
}

.new-task {
  float: right;
}

.new-task::after {
  clear: both;
}

.task-tables .no-excute-row {
  color: #909399;
}

.task-tables .failed-row {
  color: #F56C6C;
}

.task-tables .success-row {
  color: #67C23A;
}

.task-tables .pending-row {
  color: #40a9ff;
}

</style>
