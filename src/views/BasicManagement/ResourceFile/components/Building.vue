<template>
  <div class="resoureRight" v-show="BuildingShow">
    <!-- 按钮begin -->
    <div class="buttonBox">
      <el-button type="primary" @click="addBuild" v-has="'ResBuildAdd_has'"
        >新增楼栋</el-button
      >
      <el-button
        type="primary"
        @click="updateBuild"
        :disabled="disabledupdate"
        v-has="'ResBuildEdit_has'"
        >修改
      </el-button>
      <el-button
        type="danger"
        @click="deleteBuild"
        :disabled="disabledelete"
        v-has="'ResBuildDel_has'"
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
        <el-table-column prop="DLDA_GLQID" label="分区代码"> </el-table-column>
        <el-table-column prop="DLDA_DLID" label="楼栋代码"> </el-table-column>
        <el-table-column prop="DLDA_DLMC" label="楼栋名称"> </el-table-column>
        <el-table-column prop="DLDA_DLLB" label="栋楼类别" width="120">
        </el-table-column>
        <el-table-column prop="DLDA_JZMJ" label="建筑面积" width="120">
        </el-table-column>
        <el-table-column prop="DLDA_SFMJ" label="收费面积" width="120">
        </el-table-column>
        <el-table-column prop="DLDA_SYMJ" label="使用面积" width="120">
        </el-table-column>
        <!-- <el-table-column prop="DLDA_LG" label="楼高" width="150">
            </el-table-column> -->
        <el-table-column prop="DLDA_LCS" label="楼层数" width="60">
        </el-table-column>
        <el-table-column prop="DLDA_DTSL" label="电梯数量" width="120">
        </el-table-column>
        <!-- <el-table-column prop="DLDA_SGDW" label="施工单位" width="150">
            </el-table-column> -->
      </el-table>
    </div>
    <!-- 楼栋名称 表 end -->

    <!-- 分页begin -->
    <div class="block" v-if="returnTotal > queryBuildPage.pageSize">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="queryBuildPage.pageSize"
        :pager-count="5"
        layout="total, prev, pager, next, jumper"
        :total="returnTotal"
      >
      </el-pagination>
    </div>
    <!-- 分页end -->

    <!-- 弹框 begin -->
    <BuildingDialog
      :show.sync="show"
      ref="BuildDChildren"
      @RefreshItem="RefreshList"
      :getTreeObj="getTreeObj"
    >
    </BuildingDialog>
    <!-- 弹框 end -->
  </div>
</template>

<script>
import BuildingDialog from "./BuildingDialog"; //新增楼栋,删除
import {
  queryBuildByPage,
  deleteResourceFileBuilding,
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
      BuildingShow: false, //楼栋 组件 显示
      show: false, //楼栋 弹框 显示
      title: "", //楼栋 标题
      currentPage: 1, //当前页
      returnTotal: 0, //总共条数
      tableRow: {}, //修改数据
      radio: "", //单选按钮
      getTreeObj: {}, // 树对象 传递给 子组件
      tableData: [], //列表参数
      queryBuildPage: {
        // 查询表
        GLCID: "",
        DLDA_GLQWJ: "",
        YXDID: "",
        DLDA_DLMC: "",
        pageIndex: 0,
        pageSize: 10,
      },
      DLDA_ZJ: "",
      treeid: "",
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
      exportResourceData(this.queryBuildPage).then((response) => {
        const content = response;
        const blob = new Blob([content]);
        const fileName = `楼栋信息.xls`;
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
      this.queryBuildPage.pageIndex = currentPage - 1;
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
      this.treeid = val.id;
      this.DLDA_ZJ = val.data.FCDM_ZJ;
      this.queryBuildPage = {
        GLCID: val.data.GLCID,
        DLDA_GLQWJ: val.data.FCDM_GLQZJ,
        YXDID: val.data.YXDID,
        DLDA_DLMC: "",
        pageIndex: 0,
        pageSize: 10,
      };
      this.BuildingShow = true;
      this.currentPage = 1;
      this.radio = ""; //选择后清空选中表格按钮
      this.tableRow = {}; //选择后清空选中表格数据
      this.getTableData();
    },
    // 新增楼栋
    addBuild() {
      this.show = true;
      this.$refs.BuildDChildren.getBuildData(
        {
          GLCID: this.queryBuildPage.GLCID,
          YXDID: this.queryBuildPage.YXDID,
        },
        0,
        this.DLDA_ZJ
      );
      this.radio = ""; //选择后清空选中表格按钮
      this.tableRow = {}; //选择后清空选中表格数据
    },
    // 修改楼栋
    updateBuild() {
      this.show = true;
      this.tableRow.GLCID = this.queryBuildPage.GLCID;
      this.tableRow.YXDID = this.queryBuildPage.YXDID;
      this.$refs.BuildDChildren.getBuildData(this.tableRow, 1, null);
    },
    // 删除楼栋
    deleteBuild() {
      this.$confirm("此操作将永久删除此对应数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteResourceFileBuilding(this.tableRow).then((response) => {
            this.queryBuildPage.pageIndex = 0;
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
      queryBuildByPage(this.queryBuildPage).then((response) => {
        this.tableData = response.data;
        this.returnTotal = response.total;
      });
    },
    //刷新表数据
    RefreshList(newobj) {
      this.tableRow = newobj;
      this.$emit("RefreshTree", this.treeid);
      this.getTableData();
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
    BuildingDialog,
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
