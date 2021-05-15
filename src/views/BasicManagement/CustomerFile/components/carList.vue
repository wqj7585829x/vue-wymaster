<template>
  <div class="UserDialog typeList">
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
        <el-table-column prop="CLXX_CPH" label="车牌号" width="200">
        </el-table-column>
        <el-table-column prop="CLXX_CZ" label="车主" width="200">
        </el-table-column>
        <el-table-column prop="DZMC" label="停车场名称" width="200">
        </el-table-column>
        <el-table-column prop="CGBZ_BZMC" label="缴费类型" width="200">
        </el-table-column>
        <el-table-column prop="CLXX_DQRQ" label="到期日期" width="200">
        </el-table-column>
        <el-table-column prop="CLXX_ZT" label="状态" width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.CLXX_ZT === 0">停用</span>
            <span v-if="scope.row.CLXX_ZT === 1">可用</span>
            <span v-if="scope.row.CLXX_ZT === 2">退租</span>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addtype">新 增</el-button>
        <el-button type="primary" :disabled="radio === ''" @click="edittype"
          >修 改</el-button
        >
        <el-button type="primary" :disabled="radio === ''" @click="deletetype"
          >删 除</el-button
        >
        <el-button @click="cancle">取 消</el-button>
      </div>
    </el-dialog>
    <carDialog
      :Tshow.sync="Tshow"
      ref="carDialog"
      @RefreshItem="refreshList"
    ></carDialog>
  </div>
</template>

<script>
import {
  queryCarMessage,
  deleteCarMessage,
} from "@/api/ParkingManagement/TemporaryCar";
import carDialog from "./carDialog";
export default {
  data() {
    return {
      visible: this.carshow,
      title: "我的车辆", //标题
      tableData: [],
      Tshow: false,
      tableRow: [],
      radio: "",
      KHDA_ZJ: "",
      FKGX_ZJ: "",
    };
  },
  props: {
    carshow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    carshow() {
      this.visible = this.carshow;
    },
  },
  methods: {
    //   判断新增，修改
    getPartitionData(KHDA_ZJ, FKGX_ZJ) {
      this.radio = "";
      this.KHDA_ZJ = KHDA_ZJ;
      this.FKGX_ZJ = FKGX_ZJ;
      queryCarMessage(FKGX_ZJ).then((response) => {
        this.tableData = response.data;
      });
    },
    //列表点击
    rowclick(row) {
      this.tableRow = row;
      this.radio = this.tableData.indexOf(row); //单行点击单选按钮选中
    },
    //新增我的车辆
    addtype() {
      this.Tshow = true;
      this.$refs.carDialog.getPartitionData(
        { CLXX_KHWJ: this.KHDA_ZJ, CLXX_FKGXWJ: this.FKGX_ZJ },
        0
      );
    },
    //修改我的车辆
    edittype() {
      this.Tshow = true;
      this.$refs.carDialog.getPartitionData(this.tableRow, 1);
    },
    //删除我的车辆
    deletetype() {
      this.$confirm("此操作将永久删除此对应数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteCarMessage(this.tableRow).then((response) => {
            this.radio = ""; //选择后清空选中表格按钮
            this.tableRow = {}; //选择后清空选中表格数据
            this.refreshList();
          });
        })
        .catch(() => {
          this.radio = ""; //清空选中
          this.tableRow = {}; //选择后清空选中表格数据
        });
    },
    // 取消
    cancle() {
      this.$emit("update:carshow", false);
    },
    //弹窗回调，列表刷新
    refreshList(data) {
      this.tableRow = data;
      queryCarMessage(this.FKGX_ZJ).then((response) => {
        this.tableData = response.data;
        this.radio = "";
      });
    },
  },
  components: {
    carDialog,
  },
};
</script>

<style></style>
