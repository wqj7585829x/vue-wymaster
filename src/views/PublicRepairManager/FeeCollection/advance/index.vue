<template>
  <div class="container BillBook">
    <!-- 内容区域 -->
    <div class="el-content">
      <!-- 搜索框begin -->
      <div class="select">
        <el-form
          :label-position="labelPosition"
          label-width="85px"
          class="demo-form-inline"
        >
          <el-row :gutter="30">
            <el-col :span="5" style="width: 200px">
              <el-form-item label="" label-width="0">
                <el-input v-model="advanceForm.context"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="5" style="width: 400px">
              <el-form-item label="" label-width="0">
                <el-date-picker
                  v-model="time"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  @change="timeChange"
                ></el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="4">
              <el-form-item label-width="0px">
                <el-button
                  type="success"
                  @click="getTableData()"
                  v-has="'FeeAdvanceSearch_has'"
                  >查询</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!-- 搜索框end -->

      <!-- 按钮begin -->
      <div class="button buttonBox">
        <el-button
          type="primary"
          @click="CostAdvance"
          :disabled="disabled"
          v-has="'FeeAdvanceAdvance_has'"
          >预支</el-button
        >
      </div>
      <!-- 按钮end -->

      <!-- 客户详情begin -->
      <div class="customedetail">
        <el-table
          ref="singleTable"
          :data="tableData"
          max-height="500"
          border
          style="width: 100%"
          @row-click="rowclick"
        >
          <el-table-column label="选择" width="50">
            <template slot-scope="scope">
              <el-radio :label="scope.$index" v-model="radio">&nbsp;</el-radio>
            </template>
          </el-table-column>
          <el-table-column prop="WXFA_NO" label="维修方案编号" width="250">
          </el-table-column>
          <el-table-column prop="WXFA_XMMC" label="维修项目" width="150">
          </el-table-column>
          <el-table-column prop="WXFA_YZFY" label="预支金额" width="150">
          </el-table-column>
          <el-table-column prop="WXFA_YYZJE" label="已支出"> </el-table-column>
          <el-table-column prop="" fixed="right" label="预支列表" width="100">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="detailsfunc(scope.row)"
                size="small"
                >查看</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <registerDialog
      :show.sync="show"
      ref="registerDialog"
      @RefreshItem="RefreshList"
    ></registerDialog>

    <LadderDetail :Lshow.sync="Lshow" ref="LadderDetail"></LadderDetail>
  </div>
</template>
<script>
import {
  queryAdvanceList,
  checkCostAdvance,
} from "@/api/PublicRepairManager/FeeCollection";
import LadderDetail from "./components/LadderDetail"; //所属梯
import registerDialog from "./components/registerDialog"; //新增总表,修改
export default {
  name: "RepairRegister",
  data() {
    return {
      labelPosition: "left",
      tableData: [], //列表参数
      radio: "", //单选按钮
      tableRow: {}, //选中数据
      advanceForm: {
        state: "0",
        KSRQ: "",
        JSRQ: "",
        context: "",
      },
      time: [],
      show: false,
      Lshow: false,
      disabled: true,
    };
  },
  watch: {
    // radio() {
    //   if (this.radio !== "") {
    //     this.disabled = false;
    //   } else {
    //     this.disabled = true;
    //   }
    // }
  },
  mounted() {
    var day = new Date();
    this.advanceForm.KSRQ =
      day.getFullYear() + "-" + (day.getMonth() + 1) + "-1";
    this.advanceForm.JSRQ =
      day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate();
    this.time.push(this.advanceForm.KSRQ);
    this.time.push(this.advanceForm.JSRQ);
    this.getTableData();
  },
  methods: {
    getRowTable() {},
    timeChange(val) {
      if (val == null) {
        this.advanceForm.KSRQ = "";
        this.advanceForm.JSRQ = "";
      } else {
        this.advanceForm.KSRQ = val[0];
        this.advanceForm.JSRQ = val[1];
      }
    },
    rowclick(row) {
      //单行点击单选按钮选中
      this.disabled =
        (row.WXFA_YZFY == row.WXFA_YYZJE ? true : false) || !row.YZZT;
      this.tableRow = row;
      this.radio = this.tableData.indexOf(row); //单行点击单选按钮选中
    },
    detailsfunc(data) {
      this.Lshow = true;
      this.$refs.LadderDetail.getPartitionData({ WXFA_ZJ: data.WXFA_ZJ });
    },
    CostAdvance() {
      checkCostAdvance(this.tableRow).then((response) => {
        if (!response.data.PZ) {
          this.$message.warning("公维金对应费用项目未设置，请检查！");
        } else {
          if (!response.data.JEBZ) {
            this.$message.warning("维修金余额不足！请先筹集费用再做预支操作");
          } else {
            this.$confirm(
              `本次可以预支费用共计：${(
                this.tableRow.WXFA_YZFY - this.tableRow.WXFA_YYZJE
              ).toFixed(5)}`,
              "提示",
              {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
              }
            )
              .then(() => {
                this.show = true;
                this.$refs.registerDialog.getPartitionData(this.tableRow);
              })
              .catch(() => {
                this.radio = ""; //清空选中
                this.disabled = true;
              });
          }
        }
      });
    },
    // 表数据
    getTableData() {
      (this.radio = ""), //单选按钮
        (this.disabled = true);
      (this.tableRow = {}), //选中数据
        queryAdvanceList(this.advanceForm).then((response) => {
          this.tableData = response;
        });
    },
    RefreshList(newobj) {
      this.tableRow = newobj;
      this.disabled = true;
      this.getTableData();
    },
  },
  components: {
    registerDialog,
    LadderDetail,
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.message {
  width: 450px;
  float: right;
}
</style>
<style>
.container .el-input-number {
  width: auto;
}
.BillBook .el-button--small {
  width: inherit !important;
}

.block {
  text-align: right;
  padding: 15px 0 5px 0;
}
</style>
