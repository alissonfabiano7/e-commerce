const myDropZone = document.querySelector(".drop-zone")

const hiddenDiv = document.querySelectorAll(".hidden-div");

hiddenDiv.forEach(element => {

    if (myDropZone.querySelector(".drop-zone__prompt")) {
        myDropZone.querySelector(".drop-zone__prompt").remove();
    }

    let elementArray = element.innerText.split(",");

    let fileOriginalName = elementArray[1];

    fetch(elementArray[0]).then(r => r.blob().then(helperBlob => updateThumbOnEdit(myDropZone, helperBlob, fileOriginalName)));

})




function updateThumbOnEdit(myDropZone, blob, originalName) {

    let helperFile = new File([blob], originalName, {
        type: "image/jpeg",
    });

        
        filesListArray.push(helperFile);


        let initialReader = new FileReader();

        initialReader.readAsDataURL(blob);

        initialReader.onload = () => {
        thumbnailElement = document.createElement("div");
        thumbnailElement.classList.add("drop-zone__thumb");


        thumbnailElement.dataset.label = originalName;
        thumbnailElement.style.backgroundImage = `url('${initialReader.result}')`;

        doModal(thumbnailElement);


        helperCloserSpan = document.createElement("span");
        helperCloserSpan.classList.add("close");
        helperCloserSpan.innerHTML = "&times;";


        helperCloserDiv = document.createElement("div");
        helperCloserDiv.classList.add("img-wrap");


        myDropZone.appendChild(helperCloserDiv);
        helperCloserDiv.appendChild(helperCloserSpan);
        helperCloserDiv.appendChild(thumbnailElement);


        makeItDeletable(helperCloserSpan);

    }

}