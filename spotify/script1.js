let currentsong=new Audio()
let foldertoopen
let n=document.querySelector(".cardcontainer")
// n.innerHTML=""
let song=[]
async function getsongs(foldertoopn="cs"){
    foldertoopen=foldertoopn
    let a =await fetch(`http://127.0.0.1:3000/songs/${foldertoopen}/`)
    let response=await a.text()
    let div=document.createElement('div')
    div.innerHTML=response
    let as =div.getElementsByTagName("a")
     song=[]
   for(index=1;index<as.length;index++){
        if(as[index].href.endsWith("mp3")){
            song.push(as[index])
            // songs=songs.split("songs")[0]
        }

    }
    await song
   await upload(song)
    await addingeventlistener()
    return song
}

async function upload(song){
    let songlist=document.querySelector(".songlist").getElementsByTagName("ul")[0]
     songlist.innerHTML=""
   for (let index = 0; index < song.length; index++) {
    const element = song[index];
    songname=song[index].href.split(`${foldertoopen}/`)[1]
        songname.replaceAll("%20","")
        // songname.replaceAll("%2O","")
    songlist.innerHTML=songlist.innerHTML+`  <li>
    <img class="invert"  src="music.svg " alt="">
    <div class="sonngname">
    ${songname}
    </div>
    <div class="end">
        <h3>play now</h3>
        <img class="invert" id="please"  src="plbut.svg" alt="">
        
    </div>
</li>`
   }
    
}

async function playmusic(track){
    currentsong.src=`/songs/${foldertoopen}/`+track
    currentsong.play()
    play.src="pause.svg"
    document.querySelector(".songname").innerHTML=track
    document.querySelector(".songtime").innerHTML="00:00/00:00"

}

function convertSecondsToMinutesAndSeconds(seconds) {
    var minutes = Math.floor(seconds / 60);
    var remainingSeconds = Math.floor(seconds % 60);
    
    // Format the result with leading zeros
    var formattedTime = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    
    return formattedTime;
}

async function addingeventlistener(){
    let div=document.querySelector(".songlist").getElementsByTagName("ul")[0].getElementsByTagName("li")
    for (let index = 0; index < div.length; index++) {
        const element = div[index];
        let sngname=element.querySelector(".sonngname").innerHTML
        div[index].addEventListener("click",()=>{
            playmusic(sngname.trim())

        })
    }

}
async function getinfo(name) {
    let respons=await fetch(`http://127.0.0.1:3000/songs/${name}/info.json`)
    let lrespons=await respons.json()
    return lrespons
}
async function getting(name) {
    let n=document.querySelector(".cardcontainer")
    let folderinfo=await getinfo(name)
        n.innerHTML=n.innerHTML+ `<div class="card flex   ">
            <div class="play-button">
                <div class="play-icon"></div>
            </div>
            <img src="https://i.scdn.co/image/ab67706f0000000281722192322800ae99c2ed06" alt="">
            <div class="headc">
                <h3 class ="headingof">${folderinfo.name}</h3>
                <p class ="paraof">${folderinfo.discription}</p>
            </div>
        </div>`
   
}

async function folderr(){
    let folder=await fetch("http://127.0.0.1:3000/songs/")
    let foldername=await folder.text()
    let div=document.createElement("div")
    div.innerHTML=foldername
    let a=div.getElementsByTagName("a")
    let ffoler=[]
    for (let index = 0; index < a.length; index++) {
        if(a[index].href.includes("/songs")==true){
            ffoler.push(a[index])
        }
        
    }

for (let index = 0; index < ffoler.length; index++) {
    const element = ffoler[index];
    let folderinsongs=(element.href.split("songs/")[1].split("/")[0])
    await getting(folderinsongs)
    
}      
}

async function main(){
    await folderr()
     song= await getsongs()
//  seting defaulsong and the card
    currentsong.src=song[0]
    deafultsongname=song[0].href.split(`${foldertoopen}/`)[1]
    document.querySelector(".songname").innerHTML=deafultsongname
    document.querySelector(".songtime").innerHTML="00:00/00:00"

//    adding event listner to the play button
   play.addEventListener("click",()=>{
    if(currentsong.paused){
       currentsong.play()
       play.src="pause.svg"
    }
    else{
        currentsong.pause()
        play.src="plbut.svg"
     please.src="pause.svg"
    }

   })


    // adiing time and the nameto the seekbar
    currentsong.addEventListener("timeupdate",()=>{
    let current= convertSecondsToMinutesAndSeconds(currentsong.currentTime)
    let duration=convertSecondsToMinutesAndSeconds(currentsong.duration)
    document.querySelector(".songtime").innerHTML=`${current}/${duration}`
    document.querySelector(".circle").style.left=(currentsong.currentTime/currentsong.duration)*100 + "%"

    })

  // moving circle with respect to click
    document.querySelector(".seekbar").addEventListener("click",(e)=>{
        let percent=(e.offsetX/e.target.getBoundingClientRect().width)*100
        document.querySelector(".circle").style.left=percent+"%"
        if(currentsong.currentTime==currentsong.duration){
            currentsong.play()
        }
        currentsong.currentTime=(currentsong.duration*percent)/100
    })

    // /adding event listene to change the volume
    document.querySelector(".range").addEventListener("change",(e)=>{
        console.log(e.target.value)
        currentsong.volume=parseInt(e.target.value)/100
    })

    volum.addEventListener("click",()=>{
        if(currentsong.volume>0){
            currentsong.volume=0
            volum.src="volmute.svg"
        }
        else{
            currentsong.volume=0.5
            volum.src="vol.svg"
        }
    })

//    gettiing the array of the cards
    let d=document.querySelectorAll(".card")

// adding event listener to the cards
    for (let index = 0; index < d.length; index++) {
        const element = d[index];
        element.addEventListener("click",()=>{
                song= getsongs(element.querySelector(".headc").querySelector(".headingof").innerHTML)
            })
        
    }

// adding event listener to the previous button
    previous.addEventListener("click",()=>{
        for (let index = 0; index < song.length; index++) {
            if((currentsong.src.split("/songs/")[1])==(song[index].href.split("songs/")[1])){
               playmusic(song[index-1].href.split(`songs/${foldertoopen}/`)[1])
                break
            }
            
        }
    })

// adding event listener to the next
    next.addEventListener("click",()=>{
        for (let index = 0; index < song.length; index++) {
            if((currentsong.src.split("/songs/")[1])==(song[index].href.split("songs/")[1])){
                playmusic(song[index+1].href.split(`songs/${foldertoopen}/`)[1])
                break
            }
            
        }
    })

   document.querySelector(".hamburger").addEventListener("click",()=>{
    document.querySelector(".left").style.left=0
   })

   document.querySelector(".close").addEventListener("click",()=>{
    document.querySelector(".left").style.left=-100+"%"

   })
   
    

  
}
    
main()
