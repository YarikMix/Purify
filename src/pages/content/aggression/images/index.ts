import {getImages, getScrolledElems, isVisibleInViewport} from "@pages/content/utils";
import axios from "axios";
import {throttle} from "throttle-debounce";
import {API_URL, BACKEND_URL} from "@src/utils/consts";

const analyzedImagesDict: Record<string, string> = {};

const analyzedImages: string[] = [];

const throttled = throttle(100, () => {
	analyzeImages();
});

export const toggleFilterImages = (enabled: boolean) => {
	console.log("toggleFilterImages");
	console.log("enabled", enabled);

	const observer = new MutationObserver(() => {
		analyzeImages();
	});

	const elemsWithScroll = getScrolledElems();

	if (enabled) {
		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});

		elemsWithScroll.each(function () {
			this.addEventListener("scroll", throttled);
		});

		document.addEventListener("scroll", throttled);

		analyzeImages();
	} else {
		observer.disconnect();

		elemsWithScroll.each(function () {
			this.removeEventListener("scroll", throttled);
		});

		document.removeEventListener("scroll", throttled);
	}
};

const analyzeImages = () => {
	console.log("analyzeImages");
	const images = getImages();

	console.log("images", images);

	console.log("analyzedImagesDict", analyzedImagesDict);
	console.log("newSrcArray", analyzedImages);

	for (const img of images) {
		if (img.src != undefined) {
			console.log("isVisibleInViewport", isVisibleInViewport(img));

			if (isVisibleInViewport(img)) {
				if (img.src in analyzedImagesDict) {
					replaceImageSrc(img, analyzedImagesDict[img.src]);
				} else {
					if (!analyzedImages.includes(img.src)) {
						analyzedImages.push(img.src);
						analyzeImage(img);
					}
				}
			}
		}
	}
};

const analyzeImage = async (img: HTMLImageElement) => {
	console.log("analyzeImage");
	console.log("src", img.src);

	try {
		const response = await axios.post(API_URL + "/process_image/", {
			image: img.src,
		});

		const url = response.data.image;
		if (url) {
			console.log("replace img");
			replaceImageSrc(img, url);
		}
	} catch {
		console.log("failed to analyze image: " + img.src);
	}
};

const replaceImageSrc = (img: HTMLImageElement, url: string) => {
	const newSrc = BACKEND_URL + url;

	analyzedImagesDict[img.src] = url;
	analyzedImages.push(newSrc);

	img.src = newSrc;
	console.log("new src", newSrc);
};
