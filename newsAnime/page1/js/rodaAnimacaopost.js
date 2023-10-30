const animateElementsContainer = document.querySelectorAll("[data-post-reviw]")
const animateElements = document.querySelectorAll('[data-post-reviw-img]')


function checkIfElmentInScren(){
    let contador = 0
    animateElementsContainer.forEach(e => {
        let val = e.getBoundingClientRect()
        if(val.bottom < window.innerHeight && val.top > 0){
            e.style.animationPlayState = 'running'
            animateElements[contador].style.animationPlayState = 'running'
        }
        contador >= animateElements.length  ? contador = 0 : contador++
    })
}

window.addEventListener('scroll', checkIfElmentInScren)