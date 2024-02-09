import { Component, EventEmitter, Input, NgModule, OnInit, Output, SimpleChanges, computed, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonButton, IonCol, IonItem, IonRadio, IonRadioGroup, ToastController , IonContent ,IonCard, IonCardContent ,IonSkeletonText } from '@ionic/angular/standalone';
import { PopupService } from 'src/app/_services/toast.service';

@Component({
  selector: 'app-quiz-item',
  templateUrl: './quiz-item.component.html',
  standalone: true,
  styleUrls: ['./quiz-item.component.scss'],
  imports:[IonCol,IonButton,FormsModule,IonRadioGroup,IonItem,IonRadio, IonContent, IonCardContent, IonSkeletonText]
})
export class QuizItemComponent  implements OnInit {

  // @Input() question: any ;

  loading = true

  question : any  = input({})
  questionChanged = computed(() => {
    console.log("question has changes");
      this.loading = false
      console.log(this.question());
      this.answer = ''
  })

  @Output() questionComplete = new EventEmitter<boolean>();  
  
  answer : any = "";

  constructor(
    private toastController : ToastController,
    private popupService : PopupService
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
      this.popupService.presentToast('Correct')
      //alert("Yaay")
    } else {
      console.log("wrong");
      //alert("Moye Moye")
      this.questionComplete.emit(false);
      this.popupService.presentToast('Wrong')
    }
    
  }

}
