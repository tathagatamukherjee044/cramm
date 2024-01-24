import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { IonButton } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone:true,
  styleUrls: ['./login.component.css'],
  imports: [FormsModule,IonButton]
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
      if(res.success == true){
        localStorage.setItem('token',res.token)
        this.nav.navigateRoot("/create")
      }else {
        alert("wrong password") 
      }
      

    });
  }

  goTo(page: string | any[] | UrlTree){
    this.nav.navigateRoot(page)
  }

  loginWithGoogle(){
    this.authService.getGoogleOAuthURL()
  }

  
  
}
