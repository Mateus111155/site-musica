```javascript
// ==========================================
// MÚSICAS
// ==========================================

const musicas = [

    {
        titulo: "Música 1",
        artista: "Artista 1",
        arquivo: "musica1.mp3",
        capa: "capa1.jpg",
        album: "Meu Primeiro Álbum"
    },

    {
        titulo: "Música 2",
        artista: "Artista 2",
        arquivo: "musica2.mp3",
        capa: "capa2.jpg",
        album: "Meu Primeiro Álbum"
    },

    {
        titulo: "Música 3",
        artista: "Artista 3",
        arquivo: "musica3.mp3",
        capa: "capa3.jpg",
        album: "Melhores Músicas"
    },

    {
        titulo: "Música 4",
        artista: "Artista 4",
        arquivo: "musica4.mp3",
        capa: "capa4.jpg",
        album: "Melhores Músicas"
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
// ELEMENTOS
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

    const atual =
        musicas[musicaAtual];

    titulo.textContent =
        atual.titulo;

    artista.textContent =
        atual.artista;

    capa.src =
        atual.capa;

    musica.src =
        atual.arquivo;

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
// PRÓXIMA
// ==========================================

function proximaMusica() {

    if (repetirAtivo) {

        musica.currentTime = 0;

        musica.play();

        return;

    }


    if (aleatorioAtivo) {

        musicaAtual =
            Math.floor(
                Math.random() *
                musicas.length
            );

    }

    else {

        musicaAtual++;

        if (
            musicaAtual >=
            musicas.length
        ) {

            musicaAtual = 0;

        }

    }


    carregarMusica();

    musica.play();

}


proxima.addEventListener(
    "click",
    proximaMusica
);


// ==========================================
// ANTERIOR
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
// TERMINOU
// ==========================================

musica.addEventListener(
    "ended",
    proximaMusica
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
// BARRA
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
// TEMPO
// ==========================================

function atualizarTempo() {

    tempo.textContent =
        formatarTempo(
            musica.currentTime
        )
        +
        " / "
        +
        formatarTempo(
            musica.duration
        );

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
// PLAYLIST
// ==========================================

function criarPlaylist() {

    listaMusicas.innerHTML = "";


    musicas.forEach(
        function(item, indice) {

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
                item.titulo;


            botao.onclick =
                function() {

                    musicaAtual =
                        indice;

                    carregarMusica();

                    musica.play();

                };


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


            favorito.onclick =
                function(event) {

                    event.stopPropagation();

                    adicionarFavorito(
                        indice
                    );

                };


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
                item =>
                    item !== indice
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
// LISTA DE FAVORITOS
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

            const item =
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
                item.titulo;


            botao.onclick =
                function() {

                    musicaAtual =
                        indice;

                    carregarMusica();

                    musica.play();

                };


            listaFavoritos.appendChild(
                botao
            );

        }
    );

}


// ==========================================
// DESTAQUE
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
            function(item, indice) {

                const nome =
                    item.titulo
                        .toLowerCase();


                const artistaNome =
                    item.artista
                        .toLowerCase();


                linhas[indice].style.display =
                    nome.includes(texto) ||
                    artistaNome.includes(texto)
                        ? "flex"
                        : "none";

            }
        );

    }
);


// ==========================================
// CRIAR ÁLBUNS
// ==========================================

function criarAlbuns() {

    const lista =
        document.getElementById(
            "lista-albuns"
        );


    lista.innerHTML = "";


    albuns.forEach(
        function(album, indice) {

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


            const nome =
                document.createElement(
                    "h3"
                );


            nome.textContent =
                album.nome;


            div.appendChild(
                imagem
            );


            div.appendChild(
                nome
            );


            // CLICAR NO ÁLBUM

            div.onclick =
                function() {

                    abrirAlbum(
                        indice
                    );

                };


            lista.appendChild(
                div
            );

        }
    );

}


// ==========================================
// ABRIR ÁLBUM
// ==========================================

function abrirAlbum(indiceAlbum) {

    const album =
        albuns[indiceAlbum];


    const nomeAlbum =
        document.getElementById(
            "nomeAlbum"
        );


    const lista =
        document.getElementById(
            "lista-album-musicas"
        );


    nomeAlbum.textContent =
        "💿 " +
        album.nome;


    lista.innerHTML = "";


    musicas.forEach(
        function(item, indice) {

            if (
                item.album ===
                album.nome
            ) {

                const botao =
                    document.createElement(
                        "button"
                    );


                botao.classList.add(
                    "musica-item"
                );


                botao.textContent =
                    "🎵 " +
                    item.titulo;


                botao.onclick =
                    function() {

                        musicaAtual =
                            indice;

                        carregarMusica();

                        musica.play();

                    };


                lista.appendChild(
                    botao
                );

            }

        }
    );


    mostrarAlbumMusicas();

}


// ==========================================
// VOLTAR PARA ÁLBUNS
// ==========================================

const voltarAlbuns =
    document.getElementById(
        "voltarAlbuns"
    );


voltarAlbuns.onclick =
    function() {

        mostrarAlbuns();

    };


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


const paginaAlbumMusicas =
    document.getElementById(
        "album-musicas"
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
// ESCONDER TODAS AS PÁGINAS
// ==========================================

function esconderPaginas() {

    inicio.style.display =
        "none";

    paginaAlbuns.style.display =
        "none";

    paginaAlbumMusicas.style.display =
        "none";

    paginaMusicas.style.display =
        "none";

    paginaFavoritos.style.display =
        "none";

}


// ==========================================
// INÍCIO
// ==========================================

function mostrarInicio() {

    esconderPaginas();

    inicio.style.display =
        "block";

}


// ==========================================
// ÁLBUNS
// ==========================================

function mostrarAlbuns() {

    esconderPaginas();

    paginaAlbuns.style.display =
        "block";

}


// ==========================================
// MÚSICAS DO ÁLBUM
// ==========================================

function mostrarAlbumMusicas() {

    esconderPaginas();

    paginaAlbumMusicas.style.display =
        "block";

}


// ==========================================
// MÚSICAS
// ==========================================

function mostrarMusicas() {

    esconderPaginas();

    paginaMusicas.style.display =
        "block";

}


// ==========================================
// FAVORITOS
// ==========================================

function mostrarFavoritos() {

    esconderPaginas();

    paginaFavoritos.style.display =
        "block";

}


// ==========================================
// EVENTOS DO MENU
// ==========================================

menuInicio.onclick =
    mostrarInicio;


menuAlbuns.onclick =
    mostrarAlbuns;


menuMusicas.onclick =
    mostrarMusicas;


menuFavoritos.onclick =
    mostrarFavoritos;


// ==========================================
// INICIAR
// ==========================================

criarPlaylist();

criarFavoritos();

criarAlbuns();

carregarMusica();

mostrarInicio();
```
