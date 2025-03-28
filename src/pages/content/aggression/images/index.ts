import {randomElement} from "@pages/content/utils";

const MEMES = [
    'https://assets.entrepreneur.com/content/3x2/2000/20180703190744-rollsafe-meme.jpeg?width=700&crop=2:1',
    'http://ichef.bbci.co.uk/news/976/cpsprodpb/17CF4/production/_98842579_distracted_boyfriend.jpg',
    'https://res-3.cloudinary.com/revolttv/image/upload/w_800/c_crop,f_auto,fl_lossy.force_strip,q_auto:best,h_450,w_800,x_0,y_0/eda26h7gxnsjmxwhhwm5.jpg',
    'https://i.kym-cdn.com/entries/icons/original/000/016/546/hidethepainharold.jpg',
    'https://sayingimages.com/wp-content/uploads/Wtf-granma-meme.jpg.webp',
    'https://i.kym-cdn.com/entries/icons/facebook/000/018/012/this_is_fine.jpg',
    'https://imgflip.com/s/meme/Evil-Toddler.jpg'
]

const init = () => {
    const images = document.querySelectorAll<HTMLImageElement>('a, img, picture, div, figure')

    setTimeout(() => {

        for (let img of images) {

            console.log("img.src", img.src)

            img.src = `${randomElement(MEMES)}`
            img.style.objectFit = 'cover'
            img.style.objectPosition = '50%'

            if (img.getAttribute('srcset')) {
                img.setAttribute('srcset', `${randomElement(MEMES)}`)
            }

            if (img.tagName === 'PICTURE') {
                if (img.querySelector('source')) {
                    const sources = img.querySelectorAll('source')

                    for (const source of sources) {
                        if (source.hasAttribute('srcset')) {
                            source.setAttribute('srcset', `${randomElement(MEMES)}`)
                        }
                    }
                }
            }

            // if (
            //     img.querySelector('img') &&
            //     img.querySelector('img').getAttribute('srcset')
            // ) {
            //     img
            //         .querySelector('img')
            //         .setAttribute('srcset', `${randomElement(MEMES)}`)
            // }

            if (img.style.backgroundImage) {
                img.style.backgroundImage = `url(${randomElement(MEMES)})`
            }
        }
    }, 100)
}

export default {init}