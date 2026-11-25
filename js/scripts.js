const root = document.documentElement;
const languageSelect = document.getElementById('langSelect');
const themeToggle = document.getElementById('themeToggle');
const navbarToggler = document.querySelector('.navbar-toggler');
const navbar = document.getElementById('navbarResponsive');

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
