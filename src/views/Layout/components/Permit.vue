<template>
  <div class="permit">
    <el-dialog
      v-dialogDrag
      title="授权信息"
      class="el-dialog-double"
      :visible.sync="visible"
      @close="$emit('update:show', false)"
      :show="show"
      :close-on-click-modal="false"
    >
      <!-- 按钮begin -->
      <div class="button">
        <el-upload
          :action="UploadUrl()"
          :before-upload="beforeFileUpload"
          :show-file-list="false"
        >
          <el-button type="primary" class="upload-button"
            >上传授权文件</el-button
          >
        </el-upload>
      </div>
      <!-- 按钮end -->

      <div class="tablebody">
        <el-row class="auth_table">
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            class="tableContent"
          >
            <el-table-column
              prop="aObject"
              label="被授权对象名称"
              fixed
            ></el-table-column>
            <el-table-column
              prop="permitStartTime"
              label="授权期限开始时间"
              width="200px"
            ></el-table-column>
            <el-table-column
              prop="permitEndTime"
              label="授权期限结束时间"
              width="200px"
            ></el-table-column>
            <el-table-column
              prop="permitStatus"
              label="状态"
              width="100px"
            ></el-table-column>
            <el-table-column
              prop="aDATE"
              label="授权时间"
              width="200px"
            ></el-table-column>
          </el-table>
        </el-row>
      </div>

      <!-- <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="$emit('update:show', false)">确 定</el-button>
                <el-button @click="$emit('update:show', false)">取 消</el-button>
            </div> -->
    </el-dialog>
  </div>
</template>
<script>
import config from "@/utils/config";
import { uploadPermit, permitSearch } from "@/api/Permit/Permit";

export default {
  data() {
    return {
      tableData: [
        {
          aObject: "",
          permitStartTime: "",
          permitEndTime: "",
          permitStatus: "",
          aDATE: "",
        },
      ],
      visible: this.show,
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    show() {
      this.visible = this.show;
    },
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    // 查询 表 数据
    onSubmit() {
      this.getTableData();
    },
    // 获取 表 数据
    getTableData() {
      permitSearch().then((response) => {
        this.tableData = response.returnData;
      });
    },
    // 上传文件 之前
    beforeFileUpload(file) {
      let fd = new FormData();
      fd.append("filedata", file);
      uploadPermit(fd).then((response) => {
        this.getTableData();
      });
    },
    // 上传服务器地址 必输参数 随便写
    UploadUrl: function () {
      return config.BASE_API;
    },
  },
};
</script>

<style lang="scss" scoped>
.permit /deep/ .el-dialog {
  width: 970px;
}
.button {
  text-align: left;
  margin-left: 30px;
  margin-bottom: 15px;
}
.auth_table .el-table {
  max-height: 400px;
  overflow: auto;
}
</style>
