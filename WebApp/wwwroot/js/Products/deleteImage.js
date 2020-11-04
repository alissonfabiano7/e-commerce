

function makeItDeletable(deletableElement) {



    deletableElement.addEventListener("click", e => {

        let siblingDiv = deletableElement.nextSibling;

        let siblingDivLabel = siblingDiv.dataset.label

        filesListArray = filesListArray.filter(function (obj) {
            return obj.name !== siblingDivLabel;
        });


        //fileList = filesListArray;


        //fileList = fileList.filter(function (obj) {
        //    return obj.name !== siblingDivLabel;
        //});

        let helperParent = deletableElement.closest(".img-wrap");

        helperParent.remove();

        e.stopPropagation();

    });

}