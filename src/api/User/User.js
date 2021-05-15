import request from "@/utils/Request";
import md5 from "js-md5"; // md5加密

// 登录
export function login(obj) {
  return request({
    url: "/login/pc.doLogin",
    method: "post",
    data: {
      account: obj.account,
      password: md5(obj.password),
    },
  });
}

// 退出
export function logout() {
  return request({
    url: "/login/logout.do",
    method: "post",
    data: {},
  });
}

// 修改密码
export function updatePassword(obj) {
  return request({
    url: "/purview/changePwd.do",
    method: "post",
    data: {
      oldPwd: md5(obj.password),
      newPwd: md5(obj.newPassword),
    },
  });
}

// 获取头部的公司和职务
export function getInfo(obj) {
  return request({
    url: "/purview/plot/user.do",
    method: "post",
    data: {
      GLCID: obj.GLCID == undefined ? "" : obj.GLCID,
      YXDID: obj.YXDID == undefined ? "" : obj.YXDID,
      dbName: obj.dbName == undefined ? "" : obj.dbName,
    },
  });
}

// 菜单栏自定义名称修改
export function CustConfigMenuApi(obj) {
  return request({
    url: "/customConfiguration/getCustomConfigurations.do",
    method: "post",
    data: {},
  });
}
// 获取页面按钮权限
// export function UserButton(obj) {
//   return request({
//     url: '/purview/plot/user.do',
//     method: 'post',
//     data: {
//       GLCID:obj.GLCID==undefined?"":obj.GLCID,
//       YXDID:obj.YXDID==undefined?"":obj.YXDID,
//       dbName:obj.dbName==undefined?"":obj.dbName,
//     }
//   })
// }
