chrome.storage.onChanged.addListener((state) => {
	console.log("state updated");
	console.log("state", state);
});
