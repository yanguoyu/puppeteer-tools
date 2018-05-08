<template>
  <el-row>
    <el-col :span="8">
      <el-input :value="value.selector" placeholder="请输入选择元素" v-on:input="changeValues($event,'selector')"/>
    </el-col>
    <el-col :span="8" :offset="1">
      <el-input :value="value.selectIndex" placeholder="请输入选择元素索引" v-on:input="changeValues($event,'selectIndex')"/>
    </el-col>
    <el-col :span="6" :offset="1">
      <el-button v-if="isFirst" @click="$emit('addItem')">新增操作</el-button>
      <el-button v-if="!isFirst" @click="$emit('removeItem')">删除操作</el-button>
    </el-col>
    <el-col :span="24" class="splider"/>
    <el-col :span="8">
      <el-select :value="value.eventType" placeholder="操作类型" v-on:input="changeValues($event,'eventType')">
        <el-option label="Click" value="Click"/>
        <el-option label="Hover" value="Hover"/>
        <el-option label="Focus" value="Focus"/>
        <el-option label="KeyDown" value="KeyDown"/>
        <el-option label="Input" value="Input"/>
      </el-select>
    </el-col>
    <el-col :span="8" :offset="1">
      <el-input :value="value.value" placeholder="操作值" v-on:input="changeValues($event,'value')"/>
    </el-col>
    <el-col :span="6" :offset="1">
      是否等待加载
      <el-switch :value="value.waitForNavigation"
        v-on:input="changeValues($event,'waitForNavigation')"/>
    </el-col>
  </el-row>
</template>

<script>
export default {
  methods: {
    changeValues: function (value, name) {
      const newValue = {
        selector: this.value.selector,
        selectIndex: this.value.selectIndex,
        eventType: this.value.eventType,
        value: this.value.value,
        waitForNavigation: this.value.waitForNavigation,
        [name]: value
      }
      this.$emit('input', newValue)
    }
  },
  props: {
    value: {
      selector: String,
      selectIndex: Number,
      eventType: String,
      value: String,
      waitForNavigation: Boolean
    },
    isFirst: Boolean
  }
}
</script>

<style>
.splider {
  margin-top: 10px;
}
</style>
