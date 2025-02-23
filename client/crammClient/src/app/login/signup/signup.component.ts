import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, UrlTree } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css'],
    imports: [FormsModule,]
})
export class SignupComponent {

  constructor(private authService : AuthService,
    private router : Router
    ){}


  newUser : any={}; 
  onSubmit(){
    console.log(this.newUser);
    console.log(this.newUser);
    this.authService.createUser(this.newUser).subscribe(res =>{
      console.log(res);
      // if(res.success == true){
      //   this.newUser.navigateRoot("/quiz")
      // }
      // console.log("wrong password")

    });
    
  }

  goTo(page: string){
    this.router.navigate([page])
  }

  loginWithGoogle(){
    this.authService.getGoogleOAuthURL()
  }

}
