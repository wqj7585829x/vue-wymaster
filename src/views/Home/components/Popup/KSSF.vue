<template>
  <div class="KSSF container" ref="KSSF">
    <el-form label-width="85px" :model="KSSFForm" :rules="rules" ref="KSSFForm">
      <el-row :gutter="30">
        <el-col :span="4" style="width: 600px">
          <el-form-item label="资源名称：" prop="FJDA_MC" class="KSSFForm">
            <el-autocomplete
              v-model="KSSFForm.FJDA_MC"
              :title="KSSFForm.FJDA_MC"
              :fetch-suggestions="querySearch"
              popper-class="my-autocomplete"
              @select="FJDA_ZJchange"
              clearable
            >
              <el-button
                slot="append"
                icon="el-icon-edit-outline"
                @click="RoomChoose"
              ></el-button>
              <template slot-scope="{ item }">
                <div class="name">{{ item.value }}</div>
              </template>
            </el-autocomplete>
          </el-form-item>
        </el-col>

        <el-col :span="4" style="width: 250px">
          <el-form-item label="客户名称：" prop="KHDA_KHMC">
            <el-input
              v-model="KSSFForm.KHDA_KHMC"
              clearable
              @change="KHDA_KHMCchange"
            ></el-input>
          </el-form-item>
        </el-col>

        <!-- <el-col :span="4" style="width:250px">
          <el-form-item label="房间状态:">
            <el-select v-model="KSSFForm.FJDA_SFKZ">
              <el-option label="空置" :value="1"></el-option>
              <el-option label="入住" :value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col> -->

        <el-col :span="4" style="width: 250px">
          <el-form-item label="开始年月:">
            <el-date-picker
              type="month"
              placeholder="选择年月"
              v-model="KSSFForm.QSNY"
              format="yyyy-MM"
              value-format="yyyy-MM"
              clearable
            >
            </el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="4" style="width: 250px">
          <el-form-item label="截止年月:">
            <el-date-picker
              type="month"
              placeholder="选择年月"
              v-model="KSSFForm.JZNY"
              format="yyyy-MM"
              value-format="yyyy-MM"
              clearable
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="6" style="width: 400px">
          <el-form-item label="费用项目：">
            <el-select
              v-model="KSSFForm.SFXM_ZJ"
              clearable
              multiple
              collapse-tags
            >
              <el-option
                v-for="item in zydata"
                :key="item.SFXM_ZJ"
                :label="item.SFXM_SFXMMC"
                :value="item.SFXM_ZJ"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-button
            type="success"
            @click="getTableData()"
            style="margin-top: 3px"
            >查询</el-button
          >
        </el-col>
      </el-row>
    </el-form>
    <!-- 按钮end -->

    <!-- 按钮begin -->
    <div class="button buttonBox">
      <el-button type="success" @click="downloData">导出excel</el-button>
      <el-button
        type="primary"
        @click="ReceiptedSelectDialog"
        :disabled="multipleSelection.length == 0"
      >
        收清选中
      </el-button>
    </div>
    <!-- 按钮end -->

    <!--  表begin -->
    <div class="resoureTable">
      <u-table
        ref="multipleTable"
        :data="tableData"
        border
        @selection-change="handleSelectionChange"
        @row-click="rowClick"
        :height="height"
        v-loading="loading"
        element-loading-text="数据加载中，请耐心等待..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(200, 200, 200, 0.5)"
        use-virtual
        big-data-checkbox
        :row-height="35"
      >
        <u-table-column
          type="selection"
          width="55"
          :selectable="selectInit"
        ></u-table-column>
        <u-table-column prop="FJDA_FJID" label="资源代码" width="150">
        </u-table-column>
        <u-table-column prop="FJDA_FJMC" label="资源名称" width="150">
        </u-table-column>
        <u-table-column prop="FKGX_LX" label="客户类型"> </u-table-column>
        <u-table-column prop="KHDA_KHMC" label="客户名称" width="160">
        </u-table-column>
        <u-table-column prop="FYSQ_SSNY" label="所属年月" width="100">
        </u-table-column>
        <u-table-column prop="FYSQ_SFXMMC" label="收费项目" width="150">
        </u-table-column>
        <!-- <u-table-column prop="FYSQ_XPKPZT" label="先票状态" width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.FYSQ_XPKPZT==1">未申请</span>
            <span v-if="scope.row.FYSQ_XPKPZT==2">申请中</span>
            <span v-if="scope.row.FYSQ_XPKPZT==11">未开票</span>
            <span v-if="scope.row.FYSQ_XPKPZT==12">已开票</span>
          </template>
        </u-table-column> -->
        <u-table-column prop="FYSQ_YSJE" label="应收金额（含税）" width="120">
          <template slot-scope="scope">
            {{ formatMoney(scope.row.FYSQ_YSJE) }}
          </template>
        </u-table-column>
        <u-table-column prop="FYSQ_SSJE" label="已收金额" width="100">
          <template slot-scope="scope">
            {{ formatMoney(scope.row.FYSQ_SSJE) }}
          </template>
        </u-table-column>
        <u-table-column prop="FYSQ_QSJE" label="欠收金额" width="100">
        </u-table-column>
        <u-table-column prop="FYSQ_YSSL" label="税率" width="70">
        </u-table-column>
        <u-table-column prop="FYSQ_YSBHS" label="应收不含税" width="150">
        </u-table-column>
        <u-table-column prop="FYSQ_ZY" label="费用期间" width="220">
        </u-table-column>
        <u-table-column prop="FYSQ_TZR" label="调整人" width="150">
        </u-table-column>
        <u-table-column prop="FYSQ_BZ" label="备注" width="150">
        </u-table-column>
      </u-table>
      <div class="arrears">
        已勾选金额: <span>{{ arrears }}</span>
      </div>
    </div>
    <!--  表 end -->

    <!-- 收清选中弹窗start -->
    <ReceiptedSelectDialog
      :showdialog.sync="showdialog"
      @RefreshItem="getTableData"
      ref="ReceiptedSelectPopChildren"
    >
    </ReceiptedSelectDialog>
    <!-- 收清选中弹窗end -->
    <Resource
      :Rshow.sync="Rshow"
      ref="Resource"
      @getResource="getResource"
    ></Resource>
  </div>
