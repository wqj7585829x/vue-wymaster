<template>
  <div class="container Epedigree">
    <!-- 按钮begin -->
    <el-form label-width="75px">
      <el-row :gutter="30">
        <el-col :span="5" style="width:300px">
          <el-form-item label="开始时间:">
            <el-date-picker type="date" placeholder="选择开始上传时间" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"
              v-model="EpedigreeForm.startDate"></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="5" style="width:300px">
          <el-form-item label="结束时间:">
            <el-date-picker type="date" placeholder="选择结束上传时间" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"
              v-model="EpedigreeForm.endDate"></el-date-picker>
          </el-form-item>
        </el-col>

        <el-col :span="5" style="width:300px">
          <el-form-item label="上传人:">
            <el-input v-model="EpedigreeForm.upload_user" clearable></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="5" style="width:300px">
          <el-form-item label="档案类型:">
            <el-select v-model="EpedigreeForm.file_type_id" clearable>
              <el-option v-for="(item,index) in FileTypeList" :key="index" :label="item.typeName" :value="item.typeId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-form-item label-width="0px">
            <el-button type="success" @click="handleCurrentChange(1)">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 按钮end -->

    <!-- 按钮begin -->
    <div class="buttonBox">
      <el-button type="primary" @click="addEpedigree">新增</el-button>
      <el-button type="primary" :disabled="radio===null" @click="updateEpedigree">修改</el-button>
      <el-button type="danger" :disabled="radio===null" @click="deleteEpedigree">删除</el-button>
      </el-button>
    </div>
    <!-- 按钮end -->
    <div class="resoureTable">
      <el-table ref="multipleTable" :data="tableData" border @row-click="rowClick">
        <el-table-column fixed label="选择" width="50">
          <template slot-scope="scope">
            <el-radio :label="scope.$index" v-model="radio">&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column prop="file_type_name" label="档案类型" width="120"></el-table-column>
        <el-table-column prop="el_content" label="内容描述"></el-table-column>
        <el-table-column prop="el_path" label="图片" width="150">
          <template slot-scope="scope">
            <a @click="imgshow(scope.row.el_path)" class="imgshow">查看</a>
          </template>
        </el-table-column>

        <el-table-column prop="upload_time" label="上传时间" width="200"></el-table-column>
        <el-table-column prop="upload_user" label="上传人" width="120"></el-table-column>

      </el-table>
    </div>

    <!-- 分页begin -->
    <div class="block" v-if="returnTotal>EpedigreeForm.pageSize">
      <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage"
        :page-size="EpedigreeForm.pageSize" layout="total, prev, pager, next, jumper" :total="returnTotal">
      </el-pagination>
    </div>
    <!-- 分页end -->

    <DetailDialog :Detailshow.sync="Detailshow" ref="DetailDialog" @RefreshItem="RefreshItem"></DetailDialog>

    <el-dialog v-dialogDrag title="图片" :visible.sync="imgVisible">
      <el-carousel indicator-position="outside">
        <el-carousel-item v-for="item in imglist" :key="item">
          <img :src="item" alt="">
        </el-carousel-item>
      </el-carousel>
    </el-dialog>

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DetailDialog from "./components/DetailDialog";
import { queryFileTypeList, queryElectronicProFile, deleteElectronicProFile } from "@/api/BasicManagement/Epedigree";
export default {
  name: "",
  data() {
    return {
      EpedigreeForm: {
        startDate: '',
        endDate: '',
        upload_user: '',
        file_type_id: '',
        FKGX_ZJ: '',
        KHDA_ZJ: '',
        pageIndex: 0,
        pageSize: 10
      },
      currentPage: 1, //当前页
      returnTotal: 0, //总共条数
      show: false,
      Detailshow: false,
      tableData: [],
      multipleSelection: [],
      editlimit: true,
      deletelimit: true,
      FileTypeList: [],
      radio: null,
      tableRow: {},
      FKGX_ZJ: '',
      KHDA_ZJ: '',
      imgVisible: false,
      imglist: ''
    };
  },
  mounted() {
    this.FKGX_ZJ = this.$route.query.FKGX_ZJ
    this.KHDA_ZJ = this.$route.query.KHDA_ZJ
    this.EpedigreeForm.FKGX_ZJ = this.FKGX_ZJ
    this.EpedigreeForm.KHDA_ZJ = this.KHDA_ZJ
    this.getTableData()
    queryFileTypeList().then(response => {
      this.FileTypeList = response
    })
  },
  computed: {
    ...mapGetters(["userPlot"])
  },
  methods: {
    imgshow(val) {
      if (val) {
        this.imglist = val.split(';')
        this.imgVisible = true
      } else {
        this.$message({
          message: '暂无图片'
        });
      }
    },
    getTableData() {
      queryElectronicProFile(this.EpedigreeForm).then(response => {
        this.tableData = response.data
        this.returnTotal = response.total
      })
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      this.EpedigreeForm.pageIndex = currentPage - 1
      this.getTableData(); //获取表格数据
      this.radio = null
      this.tableRow = {}
    },
    addEpedigree() {
      this.Detailshow = true
      this.$refs.DetailDialog.getReportData({
        FKGX_ZJ: this.FKGX_ZJ,
        KHDA_ZJ: this.KHDA_ZJ
      }, 0);
    },
    updateEpedigree() {
      this.Detailshow = true
      this.$refs.DetailDialog.getReportData(this.tableRow);
    },
    deleteEpedigree() {
      this.$confirm("此操作将永久删除此对应数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteElectronicProFile({
            el_path: this.tableRow.el_path,
            el_id: this.tableRow.el_id
          }).then(response => {
            this.EpedigreeForm.pageIndex = 0
            this.currentPage = 1;
            this.radio = null; //选择后清空选中表格按钮
            this.RefreshItem();
          })
        })
        .catch(() => {
          this.radio = null; //清空选中
        });
    },
    rowClick(row) {
      this.tableRow = row;
      this.radio = this.tableData.indexOf(row); //单行点击单选按钮选中
    },
    RefreshItem() {
      this.handleCurrentChange(1)
    }
  },
  components: {
    DetailDialog
  }
};
</script>

