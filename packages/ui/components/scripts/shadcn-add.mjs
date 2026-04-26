import { dirname, join } from "node:path";

import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const packageManagerCommand = process.platform === "win32" ? "pnpm.cmd" : "pnpm";
const requestedComponents = process.argv.slice(2);
const packageDirectory = join(dirname(fileURLToPath(import.meta.url)), "..");

function runCommand(command, args) {
    const result = spawnSync(command, args, {
        cwd: packageDirectory,
        stdio: "inherit"
    });

    if (result.status !== 0) {
        process.exit(result.status ?? 1);
    }
}

runCommand(packageManagerCommand, ["dlx", "shadcn@latest", "add", ...requestedComponents]);
runCommand(packageManagerCommand, ["run", "build"]);
