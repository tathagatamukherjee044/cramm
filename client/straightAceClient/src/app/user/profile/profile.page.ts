import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorageService } from 'src/app/_services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ProfilePage implements OnInit {
  streak: any;

  constructor(
    private storageService : StorageService
  ) { }

  userDetail : any = {}

  ngOnInit() {
    this.userDetail = this.storageService.getStorage('user')
    this.streak = this.storageService.getStorage('streak')
    console.log(this.userDetail);
    
  }

}
