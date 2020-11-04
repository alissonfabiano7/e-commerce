
var fileInput = document.querySelector(".drop-zone__input");

var fileInputArea = document.querySelector(".drop-zone");



var fileList = [];

fileInput.addEventListener("change", e => {
    

    var fileInputArray = [...fileInput.files];
    
    fileList = fileInputArray.concat(fileList);

    fileList = Array.from(new Set(fileList.map(a => a.name))).map(name => {
        return fileList.find(a => a.name === name)
    });

});

fileInputArea.addEventListener("drop", e => {
    e.preventDefault();

    var fileInputArray = [...e.dataTransfer.files];

    fileList = fileInputArray.concat(fileList);

    fileList = Array.from(new Set(fileList.map(a => a.name))).map(name => {
        return fileList.find(a => a.name === name)
    });

});