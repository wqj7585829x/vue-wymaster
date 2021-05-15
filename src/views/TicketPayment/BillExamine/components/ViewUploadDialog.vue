<template>
  <div class="ViewDataimportUpload">
    <el-dialog
      v-dialogDrag
      title="查看"
      class="el-dialog-single"
      :visible.sync="visible"
      @close="cancelForm"
    >
      <el-form label-width="105px" :model="formList" ref="ruleForm">
        <el-row>
          <ul class="linkul" v-if="arrlist.length">
            <li v-for="(item, index) in arrlist" :key="index">
              <a :href="item" target="_blank">{{ arrname[index] }}</a>
            </li>
          </ul>
          <p v-else>查无文件!</p>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: ["showdialogView"],
  data() {
    return {
      visible: this.showdialogView,
      formList: {},
      arrlist: [],
      arrname: [],
    };
  },
  watch: {
    showdialogView() {
      this.visible = this.showdialogView;
    },
  },
  methods: {
    getTableRow(data, type) {
      let newRowData = JSON.parse(JSON.stringify(data)); //拷贝一份存储对象
      this.formList = newRowData; //拷贝一份存储对象引用不同地址
      this.arrlist = [];
      this.arrname = [];
      if (this.formList.invoiceId && this.formList.invoiceContract) {
        this.arrlist = this.formList.invoiceContract.split(";");
        this.arrname = this.formList.invoiceContractName.split(";");
      }
    },
    cancelForm() {
      this.fileList = [];
      this.$emit("update:showdialogView", false);
      this.$nextTick(function () {
        this.$refs.ruleForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>

<style lang="scss">
.ViewDataimportUpload {
  .linkul {
    li {
      margin: 5px 0;
      width: inherit;
    }
    a {
      color: #2e8ad7;
      text-decoration: underline;
    }
  }
}
</style>
