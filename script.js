// Função para animar os cards quando aparecem na tela
document.addEventListener('DOMContentLoaded', function() {
    // Observador de interseção para animações
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Aplicar aos cards de features
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        observer.observe(card);
    });

    // Suavizar rolagem para links âncora
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Adicionar classe ao header quando scrollar
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.padding = '0.5rem 0';
            header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.4)';
        } else {
            header.style.padding = '1rem 0';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
        }
    });
});
// Adicione isso dentro do DOMContentLoaded

// Carregamento otimizado do mapa
const locationMap = document.querySelector('.location-map iframe');
if (locationMap) {
    // Adia o carregamento do iframe até que o usuário role até a seção
    const mapObserver = new IntersectionObserver(function(entries) {
        if (entries[0].isIntersecting) {
            const src = locationMap.getAttribute('src');
            locationMap.setAttribute('src', src + '&amp;');
            mapObserver.disconnect();
        }
    }, {threshold: 0.1});

    mapObserver.observe(locationMap);
}

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validação simples
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    if (name && email && subject && message) {
        // Simulação de envio
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        this.reset();
        
        // Aqui você pode adicionar AJAX para enviar realmente o formulário
    } else {
        alert('Por favor, preencha todos os campos obrigatórios.');
    }
});