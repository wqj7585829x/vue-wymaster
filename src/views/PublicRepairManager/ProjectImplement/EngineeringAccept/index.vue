<template>
  <div class="EngineeringAccept">
    <!-- 右边内容区域 -->
    <div class="el-content">
      <!-- 按钮操作 -->
      <section class="buttonBox">
        <el-row>
          <el-col :span="24">
            <el-button
              type="primary"
              @click="add()"
              :disabled="disabledAdd"
              v-has="'ProjectImplementAcceptAdd_has'"
              >新增</el-button
            >
            <el-button
              type="primary"
              @click="update()"
              :disabled="disabledupdate"
              v-has="'ProjectImplementAcceptUpdate_has'"
              >修改</el-button
            >
            <el-button
              type="danger"
              @click="deleteTab()"
              :disabled="disabledelete"
              v-has="'ProjectImplementAcceptDel_has'"
              >删除</el-button
            >
            <el-button type="danger" @click="dropout()">关闭</el-button>
          </el-col>
        </el-row>
      </section>
      <!-- 表格 -->
      <el-row class="sysCon_Mt">
        <el-table
          :data="tableData"
          style="width: 100%"
          border
          class="tableContent"
          ref="singleTable"
          @row-click="rowClick"
        >
          <el-table-column label="选择" width="50">
            <template slot-scope="scope">
              <el-radio :label="scope.$index" v-model="radio">&nbsp;</el-radio>
            </template>
          </el-table-column>
          <el-table-column
            prop="GCYS_YSBH"
            label="验收编号"
            width="200"
          ></el-table-column>
          <el-table-column
            prop="GCYS_CCYSSJ"
            label="初次验收时间"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="GCYS_ZZYSSJ"
            label="最终验收时间"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="GCYS_YSQK"
            label="验收情况"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="GCYS_SM"
            label="说明"
            width="150"
          ></el-table-column>
          <el-table-column prop="GCYS_SFHG" label="是否合格" width="100">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.GCYS_SFHG" disabled></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column
            prop="GCYS_YSJR"
            label="验收结论"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="GCYS_YSR"
            label="验收人"
            width="100"
          ></el-table-column>
        </el-table>
      </el-row>
    </div>
    <!-- 弹窗 单列布局start -->
    <AcceptDialog
      :showdialog.sync="showdialog"
      @RefreshItem="RefreshList"
      ref="PopChildren"
    ></AcceptDialog>
  </div>
</template>
<script>
import {
  queryBigAcceptanceProject,
  querySmallAcceptanceProject,
  deleteAcceptanceBigProject,
  deleteAcceptanceLittleProject,
} from "@/api/PublicRepairManager/ProjectImplement"; //工程实施Api
import AcceptDialog from "./components/AcceptDialog";
export default {
  name: "EngineeringAccept",
  data() {
    return {
      disabledAdd: true, //新增
      disabledupdate: true, //修改
      disabledelete: true, //删除
      radio: "", //选中
      tableData: [],
      tableRow: {}, //修改数据
      showdialog: false,
      tableParameter: {},
      optType: 1, //1大项目  2小项目
    };
  },
  components: {
    AcceptDialog,
  },
  mounted() {},
  watch: {
    radio() {
      //只能点击选中按钮才显示修改与删除
      if (this.radio !== "") {
        this.disabledupdate = false;
        this.disabledelete = false;
      } else {
        this.disabledupdate = true;
        this.disabledelete = true;
      }
    },
  },
  methods: {
    getData(data, type) {
      this.radio = "";
      this.optType = type;
      let newRowData = JSON.parse(JSON.stringify(data)); //拷贝一份存储对象
      this.tableParameter = newRowData; //拷贝一份存储对象引用不同地址
      this.getTableList();
    },
    getTableList() {
      //表格数据查询
      if (this.optType == 1) {
        queryBigAcceptanceProject(this.tableParameter.WXDJ_ZJ).then(
          (response) => {
            this.tableData = response;
            if (this.tableData.length > 0) {
              this.disabledAdd = true;
            } else {
              this.disabledAdd = false;
            }
          }
        );
      } else {
        querySmallAcceptanceProject(this.tableParameter.WXDJ_ZJ).then(
          (response) => {
            this.tableData = response;
            if (this.tableData.length > 0) {
              this.disabledAdd = true;
            } else {
              this.disabledAdd = false;
            }
          }
        );
      }
    },
    rowClick(row) {
      //表格单行点击
      this.tableRow = row;
      this.radio = this.tableData.indexOf(row); //单行点击单选按钮选中
      this.haveChildrenOrg = row.haveChildrenOrg; //为true  不可删除
    },
    add() {
      this.showdialog = true;
      this.$refs.PopChildren.getData({}, this.tableParameter, 1, this.optType);
      this.radio = ""; //选择后清空选中表格按钮
      this.tableRow = {}; //选择后清空选中表格数据
    },
    update() {
      if (Object.keys(this.tableRow) != "") {
        this.showdialog = true;
        this.$refs.PopChildren.getData(
          this.tableRow,
          this.tableParameter,
          2,
          this.optType
        );
      }
    },
    RefreshList(newRowObj, type) {
      //刷新
      this.optType = type;
      this.getTableList();
      this.tableRow = newRowObj; //弹窗确定后更新表格选中值
    },
    dropout() {
      this.$emit("RefreshItem", this.tableParameter, this.optType);
    },
    deleteTab() {
      this.tableRow.WXDJ_ZJ = this.tableParameter.WXDJ_ZJ;
      //删除选中表格数据
      if (Object.keys(this.tableRow) != "") {
        this.$confirm("此操作将永久删除此对应数据, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            if (this.optType == 1) {
              deleteAcceptanceBigProject(this.tableRow).then((response) => {
                this.radio = ""; //清空选中
                this.getTableList();
              });
            } else {
              deleteAcceptanceLittleProject(this.tableRow).then((response) => {
                this.radio = ""; //清空选中
                this.getTableList();
              });
            }
          })
          .catch(() => {
            this.radio = ""; //清空选中
          });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.EngineeringAccept {
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
