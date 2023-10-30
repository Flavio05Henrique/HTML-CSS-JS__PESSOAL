const largura = window.screen.width;
const slider = document.querySelector("[data-slider]")
const numberOfSlides = document.querySelectorAll("[data-slide]").length
const interval = 4000
let counter = 0

setInterval(sliderTransition, interval)

function sliderTransition(){
    counter < numberOfSlides ? slider.style.left = '-' + largura * counter + 'px' : 0
    counter < numberOfSlides ? counter++ : counter = 0
}