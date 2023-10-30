const loginForm = document.querySelector("[data-login-form]")

loginForm.addEventListener('submit', event => {
    event.preventDefault()
    const loginName = document.querySelector("[data-login-name]")
    const loginPassword = document.querySelector("[data-login-senha]")

    const checkLoginName = registrationsList.findIndex(Element => loginName.value === Element.nome)
    const checkLoginPassword = registrationsList.findIndex(Element => loginPassword.value === Element.senha)
    
    const validNameAndPassword = checkLoginName != -1 && checkLoginPassword != -1
    if(validNameAndPassword){
        activLogin(checkLoginName)
    }
    else {
        const errorInformationOfLogin = document.querySelector("[data-erro-login]")
        errorInformationOfLogin.innerHTML = 'Usuario ou senha incorreto'
    }
})

function activLogin(checkLoginName) {
    registrationsList[checkLoginName].login = 'on'
    localStorage.setItem("registrationsList", JSON.stringify(registrationsList))
    window.location.href = "home.html"
}