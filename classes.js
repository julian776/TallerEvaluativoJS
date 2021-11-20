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
        let elements = this.bars.map(x=> {return x})
        elements.push(ball)
        return elements
    }
}

function createCanvas(height, width, canvas) {
    canvas.height = height
    canvas.width = width
    context = canvas.getContext("2d")
    return context
}

function clean(board) {
    board.context.clearRect(0, 0, board.width, board.height)
}

function draw(board) {
    (board.getElements()).forEach(element => {
        drawElement(board.context, element)
    });
}

function checkCollisions(board){
    board.bars.forEach(x =>{
        hit(x, ball)
    })
}

function hit(bar, ball){
    validate = false
    console.log((bar.x>=ball.x) && (ball.x <= (bar.x)+bar.width))
    if((bar.x>=ball.x) && (ball.x <= (bar.x)+bar.width)){
        validate = true
    }
    console.log((bar.y <= ball.y) && (ball.y>=(bar.height+bar.y)))
    if((bar.Y <= ball.y) && (ball.y>=(bar.height+bar.y))){
        validate = true
    }
    if(validate == true){
        ball.direction = ball.direction * (-1)
    }
    return validate
    /*
    if(((bar.x - ball.x) == 0) && ((bar.y - ball.y) == 0)){
        ball.direction = ball.direction * (-1)
        validate = true
    }
    */
    /*
    else if((bar.y - ball.y) == 0){
        ball.direction = ball.direction * (-1)
        validate = true
    }
    */
}

function play() {
    if (board.playing) {
        clean(board)
        draw(board)
        ball.move()
        checkCollisions(board)
    }
}


function drawElement(ctx, element) {
    switch (element.kind) {
        case "rectangle":
            ctx.fillRect(element.x, element.y, element.width, element.height)
            break

        case "circle":
            ctx.beginPath()
            ctx.arc(element.x, element.y, element.radius, 0, 7)
            ctx.fill()
            ctx.closePath()
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

    down() {
        this.y += this.speed
    }

    up() {
        this.y -= this.speed
    }

    toString() {
        return "x: " + this.x + " y: " + this.y
    }
}

class Ball {
    constructor(x, y, radius, board) {
        this.x = x
        this.y = y
        this.radius = radius
        this.speedY = 0
        this.speedX = 3
        this.kind = "circle"
        this.direction = 1
    }

    move() {
        this.x += (this.speedX * this.direction)
        this.y += this.speedY
    }
}