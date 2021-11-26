<template>
  <div class="layout">
    <el-container v-if="showMenu" class="container">
      <!--左侧菜单栏-->
      <el-aside class="aside">
        <!--系统名称和Log-->
        <div class="head">
          <!-- <img src="//s.weituibao.com/1582958061265/mlogo.png" alt="logo" /> -->
          <span>myAdmin</span>
        </div>
        <!--为了美观的线条-->
        <div class="line" />
        <!--菜单-->
        <el-menu background-color="#222832" text-color="#fff" router="true">
          <el-menu-item-group>
            <!-- <el-menu-item index="/">
              <i class="el-icon-data-line" />首页
            </el-menu-item> -->
            <el-menu-item index="/">
              <i class="el-icon-data-line" />学员管理
            </el-menu-item>
            <el-menu-item index="/permission">
              <i class="el-icon-data-line" />权限配置
            </el-menu-item>
            <el-menu-item index="/video">
              <i class="el-icon-data-line" />视频管理
            </el-menu-item>
            <el-menu-item index="/document">
              <i class="el-icon-data-line" />文档管理
            </el-menu-item>
            <el-menu-item index="/resource">
              <i class="el-icon-data-line" />资源管理
            </el-menu-item>
            <el-menu-item index="/test">
              <i class="el-icon-data-line" />试题管理
            </el-menu-item>
            <el-menu-item index="/categories">
              <i class="el-icon-data-line" />分类管理
            </el-menu-item>
            <el-menu-item index="/course">
              <i class="el-icon-data-line" />课程管理
            </el-menu-item>
            <el-menu-item index="/mate">
              <i class="el-icon-data-line" />标签管理
            </el-menu-item>
          </el-menu-item-group>
        </el-menu>
      </el-aside>
      <!--右侧内容栏-->
      <el-container class="content">
        <Header />
        <div class="main">
          <router-view />
        </div>
        <Fotter />
      </el-container>
    </el-container>
    <el-container v-else class="container">
      <router-view />
    </el-container>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { localGet, pathMap } from "./utils";
import Header from "./components/Header.vue";
import Fotter from "./components/Fotter.vue";
export default {
  name: "APP",
  components: {
    Header,
    Fotter,
  },
  setup() {
    // 不需要菜单的路径集合
    const noMenu = ["/login"];
    const router = useRouter();
    const state = reactive({
      showMenu: true, //是否需要显示菜单
    });
    // 监听菜单的变化
    router.beforeEach((to, from, next) => {
      if (to.path == "/login") {
        next();
      } else {
        if (!localGet("token")) {
          next("/login");
        } else {
          next();
        }
      }
      state.showMenu = !noMenu.includes(to.path);
      document.title = pathMap[to.name];
    });
    return {
      ...toRefs(state),
    };
  },
};
</script>

<style scoped>
.layout {
  min-height: 100vh;
  background-color: #ffffff;
}
.container {
  height: 100vh;
}
.aside {
  width: 200px !important;
  background-color: #222832;
}
.head {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
}
.head > div {
  display: flex;
  align-items: center;
}

.head img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
.head span {
  font-size: 20px;
  color: #ffffff;
}
.line {
  border-top: 1px solid hsla(0, 0%, 100%, 0.05);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}

.content {
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  overflow: hidden;
}
.main {
  height: calc(100vh - 100px);
  overflow: auto;
  padding: 10px;
}
</style>

<style>
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.el-menu {
  border-right: none !important;
}
.el-submenu {
  border-top: 1px solid hsla(0, 0%, 100%, 0.05);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
.el-submenu:first-child {
  border-top: none;
}
.el-submenu [class^="el-icon-"] {
  vertical-align: -1px !important;
}
a {
  color: #409eff;
  text-decoration: none;
}
.el-pagination {
  text-align: center;
  margin-top: 20px;
}
.el-popper__arrow {
  display: none;
}
</style>