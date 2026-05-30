const notesArea = document.getElementById('notesArea');
const createBtn = document.getElementById('createBtn');

function getTimestamp() {
    const now = new Date();
    return now.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        + ' • ' +
        now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

function saveNotes() {
    const cards = notesArea.querySelectorAll('.note-card');
    const notes = [];
    cards.forEach(card => {
        notes.push({
            id: card.dataset.id,
            title: card.querySelector('.note-title-input').value,
            date: card.querySelector('.note-date span').textContent,
            content: card.querySelector('.note-input').value
        });
    });
    localStorage.setItem('notes_app_data', JSON.stringify(notes));
}

function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

function renderNote(id, title, date, content) {
    const empty = notesArea.querySelector('.empty-state');
    if (empty) empty.remove();

    const card = document.createElement('div');
    card.className = 'note-card';
    card.dataset.id = id;
    card.innerHTML = `
        <div class="note-header">
            <div class="note-meta">
                <input class="note-title-input" value="${title}" placeholder="Note title" />
                <div class="note-date">
                    <i class="ti ti-calendar"></i>
                    <span>${date}</span>
                </div>
            </div>
            <div class="note-actions">
                <button title="Delete" class="del-btn"><i class="ti ti-trash"></i></button>
            </div>
        </div>
        <div class="note-divider"></div>
        <textarea class="note-input" placeholder="Start typing your note...">${content}</textarea>
    `;

    card.querySelector('.del-btn').addEventListener('click', () => {
        card.remove();
        if (!notesArea.querySelectorAll('.note-card').length) {
            notesArea.innerHTML = '<p class="empty-state">No notes yet. Click "Create Note" to get started.</p>';
        }
        saveNotes();
    });

    card.querySelector('.note-title-input').addEventListener('input', saveNotes);

    const textarea = card.querySelector('.note-input');
    textarea.addEventListener('input', () => {
        autoResize(textarea);
        saveNotes();
    });

    notesArea.appendChild(card);
    setTimeout(() => autoResize(textarea), 0);
}

function loadNotes() {
    const saved = localStorage.getItem('notes_app_data');
    if (saved) {
        const notes = JSON.parse(saved);
        notes.forEach(n => renderNote(n.id, n.title, n.date, n.content));
    }
    if (!notesArea.querySelectorAll('.note-card').length) {
        notesArea.innerHTML = '<p class="empty-state">No notes yet. Click "Create Note" to get started.</p>';
    }
}

createBtn.addEventListener('click', () => {
    const id = Date.now().toString();
    renderNote(id, 'My Note', getTimestamp(), '');
    saveNotes();
    const cards = notesArea.querySelectorAll('.note-card');
    cards[cards.length - 1].querySelector('.note-input').focus();
});

loadNotes();
