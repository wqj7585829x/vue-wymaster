<template>
  <div>
    <el-dialog
      v-dialogDrag
      title="作废信息"
      class="el-dialog-double"
      :visible.sync="visible"
      @close="$emit('update:showInfo', false)"
      :close-on-click-modal="false"
    >
      <section class="content_wrap">
        <el-row>
          <!-- 表格 -->
          <el-table
            :data="RecetableData"
            border
            style="width: 100%"
            max-height="320"
            class="payment_table"
          >
            <el-table-column
              prop="SKPZ_ZFR"
              label="作废人"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="SKPZ_ZFSJ"
              label="作废时间"
              width="250"
            ></el-table-column>
            <el-table-column
              prop="SKPZ_ZFYY"
              label="作废原因"
            ></el-table-column>
          </el-table>
        </el-row>
      </section>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: ["showInfo"],
  data() {
    return {
      title: "新增",
      visible: this.showInfo,
      RecetableData: [],
    };
  },
  watch: {
    showInfo() {
      this.visible = this.showInfo;
    },
  },
  methods: {
    getData(data) {
      this.RecetableData = [];
      this.RecetableData.push(data);
    },
  },
};
</script>
<style scoped>
.WXD_WRAP {
  margin-top: 20px;
}
</style>
