//Declaracion de los objetos necesarios
let canv = document.getElementById("canvas")
let board = new Board(650, 550, canv)
let barra = new Bar(0, 0, 25, 25, board)
let barra2 = new Bar(50, 20, 25, 25, board)

//Listeners para los eventos
window.addEventListener("load", main, true)
document.addEventListener("keydown", function (ev) {
    if (ev.key == 38) {
        Bar.Up()
    }
    else if (ev.key == 40) {
        Bar.Down()
    }
})

//Ejecucion del programa
function main() {
    draw(board)
}