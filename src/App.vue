<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  margin: 0;
}

#app a {
  text-decoration: none;
}

html, body, #app{
  height: 100%;
}

</style>
