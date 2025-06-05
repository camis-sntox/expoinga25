document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('year').textContent = new Date().getFullYear();

    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    const techSkills = [
        { name: 'HTML5', icon: 'fab fa-html5' },
        { name: 'CSS3', icon: 'fab fa-css3-alt' },
        { name: 'JavaScript', icon: 'fab fa-js-square' },
        { name: 'React', icon: 'fab fa-react' },
        { name: 'Node.js', icon: 'fab fa-node' },
        { name: 'Git', icon: 'fab fa-git-alt' },
        { name: 'GitHub', icon: 'fab fa-github' },
        { name: 'Python', icon: 'fab fa-python' },
        { name: 'Figma', icon: 'fab fa-figma' },
        { name: 'NPM', icon: 'fab fa-npm' },
        { name: 'AWS', icon: 'fab fa-aws' },
        { name: 'Docker', icon: 'fab fa-docker' }
    ];

    const skillsGrid = document.querySelector('.skills-grid');
    
    skillsGrid.innerHTML = '';
    
    techSkills.forEach(skill => {
        const skillHTML = `
            <div class="skill-icon">
                <i class="${skill.icon}"></i>
                <span class="skill-name">${skill.name}</span>
            </div>
        `;
        skillsGrid.innerHTML += skillHTML;
    });

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    skillObserver.disconnect();

    const projectsGrid = document.querySelector('.projects-grid');
    
    projects.forEach(project => {
        const techHTML = project.technologies.map(tech => 
            `<span class="tech-tag">${tech}</span>`
        ).join('');

        const projectHTML = `
            <div class="project-card">
                <div class="project-image"></div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-tech">${techHTML}</div>
                    <div class="project-links">
                        <a href="${project.liveLink}" class="project-link" target="_blank">Live Demo</a>
                        <a href="${project.codeLink}" class="project-link" target="_blank">View Code</a>
                    </div>
                </div>
            </div>
        `;
        projectsGrid.innerHTML += projectHTML;
    });

    const initParticles = () => {
        const canvas = document.getElementById('particles');
        const ctx = canvas.getContext('2d');
        
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const particles = [];
        const particleCount = Math.floor(window.innerWidth / 10);

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 3 + 1,
                speedX: Math.random() * 1 - 0.5,
                speedY: Math.random() * 1 - 0.5
            });
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                
                p.x += p.speedX;
                p.y += p.speedY;
                
                if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
                if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
                
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.fill();
                
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const distance = Math.sqrt(
                        Math.pow(p.x - p2.x, 2) + 
                        Math.pow(p.y - p2.y, 2)
                    );
                    
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance/100})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
            
            requestAnimationFrame(animate);
        }

        animate();

        window.addEventListener('resize', () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x = Math.random() * canvas.width;
                p.y = Math.random() * canvas.height;
            }
        });
    };

    initParticles();

    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('.submit-btn');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        setTimeout(() => {
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.backgroundColor = '#4CAF50';
            
            setTimeout(() => {
                submitBtn.textContent = 'Send Message';
                submitBtn.style.backgroundColor = '';
                submitBtn.disabled = false;
                contactForm.reset();
            }, 2000);
        }, 1500);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Alternar para Street View
    const streetViewBtn = document.getElementById('abrirStreetView');
    if (streetViewBtn) {
      streetViewBtn.addEventListener('click', function() {
        const iframe = document.querySelector('.mapa-container iframe');
        const currentSrc = iframe.src;
        
        if (currentSrc.includes('!1m18')) {
          // Se estiver no modo mapa, muda para Street View
          iframe.src = currentSrc.replace('!1m18', '!1m12!4v1!5m2!1m18!2m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%201000%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2001310-100!3m2!1d-23.5657344!2d-46.6534266!4v1');
          this.innerHTML = '<i class="fas fa-map"></i> Voltar para Mapa';
        } else {
          // Se estiver no modo Street View, volta para mapa
          iframe.src = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.0754267452926!2d-46.65342658440669!3d-23.565734367638794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%201000%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2001310-100!5e0!3m2!1spt-BR!2sbr!4v1623866506934!5m2!1spt-BR!2sbr';
          this.innerHTML = '<i class="fas fa-street-view"></i> Visualização 360°';
        }
      });
    }
    
    // Link para abrir no app do Google Maps
    const linksRota = document.querySelectorAll('[href*="maps.google"]');
    linksRota.forEach(link => {
      link.addEventListener('click', function(e) {
        if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
          e.preventDefault();
          const address = encodeURIComponent(this.getAttribute('href').split('?q=')[1]);
          window.open(`google.navigation:q=${address}`, '_blank');
        }
      });
    });
  });