function createBolhas(){
    const bolhasConatiner = document.querySelector("[data-banner-camada-2]")
    const crateElement = document.createElement('span')
    var size = Math.random() * 60
    var val = (Math.random() * 3)

    crateElement.style.width = 20 + size + 'px'
    crateElement.style.height = 20 + size + 'px'
    crateElement.style.left = Math.random() * innerWidth + 'px'
    crateElement.style.background = 'var(--cor-banner-'+Math.trunc(val)+')'
    bolhasConatiner.appendChild(crateElement)
    setTimeout(()=>{
        crateElement.remove()
    },8000)
}

setInterval(createBolhas, 1000)
