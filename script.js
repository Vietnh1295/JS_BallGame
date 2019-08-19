const GAMEBOARD_WIDTH = window.innerWidth / 2;
const GAMEBOARD_HEIGHT = window.innerHeight *0.65;
const GAMEBOARD_LEFT = window.innerWidth / 4.5;
const GAMEBOARD_TOP = window.innerHeight / 8;
const GAMEBOARD_ID = "gameboard";

const BALL_DEFAULT_POSITION_X = 250;
const BALL_DEFAULT_POSITION_Y = 250;
const BALL_DEFAULT_RADIUS = 10;
const BALL_DEFAULT_SPEED = 3;

const BAR_DEFAULT_WIDTH = 120;
const BAR_DEFAULT_HEIGHT = 10;
const BAR_DEFAULT_SPEED = 10;
const BAR_BOTTOM_DEFAULT_POSITION_X = GAMEBOARD_WIDTH / 2;
const BAR_BOTTOM_DEFAULT_POSITION_Y = GAMEBOARD_HEIGHT - BAR_DEFAULT_HEIGHT;
const BAR_TOP_DEFAULT_POSITION_X = GAMEBOARD_WIDTH / 2;
const BAR_TOP_DEFAULT_POSITION_Y = 0;
const BAR_LEFT_DEFAULT_POSITION_X = 0;
const BAR_LEFT_DEFAULT_POSITION_Y = GAMEBOARD_HEIGHT / 2;
const BAR_RIGHT_DEFAULT_POSITION_X = GAMEBOARD_WIDTH - BAR_DEFAULT_HEIGHT;
const BAR_RIGHT_DEFAULT_POSITION_Y = GAMEBOARD_HEIGHT / 2;
var num=0;
var key=0;
let Ball = function () {
    this.x = BALL_DEFAULT_POSITION_X;
    this.y = BALL_DEFAULT_POSITION_Y;
    this.radius = BALL_DEFAULT_RADIUS;
    this.speedX = BALL_DEFAULT_SPEED;
    this.speedY = BALL_DEFAULT_SPEED;
    this.drawBall = function (ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = "#fd35d2";
        ctx.fill();
    };
    this.move = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        this.left = this.x - this.radius;
        this.top = this.y - this.radius;
        this.right = this.x + this.radius;
        this.bottom = this.y + this.radius;
    };
    this.setSpeedX = function (speedX) {
        this.speedX = speedX;
    };
    this.setSpeedY = function (speedY) {
        this.speedY = speedY;
    };
    this.checkCollision = function (gameBoard, barBottom, barTop, barLeft, barRight) {
        let isLeftWal = this.left < 0;
        let isRightWall = this.right > gameBoard.getWidth();
        let isTopWall = this.top < 0;
        let isBottomWall = this.bottom > gameBoard.getHeight();
        let isBarBottom = this.bottom >= barBottom.getY() && this.bottom < (barBottom.getY() + barBottom.getHeight())
            && (this.right >= barBottom.getX() && this.right <= barBottom.getX() + barBottom.getWidth()|| this.left >= barBottom.getX()
                && this.left <= barBottom.getX() + barBottom.getWidth() && barBottom.getX());
        let isBarTop = this.top <= barTop.getY() + barTop.getHeight() && (this.left >= barTop.getX()
            && this.left <= barTop.getX() + barTop.getWidth()|| this.right >= barTop.getX()
            && this.right <= barTop.getX() + barTop.getWidth());
        let isBarLeft = this.left < barLeft.getX() + barLeft.getWidth() && (this.bottom >= barLeft.getY()
            && this.bottom <= (barLeft.getY() + barLeft.getHeight())||this.top >= barLeft.getY()
            && this.top <= (barLeft.getY() + barLeft.getHeight()));
        let isBarRight = this.right >= barRight.getX() && (this.top >= barRight.getY()
            && this.top <= (barRight.getY() + barRight.getHeight())||this.bottom >= barRight.getY()
            && this.bottom <= (barRight.getY() + barRight.getHeight()));
        if (isBarLeft || isBarRight) {
            document.getElementById("audio").play();
            this.speedX = -this.speedX;
            score ++;
            if(score%5===0&&score>=5){
                barBottom.setSpeed(barBottom.getSpeed()+25);
                barTop.setSpeed(barTop.getSpeed()+25);
                barLeft.setSpeed(barLeft.getSpeed()+25);
                barRight.setSpeed(barRight.getSpeed()+25);
                lv++;
                if(barBottom.getWidth()>=barBottom.getWidth()/3){
                    barBottom.setWidth(barBottom.getWidth()*0.9);
                }
                if(barTop.getWidth()>=barTop.getWidth()/3){
                    barTop.setWidth(barTop.getWidth()*0.9);
                }
                if(barLeft.getHeight()>=barLeft.getHeight()/3){
                    barLeft.setHeight(barLeft.getHeight()*0.9);
                }
                if(barRight.getHeight()>=barRight.getHeight()/3){
                    barRight.setHeight(barRight.getHeight()*0.9);
                }
                if(this.speedX<0){
                    this.speedX-=2;
                }else {
                    this.speedX+=2;
                }
            }
        }
        if (isBarTop || isBarBottom) {
            document.getElementById("audio").play();
            this.speedY = -this.speedY;
            score ++;
            if(score%5===0&&score>=5){
                barBottom.setSpeed(barBottom.getSpeed()+25);
                barTop.setSpeed(barTop.getSpeed()+25);
                barLeft.setSpeed(barLeft.getSpeed()+25);
                barRight.setSpeed(barRight.getSpeed()+25);
                if(barBottom.getWidth()>=barBottom.getWidth()/3){
                    barBottom.setWidth(barBottom.getWidth()*0.9);
                }
                if(barTop.getWidth()>=barTop.getWidth()/3){
                    barTop.setWidth(barTop.getWidth()*0.9);
                }
                if(barLeft.getHeight()>=barLeft.getHeight()/3){
                    barLeft.setHeight(barLeft.getHeight()*0.9);
                }
                if(barRight.getHeight()>=barRight.getHeight()/3){
                    barRight.setHeight(barRight.getHeight()*0.9);
                }
                lv++;
                if(this.speedY<0){
                    this.speedY-=2;
                }else {
                    this.speedY+=2;
                }
            }
        }
        if (isTopWall || isBottomWall || isLeftWal || isRightWall) {
            alert("Làm sao mà thắng được hả Đông!!! Không lên được lv 10 đâu");
            score = 0;
            lv = 1;
            this.y = BALL_DEFAULT_POSITION_Y;
            this.x = BALL_DEFAULT_POSITION_X;
            this.speedX = BALL_DEFAULT_SPEED;
            this.speedY = BALL_DEFAULT_SPEED;
            barBottom.setSpeed(BAR_DEFAULT_SPEED);
            barTop.setSpeed(BAR_DEFAULT_SPEED);
            barLeft.setSpeed(BAR_DEFAULT_SPEED);
            barRight.setSpeed(BAR_DEFAULT_SPEED);
            barBottom.setWidth(BAR_DEFAULT_WIDTH);
            barTop.setWidth(BAR_DEFAULT_WIDTH);
            barLeft.setHeight(BAR_DEFAULT_WIDTH);
            barRight.setHeight(BAR_DEFAULT_WIDTH);
        }
    };
};
let Bar = function (x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = BAR_DEFAULT_SPEED;
    this.drawBar = function (ctx) {
        ctx.fillStyle = "#2171f2";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };
    this.moveRight = function (gameBoard) {
        if (this.x < gameBoard.getWidth() - this.width) {
            this.x += this.speed;
        }
        if(this.x > gameBoard.getWidth() - this.width){
            this.x = gameBoard.getWidth() - this.width;
        }
    };
    this.moveLeft = function (gameBoard) {
        if (this.x >= 0) {
            this.x -= this.speed;
        }
        if(this.x < 0){
            this.x = 0;
        }
    };
    this.moveUp = function (gameBoard) {
        if (this.y >= 0) {
            this.y -= this.speed;
        }
        if(this.y < 0){
            this.y = 0;
        }
    };
    this.moveDown = function (gameBoard) {
        if (this.y <= gameBoard.getHeight() - this.height) {
            this.y += this.speed;
        }
        if(this.y > gameBoard.getHeight() - this.height){
            this. y = gameBoard.getHeight() - this.height;
        }
    };
    this.getX = function () {
        return this.x;
    };
    this.getY = function () {
        return this.y;
    };
    this.getHeight = function () {
        return this.height;
    };
    this.getWidth = function () {
        return this.width;
    };
    this.getSpeed = function () {
        return this.speed;
    };
    this.setSpeed = function (speed) {
        this.speed = speed;
    };
    this.setWidth = function (width) {
        this.width = width;
    };
    this.setHeight = function (height) {
        this.height = height;
    }
};

