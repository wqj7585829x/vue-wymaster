<template>
  <div class="ResourceDialog">
    <el-dialog v-dialogDrag :title="title" class="el-dialog-double" :visible.sync="visible" @close="cancle" :show="show"
      :close-on-click-modal="false">
      <el-form label-width="85px" :model="ResourceForm" :rules="rules" ref="ResourceForm">

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="资源代码:" prop="FJDA_FJID">
              <el-input v-model="ResourceForm.FJDA_FJID" :disabled=" title=='修改' ? true : false "></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="资源名称:" prop="FJDA_FJMC">
              <el-input v-model="ResourceForm.FJDA_FJMC"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="楼层:" prop="FJDA_LC">
              <el-input-number v-model="ResourceForm.FJDA_LC" :precision="0" :step="1" :controls="false">
              </el-input-number>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="收费面积:" prop="FJDA_SFMJ">
              <el-input-number v-model="ResourceForm.FJDA_SFMJ" :precision="4" :step="0.0001" :min="0"
                :controls="false"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="建筑面积:" prop="FJDA_JZMJ">
              <el-input-number v-model="ResourceForm.FJDA_JZMJ" :precision="4" :step="0.0001" :min="0"
                :controls="false"></el-input-number>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="使用面积:" prop="FJDA_SYMJ">
              <el-input-number v-model="ResourceForm.FJDA_SYMJ" :precision="4" :step="0.0001" :min="0"
                :controls="false"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="单元号:" prop="FJDA_FJH">
              <el-input v-model="ResourceForm.FJDA_FJH"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="资源类型:" prop="FJDA_ZYLX">
              <el-select v-model="ResourceForm.FJDA_ZYLX">
                <el-option v-for="item in ResourceTypeData" :key="item.BMB_LXNR" :label="item.BMB_LXNR"
                  :value="item.BMB_LXNR">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="朝向:" prop="FJDA_CX">
              <el-select v-model="ResourceForm.FJDA_CX">
                <el-option v-for="item in OrientationData" :key="item.BMB_LXNR" :label="item.BMB_LXNR"
                  :value="item.BMB_LXNR">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="楼栋名称:" prop="FCDM_MC">
              <el-input v-model="ResourceForm.FCDM_MC" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <div class="el-line-2"></div>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="产权归属:" prop="FJDA_CQGS">
              <el-select v-model="ResourceForm.FJDA_CQGS">
                <el-option v-for="item in PropertyOwnershipData" :key="item.BMB_LXNR" :label="item.BMB_LXNR"
                  :value="item.BMB_LXNR">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="户型:" prop="FJDA_HX">
              <el-select v-model="ResourceForm.FJDA_HX">
                <el-option v-for="item in HouseTypeData" :key="item.BMB_LXNR" :label="item.BMB_LXNR"
                  :value="item.BMB_LXNR">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="位置:" prop="FJDA_WZ">
              <el-input v-model="ResourceForm.FJDA_WZ"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="房间净高:" prop="FJDA_FJGD">
              <el-input-number v-model="ResourceForm.FJDA_FJGD" :precision="4" :step="0.0001" :min="0"
                :controls="false"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="最大承重：" prop="FJDA_ZDCZ">
              <el-input-number v-model="ResourceForm.FJDA_ZDCZ" :precision="4" :step="0.0001" :min="0"
                :controls="false"></el-input-number>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="配套设施:" prop="FJDA_PTSS">
              <el-input v-model="ResourceForm.FJDA_PTSS"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="所在梯:" prop="FJDA_FJSZT">
              <el-input v-model="ResourceForm.FJDA_FJSZT"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="房间层组:" prop="FJDA_FJCZ">
              <el-input v-model="ResourceForm.FJDA_FJCZ"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="资源属性" prop="FJDA_FJJG">
              <el-input v-model="ResourceForm.FJDA_FJJG"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="装修情况:" prop="FJDA_ZXQK">
              <el-input v-model="ResourceForm.FJDA_ZXQK"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="出租状态:" prop="FJDA_CZZT">
              <el-select v-model="ResourceForm.FJDA_CZZT">
                <el-option v-for="item in LeaseStateData" :key="item.BMB_LXNR" :label="item.BMB_LXNR"
                  :value="item.BMB_LXNR">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="资产分类:" prop="FJDA_ZCFL">
              <el-select v-model="ResourceForm.FJDA_ZCFL">
                <el-option label="自有" :value="1"></el-option>
                <el-option label="代管" :value="2"></el-option>
                <el-option label="经营性" :value="3"></el-option>
                <el-option label="临时经营性" :value="4"></el-option>
                <el-option label="其他" :value="5"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          </el-form-item>
        </el-row>

        <el-row :gutter="50">
          <el-col :span="12">
            <el-form-item label="出租面积:" prop="FJDA_ZLMJ">
              <el-input-number v-model="ResourceForm.FJDA_ZLMJ" :precision="4" :step="0.0001" :min="0"
                :controls="false"></el-input-number>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="是否有效:" prop="FJDA_LS">
              <el-checkbox v-model="ResourceForm.FJDA_LS"></el-checkbox>
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
  addResourceFileRoom,
  updateResourceFileRoomOther,
  queryPropertyOwnershipLevel,
  queryResourceTypeLevel,
  queryHouseTypeLevel,
  queryResourceConfigurationLevel,
  queryOrientationLevel,
  queryLeaseStateLevel
} from "@/api/BasicManagement/ResourceFile";
export default {
  data() {
    return {
      visible: this.show,
      title: "", //标题
      ResourceForm: {},
      rules: {
        FJDA_FJID: [
          { required: true, message: "请输入资源代码", trigger: "blur" }
        ],
        FJDA_FJMC: [
          { required: true, message: "请输入资源名称", trigger: "blur" }
        ],
        FJDA_SFMJ: [
          { required: true, message: "请输入收费面积", trigger: "blur" }
        ],
        FJDA_JZMJ: [
          { required: true, trigger: "blur" }
        ],
      },
      PropertyOwnershipData: {},
      ResourceTypeData: {},
      HouseTypeData: {},
      ResourceConfigurationData: {},
      OrientationData: {},
      LeaseStateData: {}
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    show() {
      this.visible = this.show;
    }
  },
  methods: {
    //   判断新增，修改
    getResourceData(data, type) {
      this.PropertyOwnership()
      this.ResourceType()
      this.HouseType()
      this.ResourceConfiguration()
      this.Orientation()
      this.LeaseState()

      if (type == 0) {
        data.FJDA_LS = false
        data.FJDA_SFMJ = 0
        data.FJDA_JZMJ = 0
        this.title = "新增资源";
      } else {
        this.title = "修改";
        if (data.FJDA_LC == '') delete data.FJDA_LC
      }
      this.ResourceForm = JSON.parse(JSON.stringify(data));
      this.ResourceForm.FJDA_LS = !this.ResourceForm.FJDA_LS
    },
    //产权归属
    PropertyOwnership() {
      queryPropertyOwnershipLevel().then(response => {
        var data = response
        if (data) {
          this.PropertyOwnershipData = data
        }
      })
    },
    //资源类型
    ResourceType() {
      queryResourceTypeLevel().then(response => {
        var data = response
        if (data) {
          this.ResourceTypeData = data
        }
      })
    },
    //户型
    HouseType() {
      queryHouseTypeLevel().then(response => {
        var data = response
        if (data) {
          this.HouseTypeData = data
        }
      })
    },
    //资源结构
    ResourceConfiguration() {
      queryResourceConfigurationLevel().then(response => {
        var data = response
        if (data) {
          this.ResourceConfigurationData = data
        }
      })
    },
    //朝向
    Orientation() {
      queryOrientationLevel().then(response => {
        var data = response
        if (data) {
          this.OrientationData = data
        }
      })
    },
    //出租状态
    LeaseState() {
      queryLeaseStateLevel().then(response => {
        var data = response
        if (data) {
          this.LeaseStateData = data
        }
      })
    },
    //   新增/修改分区
    sure() {
      var _this = this
      this.$refs['ResourceForm'].validate(valid => {
        if (valid) {
          if (_this.title == "新增资源") {
            addResourceFileRoom(_this.ResourceForm).then(response => {
              if (response.returnStatus == 'SUCCESS') {
                _this.$emit("RefreshItem");
                _this.cancle()
              }
            })
          } else {
            updateResourceFileRoomOther(_this.ResourceForm).then(response => {
              if (response.returnStatus == 'SUCCESS') {
                let newobj = JSON.parse(JSON.stringify(_this.ResourceForm));
                _this.$emit("RefreshItem", newobj);
                _this.cancle()
              }
            })
          }
        } else {
          return false
        }
      })
    },
    // 取消
    cancle() {
      this.$emit("update:show", false);
      this.$nextTick(() => {
        this.$refs.ResourceForm.resetFields(); //重置输入框提示
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.el-line-2 {
  width: 90%;
  height: 2px;
  background: #888;
  margin-left: 5%;
  margin-bottom: 20px;
}
</style>

<style>
.ResourceDialog .el-input-number {
  width: 100%;
}

.ResourceDialog .el-input-number input {
  text-align: left;
}
</style>