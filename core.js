// connect to the supabase client
const supabase_client = supabase.createClient(
    'https://wlinnyhmaumccpyfbbqq.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsaW5ueWhtYXVtY2NweWZiYnFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc2Mzk0MjcsImV4cCI6MjAwMzIxNTQyN30.TMW4DTeEwC7E7IPqd30YZ4vRTpMV3JWjPEsiqOAlNog'
);

// add on click to all .icon elements
const icons = document.querySelectorAll(".icon");
const main_content = document.getElementById("main-content");
const accent_colour_picker = document.getElementById("accent-colour");
let current_accent_colour = "";

window.addEventListener("load", async function () {
    if (localStorage.getItem("accent_colour") == null) {
        localStorage.setItem("accent_colour", "#eeeeee");
        document.body.classList.add(`text-[#eeeeee]`);
    } else {
        document.body.classList.add(`text-[${localStorage.getItem("accent_colour")}]`);
    }
    // get current accent colour
    current_accent_colour = localStorage.getItem("accent_colour");
    if (window.location.href.includes("index.html")) {
        accent_colour_picker.value = current_accent_colour;
    }

    // get current user
    if (!window.location.href.includes("login.html")) {
        const { data: { user } } = await supabase_client.auth.getUser();

        if (!user) {
            if (!window.location.href.includes("login.html")) {
                window.location.href = "login.html";
            }
        }
    }
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