let GameBoard = function () {
    this.elementId = GAMEBOARD_ID;
    this.width = GAMEBOARD_WIDTH;
    this.height = GAMEBOARD_HEIGHT;
    this.image = new Image();
    this.drawGameBoard = function () {
        let draw = "";
        draw += "<canvas id='" + this.elementId + "' width='" + this.width + "' height='" + this.height + "'" +
            " style='border: solid darkgrey; background: #e4e4e4;margin-left: " + GAMEBOARD_LEFT + "px;" +
            ";margin-top: "+GAMEBOARD_TOP+"px '></canvas>";
        document.getElementById("board").innerHTML = draw;
    };
    this.getWidth = function () {
        return this.width;
    };
    this.getHeight = function () {
        return this.height;
    };
    this.drawGame = function (ball, barBottom, barTop, barLeft, barRight) {
        let ctx = document.getElementById(this.elementId).getContext("2d");
        ctx.drawImage(this.image,0,0);
        ball.drawBall(ctx);
        barBottom.drawBar(ctx);
        barTop.drawBar(ctx);
        barLeft.drawBar(ctx);
        barRight.drawBar(ctx);
    };
    this.drawScore = function () {
        let ctx = document.getElementById(this.elementId).getContext("2d");
        ctx.font = "25px Arial";
        ctx.fillStyle = "#dddb00";
        ctx.fillText("Score: " + score, 8, 20);
    };
    this.drawLv = function () {
        let ctx = document.getElementById(this.elementId).getContext("2d");
        ctx.font = "25px Arial";
        ctx.fillStyle = "#dd2012";
        ctx.fillText("Lever: " + lv, 8, 50);
    };
    this.clear = function () {
        let ctx = document.getElementById(this.elementId).getContext("2d");
        ctx.clearRect(0, 0, this.width, this.height);
    };
};

