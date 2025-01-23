import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorageService } from 'src/app/_services/storage.service';


@Component({
  selector: 'app-learn',
  templateUrl: './learn.page.html',
  styleUrls: ['./learn.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LearnPage implements OnInit {

  streak : string = ''

  constructor(
    private storageService : StorageService
  ) { }

  ngOnInit() {
    this.streak = this.storageService.getStorage('streak')
  }

}
