const container = document.querySelector("[data-container]")
let elementsList = JSON.parse(localStorage.getItem('elementsList')) || []
let temporaryElementsList = JSON.parse(localStorage.getItem('temporaryElementsList')) || []

loadingElement()
clear()
undo()
redo()

container.addEventListener('click', e =>{
    //console.log("x",e.clientX, "y",e.clientY)
    //console.log(elementsList)
    temporaryElementsList = []
    localStorage.setItem("temporaryElementsList",JSON.stringify(temporaryElementsList))
    createElement(e.clientX, e.clientY)
    saveElement(e.clientX, e.clientY)
})

function saveElement(x, y){
    const vals = {
        'x': x,
        'y': y
    }

    elementsList.push(vals)
    localStorage.setItem("elementsList",JSON.stringify(elementsList))
}

function loadingElement(){
    if(elementsList.length >= 0){
        elementsList.forEach(e=>{
            createElement(e.x, e.y)
        })
    }
}


function createElement(x, y){
    container.innerHTML +=`
        <div class="ponto" style="top:${y-10}px;left:${x-10}px" data-ponto></div>
    `
}

function clear(){
    const clearBnt = document.querySelector("[data-clear]")

    clearBnt.addEventListener('click', ()=>{
        container.innerHTML = ''
        elementsList = []
        localStorage.setItem("elementsList",JSON.stringify(elementsList))
        temporaryElementsList = []
        localStorage.setItem("temporaryElementsList",JSON.stringify(temporaryElementsList))
    })
}

function undo(){
    const bntUndo = document.querySelector('[data-desfazer-bnt]')

    bntUndo.addEventListener('click', ()=>{
        if(elementsList.length-1 >= 0){
            const ponto = document.querySelectorAll("[data-ponto]")
            ponto[ponto.length -1].remove()
            
            temporaryElementsList.push(elementsList[elementsList.length -1])
            localStorage.setItem('temporaryElementsList',JSON.stringify(temporaryElementsList))
            elementsList.splice(length-1, 1)
            localStorage.setItem("elementsList",JSON.stringify(elementsList))
        }
    })
}

function redo(){
    const bntRedo = document.querySelector("[data-refazer-bnt")

    bntRedo.addEventListener('click', ()=>{
        if(temporaryElementsList.length -1 >= 0){
            const x = temporaryElementsList[temporaryElementsList.length -1].x
            const y = temporaryElementsList[temporaryElementsList.length -1].y
            temporaryElementsList.splice(temporaryElementsList.length-1, 1)
            localStorage.setItem('temporaryElementsList',JSON.stringify(temporaryElementsList))
            saveElement(x, y)
            createElement(x, y)
        }
    })
}