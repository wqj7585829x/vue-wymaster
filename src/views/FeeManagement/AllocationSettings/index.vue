<template>
  <div class="container AllocationSettings">
    <div class="nav_barHeight">
      <ul class="nav-bar">
        <li
          class="nav-li"
          @click="NavSwich('DivideTable', 1)"
          v-if="AlloDivideTable_has()"
        >
          <span :class="{ on: isCheck == 1 }">走表分摊</span>
        </li>
        <li
          class="nav-li"
          @click="NavSwich('GeneralTable', 2)"
          v-if="AlloGeneralTable_has()"
        >
          <span :class="{ on: isCheck == 2 }">总表设置</span>
        </li>
        <li
          class="nav-li"
          @click="NavSwich('SetRelation', 3)"
          v-if="AlloSetRelation_has()"
        >
          <span :class="{ on: isCheck == 3 }">关系设定</span>
        </li>
      </ul>
    </div>
    <div class="bar-body">
      <!-- 各个模块组件 -->
      <!-- <keep-alive> -->
      <component :is="skzxcomp" ref="NavCompChildren"></component>
      <!-- </keep-alive> -->
    </div>
  </div>
</template>
<script>
import DivideTable from "./DivideTable"; //走表分摊
import GeneralTable from "./GeneralTable"; //总表设置
import SetRelation from "./SetRelation"; //关系设定
export default {
  name: "AllocationSettings",
  data() {
    return {
      skzxcomp: "DivideTable", //默认选中走表分摊
      isCheck: 1,
    };
  },
  mounted() {
    this.isCheck = this.AlloDivideTable_has()
      ? 1
      : this.AlloGeneralTable_has()
      ? 2
      : this.AlloSetRelation_has()
      ? 3
      : 0;
    this.skzxcomp = this.AlloDivideTable_has()
      ? "DivideTable"
      : this.AlloGeneralTable_has()
      ? "GeneralTable"
      : this.AlloSetRelation_has()
      ? "SetRelation"
      : "";
    this.$nextTick(function () {
      this.$refs.NavCompChildren.getRowTable();
    });
  },
  methods: {
    AlloDivideTable_has() {
      //走表分摊权限
      if (
        sessionStorage
          .getItem("buttenpremissions")
          .indexOf("AlloDivideTable_has") > -1
      ) {
        return true;
      } else {
        return false;
      }
    },
    AlloGeneralTable_has() {
      //总表设置权限
      if (
        sessionStorage
          .getItem("buttenpremissions")
          .indexOf("AlloGeneralTable_has") > -1
      ) {
        return true;
      } else {
        return false;
      }
    },
    AlloSetRelation_has() {
      //关系设定权限
      if (
        sessionStorage
          .getItem("buttenpremissions")
          .indexOf("AlloSetRelation_has") > -1
      ) {
        return true;
      } else {
        return false;
      }
    },
    /**标签选项切换*/
    NavSwich(val, index) {
      this.skzxcomp = val;
      this.isCheck = index;
      this.$nextTick(function () {
        this.$refs.NavCompChildren.getRowTable();
      });
    },
  },
  components: {
    DivideTable,
    GeneralTable,
    SetRelation,
  },
};
</script>
<style lang="scss" scoped>
.AllocationSettings {
  padding: 0;
  padding-top: 36px;
  .nav_barHeight {
    height: 36px;
    margin-top: -36px;
  }
  .nav-bar {
    background: #ebecf2;
    margin: 0;
    padding: 0;
    height: 36px;
    line-height: 36px;
    .nav-li {
      position: relative;
      list-style-type: none;
      float: left;
      width: 120px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      font-size: 14px;
      font-weight: bold;
      color: rgba(77, 77, 77, 1);
      background: rgba(214, 215, 220, 1);
      .on {
        display: block;
        position: absolute;
        width: 120px;
        top: 0;
        left: 0;
        height: 37px;
        background: rgba(255, 255, 255, 1);
        border-radius: 0px 8px 0px 0px;
        overflow: hidden;
        color: #2e8ad7;
      }
    }
    :nth-child(3) {
      border-top-right-radius: 8px;
    }
  }
  .bar-body {
    border-top: 1px solid #eceef2;
  }
}
</style>
