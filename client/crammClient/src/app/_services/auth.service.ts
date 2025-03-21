import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, retry } from 'rxjs';
import { config } from '../_shared/_store/config';
import { getLocaleFirstDayOfWeek } from '@angular/common';
import { StorageService } from './storage.service';
import { HttpUtilityService } from './http-utility.service';
import { User } from '../_shared/_interface/intreface';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private storageService : StorageService,
    private http : HttpUtilityService,
    private userService : UserService
    ) { }

  userSubject = new BehaviorSubject<User>({
      _id: "",
      name: "",
      email: "",
      streak: 0,
      loggedIn: false
  });

  authenticateUser(userModel: any): Observable<any> {
    return this.http.post(config.api.LOGIN,userModel).pipe(map(res =>{
      res.loggedIn = true
      this.userService.setUser(res)
    // return this.http.post('http://localhost:8080/auth/login',userModel).pipe(map(res =>{
      return res;
    }))
  }

  getData() {
    console.error('heer');
    
    return this.http.get(config.api.GET_USER,{}).pipe(map((res : any) =>{
        console.log(res);
        const user : User = this.userService.userValue
        user.streak = res.streak
        this.userService.setUser(user)
        this.storageService.setStorage('streak',res.streak)
        return res;
        
      }))
  }

  refreshToken(){
    const headers = new HttpHeaders()
    .set('Authorization', `Bearer ${this.getRefreshToken()}`)
    return this.http.post(config.api.REFRESH, {}, {headers}).pipe(map ((data : any) =>{
      const accessToken = data?.accessToken
      console.log("nor showing acc token");
      
      console.log(accessToken);
      
      this.storageService.setStorage('accessToken',accessToken)
      if(accessToken) {
        return true
      }
      return false
    }))
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

  setUserSensitiveData(userData : any){
    this.storageService.setStorage('accessToken',userData.accessToken);
    this.storageService.setStorage('refreshToken',userData.refreshToken);
    this.setUser(userData)
  }


  setUser(userData : any){
    this.userService.setUser(userData)
  }

  initUser() {
    const user = this.storageService.getStorage('user')
    if(user) {
      this.setUser(user)
    }
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
