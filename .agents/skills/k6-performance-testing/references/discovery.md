# Discovery reference

The goal of discovery is to learn enough about the target system that the generated tests
exercise it *realistically*. Everything below is a set of places to look and questions to
answer — never a fixed stack. Treat every framework/DB/auth name as an example only.

---

## 1. Application discovery

Look for whichever of these exist and read them:

```
package.json  go.mod  pom.xml  build.gradle  requirements.txt  pyproject.toml
Gemfile  composer.json  Cargo.toml  *.csproj
Dockerfile  docker-compose.yml  Procfile  Makefile
.env  .env.example  config/  settings.*  application.yml/properties
README.md  CONTRIBUTING.md  docs/
```

Answer:
- Framework and language/runtime (infer from manifests, not from guesses).
- Package manager and how to install deps.
- Entry point and **startup command** (npm scripts, `main`, `if __name__`, Docker `CMD`, Makefile targets).
- Environment variables the app needs (from `.env.example`, config loaders, `docker-compose`).
- **API base URL for a non-production environment** — host, port, path prefix. Prefer localhost/dev/staging.
- How to bring the app up so you can test it (and whether it needs a DB/cache/queue running).

If you cannot determine how to start the app or reach it, ask the user before generating tests.

---

## 2. API discovery

Prefer an explicit contract if one exists, then validate against code:

```
openapi.yaml  openapi.json  swagger.json  swagger/  /docs  /swagger-ui
routes/  controllers/  handlers/  api/  endpoints/  urls.py  *Controller.*
router.*  app.*  main.*  proto/  graphql schema files
```

For each endpoint you intend to exercise, capture:
- HTTP method and full path (including base prefix).
- Path params, query params, required headers.
- Request body shape and content type.
- Response body shape and the **expected** status code(s) for success.
- Auth requirement (public vs protected).
- **Dependencies between requests** — what must happen first (e.g. an id or token from a prior call).

If OpenAPI and code disagree on something you rely on, trust the code and note the discrepancy.

---

## 3. Authentication discovery

Do **not** assume JWT. Determine which of these the app uses (or none):

| Mechanism | Signals to look for |
|---|---|
| JWT / bearer | `Authorization: Bearer`, token signing libs, `/login` returning a token |
| Cookie / session | `Set-Cookie`, session middleware, CSRF tokens |
| API key | `X-API-Key`/custom header, key lookup middleware |
| OAuth / OIDC | authorize/token endpoints, client id/secret, redirect flows |
| Custom | bespoke header/signature schemes |
| None | no auth middleware on the target routes |

If a login flow is required, model it explicitly and **correlate** the result:

```
POST login (from data file)  →  extract token/cookie/session from response
   →  attach it to every subsequent protected request
```

Dynamic tokens, ids, cursors, CSRF values, etc. must be read from earlier responses at runtime —
never pasted into the script as literals. See `scenario-design.md` §Correlation for the k6 pattern.

---

## 4. Business workflow discovery

Performance tests are most useful when they follow *realistic user journeys*, not random
endpoint hammering. Reconstruct journeys from:

```
routes/controllers (what's callable)   frontend API calls (what's actually called, in what order)
integration/e2e tests (real sequences) README / docs (intended flows)
seed data (what entities exist)        domain logic (valid state transitions)
```

Build the workflow that matches the repository's actual domain. Two illustrative shapes:

```
# E-commerce-style repo (EXAMPLE ONLY)
login → get profile → search product → apply coupon → add to cart → checkout

# Learning-platform-style repo (EXAMPLE ONLY)
login → browse courses → enroll → open lesson → submit assignment
```

These are examples. A different domain must produce a different workflow. If the repo has no
obvious end-to-end journey, test the highest-value independent endpoints and say so.

---

## 5. Test-data discovery & modelling

Prefer existing valid data over invented data. Look for:

```
seeds/  seed.*  fixtures/  factories/  migrations/ (seed steps)
test users / demo accounts in docs or .env
mock data, *.json fixtures, existing *.csv
DB init scripts (docker-entrypoint-initdb.d, sql/)
```

Priority order:
```
existing valid test data  >  existing fixtures  >  generated test data
```

Only generate data when nothing usable exists. When you do generate CSV:
- Infer the **columns the discovered workflow needs** — don't assume a schema. Example schemas
  (illustrative, not required):
  ```csv
  username,password
  ```
  ```csv
  email,password,role
  ```
- Match the API's real field names, formats, and constraints.
- Provide enough rows that VUs don't collide/exhaust the dataset (or design deliberate reuse).
- Validate with `scripts/validate_csv.py` before using it.
- Keep secrets out of scripts — pass credentials via the data file (and via env for anything
  that shouldn't live in the repo).

Record what data you used and why in `DISCOVERY.md` so results stay reproducible.
