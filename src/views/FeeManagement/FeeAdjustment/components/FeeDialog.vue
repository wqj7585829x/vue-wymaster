<template>
  <div class="FeeDialog">
    <el-dialog
      v-dialogDrag
      :title="title"
      class="el-dialog-double"
      :visible.sync="visible"
      @close="cancle"
      :close-on-click-modal="false"
    >
      <div class="Feebody">
        <div class="Feetitle">
          <div class="resource">
            <div class="Rtitle">调整资源信息</div>
            <div class="Rbody">
              <div
                v-for="(item, index) in ResourceList"
                :key="index"
                class="Rradio"
              >
                <el-radio
                  v-model="radio"
                  :label="index"
                  @change="radiochange"
                  >{{ item.GLCNAME }}</el-radio
                >
              </div>
            </div>
          </div>
        </div>
        <div class="Feecontent">
          <div class="FCtitle">基础信息调整</div>
          <el-form
            label-width="75px"
            :model="TableForm"
            :rules="rules"
            ref="TableForm"
          >
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="所属年月:" prop="subordinateYears">
                  <el-date-picker
                    type="month"
                    placeholder="请输入所属年月"
                    v-model="TableForm.subordinateYears"
                    format="yyyy-MM"
                    value-format="yyyy-MM"
                    clearable
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="标题:" prop="adjustmentTitle">
                  <el-input
                    v-model="TableForm.adjustmentTitle"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="24">
                <el-form-item label="内容描述:" prop="adjustmentDescribe">
                  <el-input
                    v-model="TableForm.adjustmentDescribe"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div class="button buttonBox">
            <el-button type="primary" @click="addtable">新增 </el-button>
          </div>
          <div class="tabledetail">
            <el-table ref="singleTable" height="270" :data="tableData" border>
              <el-table-column label="序号" width="50">
                <template slot-scope="scope">
                  {{ scope.$index + 1 }}
                </template>
              </el-table-column>
              <el-table-column label="收费项目">
                <template slot-scope="scope">
                  <el-select
                    v-model="scope.row.index"
                    clearable
                    @change="Pchange(scope.$index)"
                  >
                    <el-option
                      v-for="(item, index) in options"
                      :key="index"
                      :label="item.SFXM_SFXMMC"
                      :value="index"
                    >
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="AdjustmentType" label="调整类型">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.AdjustmentType">
                    <el-option label="指定金额" value="指定金额"></el-option>
                    <el-option label="指定比例" value="指定比例"></el-option>
                    <el-option label="单价调整" value="单价调整"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="AdjustmentMethod" label="调整方式">
                <template slot-scope="scope">
                  <el-input-number
                    v-model="scope.row.AdjustmentMethod"
                    :controls="false"
                  >
                  </el-input-number>
                </template>
              </el-table-column>
              <el-table-column prop="Remarks" label="备注">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.Remarks"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    class="button-text"
                    @click="deletetable(scope.$index)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="FCtitle_2">电子文件</div>
          <div class="button buttonBox">
            <el-upload
              :action="UploadUrl()"
              ref="upload"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-change="onChange"
              multiple
              :file-list="fileList"
              :auto-upload="false"
            >
              <el-button slot="trigger" size="small" type="primary"
                >选取文件</el-button
              >
            </el-upload>
          </div>
        </div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sure">确 定</el-button>
        <el-button @click="cancle">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  queryAdjustResourceInformation,
  queryPayItemsList,
  insertBatchAdjustment,
  updateBatchAdjustment,
} from "@/api/FeeManagement/FeeAdjustment";
import config from "@/utils/config";
export default {
  data() {
    return {
      visible: this.show,
      title: "", //标题
      rules: {
        DLDA_DLID: [{ required: true, trigger: "blur" }],
      },
      searchList: {},
      radio: null,
      oldradio: null,
      tableData: [],
      ResourceList: [],
      ResourceTableList: [],
      ResourceTablelength: [],
      options: [],
      TableForm: {},
      rules: {
        subordinateYears: [{ required: true, trigger: "blur" }],
        adjustmentTitle: [{ required: true, trigger: "blur" }],
        adjustmentDescribe: [{ required: true, trigger: "blur" }],
      },
      fileList: [],
      savefileList: [],
      savename: [],
      deletfileList: [],
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
    this.getResource();
  },
  methods: {
    submitUpload(file) {
      //上传服务器
    },
    onChange(file, fileList) {
      //选取文件change事件
      // console.log(file, fileList);
      this.fileList = fileList;
      if (this.fileList.length) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    handleRemove(file, fileList) {
      //清除文件事件
      if (this.savefileList.indexOf(file.url) > -1) {
        this.deletfileList.push(file.url);
        this.savefileList.splice(this.savefileList.indexOf(file.url), 1);
        this.savename.splice(this.savefileList.indexOf(file.url), 1);
      }
      // console.log(file, fileList);
      this.fileList = fileList;
    },
    handlePreview(file) {
      //文件预览
      // console.log(file);
    },
    UploadUrl: function () {
      // 上传服务器地址
      return config.BASE_API;
    },
    deletetable(index) {
      //删除表格数据
      this.$confirm("此操作将删除此对应数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.tableData.splice(index, 1);
        })
        .catch(() => {});
    },
    radiochange(index) {
      //单选框改变事件
      this.TableForm.plotId = this.ResourceList[index].id;
      this.TableForm.dbName = this.ResourceList[index].dbName;
      this.TableForm.GLCID = this.ResourceList[index].GLCID;
      this.TableForm.YXDID = this.ResourceList[index].YXDID;

      this.ResourceTableList[this.oldradio] = this.tableData;
      this.oldradio = index;

      if (this.ResourceTableList[index].length > 0) {
        this.tableData = this.ResourceTableList[index];
      } else {
        this.tableData = [];
      }

      queryPayItemsList({
        dbName: this.ResourceList[index].dbName,
        GLCID: this.ResourceList[index].GLCID,
        YXDID: this.ResourceList[index].YXDID,
      }).then((response) => {
        this.options = response;
      });
    },
    getResource() {
      //查询列表
      queryAdjustResourceInformation().then((response) => {
        this.ResourceList = response;
        this.ResourceTablelength = response.length;
      });
    },
    addtable() {
      //新增
      this.tableData.push({
        index: "",
        AdjustmentType: "",
        AdjustmentMethod: "",
        Remarks: "",
      });
    },
    Pchange(index) {
      //收费项目改变事件
      if (this.tableData[index].index === "") {
        this.$set(this.tableData[index], "PrimaryKey", "");
        this.$set(this.tableData[index], "ChargeItems", "");
        this.$set(this.tableData[index], "CostCategory", "");
      } else {
        this.$set(
          this.tableData[index],
          "PrimaryKey",
          this.options[this.tableData[index].index].SFXM_ZJ
        );
        this.$set(
          this.tableData[index],
          "ChargeItems",
          this.options[this.tableData[index].index].SFXM_SFXMMC
        );
        this.$set(
          this.tableData[index],
          "CostCategory",
          this.options[this.tableData[index].index].SFXM_FYLB
        );
      }
    },
    //   判断新增，修改
    getReportData(data, type) {
      var _this = this;
      if (type == 0) {
        this.TableForm = {};
        this.title = "新增";
        this.tableData = [];
        this.radio = 0;
        this.oldradio = 0;
        this.radiochange(0);
        this.fileList = [];
        this.savefileList = [];
        this.deletfileList = [];
      } else {
        this.TableForm = JSON.parse(JSON.stringify(data));
        this.title = "修改";
        this.tableData = [];
        const parent = this.ResourceList;
        const plotId = data.plotId;
        this.radio = parent.findIndex((d) => d.id === plotId);
        this.oldradio = this.radio;

        this.deletfileList = [];

        if (data.kelectronicDocument && data.kelectronicDocument != undefined) {
          var pic = data.kelectronicDocument.split(";");
          var name = data.kelectronicDocumentName.split(";");
          this.savefileList = data.kelectronicDocument.split(";");
          this.savename = data.kelectronicDocumentName.split(";");
          this.deleteimg = [];
          this.fileList = [];
          pic.forEach((item, index) => {
            var obj = {};
            obj.url = item; //图片
            obj.name = name[index]; //轮播图片
            this.fileList.push(obj);
          });
        } else {
          this.savefileList = [];
          this.savename = [];
          this.fileList = [];
        }

        this.TableForm.plotId = this.ResourceList[this.radio].id;
        this.TableForm.dbName = this.ResourceList[this.radio].dbName;
        this.TableForm.GLCID = this.ResourceList[this.radio].GLCID;
        this.TableForm.YXDID = this.ResourceList[this.radio].YXDID;
        queryPayItemsList({
          dbName: this.ResourceList[this.radio].dbName,
          GLCID: this.ResourceList[this.radio].GLCID,
          YXDID: this.ResourceList[this.radio].YXDID,
        }).then((response) => {
          this.options = response;
          var table = data.adjustmentMethod.split(";");
          table.forEach((item) => {
            var unit = item.split(",");
            const parents = this.options;
            const id = unit[0];
            _this.tableData.push({
              index: parents.findIndex((d) => d.SFXM_ZJ === id),
              PrimaryKey: unit[0],
              ChargeItems: unit[1],
              AdjustmentType: unit[2],
              AdjustmentMethod: unit[3],
              Remarks: unit[4],
              CostCategory: unit[5],
            });
          });

          this.ResourceTableList[this.radio] = table;
        });
      }

      this.ResourceTableList = Array.from(
        { length: this.ResourceTablelength },
        (v, k) => []
      );
    },
    sure() {
      var _this = this;
      this.$refs["TableForm"].validate((valid) => {
        if (valid) {
          if (this.tableData.length == 0) {
            this.$message({
              message: "至少添加一笔调整项目才可以进行新增！",
              type: "warning",
            });
            return;
          }
          var data = this.tableData;
          var adjustmentMethod = [];
          for (var i in data) {
            if (data[i].PrimaryKey == "") {
              this.$message({
                message: `第${parseInt(i) + 1}笔的数据收费项目未选择`,
                type: "warning",
              });
              return;
            }
            if (data[i].AdjustmentType == "") {
              this.$message({
                message: `第${parseInt(i) + 1}笔的数据调整类型未选择`,
                type: "warning",
              });
              return;
            }
            if (data[i].AdjustmentMethod == "") {
              this.$message({
                message: `第${parseInt(i) + 1}笔的数据调整方式请填写非0的金额`,
                type: "warning",
              });
              return;
            }
            adjustmentMethod.push(
              `${data[i].PrimaryKey},${data[i].ChargeItems},${data[i].AdjustmentType},${data[i].AdjustmentMethod},${data[i].Remarks},${data[i].CostCategory}`
            );
          }
          let param = new FormData();
          param.append("subordinateYears", this.TableForm.subordinateYears);
          param.append("adjustmentTitle", this.TableForm.adjustmentTitle);
          param.append("adjustmentDescribe", this.TableForm.adjustmentDescribe);
          param.append("adjustmentMethod", adjustmentMethod.join(";"));
          param.append("plotId", this.TableForm.plotId);
          param.append("dbName", this.TableForm.dbName);
          param.append("GLCID", this.TableForm.GLCID);
          param.append("YXDID", this.TableForm.YXDID);

          if (this.title == "新增") {
            this.fileList.forEach((file) => {
              param.append("files", file.raw); //append file.raw 上传文件只需维护fileList
              param.append("fileNames", file.name);
            });
            //Api接口
            insertBatchAdjustment(param).then((res) => {
              if (res.returnStatus == "SUCCESS") {
                this.$emit("RefreshItem", 0);
                this.cancle();
              } else {
                this.$message.error(res.message);
              }
            });
          } else {
            param.append("adjustmentZj", this.TableForm.adjustmentZj);
            param.append("deleteUrl", this.deletfileList.join(";"));
            param.append("retainUrl", this.savefileList.join(";"));
            param.append("retainName", this.savename.join(";"));
            this.fileList.forEach((file) => {
              if (file.raw) {
                param.append("files", file.raw); //append file.raw 上传文件只需维护fileList
                param.append("fileNames", file.name);
              }
            });
            //Api接口
            updateBatchAdjustment(param).then((res) => {
              if (res.returnStatus == "SUCCESS") {
                this.$emit("RefreshItem", 1);
                this.cancle();
              } else {
                this.$message.error(res.message);
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    cancle() {
      this.$emit("update:show", false);
      this.$nextTick(() => {
        this.$refs.TableForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.FeeDialog .el-input-number {
  width: 100%;
  text-align: left;
}

.FeeDialog .el-input-number {
  width: 100%;
}

.FeeDialog .el-input-number input {
  text-align: left;
}

.FeeDialog .detail {
  padding: 0 20px;
}

.FeeDialog {
  .Feebody {
    height: 600px;
    width: 100%;
    overflow: auto;
    padding-left: 180px;
    background: #ffffff;
    border-radius: 5px;
    .Feetitle {
      height: 100%;
      float: left;
      width: 180px;
      margin-left: -180px;
      padding: 13px 13px;
      overflow: auto;
      .resource {
        height: 100%;
        border: 1px solid #e0e0e0;
        border-radius: 3px;
        padding-top: 50px;
        .Rtitle {
          width: 100%;
          height: 50px;
          margin-top: -50px;
          border-bottom: 1px solid #e0e0e0;
          line-height: 50px;
          font-size: 14px;
          font-family: Microsoft YaHei;
          font-weight: bold;
          color: #1a1a1a;
          text-align: left;
          padding-left: 10px;
        }
        .Rbody {
          width: 100%;
          overflow: auto;
          height: 522px;
          .Rradio {
            text-align: left;
            padding-top: 15px;
            padding-left: 15px;
          }
        }
      }
    }
    .Feecontent {
      float: right;
      width: 100%;
      height: 100%;
      overflow: auto;
      .FCtitle {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        line-height: 14px;
        color: #1a1a1a;
        height: 30px;
        line-height: 30px;
        margin-top: 17px;
        text-align: left;
      }
      .FCtitle_2 {
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        line-height: 14px;
        color: #1a1a1a;
        height: 30px;
        line-height: 30px;
        margin-top: 5px;
        text-align: left;
      }
      .tabledetail {
        padding-right: 10px;
      }
    }
  }
  .buttonBox {
    text-align: left;
  }
}
</style>
<style>
.FeeDialog .el-dialog__body {
  padding: 0;
}
.FeeDialog .el-dialog-double .el-row {
  padding: 0;
  margin-left: 0px !important;
}

.FeeDialog .el-button--text {
  margin-right: 0 !important;
}
</style>
