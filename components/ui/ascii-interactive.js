/**
 * Interactive ASCII Art Engine
 * High-performance HTML5 Canvas Interactive ASCII Renderer with Physics, 
 * Hover Dispersion, Matrix Decryption, Spotlight Glow, and Multi-Theme Support.
 */
class InteractiveAscii {
  constructor(container, options = {}) {
    this.container = typeof container === 'string' ? document.querySelector(container) : container;
    if (!this.container) {
      throw new Error(`InteractiveAscii: Container element not found`);
    }

    this.options = {
      imageSrc: options.imageSrc || '',
      columns: options.columns || 110,
      charSet: options.charSet || 'standard',
      theme: options.theme || 'matrix',
      hoverMode: options.hoverMode || 'glitch', // 'repel', 'glitch', 'spotlight', 'wave', 'reveal'
      hoverRadius: options.hoverRadius || 50,
      repelForce: options.repelForce || 28,
      springStiffness: options.springStiffness || 0.12,
      damping: options.damping || 0.82,
      contrast: options.contrast || 1.1,
      brightness: options.brightness || 1.05,
      invert: options.invert || false,
      enableSound: options.enableSound || false,
      enableGlow: options.enableGlow !== undefined ? options.enableGlow : false,
      crop: options.crop !== undefined ? options.crop : { x: 100, y: 20, width: 475, height: 567 },
      fontFamily: options.fontFamily || 'var(--font-mono), "Space Mono", "JetBrains Mono", monospace',
      fontSize: options.fontSize || 0, // 0 = auto calculate
      ...options
    };

    // Strictly pure ASCII art gradient characters (no alphabet, no numbers, no symbols outside ASCII art)
    this.asciiChars = ".:-=+*#%@";

    // Character Sets
    this.charSets = {
      standard: " .':-=+*#%@",
      detailed: " .'`^\",:;Il!i~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$",
      blocks: " ░▒▓█",
      binary: " 01",
      matrix: " ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ123457890:・.=\"*+-<>",
      minimal: " .·:;*+"
    };

    // Color Palettes
    this.themes = {
      marble: {
        bg: '#0a0a0c',
        fg: '#e8e4dc',
        accent: '#ffffff',
        glow: 'rgba(235, 230, 220, 0.45)',
        secondary: '#9c9588'
      },
      matrix: {
        bg: 'transparent',
        fg: '#CBEB3A',
        accent: '#DDF45B',
        glow: 'rgba(203, 235, 58, 0.15)',
        secondary: '#a3e635'
      },
      amber: {
        bg: '#0d0701',
        fg: '#ffb31a',
        accent: '#ffe299',
        glow: 'rgba(255, 179, 26, 0.6)',
        secondary: '#a36a00'
      },
      cyberpunk: {
        bg: '#080514',
        fg: '#00f0ff',
        accent: '#ff007f',
        glow: 'rgba(0, 240, 255, 0.55)',
        secondary: '#7000ff'
      },
      ice: {
        bg: '#040b14',
        fg: '#70d6ff',
        accent: '#e0f7ff',
        glow: 'rgba(112, 214, 255, 0.55)',
        secondary: '#0077b6'
      },
      original: {
        bg: '#08080a',
        fg: 'rgb-sampled',
        accent: '#ffffff',
        glow: 'rgba(255, 255, 255, 0.4)',
        secondary: '#888888'
      }
    };

    this.grid = [];
    this.mouse = {
      x: -9999,
      y: -9999,
      targetX: -9999,
      targetY: -9999,
      isHovering: false,
      speed: 0,
      prevX: 0,
      prevY: 0
    };

    this.time = 0;
    this.audioCtx = null;
    this.audioTickTimeout = 0;
    this.animationFrameId = null;

    this.initCanvas();
    this.initEvents();

    if (this.options.imageSrc) {
      this.loadImage(this.options.imageSrc);
    }
  }

  initCanvas() {
    this.container.innerHTML = '';
    this.container.style.position = 'relative';
    this.container.style.overflow = 'hidden';

    // Canvas element
    this.canvas = document.createElement('canvas');
    this.canvas.style.display = 'block';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.userSelect = 'none';
    this.canvas.style.touchAction = 'none';
    this.ctx = this.canvas.getContext('2d', { alpha: true });

    this.container.appendChild(this.canvas);

    // Offscreen Canvas for Image Pixel Sampling
    this.sampleCanvas = document.createElement('canvas');
    this.sampleCtx = this.sampleCanvas.getContext('2d', { willReadFrequently: true });
  }

