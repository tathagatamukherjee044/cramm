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

  quiz = [
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

  constructor() { }

  ngOnInit() {}

}
