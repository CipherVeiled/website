// Faulty Terminal Background Effect
const canvas = document.getElementById('terminal-canvas');
const ctx = canvas.getContext('2d');

// Set canvas to full window size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Create noise/static effect
function createNoise() {
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const pixels = imageData.data;
    
    for (let i = 0; i < pixels.length; i += 4) {
        // Random green-tinted noise - more intense
        const noise = Math.random() * 150; // Higher intensity
        pixels[i] = 0;                     // Red
        pixels[i + 1] = noise;             // Green
        pixels[i + 2] = noise * 0.1;       // Slight blue for variation
        pixels[i + 3] = Math.random() * 40; // More visible
    }
    
    ctx.putImageData(imageData, 0, 0);
}

// Create glitch blocks
function createGlitchBlocks() {
    if (Math.random() > 0.85) { // 15% chance per frame - more frequent
        const numBlocks = Math.floor(Math.random() * 5) + 2; // More blocks
        
        for (let i = 0; i < numBlocks; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const width = Math.random() * 400 + 100; // Wider blocks
            const height = Math.random() * 40 + 10;  // Taller blocks
            
            // Brighter green for glitch
            const green = Math.floor(Math.random() * 100 + 155);
            ctx.fillStyle = `rgba(0, ${green}, 0, ${Math.random() * 0.5 + 0.2})`; // More opaque
            ctx.fillRect(x, y, width, height);
            
            // Add some horizontal displacement lines
            if (Math.random() > 0.5) {
                ctx.fillStyle = `rgba(0, 255, 65, ${Math.random() * 0.4})`;
                ctx.fillRect(0, y, canvas.width, 2);
            }
        }
    }
}

// Scan lines effect
function drawScanlines() {
    for (let y = 0; y < canvas.height; y += 3) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        ctx.fillRect(0, y, canvas.width, 1);
    }
    
    // Add random flickering lines
    if (Math.random() > 0.9) {
        const flickerY = Math.random() * canvas.height;
        ctx.fillStyle = `rgba(0, 255, 65, ${Math.random() * 0.3})`;
        ctx.fillRect(0, flickerY, canvas.width, 3);
    }
}

// Main animation loop
function animate() {
    // Clear with black background
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add effects
    createNoise();
    createGlitchBlocks();
    drawScanlines();
    
    requestAnimationFrame(animate);
}

// Start animation
animate();

// Smooth scrolling for navigation links
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

// Add scroll effect to navbar
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 255, 65, 0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Add intersection observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and feature items
document.querySelectorAll('.about-card, .feature-item, .spec-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});