// Header & navigation functionality – cPanel safe
document.addEventListener('DOMContentLoaded', () => {

    const ui = {
        mobileBtn: document.getElementById('mobile-menu-btn'),
        mainNav: document.getElementById('main-nav'),
        searchBar: document.getElementById('search-bar')
    };

    /* ---------------- NOTIFICATION ---------------- */

    function notify(message, type = 'info') {
        const old = document.querySelector('.data-notification');
        if (old) old.remove();

        const note = document.createElement('div');
        note.className = `data-notification ${type}`;
        note.textContent = message;

        document.body.appendChild(note);
        setTimeout(() => note.remove(), 3000);
    }

    /* ---------------- MOBILE MENU ---------------- */

    if (ui.mobileBtn && ui.mainNav && ui.searchBar) {
        ui.mobileBtn.addEventListener('click', () => {
            ui.mainNav.classList.toggle('active');
            ui.searchBar.classList.toggle('active');
            ui.mobileBtn.classList.toggle('open');

            ui.mobileBtn.setAttribute(
                'aria-label',
                ui.mainNav.classList.contains('active')
                    ? 'Close menu'
                    : 'Open menu'
            );
        });
    }

    /* ---------------- ACTIVE NAV LINK ---------------- */

    const currentPage =
        window.location.pathname.split('/').pop() || 'index.html';

    document
        .querySelectorAll('.main-nav a')
        .forEach(link => {
            const target = link.getAttribute('href');
            link.classList.toggle(
                'active',
                target === currentPage || target === './'
            );
        });

    /* ---------------- NEWSLETTER ---------------- */

    document
        .querySelectorAll('.newsletter-form')
        .forEach(form => {
            form.addEventListener('submit', e => {
                e.preventDefault();

                const input = form.querySelector('input[type="email"]');
                if (!input || !input.value.trim()) {
                    notify('Please enter a valid email address.', 'error');
                    return;
                }

                input.value = '';
                notify('Thank you for subscribing!', 'success');
            });
        });

    /* ---------------- SEARCH ---------------- */

    document
        .querySelectorAll('.search-bar')
        .forEach(bar => {
            const input = bar.querySelector('input');
            const button = bar.querySelector('button');

            if (!input || !button) return;

            const runSearch = () => {
                const term = input.value.trim();
                if (!term) return;
                notify(`Searching for "${term}"`);
                input.value = '';
            };

            button.addEventListener('click', runSearch);
            input.addEventListener('keydown', e => {
                if (e.key === 'Enter') runSearch();
            });
        });
});
