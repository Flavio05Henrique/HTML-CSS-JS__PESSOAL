import { interactiveProgressBar } from "./interactiveProgressBar.js";

// exemplo de uso

const bar = document.querySelector('[data-control-bar-mask="name"]')
const desmonstrationValue = document.querySelector('[data-valueDemonstration]')

const qualquer = (value) => {
    desmonstrationValue.textContent = String(value).padStart(3, '0')
}

interactiveProgressBar(bar, qualquer)

// -------------------------------------------------------------------------------------

const bar1 = document.querySelector('[data-control-bar-mask="name1"]')
const desmonstrationValue1 = document.querySelector('[data-valueDemonstration1]')

const qualquer1 = (value) => {
    desmonstrationValue1.textContent = String(value).padStart(3, '0')
}

interactiveProgressBar(bar1, qualquer1)

// --------------------------------------------------------------------------------------

const bar2 = document.querySelector('[data-control-bar-mask="name2"]')
const desmonstrationValue2 = document.querySelector('[data-valueDemonstration2]')


const qualquer2 = (value) => {
    desmonstrationValue2.textContent = String(value).padStart(3, '0')
}

interactiveProgressBar(bar2, qualquer2)