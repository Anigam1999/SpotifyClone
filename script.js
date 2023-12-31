console.log("Welcome to MyMusic");

let masterPlay = document.getElementById("masterPlay")
let myProgressBar = document.getElementById("myProgressBar")
let gif = document.getElementById("gif")
let songItems = Array.from(document.getElementsByClassName("songItem"))
let songs = [
    {songName: "Money Heist", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Tum hi aana", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "Pirates of Carribean", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Tera Ban Jaunga", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Krishna Flute", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "KGF Instrumental", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Hue Bechain", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Mohabbat se nhi waqif", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Hum tumko sanam o sanam", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Tu hai toh phir aur kya chahiye", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"}
] 
let songIndex = 0;
let audioElement = new Audio(`songs/${songIndex+1}.mp3`);
let currentPlayingTag = document.getElementById('currentPlayingTag') 
currentPlayingTag.innerHTML  = songs[songIndex].songName

// adding duration of each song 
songItems.forEach((element, i)=>{
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerHTML = songs[i].songName;
    let ele = new Audio(`songs/${i+1}.mp3`)
    ele.addEventListener('loadedmetadata', ()=>{
        let dur = Math.floor(ele.duration)
        let min = Math.floor(dur/60)
        let sec = dur%60
        element.getElementsByClassName('timestamp')[0].innerHTML = `${min}:${sec}` + element.getElementsByClassName('timestamp')[0].innerHTML;
    })
})

// listen to masterplayer
masterPlay.addEventListener('click', ()=>{
    fun()
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        ele = Array.from(document.getElementsByClassName("songItemPlay"))[songIndex]
        ele.classList.remove('fa-circle-play')
        ele.classList.add('fa-circle-pause')
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }else{
        audioElement.pause();
        makeAllPlays();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})

// updating the progress bar
audioElement.addEventListener('timeupdate', ()=>{
    let progress = parseInt((audioElement.currentTime/audioElement.duration)*100); 
    myProgressBar.value = progress;
})

// function to check the song completion
const checkCompletion = () => {
    if (myProgressBar.value == myProgressBar.max) {
        ele = Array.from(document.getElementsByClassName("songItemPlay"))[songIndex]
        ele.classList.remove('fa-circle-pause')
        ele.classList.add('fa-circle-play')
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
        clearInterval(id);
    }
};

// function for detecting song completion
const fun = () => { 
    var id = setInterval(checkCompletion, 1000);
}

// updating the song as per progress bar status 
myProgressBar.addEventListener('input', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

// function to make all songs playable
const makeAllPlays = ()=> {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        element.classList.add('fa-circle-play')
        element.classList.remove('fa-circle-pause')
    })    
}

// listening to container song list
Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        newIndex = parseInt(e.target.id)
        if(newIndex == songIndex && !audioElement.paused){
            audioElement.pause()
            e.target.classList.add('fa-circle-play')
            e.target.classList.remove('fa-circle-pause')
            masterPlay.classList.add('fa-circle-play');
            masterPlay.classList.remove('fa-circle-pause');
            gif.style.opacity = 0;
        }else if(newIndex == songIndex && audioElement.paused){
            audioElement.play()
            e.target.classList.remove('fa-circle-play')
            e.target.classList.add('fa-circle-pause')
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            gif.style.opacity = 1;
        }else{
            makeAllPlays();
            songIndex = newIndex
            fun()
            audioElement.src = `songs/${songIndex+1}.mp3`
            currentPlayingTag.innerHTML  = songs[songIndex].songName
            audioElement.currentTime = 0
            audioElement.play()
            e.target.classList.remove('fa-circle-play')
            e.target.classList.add('fa-circle-pause')
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add('fa-circle-pause');
            gif.style.opacity = 1;
        }
    })
})

// listening to next master icon
document.getElementById('next').addEventListener('click', ()=>{   
    ele = Array.from(document.getElementsByClassName("songItemPlay"))[songIndex]
    ele.classList.remove('fa-circle-pause')
    ele.classList.add('fa-circle-play') 
    if(songIndex >= 9){
        songIndex = 0
    } else {
        songIndex += 1
    }
    ele = Array.from(document.getElementsByClassName("songItemPlay"))[songIndex]
    ele.classList.remove('fa-circle-play')
    ele.classList.add('fa-circle-pause')
    currentPlayingTag.innerHTML  = songs[songIndex].songName
    audioElement.src = `songs/${songIndex+1}.mp3`
    audioElement.currentTime = 0
    audioElement.play()
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

// listening to previous master icon
document.getElementById('previous').addEventListener('click', ()=>{   
    ele = Array.from(document.getElementsByClassName("songItemPlay"))[songIndex]
    ele.classList.remove('fa-circle-pause')
    ele.classList.add('fa-circle-play')
    if(songIndex <= 0){
        songIndex = 9
    } else {
        songIndex -= 1
    }
    ele = Array.from(document.getElementsByClassName("songItemPlay"))[songIndex]
    ele.classList.remove('fa-circle-play')
    ele.classList.add('fa-circle-pause')
    currentPlayingTag.innerHTML  = songs[songIndex].songName
    audioElement.src = `songs/${songIndex+1}.mp3`
    audioElement.currentTime = 0
    audioElement.play()
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})