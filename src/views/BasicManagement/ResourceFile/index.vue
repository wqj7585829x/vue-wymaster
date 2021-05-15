<template>
  <div class="el-body">
    <div class="el-title">
      <div v-if="ztreeDataSourceList.length > 0">
        <!--树形组件-->
        <vuetree
          :list.sync="ztreeDataSourceList"
          :is-open="true"
          ref="dotree"
          :is-check="false"
          :showInput="false"
          @getTreeData="getTreeData"
        ></vuetree>
      </div>
    </div>
    <div class="el-content">
      <keep-alive>
        <component
          :is="tempComponent"
          ref="children"
          @RefreshTree="RefreshTree"
        ></component>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import vuetree from "../../../components/Eltree/treeItem.vue";
import Zone from "./components/Zone.vue"; //分区名称
import Building from "./components/Building.vue"; //楼栋名称
import Resource from "./components/Resource.vue"; //资源名称
import { getTree } from "@/api/BasicManagement/ResourceFile.js";
import { Message } from "element-ui";
export default {
  name: "ResourceFile",
  data() {
    return {
      tempComponent: "Zone",
      ztreeDataSourceList: [],
    };
  },
  mounted() {
    this.getTreeFun();
  },
  methods: {
    // 获取资源树
    getTreeFun(type) {
      var _this = this;
      getTree().then((response) => {
        var data = response;
        if (data) {
          _this.ztreeDataSourceList = data;
          var val = data[0];
          this.$nextTick(() => {
            this.$refs.dotree.setCheckTree(type ? type : val.id);
            if (!type) {
              this.$refs.children.getTableDataList(val);
            }
          });
        }
      });
    },
    //获取树形数据
    getTreeData(val) {
      switch (val.data.FCDM_LX) {
        case "管理处":
          this.tempComponent = "Zone";
          break;
        case "管理区":
          this.tempComponent = "Building";
          break;
        case "大楼":
          this.tempComponent = "Resource";
          break;
      }
      this.$nextTick(() => {
        this.$refs.dotree.setCheckTree(val.id);
        this.$refs.children.getTableDataList(val);
      });
    },
    // 提示信息
    showMessage(msg) {
      this.$message({
        message: msg,
        type: "error",
        duration: 2 * 1000,
      });
      this.$nextTick(() => {
        this.$refs.dotree.setCheckTree(this.clickOrgId);
      });
    },
    // 刷新 树
    RefreshTree(treeid) {
      this.getTreeFun(treeid);
    },
  },
  components: {
    vuetree,
    Zone,
    Building,
    Resource,
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
</style>
