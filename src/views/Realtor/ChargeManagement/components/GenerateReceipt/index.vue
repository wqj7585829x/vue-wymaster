<template>
  <div class="GenerateReceipt">
    <div class="el-content">
      <!-- 搜索框begin -->
      <div class="select">
        <el-form label-width="120px">
          <el-row :gutter="30">
            <el-col :span="6" style="width: 300px">
              <el-form-item label="项目名称:" label-width="70px">
                <el-select
                  v-model="tableParameter.name"
                  @change="PlotChange"
                  clearable
                >
                  <el-option
                    v-for="(item, index) in plotData"
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
                  v-model="tableParameter.contract_num"
                  @change="contraChange"
                  clearable
                >
                  <el-option
                    v-for="(item, index) in projectData"
                    :key="index"
                    :value="item.contract_num"
                    :label="item.contract_num"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="30">
            <el-col :span="6" style="width: 300px">
              <el-form-item label="资源名称:" label-width="70px">
                <el-select
                  v-model="tableParameter.room_name"
                  @change="fjChange"
                  filterable
                  clearable
                >
                  <el-option
                    v-for="(item, index) in resourceData"
                    :key="index"
                    :value="item.room_name"
                    :label="item.room_name"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6" style="width: 300px">
              <el-form-item label="客户名称:" label-width="70px">
                <el-select v-model="tableParameter.KHDA_KHMC" clearable>
                  <el-option
                    v-for="(item, index) in clientData"
                    :key="index"
                    :value="item.KHDA_KHMC"
                    :label="item.KHDA_KHMC"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5" style="width: 370px">
              <el-form-item label="收款年月：" label-width="70px">
                <el-date-picker
                  v-model="tableParameter.produceDate"
                  type="month"
                  value-format="yyyy-MM"
                  placeholder="选择月"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!-- 按钮区域start -->
      <section class="buttonBox">
        <el-row>
          <el-col :span="24">
            <el-button type="primary" @click="generateClick"
              >生成费用</el-button
            >
            <el-button
              type="primary"
              @click="delClick"
              style="margin-left: 20px"
              >删除费用</el-button
            >
          </el-col>
        </el-row>
      </section>
      <!-- 按钮区域end -->
    </div>
  </div>
</template>
<script>
import {
  queryZLPlotApi,
  queryContractRoomNameApi,
  queryContractNumApi,
  queryClientsApi,
  createReceiptApi,
  deleteReceiptApi,
} from "@/api/Realtor/GenerateReceipt"; //房屋租凭生成收款单api
import { mapGetters } from "vuex";
export default {
  name: "GenerateReceipt",
  computed: {
    ...mapGetters(["currentPlot"]), //mapGetters包含addRouters，cachedViews，permission_routers，userName，visitedviews,currentPlot,userPlot
  },
  data() {
    return {
      projectData: [],
      resourceData: [],
      clientData: [],
      tableParameter: {},
      value2: "",
      plotData: [],
    };
  },
  watch: {
    currentPlot() {
      this.tableParameter.name = this.currentPlot;
      this.$nextTick(() => {
        this.getAuthorityList(); //查询项目名称
      });
    },
  },
  mounted() {
    if (this.currentPlot) {
      this.tableParameter.name = this.currentPlot;
      this.getAuthorityList(); //查询项目名称
    }
  },
  methods: {
    getAuthorityList() {
      //查询项目名称
      queryZLPlotApi(this.tableParameter).then((response) => {
        this.plotData = response;
        this.$nextTick(() => {
          this.plotData.forEach((item) => {
            if (item.GLCNAME == this.tableParameter.name) {
              this.tableParameter.plot_id = item.id;
              let newRowData = JSON.parse(JSON.stringify(this.tableParameter)); //拷贝一份存储对象
              this.tableParameter = newRowData; //拷贝一份存储对象引用不同地址
            }
          });
          this.queryChargeItemRequest(); //合同编号查询
          this.queryResoureceRequest(); //查询资源名称
          this.queryClientRequest(); //客户名称查询
        });
      });
    },
    queryChargeItemRequest() {
      //合同编号查询
      queryContractNumApi(this.tableParameter).then((response) => {
        this.projectData = response;
      });
    },
    queryResoureceRequest() {
      //资源名称查询
      queryContractRoomNameApi(this.tableParameter).then((response) => {
        this.resourceData = response;
      });
    },
    queryClientRequest() {
      //客户名称查询
      queryClientsApi(this.tableParameter).then((response) => {
        this.clientData = response;
      });
    },
    PlotChange(val) {
      //项目名称改变事件
      this.tableParameter.KHDA_KHMC = "";
      this.tableParameter.contract_num = "";
      this.tableParameter.room_name = "";
      this.projectData = [];
      this.resourceData = [];
      this.clientData = [];
      let newRowData = JSON.parse(JSON.stringify(this.tableParameter)); //拷贝一份存储对象
      this.tableParameter = newRowData; //拷贝一份存储对象引用不同地址
      this.queryChargeItemRequest(); //合同编号查询
      this.queryResoureceRequest(); //查询资源名称
      this.queryClientRequest(); //客户名称查询
    },
    contraChange(val) {
      this.tableParameter.KHDA_KHMC = "";
      this.tableParameter.room_name = "";
      this.resourceData = [];
      this.clientData = [];
      let newRowData = JSON.parse(JSON.stringify(this.tableParameter)); //拷贝一份存储对象
      this.tableParameter = newRowData; //拷贝一份存储对象引用不同地址
      this.queryResoureceRequest(); //查询资源名称
      this.queryClientRequest(); //客户名称查询
    },
    fjChange(val) {
      //资源名称改变事件
      this.tableParameter.KHDA_KHMC = "";
      this.clientData = [];
      let newRowData = JSON.parse(JSON.stringify(this.tableParameter)); //拷贝一份存储对象
      this.tableParameter = newRowData; //拷贝一份存储对象引用不同地址
      this.queryClientRequest(); //客户名称查询
    },
    generateClick() {
      //生成费用
      createReceiptApi(this.tableParameter).then((response) => {
        if (response.returnStatus == "SUCCESS") {
        }
      });
    },
    delClick() {
      //删除费用
      deleteReceiptApi(this.tableParameter).then((response) => {
        if (response.returnStatus == "SUCCESS") {
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.GenerateReceipt {
  margin: 30px 20px 30px;
  .el-form-item {
    margin-bottom: 20px !important;
  }
  .buttonBox {
    margin-top: 20px;
  }
}
</style>
