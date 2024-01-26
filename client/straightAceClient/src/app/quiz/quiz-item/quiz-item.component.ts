import { Component, EventEmitter, Input, NgModule, OnInit, Output, SimpleChanges } from '@angular/core';
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

  @Output() questionComplete = new EventEmitter<boolean>();  
  
  answer : any = "";

  constructor() { }

  ngOnInit() {
    console.log("init");
    
    console.log(this.question);
    
  }

  ngOnChanges(changes: SimpleChanges) {
    // Handle data changes here
    if (changes['question']) {
      console.log("question has changes");
      
      console.log(this.question);
      // Do something when data changes
    }
  }

  checkAnswer(){
    console.log(this.question);
    console.log(this.answer);
    if(this.answer == this.question.answer){
      console.log("correct");
      this.questionComplete.emit(true);
      //alert("Yaay")
    } else {
      console.log("wrong");
      //alert("Moye Moye")
      this.questionComplete.emit(false);
    }
    
  }

}
