console.log("tic tactoe java sript")
let turn = "X"
let win = false


function changeturn() {
    if (win == false) {
        if (turn === "X") {
            turn = "O"
        }
        else {
            turn = "X"
        }
        let div = document.querySelector(".turn")
        div.innerHTML = ` Turn for ${turn}`

    }
}

function wincheck() {
    let box = document.querySelectorAll(".box")
    let wincases = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    wincases.forEach(element => {
        if (box[element[0]].innerHTML != "" || box[element[1]].innerHTML != "" || box[element[2]].innerHTML != "") {

            if ((box[element[0]].innerHTML == box[element[1]].innerHTML) && (box[element[1]].innerHTML == box[element[2]].innerHTML) && win == false) {
                console.log("hello")
                win = true
                let div = document.querySelector(".turn")
                div.innerHTML = ` ${turn} has won`
            }
        }

    });

}
function checktie(){
    let box = document.querySelectorAll(".box")
    let boxfull=false
    box.forEach(element => {
        if(element.innerHTML==""){
        console.log("i am inside ch") 
            boxfull=true
        }
    });

    if(boxfull==false && win==false){
        console.log("i am inside c")
        let div = document.querySelector(".turn")
        div.innerHTML = " IT IS A TIE" 
        win=true
    }
}
// adding event listenrer to the boxes
let box = document.querySelectorAll(".box")
box.forEach(element => {

    element.addEventListener("click", () => {
        if (element.innerHTML == "" && win == false) {
            element.innerHTML = turn
            wincheck()
            checktie()
            changeturn()

        }
    })
});

// addin event listener to the resert button
document.querySelector(".reset").addEventListener("click", () => {
    box.forEach(element => {
        element.innerHTML = ""

    });
    turn = "O"
    win = false
    changeturn()

})