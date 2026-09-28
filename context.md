# Context — WebNova / IEEE CS MBITS Website

## What this is
Entry for **WebNova**, IEEE CS SBC MBITS's website design competition.
Task: design and build a website for the IEEE Computer Society MBITS chapter.

## Competition constraints
- Deadline: **30 Sept 2026**
- Individual participation only, open to all colleges
- Free choice of design, layout, colours, stack
- Single or multi-page, sections of choice (About / Events / Gallery / Achievements / Team etc.)
- Must be original work, built by the participant
- Submit via the official Google Form before deadline
- Judged on: creativity, visual appeal, UX, functionality, innovation

## Design concept
**Austo Entertainment (OTHRWRLD) & Pensatori Irrazionali Luxury System** — High-contrast luxury editorial system, fluid Lenis smooth scrolling, interactive vinyl synthesizer, magnetic circle ripple buttons, horizontal draggable showcase, and physics interactions:
- Deep obsidian & forest canvas (`#080D0C` / `#122A28` / `#184E4A`) with alternating warm luxury paper canvas (`#F4F1EA`)
- Signature coral / scarlet accent (`#FF3B30`) for focal highlights, status dots, and CTAs
- Distinctive typography: Instrument Serif (display/italics) + Plus Jakarta Sans (clean Swiss grotesque) + Space Mono (technical indices and metadata)
- Interactive Ambient Web Audio API Synthesizer with spinning vinyl disc SVG widget in header
- Austo Signature Magnetic Circle Ripple Buttons (`[data-btn-hover]`) with cursor entry coordinate tracking
- Austo Fullscreen Navigation Menu Drawer (`.hamburger-nav`) with frosted backdrop and stagger reveals
- Horizontal Draggable Keystone Showcase Slider with grab/grabbing physics and hover scale
- Specialized Technical Directorates Bento Grid (`.services-grid`)
- Peer Reviews & Testimonial Stack (`.reviews-grid`) with verified builder badges
- Interactive Focus Track Radio Chips in membership form (`.form-chips`)
- Interactive Accordion Pillars with CSS grid `0fr -> 1fr` interpolation and rotating plus/minus glyphs
- Floating Image Trail Follower (`.event-follower__inner`) tracking cursor with velocity tilt
- React Bits Pro Blinking Squares background matrix & `<TechText />` draggable wordmark canvas with developer CLI control

## Design tokens
| Token | Value | Use |
|---|---|---|
| `--bg-primary` | `#0A0A0A` | Primary studio dark canvas |
| `--bg-secondary` | `#111111` | Secondary dark background & cards |
| `--bg-paper` | `#F6F5F2` | High-contrast light editorial sections |
| `--text-primary` | `#F5F5F5` | Primary headline and body copy |
| `--text-secondary` | `#9E9E9E` | Subtitles, captions, and secondary copy |
| `--text-dark` | `#121212` | Dark text on paper sections |
| `--accent-crimson` | `#CE2B37` | Signature focal accent, badges, hover states |
| `--border-subtle` | `rgba(255,255,255,0.08)` | Hairline grid lines and dividers |
| Display Serif | Instrument Serif | Editorial italic highlights and headings |
| Primary Sans | Plus Jakarta Sans | High-precision Swiss grotesque body & display |
| Technical Mono | Space Mono | Nav tags, coordinates, timestamps, specs |

Breakpoints: `880px` (nav drawer collapse, hero stacks, gallery 2-col), `768px` (spec table responsive block reflow), `680px` (gallery 1-col).

## File structure
```
webnova-scaffold/
├── index.html      — all sections, single page with anchor nav
├── css/styles.css  — token system + all component styles
├── js/script.js    — mobile nav toggle, hero draw-on animation, join-form stub
├── context.md       — this file
└── agent.md         — working rules for whoever (human or agent) extends this
```

No build step. No dependencies besides Google Fonts (IBM Plex Sans/Mono).

## Status — what's real vs. placeholder
| Section | Status |
|---|---|
| Hero | Copy is real, animation works |
| About | Copy is real (may need chapter-specific numbers) |
| Events | **Placeholder** — only WebNova itself is a real entry, other two rows are generic |
| Team | **Placeholder** — roles are real committee positions, names are blank |
| Gallery | **Placeholder** — empty tinted boxes, no real photos |
| Join form | **Non-functional** — needs a real endpoint (Google Form action URL, Formspree, etc.) before submission |

## Before submitting
- Replace all placeholders above with real chapter content
- Test on mobile (nav collapse, hero stack, figure grid at 2-col)
- Test with reduced-motion OS setting on (hero should render statically, no animation)
- Check every link, especially `#join` anchor and any added external links
- Re-read the guidelines' judging criteria against the final build before submitting via the official Google Form
