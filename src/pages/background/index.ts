chrome.storage.onChanged.addListener((state) => {
	console.log("state updated")
	console.log("state", state)
});

chrome.declarativeNetRequest.onRuleMatchedDebug.addListener((e) => {
	const msg = `Navigation to ${e.request.url} redirected on tab ${e.request.tabId}.`;
	console.log(msg);
});