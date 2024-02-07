import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UrlTree } from '@angular/router';
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
    private nav :NavController,
    ){}
  onSubmit(){
    console.log(this.user);
    this.authService.authenticateUser(this.user).subscribe(res =>{
      console.log(res);

        localStorage.setItem('accessToken',res.accessToken)
        localStorage.setItem('user',res)
        this.nav.navigateRoot("/quiz")
      

    });
  }

  goTo(page: string | any[] | UrlTree){
    this.nav.navigateRoot(page)
  }

  loginWithGoogle(){
    this.authService.getGoogleOAuthURL()
  }

  
  
}
