// Strategy Tabs JS
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.strategy-content');

    // Function to switch tabs
    const switchTab = (tabId) => {
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        document.querySelector(`.tab-btn[data-tab="${tabId}"]`)?.classList.add('active');
        document.getElementById(tabId)?.classList.add('active');
    };

    // Event listeners for tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', () => switchTab(button.dataset.tab));
    });

    // Activate tab from URL parameter if present
    const urlTab = new URLSearchParams(window.location.search).get('tab');
    if (urlTab) switchTab(urlTab);

    // Download buttons
    document.querySelectorAll('.download-item').forEach(item => {
        item.addEventListener('click', () => {
            const title = item.querySelector('h4')?.textContent || 'Untitled';
            const format = item.querySelector('p')?.textContent || 'Unknown';
            alert(`Downloading: ${title}\nFormat: ${format}\nThis would trigger a real download in production.`);
        });
    });
});
