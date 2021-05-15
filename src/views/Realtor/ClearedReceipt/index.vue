<template>
  <!--已收清费用-->
  <div class="ClearedReceipt">
    <!-- 搜索框begin -->
    <!-- 搜索框begin -->
    <div class="select">
      <el-form label-width="120px">
        <el-row :gutter="30">
          <el-col :span="6" style="width: 300px">
            <el-form-item label="项目名称:" label-width="70px">
              <el-select v-model="tableParameter.name" @change="PlotChange">
                <el-option
                  v-for="(item, index) in userPlot"
                  :key="index"
                  :value="item.GLCNAME"
                  :label="item.GLCNAME"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="width: 300px">
            <el-form-item label="合同编号:" label-width="70px">
              <el-select
                v-model="tableParameter.FYSQ_HTWJ"
                @change="contractChange"
                clearable
              >
                <el-option
                  v-for="item in proChargeData"
                  :key="item.contract_id"
                  :value="item.contract_id"
                  :label="item.contract_num"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="width: 300px">
            <el-form-item label="房间号:" label-width="70px">
              <el-select
                v-model="tableParameter.FJDA_ZJ"
                @change="fjhChange"
                clearable
              >
                <el-option
                  v-for="item in resourceData"
                  :key="item.FJDA_ZJ"
                  :value="item.FJDA_ZJ"
                  :label="item.FJDA_FJMC"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" style="width: 300px">
            <el-form-item label="客户名称:" label-width="70px">
              <el-select v-model="tableParameter.KHDA_ZJ" clearable>
                <el-option
                  v-for="item in clientData"
                  :key="item.KHDA_ZJ"
                  :value="item.KHDA_ZJ"
                  :label="item.KHDA_KHMC"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5" style="width: 300px">
            <el-form-item label="开始日期：" label-width="70px">
              <el-date-picker
                v-model="tableParameter.startTime"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="5" style="width: 300px">
            <el-form-item label="结束日期：" label-width="70px">
              <el-date-picker
                v-model="tableParameter.endTime"
                type="date"
                placeholder="选择日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="3" style="width: 0">
            <el-form-item label-width="0">
              <el-button
                type="success"
                @click="submit()"
                v-has="'FeereClearedReceiptQuery_has'"
                >查询</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="standardTable">
      <u-table
        ref="multipleTable"
        style="width: 100%"
        max-height="550"
        :data="tableData"
        border
        use-virtual
        :row-height="30"
        class="commonTable"
      >
        <u-table-column
          label="资源代码"
          prop="FJDA_FJID"
          width="200"
        ></u-table-column>
        <u-table-column
          label="所属年月"
          prop="FYSQ_SSNY"
          width="150"
        ></u-table-column>
        <u-table-column
          label="收费项目"
          prop="FYSQ_SFXMMC"
          width="120"
          show-overflow-tooltip
        ></u-table-column>
        <u-table-column label="应收金额（含税）" width="120">
          <template slot-scope="scope">
            {{ formatMoney(scope.row.FYSQ_YSJE) }}
          </template>
        </u-table-column>
        <u-table-column label="实收金额" width="100">
          <template slot-scope="scope">
            {{ formatMoney(scope.row.FYSQ_SSJE) }}
          </template>
        </u-table-column>
        <u-table-column
          label="税率"
          prop="FYSQ_YSSL"
          width="150"
        ></u-table-column>
        <u-table-column label="实收(不含税)" width="150">
          <template slot-scope="scope">
            {{ formatMoney(scope.row.FYSQ_SSBHS) }}
          </template>
        </u-table-column>
        <u-table-column
          label="费用区间"
          prop="FYSQ_ZY"
          show-overflow-tooltip
        ></u-table-column>
        <u-table-column
          label="备注"
          prop="FYSQ_BZ"
          show-overflow-tooltip
        ></u-table-column>
      </u-table>
    </div>
    <!-- 表 end -->
  </div>
