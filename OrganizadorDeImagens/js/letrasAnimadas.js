const letras = document.querySelectorAll(".banner_letra_animada")

function animaLetras(){
    let val = 0
    letras.forEach(Element=>{
        Element.classList.remove('anima_letra')
        setTimeout(()=>{
            Element.classList.add('anima_letra')
        },300 * val)
        val++
    })
}
    

setInterval(animaLetras, 10000)
