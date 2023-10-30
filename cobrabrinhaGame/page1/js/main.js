const containerSnake = document.querySelector("[data-game-screen]")

let runningGame = false

let snakeY = 330
let snakeX = 630
const snakeWidth = 30
const snakeHight = 30
let displacement = 30
let moveSpeed = 100
let snakeBodyPositions = []

let foodX = 0
let foodY = 0
const foodWidth = 20
const foodHight = 20

let score = 0


playGame()

function playGame(){
    const  bntPlay = document.querySelector("[data-bnt-inicia]")
    bntPlay.addEventListener('click', ()=>{
        runningGame = true
        clearSnakeBodyInContainer()
        returnSnakeInitialPosition()
        clearMensageContainer()
        gameFunctions()
    })
}

function gameFunctions(){
    snakeFunctions()
    generationRandomFood()
}
 
function snakeFunctions(){

    let key = ''
    let previousKey = ''

    snakeMoveBnt()

    function snakeMoveBnt(){

        document.body.addEventListener('keypress', e =>{
            key = e.key
        })
        
        if(previousKey !== 's' &&  key == 'w'){
            snakeMove(snakeY = snakeY - displacement)
            previousKey = key
        }
        if(previousKey !== 'w' &&  key == 's'){
            snakeMove(snakeY = snakeY + displacement)
            previousKey = key
        }
        if(previousKey !== 'd' &&  key == 'a'){
            snakeMove(snakeX = snakeX - displacement)
            previousKey = key
        }
        if(previousKey !== 'a' &&  key == 'd'){
            snakeMove(snakeX = snakeX + displacement)
            previousKey = key
        }

        if(runningGame == true){
            setTimeout(() =>{snakeMoveBnt()},moveSpeed)
        }
    }
}

function snakeMove(direction){
    if(direction){
        direction
    }

    collision()
    checkIfSnakeToBeOutside()

    if(runningGame == true){
        deleteSnakePartInContainer()
        createSnakePartInContainer()
    }
}

function createSnakePartInContainer(){
    containerSnake.innerHTML += `
        <div style="top:${snakeY}px; left:${snakeX}px" class="cobra" data-cobra></div>
    `
}

function deleteSnakePartInContainer(){
    let snake = document.querySelectorAll("[data-cobra]")
    snake[0].remove()
}

function returnSnakeInitialPosition(){
    snakeY = 330
    snakeX = 630
    createSnakePartInContainer()
}

function clearSnakeBodyInContainer(){
    let snake = document.querySelectorAll("[data-cobra]")
    if(snake.length > 1){
        snake.forEach(e => {
            e.remove()
        })
    }
}

function generationRandomFood(){
    let food = document.querySelector("[data-comida]")

    foodX = Math.trunc(Math.random() * 976)
    foodY = Math.trunc(Math.random() * 676)

    food.remove()
    containerSnake.innerHTML += `
        <div  style="top:${foodY}px; left:${foodX}px" class="comida entidade" data-comida></div>
    `
}

function foodEarth(){
    score++
    createSnakePartInContainer()
    updateScore()
}

function collision(){
    if(snakeX < foodX + foodWidth && snakeX + snakeWidth > foodX && snakeY < foodY + foodHight && snakeY + snakeHight > foodY){
        generationRandomFood()
        foodEarth()
    }
}

function gameOver(){
    searchMensageContainer().innerHTML = `
        <div class="mensagem flex_centraliza">
            <p class="game_over">Game Over</p>
            <p class="game_over">Score : ${score}</p>
            <button class="bnt_inicia" data-bnt-inicia>Jogar Novamente</button>
        </div>
    `
    score = 0
    updateScore()
    playGame()
}

function menuGame(){
    searchMensageContainer().innerHTML = `
        <div class="mensagem flex_centraliza">
            <button class="bnt_inicia" data-bnt-inicia>Inicia</button>
        </div>
    `
}

function clearMensageContainer(){
    searchMensageContainer().innerHTML = ``
}

function searchMensageContainer(){
    const mensageContainer = document.querySelector("[data-mensagem]")
    return mensageContainer
}

function checkIfSnakeToBeOutside(){
    if(snakeX + snakeWidth > 996 || snakeX < 0 || snakeY + snakeHight > 690 || snakeY < 0){
        runningGame = false
        gameOver()
    }
}

function updateScore(){
    const Score = document.querySelector('[data-score]')
    Score.remove()
    containerSnake.innerHTML += `
        <div class="score" data-score>score : ${score}</div>
    `
}





