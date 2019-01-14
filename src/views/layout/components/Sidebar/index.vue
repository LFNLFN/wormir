<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <img v-show="$store.state.app.sidebar.opened" src="../../../../assets/home-page-pic/logo.png" alt="" id="sidebar-pic-open">
    <img v-show="!$store.state.app.sidebar.opened" src="../../../../assets/home-page-pic/mini-logo.png" alt="" id="sidebar-pic-close">
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#2f81b7"
    >
      <sidebar-item :routes="permission_routers"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  #sidebar-pic-open {
    box-sizing: border-box;
    padding-right: 10px;
    width: 300px;
    background-color: #fff;
  }
  #sidebar-pic-close {
    box-sizing: border-box;
    width: 36px;
    padding: 2px;
  }
</style>
