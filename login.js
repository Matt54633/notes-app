const login_button = document.getElementById("login-button");
const email_input = document.getElementById("email-input");
const password_input = document.getElementById("password-input");
const sign_up_text = document.getElementById("signup-text");
const sign_up_link = document.getElementById("signup-link");
const sign_up_button = document.getElementById("signup-button");
const cancel_button = document.getElementById("cancel-button");

sign_up_link.addEventListener("click", function () {
    login_button.classList.add("hidden");
    sign_up_text.classList.add("hidden");
    sign_up_link.classList.add("hidden");
    sign_up_button.classList.remove("hidden");
    cancel_button.classList.remove("hidden");
});

cancel_button.addEventListener("click", function () {
    login_button.classList.remove("hidden");
    sign_up_text.classList.remove("hidden");
    sign_up_link.classList.remove("hidden");
    sign_up_button.classList.add("hidden");
    cancel_button.classList.add("hidden");
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
        login_button.classList.remove("hidden");
        sign_up_text.classList.remove("hidden");
        sign_up_link.classList.remove("hidden");
        sign_up_button.classList.add("hidden");
        cancel_button.classList.add("hidden");
        alert("Please check your email for a verification link.");
    }
}