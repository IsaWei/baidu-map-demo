<template id="child-map">
  <div id="map" :style="style"></div>
</template>

<script>
import BMap from 'BMap'
export default {
  data () {
    return {
      style: {
        width: '100%',
        height: this.m.height + 'px'
      }
    }
  },
  props: ['m'],
  methods: {

  },
  mounted () {
    // var map = new BMap.Map("map");
    // var point = new BMap.Point(this.longitude,this.latitude);
    // map.centerAndZoom(point, 12);
    // var marker = new BMap.Marker(point);// 创建标注
    // map.addOverlay(marker);
    var map = new BMap.Map('map')
    var point = new BMap.Point(this.m.longitude, this.m.latitude)
    var point2 = new BMap.Point(116.412222, 39.912345)
    map.centerAndZoom(point, 15)
    // 创建标注
    var marker = new BMap.Marker(point)
    // 创建标注2（故宫）
    var marker2 = new BMap.Marker(point2)
    // 将标注添加到地图中
    map.addOverlay(marker)
    addClickHandler('地址：北京天安门', marker)
    // 将标注添加到地图中
    map.addOverlay(marker2)
    addClickHandler('地址：故宫博物院', marker2)
    // eslint-disable-next-line
    marker.setAnimation(BMAP_ANIMATION_BOUNCE)
    // eslint-disable-next-line
    marker2.setAnimation(BMAP_ANIMATION_DROP)

    function addClickHandler (content, marker) {
      marker.addEventListener('click', function (e) {
        console.log('--click--')
        openInfo(content, e)
      })
    }
    function openInfo (content, e) {
      var p = e.target
      var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat)
      let opts = {
        width: 250,
        height: 80,
        title: '信息窗口',
        enableMessage: true
      }
      var infoWindow = new BMap.InfoWindow(content, opts)
      map.openInfoWindow(infoWindow, point)
    }
  }
}
</script>
