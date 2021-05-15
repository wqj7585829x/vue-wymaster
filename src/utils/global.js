export function roundings(value, roundWay, preciseDigit) {
  // 取整方式1:四舍五入,精确位数
  if (roundWay == undefined) {
    return value.toFixed(2);
  }

  if (roundWay == "四舍五入" && preciseDigit == 0) {
    return value.toFixed(0);
  }
  if (roundWay == "四舍五入" && preciseDigit == 1) {
    return value.toFixed(1);
  }
  if (roundWay == "四舍五入" && preciseDigit == 2) {
    return value.toFixed(2);
  }
  if (roundWay == "四舍五入" && preciseDigit == 3) {
    return value.toFixed(3);
  }
  if (roundWay == "四舍五入" && preciseDigit == 4) {
    return value.toFixed(4);
  }
  if (roundWay == "四舍五入" && preciseDigit == 5) {
    var valueT = String(value);
    var str = "";
    if (valueT.indexOf(".") > -1) {
      str = valueT.split(".")[0];
    } else {
      str = valueT.split("");
    }
    var last = str[str.length - 1];
    if (last < 5) {
      valueT = valueT - last;
    }
    if (last == 5) {
      valueT = Number(valueT) + 5;
    }
    if (last == 6) {
      valueT = Number(valueT) + 4;
    }
    if (last == 7) {
      valueT = Number(valueT) + 3;
    }
    if (last == 8) {
      valueT = Number(valueT) + 2;
    }
    if (last == 9) {
      valueT = Number(valueT) + 1;
    }
    if (String(valueT).indexOf(".") > -1) {
      valueT = String(valueT).split(".")[0];
    }
    return valueT;
  }

  // 取整方式2:舍弃尾数,精确位数
  if (roundWay == "舍弃尾数" && preciseDigit == 0) {
    var num = (parseInt(value * 10) / 10).toFixed(1); //小数点0位数
    if (num.indexOf(".") > -1) {
      var str = num.split(".")[1].charAt(0);
      num = Number(num) - Number(str) / 10;
    }
    return num.toFixed(0);
  }
  if (roundWay == "舍弃尾数" && preciseDigit == 1) {
    var num = (parseInt(value * 10) / 10).toFixed(1); //小数点1位数
    if (num.indexOf(".") > -1) {
      var str = num.split(".")[1].charAt(0);
      num = Number(num) - Number(str) / 10;
    }
    return num.toFixed(1);
  }
  if (roundWay == "舍弃尾数" && preciseDigit == 2) {
    var num = (parseInt(value * 100) / 100).toFixed(2); //小数点2位数
    if (num.indexOf(".") > -1) {
      var str = num.split(".")[1].charAt(1);
      num = Number(num) - Number(str) / 100;
    }
    return num.toFixed(2);
  }
  if (roundWay == "舍弃尾数" && preciseDigit == 3) {
    var num = (parseInt(value * 1000) / 1000).toFixed(3); //小数点3位数
    if (num.indexOf(".") > -1) {
      var str = num.split(".")[1].charAt(2);
      num = Number(num) - Number(str) / 1000;
    }
    return num.toFixed(3);
  }
  if (roundWay == "舍弃尾数" && preciseDigit == 4) {
    var num = (parseInt(value * 10000) / 10000).toFixed(4); //小数点4位数
    if (num.indexOf(".") > -1) {
      var str = num.split(".")[1].charAt(3);
      num = Number(num) - Number(str) / 10000;
    }
    return num.toFixed(4);
  }
  if (roundWay == "舍弃尾数" && preciseDigit == 5) {
    var num = value;
    if (String(num).indexOf(".") > -1) {
      var str = String(num).split(".")[1].charAt(0);
      num = Number(num) - Number(str) / 10;
      num = num.toFixed(0);
    }
    var lastnum = String(num).slice(-1);
    num = Number(num) - Number(lastnum);
    return num.toFixed(0);
  }
}

//获得上一年在昨天这一天的日期
export function getLastYearYestdy(date, isday) {
  var datastr;
  var strYear = date.getFullYear() - 1;
  var strDay = date.getDate();
  var strMonth = date.getMonth() + 1;
  if (strMonth < 10) {
    strMonth = "0" + strMonth;
  }
  if (strDay < 10) {
    strDay = "0" + strDay;
  }
  if (isday) {
    datastr = strYear + "-" + strMonth + "-" + strDay;
  } else {
    datastr = strYear + "-" + strMonth;
  }
  return datastr;
}
//获取当前日期格式：2020-06-16
export function getNowFormatDate() {
  var date = new Date();
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate;
  return currentdate;
}