  initEvents() {
    const updateMouse = (clientX, clientY) => {
      const rect = this.canvas.getBoundingClientRect();
      const scaleX = this.canvas.width / rect.width;
      const scaleY = this.canvas.height / rect.height;

      const newX = (clientX - rect.left) * scaleX;
      const newY = (clientY - rect.top) * scaleY;

      const dx = newX - this.mouse.x;
      const dy = newY - this.mouse.y;
      this.mouse.speed = Math.sqrt(dx * dx + dy * dy);

      this.mouse.x = newX;
      this.mouse.y = newY;
      this.mouse.isHovering = true;

      if (this.options.enableSound && this.mouse.speed > 5) {
        this.playHoverSound();
      }
    };

    this.canvas.addEventListener('mousemove', (e) => {
      updateMouse(e.clientX, e.clientY);
    });

    this.canvas.addEventListener('mouseenter', (e) => {
      this.mouse.isHovering = true;
      updateMouse(e.clientX, e.clientY);
    });

    this.canvas.addEventListener('mouseleave', () => {
      this.mouse.isHovering = false;
      this.mouse.x = -9999;
      this.mouse.y = -9999;
    });

    // Touch Support
    this.canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        this.mouse.isHovering = true;
        updateMouse(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    this.canvas.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        this.mouse.isHovering = true;
        updateMouse(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    this.canvas.addEventListener('touchend', () => {
      this.mouse.isHovering = false;
      this.mouse.x = -9999;
      this.mouse.y = -9999;
    });

    // Resize Observer for auto responsive sizing
    this.resizeObserver = new ResizeObserver(() => {
      if (this.img) {
        this.resize();
      }
    });
    this.resizeObserver.observe(this.container);

    // Visibility & Intersection Observers to eliminate offscreen CPU consumption
    this.isVisible = true;
    if (typeof IntersectionObserver !== "undefined") {
      this.intersectionObserver = new IntersectionObserver((entries) => {
        const entry = entries[0];
        this.isVisible = entry ? entry.isIntersecting : true;
        if (this.isVisible && !document.hidden) {
          this.startLoop();
        } else {
          this.stopLoop();
        }
      }, { rootMargin: "200px 0px" });
      this.intersectionObserver.observe(this.container);
    }

    this.onVisibilityChange = () => {
      if (document.hidden) {
        this.stopLoop();
      } else if (this.isVisible) {
        this.startLoop();
      }
    };
    document.addEventListener("visibilitychange", this.onVisibilityChange);
  }

  playHoverSound() {
    const now = Date.now();
    if (now - this.audioTickTimeout < 40) return;
    this.audioTickTimeout = now;

    try {
      if (!this.audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.audioCtx = new AudioContext();
      }
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      const freq = 600 + Math.random() * 1200;
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

      gain.gain.setValueAtTime(0.012, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.04);
    } catch (e) {
      // Audio context might fail before user interaction
    }
  }

  loadImage(src) {
    this.img = new Image();
    this.img.crossOrigin = 'anonymous';
    this.img.onload = () => {
      this.resize();
      this.startLoop();
    };

    this.img.onerror = (e) => {
      // Build robust fallback list
      const fallbacks = [];
      if (src.includes('/IEEE.Webpage/IEEE.Webpage/')) {
        fallbacks.push(src.replace('/IEEE.Webpage/IEEE.Webpage/', '/IEEE.Webpage/'));
      }
      if (!src.startsWith('http')) {
        const hasBase = typeof window !== 'undefined' && window.location.pathname.startsWith('/IEEE.Webpage');
        if (hasBase) {
          fallbacks.push('/IEEE.Webpage/assets/acsii.jpg');
          fallbacks.push('/IEEE.Webpage/acsii.jpg');
        }
        fallbacks.push('/assets/acsii.jpg');
        fallbacks.push('/acsii.jpg');
        fallbacks.push('./assets/acsii.jpg');
      }

      const tryNext = (idx) => {
        if (idx >= fallbacks.length) return;
        const fallbackSrc = fallbacks[idx];
        if (fallbackSrc === src) {
          tryNext(idx + 1);
          return;
        }
        const fallbackImg = new Image();
        fallbackImg.crossOrigin = 'anonymous';
        fallbackImg.onload = () => {
          this.img = fallbackImg;
          this.resize();
          this.startLoop();
        };
        fallbackImg.onerror = () => tryNext(idx + 1);
        fallbackImg.src = fallbackSrc;
      };

      tryNext(0);
    };

    this.img.src = src;
    if (this.img.complete && this.img.naturalWidth > 0) {
      this.resize();
      this.startLoop();
    }
  }

  resize() {
    const rect = this.container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const width = rect.width || 600;
    const crop = this.options.crop;
    const aspectRatio = crop 
      ? (crop.height / crop.width) 
      : (this.img ? (this.img.height / this.img.width) : 0.87);
    const height = rect.height || (width * aspectRatio);

    this.canvas.width = Math.round(width * dpr);
    this.canvas.height = Math.round(height * dpr);

    this.buildGrid();
  }

  buildGrid() {
    if (!this.img || !this.canvas.width || !this.canvas.height) return;

    const cols = this.options.columns;
    const cellWidth = this.canvas.width / cols;
    // Monospace fonts have approx 1:1.6 to 1:1.8 ratio (height = 1.7 * width)
    const fontAspect = 1.7;
    const cellHeight = cellWidth * fontAspect;
    const rows = Math.ceil(this.canvas.height / cellHeight);

    this.cellWidth = cellWidth;
    this.cellHeight = cellHeight;
    this.fontSize = this.options.fontSize || Math.max(10, Math.floor(cellWidth * 1.55));

    // Sample Image Pixels
    this.sampleCanvas.width = cols;
    this.sampleCanvas.height = rows;

    const crop = this.options.crop;
    if (crop) {
      this.sampleCtx.drawImage(this.img, crop.x, crop.y, crop.width, crop.height, 0, 0, cols, rows);
    } else {
      this.sampleCtx.drawImage(this.img, 0, 0, cols, rows);
    }
    const imgData = this.sampleCtx.getImageData(0, 0, cols, rows).data;

    const charList = this.charSets[this.options.charSet] || this.charSets.standard;
    this.grid = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const idx = (r * cols + c) * 4;
        let red = imgData[idx];
        let green = imgData[idx + 1];
        let blue = imgData[idx + 2];
        const alpha = imgData[idx + 3] / 255;

        // Apply contrast & brightness
        let bright = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;
        bright = ((bright - 0.5) * this.options.contrast + 0.5) * this.options.brightness;
        bright = Math.max(0, Math.min(1, bright));

        if (this.options.invert) {
          bright = 1 - bright;
        }

        // Soft edge feathering so boundaries dissolve smoothly into transparent obsidian
        let edgeFade = 1.0;

        // 1. Bottom fade: Deep, smooth sinusoidal fade over bottom 28% of rows to dissolve the torso cut into smoke
        const bottomFadeRows = Math.max(14, Math.floor(rows * 0.28));
        if (r > rows - bottomFadeRows) {
          const t = Math.max(0, Math.min(1, (rows - 1 - r) / (bottomFadeRows - 1)));
          edgeFade *= 0.5 * (1 - Math.cos(Math.PI * t));
        }

        // 2. Top fade: Soft gentle fade over top 8% of rows
        const topFadeRows = Math.max(3, Math.floor(rows * 0.08));
        if (r < topFadeRows) {
          const t = Math.max(0, Math.min(1, r / (topFadeRows - 1)));
          edgeFade *= 0.5 * (1 - Math.cos(Math.PI * t));
        }

        // 3. Right edge fade: Soft fade over right 7% of columns to dissolve the right edge gracefully without retreating from the right end
        const rightFadeCols = Math.max(6, Math.floor(cols * 0.07));
        if (c > cols - rightFadeCols) {
          const t = Math.max(0, Math.min(1, (cols - 1 - c) / (rightFadeCols - 1)));
          edgeFade *= 0.5 * (1 - Math.cos(Math.PI * t));
        }

        // 4. Left edge fade: Soft fade over left 12% of columns
        const leftFadeCols = Math.max(8, Math.floor(cols * 0.12));
        if (c < leftFadeCols) {
          const t = Math.max(0, Math.min(1, c / (leftFadeCols - 1)));
          edgeFade *= 0.5 * (1 - Math.cos(Math.PI * t));
        }

        bright = bright * edgeFade;

        const charIdx = Math.floor(bright * (charList.length - 1));
        const char = charList[Math.max(0, Math.min(charList.length - 1, charIdx))];

        const baseX = c * cellWidth + cellWidth / 2;
        const baseY = r * cellHeight + cellHeight / 2;

        this.grid.push({
          col: c,
          row: r,
          origX: baseX,
          origY: baseY,
          x: baseX,
          y: baseY,
          vx: 0,
          vy: 0,
          char: char,
          brightness: bright,
          edgeFade: edgeFade,
          r: red,
          g: green,
          b: blue,
          alpha: alpha,
          scrambleChar: char,
          scrambleTimer: 0,
          glitchPhase: Math.random() * 10,
          proximity: 0
        });
      }
    }
  }