<style lang="scss" scope>
.Epedigree {
  .el-date-editor {
    width: 100% !important;
  }

  .el-select {
    width: 100% !important;
  }
  .el-title {
    padding: 0;
  }
  .title {
    padding-top: 36px;
    .title-top {
      margin-top: -36px;
      height: 36px;
      width: 100%;
      .tt-tab {
        float: left;
        height: 36px;
        width: 50%;
        text-align: center;
        line-height: 36px;
        font-size: 14px;
        font-weight: bold;
        color: rgba(77, 77, 77, 1);
        background: rgba(223, 224, 230, 1);
      }
      .tt-check {
        font-weight: bold;
        color: rgba(46, 138, 215, 1);
        background: rgb(255, 255, 255);
      }
    }
    .title-body {
      width: 100%;
      height: 98%;
      padding: 0 10px;
      overflow: auto;
      .ztree_content_wrap {
        margin-top: 10px;
        text-align: center;
        .el-input__inner {
          width: 190px;
          height: 28px;
          background: rgba(223, 224, 230, 1);
          border-radius: 4px;
          margin: 0 !important;
          margin-bottom: 14px;
        }
        .el-tree {
          margin-top: 10px;
        }
      }
      .el-input {
        .el-input__inner {
          margin-bottom: 10px;
        }
      }
    }
  }

  .el-carousel img {
    height: 100%;
  }

  .block {
    text-align: right;
    padding: 15px 0 5px 0;
  }

  .imgshow {
    text-decoration: underline;
    color: #2e8ad7;
  }
}
</style>
