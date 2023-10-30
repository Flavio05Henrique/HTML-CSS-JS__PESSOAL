
let pictureArray = []

openPictureFullScreen()

function openPictureFullScreen(){
    if(getScreenVal() > 600){
        const pictures = document.querySelectorAll("[data-img-clicavel]")
        resetePictureArray()
        pictures.forEach(picture => {
            pictureArray.push(picture.src.toString())
            picture.addEventListener('click', ()=>{
                openPictureFullScreenContainer(picture, pictures)
            })
        })
    }
}

function resetePictureArray(){
    pictureArray = []
}

const container = document.querySelector("[data-container-form]")

function openPictureFullScreenContainer(picture, pictures){
    
    container.innerHTML = `
    <div class="fundo_black">
        <div class="imagem_container_full" data-imagem-conatiner>
            <button class="fechar_container_imagem_full" data-fechar-container-imagem-full  type="button">X</button>
            <div class="insere_imagem" data-insere-imagem>
                 <img src="${picture.src}" class="img img_clicavel" data-img-clicavel>
            </div>
            <button class="bnt_next" data-bnt-next type="button">></button>
            <button class="bnt_previous" data-bnt-prevous type="button"><</button>
        </div>
    </div>
    `
    nextPreviousPicture(picture, pictures)
    closePictureFullScreen()
}

function nextPreviousPicture(picture, pictures){
    const nextBtn = document.querySelector("[data-bnt-next]")
    const imagemContainer = document.querySelector("[data-insere-imagem]")

    const currentPictureIndex = pictureArray.findIndex(img => (img === picture.src))
    let val = currentPictureIndex
  
    nextBtn.addEventListener('click', ()=>{
        if(val < pictureArray.length -1){
            val++
        imagemContainer.innerHTML = `
            <img src="${pictures[val].src}" class="img img_clicavel" data-img-clicavel>
            `
        }
    })
    
    const previousBnt = document.querySelector("[data-bnt-prevous]")

        previousBnt.addEventListener('click', ()=>{
            if(val > 0){
                val--
            imagemContainer.innerHTML = `
                <img src="${pictures[val].src}" class="img img_clicavel" data-img-clicavel>
                `
            }
        })
}

function closePictureFullScreen(){
    const closeBnt = document.querySelector("[data-fechar-container-imagem-full]")
    closeBnt.addEventListener('click', ()=>{
        container.innerHTML = ''
    })
}

function getScreenVal(){
    const html = document.querySelector("html")
    let width = html.clientWidth
    return width
}