  update() {
    this.time += 0.035;
    const { hoverMode, hoverRadius, repelForce, springStiffness, damping } = this.options;
    const mx = this.mouse.x;
    const my = this.mouse.y;
    const hasMouse = this.mouse.isHovering;
    const charList = this.charSets[this.options.charSet] || this.charSets.standard;

    for (let i = 0; i < this.grid.length; i++) {
      const p = this.grid[i];
      const dx = p.x - mx;
      const dy = p.y - my;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Calculate Proximity factor (0 = far, 1 = direct hover)
      let targetProximity = 0;
      if (hasMouse && dist < hoverRadius) {
        targetProximity = Math.pow(1 - dist / hoverRadius, 1.5);
      }
      p.proximity += (targetProximity - p.proximity) * 0.18;

      // Effect Specific Behavior
      if (hasMouse && dist < hoverRadius && dist > 0.001) {
        const factor = 1 - (dist / hoverRadius);

        if (hoverMode === 'repel') {
          // Physics Dispersion / Magnetic Repulsion
          const force = factor * repelForce;
          const angle = Math.atan2(dy, dx);
          p.vx += Math.cos(angle) * force;
          p.vy += Math.sin(angle) * force;
        } else if (hoverMode === 'wave') {
          // Liquid Wave Ripple
          const wave = Math.sin(dist * 0.06 - this.time * 4) * 8 * factor;
          p.vx += (dx / dist) * wave;
          p.vy += (dy / dist) * wave;
        } else if (hoverMode === 'glitch') {
          // Subtle, low-intensity ASCII shimmer: only existing visible characters change to random ASCII art symbols
          if (p.char && p.char !== ' ' && p.brightness >= 0.14) {
            if (Math.random() < 0.18 + factor * 0.15) {
              const chars = this.asciiChars;
              let nextChar = p.char;
              for (let t = 0; t < 3; t++) {
                const candidate = chars[Math.floor(Math.random() * chars.length)];
                if (candidate !== p.char) {
                  nextChar = candidate;
                  break;
                }
              }
              p.scrambleChar = nextChar;
              p.scrambleTimer = 5; // Fast, subtle 5-frame recovery (~80ms)
            }
          }
        }
      }

      // Handle Scramble recovery
      if (p.scrambleTimer > 0) {
        p.scrambleTimer--;
        if (p.scrambleTimer === 0) {
          p.scrambleChar = p.char;
        }
      }

      // In glitch mode, freeze particles strictly to their origin (no displacement)
      if (hoverMode === 'glitch') {
        p.vx = 0;
        p.vy = 0;
        p.x = p.origX;
        p.y = p.origY;
      } else {
        // Spring Physics back to original position
        const springX = (p.origX - p.x) * springStiffness;
        const springY = (p.origY - p.y) * springStiffness;

        p.vx = (p.vx + springX) * damping;
        p.vy = (p.vy + springY) * damping;

        p.x += p.vx;
        p.y += p.vy;
      }
    }
  }

