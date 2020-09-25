import localRouter from './localRouter'
export function filterRouter(roles) {
    //console.log("*************************************")
    //console.log("*************************************")
    //console.log("*************************************")

    //console.log('localRouter', localRouter.OperationRouter)
    //console.log('roles :', roles);

    // var temp = JSON.stringify(this.router);
    var router = JSON.parse(JSON.stringify(localRouter.OperationRouter));
    //console.log(roles.length);
    //console.log(router.length);
    var routerList = [];
    for (let i = 0; i < roles.length; i++) {
        for (let j = 1; j < router.length; j++) {
            if (roles[i].managementName == router[j].name) {
                routerList.push(router[j]);
            }
        }
    }
    //console.log(JSON.stringify(routerList));
    // 去重
    routerList = routerList.filter(function (element, index, self) {
        return self.indexOf(element) === index;
    });
    //过滤后获得   管理权限
    //console.log("routerList", JSON.stringify(routerList));
    var luyou = JSON.stringify(routerList);
    //console.log("路由数据", JSON.parse(luyou));
    // 先取出mark
    var arrMark = [];
    for (let i = 0; i < roles.length; i++) {
        for (let j = 0; j < roles[i].rolesList.length; j++) {
            arrMark.push(roles[i].rolesList[j].mark);
        }
    }
    // 去重
    arrMark = arrMark.filter(function (element, index, self) {
        return self.indexOf(element) === index;
    });
    //console.log(arrMark);
    // 先把云端数据改为0  避免所有数据都为1
    for (let i = 0; i < routerList.length; i++) {
        for (let j = 0; j < routerList[i].children.length; j++) {
            //console.log(routerList[i].children[j].meta.title);
            //console.log(routerList[i].children[j].meta.pickid);
            routerList[i].children[j].meta.pickid = 0;
        }
    }
    for (let i = 0; i < arrMark.length; i++) {
        for (let j = 0; j < routerList.length; j++) {
            for (let k = routerList[j].children.length - 1; k >= 0; k--) {
                if (arrMark[i] == routerList[j].children[k].meta.mark) {
                    //console.log("相等", routerList[j].children[k].meta.mark);
                    routerList[j].children[k].meta.pickid = 1;
                    //console.log(routerList[j].children[k].meta.title);
                    //console.log(routerList[j].children[k].meta.pickid);
                } else {
                    // //console.log("不等", routerList[j].children[k].meta.mark);
                    // //console.log(routerList[j].children[k].meta.pickid);
                }
            }
        }
    }

    // //console.log("12421412412412421412", routerList);
    for (let i = 0; i < routerList.length; i++) {
        for (let j = routerList[i].children.length - 1; j >= 0; j--) {
            //console.log(routerList[i].children[j].meta.pickid);
            if (routerList[i].children[j].meta.pickid != 1) {
                //console.log(routerList[i].children[j]);
                routerList[i].children.splice(j, 1);
            }
        }
    }
    //console.log(routerList);
    // 整理路由表第一项，默认路由
    for (let i = 0; i < routerList.length; i++) {
        routerList[i].redirect =
            "/" + routerList[i].name + "/" + routerList[i].children[0].name;
    }
    routerList.unshift({
        path: "/",
        component: "Layout",
        redirect: routerList[0].redirect
    });
    for (let i = 1; i < routerList.length; i++) {
        if (routerList[i].meta.title == '系统管理') {
            for (let n = 0; n < routerList[i].children.length; n++) {
                if (routerList[i].children[n].meta.title == '数据统计') {
                    routerList[0].redirect = "/" + routerList[i].name + "/" + routerList[i].children[n].name
                }
            }
        }
    }
    console.log("*************************************")
    console.log('routerList', routerList)
    console.log("*************************************")

    //console.log("*************************************")

    return routerList
}
