/* =========================================
   GLOBAL ELEMENTS
========================================= */

const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navOverlay = document.getElementById('navOverlay');
let navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.getElementById('backToTop');

const SERVICE_PAGE_NAMES = [
    'pre-engagement-photoshoot-in-bangalore.html',
    'kids-photoshoot-bangalore.html',
    'maternity-photoshoot-in-bangalore.html'
];

function normalizeNavbarMenu() {
    if (!navMenu) return;

    const currentPage = window.location.pathname.split('/').pop().toLowerCase() || 'index.html';
    const isIndex = currentPage === 'index.html' || currentPage === '';
    const homeHref = isIndex ? '#home' : 'index.html';
    const servicesOverviewHref = isIndex ? '#portfolio' : 'index.html#portfolio';

    navMenu.innerHTML = `
        <li><a href="${homeHref}" class="nav-link">Home</a></li>
        <li class="nav-item-has-dropdown">
            <a href="${servicesOverviewHref}" class="nav-link nav-link-dropdown" aria-haspopup="true" aria-expanded="false">Services</a>
            <ul class="nav-dropdown" role="menu" aria-label="Services">
                <li class="nav-dropdown-heading" aria-hidden="true">
                    <span class="nav-dropdown-title">Services</span>
                    <span class="nav-dropdown-heading-line"></span>
                </li>
                <li role="none"><a role="menuitem" href="pre-engagement-photoshoot-in-bangalore.html" class="nav-dropdown-link">Pre Wedding</a></li>
                <li role="none"><a role="menuitem" href="pre-engagement-photoshoot-in-bangalore.html" class="nav-dropdown-link">Engagement</a></li>
                <li role="none"><a role="menuitem" href="kids-photoshoot-bangalore.html" class="nav-dropdown-link">Kids</a></li>
                <li role="none"><a role="menuitem" href="maternity-photoshoot-in-bangalore.html" class="nav-dropdown-link">Maternity</a></li>
            </ul>
        </li>
        <li><a href="portfolio.html" class="nav-link">Portfolio</a></li>
        <li><a href="about.html" class="nav-link">About</a></li>
        <li><a href="contact.html" class="nav-link nav-link-cta">Contact Us</a></li>
    `;

    navLinks = navMenu.querySelectorAll('.nav-link');
    const servicesTrigger = navMenu.querySelector('.nav-link-dropdown');

    navLinks.forEach(link => {
        link.classList.remove('active');
        const raw = (link.getAttribute('href') || '').toLowerCase();
        if (raw === currentPage) {
            link.classList.add('active');
        } else if (isIndex && currentPage === 'index.html' && raw === '#home') {
            link.classList.add('active');
        }
    });

    if (SERVICE_PAGE_NAMES.includes(currentPage)) {
        servicesTrigger?.classList.add('active');
    }

    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();

            navMenu.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

            if (link.classList.contains('nav-dropdown-link')) {
                servicesTrigger?.classList.add('active');
            } else if (link.classList.contains('nav-link')) {
                link.classList.add('active');
            }
        });
    });
}

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
        backToTop?.classList.add('visible');
    } else {
        backToTop?.classList.remove('visible');
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

normalizeNavbarMenu();

navToggle?.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    navOverlay.classList.toggle('active');

    document.body.style.overflow =
        navMenu.classList.contains('active') ? 'hidden' : '';
});

navOverlay?.addEventListener('click', closeMenu);

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

/* =========================================
   MODERN PORTFOLIO (HOME PAGE)
========================================= */

