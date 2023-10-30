const sections = document.querySelectorAll('[data="section"]')
const bntPlus = document.querySelectorAll('[data="plusBntSlider"]')
const bntPlusToTop = document.querySelector('[data="plusBntSliderToTop"]')

let scrollActive = false
const maxSections = sections.length -1
let currentSection = 0


window.addEventListener('wheel', e => {
    const scrollValue = e.deltaY
    const scrollYDirection = scrollValue == 100 ? 1 : -1
    if(scrollActive) {
        scrollPage(scrollYDirection)
        scrollActive = false
        setTimeout(() => scrollActive = true, 700)
    }
})

bntPlus.forEach( e => {
    e.addEventListener('click', e => {
        scrollPage(1)
    })
})

bntPlusToTop.addEventListener('click', e => {
    scrollPage(0)
}) 

const scrollPage = (scrollYDirection) => {
    if(scrollYDirection == 1) {
        currentSection < maxSections ? currentSection++ : 0 
        console.log('1')
    } else if(scrollYDirection == -1) {
        currentSection > 0 ? currentSection-- : 0
        console.log('2')
    } else {
        // caso queira ir para uma seção especifica
        scrollYDirection >= 0 && scrollYDirection < maxSections ? currentSection = scrollYDirection : 0
        console.log('3')
    }

    sections[currentSection].click()
}

setTimeout(() => scrollActive = true, 500)
