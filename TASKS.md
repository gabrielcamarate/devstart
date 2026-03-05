
# TASKS.md — Agent Task Board

This file helps AI agents and developers track **what work should be done next**.

Agents must read this file before starting work in the repository.

If AGENTS.md defines *how to work*, TASKS.md defines *what to work on*.

---

# How Agents Must Use This File

Agents must not create files that belong to future tasks.

Example:

If the current task is TASK-001,
the agent must not create files that belong to TASK-004 or TASK-005.


Before starting any implementation the agent must:

1. Read AGENTS.md
2. Read ARCHITECTURE.md
3. Read TASKS.md
4. Identify the **current active task**
5. Work only on that task
6. Update task status when finished

Agents must NOT skip tasks or change order unless explicitly instructed.

---

# Task Status Legend

- TODO → work not started
- IN_PROGRESS → currently being implemented
- DONE → task completed and verified
- BLOCKED → waiting for clarification or dependency

---

# Current Sprint

Sprint: **Day 3 — Testing Infrastructure**

Goal: Make the core system testable and introduce Vitest.

---

# Tasks

## TASK-001 — Setup Vitest

Status: TODO

Description:

Install and configure Vitest for the project.

Requirements:

- install `vitest`
- install `@vitest/coverage-v8`

Add scripts to package.json:

pnpm test  
pnpm test:watch  
pnpm test:cov  

Files expected to be created:

vitest.config.ts

Important:

No test files should be created in this task.

Test files will be introduced in later tasks:

- TASK-004
- TASK-005

Acceptance Criteria:

- `pnpm test` runs successfully
- Vitest loads without errors

---

## TASK-002 — Runtime Abstraction

Status: TODO

Description:

Create a runtime abstraction layer to isolate system side effects.

Files to create:

src/core/runtime.ts  
src/core/runtime.node.ts

Responsibilities:

- filesystem access
- command execution
- logging
- cwd access
- optional prompt

Acceptance Criteria:

- core modules no longer depend directly on fs/execSync

---

## TASK-003 — FakeRuntime for Tests

Status: TODO

Description:

Create an in-memory runtime used for tests.

Location:

src/core/__tests__/fakeRuntime.ts

Responsibilities:

- simulate filesystem
- capture command calls
- capture logs

Acceptance Criteria:

- tests run without executing real system commands

---

## TASK-004 — Test replaceVariables

Status: TODO

Description:

Add tests for template variable replacement.

File:

src/utils/replaceVariables.test.ts

Cases:

- replaces {{projectName}}
- works in nested directories
- leaves untouched files without variables

---

## TASK-005 — Test createProject

Status: TODO

Description:

Add tests for createProject core logic.

File:

src/core/createProject.test.ts

Cases:

- existing directory throws error
- missing template throws error
- happy path execution
- git disabled
- install disabled

---

# Future Tasks

These belong to later phases.

## TASK-100 — Improve Error Handling (Day 4)

Status: TODO

Improve structured error handling across core modules.

## TASK-200 — CLI UX Improvements (Day 5)

Status: TODO

Improve CLI output and help system.

## TASK-300 — CLI Distribution (Day 6)

Status: TODO

Prepare CLI for publishing via npm/pnpm.

---

# Notes for Agents

Agents must:

- follow AGENTS.md rules
- respect ARCHITECTURE.md structure
- implement tasks in order
- use TDD workflow

If the repository state does not match the task requirements,
the agent must report the issue before continuing.
