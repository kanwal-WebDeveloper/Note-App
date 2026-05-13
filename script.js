const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector("button");

// show saved notes
function showNotes() {
    const data = localStorage.getItem("notes");
    if (data) {
        notesContainer.innerHTML = data;
    }
}
showNotes();

// save notes (empty note save nahi hoga)
function updateNotes() {
    const notes = document.querySelectorAll(".input-box");
    let html = "";

    notes.forEach(note => {
        if (note.innerText.trim() !== "") {
            html += note.outerHTML;
        }
    });

    localStorage.setItem("notes", html);
}

// create note
createBtn.addEventListener("click", () => {
    let inputBox = document.createElement("p");
    let img = document.createElement("img");

    inputBox.className = "input-box";
    inputBox.setAttribute("contenteditable", "true");

    img.src = "delete.png";

    notesContainer.appendChild(inputBox).appendChild(img);
    inputBox.focus();
});

// delete note
notesContainer.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
        e.target.parentElement.remove();
        updateNotes();
    }
});

// auto save while typing
notesContainer.addEventListener("input", () => {
    updateNotes();
});