function moveBar(key,num) {
    if(num==1) {
        switch (key) {
            case 37: {
                barBottom.moveLeft(gameBoard);
                barTop.moveRight(gameBoard);
                break;
            }
            case 38: {
                barRight.moveUp(gameBoard);
                barLeft.moveDown(gameBoard);
                break;
            }
            case 39: {
                barBottom.moveRight(gameBoard);
                barTop.moveLeft(gameBoard);
                break;
            }
            case 40: {
                barRight.moveDown(gameBoard);
                barLeft.moveUp(gameBoard);
                break;
            }
        }
        gameBoard.clear();
        gameBoard.drawGame(ball, barBottom, barTop, barLeft, barRight);
    }
}

function moveBall() {
    ball.move();
    ball.checkCollision(gameBoard, barBottom, barTop, barLeft, barRight);
    gameBoard.clear();
    gameBoard.drawGame(ball, barBottom, barTop, barLeft, barRight);
    gameBoard.drawScore();
    gameBoard.drawLv();
    moveBar(key,num);
    requestAnimationFrame(moveBall);
}
document.addEventListener('keydown', move);
document.addEventListener('keyup', stop);
function move(event)
{
    key=event.keyCode;
   num=1;
}
function stop(event)
{
    key=event.keyCode;
    num=0;
}

