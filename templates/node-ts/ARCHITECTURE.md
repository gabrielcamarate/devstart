
# Project Architecture Guide

This document explains how the project is structured so AI agents and developers
can understand how to extend the system safely.

This file is designed to work together with AGENTS.md.

---

# Architectural Goals

Projects generated from this template must be:

- deterministic
- testable
- AI-friendly
- modular
- maintainable

---

# Layered Architecture

src/

cli/  
Handles CLI commands and argument parsing.

core/  
Contains business logic and application use cases.

utils/  
Reusable utilities and helpers.

---

# CLI Layer

Responsibilities:

- argument parsing
- command registration
- delegating execution to core

Rules:

CLI must remain thin.
No business logic should exist here.

---

# Core Layer

Responsibilities:

- implement application use cases
- coordinate runtime operations

Examples:

createProject  
doctor  
jail

Rules:

- must be testable
- must not call system APIs directly
- must use runtime abstraction

---

# Runtime Abstraction

Runtime adapters isolate system operations such as:

- filesystem
- command execution
- logging
- environment access

Example structure:

src/core/runtime.ts
src/core/runtime.node.ts
src/core/__tests__/fakeRuntime.ts

---

# Testing Architecture

Tests should target:

- core modules
- utilities

Testing CLI behavior directly is discouraged.

Use **Vitest** for all tests.

---

# Template Philosophy

Projects generated from devstart are meant to be AI-assisted projects.

Therefore:

- documentation must be clear
- architecture must remain predictable
- side effects must be isolated

---

# Customization for Users

When users create projects with this template, they are expected to:

1. Update AGENTS.md to reflect the project scope
2. Update this ARCHITECTURE.md with domain-specific architecture
3. Keep the same structural principles

Example:

A web API project might introduce:

src/domain/
src/services/
src/adapters/

But should still preserve:

- testability
- deterministic runtime
- agent-friendly structure

---

# Architecture Evolution

Changes to architecture must:

1. be documented here
2. update AGENTS.md if agent behavior changes

This ensures AI agents can safely modify the repository.
