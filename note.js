// get current note data from local storage
let current_note_data = JSON.parse(localStorage.getItem("current_note"));

const note_title_input = document.getElementById("note-title-input");
const note_content_input = document.getElementById("note-content-input");
const back_icon = document.getElementById("back-icon");
const share_icon = document.getElementById("share-icon");
const delete_button = document.getElementById("delete-button");
const save_button = document.getElementById("save-button");
let light_mode = false;

window.addEventListener("load", function () {
    if (current_note_data == null) {
        window.location.href = "index.html";
    }
    note_title_input.value = current_note_data.note_title;
    note_content_input.value = current_note_data.note_content;
});

// back icon
back_icon.addEventListener("click", function () {
    window.location.href = "index.html";
});

delete_button.addEventListener("click", function () {
    delete_note();
});

save_button.addEventListener("click", function () {
    save_edited_note();
});

share_icon.addEventListener("click", function () {
    share_note();
});

async function delete_note() {
    const { data: { user } } = await supabase_client.auth.getUser()

    const { data, error } = await supabase_client
        .from('notes')
        .delete()
        .eq('note_title', current_note_data.note_title)
        .eq('note_content', current_note_data.note_content)
        .eq('user_id', user.id)

    window.location.href = "index.html";
}

async function save_edited_note() {
    const { data: { user } } = await supabase_client.auth.getUser()

    const { data, error } = await supabase_client
        .from('notes')
        .update({ note_title: note_title_input.value, note_content: note_content_input.value })
        .eq('note_content', current_note_data.note_content)
        .eq('note_title', current_note_data.note_title)
        .eq('user_id', user.id)

    save_button.innerText = "Saved!";
    setTimeout(function () {
        save_button.innerText = "Save";
    }, 1750);

    current_note_data.note_title = note_title_input.value;
    current_note_data.note_content = note_content_input.value;
}

function share_note() {
    if (navigator.share) {
        navigator.share({
            title: note_title_input.value,
            text: note_content_input.value,
        })
    } else {
        alert("Your browser does not support sharing.");
    }
}

document.getElementById("light-icon").addEventListener("click", function () {
    if (!light_mode) {
        note_title_input.style.backgroundColor = "#eeeeee";
        note_title_input.style.color = "#1e1b4b";
        note_content_input.style.backgroundColor = "#eeeeee";
        note_content_input.style.color = "#1e1b4b";
        light_mode = true;
    } else {
        note_title_input.style.backgroundColor = "#333560";
        note_title_input.style.color = current_accent_colour;
        note_content_input.style.backgroundColor = "#333560";
        note_content_input.style.color = current_accent_colour;
        light_mode = false;
    }
});