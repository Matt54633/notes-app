// add on click to all .icon elements
const icons = document.querySelectorAll(".icon");
const plus_icon = document.getElementById("plus-icon") ? document.getElementById("plus-icon") : null;
const settings_icon = document.getElementById("settings-icon");
const close_icon = document.getElementById("close-icon");
const settings_panel = document.getElementById("settings-panel");
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
    accent_colour_picker.value = current_accent_colour;
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

// settings panel controls
settings_icon.addEventListener("click", function () {
    document.getElementById('page-title').innerText = 'Settings';
    if (plus_icon != null) {
        plus_icon.classList.add("hidden");
    }
    settings_icon.classList.add("hidden");
    main_content.classList.add("hidden");
    close_icon.classList.remove("hidden");
    settings_panel.classList.remove("hidden");
});

close_icon.addEventListener("click", function () {
    document.getElementById('page-title').innerText = 'Notes App';
    if (plus_icon != null) {
        plus_icon.classList.remove("hidden");
    }
    settings_icon.classList.remove("hidden");
    main_content.classList.remove("hidden");
    close_icon.classList.add("hidden");
    settings_panel.classList.add("hidden");
});

// accent colour picker
accent_colour_picker.addEventListener("change", function () {
    get_accent_colour();
});

function get_accent_colour() {
    document.body.classList.remove(`text-[${current_accent_colour}]`);
    document.body.classList.add(`text-[${accent_colour_picker.value}]`);
    localStorage.setItem("accent_colour", accent_colour_picker.value);
}