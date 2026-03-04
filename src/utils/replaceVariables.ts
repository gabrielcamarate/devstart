import fs from "fs";
import path from "path";

export function replaceVariables(dir: string, name: string) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      replaceVariables(filePath, name);
    } else {
      let content = fs.readFileSync(filePath, "utf-8");

      content = content.replace(/{{projectName}}/g, name);

      fs.writeFileSync(filePath, content);
    }
  }
}
