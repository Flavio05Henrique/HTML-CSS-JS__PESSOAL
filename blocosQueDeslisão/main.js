let main 
let blocks 

const setMain = () => {
    main = document.querySelector('[data-main]')
}

const setBlocks = () => {
    blocks = document.querySelectorAll('[data-bloco-teste]') 
}

let blockClicked
let currentPositionBlockClicked
let conunter = 0

let widthBlock 

const setWidthBlock = () => {
    widthBlock = 1400
}

let heightBlock 

const setHeightBlock = () => {
    heightBlock = 80
}

const positions = []

const getMouseMovePosition = () => {
    mouseDown()
    mouseUp()
    dragStartPrevent()
}

const onMouseMove = event => {
    const dontIsContainer = blockClicked != main
    if(dontIsContainer){
        let possitionYPointer = event.clientY -50
        moveBlockInContainer(possitionYPointer)
        checkColision(possitionYPointer)
    }
}

const moveBlockInContainer = possitionYPointer => {
    blockClicked.style.top = possitionYPointer + 'px'
}

const mouseDown = () => {
    main.addEventListener('mousedown', event => {
        blockClicked = event.target
        currentPositionBlockClicked = blockClicked.style.top
        main.addEventListener('mousemove', onMouseMove)
    })
}

const mouseUp = () => {
    main.addEventListener('mouseup', event => {
        setBlockClickedFinalPositon()
        positions[positions.findIndex(e => e.obj == blockClicked)].y = parseInt(currentPositionBlockClicked) 
        console.log(positions)
        
        main.removeEventListener('mousemove', onMouseMove)
    })
    
}

const setBlockClickedFinalPositon = () => {
    blockClicked.style.top = currentPositionBlockClicked + 'px'
}

const dragStartPrevent = () => {
    main.addEventListener('dragstart', event => {
        event.preventDefault();
    })
}

const getBlocksPositions = () => {
    blocks.forEach(e => {
        const position = {
            'x': parseInt(e.style.left),
            'y': parseInt(e.style.top),
            'id': e.id,
            'obj': e
        }
        positions.push(position)
    })
}

const checkColision = (possitionYPointer) => {
    positions.forEach(position => {
        const dontIsBlockClicked = position.obj != blockClicked 
        const doCollision = possitionYPointer +40 < position.y + heightBlock && possitionYPointer -40 + heightBlock > position.y
        const indexBlockClickeOnPositions = positions.findIndex(e => e.obj == position.obj)

        if(dontIsBlockClicked && doCollision && conunter == 0){
            let collider = currentPositionBlockClicked
            let collided = position.y
            const setBlockClickedPositon = positions[indexBlockClickeOnPositions].y = parseInt(collider) 
            const setcurrentPositionBlockClicked = currentPositionBlockClicked = parseInt(collided)
            updateScreen()
            conunter++
        } else {
            conunter++
            conunter > 10 ? conunter = 0 : 0
        } 
    })
}

const updateScreen = () => {
    positions.forEach(position => {
        position.obj.style.top = position.y + "px"
    })
}

const start = () => {
    setMain()
    setBlocks()
    setWidthBlock()
    setHeightBlock()
    getMouseMovePosition()
    getBlocksPositions()
}

start()