import { Component, Input, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButton, IonCol, IonItem, IonRadio, IonRadioGroup } from '@ionic/angular/standalone';

@Component({
  selector: 'app-quiz-item',
  templateUrl: './quiz-item.component.html',
  standalone:true,
  styleUrls: ['./quiz-item.component.scss'],
  imports:[IonCol,IonButton,FormsModule,IonRadioGroup,IonItem,IonRadio]
})
export class QuizItemComponent  implements OnInit {

  @Input() question: any ;
  answer : any = "";

  constructor() { }

  ngOnInit() {}

  checkAnswer(){
    console.log(this.question);
    console.log(this.answer);
    if(this.answer == this.question.answer){
      alert("Yaay")
    } else {
      alert("Moye Moye")
    }
  }

}
