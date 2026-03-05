
# Devstart — Agent Operating Guide

Always reply in Brazilian Portuguese (pt-br)

This file defines how AI agents must operate inside this repository.
All code generation must follow the rules described here.
If there is a conflict between agent behavior and this document, this document takes priority.

---

# Operating Principles (MUST)

- Plan first before changing code
- TDD is mandatory
- Small iterative steps
- Deterministic tooling
- Core-first testing

---

# Agent Task Protocol

1. PLAN
2. WRITE TEST
3. IMPLEMENT
4. VERIFY (pnpm test)
5. REFACTOR

---

# Testing Strategy

Tests must use **Vitest**.

Focus testing on:

src/core/*
src/utils/*

Avoid testing CLI logic.

---

# Runtime Abstraction

Core logic must not directly call:

- filesystem
- git
- pnpm
- docker
- console
- process.exit

All system interactions must go through a **Runtime interface**.

---

# Interactive Input Rule

Core modules must not require interactive stdin.

Decisions must come from:
- options
- runtime prompt abstraction

---

# Definition of Done

- pnpm test passes
- behavior covered by tests
- no undocumented commands

---

# Forbidden

Agents must NOT:

- introduce dependencies without justification
- modify architecture without updating docs
- execute real system commands during tests
- place business logic in CLI

---

# Development Roadmap

Day 1 — Bootstrap  
Day 2 — Core CLI  
Day 3 — Testing Infrastructure  
Day 4 — Reliability  
Day 5 — DX Improvements  
Day 6 — Distribution

---

# Current Phase

Day 3 — Testing Infrastructure

Goals:

- Introduce Vitest
- Runtime abstraction
- FakeRuntime
- Unit tests

---

# Agent Learning Rules

## pnpm store location

All installs must use repository local store.

.pnpm-store/

Example:

pnpm add -D vitest --store-dir .pnpm-store

---

## Core must not call process.exit

Core modules must throw errors instead.

---

## Test-only utilities

Test helpers must live in:

src/core/__tests__/
src/test/

Example:

src/core/__tests__/fakeRuntime.ts

Never:

src/core/runtime.fake.ts

---

## Tooling scope per phase

During Day 3 only the following tools may be introduced:

vitest
@vitest/coverage-v8

Allowed scripts:

test
test:watch
test:cov

---

# Development Philosophy

Devstart projects must remain:

- AI-friendly
- deterministic
- testable
- template-driven
