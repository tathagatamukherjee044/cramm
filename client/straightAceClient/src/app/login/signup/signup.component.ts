import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, UrlTree } from '@angular/router';
import { NavController } from '@ionic/angular';
import { IonButton } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  standalone:true,
  styleUrls: ['./signup.component.css'],
  imports: [FormsModule,IonButton]
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
      // alert("wrong password")

    });
    
  }

  goTo(page: string | any[] | UrlTree){
    this.router.navigate([page])
  }

}
