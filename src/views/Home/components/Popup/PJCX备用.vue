<template>
  <div class="Pjcxhome container" id="pjcxhome">
    <div ref="tabbarReft">
      <el-tabs v-model="skzxcomp" @tab-click="handleClick">
        <el-tab-pane label="票据" name="PJCX"></el-tab-pane>
        <!-- <el-tab-pane label="电子发票" name="PJCXelectron"></el-tab-pane> -->
      </el-tabs>
    </div>

    <!-- 各个模块组件 -->
    <!-- <keep-alive> -->
    <component :is="skzxcomp" ref="NavCompChildren"></component>
    <!-- </keep-alive> -->
  </div>
</template>
<script>
import PJCX from "./components/PJCX"; //票据
import PJCXelectron from "./components/PJCXelectron"; //电子发票
export default {
  components: {
    PJCX,
    PJCXelectron,
  },
  data() {
    return {
      skzxcomp: "PJCX",
      tableHeight: "",
    };
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.$refs.NavCompChildren.getPartitionData();
      }, 1000);
    });
  },
  methods: {
    handleClick(tab, event) {
      this.skzxcomp = tab.name;
      this.$nextTick(function () {
        this.$refs.NavCompChildren.getPartitionData();
      });
    },
    getInitial(val) {
      this.tableHeight = val;
    },
  },
};
</script>

<style lang="scss" scope>
.Pjcxhome {
  padding-top: 10px !important;
  .el-tabs__nav-wrap::after {
    display: none;
  }
  .el-tabs__item.is-active {
    color: #2e8ad7;
  }
  .el-tabs__active-bar {
    background-color: #2e8ad7;
    height: 3px;
  }
}
</style>
