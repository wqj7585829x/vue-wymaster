<template>
  <div class="TableDialog">
    <el-dialog
      v-dialogDrag
      :title="title"
      class="el-dialog-double"
      :visible.sync="visible"
      @close="cancle"
      :close-on-click-modal="false"
    >
      <el-form
        label-width="85px"
        :model="TableForm"
        :rules="rules"
        ref="TableForm"
      >
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="总表名称:" prop="FTZB_ZBMC">
              <el-input v-model="TableForm.FTZB_ZBMC"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item
              label="收费项目名称:"
              prop="FTZB_SFXMMC"
              label-width="120px"
            >
              <el-input v-model="TableForm.FTZB_SFXMMC"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="收费项目:" prop="FTZB_SFXMWJ">
              <el-select v-model="TableForm.FTZB_SFXMWJ">
                <el-option
                  v-for="item in tableData"
                  :key="item.SFXM_ZJ"
                  :label="item.SFXM_SFXMMC"
                  :value="item.SFXM_ZJ"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="系数项目:" prop="FTZB_XSXMWJ">
              <el-select v-model="TableForm.FTZB_XSXMWJ">
                <el-option
                  v-for="item in tableData"
                  :key="item.SFXM_ZJ"
                  :label="item.SFXM_SFXMMC"
                  :value="item.SFXM_ZJ"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="上月读数:" prop="FTZB_SYDS">
              <el-input-number
                v-model="TableForm.FTZB_SYDS"
                :precision="4"
                :step="0.0001"
                :min="0"
                :controls="false"
              ></el-input-number>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="本月读数:" prop="FTZB_BYDS">
              <el-input-number
                v-model="TableForm.FTZB_BYDS"
                :precision="4"
                :step="0.0001"
                :min="0"
                :controls="false"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="本月行度:" prop="FTZB_BYXD">
              <el-input-number
                v-model="TableForm.FTZB_BYXD"
                :precision="4"
                :step="0.0001"
                :min="0"
                :controls="false"
              ></el-input-number>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="分摊比例:" prop="FTZB_FTBL">
              <el-input-number
                v-model="TableForm.FTZB_FTBL"
                :precision="4"
                :step="0.0001"
                :min="0"
                :controls="false"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="总表金额:" prop="FTZB_ZBJE">
              <el-input-number
                v-model="TableForm.FTZB_ZBJE"
                :precision="4"
                :step="0.0001"
                :min="0"
                :controls="false"
              ></el-input-number>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="分摊方式:" prop="FTZB_FTFS">
              <el-select v-model="TableForm.FTZB_FTFS">
                <el-option label="按表行度" value="按表行度"></el-option>
                <el-option label="按收费面积" value="按收费面积"></el-option>
                <el-option label="按指定比例" value="按指定比例"></el-option>
                <el-option label="按资源" value="按资源"></el-option>
                <el-option label="不参与分摊" value="不参与分摊"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="分摊类别:" prop="FTZB_FTLB">
              <el-select v-model="TableForm.FTZB_FTLB">
                <el-option label="用量差分摊" value="用量差分摊"></el-option>
                <el-option
                  label="直接用量分摊"
                  value="直接用量分摊"
                ></el-option>
                <el-option
                  label="直接金额分摊"
                  value="直接金额分摊"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="指定用量:" prop="FTZB_ZDYL">
              <el-input-number
                v-model="TableForm.FTZB_ZDYL"
                :precision="4"
                :step="0.0001"
                :min="0"
                :controls="false"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="转表基数:" prop="FTZB_ZBJS">
              <el-input-number
                v-model="TableForm.FTZB_ZBJS"
                :precision="4"
                :step="0.0001"
                :min="0"
                :controls="false"
              ></el-input-number>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="入住系数:" prop="FTZB_RZXS">
              <el-select v-model="TableForm.FTZB_RZXS">
                <el-option label="不使用" value="不使用"></el-option>
                <el-option label="是否入住" value="是否入住"></el-option>
                <el-option label="入住日期" value="入住日期"></el-option>
                <el-option
                  label="按空置分摊比例"
                  value="按空置分摊比例"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sure">确 定</el-button>
        <el-button @click="cancle">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  addTotalTable,
  updateTotalTable,
  queryApportionedProjectName,
} from "@/api/FeeManagement/AllocationSettings";
export default {
  data() {
    return {
      visible: this.show,
      title: "", //标题
      TableForm: {},
      rules: {
        FTZB_ZBMC: [
          { required: true, message: "请输入总表名称", trigger: "blur" },
        ],
        FTZB_SFXMMC: [
          { required: true, message: "请输入收费项目名称", trigger: "blur" },
        ],
        FTZB_SFXMWJ: [
          { required: true, message: "请选择收费项目", trigger: "blur" },
        ],
        FTZB_XSXMWJ: [
          { required: true, message: "请选择系数项目", trigger: "blur" },
        ],
        FTZB_FTFS: [
          { required: true, message: "请选择分摊方式", trigger: "blur" },
        ],
        FTZB_FTLB: [
          { required: true, message: "请选择分摊类别", trigger: "blur" },
        ],
        FTZB_ZBJS: [
          { required: true, message: "请输入转表基数", trigger: "blur" },
        ],
      },
      tableData: [],
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
  methods: {
    //   判断新增，修改
    getPartitionData(data, type) {
      this.TableForm = JSON.parse(JSON.stringify(data));
      if (type == 0) {
        this.title = "新增";
      } else {
        this.title = "修改";
      }
      this.ApportionedProjectName();
    },
    //   新增/修改分区
    sure() {
      var _this = this;
      this.$refs["TableForm"].validate((valid) => {
        if (valid) {
          if (_this.title == "新增") {
            addTotalTable(_this.TableForm).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                _this.$emit("RefreshItem");
                _this.cancle();
              }
            });
          } else {
            updateTotalTable(_this.TableForm).then((response) => {
              if (response.returnStatus == "SUCCESS") {
                let newobj = JSON.parse(JSON.stringify(_this.TableForm));
                _this.$emit("RefreshItem", newobj);
                _this.cancle();
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    //总表设置分摊项目、系数项目名称下拉列表查询
    ApportionedProjectName() {
      queryApportionedProjectName().then((response) => {
        var data = response;
        if (data) {
          this.tableData = data;
        }
      });
    },
    // 取消
    cancle() {
      this.$emit("update:show", false);
      this.$nextTick(() => {
        this.$refs.TableForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>

<style>
.TableDialog .el-input-number {
  width: 100%;
  text-align: left;
}

.TableDialog .el-input-number {
  width: 100%;
}

.TableDialog .el-input-number input {
  text-align: left;
}
</style>
