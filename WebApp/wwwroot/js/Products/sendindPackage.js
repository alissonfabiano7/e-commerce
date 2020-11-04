function sendPackage() {
    orderingFunction();
    //sendFile(fileList);
    sendFile(filesListArray);
}

var submitInput = document.getElementById("submit-input");

submitInput.addEventListener("click", e => {
    e.preventDefault();
    if ($('#myForm').valid()) {
        sendPackage();
    }
});
