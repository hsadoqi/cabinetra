import { dirname, join } from "node:path";

import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const packageManagerCommand = process.platform === "win32" ? "pnpm.cmd" : "pnpm";
const packageDirectory = join(dirname(fileURLToPath(import.meta.url)), "..");

const validCategories = ["atoms", "molecules", "organisms"];
let category = "atoms"; // default
let requestedComponents = [];

// Parse arguments to extract category flag and component names
const args = process.argv.slice(2);
for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith("--")) {
        const flagName = arg.slice(2);
        if (validCategories.includes(flagName)) {
            category = flagName;
        }
    } else {
        requestedComponents.push(arg);
    }
}

if (requestedComponents.length === 0) {
    console.error("Error: No components specified");
    console.error(`Usage: pnpm run shadcn-add [--atoms|--molecules|--organisms] <component-name> [<component-name> ...]`);
    process.exit(1);
}

function runCommand(command, args) {
    const result = spawnSync(command, args, {
        cwd: packageDirectory,
        stdio: "inherit"
    });

    if (result.status !== 0) {
        process.exit(result.status ?? 1);
    }
}

const targetDirectory = join("src", "core", category);
const shadcnArgs = ["dlx", "shadcn@latest", "add", "--path", targetDirectory, ...requestedComponents];

runCommand(packageManagerCommand, shadcnArgs);
runCommand(packageManagerCommand, ["run", "sync:exports"]);
