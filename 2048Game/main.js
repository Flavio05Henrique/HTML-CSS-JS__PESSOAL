const gameScreen = document.querySelector('[data-game-screen]')
const gameScore = document.querySelector('[data-score]')
console.log(gameScreen)

let board
let score = 0
let changeBoard = false
const rows = 4
const columns = 4

let gameOver = false

const acceptedKeys = ['w', 's', 'a', 'd', 'ArrowUp', 'ArrowDown', 'ArrowLeft','ArrowRight']


window.onload = () => {
    startGame()
}

const startGame = () => {
    gameConfig()
    updateBlocksInScreen()
    checkKeyPressed()
}

const gameConfig = () => {
    board =  [
        [2,0,0,2],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ]
    // board =  [
    //     [2,8,2,8],
    //     [8,2,8,2],
    //     [2,8,2,8],
    //     [8,2,8,2]
    // ]
    
    // board =  [
    //     [2,2,2,2],
    //     [2,2,2,2],
    //     [4,4,8,8],
    //     [4,4,8,8]
    // ]
}

const updateBlocksInScreen = () => {
    gameScreen.innerHTML = ''
    score = 0

    for(let row = 0; row < rows; row ++){
        for(let column = 0; column < columns; column++){
            const blockNumber = board[row][column]
            const checkIfZero = blockNumber == 0 ? '' : blockNumber

            sumScore(blockNumber)   

            const block = `
                <div id="${row}-${column}" class="bloco x${blockNumber}">${checkIfZero}</div>
            `
            gameScreen.innerHTML += block
        }
    }
}

const sumScore = blockNumber => [
    score += blockNumber
]

const updateScore = () => {
    gameScore.innerHTML = score
}

const checkKeyPressed = () => {
    document.addEventListener('keyup', key => {
        const checkIfKeyIsAcepetd =  acceptedKeys.findIndex(acceptedKey => acceptedKey === key.key) !== -1
        const Key = key.key
        
        if(checkIfKeyIsAcepetd){
            changeBoard = false

            if(Key === 'ArrowUp' || Key === 'w'){
                slideTop()
            }
            if(Key === 'ArrowDown' || Key === 's'){
                slideBotton()
            }
            if(Key === 'ArrowLeft' || Key === 'a'){
                slideLeft()
            }
            if(Key === 'ArrowRight' || Key === 'd'){
                slideRight()
            }
            genereteRandomBlock()
            updateBlocksInScreen()
            updateScore()
            checkIfLose()
        }
    })
}

const slide = row => {
    let rowFiltredZero = row.filter(num => num > 0)

    for(let i = 0; i < rowFiltredZero.length -1; i++){
        if(rowFiltredZero[i] == rowFiltredZero[i+1]){
            rowFiltredZero[i] *= 2
            rowFiltredZero[i+1] = 0
        }
    }

    rowFiltredZero = rowFiltredZero.filter(num => num > 0)
    
    while(rowFiltredZero.length < columns){
        rowFiltredZero.push(0)
    }
    
    const rowTreated = rowFiltredZero
    checkIfChangeBoard(row, rowTreated)
    
    return rowTreated
}


const slideLeft = () => {
    for(let row = 0; row < rows; row++) {
        let rowBoard = board[row]
        rowBoard = slide(rowBoard)
        board[row] = rowBoard
    }
}

const slideRight = () => {
    for(let row = 0; row < rows; row++) {
        let rowBoard = board[row].reverse()
        rowBoard = slide(rowBoard).reverse()
        board[row] = rowBoard
    }
}

const slideTop = () => {
    for(let column = 0; column < columns; column++){
        let columnTurnedToRow = [board[0][column], board[1][column], board[2][column], board[3][column]]
        columnTurnedToRow = slide(columnTurnedToRow)

        updateColumn(columnTurnedToRow, column)
    }
}

const slideBotton = () => {
    for(let column = 0; column < columns; column++){
        let columnTurnedToRow = [board[0][column], board[1][column], board[2][column], board[3][column]].reverse()
        columnTurnedToRow = slide(columnTurnedToRow).reverse()
        
        updateColumn(columnTurnedToRow, column)
    }
}

const updateColumn = (columnTurnedToRow, column) => {
    board[0][column] = columnTurnedToRow[0]
    board[1][column] = columnTurnedToRow[1]
    board[2][column] = columnTurnedToRow[2]
    board[3][column] = columnTurnedToRow[3]
}

const genereteRandomBlock = () => {
    const x = parseInt(Math.random() * rows) 
    const y = parseInt(Math.random() * columns)
    
    for(let row = 0; row < rows; row++){
        for(let column = 0; column < columns; column++){
            if(board[x][y] == 0 && changeBoard == true){
                board[x][y] = 2
                return
            } else if (board[row][column] == 0 && changeBoard == true){
                board[row][column] = 2
                return
            }
        }
    }
}

const checkIfChangeBoard = (row, rowTreated) => {
    
    for(let i = 0 ; i < columns; i++){
        if(rowTreated[i] != row[i]){
            changeBoard = true
            break
        }
    }
}

const checkIfLose = () => {
    for(let row = 0; row < rows; row++){
        for(let column = 0; column < columns; column++){
            const checkRow = board[row]
            const checlColunm = [board[0][column], board[1][column], board[2][column], board[3][column]]
            
            if(checkRow[column] == checkRow[column + 1] || checlColunm[column] == checlColunm[column + 1] || checkRow[column] == 0){
                gameOver = false
                return
            }
            
        }
    }
    loseMensage()
}

const loseMensage = () => {
    gameScreen.innerHTML += `
        <div class="lose_mensagem_container">
            <div class="lose_mensagem">
                <p>Perdeu</p>
                <p>${score}</p>
            </div>
        </div>
    `
}

