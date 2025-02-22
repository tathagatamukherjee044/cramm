import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, UrlTree } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone:true,
  styleUrls: ['./login.component.css'],
  imports: [FormsModule]
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

  goTo(page: string){
    console.log(page);
    
    this.router.navigate([page])
  }

  loginWithGoogle(){
    this.authService.getGoogleOAuthURL()
  }

  
  
}
