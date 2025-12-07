// Curriculum support functionality
document.addEventListener('DOMContentLoaded', function() {
    // Handle guide buttons
    const guideButtons = document.querySelectorAll('.curriculum-item button');
    
    guideButtons.forEach(button => {
        button.addEventListener('click', function() {
            const guideType = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            
            // Scroll to the appropriate guide section
            const guideSection = document.querySelector('.guide-section');
            if (guideSection) {
                guideSection.scrollIntoView({ behavior: 'smooth' });
            }
            
            // In a real app, you might load different guide content based on type
            console.log(`Loading guide for: ${guideType}`);
        });
    });
    
    // Handle video item clicks
    const videoItems = document.querySelectorAll('.video-item');
    videoItems.forEach(item => {
        item.addEventListener('click', function() {
            const title = this.querySelector('h4').textContent;
            alert(`Playing video: ${title}\n\nIn a real application, this would play the selected video.`);
        });
    });
});

// Toggle FAQ items
function toggleFAQ(item) {
    item.classList.toggle('active');
}

// Show specific guide
function showGuide(guideType) {
    // Scroll to guide section
    const guideSection = document.querySelector('.guide-section');
    if (guideSection) {
        guideSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Change guide content based on type
    const guideContainer = document.getElementById('transition-guide');
    if (guideContainer) {
        let guideTitle, guideContent;
        
        switch(guideType) {
            case 'transition':
                guideTitle = 'Curriculum Transition Guide';
                break;
            case 'blended':
                guideTitle = 'Blended Learning Implementation Guide';
                break;
            case 'aids':
                guideTitle = 'Teaching Aids Development Guide';
                break;
            default:
                guideTitle = 'Curriculum Support Guide';
        }
        
        // Update the section header
        const sectionHeader = document.querySelector('.guide-section .section-header h2');
        if (sectionHeader) {
            sectionHeader.textContent = guideTitle;
        }
        
        console.log(`Showing guide for: ${guideType}`);
    }
}