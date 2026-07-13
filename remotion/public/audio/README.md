# Background music

**Default:** `ambient.wav` — a soft synth pad auto-generated on `npm install` (gentle chord + slow fade).

**Your own track:** Replace with `ambient.mp3` (or `.wav`) and set the path in `src/components/BackgroundMusic.tsx`. Keep duration ≥ 40s for full fade-out.

Recommended: ~40s loopable track, royalty-free (e.g. Pixabay, Uppbeat).

The composition applies:
- **1s** fade-in at start
- **2s** fade-out at end
- **35%** peak volume

Render without audio by temporarily commenting out `<BackgroundMusic />` in `src/MindMeshPromo.tsx`.
