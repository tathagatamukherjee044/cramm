import { Component, OnInit } from '@angular/core';
import { QuizItemComponent } from '../quiz-item/quiz-item.component';
import { QuizService } from 'src/app/services/quiz.service';
import { IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  standalone:true,
  imports : [IonContent,QuizItemComponent],
  styleUrls: ['./quiz-page.component.scss'],
})
export class QuizPageComponent  implements OnInit {

  quizList : any = [
    // {
    //   "prompt" : "When did India gain Independence",
    //   "choices" : [
    //     "1947","1943","1946","1957",
    //   ],
    //   "answer" : "1947"

    // },
    // {
    //   "prompt" : "What is the Capital od India",
    //   "choices" : [
    //     "CCU","DEL","MAA","BOM",
    //   ],
    //   "answer" : "DEL"
    // }
  ]

  mistakeList : any = []

  currentQuiz : any = {}
  currentIndex: number = 0;
  evaluated: boolean = false;
  score: Number = 0;

  constructor(
    private quizService : QuizService
  ) { }

  ngOnInit() {
    this.quizService.getQuiz('school','all','seed').subscribe((data) =>{
      console.log(data);
      this.quizList=data
      console.log(this.quizList);
      this.currentIndex = 0
      this.currentQuiz = this.quizList[this.currentIndex]
    })
    
  }

  showQuiz(){
    console.log(this.quizList);
    
  }

  onQuestionComplete(success : boolean){
    console.log(success);
    if (!success) {
      this.mistakeList.push(JSON.parse(JSON.stringify(this.currentQuiz)))
    } else {
    this.currentQuiz['correct'] = true

    }
    if (this.currentIndex == this.quizList.length-1) {
      if (!this.evaluated) {
        this.score = this.evaluateResults(this.quizList)
        this.evaluated = true
      }

      if(this.mistakeList.length>0){
        this.quizList = this.mistakeList;
        this.mistakeList=[]
        this.currentIndex=0
        this.currentQuiz = this.quizList[this.currentIndex]
        alert(`lets go over your mistakes again`)

        return
      }
      this.quizComplete()
      alert(`all question scomplete ${this.score}`)
      return
    }
    this.currentIndex++
    this.currentQuiz = this.quizList[this.currentIndex]
    console.log("current quiz");
    console.log(this.currentQuiz);
    
    
  }

  quizComplete() {
    this.quizService.quizComplete().subscribe((data) =>{
      console.log(data);
      
    })
  }

  evaluateResults( quizList : any[] = []){
    var score = 0
    quizList.forEach(quiz => {
      if(quiz.correct){
        score++
      }
    });
    console.log(score);
    
    return (score/quizList.length) * 100
  }

}
