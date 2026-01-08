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

// Run on load
document.addEventListener('DOMContentLoaded', () => {
    detectAndApplyLanguage();
    setupCopyButtons();
});
