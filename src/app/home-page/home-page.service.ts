import { Injectable } from '@angular/core';
import { Http,Response} from '@angular/http';
import { catchError, map } from "rxjs/operators";
import { Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class HomePageService {
 
    protected endpoint = 'https://opentdb.com/api.php?';
    protected quizQuestions: Array<Object>;
 constructor(private _http: Http) { }
 
 getQuizQuestions(endPointUrl){
 const url = this.endpoint+endPointUrl;
 return this._http.get(url).map((response: Response)=> response.json());

//  return this._http.get(url).map((result)=>{
//     console.log('result is',result);
//     return result.json();
//  });
 }
 setQuizData(questions){
     console.log('from service',questions);
  this.quizQuestions = questions;
 }
 getQuizData(){
  return this.quizQuestions;
 }
}
