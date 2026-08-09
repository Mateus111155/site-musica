const musica = document.getElementById("musica");

const play = document.getElementById("play");
const pause = document.getElementById("pause");

const progresso = document.getElementById("progresso");

const tempo = document.getElementById("tempo");

const volume = document.getElementById("volume");


// PLAY
play.addEventListener("click", function() {

    musica.play();

});


// PAUSE
pause.addEventListener("click", function() {

    musica.pause();

});


// PROGRESSO DA MÚSICA
musica.addEventListener("timeupdate", function() {

    const porcentagem =
        (musica.currentTime / musica.duration) * 100;

    progresso.value = porcentagem;

    atualizarTempo();

});


// CLICAR NA BARRA
progresso.addEventListener("input", function() {

    const novoTempo =
        (progresso.value / 100) * musica.duration;

    musica.currentTime = novoTempo;

});


// VOLUME
volume.addEventListener("input", function() {

    musica.volume = volume.value;

});


// ATUALIZAR TEMPO
function atualizarTempo() {

    const atual = formatarTempo(musica.currentTime);

    const total = formatarTempo(musica.duration);

    tempo.textContent = atual + " / " + total;

}


// FORMATAR TEMPO
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
