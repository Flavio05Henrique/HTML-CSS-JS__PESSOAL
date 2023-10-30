const bntOpenFormAddImage = document.querySelector("[data-add-imagem]")
const containerForm = document.querySelector("[data-container-form]")
const indexCurrentElement = registrationsList.findIndex(element => element.login === "on")

openAddImageForm()


function openAddImageForm(){
    bntOpenFormAddImage.addEventListener('click', ()=> {
        containerForm.innerHTML = `
            <div class="fundo_black">
                <form class="adicina_imagem" data-adicionar-imagem-form>
                    <div class="adicina_imagem_container">
                        <button class="adicina_imagem_fechar_bnt" type="button" data-close-add-image>X</button>
                        <label for="endereco_imagem" class="adicina_imagem_titulo" data-adicina-imagem-titulo>Cole o endereço da imagem que quer adicionar</label>
                        <input type="text" id="endereco_imagem" required class="adicina_imagem_input" name="endereco imagem">
                        <button type="submit" class="adicina_imagem_bnt">Enviar</button>
                    </div>
                </form>
            </div>
        `
        closeAddImageForm()
        addImageFormSubmit()
        saveUserPictures()
    })
}

function closeAddImageForm(){
    const bntClose = document.querySelector("[data-close-add-image]")

    bntClose.addEventListener('click', ()=>{
        containerForm.innerHTML = ''
    })
}

function addImageFormSubmit(){
    const form = document.querySelector('[data-adicionar-imagem-form]')
    
    
    form.addEventListener('submit', e =>{
        e.preventDefault()
        const imageLink = e.target.elements["endereco_imagem"].value
        const validImages = [".jpg", "image", "jpeg", "png"]
        let LinkHaveImage = false

        validImages.forEach(element =>{
            const checkIfTheLinkHaveImage = imageLink.indexOf(element)
            
            checkIfTheLinkHaveImage > 1 ? LinkHaveImage = true : 0
        })
        LinkHaveImage === true ? criateObjectUserPictures(imageLink) : alertImageReject()
    })
}

function createId(){
    const lastElement = registrationsList[indexCurrentElement].suasImagens
    let id = 0
    lastElement[lastElement.length -1] === undefined ? id = 0 : id = lastElement[lastElement.length -1].id + 1
    return id
}

function alertImageAccepted(){
    const tituloContainer = document.querySelector("[data-adicina-imagem-titulo]")
    tituloContainer.innerHTML = "Sucesso"
    setTimeout(()=> tituloContainer.innerHTML = "Cole o endereço da imagem que quer adicionar",1200)
}

function alertImageReject(){
    const tituloContainer = document.querySelector("[data-adicina-imagem-titulo]")
    tituloContainer.innerHTML = "REJEITADO"
    setTimeout(()=>tituloContainer.innerHTML = "Cole o endereço da imagem que quer adicionar",1200)
}

function criateObjectUserPictures(imageLink){
    let id = createId()
    const UserPictures = {
        "linkImage": imageLink,
        "id": id,
        "tagsImage": []
    }
    saveUserPictures(UserPictures, imageLink)
}

function saveUserPictures(UserPictures, imageLink){
    const checkIfImageLinkExist =  registrationsList[indexCurrentElement].suasImagens.findIndex(element => element.linkImage === imageLink)
    if(UserPictures != null && checkIfImageLinkExist === -1){
     alertImageAccepted()   
     registrationsList[indexCurrentElement].suasImagens.push(UserPictures)
     localStorage.setItem("registrationsList", JSON.stringify(registrationsList))
    }
    //registrationsList[indexCurrentElement].suasImagens = []
    //localStorage.setItem("registrationsList", JSON.stringify(registrationsList))
}