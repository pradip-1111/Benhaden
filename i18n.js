document.addEventListener('DOMContentLoaded', () => {
    const langToggle = document.getElementById('lang-toggle');
    const currentLang = localStorage.getItem('preferredLang') || 'en';

    // Set initial language
    setLanguage(currentLang);
    if (langToggle) langToggle.value = currentLang;

    // Language switch event
    if (langToggle) {
        langToggle.addEventListener('change', (e) => {
            const selectedLang = e.target.value;
            setLanguage(selectedLang);
            localStorage.setItem('preferredLang', selectedLang);
        });
    }

    function setLanguage(lang) {
        const trans = window.translations[lang];
        if (!trans) return;

        // Update HTML lang and dir attributes
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const keys = key.split('.');
            let value = trans;

            keys.forEach(k => {
                if (value) value = value[k];
            });

            if (value) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = value;
                } else {
                    element.innerText = value;
                }
            }
        });

        // Toggle RTL class on body for specific styling if needed
        if (lang === 'ar') {
            document.body.classList.add('rtl');
        } else {
            document.body.classList.remove('rtl');
        }
    }
});
