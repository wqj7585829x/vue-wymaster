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
    <transition name="fade">
      <div class="el-content" v-if="ztreeTable.length > 0">
        <component
          :is="tempComponent"
          ref="children"
          v-if="isRouterAlive"
        ></component>
      </div>
    </transition>
  </div>
</template>

<script>
import vuetree from "../../../components/Eltree/treeItem.vue";
import tableDialog from "./components/tableDialog.vue";
import { queryGeneralReportTree } from "@/api/ReportManagement/CategorySet";

export default {
  name: "QueryReport",
  data() {
    return {
      tempComponent: "",
      ztreeTable: [],
      isRouterAlive: true,
    };
  },
  mounted() {
    var table = "";
    var _this = this;
    queryGeneralReportTree().then((response) => {
      this.ztreeTable = response;
      if (response) {
        this.$nextTick(() => {
          _this.$refs.dotree.setCheckedKeys(response[0].id, []);
        });
      }
    });
  },
  methods: {
    getTreeData(val) {
      if (val.data.sjid != "") {
        this.tempComponent = "tableDialog";
        this.isRouterAlive = false;
        setTimeout(() => {
          this.isRouterAlive = true;
          this.$nextTick(() => {
            this.$refs.children.getTableData(val.data);
          });
        }, 500);
      }
    },
  },
  components: {
    vuetree,
    tableDialog,
  },
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.el-body {
  padding-left: 220px;
}
.el-body /deep/ .el-title {
  width: 220px;
  margin-left: -220px;
}
</style>