</template>

<script>
import ReceiptedSelectDialog from "./components/ReceiptedSelectDialog"; //收清选中
import {
  queryChargeItem,
  queryUncollectedFeesByRoom,
  queryPaymentMethod,
  feeCollection,
  exportUncollectedFeesApi,
  queryRoom,
} from "@/api/Home/Home";
import { formatMoney } from "@/utils/global.js";
import Resource from "./components/Resource";
import { UTable, UTableColumn } from "umy-ui";
export default {
  name: "KSSF",
  data() {
    return {
      title: "快速收费", //标题
      tableData: [],
      KSSFForm: {
        FJDA_ZJ: "",
        SFXM_ZJ: "",
        KHDA_KHMC: "",
        roomStatus: "",
        FJDA_SFKZ: "",
      },
      zydata: [],
      skdata: [],
      SKMX_SKFS: "",
      rules: {
        FJDA_MC: [{ required: true, trigger: "blur" }],
        KHDA_KHMC: [{ required: true, trigger: "blur" }],
      },
      multipleSelection: [],
      showdialog: false,
      height: 150,
      loading: false,
      type: true,
      total: 0,
      paybutton: false,
      arrears: 0,
      Rshow: false,
      restaurants: [],
    };
  },
  components: {
    ReceiptedSelectDialog,
    Resource,
    UTable,
    UTableColumn,
  },
  watch: {
    "KSSFForm.FJDA_MC": function (val, oldval) {
      if (val) {
        this.$set(this.rules, "KHDA_KHMC", [
          { required: false, trigger: "blur" },
        ]);
      } else {
        this.KSSFForm.FJDA_ZJ = "";
        this.$set(this.rules, "KHDA_KHMC", [
          { required: true, trigger: "blur" },
        ]);
      }
    },
  },
  mounted() {
    this.type = this.$route.query.type === "1" ? false : true;
    this.total = this.$route.query.total ? this.$route.query.total : "zero";
    this.$nextTick(() => {
      setTimeout(() => {
        this.getPartitionData();
      }, 1000);
    });
  },
  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.xmdata;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1
        );
      };
    },
    RoomChoose() {
      this.Rshow = true;
    },
    getResource(data) {
      this.KSSFForm.FJDA_ZJ = data.list.join(",");
      this.KSSFForm.FJDA_MC = data.name.join(",");
      if (this.KSSFForm.FJDA_ZJ) {
        this.$set(this.rules, "KHDA_KHMC", [
          { required: false, trigger: "blur" },
        ]);
      } else {
        this.$set(this.rules, "KHDA_KHMC", [
          { required: true, trigger: "blur" },
        ]);
      }
    },
    selectInit(row, index) {
      if (row.FYSQ_XPKPZT == 1) {
        return true; //可勾选
      } else {
        return false; //不可勾选
      }
    },
    FJDA_ZJchange(val) {
      //资源名称和客户名称至少一个条件必输
      this.KSSFForm.FJDA_ZJ = val.FJDA_ZJ;
      if (val) {
        this.$set(this.rules, "KHDA_KHMC", [
          { required: false, trigger: "blur" },
        ]);
      } else {
        this.$set(this.rules, "KHDA_KHMC", [
          { required: true, trigger: "blur" },
        ]);
      }
    },
    KHDA_KHMCchange(val) {
      //资源名称和客户名称至少一个条件必输
      if (val) {
        this.$set(this.rules, "FJDA_MC", [
          { required: false, trigger: "blur" },
        ]);
      } else {
        this.$set(this.rules, "FJDA_MC", [{ required: true, trigger: "blur" }]);
      }
    },
    rowClick(row) {
      this.$refs.multipleTable.toggleRowSelection(row); //单击表格复选框选中
    },
    formatMoney(data) {
      return data >= 0
        ? formatMoney(data, true)
        : `-${formatMoney(0 - data, true)}`;
    },
    ReceiptedSelectDialog() {
      //点击收清选中弹窗显示

      var data = this.multipleSelection;
      var total = 0;
      var SKPZ_SKJE = [];
      var FYSQ_FKGXWJ = [];
      for (var i in data) {
        total += data[i].FYSQ_QSJE;
        SKPZ_SKJE.push(data[i].FYSQ_QSJE);
        if (FYSQ_FKGXWJ.indexOf(data[i].FYSQ_FKGXWJ) == -1) {
          FYSQ_FKGXWJ.push(data[i].FYSQ_FKGXWJ);
        }
      }
      this.paybutton =
        parseFloat(this.total) === total || this.total === "zero"
          ? false
          : true;
      if (this.paybutton) {
        this.$message({
          message: "账单金额与实收金额不一致请确认！",
          type: "warning",
        });
        return;
      }
      sessionStorage.setItem("SKPZ_SKJE", SKPZ_SKJE.join(","));
      this.showdialog = true;
      this.$refs.ReceiptedSelectPopChildren.getReceiptedSelect(
        this.multipleSelection,
        FYSQ_FKGXWJ.join(","),
        "",
        1
      ); //传递给弹窗数据
    },
    dofeeCollection() {
      var data = this.multipleSelection;
      var list = [];
      for (var i in data) {
        list.push({
          FYSQ_ZJ: data[i].FYSQ_ZJ ? data[i].FYSQ_ZJ : "",
          FYSQ_SSNY: data[i].FYSQ_SSNY ? data[i].FYSQ_SSNY : "",
          FYSQ_SFXMMC: data[i].FYSQ_SFXMMC ? data[i].FYSQ_SFXMMC : "",
          FYSQ_SFXMWJ: data[i].FYSQ_SFXMWJ ? data[i].FYSQ_SFXMWJ : "",
          FYSQ_SFBZ: data[i].FYSQ_SFBZ ? data[i].FYSQ_SFBZ : "",
          FYSQ_SSJE: data[i].FYSQ_SSJE ? data[i].FYSQ_SSJE : "",
          FYSQ_ZY: data[i].FYSQ_ZY ? data[i].FYSQ_ZY : "",
          FYSQ_QCRQ: data[i].FYSQ_QCRQ ? data[i].FYSQ_QCRQ : "",
          FYSQ_QMRQ: data[i].FYSQ_QMRQ ? data[i].FYSQ_QMRQ : "",
          FYSQ_YSSL: data[i].FYSQ_YSSL ? data[i].FYSQ_YSSL : "",
          FYSQ_QSJE: data[i].FYSQ_QSJE ? data[i].FYSQ_QSJE : "",
          FYSQ_FKGXWJ: data[i].FYSQ_FKGXWJ ? data[i].FYSQ_FKGXWJ : "",
          KHDA_KHMC: data[i].KHDA_KHMC ? data[i].KHDA_KHMC : "",
          FYSQ_JQWS: data[i].FYSQ_JQWS ? data[i].FYSQ_JQWS : "",
        });
      }
      list = JSON.stringify(list);
      feeCollection({
        list: list,
        SKMX_SKFS: this.SKMX_SKFS,
      }).then((response) => {
        if (response.returnStatus == "SUCCESS") {
          this.getTableData();
        }
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      var count = 0;
      for (var i in val) {
        count += val[i].FYSQ_QSJE;
      }
      this.arrears = count.toFixed(2);
    },
    getPartitionData(data) {
      this.loading = false;
      this.height =
        this.$refs.KSSF.offsetHeight -
        this.$refs.KSSFForm.$el.offsetHeight -
        110;

      this.tableData = [];
      this.KSSFForm = {
        FJDA_MC: "",
        FJDA_ZJ: "",
        SFXM_ZJ: "",
        KHDA_KHMC: "",
        roomStatus: "",
        FJDA_SFKZ: "",
        pageIndex: 0,
        pageSize: 11,
      };

      queryChargeItem().then((response) => {
        var data = response;
        this.zydata = data;
      });
      queryRoom().then((response) => {
        var data = response;
        data.forEach((item) => {
          item.value = item.FJDA_FJMC;
        });
        this.xmdata = data;
      });
      queryPaymentMethod().then((response) => {
        var data = response;
        this.skdata = data;
        for (var i in data) {
          if (data[i].isDefault == 1) {
            this.SKMX_SKFS = data[i].SFKM_SKFS;
          }
        }
      });
      // this.getTableData()
    },
    getTableData() {
      const parent = this.xmdata;
      const FJDA_MC = this.KSSFForm.FJDA_MC;
      // if (parent.findIndex(d => d.FJDA_FJMC === FJDA_MC) == -1) {
      //   this.tableData = []
      //   return
      // }
      this.$refs["KSSFForm"].validate((valid) => {
        if (valid) {
          this.loading = true;
          var subdata = JSON.parse(JSON.stringify(this.KSSFForm));
          subdata.SFXM_ZJ = subdata.SFXM_ZJ ? subdata.SFXM_ZJ.join(",") : "";
          queryUncollectedFeesByRoom(subdata).then((response) => {
            var data = response.data;
            this.tableData = data;
            this.returnTotal = response.total;

            this.loading = false;
          });
        } else {
          return false;
        }
      });
    },
    downloData() {
      const parent = this.xmdata;
      const FJDA_MC = this.KSSFForm.FJDA_MC;
      // if (parent.findIndex(d => d.FJDA_FJMC === FJDA_MC) == -1) {
      //   return
      // }
      this.$refs["KSSFForm"].validate((valid) => {
        if (valid) {
          exportUncollectedFeesApi(this.KSSFForm).then((response) => {
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
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style lang="scss" scope>
.KSSF .el-dialog-fourfold .el-row {
  margin-bottom: 0;
}
.KSSF .el-loading-mask {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.KSSF .el-loading-spinner {
  top: 50% !important;
  position: absolute;
}

.KSSF .el-input {
  width: 100% !important;
}

.KSSF .el-select {
  width: 100%;
}

.KSSF .arrears {
  font-size: 16px;
  padding: 5px 15px;
  span {
    font-weight: 700;
  }
}

.block {
  padding: 15px 0 5px 0;
  overflow: auto;
  .block_left {
    float: left;
  }
  .block_right {
    float: right;
  }
}

.KSSF .KSSFForm .el-input {
  padding-top: 3px;
}

.KSSF .KSSFForm .el-input-group__append {
  padding: 0;
}

.KSSF .KSSFForm .el-button--default {
  min-width: 0;
  margin-right: 0 !important;
}

.KSSF .el-table td {
  height: 35px !important;
}

.KSSF .el-input__suffix {
  top: 3px;
}

.KSSF .el-autocomplete {
  width: 100%;
}
</style>
