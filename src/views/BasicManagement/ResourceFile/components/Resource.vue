<template>
  <div class="resoureRight" v-show="ResourceShow">
    <!-- 按钮begin -->
    <el-form label-width="75px">
      <el-row :gutter="30">
        <el-col :span="6" style="min-width: 220px">
          <el-form-item label="资源代码:">
            <el-input
              v-model="queryResourcePage.FJDA_FJID"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="6" style="min-width: 220px">
          <el-form-item label="资源名称:">
            <el-input
              v-model="queryResourcePage.FJDA_FJMC"
              clearable
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-form-item label-width="0px">
            <el-button
              type="success"
              @click="getTableData()"
              v-has="'BillBookSearch_has'"
              >查询</el-button
            >
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 按钮end -->

    <!-- 按钮begin -->
    <div class="buttonBox">
      <el-button type="primary" @click="addResource" v-has="'ResRoomAdd_has'"
        >新增房间</el-button
      >
      <el-button type="primary" @click="addResourceAM" v-has="'ResAMAdd_has'"
        >自动生成</el-button
      >
      <el-button
        type="primary"
        @click="updateResource"
        :disabled="disabledupdate"
        v-has="'ResRoomEdit_has'"
        >修改
      </el-button>
      <el-button
        type="danger"
        @click="deleteResource"
        :disabled="disabledelete"
        v-has="'ResRoomDel_has'"
        >删除</el-button
      >
      <el-upload
        :name="'filedata'"
        accept=".xlc,.xlm,.xls,.xlt,.xlw"
        :action="UploadUrl()"
        :before-upload="beforeFileUpload"
        :show-file-list="false"
        style="display: inline-block"
      >
        <el-button
          type="primary"
          icon="el-icon-upload"
          size="mini"
          @click="uploadModel"
          v-has="'ResRoomUpdate_has'"
        >
          导入模板</el-button
        >
      </el-upload>
      <el-button
        type="primary"
        @click="downloadFile"
        v-has="'ResRoomDownload_has'"
        >下载模板
      </el-button>
      <el-button type="success" @click="downloData">导出excel </el-button>
    </div>
    <!-- 按钮end -->

    <!-- 楼栋名称 表begin -->
    <div class="resoureTable">
      <el-table
        ref="multipleTable"
        :data="tableData"
        max-height="500"
        border
        @row-click="rowclick"
      >
        <el-table-column fixed label="选择" width="50">
          <template slot-scope="scope">
            <el-radio :label="scope.$index" v-model="radio">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="FJDA_FJID" label="资源代码"> </el-table-column>
        <el-table-column prop="FJDA_FJMC" label="资源名称"> </el-table-column>
        <el-table-column prop="FJDA_LC" label="楼层" width="60">
        </el-table-column>
        <el-table-column prop="FJDA_SFMJ" label="收费面积" width="120">
        </el-table-column>
        <el-table-column prop="FJDA_JZMJ" label="建筑面积" width="120">
        </el-table-column>
        <el-table-column prop="FJDA_FJH" label="资源号" width="90">
        </el-table-column>
        <el-table-column prop="FJDA_ZYLX" label="资源类型" width="120">
        </el-table-column>
        <el-table-column prop="FJDA_CX" label="朝向" width="60">
        </el-table-column>
        <el-table-column prop="FJDA_LS" label="资源状态" width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.FJDA_LS">无效</span>
            <span v-if="!scope.row.FJDA_LS">有效</span>
          </template>
        </el-table-column>
        <el-table-column prop="FJDA_SFKZ" label="入住状态" width="80">
          <template slot-scope="scope">
            <span v-if="scope.row.FJDA_SFKZ == true">空置</span>
            <span v-if="scope.row.FJDA_SFKZ == false">入住</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 楼栋名称 表 end -->

    <!-- 分页begin -->
    <div class="block" v-if="returnTotal > queryResourcePage.pageSize">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :pager-count="5"
        :page-size="queryResourcePage.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="returnTotal"
      >
      </el-pagination>
    </div>
    <!-- 分页end -->

    <!-- 弹框 begin -->
    <ResourceDialog
      :show.sync="show"
      ref="ResourceDChildren"
      @RefreshItem="RefreshList"
    ></ResourceDialog>
    <!-- 弹框 end -->

    <!-- 弹框 begin -->
    <ResourceDialogAM
      :show.sync="showAM"
      ref="ResourceDialogAM"
      @RefreshItem="RefreshList"
    ></ResourceDialogAM>
    <!-- 弹框 end -->
  </div>
</template>

