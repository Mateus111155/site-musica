```javascript
// ==========================================
// LISTA DE MÚSICAS
// ==========================================

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
    },

    {
        titulo: "Música 4",
        artista: "Artista 4",
        arquivo: "musica4.mp3",
        capa: "capa4.jpg"
    }

];


// ==========================================
// MÚSICA ATUAL
// ==========================================

let musicaAtual = 0;


// ==========================================
// ELEMENTOS DO HTML
// ==========================================

const musica =
    document.getElementById("musica");

const titulo =
    document.getElementById("titulo");

const artista =
    document.getElementById("artista");

const capa =
    document.getElementById("capa");

const play =
    document.getElementById("play");

const pause =
    document.getElementById("pause");

const anterior =
    document.getElementById("anterior");

const proxima =
    document.getElementById("proxima");

const progresso =
    document.getElementById("progresso");

const tempo =
    document.getElementById("tempo");

const volume =
    document.getElementById("volume");

const pesquisa =
    document.getElementById("pesquisa");

const listaMusicas =
    document.getElementById("lista-musicas");


// ==========================================
// CARREGAR MÚSICA
// ==========================================

function carregarMusica() {

    const musicaEscolhida =
        musicas[musicaAtual];


    titulo.textContent =
        musicaEscolhida.titulo;


    artista.textContent =
        musicaEscolhida.artista;


    capa.src =
        musicaEscolhida.capa;


    musica.src =
        musicaEscolhida.arquivo;


    progresso.value = 0;


    atualizarTempo();

}


// ==========================================
// PLAY
// ==========================================

play.addEventListener("click", function() {

    musica.play();

});


// ==========================================
// PAUSAR
// ==========================================

pause.addEventListener("click", function() {

    musica.pause();

});


// ==========================================
// PRÓXIMA MÚSICA
// ==========================================

proxima.addEventListener("click", function() {

    musicaAtual++;


    if (musicaAtual >= musicas.length) {

        musicaAtual = 0;

    }


    carregarMusica();


    musica.play();

});


// ==========================================
// MÚSICA ANTERIOR
// ==========================================

anterior.addEventListener("click", function() {

    musicaAtual--;


    if (musicaAtual < 0) {

        musicaAtual =
            musicas.length - 1;

    }


    carregarMusica();


    musica.play();

});


// ==========================================
// PROGRESSO DA MÚSICA
// ==========================================

musica.addEventListener(
    "timeupdate",
    function() {

        if (!isNaN(musica.duration)) {

            const porcentagem =
                (musica.currentTime /
                musica.duration) * 100;


            progresso.value =
                porcentagem;

        }


        atualizarTempo();

    }
);


// ==========================================
// CLICAR NA BARRA
// ==========================================

progresso.addEventListener(
    "input",
    function() {

        if (!isNaN(musica.duration)) {

            const novoTempo =
                (progresso.value / 100) *
                musica.duration;


            musica.currentTime =
                novoTempo;

        }

    }
);


// ==========================================
// VOLUME
// ==========================================

volume.addEventListener(
    "input",
    function() {

        musica.volume =
            volume.value;

    }
);


// ==========================================
// QUANDO A MÚSICA TERMINAR
// ==========================================

musica.addEventListener(
    "ended",
    function() {

        musicaAtual++;


        if (musicaAtual >= musicas.length) {

            musicaAtual = 0;

        }


        carregarMusica();


        musica.play();

    }
);


// ==========================================
// ATUALIZAR TEMPO
// ==========================================

function atualizarTempo() {

    const atual =
        formatarTempo(
            musica.currentTime
        );


    const total =
        formatarTempo(
            musica.duration
        );


    tempo.textContent =
        atual + " / " + total;

}


// ==========================================
// FORMATAR TEMPO
// ==========================================

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


// ==========================================
// CRIAR PLAYLIST
// ==========================================

function criarPlaylist() {

    listaMusicas.innerHTML = "";


    musicas.forEach(
        function(musicaItem, indice) {


            const botao =
                document.createElement("button");


            botao.classList.add(
                "musica-item"
            );


            botao.textContent =
                "🎵 " +
                musicaItem.titulo;


            botao.addEventListener(
                "click",
                function() {

                    musicaAtual =
                        indice;


                    carregarMusica();


                    musica.play();

                }
            );


            listaMusicas.appendChild(
                botao
            );

        }
    );

}


// ==========================================
// PESQUISA
// ==========================================

pesquisa.addEventListener(
    "input",
    function() {


        const texto =
            pesquisa.value.toLowerCase();


        const botoes =
            document.querySelectorAll(
                ".musica-item"
            );


        musicas.forEach(
            function(musicaItem, indice) {


                const nome =
                    musicaItem.titulo
                    .toLowerCase();


                const nomeArtista =
                    musicaItem.artista
                    .toLowerCase();


                if (
                    nome.includes(texto) ||
                    nomeArtista.includes(texto)
                ) {

                    botoes[indice]
                        .style.display =
                        "block";

                }

                else {

                    botoes[indice]
                        .style.display =
                        "none";

                }

            }
        );

    }
);


// ==========================================
// INICIAR O SITE
// ==========================================

criarPlaylist();

carregarMusica();
```
