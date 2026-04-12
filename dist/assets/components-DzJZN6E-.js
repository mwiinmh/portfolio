var e=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports);(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var t=e((()=>{var e={name:`Mwindjou`,github:`https://github.com/mwiinmh`,linkedin:`https://linkedin.com/in/mwindjou-mhoumadi-08a2141b5/`,email:`contact@mwindjou.fr`,year:new Date().getFullYear()},t=location.pathname.split(`/`).pop()||`index.html`;function n(){let n=[{label:`Accueil`,href:`index.html#home`,anchor:!0,page:`index.html`},{label:`À propos`,href:`index.html#about`,anchor:!0,page:`index.html`},{label:`Parcours`,href:`index.html#experience`,anchor:!0,page:`index.html`},{label:`Projets`,href:`projects.html`,anchor:!1,page:`projects.html`},{label:`Veille`,href:`veille.html`,anchor:!1,page:`veille.html`},{label:`Contact`,href:`index.html#contact`,anchor:!0,page:`index.html`}],i=[`fa-house`,`fa-user`,`fa-briefcase`,`fa-folder-open`,`fa-rss`,`fa-envelope`],a=n.map(e=>{let n;return n=e.anchor?`nav-item nav-item--idle`:t===e.page?`nav-item nav-item--active`:`nav-item nav-item--idle`,`<a href="${e.href}" class="${n}">${e.label}</a>`}).join(``),o=n.map((e,n)=>{let r;return r=e.anchor?`mobile-item`:t===e.page?`mobile-item mobile-item--active`:`mobile-item`,`<a href="${e.href}" class="${r}">
            <i class="fa-solid ${i[n]} w-4 text-center" style="color:var(--accent)"></i>
            ${e.label}
        </a>`}).join(``);document.getElementById(`nav-placeholder`).innerHTML=`
    <nav class="glass-nav fixed w-full top-0 z-50">
        <div class="max-w-7xl mx-auto px-5 sm:px-8 lg:px-14">
            <div class="flex items-center justify-between" style="height:62px">

                <a href="index.html#home" class="nav-logo">${e.name}</a>

                <div class="hidden md:flex items-center gap-0.5">
                    ${a}
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
                ${o}
            </div>
        </div>
    </nav>`,r()}function r(){let e=document.documentElement,n=localStorage.getItem(`theme`),r=window.matchMedia(`(prefers-color-scheme: dark)`).matches;function a(t){e.setAttribute(`data-theme`,t),localStorage.setItem(`theme`,t);let n=t===`dark`;[`icon-light`,`icon-light-mobile`].forEach(e=>document.getElementById(e)?.classList.toggle(`hidden`,n)),[`icon-dark`,`icon-dark-mobile`].forEach(e=>document.getElementById(e)?.classList.toggle(`hidden`,!n))}a(n??(r?`dark`:`light`)),document.getElementById(`theme-toggle`)?.addEventListener(`click`,()=>a(e.getAttribute(`data-theme`)===`light`?`dark`:`light`)),document.getElementById(`theme-toggle-mobile`)?.addEventListener(`click`,()=>a(e.getAttribute(`data-theme`)===`light`?`dark`:`light`));let o=document.getElementById(`mobile-menu`),s=document.getElementById(`hamburger-icon`),c=document.getElementById(`close-icon`);if(document.getElementById(`mobile-menu-btn`)?.addEventListener(`click`,()=>{let e=!o.classList.contains(`hidden`);o.classList.toggle(`hidden`,e),s.classList.toggle(`hidden`,!e),c.classList.toggle(`hidden`,e)}),o?.querySelectorAll(`a`).forEach(e=>e.addEventListener(`click`,()=>{o.classList.add(`hidden`),s.classList.remove(`hidden`),c.classList.add(`hidden`)})),t===`index.html`||t===``){function e(){let e=[...document.querySelectorAll(`section[id]`)],t=window.innerHeight/2,n=null,r=1/0;e.forEach(e=>{let i=e.getBoundingClientRect(),a=i.top+i.height/2,o=Math.abs(a-t);o<r&&(r=o,n=e)}),n&&i(n.id)}e();let t=!1;window.addEventListener(`scroll`,()=>{t||=(requestAnimationFrame(()=>{e(),t=!1}),!0)},{passive:!0})}}function i(e){document.querySelectorAll(`a.nav-item`).forEach(t=>{let n=t.getAttribute(`href`)||``;if(!n.includes(`#`))return;let r=n.includes(`#`+e);t.classList.toggle(`nav-item--active`,r),t.classList.toggle(`nav-item--idle`,!r)})}function a(){document.getElementById(`footer-placeholder`).innerHTML=`
    <footer class="py-14" style="background:var(--bg-color)">
        <div class="max-w-7xl mx-auto px-6 sm:px-10 lg:px-14">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10" style="border-bottom:1px solid var(--border-color)">

                <div>
                    <a href="index.html#home" class="nav-logo block mb-4">${e.name}</a>
                    <p style="font-size:.85rem;color:var(--text-dim);line-height:1.75;max-width:260px">
                        Étudiant BTS SIO SISR, alternant chez REDVISE. Passionné par l'infrastructure et la cybersécurité.
                    </p>
                    <div class="flex gap-3 mt-5">
                        <a href="${e.github}" target="_blank" class="nav-icon-btn" aria-label="GitHub">
                            <i class="fa-brands fa-github"></i>
                        </a>
                        <a href="${e.linkedin}" target="_blank" class="nav-icon-btn" aria-label="LinkedIn">
                            <i class="fa-brands fa-linkedin"></i>
                        </a>
                        <a href="assets/cv/CV_Mwindjou.pdf" download class="nav-icon-btn" aria-label="CV">
                            <i class="fa-solid fa-file-arrow-down"></i>
                        </a>
                    </div>
                </div>

                <div>
                    <p style="font-family:'JetBrains Mono',monospace;font-size:.65rem;letter-spacing:.12em;text-transform:uppercase;color:var(--accent);margin-bottom:1rem">Navigation</p>
                    <div class="flex flex-col gap-2">
                        <a href="index.html#home"        style="font-size:.875rem;color:var(--text-dim);text-decoration:none;transition:color .15s" onmouseenter="this.style.color='var(--text-main)'" onmouseleave="this.style.color='var(--text-dim)'">Accueil</a>
                        <a href="index.html#about"       style="font-size:.875rem;color:var(--text-dim);text-decoration:none;transition:color .15s" onmouseenter="this.style.color='var(--text-main)'" onmouseleave="this.style.color='var(--text-dim)'">À propos</a>
                        <a href="index.html#experience"  style="font-size:.875rem;color:var(--text-dim);text-decoration:none;transition:color .15s" onmouseenter="this.style.color='var(--text-main)'" onmouseleave="this.style.color='var(--text-dim)'">Parcours</a>
                        <a href="projects.html"          style="font-size:.875rem;color:var(--text-dim);text-decoration:none;transition:color .15s" onmouseenter="this.style.color='var(--text-main)'" onmouseleave="this.style.color='var(--text-dim)'">Projets</a>
                        <a href="veille.html"            style="font-size:.875rem;color:var(--text-dim);text-decoration:none;transition:color .15s" onmouseenter="this.style.color='var(--text-main)'" onmouseleave="this.style.color='var(--text-dim)'">Veille</a>
                        <a href="index.html#contact"     style="font-size:.875rem;color:var(--text-dim);text-decoration:none;transition:color .15s" onmouseenter="this.style.color='var(--text-main)'" onmouseleave="this.style.color='var(--text-dim)'">Contact</a>
                    </div>
                </div>

                <div>
                    <p style="font-family:'JetBrains Mono',monospace;font-size:.65rem;letter-spacing:.12em;text-transform:uppercase;color:var(--accent);margin-bottom:1rem">Contact</p>
                    <div class="flex flex-col gap-3">
                        <a href="mailto:${e.email}" style="font-size:.875rem;color:var(--text-dim);text-decoration:none;display:flex;align-items:center;gap:.5rem" onmouseenter="this.style.color='var(--text-main)'" onmouseleave="this.style.color='var(--text-dim)'">
                            <i class="fa-solid fa-envelope" style="color:var(--accent);width:14px"></i> ${e.email}
                        </a>
                        <a href="${e.linkedin}" target="_blank" style="font-size:.875rem;color:var(--text-dim);text-decoration:none;display:flex;align-items:center;gap:.5rem" onmouseenter="this.style.color='var(--text-main)'" onmouseleave="this.style.color='var(--text-dim)'">
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
                    © ${e.year} ${e.name} Mhoumadi — Tous droits réservés
                </p>
                <p style="font-family:'JetBrains Mono',monospace;font-size:.65rem;color:var(--text-dim)">
                    HTML · CSS · JS · Tailwind
                </p>
            </div>
        </div>
    </footer>`}function o(){let e=new IntersectionObserver(t=>{t.forEach(t=>{t.isIntersecting&&(t.target.classList.add(`visible`),e.unobserve(t.target))})},{threshold:.1});document.querySelectorAll(`.reveal`).forEach(t=>e.observe(t))}document.addEventListener(`DOMContentLoaded`,()=>{n(),a(),o()})}));export{t};