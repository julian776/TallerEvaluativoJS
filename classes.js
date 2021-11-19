class Board {
    constructor(height, width, canvas) {
        this.height = height
        this.width = width
        this.playing = false
        this.game_over = false
        this.bars = []
        //this.ball = new Ball()
        this.context = createCanvas(height, width, canvas)
    }

    getElements() {
        let elements = this.bars
        //elements.push(this.ball)
        return elements
    }
}

function createCanvas(height, width, canvas) {
    canvas.height = height
    canvas.width = width
    context = canvas.getContext("2d")
    return context
}

function draw(board) {
    (board.getElements()).forEach(element => {
        drawElement(this.context, element)
    });
}


function drawElement(ctx, element) {
    switch (element.kind) {
        case "rectangle":
            ctx.fillRect(element.x, element.y, element.width, element.height)
            break
    }
}

class Bar {
    constructor(x, y, height, width, board) {
        this.x = x
        this.y = y
        this.height = height
        this.width = width
        this.board = board
        this.kind = "rectangle"
        this.board.bars.push(this)
        this.speed = 10
    }

    down(){
        this.y += this.speed
    }

    up(){
        this.y -= this.speed
    }
}

class Ball {
    constructor() {
        
    }
}