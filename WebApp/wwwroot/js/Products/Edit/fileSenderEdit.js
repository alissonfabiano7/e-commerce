function sendFile(listOfFiles) {
    var formElement = document.getElementById("myForm");
    var formData = new FormData(formElement);
    var request = new XMLHttpRequest();
    request.open("POST", "Edit");
    listOfFiles.forEach(file => {

        formData.append("Image.ImageFile", file, file.name);
        //formData.append("userpic", file, file.name);

    })
    request.send(formData);

    let serverUrl = window.location.href;
    serverUrl = serverUrl.split("/Edit")
    serverUrl = serverUrl[0]

    request.onloadend = () => window.location = serverUrl;
}