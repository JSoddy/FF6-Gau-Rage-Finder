# FF6 Gau Rage Finder

Pixel Remaster Veldt pack tracker for Gau's rages.

## Setup

```bash
npm install
npm run generate-data   # regenerate formations.json from data/veldt-table.tsv
npm run dev
```

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm test` — run engine tests
- `npm run generate-data` — parse TSV into JSON

## Usage

1. Check **Have** / **Want** for rages you're tracking
2. Log Veldt encounters via monster dropdowns until your pack position locks
3. Use the upcoming packs grid to plan ahead; click a formation to log it
4. Manual entry below the grid handles fights not shown on the list

State persists in `localStorage`. Export/import JSON to back up your progress.

## License

This project’s source code is licensed under the [MIT License](LICENSE). Copyright © 2026 James Soddy.

Final Fantasy VI, character names, monster data, and related assets are trademarks and copyrights of Square Enix. This is an unofficial fan project and is not affiliated with or endorsed by Square Enix.
