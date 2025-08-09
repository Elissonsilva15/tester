import URL from "./componentes/services/api.js"
const dadoss = document.getElementById('dados')
const nome = document.getElementById('nome')
const email = document.getElementById('email')
const btn = document.getElementById('btn')
const err = document.getElementById('err')
const loader = document.getElementById('loader')



btn.addEventListener('click', () => {
    criarUsuarios()
})





async function criarUsuarios() {

    const users = {
        name: nome.value.trim(),
        email: email.value.trim()
    }


    if (!users.name || !users.email) {
        err.textContent = "Preencha todos os campos."
        return
    }
    loader.style.display = 'block'

    try {
        const resposta = await fetch(URL, {
            method: 'POST',
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify(users)
        })
        if (!resposta.ok) throw new Error('Erro ao salvar usuário')
        const dados = await resposta.json()
        nome.value = ''
        email.value = ''
        console.log("Usuário salvo:", dados)
        carregarDados()
        err.textContent = "Usuário cadastrado com sucesso!"
        setTimeout(() => {
            err.textContent = ""

        }, 5000)
    } catch (e) {
        console.error(e)
        err.textContent = "Erro ao cadastrar usuário."
    } finally {
        loader.style.display = 'none';
        teste()




    }

}
function teste() {

     carregarDados()

}





async function carregarDados() {

    const usuarios = await fetch(URL, {
    })

    const dados = await usuarios.json()
    dadoss.innerHTML = ''

    dados.forEach(usuario => {

        const lista = document.createElement('div')
        lista.classList.add('lista')

        const nomes = document.createElement('span')
        nomes.textContent = usuario.name

        const email = document.createElement('span')
        email.textContent = usuario.email
        const excluir = document.createElement('button')
        excluir.classList.add('excluir')
        excluir.textContent = "Excluir"

        excluir.addEventListener('click', () => {
            exluirUsuario(usuario.id)
        })

        dadoss.appendChild(lista)
        lista.appendChild(nomes)
        lista.appendChild(email)
        lista.appendChild(excluir)



    })

}


async function exluirUsuario(id) {

    loader.style.display = 'block'
    try {
        const exluirUsuario = await fetch(`${URL}/${id}`, {
            method: 'DELETE'
        })
        carregarDados()

    } catch (err) {
        alert("Erro ao excluir ")
    } finally {
        loader.style.display = 'none'
    }
}


carregarDados()
