console.log("lets write javascript")

setInterval(() => {
    let date=new Date()
let hours=date.getHours()
let minutes=date.getMinutes()
let seconds=date.getSeconds()
console.log(hours)
console.log(minutes)
console.log(seconds)
let hoursdeg=hours*30
let hoursrot=hoursdeg+(minutes*0.5)
let minutesrot=minutes*6
let secondsrot=seconds*6
if(hours>12){
    hours=hours-12
}
document.querySelector(".hourshandle").style.transform=`rotate(${hoursrot}deg)`

if(minutes==59){
document.querySelector(".minuteshandle").style.transform='rotate(0deg)'

}
else{

    document.querySelector(".minuteshandle").style.transform=`rotate(${minutesrot}deg)`
}

if(seconds==59){
    document.querySelector(".seconds").style.transform='rotate(0deg)'

}
else{
    document.querySelector(".seconds").style.transform=`rotate(${secondsrot}deg)`
}
}, 1000);

// let date=new Date()
// let hours=date.getHours()
// let minutes=date.getMinutes()
// let seconds=date.getSeconds()
// console.log(hours)
// console.log(minutes)
// console.log(seconds)
// let hoursdeg=hours*30
// let hoursrot=hoursdeg+(minutes*0.5)
// let minutesrot=minutes*6
// if(hours>12){
//     hours=hours-12
// }
// document.querySelector(".hourshandle").style.transform=`rotate(${hoursrot}deg)`

// if(minutes==59){
// document.querySelector(".minuteshandle").style.transform='rotate(0deg)'

// }
// else{

//     document.querySelector(".minuteshandle").style.transform=`rotate(${minutesrot}deg)`
// }

// if(seconds==59){
//     document.querySelector(".seconds").style.transform='rotate(0deg)'

// }
// else{
//     document.querySelector(".seconds").style.transform=`rotate(${minutesrot}deg)`
// }
// let d=document.querySelector(".hourshandle")
// d.style.transform='rotate(30deg)'
// console.log(d.style.transform='rotate(30deg)')