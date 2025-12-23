const translations = {
    en: {
        "nav.home": "Home",
        "nav.about": "About",
        "nav.expertise": "Expertise",
        "nav.values": "Values",
        "nav.heritage": "Heritage",
        "nav.contact": "Contact",
        "hero.title": "A Legacy of Global Trade Excellence Since 1970",
        "hero.description": "BenHamaden delivers comprehensive A-to-Z export and import solutions, enabling seamless trade across international markets with over five decades of trusted expertise.",
        "hero.btn.discover": "Discover More",
        "hero.btn.contact": "Contact Us",
        "why.title": "Why Choose BenHamaden",
        "why.card1.title": "50+ Years of Excellence",
        "why.card1.desc": "Established in 1970, we bring over five decades of proven international trade expertise to every partnership, navigating global markets with confidence.",
        "why.card2.title": "Global Reach",
        "why.card2.desc": "Headquartered in Chad with a strong operational footprint across international markets, connecting businesses worldwide through efficient trade networks.",
        "why.card3.title": "Trusted Partner",
        "why.card3.desc": "Building lasting relationships through integrity, reliability, and uncompromising quality, making us preferred choice for global trade solutions.",
        "stats.years": "Years in Business",
        "stats.partners": "Global Partners",
        "stats.transactions": "Successful Transactions",
        "stats.countries": "Countries Served",
        "cta.title": "Ready to Expand Your Global Trade Operations?",
        "cta.desc": "Partner with BenHamaden for reliable, efficient, and compliant international trade solutions that drive your business forward.",
        "cta.btn": "Get Started Today",
        "footer.tagline": "A Legacy of Global Trade Excellence Since 1970",
        "footer.subtagline": "Connecting markets, building futures through trusted international trade partnerships.",
        "footer.quicklinks": "Quick Links",
        "footer.services": "Services",
        "footer.services.export": "Export Operations",
        "footer.services.import": "Import Solutions",
        "footer.services.customs": "Customs Clearance",
        "footer.services.advisory": "Trade Advisory",
        "footer.contact": "Contact Info",
        "footer.rights": "&copy; 2023 BenHamaden. All Rights Reserved."
    },
    fr: {
        "nav.home": "Accueil",
        "nav.about": "À propos",
        "nav.expertise": "Expertise",
        "nav.values": "Valeurs",
        "nav.heritage": "Héritage",
        "nav.contact": "Contact",
        "hero.title": "Un héritage d'excellence commerciale mondiale depuis 1970",
        "hero.description": "BenHamaden fournit des solutions complètes d'import-export de A à Z, permettant un commerce fluide sur les marchés internationaux avec plus de cinq décennies d'expertise de confiance.",
        "hero.btn.discover": "Découvrir plus",
        "hero.btn.contact": "Contactez-nous",
        "why.title": "Pourquoi choisir BenHamaden",
        "why.card1.title": "50+ ans d'excellence",
        "why.card1.desc": "Établis en 1970, nous apportons plus de cinq décennies d'expertise éprouvée en commerce international à chaque partenariat, naviguant sur les marchés mondiaux avec confiance.",
        "why.card2.title": "Portée mondiale",
        "why.card2.desc": "Basé au Tchad avec une forte empreinte opérationnelle sur les marchés internationaux, connectant les entreprises du monde entier grâce à des réseaux commerciaux efficaces.",
        "why.card3.title": "Partenaire de confiance",
        "why.card3.desc": "Construire des relations durables grâce à l'intégrité, la fiabilité et une qualité sans compromis, faisant de nous le choix privilégié pour les solutions commerciales mondiales.",
        "stats.years": "Années d'activité",
        "stats.partners": "Partenaires mondiaux",
        "stats.transactions": "Transactions réussies",
        "stats.countries": "Pays desservis",
        "cta.title": "Prêt à étendre vos opérations commerciales mondiales ?",
        "cta.desc": "Associez-vous à BenHamaden pour des solutions commerciales internationales fiables, efficaces et conformes qui font avancer votre entreprise.",
        "cta.btn": "Commencez aujourd'hui",
        "footer.tagline": "Un héritage d'excellence commerciale mondiale depuis 1970",
        "footer.subtagline": "Connecter les marchés, construire l'avenir grâce à des partenariats commerciaux internationaux de confiance.",
        "footer.quicklinks": "Liens rapides",
        "footer.services": "Services",
        "footer.services.export": "Opérations d'exportation",
        "footer.services.import": "Solutions d'importation",
        "footer.services.customs": "Dédouanement",
        "footer.services.advisory": "Conseil commercial",
        "footer.contact": "Infos contact",
        "footer.rights": "&copy; 2023 BenHamaden. Tous droits réservés."
    }
};

function changeLanguage(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.innerHTML = translations[lang][key];
        }
    });
    document.documentElement.lang = lang;
    localStorage.setItem('preferredLanguage', lang);
}

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('preferredLanguage') || 'en';
    changeLanguage(savedLang);
    
    const langToggle = document.getElementById('lang-toggle');
    if(langToggle) {
        langToggle.value = savedLang;
        langToggle.addEventListener('change', (e) => {
            changeLanguage(e.target.value);
        });
    }
});
