/* ============================================
   ОСНОВНОЙ СКРИПТ САЙТА-РЕЗЮМЕ
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initMobileMenu();
    initScrollSpy();
    initRevealAnimations();
    initScrollTopButton();
    initSmoothScroll();
});

/* ============================================
   ШАПКА: изменение при прокрутке
   ============================================ */
function initHeader() {
    const header = document.getElementById('header');
    if (!header) return;

    const handleScroll = () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
}

/* ============================================
   МОБИЛЬНОЕ МЕНЮ
   ============================================ */
function initMobileMenu() {
    const toggle = document.getElementById('navToggle');
    const menu = document.getElementById('navMenu');
    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        menu.classList.toggle('active');
    });

    // Закрытие меню при клике на пункт
    menu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            menu.classList.remove('active');
        });
    });

    // Закрытие меню при клике вне
    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !toggle.contains(e.target)) {
            toggle.classList.remove('active');
            menu.classList.remove('active');
        }
    });
}

/* ============================================
   ПОДСВЕТКА АКТИВНОГО ПУНКТА МЕНЮ
   ============================================ */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0
    });

    sections.forEach(section => observer.observe(section));
}

/* ============================================
   АНИМАЦИЯ ПОЯВЛЕНИЯ БЛОКОВ
   ============================================ */
function initRevealAnimations() {
    const reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    // Проверка поддержки IntersectionObserver
    if (!('IntersectionObserver' in window)) {
        reveals.forEach(el => el.classList.add('visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Небольшая задержка для каскадного эффекта
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 80);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => observer.observe(el));
}

/* ============================================
   КНОПКА "НАВЕРХ"
   ============================================ */
function initScrollTopButton() {
    const btn = document.getElementById('scrollTop');
    if (!btn) return;

    const handleScroll = () => {
        if (window.scrollY > 600) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    btn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ============================================
   ПЛАВНАЯ ПРОКРУТКА
   ============================================ */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || href.length < 2) return;

            const target = document.querySelector(href);
            if (!target) return;

            e.preventDefault();
            const offsetTop = target.getBoundingClientRect().top + window.scrollY - 70;

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        });
    });
}

/* ============================================
   АНИМАЦИЯ СЧЁТЧИКОВ (опционально)
   ============================================ */
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number, .badge-number');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const text = el.textContent.trim();
                const match = text.match(/^(\d+)(.*)$/);

                if (match) {
                    const target = parseInt(match[1], 10);
                    const suffix = match[2];
                    let current = 0;
                    const duration = 1500;
                    const step = Math.max(1, Math.floor(target / (duration / 16)));

                    const update = () => {
                        current += step;
                        if (current >= target) {
                            el.textContent = target + suffix;
                        } else {
                            el.textContent = current + suffix;
                            requestAnimationFrame(update);
                        }
                    };

                    update();
                }

                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
}

// Запуск анимации счётчиков при загрузке
document.addEventListener('DOMContentLoaded', animateCounters);

/* ============================================
   КОНСОЛЬНАЯ ИНФОРМАЦИЯ
   ============================================ */
console.log('%cРезюме Лещенко Т.В.', 'color: #c9a961; font-size: 20px; font-weight: bold;');
console.log('%cВедущий специалист по тендерам', 'color: #0a2540; font-size: 14px;');
console.log('%cСайт создан в ноябре 2026 г.', 'color: #8a96a8; font-size: 12px;');