console.log("Tab Jumper background script loaded and ready.");

browser.commands.onCommand.addListener(async (commandName) => {
	const data = await browser.storage.sync.get("shortcuts");
	const shortcuts = data.shortcuts || {};
	const targetUrl = shortcuts[commandName];

	if (!targetUrl || targetUrl.trim() === "") {
		console.log(
			`Shortcut "${commandName}" was triggered but is not configured.`,
		);
		return;
	}

	try {
		const allTabsInWindow = await browser.tabs.query({
			currentWindow: true,
		});
		const matchingTabs = allTabsInWindow.filter((tab) => {
			return tab.url && tab.url.startsWith(targetUrl);
		});

		if (matchingTabs.length > 0) {
			const firstMatch = matchingTabs[0];
			if (firstMatch && firstMatch.id !== undefined) {
				console.log(`Found existing tab, activating ID: ${firstMatch.id}`);
				await browser.tabs.update(firstMatch.id, { active: true });

				if (firstMatch.windowId !== undefined) {
					await browser.windows.update(firstMatch.windowId, { focused: true });
				}
			}
		} else {
			console.log(
				`No existing tab found for ${targetUrl}, creating a new one.`,
			);
			await browser.tabs.create({ url: targetUrl });
		}
	} catch (error) {
		console.error(`Error handling command ${commandName}:`, error);
	}
});
