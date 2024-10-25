function abrirModal(){
    overlay.classList.add("active");
    criarTarefa.classList.add("active");
}

function fecharModal(){
    overlay.classList.remove("active");
    criarTarefa.classList.remove("active");
}

function buscarTarefas(){
    fetch("http://localhost:3000/tarefas")
    .then(res => res.json())
    .then(res => {
        inserirTarefas(res);
    })
}buscarTarefas();

function inserirTarefas(listaDeTarefas){
    if(listaDeTarefas.length > 0){
         lista.innerHTML = ""
        listaDeTarefas.map(tarefa => {
            lista.innerHTML += `
                <li>
                        <h5>${tarefa.titulo}</h5>
                        <p>${tarefa.descricao}</p>
                        <div class="actions">
                        <box-icon name='trash' size="sm" onclick="deletarTarefa(${tarefa.id})"></box-icon>  
                        </div>
                    </li>
            `;
           
        })
    }
}

function novaTarefa(){
    event.preventDefault();
    let tarefa = {
        titulo: titulo.value,
        descricao: descricao.value
    }
    fetch("http://localhost:3000/tarefas",{
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(tarefa)
        })
        .then(res => res.json())
        .then(res => {
            fecharModal();
            buscarTarefas();
            let form = document.querySelector("criarTarefa form")
            form.requestFullscreen();
        })
}

function deletarTarefa(id){
    fetch(`http://localhost:3000/tarefas/${id}`,{
        method: "DELETE",
    })
    .then(res => res.json())
    .then(res => {
        alert("tarefa deletada com sucesso!");
        buscarTarefas();
    })
}

function pesquisarTarefas() {
    const lis = document.querySelectorAll("ul li");
    const buscaValue = busca.value.toLowerCase(); 

    if (buscaValue.length > 0) {
        lis.forEach(li => {
            const titulo = li.querySelector('h5').innerText.toLowerCase();
            const descricao = li.querySelector('p').innerText.toLowerCase();

            if (!titulo.includes(buscaValue) && !descricao.includes(buscaValue)) {
                li.classList.add('oculto');
            } else {
                li.classList.remove('oculto');
            }
        });
    } else {
        lis.forEach(li => {
            li.classList.remove('oculto');
        });
    }
}

busca.addEventListener('input', pesquisarTarefas);
