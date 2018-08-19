import { Component, OnInit } from '@angular/core';
import {SpeechRecognitionService} from '../speechRecognition-service';
import { Router } from '@angular/router';
import { HomePageService} from './home-page.service';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  providers:[SpeechRecognitionService]
})
export class HomePageComponent implements OnInit {
 protected questions;
 protected catogary;
 protected level;
 protected type;
 public loading=false;
  constructor(
    private speechRecognitionService: SpeechRecognitionService,
    private _router: Router,
    private _homePgService: HomePageService
  ){}

  ngOnInit(){
    this.introduce();
  }

  introduce(){
    // this.speechRecognitionService.speaker('Which American president appears on a one dollar bill??!?');
    // this.speechRecognitionService.speaker('option 1!: Oculus!!!!');
    // this.speechRecognitionService.speaker('option 2!: google!!!!');
    // this.speechRecognitionService.speaker('option 3!: HTC!!!!');
    // this.speechRecognitionService.speaker('option 4!: Oppo!!!!');
  
    }
    onValChange(value,type){
      let elem=type;
      switch(elem){
        case 'ques':
                    this.questions=value;
                    break;
        case 'cato':
                    this.catogary=value;
                    break;
        case 'level':
                    this.level= value;
                    break;
        case 'type':
                   this.type= value;
                   break;                                    
      }
      console.log('alue is changed',value);
    } 

    navigate(){
      this.loading=true;
      this._homePgService.getQuizQuestions('amount=10&category=21&difficulty=easy&type=multiple').subscribe((result)=>{
        console.log('result is ',result);
        this._homePgService.setQuizData(result.results);
        debugger
        this._router.navigate(['quiz']);
        this.loading=false;
      });
    }
}
