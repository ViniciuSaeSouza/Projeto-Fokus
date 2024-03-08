const html = document.querySelector("html");
const foco_button = document.querySelector(".app__card-button--foco");
const curto_button = document.querySelector(".app__card-button--curto");
const longo_button = document.querySelector(".app__card-button--longo");
const banner_image = document.querySelector(".app__image");
const banner_titulo = document.querySelector(".app__title");

const botoes = document.querySelectorAll(".app__card-button");
const botaoStartPause = document.querySelector("#start-pause");

const musicaFocoInput = document.querySelector("#alternar-musica");
const musica = new Audio("/sons/luna-rise-part-one.mp3");
const audioPause = new Audio("/sons/pause.mp3");
const audioPlay = new Audio("/sons/play.wav");
const audioBeep = new Audio("/sons/beep.mp3");

let tempoDecorridoEmSegundos = 5;
let intervaloId = null;

musicaFocoInput.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
  musica.loop(true);
});

foco_button.addEventListener("click", () => {
  alterarContexto("foco");
  foco_button.classList.add("active");
});

curto_button.addEventListener("click", () => {
  alterarContexto("descanso-curto");
  curto_button.classList.add("active");
});

longo_button.addEventListener("click", () => {
  alterarContexto("descanso-longo");
  longo_button.classList.add("active");
});

function alterarContexto(contexto) {
  botoes.forEach(function (contexto) {
    contexto.classList.remove("active");
  });

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

const contagemRegressiva = () => {
  if (tempoDecorridoEmSegundos <= 0) {
    zerar();
    audioBeep.play();
    audioBeep.currentTime = 2;
    audioBeep.volume = 0.2;
    alert("Tempo Finalizado!");
    return;
  }
  tempoDecorridoEmSegundos -= 1;
  console.log("Temporizador: " + tempoDecorridoEmSegundos);
};

botaoStartPause.addEventListener("click", iniciarOuPausar);

function iniciarOuPausar() {
  if (intervaloId) {
    audioPause.play();
    audioPause.volume = 0.3;
    zerar();
    return;
  }
  audioPlay.play();
  audioPlay.volume = 0.3;
  intervaloId = setInterval(contagemRegressiva, 1000);
}

function zerar() {
  clearInterval(intervaloId);
  intervaloId = null;
}
