<template>
  <router-link class="linkto" :to="`workDetail/${workInfo.objectId}`">
    <el-card shadow="hover">
      <div slot="header">
        <span>{{workInfo.name}}</span>
      </div>
      <div>
        网址：{{workInfo.url}}
      </div>
      <div v-if="workInfo.desc">
        描述：{{workInfo.desc}}
      </div>
    </el-card>
  </router-link>
</template>

<script>
export default {
  name: 'WorkCard',
  methods: {
    scanWorkDetail: function () {
      window.location.href = `workDetail/${this.workInfo.objectId}`
    }
  },
  props: {
    workInfo: {
      name: String,
      url: String,
      desc: String,
      objectId: String
    }
  }
}
</script>

<style scoped>
.linkto {
  text-decoration: none;
}
</style>
