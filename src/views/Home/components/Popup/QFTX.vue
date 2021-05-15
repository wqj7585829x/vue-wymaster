<template>
  <div class="QFTX">
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
            {{ `${item}` }}
          </li>
        </ul>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { queryArrearageAll } from "@/api/Home/Home";
export default {
  data() {
    return {
      visible: this.qftxshow,
      title: "欠费提醒", //标题
      tableData: [],
    };
  },
  props: {
    qftxshow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    qftxshow() {
      this.visible = this.qftxshow;
    },
  },
  methods: {
    //   判断新增，修改
    getPartitionData(data) {
      queryArrearageAll().then((response) => {
        var item = response.data;
        this.tableData = item;
      });
    },
    // 取消
    cancle() {
      this.$emit("update:qftxshow", false);
    },
  },
};
</script>

<style lang="scss">
.QFTX {
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
