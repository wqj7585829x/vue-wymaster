<template>
  <div class="layout" :class="[this.flag ? 'hideSidebar' : '']">
    <!-- 顶部top -->
    <headertop></headertop>
    <!-- 左边菜单 -->
    <sidebar></sidebar>
    <!-- icon_arrow中间按钮切换 -->
    <div class="icon_arrow">
      <a href="javascript:void(0);" @click="displaynavbar()"></a>
    </div>
    <!-- 公共内容区域 -->
    <div class="layout-container">
      <!-- 多页签tags -->
      <tags-view></tags-view>
      <!-- 面包屑 -->
      <breadcrumb class="breadmbx"></breadcrumb>
      <!-- app-main内容区域router-view -->
      <app-main class="appmain"></app-main>
    </div>
    <!-- 设置全局loading -->
    <div class="loadingtext" v-show="HomeLoading"></div>
  </div>
</template>
<script>
import {
  Headertop,
  Sidebar,
  TagsView,
  Breadcrumb,
  AppMain,
} from "@/views/Layout/components";
import { monthMessageApi } from "@/api/Common/monthMessage";
export default {
  name: "Layout",
  watch: {
    $route(to, from) {
      if (
        to.path == "/FeeManagement/ReceivablesRegister" ||
        to.path.indexOf("/ReportManagement") > -1
      ) {
        this.flag = true;
      }
      if (to.path == "/Home") {
        this.HomeLoading = false;
      } else {
        this.HomeLoading = true;
      }
    },
  },
  mounted() {
    if (this.$route.path == "/Home") {
      this.HomeLoading = false;
    }
    // this.monthMessage()//月结提示框
  },
  data() {
    return {
      flag: false,
      showdialog: false,
      HomeLoading: true,
    };
  },
  components: {
    Headertop,
    Sidebar,
    TagsView,
    Breadcrumb,
    AppMain,
  },
  methods: {
    //切换菜单显示隐藏
    displaynavbar() {
      this.flag = !this.flag;
    },
    //月结提示框---登录判断是否已到月结时间
    monthMessage() {
      monthMessageApi().then((response) => {
        if (response.returnStatus === "SUCCESS") {
          if (sessionStorage.getItem("montFlag") == "true") {
            this.$confirm(response.data.message, "月结", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
              closeOnClickModal: false,
              center: true,
            })
              .then(() => {
                //跳转月结页面
                this.$router.push("/FeeManagement/Monthknots");
                sessionStorage.setItem("montFlag", false); //点确认后刷新页面不提示提示框
              })
              .catch(() => {
                //取消月结
                sessionStorage.setItem("montFlag", false); //点取消后刷新页面不提示提示框
              });
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.icon_arrow {
  position: fixed;
  top: 50%;
  left: 220px;
  z-index: 100;
}
.icon_arrow a {
  position: absolute;
  width: 24px;
  height: 92px;
  outline: none;
  background: url("../../assets/comImgs/icon_arrow.png") no-repeat 0 0;
  cursor: pointer;
}
.icon_arrow a:hover {
  background-position: -28px 0;
}
.layout-container {
  position: absolute;
  top: 50px;
  left: 220px;
  right: 0;
  bottom: 0;
  transition: left 0.3s ease-in-out;
  overflow: auto;
  overflow-y: auto;
}
.hideSidebar .slidercontent {
  left: -220px;
  width: 0;
}
.hideSidebar .icon_arrow {
  left: 0;
}
.hideSidebar .icon_arrow a {
  background-position: 0px -92px;
}
.hideSidebar .icon_arrow a:hover {
  background-position: -28px -92px;
}
.hideSidebar .layout-container {
  left: 0;
}
.breadmbx {
  padding-left: 36px;
  padding-top: 10px;
  padding-bottom: 10px;
  display: none;
}
.appmain {
  margin: 0 10px;
}
.loadingtext {
  z-index: 1000000;
}
</style>
