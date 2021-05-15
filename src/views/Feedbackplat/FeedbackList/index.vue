<template>
  <div class="container">
    <!-- 右边内容区域 -->
    <div class="el-content">
      <!-- 搜索框start -->
      <section class="searchBox">
        <el-form label-width="100px" :model="tableParameter">
          <el-row :gutter="30">
            <el-col :span="4" style="width: 250px">
              <el-form-item label="管理处名称:">
                <el-select
                  v-model="tableParameter.BMJG_ZJ"
                  placeholder="管理处名称"
                  clearable
                >
                  <el-option
                    v-for="item in PlotLisArray"
                    :key="item.BMJG_ZJ"
                    :label="item.GLCNAME"
                    :value="item.BMJG_ZJ"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="4" style="width: 250px">
              <el-form-item label="反馈标题:">
                <el-input
                  v-model="tableParameter.feedback_title"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="4" style="width: 250px">
              <el-form-item label="电话:">
                <el-input
                  v-model="tableParameter.owner_mobile"
                  placeholder="反馈人电话"
                  clearable
                ></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="4" style="width: 250px">
              <el-form-item label="类别选择：">
                <el-select
                  v-model="tableParameter.category_id"
                  placeholder="请选择"
                  @change="categorySel"
                  @clear="clearCate"
                  clearable
                >
                  <el-option
                    v-for="item in categoryNameOptions"
                    :key="item.category_id"
                    :label="item.category_name"
                    :value="item.category_id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="4" style="width: 250px">
              <el-form-item label="类型选择：">
                <el-select
                  v-model="tableParameter.type_id"
                  placeholder="请选择"
                  ref="typeclear"
                  clearable
                >
                  <el-option
                    v-for="item in typeNameOptions"
                    :key="item.type_id"
                    :label="item.type_name"
                    :value="item.type_id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="4" style="width: 250px">
              <el-form-item label="状态：">
                <el-select
                  v-model="tableParameter.status"
                  placeholder="请选择"
                  clearable
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="4" style="width: 250px">
              <el-form-item label="紧急程度：">
                <el-select
                  v-model="tableParameter.urgent_level"
                  placeholder="请选择"
                  clearable
                >
                  <el-option
                    v-for="item in urgent_levelArry"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="4" style="width: 250px">
              <el-form-item label="创建日期开始：">
                <el-date-picker
                  v-model="tableParameter.create_time_start"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder=""
                  style="width: 120px"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="4" style="width: 250px">
              <el-form-item label="创建日期结束：">
                <el-date-picker
                  v-model="tableParameter.create_time_end"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder=""
                  style="width: 120px"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="4" style="width: 250px">
              <el-form-item label="完成日期开始：">
                <el-date-picker
                  v-model="tableParameter.process_finish_time_start"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder=""
                  style="width: 120px"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="4" style="width: 250px">
              <el-form-item label="完成日期结束：">
                <el-date-picker
                  v-model="tableParameter.process_finish_time_end"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder=""
                  style="width: 120px"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="4" style="width: 250px">
              <el-form-item label="关单日期开始：">
                <el-date-picker
                  v-model="tableParameter.close_time_start"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder=""
                  style="width: 120px"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="4" style="width: 250px">
              <el-form-item label="关单日期结束：">
                <el-date-picker
                  v-model="tableParameter.close_time_end"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  type="date"
                  placeholder=""
                  style="width: 120px"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="2" style="width: 100px">
              <el-form-item label-width="0px">
                <el-button
                  type="success"
                  @click="search"
                  v-has="'FeedbackSearch_has'"
                  >查询</el-button
                >
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <el-form-item label-width="0px">
                <el-button
                  type="success"
                  @click="exportFeedExcel"
                  v-has="'FeedbackExport_has'"
                  >导出</el-button
                >
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </section>
      <!-- 搜索框end -->
      <!-- 按钮操作 -->
      <section class="buttonBox">
        <el-row>
          <el-col :span="24">
            <el-button
              type="primary"
              @click="add()"
              :title="addTitle"
              v-has="'FeedbackAdd_has'"
              >新增</el-button
            >
            <el-button
              type="primary"
              @click="update()"
              :disabled="disabledupdate"
              v-has="'FeedbackCate_has'"
              >分类</el-button
            >
            <el-button
              type="primary"
              @click="pdpop()"
              :disabled="disabledpd"
              v-has="'FeedbackPD_has'"
              >派单</el-button
            >
            <el-button
              type="danger"
              @click="closepop()"
              :disabled="disableClose"
              v-has="'FeedbackClose_has'"
              >关单</el-button
            >
            <el-button
              type="danger"
              @click="Recordpop()"
              :disabled="disableRecord"
              v-has="'FeedbackRecord_has'"
              >处理记录</el-button
            >
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
            prop="GLCNAME"
            label="管理处名称"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="room_no"
            label="房间号"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="feedback_title"
            label="反馈标题"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="feedback_content"
            label="反馈内容"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="owner_mobile"
            label="反馈人电话"
            width="150"
          ></el-table-column>
          <el-table-column prop="feedback_image" label="反馈图片" width="150">
            <template slot-scope="scope">
              <span
                v-for="(item, index) in scope.row.feedback_image"
                :key="index"
              >
                <el-popover placement="top-start" title="" trigger="hover">
                  <img :src="item" alt="" style="width: 150px; height: 150px" />
                  <img
                    slot="reference"
                    :src="item"
                    style="width: 30px; height: 30px"
                  />
                </el-popover>
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="Category_Name"
            label="类别名称"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="type_name"
            label="类型名称"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="repair_address"
            label="报修地址"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="repair_person"
            label="报修人"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="repair_mobile"
            label="报修人电话"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="assign_time"
            label="最后指派时间"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="finally_engineer_user"
            label="最后处理人员"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="attention"
            label="注意事项"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="received_time"
            label="最后接单时间"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="process_result"
            label="最后处理结果"
            width="150"
          >
            <template slot-scope="scope">
              {{ scope.row.process_result == 0 ? "待处理" : "" }}
              {{ scope.row.process_result == 1 ? "已查看" : "" }}
              {{ scope.row.process_result == 2 ? "已完成" : "" }}
              {{ scope.row.process_result == 3 ? "未完成" : "" }}
            </template>
          </el-table-column>
          <el-table-column
            prop="process_remark"
            label="最后处理情况"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="process_finish_image"
            label="最后处理图片"
            width="150"
          >
            <template slot-scope="scope">
              <span
                v-for="(item, index) in scope.row.process_finish_image"
                :key="index"
              >
                <el-popover placement="top-start" title="" trigger="hover">
                  <img :src="item" alt="" style="width: 150px; height: 150px" />
                  <img
                    slot="reference"
                    :src="item"
                    style="width: 30px; height: 30px"
                  />
                </el-popover>
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="process_finish_time"
            label="处理完成时间"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="comment_satisfied"
            label="反馈人满意度"
            width="150"
          >
            <template slot-scope="scope">
              {{ scope.row.comment_satisfied == 1 ? "满意" : "" }}
              {{ scope.row.comment_satisfied == 2 ? "一般" : "" }}
              {{ scope.row.comment_satisfied == 3 ? "不满意" : "" }}
            </template>
          </el-table-column>
          <el-table-column
            prop="owner_comment"
            label="反馈人评价"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="close_time"
            label="关单时间"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="close_remark"
            label="关单说明"
            width="150"
          ></el-table-column>
          <el-table-column
            prop="close_user"
            label="关单人员"
            width="150"
          ></el-table-column>
          <el-table-column prop="status" label="状态" width="200">
            <template slot-scope="scope">
              {{ scope.row.status == 0 ? "待分配" : "" }}
              {{ scope.row.status == 1 ? "待指派" : "" }}
              {{ scope.row.status == 2 ? "进行中" : "" }}
              {{ scope.row.status == 3 ? "已完成" : "" }}
              {{ scope.row.status == 4 ? "已取消" : "" }}
            </template>
          </el-table-column>
          <el-table-column prop="urgent_level" label="紧急程度" width="150">
            <template slot-scope="scope"
              >{{ scope.row.urgent_level == 1 ? "紧急" : ""
              }}{{ scope.row.urgent_level == 2 ? "一般" : "" }}</template
            >
          </el-table-column>
          <el-table-column prop="feedback_source" label="数据来源" width="150">
            <template slot-scope="scope">
              {{ scope.row.feedback_source == 0 ? "公众号-业主" : "" }}
              {{ scope.row.feedback_source == 1 ? "后台" : "" }}
              {{ scope.row.feedback_source == 2 ? "公众号-内部" : "" }}
            </template>
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="创建时间"
            width="150"
          ></el-table-column>
        </el-table>
      </el-row>
      <el-row>
        <div class="el-paginationR" v-if="returnTotal">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="tableParameter.pageSize"
            layout="prev, pager, next, jumper"
            :total="returnTotal"
          >
          </el-pagination>
        </div>
      </el-row>
    </div>
    <!-- 弹窗新增 布局start -->
    <FeedAddDialog
      :showdialog.sync="showdialog"
      ref="PopChildren"
      @RefreshItem="RefreshList"
    ></FeedAddDialog>
    <!-- 弹窗分类 布局start -->
    <FeedFlDialog
      :showdialogFl.sync="showdialogFl"
      ref="PopChildrenFl"
      @RefreshItem="RefreshList"
    ></FeedFlDialog>
    <!-- 弹窗派单 布局start -->
    <FeedPDDialog
      :showdialogPD.sync="showdialogPD"
      ref="PopChildrenPD"
      @RefreshItem="RefreshList"
    ></FeedPDDialog>
    <!-- 弹窗关单 布局start -->
    <FeedCloseDialog
      :showdialogClose.sync="showdialogClose"
      ref="PopChildrenClose"
      @RefreshItem="RefreshList"
    ></FeedCloseDialog>
    <!-- 弹窗处理记录 布局start -->
    <FeedRecordDialog
      :showdialogRecord.sync="showdialogRecord"
      ref="PopChildrenRecord"
      @RefreshItem="RefreshList"
    ></FeedRecordDialog>
  </div>
