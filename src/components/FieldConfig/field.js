import {
  queryDynamicFieldConfigurationApi,
  setDynamicFieldConfigApi,
} from "@/api/Common/FieldConfig.js"; //栏位配置API
import FieldConfig from "@/components/FieldConfig"; //自定义栏位
const fieldMinxin = {
  components: {
    FieldConfig,
  },
  data() {
    return {
      checkData: [], //选中栏位
      queryData: [], //默认查询到的栏位
    };
  },
  methods: {
    getFieldConfig(code) {
      //栏位配置查询
      var isCheckIndex = 0;
      queryDynamicFieldConfigurationApi().then((response) => {
        if (response.data.length > 0) {
          response.data.forEach((item) => {
            if (item.code == code) {
              isCheckIndex++;
              this.checkData = JSON.parse(item.content); //已配置的栏位
              this.queryData = response.data; //查询的栏位  用于设置自定义显示按钮高亮
              if (this.checkData.length <= 0) {
                this.checkData = this.configData.filter((item) => {
                  //过滤默认不需要显示的栏位
                  return item.isShow != false;
                });
              }
            } else {
              if (isCheckIndex == 0) {
                this.checkData = this.configData.filter((item) => {
                  //过滤默认不需要显示的栏位
                  return item.isShow != false;
                });
              }
            }
          });
        } else {
          this.checkData = this.configData.filter((item) => {
            //过滤默认不需要显示的栏位
            return item.isShow != false;
          });
        }
        this.checkData.forEach((item, index) => {
          //设置最后一个铺平整个table
          if (index == this.checkData.length - 1) {
            item.width = "";
          }
        });
      });
    },
    saveConfig(obj, code) {
      //保存
      setDynamicFieldConfigApi(obj, code).then((response) => {
        //保存已配置的栏位
        if (response.returnStatus == "SUCCESS") {
          this.getFieldConfig(code); //栏位配置查询
        }
      });
    },
  },
};
export default fieldMinxin;
