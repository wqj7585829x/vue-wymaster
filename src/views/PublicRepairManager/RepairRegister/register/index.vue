<template>
  <div class="container RepairRegister_register">
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
            <el-col :span="3" style="width: 200px">
              <el-form-item label="" label-width="0">
                <el-select v-model="RepairForm.WXDJ_WXJD">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="已完成" value="已完成"></el-option>
                  <el-option label="未完成" value="未完成"></el-option>
                  <el-option label="维修登记" value="维修登记"></el-option>
                  <el-option label="维修申请" value="维修申请"></el-option>
                  <el-option label="编制方案" value="编制方案"></el-option>
                  <el-option label="工程实施" value="工程实施"></el-option>
                  <el-option label="工程验收" value="工程验收"></el-option>
                  <el-option label="工程结算" value="工程结算"></el-option>
                  <el-option label="维修金领用" value="维修金领用"></el-option>
                  <el-option label="方案审核" value="方案审核"></el-option>
                  <el-option label="凭证审核" value="凭证审核"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="5" style="width: 200px">
              <el-form-item label="" label-width="0">
                <el-input v-model="RepairForm.WXDJ_CXTJ"></el-input>
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
                >
                </el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="4">
              <el-form-item label-width="0px">
                <el-button
                  type="success"
                  @click="getTableData()"
                  v-has="'RepCeregisterSearch_has'"
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
        <el-button type="primary" @click="addTable" v-has="'RepProAdd_has'"
          >新增</el-button
        >
        <el-button
          type="primary"
          @click="eidtTable"
          :disabled="disableddo"
          v-has="'RepProEdit_has'"
          >修改</el-button
        >
        <el-button
          type="danger"
          @click="deletePartition"
          :disabled="disableddo"
          v-has="'RepProDel_has'"
          >删除</el-button
        >
        <el-button
          type="primary"
          @click="setladder"
          :disabled="disableset"
          v-has="'RepProSet_has'"
          >所属梯户设置</el-button
        >
      </div>
      <!-- 按钮end -->

      <!-- 客户详情begin -->
      <div class="customedetail">
        <el-table
          ref="singleTable"
          :data="tableData"
          v-if="maxheight"
          :max-height="maxheight"
          border
          style="width: 100%"
          @row-click="rowclick"
        >
          <el-table-column label="选择" width="50">
            <template slot-scope="scope">
              <el-radio :label="scope.$index" v-model="radio">&nbsp;</el-radio>
            </template>
          </el-table-column>
          <el-table-column prop="WXDJ_NO" label="编号" width="150">
          </el-table-column>
          <el-table-column prop="WXDJ_BXBM" label="报修部门" width="150">
          </el-table-column>
          <el-table-column prop="WXDJ_BXRQ" label="报修日期" width="150">
          </el-table-column>
          <el-table-column prop="WXDJ_XMMC" label="项目名称" width="200">
          </el-table-column>
          <el-table-column prop="WXDJ_GLCYJ" label="管理处意见" width="150">
          </el-table-column>
          <el-table-column
            prop="WXDJ_GLCCKJL"
            label="管理处查看记录"
            width="250"
          >
          </el-table-column>
          <el-table-column prop="WXDJ_FTBZ" label="分摊标准" width="150">
          </el-table-column>
          <el-table-column prop="WXDJ_WXLB" label="维修类别" width="150">
          </el-table-column>
          <el-table-column prop="WXDJ_XMLX" label="项目类型" width="150">
          </el-table-column>
          <el-table-column prop="WXDJ_BXDZ" label="报修地址" width="350">
          </el-table-column>
          <el-table-column prop="WXDJ_JLR" label="记录人" width="150">
          </el-table-column>
          <el-table-column prop="WXDJ_WXJYE" label="维修金余额" width="150">
          </el-table-column>
          <el-table-column prop="WXDJ_WXJD" label="维修进度" width="150">
          </el-table-column>
          <el-table-column prop="WXDJ_SFBZ" label="收费标准" width="150">
          </el-table-column>
          <el-table-column prop="" fixed="right" label="所属梯" width="120">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="detailsfunc(scope.row, 1)"
                size="small"
                >查看</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="" fixed="right" label="所属户" width="120">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="detailsfunc(scope.row, 2)"
                size="small"
                >查看</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="" fixed="right" label="登记事件" width="120">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="detailsfunc(scope.row, 3)"
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
    <HouseholdDetail
      :Hshow.sync="Hshow"
      ref="HouseholdDetail"
    ></HouseholdDetail>
    <RegisterDetail :Rshow.sync="Rshow" ref="RegisterDetail"></RegisterDetail>
    <Subordinate
      :Sshow.sync="Sshow"
      ref="Subordinate"
      @RefreshItem="RefreshList"
    ></Subordinate>
  </div>
