import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './_services/auth.service';
import { isPlatformBrowser } from '@angular/common';


@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    imports: [RouterOutlet]
})
export class AppComponent implements OnInit {
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private auth : AuthService
  ) {
   
  }

  ngOnInit(): void {
    console.log(this.platformId);
    
    if (isPlatformBrowser(this.platformId)) {
      
      // Code that uses localStorage (will only run in the browser)
      this.auth.initUser();
      setTimeout(() => {
      
        this.auth.getData().subscribe()
      }, 1000);
    } else {
      // Code that runs on the server (optional - server-side logic if needed)
      console.log('Running on the server, localStorage not available.');
      // You might perform server-side initialization here if relevant
    }
  }
   
}
