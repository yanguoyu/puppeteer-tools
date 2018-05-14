<template>
  <el-row>
    <el-col :span="8">
      <el-select :value="value.opType" placeholder="期望类型" v-on:input="changeValues($event,'opType')">
        <el-option label="属性" value="Attribute"/>
        <el-option label="内容" value="Content"/>
        <el-option label="图片" value="PageShot"/>
      </el-select>
    </el-col>
    <el-col :span="8" v-if="value.opType==='Attribute'" :offset="1">
      <el-input :value="value.name" placeholder="输入属性名称" v-on:input="changeValues($event,'name')"/>
    </el-col>
    <el-col :span="24" class="splider"/>
    <el-col :span="8">
      <el-input :value="value.select" placeholder="请输入选择元素" v-on:input="changeValues($event,'select')"/>
    </el-col>
    <el-col :span="8" :offset="1">
      <el-input :value="value.sameSelectIndex" placeholder="请输入选择元素索引" v-on:input="changeValues($event,'sameSelectIndex')"/>
    </el-col>
    <el-col :span="24" class="splider"/>
    <el-col :span="8">
      <el-switch active-text='获取内容' inactive-text= '对比测试'
        :value="value.onlyGet" v-on:input="changeValues($event,'onlyGet')"/>
    </el-col>
    <el-col :span="9" v-if="!value.onlyGet" :offset="1">
      使用第一次执行结果比较
      <el-switch :value="value.useFirst" v-on:input="changeValues($event,'useFirst')"/>
    </el-col>
    <el-col :span="6" v-if="!value.onlyGet && !value.useFirst">
      是否使用SQL
      <el-switch :value="value.useSql" v-on:input="changeValues($event,'useSql')"/>
    </el-col>
    <el-col :span="24" class="splider"/>
    <el-col :span="8" v-if="!value.onlyGet && !value.useFirst">
      <el-input :value="value.value" :placeholder="value.useSql?'输入sql语句':'输入期望值'" v-on:input="changeValues($event,'value')"/>
    </el-col>
    <el-col :span="8" v-if="!value.onlyGet && !value.useFirst && value.useSql" :offset="1">
      <el-input :value="value.sqlGetIndex" placeholder="sql数据获取" v-on:input="changeValues($event,'sqlGetIndex')"/>
    </el-col>
  </el-row>
</template>

<script>
export default {
  methods: {
    changeValues: function (value, name) {
      const preValue = JSON.parse(JSON.stringify(this.value))
      const newValue = {
        ...preValue,
        [name]: value
      }
      this.$emit('input', newValue)
    }
  },
  props: {
    value: {
      opType: String,
      useFirst: Boolean,
      onlyGet: Boolean,
      name: String,
      value: String,
      select: String,
      sameSelectIndex: Number,
      useSql: Boolean,
      sqlGetIndex: String
    }
  }
}
</script>

<style>
.splider {
  margin-top: 10px;
}
</style>
