import { HttpClient, HttpHeaders } from '@angular/common/http';
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
    return this.http.post(config.api.LOGIN,userModel).pipe(map(res =>{
    // return this.http.post('http://localhost:8080/auth/login',userModel).pipe(map(res =>{
      return res;
    }))
  }

  getData() {
    
  }

  refreshToken(){
    const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${this.getRefreshToken()}`)
    return this.http.post(config.api.REFRESH, {}, {headers}).subscribe( (data : any) =>{
      const accessToken = data.accessToken
      this.storageService.setStorage('accessToken',accessToken)
    }
    )
  }

  createUser(userModel: any) {
    return this.http.post('http://localhost:8080/auth/signup',userModel).pipe(res =>{
      return res;
    })
  }

  getAccessToken(){
    return this.storageService.getStorage('accessToken')
  }

  getRefreshToken(){
    return this.storageService.getStorage('refreshToken')
  }

  setUser(userData : any){
    this.storageService.setStorage('accessToken',userData.accessToken)
    this.storageService.setStorage('refreshToken',userData.refreshToken)
    this.storageService.setStorage('user',userData)
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
