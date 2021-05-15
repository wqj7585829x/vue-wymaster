<template>
  <div class="el-body">
    <div class="el-title">
      <div v-if="ztreeTable.length > 0">
        <!--树形组件-->
        <vuetree
          :list.sync="ztreeTable"
          :is-open="true"
          ref="dotree"
          :is-check="false"
          :showInput="false"
          @getTreeData="getTreeData"
        ></vuetree>
      </div>
    </div>
    <div class="el-content" v-if="ztreeTable.length > 0">
      <!-- <keep-alive> -->
      <component :is="tempComponent" ref="children"></component>
      <!-- </keep-alive> -->
    </div>
  </div>
</template>

<script>
import vuetree from "../../../components/Eltree/treeItem.vue";
import table1 from "./components/table1.vue";
import table2 from "./components/table2.vue";
import table3 from "./components/table3.vue";
import table4 from "./components/table4.vue";
import table5 from "./components/table5.vue";
import table6 from "./components/table6.vue";
import table7 from "./components/table7.vue";
import table8 from "./components/table8.vue";
import table9 from "./components/table9.vue";
import table10 from "./components/table10.vue";
import table11 from "./components/table11.vue";
import table12 from "./components/table12.vue";
import table13 from "./components/table13.vue";
import table14 from "./components/table14.vue";
import table15 from "./components/table15.vue";

export default {
  name: "NewReport",
  data() {
    return {
      tempComponent: "table1",
      ztreeTable: [
        {
          iconClass: "TreeTenIcon",
          name: "按收款单类",
          children: [
            {
              iconClass: "TreeTenIcon",
              id: "table1",
              name: "应收明细报表",
            },
            {
              iconClass: "TreeTenIcon",
              id: "table2",
              name: "应收调整费用明细报表",
            },
            {
              iconClass: "TreeTenIcon",
              id: "table3",
              name: "实际应收明细报表",
            },
            {
              iconClass: "TreeTenIcon",
              id: "table4",
              name: "已收款明细报表",
            },
            {
              iconClass: "TreeTenIcon",
              id: "table5",
              name: "欠收费用明细报表",
            },
            {
              iconClass: "TreeTenIcon",
              id: "table6",
              name: "实收款明细报表",
            },

            // , {
            //   iconClass: "TreeTenIcon",
            //   id: "table7",
            //   name: "实收款明细报表（收入类）"
            // }, {
            //   iconClass: "TreeTenIcon",
            //   id: "table8",
            //   name: "实收款明细报表（代收代付类）"
            // }, {
            //   iconClass: "TreeTenIcon",
            //   id: "table9",
            //   name: "收款开票明细报表"
            // },
            // {
            //   iconClass: "TreeTenIcon",
            //   id: "table10",
            //   name: "预交明细报表"
            // }, {
            //   iconClass: "TreeTenIcon",
            //   id: "table11",
            //   name: "一次性费用明细表"
            // }, {
            //   iconClass: "TreeTenIcon",
            //   id: "table12",
            //   name: "本期收费率"
            // }, {
            //   iconClass: "TreeTenIcon",
            //   id: "table13",
            //   name: "本年收费率"
            // }, {
            //   iconClass: "TreeTenIcon",
            //   id: "table14",
            //   name: "票据汇总"
            // }, {
            //   iconClass: "TreeTenIcon",
            //   id: "table15",
            //   name: "收款到账明细报表"
            // }
          ],
        },
      ],
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.dotree.setCheckTree("table1");
      this.$refs.children.setData();
    });
  },
  methods: {
    //获取树形数据
    getTreeData(val) {
      this.tempComponent = "";
      switch (val.id) {
        case "table1":
          this.tempComponent = "table1";
          break;
        case "table2":
          this.tempComponent = "table2";
          break;
        case "table3":
          this.tempComponent = "table3";
          break;
        case "table4":
          this.tempComponent = "table4";
          break;
        case "table5":
          this.tempComponent = "table5";
          break;
        case "table6":
          this.tempComponent = "table6";
          break;
        case "table7":
          this.tempComponent = "table7";
          break;
        case "table8":
          this.tempComponent = "table8";
          break;
        case "table9":
          this.tempComponent = "table9";
          break;
        case "table10":
          this.tempComponent = "table10";
          break;
        case "table11":
          this.tempComponent = "table11";
          break;
        case "table12":
          this.tempComponent = "table12";
          break;
        case "table13":
          this.tempComponent = "table13";
          break;
        case "table14":
          this.tempComponent = "table14";
          break;
        case "table15":
          this.tempComponent = "table15";
          break;
      }
      this.$nextTick(() => {
        if (this.tempComponent != "") {
          this.$refs.children.setData();
        }
      });
    },
  },
  components: {
    table1,
    table2,
    table3,
    table4,
    table5,
    table6,
    table7,
    table8,
    table9,
    table10,
    table11,
    table12,
    table13,
    table14,
    table15,
    vuetree,
  },
};
</script>

<style lang="scss" scoped>
.el-body {
  padding-left: 220px;
}
.el-body /deep/ .el-title {
  width: 220px;
  margin-left: -220px;
}

.el-body .el-content {
  height: auto;
  width: 100%;
  padding: 5px 30px;
}
</style>