document.addEventListener('DOMContentLoaded', () => {
    const portfolioRoot = document.getElementById('portfolioModern');
    if (!portfolioRoot) return;

    const cards = Array.from(portfolioRoot.querySelectorAll('.portfolio-card'));
    const filterButtons = portfolioRoot.querySelectorAll('.portfolio-filter-btn');
    const typeFilter = portfolioRoot.querySelector('#portfolioTypeFilter');
    const searchInput = portfolioRoot.querySelector('#portfolioSearchInput');
    const resultCount = portfolioRoot.querySelector('#portfolioResultCount');

    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    let activeCategory = 'all';
    let activeType = 'all';
    let searchTerm = '';
    let visibleCards = [];
    let currentLightboxIndex = 0;

    const applyFilters = () => {
        visibleCards = [];
        cards.forEach(card => {
            const category = card.dataset.category || '';
            const type = card.dataset.type || '';
            const title = (card.dataset.title || '').toLowerCase();
            const categoryMatch = activeCategory === 'all' || category === activeCategory;
            const typeMatch = activeType === 'all' || type === activeType;
            const searchMatch = !searchTerm || title.includes(searchTerm) || category.includes(searchTerm);
            const show = categoryMatch && typeMatch && searchMatch;

            card.classList.toggle('is-hidden', !show);
            if (show) visibleCards.push(card);
        });

        if (resultCount) {
            resultCount.textContent = `${visibleCards.length} portfolio item${visibleCards.length === 1 ? '' : 's'} shown`;
        }
    };

    const showLightboxImage = index => {
        if (!visibleCards.length) return;
        const safeIndex = (index + visibleCards.length) % visibleCards.length;
        currentLightboxIndex = safeIndex;
        const image = visibleCards[safeIndex].querySelector('img');
        if (!image || !lightboxImage) return;
        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt;
    };

    const openLightbox = card => {
        if (!lightbox) return;
        const idx = visibleCards.indexOf(card);
        if (idx < 0) return;
        showLightboxImage(idx);
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        if (!lightbox) return;
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    };

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            activeCategory = button.dataset.filter || 'all';
            applyFilters();
        });
    });

    typeFilter?.addEventListener('change', () => {
        activeType = typeFilter.value;
        applyFilters();
    });

    searchInput?.addEventListener('input', () => {
        searchTerm = searchInput.value.trim().toLowerCase();
        applyFilters();
    });

    portfolioRoot.addEventListener('click', event => {
        const openButton = event.target.closest('.portfolio-open');
        if (!openButton) return;
        const card = openButton.closest('.portfolio-card');
        if (!card) return;
        openLightbox(card);
    });

    lightboxClose?.addEventListener('click', closeLightbox);
    lightbox?.addEventListener('click', event => {
        if (event.target === lightbox) closeLightbox();
    });
    lightboxPrev?.addEventListener('click', () => showLightboxImage(currentLightboxIndex - 1));
    lightboxNext?.addEventListener('click', () => showLightboxImage(currentLightboxIndex + 1));

    document.addEventListener('keydown', event => {
        if (!lightbox?.classList.contains('active')) return;
        if (event.key === 'Escape') closeLightbox();
        if (event.key === 'ArrowLeft') showLightboxImage(currentLightboxIndex - 1);
        if (event.key === 'ArrowRight') showLightboxImage(currentLightboxIndex + 1);
    });

    applyFilters();
});

