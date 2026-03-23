/* ============================================================
   components.js — Nav + Footer injectés sur toutes les pages
   ============================================================ */

const SITE = {
    name:     'Mwindjou',
    github:   'https://github.com/mwiinmh',
    linkedin: 'https://linkedin.com/in/mwindjou-mhoumadi-08a2141b5/',
    email:    'contact@mwindjou.fr',
    year:     new Date().getFullYear(),
};

/* ── Détection page active ── */
const currentPage = location.pathname.split('/').pop() || 'index.html';

function isActive(page) {
    return currentPage === page ? 'nav-item nav-item--active' : 'nav-item nav-item--idle';
}
function isMobileActive(page) {
    return currentPage === page ? 'mobile-item mobile-item--active' : 'mobile-item';
}

/* ══════════════════════════════════════════════
   NAV
══════════════════════════════════════════════ */
function renderNav() {
    const nav = [
        { label: 'Accueil',     href: 'index.html',    anchor: '#home',    page: 'index.html'    },
        { label: 'À propos',    href: 'index.html#about',  anchor: '#about',   page: 'index.html'    },
        { label: 'Compétences', href: 'index.html#skills', anchor: '#skills',  page: 'index.html'    },
        { label: 'Projets',     href: 'projects.html',  anchor: '',         page: 'projects.html' },
        { label: 'Veille',      href: 'veille.html',    anchor: '',         page: 'veille.html'   },
        { label: 'Contact',     href: 'index.html#contact', anchor: '#contact', page: 'index.html' },
    ];

    const mobileIcons = ['fa-house','fa-user','fa-microchip','fa-folder-open','fa-rss','fa-envelope'];

    const desktopLinks = nav.map(n =>
        `<a href="${n.href}" class="${isActive(n.page)}">${n.label}</a>`
    ).join('');

    const mobileLinks = nav.map((n, i) =>
        `<a href="${n.href}" class="${isMobileActive(n.page)}">
            <i class="fa-solid ${mobileIcons[i]} w-4 text-center" style="color:var(--accent)"></i>
            ${n.label}
        </a>`
    ).join('');

    document.getElementById('nav-placeholder').innerHTML = `
    <nav class="glass-nav fixed w-full top-0 z-50">
        <div class="max-w-7xl mx-auto px-5 sm:px-8 lg:px-14">
            <div class="flex items-center justify-between" style="height:62px">

                <a href="index.html" class="nav-logo">${SITE.name}</a>

                <div class="hidden md:flex items-center gap-0.5">
                    ${desktopLinks}
                    <div class="nav-sep"></div>
                    <button id="theme-toggle" class="nav-icon-btn" aria-label="Thème">
                        <i class="fa-solid fa-sun hidden" id="icon-light"></i>
                        <i class="fa-solid fa-moon" id="icon-dark"></i>
                    </button>
                </div>

                <div class="md:hidden flex items-center gap-2">
                    <button id="theme-toggle-mobile" class="nav-icon-btn" aria-label="Thème">
                        <i class="fa-solid fa-sun hidden" id="icon-light-mobile"></i>
                        <i class="fa-solid fa-moon" id="icon-dark-mobile"></i>
                    </button>
                    <button id="mobile-menu-btn" class="nav-icon-btn" aria-label="Menu">
                        <i class="fa-solid fa-bars text-base" id="hamburger-icon"></i>
                        <i class="fa-solid fa-xmark text-base hidden" id="close-icon"></i>
                    </button>
                </div>
            </div>
        </div>

        <div id="mobile-menu" class="hidden md:hidden mobile-panel">
            <div class="px-5 py-4 space-y-0.5">
                ${mobileLinks}
            </div>
        </div>
    </nav>`;

    initNav();
}

function initNav() {
    const html    = document.documentElement;
    const saved   = localStorage.getItem('theme');
    const sysDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    function applyTheme(t) {
        html.setAttribute('data-theme', t);
        localStorage.setItem('theme', t);
        const d = t === 'dark';
        ['icon-light','icon-light-mobile'].forEach(id => document.getElementById(id)?.classList.toggle('hidden', d));
        ['icon-dark', 'icon-dark-mobile' ].forEach(id => document.getElementById(id)?.classList.toggle('hidden', !d));
    }
    applyTheme(saved ?? (sysDark ? 'dark' : 'light'));

    document.getElementById('theme-toggle')?.addEventListener('click',
        () => applyTheme(html.getAttribute('data-theme') === 'light' ? 'dark' : 'light'));
    document.getElementById('theme-toggle-mobile')?.addEventListener('click',
        () => applyTheme(html.getAttribute('data-theme') === 'light' ? 'dark' : 'light'));

    const menu    = document.getElementById('mobile-menu');
    const hamIcon = document.getElementById('hamburger-icon');
    const xIcon   = document.getElementById('close-icon');

    document.getElementById('mobile-menu-btn')?.addEventListener('click', () => {
        const open = !menu.classList.contains('hidden');
        menu.classList.toggle('hidden', open);
        hamIcon.classList.toggle('hidden', !open);
        xIcon.classList.toggle('hidden', open);
    });
    menu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        menu.classList.add('hidden');
        hamIcon.classList.remove('hidden');
        xIcon.classList.add('hidden');
    }));

    /* Highlight nav au scroll sur index.html uniquement */
    if (currentPage === 'index.html' || currentPage === '') {
        const sections = document.querySelectorAll('section[id]');
        const links    = [...document.querySelectorAll('a.nav-item')];

        const io = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (!e.isIntersecting) return;
                links.forEach(l => {
                    const href = l.getAttribute('href') || '';
                    if (!href.includes('#')) return;
                    const hit = href.includes('#' + e.target.id);
                    l.classList.toggle('nav-item--active', hit);
                    l.classList.toggle('nav-item--idle',  !hit);
                });
            });
        }, { rootMargin: '-35% 0px -60% 0px', threshold: 0 });

        sections.forEach(s => io.observe(s));
        setActiveLink('home');
    }
}

