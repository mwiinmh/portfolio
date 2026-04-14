/* ============================================================
   components.js — Nav + Footer injectés sur toutes les pages
   ============================================================ */

const SITE = {
    name:     'Mwindjou',
    github:   'https://github.com/mwiinmh',
    linkedin: 'https://linkedin.com/in/mwindjou-mhoumadi-08a2141b5/',
    email:    'mwindjoumhoumadi78@hotmail.com',
    year:     new Date().getFullYear(),
};

const currentPage = location.pathname.split('/').pop() || 'index.html';

/* ══════════════════════════════════════════════
   NAV
══════════════════════════════════════════════ */
function renderNav() {
    const nav = [
        { label: 'Accueil',  href: 'index.html#home',       anchor: true,  page: 'index.html'    },
        { label: 'À propos', href: 'index.html#about',       anchor: true,  page: 'index.html'    },
        { label: 'Parcours', href: 'index.html#experience',  anchor: true,  page: 'index.html'    },
        { label: 'Projets',  href: 'projects.html',          anchor: false, page: 'projects.html' },
        { label: 'Veille',   href: 'veille.html',            anchor: false, page: 'veille.html'   },
        { label: 'Contact',  href: 'index.html#contact',     anchor: true,  page: 'index.html'    },
    ];

    const mobileIcons = ['fa-house','fa-user','fa-briefcase','fa-folder-open','fa-rss','fa-envelope'];

    // Les liens avec ancre démarrent toujours en idle — le scroll gère l'activation
    // Les liens sans ancre (Projets, Veille) utilisent la détection de page classique
    const desktopLinks = nav.map(n => {
        let cls;
        if (n.anchor) {
            cls = 'nav-item nav-item--idle';
        } else {
            cls = currentPage === n.page ? 'nav-item nav-item--active' : 'nav-item nav-item--idle';
        }
        return `<a href="${n.href}" class="${cls}">${n.label}</a>`;
    }).join('');

    const mobileLinks = nav.map((n, i) => {
        let cls;
        if (n.anchor) {
            cls = 'mobile-item';
        } else {
            cls = currentPage === n.page ? 'mobile-item mobile-item--active' : 'mobile-item';
        }
        return `<a href="${n.href}" class="${cls}">
            <i class="fa-solid ${mobileIcons[i]} w-4 text-center" style="color:var(--accent)"></i>
            ${n.label}
        </a>`;
    }).join('');

    document.getElementById('nav-placeholder').innerHTML = `
    <nav class="glass-nav fixed w-full top-0 z-50">
        <div class="max-w-7xl mx-auto px-5 sm:px-8 lg:px-14">
            <div class="flex items-center justify-between" style="height:62px">

                <a href="index.html#home" class="nav-logo">${SITE.name}</a>

                <div class="hidden md:flex items-center gap-0.5">
                    ${desktopLinks}
                </div>

                <div class="md:hidden flex items-center gap-2">
                    <button id="mobile-menu-btn" class="nav-icon-btn" aria-label="Menu" aria-expanded="false">
                        <i class="fa-solid fa-bars" id="hamburger-icon"></i>
                        <i class="fa-solid fa-xmark" id="close-icon"></i>
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
    function applyTheme(t) {
        html.setAttribute('data-theme', t);
        localStorage.setItem('theme', t);
        updateFabIcon(t);
    }
    // Sync l'icône initiale sans re-déclencher l'attribut (déjà mis par le head)
    updateFabIcon(html.getAttribute('data-theme'));

    document.getElementById('theme-fab')?.addEventListener('click',
        () => applyTheme(html.getAttribute('data-theme') === 'light' ? 'dark' : 'light'));

    const menu    = document.getElementById('mobile-menu');
    const menuBtn = document.getElementById('mobile-menu-btn');
    menuBtn?.addEventListener('click', () => {
        const isOpen = menuBtn.getAttribute('aria-expanded') === 'true';
        const nextState = !isOpen;
        menuBtn.setAttribute('aria-expanded', nextState.toString());
        menu?.classList.toggle('hidden', !nextState);
    });
    menu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
        menu.classList.add('hidden');
        menuBtn?.setAttribute('aria-expanded', 'false');
    }));

    /* ── Highlight nav au scroll — index.html uniquement ──
       On cherche la section dont le centre est le plus proche
       du milieu de l'écran → une seule active à la fois.
    ──────────────────────────────────────────────────────── */
    if (currentPage === 'index.html' || currentPage === '') {

        function updateActiveNav() {
            const sections = [...document.querySelectorAll('section[id]')];
            const mid      = window.innerHeight / 2;
            let   closest  = null;
            let   minDist  = Infinity;

            sections.forEach(s => {
                const rect   = s.getBoundingClientRect();
                const center = rect.top + rect.height / 2;
                const dist   = Math.abs(center - mid);
                if (dist < minDist) { minDist = dist; closest = s; }
            });

            if (closest) setActiveLink(closest.id);
        }

        // Au chargement de la page
        updateActiveNav();

        // Au scroll (throttlé via requestAnimationFrame)
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => { updateActiveNav(); ticking = false; });
                ticking = true;
            }
        }, { passive: true });
    }
}

function setActiveLink(id) {
    document.querySelectorAll('a.nav-item').forEach(l => {
        const href = l.getAttribute('href') || '';
        // Ne toucher que les liens avec ancre
        if (!href.includes('#')) return;
        const hit = href.includes('#' + id);
        l.classList.toggle('nav-item--active', hit);
        l.classList.toggle('nav-item--idle',  !hit);
    });
}

/* ══════════════════════════════════════════════
   Mise à jour de l'icône du FAB selon le thème
══════════════════════════════════════════════ */
function updateFabIcon(theme) {
    const icon = document.getElementById('fab-icon');
    if (!icon) return;
    if (theme === 'dark') {
        // Mode sombre actif → afficher soleil (pour passer au clair)
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        // Mode clair actif → afficher lune (pour passer au sombre)
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

/* ══════════════════════════════════════════════
   FOOTER
══════════════════════════════════════════════ */
function renderFooter() {
    /* ── Bouton flottant de thème (FAB) ───────────────────────────── */
    const fab = document.createElement('button');
    fab.id = 'theme-fab';
    fab.setAttribute('aria-label', 'Changer de thème');
    // Une seule icône, sa classe (fa-sun ou fa-moon) est changée dynamiquement
    fab.innerHTML = `<i class="fa-solid fa-sun" id="fab-icon"></i>`;
    document.body.appendChild(fab);

    // Synchroniser l'icône avec le thème actuel
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    updateFabIcon(currentTheme);

    fab.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', current);
        localStorage.setItem('theme', current);
        updateFabIcon(current);
    });

    document.getElementById('footer-placeholder').innerHTML = `
    <footer class="py-20 mt-10" style="background:var(--bg-color); border-top: 1px solid var(--border-color)">
        <div class="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16">
                
                <!-- Brand & Bio -->
                <div class="lg:col-span-2">
                    <a href="index.html#home" class="nav-logo block mb-6" style="font-size: 1.4rem">${SITE.name}</a>
                    <p style="font-size: 0.9rem; color: var(--text-dim); line-height: 1.8; max-width: 380px; margin-bottom: 2rem">
                        Étudiant passionné par l'infrastructure et la cybersécurité, j'accompagne les entreprises dans la sécurisation et l'optimisation de leurs systèmes d'information.
                    </p>
                    <div class="flex gap-4">
                        <a href="${SITE.github}" target="_blank" class="footer-social-btn" aria-label="GitHub">
                            <i class="fa-brands fa-github"></i>
                        </a>
                        <a href="${SITE.linkedin}" target="_blank" class="footer-social-btn" aria-label="LinkedIn">
                            <i class="fa-brands fa-linkedin"></i>
                        </a>
                        <a href="assets/cv/CV_Mwindjou.pdf" download class="footer-social-btn" aria-label="Télécharger CV">
                            <i class="fa-solid fa-file-arrow-down"></i>
                        </a>
                    </div>
                </div>

                <!-- Fast Links -->
                <div>
                    <h4 style="font-family:'Outfit',sans-serif; font-size: 1rem; font-weight: 700; color: var(--text-main); margin-bottom: 1.5rem">Navigation</h4>
                    <nav class="flex flex-col gap-4">
                        <a href="index.html#home" class="footer-nav-link">Accueil</a>
                        <a href="index.html#about" class="footer-nav-link">À propos</a>
                        <a href="index.html#experience" class="footer-nav-link">Parcours</a>
                        <a href="projects.html" class="footer-nav-link">Projets</a>
                        <a href="veille.html" class="footer-nav-link">Veille</a>
                    </nav>
                </div>

                <!-- Contact Info -->
                <div>
                    <h4 style="font-family:'Outfit',sans-serif; font-size: 1rem; font-weight: 700; color: var(--text-main); margin-bottom: 1.5rem">Contact</h4>
                    <div class="flex flex-col gap-5">
                        <a href="mailto:${SITE.email}" class="footer-contact-item">
                            <i class="fa-solid fa-envelope" style="color:var(--accent)"></i> 
                            <div>
                                <p style="font-size: 0.65rem; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.1rem">Email</p>
                                <p style="font-size: 0.85rem">${SITE.email}</p>
                            </div>
                        </a>
                        <div class="footer-contact-item">
                            <i class="fa-solid fa-location-dot" style="color:#4ade80"></i>
                            <div>
                                <p style="font-size: 0.65rem; color: var(--text-dim); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.1rem">Localisation</p>
                                <p style="font-size: 0.85rem">Paris, France</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <!-- Bottom Bar -->
            <div class="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                <p style="font-family:'JetBrains Mono',monospace; font-size: 0.7rem; color: var(--text-dim)">
                    © ${SITE.year} ${SITE.name} Mhoumadi — Tous droits réservés
                </p>
                
                <button onclick="window.scrollTo({top: 0, behavior: 'smooth'})" class="scroll-top-btn" aria-label="Retour en haut">
                    <i class="fa-solid fa-arrow-up"></i>
                </button>
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
   INTERACTION MARQUEE (PAUSE AU CLIC)
══════════════════════════════════════════════ */
function initMarquee() {
    document.querySelectorAll('.tech-marquee').forEach(m => {
        m.addEventListener('click', () => {
            m.classList.toggle('is-paused');
        });
    });
}

/* ══════════════════════════════════════════════
   INIT
══════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
    renderNav();
    renderFooter();
    initReveal();
    initMarquee();
});