import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorageService } from 'src/app/_services/storage.service';
import { Router } from '@angular/router';
import { SubjectService } from 'src/app/_services/subject.service';
import { QuestionAcceptanceDialogComponent } from 'src/app/dialog/question-acceptance-dialog/question-acceptance-dialog.component';


@Component({
    selector: 'app-learn',
    templateUrl: './learn.page.html',
    styleUrls: ['./learn.page.scss'],
    imports: [CommonModule, FormsModule]
})
export class LearnPage implements OnInit {

  streak : string = ''
  subject : string = ''
  courseList : any = []

  constructor(
    private storageService : StorageService,
    private router : Router,
    private subjectService : SubjectService
  ) { }

  ngOnInit() {
    this.streak = this.storageService.getStorage('streak')
    this.subject = this.storageService.getStorage('subject')
    this.subjectService.getSubjects().subscribe((couseObject:any) => {
      console.log(couseObject);
      couseObject = this.objectToArray(couseObject.courses);
      console.log(couseObject);
      this.courseList = couseObject;
    })

  }

  objectToArray(obj : any) {
    const result = [];
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        result.push({
          key: key,
          ...obj[key], // Spread the nested object's properties
        });
      }
    }
    return result;
  }

  onSubjectChanged($event : Event){
    console.log($event);
    this.storageService.setStorage('subject', this.subject)
  }

  onStart(){
    this.router.navigate(['/quiz'])
  }

  onAddQuestion(){
    console.log('Add Question');
    
    this.router.navigate(['/quiz/add'])
  }


}