</template>
<script>
import {
  queryZLRoomApi,
  queryContractListApi,
  queryClientsApi,
  queryClearedChargeApi,
} from "@/api/Realtor/ClearedReceipt"; //已收清js
import { mapGetters } from "vuex";
import { formatMoney } from "@/utils/global.js";
import { UTable, UTableColumn } from "umy-ui";
export default {
  name: "ClearedReceipt",
  components: { UTable, UTableColumn },
  computed: {
    ...mapGetters(["currentPlot", "userPlot"]), //mapGetters包含addRouters，cachedViews，permission_routers，userName，visitedviews,currentPlot,userPlot
  },
  data() {
    return {
      radio: "", //单选按钮
      tableParameter: {
        //搜索列表参数
        contractId: "",
        customerId: "",
        roomId: "",
        startTime: "",
        endTime: "",
        dbName: "",
        GLCID: "",
        YXDID: "",
      },
      tableData: [],
      resourceData: [], //房间号数据
      proChargeData: [], //合同管理主键
      clientData: [], //客户名称数据
    };
  },
  watch: {
    currentPlot() {
      this.tableParameter.name = this.currentPlot; //监听//当前选中的小区
    },
    userPlot() {
      console.log("userPlot:" + JSON.stringify(this.userPlot));
      this.userPlot.forEach((item) => {
        if (item.GLCNAME == this.currentPlot) {
          this.tableParameter.dbName = item.dbName;
          this.tableParameter.GLCID = item.GLCID;
          this.tableParameter.YXDID = item.YXDID;
          let newRowData = JSON.parse(JSON.stringify(this.tableParameter)); //拷贝一份存储对象
          this.tableParameter = newRowData; //拷贝一份存储对象引用不同地址
          this.$nextTick(() => {
            this.queryContractRequest(); //合同编号查询
            this.getTableData(); //列表数据
          });
        }
      });
    },
  },
  mounted() {
    if (sessionStorage.getItem("GLCNAME")) {
      this.tableParameter.name = sessionStorage.getItem("GLCNAME"); //当前选中的小区
    } else {
      this.tableParameter.name = this.currentPlot; //当前选中的小区
    }
    this.userPlot.forEach((item) => {
      if (item.GLCNAME == this.tableParameter.name) {
        this.tableParameter.dbName = item.dbName;
        this.tableParameter.GLCID = item.GLCID;
        this.tableParameter.YXDID = item.YXDID;
        let newRowData = JSON.parse(JSON.stringify(this.tableParameter)); //拷贝一份存储对象
        this.tableParameter = newRowData; //拷贝一份存储对象引用不同地址
        this.$nextTick(() => {
          this.queryContractRequest(); //合同编号查询
          this.getTableData(); //列表数据
        });
      }
    });
  },
  methods: {
    formatMoney(data) {
      if (data) {
        return data >= 0
          ? formatMoney(data, true)
          : `-${formatMoney(0 - data, true)}`;
      }
    },
    // 获取表数据
    getTableData() {
      queryClearedChargeApi(this.tableParameter).then((response) => {
        this.tableData = response.data;
      });
    },
    queryResoureceRequest() {
      //资源名称查询
      queryZLRoomApi(this.tableParameter).then((response) => {
        this.resourceData = response;
      });
    },
    queryClientRequest() {
      //客户名称查询
      queryClientsApi(this.tableParameter).then((response) => {
        this.clientData = response;
      });
    },
    queryContractRequest() {
      //合同编码查询
      queryContractListApi(this.tableParameter).then((response) => {
        this.proChargeData = response;
      });
    },
    PlotChange(val) {
      //项目名称改变事件
      this.tableParameter.FJDA_ZJ = "";
      this.tableParameter.KHDA_ZJ = "";
      this.tableParameter.FYSQ_HTWJ = "";
      if (val) {
        this.userPlot.forEach((item) => {
          if (item.GLCNAME == val) {
            this.tableParameter.dbName = item.dbName;
            this.tableParameter.GLCID = item.GLCID;
            this.tableParameter.YXDID = item.YXDID;
            sessionStorage.setItem("GLCNAME", val);
          }
        });
      } else {
        this.tableParameter.dbName = "";
        this.tableParameter.GLCID = "";
        this.tableParameter.YXDID = "";
        this.resourceData = [];
        this.clientData = [];
      }
      let newRowData = JSON.parse(JSON.stringify(this.tableParameter)); //拷贝一份存储对象
      this.tableParameter = newRowData; //拷贝一份存储对象引用不同地址
      this.queryContractRequest(); //合同编号查询
    },
    contractChange(val) {
      //合同编码改变事件
      this.tableParameter.FJDA_ZJ = "";
      this.tableParameter.KHDA_ZJ = "";
      if (val) {
        this.queryResoureceRequest(); //资源名称查询
      } else {
        this.resourceData = [];
        this.clientData = [];
      }
      let newRowData = JSON.parse(JSON.stringify(this.tableParameter)); //拷贝一份存储对象
      this.tableParameter = newRowData; //拷贝一份存储对象引用不同地址
    },
    fjhChange(val) {
      this.tableParameter.KHDA_ZJ = "";
      if (val) {
        this.queryClientRequest();
      } else {
        this.clientData = [];
      }
      let newRowData = JSON.parse(JSON.stringify(this.tableParameter)); //拷贝一份存储对象
      this.tableParameter = newRowData; //拷贝一份存储对象引用不同地址
    },
    submit() {
      this.getTableData();
      //查询
    },
  },
};
</script>
<style lang="scss">
.ClearedReceipt {
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 170px;
  }
}
</style>
