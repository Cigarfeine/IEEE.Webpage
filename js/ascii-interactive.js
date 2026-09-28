/**
 * Interactive ASCII Art Engine — Ultra-Smooth Minimal Matrix Hover Edition
 * Optimized for Refined Editorial Scale, Elegant Alignment, and Subtle Ember Matrix Shimmer
 */
class InteractiveAscii {
  constructor(container, options = {}) {
    this.container = typeof container === 'string' ? document.querySelector(container) : container;
    if (!this.container) {
      throw new Error('InteractiveAscii: Container element not found');
    }

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

    this.options = {
      imageSrc: options.imageSrc || '',
      columns: options.columns || (isMobile ? 95 : 145),
      charSet: options.charSet || 'detailed',
      theme: options.theme || 'habito',
      hoverRadius: options.hoverRadius || 24, // Minimal delicate hover radius
      contrast: options.contrast || 1.18,
      brightness: options.brightness || 1.08,
      invert: options.invert || false,
      enableGlow: options.enableGlow !== undefined ? options.enableGlow : true,
      transparentBg: options.transparentBg !== undefined ? options.transparentBg : true,
      bgThreshold: options.bgThreshold !== undefined ? options.bgThreshold : 0.08,
      featherWidth: options.featherWidth !== undefined ? options.featherWidth : 0.10,
      autoCrop: options.autoCrop !== undefined ? options.autoCrop : true,
      fontFamily: options.fontFamily || '"Geist Mono", "JetBrains Mono", "Space Mono", "Courier New", monospace',
      fontSize: options.fontSize || 0,
      ...options
    };

    // 70-Character Precision Monospace Glyph Ramp & Subtle Matrix Character Sets
    this.charSets = {
      detailed: " .'`^\",:;Il!i><~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$",
      matrix: " +-=~*01:·/\\ｦｱｳｴｶｷｹｺｻｼﾀﾂﾃﾅﾆﾊﾋﾏﾐﾔﾕﾗﾘ12345789",
      standard: " .':-=+*#%@",
      blocks: " ░▒▓█"
    };

    // Themes
    this.themes = {
      habito: {
        bg: '#080c0a',
        fg: '#cbeb3a',
        accent: '#ffffff',
        highlight: '#f7f7f5',
        glow: 'rgba(203, 235, 58, 0.45)',
        secondary: '#01565b',
        ember: '#013a3d'
      },
      goodfella: {
        bg: '#080c0a',
        fg: '#ff4d26',
        accent: '#ffaa66',
        highlight: '#ffcca0',
        glow: 'rgba(255, 77, 38, 0.65)',
        secondary: '#bf2e06',
        ember: '#5e1402'
      },
      marble: {
        bg: '#060a08',
        fg: '#f0ece1',
        accent: '#ffffff',
        highlight: '#ffffff',
        glow: 'rgba(245, 240, 230, 0.4)',
        secondary: '#a39b8c',
        ember: '#3a3832'
      },
      amber: {
        bg: '#0d0701',
        fg: '#ffb31a',
        accent: '#ffe299',
        highlight: '#fff2cc',
        glow: 'rgba(255, 179, 26, 0.6)',
        secondary: '#a36a00',
        ember: '#472e00'
      },
      matrix: {
        bg: '#020b05',
        fg: '#00ff66',
        accent: '#a8ffc4',
        highlight: '#ffffff',
        glow: 'rgba(0, 255, 102, 0.65)',
        secondary: '#008f39',
        ember: '#003b17'
      }
    };

    this.grid = [];
    this.grid2D = [];
    this.activePoints = new Set();
    this.crop = null;

    this.mouse = {
      x: -9999,
      y: -9999,
      isHovering: false
    };

    // Cached Bounding Rects to avoid forced synchronous layout reflows on mousemove
    this.cachedRect = null;
    this.scaleX = 1;
    this.scaleY = 1;

    this.animationFrameId = null;
    this.isSleeping = true;
    this.isVisible = true;

    this.initCanvas();
    this.initEvents();

    if (this.options.imageSrc) {
      this.loadImage(this.options.imageSrc);
    }
  }

