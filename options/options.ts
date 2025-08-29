const NUM_SHORTCUTS = 6;

console.log("Options page loaded");

// Saves options to browser.storage
function saveOptions(e: Event) {
	e.preventDefault();
	const settings: { [key: string]: string } = {};

	for (let i = 1; i <= NUM_SHORTCUTS; i++) {
		const input = document.getElementById(`shortcut-${i}`) as HTMLInputElement;
		const commandName = `focus-or-open-${i}`;
		settings[commandName] = input.value.trim();
	}

	browser.storage.sync.set({ shortcuts: settings }).then(() => {
		// Update status to let user know options were saved.
		const status = document.getElementById("status")!;
		status.textContent = "Options saved!";
		setTimeout(() => {
			status.textContent = "";
		}, 1500);
	});
}

// Restores the options from browser.storage
async function restoreOptions() {
	const result = await browser.storage.sync.get("shortcuts");
	const shortcuts = result.shortcuts || {};

	for (let i = 1; i <= NUM_SHORTCUTS; i++) {
		const input = document.getElementById(`shortcut-${i}`) as HTMLInputElement;
		const commandName = `focus-or-open-${i}`;
		input.value = shortcuts[commandName] || "";
	}
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document
	.getElementById("options-form")!
	.addEventListener("submit", saveOptions);
