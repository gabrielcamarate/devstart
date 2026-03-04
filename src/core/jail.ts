import fs from "fs";
import path from "path";

function copyIfMissing(src: string, dst: string) {
  if (fs.existsSync(dst)) {
    console.log(`- skip (exists): ${path.basename(dst)}`);
    return;
  }
  fs.copyFileSync(src, dst);
  console.log(`+ wrote: ${path.basename(dst)}`);
}

export function applyJail(targetDir: string) {
  const targetPath = path.resolve(process.cwd(), targetDir);
  const jailSrc = path.resolve(process.cwd(), "templates/_jail");

  if (!fs.existsSync(targetPath)) {
    console.error("Target directory does not exist.");
    process.exit(1);
  }

  const dockerfileSrc = path.join(jailSrc, "Dockerfile");
  const composeSrc = path.join(jailSrc, "docker-compose.yml");
  const jailShSrc = path.join(jailSrc, "jail.sh");

  copyIfMissing(dockerfileSrc, path.join(targetPath, "Dockerfile"));
  copyIfMissing(composeSrc, path.join(targetPath, "docker-compose.yml"));
  copyIfMissing(jailShSrc, path.join(targetPath, "jail.sh"));

  // make jail.sh executable
  try {
    fs.chmodSync(path.join(targetPath, "jail.sh"), 0o755);
  } catch {}

  console.log("Jail applied.");
}
