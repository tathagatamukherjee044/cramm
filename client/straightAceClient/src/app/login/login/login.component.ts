import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, UrlTree } from '@angular/router';
import {  NavController } from '@ionic/angular';
import { IonButton,IonContent,IonIcon,IonInput,IonItem,IonList } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone:true,
  styleUrls: ['./login.component.css'],
  imports: [FormsModule,IonButton,IonList, IonItem, IonContent, IonInput, IonIcon]
})
export class LoginComponent {

  user  : any={};

  constructor(
    private authService : AuthService,
    private router : Router
    ){}
  onSubmit(){
    console.log(this.user);
    this.authService.authenticateUser(this.user).subscribe(res =>{
      console.log(res);

        localStorage.setItem('accessToken',res.accessToken)
        localStorage.setItem('user',res)
        this.router.navigate(["/quiz"])
      

    });
  }

  goTo(page: string | any[] | UrlTree){
    this.router.navigate([page])
  }

  loginWithGoogle(){
    this.authService.getGoogleOAuthURL()
  }

  
  
}
