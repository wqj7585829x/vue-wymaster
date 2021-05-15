/**
 * Created by jiachenpan on 16/11/18.
 */

export function isvalidUsername(str) {
  const valid_map = ["admin", "editor"];
  return valid_map.indexOf(str.trim()) >= 0;
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return urlregex.test(textval);
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/;
  return reg.test(str);
}

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
}
/* 身份证18位*/
export function validateidentitycard(str) {
  const reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  return reg.test(str);
}
/* 手机号码*/
export function validatePhone(str) {
  const reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
  return reg.test(str);
}
/* 固定电话*/
export function validatefixedPhone(str) {
  const reg = /^0\d{2,3}-?\d{7,8}$/;
  return reg.test(str);
}
/* 数值类型 */
export function validatenumber(str) {
  const reg = /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/;
  return reg.test(str);
}
/* 纯数字 */
export function validateonlynumber(str) {
  const reg = /^[0-9]*$/;
  return reg.test(str);
}
/* 纯数字或者小数*/
export function validateonlynumberpoint(str) {
  const reg = /^[0-9][0-9]*([.][0-9]{1,2})?$/;
  return reg.test(str);
}

/* 证件号（字母加数字） */
export function validatecredentialno(str) {
  const reg = /^[A-Za-z0-9]+$/;
  return reg.test(str);
}
/* 电子邮件 */
export function validatemail(str) {
  const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  return reg.test(str);
}
/* 正负数 */
export function validatebothnumber(str) {
  const reg = /^(-)?[1-9][0-9]*$/;
  return reg.test(str);
}
/* 车牌号 */
export function validatecarno(str) {
  const reg = /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/;
  return reg.test(str);
}

//-------------全局引用函数---------//
//纯数字全局引用
export function onlynumber(rule, value, callback) {
  if (value == "" || value == null) {
    callback();
  } else {
    if (!validateonlynumber(value)) {
      callback(new Error("只能输入纯数字"));
    } else {
      callback();
    }
  }
}
//数字或者小数点全局引用
export function onlynumberpoint(rule, value, callback) {
  if (value == "" || value == null) {
    callback();
  } else {
    if (!validateonlynumberpoint(value)) {
      callback(new Error("只能输入纯数字或者两位小数"));
    } else {
      callback();
    }
  }
}
//手机验证全局引用必填
export function onlyphone(rule, value, callback) {
  if (!validatePhone(value)) {
    callback(new Error("手机格式错误"));
  } else {
    callback();
  }
}
//手机验证全局引用非必填
export function onlyphonenomust(rule, value, callback) {
  if (value == "" || value == null) {
    callback();
  } else {
    if (!validatePhone(value)) {
      callback(new Error("手机格式错误"));
    } else {
      callback();
    }
  }
}
//电子邮件全局引用
export function onlymailbox(rule, value, callback) {
  if (value == "" || value == null) {
    callback();
  } else {
    if (!validatemail(value)) {
      callback(new Error("电子邮箱格式错误"));
    } else {
      callback();
    }
  }
}
//固定电话全局引用
export function onlyhomePhone(rule, value, callback) {
  if (value == "" || value == null) {
    callback();
  } else {
    if (!validatefixedPhone(value)) {
      callback(new Error("家庭电话格式错误"));
    } else {
      callback();
    }
  }
}

//身份证验证全局引用
export function onlyidentitycard(rule, value, callback) {
  if (value == "" || value == null) {
    callback();
  } else {
    if (!validateidentitycard(value)) {
      callback(new Error("身份证号格式错误"));
    } else {
      callback();
    }
  }
}
//数值类型
export function number(rule, value, callback) {
  if (value == "" || value == null) {
    callback();
  } else {
    if (!validatenumber(value)) {
      callback(new Error("只能输入数字"));
    } else {
      callback();
    }
  }
}
//电话判断数字
export function phonenumber(rule, value, callback) {
  if (value == "" || value == null) {
    callback();
  } else {
    if (!validateonlynumber(value)) {
      callback(new Error("电话格式错误"));
    } else {
      callback();
    }
  }
}
// 正负数
export function positiveAndNegativeNumber(rule, value, callback) {
  if (value == "" || value == null) {
    callback();
  } else {
    if (!validatebothnumber(value)) {
      callback(new Error("只能输入正负数"));
    } else {
      callback();
    }
  }
}

// 车牌号
export function carno(rule, value, callback) {
  if (value == "" || value == null) {
    callback();
  } else {
    if (!validatecarno(value)) {
      callback(new Error("车牌号合适错误"));
    } else {
      callback();
    }
  }
}
