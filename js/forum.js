// Forum functionality – cPanel safe version
document.addEventListener('DOMContentLoaded', () => {

    const ui = {
        newPostBtn: document.getElementById('new-post-btn'),
        newPostForm: document.getElementById('new-post-form'),
        cancelPostBtn: document.getElementById('cancel-post'),
        postForm: document.getElementById('post-form'),
        notificationArea: document.body
    };

    const selectedTags = new Set();

    /* ---------------- NOTIFICATION ---------------- */

    function notify(message) {
        const existing = document.querySelector('.data-notification');
        if (existing) existing.remove();

        const note = document.createElement('div');
        note.className = 'data-notification info';
        note.textContent = message;

        ui.notificationArea.appendChild(note);

        setTimeout(() => note.remove(), 3000);
    }

    /* ---------------- FORM TOGGLE ---------------- */

    if (ui.newPostBtn && ui.newPostForm && ui.cancelPostBtn) {

        ui.newPostBtn.addEventListener('click', () => {
            ui.newPostForm.classList.add('active');
            ui.newPostBtn.classList.add('hidden');
            ui.newPostForm.scrollIntoView({ behavior: 'smooth' });
        });

        ui.cancelPostBtn.addEventListener('click', () => {
            ui.newPostForm.classList.remove('active');
            ui.newPostBtn.classList.remove('hidden');
        });
    }

    /* ---------------- TAG SELECTION ---------------- */

    document.querySelectorAll('.category-tag[data-tag]')
        .forEach(tag => {
            tag.addEventListener('click', () => {
                const value = tag.dataset.tag;

                if (selectedTags.has(value)) {
                    selectedTags.delete(value);
                    tag.classList.remove('active');
                } else {
                    selectedTags.add(value);
                    tag.classList.add('active');
                }
            });
        });

    /* ---------------- FORM SUBMIT ---------------- */

    if (ui.postForm) {
        ui.postForm.addEventListener('submit', e => {
            e.preventDefault();

            ui.postForm.reset();
            selectedTags.clear();

            document
                .querySelectorAll('.category-tag.active')
                .forEach(t => t.classList.remove('active'));

            ui.newPostForm.classList.remove('active');
            if (ui.newPostBtn) ui.newPostBtn.classList.remove('hidden');

            notify('Your post has been submitted for moderation.');
        });
    }

    /* ---------------- CATEGORY CARDS ---------------- */

    document.querySelectorAll('.category-card')
        .forEach(card => {
            card.addEventListener('click', () => {
                notify('Category filter coming soon.');
            });
        });

    /* ---------------- POST ACTIONS (delegated) ---------------- */

    document.addEventListener('click', event => {
        const btn = event.target.closest('[data-post-action]');
        if (!btn) return;

        const action = btn.dataset.postAction;
        const postId = btn.dataset.postId;

        if (action && postId) {
            notify(`Action "${action}" triggered for post ${postId}.`);
        }
    });
});
