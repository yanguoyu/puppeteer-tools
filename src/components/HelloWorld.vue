<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{ userInfo }}</h2>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'HelloWorld',
  methods: {

  },
  created: function () {
    this.$store.dispatch('increment')
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed: {
    ...mapState({
      // 箭头函数可使代码更简练
      userInfo: state => state.home.userInfo
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
