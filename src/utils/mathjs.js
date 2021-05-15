const math = {
  add(arg1, arg2) {
    //加
    var r1, r2, m, n;
    try {
      r1 = arg1.toString().split(".")[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split(".")[1].length;
    } catch (e) {
      r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    n = r1 >= r2 ? r1 : r2;
    return ((arg1 * m + arg2 * m) / m).toFixed(n);
  },
  subtract(arg1, arg2) {
    //减
    var re1, re2, m, n;
    try {
      re1 = arg1.toString().split(".")[1].length;
    } catch (e) {
      re1 = 0;
    }
    try {
      re2 = arg2.toString().split(".")[1].length;
    } catch (e) {
      re2 = 0;
    }
    m = Math.pow(10, Math.max(re1, re2));
    n = re1 >= re2 ? re1 : re2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
  },
  multiply(arg1, arg2) {
    //乘
    var m = 0;
    var s1 = arg1.toString();
    var s2 = arg2.toString();
    try {
      m += s1.split(".")[1].length;
    } catch (e) {}
    try {
      m += s2.split(".")[1].length;
    } catch (e) {}

    return (
      (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
      Math.pow(10, m)
    );
  },
  divide(arg1, arg2) {
    //除
    var t1 = 0,
      t2 = 0,
      r1,
      r2;
    try {
      t1 = arg1.toString().split(".")[1].length;
    } catch (e) {}
    try {
      t2 = arg2.toString().split(".")[1].length;
    } catch (e) {}
    r1 = Number(arg1.toString().replace(".", ""));
    r2 = Number(arg2.toString().replace(".", ""));
    //获取小数点后的计算值
    var result = ((r1 / r2) * Math.pow(10, t2 - t1)).toString();
    var result2 = result.split(".")[1];
    result2 = result2.substring(
      0,
      digit > result2.length ? result2.length : digit
    );

    return Number(result.split(".")[0] + "." + result2);
  },
};
export default math;
