<template>
  <div class="Home">
    <el-form style="height: 100%">
      <el-row :gutter="20">
        <el-col :span="item.function_col" class="homeblock" :style="`max-height:${getmaxheight(item.function_height)}px;`" v-for="(item, index) in option" :key="index">
          <component :is="item.function_url"></component>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { queryPropertyIndexFunction } from "@/api/Home/Home";
import JRSRZE_120 from "./components/JRSRZE_120";
import JNSRZE_120 from "./components/JNSRZE_120";
import WJFJE_120 from "./components/WJFJE_120";
import ZHS_120 from "./components/ZHS_120";
import ZMJ_120 from "./components/ZMJ_120";
import GWJJY_120 from "./components/GWJJY_120";
import KSSF_120 from "./components/KSSF_120";
import KSKP_120 from "./components/KSKP_120";
import PJCX_120 from "./components/PJCX_120";
import NYYE_360 from "./components/NYYE_360";
import NDZJ_360 from "./components/NDZJ_360";
import GZRZ_360 from "./components/GZRZ_360";
import XGXX_360 from "./components/XGXX_360";
import QFTX_360 from "./components/QFTX_360";
export default {
  name: "Home", //name缓存 对应路由meta.title
  data() {
    return {
      option: [],
      widthtype: 4,
    };
  },
  mounted() {
    queryPropertyIndexFunction().then((response) => {
      var data = response;
      if (data) {
        this.option = data;
      }
    });
  },
  methods: {
    getmaxheight(height) {
      return window.screen.width > 1366
        ? height + 20
        : parseFloat(height) * 0.75 + 20;
    },
  },
  components: {
    JRSRZE_120,
    JNSRZE_120,
    WJFJE_120,
    ZHS_120,
    ZMJ_120,
    GWJJY_120,
    KSSF_120,
    KSKP_120,
    PJCX_120,
    NYYE_360,
    NDZJ_360,
    GZRZ_360,
    XGXX_360,
    QFTX_360,
  },
};
</script>
<style lang="scss">
.Home {
  height: 100%;
}
.homeblock {
  padding-bottom: 20px;
}
</style>
<style>
.el-col-48 {
  width: 20%;
}

.el-col-144 {
  width: 60%;
}

.el-col-96 {
  width: 40%;
}
</style>
