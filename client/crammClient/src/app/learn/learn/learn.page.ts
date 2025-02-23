import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorageService } from 'src/app/_services/storage.service';
import { Router } from '@angular/router';


@Component({
    selector: 'app-learn',
    templateUrl: './learn.page.html',
    styleUrls: ['./learn.page.scss'],
    imports: [CommonModule, FormsModule]
})
export class LearnPage implements OnInit {

  streak : string = ''
  subject : string = ''

  constructor(
    private storageService : StorageService,
    private router : Router
  ) { }

  ngOnInit() {
    this.streak = this.storageService.getStorage('streak')
    this.subject = this.storageService.getStorage('subject')

  }

  onSubjectChanged($event : Event){
    console.log($event);
    this.storageService.setStorage('subject', this.subject)
  }

  onStart(){
    this.router.navigate(['/quiz'])
  }


}
