import axios from 'axios'
import Cookies from "js-cookie";
var instance1 = axios.create();
if (process.env.NODE_ENV == "development") {
  // axios.defaults.baseURL = "http://172.16.1.200:8989/qrhealth"; //生产开发环境
  // axios.defaults.baseURL = 'https://qrhealth.ihaozhuo.com/qrhealth'//生产开发环境
  instance1.defaults.baseURL = "https://whiot.ihaozhuo.com"; //武汉开发环境
  // instance1.defaults.baseURL = "https://mnyuyue.ihaozhuo.com";//杭州测试环境
} else if (process.env.NODE_ENV == "debug") {
  instance1.defaults.baseURL = "";
} else if (process.env.NODE_ENV == "production") {
  // axios.defaults.baseURL = "https://qrhealth.ihaozhuo.com/qrhealth";//生产开发环境
  instance1.defaults.baseURL = "https://whiot.ihaozhuo.com"; //武汉开发环境
  // instance1.defaults.baseURL = "https://mnyuyue.ihaozhuo.com"; //杭州测试 环境
}
// instance1.defaults.headers['Content-Type'] = 'application/json'
//过滤请求(请求前拦截设置)
// instance1.interceptors.request.use((config) => {
//     //config 为请求的一些配置 例如：请求头 请求时间 Token
//     // config.timeout = 10 * 1000; //请求响应时间
//     // const token = getToken();
//     // token && (config.headers.token = token);
//     // return config;
// }, error => {
//     return Promise.reject(error);
// });
// 获取Token
function getToken() {
  // console.log(Cookies.get("token"));
  if (Cookies.get("token")) {
    // console.log("有token");
    return Cookies.get("token");
  } else {
    console.log("没有token");
    return "";
  }
}

// 响应拦截
instance1.interceptors.response.use(
  response => {
    //响应拦截 code 400 500 ...
    console.log(response);
    if (response.status === 200) {
      return Promise.resolve(response.data);

    } else {
      return Promise.reject(response.data);
    }
  },
  error => {
    console.log(error);
    //     if (error && error.response) {
    //         let res = {};
    //         res.code = error.response.status;
    //         res.msg = throwErr(error.response.status, error.response); //throwErr 捕捉服务端的http状态码 定义在utils工具类的方法
    //         return Promise.reject(res);
    //     }
    return Promise.reject(error);
  }
);

export function post(url, data, cid, PackageCode) {
  console.log(url, data)
  var headers = {}
  if (PackageCode) {
    headers = {
      'companyId': cid,
      'PackageCode': PackageCode
    }
  } else {
    headers = {
      'companyId': cid
    }
  }
  return new Promise((resolve, reject) => {
    instance1({
      method: 'post',
      url: url,
      data: data,
      headers: headers,
    }).then(res => {
      console.log(res);
      resolve(res);
    }).catch(error => {
      console.log(error);
      reject(error);
    })
  });
}
export function get(url, data, cid, PackageCode) {
  console.log(url, data)
  var headers = {}
  if (PackageCode) {
    headers = {
      'companyId': cid,
      'PackageCode': PackageCode
    }
  } else {
    headers = {
      'companyId': cid
    }
  }
  return new Promise((resolve, reject) => {
    instance1({
      method: 'get',
      url: url,
      params: data,
      headers: headers
    }).then(res => {
      console.log(res);
      resolve(res);
    }).catch(error => {
      console.log(error);
      reject(error);
    })
  });
}
export default {
  get,
  post
}
