// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mainNav = document.getElementById('main-nav');
const searchBar = document.getElementById('search-bar');

if (mobileMenuBtn && mainNav && searchBar) {
    mobileMenuBtn.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        searchBar.classList.toggle('active');
        
        // Change icon based on menu state
        if (mainNav.classList.contains('active')) {
            mobileMenuBtn.setAttribute('aria-label','Close menu'); mobileMenuBtn.classList.add('open');
        } else {
            mobileMenuBtn.setAttribute('aria-label','Open menu'); mobileMenuBtn.classList.remove('open');
        }
    });
}

// Set active navigation link based on current page
document.addEventListener('DOMContentLoaded', function() {
    // Get current page filename
    const currentPage = window.location.pathname.split('/').pop();
    
    // Find all navigation links
    const navLinks = document.querySelectorAll('.main-nav a');
    
    // Set active class for current page
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        
        // Check if this link points to the current page
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === '' && linkPage === './')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Handle newsletter form submission
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        const input = form.querySelector('input[type="email"]');
        const button = form.querySelector('button');
        
        if (button) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                if (input && input.value) {
                    // In a real app, you would send this to a server
                    alert('Thank you for subscribing to our newsletter!');
                    input.value = '';
                } else {
                    alert('Please enter your email address.');
                }
            });
        }
    });
    
    // Handle search functionality
    const searchInputs = document.querySelectorAll('.search-bar input');
    const searchButtons = document.querySelectorAll('.search-bar button');
    
    searchButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const searchTerm = searchInputs[index].value;
            if (searchTerm.trim()) {
                // In a real app, you would redirect to search results
                alert(`Searching for: ${searchTerm}`);
            }
        });
        
        // Also allow Enter key to trigger search
        searchInputs[index].addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = searchInputs[index].value;
                if (searchTerm.trim()) {
                    // In a real app, you would redirect to search results
                    alert(`Searching for: ${searchTerm}`);
                }
            }
        });
    });
});