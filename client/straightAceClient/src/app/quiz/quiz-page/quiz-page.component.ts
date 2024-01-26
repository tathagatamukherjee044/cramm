import { Component, OnInit } from '@angular/core';
import { QuizItemComponent } from '../quiz-item/quiz-item.component';

@Component({
  imports:[QuizItemComponent],
  selector: 'app-quiz-page',
  templateUrl: './quiz-page.component.html',
  standalone:true,
  styleUrls: ['./quiz-page.component.scss'],
})
export class QuizPageComponent  implements OnInit {

  quizList : any = [
    {
      "prompt" : "When did India gain Independence",
      "choices" : [
        "1947","1943","1946","1957",
      ],
      answer : "1947"

    },
    {
      "prompt" : "What is the Capital od India",
      "choices" : [
        "CCU","DEL","MAA","BOM",
      ],
      answer : "DEL"
    }
  ]

  currentQuiz = {}
  currentIndex: number = 0;
  quizLength: number = 0;

  constructor() { }

  ngOnInit() {
    this.currentIndex = 0
    this.quizLength = this.quizList.length
    this.currentQuiz = this.quizList[this.currentIndex]
  }

  showQuiz(){
    console.log(this.quizList);
    
  }

  onQuestionComplete(success : boolean){
    console.log(success);
    if (!success) {
      this.quizList.push(JSON.parse(JSON.stringify(this.currentQuiz)))
      this.quizLength++
    }
    if (this.currentIndex == this.quizLength-1) {
      alert("all question scomplete")
      return
    }
    this.currentIndex++
    this.currentQuiz = this.quizList[this.currentIndex]
  }

}
