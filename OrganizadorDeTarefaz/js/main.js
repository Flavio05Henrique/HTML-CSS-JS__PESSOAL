const form = document.querySelector ("[data-form]")
const lista = document.querySelector ("[data-lista]")
const feitoLista = []
const tarefaz = JSON.parse(localStorage.getItem("tarefaz")) || []


tarefaz.forEach((elemento) => {
    criaTarefa(elemento)
});

form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    const nomeDaTarefa = evento.target.elements["nome_da_tarefa"]
    const diaHora = evento.target.elements["dia_hora"]
    const descricao = evento.target.elements["descricao"]

    const tarefaAtual = {
        "nomeDaTarefa": nomeDaTarefa.value,
        "diaHora": diaHora.value,
        "descricao": descricao.value,
        "feito": 0
    }

    tarefaAtual.id = tarefaz[tarefaz.length -1] ? (tarefaz[tarefaz.length -1]).id + 1 : 0 ;

    criaTarefa(tarefaAtual)

    tarefaz.push(tarefaAtual)

    escreveLocalStorang()

    nomeDaTarefa.value = ""
    diaHora.value = ""
    descricao.value = ""
})

function criaTarefa(item) {
    const cartao = document.createElement('div')
    cartao.classList.add("cartao_container")
    cartao.dataset.id = item.id
    cartao.innerHTML

    const header = document.createElement('div')
    header.classList.add("header")
    header.innerHTML
    cartao.appendChild(header)
    
    header.appendChild(botaoFechar(item.id, cartao))
    header.appendChild(botaoTarefaFeita(item))

    const body = document.createElement('div')
    body.classList.add("body")
    body.innerHTML
    cartao.appendChild(body)

    const tarefa = document.createElement('h1')
    tarefa.innerHTML = item.nomeDaTarefa
    body.appendChild(tarefa)

    const tituloDescricao = document.createElement('h2')
    tituloDescricao.innerHTML = "Descrição :"
    body.appendChild(tituloDescricao)

    const fundoInformacao = document.createElement('div')
    fundoInformacao.classList.add("fundo_informacoes")
    fundoInformacao.innerHTML
    body.appendChild(fundoInformacao)
    
    const descricao = document.createElement('p')
    descricao.innerHTML = item.descricao
    fundoInformacao.appendChild(descricao)

    const diaHora = document.createElement('p')
    diaHora.classList.add("hora")
    diaHora.innerHTML = item.diaHora
    fundoInformacao.appendChild(diaHora)
    
    lista.appendChild(cartao)
    
}

function botaoFechar(id, cartao) {

    const fechar = document.createElement('button')
    fechar.classList.add("fechar")
    fechar.classList.add("botaoStilo")
    fechar.innerHTML

    fechar.addEventListener('click', function () {

        setTimeout(function() {
            deletaTarefa(id, cartao)
        }, 500)
        cartao.classList.add('fechar_transicao')
    })
    
    return fechar
}

function deletaTarefa(id, cartao) {
  cartao.remove()

  tarefaz.splice(tarefaz.findIndex(elemento => elemento === id), 1)

  escreveLocalStorang()
}

function botaoTarefaFeita(item) {
    const feito = document.createElement('button')
    feito.classList.add('tarefaComcluida')
    feito.classList.add('botaoStilo')
    feito.innerHTML 
    if (item.feito === 1){
        feito.innerHTML = 'Feito'
        feito.classList.add('tarefaComcluidaTransicao') 
    }

    feito.addEventListener('click', function (e) { 
            if(item.feito === 1){
                feito.innerHTML = ''
                feito.classList.remove('tarefaComcluidaTransicao')
                item.feito = 0
                escreveLocalStorang()
            }
            else {
                e.target.innerHTML = 'Feito'
                item.feito = 1
                feito.classList.add('tarefaComcluidaTransicao')
                escreveLocalStorang()
            } 
    })

    return feito
}

function escreveLocalStorang() {
    localStorage.setItem("tarefaz", JSON.stringify(tarefaz))
}