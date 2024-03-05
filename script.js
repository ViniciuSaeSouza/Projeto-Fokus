const html = document.querySelector("html");

const foco_button = document.querySelector(".app__card-button--foco");

const curto_button = document.querySelector(".app__card-button--curto");

const longo_button = document.querySelector(".app__card-button--longo");

const banner_image = document.querySelector(".app__image");

const banner_titulo = document.querySelector(".app__title");

foco_button.addEventListener("click", () => {
  alterarContexto("foco");
});

curto_button.addEventListener("click", () => {
  alterarContexto("descanso-curto");
});

longo_button.addEventListener("click", () => {
  alterarContexto("descanso-longo");
});

function alterarContexto(contexto) {
  html.setAttribute("data-contexto", contexto);
  banner_image.setAttribute("src", `/imagens/${contexto}.png`);
  switch (contexto) {
    case "foco":
      banner_titulo.innerHTML = `
      Otimize sua produtividade,<br />
      <strong class="app__title-strong">mergulhe no que importa.</strong>
        `;
      break;
    case "descanso-curto":
      banner_titulo.innerHTML = `
        Que tal dar uma respirada? <br /> 
        <strong class="app__title-strong">Faça uma pausa curta!</strong>
        `;
      break;
    case "descanso-longo":
      banner_titulo.innerHTML = `
        QHora de voltar à superfície. <br /> 
        <strong class="app__title-strong">Faça uma pausa longa.</strong>
        `;
    default:
      break;
  }
}
