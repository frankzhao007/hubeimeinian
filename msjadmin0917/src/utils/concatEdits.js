import { filterOperation } from './filterOperation';


export function concatEdits(Edits) {
    console.log("//////**********************");
    var Operation = JSON.parse(JSON.stringify(filterOperation()))
    var EditsData = JSON.parse(JSON.stringify(Edits))
    console.log('Operation', Operation)
    console.log('EditsData', EditsData)
    var result = [];
    for (var i = 0; i < Operation.length; i++) {
        var obj = Operation[i];
        var num = obj.listName;
        var isExist = false;
        for (var j = 0; j < EditsData.length; j++) {
            var aj = EditsData[j];
            var n = aj.listName;
            if (n == num) {
                isExist = true;
                break;
            }
        }
        if (!isExist) {
            result.push(obj);
        }
    }
    console.log('result', result)
    EditsData = EditsData.concat(result)
    console.log('EditsData', EditsData)
    // 原来的数组
    // var array = ["one", "two", "four"];
    // // splice(position, numberOfItemsToRemove, item)
    // // 拼接函数(索引位置, 要删除元素的数量, 元素)
    // EditsData = EditsData.splice(1, 0, result); // 
    // array; // 现在数组是这个样子 ["one", "two", "three", "four"]
    return EditsData
}