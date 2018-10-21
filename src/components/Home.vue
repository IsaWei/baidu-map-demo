<template>
  <div>
    <nav-bar></nav-bar>
    <router-view/>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
export default {
  name: 'home',
  data () {
    return {}
  },
  components: {
    NavBar
  }
}
</script>
<style scoped>
</style>
