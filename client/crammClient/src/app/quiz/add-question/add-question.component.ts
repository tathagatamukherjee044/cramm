import { Component, OnInit } from '@angular/core';
import { Choice, Question } from '../../_shared/_interface/intreface';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubjectService } from 'src/app/_services/subject.service';
import { QuizService } from 'src/app/_services/quiz.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.css',
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class AddQuestionComponent implements OnInit {

  constructor(
    private subjectService : SubjectService,
    private quizService : QuizService,
  ) { }
  ngOnInit(): void {
    this.getSubjectList();
  }

  questionDetails : Question = {
    prompt: '',
    choices: [],
    answer: 0,
    explanation: ''
  }

  choiceInput : string = ''

  questionCourseDetails : any = {
    questionCourse : '',
    questionSubject :  ''
  }
  courseList : any = []
  subjectList : any = []

  onSubmit() {
    console.log(this.questionDetails);
    console.log(this.questionCourseDetails.questionCourse);
    console.log(this.questionCourseDetails.questionSubject);
    const addQuestionModel = {
      questionDetails : this.questionDetails,
      questionCourseDetails : this.questionCourseDetails 
    }
    this.quizService.addQuiz(this.questionDetails,this.questionCourseDetails.questionSubject).subscribe((data) => {
      console.log(data);
    })

  }

  getSubjectList() {
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

  onCourseChange($event : Event) {
    console.log($event);
    const selectedCourse=this.courseList.filter((course:any) => course.key === this.questionCourseDetails.questionCourse)[0];
    this.subjectList = selectedCourse.subjects;
  }

  onAddChoice() {
    console.log("Choice before push:", this.choiceInput);
    console.log("Type of choice before push:", typeof this.choiceInput);
    const choice : Choice = {
      text: this.choiceInput,
      index: this.questionDetails.choices.length+1,
    }
    this.questionDetails.choices.push(choice);
    console.log(choice);
    
    this.choiceInput = '';
    console.log("Choice after push:", this.choiceInput);
    console.log("Type of choice after push:", typeof this.choiceInput);
    
    
}

}
