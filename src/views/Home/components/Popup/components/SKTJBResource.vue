<template>
  <div class="Resourcedialog">
    <el-dialog
      v-dialogDrag
      title="资源树"
      class="el-dialog-single"
      :visible.sync="visible"
      @close="cancle"
      :close-on-click-modal="false"
    >
      <div v-if="treeResourceList.length > 0">
        <vue-ztree
          :list.sync="treeResourceList"
          :is-open="true"
          ref="dotree"
          :is-check="false"
          :showCheckbox="true"
          class="zree-w"
        >
        </vue-ztree>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sure">确 定</el-button>
        <el-button @click="cancle">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { queryOrgTreeByPurview } from "@/api/BasicManagement/CustomerFile";
import vueZtree from "@/components/Eltree/treeItem.vue";
export default {
  data() {
    return {
      visible: this.show,
      treeResourceList: [],
      BMJG_JGMC: "",
      BMJG_ZJ: "",
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    show() {
      this.visible = this.show;
    },
  },
  mounted() {
    queryOrgTreeByPurview().then((response) => {
      var data = response;
      if (data) {
        this.treeResourceList = data;
      }
    });
  },
  methods: {
    getTreeData(data) {},
    //   数据初始化
    setData(data, type) {
      this.BMJG_JGMC = "";
      this.BMJG_ZJ = "";
    },
    //   新增/修改分区
    sure() {
      var data = this.$refs.dotree.getTreeCheckedNodes();
      if (data) {
        var BMJG_JGMC = [];
        var BMJG_ZJ = [];
        for (var i in data) {
          BMJG_JGMC.push(data[i].data.BMJG_JGMC);
          BMJG_ZJ.push(data[i].data.BMJG_ZJ);
        }
        this.$emit("getResource", {
          BMJG_JGMC: BMJG_JGMC.join(","),
          BMJG_ZJ: BMJG_ZJ.join(","),
        });
        this.$emit("update:show", false);
      }
    },
    // 取消
    cancle() {
      this.$emit("update:show", false);
    },
  },
  components: {
    vueZtree,
  },
};
</script>

<style lang="scss">
.Resourcedialog .el-dialog__body {
  height: 480px;
  padding: 10px;
  .zree-w {
    height: 460px;
    overflow: auto;
    margin-top: 0;
  }
}
</style>
