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
    board.bars.forEach(bar =>{
        console.log(ball.width)
        if(hit(bar, ball)){
            console.log("Aca estoy")
            ball.collision(bar)
        }
    })
}

function hit(a, b) {
    //Revisa si a colisiona con b
    var hit = false;
    //Colsiones horizontales
    if (b.x + b.width >= a.x && b.x < a.x + a.width) {
        //Colisiones verticales
        if (b.y + b.height >= a.y && b.y < a.y + a.height)
            hit = true;
    }
    //Colisión de a con b
    if (b.x <= a.x && b.x + b.width >= a.x + a.width) {
        if (b.y <= a.y && b.y + b.height >= a.y + a.height)
            hit = true;
    }
    //Colisión b con a
    if (a.x <= b.x && a.x + a.width >= b.x + b.width) {
        if (a.y <= b.y && a.y + a.height >= b.y + b.height)
            hit = true;
    }
    return hit;
}

function play() {
    if (board.playing) {
        clean(board)
        draw(board)
        checkCollisions(board)
        ball.move()
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
		this.speed_y = 0
		this.speed_x = 3
		this.board = board
		this.direction = 1
		this.bounce_angle = 0
		this.max_bounce_angle = Math.PI / 12
		this.speed = 3

		board.ball = this
		this.kind = "circle"
    }

    get width(){
        return this.radius * 2
    }

    get height(){
        return this.radius * 2
    }

    move(){
        this.x += (this.speed_x * this.direction)
        this.y += (this.speed_y)

        if (this.x <= 10) {
            this.x = 400
            this.y = 200
            this.speed_x = -this.speed_x
            this.bounce_angle = -this.bounce_angle
        }

        if(this.x >= 790){
            this.x = 400
            this.y = 200
            this.speed_x = -this.speed_x
            this.bounce_angle = -this.bounce_angle
        }

        // Collision con paredes horizontales
        if (this.y <= 10) {
            this.speed_y = -this.speed_y
            this.bounce_angle = -this.bounce_angle
        }
        if (this.y >= 390) {
            this.speed_y = -this.speed_y
            this.bounce_angle = -this.bounce_angle
        }
    }

    collision(bar) {
        // Reacciona a la colisión con una barra que recibe como parametro
        var relative_intersect_y = (bar.y + (bar.height / 2)) - this.y

        var normalized_intersect_y = relative_intersect_y / (bar.height / 2)

        this.bounce_angle = normalized_intersect_y * this.max_bounce_angle
        this.speed_y = this.speed * -Math.sin(this.bounce_angle)
        this.speed_x = this.speed * Math.cos(this.bounce_angle)

        if (this.x > (this.board.width / 2)) this.direction = -1
        else this.direction = 1
    }
}