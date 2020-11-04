var modal = document.getElementById("myModal");
var modalImg = document.getElementById("modal-image");
var captionText = document.getElementById("caption");

function doModal(imageToModal) {

    imageToModal.addEventListener("click", e => {

        modal.style.display = "block";
        let strHelper = e.currentTarget.style.backgroundImage;
        strHelper = strHelper.replace('url("', '');
        strHelper = strHelper.replace('")', '');
        modalImg.src = strHelper;
        captionText.innerHTML = e.currentTarget.dataset.label;
        e.stopPropagation();

    });

    modal.addEventListener("click", () => modal.style.display = "none");

}