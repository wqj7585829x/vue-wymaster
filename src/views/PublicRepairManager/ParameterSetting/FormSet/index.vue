<!-- 表单设置 -->
<template>
  <div class="FormSet">
    <div class="el-content">
      <el-row>
        <el-col :span="24">
          <el-button
            type="primary"
            @click="addForm()"
            v-has="'ParameFormSetAdd_has'"
            >新增</el-button
          >
          <el-button
            type="primary"
            @click="doneForm()"
            :disabled="disabledupdate"
            :title="updateTitle()"
            v-has="'ParameFormSetDone_has'"
            >用完</el-button
          >
          <el-button
            type="primary"
            @click="clearForm()"
            :disabled="disabledupdate"
            :title="updateTitle()"
            v-has="'ParameFormSetClear_has'"
            >核消</el-button
          >
          <el-button
            type="danger"
            @click="deletePaymentWay()"
            :disabled="disabledupdate"
            :title="updateTitle()"
            v-has="'ParameFormSetDel_has'"
            >删除</el-button
          >
        </el-col>
      </el-row>
      <el-row class="sysCon_Mt">
        <!-- 表格 -->
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          class="tableContent"
          @row-click="rowClick"
        >
          <el-table-column label="选择" width="50" fixed>
            <template slot-scope="scope">
              <el-radio :label="scope.$index" v-model="radio">&nbsp;</el-radio>
            </template>
          </el-table-column>
          <el-table-column
            prop="WXJBDLY_BDMC"
            label="表单名称"
          ></el-table-column>
          <el-table-column
            prop="WXJBDLY_BDLX"
            label="表单类型"
          ></el-table-column>
          <el-table-column
            prop="WXJBDLY_BDZT"
            label="表单状态"
          ></el-table-column>
          <el-table-column
            prop="WXJBDLY_BDBHQZ"
            label="编号前缀"
          ></el-table-column>
          <el-table-column
            prop="WXJBDLY_BDBHCD"
            label="编号长度"
          ></el-table-column>
          <!-- <el-table-column prop="WXJBDLY_NY" label="维修年月"></el-table-column> -->
          <el-table-column
            prop="WXJBDLY_BZ"
            label="备注"
            width="250"
          ></el-table-column>
        </el-table>
      </el-row>
    </div>
    <!--新增弹窗 start-->
    <FormSetDialog
      :showdialog.sync="showdialog"
      ref="children"
      @RefreshItem="RefreshList"
    ></FormSetDialog>
    <!--修改弹窗 end-->
  </div>
</template>
<script>
import FormSetDialog from "./components/FormSetDialog";
import {
  queryForm,
  updateState,
  delForm,
  administrativeAndOperating,
} from "@/api/PublicRepairManager/ParameterSetting";
export default {
  data() {
    return {
      tableOnceData: {},
      radio: "",
      showdialog: false, //默认不弹窗,
      disabledupdate: true, //修改 删除按钮 默认不可用
      tableData: [],
      tableParameter: {
        //列表参数
        GLCID: null,
        YXDID: null,
      },
    };
  },
  watch: {
    radio() {
      //只能点击选中按钮才显示修改与删除
      if (this.radio !== "") {
        this.disabledupdate = false;
      } else {
        this.disabledupdate = true;
      }
    },
  },
  methods: {
    getRowTable() {
      this.getTabList(); //查询列表数据
      this.getAddParamer(); //查询新增传递参数id
    },
    getTabList() {
      //获取列表数据
      queryForm().then((response) => {
        this.tableData = response;
      });
    },
    getAddParamer() {
      administrativeAndOperating().then((response) => {
        this.tableParameter.GLCID = response.GLCID;
        this.tableParameter.YXDID = response.YXDID;
      });
    },
    rowClick(row) {
      this.tableOnceData = row;
      this.radio = this.tableData.indexOf(row); //单行点击单选按钮选中
    },
    addForm() {
      //新增
      this.radio = ""; //选择后清空选中表格按钮
      this.showdialog = true;
      this.$refs.children.getData(
        this.tableParameter.GLCID,
        this.tableParameter.YXDID
      );
    },
    doneForm() {
      //用完
      this.tableOnceData.bdStatus = "用完";
      updateState(this.tableOnceData).then((response) => {
        this.radio = ""; //清空选中
        this.getTabList();
      });
    },
    clearForm() {
      //核消
      this.tableOnceData.bdStatus = "核消";
      updateState(this.tableOnceData).then((response) => {
        this.radio = ""; //清空选中
        this.getTabList();
      });
    },
    deletePaymentWay() {
      //删除
      this.$confirm("此操作将永久删除此对应数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delForm(this.tableOnceData.WXJBDLY_ZJ).then((response) => {
            this.radio = ""; //清空选中
            this.getTabList();
          });
        })
        .catch(() => {
          this.radio = ""; //清空选中
        });
    },
    RefreshList() {
      //刷新列表
      this.getTabList();
    },
    updateTitle() {
      //设置默认收款方式 修改 删除提示
      return this.radio === "" ? "请选择表格对应数据" : "";
    },
  },
  components: {
    FormSetDialog,
  },
};
</script>

<style lang="scss" scoped>
.FormSet {
  position: relative;
  .el-content {
    padding: 30px 30px 0 30px;
    .sysCon_Mt {
      margin-top: 28px;
    }
  }
  .el-input__inner {
    width: 100%;
  }
  .el-paginationR {
    text-align: right;
    margin-top: 20px;
  }
  .el-radio__label {
    padding: 0;
  }
  .gb_img {
    position: absolute;
    right: 0;
    top: 0;
    padding: 10px;
  }
}
</style>