  initCanvas() {
    this.container.innerHTML = '';
    this.container.style.position = 'relative';

    // Main visible Canvas
    this.canvas = document.createElement('canvas');
    this.canvas.style.display = 'block';
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';
    this.canvas.style.userSelect = 'none';
    this.canvas.style.touchAction = 'none';
    this.canvas.style.cursor = 'default';
    this.ctx = this.canvas.getContext('2d', { alpha: true });

    this.container.appendChild(this.canvas);

    // Offscreen Canvas for pixel sampling
    this.sampleCanvas = document.createElement('canvas');
    this.sampleCtx = this.sampleCanvas.getContext('2d', { willReadFrequently: true });

    // Offscreen Canvas for smooth anti-aliased silhouette mask
    this.maskCanvas = document.createElement('canvas');
    this.maskCtx = this.maskCanvas.getContext('2d', { alpha: true });

    // Offscreen Canvas for pre-rendered base static ASCII text
    this.staticCanvas = document.createElement('canvas');
    this.staticCtx = this.staticCanvas.getContext('2d', { alpha: true });
  }

  updateRect() {
    if (!this.canvas) return;
    this.cachedRect = this.canvas.getBoundingClientRect();
    if (this.cachedRect.width > 0 && this.cachedRect.height > 0) {
      this.scaleX = this.canvas.width / this.cachedRect.width;
      this.scaleY = this.canvas.height / this.cachedRect.height;
    }
  }

