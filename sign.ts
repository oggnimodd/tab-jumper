import { $ } from "bun";

const AMO_JWT_ISSUER = Bun.env.WEB_EXT_API_KEY || Bun.env.AMO_JWT_ISSUER;
const AMO_JWT_SECRET = Bun.env.WEB_EXT_API_SECRET || Bun.env.AMO_JWT_SECRET;

if (!AMO_JWT_ISSUER || !AMO_JWT_SECRET) {
	console.error("Error: Missing Mozilla Add-on API credentials in .env file.");
	console.error("Please set WEB_EXT_API_KEY and WEB_EXT_API_SECRET.");
	process.exit(1);
}

console.log("Starting the signing process...");

const results =
	await $`web-ext sign --source-dir=./dist --api-key=${AMO_JWT_ISSUER} --api-secret=${AMO_JWT_SECRET} --channel=unlisted`;

console.log("Signing process finished.");
console.log(results.text());
