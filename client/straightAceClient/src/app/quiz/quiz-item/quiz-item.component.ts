import { Component, EventEmitter, Input, NgModule, OnInit, Output, SimpleChanges, computed, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButton, IonCol, IonItem, IonRadio, IonRadioGroup, ToastController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-quiz-item',
  templateUrl: './quiz-item.component.html',
  standalone:true,
  styleUrls: ['./quiz-item.component.scss'],
  imports:[IonCol,IonButton,FormsModule,IonRadioGroup,IonItem,IonRadio]
})
export class QuizItemComponent  implements OnInit {

  // @Input() question: any ;

  question : any  = input({})
  questionChanged = computed(() => {
    console.log("question has changes");
      
      console.log(this.question());
      this.answer = ''
  })

  @Output() questionComplete = new EventEmitter<boolean>();  
  
  answer : any = "";

  constructor(
    private toastController : ToastController
  ) { }

  ngOnInit() {
    console.log("init");
    
    console.log(this.question());
    
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   // Handle data changes here
  //   if (changes['question']) {
  //     console.log("question has changes");
      
  //     console.log(this.question);
  //     this.answer = ''
  //     // Do something when data changes
  //   }
  // }

  checkAnswer(){
    console.log(this.question());
    console.log(this.answer);
    if(this.answer == this.question().answer){
      console.log("correct");
      this.questionComplete.emit(true);
      this.presentToast('bottom','Correct')
      //alert("Yaay")
    } else {
      console.log("wrong");
      //alert("Moye Moye")
      this.questionComplete.emit(false);
      this.presentToast('bottom','Wrong')
    }
    
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', message = '') {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      position: position,
    });

    await toast.present();
  }

}
