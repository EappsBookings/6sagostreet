// Language Detection and Toggle Logic
function detectAndApplyLanguage() {
    // Get browser language (e.g., "en-US", "zh-CN", "zh-SG")
    const userLang = navigator.language || navigator.userLanguage;
    const isChinese = userLang.toLowerCase().startsWith('zh');

    if (isChinese) {
        // Hide English elements
        document.querySelectorAll('.lang-en').forEach(el => {
            el.classList.add('hidden');
        });
        // Show Chinese elements
        document.querySelectorAll('.lang-zh').forEach(el => {
            el.classList.remove('hidden');
        });
        
        // Update document title if needed (Simple replacement)
        if (document.title.includes('FOR LEASE')) {
            document.title = "硕莪街 6 & 8 号 | 出租 | 牛车水保留店屋";
            // Update meta description
            const metaDesc = document.querySelector('meta[name="description"]');
            if (metaDesc) {
                metaDesc.setAttribute("content", "新加坡硕莪街 6 & 8 号优质商业店屋出租。牛车水核心地段罕见的双连单位机会。");
            }
        }
    }
}

// WeChat Copy Logic
function setupCopyButtons() {
    const copyBtns = document.querySelectorAll('.wechat-copy-btn');
    const toast = document.getElementById('copy-toast');
    let toastTimeout;

    copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const idToCopy = btn.getAttribute('data-id');
            
            // Copy to clipboard
            navigator.clipboard.writeText(idToCopy).then(() => {
                // Show Toast
                toast.classList.remove('opacity-0', 'translate-y-4');
                
                // Hide after 3 seconds
                clearTimeout(toastTimeout);
                toastTimeout = setTimeout(() => {
                    toast.classList.add('opacity-0', 'translate-y-4');
                }, 3000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
                alert('Failed to copy ID. Please copy manually: ' + idToCopy);
            });
        });
    });
}

// Mobile Menu Logic
function setupMobileMenu() {
    const btn = document.querySelector('[aria-controls="mobile-menu"]');
    const menu = document.getElementById('mobile-menu');

    if (btn && menu) {
        btn.addEventListener('click', () => {
            const isExpanded = btn.getAttribute('aria-expanded') === 'true';
            btn.setAttribute('aria-expanded', !isExpanded);
            menu.classList.toggle('hidden');
        });

        // Close menu when a link is clicked
        const links = menu.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.add('hidden');
                btn.setAttribute('aria-expanded', 'false');
            });
        });
    }
}

// --- Lightbox Logic ---
const galleryMedia = [
    { type: 'video', src: 'assets/sagostreet.mp4', poster: 'assets/sagostreet1.webp', captionEn: 'Property Tour', captionZh: '物业视频参观' },
    { type: 'image', src: 'assets/sagostreet1.jpeg', captionEn: 'Facade View', captionZh: '外观概览' },
    { type: 'image', src: 'assets/sagostreet2.jpeg', captionEn: 'Interior View', captionZh: '一楼内景' },
    { type: 'image', src: 'assets/sagostreet3.jpeg', captionEn: 'Interior Details', captionZh: '二楼内景' },
    { type: 'image', src: 'assets/sagostreet4.jpeg', captionEn: 'Spacious Layout', captionZh: '周边街景' },
    { type: 'image', src: 'assets/sagostreet5.jpeg', captionEn: 'Architectural Features', captionZh: '屋顶 / 景观' },
    { type: 'image', src: 'assets/sagostreet6.jpeg', captionEn: 'Interior View', captionZh: '内景' },
    { type: 'image', src: 'assets/sagostreet7.jpeg', captionEn: 'Exterior View', captionZh: '外观' },
    { type: 'image', src: 'assets/sagostreet8.jpeg', captionEn: 'Exterior Details', captionZh: '外观详情' }
];

let currentSlideIndex = 0;
let activeMediaSet = galleryMedia;

function setupLightbox() {
    const lightbox = document.getElementById('lightbox');
    const closeBtn = document.getElementById('lightbox-close');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');

    closeBtn.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    prevBtn.addEventListener('click', (e) => { e.stopPropagation(); changeSlide(-1); });
    nextBtn.addEventListener('click', (e) => { e.stopPropagation(); changeSlide(1); });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('hidden')) {
            if (e.key === 'Escape') closeLightbox();
            if (activeMediaSet.length > 1) {
                if (e.key === 'ArrowLeft') changeSlide(-1);
                if (e.key === 'ArrowRight') changeSlide(1);
            }
        }
    });
}

/**
 * Opens the lightbox.
 * @param {number} index - Starting index
 * @param {Array} [mediaSet] - Optional custom set of media
 */
function openLightbox(index, mediaSet = galleryMedia) {
    activeMediaSet = mediaSet;
    currentSlideIndex = index;
    
    const lightbox = document.getElementById('lightbox');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');

    // Show/Hide arrows based on set size
    if (activeMediaSet.length <= 1) {
        prevBtn.classList.add('hidden');
        nextBtn.classList.add('hidden');
    } else {
        prevBtn.classList.remove('hidden');
        nextBtn.classList.remove('hidden');
    }

    lightbox.classList.remove('hidden');
    setTimeout(() => lightbox.classList.remove('opacity-0'), 10);
    
    updateLightboxContent();
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.add('opacity-0');
    setTimeout(() => {
        lightbox.classList.add('hidden');
        document.getElementById('lightbox-content').innerHTML = '';
    }, 300);
    document.body.style.overflow = '';
}

function changeSlide(direction) {
    currentSlideIndex += direction;
    if (currentSlideIndex < 0) currentSlideIndex = activeMediaSet.length - 1;
    if (currentSlideIndex >= activeMediaSet.length) currentSlideIndex = 0;
    updateLightboxContent();
}

function updateLightboxContent() {
    const container = document.getElementById('lightbox-content');
    const captionEl = document.getElementById('lightbox-caption');
    const item = activeMediaSet[currentSlideIndex];
    const isChinese = (navigator.language || navigator.userLanguage).toLowerCase().startsWith('zh');

    captionEl.textContent = isChinese ? item.captionZh : item.captionEn;
    container.innerHTML = '';

    if (item.type === 'video') {
        const video = document.createElement('video');
        video.src = item.src;
        video.controls = true;
        video.autoplay = true;
        video.poster = item.poster;
        video.className = 'max-w-full max-h-[80vh] rounded shadow-lg object-contain';
        container.appendChild(video);
    } else {
        if (item.skipSources) {
            const img = document.createElement('img');
            img.src = item.src;
            img.className = 'max-w-full max-h-[80vh] rounded shadow-lg object-contain';
            container.appendChild(img);
        } else {
            const picture = document.createElement('picture');
            
            // Remove extension to swap with avif/webp
            const baseSrc = item.src.substring(0, item.src.lastIndexOf('.'));

            const sourceAvif = document.createElement('source');
            sourceAvif.srcset = baseSrc + '.avif';
            sourceAvif.type = 'image/avif';
            picture.appendChild(sourceAvif);

            const sourceWebp = document.createElement('source');
            sourceWebp.srcset = baseSrc + '.webp';
            sourceWebp.type = 'image/webp';
            picture.appendChild(sourceWebp);

            const img = document.createElement('img');
            img.src = item.src;
            img.className = 'max-w-full max-h-[80vh] rounded shadow-lg object-contain';
            picture.appendChild(img);

            container.appendChild(picture);
        }
    }
}

// Run on load
document.addEventListener('DOMContentLoaded', () => {
    detectAndApplyLanguage();
    setupCopyButtons();
    setupMobileMenu();
    setupLightbox();
});
