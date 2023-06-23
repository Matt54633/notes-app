// add on click to all .icon elements
const plus_icon = document.getElementById("plus-icon");
const settings_icon = document.getElementById("settings-icon");
const close_icon = document.getElementById("close-icon");
const settings_panel = document.getElementById("settings-panel");
const search_bar_div = document.getElementById("search-bar");
const search = document.getElementById("search-input");
const notes_list_container = document.getElementById("notes-list-container");
const notes_list = document.getElementById("notes-list");
const add_note_form = document.getElementById("add-note-form");
const cancel_button = document.getElementById("cancel-button");
const save_button = document.getElementById("save-button");
let number_of_notes = document.querySelectorAll(".note").length;

window.addEventListener("load", function () {
    accent_colour_picker.value = current_accent_colour;
    document.getElementById('number-of-notes').innerText = `${number_of_notes} note(s)`;
    display_notes();
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

plus_icon.addEventListener("click", function () {
    search_bar_div.classList.add("hidden");
    notes_list_container.classList.add("hidden");
    plus_icon.classList.add("hidden");
    add_note_form.classList.remove("hidden");
});

cancel_button.addEventListener("click", function () {
    search_bar_div.classList.remove("hidden");
    notes_list_container.classList.remove("hidden");
    plus_icon.classList.remove("hidden");
    add_note_form.classList.add("hidden");
}
);

save_button.addEventListener("click", function () {
    add_note();
});

// search
search.addEventListener("keyup", function () {
    search_items();
});

// accent colour picker
accent_colour_picker.addEventListener("change", function () {
    get_accent_colour();
});

function add_note() {
    if (document.getElementById("note-title-input").value == "") {
        document.getElementById("note-title-input").placeholder = "Please enter a title";
        return;
    } else if (document.getElementById("note-content-input").value == "") {
        document.getElementById("note-content-input").placeholder = "Please enter some content";
        return;
    } else if (document.getElementById("note-title-input").value == "" && document.getElementById("note-content-input").value == "") {
        document.getElementById("note-title-input").placeholder = "Please enter a title";
        document.getElementById("note-content-input").placeholder = "Please enter some content";
        return;
    }
    else {
        let note_data = [document.getElementById("note-title-input").value, document.getElementById("note-content-input").value];

        // save note to local storage
        let notes = JSON.parse(localStorage.getItem("notes"));
        if (notes == null) {
            notes = [];
        }
        notes.push(note_data);
        localStorage.setItem("notes", JSON.stringify(notes));

        add_note_form.classList.add("hidden");
        search_bar_div.classList.remove("hidden");
        notes_list_container.classList.remove("hidden");
        plus_icon.classList.remove("hidden");

        display_notes();
    }
}

function display_notes() {
    // clear notes list
    notes_list.innerHTML = "";

    // for each note in local storage, create a note
    let notes = JSON.parse(localStorage.getItem("notes"));
    if (notes == null) {
        notes = [];
    }
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
        <h2 class="note-title text-md font-bold">${note_data[0]}</h2>
        <p class="note-content text-sm">${note_data[1]}</p>`;

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
        document.getElementById('number-of-notes').innerText = `${matching_notes} note(s) matching`;
    } else {
        document.getElementById('number-of-notes').innerText = `${number_of_notes} note(s)`;
    }
}