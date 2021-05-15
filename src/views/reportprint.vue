<template>
  <section class="reportprint">
    <!-- <el-button class="button" type="primary" @click="print">打印</el-button> -->
    <div id="subOutputRank-print">
      <div v-html="htmlvalue"></div>
    </div>
  </section>
</template>
<script>
//打印功能，打印和取消按钮触发事件begin
var beforePrint = function () {
  //打印前
  console.log("Functionality to run before printing.");
};

var afterPrint = function () {
  //打印后
  // window.close()
};

if (window.matchMedia) {
  var mediaQueryList = window.matchMedia("print");
  mediaQueryList.addListener(function (mql) {
    if (mql.matches) {
      beforePrint();
    } else {
      afterPrint();
    }
  });
}

window.onbeforeprint = beforePrint;
window.onafterprint = afterPrint;
//打印按钮end

import { Costcalculation } from "@/api/ReportManagement/QueryReport";
export default {
  data() {
    return {
      htmlvalue: "",
    };
  },
  mounted() {
    var imgurl = sessionStorage.getItem("reportprintimg"); //替换报表扫码logo
    var numberOfPage = parseInt(sessionStorage.getItem("numberOfPage")); //用于显示一页几张通知单设置的标识
    var _this = this;
    Costcalculation(JSON.parse(sessionStorage.getItem("reportprint"))).then(
      (response) => {
        response = response.replace(/50%/g, "0").replace(/<br\/>/g, "");
        this.htmlvalue = response;

        this.$nextTick(() => {
          if (imgurl) {
            //把报表中无效图片替换为二维码图片
            var imglist = imgurl.split(";");
            var imgnum = 0;
            var imgtotal = imglist.length;
            var data = document.getElementsByTagName("img");
            for (var i = 0; i < data.length; i++) {
              var unit = document.getElementsByTagName("img")[i].src;
              if (unit.indexOf("xxx.png") > 1) {
                document.getElementsByTagName("img")[i].src = imglist[imgnum];
                imgnum = imgnum === imgtotal - 1 ? 0 : imgnum + 1;
              }
            }
          }
          var unit = document.querySelectorAll("table.jrPage"); //获取整个页面的每个报表单独模块
          for (var j = 0; j < unit.length; j++) {
            //设置每个报表满屏宽度
            document.querySelectorAll("table.jrPage")[j].style.width = "100%";
          }
          for (
            var l = numberOfPage - 1;
            l < unit.length;
            l = l + numberOfPage
          ) {
            //添加分页样式，结合分页标识实现每页显示几张通知单功能
            document
              .querySelectorAll("table.jrPage")
              [l].classList.add("paging");
          }

          var block = document.querySelectorAll("tbody");

          for (var z = 1; z < block.length; z++) {
            //获取zhby_table标识，用于特定行设定行高，
            var tr = document.querySelectorAll("tbody")[z].children;
            for (var x = 0; x < tr.length; x++) {
              var td = document.querySelectorAll("tbody")[z].children[x]
                .children[
                document.querySelectorAll("tbody")[z].children[x].children
                  .length - 1
              ].children; //查找特殊列获取是否存在zhby_table，存在则进行设置行高
              var value = td.length == 0 ? "" : td[0].innerText;
              if (value.indexOf("zhby_table") > -1) {
                document.querySelectorAll("tbody")[z].children[
                  x
                ].style.height = `${value.replace("zhby_table", "")}px`;
              }
              document
                .querySelectorAll("tbody")
                [z].children[x].removeChild(
                  document.querySelectorAll("tbody")[z].children[x]
                    .lastElementChild
                ); //删除特殊标志列
              var lasttd = document.createElement("td");
              lasttd.style.width = "20px";
              document
                .querySelectorAll("tbody")
                [z].children[x].appendChild(lasttd); //添加空白列，使报表左右显示空白等宽
            }
          }

          if (sessionStorage.getItem("query_type") === "0") {
            //设置报表高度，如果为‘0’时则添加样式halfheight，报表为单张打印纸一半高度
            for (var x = 0; x < unit.length; x++) {
              document
                .querySelectorAll("table.jrPage")
                [x].classList.add("halfheight");
            }
            for (var k = 1; k < block.length; k++) {
              document.querySelectorAll("tbody")[k].children[
                document.querySelectorAll("tbody")[k].children.length - 1
              ].style.height = 0;
            }
          } else {
            //根据设置值设置报表高度
            for (var k = 1; k < block.length; k++) {
              document.querySelectorAll("tbody")[k].children[
                document.querySelectorAll("tbody")[k].children.length - 1
              ].style.height = 0;
              var blockheight = document.querySelectorAll("tbody")[k]
                .scrollHeight;
              document.querySelectorAll("tbody")[k].children[
                document.querySelectorAll("tbody")[k].children.length - 1
              ].style.height = `${
                parseInt(sessionStorage.getItem("query_type")) - blockheight
              }px`;
            }
          }

          document.querySelectorAll("table")[0].classList = "reportprint";
          this.print();
        });
      }
    );
  },
  methods: {
    print() {
      //打印报表
      this.$nextTick(() => {
        let subOutputRankPrint = document.getElementById("subOutputRank-print");
        let newContent = subOutputRankPrint.innerHTML;
        let oldContent = document.body.innerHTML;
        document.body.innerHTML = newContent;
        window.print();
      });
    },
  },
};
</script>
<style lang="scss">
html,
body {
  span {
    font-family: "Microsoft YaHei" !important;
  }
}

.reportprint {
  text-align: center;
  position: relative;
  #subOutputRank-print {
    margin: 0 auto;
    // width: 595px;
    img {
      width: 100%;
    }
  }
  .button {
    position: fixed;
    right: 10px;
    top: 10px;
  }
}

.halfheight {
  height: 50vh !important;
}
</style>

<style lang="scss">
.ReceiptBody {
  /* 打印css */
  @media print {
    /* 打印去掉页眉页脚 */
    @page {
      size: auto A4 landscape;
      margin: 3mm;
    }
  }
}

.paging {
  page-break-after: always;
}
</style>