</template>
<script>
import FeedAddDialog from "./components/FeedAddDialog";
import FeedFlDialog from "./components/FeedFlDialog";
import FeedPDDialog from "./components/FeedPDDialog";
import FeedCloseDialog from "./components/FeedCloseDialog";
import FeedRecordDialog from "./components/FeedRecordDialog";
import {
  queryFeedTypeApi,
  PlotLisApi,
  categoryNameOptionsApi,
  typeArryApi,
  addFeedListApi,
  exportFeedExcelApi,
} from "@/api/Feedbackplat/FeedbackList";
export default {
  name: "FeedbackList",
  data() {
    return {
      disabledAdd: false, //新增
      disabledupdate: true, //修改
      disabledpd: true, //派单
      disableClose: true, //关单
      disableRecord: true, //处理记录
      radio: "", //选中
      tableData: [],
      tableRow: {},
      showdialog: false, //新增
      showdialogFl: false, //分类
      showdialogPD: false, //派单
      showdialogClose: false, //关单
      showdialogRecord: false, //处理记录
      currentPage: 1, //当前页
      returnTotal: null, //总共条数
      currentPage: 1, //当前页
      returnTotal: null, //总共条数
      tableParameter: {
        pageIndex: 0,
        pageSize: 10,
      },
      PlotLisArray: [], //小区列表数组
      categoryNameOptions: [], //下拉类别
      typeNameOptions: [], //下拉类型
      urgent_levelArry: [
        { value: 1, label: "紧急" },
        { value: 2, label: "一般" },
      ],
      options: [
        { value: 0, label: "待分配" },
        { value: 1, label: "待指派" },
        { value: 2, label: "进行中" },
        { value: 3, label: "已完成" },
        { value: 4, label: "已取消" },
      ],
      addTitle: "新增", //新增按钮 提示信息,
      CheckOrgId: null, //选择部门  默认选中id
      SupName: "", //上级机够名称
      ClickOrgId: null, //记录点击过的id
      isShowSync: false, //默认隐藏数据同步按钮
    };
  },
  components: {
    FeedAddDialog,
    FeedFlDialog,
    FeedPDDialog,
    FeedCloseDialog,
    FeedRecordDialog,
  },
  mounted() {
    this.PlotLis(); //查询小区列表
    this.categoryNameOptionsArray();
    this.queryOrgan(); //查询机构列表
  },
  watch: {
    radio() {
      //只能点击选中按钮才显示修改与删除
      if (this.radio !== "") {
        if (this.tableRow.feedback_id) {
          this.disabledupdate = false;
          this.disabledpd = false;
          this.disableClose = false;
          this.disableRecord = false;
        }
        if (this.tableRow.status == 3 || this.tableRow.status == 4) {
          this.disabledupdate = true;
          this.disabledpd = true;
          this.disableClose = true;
        } else {
          this.disabledupdate = false;
          this.disabledpd = false;
          this.disableClose = false;
          this.disableRecord = false;
        }
      } else {
        this.disabledupdate = true;
        this.disabledpd = true;
        this.disableClose = true;
        this.disableRecord = true;
      }
    },
  },
  methods: {
    //查询所有小区
    PlotLis() {
      PlotLisApi().then((response) => {
        this.PlotLisArray = response;
      });
    },
    //下拉小区
    plotSel() {
      this.PlotLisArray.forEach((item) => {
        if (item.BMJG_ZJ === this.formList.BMJG_ZJ) {
          this.tableParameter.GLCID = item.GLCID;
          this.tableParameter.YXDID = item.YXDID;
          this.tableParameter.JT_ZJ = item.JT_ZJ;
        }
      });
    },
    //查询类别下拉
    categoryNameOptionsArray() {
      categoryNameOptionsApi().then((response) => {
        this.categoryNameOptions = response;
      });
    },
    //类别下拉选择查询类型
    categorySel() {
      this.$set(this.tableParameter, "type_id", ""); //清空二级输入框值
      typeArryApi(this.tableParameter.category_id).then((resonse) => {
        this.typeNameOptions = resonse;
      });
    },
    //清空下拉类别清空下拉类型
    clearCate() {
      this.$set(this.tableParameter, "type_id", ""); //清空二级输入框值
    },
    handleCurrentChange(currentPage) {
      //分页点击
      this.tableParameter.pageIndex = currentPage - 1;
      this.queryOrgan();
      this.radio = ""; //清空选中
    },
    rowClick(row) {
      //表格单行点击
      this.tableRow = row;
      this.radio = this.tableData.indexOf(row); //单行点击单选按钮选中
    },
    search() {
      this.queryOrgan();
    },
    exportFeedExcel() {
      //数据导出
      this.search();
      exportFeedExcelApi(this.tableParameter).then((response) => {
        const content = response;
        const blob = new Blob([content]);
        const fileName = `反馈列表.xls`;
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
    add() {
      this.showdialog = true;
      this.$refs.PopChildren.getTableRow({}, 0);
      this.radio = ""; //选择后清空选中表格按钮
      this.tableRow = {}; //选择后清空选中表格数据
    },
    update() {
      if (Object.keys(this.tableRow) != "") {
        this.showdialogFl = true;
        this.$refs.PopChildrenFl.getTableRow(this.tableRow, 1);
      }
    },
    pdpop() {
      if (Object.keys(this.tableRow) != "") {
        this.showdialogPD = true;
        this.$refs.PopChildrenPD.getTableRow(this.tableRow, 1);
      }
    },
    closepop() {
      if (Object.keys(this.tableRow) != "") {
        this.showdialogClose = true;
        this.$refs.PopChildrenClose.getTableRow(this.tableRow, 1);
      }
    },
    Recordpop() {
      if (Object.keys(this.tableRow) != "") {
        this.showdialogRecord = true;
        this.$refs.PopChildrenRecord.getTableRow(this.tableRow, 1);
      }
    },
    RefreshList(newRowObj) {
      //刷新
      // this.tableRow = newRowObj;
      this.queryOrgan(); //查询列表数据
      this.radio = ""; //清空选中
    },
    queryOrgan() {
      //查询表格数据
      queryFeedTypeApi(this.tableParameter).then((response) => {
        this.tableData = response.data;
        this.returnTotal = response.total;
      });
    },
    // deleteTab() {
    //   //删除选中表格数据
    //   if (Object.keys(this.tableRow) != "") {
    //     this.$confirm("此操作将永久删除此对应数据, 是否继续?", "提示", {
    //       confirmButtonText: "确定",
    //       cancelButtonText: "取消",
    //       type: "warning"
    //     })
    //       .then(() => {
    //         DeleteOrgLevel(this.tableRow).then(response => {
    //           this.tableParameter.pageIndex = 0; //分页重置第一页
    //           this.currentPage = 1;//分页重置第一页
    //           this.radio = ""; //清空选中
    //           this.queryOrgan();
    //         });
    //       })
    //       .catch(() => {
    //         this.radio = ""; //清空选中
    //       });
    //   }
    // },
    // updateTitle() {
    //   //修改标题提示
    //   return this.radio === "" ? "请选择表格对应数据" : "";
    // },
    // detelteTitle() {
    //   return this.radio === "" ? "请选择表格对应数据" : "";
    // }
  },
};
</script>
<style lang="scss" scoped>
.el-body {
  .el-date-editor.el-input {
    width: 100%;
  }
  .el-paginationR {
    text-align: right;
    margin-top: 20px;
  }
}
</style>