</template>
<script>
import {
  queryCeregister,
  deleteCeregister,
  checkOriginalEvents,
  queryOriginalEvents,
} from "@/api/PublicRepairManager/RepairRegister";
import LadderDetail from "./components/LadderDetail"; //所属梯
import HouseholdDetail from "./components/HouseholdDetail"; //所属户
import RegisterDetail from "./components/RegisterDetail"; //登记事件
import registerDialog from "./components/registerDialog"; //新增总表,修改
import Subordinate from "../components/Subordinate"; //所属梯户
export default {
  name: "RepairRegister",
  data() {
    return {
      labelPosition: "left",
      tableData: [], //列表参数
      disableddo: true,
      disableset: true,
      radio: "", //单选按钮
      tableRow: {}, //选中数据
      RepairForm: {
        WXDJ_QSRQ: "",
        WXDJ_JSRQ: "",
        WXDJ_WXJD: "",
        WXDJ_CXTJ: "",
      },
      time: [],
      tempComponent: "",
      show: false,
      Lshow: false,
      Hshow: false,
      Rshow: false,
      Sshow: false,
      maxheight: 0,
    };
  },
  watch: {
    // radio() {
    //   if (this.radio !== "") {
    //     this.disableset = false;
    //   } else {
    //     this.disableset = true;
    //   }
    // }
  },
  created() {
    this.maxheight = window.screen.width > 1025 ? 500 : 300;
  },
  mounted() {
    var day = new Date();
    this.RepairForm.WXDJ_QSRQ =
      day.getFullYear() + "-" + (day.getMonth() + 1) + "-1";
    this.RepairForm.WXDJ_JSRQ =
      day.getFullYear() + "-" + (day.getMonth() + 1) + "-" + day.getDate();
    this.time.push(this.RepairForm.WXDJ_QSRQ);
    this.time.push(this.RepairForm.WXDJ_JSRQ);
    this.getTableData();
  },
  methods: {
    getRowTable() {},
    timeChange(val) {
      this.RepairForm.WXDJ_QSRQ = val[0];
      this.RepairForm.WXDJ_JSRQ = val[1];
    },
    rowclick(row) {
      //单行点击单选按钮选中
      this.tableRow = row;
      this.radio = this.tableData.indexOf(row); //单行点击单选按钮选中
      checkOriginalEvents(row).then((response) => {
        if (response === 0) {
          this.disableset = false;
        } else {
          this.disableset = true;
        }
      });
      this.OriginalEvents(row);
    },
    detailsfunc(data, type) {
      switch (type) {
        case 1:
          this.Lshow = true;
          this.$refs.LadderDetail.getPartitionData({ WXDJ_ZJ: data.WXDJ_ZJ });
          break;
        case 2:
          this.Hshow = true;
          this.$refs.HouseholdDetail.getPartitionData({
            WXDJ_ZJ: data.WXDJ_ZJ,
          });
          break;
        case 3:
          this.Rshow = true;
          this.$refs.RegisterDetail.getPartitionData({ WXDJ_ZJ: data.WXDJ_ZJ });
          break;
      }
    },
    OriginalEvents(data) {
      queryOriginalEvents(data).then((response) => {
        this.disableddo = response.length != 0;
      });
    },
    // 表数据
    getTableData() {
      this.radio = "";
      this.disableddo = true; //选择后清空选中表格按钮
      this.disableset = true;
      this.tableRow = {}; //选择后清空选中表格数据
      queryCeregister(this.RepairForm).then((response) => {
        this.tableData = response;
        this.returnTotal = response.total;
      });
    },
    //设置所属梯户
    setladder() {
      this.Sshow = true;
      this.$refs.Subordinate.getPartitionData(
        { WXDJ_ZJ: this.tableRow.WXDJ_ZJ, SSXM_ZJ: "" },
        0
      );
    },
    //新增总表
    addTable() {
      this.show = true;
      this.$refs.registerDialog.getPartitionData({}, 0);
      this.disableddo = true; //选择后清空选中表格按钮
      this.disableset = true;
      this.radio = "";
      this.tableRow = {}; //选择后清空选中表格数据
    },
    //编辑总表
    eidtTable() {
      this.show = true;
      this.$refs.registerDialog.getPartitionData(this.tableRow, 1);
    },
    // 删除总表
    deletePartition() {
      this.$confirm("此操作将永久删除此对应数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteCeregister(this.tableRow).then((response) => {
            this.disableddo = true; //选择后清空选中表格按钮
            this.disableset = true;
            this.radio = "";
            this.RefreshList({});
          });
        })
        .catch(() => {
          this.disableddo = true; //清空选中
          this.disableset = true;
          this.radio = "";
        });
    },
    RefreshList(newobj) {
      this.tableRow = newobj;
      this.getTableData();
    },
  },
  components: {
    registerDialog,
    HouseholdDetail,
    LadderDetail,
    RegisterDetail,
    Subordinate,
  },
};
</script>

<style lang="scss">
.RepairRegister_register {
  .el-input-number {
    width: auto;
  }
  .el-button--small {
    width: inherit !important;
  }
  .el-date-editor .el-range-input,
  .el-date-editor .el-range-separator {
    height: auto !important;
  }
  .message {
    width: 450px;
    float: right;
  }
}
</style>
