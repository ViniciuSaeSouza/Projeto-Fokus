const html = document.querySelector("html");

const foco_button = document.querySelector(".app__card-button--foco");

const curto_button = document.querySelector(".app__card-button--curto");

const longo_button = document.querySelector(".app__card-button--longo");

foco_button.addEventListener("click", () => {
  html.setAttribute("data-contexto", "foco");
});

curto_button.addEventListener("click", () => {
  html.setAttribute("data-contexto", "descanso-curto");
});

longo_button.addEventListener('click', () => {
    html.setAttribute('data-contexto', 'descanso-longo')
})
