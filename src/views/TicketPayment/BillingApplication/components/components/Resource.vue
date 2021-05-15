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
import { getTree } from "@/api/BasicManagement/CustomerFile";
import vueZtree from "@/components/Eltree/treeItem.vue";
export default {
  data() {
    return {
      visible: this.Rshow,
      treeResourceList: [],
    };
  },
  props: {
    Rshow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    Rshow() {
      this.visible = this.Rshow;
    },
  },
  mounted() {
    getTree().then((response) => {
      var data = response;
      if (data) {
        this.treeResourceList = data;
      }
    });
  },
  methods: {
    getTreeData(data) {},
    //   数据初始化
    setData(data, type) {},
    //   新增/修改分区
    sure() {
      var data = this.$refs.dotree.getTreeCheckedNodes();
      if (data) {
        var list = [];
        var name = [];
        for (var i in data) {
          if (data[i].data.FCDM_LX == "房间") {
            list.push(data[i].data.FJZJ);
            name.push(data[i].data.FCDM_MC);
          }
        }
        this.$emit("getResource", {
          list: list,
          name: name,
        });
        this.$emit("update:Rshow", false);
      }
    },
    // 取消
    cancle() {
      this.$emit("update:Rshow", false);
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
