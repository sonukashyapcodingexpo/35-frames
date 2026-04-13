document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const src = params.get('src') || '';
    const category = params.get('category') || 'Portfolio';
    const title = params.get('title') || 'Featured Frame';
    const alt = params.get('alt') || title;
    const description = params.get('description') || 'This frame is presented in a detailed view to highlight composition, emotion, and storytelling in a more immersive format.';

    const detailImage = document.getElementById('detailImage');
    const detailCategory = document.getElementById('detailCategory');
    const detailTitle = document.getElementById('detailTitle');
    const detailDescription = document.getElementById('detailDescription');
    const relatedPhotosGrid = document.getElementById('relatedPhotosGrid');

    if (detailImage) {
        detailImage.src = src;
        detailImage.alt = alt;
    }
    if (detailCategory) detailCategory.textContent = category.toUpperCase();
    if (detailTitle) detailTitle.textContent = title;
    if (detailDescription) detailDescription.textContent = description;

    function normalizeCategory(value) {
        return (value || '').trim().toLowerCase();
    }

    function buildImageDescription(cat, frameTitle) {
        const textByCategory = {
            wedding: 'This frame preserves the emotional rhythm of the ceremony with elegant light, layered details, and authentic expressions that feel timeless.',
            engagement: 'This portrait highlights connection and promise using cinematic framing, refined tones, and naturally expressive body language.',
            couple: 'This image focuses on chemistry and storytelling through movement, composition, and subtle editorial color grading.',
            maternity: 'This portrait celebrates motherhood with graceful styling, gentle light, and a soft, intimate visual atmosphere.',
            kids: 'This image captures playful innocence with natural expressions, vibrant detail, and joyful storytelling.',
            family: 'This portrait reflects togetherness and warmth with balanced composition and timeless family emotion.',
            birthday: 'This celebration frame captures festive energy, candid expressions, and meaningful event details.',
            corporate: 'This visual emphasizes professional presence and clean brand storytelling with polished tones and confident composition.'
        };
        const body = textByCategory[cat] || 'This frame is crafted with a premium editorial approach and strong emotional storytelling.';
        return `${frameTitle}. ${body}`;
    }

    const categoryMap = {
        wedding: { folder: 'wedding', prefix: 'wedding-', ext: 'JPG', max: 31, missing: [24], label: 'Wedding' },
        engagement: { folder: 'engagement', prefix: 'Engagement-', ext: 'JPG', max: 36, missing: [], label: 'Engagement' },
        couple: { folder: 'couple', prefix: 'Couple-', ext: 'JPG', max: 33, missing: [6, 26, 28], label: 'Couple' },
        maternity: { folder: 'maternity', prefix: 'Maternity-', ext: 'JPG', max: 11, missing: [], label: 'Maternity' },
        kids: { folder: 'kids', prefix: 'kid-', ext: 'jpg', max: 45, missing: [], label: 'Kids' },
        family: { folder: 'family', prefix: 'family-', ext: 'JPG', max: 15, missing: [], label: 'Family' },
        birthday: { folder: 'birthday', prefix: 'birthday-', ext: 'jpg', max: 11, missing: [], label: 'Birthday' },
        corporate: { folder: 'corporate', prefix: 'corporate-', ext: 'JPG', max: 22, missing: [], label: 'Corporate' }
    };

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

    const categoryKey = normalizeCategory(category);
    const cfg = categoryMap[categoryKey];

    if (cfg && relatedPhotosGrid) {
        const currentSrc = src.replace(/\\/g, '/');
        const related = [];
        for (let i = 1; i <= cfg.max; i++) {
            if (cfg.missing.includes(i)) continue;
            const file = `assets/images/${cfg.folder}/${cfg.prefix}${i}.${cfg.ext}`;
            if (currentSrc.endsWith(file)) continue;
            related.push({ file, idx: i });
            if (related.length === 4) break;
        }

        relatedPhotosGrid.innerHTML = related.map(item => {
            const titlePool = titleByCategory[categoryKey] || [cfg.label];
            const frameTitle = titlePool[(item.idx - 1) % titlePool.length];
            const frameDescription = buildImageDescription(categoryKey, frameTitle);
            const params = new URLSearchParams({
                src: item.file,
                category: cfg.label,
                title: frameTitle,
                alt: `${cfg.label} Photography ${item.idx}`,
                description: frameDescription
            });

            return `
                <a class="related-photo-card" href="photo-details.html?${params.toString()}">
                    <img src="${item.file}" alt="${cfg.label} Photography ${item.idx}" loading="lazy">
                    <div class="related-photo-meta">
                        <span class="related-photo-title">${frameTitle}</span>
                    </div>
                </a>
            `;
        }).join('');
    }
});
