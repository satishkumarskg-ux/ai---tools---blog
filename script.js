// script.js for Earth orbit animation

const canvas = document.getElementById('orbitCanvas');
const ctx = canvas.getContext('2d');

// Full screen canvas
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

// Particle class for orbiting dots
class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.angle = Math.random() * Math.PI * 2;
        this.radius = Math.random() * 200 + 100; // Orbit distance
        this.speed = (Math.random() * 0.01) + 0.002;
        this.size = Math.random() * 2;
        this.color = Math.random() > 0.1 ? "#00f2ff" : "#ff3c3c";
    }

    update() {
        this.angle += this.speed;
    }

    draw() {
        // X & Y calculation for flattened orbit
        const x = canvas.width / 2 + Math.cos(this.angle) * this.radius * 2;
        const y = canvas.height / 2 + Math.sin(this.angle) * this.radius * 0.5;

        ctx.beginPath();
        ctx.arc(x, y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        // Glow effect
        ctx.shadowBlur = 5;
        ctx.shadowColor = this.color;
    }
}

// Initialize particles
function init() {
    for (let i = 0; i < 150; i++) {
        particles.push(new Particle());
    }
}

// Animate the orbit
function animate() {
    // semi-transparent background for trail effect
    ctx.fillStyle = 'rgba(5, 5, 5, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    requestAnimationFrame(animate);
}

init();
animate();

// Responsive canvas
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});