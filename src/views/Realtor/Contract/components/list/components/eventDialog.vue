<template>
  <div class="EventDialog">
    <el-dialog
      v-dialogDrag
      :title="title"
      class="el-dialog-treble"
      :visible.sync="visible"
      @close="cancle"
      :close-on-click-modal="false"
    >
      <el-table ref="multipleTable" :data="tableData" border height="300">
        <el-table-column prop="event_type" label="事件类型" width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.event_type == 1">入住移交</span>
            <span v-if="scope.row.event_type == 2">合同变更</span>
            <span v-if="scope.row.event_type == 3">退租申请</span>
            <span v-if="scope.row.event_type == 4">退租移交</span>
            <span v-if="scope.row.event_type == 5">结算清单</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="create_user"
          label="操作人"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="create_date"
          label="操作时间"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="event_content"
          label="事件内容"
        ></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column
          prop="contract_num"
          label="原合同编号"
          width="150"
        ></el-table-column>
        <el-table-column prop="status" label="原合同状态" width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 0">编辑中</span>
            <span v-if="scope.row.status == 1">审核中</span>
            <span v-if="scope.row.status == 2">审核通过</span>
            <span v-if="scope.row.status == 7">审核不通过</span>
            <span v-if="scope.row.status == 8">取消</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { queryContractEvent } from "@/api/Realtor/Contract";
export default {
  data() {
    return {
      visible: this.Eventshow,
      title: "合同事件", //标题
      categoryList: "",
      rules: {},
      tableData: [],
      Reductionshow: false,
      Reliefinforshow: false,
    };
  },
  props: {
    Eventshow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    Eventshow() {
      this.visible = this.Eventshow;
    },
  },
  methods: {
    getReportData(data) {
      var Tabledata = JSON.parse(JSON.stringify(data));
      queryContractEvent({
        dbName: Tabledata.db_name,
        GLCID: Tabledata.GLCID,
        YXDID: Tabledata.YXDID,
        contract_id: Tabledata.contract_id,
      }).then((response) => {
        this.tableData = response.data;
      });
    },
    cancle() {
      this.$emit("update:Eventshow", false);
    },
  },
};
</script>

<style lang="scss">
.EventDialog .el-input-number {
  width: 100%;
  text-align: left;
}

.EventDialog .el-input-number {
  width: 100%;
}

.EventDialog .el-input-number input {
  text-align: left;
}

.EventDialog .buttonBox {
  position: relative;
  font-size: 16px;
  font-weight: bold;
  color: rgba(38, 38, 38, 1);
  line-height: 33px;
  margin-bottom: 10px;
}

.EventDialog .edit {
  position: absolute;
  left: 0px;
  top: 0;
}

.EventDialog .el-dialog__body {
  padding: 30px;
}
</style>
