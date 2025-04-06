import {getImages, isVisibleInViewport} from "@pages/content/utils";
import axios from "axios";

export const toggleFilterImages = (enabled:boolean) => {
    if (enabled) {
        const images = getImages()

        setTimeout(() => {

            for (let img of images) {

                if (img.src != undefined) {
                    console.log("isVisibleInViewport", isVisibleInViewport(img))
                    if (isVisibleInViewport(img)) {
                        console.log("img.src", img.src)
                        analyzeImage(img.src)
                    }
                }

                // img.src = `${randomElement(MEMES)}`
                // img.style.objectFit = 'cover'
                // img.style.objectPosition = '50%'
                //
                // if (img.getAttribute('srcset')) {
                //     img.setAttribute('srcset', `${randomElement(MEMES)}`)
                // }
                //
                // if (img.tagName === 'PICTURE') {
                //     if (img.querySelector('source')) {
                //         const sources = img.querySelectorAll('source')
                //
                //         for (const source of sources) {
                //             if (source.hasAttribute('srcset')) {
                //                 source.setAttribute('srcset', `${randomElement(MEMES)}`)
                //             }
                //         }
                //     }
                // }

                // if (
                //     img.querySelector('img') &&
                //     img.querySelector('img').getAttribute('srcset')
                // ) {
                //     img
                //         .querySelector('img')
                //         .setAttribute('srcset', `${randomElement(MEMES)}`)
                // }

                // if (img.style.backgroundImage) {
                //     img.style.backgroundImage = `url(${randomElement(MEMES)})`
                // }
            }
        }, 100)
    }

}

const analyzeImage = async (url) => {
    console.log("analyzeImage")

    const response = await axios.post('http://127.0.0.1:8080/api/v1/process_image/', {
        image: url
    })

    console.log(response.data)
}
