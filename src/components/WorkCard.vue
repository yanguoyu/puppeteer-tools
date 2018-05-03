<template>
  <el-card class="box-card" shadow="hover">
    <div slot="header" class="clearfix">
      <span>{{workInfo.name}}</span>
    </div>
    <div>
      网址：{{workInfo.url}}
    </div>
    <div v-if="workInfo.desc">
      描述：{{workInfo.desc}}
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'WorkCard',
  props: {
    workInfo: {
      name: String,
      url: String,
      desc: String
    }
  }
}
</script>

<style scoped>
.box-card {
  cursor: pointer;
}
</style>
