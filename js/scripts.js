window.addEventListener('DOMContentLoaded', () => {
    const translations = {
        en: {
            themeDark: 'Dark theme',
            themeLight: 'Light theme',
            languageButton: 'ES',
            navAbout: 'About',
            navFocus: 'Focus areas',
            navProjects: 'Projects',
            navEducation: 'Education',
            navContact: 'Contact',
            githubProfile: 'View GitHub',
            status: 'Student · always learning',
            terminalPrompt: 'building interesting things',
            eyebrow: 'PORTFOLIO · COMPUTING & DEVELOPMENT',
            hello: "Hi, I'm",
            role: 'DAM student · Systems, code & design',
            intro: 'I like understanding how technology works from end to end: from systems and networks to the software and interfaces we use every day.',
            seeWork: 'Explore projects',
            openTerminal: 'Open terminal',
            location: 'Spain',
            study: 'IT systems studies',
            cardCaption: 'Technical curiosity, real projects.',
            scroll: 'Explore',
            focusEyebrow: 'WHAT DRIVES ME',
            focusTitle: 'Areas of focus',
            focusDescription: 'A mix of infrastructure, development, and visual creativity. I am building my knowledge through practice and projects.',
            filterAll: 'All',
            filterSystems: 'Systems',
            filterWeb: 'Web',
            filterCreative: 'Game design',
            systemsKicker: 'INFRASTRUCTURE',
            systemsTitle: 'Systems & networks',
            systemsDescription: 'As part of my DAM studies, I take IT Systems, where we are learning to program in Java.',
            systemsCourse: 'IT Systems',
            networking: 'Networking',
            virtualization: 'Virtualization',
            webKicker: 'DEVELOPMENT',
            webTitle: 'Software & web',
            webDescription: 'Interested in building functional, accessible web experiences and continuing to learn cross-platform development.',
            creativeKicker: 'CREATIVITY',
            creativeTitle: 'Game design & interfaces',
            creativeDescription: 'I explore interface design and visual asset creation for games, from UI/UX to characters.',
            gameDesign: 'Game design',
            visualAssets: 'Visual assets',
            characters: 'Characters',
            skillEmpty: 'There are no focus areas in this category yet.',
            projectsEyebrow: 'BUILT WITH CURIOSITY',
            projectsTitle: 'Featured project',
            allGithub: 'More on GitHub',
            gameProject: 'WEB GAME · PERSONAL PROJECT',
            projectDescription: 'An incremental clicker game with a shop, upgrades, collectible skins, and browser-saved progress.',
            liveDemo: 'Play demo',
            sourceCode: 'Source code',
            nextSteps: 'IN PROGRESS',
            nextTitle: 'Learning by building.',
            nextDescription: 'This portfolio will grow alongside my work in systems, programming, and design. Follow along on GitHub.',
            followGithub: 'Follow on GitHub',
            projectEmpty: 'No projects have been published in this category yet.',
            educationEyebrow: 'ALWAYS LEARNING',
            educationTitle: 'Education',
            currentStudy: 'CURRENT STUDIES',
            damTitle: 'Multiplatform Application Development (DAM)',
            damDescription: 'Computing student interested in systems, networking, and software development, with a particular focus on multiplatform and web applications.',
            systems: 'Systems',
            software: 'Software development',
            inProgress: 'In progress',
            contactEyebrow: 'SAY HELLO',
            contactTitle: 'Open to learning and collaborating.',
            contactDescription: 'Have an idea, an interesting project, or a junior opportunity? I would love to connect.',
            contactEmail: 'Send an email',
            contactPhone: 'Call',
            contactGithub: 'View GitHub',
            footerMade: 'Made with curiosity and code.',
            backTop: 'Back to top ↑',
            savePdf: 'Save as PDF',
            pdfNotice: 'Choose “Save as PDF” in the print dialog to download this portfolio.',
            menuOpen: 'Open menu',
            menuClose: 'Close menu',
            terminalWelcome: 'Marcos’s interactive terminal. Type <help> to see the commands.',
            terminalLabel: 'Type a command',
            commandUnknown: 'Command not found. Type “help” to see available commands.',
            commandHelp: 'Available commands:\n  help          Show this help\n  skills        Explore my areas of focus\n  projects      Open my featured project\n  contact       Open my GitHub profile\n  cat about.txt Read a short profile\n  clear         Clear the terminal\n  sudo          Try it (just for fun)',
            commandSkills: 'Areas of focus: systems & networks, web development, and game UI/UX. Currently studying DAM.',
            commandAbout: 'I’m Marcos Gómez (@maarquezz17), a DAM student interested in systems, software development, and creative game interfaces.',
            commandSudo: 'Nice try 🙂 This terminal is read-only. No superuser access needed.',
            commandProjects: 'Opening the Ricopio demo…',
            commandContact: 'Opening GitHub…',
            commandClear: 'Terminal cleared.'
        }
    };

    const themeToggle = document.querySelector('#themeToggle');
    const languageToggle = document.querySelector('#languageToggle');
    const themeIcon = themeToggle.querySelector('i');
    const languageLabel = languageToggle.querySelector('span');
    const siteControls = document.querySelector('#siteControls');
    const navLinks = document.querySelector('#navLinks');
    const navToggle = document.querySelector('#navToggle');
    const toast = document.querySelector('#toast');
    let toastTimer;
    let language = 'es';

    const spanishValues = new Map(
        [...document.querySelectorAll('[data-i18n]')].map(element => [element, element.textContent])
    );

    function readPreference(key) {
        try {
            return window.localStorage.getItem(key);
        } catch (error) {
            console.warn(`No se pudo leer la preferencia ${key}.`, error);
            return null;
        }
    }

    function savePreference(key, value) {
        try {
            window.localStorage.setItem(key, value);
        } catch (error) {
            console.warn(`No se pudo guardar la preferencia ${key}.`, error);
        }
    }

    function setTheme(isDark, persist = false) {
        document.body.classList.toggle('light-theme', !isDark);
        themeToggle.setAttribute('aria-pressed', String(isDark));
        themeIcon.classList.toggle('fa-moon', !isDark);
        themeIcon.classList.toggle('fa-sun', isDark);
        themeToggle.querySelector('span').textContent = isDark
            ? (language === 'es' ? 'Tema claro' : translations.en.themeLight)
            : (language === 'es' ? 'Tema oscuro' : translations.en.themeDark);

        if (persist) {
            savePreference('portfolio-theme', isDark ? 'dark' : 'light');
        }
    }

    function setLanguage(nextLanguage, persist = false) {
        language = nextLanguage;
        document.documentElement.lang = language;

        document.querySelectorAll('[data-i18n]').forEach(element => {
            if (element.closest('#themeToggle')) {
                return;
            }

            const englishText = translations.en[element.dataset.i18n];
            element.textContent = language === 'en' && englishText
                ? englishText
                : spanishValues.get(element);
        });

        languageLabel.textContent = language === 'es' ? 'EN' : 'ES';
        languageToggle.setAttribute(
            'aria-label',
            language === 'es' ? 'Cambiar idioma a inglés' : 'Switch language to Spanish'
        );
        siteControls.setAttribute(
            'aria-label',
            language === 'es' ? 'Preferencias del sitio' : 'Site preferences'
        );
        document.querySelector('#sideNav').setAttribute(
            'aria-label',
            language === 'es' ? 'Navegación principal' : 'Main navigation'
        );
        document.querySelectorAll('[data-filter-label]').forEach(group => {
            const type = group.dataset.filterLabel;
            group.setAttribute(
                'aria-label',
                language === 'es'
                    ? (type === 'skills' ? 'Filtrar áreas' : 'Filtrar proyectos')
                    : (type === 'skills' ? 'Filter focus areas' : 'Filter projects')
            );
        });
        document.querySelector('#closeTerminal').setAttribute(
            'aria-label',
            language === 'es' ? 'Cerrar terminal' : 'Close terminal'
        );
        document.querySelector('#terminalForm button').setAttribute(
            'aria-label',
            language === 'es' ? 'Ejecutar comando' : 'Run command'
        );
        navToggle.setAttribute(
            'aria-label',
            navToggle.getAttribute('aria-expanded') === 'true'
                ? (language === 'es' ? 'Cerrar menú' : 'Close menu')
                : (language === 'es' ? 'Abrir menú' : 'Open menu')
        );
        document.querySelector('#terminalInput').setAttribute(
            'aria-label',
            language === 'es' ? 'Escribe un comando' : 'Type a command'
        );
        document.title = language === 'es'
            ? 'Marcos Gómez — Sistemas, código y diseño'
            : 'Marcos Gómez — Systems, code & design';
        setTheme(!document.body.classList.contains('light-theme'));

        if (persist) {
            savePreference('portfolio-language', language);
        }
    }

    function showToast(message) {
        window.clearTimeout(toastTimer);
        toast.textContent = message;
        toast.classList.add('visible');
        toastTimer = window.setTimeout(() => toast.classList.remove('visible'), 3600);
    }

    setTheme(readPreference('portfolio-theme') !== 'light');
    setLanguage(readPreference('portfolio-language') === 'en' ? 'en' : 'es');
    document.querySelector('#currentYear').textContent = String(new Date().getFullYear());

    themeToggle.addEventListener('click', () => {
        setTheme(document.body.classList.contains('light-theme'), true);
    });

    languageToggle.addEventListener('click', () => {
        setLanguage(language === 'es' ? 'en' : 'es', true);
    });

    navToggle.addEventListener('click', () => {
        const isOpen = navToggle.getAttribute('aria-expanded') !== 'true';
        navToggle.setAttribute('aria-expanded', String(isOpen));
        navToggle.setAttribute(
            'aria-label',
            isOpen
                ? (language === 'es' ? 'Cerrar menú' : 'Close menu')
                : (language === 'es' ? 'Abrir menú' : 'Open menu')
        );
        document.querySelector('.site-nav').classList.toggle('menu-open', isOpen);
    });

    navLinks.addEventListener('click', event => {
        if (event.target.closest('a')) {
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.setAttribute('aria-label', language === 'es' ? 'Abrir menú' : 'Open menu');
            document.querySelector('.site-nav').classList.remove('menu-open');
        }
    });

    function setupFilters(buttonSelector, itemSelector, attribute, emptySelector) {
        const buttons = document.querySelectorAll(buttonSelector);
        const items = document.querySelectorAll(itemSelector);
        const emptyMessage = document.querySelector(emptySelector);

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset[attribute];
                let visibleCount = 0;

                buttons.forEach(option => {
                    const isActive = option === button;
                    option.classList.toggle('active', isActive);
                    option.setAttribute('aria-pressed', String(isActive));
                });

                items.forEach(item => {
                    const categories = item.dataset[attribute === 'skillFilter' ? 'skillCategory' : 'projectCategories'].split(' ');
                    const isVisible = filter === 'all' || categories.includes(filter);
                    item.hidden = !isVisible;
                    visibleCount += Number(isVisible);
                });

                emptyMessage.hidden = visibleCount !== 0;
            });
        });
    }

    setupFilters('[data-skill-filter]', '.focus-card', 'skillFilter', '#skillEmpty');
    setupFilters('[data-project-filter]', '.project-card', 'projectFilter', '#projectEmpty');

    const revealItems = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        revealItems.forEach(item => observer.observe(item));
    } else {
        revealItems.forEach(item => item.classList.add('is-visible'));
    }

    if ('IntersectionObserver' in window) {
        const sectionObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    document.querySelectorAll('.nav-links a').forEach(link => {
                        link.classList.toggle('active', link.hash === `#${entry.target.id}`);
                    });
                }
            });
        }, { rootMargin: '-32% 0px -58% 0px' });
        document.querySelectorAll('main section[id]').forEach(section => sectionObserver.observe(section));
    }

    const printButton = document.querySelector('#printCv');
    printButton.addEventListener('click', () => {
        showToast(language === 'es'
            ? 'En el diálogo de impresión, elige «Guardar como PDF» para descargar este portfolio.'
            : translations.en.pdfNotice);
        window.setTimeout(() => window.print(), 350);
    });

    const terminal = document.querySelector('#terminalDialog');
    const terminalForm = document.querySelector('#terminalForm');
    const terminalInput = document.querySelector('#terminalInput');
    const terminalOutput = document.querySelector('#terminalOutput');
    const projectDemo = 'https://maarquezz17.github.io/Jueguecito-ricopio/';
    const githubProfile = 'https://github.com/maarquezz17';

    function openTerminal() {
        if (typeof terminal.showModal === 'function') {
            terminal.showModal();
        } else {
            terminal.setAttribute('open', '');
        }
        terminalInput.focus();
    }

    document.querySelector('#openTerminal').addEventListener('click', openTerminal);
    document.querySelector('#closeTerminal').addEventListener('click', () => terminal.close());
    terminal.addEventListener('click', event => {
        if (event.target === terminal) {
            terminal.close();
        }
    });
    terminal.addEventListener('close', () => document.querySelector('#openTerminal').focus());

    terminalForm.addEventListener('submit', event => {
        event.preventDefault();
        const command = terminalInput.value.trim().toLowerCase();
        if (!command) {
            return;
        }

        const commandLine = document.createElement('p');
        commandLine.className = 'terminal-line terminal-command';
        commandLine.textContent = `➜ ${command}`;
        terminalOutput.append(commandLine);
        terminalInput.value = '';

        if (command === 'clear') {
            terminalOutput.replaceChildren();
            return;
        }

        const responses = {
            help: translations.en.commandHelp,
            skills: translations.en.commandSkills,
            'cat about.txt': translations.en.commandAbout,
            sudo: translations.en.commandSudo
        };

        if (command === 'projects' || command === 'contact') {
            const isProject = command === 'projects';
            const response = document.createElement('p');
            response.className = 'terminal-line terminal-result';
            response.textContent = language === 'es'
                ? (isProject ? 'Abriendo la demo de Ricopio…' : 'Abriendo GitHub…')
                : (isProject ? translations.en.commandProjects : translations.en.commandContact);
            terminalOutput.append(response);
            window.open(isProject ? projectDemo : githubProfile, '_blank', 'noopener,noreferrer');
        } else {
            const response = document.createElement('p');
            response.className = `terminal-line ${responses[command] ? 'terminal-result' : 'terminal-error'}`;
            const englishResponse = responses[command];
            const spanishResponses = {
                help: 'Comandos disponibles:\n  help          Mostrar esta ayuda\n  skills        Ver mis áreas de enfoque\n  projects      Abrir mi proyecto destacado\n  contact       Abrir mi perfil de GitHub\n  cat about.txt Leer una breve presentación\n  clear         Limpiar la terminal\n  sudo          Prueba (solo por diversión)',
                skills: 'Áreas de enfoque: sistemas y redes, desarrollo web y UI/UX para videojuegos. Actualmente estudio DAM.',
                'cat about.txt': 'Soy Marcos Gómez (@maarquezz17), estudiante de DAM interesado en sistemas, desarrollo de software e interfaces creativas para videojuegos.',
                sudo: 'Buen intento 🙂 Esta terminal es de solo lectura. No hace falta acceso de superusuario.',
                unknown: 'Comando no encontrado. Escribe «help» para ver los comandos disponibles.'
            };
            response.textContent = language === 'es'
                ? (spanishResponses[command] || spanishResponses.unknown)
                : (englishResponse || translations.en.commandUnknown);
            terminalOutput.append(response);
        }

        terminal.querySelector('.terminal-body').scrollTop = terminal.querySelector('.terminal-body').scrollHeight;
    });
});
