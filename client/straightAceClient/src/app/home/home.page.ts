import { Component } from '@angular/core';
import { Router, RouterOutlet} from '@angular/router';
// import {IonIcon} from 'ionicons'

import { environment } from 'src/environments/environment';
import { AuthService } from '../_services/auth.service';
import { User } from '../_shared/_interface/intreface';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [RouterOutlet],
})
export class HomePage {

  userData : User = {
    _id: '',
    name: '',
    email: '',
    streak: 0,
  }

  constructor(
    private router : Router,
    private userService : UserService
  ) {
    this.userData = this.userService.userValue
  }

  array = [1,2,3,4,5,7,3,4,4,4455,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4]

  menuItems = [
    {
      link : '/quiz',
      display : 'Quiz',
      icon : "ph-duotone ph-scroll"
    },
    {
      link : '/learn',
      display : 'Home',
      icon : "ph-duotone ph-house-line"
    },
    {
      link : '/profile',
      display : 'Profile',
      icon: "ph-duotone ph-user-circle"
    }
  ]

  ngOnInit() {
    console.log(environment.apiUrl);
    
  }

  show() {
    console.log(environment.apiUrl);
  }

  route(route : string) {
    console.log(route);
    
    this.router.navigate([route])
  }
}
