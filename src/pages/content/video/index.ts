import $ from "jquery";
import axios from "axios";
import {IS_DEBUG} from "@src/utils/consts";

type T_ContentStorage = {
	intervalId: number | null;
	autoplay: boolean;
	videoNodes: string[];
};

const contentStorage: T_ContentStorage = {
	intervalId: null,
	autoplay: false,
	videoNodes: [],
};

const analyzeVideo = async (video: HTMLVideoElement) => {
	console.log("analyzeVideo");
	console.log("video.src", video.src);
	console.log("contentStorage.videoNodes.includes(video.src)", contentStorage.videoNodes.includes(video.src));
	if (!contentStorage.videoNodes.includes(video.src)) {
		contentStorage.videoNodes.push(video.src);

		const interval = setInterval(() => {
			video.pause();
			video.removeAttribute("autoplay");
		}, 100);

		console.log("video", video);

		console.log("document.URL", document.URL);

		console.log("video.src", video.src);

		console.log("video.currentSrc", video.currentSrc);

		video.pause();
		video.removeAttribute("autoplay");

		// if (document.querySelector(".html5-video-player")) {
		// 	document.querySelector<HTMLElement>(".html5-video-player").style.pointerEvents = " none";
		// 	document.querySelector<HTMLElement>(".html5-video-player").style.display = "none";
		// }

		// document.onkeydown = function (e) {
		// 	e.preventDefault();
		// 	e.stopPropagation();
		// };

		setTimeout(() => {
			const videoContainer = $("ytd-player[id='ytd-player']");
			console.log("videoContainer", videoContainer);
			if (videoContainer.length) {
				videoContainer.css("position", "relative");

				console.log('$("#purify-video-analyze-container").length', $("#purify-video-analyze-container").length);
				if (!$("#purify-video-analyze-container").length) {
					const loaderContainer = $("<div>", {
						id: "purify-video-analyze-container",
						on: {
							click: function (e) {
								e.preventDefault();
								e.stopPropagation();
							},
						},
					});

					const loaderTitle = $("<h1>").text("Идет анализ видео");
					loaderContainer.append(loaderTitle);

					const loader = $("<div>", {
						id: "purify-video-analyze-loader",
					});

					loaderContainer.append(loader);

					videoContainer.append(loaderContainer);
				}
			}
		}, 100);

		const response = await axios.post(IS_DEBUG ? "http://localhost:5003/transcribe" : "https://purify.pro/ml/transcribe", {
			url: document.URL,
		});
		const isDanger = response.data.analysis.label == "not_valid";
		console.log("isDanger", isDanger);

		if (isDanger) {
			console.log(1);
			const loaderContainer = document.getElementById("purify-video-analyze-container");
			console.log("loaderContainer", loaderContainer);

			const title = loaderContainer.querySelector("h1");
			console.log("title", title);
			console.log("title.textContent", title);
			title.textContent = "Видео заблокировано, так как в нем обнаружена агрессия.";
			console.log("title.textContent", title);

			const loader = document.getElementById("purify-video-analyze-loader");
			console.log("loader", loader);
			console.log("loaderContainer.contains(loader)", loaderContainer.contains(loader));
			loaderContainer.contains(loader) && loaderContainer.removeChild(loader);
		} else {
			console.log(2);

			const loaderContainer = document.getElementById("purify-video-analyze-container");
			console.log("loaderContainer", loaderContainer);

			const title = loaderContainer.querySelector("h1");
			title.textContent = "Агрессия не найдена. Приятного просмотра!";

			const loader = document.getElementById("purify-video-analyze-loader");
			console.log("loader", loader);
			console.log("loaderContainer.contains(loader)", loaderContainer.contains(loader));
			loaderContainer.contains(loader) && loaderContainer.removeChild(loader);

			setTimeout(() => {
				const videoContainer = $("ytd-player[id='ytd-player']");
				const loaderContainer = $("#purify-video-analyze-container");
				console.log("videoContainer", videoContainer);
				console.log("loaderContainer.length", loaderContainer.length);
				if (loaderContainer.length) {
					loaderContainer.remove();
				}
				console.log("clearInterval", clearInterval);
				clearInterval(interval);
				video.play();
			}, 2000);
		}

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
};

export const toggleAnalyzeVideo = (enabled: boolean) => {
	console.log("ToggleAnalyzeVideo");

	if (enabled) {
		contentStorage.intervalId = setInterval(() => {
			const videos = document.getElementsByTagName("video");
			for (const video of videos) {
				analyzeVideo(video);
			}
		}, 100);
	} else {
		contentStorage.intervalId && clearInterval(contentStorage.intervalId);
	}

	// const observer = new MutationObserver(function (mutations) {
	// 	mutations.forEach(function (mutation) {
	// 		mutation.addedNodes.forEach(function (node) {
	// 			if (node.nodeName.toLowerCase() === "video") {
	// 				analyzeVideo(node as HTMLVideoElement);
	// 			}
	// 		});
	// 	});
	// });
	//
	// observer.observe(document, {childList: true, subtree: true});
};
