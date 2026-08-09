// ==============================
// LISTA DE MÚSICAS
// ==============================

const musicas = [

    {
        titulo: "Música 1",
        artista: "Artista 1",
        arquivo: "musica1.mp3",
        capa: "capa1.jpg"
    },

    {
        titulo: "Música 2",
        artista: "Artista 2",
        arquivo: "musica2.mp3",
        capa: "capa2.jpg"
    },

    {
        titulo: "Música 3",
        artista: "Artista 3",
        arquivo: "musica3.mp3",
        capa: "capa3.jpg"
    }

];


// ==============================
// MÚSICA ATUAL
// ==============================

let musicaAtual = 0;


// ==============================
// ELEMENTOS DO HTML
// ==============================

const musica = document.getElementById("musica");

const titulo = document.getElementById("titulo");

const artista = document.getElementById("artista");

const capa = document.getElementById("capa");

const play = document.getElementById("play");

const pause = document.getElementById("pause");

const anterior = document.getElementById("anterior");

const proxima = document.getElementById("proxima");

const progresso = document.getElementById("progresso");

const tempo = document.getElementById("tempo");

const volume = document.getElementById("volume");

const pesquisa = document.getElementById("pesquisa");

// ==============================
// CARREGAR MÚSICA
// ==============================

function carregarMusica() {

    const musicaEscolhida = musicas[musicaAtual];

    titulo.textContent = musicaEscolhida.titulo;

    artista.textContent = musicaEscolhida.artista;

    capa.src = musicaEscolhida.capa;

    musica.src = musicaEscolhida.arquivo;

    progresso.value = 0;

    atualizarTempo();

}


// ==============================
// BOTÃO PLAY
// ==============================

play.addEventListener("click", function() {

    musica.play();

});


// ==============================
// BOTÃO PAUSAR
// ==============================

pause.addEventListener("click", function() {

    musica.pause();

});


// ==============================
// PRÓXIMA MÚSICA
// ==============================

proxima.addEventListener("click", function() {

    musicaAtual++;

    if (musicaAtual >= musicas.length) {

        musicaAtual = 0;

    }

    carregarMusica();

    musica.play();

});


// ==============================
// MÚSICA ANTERIOR
// ==============================

anterior.addEventListener("click", function() {

    musicaAtual--;

    if (musicaAtual < 0) {

        musicaAtual = musicas.length - 1;

    }

    carregarMusica();

    musica.play();

});


// ==============================
// ATUALIZAR PROGRESSO
// ==============================

musica.addEventListener("timeupdate", function() {

    if (!isNaN(musica.duration)) {

        const porcentagem =
            (musica.currentTime / musica.duration) * 100;

        progresso.value = porcentagem;

    }

    atualizarTempo();

});


// ==============================
// CLICAR NA BARRA DE PROGRESSO
// ==============================

progresso.addEventListener("input", function() {

    if (!isNaN(musica.duration)) {

        const novoTempo =
            (progresso.value / 100) * musica.duration;

        musica.currentTime = novoTempo;

    }

});


// ==============================
// CONTROLE DE VOLUME
// ==============================

volume.addEventListener("input", function() {

    musica.volume = volume.value;

});


// ==============================
// QUANDO A MÚSICA TERMINAR
// ==============================

musica.addEventListener("ended", function() {

    musicaAtual++;

    if (musicaAtual >= musicas.length) {

        musicaAtual = 0;

    }

    carregarMusica();

    musica.play();

});


// ==============================
// ATUALIZAR TEMPO
// ==============================

function atualizarTempo() {

    const atual =
        formatarTempo(musica.currentTime);

    const total =
        formatarTempo(musica.duration);

    tempo.textContent =
        atual + " / " + total;

}


// ==============================
// FORMATAR TEMPO
// ==============================

function formatarTempo(segundos) {

    if (isNaN(segundos)) {

        return "0:00";

    }

    const minutos =
        Math.floor(segundos / 60);

    const segundosRestantes =
        Math.floor(segundos % 60);

    return minutos + ":" +
        segundosRestantes
        .toString()
        .padStart(2, "0");

}


// ==============================
// BOTÕES DA PLAYLIST
// ==============================

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


// ==============================
// CARREGAR A PRIMEIRA MÚSICA
// ==============================

carregarMusica();

pesquisa.addEventListener("input", function() {

    const texto = pesquisa.value.toLowerCase();

    botoesMusica.forEach(function(botao) {

        const numero = Number(botao.dataset.musica);

        const musicaEncontrada = musicas[numero];

        const nome =
            musicaEncontrada.titulo.toLowerCase();

        const artistaNome =
            musicaEncontrada.artista.toLowerCase();

        if (
            nome.includes(texto) ||
            artistaNome.includes(texto)
        ) {

            botao.style.display = "block";

        } else {

            botao.style.display = "none";

        }

    });

});
