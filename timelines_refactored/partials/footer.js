document.addEventListener('DOMContentLoaded', () => {
    const footerLinks = document.querySelectorAll('#footer-nav a');
    const currentPath = window.location.pathname;

    footerLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active-footer');
        }
    });
});
