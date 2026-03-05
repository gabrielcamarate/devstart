# Governance — Devstart

## Branching model

We use **trunk-based development**.

- Default branch: `main`
- All work happens in short-lived branches and is merged back to `main` via PR.
- No long-running `develop` branch.

### Branch naming

- `feat/<slug>`
- `fix/<slug>`
- `docs/<slug>`
- `chore/<slug>`
- `refactor/<slug>`
- `test/<slug>`

### Merge strategy

- Prefer **squash merge** to keep history clean.
- PR title should follow Conventional Commits.

---

## Commit convention

We use **Conventional Commits**:

- `feat: ...` → MINOR bump
- `fix: ...` → PATCH bump
- `feat!: ...` or `BREAKING CHANGE:` → MAJOR bump
- `docs: ...`, `chore: ...`, `refactor: ...`, `test: ...` → no bump by default (unless breaking)

Examples:

- `feat: add python template`
- `fix: handle existing target directory`
- `feat!: rename jail command flags`

---

## Versioning (SemVer)

We use **SemVer**: `MAJOR.MINOR.PATCH`.

- PATCH: backwards-compatible bug fixes
- MINOR: backwards-compatible features
- MAJOR: breaking changes

---

## Release process

Releases are cut from `main`.

1. Ensure CI is green on `main`
2. Update version in `package.json` (and lockfile if needed)
3. Update `CHANGELOG.md` (manual for now)
4. Tag: `vX.Y.Z`
5. Push tag

Later we may automate this with CI.
