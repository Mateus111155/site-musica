```javascript
// ==========================================
// MENU DE NAVEGAÇÃO
// ==========================================

const menuInicio =
    document.getElementById("menuInicio");

const menuMusicas =
    document.getElementById("menuMusicas");

const menuFavoritos =
    document.getElementById("menuFavoritos");


const inicio =
    document.getElementById("inicio");

const paginaMusicas =
    document.getElementById("musicas");

const paginaFavoritos =
    document.getElementById("favoritos");


// ==========================================
// MOSTRAR INÍCIO
// ==========================================

function mostrarInicio() {

    inicio.style.display = "block";

    paginaMusicas.style.display = "none";

    paginaFavoritos.style.display = "none";


    menuInicio.classList.add("ativo");

    menuMusicas.classList.remove("ativo");

    menuFavoritos.classList.remove("ativo");

}


// ==========================================
// MOSTRAR MÚSICAS
// ==========================================

function mostrarMusicas() {

    inicio.style.display = "none";

    paginaMusicas.style.display = "block";

    paginaFavoritos.style.display = "none";


    menuInicio.classList.remove("ativo");

    menuMusicas.classList.add("ativo");

    menuFavoritos.classList.remove("ativo");

}


// ==========================================
// MOSTRAR FAVORITOS
// ==========================================

function mostrarFavoritos() {

    inicio.style.display = "none";

    paginaMusicas.style.display = "none";

    paginaFavoritos.style.display = "block";


    menuInicio.classList.remove("ativo");

    menuMusicas.classList.remove("ativo");

    menuFavoritos.classList.add("ativo");

}


// ==========================================
// CLIQUES DO MENU
// ==========================================

menuInicio.addEventListener(
    "click",
    mostrarInicio
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
// COMEÇAR NA PÁGINA INICIAL
// ==========================================

mostrarInicio();
```
