function orderingFunction() {

    let helperDiv = document.getElementById("helper-div");
    helperDiv.setAttribute("hidden", true);

    if (helperDiv.hasChildNodes()) {

        while (helperDiv.firstChild) {
            helperDiv.removeChild(helperDiv.firstChild);
        }

    }

    ordering = document.querySelectorAll(".drop-zone__thumb")
    ordering.forEach(element => {
        var input = document.createElement("input");
        input.setAttribute("value", element.dataset.label);
        input.setAttribute("name", "Image.Auxiliary");
        input.setAttribute("id", "Image_Auxiliary");
        //input.setAttribute("name", "userPicOrder");
        //input.setAttribute("id", "user_pic_order");
        helperDiv.appendChild(input);
    })

}
