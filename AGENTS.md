# Devstart --- Agent Operating Guide

Always repli in Brazilian Portuguese (pt-br)

This file defines **how AI agents must operate inside this repository**.

All code generation must follow the rules described here.

If there is a conflict between agent behavior and this document, **this
document takes priority**.

------------------------------------------------------------------------

# Operating Principles (MUST)

-   **Plan first:** before any code change, write a short plan (bullets)
    and the expected files to change.
-   **TDD is mandatory:** tests MUST be written before implementation.
-   **Small steps:** implement the smallest change to make tests pass,
    then refactor with tests green.
-   **Deterministic tooling:** pin tool versions when possible
    (Node/pnpm). Avoid `@latest` in infra.
-   **Core-first testing:** tests must focus on business logic in
    `src/core`.

------------------------------------------------------------------------

# Agent Task Protocol

For every task the agent must follow this structure:

### 1. PLAN

Describe:

-   what will be implemented
-   which files will change
-   which tests will be created

### 2. WRITE TEST

Create failing tests.

### 3. IMPLEMENT

Write the **minimum code required to pass tests**.

### 4. VERIFY

Run:

    pnpm test

### 5. REFACTOR

Improve the code while keeping tests green.

------------------------------------------------------------------------

# Testing Strategy

All tests must use **Vitest**.

Tests must target the **core layer**, not the CLI.

Reason:

CLI code only parses arguments and delegates to core functions.