//获得当前年月格式：2020-06
export function currDate(isday) {
  var datestr;
  var nowDate = new Date();
  var strYear = nowDate.getFullYear();
  var strDay = nowDate.getDate();
  var strMonth = nowDate.getMonth() + 1;
  if (strMonth < 10) {
    strMonth = "0" + strMonth;
  }
  if (strDay < 10) {
    strDay = "0" + strDay;
  }
  if (isday) {
    datestr = strYear + "-" + strMonth + "-" + strDay;
  } else {
    datestr = strYear + "-" + strMonth;
  }
  return datestr;
}
//获取当前月的第一天
export function getCurrMonthFirstDay() {
  var date = new Date();
  date.setDate(1);
  var strDay = date.getDate();
  var strMonth = date.getMonth() + 1;

  if (strMonth < 10) {
    strMonth = "0" + strMonth;
  }
  if (strDay < 10) {
    strDay = "0" + strDay;
  }
  var dateStart = date.getFullYear() + "-" + strMonth + "-" + strDay;
  return dateStart;
}
//获得当前日期有时分秒
export function currDateTime() {
  let date = new Date();
  let y = date.getFullYear();
  let MM = date.getMonth() + 1;
  MM = MM < 10 ? "0" + MM : MM;
  let d = date.getDate();
  d = d < 10 ? "0" + d : d;
  let h = date.getHours();
  h = h < 10 ? "0" + h : h;
  let m = date.getMinutes();
  m = m < 10 ? "0" + m : m;
  let s = date.getSeconds();
  s = s < 10 ? "0" + s : s;
  return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
}
//补零输出
export function PrefixInteger(num, length) {
  return (Array(length).join("0") + num).slice(-length);
}
/*
 * formatMoney(s,type)
 * 功能：金额按千位逗号分隔
 * 参数：s，需要格式化的金额数值.
 * 参数：type,判断格式化后的金额是否需要小数位.
 * 返回：返回格式化后的数值字符串.
 */
export function formatMoney(s, type) {
  if (/[^0-9\.]/.test(s)) return "0.00";
  if (s == null || s == "null" || s == "") return "0.00";
  s = s.toString().replace(/^(\d*)$/, "$1.");
  s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
  s = s.replace(".", ",");
  var re = /(\d)(\d{3},)/;
  while (re.test(s)) s = s.replace(re, "$1,$2");
  s = s.replace(/,(\d\d)$/, ".$1");
  if (type == 0) {
    var a = s.split(".");
    if (a[1] == "00") {
      s = a[0];
    }
  }
  return s;
}

//JS计算两日期相差年月日--包括平闰年
export function diffDate(date1, date2) {
  let begin = new Date(date1);
  let end = new Date(new Date(date2).getTime() + 86400000);

  // 如果开始时间晚于结束时间，交换日期，并记录交换状态
  let swap = false;
  if (begin > end) {
    let tmp = begin;
    begin = end;
    end = tmp;
    swap = true;
  }

  // 分别取二个日期的年、月、日值
  let d1 = begin.getDate();
  let m1 = begin.getMonth() + 1;
  let y1 = begin.getFullYear();
  let d2 = end.getDate();
  let m2 = end.getMonth() + 1;
  let y2 = end.getFullYear();

  // 获取每个月的天数，这里要注意一下闰年的2月
  var getMonthDays = function (y, m) {
    var aMonthDays = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (m == 2 && (y % 400 == 0 || (y % 4 == 0 && y % 100 != 0))) {
      return 29;
    }
    return aMonthDays[m];
  };

  let y, m, d;
  let tempD = 0;
  let tmpM = 0;
  let tmpY = 0;

  // 计算日，不足时向月份借
  if (d2 >= d1) {
    d = d2 - d1;
  } else {
    tmpM = -1;
    d = getMonthDays(y1, m1) + d2 - d1;
  }

  // 计算月，不足时向年份借
  if (m2 + tmpM >= m1) {
    m = m2 + tmpM - m1;
  } else {
    tmpY = -1;
    m = 12 + m2 + tmpM - m1;
  }

  // 计算年
  y = y2 + tmpY - y1;

  // 拼接距离字符串 输出格式如："5天"， "5月 5天"， "5年 05月 05日"
  let str = "";
  if (y > 0) {
    // console.log(d)
    if (d == 0) {
      str = y * 12 + m + "个月";
    } else {
      str = y * 12 + m + "个月" + d + "天 ";
    }
  } else if (m > 0) {
    // console.log(d)
    if (d == 0) {
      str = m + "个月";
    } else {
      str = m + "个月" + d + "天 ";
    }
  } else if (d > 0) {
    str = d + "天 ";
  }

  // 完整输出
  return str;
}

//获取当年第一天
export function getFirstDayOfYear() {
  var date = new Date();
  date.setDate(1);
  date.setMonth(0);
  var y = date.getFullYear(); //年
  var m = date.getMonth() + 1; //月
  var d = date.getDate(); //日
  if (m < 10) {
    m = "0" + m;
  }
  if (d < 10) {
    d = "0" + d;
  }
  return y + "-" + m + "-" + d;
}
