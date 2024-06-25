let score=0
let scorrrr=true
console.log("hey i am the dragon")
document.onkeydown = function (e) {
  console.log(e.code)
  if (e.code == "ArrowUp") {
    let dino = document.querySelector(".dino")
    dino.classList.add("jumpdino")
    setTimeout(() => {
      dino.classList.remove("jumpdino")
    }, 550);

  }
  if (e.code == "ArrowRight") {
    let dino = document.querySelector(".dino")
    let dinoleft = parseInt(getComputedStyle(dino, null).getPropertyValue('left'))
    dino.style.left = dinoleft + 100 + "px"
  }
  if (e.code == "ArrowLeft") {
    let dino = document.querySelector(".dino")
    let dinoleft = parseInt(getComputedStyle(dino, null).getPropertyValue('left'))
    dino.style.left = (dinoleft - 100) + "px"
  }

}


setInterval(() => {
  let dino = document.querySelector(".dino")
  let obstacle = document.querySelector(".obstacle")
  let gameover = document.querySelector(".gameover")
  let dx = parseInt(getComputedStyle(dino, null).getPropertyValue('left'))
  let dy = parseInt(getComputedStyle(dino, null).getPropertyValue('bottom'))
  let oy = parseInt(getComputedStyle(obstacle, null).getPropertyValue('bottom'))
  let ox = parseInt(getComputedStyle(obstacle, null).getPropertyValue('left'))
  let offx = Math.abs(ox - dx)
  let offy = Math.abs(dy - oy)
  console.log(offx)

  if (offx < 50 && offy < 10) {
    let obstacle = document.querySelector(".obstacle")
    // console.log(offx)
    // console.log(offy)
    // console.log(`offx ${offx}`)
    // console.log(dx)
    // console.log(ox)
    // console.log("ha")
    // console.log(dy)
    // console.log(oy)
    gameover.innerHTML = `Game is over ha ha ha`
    obstacle.classList.remove("obstaclemove")

  }
  else if (offx < 145 && scorrrr==true) {
    score += 1;
   document.querySelector(".score").innerHTML=`your score is ${score}`
    scorrrr = false;
    setTimeout(() => {
        scorrrr = true;
    }, 1000);
    

}



}, 100);