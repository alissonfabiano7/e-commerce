document.querySelectorAll(".drop-zone__input").forEach((inputElement) => {
    const dropZoneElement = inputElement.closest(".drop-zone");

    dropZoneElement.addEventListener("click", e => {
        inputElement.click();
    });

    inputElement.addEventListener("change", e => {
        if (inputElement.files.length) {
            // updateThumbnail(dropZoneElement, inputElement.files[0]);
            updateThumbnail(dropZoneElement, inputElement.files);
        }
    });

    dropZoneElement.addEventListener("dragover", e => {
        e.preventDefault();
        dropZoneElement.classList.add("drop-zone--over");
    });

    ["dragleave", "dragend"].forEach((type) => {
        dropZoneElement.addEventListener(type, (e) => {
            dropZoneElement.classList.remove("drop-zone--over");
        });
    });

    dropZoneElement.addEventListener("drop", e => {
        e.preventDefault();

        if (e.dataTransfer.files.length) {
            inputElement.files = e.dataTransfer.files;
            // updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
            updateThumbnail(dropZoneElement, e.dataTransfer.files);
        }

        dropZoneElement.classList.remove("drop-zone--over");
    });
});



var filesArray = [];
var filesListArray = [];


function updateThumbnail(dropZoneElement, file) {


    //let thumbnailElement = dropZoneElement.querySelector(".drop-zone__thumb");


    filesArray = [...file];

    filesListArray = filesArray.concat(filesListArray);

    filesListArray = Array.from(new Set(filesListArray.map(a => a.name))).map(name => {
        return filesListArray.find(a => a.name === name)
    });


    if (dropZoneElement.querySelector(".drop-zone__prompt")) {
        dropZoneElement.querySelector(".drop-zone__prompt").remove();
    }


    if (dropZoneElement.hasChildNodes()) {

        while (dropZoneElement.firstChild) {
            dropZoneElement.removeChild(dropZoneElement.firstChild);
        }

    }


    for (let element of filesListArray) {


        if (element.type.startsWith("image/")) {
            const reader = new FileReader();

            reader.readAsDataURL(element);
            reader.onload = () => {
                thumbnailElement = document.createElement("div");
                thumbnailElement.classList.add("drop-zone__thumb");
                thumbnailElement.dataset.label = element.name;
                thumbnailElement.style.backgroundImage = `url('${reader.result}')`;

                doModal(thumbnailElement);

                //doSortable();


                helperCloserSpan = document.createElement("span");
                helperCloserSpan.classList.add("close");
                helperCloserSpan.innerHTML = "&times;";


                helperCloserDiv = document.createElement("div");
                helperCloserDiv.classList.add("img-wrap");




                dropZoneElement.appendChild(helperCloserDiv);
                helperCloserDiv.appendChild(helperCloserSpan);
                helperCloserDiv.appendChild(thumbnailElement);

                //dropZoneElement.appendChild(thumbnailElement);




                makeItDeletable(helperCloserSpan);


            };
        } else {
            thumbnailElement.style.backgroundImage = null;
        }
    };

}