// Main JavaScript file
// Add your JavaScript functionality here

document.addEventListener('DOMContentLoaded', function() {
    var overlay = document.getElementById('sidebar-overlay');
    var menuToggle = document.querySelector('.header-menu-toggle');
    var sidebarClose = document.querySelector('.sidebar-close');

    function openSidebar() {
        if (overlay) {
            overlay.classList.add('is-open');
            overlay.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeSidebar() {
        if (overlay) {
            overlay.classList.remove('is-open');
            overlay.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        }
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', openSidebar);
    }

    if (sidebarClose) {
        sidebarClose.addEventListener('click', closeSidebar);
    }

    if (overlay) {
        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) closeSidebar();
        });
    }

    // Close sidebar when a sidebar nav link is clicked (navigating)
    var sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    sidebarLinks.forEach(function(link) {
        link.addEventListener('click', closeSidebar);
    });

    // Laptop view (all pages): header sticks to top when scrolled, transparent bg; at top returns to original
    var header = document.querySelector('header');
    if (header) {
        var scrollThreshold = 80;
        var lastWidth = window.innerWidth;
        var desktopMinWidth = 1025;

        function updateHeaderScrolled() {
            var isDesktop = window.innerWidth >= desktopMinWidth;
            if (!isDesktop) {
                header.classList.remove('header-scrolled');
                return;
            }
            if (window.scrollY > scrollThreshold) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        }

        window.addEventListener('scroll', updateHeaderScrolled, { passive: true });
        window.addEventListener('resize', function() {
            if (Math.abs(window.innerWidth - lastWidth) >= 1) {
                lastWidth = window.innerWidth;
                updateHeaderScrolled();
            }
        });
        updateHeaderScrolled();
    }

    console.log('Website loaded successfully');
});
