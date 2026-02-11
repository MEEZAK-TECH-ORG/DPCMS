// Main JavaScript file
// Add your JavaScript functionality here

document.addEventListener('DOMContentLoaded', function() {
    // Initialize your JavaScript here
    console.log('Website loaded successfully');

    // Join promo: start float animation when section is in view
    var joinSection = document.getElementById('join-promo');
    if (joinSection) {
        var observer = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                    } else {
                        entry.target.classList.remove('in-view');
                    }
                });
            },
            { rootMargin: '0px', threshold: 0.2 }
        );
        observer.observe(joinSection);
    }
});
