
const formFilterImage = document.querySelector("[data-pesquisa-imagem-container]")
const imagensContainer = document.querySelector("[data-suas-imagens]")

const currenteList = registrationsList[checkLoginIndex]
let listFilteredItems = []

formFilterImage.addEventListener('submit', sub =>{
    sub.preventDefault()
    const search = sub.target.elements["input pesquisa imagem"].value
    resetlistFilteredItems()
    filterImages(search)
    loadingUserPictures(listFilteredItems)
    openPictureFullScreen()
    resetFilterBnt()
})

function resetlistFilteredItems(){
    listFilteredItems = []
}

function filterImages(search){
    for(let i = 0; i < currenteList.suasImagens.length; i++){
        for(let e = 0; e < currenteList.suasImagens[i].tagsImage.length; e++){
            const item = currenteList.suasImagens[i].tagsImage[e].toUpperCase()
            const searchUpperCase = search.toUpperCase()
            if(searchUpperCase == item){
                saveItem(i)
            }
        }
    }
    imagensContainer.innerHTML = ''
}

function saveItem(i){
    listFilteredItems.push(currenteList.suasImagens[i])
}

function resetFilterBnt(){
    const resetBnt = document.querySelector("[data-reset-filtro]")
    resetBnt.addEventListener('click', ()=>{
        
    if(listFilteredItems.length > -1){
        imagensContainer.innerHTML = ''
        loadingUserPictures(currenteList.suasImagens)
        openPictureFullScreen()
    }
        
    })
}