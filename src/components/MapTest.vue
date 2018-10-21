<template>
  <div id="app">
    <h2>vue+webpack+axios+百度地图-->实现父子组件的通信</h2>
    <h3>示例一：跳跃的图标(没有使用axios)</h3>
    <MapView :m="giveData"></MapView>
  </div>
</template>

<script>
import MapView from '@/components/Map.vue'

export default {
  data () {
    return {
      giveData: {
        height: 800,
        width: 600,
        longitude: 116.404,
        latitude: 39.915
      },
      giveOutData: {
        height: 400,
        width: 400,
        longitude: 116.417854,
        latitude: 39.921988
      }
    }
  },
  components: {
    MapView
  }
}
</script>

<style>

</style>
