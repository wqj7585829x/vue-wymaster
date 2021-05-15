<template>
  <div class="resoureRight" v-show="ZoneShow">
    <!-- 按钮begin -->
    <div class="buttonBox">
      <el-button type="primary" @click="addPartition" v-has="'ResZoneAdd_has'"
        >新增管理分区</el-button
      >
      <el-button
        type="primary"
        @click="updatePartition"
        :disabled="disabledupdate"
        v-has="'ResZoneEdit_has'"
        >修改
      </el-button>
      <el-button
        type="danger"
        @click="deletePartition"
        :disabled="disabledelete"
        v-has="'ResZoneDel_has'"
        >删除
      </el-button>
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

    <!-- 分区名称 表 begin -->
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
        <el-table-column prop="GLQDA_GLQID" label="分区代码"> </el-table-column>
        <el-table-column prop="GLQDA_GLQMC" label="分区名称"> </el-table-column>
        <el-table-column prop="GLQDA_YDS" label="栋数" width="60">
        </el-table-column>
        <el-table-column prop="GLQDA_JZMJ" label="建筑面积" width="120">
        </el-table-column>
        <el-table-column prop="GLQDA_SFMJ" label="收费面积" width="120">
        </el-table-column>
      </el-table>
    </div>
    <!-- 分区名称 表 end -->

    <!-- 分页begin -->
    <div class="block" v-if="returnTotal > queryZonePage.pageSize">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="queryZonePage.pageSize"
        :pager-count="5"
        layout="total, prev, pager, next, jumper"
        :total="returnTotal"
      >
      </el-pagination>
    </div>
    <!-- 分页end -->

    <!-- 弹框 begin -->
    <ZoneDialog
      :show.sync="show"
      ref="ZoneDChildren"
      @RefreshItem="RefreshList"
      :getTreeObj="getTreeObj"
    ></ZoneDialog>
    <!-- 弹框 end -->
  </div>
</template>

<script>
import ZoneDialog from "./ZoneDialog"; //新增管理分区,修改
import {
  queryPartitionByPage,
  deleteResourceFilePartition,
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
      ZoneShow: false, //分区组件 显示
      show: false, //分区 弹框 显示
      title: "", //分区 标题
      currentPage: 1, //当前页
      returnTotal: 10, //总共条数
      tableRow: {}, //修改数据
      radio: "", //单选按钮
      getTreeObj: {}, // 树对象 传递给 子组件
      tableData: [], //列表参数
      queryZonePage: {
        GLCID: "",
        YXDID: "",
        GLQDA_GLQMC: "",
        pageIndex: 0,
        pageSize: 10,
      },
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
      exportResourceData(this.queryZonePage).then((response) => {
        const content = response;
        const blob = new Blob([content]);
        const fileName = `分区信息.xls`;
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
    //分页函数
    handleCurrentChange(currentPage) {
      this.queryZonePage.pageIndex = currentPage - 1;
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
      this.queryZonePage = {
        GLCID: val.data.GLCID,
        YXDID: val.data.YXDID,
        GLQDA_GLQMC: "",
        pageIndex: 0,
        pageSize: 10,
      };
      this.ZoneShow = true;
      this.currentPage = 1;
      this.radio = ""; //选择后清空选中表格按钮
      this.tableRow = {}; //选择后清空选中表格数据
      this.getTableData();
    },
    // 新增管理分区
    addPartition() {
      this.show = true;
      this.$refs.ZoneDChildren.getPartitionData(
        {
          GLCID: this.queryZonePage.GLCID,
          YXDID: this.queryZonePage.YXDID,
        },
        0
      );
      this.radio = ""; //选择后清空选中表格按钮
      this.tableRow = {}; //选择后清空选中表格数据
    },
    // 修改管理分区
    updatePartition() {
      this.show = true;
      this.tableRow.GLCID = this.queryZonePage.GLCID;
      this.tableRow.YXDID = this.queryZonePage.YXDID;
      this.$refs.ZoneDChildren.getPartitionData(this.tableRow, 1);
    },
    // 删除管理分区
    deletePartition() {
      this.$confirm("此操作将永久删除此对应数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deleteResourceFilePartition(this.tableRow).then((response) => {
            this.queryZonePage.pageIndex = 0;
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
      queryPartitionByPage(this.queryZonePage).then((response) => {
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
  },
  components: {
    ZoneDialog,
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
