
function picturesCardsFunctions(){
    deleteImage()
    addTagsBnt()
}

function deleteImage() {
    const bntDeletaImage = document.querySelectorAll("[data-suas-imagens-fechar]")
    bntDeletaImage.forEach(element =>{
            element.addEventListener('click', ()=>{
                const elementAtualBnt = element.value
                const indexElementeDelete = registrationsList[checkLoginIndex].suasImagens.findIndex(img => img.id == elementAtualBnt)
                if(indexElementeDelete != -1){
                    CreateFormDeleteImageConfirm(indexElementeDelete, element)
                    // registrationsList[checkLoginIndex].suasImagens.splice(indexElementeDelete, 1)
                    // localStorage.setItem("registrationsList", JSON.stringify(registrationsList))
                    // element.parentNode.remove()
                }
            })
    })
}

function CreateFormDeleteImageConfirm(indexElementeDelete, element){
    const formContainer = document.querySelector("[data-container-form]")
    formContainer.innerHTML = `
        <div class="fundo_black">
            <form class="deleta_confirma" data-deleta-confirma>
                
                <div class="deleta_confirma_container">
                    <h4>Certeza ?</h4>
                    <button class="bnt_deleta_confirma" type="button" data-bnt-deleta-confirma>Sim</button>
                    <button class="deleta_confirma_fechar_bnt" type="button" data-close-deleta-confirma>Não</button>
                </div>
            </form>
        </div>
    `
    DeleteImageConfirm(indexElementeDelete, element, formContainer)
}

function DeleteImageConfirm(indexElementeDelete, element, formContainer){
    const bntSim = document.querySelector("[data-bnt-deleta-confirma]")
    const bntNao = document.querySelector("[data-close-deleta-confirma]")

    bntSim.addEventListener('click', ()=>{
        registrationsList[checkLoginIndex].suasImagens.splice(indexElementeDelete, 1)
        localStorage.setItem("registrationsList", JSON.stringify(registrationsList))
        element.parentNode.remove()
        formContainer.innerHTML = ''
})
    bntNao.addEventListener('click', ()=>{
        formContainer.innerHTML = ''
    })
}

function addTagsBnt(){
    const addTagsBnt = document.querySelectorAll("[data-add-tags]")

    addTagsBnt.forEach(element =>{
        element.addEventListener('click', ()=>{
            openTagCreator(element)
            getCurrentElement(element)
        })
    })
}

function openTagCreator(elementAtural){
    const addTagsContainer = document.querySelector("[data-container-form]")
    addTagsContainer.innerHTML = `
        <div class="fundo_black">
            <form class="tag_Criador" data-form-tag-criador>
                <div class="tag_Criador_container">
                    <button class="tag_Criador_fechar_bnt" type="button" data-close-tag-criador>X</button>
                    <label for="add_Tag" class="label_add_tag" data-label-add-tag>Crie sua tag, Max 20l</label>
                    <input type="text" id="add_Tag" class="input_add_tag" name="criador de tags" data-add-tag required>
                    <button class="bnt_tag_Criador" type="submit">Criar</button>
                </div>
            </form>
        </div>
    `
    closeTagCreator()
    createTag(elementAtural)
}

function closeTagCreator(){
    const closeTagCreatorBnt = document.querySelector("[data-close-tag-criador]")

    closeTagCreatorBnt.addEventListener('click', ()=>{
        const addTagsContainer = document.querySelector("[data-container-form]")
        addTagsContainer.innerHTML = ''
    })
}

function createTag(elementAtural){
    const addTagForm = document.querySelector("[data-form-tag-criador]")
    addTagForm.addEventListener('submit', event =>{
        event.preventDefault()
        const addTagInput = document.querySelector("[data-add-tag]")
        if(addTagInput.value.length < 20 && getCurrentElement(elementAtural).tagsImage.length < 5){
            const tagContainer = elementAtural.parentNode.querySelector("[data-suas-imagens-tags]")

            saveTag(elementAtural, addTagInput)

            tagContainer.innerHTML += `
                <div class="tag">
                    <button class="tag_deleta_bnt" type="button" data-tag-deleta-bnt value="${addTagInput.value}">X</button>
                    ${addTagInput.value}
                </div>            
            `
            deleteTag()
        } else {
            const titulo = document.querySelector("[data-label-add-tag]")
            titulo.innerHTML = 'Max-Tags!'
        }
    })
}

function saveTagSuccess(){
    const titleTagCreator = document.querySelector("[data-label-add-tag]")
    titleTagCreator.innerHTML = 'CRIADO'
    setTimeout(()=>{
        titleTagCreator.innerHTML = 'Crie sua tag'
    },800)
}

function saveTag(elementAtural, addTagInput){
        saveTagSuccess()
        getCurrentElement(elementAtural).tagsImage.push(addTagInput.value)
        localStorage.setItem("registrationsList", JSON.stringify(registrationsList))
    
}

function deleteTag(){
    const deletaTagBnt = document.querySelectorAll("[data-tag-deleta-bnt]")
    deletaTagBnt.forEach(element=>{
        element.addEventListener('click', ()=>{
            const arraySuasImagens = registrationsList[checkLoginIndex].suasImagens
            const currentImageLink = element.parentNode.parentNode.parentNode.querySelector(".img").src
            const indexImg = registrationsList[checkLoginIndex].suasImagens.findIndex(element => element.linkImage == currentImageLink)
            const indexTag =  arraySuasImagens[indexImg].tagsImage.findIndex(tag => tag == element.value)
            
            arraySuasImagens[indexImg].tagsImage.splice(indexTag, 1)
            localStorage.setItem("registrationsList", JSON.stringify(registrationsList))
            element.parentNode.remove()
        })
    })
}

function getCurrentElement(elementAtural){
    const arraySuasImagens = registrationsList[checkLoginIndex].suasImagens
    const currentElementIndex = arraySuasImagens.findIndex(img => img.id == elementAtural.value)

    return arraySuasImagens[currentElementIndex]
}