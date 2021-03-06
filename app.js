class DrumKit { 
    constructor(){
        this.playBtn = document.querySelector(".play");
        this.currentKick = "./allSounds/kick-classic.wav";
        this.currentSnare = "./allSounds/snare-acoustic01.wav";
        this.currentHihat = "./allSounds/hihat-acoustic01.wav";
        this.pads = document.querySelectorAll(".pad");
        this.kickAudio = document.querySelector(".kick-sound");
        this.snareAudio = document.querySelector(".snare-sound");
        this.hihatAudoi = document.querySelector(".hihat-sound");
        this.index = 0;
        this.bpm = 150;
        this.isPlaying = null;
        this.selects = document.querySelectorAll("select");
        this.muteBtn = document.querySelectorAll(".mute");
        this.tempoSlider = document.querySelector(".tempo-slider");
    }
    activePad(){
        this.classList.toggle("active");
    }
    repeat(){
        let step = this.index % 10; 
        const activeBars = document.querySelectorAll(`.b${step}`);
        activeBars.forEach(bar => {
            bar.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
            if(bar.classList.contains("active")){
                if(bar.classList.contains("kick-pad")){
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }
                if(bar.classList.contains("snare-pad")){
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                if(bar.classList.contains("hihat-pad")){
                    this.hihatAudoi.currentTime = 0;
                    this.hihatAudoi.play();
                }
            }
        });
        this.index++;
    }
    start(){
        const interval = (60/this.bpm)*1000;
        if(!this.isPlaying){
            this.playBtn.innerText = "Stop";
            this.isPlaying = setInterval(()=> {
                this.repeat();
            },interval);
        }else{
            this.playBtn.innerText = "Play";
            clearInterval(this.isPlaying);
            this.isPlaying = null;
        }
    }

    changeSound(e){
        const selectionName = e.target.name;
        const selctionValue = e.target.value;
        switch(selectionName){
            case "kick-select":
                this.kickAudio.src = selctionValue;
                break;
            case "snare-select":
                this.snareAudio.src = selctionValue;
                break;
            case "hihat-select":
                this.hihatAudoi.src = selctionValue;
                break;
        }
    }

    mute(e){
       const muteIndex = e.target.getAttribute("data-track");
       e.target.classList.toggle("active");
       if(e.target.classList.contains("active")){
           switch(muteIndex){
               case "0":
                   this.kickAudio.volume=0;
                   break;
                case "1":
                    this.snareAudio.volume=0;
                    break;
                case "2":
                    this.hihatAudoi.volume=0;
                    break;
           }
       } else {
        switch(muteIndex){
            case "0":
                this.kickAudio.volume=1;
                break;
             case "1":
                 this.snareAudio.volume=1;
                 break;
             case "2":
                 this.hihatAudoi.volume=1;
                 break;
        }
       }
    }

    chnageTempo(e){
        const tempoText = document.querySelector(".tempo-number");
        tempoText.innerText = e.target.value;
    }

    updateTempo(e){
        this.bpm = e.target.value;
        clearInterval(this.isPlaying);
        this.isPlaying = null;
        this.playBtn.innerText = "Play";
        const playBtn = document.querySelector(".play");
        if(playBtn.classList.contains("active")){
            this.start();
        }
    }
}

const drumKit = new DrumKit();

drumKit.pads.forEach(pad => {
    pad.addEventListener("click",drumKit.activePad);
    pad.addEventListener("animationend",function(){
        this.style.animation = "";
    });
});

drumKit.playBtn.addEventListener("click",() => {
    drumKit.start();
});

drumKit.selects.forEach(select => {
    select.addEventListener("change",function(e){
        drumKit.changeSound(e);
    });
});

drumKit.muteBtn.forEach(btn => {
    btn.addEventListener("click",function(e){
        drumKit.mute(e);
    });
});

drumKit.tempoSlider.addEventListener("input",function(e){
    drumKit.chnageTempo(e);
});

drumKit.tempoSlider.addEventListener("change",function(e){
    drumKit.updateTempo(e);
});