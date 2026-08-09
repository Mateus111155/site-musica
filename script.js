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
// ÁLBUNS
// ==========================================

const albuns = [

    {
        nome: "Meu Primeiro Álbum",
        capa: "capa1.jpg"
    },

    {
        nome: "Melhores Músicas",
        capa: "capa2.jpg"
    },

    {
        nome: "Músicas Favoritas",
        capa: "capa3.jpg"
    },

    {
        nome: "Minha Playlist",
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

    atualizarMusicaSelecionada();

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
// PRÓXIMA MÚSICA
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
// MÚSICA ANTERIOR
// ==========================================

anterior.addEventListener(
    "click",
    function() {

        musicaAtual--;


        if (
            musicaAtual < 0
        ) {

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
// ALEATÓRIO
// ==========================================

aleatorio.addEventListener(
    "click",
    function() {

        aleatorioAtivo =
            !aleatorioAtivo;


        aleatorio.classList.toggle(
            "ativo",
            aleatorioAtivo
        );

    }
);


// ==========================================
// REPETIR
// ==========================================

repetir.addEventListener(
    "click",
    function() {

        repetirAtivo =
            !repetirAtivo;


        repetir.classList.toggle(
            "ativo",
            repetirAtivo
        );

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

            progresso.value =
                (
                    musica.currentTime /
                    musica.duration
                ) * 100;

        }


        atualizarTempo();

    }
);


// ==========================================
// ALTERAR POSIÇÃO DA MÚSICA
// ==========================================

progresso.addEventListener(
    "input",
    function() {

        if (
            !isNaN(musica.duration)
        ) {

            musica.currentTime =
                (
                    progresso.value / 100
                ) *
                musica.duration;

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

    if (
        isNaN(segundos)
    ) {

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


    return minutos +
        ":" +
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
                document.createElement(
                    "div"
                );


            linha.classList.add(
                "musica-linha"
            );


            const botao =
                document.createElement(
                    "button"
                );


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
                document.createElement(
                    "button"
                );


            favorito.classList.add(
                "favorito"
            );


            favorito.textContent =
                favoritos.includes(indice)
                    ? "❤️"
                    : "♡";


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


    atualizarMusicaSelecionada();

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
// CRIAR FAVORITOS
// ==========================================

function criarFavoritos() {

    listaFavoritos.innerHTML = "";


    if (
        favoritos.length === 0
    ) {

        listaFavoritos.innerHTML =
            "<p>Nenhuma música favorita ainda ❤️</p>";

        return;

    }


    favoritos.forEach(
        function(indice) {

            const musicaItem =
                musicas[indice];


            const botao =
                document.createElement(
                    "button"
                );


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
            pesquisa.value
                .toLowerCase();


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
// DESTACAR MÚSICA ATUAL
// ==========================================

function atualizarMusicaSelecionada() {

    const linhas =
        document.querySelectorAll(
            "#lista-musicas .musica-linha"
        );


    linhas.forEach(
        function(linha, indice) {

            const botao =
                linha.querySelector(
                    ".musica-item"
                );


            if (
                indice === musicaAtual
            ) {

                linha.classList.add(
                    "tocando"
                );


                botao.textContent =
                    "▶️ " +
                    musicas[indice].titulo;

            }

            else {

                linha.classList.remove(
                    "tocando"
                );


                botao.textContent =
                    "🎵 " +
                    musicas[indice].titulo;

            }

        }
    );

}


// ==========================================
// CRIAR ÁLBUNS
// ==========================================

function criarAlbuns() {

    const listaAlbuns =
        document.getElementById(
            "lista-albuns"
        );


    listaAlbuns.innerHTML = "";


    albuns.forEach(
        function(album) {

            const div =
                document.createElement(
                    "div"
                );


            div.classList.add(
                "album"
            );


            const imagem =
                document.createElement(
                    "img"
                );


            imagem.src =
                album.capa;


            imagem.alt =
                album.nome;


            const tituloAlbum =
                document.createElement(
                    "h3"
                );


            tituloAlbum.textContent =
                album.nome;


            div.appendChild(
                imagem
            );


            div.appendChild(
                tituloAlbum
            );


            listaAlbuns.appendChild(
                div
            );

        }
    );

}


// ==========================================
// MENU
// ==========================================

const menuInicio =
    document.getElementById(
        "menuInicio"
    );


const menuAlbuns =
    document.getElementById(
        "menuAlbuns"
    );


const menuMusicas =
    document.getElementById(
        "menuMusicas"
    );


const menuFavoritos =
    document.getElementById(
        "menuFavoritos"
    );


const inicio =
    document.getElementById(
        "inicio"
    );


const paginaAlbuns =
    document.getElementById(
        "albuns"
    );


const paginaMusicas =
    document.getElementById(
        "musicas"
    );


const paginaFavoritos =
    document.getElementById(
        "favoritos"
    );


// ==========================================
// MOSTRAR INÍCIO
// ==========================================

function mostrarInicio() {

    inicio.style.display =
        "block";

    paginaAlbuns.style.display =
        "none";

    paginaMusicas.style.display =
        "none";

    paginaFavoritos.style.display =
        "none";


    menuInicio.classList.add(
        "ativo"
    );

    menuAlbuns.classList.remove(
        "ativo"
    );

    menuMusicas.classList.remove(
        "ativo"
    );

    menuFavoritos.classList.remove(
        "ativo"
    );

}


// ==========================================
// MOSTRAR ÁLBUNS
// ==========================================

function mostrarAlbuns() {

    inicio.style.display =
        "none";

    paginaAlbuns.style.display =
        "block";

    paginaMusicas.style.display =
        "none";

    paginaFavoritos.style.display =
        "none";


    menuInicio.classList.remove(
        "ativo"
    );

    menuAlbuns.classList.add(
        "ativo"
    );

    menuMusicas.classList.remove(
        "ativo"
    );

    menuFavoritos.classList.remove(
        "ativo"
    );

}


// ==========================================
// MOSTRAR MÚSICAS
// ==========================================

function mostrarMusicas() {

    inicio.style.display =
        "none";

    paginaAlbuns.style.display =
        "none";

    paginaMusicas.style.display =
        "block";

    paginaFavoritos.style.display =
        "none";


    menuInicio.classList.remove(
        "ativo"
    );

    menuAlbuns.classList.remove(
        "ativo"
    );

    menuMusicas.classList.add(
        "ativo"
    );

    menuFavoritos.classList.remove(
        "ativo"
    );

}


// ==========================================
// MOSTRAR FAVORITOS
// ==========================================

function mostrarFavoritos() {

    inicio.style.display =
        "none";

    paginaAlbuns.style.display =
        "none";

    paginaMusicas.style.display =
        "none";

    paginaFavoritos.style.display =
        "block";


    menuInicio.classList.remove(
        "ativo"
    );

    menuAlbuns.classList.remove(
        "ativo"
    );

    menuMusicas.classList.remove(
        "ativo"
    );

    menuFavoritos.classList.add(
        "ativo"
    );

}


// ==========================================
// CLIQUES DO MENU
// ==========================================

menuInicio.addEventListener(
    "click",
    mostrarInicio
);


menuAlbuns.addEventListener(
    "click",
    mostrarAlbuns
);


menuMusicas.addEventListener(
    "click",
    mostrarMusicas
);


menuFavoritos.addEventListener(
    "click",
    mostrarFavoritos
);


// ==========================================
// INICIAR SITE
// ==========================================

criarPlaylist();

criarFavoritos();

criarAlbuns();

carregarMusica();

mostrarInicio();
```
