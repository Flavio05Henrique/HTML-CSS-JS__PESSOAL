const btnIniciar = document.querySelector ('[data-iniciaNavegacao]')

btnIniciar.addEventListener('click', ()=> {
    const header = document.querySelector ('[data-header]').classList.add('headerReduzido')
    const euSou = document.querySelector ('[data-euSou]').classList.add('displayNone')
    btnIniciar.classList.add('displayNone')
    const navBar = document.querySelector ('[data-navBar]').classList.remove('displayNone')
})
