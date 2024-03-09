const html = document.querySelector("html");
const foco_button = document.querySelector(".app__card-button--foco");
const curto_button = document.querySelector(".app__card-button--curto");
const longo_button = document.querySelector(".app__card-button--longo");
const banner_image = document.querySelector(".app__image");
const banner_titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const tempoNaTela = document.querySelector("#timer");
const botaoStartPause = document.querySelector("#start-pause");
const startPauseText = document.querySelector("#start-pause span");
const startPauseIcon = document.querySelector(".app__card-primary-button-icon");
const musicaFocoInput = document.querySelector("#alternar-musica");
const musica = new Audio("/sons/luna-rise-part-one.mp3");
const audioPause = new Audio("/sons/pause.mp3");
const audioPlay = new Audio("/sons/play.wav");
const audioBeep = new Audio("/sons/beep.mp3");

let tempoDecorridoEmSegundos = 1500;
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
  tempoDecorridoEmSegundos = 1500;
  alterarContexto("foco");
  foco_button.classList.add("active");
});

curto_button.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 300;
  alterarContexto("descanso-curto");
  curto_button.classList.add("active");
});

longo_button.addEventListener("click", () => {
  tempoDecorridoEmSegundos = 900;
  alterarContexto("descanso-longo");
  longo_button.classList.add("active");
});

function alterarContexto(contexto) {
  mostrarTempo()
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
    audioBeep.play();
    audioBeep.currentTime = 2;
    audioBeep.volume = 0.2;
    alert("Tempo Finalizado!");
    zerar();
    return;
  }
  tempoDecorridoEmSegundos -= 1;
  mostrarTempo()
};

botaoStartPause.addEventListener("click", iniciarOuPausar);

mostrarTempo();
function iniciarOuPausar() {
  if (intervaloId) {
    startPauseText.textContent = "Começar";
    startPauseIcon.setAttribute("src", "/imagens/play_arrow.png");
    audioPause.play();
    audioPause.volume = 0.3;
    zerar();
    return;
  }
  audioPlay.play();
  audioPlay.volume = 0.3;
  intervaloId = setInterval(contagemRegressiva, 1000);
  startPauseText.textContent = "Pausar";
  startPauseIcon.setAttribute("src", "/imagens/pause.png");
}

function zerar() {
  startPauseText.textContent = "Começar";
  startPauseIcon.setAttribute("src", "/imagens/play_arrow.png");
  clearInterval(intervaloId);
  intervaloId = null;
}
function mostrarTempo() {
  const tempo = new Date(tempoDecorridoEmSegundos * 1000);
  const tempoFormatado = tempo.toLocaleTimeString("pt-br", {
    minute: "2-digit",
    second: "2-digit",
  });
  tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo()
