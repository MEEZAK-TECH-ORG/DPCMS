

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

    // Testimonials carousel (image + text update together)
    var testimonialImage = document.getElementById('testimonial-image');
    var testimonialAvatar = document.getElementById('testimonial-avatar');
    var testimonialQuote = document.getElementById('testimonial-quote');
    var testimonialName = document.getElementById('testimonial-name');
    var testimonialRole = document.getElementById('testimonial-role');
    var testimonialStars = document.getElementById('testimonial-stars');
    var testimonialPrev = document.getElementById('testimonial-prev');
    var testimonialNext = document.getElementById('testimonial-next');

    if (
        testimonialImage &&
        testimonialAvatar &&
        testimonialQuote &&
        testimonialName &&
        testimonialRole &&
        testimonialStars &&
        testimonialPrev &&
        testimonialNext
    ) {
        var testimonials = [
            {
                image: './assets/images/testimonial1.jpg',
                avatar: './assets/images/tawa.jpg',
                stars: 4,
                quote:
                    ` I was introduced to Destiny Promoters Cooperative by my pastor. Since I became a member, a lot has changed for good in both my life and business. I now have a better savings culture, and my zeal to save has increased because of the many benefits I get from the cooperative. Destiny Promoters Cooperative is not like other platforms out there; they are unique because they focus on helping and supporting the lives of their members. 

So for the cooperative, it is not just about contributing to earn more; they want to help you grow in your business, and they have been doing that for me since I joined. God bless our cooperative.`,
                name: 'Mrs. Adigun Tawakalitu Olushola',
                role: 'Business Woman'
            },
            {
                image: './assets/images/testimonial2.jpg',
                avatar: './assets/images/testimonial-profile2.jpg',
                stars: 5,
                quote:
                    'I joined Destiny Promoters Cooperative to improve my savings culture, and the impact has been outstanding. The support structure is practical and encouraging, and I now run my personal budget with confidence. This platform has helped me build discipline and long-term financial hope.',
                name: 'Mrs Chioma Daniels',
                role: 'Trader'
            },
            {
                image: './assets/images/testimonial3.jpg',
                avatar: './assets/images/testimonial-profile3.jpg',
                stars: 4,
                quote:
                    'From registration to weekly engagement, the process has been smooth and transparent. Beyond savings, I have gained a community that genuinely cares about growth and accountability. I strongly recommend Destiny Promoters Cooperative to anyone seeking meaningful support.',
                name: 'Mrs Vivian Dirisu',
                role: 'Entrepreneur'
            }
        ];

        var currentTestimonial = 0;

        function renderTestimonial(index) {
            var item = testimonials[index];
            testimonialImage.src = item.image;
            testimonialAvatar.src = item.avatar;
            var filledStars = Math.max(0, Math.min(5, Number(item.stars) || 0));
            var emptyStars = 5 - filledStars;
            testimonialStars.innerHTML =
                '<span class="star-filled">★</span>'.repeat(filledStars) +
                '<span class="star-empty">★</span>'.repeat(emptyStars);
            testimonialStars.setAttribute('aria-label', filledStars + ' out of 5 stars');
            testimonialQuote.textContent = item.quote;
            testimonialName.textContent = item.name;
            testimonialRole.textContent = item.role;
        }

        testimonialPrev.addEventListener('click', function() {
            currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
            renderTestimonial(currentTestimonial);
        });

        testimonialNext.addEventListener('click', function() {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            renderTestimonial(currentTestimonial);
        });

        // Ensure the section starts with the configured testimonial assets.
        renderTestimonial(currentTestimonial);
    }

    // Thrift package pages: show all "How it works" cards (no See More toggle)

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

    // Home \"Who we are\" video: central play button
    var whoWeAreSection = document.querySelector('.who-we-are-section');
    var whoWeAreVideo = whoWeAreSection ? whoWeAreSection.querySelector('.video-iframe') : null;
    var whoWeArePlayButton = whoWeAreSection ? whoWeAreSection.querySelector('.play-button-overlay') : null;
    var whoWeAreThumb = whoWeAreSection ? whoWeAreSection.querySelector('.video-thumbnail') : null;

    if (whoWeAreVideo && whoWeArePlayButton && whoWeAreThumb) {
        function setPlayingState(isPlaying) {
            if (isPlaying) {
                whoWeAreThumb.classList.add('is-playing');
                whoWeAreThumb.classList.remove('is-paused');
            } else {
                whoWeAreThumb.classList.add('is-paused');
                whoWeAreThumb.classList.remove('is-playing');
            }
        }

        // Initial state
        setPlayingState(!whoWeAreVideo.paused);

        whoWeArePlayButton.addEventListener('click', function () {
            if (whoWeAreVideo.paused) {
                whoWeAreVideo.play().then(function () {
                    setPlayingState(true);
                }).catch(function () { /* ignore play errors */ });
            } else {
                whoWeAreVideo.pause();
                setPlayingState(false);
            }
        });

        // Sync state if user uses native controls
        whoWeAreVideo.addEventListener('play', function () {
            setPlayingState(true);
        });
        whoWeAreVideo.addEventListener('pause', function () {
            setPlayingState(false);
        });
    }
});
