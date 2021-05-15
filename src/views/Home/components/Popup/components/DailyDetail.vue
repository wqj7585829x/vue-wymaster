<template>
  <div class="DailyDetail">
    <el-dialog
      v-dialogDrag
      :title="title"
      class="el-dialog-fourfold"
      :visible.sync="visible"
      @close="cancle"
      :close-on-click-modal="false"
    >
      <el-form label-width="75px">
        <el-row :gutter="30">
          <el-col :span="7" style="min-width: 380px">
            <el-form-item label="日期选择:">
              <el-date-picker
                v-model="date"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                @change="timeChange"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="6" style="padding-top: 2px">
            <el-button type="success" @click="getdata" :disabled="loading"
              >查询</el-button
            >
            <el-button type="success" @click="downloData">导出excel</el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-table
        ref="multipleTable"
        height="590px"
        :data="tableData"
        border
        v-loading="loading"
        element-loading-text="请耐心等待，加载中..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(200, 200, 200, 0.5)"
        empty-text="　"
      >
        <el-table-column
          :prop="item"
          :label="item"
          :min-width="columnwidth(item)"
          v-for="(item, index) in column"
          :key="index"
        >
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import { receivedDailyReport, officialReceiptsExcel } from "@/api/Home/Home";
export default {
  data() {
    return {
      visible: this.dailyshow,
      title: "实收日报表", //标题
      tableData: [],
      column: [],
      date: [],
      time: [],
      loading: true,
    };
  },
  props: {
    dailyshow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    dailyshow() {
      this.visible = this.dailyshow;
    },
  },
  methods: {
    timeChange(val) {
      this.time[0] = val ? val[0] : "";
      this.time[1] = val ? val[1] : "";
    },
    //   判断新增，修改
    getPartitionData() {
      this.time = [];
      var day2 = new Date();
      day2.setTime(day2.getTime());
      var s2 =
        day2.getFullYear() + "-" + (day2.getMonth() + 1) + "-" + day2.getDate();
      this.time.push(s2);
      this.time.push(s2);
      this.date = this.time;
      this.getdata();
    },
    getdata() {
      this.tableData = [];
      this.loading = true;
      if (this.time[0] == "") {
        this.$message({
          message: "日期未选择！",
          type: "warning",
        });
        return;
      }
      receivedDailyReport({
        KSRQ: this.time[0],
        JSRQ: this.time[1],
      }).then((response) => {
        this.tableData = response.data.list;
        this.column = response.data.column;
        this.loading = false;
      });
    },
    columnwidth(value) {
      var width = value.length * 18;
      return width < 150 ? 150 : width;
    },
    downloData() {
      officialReceiptsExcel({
        KSRQ: this.time[0],
        JSRQ: this.time[1],
        list: JSON.stringify(this.tableData),
        column: JSON.stringify(this.column),
      }).then((response) => {
        const content = response;
        const blob = new Blob([content]);
        const fileName = `${this.title}.xls`;
        if ("download" in document.createElement("a")) {
          // 非IE下载
          const elink = document.createElement("a");
          elink.download = fileName;
          elink.style.display = "none";
          elink.href = URL.createObjectURL(blob);
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);
        } else {
          // IE10+下载
          navigator.msSaveBlob(blob, fileName);
        }
      });
    },
    // 取消
    cancle() {
      this.$emit("update:dailyshow", false);
    },
  },
};
</script>

<style lang="scss" scope>
.DailyDetail {
  float: left;
  padding: 10px 15px;
  width: 88px;
  .el-dialog-double .el-row {
    padding: 0 10px;
  }
  .el-dialog__body {
    height: 700px;
  }
}
</style>
<style>
.DailyDetail .el-dialog__body {
  padding: 20px;
  overflow: auto;
  height: 700px;
}
.DailyDetail .el-loading-mask {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.DailyDetail .el-loading-spinner {
  top: 50% !important;
  position: absolute;
}
</style>
