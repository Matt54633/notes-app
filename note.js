// get current note data from local storage
let current_note_data = JSON.parse(localStorage.getItem("current_note"));

const page_title = document.getElementById("page-title");
const note_content = document.getElementById("note-content");
const back_icon = document.getElementById("back-icon");
const edit_button = document.getElementById("edit-button");
const delete_button = document.getElementById("delete-button");
const edit_note_form = document.getElementById("edit-note-form");
const edit_save_button = document.getElementById("edit-save-button");
const edit_cancel_button = document.getElementById("edit-cancel-button");

page_title.innerText = current_note_data[0];
note_content.innerText = current_note_data[1];


// back icon
back_icon.addEventListener("click", function () {
    window.location.href = "index.html";
});

// edit icon
edit_button.addEventListener("click", function () {
    edit_note();
});

delete_button.addEventListener("click", function () {
    delete_note();
});

edit_cancel_button.addEventListener("click", function () {
    edit_note_form.classList.add("hidden");
    edit_button.classList.remove("hidden");
    delete_button.classList.remove("hidden");
    note_content.classList.remove("hidden");
});

edit_save_button.addEventListener("click", function () {
    save_edited_note();
});

// edit note
function edit_note() {
    edit_note_form.classList.remove("hidden");
    edit_button.classList.add("hidden");
    delete_button.classList.add("hidden");
    note_content.classList.add("hidden");

    document.getElementById("edit-note-title-input").value = current_note_data[0];
    document.getElementById("edit-note-content-input").value = current_note_data[1];
}

function delete_note() {
    let notes = JSON.parse(localStorage.getItem("notes"));
    let note = notes.find(note => note[0] == current_note_data[0] && note[1] == current_note_data[1]);
    
    // remove note from notes array
    notes.splice(notes.indexOf(note), 1);

    // save notes to local storage
    localStorage.setItem("notes", JSON.stringify(notes));

    // redirect to index.html
    window.location.href = "index.html";
}

function save_edited_note() {
    // get current note from local storage
    let notes = JSON.parse(localStorage.getItem("notes"));
    // find note matching current note both in title and content
    let note = notes.find(note => note[0] == current_note_data[0] && note[1] == current_note_data[1]);

    // update note
    note[0] = document.getElementById("edit-note-title-input").value;
    note[1] = document.getElementById("edit-note-content-input").value;

    // save note to local storage
    localStorage.setItem("notes", JSON.stringify(notes));

    // update current note data
    current_note_data = note;

    // update page title and note content
    page_title.innerText = current_note_data[0];
    note_content.innerText = current_note_data[1];

    // hide edit note form
    edit_note_form.classList.add("hidden");
    edit_button.classList.remove("hidden");
    note_content.classList.remove("hidden");
}