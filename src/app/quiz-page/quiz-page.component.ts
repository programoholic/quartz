  import {
    Component,
    OnInit
  } from '@angular/core';
  import {
    timer
  } from 'rxjs/observable/timer'
  import {
    take,
    map
  } from 'rxjs/operators';
  import {
    HomePageService
  } from '../home-page/home-page.service';
  import {
    SpeechRecognitionService
  } from '../speechRecognition-service';
  import {
    MatDialog,
    MatDialogRef,
    MAT_DIALOG_DATA
  } from '@angular/material';
  import {
    DialogOverviewExampleDialog
  } from './quiz-confirmation.component';

export class Question {
  category: "";
  correct_answer: "Horse-Riding";
  difficulty: "easy";
  incorrect_answers: ["Horse-Riding", "Cycling", "Swimming", "Running"];
  question: "Which of the following sports is not part of the triathlon?";
  type: "multiple"
}
@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  styleUrls: ['./quiz-page.component.scss'],
})
export class QuizPageComponent implements OnInit {
  public currentQuestionNo = 0;
  public countDown;
  protected count = 60;
  protected questions: Array < any > ;
  public currentQuestion: Question;
  public imgurl = './assets/micpic.gif';
  protected speechData;
  protected startFlag = false;
  protected recordingOn = false;
  protected userAnswer: string;
  protected successAudio = '../assets/success.aac';
  protected wrongAudio = '../assets/fail.aac';
  constructor(
    private _homeService: HomePageService,
    private _speechService: SpeechRecognitionService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.questions = this._homeService.getQuizData();
    this.fireQuestion();
  }
  /***************************
   * 
   * this method fires the question
   * 
   * 
   ***********/
  fireQuestion() {
    let start = true;
    this.currentQuestion = this.questions[this.currentQuestionNo];
    this.currentQuestion = this.constructQuestion(this.currentQuestion);
    this.readQuestion(this.currentQuestion);
    this.startCountDown();
  }
  constructQuestion(questionObject) {
    let limit = 3;
    let pos = Math.floor(Math.random() * (limit + 1));
    console.log('position to be insterted', pos);
    questionObject.incorrect_answers.splice(pos, 0, questionObject.correct_answer);
    console.log('going to send', questionObject);
    return questionObject;
  }

  readQuestion(questionObj) {
    let options = '';
    questionObj.incorrect_answers.forEach((element, i) => {
      options += (`option ${i+1}, : !!!!! ${element} !!!!!,`);
    });
    let question = new SpeechSynthesisUtterance(questionObj.question.trim() + ',' + options);
    question.rate = 0.7;
    ( < any > window).speechSynthesis.speak(question);
    question.onend = () => {
      console.log('finished speaking');
      this.startFlag = true;
    }
  }
  startCountDown() {
    this.countDown = timer(0, 1000).pipe(
      take(this.count),
      map(() => --this.count)
    );
  }
  //  startResponse(){
  //  this.imgurl='./assets/mic-animate.gif';
  //  this.activateSpeechSearchMovie();
  //  }

  proceedAfter() {

  }

  speakThings(msg) {
    this._speechService.speaker(msg);
  }
  moveToNextQuestion() {
    console.log('hi');
    this.currentQuestionNo++;
    this.imgurl = './assets/micpic.gif';
    this._speechService.DestroySpeechObject();
    this.count = 60;
    this.fireQuestion();
  }
  activateSpeechSearchMovie(): void {
    this._speechService.record()
      .subscribe(
        //listener
        (value) => {
          this.speechData = value;
          console.log(value);

        },
        //errror
        (err) => {
          console.log(err);
          if (err.error == "no-speech") {
            console.log("--restatring service--");
            // this.activateSpeechSearchMovie();
          }
        },
        //completion
        () => {
          console.log("--complete--");
          // this.activateSpeechSearchMovie();
          this.analyzeResponse(this.speechData);
          this._speechService.DestroySpeechObject();
        });
  }

  analyzeResponse(words) {
    this._speechService.speaker('You Said...!');
    this._speechService.speaker(words);
    this.changeMic();
    // this._speechService.DestroySpeechObject();
    this.guessTheResponse(words);

  }
  changeMic() {
    console.log('clicked');
    if (!this.recordingOn) {
      this.imgurl = './assets/mic-animate.gif';
      this.activateSpeechSearchMovie();
    } else {
      this.imgurl = './assets/micpic.gif';
      this._speechService.DestroySpeechObject();
    }
    this.recordingOn = !this.recordingOn;
    // this.activateSpeechSearchMovie();
  }

  guessTheResponse(answerText) {
    let val = answerText;
    let index;
    let options = ["OK", "YES", "CORRECT", "RIGHT"];
    if (answerText.toUpperCase().includes('OPTION')) {
      index = this.getIndexFromNumber(val);
      if (index != -1) {
        let answer = this.currentQuestion["incorrect_answers"][index];
        this.showConfirmDialoge(answer);
      } else {
        this._speechService.speaker('oh.!!.. Oh!!... Please provide a valid response');
      }
    }
  }

  presentInArray(array, element) {
    return array.forEach((item) => {
      if (item.toUpperCase().includes('')) {
        return true;
      }
    });
  }

  getIndexFromNumber(stringVal) {
    let choices = ["one", "two", "three", "four", "1", "2", "3", "4"];
    for (let i = 0; i < choices.length; i++) {
      if (stringVal.toLowerCase().includes(choices[i]))
        if (i > 3)
          return i - 4;
        else
          return i;
    }
  }
  showConfirmDialoge(correctChoice) {
    this.userAnswer = correctChoice;
    this._speechService.DestroySpeechObject();
    //this.changeMic();
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {
        ans: correctChoice
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if (result.response === "yes") {
        this.submitAnswer();
      } else {
        this.changeMic();
      }
    });
  }
  submitAnswer() {
    if (this.userAnswer.toUpperCase() === this.currentQuestion["correct_answer"].toUpperCase()) {
      let index = this.currentQuestion['incorrect_answers'].indexOf(this.currentQuestion["correct_answer"]);
      document.getElementById(index.toString()).style.backgroundColor = "green";
      this.playAudio(this.successAudio);
    } else {
      let index = this.currentQuestion['incorrect_answers'].indexOf(this.currentQuestion["correct_answer"]);
      document.getElementById(index.toString()).style.backgroundColor = "red";
      this.playAudio(this.wrongAudio);
    }
  }
  playAudio(type) {
    let audio = new Audio();
    audio.src = type;
    audio.load();
    audio.play();
  }
  validateAnswer(choice){
    this.userAnswer = this.currentQuestion.incorrect_answers[choice];
    this.submitAnswer();
  }
}
