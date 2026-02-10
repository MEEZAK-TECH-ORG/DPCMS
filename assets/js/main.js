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
        var thresholdDown = 120;  // add scrolled state only after scrolling past this
        var thresholdUp = 15;     // remove scrolled state only when back above this (wide dead zone)
        var removeDelay = 120;    // ms to wait before removing (avoids shake from small bounces)
        var lastWidth = window.innerWidth;
        var desktopMinWidth = 1025;
        var removeTimeout = null;

        function updateHeaderScrolled() {
            var isDesktop = window.innerWidth >= desktopMinWidth;
            if (!isDesktop) {
                if (removeTimeout) clearTimeout(removeTimeout);
                removeTimeout = null;
                header.classList.remove('header-scrolled');
                return;
            }
            var y = window.scrollY;
            if (y > thresholdDown) {
                if (removeTimeout) {
                    clearTimeout(removeTimeout);
                    removeTimeout = null;
                }
                header.classList.add('header-scrolled');
            } else if (y < thresholdUp) {
                if (header.classList.contains('header-scrolled')) {
                    if (!removeTimeout) {
                        removeTimeout = setTimeout(function() {
                            removeTimeout = null;
                            if (window.scrollY < thresholdUp) {
                                header.classList.remove('header-scrolled');
                            }
                        }, removeDelay);
                    }
                }
            } else {
                if (removeTimeout) {
                    clearTimeout(removeTimeout);
                    removeTimeout = null;
                }
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
