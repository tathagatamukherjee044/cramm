import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { config } from '../_store/config';
import { getLocaleFirstDayOfWeek } from '@angular/common';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http : HttpClient,
    private storageService : StorageService
    ) { }

  authenticateUser(userModel: any): Observable<any> {
    return this.http.post('http://localhost:8080/auth/login',userModel).pipe(map(res =>{
      return res;
    }))
  }
  createUser(userModel: any) {
    return this.http.post('http://localhost:8080/auth/signup',userModel).pipe(res =>{
      return res;
    })
  }

  getToken(){
    return this.storageService.getStorage('token')
  }

  setUser(userData : any){
    this.storageService.setStorage('token',userData.token)
    this.storageService.setStorage('user',userData.user)
  }

  getGoogleOAuthURL() {
    const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  
    const options = {
      redirect_uri: config.googleOauthRedirectUrl as string,
      client_id: config.googleClientId as string,
      access_type: "offline",
      response_type: "code",
      prompt: "consent",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ].join(" "),
    };
  
    
    const qs = new URLSearchParams(options);

    console.log(`${rootUrl}?${qs.toString()}`);
    
    window.location.href = `${rootUrl}?${qs.toString()}`
    // return `${rootUrl}?${qs.toString()}`;
    
  }
}
