const musicas = [

    {
        titulo: "Música 1",
        arquivo: "musica1.mp3"
    },

    {
        titulo: "Música 2",
        arquivo: "musica2.mp3"
    },

    {
        titulo: "Música 3",
        arquivo: "musica3.mp3"
    }

];


let musicaAtual = 0;


const musica = document.getElementById("musica");

const titulo = document.getElementById("titulo");

const play = document.getElementById("play");

const pause = document.getElementById("pause");

const anterior = document.getElementById("anterior");

const proxima = document.getElementById("proxima");

const progresso = document.getElementById("progresso");

const tempo = document.getElementById("tempo");

const volume = document.getElementById("volume");


function carregarMusica() {

    const musicaEscolhida = musicas[musicaAtual];

    titulo.textContent = musicaEscolhida.titulo;

    musica.src = musicaEscolhida.arquivo;

    progresso.value = 0;

}


play.addEventListener("click", function() {

    musica.play();

});


pause.addEventListener("click", function() {

    musica.pause();

});


proxima.addEventListener("click", function() {

    musicaAtual++;

    if (musicaAtual >= musicas.length) {
        musicaAtual = 0;
    }

    carregarMusica();

    musica.play();

});


anterior.addEventListener("click", function() {

    musicaAtual--;

    if (musicaAtual < 0) {
        musicaAtual = musicas.length - 1;
    }

    carregarMusica();

    musica.play();

});


musica.addEventListener("timeupdate", function() {

    const porcentagem =
        (musica.currentTime / musica.duration) * 100;

    progresso.value = porcentagem;

    atualizarTempo();

});


progresso.addEventListener("input", function() {

    const novoTempo =
        (progresso.value / 100) * musica.duration;

    musica.currentTime = novoTempo;

});


volume.addEventListener("input", function() {

    musica.volume = volume.value;

});


musica.addEventListener("ended", function() {

    proxima.click();

});


function atualizarTempo() {

    const atual = formatarTempo(musica.currentTime);

    const total = formatarTempo(musica.duration);

    tempo.textContent = atual + " / " + total;

}


function formatarTempo(segundos) {

    if (isNaN(segundos)) {
        return "0:00";
    }

    const minutos = Math.floor(segundos / 60);

    const segundosRestantes =
        Math.floor(segundos % 60);

    return minutos + ":" +
        segundosRestantes.toString().padStart(2, "0");

}


const botoesMusica =
    document.querySelectorAll(".musica-item");


botoesMusica.forEach(function(botao) {

    botao.addEventListener("click", function() {

        musicaAtual =
            Number(botao.dataset.musica);

        carregarMusica();

        musica.play();

    });

});


carregarMusica();
