// Animation d'écriture pour le texte "Born2Code"
document.addEventListener('DOMContentLoaded', () => {
    // Animation de la navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('mouseover', () => {
            link.style.textShadow = `0 0 10px rgba(176, 176, 176, 0.79)`;
        });
        link.addEventListener('mouseout', () => {
            link.style.textShadow = 'none';
        });
    });

    // Animation des cartes de projet
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseover', () => {
            card.style.boxShadow = '0 0 20px rgba(176, 176, 176, 0.79)';
        });
        card.addEventListener('mouseout', () => {
            card.style.boxShadow = 'none';
        });
    });
});

// Effet de scroll fluide pour la navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});