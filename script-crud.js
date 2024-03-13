//Encontrar o botão 'Adicionar Tarefa'
const btnAdicionarNovaTarefa = document.querySelector('.app__button--add-task');
const formAdicionarTarefa = document.querySelector('.app__form-add-task');
const textArea = document.querySelector('app__form-textarea');


btnAdicionarNovaTarefa.addEventListener('click', () => {
    formAdicionarTarefa.classList.toggle('hidden')
})
