import fs from "fs";
import path from "path";

import { replaceVariables } from "../utils/replaceVariables.js";
import { execSync } from "child_process";


function hasDocker(): boolean {
  try {
    execSync("docker version", { stdio: "ignore" });
    return true;
  } catch {
    return false;
  }
}


export function createProject(name: string, options?: { yes?: boolean; no?: boolean }) {
  const projectPath = path.join(process.cwd(), name);
  const templatePath = path.join(process.cwd(), "templates/node-ts");

  if (fs.existsSync(projectPath)) {
    console.error("Project already exists.");
    process.exit(1);
  }

  fs.mkdirSync(projectPath);

  fs.cpSync(templatePath, projectPath, {
    recursive: true,
  });

  replaceVariables(projectPath, name);

  execSync("git init -b main", { cwd: projectPath, stdio: "inherit" });
  execSync("pnpm install", { cwd: projectPath, stdio: "inherit" });

  const shouldEnter =
    options?.yes === true ? true :
    options?.no === true ? false :
    (() => {
      process.stdout.write("Enter the dev jail now? [Y/n] ");
      const buf = Buffer.alloc(1);
      try {
        // read a single char from stdin (sync)
        const n = fs.readSync(0, buf, 0, 1, null);
        if (n <= 0) return true;
        const ch = buf.toString("utf8").trim().toLowerCase();
        if (ch === "n") return false;
        return true; // default Y
      } catch {
        return true; // default Y if cannot read
      }
    })();


  if (shouldEnter) {
    if (hasDocker()) {
      execSync("./jail.sh", { cwd: projectPath, stdio: "inherit" });
    } else {
      console.log("Docker not available here. To enter later: cd " + name + " && ./jail.sh");
    }
  } else {
    console.log(`You can enter later with: cd ${name} && ./jail.sh`);
  }


  console.log(`Project ${name} created from template.`);
}
