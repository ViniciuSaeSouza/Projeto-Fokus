const btnAdicionarTarefa = document.querySelector(".app__button--add-task");

const formAdicionarTarefa = document.querySelector(".app__form-add-task");

const textArea = document.querySelector(".app__form-textarea");

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

let tarefaSelecionada = null;

let liTarefaSelecionada = null;

const listaTarefas = document.querySelector(".app__section-task-list");

const btnCancelar = document.querySelector(".app__form-footer__button--cancel");

const btnRemoverConcluidas = document.querySelector("#btn-remover-concluidas");

const btnRemoverTodas = document.querySelector('#btn-remover-todas')

const paragrafoDescricaotarefa = document.querySelector(
  ".app__section-active-task-description"
);

function atualizarTarefas() {
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function criarElementoTarefa(tarefa) {
  const li = document.createElement("li");
  li.classList.add("app__section-task-list-item");

  const svg = document.createElement("svg");
  svg.innerHTML = `
  <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
  </svg>
  `;

  const paragrafo = document.createElement("p");
  paragrafo.textContent = tarefa.descricao;
  paragrafo.classList.add("app__section-task-list-item-description");

  const botao = document.createElement("button");
  botao.classList.add("app_button-edit");

  const imagemDoBotao = document.createElement("img");
  imagemDoBotao.setAttribute("src", "/imagens/edit.png");

  botao.append(imagemDoBotao);

  botao.onclick = () => {
    //  debugger
    const novaDescricao = prompt("Qual o novo nome da tarefa?");
    //  console.log("Descrição da nova tarefa: ", novaDescricao);
    if (novaDescricao) {
      paragrafo.textContent = novaDescricao;
      tarefa.descricao = novaDescricao;
      atualizarTarefas();
    }
  };

  li.append(svg);
  li.append(paragrafo);
  li.append(botao);

  if (tarefa.completa) {
    // liTarefaSelecionada.classList.add("app__section-task-list-item-complete");
    botao.setAttribute("disabled", "disabled");
  } else {
    li.onclick = () => {
      document
        .querySelectorAll(".app__section-task-list-item-active")
        .forEach((elemento) => {
          elemento.classList.remove("app__section-task-list-item-active");
        });

      if (tarefaSelecionada == tarefa) {
        paragrafoDescricaotarefa.textContent = "";
        tarefaSelecionada = null;
        liTarefaSelecionada = null;
        return;
      }
      tarefaSelecionada = tarefa;
      liTarefaSelecionada = li;
      paragrafoDescricaotarefa.textContent = tarefa.descricao;
      li.classList.add("app__section-task-list-item-active");
    };
  }

  return li;
}

btnAdicionarTarefa.addEventListener("click", () => {
  formAdicionarTarefa.classList.toggle("hidden");
});

const limparForumlario = () => {
  textArea.value = "";
  formAdicionarTarefa.classList.add("hidden");
};

btnCancelar.addEventListener("click", limparForumlario);

formAdicionarTarefa.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const tarefa = {
    descricao: textArea.value,
  };
  tarefas.push(tarefa);
  atualizarTarefas();
  const elementoTarefa = criarElementoTarefa(tarefa);
  listaTarefas.append(elementoTarefa);
  textArea.value = "";
  formAdicionarTarefa.classList.add("hidden");
});

tarefas.forEach((tarefa) => {
  const elementoTarefa = criarElementoTarefa(tarefa);

  listaTarefas.append(elementoTarefa);
});

document.addEventListener("FocoFinalizado", () => {
  if (tarefaSelecionada && liTarefaSelecionada) {
    liTarefaSelecionada.classList.remove("app__section-task-list-item-active");
    liTarefaSelecionada.classList.add("app__section-task-list-item-complete");
    liTarefaSelecionada
      .querySelector("button")
      .setAttribute("disabled", "disabled");
    tarefaSelecionada.completa = true;
    atualizarTarefas();
  }
});

const removerTarefas = (somenteCompletas) => {
  const seletor = somenteCompletas ? ".app__section-task-list-item-complete": ".app__section-task-list-item"
  document.querySelectorAll(seletor).forEach(elemento => {
    elemento.remove()})
  tarefas = somenteCompletas ? tarefas.filter(tarefas => !tarefas.completa) : [] ;
  atualizarTarefas()
}

btnRemoverConcluidas.onclick = () => removerTarefas(true)

btnRemoverTodas.onclick = () => removerTarefas()
