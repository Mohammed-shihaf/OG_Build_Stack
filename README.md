# 9G client test project — Python

Python port of the C# test project: a FastAPI Web API using the same
"project subfolder" layout (`api/api/`).

| C# original | Python here |
|---|---|
| `api/api/api.csproj` | `api/api/pyproject.toml` (+ `requirements.txt`) |
| `Program.cs` | `src/api/main.py` |
| `WeatherForecastController.cs` | `src/api/controllers/weather_forecast.py` |

Requires Python 3.10+. Run commands from `api/api/`.

## Install

```bash
pip install -r requirements.txt
pip install -e .
```

## Build (wheel + sdist into `dist/`)

```bash
pip install build
python -m build
```

## Test

```bash
pytest
```

## Run

```bash
uvicorn api.main:app --port 5125
```

Then `GET http://localhost:5125/weatherforecast`. OpenAPI docs at `/docs`.
