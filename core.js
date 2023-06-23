// add on click to all .icon elements
const icons = document.querySelectorAll(".icon");

const main_content = document.getElementById("main-content");
const accent_colour_picker = document.getElementById("accent-colour");
let current_accent_colour = "";

window.addEventListener("load", function () {
    if (localStorage.getItem("accent_colour") == null) {
        localStorage.setItem("accent_colour", "#eeeeee");
        document.body.classList.add(`text-[#eeeeee]`);
    } else {
        document.body.classList.add(`text-[${localStorage.getItem("accent_colour")}]`);
    }
    // get current accent colour
    current_accent_colour = localStorage.getItem("accent_colour");
});

// icons interation
icons.forEach(function (icon) {
    icon.addEventListener("mousedown", function () {
        icon.style.transform = "scale(0.9)";
    });

    icon.addEventListener("mouseup", function () {
        icon.style.transform = "scale(1)";
    });

    icon.addEventListener("touchstart", function () {
        icon.style.transform = "scale(0.9)";
    });

    icon.addEventListener("touchend", function () {
        icon.style.transform = "scale(1)";
    });
});


function get_accent_colour() {
    document.body.classList.remove(`text-[${current_accent_colour}]`);
    document.body.classList.add(`text-[${accent_colour_picker.value}]`);
    localStorage.setItem("accent_colour", accent_colour_picker.value);
}