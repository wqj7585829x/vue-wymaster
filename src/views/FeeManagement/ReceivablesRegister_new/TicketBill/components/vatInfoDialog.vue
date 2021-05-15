<template>
  <div>
    <el-dialog
      v-dialogDrag
      title="增值税信息"
      class="el-dialog-double"
      :visible.sync="visible"
      @close="$emit('update:showVatInfo', false)"
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
              prop="PJLYMX_NSRMC"
              label="纳税人名称"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="PJLYMX_NSRSBH"
              label="纳税人识别号"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="PJLYMX_NSRDZDH"
              label="地址电话"
              width="200"
            ></el-table-column>
            <el-table-column
              prop="PJLYMX_KHHJZH"
              label="开户行及账号"
              width="200"
            ></el-table-column>
            <el-table-column
              prop="PJLYMX_ZZSFPFL"
              label="增值税发票分类"
              width="200"
            ></el-table-column>
          </el-table>
        </el-row>
      </section>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: ["showVatInfo"],
  data() {
    return {
      title: "新增",
      visible: this.showVatInfo,
      RecetableData: [],
    };
  },
  watch: {
    showVatInfo() {
      this.visible = this.showVatInfo;
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
