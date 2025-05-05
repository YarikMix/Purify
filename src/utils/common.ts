function findNode(selector, {timeout = 60000, throwError = true, observerOptions = null, rootNode = null} = {}): Promise<HTMLElement> {
	return new Promise((resolve, reject) => {
		rootNode = rootNode || document;

		const el = rootNode.querySelector(selector);
		if (el) {
			resolve(el);
			return;
		}

		const observer = new MutationObserver(function (mutations, obs) {
			const el = rootNode.querySelector(selector);
			if (el) {
				obs.disconnect();
				window.clearTimeout(timeoutId);
				resolve(el);
			}
		});

		const options = {
			childList: true,
			subtree: true,
		};
		if (observerOptions) {
			Object.assign(options, observerOptions);
		}

		observer.observe(rootNode, options);

		const timeoutId = window.setTimeout(function () {
			observer.disconnect();

			if (throwError) {
				reject(new Error(`DOM node not found: ${selector}`));
			} else {
				resolve();
			}
		}, timeout);
	});
}
