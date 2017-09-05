var fs = require("fs");

var jsonFile = require("jsonfile");
var writePathString = "./words-right-list.json";
var errorPathString = "./words-wrong-list.json";
var pathString = "../words-from-the-heart";
var json_detail_right = "./words-right.js";
var json_detail_wrong = "./words-wrong.js";
//写一个筛选掉.json之外的文件或文件夹的function
function checkJSON(files){
    var onlyJson = [];
    for(var i=0;i<files.length;i++){
        var pattern = /.*\.json/;
        var string = files[i];
        if (pattern.test(string)){
            onlyJson.push(files[i]);
        }
    } 
    return onlyJson;
}

function readcallback(err,files) {
    if (err) {
        console.log('读取失败');
        return;
    } 
    
    if(files.length > 0) {
        var jsonFiles = checkJSON(files);
        console.log('读取成功');
        
        var jsonList = [];
        var errorFiles = [];
        var json_file =[];
        var json_wrong_file = [];
        for (var i = 0; i < jsonFiles.length; i++) {
          try {
            // 读取json文件
            var path = pathString +"/"+ jsonFiles[i];
            var content = jsonFile.readFileSync(path);
            
            jsonList.push(jsonFiles[i]);
            json_file.push(content);
          } catch (err) {
            // 如果读取错误就把错误的文件名写入到errorFiles数组内
            errorFiles.push(jsonFiles[i]);
            json_wrong_file.push(content);
          }
        }
    jsonFile.writeFileSync(writePathString, jsonList);
    jsonFile.writeFileSync(errorPathString, errorFiles);
    jsonFile.writeFileSync(json_detail_right,json_file);
    jsonFile.writeFileSync(json_detail_wrong,json_wrong_file);
    }
}


fs.readdir(pathString,readcallback);

//问题来了。如何做到循环读取“心里话”下的json文件。
//先调试下jsonFile.readFile()和jsonFile.writeFile()
