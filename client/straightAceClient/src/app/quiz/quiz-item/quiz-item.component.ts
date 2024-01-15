import { Component, Input, OnInit } from '@angular/core';
import { IonCol } from '@ionic/angular/standalone';

@Component({
  selector: 'app-quiz-item',
  templateUrl: './quiz-item.component.html',
  standalone:true,
  styleUrls: ['./quiz-item.component.scss'],
  imports:[IonCol]
})
export class QuizItemComponent  implements OnInit {

  @Input() question: any ;

  constructor() { }

  ngOnInit() {}

}
