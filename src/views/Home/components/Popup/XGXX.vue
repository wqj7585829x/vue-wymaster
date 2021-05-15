<template>
  <div class="XGXX">
    <el-dialog
      v-dialogDrag
      :title="title"
      class="el-dialog-double"
      :visible.sync="visible"
      @close="cancle"
      :close-on-click-modal="false"
    >
      <div class="grid-ul">
        <ul>
          <li v-for="(item, index) in tableData" :key="index">
            {{ `${item.message}` }}
          </li>
        </ul>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { queryExpirationTimeOfContract } from "@/api/Home/Home";
export default {
  data() {
    return {
      visible: this.xgxxshow,
      title: "相关信息", //标题
      tableData: [],
    };
  },
  props: {
    xgxxshow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    xgxxshow() {
      this.visible = this.xgxxshow;
    },
  },
  methods: {
    //   判断新增，修改
    getPartitionData(data) {
      queryExpirationTimeOfContract(1).then((response) => {
        var item = response;
        this.tableData = item;
      });
    },
    // 取消
    cancle() {
      this.$emit("update:xgxxshow", false);
    },
  },
};
</script>

<style lang="scss">
.XGXX {
  .grid-ul {
    margin: 0;
    height: 280px;
    overflow: auto;
    ul {
      li {
        height: 56px;
        line-height: 56px;
        padding: 0 15px;
        font-size: 16px;
        text-align: left;
        padding-left: 30px;
      }
      li:nth-child(2n + 1) {
        background: #eceef2;
      }
    }
  }
}
</style>
