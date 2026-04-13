/* =========================================
   GLOBAL ELEMENTS
========================================= */

const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navOverlay = document.getElementById('navOverlay');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.getElementById('backToTop');

/* =========================================
   NAVBAR SCROLL EFFECT
========================================= */

window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    if (window.scrollY > 400) {
        backToTop?.classList.add('show');
    } else {
        backToTop?.classList.remove('show');
    }
});

/* =========================================
   MOBILE MENU
========================================= */

function closeMenu() {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    navOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

navToggle?.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    navOverlay.classList.toggle('active');

    document.body.style.overflow =
        navMenu.classList.contains('active') ? 'hidden' : '';
});

navOverlay?.addEventListener('click', closeMenu);

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeMenu();

        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

/* =========================================
   SMOOTH SCROLL
========================================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (!target) return;

        e.preventDefault();
        const offset = target.getBoundingClientRect().top + window.pageYOffset - 90;

        window.scrollTo({
            top: offset,
            behavior: 'smooth'
        });
    });
});

/* =========================================
   HERO SLIDER
========================================= */

document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.hero-slide');
    const prevBtn = document.getElementById('heroPrev');
    const nextBtn = document.getElementById('heroNext');
    let current = 0;
    let sliderInterval;

    if (!slides.length) return;

    function showSlide(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        current = index;

        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === current);
        });
    }

    function nextSlide() {
        showSlide(current + 1);
    }

    function prevSlide() {
        showSlide(current - 1);
    }

    function startSlider() {
        sliderInterval = setInterval(nextSlide, 5000);
    }

    function stopSlider() {
        clearInterval(sliderInterval);
    }

    nextBtn?.addEventListener('click', () => {
        stopSlider();
        nextSlide();
        startSlider();
    });

    prevBtn?.addEventListener('click', () => {
        stopSlider();
        prevSlide();
        startSlider();
    });

    /* Swipe support */
    let startX = 0;
    document.querySelector('.hero')?.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
    });

    document.querySelector('.hero')?.addEventListener('touchend', e => {
        const endX = e.changedTouches[0].clientX;
        if (endX < startX - 50) nextSlide();
        if (endX > startX + 50) prevSlide();
    });

    showSlide(0);
    startSlider();
});

/* =========================================
   FAQs ACCORDION
========================================= */

document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');

        document.querySelectorAll('.faq-item')
            .forEach(i => i.classList.remove('active'));

        if (!isOpen) {
            item.classList.add('active');
        }
    });
});

/* =========================================
   BACK TO TOP
========================================= */

backToTop?.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/* =========================================
   ESC KEY CLOSE MENU
========================================= */

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        closeMenu();
    }
});

