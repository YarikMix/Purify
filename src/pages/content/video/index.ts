type T_ContentStorage = {
	autoplay: boolean;
	videoNodes: HTMLVideoElement[];
};

const contentStorage: T_ContentStorage = {
	autoplay: false,
	videoNodes: [],
};

function addVideo(video: HTMLVideoElement) {
	if (!contentStorage.videoNodes.includes(video)) {
		contentStorage.videoNodes.push(video);

		console.log("video", video);

		console.log("video.src", video.src);

		console.log("video.currentSrc", video.currentSrc);

		video.pause();
		video.removeAttribute("autoplay");

		if (document.querySelector(".html5-video-player")) {
			document.querySelector<HTMLElement>(".html5-video-player").style.pointerEvents = " none";
			document.querySelector<HTMLElement>(".html5-video-player").style.display = "none";
		}

		setTimeout(() => {
			console.log("asdfasdfasd123");
			const parent = document.querySelector<HTMLElement>("ytd-player");

			if (parent) {
				console.log("parent", parent);
				console.log("parent.children", parent.children);
				parent.style.position = "relative";

				const loader = document.createElement("div");
				loader.style.background = "red";
				loader.style.width = "100%";
				loader.style.height = "100%";
				loader.style.position = "absolute";
				loader.style.top = "0";
				loader.style.right = "0";

				parent.appendChild(loader);
				console.log("parent.children", parent.children);
			}
		}, 250);

		// video.removeAttribute("src");

		// console.log('innerHTML = ""');
		// video.innerHTML = "";
		// video.remove();

		// video.pause();
		// video.removeAttribute("autoplay");

		// console.log("video", video);
		// const events = ["play", "progress", "ended"];
		// for (const event of events) {
		// 	video.addEventListener(event, setAutoplay);
		// }
	}
}

async function setAutoplay(e) {
	console.log("setAutoplay");

	e.preventDefault();

	const video = e.target as HTMLVideoElement;

	video.pause();

	// const button = await findNode('.ytp-right-controls button[data-tooltip-target-id="ytp-autonav-toggle-button"][style=""]', {
	// 	throwError: false,
	// });
	//
	// console.log("button", button);
	// if (button) {
	// 	button.removeEventListener("click", onAutoplayButtonClick);
	//
	// 	const isOn = button.querySelector('[aria-checked="true"]') !== null;
	// 	if (contentStorage.autoplay !== isOn) {
	// 		button.click();
	// 	}
	//
	// 	button.addEventListener("click", onAutoplayButtonClick);
	// }
}

function removeVideo(video: HTMLVideoElement) {
	const index = contentStorage.videoNodes.indexOf(video);

	if (index !== -1) {
		contentStorage.videoNodes.splice(index, 1);

		// const events = ["play", "progress", "ended"];
		// for (const event of events) {
		// 	video.removeEventListener(event, setAutoplay);
		// }
	}
}

export const VideoInit = () => {
	console.log("VideoInit");

	const videos = document.getElementsByTagName("video");
	for (const video of videos) {
		addVideo(video);
	}

	const observer = new MutationObserver(function (mutations) {
		mutations.forEach(function (mutation) {
			mutation.addedNodes.forEach(function (node) {
				if (node.nodeName.toLowerCase() === "video") {
					addVideo(node as HTMLVideoElement);
				}
			});

			// mutation.removedNodes.forEach(function (node) {
			// 	if (node.nodeName.toLowerCase() === "video") {
			// 		removeVideo(node as HTMLVideoElement);
			// 	}
			// });
		});
	});

	observer.observe(document, {childList: true, subtree: true});
};
