const btnOpenRegister = document.querySelector("[data-open-register]")
const containerForms = document.querySelector("[data-container-form]")
const registrationsList = JSON.parse(localStorage.getItem("registrationsList")) || []

openRegister()

function openRegister(){
    btnOpenRegister.addEventListener('click', () => {
        createRegister()
        deleteRegisterBnt()
        inputNamePassword()
    })
}

function deleteRegisterBnt() {
    const btnCloseRegister = document.querySelector("[data-close-register]")
    btnCloseRegister.addEventListener('click', () => {
        deleteRegister()
    })
}

function deleteRegister(){
    containerForms.innerHTML = ''
}

function createRegister() {
    containerForms.innerHTML += `
        <div class="fundo_black" data-cadastro>
            <form class="cadastro_container" data-form-register>
                <button class="cadastro_fechar" type="button" data-close-register>X</button>
                <label for="cadatro_nome" class="cadastro_titulo">Insira seu nome</label>
                <input type="text" id="cadastro_nome" class="cadastro" name="area de cadastro nome" data-registra-nome required>
                <p class="" data-alerta-existe></p><br>
                <p class="cadastro_instrucao" data-instrucoes>O nome deve começar com @. <br>Max. 8 caracteres nome/senha.</p>
                <label for="cadatro_nome" class="cadastro_titulo">Insira sua senha</label>
                <input type="text" id="cadastro_senha" class="cadastro" name="area de cadastro senha" data-registra-senha required>
                <button class="bnt_cadastrar" type="submit">Cadastrar</button>
            </form>
        </div>`
}



function inputNamePassword() {
    const form = document.querySelector("[data-form-register]")

    form.addEventListener('submit', event => {
        event.preventDefault()
        const name = event.target.elements["area de cadastro nome"]
        const password = event.target.elements["area de cadastro senha"]

        valitadeRegistration(name, password)
    })
}

function valitadeRegistration(name, senha) {
    const nameFirstCharacter = name.value.substr(0,1)
    const instructionParagraph = document.querySelector("[data-instrucoes]")

    if(nameFirstCharacter !== '@' || name.value.length > 8) {
        instructionParagraph.classList.add('senhoOuNomeErrado')
    }
    else {
        const existName = registrationsList.findIndex(element => name.value === element.nome)
        const existePassword = registrationsList.findIndex(element => senha.value === element.senha)

        if(existName != -1 || existePassword != -1){
            alertRegisterExist()
        }
        else{
            storeRegister(name, senha)
        }   
    }

    name.value = ''
    senha.value = ''
    
}

function alertRegisterExist() {
    const existParagraph = document.querySelector("[data-alerta-existe]")
    existParagraph.innerHTML = ''
    existParagraph.innerHTML += 'CADASTRO JÁ EXISTE'
    existParagraph.classList.add('alerta_cadastro_existe')
}

function storeRegister(name, senha){
    console.log('registro')
    const registrations = {
        "nome": name.value,
        "senha": senha.value,
        "imagemDeUsuario":'',
        "login": 'off',
        "suasImagens": []
    }
    
    registrationsList.push(registrations)
    localStorage.setItem("registrationsList", JSON.stringify(registrationsList))
    deleteRegister()
}