function setActiveLink(id) {
    document.querySelectorAll('a.nav-item').forEach(l => {
        const href = l.getAttribute('href') || '';
        if (!href.includes('#')) return;
        const hit = href.includes('#' + id);
        l.classList.toggle('nav-item--active', hit);
        l.classList.toggle('nav-item--idle',  !hit);
    });
}

/* ══════════════════════════════════════════════
   FOOTER
══════════════════════════════════════════════ */
function renderFooter() {
    document.getElementById('footer-placeholder').innerHTML = `
    <footer class="py-14" style="background:var(--bg-color)">
        <div class="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10" style="border-bottom:1px solid var(--border-color)">

                <!-- Col 1 -->
                <div>
                    <a href="index.html" class="nav-logo block mb-4">${SITE.name}</a>
                    <p style="font-size:.85rem;color:var(--text-dim);line-height:1.75;max-width:260px">
                        Étudiant BTS SIO SISR, alternant chez REDVISE. Passionné par l'infrastructure et la cybersécurité.
                    </p>
                    <div class="flex gap-3 mt-5">
                        <a href="${SITE.github}" target="_blank" class="nav-icon-btn" aria-label="GitHub">
                            <i class="fa-brands fa-github"></i>
                        </a>
                        <a href="${SITE.linkedin}" target="_blank" class="nav-icon-btn" aria-label="LinkedIn">
                            <i class="fa-brands fa-linkedin"></i>
                        </a>
                        <a href="assets/cv/CV_Mwindjou.pdf" download class="nav-icon-btn" aria-label="CV">
                            <i class="fa-solid fa-file-arrow-down"></i>
                        </a>
                    </div>
                </div>

                <!-- Col 2 -->
                <div>
                    <p style="font-family:'JetBrains Mono',monospace;font-size:.65rem;letter-spacing:.12em;text-transform:uppercase;color:var(--accent);margin-bottom:1rem">Navigation</p>
                    <div class="flex flex-col gap-2">
                        <a href="index.html"          style="font-size:.875rem;color:var(--text-dim);text-decoration:none;transition:color .15s" onmouseenter="this.style.color='var(--text-main)'" onmouseleave="this.style.color='var(--text-dim)'">Accueil</a>
                        <a href="index.html#about"    style="font-size:.875rem;color:var(--text-dim);text-decoration:none;transition:color .15s" onmouseenter="this.style.color='var(--text-main)'" onmouseleave="this.style.color='var(--text-dim)'">À propos</a>
                        <a href="projects.html"       style="font-size:.875rem;color:var(--text-dim);text-decoration:none;transition:color .15s" onmouseenter="this.style.color='var(--text-main)'" onmouseleave="this.style.color='var(--text-dim)'">Projets</a>
                        <a href="veille.html"         style="font-size:.875rem;color:var(--text-dim);text-decoration:none;transition:color .15s" onmouseenter="this.style.color='var(--text-main)'" onmouseleave="this.style.color='var(--text-dim)'">Veille</a>
                        <a href="index.html#contact"  style="font-size:.875rem;color:var(--text-dim);text-decoration:none;transition:color .15s" onmouseenter="this.style.color='var(--text-main)'" onmouseleave="this.style.color='var(--text-dim)'">Contact</a>
                    </div>
                </div>

                <!-- Col 3 -->
                <div>
                    <p style="font-family:'JetBrains Mono',monospace;font-size:.65rem;letter-spacing:.12em;text-transform:uppercase;color:var(--accent);margin-bottom:1rem">Contact</p>
                    <div class="flex flex-col gap-3">
                        <a href="mailto:${SITE.email}" style="font-size:.875rem;color:var(--text-dim);text-decoration:none;display:flex;align-items:center;gap:.5rem" onmouseenter="this.style.color='var(--text-main)'" onmouseleave="this.style.color='var(--text-dim)'">
                            <i class="fa-solid fa-envelope" style="color:var(--accent);width:14px"></i> ${SITE.email}
                        </a>
                        <a href="${SITE.linkedin}" target="_blank" style="font-size:.875rem;color:var(--text-dim);text-decoration:none;display:flex;align-items:center;gap:.5rem" onmouseenter="this.style.color='var(--text-main)'" onmouseleave="this.style.color='var(--text-dim)'">
                            <i class="fa-brands fa-linkedin" style="color:#60a5fa;width:14px"></i> linkedin.com/in/mwindjou
                        </a>
                        <span style="font-size:.875rem;color:var(--text-dim);display:flex;align-items:center;gap:.5rem">
                            <i class="fa-solid fa-location-dot" style="color:#4ade80;width:14px"></i> Paris, France
                        </span>
                    </div>
                </div>
            </div>

            <div class="flex flex-col sm:flex-row justify-between items-center gap-3 pt-8">
                <p style="font-family:'JetBrains Mono',monospace;font-size:.65rem;color:var(--text-dim)">
                    © ${SITE.year} ${SITE.name} Mhoumadi — Tous droits réservés
                </p>
                <p style="font-family:'JetBrains Mono',monospace;font-size:.65rem;color:var(--text-dim)">
                    HTML · CSS · JS · Tailwind
                </p>
            </div>
        </div>
    </footer>`;
}

/* ══════════════════════════════════════════════
   REVEAL AU SCROLL
══════════════════════════════════════════════ */
function initReveal() {
    const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

/* ══════════════════════════════════════════════
   INIT
══════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
    renderNav();
    renderFooter();
    initReveal();
});
