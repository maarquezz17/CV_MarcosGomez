const root = document.documentElement;
const languageSelect = document.getElementById('langSelect');
const themeToggle = document.getElementById('themeToggle');
const navbarToggler = document.querySelector('.navbar-toggler');
const navbar = document.getElementById('navbarResponsive');
const readingProgress = document.getElementById('readingProgress');
const backToTop = document.getElementById('backToTop');
const printButton = document.getElementById('printCv');

if ('IntersectionObserver' in window) {
    root.classList.add('js-ready');
}

function readPreference(key) {
    try {
        return window.localStorage.getItem(key);
    } catch (error) {
        console.warn('Browser storage is unavailable; this preference will not be remembered.', error);
        return null;
    }
}

function savePreference(key, value) {
    try {
        window.localStorage.setItem(key, value);
    } catch (error) {
        console.warn('Browser storage is unavailable; this preference will not be remembered.', error);
    }
}

function setLanguage(language) {
    const selectedLanguage = language === 'en' ? 'en' : 'es';
    root.lang = selectedLanguage;
    document.querySelectorAll('[data-es][data-en]').forEach(function (element) {
        element.textContent = element.dataset[selectedLanguage];
    });
    document.querySelectorAll('[data-aria-es][data-aria-en]').forEach(function (element) {
        element.setAttribute('aria-label', element.getAttribute('data-aria-' + selectedLanguage));
    });

    if (languageSelect) {
        languageSelect.value = selectedLanguage;
        languageSelect.setAttribute('aria-label', selectedLanguage === 'en' ? 'Language' : 'Idioma');
    }

    const controls = document.querySelector('.site-controls');
    if (controls) {
        controls.setAttribute('aria-label', selectedLanguage === 'en' ? 'Page preferences' : 'Preferencias de la página');
    }

    if (themeToggle) {
        const label = selectedLanguage === 'en' ? 'Toggle colour theme' : 'Cambiar tema de color';
        themeToggle.setAttribute('aria-label', label);
        themeToggle.setAttribute('title', label);
    }

    if (navbarToggler) {
        navbarToggler.setAttribute('aria-label', selectedLanguage === 'en' ? 'Toggle navigation' : 'Mostrar u ocultar navegación');
    }

    if (backToTop) {
        const label = selectedLanguage === 'en' ? 'Back to top' : 'Volver al principio';
        backToTop.setAttribute('aria-label', label);
        backToTop.setAttribute('title', label);
    }

    savePreference('lang', selectedLanguage);
}

function setTheme(theme, persist) {
    const selectedTheme = theme === 'dark' ? 'dark' : 'light';
    root.setAttribute('data-theme', selectedTheme);
    if (themeToggle) {
        themeToggle.setAttribute('aria-pressed', String(selectedTheme === 'dark'));
    }
    if (persist) {
        savePreference('theme', selectedTheme);
    }
}

setLanguage(readPreference('lang'));

if (languageSelect) {
    languageSelect.addEventListener('change', function () {
        setLanguage(languageSelect.value);
    });
}

const savedTheme = readPreference('theme');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
setTheme(savedTheme || (prefersDark ? 'dark' : 'light'), false);

if (themeToggle) {
    themeToggle.addEventListener('click', function () {
        setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true);
    });
}

if (navbarToggler && navbar) {
    navbarToggler.addEventListener('click', function () {
        const isExpanded = navbarToggler.getAttribute('aria-expanded') === 'true';
        navbarToggler.setAttribute('aria-expanded', String(!isExpanded));
        navbar.classList.toggle('show', !isExpanded);
    });

    navbar.querySelectorAll('.nav-link').forEach(function (navLink) {
        navLink.addEventListener('click', function () {
            navbar.classList.remove('show');
            navbarToggler.setAttribute('aria-expanded', 'false');
        });
    });
}

function updateScrollControls() {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (readingProgress) {
        readingProgress.value = scrollableHeight > 0
            ? Math.round((window.scrollY / scrollableHeight) * 100)
            : 0;
    }
    if (backToTop) {
        backToTop.hidden = window.scrollY < 320;
    }
}

window.addEventListener('scroll', updateScrollControls, { passive: true });
window.addEventListener('resize', updateScrollControls);
updateScrollControls();

if (backToTop) {
    backToTop.addEventListener('click', function () {
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
    });
}

if (printButton) {
    printButton.addEventListener('click', function () {
        window.print();
    });
}

if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(function (element) {
        revealObserver.observe(element);
    });

    const sectionLinks = new Map(
        Array.from(document.querySelectorAll('.nav-link[href^="#"]')).map(function (link) {
            return [link.getAttribute('href').slice(1), link];
        })
    );
    const sectionObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) {
                return;
            }
            sectionLinks.forEach(function (link) {
                link.removeAttribute('aria-current');
            });
            const activeLink = sectionLinks.get(entry.target.id);
            if (activeLink) {
                activeLink.setAttribute('aria-current', 'location');
            }
        });
    }, { rootMargin: '-20% 0px -65% 0px', threshold: 0 });

    document.querySelectorAll('main .cv-section[id]').forEach(function (section) {
        sectionObserver.observe(section);
    });
}
