//Declaracion de los objetos necesarios
let canv = document.getElementById("canvas")
let board = new Board(420, 700, canv)
let barra = new Bar(15, 160, 100, 25, board)
let barra2 = new Bar(660, 160, 100, 25, board)
let ball = new Ball(330, 210, 7, board)

//Listeners para los eventos
document.addEventListener("keydown", ev => {
    
    if (ev.keyCode == 38) {
        ev.preventDefault()
        barra2.up()
    }
    else if (ev.keyCode == 40) {
        ev.preventDefault()
        barra2.down()
    }
    else if(ev.keyCode == 87){
        ev.preventDefault()
        barra.up()
    }
    else if(ev.keyCode == 83){
        ev.preventDefault()
        barra.down()
    }
    else if(ev.keyCode === 32){
        ev.preventDefault()
        board.playing = !board.playing
    }
})

//Ejecucion del programa

window.requestAnimationFrame(update)
draw(board)

function update() {
    play()
    window.requestAnimationFrame(update)    
}