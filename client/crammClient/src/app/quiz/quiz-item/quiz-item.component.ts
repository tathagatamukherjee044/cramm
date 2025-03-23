import { Component, EventEmitter, Input, NgModule, OnInit, Output, SimpleChanges, computed, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import katex from 'katex';
import { LatexDirective } from 'src/app/_shared/_directive/latex.directive';
import { DialogService } from 'src/app/dialog/dialog.service';

@Component({
    selector: 'app-quiz-item',
    templateUrl: './quiz-item.component.html',
    styleUrls: ['./quiz-item.component.scss'],
    imports: [FormsModule, LatexDirective]
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
    private dialogService : DialogService
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
      this.questionComplete.emit(true);
    } else {
      this.showCorrectAnswerDialog("Wrong Answer","The correct answer is " + this.question().answer)
    }
    this.answer = ''
    
  }

  showCorrectAnswerDialog(header : string ,message : string ){

    this.dialogService.showInfoDialog(header,message).afterClosed().subscribe( data =>{
      this.questionComplete.emit(false);
    })
  }

}
