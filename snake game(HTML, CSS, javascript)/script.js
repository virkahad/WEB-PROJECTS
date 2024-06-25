console.log("i am working here")
let movemusic=new Audio('move.mp3')
let gameovermusic=new Audio('gameover.mp3')
let musicgame=new Audio('music.mp3')
let foodmusic=new Audio('food.mp3')
let lastPainttime=0
let score=0
let highscore=0
let speed=9
let inputDir={x:0,y:0}
let snakeArr=[
    {x:14,y:8}
]
let food={x:12,y:10}

// functions

function main(ctime){
    window.requestAnimationFrame(main)
    if((ctime-lastPainttime)/1000< 1/speed){
        return;
    }
    lastPainttime=ctime
    gameengine()

}
function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
        
    return false;
}
function gameengine(){
    if(isCollide(snakeArr)){
        gameovermusic.play();
        musicgame.pause();
        inputDir =  {x: 0, y: 0}; 
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x: 13, y: 15}];
        musicgame.play();
        score=0
    }


// moving snake

// in case of eating
if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
    foodmusic.play();
    score=score+1
    if(score>highscore){
        highscore=score
    }
    snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
    let a = 2;
    let b = 16;
    food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
}
// moving snake
for (let i = snakeArr.length - 2; i>=0; i--) { 
    snakeArr[i+1] = {...snakeArr[i]};
}
snakeArr[0].x += inputDir.x;
snakeArr[0].y += inputDir.y;


//     // displayng the snake
 board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('bodysnake');
        }
        board.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);

    // showing the score
    document.querySelector('.showscore').innerHTML=`Score: ${score}`
    document.querySelector('.showhiscore').innerHTML=`Highscore: ${highscore}`
}

// musicgame.play();
window.requestAnimationFrame(main)
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1} // Start the game
  musicgame.play()
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            movemusic.play()
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            movemusic.play()
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            movemusic.play()
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            movemusic.play()
            inputDir.y = 0;
            break;
        default:
            break;
    }

});