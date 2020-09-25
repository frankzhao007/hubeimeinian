import axios from "axios"; // 引入axios
var instance = axios.create();

// axios.defaults.baseURL = "https://whiot.ihaozhuo.com/qrhealth";
export function maidian(bhvType, userId, actObj, objType, traceId) {
    console.log("埋点的数据", bhvType, userId, actObj, objType);
    var params = {
        bhvType: bhvType,
        userId: userId,
        actObj: actObj,
        objType: objType,
        traceId: traceId
    }
    return new Promise((resolve, reject) => {
        instance
            .post("https://qrhealth.ihaozhuo.com/buriedpoint/bisys/bi/userBehavior", params, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => {
                console.log("埋点res", res);
                resolve(res);
            })
            .catch(err => {
                console.log("埋点err", err);
                reject(err);
            });
    });
}
export default {
    maidian
};