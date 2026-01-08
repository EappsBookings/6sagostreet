// Dark Mode Toggle Logic
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Check for saved user preference, if any, on load of the website
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    htmlElement.classList.add('dark');
} else {
    htmlElement.classList.remove('dark');
}

themeToggleBtn.addEventListener('click', function() {
    // if set via local storage previously
    if (htmlElement.classList.contains('dark')) {
        htmlElement.classList.remove('dark');
        localStorage.theme = 'light';
    } else {
        htmlElement.classList.add('dark');
        localStorage.theme = 'dark';
    }
});

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

// Run language detection on load
document.addEventListener('DOMContentLoaded', detectAndApplyLanguage);