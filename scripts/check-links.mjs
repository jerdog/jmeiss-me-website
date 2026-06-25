#!/usr/bin/env node
/**
 * Production build + link crawl of the local site.
 *
 * Usage:
 *   npm run check-links
 *
 * Used by CI to catch broken internal links and dead external URLs before they ship.
 */
import { spawn, execSync } from "node:child_process";
import net from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { LinkChecker, LinkState } from "linkinator";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PORT = await getFreePort();

/** Domains that block bots or are flaky in automated crawls — not user-facing 404s. */
const SKIP = [
  "https://jmeiss.me",
  "https://devopspartygames.com",
  "https://devopsdayskc.org",
  "https://twitter.com",
  "https://x.com",
  "https://platform.twitter.com",
  "https://unsplash.com",
  "https://giphy.com",
  "https://media.giphy.com",
  "https://www.gnu.org",
  "https://linkedin.com",
  "https://www.linkedin.com",
  "https://dev.to",
  "https://github.com",
  "https://bsky.app",
  "https://embed.bsky.app",
  "https://hachyderm.io",
  "https://onestreamsoftware.com",
  "https://communitydays.info",
  "https://orbit.love",
  "https://www.commonroom.io",
  "https://commonroom.io",
  "https://amazon.com",
  "https://www.amazon.com",
  "https://dev-to-uploads.s3.amazonaws.com",
  "https://wiki.preterhuman.net",
  "http://public-domain.zorger.com",
  "https://devrelcon.net",
  "http://devrelrad.io",
  "http://chaoss.community",
  "https://www.fastcompany.com",
  "https://money.cnn.com",
  "http://briefmobile.com",
  "https://www.visionsespresso.com",
  "http://artofcommunityonline.org",
  "https://www.artofcommunityonline.org",
  "https://web.archive.org",
  "fandom.com",
  "https://pixabay.com",
  "https://www.feverbee.com",
  "https://www.gartner.com",
  "https://www.pexels.com",
  "https://medium.com",
  "https://www.freshcup.com",
  "https://www.freepik.com",
  "https://cdn-images-1.medium.com",
  "https://cdn.someecards.com",
  "https://i.imgur.com",
  "https://solace.com",
  "https://solace.dev",
].join(",");

let server;

function log(message) {
  console.log(`[check-links] ${message}`);
}

function getFreePort() {
  return new Promise((resolve, reject) => {
    const probe = net.createServer();
    probe.listen(0, "127.0.0.1", () => {
      const { port } = probe.address();
      probe.close((err) => (err ? reject(err) : resolve(port)));
    });
    probe.on("error", reject);
  });
}

async function waitForServer(url, timeoutMs = 90_000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      const response = await fetch(url, { redirect: "follow" });
      if (response.ok) return;
    } catch {
      // server still starting
    }
    await new Promise((resolve) => setTimeout(resolve, 400));
  }
  throw new Error(`Server did not become ready at ${url}`);
}

function stopServer() {
  if (!server || server.killed) return;
  server.kill("SIGTERM");
}

process.on("SIGINT", () => {
  stopServer();
  process.exit(130);
});
process.on("SIGTERM", () => {
  stopServer();
  process.exit(143);
});

try {
  log("Building site…");
  execSync("npm run build:next", { cwd: ROOT, stdio: "inherit" });

  const baseUrl = `http://127.0.0.1:${PORT}`;
  log(`Starting server on ${baseUrl}…`);
  server = spawn("npm", ["run", "start", "--", "-p", String(PORT), "-H", "127.0.0.1"], {
    cwd: ROOT,
    stdio: "ignore",
    detached: process.platform !== "win32",
  });

  await waitForServer(baseUrl);

  log("Crawling links…");
  console.log(`🏊‍♂️ crawling ${baseUrl}`);

  const checker = new LinkChecker();
  checker.on("link", (link) => {
    if (link.state === LinkState.BROKEN) {
      console.error(`[${link.status}] ${link.url}`);
    }
  });

  const result = await checker.check({
    path: baseUrl,
    recurse: true,
    linksToSkip: SKIP.split(",").filter(Boolean),
  });

  if (!result.passed) {
    const broken = result.links.filter((link) => link.state === LinkState.BROKEN);
    console.error(`\nDetected ${broken.length} broken link(s).`);
    for (const link of broken) {
      const parent = link.parent ? ` (from ${link.parent})` : "";
      console.error(`  [${link.status}] ${link.url}${parent}`);
    }
    process.exit(1);
  }

  log("No broken links found.");
} catch (error) {
  if (error?.status) process.exit(error.status);
  console.error("[check-links] Failed:", error?.message ?? error);
  process.exit(1);
} finally {
  stopServer();
}
