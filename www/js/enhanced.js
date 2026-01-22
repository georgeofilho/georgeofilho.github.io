/**
 * Enhanced CV - JavaScript
 * Handles dark mode, language switching, animations and interactions
 */

// ========== Dark Mode Toggle ==========
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const theme = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeIcon(theme);
});

function updateThemeIcon(theme) {
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// ========== Fix Navigation Menu Highlighting ==========
// Reconfigure scrollspy with proper offset for fixed navbar
$(document).ready(function () {
    // Destroy existing scrollspy
    $('body').scrollspy('dispose');

    // Reinitialize with offset
    $('body').scrollspy({
        target: '#sideNav',
        offset: 100  // Adjust based on navbar height
    });

    // Refresh scrollspy after page load
    setTimeout(function () {
        $('body').scrollspy('refresh');
    }, 100);
});

// ========== Scroll Animations ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// ========== Tooltips ==========
$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

// ========== Animate Skill Bars on Scroll ==========
const skillBars = document.querySelectorAll('.skill-progress');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const widthMatch = entry.target.getAttribute('style').match(/width:\s*(\d+)%/);
            if (widthMatch) {
                entry.target.style.width = widthMatch[1] + '%';
            }
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => skillObserver.observe(bar));
