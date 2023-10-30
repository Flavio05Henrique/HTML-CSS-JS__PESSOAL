
const creatNameUser = document.querySelector("[data-usuario-nome-container]")
const checkLoginIndex = registrationsList.findIndex(element => element.login === 'on')

checkIfLoginIsActiv()

function checkIfLoginIsActiv(){
    if(checkLoginIndex === -1){
        loginNotActiveAlert()
        checkHtmlChange()
    } else {
        loadingUserInformations()
        chosenUserImage()
    }
}

function loadingUserInformations(){
    loadingUserName()
    loginExit()
    lodingUserImage(registrationsList[checkLoginIndex].imagemDeUsuario)
    loadingUserPictures(registrationsList[checkLoginIndex].suasImagens)
}

function loadingUserName(){
    creatNameUser.innerHTML += `
    <div class="nome_usuario">
        ${registrationsList[checkLoginIndex].nome}
    </div>
    `
}

function loginExit() {
    const creatExitBtn = creatNameUser
    creatExitBtn.innerHTML  +=`<button class="btn_login_sair" data-login-exit>Sair</button>`

    const loginExitBtn = document.querySelector("[data-login-exit]")
    
    loginExitBtn.addEventListener('click', ()=>{
        registrationsList[checkLoginIndex].login = 'off'
        localStorage.setItem("registrationsList", JSON.stringify(registrationsList))
        window.location.href = "index.html"
    })
}

function lodingUserImage(img){
    const userImageContainer = document.querySelector("[data-img-usuario]")
    userImageContainer.style.cssText = `background: transparent url(imgs/imgUsuario/${img}) no-repeat center center;` + `background-size: cover`;
   
}

function chosenUserImage(){
    const chosenImage = document.querySelector("[data-carrega-img-perfil]")
    chosenImage.addEventListener('change', () => {
        lodingUserImage(chosenImage.files[0].name)
        saveChosenUserImage(chosenImage.files[0].name)
    })
}

function saveChosenUserImage(img){
    registrationsList[checkLoginIndex].imagemDeUsuario = img;
    localStorage.setItem("registrationsList", JSON.stringify(registrationsList))
}

function loginNotActiveAlert() {
    containerForms.innerHTML = `
            <div class="fundo_black">
                <div class="erro_nao_logado">
                    <p>Você não esta logado!</p>
                    <a href="index.html"> >>>> Inicio <<<< </a>
                </div>
            </div>
            `
}

function checkHtmlChange(){
    const htmlBody = document.querySelector("[data-body]")

    htmlBody.addEventListener('change', ()=>{
            loginNotActiveAlert()
    })
}

function loadingUserPictures(lista){
    if(lista){
        lista.forEach((img) =>{
            const imagensContainer = document.querySelector("[data-suas-imagens]")
            
            imagensContainer.innerHTML += `
            <div class="suas_imagens_card">
                <button class="suas_imagens_fechar suas_imagens_bnt" data-suas-imagens-fechar title="deleta" value="${img.id}">X</button>
                <button class="add_tags suas_imagens_bnt" data-add-tags title="adicinar tag" value="${img.id}">+</button>
                <img src="${img.linkImage}" class="img img_clicavel" data-img-clicavel>
                <div class="suas_imagens_tags" data-suas-imagens-tags>
                </div>
            </div>
            `
         loadingPicturesTags(img)
        })
    }
    picturesCardsFunctions()
}

function loadingPicturesTags(img){
            
    const listaTagContainer = document.querySelectorAll("[data-suas-imagens-tags]")
    const lastTagContainer = listaTagContainer[listaTagContainer.length -1]
    
        img.tagsImage.forEach(tag =>{
            
            lastTagContainer.innerHTML += `
                <div class="tag">
                    <button class="tag_deleta_bnt" type="button" data-tag-deleta-bnt value="${tag}">X</button>
                    ${tag}
                </div>                           
            `
            deleteTag()
        })
}