Correct test targets:

    src/core/createProject.ts
    src/core/doctor.ts
    src/core/jail.ts
    src/utils/*

Avoid testing:

    src/cli/*

------------------------------------------------------------------------

# Test File Convention

Tests must be colocated with source files.

Example:

    src/core/createProject.ts
    src/core/createProject.test.ts

    src/core/doctor.ts
    src/core/doctor.test.ts

Alternative acceptable pattern:

    src/core/__tests__/createProject.test.ts

But the repository must remain consistent.

------------------------------------------------------------------------

# TDD Workflow (MANDATORY)

For every feature or bug fix the following workflow must be followed:

1.  Write a failing test
2.  Run tests and confirm failure
3.  Implement the minimum code required
4.  Run tests until green
5.  Refactor while keeping tests green

This cycle must repeat until the feature is complete.

No implementation should exist without a test that covers it.

------------------------------------------------------------------------

# Runtime Abstraction

Core logic must not depend directly on system side effects.

The following operations must be abstracted:

-   filesystem access
-   command execution
-   logging

These operations must be injected via a **runtime interface**.

Example responsibilities of the runtime:

    filesystem
    command execution (git, pnpm, docker)
    logger

This allows tests to run **without executing real commands**.

Tests must never execute:

    git
    pnpm install
    docker

------------------------------------------------------------------------

# Definition of Done (DoD)

A task is only complete when:

-   tests pass locally (`pnpm test`)
-   typecheck passes (`pnpm typecheck`) if configured
-   lint passes (`pnpm lint`) if configured
-   no undocumented commands were added
-   new behavior is covered by tests

------------------------------------------------------------------------

# Forbidden

The agent MUST NOT:

-   introduce new dependencies without justification
-   change architecture without updating this file
-   claim work is done without running tests
-   execute real system commands during tests
-   add logic inside the CLI layer

------------------------------------------------------------------------

# Project Overview

**devstart** is a CLI tool that bootstraps **AI-first development
environments**.

The goal is to create reproducible project environments that work well
with AI coding agents.

------------------------------------------------------------------------

# Project Architecture

Structure:

    src/
      cli/        → CLI entrypoints (Commander)
      core/       → application use cases
      utils/      → shared utilities

    templates/
      node-ts/    → default project template
      _jail/      → docker jail source files

Layer responsibilities:

### CLI

Handles:

-   command parsing
-   flags
-   delegating execution to core

CLI must remain **thin**.

No business logic should exist here.

------------------------------------------------------------------------

### Core

Contains all application logic.

Examples:

    createProject
    doctor
    jail

Core code must:

-   be testable
-   avoid direct system calls
-   rely on runtime abstraction

------------------------------------------------------------------------

### Utils

Shared helper utilities.

Examples:

    template replacement
    path helpers
    file utilities

Utils should prefer **pure functions**.

------------------------------------------------------------------------

# CLI Commands

## devstart new `<name>`{=html}

Creates a new project.

Steps:

1.  create the project directory
2.  copy template from `templates/node-ts`
3.  replace template variables
4.  initialize git repository (`main` branch)
5.  run `pnpm install`
6.  optionally enter the dev jail

Flags:

    -y / --yes   automatically enter jail
    -n / --no    skip jail

------------------------------------------------------------------------

## devstart doctor

Checks system dependencies.

Dependencies checked:

    node
    pnpm
    git
    docker

Note:

Docker may be unavailable when running inside the dev container.

The command must return a **structured report** with:

    check name
    status
    optional message

------------------------------------------------------------------------

\## devstart jail
```{=html}
<dir>
```
Applies the development jail to an existing project.

Files copied:

    Dockerfile
    docker-compose.yml
    jail.sh

Rules:

-   existing files must not be overwritten
-   copy operations must be idempotent
-   jail can be applied multiple times safely

------------------------------------------------------------------------

# createProject Behavior Contract

createProject must:

1.  fail if the target directory already exists
2.  copy the selected template directory
3.  replace template variables
4.  initialize git with `main` branch
5.  run `pnpm install`
6.  optionally start the dev jail

Edge cases that must be tested:

    existing directory
    missing template
    git disabled
    install disabled

------------------------------------------------------------------------

# doctor Behavior

doctor checks system dependencies.

Expected checks:

    node
    pnpm
    git
    docker

The command should return a structured report containing:

    check name
    status
    optional message

Tests must simulate command execution using runtime mocks.

------------------------------------------------------------------------

# jail Behavior

jail applies development container configuration to a project.

Files copied:

    Dockerfile
    docker-compose.yml
    jail.sh

Rules:

    existing files must not be overwritten
    copy operations must be idempotent

------------------------------------------------------------------------

# Template Variables

Supported variables:

    {{projectName}}

Variables must be replaced across all files during project creation.

Future variables must be documented here.

------------------------------------------------------------------------

# CI Expectations (future)

Continuous integration should run:

    pnpm install
    pnpm test
    pnpm typecheck
    pnpm lint

Tests must run **without requiring Docker or Git**.

------------------------------------------------------------------------

## Repo Governance (MANDATORY)

This repository uses:

- trunk-based development (`main`)
- short-lived branches (`feat/*`, `fix/*`, `docs/*`, `chore/*`)
- Conventional Commits
- SemVer versioning
- releases via tags `vX.Y.Z`

If a change affects governance rules, this file MUST be updated.

------------------------------------------------------------------------


# Development Roadmap

Devstart is built incrementally using the following phases.

Day 1 — Project Bootstrap
- Initialize repository
- Setup Node + TypeScript
- Setup pnpm
- Define project structure
- Implement CLI skeleton with Commander

Day 2 — Core CLI Implementation
- Implement commands:
  - devstart new
  - devstart doctor
  - devstart jail
- Implement template system
- Implement Docker dev jail
- Define architecture and agent rules (this document)

Day 3 — Testing Infrastructure
- Introduce Vitest
- Implement Runtime abstraction to isolate side effects
- Add FakeRuntime for tests
- Write unit tests for:
  - template variable replacement
  - createProject core logic

Day 4 — Reliability Improvements
- Improve error handling
- Remove process.exit from core
- Return structured reports (doctor)
- Improve CLI/core separation

Day 5 — DX Improvements
- Add help improvements
- Improve CLI output
- Add dry-run mode
- Improve template extensibility

Day 6 — Distribution
- Package CLI
- Test installation via pnpm dlx / npm
- Ensure templates work outside repo
- Prepare for publishing


# Current Phase

Current development phase: **Day 3 — Testing Infrastructure**

The focus of this phase is:

- Introduce Vitest
- Make core logic testable
- Add unit tests
- Avoid changing CLI behavior

Agents must prioritize tasks related to the current phase before implementing new features.

# Phase Exit Criteria

Day 3 is considered complete when:

- Vitest is configured
- Runtime abstraction exists
- FakeRuntime exists
- Unit tests exist for utils and createProject
- pnpm test passes




# Development Philosophy

Devstart is designed to be:

-   **AI-friendly**
-   **deterministic**
-   **testable**
-   **template-driven**

All changes must preserve these properties.
