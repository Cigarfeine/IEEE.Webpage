# Agent — Working Rules for This Repo

Read `context.md` first for project background, design concept, and current status.
This file is about *how* to work in this codebase, not *what* it is.

## Scope
This is a static site: `index.html` + `css/styles.css` + `js/script.js`. No framework,
no build step, no package.json. Keep it that way unless explicitly asked to add tooling —
a judged design-competition entry should stay simple to run (open `index.html`, done).

## Non-negotiables (don't break these without being asked)
1. **Only one orchestrated animation** — the hero schematic draw-on. Do not add
   fade-slide-up entrances, per-card hover-lift, or scroll-triggered reveals to other
   sections. That's the generic default this design deliberately avoids.
2. **Two type families only** — IBM Plex Sans (headings/body) and IBM Plex Mono
   (labels/data/nav). Don't introduce a third.
3. **Stick to the token palette** in `styles.css` `:root`. `--amber` is reserved for
   exactly one future highlight moment — don't use it decoratively elsewhere, and don't
   add new colors outside the token set without updating `context.md`'s token table too.
4. **Keep the drafting-sheet motifs literal, not decorative filler**:
   - The spec-table pattern (`.spec-table`) is for genuinely tabular/sequential content
     (events, schedules). Don't reuse it for non-tabular content just for the aesthetic.
   - The title-block pattern (`.title-block`) is for the team/committee section
     specifically — it's a real blueprint convention (drawn by / checked by / approved
     by), don't repurpose it elsewhere.
   - Figure numbering (`Fig. 1`, `Fig. 2`...) is only for the gallery, because it's an
     actual sequence. Don't add numbered eyebrows to unrelated sections.
5. **No ALL-CAPS labels, no `→` arrows appended to links/buttons, no middle-dot-joined
   meta strings** — these are the generic-AI-design tells this build was built to avoid.
   Match the existing restrained tone.

## Adding a new section
Follow the existing pattern in `index.html`:
```html
<section class="section" id="new-id">
  <div class="section__head">
    <span class="section__ref">§ A.N</span>
    <h2>Heading</h2>
  </div>
  <!-- content -->
</section>
```
- Increment the `§ A.N` reference — it's a literal drawing-sheet index, keep it sequential.
- Alternate background variants (`.section`, `.section--paper`, `.section--dark`) the way
  the existing sections do, for rhythm — don't stack two of the same variant back to back.
- Add the corresponding nav link in `.nav__links` if it should be reachable from the header.

## Responsive rules already in place
- `860px`: nav collapses to a toggle menu, hero goes single-column, figure grid drops to 2 columns.
- `720px`: coordinate rulers hide, section padding shrinks.
Test any new component at both breakpoints, not just desktop.

## Before handing back to the user
- Don't wire the join form to a real endpoint without being told which service to use
  (Google Form action URL vs. Formspree vs. custom backend) — ask if it's not specified.
- Don't fabricate real content (event dates, committee names, member counts) — leave
  placeholders and flag them; the user needs to supply real chapter information.
- Run through the "Before submitting" checklist in `context.md` if a change touches
  layout, motion, or navigation.
