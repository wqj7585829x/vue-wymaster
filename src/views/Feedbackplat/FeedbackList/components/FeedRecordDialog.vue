<template>
  <el-dialog
    v-dialogDrag
    :title="title"
    :visible="dialogFormVisible"
    @close="cancelForm"
    :close-on-click-modal="false"
    class="el-dialog-double"
  >
    <el-form
      label-width="120px"
      :model="formList"
      :rules="rules"
      ref="ruleForm"
    >
      <el-row>
        <el-table
          :data="tableData"
          style="width: 100%"
          height="550"
          border
          class="tableContent"
          ref="singleTable"
        >
          <el-table-column
            prop="engineer_user"
            label="处理人员名称"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="create_time"
            label="指派时间"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="received_time"
            label="接单时间"
            width="150"
          ></el-table-column>
          <el-table-column prop="process_result" label="处理结果" width="150">
            <template slot-scope="scope">
              {{ scope.row.process_result == 0 ? "待处理" : "" }}
              {{ scope.row.process_result == 1 ? "已查看" : "" }}
              {{ scope.row.process_result == 2 ? "已完成" : "" }}
              {{ scope.row.process_result == 3 ? "未完成" : "" }}
            </template>
          </el-table-column>
          <el-table-column
            prop="process_remark"
            label="处理情况"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="process_finish_time"
            label="处理完成时间"
          ></el-table-column>
        </el-table>
      </el-row>
    </el-form>
  </el-dialog>
</template>
<script>
import { RecordListApi } from "@/api/Feedbackplat/FeedbackList";
export default {
  props: ["showdialogRecord"],
  watch: {
    showdialogRecord() {
      this.dialogFormVisible = this.showdialogRecord;
    },
  },
  data() {
    return {
      title: "",
      dialogFormVisible: this.showdialogRecord,
      OperType: 0, //0 新增  1修改
      tableData: [],
      formList: {},
      PlotLisArray: [], //小区列表数组
      categoryNameOptions: [], //下拉类别
      typeNameOptions: [], //下拉类型
      dialogImageUrl: "", //图片弹窗地址
      dialogVisible: false, //图片弹窗默认隐藏
      picList: [],
      fileList: [],
      rules: {},
    };
  },
  methods: {
    getTableRow(data, type) {
      let newRowData = JSON.parse(JSON.stringify(data)); //拷贝一份存储对象
      this.formList = newRowData; //拷贝一份存储对象引用不同地址
      this.OperType = type;
      this.RecordList(); //查询处理记录
      if (this.OperType == 0) {
        //0：新增  1：修改
        this.title = "处理记录";
      } else {
        this.title = "处理记录";
      }
    },
    RecordList() {
      RecordListApi(this.formList).then((response) => {
        this.tableData = response;
      });
    },
    cancelForm() {
      //取消关闭
      this.$emit("update:showdialogRecord", false);
      this.$nextTick(function () {
        this.$refs.ruleForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>
