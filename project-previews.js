// Project Preview Functionality
document.addEventListener('DOMContentLoaded', function() {
    const projectCards = document.querySelectorAll('.project-card');
    const previewModal = document.getElementById('projectPreview');
    const previewFrame = document.getElementById('previewFrame');
    const closePreview = document.getElementById('closePreview');
    const body = document.body;

    // Open preview when clicking on project card
    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't trigger if clicking on links inside the card
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                return;
            }
            
            const previewUrl = card.getAttribute('data-preview-url');
            if (previewUrl) {
                previewFrame.src = previewUrl;
                previewModal.classList.add('preview-visible');
                body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
            }
        });
    });

    // Close preview when clicking the close button
    closePreview.addEventListener('click', () => {
        previewModal.classList.remove('preview-visible');
        body.style.overflow = 'auto'; // Re-enable scrolling
        // Clear the iframe source when closing
        setTimeout(() => {
            previewFrame.src = '';
        }, 300); // Wait for the animation to complete
    });

    // Close preview when clicking outside the iframe
    previewModal.addEventListener('click', (e) => {
        if (e.target === previewModal) {
            closePreview.click();
        }
    });

    // Close preview with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && previewModal.classList.contains('preview-visible')) {
            closePreview.click();
        }
    });
});
