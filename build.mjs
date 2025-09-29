import { build } from "esbuild";

const buildConfig = {
  entryPoints: ["server.js"],
  bundle: true,
  platform: "node",
  target: "node18",
  format: "esm",
  outfile: "dist/server.js",
  external: [
    "fsevents",
    // Keep all Node.js built-ins as external
    "fs",
    "path",
    "os",
    "crypto",
    "http",
    "https",
    "url",
    "querystring",
    "util",
    "events",
    "stream",
    "buffer",
    "zlib",
    "net",
    "tls",
    "dns",
    "child_process",
    "cluster",
    "worker_threads",
    "readline",
    "repl",
    "v8",
    "vm",
    "assert",
    "constants",
    "module",
    "perf_hooks",
    "process",
    "punycode",
    "string_decoder",
    "timers",
    "tty",
  ],
  packages: "bundle", // Bundle npm packages
  banner: {
    js: 'import { createRequire } from "module"; const require = createRequire(import.meta.url);',
  },
};

try {
  await build(buildConfig);
  console.log("✅ Build completed successfully!");
} catch (error) {
  console.error("❌ Build failed:", error);
  process.exit(1);
}