/* =========================================
   HOME GALLERY -> PHOTO DETAILS REDIRECT
========================================= */
document.addEventListener('DOMContentLoaded', () => {
    const homeGallery = document.querySelector('#gallery .gallery-grid');
    if (!homeGallery || document.body.classList.contains('portfolio-reference')) return;

    const categoryLabelMap = {
        wedding: 'Wedding',
        engagement: 'Engagement',
        couple: 'Couple',
        maternity: 'Maternity',
        kids: 'Kids',
        family: 'Family',
        birthday: 'Birthday',
        corporate: 'Corporate'
    };

    const descriptionMap = {
        wedding: 'A timeless wedding frame crafted with emotional storytelling, elegant composition, and refined editing for a premium cinematic finish.',
        engagement: 'A romantic engagement portrait that captures chemistry and celebration through expressive posing, balanced light, and clean color grading.',
        couple: 'An intimate couple portrait focused on natural interaction, graceful movement, and modern editorial styling.',
        maternity: 'A graceful maternity portrait designed to celebrate motherhood with soft tones, flattering light, and heartfelt expression.',
        kids: 'A joyful kids portrait that preserves spontaneity, playfulness, and innocence in a polished visual style.',
        family: 'A warm family portrait composed to highlight connection, togetherness, and timeless memories.',
        birthday: 'A vibrant birthday frame that preserves celebration energy, candid reactions, and beautiful event detail.',
        corporate: 'A confident corporate portrait featuring clean framing, modern tones, and a professional editorial finish.'
    };

    const toTitleCase = value =>
        value
            .replace(/[-_]+/g, ' ')
            .replace(/\b\w/g, char => char.toUpperCase())
            .trim();

    const getCategoryFromSrc = src => {
        const match = src.match(/assets\/images\/([^/]+)\//i);
        if (!match) return 'portfolio';
        return match[1].toLowerCase();
    };

    const getPhotoTitle = (fileName, categoryLabel) => {
        const normalized = fileName
            .replace(/\.[^.]+$/, '')
            .replace(/[-_]+/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();

        if (!normalized) return `${categoryLabel} Frame`;
        return toTitleCase(normalized);
    };

    homeGallery.addEventListener('click', event => {
        const galleryItem = event.target.closest('.gallery-item');
        if (!galleryItem) return;

        event.preventDefault();
        const image = galleryItem.querySelector('img');
        if (!image) return;

        const src = image.getAttribute('src') || image.src;
        const categoryKey = getCategoryFromSrc(src);
        const categoryLabel = categoryLabelMap[categoryKey] || 'Portfolio';
        const fileName = src.split('/').pop() || '';
        const title = getPhotoTitle(fileName, categoryLabel);
        const description = descriptionMap[categoryKey] || 'A premium image from our portfolio, crafted with clean composition and timeless visual storytelling.';

        const params = new URLSearchParams({
            src,
            category: categoryLabel,
            title,
            alt: image.getAttribute('alt') || title,
            description
        });

        window.location.href = `photo-details.html?${params.toString()}`;
    });
});
// ============================================
// GALLERY PAGE - JAVASCRIPT
// 35 FRAMES PHOTOGRAPHY
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    if (!document.getElementById('galleryGrid')) return;
    const galleryGrid = document.getElementById('galleryGrid');

    function buildImageDescription(category, title) {
        const baseByCategory = {
            wedding: 'This frame captures the emotional core of a wedding day where rituals, family presence, and timeless styling come together in one elegant visual story. We focus on natural expressions, graceful composition, and layered details so every look, gesture, and background element feels meaningful and cinematic. The tones are balanced to preserve skin texture, fabric richness, and ambient light while maintaining a premium editorial finish. This image is part of a larger narrative designed to relive vows, celebrations, and quiet moments with depth and authenticity.',
            engagement: 'This engagement portrait highlights connection, confidence, and celebration through clean framing, soft contrast, and expressive posing tailored to the couple. We shape each scene to feel personal by blending candid emotion with art-directed composition so the image remains romantic but modern. The grading keeps colors refined and skin tones natural while preserving the mood of the location and available light. Every detail in this frame is edited to feel polished, memorable, and worthy of a timeless pre-wedding story.',
            couple: 'This couple image is built around chemistry and movement, showing genuine interaction rather than stiff posing so the frame feels alive and intimate. We use directional light, negative space, and thoughtful perspective to give the scene a cinematic yet effortless character. The styling and color treatment are kept elegant to emphasize emotion first, with every edit supporting a natural luxury look. This photograph reflects our approach of turning ordinary moments into artful relationship portraits.',
            maternity: 'This maternity portrait celebrates strength, softness, and anticipation through graceful body language, flattering light, and a calm editorial composition. We intentionally preserve subtle textures and gentle tonal transitions to keep the frame warm, intimate, and deeply personal. Every decision from crop to color is made to honor the journey into parenthood with dignity and emotional depth. The final image is designed as a timeless keepsake that feels both artistic and heartfelt.',
            kids: 'This kids portrait captures curiosity and innocence in a way that feels joyful, expressive, and naturally authentic without over-staging the moment. We work quickly with child-friendly direction and clean visual framing so spontaneous reactions become strong storytelling images. Color and contrast are tuned to keep the frame vibrant while protecting delicate skin tones and real-life detail. The result is a playful yet premium portrait that families can treasure for years.',
            family: 'This family frame is composed to highlight togetherness, comfort, and shared emotion with a balanced structure that still feels candid and warm. We guide placement and interaction lightly so the image has natural connection while maintaining strong visual rhythm and depth. The edit is crafted for timeless color, crisp detail, and a soft cinematic finish that suits both digital and print presentation. It stands as a meaningful portrait of belonging and legacy.',
            birthday: 'This birthday moment is styled to preserve celebration energy while still keeping the frame refined, clear, and visually rich. We capture laughter, expression, and detail elements like decor and candid reactions so the image tells the full story of the event. Light and color are shaped to stay cheerful but premium, with attention to skin tone and environment balance. The final look is festive, modern, and emotionally memorable.',
            corporate: 'This corporate portrait emphasizes professionalism, presence, and brand character through confident framing, clean light, and modern visual styling. We direct posture, expression, and composition to create an image that feels authentic yet executive in tone. Post-production is intentionally controlled for sharpness, natural color balance, and polished texture suitable for web, print, and brand decks. The final frame communicates credibility while maintaining a contemporary editorial finish.'
        };

        const text = baseByCategory[category] || 'This image is crafted with an editorial approach that combines authentic emotion, clean composition, and premium finishing for a timeless visual result.';
        return `${title}. ${text}`;
    }

    function openPhotoDetailsPage(item) {
        const img = item.querySelector('.gallery-image img');
        const categoryEl = item.querySelector('.gallery-category');
        const titleEl = item.querySelector('.gallery-title');
        if (!img) return;

        const category = (categoryEl ? categoryEl.textContent : '').trim();
        const title = (titleEl ? titleEl.textContent : '').trim() || 'Featured Frame';
        const normalizedCategory = category.toLowerCase();
        const description = item.getAttribute('data-description') || buildImageDescription(normalizedCategory, title);

        const params = new URLSearchParams({
            src: img.getAttribute('src') || img.src,
            category: category || 'Portfolio',
            title,
            alt: img.getAttribute('alt') || img.alt || title,
            description
        });

        window.location.href = `photo-details.html?${params.toString()}`;
    }

    // Build portfolio cards from actual assets/images folders on portfolio page
    if (document.body.classList.contains('portfolio-reference') && galleryGrid) {
        const categoryConfig = [
            { key: 'wedding', folder: 'wedding', prefix: 'wedding-', ext: 'JPG', count: 31, missing: [24], label: 'Wedding' },
            { key: 'engagement', folder: 'engagement', prefix: 'Engagement-', ext: 'JPG', count: 36, label: 'Engagement' },
            { key: 'couple', folder: 'couple', prefix: 'Couple-', ext: 'JPG', count: 33, missing: [6, 26, 28], label: 'Couple' },
            { key: 'maternity', folder: 'maternity', prefix: 'Maternity-', ext: 'JPG', count: 11, label: 'Maternity' },
            { key: 'kids', folder: 'kids', prefix: 'kid-', ext: 'jpg', count: 45, label: 'Kids' },
            { key: 'family', folder: 'family', prefix: 'family-', ext: 'JPG', count: 15, label: 'Family' },
            { key: 'birthday', folder: 'birthday', prefix: 'birthday-', ext: 'jpg', count: 11, label: 'Birthday' },
            { key: 'corporate', folder: 'corporate', prefix: 'corporate-', ext: 'JPG', count: 22, label: 'Corporate' }
        ];

        const titleByCategory = {
            wedding: ['Sacred Vows', 'Ceremony Glow', 'Timeless Promise', 'Bridal Grace', 'Royal Rituals', 'Golden Hour Couple'],
            engagement: ['Ring Moment', 'Forever Begins', 'Elegant Promise', 'Soul Connection', 'Radiant Pair', 'Classic Romance'],
            couple: ['City Romance', 'Natural Chemistry', 'Quiet Moments', 'Together Always', 'Sunset Bond', 'Love Frames'],
            maternity: ['New Beginnings', 'Grace in Bloom', 'Awaiting Joy', 'Soft Elegance', 'Motherhood Glow', 'Cherished Life'],
            kids: ['Little Smiles', 'Playful Joy', 'Innocent Wonder', 'Tiny Adventures', 'Happy Giggles', 'Pure Moments'],
            family: ['Family Bond', 'Together Always', 'Home Stories', 'Warm Embrace', 'Generations', 'Heart of Home'],
            birthday: ['Celebration Day', 'Cake & Candles', 'Birthday Joy', 'Party Vibes', 'Happy Moments', 'Colorful Cheer'],
            corporate: ['Business Portrait', 'Executive Presence', 'Brand Story', 'Office Culture', 'Team Focus', 'Leadership Frame']
        };

        const cards = [];
        categoryConfig.forEach(cfg => {
            for (let i = 1; i <= cfg.count; i++) {
                if (cfg.missing && cfg.missing.includes(i)) continue;
                const titlePool = titleByCategory[cfg.key];
                const title = titlePool[(i - 1) % titlePool.length];
                const description = buildImageDescription(cfg.key, title);
                cards.push(`
                    <div class="gallery-item" data-category="${cfg.key}" data-description="${description}">
                        <div class="gallery-image">
                            <img src="assets/images/${cfg.folder}/${cfg.prefix}${i}.${cfg.ext}" alt="${cfg.label} Photography ${i}" loading="lazy">
                            <div class="gallery-overlay">
                                <div class="gallery-info">
                                    <span class="gallery-category">${cfg.label}</span>
                                    <h3 class="gallery-title">${title}</h3>
                                </div>
                                <button class="gallery-expand-btn">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path d="M15 3H21V9M9 21H3V15M21 3L14 10M3 21L10 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                `);
            }
        });

        galleryGrid.innerHTML = cards.join('');
    }
    
    // ============================================
    // CATEGORY FILTERING
    // ============================================
    
    const categoryBtns = document.querySelectorAll('.category-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Add varied editorial title treatments per image card
    const titleStyles = ['title-style-a', 'title-style-b', 'title-style-c', 'title-style-d', 'title-style-e', 'title-style-f'];
    const titlePositions = ['pos-bottom-left', 'pos-bottom-center', 'pos-bottom-right', 'pos-middle-left', 'pos-middle-center', 'pos-top-left', 'pos-top-right'];
    galleryItems.forEach((item, index) => {
        item.classList.add(titleStyles[index % titleStyles.length]);
        item.classList.add(titlePositions[index % titlePositions.length]);
    });
    
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
                    }, 50);
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
                title: title ? title.textContent : '',
                description: item.getAttribute('data-description') || buildImageDescription((category ? category.textContent : '').toLowerCase(), title ? title.textContent : 'Featured Frame')
            });
        });
    }
    
    // Open lightbox
    expandBtns.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();

            if (document.body.classList.contains('portfolio-reference')) {
                const item = btn.closest('.gallery-item');
                if (item) openPhotoDetailsPage(item);
                return;
            }

            updateCurrentImages();
            
            const item = btn.closest('.gallery-item');
            const visibleItems = Array.from(document.querySelectorAll('.gallery-item:not(.hide)'));
            currentIndex = visibleItems.indexOf(item);
            
            showLightboxImage(currentIndex);
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Restore previous behavior: clicking image card opens lightbox too
    galleryItems.forEach(item => {
        item.addEventListener('click', (e) => {
            if (e.target.closest('.gallery-expand-btn')) return;

            if (document.body.classList.contains('portfolio-reference')) {
                openPhotoDetailsPage(item);
                return;
            }

            updateCurrentImages();
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
            const lightboxDescription = document.querySelector('.lightbox-description');
            
            if (lightboxCategory) lightboxCategory.textContent = currentImages[index].category;
            if (lightboxTitle) lightboxTitle.textContent = currentImages[index].title;
            if (lightboxDescription) lightboxDescription.textContent = currentImages[index].description;
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
    const ALL_LIMIT = 24;
    const CATEGORY_LIMIT = 18;
    let itemsToShow = ALL_LIMIT;

    function getActiveCategory() {
        return document.querySelector('.category-btn.active')?.getAttribute('data-category') || 'all';
    }

    function getDefaultLimitByCategory(category) {
        return category === 'all' ? ALL_LIMIT : CATEGORY_LIMIT;
    }
    
    function updateVisibleItems() {
        const activeCategory = getActiveCategory();
        let visibleCount = 0;
        
        galleryItems.forEach((item, index) => {
            const itemCategories = item.getAttribute('data-category');
            const matchesCategory = activeCategory === 'all' || itemCategories.includes(activeCategory);
            
            if (matchesCategory) {
                if (visibleCount < itemsToShow) {
                    item.classList.remove('hide');
                    item.style.display = '';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
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
        
        if (loadMoreBtn) {
            if (visibleCount >= totalMatchingItems) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'inline-flex';
            }
        }
    }
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            itemsToShow += 6;
            updateVisibleItems();
            
            // Smooth scroll animation
            loadMoreBtn.querySelector('.btn-text').textContent = 'Loading...';
            setTimeout(() => {
                loadMoreBtn.querySelector('.btn-text').textContent = 'Load More Photos';
            }, 500);
        });
    }
    
    // Initial load
    itemsToShow = getDefaultLimitByCategory(getActiveCategory());
    updateVisibleItems();

    // Modern count-up animation for portfolio hero stats
    if (document.body.classList.contains('portfolio-reference')) {
        const statNumbers = document.querySelectorAll('.hero-stats .stat-number[data-count]');
        const statsRoot = document.querySelector('.hero-stats');
        let hasAnimatedStats = false;

        const animateStat = (el) => {
            const target = parseInt(el.dataset.count || '0', 10);
            const suffix = el.dataset.suffix || '';
            const finalText = el.dataset.final || `${target}${suffix}`;
            const duration = 1200;
            const startTime = performance.now();

            const step = (time) => {
                const progress = Math.min((time - startTime) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                const value = Math.round(target * eased);
                el.textContent = `${value}${suffix}`;
                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    el.textContent = finalText;
                }
            };

            requestAnimationFrame(step);
        };

        const runStatsAnimation = () => {
            if (hasAnimatedStats) return;
            hasAnimatedStats = true;
            statNumbers.forEach(animateStat);
        };

        if ('IntersectionObserver' in window && statsRoot) {
            const statsObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        runStatsAnimation();
                        statsObserver.disconnect();
                    }
                });
            }, { threshold: 0.5 });
            statsObserver.observe(statsRoot);
        } else {
            runStatsAnimation();
        }
    }
    
    // Update on category change
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            itemsToShow = getDefaultLimitByCategory(btn.getAttribute('data-category') || 'all');
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
    // Skip opacity-based reveal on portfolio page because it conflicts
    // with category limiting and can leave empty visual slots.
    if (!document.body.classList.contains('portfolio-reference')) {
        galleryItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(item);
        });
    }
    
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

