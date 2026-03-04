#!/usr/bin/env node

import { Command } from "commander";
import { createProject } from "../core/createProject.js";
import { runDoctor } from "../core/doctor.js";
import { applyJail } from "../core/jail.js";


const program = new Command();

program
  .name("devstart")
  .description("CLI to bootstrap projects with AI-first workflow")
  .version("0.1.0");

program
  .command("new")
  .argument("<name>", "project name")
  .option("-y, --yes", "auto-enter the jail after creation")
  .option("-n, --no", "do not enter the jail after creation")
  .description("create a new project")
  .action((name, options) => {
    createProject(name, options);
  });

program
  .command("doctor")
  .description("check system dependencies")
  .action(() => {
    runDoctor();
  });

program
  .command("jail")
  .argument("<dir>", "target project directory")
  .description("apply dev jail (Dockerfile + compose + jail.sh) into an existing project")
  .action((dir) => {
    applyJail(dir);
  });

program.parse();

