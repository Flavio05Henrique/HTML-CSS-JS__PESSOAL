const animatedText = document.querySelector('[data="slider__animated__text"]')
const sliderManualControl = document.querySelector('[data="slider__control"]')
const sliderManualControlBnts = document.querySelectorAll('[data="slider__bnt"]')
const sliderImgs = document.querySelectorAll('[data="slider__imgs__itens"]')
const sliderPlusBnt = document.querySelector('[data="plusBntSlider"]')

let slidPage = 0
const slidMaxPages = animatedText.children.length -1
let interval 
let timeOuts = []

const startSlider =  () => {
    slidToTop()
    interval = setInterval(slidToTop, 5000)
}

const resetIntervalSlider = () => {
    clearInterval(interval)
    startSlider()
}

const slidToTop = () => {
    if (slidPage <= slidMaxPages) {
        animatedNextAutoManualControlBnts()
        animatedSliderBntPlus()
        animatedTextSlidToTop()
        animatedImgsSlidToTop(animatedImgsSlidToTopApplie, slidPage, slidPage -1)
        slidPage++
        return
    }
    slidPage = 0
    slidToTop()
}

const animatedTextSlidToTop = () => {
    slidPage == 0 ? animatedText.children[slidMaxPages].classList.remove("slider__applayTextAnimation") : 0
    slidPage > 0 ? animatedText.children[slidPage -1].classList.remove("slider__applayTextAnimation") : 0
    animatedText.children[slidPage].classList.add("slider__applayTextAnimation")
}

const animatedSliderBntPlus = () => {
    slidPage == 0 ? sliderPlusBnt.classList.remove(`slider--backgroundColor__pag${slidMaxPages +1}`) : 0
    slidPage > 0 ? sliderPlusBnt.classList.remove(`slider--backgroundColor__pag${slidPage}`) : 0
    sliderPlusBnt.classList.add(`slider--backgroundColor__pag${slidPage +1}`)
}

const animatedNextAutoManualControlBnts = () => {
    const bntValue = sliderManualControlBnts[slidPage].value
    slidPage == 0 ? sliderManualControlBnts[slidMaxPages]
        .classList.remove(`slider--backgroundColor__pag${slidMaxPages + 1}`) : 0
    slidPage > 0 ? sliderManualControlBnts[slidPage -1]
        .classList.remove(`slider--backgroundColor__pag${bntValue -1}`) : 0
    sliderManualControlBnts[slidPage]
        .classList.add(`slider--backgroundColor__pag${bntValue}`)
}

const sliderControler = () => {
    sliderManualControl.addEventListener('click', event => {
        const element = event.target
        if(element.tagName === "BUTTON") {
            animatedText.children[slidPage -1].classList.remove("slider__applayTextAnimation")
            sliderManualControlBnts[slidPage -1].classList.remove(`slider--backgroundColor__pag${slidPage}`)
            animatedImgsSlidToTopClearAll()
            slidPage = element.value -1
            resetIntervalSlider()
        }
    })
}

const animatedImgsSlidToTop = (func, currentPag, beforePage) => {
    timeOuts = []
    for(i = 0;i <= sliderImgs.length -1; i++) {
        func(i, currentPag, beforePage)
    }
}

const animatedImgsSlidToTopApplie = (i, currentPag, beforePage) => {
    const page = currentPag
    const beforePag = beforePage

    const time = setTimeout(() => {
        if(page === 0) {
            sliderImgs[i].children[slidMaxPages].classList.remove('slider__applayImgAnimationOpen')
            sliderImgs[i].children[slidMaxPages].classList.add('slider__applayImgAnimationClose')
            const time = setTimeout(() => {
                sliderImgs[i].children[slidMaxPages].classList.remove('slider__applayImgAnimationClose')
                sliderImgs[i].children[page].classList.add('slider__applayImgAnimationOpen')
            }, 500)
            timeOuts.push(time)
        }
        if(page > 0 && page <= slidMaxPages) {
            sliderImgs[i].children[beforePag].classList.remove('slider__applayImgAnimationOpen')
            sliderImgs[i].children[beforePag].classList.add('slider__applayImgAnimationClose')
            const time = setTimeout(() => {
                sliderImgs[i].children[page].classList.add('slider__applayImgAnimationOpen')
                sliderImgs[i].children[beforePag].classList.remove('slider__applayImgAnimationClose')
            }, 500)
            timeOuts.push(time)
        }
    }, 400 * i)
    timeOuts.push(time)
}

const animatedImgsSlidToTopClearAll = () => {
    clearTimeouts()
    for(i = 0;i <= sliderImgs.length -1; i++) {
        const reference = sliderImgs[0].children.length
        for(e = 0;e <= reference -1; e++) {
            sliderImgs[i].children[e].classList.remove('slider__applayImgAnimationOpen')
            sliderImgs[i].children[e].classList.remove('slider__applayImgAnimationClose')
        }
    }
}

const clearTimeouts = () => {
    timeOuts.forEach(e => {
        clearTimeout(timeOuts[e]);
    })
}

sliderControler()
startSlider()