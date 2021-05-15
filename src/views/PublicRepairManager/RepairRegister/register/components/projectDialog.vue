<template>
  <div class="UserDialog">
    <el-dialog
      v-dialogDrag
      :title="title"
      class="el-dialog-double"
      :visible.sync="visible"
      @close="cancle"
      :close-on-click-modal="false"
    >
      <el-table
        ref="detailTable"
        :data="tableData"
        height="300"
        border
        style="width: 100%"
        @row-click="rowclick"
      >
        <el-table-column label="选择" width="50">
          <template slot-scope="scope">
            <el-radio :label="scope.$index" v-model="radio">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="SSXM_MC" label="项目名称" width="250">
        </el-table-column>
        <el-table-column prop="SSXM_XMLX" label="项目类型" width="250">
        </el-table-column>
        <el-table-column prop="SSXM_WXLB" label="项目类别" width="250">
        </el-table-column>
        <el-table-column prop="SSXM_DZ" label="地址" width="250">
        </el-table-column>
      </el-table>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sure">确 定</el-button>
        <el-button @click="cancle">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { queryProject } from "@/api/PublicRepairManager/RepairRegister";
export default {
  data() {
    return {
      visible: this.Proshow,
      title: "维修项目", //标题
      tableData: [],
      radio: "", //单选按钮
      tableRow: {}, //选中数据
    };
  },
  props: {
    Proshow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    Proshow() {
      this.visible = this.Proshow;
    },
  },
  methods: {
    rowclick(row) {
      //单行点击单选按钮选中
      this.tableRow = row;
      this.radio = this.tableData.indexOf(row); //单行点击单选按钮选中
    },
    //   判断新增，修改
    getPartitionData() {
      queryProject().then((response) => {
        this.tableData = response;
      });
    },
    sure() {
      this.$emit("getData", this.tableRow);
      this.$emit("update:Proshow", false);
    },
    // 取消
    cancle() {
      this.$emit("update:Proshow", false);
    },
  },
};
</script>

<style>
.UserDialog li {
  float: left;
  padding: 10px 15px;
  width: 88px;
}
</style>
