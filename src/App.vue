<template>
  <div id="app">
    <el-container class="app_container">
       <el-header>Header</el-header>
     
      <el-container>
        <el-aside width="200px">
        <AsiDe></AsiDe>
      </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<script>
import Vue from "vue";
import { Container, Header, Aside, Main } from "element-ui";
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);

import AsiDe from '@/components/aside'
export default {
  name: "app",
  components: {
    AsiDe
  },
};
</script>

<style lang="less" scoped>
#app {
  height: 100%;
  width: 100%;
}
.app_container {
  height: 100vh;
}
</style>
