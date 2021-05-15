<template>
  <div>
    <el-dialog
      v-dialogDrag
      title="工程验收"
      class="el-dialog-double"
      :visible.sync="visible"
      @close="$emit('update:showAcceptdialog', false)"
      :close-on-click-modal="false"
    >
      <el-row>
        <!-- 表格 -->
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          class="tableContent"
        >
          <el-table-column
            prop="GCYS_YSBH"
            label="验收编号"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="GCYS_CCYSSJ"
            label="初次验收时间"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="GCYS_ZZYSSJ"
            label="最终验收时间"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="GCYS_YSQK"
            label="验收情况"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="GCYS_SM"
            label="说明"
            width="80"
          ></el-table-column>
          <el-table-column prop="GCYS_SFHG" label="是否合格" width="150">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.GCYS_SFHG" disabled></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column
            prop="GCYS_YSJR"
            label="验收结论"
            width="100"
          ></el-table-column>
          <el-table-column
            prop="GCYS_YSR"
            label="验收人"
            width="100"
          ></el-table-column>
        </el-table>
      </el-row>
    </el-dialog>
  </div>
</template>
<script>
import { queryProjectAcceptance } from "@/api/PublicRepairManager/RepairApply";
export default {
  props: ["showAcceptdialog", "WXDJ_ZJ"],
  data() {
    return {
      visible: this.showAcceptdialog,
      tableData: [],
    };
  },
  watch: {
    showAcceptdialog() {
      this.visible = this.showAcceptdialog;
    },
  },
  methods: {
    getData(WXDJ_ZJ) {
      this.getTableList(WXDJ_ZJ);
    },
    getTableList(val) {
      queryProjectAcceptance(val).then((response) => {
        this.tableData = response;
      });
    },
  },
};
</script>
