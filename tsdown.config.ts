import { defineConfig } from "tsdown";
import fs from "node:fs";

const isDev = process.env.NODE_ENV === "development";

const copyStaticFiles = () => {
	if (!fs.existsSync("./dist")) {
		fs.mkdirSync("./dist");
	}

	fs.copyFileSync("./manifest.json", "./dist/manifest.json");
	console.log("manifest.json copied.");

	fs.copyFileSync("./options/options.html", "./dist/options.html");
	console.log("options.html copied.");

	fs.copyFileSync("./options/options.css", "./dist/options.css");
	console.log("options.css copied.");
};

export default defineConfig({
	entry: {
		background: "./background/index.ts",
		options: "./options/options.ts",
	},
	outputOptions: {
		format: "cjs",
	},
	watch: isDev ? ["./background", "./options", "./manifest.json"] : false,
	outDir: "./dist",
	sourcemap: isDev,
	hooks: {
		"build:done": async () => {
			copyStaticFiles();
			console.log("Build finished successfully!");
		},
	},
});
