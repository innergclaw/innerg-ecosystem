/**
 * INNERG INTEL ECOSYSTEM
 * GSAP-Powered Motion Graphics
 */

// Register GSAP Plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// =====================================================
// PRELOADER
// =====================================================
const preloader = document.querySelector('.preloader');
const preloaderProgress = document.querySelector('.preloader-progress');
const preloaderText = document.querySelector('.preloader-text');

const preloaderTl = gsap.timeline({
  onComplete: initSite
});

preloaderTl
  .to(preloaderProgress, {
    width: '100%',
    duration: 1.5,
    ease: 'power2.inOut'
  })
  .to(preloaderText, {
    text: 'System ready',
    duration: 0.3
  }, '-=0.3')
  .to(preloader, {
    yPercent: -100,
    duration: 0.8,
    ease: 'power4.inOut'
  }, '+=0.2');

// =====================================================
// INIT SITE
// =====================================================
function initSite() {
  initCursor();
  initMatrixRain();
  initHeroAnimations();
  initMarquee();
  initEcosystemCards();
  initPhilosophyScroll();
  initDNACanvas();
  initProductShowcase();
  initScrollAnimations();
  initNavScroll();
}

// =====================================================
// CUSTOM CURSOR
// =====================================================
function initCursor() {
  const cursor = document.querySelector('.cursor');
  const follower = document.querySelector('.cursor-follower');
  
  if (!cursor || !follower) return;
  
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  let followerX = 0, followerY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  // Smooth cursor animation
  gsap.ticker.add(() => {
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
  });
  
  // Hover effects
  const hoverElements = document.querySelectorAll('a, button, .eco-card, .connect-option');
  hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => follower.classList.add('hover'));
    el.addEventListener('mouseleave', () => follower.classList.remove('hover'));
  });
}

// =====================================================
// MATRIX RAIN CANVAS
// =====================================================
function initMatrixRain() {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const chars = 'INNERG01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
  const charArray = chars.split('');
  
  const fontSize = 14;
  const columns = canvas.width / fontSize;
  
  const drops = [];
  for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * canvas.height / fontSize;
  }
  
  function draw() {
    ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#00ff88';
    ctx.font = fontSize + 'px JetBrains Mono';
    
    for (let i = 0; i < drops.length; i++) {
      const char = charArray[Math.floor(Math.random() * charArray.length)];
      ctx.fillText(char, i * fontSize, drops[i] * fontSize);
      
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }
  
  setInterval(draw, 50);
  
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// =====================================================
// HERO ANIMATIONS
// =====================================================
function initHeroAnimations() {
  const heroTl = gsap.timeline({ delay: 0.5 });
  
  // Badge
  heroTl.from('.hero-badge', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out'
  });
  
  // Title words
  heroTl.from('.title-line .word', {
    y: '100%',
    duration: 1,
    stagger: 0.1,
    ease: 'power4.out'
  }, '-=0.4');
  
  // Subtitle
  heroTl.from('.subtitle-line', {
    y: 20,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power3.out'
  }, '-=0.6');
  
  // Actions
  heroTl.from('.hero-actions .btn-primary, .hero-actions .btn-secondary', {
    y: 20,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power3.out'
  }, '-=0.4');
  
  // Scroll indicator
  heroTl.from('.hero-scroll', {
    opacity: 0,
    duration: 0.6
  }, '-=0.2');
  
  // Gradient orbs floating animation
  gsap.to('.orb-1', {
    x: 50,
    y: 30,
    duration: 8,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });
  
  gsap.to('.orb-2', {
    x: -30,
    y: 50,
    duration: 10,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });
  
  gsap.to('.orb-3', {
    scale: 1.2,
    duration: 6,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
  });
}

// =====================================================
// MARQUEE ANIMATION
// =====================================================
function initMarquee() {
  // Counter animation
  const statValues = document.querySelectorAll('.stat-value[data-count]');
  
  statValues.forEach(el => {
    const target = parseInt(el.dataset.count);
    gsap.to(el, {
      innerHTML: target,
      duration: 2,
      ease: 'power2.out',
      snap: { innerHTML: 1 },
      scrollTrigger: {
        trigger: '.stats-marquee',
        start: 'top 80%'
      }
    });
  });
}

// =====================================================
// ECOSYSTEM CARDS
// =====================================================
function initEcosystemCards() {
  const cards = document.querySelectorAll('.eco-card');
  
  cards.forEach((card, i) => {
    gsap.from(card, {
      y: 60,
      opacity: 0,
      duration: 0.8,
      delay: i * 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 85%'
      }
    });
  });
  
  // 3D tilt effect
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      gsap.to(card, {
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 0.3,
        ease: 'power2.out',
        transformPerspective: 1000
      });
    });
    
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out'
      });
    });
  });
}

// =====================================================
// PHILOSOPHY SCROLL
// =====================================================
function initPhilosophyScroll() {
  const items = document.querySelectorAll('.philosophy-item');
  
  items.forEach((item, i) => {
    ScrollTrigger.create({
      trigger: item,
      start: 'top center',
      end: 'bottom center',
      onEnter: () => setActiveItem(i),
      onEnterBack: () => setActiveItem(i)
    });
  });
  
  function setActiveItem(index) {
    items.forEach((item, i) => {
      item.classList.toggle('active', i === index);
    });
  }
  
  // Section pin
  ScrollTrigger.create({
    trigger: '.philosophy',
    start: 'top top',
    end: 'bottom bottom',
    pin: '.philosophy-visual',
    pinSpacing: false
  });
}

