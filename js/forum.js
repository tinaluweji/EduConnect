// Forum functionality
document.addEventListener('DOMContentLoaded', function() {
    // Show/hide new post form
    const newPostBtn = document.getElementById('new-post-btn');
    const newPostForm = document.getElementById('new-post-form');
    const cancelPostBtn = document.getElementById('cancel-post');
    
    if (newPostBtn && newPostForm && cancelPostBtn) {
        newPostBtn.addEventListener('click', () => {
            newPostForm.style.display = 'block';
            newPostBtn.style.display = 'none';
            // Scroll to form
            newPostForm.scrollIntoView({ behavior: 'smooth' });
        });
        
        cancelPostBtn.addEventListener('click', () => {
            newPostForm.style.display = 'none';
            newPostBtn.style.display = 'inline-flex';
        });
    }
    
    // Handle category tag selection
    const categoryTags = document.querySelectorAll('.category-tag[data-tag]');
    const selectedTags = new Set();
    
    categoryTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const tagValue = this.getAttribute('data-tag');
            
            if (selectedTags.has(tagValue)) {
                // Remove tag
                selectedTags.delete(tagValue);
                this.classList.remove('active');
            } else {
                // Add tag
                selectedTags.add(tagValue);
                this.classList.add('active');
            }
            
            // In a real app, you might update a hidden input field
            console.log('Selected tags:', Array.from(selectedTags));
        });
    });
    
    // Handle post form submission
    const postForm = document.getElementById('post-form');
    if (postForm) {
        postForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const title = document.getElementById('post-title').value;
            const category = document.getElementById('post-category').value;
            const content = document.getElementById('post-content').value;
            
            // In a real app, you would send this data to a server
            alert('Thank you for your post! It has been submitted for moderation and will appear on the forum soon.');
            
            // Reset form
            postForm.reset();
            categoryTags.forEach(tag => tag.classList.remove('active'));
            selectedTags.clear();
            
            // Hide form
            newPostForm.style.display = 'none';
            if (newPostBtn) {
                newPostBtn.style.display = 'inline-flex';
            }
        });
    }
    
    // Category card click handlers
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            alert(`Loading discussions for: ${category}\n\nIn a real application, this would filter the forum to show only posts in this category.`);
        });
    });
});

// Post action functions
function likePost(postId) {
    alert(`Liking post ${postId}\n\nIn a real application, this would increment the like count for this post.`);
}

function showComments(postId) {
    alert(`Showing comments for post ${postId}\n\nIn a real application, this would display all comments for this post.`);
}

function sharePost(postId) {
    alert(`Sharing post ${postId}\n\nIn a real application, this would open sharing options for this post.`);
}