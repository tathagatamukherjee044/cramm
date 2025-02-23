import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorageService } from 'src/app/_services/storage.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
    imports: [CommonModule, FormsModule]
})
export class ProfilePage implements OnInit {
  streak: any;

  constructor(
    private storageService : StorageService,
    private userService : UserService
  ) { }

  userDetail : any = {}

  ngOnInit() {
    this.userDetail = this.userService.userValue
    console.log(this.userDetail);
    
    this.streak = this.storageService.getStorage('streak')
    console.log(this.userDetail);
    
  }

}
