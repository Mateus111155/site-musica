const musica = document.getElementById("musica");

const play = document.getElementById("play");
const pause = document.getElementById("pause");


play.addEventListener("click", function() {

    musica.play();

});


pause.addEventListener("click", function() {

    musica.pause();

});