// ============================================
// GALLERY PAGE - JAVASCRIPT
// 35 FRAMES PHOTOGRAPHY
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // CATEGORY FILTERING
    // ============================================
    
    const categoryBtns = document.querySelectorAll('.category-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-category');
            
            // Update active button
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                const itemCategories = item.getAttribute('data-category');
                
                if (category === 'all' || itemCategories.includes(category)) {
                    item.classList.remove('hide');
                    setTimeout(() => {
                        item.style.display = '';
                    }, 10);
                } else {
                    item.classList.add('hide');
                    setTimeout(() => {
                        if (item.classList.contains('hide')) {
                            item.style.display = 'none';
                        }
                    }, 700);
                }
            });
        });
    });
    
    // ============================================
    // VIEW TOGGLE (Grid vs Masonry)
    // ============================================
    
    const viewBtns = document.querySelectorAll('.view-btn');
    const galleryGrid = document.getElementById('galleryGrid');
    
    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.getAttribute('data-view');
            
            // Update active button
            viewBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Switch view
            if (view === 'masonry') {
                galleryGrid.classList.add('masonry-view');
            } else {
                galleryGrid.classList.remove('masonry-view');
            }
        });
    });
    
    // ============================================
    // LIGHTBOX FUNCTIONALITY
    // ============================================
    
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const expandBtns = document.querySelectorAll('.gallery-expand-btn');
    
    let currentIndex = 0;
    let currentImages = [];
    
    // Get all visible images
    function updateCurrentImages() {
        currentImages = [];
        const visibleItems = document.querySelectorAll('.gallery-item:not(.hide)');
        visibleItems.forEach((item, index) => {
            const img = item.querySelector('.gallery-image img');
            const category = item.querySelector('.gallery-category');
            const title = item.querySelector('.gallery-title');
            
            currentImages.push({
                src: img.src,
                alt: img.alt,
                category: category ? category.textContent : '',
                title: title ? title.textContent : ''
            });
        });
    }
    
    // Open lightbox
    expandBtns.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            updateCurrentImages();
            
            const item = btn.closest('.gallery-item');
            const visibleItems = Array.from(document.querySelectorAll('.gallery-item:not(.hide)'));
            currentIndex = visibleItems.indexOf(item);
            
            showLightboxImage(currentIndex);
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Show image in lightbox
    function showLightboxImage(index) {
        if (currentImages[index]) {
            lightboxImage.src = currentImages[index].src;
            lightboxImage.alt = currentImages[index].alt;
            
            const lightboxCategory = document.querySelector('.lightbox-category');
            const lightboxTitle = document.querySelector('.lightbox-title');
            
            if (lightboxCategory) lightboxCategory.textContent = currentImages[index].category;
            if (lightboxTitle) lightboxTitle.textContent = currentImages[index].title;
        }
    }
    
    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    // Close on overlay click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Previous image
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
            showLightboxImage(currentIndex);
        });
    }
    
    // Next image
    if (lightboxNext) {
        lightboxNext.addEventListener('click', (e) => {
            e.stopPropagation();
            currentIndex = (currentIndex + 1) % currentImages.length;
            showLightboxImage(currentIndex);
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
            showLightboxImage(currentIndex);
        } else if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % currentImages.length;
            showLightboxImage(currentIndex);
        }
    });
    
    // ============================================
    // LOAD MORE FUNCTIONALITY
    // ============================================
    
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    let itemsToShow = 16;
    
    function updateVisibleItems() {
        const activeCategory = document.querySelector('.category-btn.active').getAttribute('data-category');
        let visibleCount = 0;
        
        galleryItems.forEach((item, index) => {
            const itemCategories = item.getAttribute('data-category');
            const matchesCategory = activeCategory === 'all' || itemCategories.includes(activeCategory);
            
            if (matchesCategory) {
                if (visibleCount < itemsToShow) {
                    item.classList.remove('hide');
                    item.style.display = '';
                    visibleCount++;
                } else {
                    item.classList.add('hide');
                    item.style.display = 'none';
                }
            }
        });
        
        // Hide load more button if all items are visible
        const totalMatchingItems = Array.from(galleryItems).filter(item => {
            const itemCategories = item.getAttribute('data-category');
            return activeCategory === 'all' || itemCategories.includes(activeCategory);
        }).length;
        
        if (visibleCount >= totalMatchingItems) {
            loadMoreBtn.style.display = 'none';
        } else {
            loadMoreBtn.style.display = 'inline-flex';
        }
    }
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            itemsToShow += 12;
            updateVisibleItems();
            
            // Smooth scroll animation
            loadMoreBtn.querySelector('.btn-text').textContent = 'Loading...';
            setTimeout(() => {
                loadMoreBtn.querySelector('.btn-text').textContent = 'Load More Photos';
            }, 500);
        });
    }
    
    // Initial load
    updateVisibleItems();
    
    // Update on category change
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            itemsToShow = 16;
            updateVisibleItems();
        });
    });
    
    // ============================================
    // ANIMATION ON SCROLL
    // ============================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe gallery items for scroll animation
    galleryItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
    
    // ============================================
    // TOUCH/SWIPE SUPPORT FOR LIGHTBOX
    // ============================================
    
    let touchStartX = 0;
    let touchEndX = 0;
    
    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    lightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left - next image
            currentIndex = (currentIndex + 1) % currentImages.length;
            showLightboxImage(currentIndex);
        }
        if (touchEndX > touchStartX + 50) {
            // Swipe right - previous image
            currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
            showLightboxImage(currentIndex);
        }
    }
    
    console.log('Gallery page initialized successfully');
});
