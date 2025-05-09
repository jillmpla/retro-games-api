# 🎮 Retro Game API 🕹️

A fully auto-generated REST API for browsing, managing, and extending a collection of classic retro video games. Built with [LoopBack 4](https://loopback.io/), the API provides complete CRUD functionality, an interactive Swagger UI for testing, and a clean architecture that’s easy to extend or connect to a real database.


---

## 🛠️ Tech Stack

- **LoopBack 4** – API framework with auto-generated CRUD endpoints
- **TypeScript** – typed superset of JavaScript for scalable code
- **Node.js (v18+)** – backend runtime powering the app
- **Swagger** – interactive API docs and testing via `/explorer`
- **JSON Boot Seeder** – Loads default game data from `./data/db.json` into memory on startup (read-only; changes are not persisted)

---

## ⚙️ Features

- `GET /games` – List all games  
- `GET /games/count` – Get total number of games
- `POST /games` – Add a new game
- `GET /games/{id}` – View details for a single game by ID
- `PUT /games/{id}` – Replace a game entry entirely
- `PATCH /games/{id}` – Update parts of a game entry
- `PATCH /games` – Bulk update games matching a condition
- `DELETE /games/{id}` – Delete a game by ID

## 📘 Game Model

- `id` (auto-generated)
- `title` (full title of the game (e.g., Super Mario World))
- `platform` (SNES, Nintendo 64, Sega Genesis, MS-DOS, etc.)
- `genre` (game type/category, defaults to `Misc`)
- `year` (year of release, defaults to `0`)
- `rating` (0–10)
- `picture` (string URL or file name)

Example:

```
{
  "title": "Sonic the Hedgehog",
  "platform": "Sega Genesis",
  "genre": "Platformer",
  "year": 1991,
  "rating": 9,
  "picture": "https://upload.wikimedia.org/wikipedia/en/thumb/8/85/Sonic_the_Hedgehog_1_Genesis_box_art.jpg"
}
```

---

## 🏃 Run Locally

```bash
npm install
npm start
```

Then open:

```
http://localhost:3000/explorer
```

You'll see the full Swagger UI for testing your `/games` endpoints.

---

## ⛏️ How This Was Built

This project was generated using the LoopBack CLI:

```bash
npm install -g @loopback/cli
lb4
```

Steps taken:

1. Created project: `lb4` → `retro-game-api`  
2. Generated model: `lb4 model` → `Game` with properties like title, platform, etc.  
3. Created in-memory datasource: `lb4 datasource` → `db` (pre-loads data from `./data/db.json` on startup)  
4. Made repository: `lb4 repository` → `GameRepository` to handle data operations  
5. Built controller: `lb4 controller` → `GameController` with full RESTful CRUD endpoints

---

## 🎨 Swagger UI Edits

- Added visible descriptions to all endpoints.
- Enabled editable examples for filters and request payloads.
- Removed `additionalProp1` clutter with a strict model schema.

---

## 📝 Tips

- You can update `db.json` manually to add more games  
- Default values are defined in `game.model.ts`   

---
## 🧱 Future Improvements

To make this API production-ready or persist changes:

- 🔄 Connect to a real database (e.g., SQLite, PostgreSQL, MongoDB)
- 💾 Add file-based saving logic to persist updates to `db.json`
- 🔐 Add authentication so users can create/update their own collections

---

[![LoopBack](https://github.com/loopbackio/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)

This application was generated using [LoopBack 4 CLI](https://loopback.io/doc/en/lb4/Command-line-interface.html) with the
[initial project layout](https://loopback.io/doc/en/lb4/Loopback-application-layout.html).

Please check out [LoopBack 4 documentation](https://loopback.io/doc/en/lb4/) to
understand how you can continue to add features to this application.

---

## 📜 License
This project is licensed under the MIT License. See the [License](LICENSE.txt) file for details.

## If you find this project useful, consider giving it a star! ⭐
___
