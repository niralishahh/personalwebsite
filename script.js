// Light/dark theme toggle (the saved choice is applied in index.html before paint)
const root = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');

themeToggle.addEventListener('click', () => {
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const current = root.dataset.theme || (systemDark ? 'dark' : 'light');
    const next = current === 'dark' ? 'light' : 'dark';

    root.dataset.theme = next;
    try {
        localStorage.setItem('theme', next);
    } catch (e) {}
});

// Active navigation link highlighting
const navLinks = document.querySelectorAll('.nav-center a');

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
    });
}, {
    // A section counts as current while it crosses a band near the top of the screen
    rootMargin: '-20% 0px -70% 0px'
});

document.querySelectorAll('section[id]').forEach(section => sectionObserver.observe(section));
