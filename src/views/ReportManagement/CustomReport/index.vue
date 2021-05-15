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
import { query } from "@/api/ReportManagement/CategorySet";
export default {
  name: "CustomReport",
  data() {
    return {
      tempComponent: "table1",
      ztreeTable: [],
    };
  },
  mounted() {
    var table = "table1";
    var _this = this;
    query().then((response) => {
      var data = response.data;
      for (var i in data) {
        this.ztreeTable.push({
          iconClass: "TreeTenIcon",
          id: `table1${i}`,
          name: data[i].finereport_name,
          show_photo: data[i].show_photo,
          code: data[i].code,
          query_type: data[i].query_type,
          exec_name_detail: data[i].exec_name_detail,
          exec_name_main: data[i].exec_name_main,
          report_code: data[i].report_code,
          exec_name: data[i].exec_name,
          isChargeNotice: data[i].isChargeNotice,
          query_condition: data[i].query_condition,
          numberOfPage: data[i].numberOfPage,
          row_num: data[i].row_num,
          tdWidthSettings: data[i].tdWidthSettings,
        });
      }
      this.$nextTick(() => {
        if (table != "") {
          this.tempComponent = "table1";
          this.$nextTick(() => {
            this.$refs.dotree.setCheckTree(table);
            this.$refs.children.setData(this.ztreeTable[0]);
          });
        }
      });
    });
  },
  methods: {
    //获取树形数据
    getTreeData(val) {
      console.log(val);
      this.tempComponent = "table1";
      this.$nextTick(() => {
        this.$refs.children.setData(val);
      });
    },
  },
  components: {
    vuetree,
    table1,
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
.el-body /deep/ .el-content {
  padding: 0;
}
</style>