  initEvents() {
    const handlePointerMove = (clientX, clientY) => {
      if (!this.cachedRect) {
        this.updateRect();
      }

      this.mouse.x = (clientX - this.cachedRect.left) * this.scaleX;
      this.mouse.y = (clientY - this.cachedRect.top) * this.scaleY;
      this.mouse.isHovering = true;

      this.wake();
    };

    this.canvas.addEventListener('mouseenter', (e) => {
      this.updateRect();
      this.mouse.isHovering = true;
      handlePointerMove(e.clientX, e.clientY);
    }, { passive: true });

    this.canvas.addEventListener('mousemove', (e) => {
      handlePointerMove(e.clientX, e.clientY);
    }, { passive: true });

    this.canvas.addEventListener('mouseleave', () => {
      this.mouse.isHovering = false;
      this.mouse.x = -9999;
      this.mouse.y = -9999;
      this.wake(); // Final wake to let remaining active matrix glyphs decay and sleep
    }, { passive: true });

    // Touch Support
    this.canvas.addEventListener('touchstart', (e) => {
      this.updateRect();
      if (e.touches.length > 0) {
        this.mouse.isHovering = true;
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    this.canvas.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        this.mouse.isHovering = true;
        handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    this.canvas.addEventListener('touchend', () => {
      this.mouse.isHovering = false;
      this.mouse.x = -9999;
      this.mouse.y = -9999;
      this.wake();
    }, { passive: true });

    // Scroll updates rect
    window.addEventListener('scroll', () => {
      this.cachedRect = null;
    }, { passive: true });

    // Auto-pause when element is out of viewport
    if (typeof IntersectionObserver !== 'undefined') {
      this.intersectionObserver = new IntersectionObserver(([entry]) => {
        this.isVisible = entry.isIntersecting;
        if (!this.isVisible) {
          this.sleep();
        }
      }, { threshold: 0.05 });
      this.intersectionObserver.observe(this.container);
    }

    // Auto resize
    this.resizeObserver = new ResizeObserver(() => {
      this.cachedRect = null;
      if (this.img) {
        this.resize();
      }
    });
    this.resizeObserver.observe(this.container);
  }

  detectCropBounds() {
    if (!this.img || !this.options.autoCrop) {
      this.crop = { x: 0, y: 0, width: this.img.width, height: this.img.height };
      return;
    }

    const c = document.createElement('canvas');
    c.width = this.img.width;
    c.height = this.img.height;
    const ctx = c.getContext('2d', { willReadFrequently: true });
    ctx.drawImage(this.img, 0, 0);
    const data = ctx.getImageData(0, 0, c.width, c.height).data;

    let minX = c.width, maxX = 0, minY = c.height, maxY = 0;
    for (let y = 0; y < c.height; y++) {
      for (let x = 0; x < c.width; x++) {
        const idx = (y * c.width + x) * 4;
        const bright = (0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2]);
        if (bright > 18) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    // Flush crop removing all dead empty space on right and bottom
    const cropLeft = Math.max(0, minX - 10);
    const cropTop = Math.max(0, minY - 10);
    const cropRight = Math.min(c.width, maxX + 2);
    const cropBottom = c.height;

    this.crop = {
      x: cropLeft,
      y: cropTop,
      width: Math.max(10, cropRight - cropLeft),
      height: Math.max(10, cropBottom - cropTop)
    };

    if (this.container) {
      this.container.style.aspectRatio = `${this.crop.width} / ${this.crop.height}`;
    }
  }

  loadImage(src) {
    this.img = new Image();
    this.img.crossOrigin = 'anonymous';
    this.img.onload = () => {
      this.detectCropBounds();
      this.resize();
    };
    this.img.src = src;
  }

  resize() {
    if (this.img && !this.crop) {
      this.detectCropBounds();
    }

    const rect = this.container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const width = rect.width || 560;
    const aspectRatio = this.crop ? (this.crop.height / this.crop.width) : (this.img ? (this.img.height / this.img.width) : 0.87);
    const height = rect.height || (width * aspectRatio);

    this.canvas.width = Math.round(width * dpr);
    this.canvas.height = Math.round(height * dpr);

    this.maskCanvas.width = this.canvas.width;
    this.maskCanvas.height = this.canvas.height;

    this.staticCanvas.width = this.canvas.width;
    this.staticCanvas.height = this.canvas.height;

    this.updateRect();
    this.buildGrid();

    // Render initial static state once and sleep
    this.renderBaseStatic();
    this.sleep();
  }

  /**
   * Multi-stop fiery vermilion color interpolation with smooth edge alpha support
   */
  getColorForBrightness(bright, themeName, edgeAlpha = 1.0) {
    if (themeName === 'goodfella' || themeName === 'vermilion') {
      let r, g, b, baseAlpha;
      if (bright > 0.82) {
        const t = (bright - 0.82) / 0.18;
        r = 255;
        g = Math.round(180 + t * 45);
        b = Math.round(120 + t * 65);
        baseAlpha = 1.0;
      } else if (bright > 0.58) {
        const t = (bright - 0.58) / 0.24;
        r = 255;
        g = Math.round(80 + t * 100);
        b = Math.round(26 + t * 94);
        baseAlpha = 0.98;
      } else if (bright > 0.38) {
        const t = (bright - 0.38) / 0.20;
        r = Math.round(215 + t * 40);
        g = Math.round(42 + t * 38);
        b = Math.round(8 + t * 18);
        baseAlpha = 0.92;
      } else if (bright > 0.20) {
        const t = (bright - 0.20) / 0.18;
        r = Math.round(125 + t * 90);
        g = Math.round(22 + t * 20);
        b = Math.round(4 + t * 4);
        baseAlpha = 0.82;
      } else {
        const t = Math.max(0, bright - 0.06) / 0.14;
        r = Math.round(55 + t * 70);
        g = Math.round(8 + t * 14);
        b = Math.round(2 + t * 2);
        baseAlpha = 0.40 + t * 0.40;
      }
      const finalA = Math.max(0, Math.min(1, baseAlpha * edgeAlpha));
      return `rgba(${r}, ${g}, ${b}, ${finalA.toFixed(3)})`;
    }

    const theme = this.themes[themeName] || this.themes.goodfella;
    return theme.fg;
  }

  buildGrid() {
    if (!this.img || !this.canvas.width || !this.canvas.height) return;

    const cols = this.options.columns;
    const cellWidth = this.canvas.width / cols;
    const fontAspect = 1.68;
    const cellHeight = cellWidth * fontAspect;
    const rows = Math.ceil(this.canvas.height / cellHeight);

    this.cols = cols;
    this.rows = rows;
    this.cellWidth = cellWidth;
    this.cellHeight = cellHeight;
    this.fontSize = this.options.fontSize || Math.max(9, Math.floor(cellWidth * 1.55));

    // Sample Image Pixels from cropped bounding rectangle
    const cropX = this.crop ? this.crop.x : 0;
    const cropY = this.crop ? this.crop.y : 0;
    const cropW = this.crop ? this.crop.width : this.img.width;
    const cropH = this.crop ? this.crop.height : this.img.height;

    this.sampleCanvas.width = cols;
    this.sampleCanvas.height = rows;
    this.sampleCtx.drawImage(this.img, cropX, cropY, cropW, cropH, 0, 0, cols, rows);
    const imgData = this.sampleCtx.getImageData(0, 0, cols, rows).data;

    const charList = this.charSets[this.options.charSet] || this.charSets.detailed;
    const bgThreshold = this.options.bgThreshold || 0.085;

    // Pass 1: Raw brightness and initial solid mask
    const rawBright = Array.from({ length: rows }, () => new Float32Array(cols));
    const isSolidGrid = Array.from({ length: rows }, () => new Uint8Array(cols));

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const idx = (r * cols + c) * 4;
        let bright = (0.299 * imgData[idx] + 0.587 * imgData[idx + 1] + 0.114 * imgData[idx + 2]) / 255;
        bright = ((bright - 0.5) * this.options.contrast + 0.5) * this.options.brightness;
        bright = Math.max(0, Math.min(1, bright));

        if (this.options.invert) {
          bright = 1 - bright;
        }

        rawBright[r][c] = bright;
        if (bright > bgThreshold) {
          isSolidGrid[r][c] = 1;
        }
      }
    }

    // Pass 2: Prune lone background noise speckles (must have at least 2 solid neighbors)
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (!isSolidGrid[r][c]) continue;
        let neighbors = 0;
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            if (dr === 0 && dc === 0) continue;
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && isSolidGrid[nr][nc]) {
              neighbors++;
            }
          }
        }
        if (neighbors <= 1) {
          isSolidGrid[r][c] = 0;
          rawBright[r][c] = 0;
        }
      }
    }

    // Edge glyph ramps for smooth, anti-aliased organic contour transitions
    const edgeGlyphs = " ·.'`:,;~-+/";
    const topEdgeGlyphs = " `'^\":·.";
    const bottomEdgeGlyphs = " _,.-~·";

    this.grid = [];
    this.grid2D = Array.from({ length: rows }, () => []);
    this.activePoints.clear();

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const isSolid = isSolidGrid[r][c] === 1;
        let bright = rawBright[r][c];

        let char = ' ';
        let edgeAlpha = 1.0;

        if (isSolid) {
          // Check for boundary condition against 8 neighbors
          let emptyCount = 0;
          let emptyTop = false, emptyBottom = false, emptyLeft = false, emptyRight = false;

          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              if (dr === 0 && dc === 0) continue;
              const nr = r + dr;
              const nc = c + dc;
              if (nr < 0 || nr >= rows || nc < 0 || nc >= cols || !isSolidGrid[nr][nc]) {
                emptyCount++;
                if (dr === -1 && dc === 0) emptyTop = true;
                if (dr === 1 && dc === 0) emptyBottom = true;
                if (dr === 0 && dc === -1) emptyLeft = true;
                if (dr === 0 && dc === 1) emptyRight = true;
              }
            }
          }

          if (emptyCount > 0) {
            // OUTER CONTOUR CELL: Replace heavy blocky characters with soft contour glyphs & feathered opacity
            if (emptyTop && !emptyBottom) {
              const eIdx = Math.floor(bright * (topEdgeGlyphs.length - 1));
              char = topEdgeGlyphs[Math.max(0, Math.min(topEdgeGlyphs.length - 1, eIdx))];
            } else if (emptyBottom && !emptyTop) {
              const eIdx = Math.floor(bright * (bottomEdgeGlyphs.length - 1));
              char = bottomEdgeGlyphs[Math.max(0, Math.min(bottomEdgeGlyphs.length - 1, eIdx))];
            } else {
              const eIdx = Math.floor(bright * (edgeGlyphs.length - 1));
              char = edgeGlyphs[Math.max(0, Math.min(edgeGlyphs.length - 1, eIdx))];
            }

            // Smooth cubic feathering based on exposure to empty space
            const openness = emptyCount / 8;
            edgeAlpha = Math.max(0.20, Math.min(0.70, (1 - openness * 0.72) * (0.35 + 0.65 * bright)));
          } else {
            // INNER SOLID CELL: Full precision glyph
            const charIdx = Math.floor(bright * (charList.length - 1));
            char = charList[Math.max(0, Math.min(charList.length - 1, charIdx))];
            edgeAlpha = 1.0;
          }

          // BOTTOM DISSOLVE: Smooth cinematic gradient fadeout over bottom 8 rows
          if (r >= rows - 8) {
            const distFromBottom = rows - 1 - r;
            const bottomFade = Math.pow((distFromBottom + 1) / 8, 1.35);
            edgeAlpha *= bottomFade;

            if (r >= rows - 2) {
              char = bright > 0.35 ? '.' : (bright > 0.2 ? '·' : ' ');
            }
          }
        }

        const baseX = c * cellWidth + cellWidth / 2;
        const baseY = r * cellHeight + cellHeight / 2;

        const point = {
          col: c,
          row: r,
          x: baseX,
          y: baseY,
          char: char,
          brightness: bright,
          edgeAlpha: edgeAlpha,
          isSolid: isSolid && char !== ' ' && edgeAlpha > 0.02,
          scrambleChar: char,
          scrambleTimer: 0,
          isGlitching: false
        };

        this.grid.push(point);
        this.grid2D[r][c] = point;
      }
    }

    this.preRenderStaticLayers();
  }

  /**
   * Pre-renders the base static ASCII glyphs with pure transparent background (no muddy mask)
   */
  preRenderStaticLayers() {
    const { staticCtx, canvas } = this;
    const themeName = this.options.theme;

    // Base Static ASCII Glyphs with Feathered Edge Alphas
    staticCtx.clearRect(0, 0, canvas.width, canvas.height);
    staticCtx.font = `bold ${this.fontSize}px ${this.options.fontFamily}`;
    staticCtx.textAlign = 'center';
    staticCtx.textBaseline = 'middle';

    for (let i = 0; i < this.grid.length; i++) {
      const p = this.grid[i];
      if (!p.isSolid || !p.char || p.char === ' ' || p.edgeAlpha <= 0.01) continue;

      staticCtx.fillStyle = this.getColorForBrightness(p.brightness, themeName, p.edgeAlpha);
      staticCtx.fillText(p.char, p.x, p.y);
    }
  }

  renderBaseStatic() {
    const { ctx, canvas } = this;
    const theme = this.themes[this.options.theme] || this.themes.goodfella;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!this.options.transparentBg) {
      ctx.fillStyle = theme.bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    ctx.drawImage(this.staticCanvas, 0, 0);
  }

  wake() {
    this.isSleeping = false;
    if (!this.animationFrameId && this.isVisible) {
      this.startLoop();
    }
  }

  sleep() {
    this.isSleeping = true;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  /**
   * Ultra-Light Minimal Matrix Hover Update:
   * Scrambles only ~3-6 cells delicately under the cursor tip for a subtle cybernetic ember feel
   */
  update() {
    const radius = (this.options.hoverRadius || 24) * (this.scaleX || 1);
    const mx = this.mouse.x;
    const my = this.mouse.y;
    const hasMouse = this.mouse.isHovering;
    const matrixChars = this.charSets.matrix || this.charSets.detailed;

    // Fast Spatial Lookup for cursor neighborhood
    if (hasMouse && mx > -500) {
      const minCol = Math.max(0, Math.floor((mx - radius) / this.cellWidth));
      const maxCol = Math.min(this.cols - 1, Math.ceil((mx + radius) / this.cellWidth));
      const minRow = Math.max(0, Math.floor((my - radius) / this.cellHeight));
      const maxRow = Math.min(this.rows - 1, Math.ceil((my + radius) / this.cellHeight));

      for (let r = minRow; r <= maxRow; r++) {
        for (let c = minCol; c <= maxCol; c++) {
          const p = this.grid2D[r][c];
          if (!p || !p.isSolid) continue;

          const dx = p.x - mx;
          const dy = p.y - my;
          const dist = Math.hypot(dx, dy);

          // Minimal, sparse shimmer: only ~22% of cells flicker delicately, keeping it subtle
          if (dist < radius && Math.random() < 0.22) {
            p.scrambleChar = matrixChars[Math.floor(Math.random() * matrixChars.length)];
            p.scrambleTimer = 3; // Fast 3-frame decay
            p.isGlitching = true;
            this.activePoints.add(p);
          }
        }
      }
    }

    // Decay matrix glitch on active points
    if (this.activePoints.size > 0) {
      const toRemove = [];

      for (const p of this.activePoints) {
        if (p.scrambleTimer > 0) {
          p.scrambleTimer--;
        }

        if (p.scrambleTimer <= 0) {
          p.scrambleChar = p.char;
          p.isGlitching = false;
          toRemove.push(p);
        }
      }

      for (let i = 0; i < toRemove.length; i++) {
        this.activePoints.delete(toRemove[i]);
      }
    }
  }

  /**
   * Ultra-Fast 144Hz Render:
   * 1. Blits pre-rendered base in 1 GPU drawImage
   * 2. Overdraws only the subtle matrix glitch glyphs in harmonious warm ember colors
   *    with zero character smearing (cleanly wipes underlying cell)
   */
  render() {
    const { ctx, canvas } = this;
    const theme = this.themes[this.options.theme] || this.themes.goodfella;

    // If no active glitch particles and not hovering, render static and sleep immediately!
    if (!this.mouse.isHovering && this.activePoints.size === 0) {
      this.renderBaseStatic();
      this.sleep();
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. Blit static base in 1 GPU call
    if (!this.options.transparentBg) {
      ctx.fillStyle = theme.bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.drawImage(this.staticCanvas, 0, 0);

    // 2. Overdraw only the active matrix glitch glyphs with warm ember tones
    if (this.activePoints.size > 0) {
      ctx.font = `bold ${this.fontSize}px ${this.options.fontFamily}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for (const p of this.activePoints) {
        if (!p.isSolid) continue;

        const cellX = p.x - this.cellWidth * 0.5;
        const cellY = p.y - this.cellHeight * 0.5;

        // Cleanly wipe the cell base glyph so characters never smear or overlap
        ctx.clearRect(cellX, cellY, this.cellWidth, this.cellHeight);
        if (!this.options.transparentBg) {
          ctx.fillStyle = theme.bg;
          ctx.fillRect(cellX, cellY, this.cellWidth, this.cellHeight);
        }

        // Harmonious ember tone matching sculpture palette
        ctx.fillStyle = p.scrambleTimer === 3 ? '#FFD4B2' : '#FFAA66';
        ctx.fillText(p.scrambleChar, p.x, p.y);
      }
    }
  }

  startLoop() {
    if (this.animationFrameId) return;

    const loop = () => {
      if (this.isSleeping || !this.isVisible) {
        this.animationFrameId = null;
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
    this.isSleeping = true;
  }

  destroy() {
    this.stopLoop();
    if (this.resizeObserver) this.resizeObserver.disconnect();
    if (this.intersectionObserver) this.intersectionObserver.disconnect();
    if (this.container) this.container.innerHTML = '';
  }
}

if (typeof window !== 'undefined') {
  window.InteractiveAscii = InteractiveAscii;
}
if (typeof globalThis !== 'undefined') {
  globalThis.InteractiveAscii = InteractiveAscii;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = InteractiveAscii;
}
