const login_button = document.getElementById("login-button");
const email_input = document.getElementById("email-input");
const password_input = document.getElementById("password-input");
const sign_up_text = document.getElementById("signup-text");
const login_text = document.getElementById("login-text");
const sign_up_button = document.getElementById("signup-button");

sign_up_text.addEventListener("click", function () {
    hide_login();
});

login_text.addEventListener("click", function () {
    hide_signup();
});

login_button.addEventListener("click", function () {
    login();
});

sign_up_button.addEventListener("click", function () {
    signup();
});

async function login() {
    const { data, error } = await supabase_client.auth.signInWithPassword({
        email: email_input.value,
        password: password_input.value,
    });
    if (error) {
        alert(error.message);
    } else {
        window.location.href = "index.html";
    }
};

async function signup() {
    const { data, error } = await supabase_client.auth.signUp({
        email: email_input.value,
        password: password_input.value,
    });

    if (error) {
        alert(error.message);
    } else {
        hide_signup();
        alert("Please check your email for a verification link.");
    }
}

function hide_login() {
    document.querySelectorAll(".signup_element").forEach(function (element) {
        element.classList.remove("hidden");
    });
    document.querySelectorAll(".login_element").forEach(function (element) {
        element.classList.add("hidden");
    });
}

function hide_signup() {
    document.querySelectorAll(".signup_element").forEach(function (element) {
        element.classList.add("hidden");
    });
    document.querySelectorAll(".login_element").forEach(function (element) {
        element.classList.remove("hidden");
    });
}