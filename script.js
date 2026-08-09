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
// VARIÁVEIS
// ==========================================

let musicaAtual = 0;

let aleatorioAtivo = false;

let repetirAtivo = false;


// ==========================================
// FAVORITOS
// ==========================================

let favoritos =
    JSON.parse(
        localStorage.getItem("favoritos")
    ) || [];


// ==========================================
// ELEMENTOS HTML
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

const listaFavoritos =
    document.getElementById("lista-favoritos");

const aleatorio =
    document.getElementById("aleatorio");

const repetir =
    document.getElementById("repetir");


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

play.addEventListener(
    "click",
    function() {

        musica.play();

    }
);


// ==========================================
// PAUSE
// ==========================================

pause.addEventListener(
    "click",
    function() {

        musica.pause();

    }
);


// ==========================================
// PRÓXIMA
// ==========================================

function proximaMusica() {

    if (repetirAtivo) {

        musica.currentTime = 0;

        musica.play();

        return;

    }


    if (aleatorioAtivo) {

        let novaMusica;


        do {

            novaMusica =
                Math.floor(
                    Math.random() *
                    musicas.length
                );

        }

        while (
            novaMusica === musicaAtual &&
            musicas.length > 1
        );


        musicaAtual =
            novaMusica;

    }

    else {

        musicaAtual++;


        if (
            musicaAtual >= musicas.length
        ) {

            musicaAtual = 0;

        }

    }


    carregarMusica();

    musica.play();

}


proxima.addEventListener(
    "click",
    function() {

        proximaMusica();

    }
);


// ==========================================
// ANTERIOR
// ==========================================

anterior.addEventListener(
    "click",
    function() {

        musicaAtual--;


        if (musicaAtual < 0) {

            musicaAtual =
                musicas.length - 1;

        }


        carregarMusica();

        musica.play();

    }
);


// ==========================================
// MÚSICA TERMINOU
// ==========================================

musica.addEventListener(
    "ended",
    function() {

        proximaMusica();

    }
);


// ==========================================
// MODO ALEATÓRIO
// ==========================================

aleatorio.addEventListener(
    "click",
    function() {

        aleatorioAtivo =
            !aleatorioAtivo;


        if (aleatorioAtivo) {

            aleatorio.classList.add(
                "ativo"
            );

        }

        else {

            aleatorio.classList.remove(
                "ativo"
            );

        }

    }
);


// ==========================================
// MODO REPETIR
// ==========================================

repetir.addEventListener(
    "click",
    function() {

        repetirAtivo =
            !repetirAtivo;


        if (repetirAtivo) {

            repetir.classList.add(
                "ativo"
            );

        }

        else {

            repetir.classList.remove(
                "ativo"
            );

        }

    }
);


// ==========================================
// PROGRESSO
// ==========================================

musica.addEventListener(
    "timeupdate",
    function() {


        if (
            !isNaN(musica.duration)
        ) {

            const porcentagem =
                (
                    musica.currentTime /
                    musica.duration
                ) * 100;


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


        if (
            !isNaN(musica.duration)
        ) {

            const novoTempo =
                (
                    progresso.value / 100
                ) *
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
        Math.floor(
            segundos / 60
        );


    const segundosRestantes =
        Math.floor(
            segundos % 60
        );


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


            const linha =
                document.createElement("div");


            linha.classList.add(
                "musica-linha"
            );


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


            const favorito =
                document.createElement("button");


            favorito.classList.add(
                "favorito"
            );


            if (
                favoritos.includes(indice)
            ) {

                favorito.textContent =
                    "❤️";

            }

            else {

                favorito.textContent =
                    "♡";

            }


            favorito.addEventListener(
                "click",
                function(event) {

                    event.stopPropagation();


                    adicionarFavorito(
                        indice
                    );

                }
            );


            linha.appendChild(
                botao
            );


            linha.appendChild(
                favorito
            );


            listaMusicas.appendChild(
                linha
            );

        }
    );

}


// ==========================================
// FAVORITOS
// ==========================================

function adicionarFavorito(indice) {


    if (
        favoritos.includes(indice)
    ) {

        favoritos =
            favoritos.filter(
                function(item) {

                    return item !== indice;

                }
            );

    }

    else {

        favoritos.push(indice);

    }


    localStorage.setItem(
        "favoritos",
        JSON.stringify(favoritos)
    );


    criarPlaylist();

    criarFavoritos();

}


// ==========================================
// CRIAR LISTA DE FAVORITOS
// ==========================================

function criarFavoritos() {

    listaFavoritos.innerHTML = "";


    if (favoritos.length === 0) {

        listaFavoritos.innerHTML =
            "<p>Nenhuma música favorita ainda ❤️</p>";

        return;

    }


    favoritos.forEach(
        function(indice) {


            const musicaItem =
                musicas[indice];


            const botao =
                document.createElement("button");


            botao.classList.add(
                "musica-item"
            );


            botao.textContent =
                "❤️ " +
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


            listaFavoritos.appendChild(
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


        const linhas =
            document.querySelectorAll(
                "#lista-musicas .musica-linha"
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

                    linhas[indice]
                        .style.display =
                        "flex";

                }

                else {

                    linhas[indice]
                        .style.display =
                        "none";

                }

            }
        );

    }
);


// ==========================================
// INICIAR
// ==========================================

criarPlaylist();

criarFavoritos();

carregarMusica();
```
