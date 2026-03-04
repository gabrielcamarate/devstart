## Operating Principles (MUST)
- Plan first: before any code change, write a short plan (bullets) and the expected files to change.
- TDD is mandatory: tests MUST be written before implementation. No feature code without failing tests first.
- Small steps: implement the smallest change to make tests pass, then refactor with tests green.
- Deterministic tooling: pin tool versions when possible (Node/pnpm). Avoid @latest in infra.

## Definition of Done (DoD)
- Tests passing locally (`pnpm test`)
- Typecheck passing (`pnpm typecheck`) if configured
- Lint passing (`pnpm lint`) if configured
- No undocumented new commands or scripts

## Forbidden
- Do NOT introduce new dependencies without stating why.
- Do NOT change architecture decisions without updating this file.
- Do NOT claim work is done without running tests.

## Project Architecture

devstart is a CLI tool that bootstraps AI-first development environments.

Structure:

src/
  cli/        → CLI entrypoints (Commander)
  core/       → application use cases (createProject, doctor, jail)
  utils/      → shared utilities
templates/
  node-ts/    → default project template
  _jail/      → docker jail source files

---

## CLI Commands

devstart new <name>

Creates a new project by:

1. creating the project folder
2. copying the template from templates/node-ts
3. replacing template variables (ex: {{projectName}})
4. initializing git repository (main branch)
5. running pnpm install
6. optionally entering the dev jail

Flags:

-y / --yes → automatically enter jail  
-n / --no → skip jail

---

devstart doctor

Checks system dependencies:

- node
- pnpm
- git
- docker

Note: docker may be unavailable when running inside the dev container.

---

devstart jail <dir>

Applies the development jail to an existing project.

Copies:

- Dockerfile
- docker-compose.yml
- jail.sh

If files already exist they are skipped.

---

## Template Variables

Supported variables:

{{projectName}}

Replaced across all files during project creation.
