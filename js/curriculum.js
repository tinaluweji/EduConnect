 // Curriculum support functionality (cPanel-safe version)
document.addEventListener('DOMContentLoaded', () => {

    // Handle guide buttons using data attributes
    const guideButtons = document.querySelectorAll('.curriculum-item button');

    guideButtons.forEach(button => {
        button.addEventListener('click', () => {
            const guideType = button.dataset.guide;

            scrollToGuideSection();
            updateGuideTitle(guideType);
        });
    });

    // Handle video item clicks
    const videoItems = document.querySelectorAll('.video-item');

    videoItems.forEach(item => {
        item.addEventListener('click', () => {
            const titleElement = item.querySelector('h4');
            const title = titleElement ? titleElement.textContent : 'Video';

            window.alert(
                'Playing video: ' + title +
                '\n\nIn a real application, this would play the selected video.'
            );
        });
    });

    // FAQ toggle (delegated)
    document.addEventListener('click', event => {
        const faqItem = event.target.closest('.faq-item');
        if (faqItem) {
            faqItem.classList.toggle('active');
        }
    });
});

/* ---------- Helper functions (scoped safely) ---------- */

function scrollToGuideSection() {
    const guideSection = document.querySelector('.guide-section');
    if (guideSection) {
        guideSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function updateGuideTitle(type) {
    const titles = {
        transition: 'Curriculum Transition Guide',
        blended: 'Blended Learning Implementation Guide',
        aids: 'Teaching Aids Development Guide'
    };

    const sectionHeader = document.querySelector(
        '.guide-section .section-header h2'
    );

    if (sectionHeader) {
        sectionHeader.textContent = titles[type] || 'Curriculum Support Guide';
    }
}
