<template>
  <el-dialog
    v-dialogDrag
    :title="title"
    :visible="dialogFormVisible"
    @close="cancelForm"
    :close-on-click-modal="false"
    class="el-dialog-double"
  >
    <el-form
      label-width="120px"
      :model="formList"
      :rules="rules"
      ref="ruleForm"
    >
      <el-row :gutter="50">
        <el-col :span="12">
          <el-form-item label="类别选择：" prop="category_id">
            <el-select
              v-model="formList.category_id"
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

        <el-col :span="12">
          <el-form-item label="类型选择：" prop="type_id">
            <el-select
              v-model="formList.type_id"
              placeholder="请选择"
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
      </el-row>

      <el-row :gutter="50" v-if="formList.is_repair">
        <el-col :span="12">
          <el-form-item label="报修地址:" prop="repair_address">
            <el-input v-model="formList.repair_address"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="报修人:" prop="repair_person">
            <el-input v-model="formList.repair_person"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="50" v-if="formList.is_repair">
        <el-col :span="12">
          <el-form-item label="报修电话:" prop="repair_mobile">
            <el-input v-model="formList.repair_mobile"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submitForm()">确 定</el-button>
      <el-button @click="cancelForm()">取 消</el-button>
    </div>
  </el-dialog>
</template>
<script>
import {
  PlotLisApi,
  categoryNameOptionsApi,
  typeArryApi,
  FeedFlOkApi,
} from "@/api/Feedbackplat/FeedbackList";
export default {
  props: ["showdialogFl"],
  watch: {
    showdialogFl() {
      this.dialogFormVisible = this.showdialogFl;
    },
  },
  data() {
    return {
      title: "",
      dialogFormVisible: this.showdialogFl,
      OperType: 0, //0 新增  1修改
      formList: {},
      PlotLisArray: [], //小区列表数组
      categoryNameOptions: [], //下拉类别
      typeNameOptions: [], //下拉类型
      dialogImageUrl: "", //图片弹窗地址
      dialogVisible: false, //图片弹窗默认隐藏
      picList: [],
      fileList: [],
      rules: {
        category_id: [
          { required: true, message: "请选择类别", trigger: "blur" },
        ],
        type_id: [{ required: true, message: "请选择类型", trigger: "blur" }],
        repair_address: [
          { required: true, message: "请输入报修地址", trigger: "blur" },
        ],
        repair_person: [
          { required: true, message: "请输入报修人", trigger: "blur" },
        ],
        repair_mobile: [
          { required: true, message: "请输入报修电话", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    getTableRow(data, type) {
      let newRowData = JSON.parse(JSON.stringify(data)); //拷贝一份存储对象
      this.formList = newRowData; //拷贝一份存储对象引用不同地址
      this.OperType = type;
      this.PlotLis(); //查询小区列表
      this.categoryNameOptionsArray();
      if (this.OperType == 0) {
        //0：新增  1：修改
        this.title = "分类";
      } else {
        this.title = "分类";
      }
    },
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
          this.formList.GLCID = item.GLCID;
          this.formList.YXDID = item.YXDID;
          this.formList.JT_ZJ = item.JT_ZJ;
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
      this.categoryNameOptions.forEach((item) => {
        if (item.category_id === this.formList.category_id) {
          this.formList.category_name = item.category_name;
          this.formList.is_repair = item.is_repair; //判断是否报修1，0位不不保修
        }
      });
      typeArryApi(this.formList.category_id).then((resonse) => {
        this.typeNameOptions = resonse;
      });
    },
    //清空下拉类别清空下拉类型
    clearCate() {
      this.formList.type_id = "";
    },
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          FeedFlOkApi(this.formList).then((response) => {
            //新增
            if (response.returnStatus == "SUCCESS") {
              let newobj = JSON.parse(JSON.stringify(this.formList));
              this.$emit("RefreshItem", newobj); //确定后发送$emit绑定父数据
              this.cancelForm();
            }
          });
        } else {
          return false;
        }
      });
    },
    cancelForm() {
      //取消关闭
      this.$emit("update:showdialogFl", false);
      this.$nextTick(function () {
        this.$refs.ruleForm.resetFields(); //重置输入框提示
      });
    },
  },
};
</script>
