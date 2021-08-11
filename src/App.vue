<template>
  <div id="app">
<!--    exclude排除Detail组件，使得每次点击详情页面都更新数据-->
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <MainTabBar/>
  </div>
</template>

<script>
import MainTabBar from "@/components/content/mainTabbar/MainTabBar";

export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
body{
  margin: 0;
  padding: 0;
}
</style>
