<template>
  <div class="slidercontent">
    <!-- 左边logo与首页按钮 -->
    <el-scrollbar style="height: 100%; overflow-x: hidden">
      <div class="complogoHome">
        <!-- <span class="complogo"><img :src="require('@/assets/comImgs/zhbylogo.png')"></span> -->
        <!-- <span class="compHome"><img :src="require('@/assets/comImgs/sliderHomebtn.png')" @click="homebtn()"></span> -->
        <span class="complogo"><img :src="LogoImg" id="LogoImg" /></span>
        <span class="compHome" @click="homebtn()"><span>回到首页</span></span>
      </div>
      <div class="menucontent">
        <!-- 左边导航菜单 unique-opened单个展开 -->
        <el-menu mode="vertical" :default-active="$route.name">
          <!-- 左边菜单组件 -->
          <sidebar-item :routes="oldrouters"></sidebar-item>
        </el-menu>
      </div>
    </el-scrollbar>
  </div>
</template>

<script>
import SidebarItem from "./SidebarItem";
import { mapGetters } from "vuex";
export default {
  components: {
    SidebarItem,
  },
  computed: {
    ...mapGetters(["oldrouters"]),
    // routes(){
    //   return this.$router.options.routes
    // }
  },
  data() {
    return {
      LogoImg: require("@/assets/comImgs/zhbylogo.png"),
    };
  },
  mounted() {
    if (location.hostname.indexOf("xmtfwy") > -1) {
      //特房logo
      this.LogoImg = require("@/assets/comImgs/xmtfwy.png");
    }
    //logo替换start
    var HomelogoReplace = JSON.parse(localStorage.getItem("arrmenuName"));
    if (HomelogoReplace.length) {
      //判断如果数组不为空
      HomelogoReplace.forEach((item) => {
        if (item.type == 2) {
          if (item.code == "logo" && item.value != "") {
            //登录页背景替换
            this.LogoImg = item.value;
          }
        }
      });
    }
    //logo替换end
  },
  methods: {
    homebtn() {
      this.$router.push("/");
    },
  },
};
</script>
<style lang="scss" scoped>
.slidercontent {
  position: absolute;
  top: 40px;
  bottom: 0;
  left: 0;
  width: 220px;
  overflow: auto;
  z-index: 10;
  .complogoHome {
    height: 200px;
    width: 100%;
    background: none;
    .complogo {
      display: block;
      margin: 0 auto;
      text-align: center;
      padding-top: 38px;
      padding-bottom: 24px;
    }
    .compHome {
      display: block;
      width: 150px;
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      color: #fff;
      margin: 0 auto;
      text-align: center;
      cursor: pointer;
    }
  }
}
</style>
