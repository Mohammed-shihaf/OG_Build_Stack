# 9G client test project — TypeScript

TypeScript port of the C# + JavaScript test project:

- `api/api/` — Express 5 Web API in TypeScript (replaces the ASP.NET Core API)
- `app/` — React 19 frontend in TypeScript, built with Vite (replaces the CRA JavaScript app)

| Original | TypeScript here |
|---|---|
| `api/api/api.csproj` | `api/api/package.json` + `tsconfig.json` |
| `WeatherForecastController.cs` | `src/controllers/weatherForecastController.ts` |
| `app/` (CRA, `react-scripts`) | `app/` (Vite + `tsc`) |

Requires Node.js 20.19+ (or 22.12+).

## API (`api/api/`)

```bash
npm ci --prefix api/api
```
```bash
npm run build --prefix api/api
```
```bash
npm test --prefix api/api
```
```bash
npm start --prefix api/api
```

Build output: `api/api/dist/`. Serves `GET http://localhost:5125/weatherforecast`.

## Frontend (`app/`)

```bash
npm ci --prefix app
```
```bash
npm run build --prefix app
```
```bash
npm test --prefix app
```

Build output: `app/build/`. Dev server: `npm start --prefix app` on port 3000.
