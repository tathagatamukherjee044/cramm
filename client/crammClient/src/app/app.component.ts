import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [RouterOutlet],
})
export class AppComponent implements OnInit {
  constructor(
    private auth : AuthService
  ) {
    auth.initUser();
  }

  ngOnInit(): void {
    setTimeout(() => {
      
      this.auth.getData().subscribe()
    }, 1000);
  }
}
