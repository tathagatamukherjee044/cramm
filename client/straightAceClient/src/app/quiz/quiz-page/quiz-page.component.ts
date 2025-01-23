import { Component, OnInit } from '@angular/core';
import { QuizItemComponent } from '../quiz-item/quiz-item.component';
import { QuizService } from 'src/app/_services/quiz.service';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/_services/modal.service';
import { NavigationService } from 'src/app/_services/navigation.service';
import { AlertService } from 'src/app/_services/alert.service';

@Component({
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  standalone:true,
  imports : [QuizItemComponent],
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
  loading = true;

  constructor(
    private quizService : QuizService,
    private router : Router,
    private modalService : ModalService,
    private navigationService : NavigationService,
    private alertService : AlertService
  ) { }

  ngOnInit() {
    this.quizService.getQuiz('test','all','seed').subscribe((data) =>{
      console.log(data);
      this.quizList=data
      console.log(this.quizList);
      this.currentIndex = 0
      this.currentQuiz = this.quizList[this.currentIndex]
      this.loading = false
    })
    
  }

  showQuiz(){
    console.log(this.quizList);
    
  }

  goBack() {
    this.router.navigate(["/learn"])
  }

  async onQuestionComplete(success : boolean){
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
        console.log(`lets go over your mistakes again`)

        return
      }
      this.quizComplete()

      // console.log(`all question scomplete ${this.score}`)
      // this.dialogService.showInfoDialog().afterClosed().subscribe( data =>{
      //   console.log("hello World");

      // })
      this.showQuizCompleteModal() 
      
      return
    }
    this.currentIndex++
    this.currentQuiz = this.quizList[this.currentIndex]
    console.log("current quiz");
    console.log(this.currentQuiz);
    
    
  }

  async showQuizCompleteModal() {
    this.modalService.showResultsModal()
    
  }

  quizComplete() {
    this.quizService.quizComplete().subscribe((data) =>{
      console.log(data);
      this.router.navigate(["/"])
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

  showLoginAlert() {
    this.alertService.presentLoginAlert()
  }

}
