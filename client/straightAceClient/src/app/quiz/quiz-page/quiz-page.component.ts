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
        "1947","1947","1947","1947",
      ]

    },
    {
      "prompt" : "When did India gain Independence",
      "choices" : [
        "1947","1947","1947","1947",
      ]

    }
  ]

  constructor() { }

  ngOnInit() {}

}
