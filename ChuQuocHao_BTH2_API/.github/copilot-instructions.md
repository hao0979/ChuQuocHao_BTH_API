## Repo-aware instructions for AI coding agents

Keep this short and actionable. Edit only discoverable facts from the codebase.

- Entry point: `index.js` — Express app (ES module style). It initializes Sentry (optional), global middleware, injects repositories via `await repositories(app)`, and mounts routes from `routes/api.js` and `routes/web.js`.
- Middlewares: `middlewares/index.js` contains reusable middleware: `middlewareErrorWrapper`, `shouldJSON`, and `responseTime`. `responseTime` attaches an `X-Response-Time` header.
- Response shapes: use helpers in `helpers/response.js` — `successResponse(status,message,data)` and `errorResponse(status,message,validation,data)`; controllers frequently return those.
- DB connectors: `services/mongo.js` and `services/mysql.js` export async connection helpers. Note: these modules use `mongodb` and `mysql2` APIs respectively.

Project conventions and gotchas (important)
- Mixed module styles: `package.json` has `"type": "module"` (ESM) and `index.js` uses `import`/`export`. However many files (controllers, services, repositories) use CommonJS (`require` / `module.exports`). Be careful when editing — preserve the module style used in a file or convert consistently.
- Mixed frameworks/contexts: some controllers expect a Koa-like `ctx` object (e.g. `authController.js`, `userController.js`) and call `ctx.ok`, `ctx.throw`, or use `ctx.repo`. But `index.js` is Express-based and uses `(req,res)` handlers. When modifying controllers or routes, search for `ctx.` and `req,res` usages and adapt accordingly.
- Incomplete wiring: `repositories/index.js` currently only sets `app.locals.db` and logs; controllers expect `ctx.repo.user` in some places. If you implement repository injection, ensure repositories are attached either to `app.locals`, `req`, or transform controllers to use `req.app.locals` (consistent access pattern).
- Missing dependencies: services reference `mongodb` and `mysql2` packages but `package.json` may not list them. Install or confirm dependencies before running.

How to add a new API endpoint (minimal recipe)
1. Create repository method: `repositories/<name>.js` (e.g. `repositories/user.js`) and export class or functions that accept the DB client (see `repositories/user.js` for pattern).
2. Expose repository in `repositories/index.js` when initializing (attach to `app.locals` or similar).
3. Add controller in `controllers/<feature>Controller.js`. Use `helpers/response.js` for consistent payloads. Watch for `ctx` vs `req,res` mismatch.
4. Add route in `routes/api.js` (or new router file) and import your controller. Mount under `/api` in `index.js`.

Common commands and workflows
- Install deps: `npm install` (root). Add missing DB drivers if tests fail: `npm install mongodb mysql2 --save`.
- Start in dev: `npm start` (this runs `nodemon index.js`).
- Lint: `npm run lint` and auto-fix: `npm run lintfix` (project uses `standard`/`snazzy` in package.json).

Environment and runtime hints
- Read `.env` variables used in code: `PORT`, `SENTRY_DSN`, `MONGO_URI`, `MYSQL_URI` (or `MYSQL_HOST`, `MYSQL_USERNAME`, etc.).
- Sentry: enabled only if `SENTRY_DSN` exists; Sentry handlers are wired in `index.js`.

Search tips for maintainers/agents
- Find all controller patterns: search for `ctx.ok` and `ctx.throw` to locate Koa-style handlers.
- Find global middleware: open `middlewares/index.js` to understand error handling and response-time header logic.
- Look for DB usage: search for `.collection(` (Mongo) and `connection.query` (MySQL/Sequelize) to find data-access points.

Small examples from the repo
- Route: `routes/api.js` mounts an Express router: `router.get('/', (req,res) => res.json({ message: 'Welcome to API route 🚀' }))`.
- Middleware: `responseTime` measures duration using `process.hrtime.bigint()` and sets `X-Response-Time`.
- Repository example: `repositories/user.js` exposes `getUserByEmail(email)` using `mongo.collection('users').findOne(...)`.

If you change runtime wiring (module system, middleware, or repositories), run the app locally and fix import/require mismatches before opening PR.

If anything here is unclear or you'd like more detail (CI, tests, or preferred module style), tell me which area to expand and I'll iterate.
