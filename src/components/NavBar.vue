<!--头部导航-->
<template>
  <div class="navbar-box">
    <div class="title-box"><p>未来蓝天生物质炊暖炉</p></div>
    <div class="operation-box">
      <div v-for="(item,key) in operationList" :key="key" :index="key" class="sig-operation"
           @click="handleRouter(item['path'])">
        <img src="../assets/bill.png" alt="">
        <p>{{item['title']}}</p>
      </div>
    </div>
    <div class="setting-box">
      <div class="setting-icon"></div>
      <div class="user-info">
        <img src="../assets/setting.png" alt="">
        <p>WX11111111111</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nav-bar',
  data () {
    return {
      operationList: [
        {'title': '运行分析', 'icon': '../assets/bill.png'},
        {'title': '设备运维', 'icon': '../assets/tools.png'},
        {'title': '销售台账', 'icon': '../assets/bill.png'},
        {'title': '出场调试', 'icon': '../assets/debug.png', path: 'debug'}
      ]
    }
  },
  methods: {
    handleRouter (path) {
      this.$router.push({name: path})
    }
  }
}
</script>
<style scoped lang="stylus">
  .navbar-box {
    width: 100vw
    height: 90px
    background #06123f
    display flex
    & > div {
      display inline
      color: #ffffff
    }
    .title-box {
      flex: 3
      p {
        font-size: 32px;
        margin-left: 46px;
        margin-top: 23px;
      }
    }
    .operation-box {
      flex: 2
      display: flex
      .sig-operation {
        font-size 16px
        position relative
        margin-left 50px
        img {
          position absolute
          top: 17px;
          left: 21px
        }
        p {
          margin-top 55px
        }
      }
    }
    .setting-box {
      flex: 2
      position relative
      .setting-icon {
        height 21px
        background-image url("../assets/setting.png")
        background-repeat no-repeat
        position: absolute;
        top: 33px;
        right: 220px;
        width: 77px;
        border-right: 1px solid #ffffff;
        &:after {
          content: '设置'
          font-size: 16px;
          position: absolute;
          top: -1px;
          left: 23px;
        }
      }
      .user-info {
        font-size 16px
        position relative
        img {
          position: absolute;
          right: 174px;
          top: 32px;
        }
        p {
          position: absolute;
          right: 36px;
          top: 16px;
        }
      }
    }
  }
</style>
