<template>
  <div class="project">
    <el-dialog
      v-dialogDrag
      :title="title"
      class="el-dialog-double"
      :visible.sync="visible"
      @close="cancle"
      :show="show"
      :close-on-click-modal="false"
    >
      <el-form
        label-width="115px"
        :model="projectForm"
        :rules="rules"
        ref="projectForm"
      >
        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="维修项目名称：" prop="pubProjectName">
              <el-input v-model="projectForm.pubProjectName"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="项目使用金额：" prop="pubProjectMoney">
              <el-input v-model="projectForm.pubProjectMoney"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="分摊标准：" prop="shareStandard">
              <el-select v-model="projectForm.shareStandard">
                <el-option
                  v-for="item in shareStandardOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="项目类型：">
              <el-select v-model="projectForm.type">
                <el-option
                  v-for="item in typeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="工程进度：">
              <el-select v-model="projectForm.progress">
                <el-option
                  v-for="item in progressOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="维修类别：">
              <el-select v-model="projectForm.repairType">
                <el-option
                  v-for="item in repairTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="所属集团：" prop="belongClique">
              <el-select
                v-model="projectForm.belongClique"
                @change="findCliquechange"
                :disabled="disabledBelong"
              >
                <el-option
                  v-for="item in findCliquelist"
                  :key="item.cliqId"
                  :label="item.name"
                  :value="item.cliqId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="所属物业：" prop="belongComp">
              <el-select
                v-model="projectForm.belongComp"
                @change="findTenchange"
                :disabled="disabledBelong"
              >
                <el-option
                  v-for="item in findTenlist"
                  :key="item.tenId"
                  :label="item.name"
                  :value="item.tenId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="所属小区：" prop="belongPlot">
              <el-select
                v-model="projectForm.belongPlot"
                @change="findPlotchange"
                :disabled="disabledBelong"
              >
                <el-option
                  v-for="item in findPlotlist"
                  :key="item.plotId"
                  :label="item.name"
                  :value="item.plotId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="报修部门：">
              <el-input v-model="projectForm.repairDepartment"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="处理人：">
              <el-input v-model="projectForm.processer"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="维修单位：">
              <el-input v-model="projectForm.repairCompany"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="报修日期：">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                v-model="projectForm.repairDate"
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="报修地点：">
              <el-input v-model="projectForm.repairAddress"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="开工日期：">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                v-model="projectForm.startDate"
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="完工日期：" prop="endDate">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                value-format="yyyy-MM-dd"
                v-model="projectForm.endDate"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="登记人：">
              <span class="TextColor">{{ projectForm.creater }}</span>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="项目说明：">
              <el-input v-model="projectForm.explain"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="备注：">
              <el-input type="textarea" v-model="projectForm.remark"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12" v-show="title == '修改'">
            <el-form-item label="创建时间：">
              <span class="TextColor">{{ projectForm.createDate }}</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="更新时间：" v-show="title == '修改'">
              <span class="TextColor">{{ projectForm.lastUpdate }}</span>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="提交审批人：" v-show="title == '修改'">
              <span class="TextColor">{{ projectForm.subApprovaler }}</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="审批人：" v-show="title == '修改'">
              <span class="TextColor">{{ projectForm.approvaler }}</span>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item
              label="审批不通过原因："
              label-width="125px"
              v-show="title == '修改'"
            >
              <span class="TextColor">{{ projectForm.reason }}</span>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label-width="0">
              <el-button
                type="primary"
                :disabled="disabledSet"
                @click="setShareGroup"
                >设置分摊组户</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label-width="0">
              <span>分摊组</span>
              <el-table border :data="groupTableData" max-height="200">
                <el-table-column
                  prop="groupName"
                  label="分摊组名称"
                  width="120"
                ></el-table-column>
                <el-table-column
                  prop="groupCaption"
                  label="分摊组说明"
                  width="120"
                ></el-table-column>
                <el-table-column prop="remark" label="备注"></el-table-column>
              </el-table>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label-width="0">
              <span>对应户</span>
              <el-table border :data="tableData" max-height="200">
                <el-table-column
                  prop="cusName"
                  label="客户名称"
                  width="120"
                ></el-table-column>
                <el-table-column
                  prop="roomNo"
                  label="所属资源"
                ></el-table-column>
                <el-table-column
                  prop="buildName"
                  label="楼栋"
                  width="100"
                ></el-table-column>
              </el-table>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sure">确 定</el-button>
        <el-button @click="cancle">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 设置分摊组户 弹框 begin -->
    <SetGroupDialog
      :showGroup.sync="showGroup"
      ref="PopSetGroupChildren"
      @RefreshItem="refreshTable"
    ></SetGroupDialog>
    <!-- 设置分摊组户 弹框 end -->
  </div>
