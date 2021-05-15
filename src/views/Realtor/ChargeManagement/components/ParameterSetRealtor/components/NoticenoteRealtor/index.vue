<template>
  <div class="NoticenoteRealtor">
    <div class="content">
      <el-form ref="tableForm">
        <el-row>
          <el-card>
            <div class="el-card-date">备注信息:</div>
            <el-row :gutter="50">
              <el-col :span="24">
                <el-form-item label="所属项目：" prop="selectContent">
                  <el-select v-model="tableParameter.name" @change="PlotChange">
                    <el-option
                      v-for="(item, index) in userPlot"
                      :key="index"
                      :value="item.GLCNAME"
                      :label="item.GLCNAME"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="50">
              <el-col :span="24">
                <el-form-item label="报表名称：" prop="prmId">
                  <el-select
                    placeholder="请选择"
                    v-model="tableParameter.prmId"
                  >
                    <el-option
                      :label="tableParameter.prmName"
                      :value="tableParameter.prmId"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="50">
              <el-col :span="24">
                <el-input
                  type="textarea"
                  v-model="tableParameter.prmValue"
                  auto-complete="off"
                ></el-input>
              </el-col>
            </el-row>
          </el-card>
        </el-row>
      </el-form>
    </div>
    <!-- 按钮begin -->
    <div class="buttonBox">
      <el-button
        type="primary"
        @click="subForm"
        v-has="'NoticenoteRealtorSure_has'"
        >确定</el-button
      >
    </div>
    <!-- 按钮end -->
  </div>
</template>
<script>
import {
  queryRemarkApi,
  updateRemarkApi,
} from "@/api/Realtor/ParameterSetRealtor"; //参数设置js
import { mapGetters } from "vuex";
export default {
  name: "NoticenoteRealtor",
  computed: {
    ...mapGetters(["currentPlot", "userPlot"]), //mapGetters包含addRouters，cachedViews，permission_routers，userName，visitedviews,currentPlot,userPlot
  },
  data() {
    return {
      tableParameter: {},
    };
  },
  watch: {
    currentPlot() {
      this.tableParameter.name = this.currentPlot; //监听//当前选中的小区
    },
    userPlot() {
      this.userPlot.forEach((item) => {
        if (item.GLCNAME == this.currentPlot) {
          this.tableParameter.dbName = item.dbName;
          this.tableParameter.GLCID = item.GLCID;
          this.tableParameter.YXDID = item.YXDID;
          let newRowData = JSON.parse(JSON.stringify(this.tableParameter)); //拷贝一份存储对象
          this.tableParameter = newRowData; //拷贝一份存储对象引用不同地址
          this.$nextTick(() => {
            this.getDateObj();
          });
        }
      });
    },
  },
  mounted() {
    this.tableParameter.name = this.currentPlot; //当前选中的小区
    this.userPlot.forEach((item) => {
      if (item.GLCNAME == this.currentPlot) {
        this.tableParameter.dbName = item.dbName;
        this.tableParameter.GLCID = item.GLCID;
        this.tableParameter.YXDID = item.YXDID;
        let newRowData = JSON.parse(JSON.stringify(this.tableParameter)); //拷贝一份存储对象
        this.tableParameter = newRowData; //拷贝一份存储对象引用不同地址
        this.$nextTick(() => {
          this.getDateObj();
        });
      }
    });
  },
  methods: {
    getDateObj() {
      //获取列表数据
      queryRemarkApi(this.tableParameter).then((response) => {
        this.tableParameter.prmId = response.data.prmId;
        this.tableParameter.prmValue = response.data.prmValue;
        this.tableParameter.prmName = response.data.prmName;
        let newRowData = JSON.parse(JSON.stringify(this.tableParameter)); //拷贝一份存储对象
        this.tableParameter = newRowData; //拷贝一份存储对象引用不同地址
      });
    },
    PlotChange(val) {
      //项目名称改变事件
      if (val) {
        this.userPlot.forEach((item) => {
          if (item.GLCNAME == val) {
            this.tableParameter.dbName = item.dbName;
            this.tableParameter.GLCID = item.GLCID;
            this.tableParameter.YXDID = item.YXDID;
            let newRowData = JSON.parse(JSON.stringify(this.tableParameter)); //拷贝一份存储对象
            this.tableParameter = newRowData; //拷贝一份存储对象引用不同地址
            this.getDateObj();
          }
        });
      }
    },
    subForm() {
      updateRemarkApi(this.tableParameter).then((response) => {
        this.getDateObj();
      });
    },
  },
};
</script>
<style lang="scss">
.NoticenoteRealtor {
  .el-card-date {
    color: #666;
    font-size: 14px;
    position: absolute;
    top: -10px;
    left: 10px;
    background: #ffffff;
    height: 16px;
    line-height: 16px;
    width: 85px;
  }
  .content {
    display: block;
    margin-top: 30px;
  }
  .el-card {
    -webkit-box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.1);
    position: relative;
    overflow: inherit;
  }
  .buttonBox {
    margin-top: 20px;
  }
}
</style>