<script>
import ResourceDialog from "./ResourceDialog"; //新增楼栋,删除
import ResourceDialogAM from "./ResourceDialogAM"; //自动生成
import {
  queryResourceByPage,
  queryGeneratedResources,
  deleteResourceFileRoom,
  resourceFilrImport,
  exportResourceData,
} from "@/api/BasicManagement/ResourceFile";
import config from "@/utils/config";
import { Message } from "element-ui";
export default {
  data() {
    return {
      disabledupdate: true, //修改
      disabledelete: true, //删除
      ResourceShow: false, //楼栋 组件 显示
      show: false, //楼栋 弹框 显示
      showAM: false, //楼栋 弹框 显示
      title: "", //楼栋 标题
      currentPage: 1, //当前页
      returnTotal: 0, //总共条数
      tableRow: {}, //修改数据
      radio: "", //单选按钮
      getTreeObj: {}, // 树对象 传递给 子组件
      tableData: [], //列表参数
      queryResourcePage: {
        // 查询表
        DLDA_ZJ: "",
        GLCID: "",
        DLDA_GLQWJ: "",
        FJDA_FJMC: "",
        FJDA_FJID: "",
        FJDA_CX: "",
        FJDA_HX: "",
        pageIndex: 0,
        pageSize: 10,
      },
      FCDM_MC: "",
    };
  },
  watch: {
    radio() {
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
    downloData() {
      exportResourceData(this.queryResourcePage).then((response) => {
        const content = response;
        const blob = new Blob([content]);
        const fileName = `房间信息.xls`;
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
    downloadFile() {
      var url = config.BASE_API + "/template/roomResourceTemplate.xls";
      var alink = document.createElement("a");
      alink.href = url;
      alink.click();
    },
    UploadUrl: function () {
      // 上传服务器地址
      return config.BASE_API;
    },
    beforeFileUpload(file) {
      let index = 0;
      let fd = new FormData();
      fd.append("filedata", file);
      this.formD = fd;
      resourceFilrImport(this.formD).then((response) => {
        var blobReader = new Response(response).json();
        blobReader.then((res) => {
          if (res.returnStatus == "SUCCESS") {
            Message({
              message: res.message,
              type: "success",
              duration: 2 * 1000,
            });
            this.getTableData();
            this.$emit("RefreshTree", this.treeid);
          } else {
            Message({
              message: res.message,
              type: "warning",
              duration: 2 * 1000,
            });
          }
        });
      });
    },
    uploadModel() {
      //导入数据
    },
    handleCurrentChange(currentPage) {
      this.queryResourcePage.pageIndex = currentPage - 1;
      this.getTableData(); //获取表格数据
      this.radio = ""; //选择后清空选中表格按钮
      this.tableRow = {}; //选择后清空选中表格数据
    },
    rowclick(row) {
      this.tableRow = row;
      this.radio = this.tableData.indexOf(row); //单行点击单选按钮选中
    },
    // 获取  table  数据
    getTableDataList(val) {
      this.FCDM_MC = val.data.FCDM_MC;
      this.queryResourcePage = {
        GLQDA_ZJ: val.data.FCDM_GLQZJ,
        DLDA_ZJ: val.data.FCDM_ZJ,
        GLCID: val.data.GLCID,
        YXDID: val.data.YXDID,
        FJDA_FJMC: "",
        FJDA_CX: "",
        FJDA_HX: "",
        pageIndex: 0,
        pageSize: 10,
      };
      this.ResourceShow = true;
      this.currentPage = 1;
      this.radio = ""; //选择后清空选中表格按钮
      this.tableRow = {}; //选择后清空选中表格数据
      this.getTableData();
    },
    // 新增楼栋
    addResource() {
      this.show = true;
      this.$refs.ResourceDChildren.getResourceData(
        {
          FJDA_GLQWJ: this.queryResourcePage.GLQDA_ZJ,
          FJDA_DLWJ: this.queryResourcePage.DLDA_ZJ,
          GLCID: this.queryResourcePage.GLCID,
          YXDID: this.queryResourcePage.YXDID,
          FCDM_MC: this.FCDM_MC,
        },
        0
      );
      this.radio = ""; //选择后清空选中表格按钮
      this.tableRow = {}; //选择后清空选中表格数据
    },
    //自动生成
    addResourceAM() {
      this.showAM = true;
      this.$refs.ResourceDialogAM.initialize({
        DLDA_ZJ: this.queryResourcePage.DLDA_ZJ,
        FJDA_DLWJ: this.queryResourcePage.DLDA_ZJ,
        FJDA_GLQWJ: this.queryResourcePage.GLQDA_ZJ,
        GLCID: this.queryResourcePage.GLCID,
        YXDID: this.queryResourcePage.YXDID,
      });
    },
    // 修改楼栋
    updateResource() {
      this.show = true;
      this.tableRow.FJDA_GLQWJ = this.queryResourcePage.GLQDA_ZJ;
      this.tableRow.FJDA_DLWJ = this.queryResourcePage.DLDA_ZJ;
      this.tableRow.GLCID = this.queryResourcePage.GLCID;
      this.tableRow.YXDID = this.queryResourcePage.YXDID;
      this.tableRow.FCDM_MC = this.FCDM_MC;
      this.$refs.ResourceDChildren.getResourceData(this.tableRow, 1);
    },
    // 删除楼栋
    deleteResource() {
      this.$confirm("此操作将永久删除此对应数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteResourceFileRoom(this.tableRow).then((response) => {
            this.queryResourcePage.pageIndex = 0;
            this.currentPage = 1;
            this.radio = ""; //选择后清空选中表格按钮
            this.RefreshList({});
          });
        })
        .catch(() => {
          this.radio = ""; //清空选中
        });
    },
    // 表数据
    getTableData() {
      queryResourceByPage(this.queryResourcePage).then((response) => {
        this.tableData = response.data;
        this.returnTotal = response.total;
      });
    },
    //刷新表数据
    RefreshList(newobj) {
      queryResourceByPage(this.queryResourcePage).then((response) => {
        this.tableData = response.data;
        this.returnTotal = response.total;
        this.tableRow = this.tableData[this.radio];
      });
    },
    // 修改标题提示
    updateTitle() {
      if (!this.radio) {
        return "请选择表格对应数据";
      }
    },
    // 删除标题提示
    detelteTitle() {
      if (!this.radio) {
        return "请选择表格对应数据";
      }
    },
  },
  components: {
    ResourceDialog,
    ResourceDialogAM,
  },
};
</script>

<style lang="scss" scoped>
.resoureTable {
  margin-top: 20px;
  width: 100%;
  height: 100%;
  overflow: auto;
}

.block {
  text-align: right;
  padding: 15px 0 5px 0;
}

.resoureRight .el-button {
  margin-left: 0px;
  margin-right: 10px;
}
</style>