  render() {
    const { ctx, canvas } = this;
    const theme = this.themes[this.options.theme] || this.themes.marble;
    const isRgb = this.options.theme === 'original';

    // Clear Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (theme.bg && theme.bg !== 'transparent') {
      ctx.fillStyle = theme.bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    ctx.font = `bold ${this.fontSize}px ${this.options.fontFamily}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Render original image underlay if 'reveal' mode is active
    if (this.options.hoverMode === 'reveal' && this.mouse.isHovering && this.img) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.mouse.x, this.mouse.y, this.options.hoverRadius * 1.2, 0, Math.PI * 2);
      ctx.clip();
      ctx.globalAlpha = 0.85;
      ctx.drawImage(this.img, 0, 0, canvas.width, canvas.height);
      ctx.restore();
    }

    const hoverMode = this.options.hoverMode;

    for (let i = 0; i < this.grid.length; i++) {
      const p = this.grid[i];

      // Skip rendering empty spaces / dark background strictly
      if (p.brightness < 0.075 || (p.edgeFade !== undefined && p.edgeFade < 0.03)) continue;

      const charToDraw = (hoverMode === 'glitch' && p.scrambleTimer > 0) ? p.scrambleChar : p.char;
      if (!charToDraw || charToDraw === ' ') continue;

      let color;
      // Smooth continuous alpha scaling that dissolves organically into obsidian without any stepped cliff
      let alpha = Math.min(1, p.brightness * 1.25) * (p.edgeFade !== undefined ? p.edgeFade : 1.0);
      if (alpha < 0.035) continue;

      if (isRgb) {
        // Sampled RGB
        const boost = 1 + p.proximity * 0.4;
        const r = Math.min(255, Math.round(p.r * boost));
        const g = Math.min(255, Math.round(p.g * boost));
        const b = Math.min(255, Math.round(p.b * boost));
        color = `rgba(${r}, ${g}, ${b}, ${alpha})`;
      } else if (p.proximity > 0.35 && p.scrambleTimer > 0) {
        color = theme.accent || '#DDF45B';
      } else {
        color = theme.fg;
      }

      ctx.fillStyle = color;
      ctx.globalAlpha = alpha;
      ctx.shadowBlur = 0; // Zero bloom blur for clean, crisp rendering

      ctx.fillText(charToDraw, p.x, p.y);
    }

    ctx.globalAlpha = 1.0;
    ctx.shadowBlur = 0;

    // Optional Spotlight Halo on mouse
    if (this.options.hoverMode === 'spotlight' && this.mouse.isHovering) {
      const grad = ctx.createRadialGradient(
        this.mouse.x, this.mouse.y, 0,
        this.mouse.x, this.mouse.y, this.options.hoverRadius * 1.3
      );
      grad.addColorStop(0, theme.glow);
      grad.addColorStop(0.5, 'rgba(255,255,255,0.05)');
      grad.addColorStop(1, 'transparent');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(this.mouse.x, this.mouse.y, this.options.hoverRadius * 1.3, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  startLoop() {
    if (this.animationFrameId) return;
    if (!this.isVisible || (typeof document !== 'undefined' && document.hidden)) return;

    const loop = () => {
      if (!this.isVisible || (typeof document !== 'undefined' && document.hidden)) {
        this.stopLoop();
        return;
      }
      this.update();
      this.render();
      this.animationFrameId = requestAnimationFrame(loop);
    };
    this.animationFrameId = requestAnimationFrame(loop);
  }

  stopLoop() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  setOption(key, value) {
    this.options[key] = value;
    if (['columns', 'charSet', 'contrast', 'brightness', 'invert', 'fontSize'].includes(key)) {
      this.buildGrid();
    }
  }

  setTheme(themeName) {
    if (this.themes[themeName]) {
      this.options.theme = themeName;
    }
  }

  setHoverMode(mode) {
    this.options.hoverMode = mode;
  }

  destroy() {
    this.stopLoop();
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
    if (this.onVisibilityChange && typeof document !== 'undefined') {
      document.removeEventListener('visibilitychange', this.onVisibilityChange);
    }
    if (this.container) {
      this.container.innerHTML = '';
    }
  }
}

// Auto-register as Web Component <interactive-ascii> if supported
if (typeof customElements !== 'undefined' && !customElements.get('interactive-ascii')) {
  class InteractiveAsciiElement extends HTMLElement {
    connectedCallback() {
      const src = this.getAttribute('src');
      const theme = this.getAttribute('theme') || 'marble';
      const hoverMode = this.getAttribute('hover-mode') || 'repel';
      const columns = parseInt(this.getAttribute('columns') || '110', 10);
      const enableGlow = this.getAttribute('glow') !== 'false';

      this.ascii = new InteractiveAscii(this, {
        imageSrc: src,
        theme,
        hoverMode,
        columns,
        enableGlow
      });
    }

    disconnectedCallback() {
      if (this.ascii) {
        this.ascii.destroy();
      }
    }
  }
  customElements.define('interactive-ascii', InteractiveAsciiElement);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = InteractiveAscii;
}

export default InteractiveAscii;
