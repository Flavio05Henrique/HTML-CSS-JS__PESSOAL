export const interactiveProgressBar = (barMaskA, funcA) => {

    let barMask = barMaskA
    let func = funcA
    
    let barFillIsDafined = false
    let barFill

    

    const activeteBarInteraction = () => {
        dragStartPrevent()
        mouseDown()
        mouseUp()
        mouseOut()
    }

    const dragStartPrevent = () => {
        barMask.addEventListener('dragstart', event => {
            event.preventDefault();
        })
    }

    const mouseDown = () => {
        barMask.addEventListener('mousedown', event => {
            calculatesPercentageOfbarControl(event)
            mouseMove()
        })
    }

    const mouseUp = () => {
        barMask.addEventListener('mouseup', event => {
            barMask.removeEventListener('mousemove', calculatesPercentageOfbarControl)
        })
    }

    const mouseOut = () => {
        barMask.addEventListener('mouseout', event => {
            barMask.removeEventListener('mousemove', calculatesPercentageOfbarControl)
        })
    }

    const mouseMove = () => {
        barMask.addEventListener('mousemove', calculatesPercentageOfbarControl)
    }

    const calculatesPercentageOfbarControl = (mouseMoveEvent) => {
        const cardClicked = mouseMoveEvent.target
        if(barFillIsDafined == false) {
            barFillIsDafined = true
            barFill = mouseMoveEvent.target.parentNode.querySelector('[data-control-bar-fill]')
        } 

        const barNum = cardClicked.getBoundingClientRect().height
        const value = mouseMoveEvent.offsetY
        
        const calc = parseInt((100 * value )/barNum) 
        setBarFill(calc)
        executFunc(calc)

        return calc
    }

    const setBarFill = (calc) => {
        barFill.style.height = calc + '%'
    }

    const executFunc = (value) => {
        func(value)
    }

    activeteBarInteraction()
}   