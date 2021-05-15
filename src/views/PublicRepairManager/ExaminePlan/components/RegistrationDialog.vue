<template>
  <div>
    <el-dialog
      v-dialogDrag
      title="对应维修申请"
      class="el-dialog-double"
      :visible.sync="visible"
      @close="$emit('update:showWXDJdialog', false)"
      :close-on-click-modal="false"
    >
      <section class="content_wrap">
        <h2>维修登记</h2>
        <el-row>
          <!-- 表格 -->
          <el-table
            :data="wxdjtableData"
            border
            style="width: 100%"
            class="tableContent"
          >
            <el-table-column
              prop="WXDJ_NO"
              label="编号"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="WXDJ_BXBM"
              label="报修部门"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="WXDJ_BXRQ"
              label="报修时间"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="WXDJ_XMMC"
              label="项目名称"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="WXDJ_GLCYJ"
              label="管理处意见"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="WXDJ_GLCCKJL"
              label="管理处查看记录"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="WXDJ_FTBZ"
              label="分摊标准"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="WXDJ_WXLB"
              label="维修类别"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="WXDJ_XMLX"
              label="项目类型"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="WXDJ_BXDZ"
              label="报修地址"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="WXDJ_KGSJ"
              label="开工时间"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="WXDJ_WGSJ"
              label="完工时间"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="WXDJ_JLR"
              label="记录人"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="WXDJ_WXJYE"
              label="维修金余额"
              width="100"
            ></el-table-column>
          </el-table>
        </el-row>
      </section>
      <section class="WXD_WRAP">
        <h2>维修单</h2>
        <el-row>
          <!-- 表格 -->
          <el-table
            :data="wxdtableData"
            border
            style="width: 100%"
            class="tableContent"
          >
            <el-table-column
              prop="WXD_NO"
              label="维修单编号"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="WXD_WXDJNO"
              label="维修单登记号"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="WXD_YSFY"
              label="预算费用"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="WXD_KDR"
              label="开单人"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="WXD_KDSJ"
              label="开单日期"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="WXD_JDR"
              label="接单人"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="WXD_JDSJ"
              label="接单日期"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="WXD_YYXWSJ"
              label="预约维修日期"
              width="150"
            ></el-table-column>
            <el-table-column
              prop="WXD_KGSJ"
              label="开工时间"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="WXD_WGSJ"
              label="完工时间"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="WXD_GCSM"
              label="工程说明"
              width="100"
            ></el-table-column>
          </el-table>
        </el-row>
      </section>
    </el-dialog>
  </div>
</template>
<script>
import {
  queryMaintenanceRegistration,
  getRepairOrder,
} from "@/api/PublicRepairManager/ExaminePlan"; //审核方案
export default {
  props: ["showWXDJdialog", "tableRow"],
  data() {
    return {
      title: "新增",
      visible: this.showWXDJdialog,
      wxdjtableData: [],
      wxdtableData: [],
    };
  },
  watch: {
    showWXDJdialog() {
      this.visible = this.showWXDJdialog;
      if (this.visible) {
        this.wxdtableData = [];
        this.getTableList();
      }
    },
  },
  methods: {
    getTableList() {
      queryMaintenanceRegistration(this.tableRow.WXFA_ZJ).then((response) => {
        this.wxdjtableData = response;
        this.$nextTick(() => {
          getRepairOrder(this.wxdjtableData[0].WXDJ_ZJ).then((response) => {
            this.wxdtableData.push(response);
          });
        });
      });
    },
  },
};
</script>
<style scoped>
.WXD_WRAP {
  margin-top: 20px;
}
</style>
