/**
 * NOSE TEA - CLOUD SERIES ANIMATION WEBSITE
 * Enhanced Motion & Interactive Experience Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. DATA MODELS: SIGNATURE DRINKS
  // ==========================================
  const DRINKS = [
    {
      id: 'peach-orange',
      name: 'Peach Orange Cloud',
      thaiName: 'พีช ออเรนจ์ คลาวด์',
      tone: 'warm',
      tagline: 'Sun-drenched Peach Infusion crowned with Velvety Cloud Foam',
      description: 'Delicate white peach nectar steeped with jasmine green tea, paired with hand-cut juicy peach cubes and fresh Valencia orange slices, topped with Nose Tea’s signature dense salted cream cheese cloud foam.',
      price: 150,
      calories: 210,
      image: 'assets/drink-peach-orange.png',
      badge: 'Bestseller Warm',
      color: '#FF7B39',
      glow: 'rgba(255, 123, 57, 0.45)',
      flavorProfile: { sweetness: 70, tartness: 65, creaminess: 85, chill: 80 },
      ingredients: [
        'Japanese White Peach Nectar',
        'Fresh Sliced Valencia Orange',
        'Artisanal Cold-brewed Jasmine Tea',
        'Signature Cream Cheese Cloud Foam',
        'Hand-cut Golden Peach Cubes'
      ]
    },
    {
      id: 'mango-passion',
      name: 'Mango Passion Cloud',
      thaiName: 'แมงโก้ แพชชั่น คลาวด์',
      tone: 'warm',
      tagline: 'Tropical Golden Burst with Tangy Passion Seeds & Ripe Mango',
      description: 'Golden Nam Dok Mai sweet mango puree harmonized with crisp highland Oolong tea and tart passion fruit pulp, layered over sun-yellow mango cubes, finished with our pillowy cheese cloud foam.',
      price: 160,
      calories: 235,
      image: 'assets/drink-mango-passion.png',
      badge: 'Tropical Signature',
      color: '#FFA000',
      glow: 'rgba(255, 160, 0, 0.45)',
      flavorProfile: { sweetness: 80, tartness: 85, creaminess: 85, chill: 75 },
      ingredients: [
        'Thai Nam Dok Mai Mango Puree',
        'Organic Passion Fruit Seeds & Pulp',
        'Fresh Sliced Sun Lemon',
        'Highland Mountain Oolong Tea',
        'Hokkaido Cheese Cloud Foam'
      ]
    },
    {
      id: 'blueberry-grape',
      name: 'Blueberry Grape Cloud',
      thaiName: 'บลูเบอร์รี เกรป คลาวด์',
      tone: 'cold',
      tagline: 'Frosty Violet Slush of Plump Blueberries & Kyoho Grapes',
      description: 'An icy violet masterpiece blending whole wild Canadian blueberries and deep Kyoho grape crystals with crushed ice slush, swirling into an opulent cloud foam with deep ruby berry hues.',
      price: 165,
      calories: 220,
      image: 'assets/drink-blueberry-grape.png',
      badge: 'Midnight Sensation',
      color: '#7B2CBF',
      glow: 'rgba(123, 44, 191, 0.45)',
      flavorProfile: { sweetness: 75, tartness: 60, creaminess: 85, chill: 95 },
      ingredients: [
        'Wild Mountain Blueberries',
        'Japanese Kyoho Grape Juice',
        'Crushed Crystal Grape Slush',
        'Butterfly Pea Floral Tea',
        'Velvety Cream Cheese Cloud'
      ]
    },
    {
      id: 'blue-lychee',
      name: 'Blue Lychee Cloud',
      thaiName: 'บลู ลิ้นจี่ คลาวด์',
      tone: 'cold',
      tagline: 'Electric Glacier Chill with Sweet White Lychee Pearls',
      description: 'Crystal-clear Arctic glacier blue infusion blended with sweet white Chiang Mai lychee nectar and crushed crystalline ice, crowned by our snowy, melt-in-your-mouth cloud foam.',
      price: 155,
      calories: 195,
      image: 'assets/drink-blue-lychee.png',
      badge: 'Cold Tone Star',
      color: '#00B4D8',
      glow: 'rgba(0, 180, 216, 0.45)',
      flavorProfile: { sweetness: 65, tartness: 50, creaminess: 85, chill: 100 },
      ingredients: [
        'Whole Peeled Juicy Lychees',
        'Chiang Mai Honey Lychee Nectar',
        'Natural Blue Curacao Floral Extract',
        'Sub-Zero Crushed Ice Slush',
        'Pillowy Cream Cheese Cloud'
      ]
    }
  ];

  // Global State
  const state = {
    activeTone: 'warm',
    soundEnabled: false,
    cart: [],
    audioCtx: null,
    bgmInterval: null,
    sipCount: 0,
    currentDrinkFill: 100, // percentage
    diyConfig: {
      flavor: 'peach',
      foamThickness: 60,
      sweetness: '50%',
      price: 150
    }
  };

  // ==========================================
  // 2. WEB AUDIO API SYNTHESIZER & CAFE BGM
  // ==========================================
  function initAudio() {
    if (!state.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        state.audioCtx = new AudioContext();
      }
    }
    if (state.audioCtx && state.audioCtx.state === 'suspended') {
      state.audioCtx.resume();
    }
  }

  function playSound(type) {
    if (!state.soundEnabled || !state.audioCtx) return;
    try {
      const ctx = state.audioCtx;
      const now = ctx.currentTime;

      if (type === 'bubble') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(450 + Math.random() * 200, now);
        osc.frequency.exponentialRampToValueAtTime(800 + Math.random() * 300, now + 0.08);

        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.09);
      } else if (type === 'ice') {
        const freqs = [1800, 2400, 3200];
        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq + Math.random() * 80, now + idx * 0.02);

          gain.gain.setValueAtTime(0.08, now + idx * 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2 + idx * 0.02);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.02);
          osc.stop(now + 0.25 + idx * 0.02);
        });
      } else if (type === 'slurp') {
        // Straw slurping sound
        for (let i = 0; i < 4; i++) {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(250 + i * 150 + Math.random() * 60, now + i * 0.05);
          osc.frequency.exponentialRampToValueAtTime(600 + i * 180, now + 0.12 + i * 0.05);

          gain.gain.setValueAtTime(0.09, now + i * 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14 + i * 0.05);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + i * 0.05);
          osc.stop(now + 0.15 + i * 0.05);
        }
      } else if (type === 'pour') {
        const bufferSize = ctx.sampleRate * 0.2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1400, now);
        filter.Q.setValueAtTime(3, now);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start(now);
      } else if (type === 'tone') {
        const chord = state.activeTone === 'warm' ? [523.25, 659.25, 783.99, 1046.50] : [587.33, 739.99, 880.00, 1174.66];
        chord.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + i * 0.06);

          gain.gain.setValueAtTime(0.07, now + i * 0.06);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5 + i * 0.06);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + i * 0.06);
          osc.stop(now + 0.55 + i * 0.06);
        });
      }
    } catch (e) {
      console.warn('Audio playback error', e);
    }
  }

  // Soft Lo-Fi Cafe Chords Loop
  function startCafeBgm() {
    stopCafeBgm();
    if (!state.soundEnabled || !state.audioCtx) return;

    const chords = [
      [349.23, 440.00, 523.25, 659.25], // Fmaj7
      [392.00, 493.88, 587.33, 698.46], // G7
      [329.63, 392.00, 493.88, 587.33], // Em7
      [220.00, 261.63, 329.63, 392.00]  // Am7
    ];
    let chordIdx = 0;

    function playChord() {
      if (!state.soundEnabled || !state.audioCtx) return;
      const ctx = state.audioCtx;
      const now = ctx.currentTime;
      const notes = chords[chordIdx % chords.length];
      chordIdx++;

      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.04);

        gain.gain.setValueAtTime(0.02, now + i * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.04);
        osc.stop(now + 4.0);
      });
    }

    playChord();
    state.bgmInterval = setInterval(playChord, 4000);
  }

  function stopCafeBgm() {
    if (state.bgmInterval) {
      clearInterval(state.bgmInterval);
      state.bgmInterval = null;
    }
  }

  // ==========================================
  // 3. CURSOR PARTICLE TRAIL & CLICK SPLASH
  // ==========================================
  const cursorDots = [];
  const maxCursorDots = 10;
  for (let i = 0; i < maxCursorDots; i++) {
    const dot = document.createElement('div');
    dot.className = 'cursor-trail-dot';
    dot.style.background = state.activeTone === 'warm' ? '#FF7B39' : '#00B4D8';
    dot.style.opacity = '0';
    document.body.appendChild(dot);
    cursorDots.push({ el: dot, x: 0, y: 0 });
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function updateCursorTrail() {
    let currX = mouseX;
    let currY = mouseY;

    cursorDots.forEach((dot, index) => {
      dot.x += (currX - dot.x) * 0.35;
      dot.y += (currY - dot.y) * 0.35;

      const size = Math.max(4, 14 - index * 1.1);
      const alpha = Math.max(0, 0.45 - index * 0.04);

      dot.el.style.left = `${dot.x}px`;
      dot.el.style.top = `${dot.y}px`;
      dot.el.style.width = `${size}px`;
      dot.el.style.height = `${size}px`;
      dot.el.style.opacity = alpha;
      dot.el.style.background = state.activeTone === 'warm' ? '#FF7B39' : '#00B4D8';

      currX = dot.x;
      currY = dot.y;
    });

    requestAnimationFrame(updateCursorTrail);
  }
  updateCursorTrail();

  // Click Splash Ripple
  window.addEventListener('click', (e) => {
    // Avoid creating splash on buttons that already have custom feedback
    if (e.target.closest('button, a, input')) return;

    playSound('bubble');
    const splash = document.createElement('div');
    splash.className = 'click-splash';
    splash.style.left = `${e.clientX}px`;
    splash.style.top = `${e.clientY}px`;
    splash.style.width = '60px';
    splash.style.height = '60px';
    splash.style.borderColor = state.activeTone === 'warm' ? '#FF7B39' : '#00B4D8';
    document.body.appendChild(splash);

    setTimeout(() => splash.remove(), 700);
  });

  // ==========================================
  // 4. CANVAS FIZZY BUBBLES & FLOATING FRUITS
  // ==========================================
  const canvas = document.getElementById('fizzyCanvas');
  const ctx = canvas ? canvas.getContext('2d') : null;
  let bubbles = [];
  let fruitParticles = [];

  function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  const fruitImages = {};
  const fruitSources = {
    orange: 'assets/orange-slice.svg',
    peach: 'assets/peach-slice.svg',
    mango: 'assets/mango-cube.svg',
    blueberry: 'assets/blueberry.svg',
    lychee: 'assets/lychee.svg',
    ice: 'assets/ice-cube.svg'
  };

  Object.keys(fruitSources).forEach((key) => {
    const img = new Image();
    img.src = fruitSources[key];
    fruitImages[key] = img;
  });

  class FizzyBubble {
    constructor() {
      this.reset();
    }
    reset() {
      if (!canvas) return;
      this.x = Math.random() * canvas.width;
      this.y = canvas.height + Math.random() * 80;
      this.radius = 1.8 + Math.random() * 5.2;
      this.speed = 1.0 + Math.random() * 2.2;
      this.wobbleSpeed = 0.02 + Math.random() * 0.04;
      this.wobbleAmp = 15 + Math.random() * 25;
      this.angle = Math.random() * Math.PI * 2;
      this.alpha = 0.25 + Math.random() * 0.5;
    }
    update() {
      this.y -= this.speed;
      this.angle += this.wobbleSpeed;
      this.x += Math.sin(this.angle) * 0.5;

      // Mouse repulsion
      const dx = this.x - mouseX;
      const dy = this.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 140) {
        this.x += (dx / dist) * 2;
        this.y += (dy / dist) * 2;
      }

      if (this.y < -30) this.reset();
    }
    draw(context) {
      context.save();
      context.beginPath();
      context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      const isWarm = state.activeTone === 'warm';
      const color = isWarm ? `rgba(255, 179, 71, ${this.alpha})` : `rgba(0, 180, 216, ${this.alpha})`;
      context.fillStyle = color;
      context.fill();

      // Shiny glare on bubble
      context.beginPath();
      context.arc(this.x - this.radius * 0.35, this.y - this.radius * 0.35, this.radius * 0.35, 0, Math.PI * 2);
      context.fillStyle = `rgba(255, 255, 255, ${this.alpha * 1.5})`;
      context.fill();
      context.restore();
    }
  }

  class FloatingFruitParticle {
    constructor() {
      this.reset();
    }
    reset() {
      if (!canvas) return;
      const warmFruitTypes = ['orange', 'peach', 'mango', 'ice'];
      const coldFruitTypes = ['blueberry', 'lychee', 'ice'];
      const pool = state.activeTone === 'warm' ? warmFruitTypes : coldFruitTypes;

      this.type = pool[Math.floor(Math.random() * pool.length)];
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = 30 + Math.random() * 32;
      this.speedY = 0.25 + Math.random() * 0.6;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.rotation = Math.random() * 360;
      this.rotSpeed = (Math.random() - 0.5) * 0.8;
      this.alpha = 0.4 + Math.random() * 0.45;
    }
    update() {
      this.y -= this.speedY;
      this.x += this.speedX;
      this.rotation += this.rotSpeed;

      if (this.y < -60) {
        this.y = (canvas ? canvas.height : 800) + 40;
        this.x = Math.random() * (canvas ? canvas.width : 1200);
      }
    }
    draw(context) {
      const img = fruitImages[this.type];
      if (img && img.complete) {
        context.save();
        context.globalAlpha = this.alpha;
        context.translate(this.x, this.y);
        context.rotate((this.rotation * Math.PI) / 180);
        context.drawImage(img, -this.size / 2, -this.size / 2, this.size, this.size);
        context.restore();
      }
    }
  }

  for (let i = 0; i < 50; i++) bubbles.push(new FizzyBubble());
  for (let i = 0; i < 12; i++) fruitParticles.push(new FloatingFruitParticle());

  function renderCanvas() {
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    bubbles.forEach((b) => {
      b.update();
      b.draw(ctx);
    });

    fruitParticles.forEach((f) => {
      f.update();
      f.draw(ctx);
    });

    requestAnimationFrame(renderCanvas);
  }
  renderCanvas();

  // ==========================================
  // 5. TONE SWITCHER WITH EXPANDING SHOCKWAVE
  // ==========================================
  const body = document.body;
  const toneWarmBtn = document.getElementById('toneWarmBtn');
  const toneColdBtn = document.getElementById('toneColdBtn');
  const toneAllBtn = document.getElementById('toneAllBtn');
  const heroTonePill = document.getElementById('heroTonePill');
  const heroMainImg = document.getElementById('heroMainImg');
  const heroDrinkTitle = document.getElementById('heroDrinkTitle');
  const heroDrinkTagline = document.getElementById('heroDrinkTagline');

  function triggerShockwave(x, y, color) {
    const wave = document.createElement('div');
    wave.className = 'tone-shockwave';
    wave.style.left = `${x}px`;
    wave.style.top = `${y}px`;
    wave.style.width = '60px';
    wave.style.height = '60px';
    wave.style.background = `radial-gradient(circle, ${color} 0%, transparent 75%)`;
    document.body.appendChild(wave);

    requestAnimationFrame(() => {
      wave.classList.add('expanding');
    });

    setTimeout(() => wave.remove(), 950);
  }

  function setTone(tone, e) {
    state.activeTone = tone;
    playSound('tone');

    const clickX = e ? e.clientX : window.innerWidth / 2;
    const clickY = e ? e.clientY : 100;
    const shockwaveColor = tone === 'warm' ? 'rgba(255, 123, 57, 0.4)' : 'rgba(0, 180, 216, 0.4)';
    triggerShockwave(clickX, clickY, shockwaveColor);

    if (tone === 'warm') {
      body.classList.remove('tone-cold');
      body.classList.add('tone-warm');
      if (toneWarmBtn) toneWarmBtn.classList.add('active');
      if (toneColdBtn) toneColdBtn.classList.remove('active');
      if (toneAllBtn) toneAllBtn.classList.remove('active');
      if (heroTonePill) heroTonePill.innerHTML = '<span class="inline-block w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span> WARM TONE COLLECTION';

      updateHeroDrink(DRINKS[0]);
    } else if (tone === 'cold') {
      body.classList.remove('tone-warm');
      body.classList.add('tone-cold');
      if (toneColdBtn) toneColdBtn.classList.add('active');
      if (toneWarmBtn) toneWarmBtn.classList.remove('active');
      if (toneAllBtn) toneAllBtn.classList.remove('active');
      if (heroTonePill) heroTonePill.innerHTML = '<span class="inline-block w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span> COLD TONE COLLECTION';

      updateHeroDrink(DRINKS[3]);
    } else {
      if (toneAllBtn) toneAllBtn.classList.add('active');
      if (toneWarmBtn) toneWarmBtn.classList.remove('active');
      if (toneColdBtn) toneColdBtn.classList.remove('active');
    }

    fruitParticles.forEach((f) => f.reset());
    filterDrinkCards(tone);
  }

  function updateHeroDrink(drink) {
    if (!heroMainImg) return;
    if (window.gsap) {
      gsap.to(heroMainImg, {
        opacity: 0,
        scale: 0.85,
        rotation: -5,
        y: 20,
        duration: 0.25,
        onComplete: () => {
          heroMainImg.src = drink.image;
          if (heroDrinkTitle) heroDrinkTitle.textContent = drink.name;
          if (heroDrinkTagline) heroDrinkTagline.textContent = drink.tagline;
          gsap.to(heroMainImg, {
            opacity: 1,
            scale: 1,
            rotation: 0,
            y: 0,
            duration: 0.5,
            ease: 'back.out(1.6)'
          });
        }
      });
    } else {
      heroMainImg.src = drink.image;
      if (heroDrinkTitle) heroDrinkTitle.textContent = drink.name;
      if (heroDrinkTagline) heroDrinkTagline.textContent = drink.tagline;
    }
  }

  if (toneWarmBtn) toneWarmBtn.addEventListener('click', (e) => setTone('warm', e));
  if (toneColdBtn) toneColdBtn.addEventListener('click', (e) => setTone('cold', e));
  if (toneAllBtn) toneAllBtn.addEventListener('click', (e) => setTone('all', e));

  // ==========================================
  // 6. INTERACTIVE STRAW / SIP SIMULATOR ("ดูดน้ำ")
  // ==========================================
  const btnSipDrink = document.getElementById('btnSipDrink');
  const btnRefillDrink = document.getElementById('btnRefillDrink');
  const heroCard = document.querySelector('.hero-cup-card');
  const mustacheToast = document.getElementById('mustacheToast');

  function triggerMustacheEasterEgg() {
    if (!mustacheToast) return;
    mustacheToast.classList.add('active');
    setTimeout(() => {
      mustacheToast.classList.remove('active');
    }, 3500);
  }

  if (btnSipDrink) {
    btnSipDrink.addEventListener('click', (e) => {
      state.sipCount++;
      playSound('slurp');
      playSound('bubble');

      // Cup jiggle animation
      if (heroCard) {
        heroCard.classList.remove('jiggling');
        void heroCard.offsetWidth; // force reflow
        heroCard.classList.add('jiggling');
      }

      // Spawn floating sip bubbles
      const rect = btnSipDrink.getBoundingClientRect();
      for (let i = 0; i < 6; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'fixed pointer-events-none rounded-full bg-amber-400 z-[999]';
        bubble.style.width = `${8 + Math.random() * 12}px`;
        bubble.style.height = bubble.style.width;
        bubble.style.left = `${rect.left + rect.width / 2 + (Math.random() - 0.5) * 40}px`;
        bubble.style.top = `${rect.top}px`;
        document.body.appendChild(bubble);

        if (window.gsap) {
          gsap.to(bubble, {
            y: -60 - Math.random() * 40,
            x: (Math.random() - 0.5) * 60,
            opacity: 0,
            scale: 1.5,
            duration: 0.6 + Math.random() * 0.4,
            onComplete: () => bubble.remove()
          });
        } else {
          setTimeout(() => bubble.remove(), 600);
        }
      }

      // Lower liquid scale slightly on hero image
      if (heroMainImg && window.gsap) {
        gsap.to(heroMainImg, {
          scaleY: Math.max(0.75, 1 - state.sipCount * 0.06),
          duration: 0.2,
          yoyo: true,
          repeat: 1
        });
      }

      // Show cheese mustache after 2 sips!
      if (state.sipCount >= 2) {
        triggerMustacheEasterEgg();
      }

      if (btnRefillDrink) {
        btnRefillDrink.classList.remove('hidden');
      }
    });
  }

  if (btnRefillDrink) {
    btnRefillDrink.addEventListener('click', () => {
      state.sipCount = 0;
      playSound('pour');
      playSound('ice');

      if (heroMainImg && window.gsap) {
        gsap.fromTo(heroMainImg, { scaleY: 0.7, opacity: 0.8 }, { scaleY: 1, opacity: 1, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
      }

      btnRefillDrink.classList.add('hidden');
    });
  }

  // ==========================================
  // 7. DRINKS GRID RENDER & 3D TILT
  // ==========================================
  const drinksGrid = document.getElementById('drinksGrid');

  function renderDrinksGrid() {
    if (!drinksGrid) return;
    drinksGrid.innerHTML = '';

    DRINKS.forEach((drink) => {
      const card = document.createElement('div');
      card.className = `drink-tilt-card p-6 md:p-8 flex flex-col justify-between group`;
      card.dataset.id = drink.id;
      card.dataset.tone = drink.tone;

      const isWarm = drink.tone === 'warm';
      const toneBadgeColor = isWarm ? 'bg-orange-100 text-orange-700 border-orange-200' : 'bg-cyan-100 text-cyan-800 border-cyan-200';
      const toneIcon = isWarm ? '☀️' : '❄️';

      card.innerHTML = `
        <div class="drink-card-glare"></div>
        <div>
          <div class="flex items-center justify-between mb-4">
            <span class="glass-badge ${toneBadgeColor} text-xs font-bold">
              ${toneIcon} ${drink.tone.toUpperCase()} TONE
            </span>
            <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
              ${drink.calories} kcal
            </span>
          </div>

          <div class="relative py-6 flex justify-center items-center overflow-visible">
            <div class="absolute inset-0 pointer-events-none">
              <span class="condensation-drop" style="width: 5px; height: 7px; top: 35%; left: 32%; animation-delay: 0.5s;"></span>
              <span class="condensation-drop" style="width: 4px; height: 6px; top: 48%; right: 30%; animation-delay: 2.2s;"></span>
              <span class="condensation-drop" style="width: 6px; height: 8px; top: 60%; left: 40%; animation-delay: 4.1s;"></span>
            </div>
            
            <img src="${drink.image}" alt="${drink.name}" class="cup-thumbnail relative z-10" loading="lazy">
          </div>

          <div class="mt-4">
            <h3 class="text-xl md:text-2xl font-black text-slate-900 group-hover:text-primary transition-colors">
              ${drink.name}
            </h3>
            <p class="text-xs text-slate-400 font-medium mb-2">${drink.thaiName}</p>
            <p class="text-sm text-slate-600 line-clamp-2 leading-relaxed">
              ${drink.description}
            </p>
          </div>
        </div>

        <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span class="text-xs text-slate-400 block font-medium">Price</span>
            <span class="text-2xl font-black text-slate-900">฿${drink.price}</span>
          </div>

          <div class="flex items-center gap-2">
            <button class="btn-inspect-drink p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors" title="Inspect Flavors" data-id="${drink.id}">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
            <button class="btn-add-cart btn-primary text-sm py-2.5 px-4" data-id="${drink.id}">
              <span>+ Add to Cup</span>
            </button>
          </div>
        </div>
      `;

      attach3DTilt(card);
      drinksGrid.appendChild(card);
    });

    document.querySelectorAll('.btn-inspect-drink').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openDrinkModal(btn.dataset.id);
      });
    });

    document.querySelectorAll('.btn-add-cart').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        addToCart(btn.dataset.id);
        createFlyingDrinkParticle(e);
      });
    });

    document.querySelectorAll('.drink-tilt-card').forEach((card) => {
      card.addEventListener('click', () => {
        openDrinkModal(card.dataset.id);
      });
    });
  }

  function filterDrinkCards(tone) {
    const cards = document.querySelectorAll('.drink-tilt-card');
    cards.forEach((card) => {
      const cardTone = card.dataset.tone;
      if (tone === 'all' || cardTone === tone) {
        card.style.display = 'flex';
        if (window.gsap) {
          gsap.fromTo(card, { opacity: 0, y: 30, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'power2.out' });
        }
      } else {
        card.style.display = 'none';
      }
    });
  }

  function attach3DTilt(element) {
    let bounds;
    function updateBounds() {
      bounds = element.getBoundingClientRect();
    }

    element.addEventListener('mouseenter', () => {
      updateBounds();
      playSound('ice');
      element.style.transition = 'transform 0.1s ease-out, box-shadow 0.2s ease';
    });

    element.addEventListener('mousemove', (e) => {
      if (!bounds) updateBounds();
      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;
      const xPct = mouseX / bounds.width - 0.5;
      const yPct = mouseY / bounds.height - 0.5;

      const tiltX = -yPct * 18;
      const tiltY = xPct * 18;

      element.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale3d(1.03, 1.03, 1.03)`;

      const glare = element.querySelector('.drink-card-glare');
      if (glare) {
        const glareX = (mouseX / bounds.width) * 100;
        const glareY = (mouseY / bounds.height) * 100;
        glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 65%)`;
      }
    });

    element.addEventListener('mouseleave', () => {
      element.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease';
      element.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }

  // ==========================================
  // 8. DECONSTRUCT THE CLOUD ANATOMY SECTION
  // ==========================================
  const anatomyGraphic = document.getElementById('anatomyGraphic');
  const anatomyLayerItems = document.querySelectorAll('.anatomy-layer-item');
  const btnExplodeAnatomy = document.getElementById('btnExplodeAnatomy');

  if (anatomyLayerItems.length > 0) {
    anatomyLayerItems.forEach((item) => {
      item.addEventListener('mouseenter', () => {
        playSound('bubble');
        highlightLayer(item.dataset.layer);
      });
      item.addEventListener('click', () => {
        playSound('ice');
        highlightLayer(item.dataset.layer);
      });
    });
  }

  function highlightLayer(layerType) {
    if (!anatomyGraphic) return;
    anatomyGraphic.classList.add('exploded');

    document.querySelectorAll('.cup-layer-slice').forEach((slice) => {
      if (slice.classList.contains(`layer-${layerType}`)) {
        slice.style.filter = 'brightness(1.2) drop-shadow(0 0 20px var(--active-primary))';
        slice.style.transform = 'scale(1.1)';
      } else {
        slice.style.filter = 'brightness(0.85) opacity(0.6)';
        slice.style.transform = 'scale(0.96)';
      }
    });

    anatomyLayerItems.forEach((item) => {
      if (item.dataset.layer === layerType) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  if (btnExplodeAnatomy) {
    let isExploded = false;
    btnExplodeAnatomy.addEventListener('click', () => {
      playSound('pour');
      isExploded = !isExploded;
      if (anatomyGraphic) {
        if (isExploded) {
          anatomyGraphic.classList.add('exploded');
          btnExplodeAnatomy.innerHTML = '<span>⚡ Collapse Layers</span>';
        } else {
          anatomyGraphic.classList.remove('exploded');
          btnExplodeAnatomy.innerHTML = '<span>✨ Explode 4 Layers</span>';
          document.querySelectorAll('.cup-layer-slice').forEach((slice) => {
            slice.style.filter = '';
            slice.style.transform = '';
          });
        }
      }
    });
  }

  // ==========================================
  // 9. DIY CLOUD BUILDER SIMULATOR
  // ==========================================
  const diyLiquid = document.getElementById('diyLiquid');
  const diyFoam = document.getElementById('diyFoam');
  const diyFruitChunks = document.getElementById('diyFruitChunks');
  const diyPriceTag = document.getElementById('diyPriceTag');
  const diyCalorieTag = document.getElementById('diyCalorieTag');
  const btnAddDiyToCart = document.getElementById('btnAddDiyToCart');

  const flavorOptions = {
    peach: {
      name: 'Peach Sunshine',
      color: 'linear-gradient(180deg, #FF9E64, #FF6525)',
      fruitAsset: 'assets/peach-slice.svg',
      basePrice: 150,
      calories: 210
    },
    mango: {
      name: 'Golden Mango',
      color: 'linear-gradient(180deg, #FFC107, #FF8F00)',
      fruitAsset: 'assets/mango-cube.svg',
      basePrice: 160,
      calories: 230
    },
    blueberry: {
      name: 'Violet Blueberry',
      color: 'linear-gradient(180deg, #8E24AA, #4A148C)',
      fruitAsset: 'assets/blueberry.svg',
      basePrice: 165,
      calories: 220
    },
    lychee: {
      name: 'Glacier Blue Lychee',
      color: 'linear-gradient(180deg, #48CAE4, #0077B6)',
      fruitAsset: 'assets/lychee.svg',
      basePrice: 155,
      calories: 195
    }
  };

  function updateDiyCup() {
    const flavor = flavorOptions[state.diyConfig.flavor];
    if (!flavor) return;

    if (diyLiquid) {
      diyLiquid.style.background = flavor.color;
    }
    if (diyFoam) {
      diyFoam.style.height = `${state.diyConfig.foamThickness}px`;
    }

    if (diyFruitChunks) {
      diyFruitChunks.innerHTML = '';
      for (let i = 0; i < 7; i++) {
        const chunk = document.createElement('img');
        chunk.src = flavor.fruitAsset;
        chunk.className = 'w-7 h-7 object-contain animate-bounce';
        chunk.style.animationDuration = `${1.2 + Math.random() * 1.5}s`;
        chunk.style.animationDelay = `${Math.random() * 0.4}s`;
        diyFruitChunks.appendChild(chunk);
      }
    }

    let calculatedPrice = flavor.basePrice;
    let calculatedCal = flavor.calories;

    if (state.diyConfig.foamThickness > 60) {
      calculatedPrice += 20;
      calculatedCal += 50;
    }

    state.diyConfig.price = calculatedPrice;
    if (diyPriceTag) diyPriceTag.textContent = `฿${calculatedPrice}`;
    if (diyCalorieTag) diyCalorieTag.textContent = `${calculatedCal} kcal`;
  }

  document.querySelectorAll('.diy-flavor-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      playSound('pour');
      document.querySelectorAll('.diy-flavor-btn').forEach((b) => b.classList.remove('ring-2', 'ring-primary', 'bg-white'));
      btn.classList.add('ring-2', 'ring-primary', 'bg-white');
      state.diyConfig.flavor = btn.dataset.flavor;
      updateDiyCup();
    });
  });

  document.querySelectorAll('.diy-foam-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      playSound('bubble');
      document.querySelectorAll('.diy-foam-btn').forEach((b) => b.classList.remove('active', 'bg-slate-900', 'text-white'));
      btn.classList.add('active', 'bg-slate-900', 'text-white');
      state.diyConfig.foamThickness = parseInt(btn.dataset.thickness, 10);
      updateDiyCup();
    });
  });

  if (btnAddDiyToCart) {
    btnAddDiyToCart.addEventListener('click', (e) => {
      const flavor = flavorOptions[state.diyConfig.flavor];
      const customItem = {
        id: `custom-${Date.now()}`,
        name: `Custom ${flavor.name} Cloud`,
        price: state.diyConfig.price,
        image: flavor.fruitAsset
      };
      state.cart.push(customItem);
      updateCartDrawer();
      playSound('ice');
      createFlyingDrinkParticle(e);
      openCartDrawer();
    });
  }

  // ==========================================
  // 10. MODAL INSPECT & CART DRAWER
  // ==========================================
  const modalOverlay = document.getElementById('drinkModalOverlay');
  const btnCloseModal = document.getElementById('btnCloseModal');
  const modalDrinkImg = document.getElementById('modalDrinkImg');
  const modalDrinkName = document.getElementById('modalDrinkName');
  const modalDrinkThai = document.getElementById('modalDrinkThai');
  const modalDrinkDesc = document.getElementById('modalDrinkDesc');
  const modalDrinkPrice = document.getElementById('modalDrinkPrice');
  const modalIngredientsList = document.getElementById('modalIngredientsList');
  const modalSweetMeter = document.getElementById('modalSweetMeter');
  const modalTartMeter = document.getElementById('modalTartMeter');
  const modalCreamMeter = document.getElementById('modalCreamMeter');
  const modalChillMeter = document.getElementById('modalChillMeter');
  const btnModalAddToCart = document.getElementById('btnModalAddToCart');

  let activeModalDrinkId = null;

  function openDrinkModal(drinkId) {
    const drink = DRINKS.find((d) => d.id === drinkId);
    if (!drink || !modalOverlay) return;

    activeModalDrinkId = drink.id;
    playSound('bubble');

    if (modalDrinkImg) modalDrinkImg.src = drink.image;
    if (modalDrinkName) modalDrinkName.textContent = drink.name;
    if (modalDrinkThai) modalDrinkThai.textContent = drink.thaiName;
    if (modalDrinkDesc) modalDrinkDesc.textContent = drink.description;
    if (modalDrinkPrice) modalDrinkPrice.textContent = `฿${drink.price}`;

    if (modalSweetMeter) modalSweetMeter.style.width = `${drink.flavorProfile.sweetness}%`;
    if (modalTartMeter) modalTartMeter.style.width = `${drink.flavorProfile.tartness}%`;
    if (modalCreamMeter) modalCreamMeter.style.width = `${drink.flavorProfile.creaminess}%`;
    if (modalChillMeter) modalChillMeter.style.width = `${drink.flavorProfile.chill}%`;

    if (modalIngredientsList) {
      modalIngredientsList.innerHTML = '';
      drink.ingredients.forEach((ing) => {
        const li = document.createElement('li');
        li.className = 'flex items-center gap-2 text-sm text-slate-700 py-1';
        li.innerHTML = `
          <svg class="w-4 h-4 text-emerald-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
          </svg>
          <span>${ing}</span>
        `;
        modalIngredientsList.appendChild(li);
      });
    }

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrinkModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (btnCloseModal) btnCloseModal.addEventListener('click', closeDrinkModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeDrinkModal();
    });
  }

  if (btnModalAddToCart) {
    btnModalAddToCart.addEventListener('click', (e) => {
      if (activeModalDrinkId) {
        addToCart(activeModalDrinkId);
        createFlyingDrinkParticle(e);
        closeDrinkModal();
      }
    });
  }

  // Cart Drawer
  const cartDrawerOverlay = document.getElementById('cartDrawerOverlay');
  const cartDrawer = document.getElementById('cartDrawer');
  const btnOpenCart = document.getElementById('btnOpenCart');
  const btnCloseCart = document.getElementById('btnCloseCart');
  const cartBadge = document.getElementById('cartBadge');
  const cartItemsList = document.getElementById('cartItemsList');
  const cartSubtotal = document.getElementById('cartSubtotal');
  const btnCheckout = document.getElementById('btnCheckout');

  function openCartDrawer() {
    if (!cartDrawer || !cartDrawerOverlay) return;
    cartDrawerOverlay.classList.add('active');
    cartDrawer.classList.add('active');
    playSound('bubble');
  }

  function closeCartDrawer() {
    if (!cartDrawer || !cartDrawerOverlay) return;
    cartDrawerOverlay.classList.remove('active');
    cartDrawer.classList.remove('active');
  }

  if (btnOpenCart) btnOpenCart.addEventListener('click', openCartDrawer);
  if (btnCloseCart) btnCloseCart.addEventListener('click', closeCartDrawer);
  if (cartDrawerOverlay) cartDrawerOverlay.addEventListener('click', closeCartDrawer);

  function addToCart(drinkId) {
    const drink = DRINKS.find((d) => d.id === drinkId);
    if (!drink) return;

    state.cart.push({
      id: `${drink.id}-${Date.now()}`,
      drinkId: drink.id,
      name: drink.name,
      price: drink.price,
      image: drink.image
    });

    playSound('ice');
    updateCartDrawer();
  }

  function removeFromCart(index) {
    state.cart.splice(index, 1);
    playSound('bubble');
    updateCartDrawer();
  }

  function updateCartDrawer() {
    if (cartBadge) {
      cartBadge.textContent = state.cart.length;
      cartBadge.classList.toggle('hidden', state.cart.length === 0);
      if (window.gsap && state.cart.length > 0) {
        gsap.fromTo(cartBadge, { scale: 1.6 }, { scale: 1, duration: 0.3, ease: 'back.out(2)' });
      }
    }

    if (!cartItemsList) return;

    if (state.cart.length === 0) {
      cartItemsList.innerHTML = `
        <div class="py-16 text-center text-slate-400">
          <div class="w-16 h-16 mx-auto mb-3 opacity-40">
            <img src="assets/nose-logo.svg" alt="Empty" class="w-full h-full">
          </div>
          <p class="font-semibold text-slate-600">Your cup is empty</p>
          <p class="text-xs text-slate-400 mt-1">Pick a Warm or Cold Cloud drink to begin!</p>
        </div>
      `;
      if (cartSubtotal) cartSubtotal.textContent = '฿0';
      return;
    }

    cartItemsList.innerHTML = '';
    let total = 0;

    state.cart.forEach((item, idx) => {
      total += item.price;
      const row = document.createElement('div');
      row.className = 'flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100';
      row.innerHTML = `
        <div class="flex items-center gap-3">
          <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-contain rounded-lg">
          <div>
            <h4 class="font-bold text-sm text-slate-900">${item.name}</h4>
            <span class="text-xs font-semibold text-primary">฿${item.price}</span>
          </div>
        </div>
        <button class="btn-remove-item text-slate-400 hover:text-red-500 p-1.5 transition-colors" data-idx="${idx}">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      `;
      cartItemsList.appendChild(row);
    });

    if (cartSubtotal) cartSubtotal.textContent = `฿${total}`;

    document.querySelectorAll('.btn-remove-item').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.idx, 10);
        removeFromCart(idx);
      });
    });
  }

  function createFlyingDrinkParticle(e) {
    if (!btnOpenCart) return;
    const cartRect = btnOpenCart.getBoundingClientRect();
    const startX = e.clientX || window.innerWidth / 2;
    const startY = e.clientY || window.innerHeight / 2;

    const flyEl = document.createElement('div');
    flyEl.className = 'fixed z-[200] pointer-events-none w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white shadow-lg';
    flyEl.innerHTML = '🧋';
    flyEl.style.left = `${startX}px`;
    flyEl.style.top = `${startY}px`;
    document.body.appendChild(flyEl);

    if (window.gsap) {
      gsap.to(flyEl, {
        left: cartRect.left + cartRect.width / 2,
        top: cartRect.top + cartRect.height / 2,
        scale: 0.3,
        opacity: 0.8,
        duration: 0.65,
        ease: 'power2.inOut',
        onComplete: () => {
          flyEl.remove();
          gsap.fromTo(btnOpenCart, { scale: 1.3 }, { scale: 1, duration: 0.25 });
        }
      });
    } else {
      setTimeout(() => flyEl.remove(), 600);
    }
  }

  if (btnCheckout) {
    btnCheckout.addEventListener('click', () => {
      playSound('tone');
      alert('🎉 Order Received! Your Nose Tea Cloud Drinks are being handcrafted with love and fresh cream cheese foam.');
      state.cart = [];
      updateCartDrawer();
      closeCartDrawer();
    });
  }

  // ==========================================
  // 11. SOUND & CAFE BGM CONTROLLER
  // ==========================================
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const soundLabel = document.getElementById('soundLabel');

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      initAudio();
      state.soundEnabled = !state.soundEnabled;
      if (state.soundEnabled) {
        soundToggleBtn.classList.add('sound-playing');
        if (soundLabel) soundLabel.textContent = 'Sound & Cafe BGM: ON';
        playSound('tone');
        startCafeBgm();
      } else {
        soundToggleBtn.classList.remove('sound-playing');
        if (soundLabel) soundLabel.textContent = 'Sound: OFF';
        stopCafeBgm();
      }
    });
  }

  window.addEventListener('click', () => initAudio(), { once: true });

  // Init
  renderDrinksGrid();
  setTone('warm');
  updateDiyCup();
});
