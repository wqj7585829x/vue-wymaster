<template>
  <div class="Roomchangedialog">
    <el-dialog
      v-dialogDrag
      :title="title"
      class="el-dialog-single"
      :visible.sync="visible"
      @close="cancle"
      :close-on-click-modal="false"
    >
      <div class="demo-input-suffix">
        <el-input
          placeholder="请输入关键字"
          prefix-icon="el-icon-search"
          v-model="formList.input1"
        >
        </el-input>
        <el-input placeholder="请输入记录条数" v-model="formList.input2">
        </el-input>
        <el-button type="primary" @click="search">搜索</el-button>
      </div>

      <el-checkbox-group
        v-model="checkedlists"
        @change="handleCheckedCitiesChange"
      >
        <el-checkbox
          v-for="item in lists"
          :label="item"
          :key="item"
          class="checkitem"
          >{{ item }}</el-checkbox
        >
      </el-checkbox-group>
      <div slot="footer" class="dialog-footer">
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
          class="checkall"
          >全选</el-checkbox
        >
        <el-button type="primary" @click="sure">确 定</el-button>
        <el-button @click="cancle">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  queryKHDA,
  queryUniqueFJDA_FJID,
  queryUniqueFJDA_FJMC,
} from "@/api/ReportManagement/QueryReport";
export default {
  data() {
    return {
      visible: this.RNshow,
      checkAll: false,
      checkedlists: [],
      lists: [],
      isIndeterminate: false,
      formList: {
        input1: "",
        input2: 100,
      },
      title: "房间名称",
      type: "",
    };
  },
  props: {
    RNshow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    RNshow() {
      this.visible = this.RNshow;
    },
  },
  mounted() {
    queryUniqueFJDA_FJMC({
      FJDA_FJMC: this.formList.input1,
      topSum: this.formList.input2,
    }).then((response) => {
      this.lists = [];
      for (var i in response) {
        this.lists.push(response[i].FJDA_FJMC);
      }
    });
  },
  methods: {
    onSubmit() {},
    handleCheckAllChange(val) {
      this.checkedlists = val ? this.lists : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.lists.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.lists.length;
    },
    search() {
      queryUniqueFJDA_FJMC({
        FJDA_FJMC: this.formList.input1,
        topSum: this.formList.input2,
      }).then((response) => {
        this.lists = [];
        for (var i in response) {
          this.lists.push(response[i].FJDA_FJMC);
        }
      });
    },
    //   数据重置
    ReSetData() {
      this.checkAll = false;
      this.checkedlists = [];
      this.isIndeterminate = false;
    },
    //   新增/修改分区
    sure() {
      this.$emit("getResource", this.checkedlists.join(","));
      this.$emit("update:RNshow", false);
    },
    // 取消
    cancle() {
      this.$emit("update:RNshow", false);
    },
  },
};
</script>

<style lang="scss">
.Roomchangedialog .el-dialog__body {
  height: 480px;
  padding: 10px;
  .zree-w {
    height: 460px;
    overflow: auto;
    margin-top: 0;
  }
  .checkitem {
    margin-right: 0px;
    display: block;
    text-align: left;
    padding-left: 20px;
    padding-bottom: 10px;
  }
  .el-checkbox-group {
    overflow: auto;
    height: 420px;
  }
  .dialog-footer {
    position: relative;
  }
  .demo-input-suffix {
    text-align: left;
  }
  .el-input {
    width: 33%;
    margin-right: 10px;
    margin-bottom: 10px;
  }
}
</style>
<style>
.Roomchangedialog .checkall {
  position: absolute;
  left: 20px;
  margin-top: 5px;
}
</style>
