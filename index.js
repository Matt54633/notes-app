// add on click to all .icon elements
const page_title = document.getElementById("page-title");
const plus_icon = document.getElementById("plus-icon");
const settings_icon = document.getElementById("settings-icon");
const close_icon = document.getElementById("close-icon");
const settings_panel = document.getElementById("settings-panel");
const search_bar_div = document.getElementById("search-bar");
const search = document.getElementById("search-input");
const notes_list_container = document.getElementById("notes-list-container");
const notes_list = document.getElementById("notes-list");
const add_note_form = document.getElementById("add-note-form");
const note_title_input = document.getElementById("note-title-input");
const note_content_input = document.getElementById("note-content-input");
const cancel_button = document.getElementById("cancel-button");
const save_button = document.getElementById("save-button");
const delete_all_notes_button = document.getElementById("delete-all-notes-button");
const logout_button = document.getElementById("logout-button");
let number_of_notes = document.querySelectorAll(".note").length;

window.addEventListener("load", function () {
    localStorage.removeItem("current_note");
    accent_colour_picker.value = current_accent_colour;
    display_notes();
});

// settings panel controls
settings_icon.addEventListener("click", function () {
    hide_main();
});

close_icon.addEventListener("click", function () {
    hide_settings();
});

plus_icon.addEventListener("click", function () {
    display_note_form();
});

cancel_button.addEventListener("click", function () {
    hide_note_form();
});

save_button.addEventListener("click", function () {
    add_note();
});

delete_all_notes_button.addEventListener("click", function () {
    delete_all_notes();
    hide_settings();
});

logout_button.addEventListener("click", async function () {
    const { error } = await supabase_client.auth.signOut();
    window.location.href = "login.html";
});

search.addEventListener("keyup", function () {
    search_items();
});

accent_colour_picker.addEventListener("change", function () {
    get_accent_colour();

});

async function add_note() {
    if (note_title_input.value == "") {
        note_title_input.placeholder = "Please enter a title";
        return;
    } else if (note_content_input.value == "") {
        note_content_input.placeholder = "Please enter some content";
        return;
    } else if (note_title_input.value == "" && note_content_input.value == "") {
        note_title_input.placeholder = "Please enter a title";
        note_content_input.placeholder = "Please enter some content";
        return;
    }
    else {
        let note_data = [note_title_input.value, note_content_input.value];

        const { data: { user } } = await supabase_client.auth.getUser()

        const { data, error } = await supabase_client
            .from('notes')
            .insert([
                { note_title: note_data[0], note_content: note_data[1], user_id: user.id, last_edited: new Date().toISOString() },
            ])

        note_title_input.value = "";
        note_content_input.value = "";
        hide_note_form();
        display_notes();
    }
}

async function display_notes() {
    notes_list.innerHTML = "";

    // for each note, create a note
    const { data: { user } } = await supabase_client.auth.getUser()
    const { data, error } = await supabase_client.from('notes').select('*').eq('user_id', user.id).order('last_edited', { ascending: false })
    let notes = data;

    notes.forEach(function (note_data) {
        let note = document.createElement("div");
        note.classList.add("note");
        note.classList.add("bg-[#333560]");
        note.classList.add("transition");
        note.classList.add("ease-in-out");
        note.classList.add("p-2.5");
        note.classList.add("rounded-md");
        note.classList.add("hover:bg-[#3F4278]");
        note.classList.add("cursor-pointer");
        note.classList.add("drop-shadow-sm");

        note.innerHTML = `
        <h2 class="note-title text-md font-bold">${note_data.note_title}</h2>
        <p class="note-content text-sm">${note_data.note_content}</p>`;

        // add on click to note to open note
        note.addEventListener("click", function () {
            localStorage.setItem("current_note", JSON.stringify(note_data));
            window.location.href = "note.html";
        });
        notes_list.appendChild(note);
    });

    // update number of notes
    number_of_notes = document.querySelectorAll(".note").length;
    document.getElementById('number-of-notes').innerText = `${number_of_notes} note(s)`;
}

function search_items() {
    let input = search.value.toLowerCase();
    let notes = document.querySelectorAll(".note");

    notes.forEach(function (note) {
        let title = note.querySelector(".note-title").innerText.toLowerCase();
        let content = note.querySelector(".note-content").innerText.toLowerCase();

        if (title.indexOf(input) > -1 || content.indexOf(input) > -1) {
            note.style.display = "";
        } else {
            note.style.display = "none";
        }
    });

    // set no notes text to number of matching notes
    if (input != "") {
        let matching_notes = document.querySelectorAll(".note:not([style='display: none;'])").length;
        document.getElementById('number-of-notes').innerText = `${matching_notes} matching`;
    } else {
        document.getElementById('number-of-notes').innerText = `${number_of_notes} note(s)`;
    }
}

async function delete_all_notes() {
    const { data: { user } } = await supabase_client.auth.getUser()

    const { data, error } = await supabase_client
        .from('notes')
        .delete()
        .eq('user_id', user.id)

    document.getElementById('page-title').innerText = 'Notes';
    display_notes();
}

function hide_settings() {
    page_title.innerText = "Notes";
    document.querySelectorAll(".main_element").forEach(function (element) {
        element.classList.remove("hidden");
    });
    document.querySelectorAll(".settings_element").forEach(function (element) {
        element.classList.add("hidden");
    });
}

function hide_main() {
    page_title.innerText = "Settings";
    document.querySelectorAll(".main_element").forEach(function (element) {
        element.classList.add("hidden");
    });
    document.querySelectorAll(".settings_element").forEach(function (element) {
        element.classList.remove("hidden");
    });
}

function display_note_form() {
    page_title.innerText = "Add Note";
    document.querySelectorAll(".main").forEach(function (element) {
        element.classList.add("hidden");
    });
    plus_icon.classList.add("hidden");
    settings_icon.classList.add("hidden");
    add_note_form.classList.remove("hidden");
}

function hide_note_form() {
    page_title.innerText = "Notes";
    document.querySelectorAll(".main").forEach(function (element) {
        element.classList.remove("hidden");
    });
    plus_icon.classList.remove("hidden");
    settings_icon.classList.remove("hidden");
    add_note_form.classList.add("hidden");
}