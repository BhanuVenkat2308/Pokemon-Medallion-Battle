# Pokémon Medallion Battle — Solo Edition

**Version 1.0.0** — a browser-based fan recreation built with JavaScript, CSS, and Vite. Battles use computer opponents; progress is saved locally in your browser.

## Run locally

Use Node.js 22.12 or newer.

```sh
npm ci
npm run dev
```

Open the localhost URL printed by Vite. Choose Bulbasaur, Charmander, or Squirtle, open two free welcome packs, and select your first six Pokémon.

```sh
npm test
npm run build
npm run preview
```

The production build is written to `dist/`. `npm run build` targets a root-path website. `npm run build:pages` targets `/Pokemon-Medallion-Battle/`; `npm run preview:pages` previews that build locally.

## Play online

[Open the game on GitHub Pages](https://bhanuvenkat2308.github.io/Pokemon-Medallion-Battle/). Pushes to `main` run the tests, build the game and deploy it through GitHub Actions. The repository Pages source must be set to **GitHub Actions**.

## Version 1 features

- 393 Pokémon entries with local artwork, species details, evolution, CP, IVs and Shiny variants.
- Gym battles, practice battles, automatic powers, sequential reveal animations, and a six-Pokémon team builder.
- Eleven Gym badges with RP progression and cumulative pack unlocks.
- Searchable collection and Pokédex with discovered and undiscovered states.
- Poké and Silver packs, a free daily pack with a countdown, and daily tasks.
- 25 rotating solo legendary raid expeditions, persistent boss damage, stage rewards and a Raid Pack inbox.
- Five responsive sections: Battle, My collection, Pokédex, Raids and Shop.
- Local autosave, save-file export/import, sound controls, keyboard focus and reduced-motion support.

New trainers receive one starter and ten different Pokémon from two welcome packs. Normal packs retain their usual duplicate rules. Raids unlock after all 11 badges or 6,000 best RP. See [raid rules and rosters](docs/raid-implementation.md) for details.

## Saves

Progress belongs to the browser and site origin where you play. Export a save through **Settings & save** before moving to another browser, device or URL. Clearing browser storage removes the local save. There is no cloud account, multiplayer service or real-money purchase system.

## Verification

`npm test` covers game rules and state transitions. Browser checks require a running development server at `http://127.0.0.1:5173/` and an installed Google Chrome:

```sh
node tests/browser-check.mjs
node tests/hub-browser-check.mjs
node tests/raid-browser-check.mjs
node tests/motion-browser-check.mjs
node tests/desktop-fit-check.mjs
```

Browser tests use isolated saves and do not modify your normal player save. Visual audit scripts under `tests/visual-*.mjs` generate local reports; those generated files are excluded from Git.

## Project structure

- `src/data.js`, `src/gym-roster.js`, `src/raid-roster.js`: Pokémon, powers and progression data.
- `src/engine.js`: battle resolution and team validation.
- `src/state.js`: saves, packs, collection and evolution.
- `src/raids.js`, `src/raid-config.js`: raid progression and rewards.
- `src/app.js`, `src/hub-views.js`, `src/raid-view.js`: interface and interactions.
- `src/*.css`: responsive styling and battle animation presentation.
- `public/`: local Pokémon artwork, type icons and fonts.
- `tests/`: unit and browser regression checks.
- `docs/`: roster research and implementation notes; historical notes may describe earlier decisions.

## Credits

This is an unofficial fan recreation, not the original game client. It is not affiliated with Nintendo, Game Freak, The Pokémon Company or the original developers. Pokémon and character artwork belong to their respective owners. Pokémon artwork is sourced from the public PokeAPI sprites repository. Documented Medallion Battle data informs the roster; custom additions are labeled in-game. Bundled fonts retain their accompanying license files.
