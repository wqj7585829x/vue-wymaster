<template>
  <div class="resoureRight" v-show="ZoneShow">
    <!-- 按钮begin -->
    <div class="buttonBox">
      <el-button
        type="primary"
        @click="BatchAccounting"
        v-has="'HouBatchAdd_has'"
        >批量建账</el-button
      >
    </div>
    <!-- 按钮end -->

    <!-- 弹框 begin -->
    <Accounting
      :Ashow.sync="Ashow"
      ref="Accounting"
      @RefreshItem="RefreshList"
    ></Accounting>
    <!-- 弹框 end -->
  </div>
</template>

<script>
import Accounting from "./Accounting"; //批量
export default {
  data() {
    return {
      ZoneShow: false,
      Ashow: false,
      title: "", // 标题
    };
  },
  methods: {
    // 获取  table  数据
    getTableDataList() {
      this.ZoneShow = true;
    },
    BatchAccounting() {
      this.Ashow = true;
      this.$refs.Accounting.getPartitionData(
        {
          FCDM_GLQZJ: "",
          DLZJ: "",
        },
        1
      );
    },
    RefreshList() {},
  },
  components: {
    Accounting,
  },
};
</script>

<style lang="scss" scoped>
.resoureTable {
  margin-top: 20px;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.block {
  text-align: right;
  padding: 15px 0 5px 0;
}
</style>
