<template>
  <router-link class="linkto" @click.native="clickWork"
    :to="`workDetail/${workInfo.objectId}`">
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
import { mapMutations } from 'vuex'
import mutationTypes from '../store/mutationTypes'

export default {
  name: 'WorkCard',
  methods: {
    clickWork: function () {
      this[mutationTypes.changeActiveIndex]({
        curIndex: `/workDetail/${this.workInfo.objectId}`,
        curWorkName: this.workInfo.name
      })
    },
    ...mapMutations([mutationTypes.changeActiveIndex])
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