</template>

<script>
import { number, onlynumber } from "@/utils/validate.js";
import SetGroupDialog from "./SetGroupDialog";
import {
  findClique,
  findTen,
  findPlot,
  PubRepFundProject_selectGroupR,
  add,
  modify,
} from "@/api/PublicRepair/UseManage"; //js

export default {
  data() {
    var validateEndDate = (rule, value, callback) => {
      if (value == "" || value == null) {
        callback();
      } else if (
        parseInt(
          value.split("-")[0] + value.split("-")[1] + value.split("-")[2]
        ) <
        parseInt(
          this.projectForm.startDate.split("-")[0] +
            this.projectForm.startDate.split("-")[1] +
            this.projectForm.startDate.split("-")[2]
        )
      ) {
        callback(new Error("完工日期不能小于开工日期"));
      } else {
        callback();
      }
    };
    return {
      visible: this.show,
      title: "", //标题
      showGroup: false, //设置分摊组户 显示
      findCliquelist: [], //集团列表
      findTenlist: [], //公司列表
      findPlotlist: [], //小区列表
      disabledSet: true, //设置分摊组户 禁用
      groupTableData: [], //分摊组 表数据
      tableData: [], //对应户 表数据
      disabledBelong: false, // 不能修改 所属集团，所属物业，所属小区
      shareStandardOptions: [
        {
          value: 1,
          label: "平均分摊",
        },
        {
          value: 2,
          label: "按收费面积分摊",
        },
      ],
      typeOptions: [
        {
          value: 1,
          label: "大项目",
        },
        {
          value: 2,
          label: "小项目",
        },
      ],
      progressOptions: [
        {
          value: 1,
          label: "未完成",
        },
        {
          value: 2,
          label: "已完成",
        },
      ],
      repairTypeOptions: [
        {
          value: 1,
          label: "公共设施",
        },
        {
          value: 2,
          label: "共用部位/公用设备",
        },
        {
          value: 3,
          label: "自用部位",
        },
      ],
      projectForm: {
        pubProjectName: null,
        pubProjectMoney: 0,
        shareStandard: null,
        type: null,
        progress: null,
        repairType: null,
        belongClique: null,
        belongComp: null,
        belongPlot: null,
        repairDepartment: null,
        processer: null,
        repairCompany: null,
        repairAddress: null,
        repairDate: null,
        startDate: null,
        endDate: null,
        creater: null,
        explain: null,
        remark: null,
        groupID: null,
        pubProjectID: null,
        subApprovaler: null,
        createDate: null,
        lastUpdate: null,
        subApprovaler: null,
        approvaler: null,
      },
      rules: {
        pubProjectName: [
          { required: true, message: "请输入维修项目名称", trigger: "blur" },
        ],
        pubProjectMoney: [
          { required: true, message: "请输入项目使用金额", trigger: "blur" },
          { validator: number, trigger: "blur" },
        ],
        shareStandard: [
          { required: true, message: "请选择分摊标准", trigger: "change" },
        ],
        belongClique: [
          { required: true, message: "请输入所属集团", trigger: "blur" },
        ],
        belongComp: [
          { required: true, message: "请输入所属物业", trigger: "blur" },
        ],
        belongPlot: [
          { required: true, message: "请输入所属小区", trigger: "blur" },
        ],
        endDate: [
          { required: false, validator: validateEndDate, trigger: "blur" },
        ],
      },
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
    getProjectData(data, type) {
      this.projectForm = JSON.parse(JSON.stringify(data));
      if (type == 0) {
        this.title = "新增";
        this.projectForm.pubProjectMoney = 0;
        this.projectForm.creater = JSON.parse(
          sessionStorage.getItem("roleObject")
        )[0].empPost;
        this.disabledBelong = false;
        this.disabledSet = true;
        this.groupTableData = [];
        this.tableData = [];
        this.findTenlist = [];
        this.findPlotlist = [];
      } else {
        this.title = "修改";
        this.getGroupData(); //获取分摊组 获取对应户
        this.getfindTen(); //获取物业
        this.getfindPlot(); //获取公司
        this.disabledSet = false; // 设置分摊组 可用
        this.disabledBelong = true;
      }
      this.getfindClique();
    },
    // 获取集团
    getfindClique() {
      findClique().then((response) => {
        this.findCliquelist = response.returnData;
        // if (data.length > 0) {
        //   this.findCliquelist = data;
        //     this.projectForm.belongClique = data[0].cliqId;
        //     this.getfindTen();
        // }
      });
    },
    // 获取公司
    getfindTen() {
      findTen(this.projectForm).then((response) => {
        this.findTenlist = response.returnData;
        // if (data.length > 0) {
        //   this.findTenlist = data;
        //   this.projectForm.belongComp = data[0].tenId;
        //   this.getfindPlot();
        // }
      });
    },
    // 获取小区
    getfindPlot() {
      findPlot(this.projectForm).then((response) => {
        this.findPlotlist = response.returnData;
        // if (data.length > 0) {
        //   this.findPlotlist = data;
        //   this.projectForm.belongPlot = data[0].plotId;
        // }
      });
    },
    // 所属集团 change
    findCliquechange(val) {
      this.groupTableData = [];
      this.tableData = [];
      this.projectForm.belongClique = val;
      this.projectForm.belongComp = null;
      this.projectForm.belongPlot = null;
      this.findPlotlist = [];
      this.disabledSet = true;
      this.getfindTen();
    },
    // 所属物业 change
    findTenchange(val) {
      this.groupTableData = [];
      this.tableData = [];
      this.projectForm.belongComp = val;
      this.projectForm.belongPlot = null;
      this.getfindPlot();
    },
    // 所属小区 change
    findPlotchange(val) {
      this.groupTableData = [];
      this.tableData = [];
      this.projectForm.belongPlot = val;
      this.disabledSet = false;
    },
    // 获取 分摊组 对应户
    getGroupData() {
      PubRepFundProject_selectGroupR(this.projectForm).then((response) => {
        this.groupTableData = response.returnData[0].groupList;
        this.tableData = response.returnData[0].groupRList;
      });
    },
    // 设置分摊组户
    setShareGroup() {
      this.showGroup = true;
      var data = {
        belongPlot: this.projectForm.belongPlot,
        pubProjectID: this.projectForm.pubProjectID,
      };
      this.$refs.PopSetGroupChildren.getData(data);
    },
    // 刷新 分摊组 对应户 表
    refreshTable(groupID) {
      this.projectForm.groupID = groupID;
      this.getGroupData();
    },
    //   新增/修改
    sure() {
      this.$refs.projectForm.validate((valid) => {
        if (valid) {
          if (this.title == "新增") {
            add(this.projectForm).then((response) => {
              var data = response.returnData[0];
              if (data.status) {
                let newobj = JSON.parse(JSON.stringify(this.projectForm));
                this.$emit("RefreshItem", newobj);
                this.cancle();
              }
            });
          } else {
            modify(this.projectForm).then((response) => {
              var data = response.returnData[0];
              if (data.status) {
                let newobj = JSON.parse(JSON.stringify(this.projectForm));
                this.$emit("RefreshItem", newobj);
                this.cancle();
              }
            });
          }
        } else {
          return false;
        }
      });
    },
    // 取消
    cancle() {
      this.$emit("update:show", false);
      this.$nextTick(() => {
        this.$refs.projectForm.resetFields(); //重置输入框提示
      });
    },
  },
  components: {
    SetGroupDialog,
  },
};
</script>

<style lang="scss" scoped>
.project /deep/ .el-dialog-double .el-dialog__body {
  max-height: 750px;
  overflow-y: auto;
}
</style>
