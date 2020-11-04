function previewImages() {

    let i = 0;
    let aux = document.getElementById("preview");

    if (aux.hasChildNodes()) {

    while (aux.firstChild) {
        aux.removeChild(aux.firstChild);
        }

    }


    if (this.files) {
        [].forEach.call(this.files, readAndPreview);
    }

    function readAndPreview(file) {

        if (!/\.(jpe?g|png|gif)$/i.test(file.name)) {
            return alert(file.name + " is not an image");
        } 

        
        var reader = new FileReader();

        reader.addEventListener("load", function () {
            var image = new Image();
            image.title = file.name;
            image.src = this.result;
            //image.className = "draggable";
            ////image.className += " valid";
            //image.draggable = true;
            ////image.name = "Image.Auxiliary";
            ////image.id = "Image_Auxiliary";
            aux.appendChild(image);
            //draggableImages();
            //////draggable.js dependent of previewImage.js
            ////let script = document.createElement('script');
            ////script.src = '/js/draggable.js';
            ////aux.appendChild(script);

            doSortable();

        });

        reader.readAsDataURL(file);
    }

}


document.getElementById('file-input').addEventListener("change", previewImages);