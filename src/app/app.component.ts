import { Component, OnInit } from '@angular/core';
import {SpeechRecognitionService} from './speechRecognition-service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[SpeechRecognitionService]
})
export class AppComponent implements OnInit{
  title = 'title app';
  subheader= "sample subheader";
  imgurl='./assets/micpic.gif';
  recordingOn=false;
  speechData;
  queries=[];
  public selectedVal: string;
  constructor(private speechRecognitionService: SpeechRecognitionService){}
  ngOnInit(){
    this.introduce();
  }
  changeMic(){
    this.playAudio();
    console.log('clicked');
    if(!this.recordingOn){
    this.imgurl='./assets/mic-animate.gif';
    } else {
      this.imgurl='./assets/micpic.gif';
    }
    this.recordingOn = !this.recordingOn;
    this.activateSpeechSearchMovie();
  }
  activateSpeechSearchMovie(): void {

    this.speechRecognitionService.record()
        .subscribe(
        //listener
        (value) => {
            this.speechData = value;
            console.log(value);
            this.queries.push(this.speechData);
            this.sayit(this.speechData);
        },
        //errror
        (err) => {
            console.log(err);
            if (err.error == "no-speech") {
                console.log("--restatring service--");
                this.activateSpeechSearchMovie();
            }
        },
        //completion
        () => {
            console.log("--complete--");
            this.activateSpeechSearchMovie();
        });
}
playAudio(){
  let audio = new Audio();
  audio.src = "./assets/click-sound.wav";
  audio.load();
  audio.play();
  }

  sayit(msg:string){
    console.log('msg',msg);
    let utr =  new SpeechSynthesisUtterance(msg);
  (<any>window).speechSynthesis.speak(utr);
  // (<any>window).speechSynthesis.pause();
  }
  public onValChange(val: string) {
    console.log('changes');
    this.selectedVal = val;
  }

  introduce(){
  this.speechRecognitionService.speaker('Hello... Welcome to Quartz App!!');
  this.speechRecognitionService.speaker('The App Which Allowes you to Take Quizes.!!');
  this.speechRecognitionService.speaker('Lets Start..please select the options from given choicess!!!');
  this.speechRecognitionService.speaker('Before the timer expires...');

  }
}
