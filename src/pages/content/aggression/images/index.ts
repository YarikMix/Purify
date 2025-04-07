import {getImages, getScrolledElems, isVisibleInViewport} from "@pages/content/utils";
import axios from "axios";
import {throttle} from "throttle-debounce";

const analyzedImages:string[] = []

const throttled = throttle(100, () => {
    analyzeImages()
})

export const toggleFilterImages = (enabled:boolean) => {
    console.log("toggleFilterImages")
    console.log("enabled", enabled)

    const elemsWithScroll = getScrolledElems()

    if (enabled) {
        elemsWithScroll.each(function() {
            this.addEventListener("scroll", throttled)
        })

        document.addEventListener("scroll", throttled)

        analyzeImages()

    } else {
        elemsWithScroll.each(function() {
            this.removeEventListener("scroll", throttled)
        })

        document.removeEventListener("scroll", throttled)
    }
}

const analyzeImages = () => {
    console.log("analyzeImages")
    const images = getImages()

    for (let img of images) {
        if (img.src != undefined) {
            console.log("isVisibleInViewport", isVisibleInViewport(img))
            if (isVisibleInViewport(img) && !analyzedImages.includes(img.src)) {
                analyzedImages.push(img.src)
                analyzeImage(img)
            }
        }
    }
}

const analyzeImage = async (img:HTMLImageElement) => {
    console.log("analyzeImage")
    console.log("src", img.src)

    const response = await axios.post('http://127.0.0.1:8080/api/v1/process_image/', {
        image: img.src
    })

    const url = response.data.image
    if (url) {
        console.log("replace img")
        // TODO: Вынести в .env
        const newSrc = "http://127.0.0.1:9000" + url
        img.src = newSrc
        console.log("new src", newSrc)
    }
}