// =====================================================
// DNA HELIX CANVAS
// =====================================================
function initDNACanvas() {
  const canvas = document.getElementById('dna-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  const width = canvas.width = 300;
  const height = canvas.height = 400;
  
  let time = 0;
  
  const particles = [];
  const numParticles = 60;
  
  for (let i = 0; i < numParticles; i++) {
    particles.push({
      y: (i / numParticles) * height,
      offset: i * 0.3,
      size: 4 + Math.random() * 4,
      strand: i % 2
    });
  }
  
  function draw() {
    ctx.fillStyle = 'rgba(10, 10, 10, 0.1)';
    ctx.fillRect(0, 0, width, height);
    
    time += 0.02;
    
    particles.forEach((p, i) => {
      const x1 = width / 2 + Math.sin(time + p.offset) * 80;
      const x2 = width / 2 - Math.sin(time + p.offset) * 80;
      
      // Draw connecting line
      if (i % 4 === 0) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0, 255, 136, 0.2)';
        ctx.lineWidth = 1;
        ctx.moveTo(x1, p.y);
        ctx.lineTo(x2, p.y);
        ctx.stroke();
      }
      
      // Draw particles
      ctx.beginPath();
      ctx.fillStyle = p.strand === 0 ? '#00ff88' : '#c0c0c0';
      ctx.arc(x1, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.beginPath();
      ctx.fillStyle = p.strand === 1 ? '#00ff88' : '#c0c0c0';
      ctx.arc(x2, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });
    
    requestAnimationFrame(draw);
  }
  
  draw();
}

// =====================================================
// PRODUCT SHOWCASE
// =====================================================
function initProductShowcase() {
  // Terminal typing effect
  const terminalText = document.querySelector('.terminal-text');
  
  gsap.from('.terminal-text .prompt', {
    opacity: 0,
    stagger: 0.5,
    scrollTrigger: {
      trigger: '.product-featured',
      start: 'top 60%'
    }
  });
  
  // Product info reveal
  gsap.from('.product-info > *', {
    y: 40,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.product-featured',
      start: 'top 60%'
    }
  });
}

// =====================================================
// SCROLL ANIMATIONS
// =====================================================
function initScrollAnimations() {
  // Section headers
  gsap.utils.toArray('.section-header').forEach(header => {
    gsap.from(header.children, {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: header,
        start: 'top 80%'
      }
    });
  });
  
  // Community features
  gsap.from('.comm-feature', {
    y: 50,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.community-features',
      start: 'top 70%'
    }
  });
  
  // Connect options
  gsap.from('.connect-option', {
    y: 60,
    opacity: 0,
    duration: 0.7,
    stagger: 0.1,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.connect-options',
      start: 'top 75%'
    }
  });
  
  // Footer
  gsap.from('.footer-content, .footer-bottom', {
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.footer',
      start: 'top 90%'
    }
  });
}

// =====================================================
// NAV SCROLL
// =====================================================
function initNavScroll() {
  const nav = document.querySelector('.nav');
  let lastScroll = 0;
  
  ScrollTrigger.create({
    start: 'top -100',
    end: 99999,
    onUpdate: (self) => {
      const scrollY = self.scroll();
      
      if (scrollY > lastScroll && scrollY > 200) {
        gsap.to(nav, { yPercent: -100, duration: 0.3 });
      } else {
        gsap.to(nav, { yPercent: 0, duration: 0.3 });
      }
      
      lastScroll = scrollY;
    }
  });
  
  // Smooth scroll for nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        gsap.to(window, {
          scrollTo: { y: target, offsetY: 80 },
          duration: 1,
          ease: 'power3.inOut'
        });
      }
    });
  });
}

// =====================================================
// SMOOTH SCROLL FOR HERO CTA
// =====================================================
document.querySelector('.hero-actions .btn-primary')?.addEventListener('click', (e) => {
  e.preventDefault();
  gsap.to(window, {
    scrollTo: { y: '#ecosystem', offsetY: 80 },
    duration: 1,
    ease: 'power3.inOut'
  });
});

// =====================================================
// PARALLAX EFFECTS
// =====================================================
gsap.utils.toArray('.gradient-orb').forEach(orb => {
  gsap.to(orb, {
    y: -100,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: 1
    }
  });
});

// =====================================================
// REVEAL TEXT SCRAMBLE (Bonus Effect)
// =====================================================
function scrambleText(element, text, duration = 1) {
  const chars = 'INNERG0123456789';
  let iterations = 0;
  
  const interval = setInterval(() => {
    element.textContent = text
      .split('')
      .map((char, i) => {
        if (i < iterations) return text[i];
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join('');
    
    iterations += 1 / (text.length / 3);
    
    if (iterations >= text.length) {
      clearInterval(interval);
      element.textContent = text;
    }
  }, duration * 1000 / text.length);
}

// Apply scramble to section tags on scroll
document.querySelectorAll('.section-tag').forEach(tag => {
  const originalText = tag.textContent;
  
  ScrollTrigger.create({
    trigger: tag,
    start: 'top 85%',
    onEnter: () => scrambleText(tag, originalText, 0.5),
    once: true
  });
});
