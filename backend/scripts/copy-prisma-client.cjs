const fs = require("node:fs");
const path = require("node:path");

const source = path.join(__dirname, "..", "src", "generated", "prisma");
const destination = path.join(__dirname, "..", "dist", "src", "generated", "prisma");

if (!fs.existsSync(source)) {
  throw new Error(`Prisma client was not generated at ${source}`);
}

fs.rmSync(destination, { recursive: true, force: true });
fs.mkdirSync(path.dirname(destination), { recursive: true });
fs.cpSync(source, destination, { recursive: true });
