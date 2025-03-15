// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-icon');

const currentTheme = 'dark';

if (currentTheme === 'light') {
    document.body.classList.add('light-theme');
    themeIcon.textContent = '☀️';
}

// Toggle theme function
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    
    // Update icon
    themeIcon.textContent = isLight ? '☀️' : '🌙';
    
});

const phaseInfo = {
    plan: {
        title: "Planning Phase",
        description: "Defining objectives, planning sprints, and organizing project tasks."
    },
    code: {
        title: "Development Phase",
        description: "Writing source code, code review, and integrating features."
    },
    build: {
        title: "Build Phase",
        description: "Compiling the code and creating build artifacts."
    },
    test: {
        title: "Testing Phase",
        description: "Running unit, integration, and performance tests."
    },
    release: {
        title: "Release Phase",
        description: "Preparing and validating versions for deployment."
    },
    deploy: {
        title: "Deployment Phase",
        description: "Production release and continuous deployment of applications."
    },
    operate: {
        title: "Operation Phase",
        description: "Maintaining and managing production systems."
    },
    monitor: {
        title: "Monitoring Phase",
        description: "Monitoring performance and collecting metrics."
    }
};


let activePhase = null;

document.querySelectorAll('.cycle-item').forEach(item => {
    item.addEventListener('click', function() {
        const phase = this.getAttribute('data-phase');
        
        // Remove active class from previous item
        if (activePhase) {
            document.querySelector(`[data-phase="${activePhase}"]`).classList.remove('active');
        }
        
        // Add active class to current item
        this.classList.add('active');
        activePhase = phase;
        
        // Update phase information
        document.getElementById('phaseTitle').textContent = phaseInfo[phase].title;
        document.getElementById('phaseDescription').textContent = phaseInfo[phase].description;
        
        // Add animation effect
        this.style.animation = 'none';
        this.offsetHeight; // Trigger reflow
        this.style.animation = null;
    });
});

// Add hover effect
document.querySelectorAll('.cycle-item').forEach(item => {
    item.addEventListener('mouseover', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    item.addEventListener('mouseout', function() {
        this.style.transform = 'scale(1)';
    });
});