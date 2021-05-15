<template>
  <div class="linkCusDialog">
    <el-dialog
      v-dialogDrag
      :title="title"
      class="el-dialog-double"
      :visible.sync="visible"
      @close="cancle"
      :close-on-click-modal="false"
    >
      <!-- 搜索框begin -->
      <div class="select">
        <el-form
          :label-position="labelPosition"
          label-width="85px"
          class="demo-form-inline"
        >
          <el-row :gutter="30">
            <el-col :span="5" style="width: 300px">
              <el-form-item label="客户名称：" label-width="105px">
                <el-input
                  v-model="searchLinkFile.KHDA_KHMC"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="4">
              <el-form-item label-width="0px">
                <el-button type="success" @click="handleCurrentChange(1)"
                  >查询</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <!-- 搜索框end -->

      <el-table
        ref="singleTable"
        :data="tableData"
        height="330"
        border
        @row-click="rowclick"
        style="width: 100%"
      >
        <el-table-column label="选择" width="50" fixed>
          <template slot-scope="scope">
            <el-radio :label="scope.$index" v-model="radio">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column
          width="150"
          property="KHDA_KHID"
          label="客户代码"
        ></el-table-column>
        <el-table-column
          width="150"
          property="KHDA_KHMC"
          label="客户名称"
        ></el-table-column>
        <el-table-column
          width="150"
          property="KHDA_KHLX"
          label="客户类型"
        ></el-table-column>
        <el-table-column
          width="150"
          property="KHDA_ZJMC"
          label="证件名称"
        ></el-table-column>
        <el-table-column
          property="KHDA_ZJHM"
          label="证件号码"
        ></el-table-column>
      </el-table>
      <!-- 分页begin -->
      <div class="block" v-if="returnTotal > searchLinkFile.pageSize">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="searchLinkFile.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="returnTotal"
        >
        </el-pagination>
      </div>
      <!-- 分页end -->
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sure" :disabled="disabledo"
          >确 定</el-button
        >
        <el-button @click="cancle">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  queryExistingCustomer,
  linkExistingCustomer,
} from "@/api/BasicManagement/CustomerFile";
export default {
  data() {
    return {
      labelPosition: "left",
      visible: this.show,
      title: "链接客户", //标题
      currentPage: 1, //当前页
      returnTotal: 10, //总共条数
      tableRow: {}, //修改数据
      radio: "", //单选按钮
      tableData: [], //列表参数
      disabledo: "", //链接确定按钮
      searchLinkFile: {
        GLCID: "",
        YXDID: "",
        KHDA_ZT: "1",
        FKGX_FJWJ: "",
        FKGX_ZT: "1",
        KHDA_KHMC: "",
        FCDM_LXID: "3",
        pageIndex: 0,
        pageSize: 10,
      },
    };
  },
  props: {
    linkshow: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    linkshow() {
      this.visible = this.linkshow;
    },
    radio() {
      if (this.radio !== "") {
        this.disabledo = false;
      } else {
        this.disabledo = true;
      }
    },
  },
  methods: {
    getPartitionData(data, type) {
      this.searchLinkFile.GLCID = data.GLCID;
      this.searchLinkFile.YXDID = data.YXDID;
      this.searchLinkFile.FKGX_FJWJ = data.FKGX_FJWJ;
      this.searchLinkFile.FKGX_LX = data.FKGX_LX;
      this.searchLinkFile.FKGX_ZT = data.FKGX_ZT;
      this.getTableData();
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.searchLinkFile.pageIndex = currentPage - 1;
      this.getTableData(); //获取表格数据
      this.radio = ""; //选择后清空选中表格按钮
      this.tableRow = {}; //选择后清空选中表格数据
    },
    rowclick(row) {
      //单行点击单选按钮选中
      this.tableRow = row;
      this.radio = this.tableData.indexOf(row); //单行点击单选按钮选中
    },
    // 表数据
    getTableData() {
      queryExistingCustomer(this.searchLinkFile).then((response) => {
        this.tableData = response.data;
        this.returnTotal = response.total;
        this.radio = ""; //选择后清空选中表格按钮
        this.tableRow = {}; //选择后清空选中表格数据
      });
    },
    //   链接
    sure() {
      var _this = this;
      linkExistingCustomer({
        FKGX_LX: this.searchLinkFile.FKGX_LX,
        FKGX_ZT: this.searchLinkFile.FKGX_ZT,
        FKGX_SFSFDX: "1",
        FKGX_FJWJ: this.searchLinkFile.FKGX_FJWJ,
        FKGX_KHWJ: this.tableRow.KHDA_ZJ,
        GLCID: this.searchLinkFile.GLCID,
        YXDID: this.searchLinkFile.YXDID,
      }).then((response) => {
        if (response.returnStatus == "SUCCESS") {
          _this.$emit("RefreshItem");
          _this.cancle();
        }
      });
    },
    // 取消
    cancle() {
      this.$emit("update:linkshow", false);
    },
  },
};
</script>

<style lang="scss">
.linkCusDialog .select {
  margin-bottom: 30px;
}
</style>
