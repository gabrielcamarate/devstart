import { execSync } from "child_process";

function check(command: string) {
  try {
    execSync(`${command} --version`, { stdio: "ignore" });
    console.log(`✓ ${command} installed`);
  } catch {
    console.log(`✗ ${command} NOT installed`);
  }
}

export function runDoctor() {
  console.log("Running devstart doctor...\n");

  check("node");
  check("pnpm");
  check("git");
  try {
    execSync("docker version", { stdio: "ignore" });
    console.log("✓ docker available");
  } catch {
    console.log("! docker not available (if you're inside the dev container, this is expected)");
  }
}
